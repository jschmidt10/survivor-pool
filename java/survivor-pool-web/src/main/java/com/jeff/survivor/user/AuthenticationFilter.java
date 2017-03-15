package com.jeff.survivor.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Ensures that the user has been authenticated if accessing admin methods.
 */
//@Component
public class AuthenticationFilter extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (!isAdminMethod(request.getRequestURI())) {
			return true;
		} else {
			try {
				HttpSession session = request.getSession();
				boolean success = Boolean.parseBoolean(session.getAttribute("success").toString());
				boolean userPresent = session.getAttribute("username") != null;
				return success && userPresent;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
	}

	private boolean isAdminMethod(String path) {
		return path.contains("admin");
	}
}
