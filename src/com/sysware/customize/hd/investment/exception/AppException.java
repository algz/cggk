package com.sysware.customize.hd.investment.exception;



/**
 * 系统应用级异常
 * @author Administrator
 *
 */
public class AppException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private String message;

	public AppException() {
		super();
	}

	public AppException(String message) {
		super(message);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
