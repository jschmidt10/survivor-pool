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

  def main(args: Array[String]) {
    repo.getAll().asScala.foreach(p => println(p.name))
    repo.close()
  }
}