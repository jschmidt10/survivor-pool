package com.jeff.survivor.pool;

import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import github.jschmidt10.survivor.api.Pool;
import github.jschmidt10.survivor.api.repo.PoolRepository;

/**
 * Persistence operations for survivor pools backed by in-memory data
 * structures.
 */
//@Repository
public class LocalPoolRepository implements PoolRepository {

	private List<Pool> pools = new LinkedList<>();

	@Override
	public boolean save(Pool pool) {
		return pools.add(pool);
	}

	@Override
	public Pool getByName(String name) {
		return pools.stream().filter((p) -> p.getName().equals(name)).findFirst().orElse(null);
	}

	@Override
	public List<Pool> getAll() {
		return Collections.unmodifiableList(pools);
	}

	@Override
	public void close() throws IOException {
		// TODO Auto-generated method stub
	}
}
