package github.jschmidt10.survivor.dynamo

/**
 * Stores metadata about survivor pools.
 */
case class PoolMetadata(name: String, poolNames: Set[String])
