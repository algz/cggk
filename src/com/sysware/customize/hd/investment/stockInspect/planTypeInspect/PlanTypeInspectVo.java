package com.sysware.customize.hd.investment.stockInspect.planTypeInspect;

public class PlanTypeInspectVo {

	//申报计划ID
	private String declareplan_id;
	//申报计划名称
	private String declareplan_name;
	//编号为9为流水号
	private String declareplan_code;
	//金额
	private long amount;
	//项数
	private long quantity;
	//状态 1编制中2待审批3审批中4已审批
	private String status;
	//编制人
	private String editer;
	//编制时间
	private String editdate;
	//送审时间
	private String senddate;
	
	//时间判断 开始
	private String dateStart;
	//时间判断 结束
	private String dateEnd;
	
	//金额统计数据
	private Long ramount;
	//项数统计数据
	private Long rquantity;
	//判断返回的是做总数统计还是按采购类型做的统计（0：总数，1：计划内，2：应急，3：非应急）
	private long type;
	//判断返回的是做总数统计还是按采购类型做的统计（0：总数，1：计划内，2：应急，3：非应急）
	private String typeName;
	
	//金额占所有的百分比
	private int amountPercent;
	//项数占所有的百分比
	private int quantityPercent;
	
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
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
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
	public long getType() {
		return type;
	}
	public void setType(long type) {
		this.type = type;
	}
	public int getAmountPercent() {
		return amountPercent;
	}
	public void setAmountPercent(int amountPercent) {
		this.amountPercent = amountPercent;
	}
	public int getQuantityPercent() {
		return quantityPercent;
	}
	public void setQuantityPercent(int quantityPercent) {
		this.quantityPercent = quantityPercent;
	}
	public Long getRamount() {
		return ramount;
	}
	public void setRamount(Long ramount) {
		this.ramount = ramount;
	}
	public Long getRquantity() {
		return rquantity;
	}
	public void setRquantity(Long rquantity) {
		this.rquantity = rquantity;
	}
	public String getDateStart() {
		return dateStart;
	}
	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}
	public String getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
}
