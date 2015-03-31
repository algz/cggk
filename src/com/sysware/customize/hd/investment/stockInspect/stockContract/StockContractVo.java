package com.sysware.customize.hd.investment.stockInspect.stockContract;

public class StockContractVo {

	//合同表主键
	private String contract_id;
	//合同名称
	private String contract_name;
	//合同编号
	private String contract_code;
	//甲方
	private String department_a;
	//乙方
	private String department_b;
	//合同金额
	private String contract_amount;
	//合同时间
	private String createdate;
	//合同文件
	private String contract_file;
	//备注
	private String remark;
	//状态
	private String status;
	//合同类型1土建2固定资产
	private String contract_type;
	//合同委托文件
	private String enstrust_file;
	
	private String projectid;//项目id，含（土建、设备）
	
	private String projectnum;//项目编号
	
	private String projectname;//项目名称
	
	private String payedamount;//已支付金额
	
	private String contractnum;//合同数量
	
	private String plantype;//项目类型
	
	private String fundsource;//经济来源
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	//记录总数
	private String count;
	
	//判断具体进入评分的哪个操作界面，以及能效打分显示的颜色
	private long typeNum;
	
	//判断是一期还是二期的合同
	private long contractType;
	
	
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
	public String getDepartment_a() {
		return department_a;
	}
	public void setDepartment_a(String departmentA) {
		department_a = departmentA;
	}
	public String getDepartment_b() {
		return department_b;
	}
	public void setDepartment_b(String departmentB) {
		department_b = departmentB;
	}
	public String getContract_amount() {
		return contract_amount;
	}
	public void setContract_amount(String contractAmount) {
		contract_amount = contractAmount;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getContract_file() {
		return contract_file;
	}
	public void setContract_file(String contractFile) {
		contract_file = contractFile;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getContract_type() {
		return contract_type;
	}
	public void setContract_type(String contractType) {
		contract_type = contractType;
	}
	public String getEnstrust_file() {
		return enstrust_file;
	}
	public void setEnstrust_file(String enstrustFile) {
		enstrust_file = enstrustFile;
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
	public long getTypeNum() {
		return typeNum;
	}
	public void setTypeNum(long typeNum) {
		this.typeNum = typeNum;
	}
	public long getContractType() {
		return contractType;
	}
	public void setContractType(long contractType) {
		this.contractType = contractType;
	}
	public String getProjectid() {
		return projectid;
	}
	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}
	public String getProjectnum() {
		return projectnum;
	}
	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}
	public String getProjectname() {
		return projectname;
	}
	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}
	public String getPayedamount() {
		return payedamount;
	}
	public void setPayedamount(String payedamount) {
		this.payedamount = payedamount;
	}
	public String getContractnum() {
		return contractnum;
	}
	public void setContractnum(String contractnum) {
		this.contractnum = contractnum;
	}
	public String getPlantype() {
		return plantype;
	}
	public void setPlantype(String plantype) {
		this.plantype = plantype;
	}
	public String getFundsource() {
		return fundsource;
	}
	public void setFundsource(String fundsource) {
		this.fundsource = fundsource;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	
}
