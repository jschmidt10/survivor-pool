package github.jschmidt10.survivor.api

/**
 * The status of a contestant in the game.
 */
sealed trait Status
object Active extends Status
object Eliminated extends Status