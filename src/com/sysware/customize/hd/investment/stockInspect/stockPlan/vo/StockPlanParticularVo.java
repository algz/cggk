package com.sysware.customize.hd.investment.stockInspect.stockPlan.vo;

public class StockPlanParticularVo {

	public Double getAmount() {
		return amount;
	}

	public Double getQuantity() {
		return quantity;
	}

	//申报计划ID
	private String declareplan_id;
	//申报计划名称
	private String declareplan_name;
	//编号为9为流水号
	private String declareplan_code;
	//金额
	private Double amount;
	//项数
	private Double quantity;
	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	//状态 1编制中2待审批3审批中4已审批
	private String status;
	//编制人
	private String editer;
	//编制人名称
	private String userName;
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	//编制时间
	private String editdate;
	//送审时间
	private String senddate;
	
	//采购计划ID
	private String procurementplan_id;
	
	//采购计划两张字表中的编号字段
	private String procurementplan_detil;
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;

	public String getDeclareplan_id() {
		return declareplan_id;
	}

	public void setDeclareplan_id(String declareplanId) {
		declareplan_id = declareplanId;
	}

	public String getDeclareplan_name() {
		return declareplan_name;
	}

	public void setDeclareplan_name(String declareplanName) {
		declareplan_name = declareplanName;
	}

	public String getDeclareplan_code() {
		return declareplan_code;
	}

	public void setDeclareplan_code(String declareplanCode) {
		declareplan_code = declareplanCode;
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

	public String getProcurementplan_id() {
		return procurementplan_id;
	}

	public void setProcurementplan_id(String procurementplanId) {
		procurementplan_id = procurementplanId;
	}

	public String getProcurementplan_detil() {
		return procurementplan_detil;
	}

	public void setProcurementplan_detil(String procurementplanDetil) {
		procurementplan_detil = procurementplanDetil;
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
