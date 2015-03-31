package com.sysware.customize.hd.investment.investSupport.vo;

/**
 * @ClassName: DamandVo
 * @Description: 合同资讯中 的需求信息模块 VO类
 * 
 * @author LIT
 * @date Nov 25, 2011 3:20:02 PM
 * 
 */

public class DamandVo {
	private String code;
	private String name;
	private String partType;
	private String declareNum;
	private String bankrollBudget;
	private String declareDept;
	private String feasibilityReport;
	private String fileName;
	private String fileId;
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPartType() {
		return partType;
	}

	public void setPartType(String partType) {
		this.partType = partType;
	}

	public String getDeclareNum() {
		return declareNum;
	}

	public void setDeclareNum(String declareNum) {
		this.declareNum = declareNum;
	}

	public String getBankrollBudget() {
		return bankrollBudget;
	}

	public void setBankrollBudget(String bankrollBudget) {
		this.bankrollBudget = bankrollBudget;
	}

	public String getDeclareDept() {
		return declareDept;
	}

	public void setDeclareDept(String declareDept) {
		this.declareDept = declareDept;
	}

	public String getFeasibilityReport() {
		return feasibilityReport;
	}

	public void setFeasibilityReport(String feasibilityReport) {
		this.feasibilityReport = feasibilityReport;
	}

}
