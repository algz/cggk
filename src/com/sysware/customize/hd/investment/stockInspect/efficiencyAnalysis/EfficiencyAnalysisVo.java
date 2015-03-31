package com.sysware.customize.hd.investment.stockInspect.efficiencyAnalysis;

public class EfficiencyAnalysisVo {

	//合同ID
	private String contract_id;
	//合同编号  
	private String contract_code;
	//合同名称
	private String contract_name;
	//供应商
	private String department_b;
	//金额
	private long contract_amount;
	
	//交货期
	private String commit_date;
	//不合格率
	private String unqualified_rate;
	//能效得分
	private String score;
	
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
	public String getContract_code() {
		return contract_code;
	}
	public void setContract_code(String contractCode) {
		contract_code = contractCode;
	}
	public String getContract_name() {
		return contract_name;
	}
	public void setContract_name(String contractName) {
		contract_name = contractName;
	}
	public String getDepartment_b() {
		return department_b;
	}
	public void setDepartment_b(String departmentB) {
		department_b = departmentB;
	}
	public long getContract_amount() {
		return contract_amount;
	}
	public void setContract_amount(long contractAmount) {
		contract_amount = contractAmount;
	}
	public String getCommit_date() {
		return commit_date;
	}
	public void setCommit_date(String commitDate) {
		commit_date = commitDate;
	}
	public String getUnqualified_rate() {
		return unqualified_rate;
	}
	public void setUnqualified_rate(String unqualifiedRate) {
		unqualified_rate = unqualifiedRate;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
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
