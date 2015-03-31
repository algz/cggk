package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.util.Date;

public class StockInspectVo {

	
	//采购计划ID
	private String procurementplan_id;
	//采购计划名称
	private String procurementplan_name;
	//采购计划编号
	private String procurementplan_code;
	//项数
	private Double procurementplan_quantity;
	//金额
	private Double amount;
	//编制人
	private String editer;
	//编制时间（批准时间）
	private String editdate;
	//送审时间
	private String senddate;
	//计划类型。1固定资产计划2其他计划。 固定资产计划（1，土建及设备大修2，机电设备3车辆 ）
	private String plantype;
	//状态
	private String status;
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	//判断所选择的符号
	private String judgment;
	private String userName;//用户名称
//	资金来源
	private String fundsource;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	 
	public String getEditer() {
		return editer;
	}
	public void setEditer(String editer) {
		this.editer = editer;
	}
	public String getPlantype() {
		return plantype;
	}
	public void setPlantype(String plantype) {
		this.plantype = plantype;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public String getProcurementplan_id() {
		return procurementplan_id;
	}
	public void setProcurementplan_id(String procurementplanId) {
		procurementplan_id = procurementplanId;
	}
	public String getProcurementplan_name() {
		return procurementplan_name;
	}
	public void setProcurementplan_name(String procurementplanName) {
		procurementplan_name = procurementplanName;
	}
	public String getProcurementplan_code() {
		return procurementplan_code;
	}
	public void setProcurementplan_code(String procurementplanCode) {
		procurementplan_code = procurementplanCode;
	}
	 
	public Double getProcurementplan_quantity() {
		return procurementplan_quantity;
	}
	public void setProcurementplan_quantity(Double procurementplanQuantity) {
		procurementplan_quantity = procurementplanQuantity;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getEditdate() {
		return editdate;
	}
	public void setEditdate(String editdate) {
		this.editdate = editdate;
	}
	public String getSenddate() {
		return senddate;
	}
	public void setSenddate(String senddate) {
		this.senddate = senddate;
	}
	public String getJudgment() {
		return judgment;
	}
	public void setJudgment(String judgment) {
		this.judgment = judgment;
	}
	public String getFundsource() {
		return fundsource;
	}
	public void setFundsource(String fundsource) {
		this.fundsource = fundsource;
	}

}
