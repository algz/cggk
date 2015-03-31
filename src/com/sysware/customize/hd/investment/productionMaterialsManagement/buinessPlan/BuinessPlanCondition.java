package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

public class BuinessPlanCondition {

	/**
	 * 计划ID
	 */
	private String buinessPlanId;
	/**
	 * 编制人，即当前登录用户
	 */
	private String author;
	/**
	 * 编制日期，即导入的时间
	 */
	private String createDate;
	/**
	 * 0表示零星计划；1表示年度经营计划；2表示季度经营计划；3表示月度经营计划
	 */
	private String planType;
	/**
	 * 下发日期
	 */
	private String issuedDate;
	/**
	 * 0编制中，1已下发，本系统不对该属性做操作
	 */
	private String planStatus;
	/**
	 * 备注
	 */
	private String remarks;
	/**
	 * 计划名称
	 */
	private String buinessPlanName;

	private int start;// 分页开始
	private int limit;// 每页页列表数

	public String getBuinessPlanId() {
		return buinessPlanId;
	}

	public void setBuinessPlanId(String buinessPlanId) {
		this.buinessPlanId = buinessPlanId;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	public String getIssuedDate() {
		return issuedDate;
	}

	public void setIssuedDate(String issuedDate) {
		this.issuedDate = issuedDate;
	}

	public String getPlanStatus() {
		return planStatus;
	}

	public void setPlanStatus(String planStatus) {
		this.planStatus = planStatus;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getBuinessPlanName() {
		return buinessPlanName;
	}

	public void setBuinessPlanName(String buinessPlanName) {
		this.buinessPlanName = buinessPlanName;
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

}
