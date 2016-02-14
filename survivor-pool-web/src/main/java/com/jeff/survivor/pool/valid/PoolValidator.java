package com.jeff.survivor.pool.valid;

import java.util.Set;

import github.jschmidt10.survivor.api.Player;
import github.jschmidt10.survivor.api.Season;

/**
 * Validates rules about a new pool.
 */
public interface PoolValidator {

	/**
	 * Checks a rule and throws a {@link RuleViolationException} if an error is detected.
	 * 
	 * @param players
	 * @param season
	 */
	void validate(Set<Player> players, Season season) throws RuleViolationException;

	/**
	 * A rule violation.
	 */
	public class RuleViolationException extends Exception {
		private static final long serialVersionUID = -3501483500806620322L;

		public RuleViolationException(String err) {
			super(err);
		}
	}
}
