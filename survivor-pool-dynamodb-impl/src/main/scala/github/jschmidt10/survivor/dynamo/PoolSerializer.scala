package github.jschmidt10.survivor.dynamo

import java.util.{Map => JMap, Set => JSet}

import com.amazonaws.services.dynamodbv2.model.AttributeValue
import com.fasterxml.jackson.databind.ObjectMapper
import github.jschmidt10.survivor.api.{Player, Pool}

import scala.collection.JavaConverters._

/**
 * Handles serializing a Season to/from dynamo.
 */
object PoolSerializer {

  private val mapper = new ObjectMapper()
  private val playerSetType = mapper.getTypeFactory().constructCollectionType(classOf[JSet[_]], classOf[Player])

  /**
   * Convert a dynamo item to a Pool.
   */
  def fromItem(item: JMap[String, AttributeValue]): Pool = {
    val name = item.get("name").getS
    val url = item.get("url").getS
    val players = deserializePlayers(item.get("players").getS)
    
    new Pool(name, url, players)
  }

  private def deserializePlayers(json: String) = mapper.readValue[JSet[Player]](json, playerSetType)

  /**
   * Convert a pool to a dynamo item.
   */
  def toItem(pool: Pool): JMap[String, AttributeValue] =
    Map(
      "id" -> new AttributeValue(DynamoPoolRepository.getId(pool)),
      "name" -> new AttributeValue(pool.name),
      "url" -> new AttributeValue(pool.url),
      "players" -> new AttributeValue(mapper.writeValueAsString(pool.players))).asJava

}