package github.jschmidt10.survivor;

import java.util.concurrent.Callable;

/**
 * A response from the rest endpoint.
 */
public class RestResponse {

	/**
	 * Execute a block of code and form a response.
	 * @param callable
	 * @return
	 */
	public static RestResponse run(Callable<?> callable) {
		try {
			return RestResponse.success(callable.call());
		}
		catch (Exception e) {
			e.printStackTrace();
			return RestResponse.failure(e.getMessage());
		}
	}
	
	/**
	 * Successful response.
	 * @param data
	 * @return response
	 */
	public static RestResponse success(Object data) {
		return new RestResponse(true, "", data);
	}
	
	/**
	 * Failure response.
	 * @param errorMessage
	 * @return response
	 */
	public static RestResponse failure(String errorMessage) {
		return new RestResponse(false, errorMessage, null);
	}
	
	private boolean success;
	private String errorMessage;
	private Object data;
	
	public RestResponse(boolean success, String errorMessage, Object data) {
		this.success = success;
		this.errorMessage = errorMessage;
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public Object getData() {
		return data;
	}

	@Override
	public String toString() {
		return String.format("(success:%s,errorMesage:%s,data:%s)", success, errorMessage, data);
	}
}
