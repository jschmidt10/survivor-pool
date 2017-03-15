package github.jschmidt10.survivor.api

import scala.beans.BeanProperty

import java.util.{Set => JSet}

/**
  * A player in a survivor pool.
  */
case class Player(
                   @BeanProperty var name: String,
                   @BeanProperty var contestants: JSet[Contestant]
                 ) extends Comparable[Player] {
  // for json library
  def this() = this(null, null)

  override def compareTo(o: Player): Int = name.compareTo(o.name)
}