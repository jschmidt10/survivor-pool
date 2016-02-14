package github.jschmidt10.survivor.dynamo

import java.util.{ Map => JMap }

import scala.annotation.migration
import scala.collection.JavaConverters.mapAsJavaMapConverter
import scala.collection.JavaConverters.mapAsScalaMapConverter

import com.amazonaws.services.dynamodbv2.model.AttributeAction
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import com.amazonaws.services.dynamodbv2.model.AttributeValueUpdate

/**
 * Handles processing the pool metadata entry.
 */
object PoolMetadataSerializer {

  /**
   * Convert from a dynamo item to an object.
   */
  def fromItem(item: JMap[String, AttributeValue]): PoolMetadata =
    PoolMetadata(
        item.get("name").getS,
        item
          .asScala
          .filter(e => e._1 != "name")
          .keys
          .toSet)
  
  /**
   * Get the key of the pool metadata object.
   */
  def toKeyItem(poolMetadata: PoolMetadata) = 
    Map("name" -> new AttributeValue(poolMetadata.name)).asJava
    
  /**
   * Generate the update statements for the metadata object.
   */
  def toUpdate(poolMetadata: PoolMetadata) = 
    poolMetadata
      .poolNames
      .map(name => (name -> new AttributeValueUpdate(new AttributeValue("1"), AttributeAction.PUT)))
      .toMap
      .asJava
}