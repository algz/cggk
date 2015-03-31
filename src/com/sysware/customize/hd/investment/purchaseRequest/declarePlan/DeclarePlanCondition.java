package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.util.Date;

/**
 * 申报计划查询条件
 * @author fanzhihui
 *
 */
public class DeclarePlanCondition {

	private int start;// 分页开始
	private int limit;// 分页条数
	private String departmentName;//部门名称
	private String departmentId;//部门id
	private String totalCount;//总项数
	private String totalAmount;//总金额
	private String use;//采购用途
	private String status;// 状态 1编制中2待审批3审批中4已审批
	private String editer;// 编制人
	private String editDate;// 编制时间
	private String declareplanType;//采购类型
	private String minAmount;//金额最小值
	private String maxAmount;//金额最大值
	
	public String getDeclareplanType() {
		return declareplanType;
	}
	public void setDeclareplanType(String declareplanType) {
		this.declareplanType = declareplanType;
	}
	public String getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(String minAmount) {
		this.minAmount = minAmount;
	}
	public String getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(String maxAmount) {
		this.maxAmount = maxAmount;
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
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	public String getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getUse() {
		return use;
	}
	public void setUse(String use) {
		this.use = use;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEditer() {
		return editer;
	}
	public void setEditer(String editer) {
		this.editer = editer;
	}
	public String getEditDate() {
		return editDate;
	}
	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}

}
