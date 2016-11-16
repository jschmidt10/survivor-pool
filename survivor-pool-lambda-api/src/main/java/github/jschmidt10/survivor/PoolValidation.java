package github.jschmidt10.survivor;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Player;
import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Methods for validating survivor pools.
 */
public class PoolValidation {

    /**
     * Runs all the current validation rules.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void validate(Pool pool, Season season) throws RuleViolationException {
        poolIsNamed(pool, season);
        noUnassignedContestants(pool, season);
        noDoubleAssignment(pool, season);
        allPlayersHaveContestants(pool, season);
        allValidContestants(pool, season);
    }

    /**
     * Tests that no contestant is assigned to more than one player.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void noDoubleAssignment(Pool pool, Season season) throws RuleViolationException {
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

    /**
     * Tests that pool is named.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void poolIsNamed(Pool pool, Season season) throws RuleViolationException {
        if (pool.getName() == null) {
            throw new RuleViolationException("You must name your pool!");
        }
    }

    /**
     * Tests that all players have at least one contestant assigned.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void allPlayersHaveContestants(Pool pool, Season season) throws RuleViolationException {
        List<Player> emptyPlayers = pool
                .getPlayers()
                .stream()
                .filter((p) -> p.getContestants().isEmpty())
                .collect(Collectors.toList());

        if (!emptyPlayers.isEmpty()) {
            throw new RuleViolationException("Cannot have players with no castaways");
        }
    }

    /**
     * Tests that no contestants are unassigned.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void noUnassignedContestants(Pool pool, Season season) throws RuleViolationException {
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

    /**
     * Tests that all assigned contestants are actually in the season.
     *
     * @param pool
     * @param season
     * @throws RuleViolationException
     */
    public static void allValidContestants(Pool pool, Season season) throws RuleViolationException {
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

    /**
     * A rule violation.
     */
    public static class RuleViolationException extends Exception {
        private static final long serialVersionUID = -3501483500806620322L;

        public RuleViolationException(String err) {
            super(err);
        }
    }
}
