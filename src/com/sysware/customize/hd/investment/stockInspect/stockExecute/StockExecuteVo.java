package com.sysware.customize.hd.investment.stockInspect.stockExecute;

/**
 * 主要操作表T_REGISTRATION（入场登记表）
 * @author Administrator
 *
 */
public class StockExecuteVo {

	//合同ID
	private String contract_id;
	//主键ID
	private String id;
	//登记号
	private String registration_code;
	//物料ID
	private String item_id;
	//批次号
	private String lot_no;
	//发票号码
	private String invoice_no;
	//运输日期
	private String transport_date;
	//运单号
	private String transport_no;
	//运输数量
	private long transport_num;
	//采购数量
	private long purchase_num;
	//合格证
	private String qualify_no;
	//登记人
	private String creater_id;
	//提交日期
	private String create_date;
	//到货数量
	private long arrival_num;
	//到货日期
	private String arrival_date;
	
	//来自T_USER表的用户姓名
	private String truename;
	
	//来自物料信息表的字段（T_MATERIAL）
	//物料图号
	private String materialitemcode;
	//物料名称
	private String materialitemname;
	//物料规格
	private String materialstandard;
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contractId) {
		contract_id = contractId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRegistration_code() {
		return registration_code;
	}
	public void setRegistration_code(String registrationCode) {
		registration_code = registrationCode;
	}
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String itemId) {
		item_id = itemId;
	}
	public String getLot_no() {
		return lot_no;
	}
	public void setLot_no(String lotNo) {
		lot_no = lotNo;
	}
	public String getInvoice_no() {
		return invoice_no;
	}
	public void setInvoice_no(String invoiceNo) {
		invoice_no = invoiceNo;
	}
	public String getTransport_date() {
		return transport_date;
	}
	public void setTransport_date(String transportDate) {
		transport_date = transportDate;
	}
	public String getTransport_no() {
		return transport_no;
	}
	public void setTransport_no(String transportNo) {
		transport_no = transportNo;
	}
	public long getTransport_num() {
		return transport_num;
	}
	public void setTransport_num(long transportNum) {
		transport_num = transportNum;
	}
	public long getPurchase_num() {
		return purchase_num;
	}
	public void setPurchase_num(long purchaseNum) {
		purchase_num = purchaseNum;
	}
	public String getQualify_no() {
		return qualify_no;
	}
	public void setQualify_no(String qualifyNo) {
		qualify_no = qualifyNo;
	}
	public String getCreater_id() {
		return creater_id;
	}
	public void setCreater_id(String createrId) {
		creater_id = createrId;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String createDate) {
		create_date = createDate;
	}
	public long getArrival_num() {
		return arrival_num;
	}
	public void setArrival_num(long arrivalNum) {
		arrival_num = arrivalNum;
	}
	public String getArrival_date() {
		return arrival_date;
	}
	public void setArrival_date(String arrivalDate) {
		arrival_date = arrivalDate;
	}
	public String getTruename() {
		return truename;
	}
	public void setTruename(String truename) {
		this.truename = truename;
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
}
