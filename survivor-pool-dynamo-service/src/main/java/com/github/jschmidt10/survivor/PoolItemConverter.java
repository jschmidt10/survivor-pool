package com.github.jschmidt10.survivor;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Player;
import github.jschmidt10.survivor.api.Pool;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Handles converting between Pool domain objects and Amazon DynamoDB items.
 */
public class PoolItemConverter {

    /**
     * Converts a Pool to an item.
     *
     * @param pool
     * @param env
     * @param id
     * @return item
     */
    public static Map<String, AttributeValue> toItem(Pool pool, Environment env, String id) {
        Map<String, AttributeValue> item = new TreeMap<>();

        item.put("id", getS(id));
        item.put("env", getS(env.toString()));
        item.put("name", getS(pool.getName()));
        item.put("url", getS(pool.getUrl()));
        item.put("players", encodePlayers(pool));

        return item;
    }

    /**
     * Converts an item to a Pool.
     *
     * @param item
     * @return pool
     */
    public static Pool fromItem(Map<String, AttributeValue> item) {
        Pool pool = new Pool();

        pool.setName(item.get("name").getS());
        pool.setUrl(item.get("url").getS());

        List<String> playerMappings = item.get("players").getSS();

        if (playerMappings != null) {
            pool.setPlayers(decodePlayers(playerMappings));
        }

        return pool;
    }

    private static AttributeValue getS(String s) {
        return new AttributeValue().withS(s);
    }

    /*
     * Serializes players to a String Set. Format is: PLAYER;CONTESTANT1,CONTESTANT2.
     */
    private static AttributeValue encodePlayers(Pool pool) {
        AttributeValue av = new AttributeValue();
        av.setSS(pool.getPlayers().stream().map(PoolItemConverter::playerString).collect(Collectors.toSet()));
        return av;
    }

    private static Set<Player> decodePlayers(List<String> playerMappings) {
        return playerMappings.stream().map(m -> {
            String[] tokens = m.split(";");
            Player player = new Player();
            player.setName(tokens[0]);
            player.setContestants(
                    Stream.of(tokens[1].split(",")).map(name -> new Contestant(name, null, null)).collect(Collectors.toSet())
            );
            return player;
        }).collect(Collectors.toSet());
    }

    private static String playerString(Player p) {
        return p.getName() + ";" + p.getContestants().stream().map(Object::toString).collect(Collectors.joining(","));
    }
}
