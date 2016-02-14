package com.jeff.survivor.user;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeff.survivor.User;
import com.jeff.survivor.mongo.MongoWrapper;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.UpdateOptions;

/**
 * Memory based repository for testing.
 */
//@Repository
public class MongoUserRepository implements UserRepository {

	private static Log logger = LogFactory.getLog(MongoUserRepository.class);

	private MongoCollection<Document> collection;
	private ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
			false);

	@Autowired
	public MongoUserRepository(MongoWrapper mongo, @Value("${mongo.user.collection}") String collName) {
		this.collection = mongo.getCollection(collName);
	}

	@Override
	public User fetchByUsername(String username) {

		Document doc = collection.find(new Document("username", username)).first();

		User user = null;

		if (doc != null) {
			try {
				user = mapper.readValue(doc.toJson(), User.class);
			} catch (Exception e) {
				logger.error("Could not deserialize fetch result: " + doc.toJson(), e);
			}
		}

		return user;
	}

	@Override
	public boolean save(User user) {
		try {
			Document filter = new Document("username", user.getUsername());
			Document update = Document.parse(mapper.writeValueAsString(user));

			collection.updateOne(filter, update, new UpdateOptions().upsert(true));
			return true;
		} catch (IOException e) {
			logger.error("Failed to save season to Mongo", e);
			return false;
		}
	}
}
