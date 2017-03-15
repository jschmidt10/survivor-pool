package github.jschmidt10.survivor.api.repo

import java.lang.{ Iterable => JIterable }
import github.jschmidt10.survivor.api.Pool
import java.io.Closeable

/**
 * Handles persistence operations on Pools.
 */
trait PoolRepository extends Closeable {

  /**
   * Save updates to a pool.
   */
  def save(pool: Pool): Boolean
  
  /**
   * Get pools by a piece of their name.
   */
  def getByName(name: String): Pool
  
  /**
   * Get all the pools.
   */
  def getAll(): JIterable[Pool]
}