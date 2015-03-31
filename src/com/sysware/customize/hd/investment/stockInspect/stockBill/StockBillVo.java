package com.sysware.customize.hd.investment.stockInspect.stockBill;

public class StockBillVo {

	//采购申报表ID
	private String declare_detil_id;
	//物资信息ID
	private String material_id;
	//物资类别
	private String materialcatalog_name;
	//数量
	private String quantity;
	//资金预算
	private String amount;
	//采购用途
	private String use;
	//使用时间
	private String usedate;
	//可行性分析报告
	private String filename;
	//所属申请记录
	private String declare_id;
	//是否成功通过申报，0未提交，1已提交，2未通过，3通过
	private String declare_detil_status;
	//未通过原因
	private String reason;
	//采购类型，1计划内2应急3非应急
	private String declare_type;
	//可行性分析报告id
	private String fileid;
	
	//物料编号
	private String materialitemcode;
	//物料名称
	private String materialitemname;
	//物料规格
	private String materialstandard;
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	
	//时间判断 开始
	private String dateStart;
	//时间判断 结束
	private String dateEnd;
	
	public String getDeclare_detil_id() {
		return declare_detil_id;
	}
	public void setDeclare_detil_id(String declareDetilId) {
		declare_detil_id = declareDetilId;
	}
	public String getMaterial_id() {
		return material_id;
	}
	public void setMaterial_id(String materialId) {
		material_id = materialId;
	}
	public String getMaterialcatalog_name() {
		return materialcatalog_name;
	}
	public void setMaterialcatalog_name(String materialcatalogName) {
		materialcatalog_name = materialcatalogName;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getUse() {
		return use;
	}
	public void setUse(String use) {
		this.use = use;
	}
	public String getUsedate() {
		return usedate;
	}
	public void setUsedate(String usedate) {
		this.usedate = usedate;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getDeclare_id() {
		return declare_id;
	}
	public void setDeclare_id(String declareId) {
		declare_id = declareId;
	}
	public String getDeclare_detil_status() {
		return declare_detil_status;
	}
	public void setDeclare_detil_status(String declareDetilStatus) {
		declare_detil_status = declareDetilStatus;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getDeclare_type() {
		return declare_type;
	}
	public void setDeclare_type(String declareType) {
		declare_type = declareType;
	}
	public String getFileid() {
		return fileid;
	}
	public void setFileid(String fileid) {
		this.fileid = fileid;
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
	public String getMaterialitemcode() {
		return materialitemcode;
	}
	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}
	public String getMaterialitemname() {
		return materialitemname;
	}
	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}
	public String getMaterialstandard() {
		return materialstandard;
	}
	public void setMaterialstandard(String materialstandard) {
		this.materialstandard = materialstandard;
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
}
