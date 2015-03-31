package com.sysware.customize.hd.investment.general.exception;

/**
 * 导入Excel文件异常
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-25
 * 
 */
public class ImportExcelFileException extends RuntimeException {

	private static final long serialVersionUID = 8528511350558806709L;
	
	private String jsonResultMsg;// JSON形式的结果信息

	public ImportExcelFileException() {

	}

	public ImportExcelFileException(String msg) {
		super(msg);
	}

	public String getJsonResultMsg() {
		return jsonResultMsg;
	}

	public void setJsonResultMsg(String jsonResultMsg) {
		this.jsonResultMsg = jsonResultMsg;
	}
	
}
