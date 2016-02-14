package github.jschmidt10.survivor.dynamo

import java.util.{ Map => JMap }
import java.util.{ Set => JSet }
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import github.jschmidt10.survivor.api.Season
import com.fasterxml.jackson.databind.ObjectMapper
import github.jschmidt10.survivor.api.Contestant
import scala.collection.JavaConverters._

/**
 * Handles serializing a Season to/from dynamo.
 */
object SeasonSerializer {

  private val mapper = new ObjectMapper()
  private val contestantSetType = mapper.getTypeFactory().constructCollectionType(classOf[JSet[_]], classOf[Contestant])

  /**
   * Convert a dynamo item to a Season.
   */
  def fromItem(item: JMap[String, AttributeValue]): Season = {
    val name = item.get("name").getS
    val isCurrent = item.get("isCurrent").getS.toBoolean
    val contestants = deserializeContestants(item.get("contestants").getS)

    Season(name, isCurrent, contestants)
  }

  private def deserializeContestants(json: String) = mapper.readValue[JSet[Contestant]](json, contestantSetType)

  /**
   * Convert a season to a dynamo item.
   */
  def toItem(season: Season): JMap[String, AttributeValue] =
    Map(
      "name" -> new AttributeValue(season.name),
      "isCurrent" -> new AttributeValue(season.isCurrent.toString),
      "contestants" -> new AttributeValue(
        mapper.writeValueAsString(season.contestants))).asJava
}