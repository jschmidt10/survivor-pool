package com.jeff.survivor.pool.valid;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Checks if an assigned castaway is not in the show.
 */
@Component
public class UnknownCastaways implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		List<Contestant> contestants = pool
				.getPlayers()
				.stream()
				.flatMap((p) -> p.getContestants().stream())
				.collect(Collectors.toList());

		boolean isUnknown = contestants
			.stream()
			.anyMatch((c) -> !season.getContestants().contains(c));
		
		if (isUnknown) {
			throw new RuleViolationException("Found an unknown castaway");
		}
	}
}
