package com.jeff.survivor.user;

import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jeff.survivor.RestResponse;
import com.jeff.survivor.User;

//@RestController
//@RequestMapping("auth")
public class AuthController {

	private UserManagementService userManagement;

	@Autowired
	public AuthController(UserManagementService userManagement) {
		this.userManagement = userManagement;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public RestResponse authenticate(@RequestParam String username, @RequestParam String password,
			HttpSession session) {
		User user = userManagement.authenticate(username, password);
		session.setAttribute("user", user);

		Map<String, Object> result = new TreeMap<>();
		result.put("success", user != null);
		result.put("username", user.getUsername());
		return RestResponse.success(result);
	}
}
