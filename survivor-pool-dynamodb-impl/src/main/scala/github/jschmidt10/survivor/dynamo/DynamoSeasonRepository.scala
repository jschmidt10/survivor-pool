package github.jschmidt10.survivor.dynamo

import java.util.{ List => JList }
import java.util.{ Map => JMap }
import java.util.{ Set => JSet }
import java.util.TreeSet
import scala.collection.JavaConverters._
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import com.amazonaws.services.dynamodbv2.model.GetItemRequest
import com.amazonaws.services.dynamodbv2.model.PutItemRequest
import com.fasterxml.jackson.databind.ObjectMapper
import github.jschmidt10.survivor.api.Contestant
import github.jschmidt10.survivor.api.Season
import github.jschmidt10.survivor.api.repo.SeasonRepository
import com.fasterxml.jackson.core.`type`.TypeReference
import github.jschmidt10.survivor.api.repo.PoolRepository
import com.amazonaws.services.dynamodbv2.model.ScanRequest

/**
 * A DynamoDB backed implementation of a SeasonRepository.
 */
class DynamoSeasonRepository(seasonTable: String) extends SeasonRepository with DynamoRepo {

  override def save(season: Season): Boolean = {
    dynamo.putItem(pir(seasonTable, SeasonSerializer.toItem(season)))
    true
  }

  override def getCurrent(): Season = {
    val results = dynamo.scan(new ScanRequest()
      .withTableName(seasonTable)
      .withFilterExpression("isCurrent = :isCur")
      .withExpressionAttributeValues(Map(":isCur" -> av("true")).asJava))

    SeasonSerializer.fromItem(results
      .getItems
      .asScala
      .head)
  }
}
