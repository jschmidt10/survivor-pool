package github.jschmidt10.survivor.manager

import scala.collection.JavaConverters._
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.ScanRequest
import github.jschmidt10.survivor.dynamo.DynamoPoolRepository
import github.jschmidt10.survivor.dynamo.PoolSerializer

/**
 * Tool for updating pools.
 */
object UpdatePools {
  
  private val TableName = "survivorpool_pools"
  private val repo = new DynamoPoolRepository(TableName)
  private val Name = "Caleb Reynolds"
  
  def main(args: Array[String]) {
    val pools = repo
      .getAll()
      .asScala

    pools
      .foreach(pool => {
        pool
          .getPlayers
          .asScala
    	    .flatMap(_.getContestants.asScala)
    	    .find(c => c.name == Name)
    	    .foreach(c => {
    		    c.status = "eliminated" 
    	    })
        
        repo.save(pool)  
      })
      
    repo.close()
  }
}