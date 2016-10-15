package com.jeff.survivor;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.PoolRepository;
import github.jschmidt10.survivor.api.repo.SeasonRepository;
import github.jschmidt10.survivor.h2.H2PoolRepository;
import github.jschmidt10.survivor.h2.H2SeasonRepository;
import github.jschmidt10.survivor.h2.HibernateUtils;
import org.h2.tools.Server;
import org.hibernate.SessionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class SurvivorPoolWeb {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Bean
    public SessionFactory sessionFactory() {
        return HibernateUtils.defaultSessionFactory();
    }

    @Bean
    public PoolRepository poolRepository(SessionFactory sessionFactory) {
        return new H2PoolRepository(sessionFactory);
    }

    @Bean
    public SeasonRepository seasonRepository(SessionFactory sessionFactory, ObjectMapper mapper) throws IOException {
        SeasonRepository seasonRepo = new H2SeasonRepository(sessionFactory);

        if (seasonRepo.getCurrent() == null) {
            InputStream seasonJson = getClass().getClassLoader().getResourceAsStream("current_season.json");
            Season current = mapper.readValue(seasonJson, Season.class);
            seasonRepo.save(current);
        }

        return seasonRepo;
    }

    public static void main(String[] args) throws Exception {
        final Server server = Server.createTcpServer("-tcpPort", "9123");
        server.start();

        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                server.stop();
            }
        });

        SpringApplication.run(SurvivorPoolWeb.class, args);
    }
}
