package github.jschmidt10.survivor.api

import scala.beans.{BeanProperty, BooleanBeanProperty}
import java.util.{Set => JSet}

import scala.collection.JavaConverters._

/**
  * A surivor pool. Holds all the players and their contestants.
  */
case class Season(
                   @BeanProperty var name: String,
                   @BooleanBeanProperty var current: Boolean,
                   @BeanProperty var contestants: JSet[Contestant]
                 ) {

  // for library support
  def this() = this(null, false, null)

  /**
    * Eliminate a contestant from the season.
    */
  def eliminate(contestant: String) = contestants.asScala.find(c => c.name == contestant).foreach(c => c.status = "eliminated")
}