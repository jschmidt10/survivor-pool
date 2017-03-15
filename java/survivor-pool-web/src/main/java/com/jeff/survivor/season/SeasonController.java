package com.jeff.survivor.season;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
}
