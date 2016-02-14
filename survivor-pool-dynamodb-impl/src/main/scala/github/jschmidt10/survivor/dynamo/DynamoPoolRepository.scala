package github.jschmidt10.survivor.dynamo

import java.util.{ Map => JMap }
import java.util.{ Set => JSet }
import java.util.{ List => JList }
import java.lang.{ Iterable => JIterable }
import scala.collection.JavaConverters.asJavaIterableConverter
import scala.collection.JavaConverters.mapAsJavaMapConverter
import scala.collection.JavaConverters.mapAsScalaMapConverter
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import com.amazonaws.services.dynamodbv2.model.GetItemRequest
import com.amazonaws.services.dynamodbv2.model.PutItemRequest
import com.fasterxml.jackson.databind.ObjectMapper
import github.jschmidt10.survivor.api.Player
import github.jschmidt10.survivor.api.Pool
import github.jschmidt10.survivor.api.repo.PoolRepository
import java.util.TreeSet
import github.jschmidt10.survivor.api.Contestant
import com.amazonaws.services.dynamodbv2.model.UpdateItemRequest
import com.amazonaws.services.dynamodbv2.model.AttributeValueUpdate
import com.amazonaws.services.dynamodbv2.model.AttributeAction

/**
 * A DynamoDB backed implementation of a SeasonRepository.
 */
class DynamoPoolRepository(poolTable: String) extends PoolRepository with DynamoRepo {

  override def getAll(): JIterable[Pool] = {
    val metaResponse = dynamo.getItem(gir(poolTable, "name", MetadataName))
    val metadata = PoolMetadataSerializer.fromItem(metaResponse.getItem)

    metadata
      .poolNames
      .map(pool => dynamo.getItem(gir(poolTable, "name", pool)))
      .map(result => PoolSerializer.fromItem(result.getItem))
      .asJava
  }

  override def getByName(name: String): Pool = {
    val response = dynamo.getItem(gir(poolTable, "name", name))
    PoolSerializer.fromItem(response.getItem)
  }
  
  override def save(pool: Pool): Boolean = {
    dynamo.putItem(
      pir(poolTable, PoolSerializer.toItem(pool))    
    )

    val metadata = PoolMetadata(MetadataName, Set(pool.name))
    dynamo.updateItem(poolMetaUpdate(metadata))

    true
  }

  private def poolMetaUpdate(metadata: PoolMetadata) = 
    new UpdateItemRequest()
      .withTableName(poolTable)
      .withKey(PoolMetadataSerializer.toKeyItem(metadata))
      .withAttributeUpdates(PoolMetadataSerializer.toUpdate(metadata))
}