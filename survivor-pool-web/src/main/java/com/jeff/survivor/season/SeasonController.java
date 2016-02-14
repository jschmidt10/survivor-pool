package com.jeff.survivor.season;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jeff.survivor.RestResponse;

@RestController
@RequestMapping("season")
public class SeasonController {

	private static Log logger = LogFactory.getLog(SeasonController.class);

	private SeasonService service;

	@Autowired
	public SeasonController(SeasonService service) {
		this.service = service;
	}

	@RequestMapping(value = "current", method = RequestMethod.GET)
	public RestResponse fetchCurrent() {
		try {
			return RestResponse.success(service.getCurrent());
		} catch (Exception e) {
			return RestResponse.failure("Could not get current season");
		}
	}

	// @RequestMapping(value = "season/admin", method = RequestMethod.POST)
	// public RestResponse createCurrent(@RequestParam String name,
	// @RequestParam List<Map<String, String>> contestants) {
	// Map<String, String> c = contestants
	// .stream()
	// .map((m) -> new String[] { m.get("name"), m.get("pic") } )
	// .collect(Collectors.toMap((a) -> a[0], (a) -> a[1]));
	//
	// try {
	// return RestResponse.success(service.createCurrent(name, c));
	// }
	// catch (Exception e) {
	// logger.error("Failed to create season", e);
	// return RestResponse.failure("Failed to create season");
	// }
	// }
}
