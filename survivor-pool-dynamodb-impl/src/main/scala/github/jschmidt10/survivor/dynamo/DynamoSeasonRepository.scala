package github.jschmidt10.survivor.dynamo

import java.util.{ List => JList }
import java.util.{ Map => JMap }
import java.util.{ Set => JSet }
import java.util.TreeSet
import scala.collection.JavaConverters.mapAsJavaMapConverter
import scala.collection.JavaConverters.setAsJavaSetConverter
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

/**
 * A DynamoDB backed implementation of a SeasonRepository.
 */
class DynamoSeasonRepository(seasonTable: String) extends SeasonRepository with DynamoRepo {

  override def save(season: Season): Boolean = {
    dynamo.putItem(pir(seasonTable, SeasonSerializer.toItem(season)))

    if (season.isCurrent) {
      val metadata = SeasonMetadata(MetadataName, season.name)
      dynamo.putItem(pir(seasonTable, SeasonMetadataSerializer.toItem(metadata)))
    }

    true
  }
  
  override def getCurrent(): Season = {
    val response = dynamo.getItem(gir(seasonTable, "name", MetadataName))
    val metadata = SeasonMetadataSerializer.fromItem(response.getItem)

    val seasonRequest = dynamo.getItem(gir(seasonTable, "name", metadata.currentSeason))
    SeasonSerializer.fromItem(seasonRequest.getItem)
  }
}
