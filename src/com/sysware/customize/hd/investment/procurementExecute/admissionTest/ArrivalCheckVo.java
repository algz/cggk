package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

public class ArrivalCheckVo {

	/**
	 *登记表ID
	 * */
	private String registrationIds;
	/**
	 *检验状态：0登记；1理化；2检测报告合格；3检测报告不合格；4意见书重检；5意见书退货；6已退货；7已入库
	 * */
	private char checkStatus;
	
	public String getRegistrationIds() {
		return registrationIds;
	}
	public void setRegistrationIds(String registrationIds) {
		this.registrationIds = registrationIds;
	}
	public char getCheckStatus() {
		return checkStatus;
	}
	public void setCheckStatus(char checkStatus) {
		this.checkStatus = checkStatus;
	}
}
