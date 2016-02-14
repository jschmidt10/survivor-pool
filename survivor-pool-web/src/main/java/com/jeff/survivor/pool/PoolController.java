package com.jeff.survivor.pool;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jeff.survivor.RestResponse;

import github.jschmidt10.survivor.api.Pool;

@RestController
@RequestMapping("pool")
public class PoolController {

	private static Log logger = LogFactory.getLog(PoolController.class);

	private PoolService service;

	@Autowired
	public PoolController(PoolService service) {
		this.service = service;
	}

	/**
	 * Finds a pool by its name.
	 * @param name
	 */
	@RequestMapping(method = RequestMethod.GET)
	public RestResponse find(@RequestParam String name) {
		try {
			Iterable<Pool> pools = service.getByName(name);
			return RestResponse.success(pools.iterator().next());
		} catch (Exception e) {
			logger.error("Failed to fetch pools", e);
			return RestResponse.failure("Failed to fetch pools");
		}
	}
	
	/**
	 * Search for any pools where the name partially matches.
	 * @param name
	 */
	@RequestMapping(value = "search", method = RequestMethod.GET)
	public RestResponse search(@RequestParam(required = false) String name) {
		try {
			return RestResponse.success(service.getByName(name));
		} catch (Exception e) {
			logger.error("Failed to fetch pools", e);
			return RestResponse.failure("Failed to fetch pools");
		}
	}

	/**
	 * Creates a new pool.
	 * @param name
	 * @param ownerEmail
	 * @param players
	 */
	@RequestMapping(method = RequestMethod.POST)
	public RestResponse create(@RequestBody Pool pool) {
		try {
			service.createPool(pool);
			return RestResponse.success(pool);
		} catch (Exception e) {
			logger.error("Failed to create pool", e);
			return RestResponse.failure(e.getMessage());
		}
	}
}
