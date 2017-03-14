package github.jschmidt10.survivor.api.service

import github.jschmidt10.survivor.api.Season

/**
  * Provides all services necessarily for manipulating survivor seasons.
  */
trait SeasonService {

  /**
    * Gets the current season.
    *
    * @return current season if there is one or null if not.
    */
  def getCurrent: Season

  /**
    * Eliminates the given contestant
    *
    * @param contestant
    */
  def eliminateContestant(contestantName: String)

  /**
    * Marks the season with the given name as current.
    *
    * @param name season to mark as current
    */
  def makeCurrent(name: String): Unit

  /**
    * Creates a new season. Does not set it as current by default.
    *
    * @param season
    */
  def create(season: Season): Unit
}
