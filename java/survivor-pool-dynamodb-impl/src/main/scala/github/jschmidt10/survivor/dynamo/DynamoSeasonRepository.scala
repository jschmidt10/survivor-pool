package github.jschmidt10.survivor.dynamo

import com.amazonaws.services.dynamodbv2.model.ScanRequest
import github.jschmidt10.survivor.api.Season
import github.jschmidt10.survivor.api.repo.SeasonRepository

import scala.collection.JavaConverters._

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

    val items = results
      .getItems
      .asScala

    if (items.isEmpty)
      null
    else
      SeasonSerializer.fromItem(items.head)
  }
}

object DynamoSeasonRepository {
  val SeasonPrefix = "SEASON:"

  /**
    * Gets the dynamo table id
    *
    * @param seasonName
    * @return season id
    */
  def getId(seasonName: String): String = SeasonPrefix + seasonName

  /**
    * Gets the dynamo table id
    *
    * @param season
    * @return season id
    */
  def getId(season: Season): String = getId(season.name)
}