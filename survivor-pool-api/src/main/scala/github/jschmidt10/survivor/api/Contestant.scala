package github.jschmidt10.survivor.api

import scala.beans.BeanProperty

/**
 * A survivor contestant
 */
case class Contestant(
  @BeanProperty var name: String,
  @BeanProperty var pic: String,
  @BeanProperty var status: String = "active"
) {
  
  // for json library
  def this() = this(null, null, null)
  
  def this(name: String, pic: String) = this(name, pic, "active")
}