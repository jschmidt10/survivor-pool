package github.jschmidt10.survivor.api.repo

import github.jschmidt10.survivor.api.Season
import java.io.Closeable

/**
 * Handles persistence operations on Seasons.
 */
trait SeasonRepository extends Closeable {

  /**
   * Save updates to a season.
   */
  def save(season: Season): Boolean
  
  /**
   * Get the current season.
   */
  def getCurrent(): Season
}