package com.jeff.survivor.user;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeff.survivor.User;
import com.jeff.survivor.user.PasswordHash.PasswordResult;

/**
 * The user management module is responsible for storing user details,
 * authentication, and session management.
 */
//@Service
public class UserManagementService {

	private static final String ENC = "UTF-8";

	private UserRepository repository;
	private PasswordHash hasher = new PasswordHash();

	@Autowired
	public UserManagementService(UserRepository repository) {
		this.repository = repository;
	}

	/**
	 * Create a new user.
	 * 
	 * @param username
	 * @param password
	 * @return true if success.
	 */
	public boolean create(String username, String password, boolean isAdmin) {
		try {
			PasswordResult pwr = hasher.create(password.getBytes(ENC));
			if (pwr != null) {
				repository.save(new User(username, isAdmin, pwr.getSalt(), pwr.getPasswordHash()));
			}
			return pwr != null;
		} catch (UnsupportedEncodingException e) {
			return false;
		}
	}

	/**
	 * Attempt to authenticate a user.
	 * 
	 * @param username
	 * @param password
	 * @return user
	 */
	public User authenticate(String username, String password) {
		User user = repository.fetchByUsername(username);
		if (user != null) {
			try {
				byte[] hash = hasher.hash(user.getSalt(), password.getBytes(ENC));
				if (Arrays.equals(hash, user.getPasswordHash())) {
					return user;
				}

			} catch (Exception e) {
				// TODO: metrics
			}
		}
		return null;
	}
}
