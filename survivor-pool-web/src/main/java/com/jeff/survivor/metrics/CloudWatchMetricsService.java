package com.jeff.survivor.metrics;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.amazonaws.services.cloudwatch.AmazonCloudWatch;
import com.amazonaws.services.cloudwatch.AmazonCloudWatchClient;
import com.amazonaws.services.cloudwatch.model.Dimension;
import com.amazonaws.services.cloudwatch.model.ListMetricsRequest;
import com.amazonaws.services.cloudwatch.model.ListMetricsResult;
import com.amazonaws.services.cloudwatch.model.Metric;
import com.amazonaws.services.cloudwatch.model.MetricDatum;
import com.amazonaws.services.cloudwatch.model.PutMetricDataRequest;
import com.amazonaws.services.cloudwatch.model.StandardUnit;
import com.amazonaws.services.cloudwatch.model.StatisticSet;

/**
 * A {@link MetricsService} that is backed by AWS CloudWatch.
 */
public class CloudWatchMetricsService implements MetricsService {

	private AmazonCloudWatch cloudwatch = new AmazonCloudWatchClient();

	@Override
	public void sendMetric(String namespace, String name, double value, Map<String, String> dimensions) {
		PutMetricDataRequest request = new PutMetricDataRequest()
			.withNamespace(namespace)
			.withMetricData(createMetric(name, value, dimensions));
		
		cloudwatch.putMetricData(request);
	}

	private MetricDatum createMetric(String name, double value, Map<String, String> dimensions) {
		MetricDatum datum = new MetricDatum();
		
		datum
			.withMetricName(name)
			.withValue(value)
			.withUnit(StandardUnit.Count)
			.withDimensions(getDims(dimensions));
		
		System.out.println("Set value to " + datum.getValue());
		
		return datum;
	}

	private Collection<Dimension> getDims(Map<String, String> dimensions) {
		return dimensions
			.entrySet()
			.stream()
			.map((e) -> new Dimension().withName(e.getKey()).withValue(e.getValue()))
			.collect(Collectors.toList());
	}
	
	@Override
	public void close() throws IOException {
		cloudwatch.shutdown();
	}
}
