package github.jschmidt10.survivor.api.service

import github.jschmidt10.survivor.api.Pool
import java.lang.{Iterable => JIterable}

/**
  * Provides all services necessarily for manipulating survivor pools.
  */
trait PoolService {

  /**
    * Creates a new survivor pool
    *
    * @param pool
    */
  def create(pool: Pool): Unit

  /**
    * Gets a survivor pool by its name.
    *
    * @param name
    * @return pool with the given name or null otherwise
    */
  def get(name: String): Pool

  /**
    * Finds all pools that match the search term.
    *
    * @param searchTerm
    * @return all matching pools
    */
  def search(searchTerm: String): JIterable[Pool]

  /**
    * Lists all current pools.
    *
    * @return all pools
    */
  def list(): JIterable[Pool]
}
