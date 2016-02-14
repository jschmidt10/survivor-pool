package com.jeff.survivor.season;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeff.survivor.mongo.MongoWrapper;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.UpdateOptions;

import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.SeasonRepository;

/**
 * Handles database operations for survivor seasons.
 */
//@Repository
public class MongoSeasonRepository implements SeasonRepository {

	private static Log logger = LogFactory.getLog(MongoSeasonRepository.class);

	private MongoCollection<Document> collection;
	private ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
			false);

	@Autowired 
	public MongoSeasonRepository(MongoWrapper mongo, @Value("${mongo.season.collection}") String collName) {
		this.collection = mongo.getCollection(collName);
	}

	@Override
	public boolean save(Season season) {
		try {
			Document filter = new Document("name", season.getName());
			Document update = Document.parse(mapper.writeValueAsString(season));

			collection.updateOne(filter, update, new UpdateOptions().upsert(true));
			return true;
		} catch (Exception e) {
			logger.error("Failed to save season to Mongo", e);
			return false;
		}
	}

	@Override
	public Season getCurrent() {
		Document doc = collection.find(new Document("current", true)).first();
		Season season = null;

		if (doc != null) {
			try {
				season = mapper.readValue(doc.toJson(), Season.class);
			} catch (IOException e) {
				logger.error("Could not deserialize fetch result: " + doc.toJson(), e);
			}
		}

		return season;
	}

	@Override
	public void close() {
		// TODO Auto-generated method stub
	}
}
