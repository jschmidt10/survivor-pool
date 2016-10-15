package com.jeff.survivor.metrics;

import java.io.Closeable;
import java.util.Map;

/**
 * A service for collecting application metrics.
 */
public interface MetricsService extends Closeable {
	
	/**
	 * Sends a metric.
	 * @param namespace
	 * @param name
	 * @param value
	 * @param dimensions
	 */
	void sendMetric(String namespace, String name, double value, Map<String, String> dimensions);
}
