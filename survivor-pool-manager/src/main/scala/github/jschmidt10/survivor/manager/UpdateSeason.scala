package github.jschmidt10.survivor.manager

import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository
import scala.collection.JavaConverters._
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.QueryRequest
import com.amazonaws.services.dynamodbv2.model.Condition
import com.amazonaws.services.dynamodbv2.model.ScanRequest
import com.amazonaws.services.dynamodbv2.model.AttributeValue

/**
 * Tool for updating the current season
 */
object UpdateSeason {
  private val TableName = "survivorpool_seasons"
  private val repo = new DynamoSeasonRepository(TableName)

  def main(args: Array[String]) {
    println(repo.getCurrent.name)
    repo.close()
  }
}