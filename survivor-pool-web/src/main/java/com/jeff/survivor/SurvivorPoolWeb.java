package com.jeff.survivor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import github.jschmidt10.survivor.api.repo.PoolRepository;
import github.jschmidt10.survivor.api.repo.SeasonRepository;
import github.jschmidt10.survivor.dynamo.DynamoPoolRepository;
import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class SurvivorPoolWeb {

	@Value("${dynamodb.pool.table}")
	private String poolTable;
	
	@Value("${dynamodb.season.table}")
	private String seasonTable;
	
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}
	
	@Bean
	public PoolRepository poolRepository() {
		return new DynamoPoolRepository(poolTable);
	}
	
	@Bean
	public SeasonRepository seasonRepository() {
		return new DynamoSeasonRepository(seasonTable);
	}
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(SurvivorPoolWeb.class, args);
	}
}
