package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

public class AcceptTaskVo {
	private String acceptId;
	private String contractId;
	private long acceptType;
	private long acceptState;
	private String acceptTime;
	private String acceptNote;
	private String acceptCreatePeopel;//验收任务编制人信息
	private String projectcategorys;//项目类别
	private String acceptNum;
	private String startTime;
	private String endTime;
	private int limit;
	private int start;
	
	private long assetConnectDay;//资产交接天数
	private long testDay;//验收天数
	private long rendTestDay;//开箱验收天数
	private long beforehandTestDay;//预验收天数
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	
	
	public String getProjectcategorys() {
		return projectcategorys;
	}
	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}
	//编号组合
	private String acceptIds;
	
	public String getAcceptNum() {
		return acceptNum;
	}
	public void setAcceptNum(String acceptNum) {
		this.acceptNum = acceptNum;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public long getAcceptType() {
		return acceptType;
	}
	public void setAcceptType(long acceptType) {
		this.acceptType = acceptType;
	}
	public long getAcceptState() {
		return acceptState;
	}
	public void setAcceptState(long acceptState) {
		this.acceptState = acceptState;
	}
	public String getAcceptNote() {
		return acceptNote;
	}
	public void setAcceptNote(String acceptNote) {
		this.acceptNote = acceptNote;
	}
	public String getAcceptTime() {
		return acceptTime;
	}
	public void setAcceptTime(String acceptTime) {
		this.acceptTime = acceptTime;
	}
	public String getAcceptIds() {
		return acceptIds;
	}
	public void setAcceptIds(String acceptIds) {
		this.acceptIds = acceptIds;
	}
	public String getAcceptCreatePeopel() {
		return acceptCreatePeopel;
	}
	public void setAcceptCreatePeopel(String acceptCreatePeopel) {
		this.acceptCreatePeopel = acceptCreatePeopel;
	}
	public long getAssetConnectDay() {
		return assetConnectDay;
	}
	public void setAssetConnectDay(long assetConnectDay) {
		this.assetConnectDay = assetConnectDay;
	}
	public long getTestDay() {
		return testDay;
	}
	public void setTestDay(long testDay) {
		this.testDay = testDay;
	}
	public long getRendTestDay() {
		return rendTestDay;
	}
	public void setRendTestDay(long rendTestDay) {
		this.rendTestDay = rendTestDay;
	}
	public long getBeforehandTestDay() {
		return beforehandTestDay;
	}
	public void setBeforehandTestDay(long beforehandTestDay) {
		this.beforehandTestDay = beforehandTestDay;
	}
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
	
}
