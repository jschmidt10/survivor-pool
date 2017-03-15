package com.github.jschmidt10.survivor;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.GetItemRequest;
import com.amazonaws.services.dynamodbv2.model.GetItemResult;
import com.amazonaws.services.dynamodbv2.model.PutItemRequest;
import com.google.common.base.Preconditions;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.service.PoolService;
import github.jschmidt10.survivor.api.service.SeasonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.AbstractMap.SimpleEntry;
import java.util.Map;

/**
 * Dynamo backed pool service.
 */
public class DynamoPoolService implements PoolService {

    private final static Logger logger = LoggerFactory.getLogger(DynamoPoolService.class);

    private final AmazonDynamoDBClient dynamo = new AmazonDynamoDBClient();

    private final Environment env;
    private final String prefix;
    private final String table;
    private final SeasonService seasonService;

    public DynamoPoolService(Environment env, String prefix, String table, SeasonService seasonService) {
        Preconditions.checkNotNull("Must define a table for DynamoPoolService", table);
        Preconditions.checkNotNull("Must define a prefix for DynamoPoolService", prefix);
        Preconditions.checkNotNull("DynamoPoolService requires a SeasonService", seasonService);

        this.env = env;
        this.prefix = prefix;
        this.table = table;
        this.seasonService = seasonService;
    }

    @Override
    public void create(Pool pool) {
        PoolValidation.validate(pool, getCurrentSeason());

        try {
            String url = URLEncoder.encode(pool.getName(), StandardCharsets.UTF_8.toString());
            pool.setUrl(url);
        } catch (UnsupportedEncodingException e) {
            logger.error("Could not encode URL for pool.", e);
            throw new RuntimeException("Could not encode URL for pool.");
        }

        save(pool);
    }

    private Season getCurrentSeason() {
        try {
            return seasonService.getCurrent();
        } catch (Exception e) {
            logger.error("Could not fetch the current season from " + seasonService, e);
            throw new RuntimeException("Could not fetch the current season.");
        }
    }

    private void save(Pool pool) {
        Map<String, AttributeValue> item = PoolItemConverter.toItem(pool, env, prefix + pool.getName());
        PutItemRequest request = new PutItemRequest().withTableName(table).withItem(item);

        try {
            dynamo.putItem(request);
        } catch (Exception e) {
            logger.error("Failed to save pool to DynamoDB.", e);
            throw new RuntimeException("Failed to save pool.");
        }
    }

    @Override
    public Pool get(String name) {
        String id = prefix + name;
        Map.Entry<String, AttributeValue> hashKey = new SimpleEntry<>("id", new AttributeValue().withS(id));
        GetItemRequest request = new GetItemRequest().withTableName(table).withKey(hashKey, null);

        Map<String, AttributeValue> item;
        try {
            GetItemResult result = dynamo.getItem(request);
            item = result.getItem();
        } catch (Exception e) {
            logger.error("Failed to get pool from DynamoDB.", e);
            throw new RuntimeException("Failed to fetch pool.");
        }

        Pool pool;

        try {
            pool = PoolItemConverter.fromItem(item);
        } catch (Exception e) {
            logger.error("Could not deserialize item into a Pool.", e);
            throw new RuntimeException("Could not deserialize item into a Pool.");
        }

        Season season = getCurrentSeason();

        mergeContestants(pool, season);

        return pool;
    }

    private void mergeContestants(Pool pool, Season season) {
        pool.getPlayers().stream().flatMap(p -> p.getContestants().stream()).forEach(c -> {
            season
                    .getContestants()
                    .stream()
                    .filter(sc -> c.equals(sc))
                    .findFirst()
                    .ifPresent(found -> {
                        c.setPic(found.getPic());
                        c.setStatus(found.getStatus());
                    });
        });
    }

    @Override
    public Iterable<Pool> search(String searchTerm) {
        throw new UnsupportedOperationException("Searching for Pools not yet supported.");
    }

    @Override
    public Iterable<Pool> list() {
        return null;
    }
}
