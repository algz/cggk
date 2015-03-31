package com.sysware.customize.hd.investment.fixedAssetsAccept.lastTest;

import java.util.Date;

public class LastTestVo {

	private String lastTestId;//最终验收编号
	private String lastTestNum;//验收报告（录入编号）
	private String lastTestTime;//验收时间
	private String lastTestRemark;//验收情况
	private String acceptId;//验收任务管理编号
	
	public String getLastTestId() {
		return lastTestId;
	}
	public void setLastTestId(String lastTestId) {
		this.lastTestId = lastTestId;
	}
	public String getLastTestNum() {
		return lastTestNum;
	}
	public void setLastTestNum(String lastTestNum) {
		this.lastTestNum = lastTestNum;
	}
	public String getLastTestTime() {
		return lastTestTime;
	}
	public void setLastTestTime(String lastTestTime) {
		this.lastTestTime = lastTestTime;
	}
	public String getLastTestRemark() {
		return lastTestRemark;
	}
	public void setLastTestRemark(String lastTestRemark) {
		this.lastTestRemark = lastTestRemark;
	}
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
}
