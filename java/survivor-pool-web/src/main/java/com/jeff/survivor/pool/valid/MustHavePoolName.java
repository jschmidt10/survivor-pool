package com.jeff.survivor.pool.valid;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Checks if a parsing error occurred.
 */
@Component
public class MustHavePoolName implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		if (pool.getName() == null) {
			throw new RuleViolationException("You must name your pool!");
		}
	}
}
