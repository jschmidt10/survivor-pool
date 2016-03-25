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
  private val Name = "Caleb Reynolds"
  
  def main(args: Array[String]) {
    val season = repo.getCurrent
    
    season
      .getContestants
      .asScala
      .find(c => c.name == Name)
      .foreach(c => c.status = "eliminated")
    
    repo.save(season)  
    
    repo.close()
  }
}