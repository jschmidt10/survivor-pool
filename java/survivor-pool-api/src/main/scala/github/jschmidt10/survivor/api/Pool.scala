package github.jschmidt10.survivor.api

import scala.beans.BeanProperty

import java.util.{ Set => JSet }

/**
 * A surivor pool. Holds all the players and their contestants.
 */
case class Pool(
  @BeanProperty var name: String,
  @BeanProperty var url: String,
  @BeanProperty var players: JSet[Player]) {
  
  // for json library
  def this() = this(null, null, null)
}
