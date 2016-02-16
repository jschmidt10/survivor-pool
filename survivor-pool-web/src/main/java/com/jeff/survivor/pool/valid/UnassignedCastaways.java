package com.jeff.survivor.pool.valid;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Checks if a castaway was not assigned.
 */
@Component
public class UnassignedCastaways implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		Set<Contestant> assignedContestants = pool
				.getPlayers()
				.stream()
				.flatMap((p) -> p.getContestants().stream())
				.collect(Collectors.toSet());
		
		boolean isUnassigned = season
			.getContestants()
			.stream()
			.anyMatch((c) -> !assignedContestants.contains(c));
		
		if (isUnassigned) {
			throw new RuleViolationException("Must assign all castaways");
		}
	}
}
