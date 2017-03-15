package com.jeff.survivor.pool.valid;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import github.jschmidt10.survivor.api.Player;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

/**
 * Makes sure all players have at least one contestant assigned.
 */
@Component
public class NonEmptyPlayers implements PoolValidator {

	@Override
	public void validate(Pool pool, Season season) throws RuleViolationException {
		List<Player> emptyPlayers = pool
				.getPlayers()
				.stream()
				.filter((p) -> p.getContestants().isEmpty())
				.collect(Collectors.toList());
		
		if (!emptyPlayers.isEmpty()) {
			throw new RuleViolationException("Cannot have players with no castaways");
		}
	}

}
