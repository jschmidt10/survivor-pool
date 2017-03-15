package github.jschmidt10.survivor.dynamo

import java.util.{ Map => JMap }
import scala.collection.JavaConverters._
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient
import com.amazonaws.services.dynamodbv2.model.AttributeValue
import com.amazonaws.services.dynamodbv2.model.GetItemRequest
import com.amazonaws.services.dynamodbv2.model.PutItemRequest
import java.io.Closeable

/**
 * A dynamo db repository.
 */
trait DynamoRepo extends Closeable {

  val dynamo = new AmazonDynamoDBClient

  def pir(tableName: String, item: JMap[String, AttributeValue]) =
    new PutItemRequest()
      .withTableName(tableName)
      .withItem(item)

  def gir(tableName: String, keyName: String, keyValue: String) =
    new GetItemRequest()
      .withTableName(tableName)
      .withKey(Map(keyName -> av(keyValue)).asJava)

  def av(s: String) = new AttributeValue(s)

  override def close() = dynamo.shutdown
}