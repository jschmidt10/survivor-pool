package com.jeff.survivor.pool;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeff.survivor.mongo.MongoWrapper;
import com.jeff.survivor.season.MongoSeasonRepository;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.UpdateOptions;

import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.repo.PoolRepository;

/**
 * Persistence operations for survivor pools backed by mongo.
 */
//@Repository
public class MongoPoolRepository implements PoolRepository {

	private static Log logger = LogFactory.getLog(MongoSeasonRepository.class);

	private MongoCollection<Document> collection;
	private ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
			false);

	@Autowired
	public MongoPoolRepository(MongoWrapper mongo, @Value("${mongo.pool.collection}") String collName) {
		this.collection = mongo.getCollection(collName);
	}

	@Override
	public boolean save(Pool pool) {
		try {
			Document filter = new Document()
					.append("name", pool.getName());
			
			Document update = Document.parse(mapper.writeValueAsString(pool));

			collection.updateOne(filter, update, new UpdateOptions().upsert(true));
			return true;
		} catch (Exception e) {
			logger.error("Failed to save survivor pool to Mongo", e);
			return false;
		}
	}
	
	@Override
	public Pool getByName(String name) {
		List<Pool> results = find(new Document("name", name));
		return results.size() == 1 ? results.get(0) : null;
	}
	
	@Override
	public List<Pool> getAll() {
		return find(new Document());
	}	
	
	/**
	 * Find the pools by some filter
	 * @param filter
	 * @return pools
	 */
	private List<Pool> find(Document filter) {
		MongoCursor<Document> docs = collection.find(filter).iterator();
		List<Pool> pools = new LinkedList<>();
		
		while(docs.hasNext()) {
			Document doc = docs.next();
			try {
				Pool pool = mapper.readValue(doc.toJson(), Pool.class);
				pools.add(pool);
			} catch (IOException e) {
				logger.error("Could not deserialize fetch result: " + doc.toJson(), e);
			}
		}

		return pools;
	}

	@Override
	public void close() throws IOException {
		// TODO Auto-generated method stub
	}
}
