package github.jschmidt10.survivor.dynamo

import java.lang.{Iterable => JIterable}

import com.amazonaws.services.dynamodbv2.model.ScanRequest
import github.jschmidt10.survivor.api.Pool
import github.jschmidt10.survivor.api.repo.PoolRepository

import scala.collection.JavaConverters._
import scala.util.Try

/**
  * A DynamoDB backed implementation of a SeasonRepository.
  */
class DynamoPoolRepository(poolTable: String) extends PoolRepository with DynamoRepo {

  override def getAll(): JIterable[Pool] =
    dynamo
      .scan(new ScanRequest(poolTable))
      .getItems
      .asScala
      .flatMap(item => Try(PoolSerializer.fromItem(item)).toOption)
      .asJava

  override def getByName(name: String): Pool = {
    val response = dynamo.getItem(gir(poolTable, "id", DynamoPoolRepository.getId(name)))
    Option(response.getItem).map(item => PoolSerializer.fromItem(item)).getOrElse(null)
  }

  override def save(pool: Pool): Boolean = {
    dynamo.putItem(
      pir(poolTable, PoolSerializer.toItem(pool))
    )

    true
  }
}

object DynamoPoolRepository {
  val PoolPrefix = "POOL:"

  /**
    * Gets the dynamo table id
    *
    * @param poolName
    * @return pool id
    */
  def getId(poolName: String): String = PoolPrefix + poolName

  /**
    * Gets the dynamo table id
    *
    * @param pool
    * @return pool id
    */
  def getId(pool: Pool): String = getId(pool.name)
}