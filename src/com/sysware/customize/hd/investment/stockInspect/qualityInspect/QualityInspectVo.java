package com.sysware.customize.hd.investment.stockInspect.qualityInspect;

public class QualityInspectVo {
	
	//登记表ID
	private String id;
	//合同ID
	private String contract_id;
	//合同名称
	private String contract_name;
	//合同编号
	private String contract_code;
	//物料ID
	private String item_id;
	//物料名称
	private String materialitemname;
	//物料图号
	private String materialitemcode;
	//入厂批次
	private String lot_no;
	//登记数量
	private long arrival_num;
	//登记人
	private String creater_id;
	//登记时间
	private String create_date;
	//评语
	private String object_comment;
	//登记号
	private String registration_code;
//	检验状态
	private String check_status;
	
	public String getCheck_status() {
		return check_status;
	}
	public void setCheck_status(String check_status) {
		this.check_status = check_status;
	}
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contractId) {
		contract_id = contractId;
	}
	public String getContract_name() {
		return contract_name;
	}
	public void setContract_name(String contractName) {
		contract_name = contractName;
	}
	public String getContract_code() {
		return contract_code;
	}
	public void setContract_code(String contractCode) {
		contract_code = contractCode;
	}
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String itemId) {
		item_id = itemId;
	}
	public String getMaterialitemname() {
		return materialitemname;
	}
	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}
	public String getMaterialitemcode() {
		return materialitemcode;
	}
	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}
	public String getLot_no() {
		return lot_no;
	}
	public void setLot_no(String lotNo) {
		lot_no = lotNo;
	}
	public long getArrival_num() {
		return arrival_num;
	}
	public void setArrival_num(long arrivalNum) {
		arrival_num = arrivalNum;
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
	public String getObject_comment() {
		return object_comment;
	}
	public void setObject_comment(String objectComment) {
		object_comment = objectComment;
	}
	public String getRegistration_code() {
		return registration_code;
	}
	public void setRegistration_code(String registrationCode) {
		registration_code = registrationCode;
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
