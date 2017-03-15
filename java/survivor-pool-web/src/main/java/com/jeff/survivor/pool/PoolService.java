package com.jeff.survivor.pool;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeff.survivor.pool.valid.PoolValidator;
import com.jeff.survivor.pool.valid.PoolValidator.RuleViolationException;

import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.Season;
import github.jschmidt10.survivor.api.repo.PoolRepository;
import github.jschmidt10.survivor.api.repo.SeasonRepository;

/**
 * Creates and finds survivor pools.
 */
@Service
public class PoolService {

	private static final String ENCODING = "UTF-8";
	
	private PoolRepository poolRepository;
	private SeasonRepository seasonRepository;
	private List<PoolValidator> validators;
	
	@Autowired
	public PoolService(PoolRepository poolRepository, SeasonRepository seasonRepository, List<PoolValidator> validators) {
		this.poolRepository = poolRepository;
		this.seasonRepository = seasonRepository;
		this.validators = validators;
	}

	/**
	 * Creates a new pool
	 * 
	 * @param pool
	 * @return
	 * @throws UnsupportedEncodingException 
	 * @throws RuleViolationException 
	 */
	public boolean createPool(Pool pool) throws UnsupportedEncodingException, RuleViolationException {
		Season season = seasonRepository.getCurrent();

		validate(pool, season);

		String url = URLEncoder.encode(pool.getName(), ENCODING);
		pool.setUrl(url);

		return poolRepository.save(pool);
	}

	/**
	 * Validates player assignments are valid
	 * @param pool
	 * @param season
	 * @throws RuleViolationException
	 */
	private void validate(Pool pool, Season season) throws RuleViolationException {
		for (PoolValidator validator : validators) {
			validator.validate(pool, season);
		}
	}

	/**
	 * Get pools by name (or all of them if no name is given).
	 * 
	 * @param name
	 * @return
	 */
	public Iterable<Pool> getByName(String name) {
		if (name == null || name.isEmpty()) {
			return poolRepository.getAll();
		} else {
			return Collections.singleton(poolRepository.getByName(name));
		}
	}
}