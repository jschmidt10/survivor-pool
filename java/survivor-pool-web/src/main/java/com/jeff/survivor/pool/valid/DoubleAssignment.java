package com.jeff.survivor.pool.valid;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Checks if a castaway was double-assigned.
 */
@Component
public class DoubleAssignment implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		List<Contestant> contestants = pool
				.getPlayers()
				.stream()
				.flatMap((p) -> p.getContestants().stream())
				.collect(Collectors.toList());
		
		Set<Contestant> distinct = contestants.stream().collect(Collectors.toSet());
		
		if (distinct.size() != contestants.size()) {
			throw new RuleViolationException("Cannot assign the same castaway to multiple players");
		}
	}
}
