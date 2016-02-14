package github.jschmidt10.survivor.manager

import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository
import scala.collection.JavaConverters._

/**
 * Tool for updating the current season
 */
object UpdateSeason {
  private val TableName = "survivorpool_seasons"
  private val repo = new DynamoSeasonRepository(TableName)

  def main(args: Array[String]) {
    val season = repo.getCurrent
    
    season
      .getContestants()
      .asScala
      .foreach(c => println(c))
      
    repo.close()
  }
}