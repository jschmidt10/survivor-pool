/*
 * Copyright (c) 2014, Oracle America, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 *  * Neither the name of Oracle nor the names of its contributors may be used
 *    to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

package github.jschmidt10.survivor;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Player;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.dynamo.PoolSerializer;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openjdk.jmh.Main;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;

import java.io.IOException;
import java.util.*;

@State(Scope.Thread)
public class SurvivorBenchmark {

    private final ObjectMapper mapper = new ObjectMapper();
    private Map<String, AttributeValue> item;

    public SurvivorBenchmark() {
        Contestant c1 = new Contestant("Betty", "betty.jpg");
        Contestant c2 = new Contestant("Teddy", "teddy.jpg");
        Contestant c3 = new Contestant("Timmy", "timmy.jpg");
        Contestant c4 = new Contestant("Susie", "susie.jpg");

        Player p1 = new Player("Tommy", new TreeSet<>(Arrays.asList(c1, c2)));
        Player p2 = new Player("Fiona", new TreeSet<>(Arrays.asList(c3, c4)));

        Set<Player> players = new TreeSet<>();
        players.add(p1);
        players.add(p2);

        Pool pool = new Pool();
        pool.setName("My Pool");
        pool.setUrl("http://my.pool.com/");
        pool.setPlayers(players);

        item = new TreeMap<>();
        item.put("name", new AttributeValue().withS("My Pool"));
        item.put("url", new AttributeValue().withS("http://my.url.com"));
        try {
            item.put("players", new AttributeValue().withS(mapper.writeValueAsString(players)));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

//    @Benchmark
//    public Pool testPoolSerialization() {
//        return PoolSerializer.fromItem(item);
//    }

    @Benchmark
    public String testLambdaCalls() {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost post = new HttpPost("https://inzpqeqt93.execute-api.us-east-1.amazonaws.com/prod/FindPoolByName");
            post.setHeader("Content-Type", "application/json");
            post.setEntity(new StringEntity("{\"name\":\"Thursday Survivor\"}"));

            try (CloseableHttpResponse response = client.execute(post)) {
                return response.getEntity().toString();
            }
        } catch (IOException e) {
            System.err.println("Could not make HTTP call");
        }
        return "";
    }

    public static void main(String[] args) throws Exception {
        Main.main(args);
    }
}
