package com.sysware.customize.hd.investment.exception;

public class NoIsMicroSoftExcelException extends Exception {

	/**
	 * 文件异常,检查上传文件是否是Excel后缀名
	 */
	private static final long serialVersionUID = 7670653402844881196L;
	
	private String exceptionMessage;
	
	public NoIsMicroSoftExcelException(){
		super();
	}
	
	public NoIsMicroSoftExcelException(String exceptionMessage) {
		super(exceptionMessage);
		this.exceptionMessage = exceptionMessage;
	}
	

	public String getExceptionMessage() {
		return exceptionMessage;
	}

	public void setExceptionMessage(String exceptionMessage) {
		this.exceptionMessage = exceptionMessage;
	}
	
	
}
