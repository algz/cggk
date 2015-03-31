package com.sysware.customize.hd.investment.general.exception;

/**
 * 对象已重复异常
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-21
 * 
 */
public class ReduplicatedException extends Exception {

	private static final long serialVersionUID = -220564708828620221L;

	public ReduplicatedException() {

	}

	public ReduplicatedException(String msg) {
		super(msg);
	}
}
