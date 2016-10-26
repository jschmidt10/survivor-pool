package github.jschmidt10.survivor.manager

import scala.collection.JavaConverters._
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.ScanRequest
import github.jschmidt10.survivor.dynamo.DynamoPoolRepository
import github.jschmidt10.survivor.dynamo.PoolSerializer
import github.jschmidt10.survivor.dynamo.DynamoSeasonRepository

/**
 * Tool for updating pools.
 */
object EliminatePlayer {

  private val SeasonTable = "survivorpool"
  private val PoolTable = "survivorpool"
  private val EliminatedPlayer = "Lucy"

  def main(args: Array[String]) {
	  val poolRepo = new DynamoPoolRepository(PoolTable)
    val pools = poolRepo
      .getAll()
      .asScala

    pools
      .foreach(pool => {
        pool
          .getPlayers
          .asScala
          .flatMap(_.getContestants.asScala)
          .find(c => c.name == EliminatedPlayer)
          .foreach(c => {
            c.status = "eliminated"
          })

        poolRepo.save(pool)
      })

    poolRepo.close()

    val seasonRepo = new DynamoSeasonRepository(SeasonTable)

    val season = seasonRepo.getCurrent

    season
      .getContestants
      .asScala
      .find(c => c.name == EliminatedPlayer)
      .foreach(c => c.status = "eliminated")

    seasonRepo.save(season)

    seasonRepo.close()
  }
}
