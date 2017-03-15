package com.jeff.survivor.season;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import github.jschmidt10.survivor.api.Contestant;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.SeasonRepository;

/**
 * Handles creating new survivor seasons.
 */
@Service
public class SeasonService {

	private static Log logger = LogFactory.getLog(SeasonService.class);

	private SeasonRepository repository;

	@Autowired
	public SeasonService(SeasonRepository repository) {
		this.repository = repository;
	}

	/**
	 * Gets the current season
	 * @return current season
	 */
	public Season getCurrent() {
		return repository.getCurrent();
	}

	/**
	 * Creates a new season
	 * 
	 * @param name
	 * @param contestants
	 */
	public boolean createCurrent(String name, Map<String, String> contestants) {
		Set<Contestant> c = contestants.entrySet().stream().map((e) -> new Contestant(e.getKey(), e.getValue()))
				.collect(Collectors.toSet());

		return repository.save(new Season(name, true, c));
	}

	/**
	 * Updates the latest eliminated survivor
	 * 
	 * @param contestant
	 */
	public void eliminateContestant(String contestant) {
		Season season = repository.getCurrent();

		if (season != null) {
			season.eliminate(contestant);
		}
	}
}
