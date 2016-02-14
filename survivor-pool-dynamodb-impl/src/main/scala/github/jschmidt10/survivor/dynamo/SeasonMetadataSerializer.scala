package github.jschmidt10.survivor.dynamo

import com.amazonaws.services.dynamodbv2.model.AttributeValue
import scala.collection.JavaConverters._
import java.util.{ Map => JMap }

/**
 * Handles converting season metadata to/from dynamo db items.
 */
object SeasonMetadataSerializer {
  
  /**
   * Convert metadata to an item.
   */
  def toItem(metadata: SeasonMetadata) = {
    Map(
      "name" -> new AttributeValue(metadata.name),
      "currentSeason" -> new AttributeValue(metadata.currentSeason)
    ).asJava
  }
  
  /**
   * Converts from an item back to a metadata.
   */
  def fromItem(item: JMap[String, AttributeValue]) = {
    val name = item.get("name").getS
    val currentSeason = item.get("currentSeason").getS
    SeasonMetadata(name, currentSeason)
  }
}