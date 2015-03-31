package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

public class FixConditionVo {

	
	private String fixConditionId;//安装条件准备编号
	private long fixConditionFlag;//安装准备
	private String depcode;//指派单位(选择单位)
	private String assignTime;//指派时间
	private String assignAchieveTime;//完成时间
	private String fixConditionText;//安装条件准备说明
	private String vendorId;//供应商id
	private String tenderStartTime;//招标开始时间
	private String tenderEndTime;//招标结束时间
	private String acceptId;//验收任务管理表编号
	
	private String departmentName;//部门名称
	private String vendorName;//供应商名称
	private String inputValue;//输入的查询内容
	private String inputValueNum;//输入的查询内容编号
	private int start;//起始
	private int limit;//结束

	public String getFixConditionId() {
		return fixConditionId;
	}

	public void setFixConditionId(String fixConditionId) {
		this.fixConditionId = fixConditionId;
	}

	public long getFixConditionFlag() {
		return fixConditionFlag;
	}

	public void setFixConditionFlag(long fixConditionFlag) {
		this.fixConditionFlag = fixConditionFlag;
	}

	public String getAssignTime() {
		return assignTime;
	}

	public void setAssignTime(String assignTime) {
		this.assignTime = assignTime;
	}

	public String getAssignAchieveTime() {
		return assignAchieveTime;
	}

	public void setAssignAchieveTime(String assignAchieveTime) {
		this.assignAchieveTime = assignAchieveTime;
	}

	public String getFixConditionText() {
		return fixConditionText;
	}

	public void setFixConditionText(String fixConditionText) {
		this.fixConditionText = fixConditionText;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public String getTenderStartTime() {
		return tenderStartTime;
	}

	public void setTenderStartTime(String tenderStartTime) {
		this.tenderStartTime = tenderStartTime;
	}

	public String getTenderEndTime() {
		return tenderEndTime;
	}

	public void setTenderEndTime(String tenderEndTime) {
		this.tenderEndTime = tenderEndTime;
	}

	public String getAcceptId() {
		return acceptId;
	}

	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getInputValue() {
		return inputValue;
	}

	public void setInputValue(String inputValue) {
		this.inputValue = inputValue;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getDepcode() {
		return depcode;
	}

	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getInputValueNum() {
		return inputValueNum;
	}

	public void setInputValueNum(String inputValueNum) {
		this.inputValueNum = inputValueNum;
	}
}
