package com.jeff.survivor.user;

import com.jeff.survivor.User;

/**
 * Stores user information.
 */
public interface UserRepository {

	/**
	 * Fetch the user
	 * 
	 * @param username
	 * @return user
	 */
	User fetchByUsername(String username);

	/**
	 * Save a user
	 * 
	 * @param user
	 * @return true if success
	 */
	boolean save(User user);
}
