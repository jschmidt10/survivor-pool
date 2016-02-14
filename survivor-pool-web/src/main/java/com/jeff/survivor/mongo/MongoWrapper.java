package com.jeff.survivor.mongo;

import java.io.Closeable;
import java.io.IOException;
import java.util.Collections;

import javax.annotation.PreDestroy;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * Mongo wrapper for sharing among Repositories.
 */
//@Component
public class MongoWrapper implements Closeable {

	private MongoClient client;
	private MongoDatabase db;

	@Autowired
	public MongoWrapper(@Value("${mongo.host}") String host, @Value("${mongo.port}") int port,
			@Value("${mongo.user}") String username, @Value("${mongo.password}") String password,
			@Value("${mongo.db}") String dbName) {

		MongoCredential credential = MongoCredential.createCredential(username, dbName, password.toCharArray());
		this.client = new MongoClient(new ServerAddress(host, port), Collections.singletonList(credential));
		this.db = client.getDatabase(dbName);
	}

	/**
	 * Get a collection
	 * 
	 * @param collection
	 */
	public MongoCollection<Document> getCollection(String collection) {
		return db.getCollection(collection);
	}

	@PreDestroy
	@Override
	public void close() throws IOException {
		this.client.close();
	}
}
