package com.jeff.survivor;

public class User {
	private String username;
	private boolean isAdmin;
	private byte[] salt;
	private byte[] passwordHash;

	public User(String username) {
		this.username = username;
	}

	public User(String username, boolean isAdmin, byte[] salt, byte[] passwordHash) {
		this.username = username;
		this.isAdmin = isAdmin;
		this.salt = salt;
		this.passwordHash = passwordHash;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public byte[] getSalt() {
		return salt;
	}

	public void setSalt(byte[] salt) {
		this.salt = salt;
	}

	public byte[] getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(byte[] passwordHash) {
		this.passwordHash = passwordHash;
	}

	@Override
	public int hashCode() {
		return username.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		else if (!(obj instanceof User))
			return false;
		else
			return this.username.equals(((User) obj).username);
	}
}
