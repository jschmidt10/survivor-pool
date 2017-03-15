package com.jeff.survivor.pool.valid;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Checks if a parsing error occurred.
 */
@Component
public class PoolParsingFailure implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		if (pool == null || pool.getPlayers() == null) {
			throw new RuleViolationException("We had a problem processing you request. Please refresh the page and try again.");
		}
	}
}
