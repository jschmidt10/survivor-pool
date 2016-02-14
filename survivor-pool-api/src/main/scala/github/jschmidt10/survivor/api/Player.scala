package github.jschmidt10.survivor.api

import scala.beans.BeanProperty

import java.util.{Set => JSet}

/**
 * A player in a survivor pool.
 */
case class Player(
  @BeanProperty var name: String,
  @BeanProperty var contestants: JSet[Contestant]
) {
  // for json library
  def this() = this(null, null)
}