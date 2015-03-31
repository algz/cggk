package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.util.Date;

public class GroupPaymentTaskVo {

	
	private String pgId;//集团公司支付任务编号
	private String pgFinanceRemark;//财务事项内容
	private String contractId;//合同编号
	private String contractProof;//合同凭据号
	private String contractMoney;//合同金额
	private String paymentMoney;//累计支付金额
	private String pgRemark;//其他
	private String pgAuditingBrow;//审批金额,
	private String pgLiabilityPeopel;//责任人
	private String pgWorkPeopel;//经办人
	private String pgIdea;//意见
	private long pgState;//当前状态
	private String pgCreateTime;//申请时间
	private String pgAuditingTime;//审批通过时间
	private long pgType;//类别。此表默认为2（集团公司）
	private String pgCreatePeopel;//集团支付任务编制人信息
	
	private String contractCode;//合同名称
	private String userId;//用户编号
	private String trueName;//用户名称
	private String departmentName;//部门名称
	private String inputValue;//输入的查询内容
	private String inputValueNum;//输入的查询内容编号
	private int start;//起始
	private int limit;//结束
	
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	
	public String getPgId() {
		return pgId;
	}
	public void setPgId(String pgId) {
		this.pgId = pgId;
	}
	public String getPgFinanceRemark() {
		return pgFinanceRemark;
	}
	public void setPgFinanceRemark(String pgFinanceRemark) {
		this.pgFinanceRemark = pgFinanceRemark;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getContractProof() {
		return contractProof;
	}
	public void setContractProof(String contractProof) {
		this.contractProof = contractProof;
	}
	public String getContractMoney() {
		return contractMoney;
	}
	public void setContractMoney(String contractMoney) {
		this.contractMoney = contractMoney;
	}
	public String getPaymentMoney() {
		return paymentMoney;
	}
	public void setPaymentMoney(String paymentMoney) {
		this.paymentMoney = paymentMoney;
	}
	public String getPgRemark() {
		return pgRemark;
	}
	public void setPgRemark(String pgRemark) {
		this.pgRemark = pgRemark;
	}
	public String getPgAuditingBrow() {
		return pgAuditingBrow;
	}
	public void setPgAuditingBrow(String pgAuditingBrow) {
		this.pgAuditingBrow = pgAuditingBrow;
	}
	public String getPgLiabilityPeopel() {
		return pgLiabilityPeopel;
	}
	public void setPgLiabilityPeopel(String pgLiabilityPeopel) {
		this.pgLiabilityPeopel = pgLiabilityPeopel;
	}
	public String getPgWorkPeopel() {
		return pgWorkPeopel;
	}
	public void setPgWorkPeopel(String pgWorkPeopel) {
		this.pgWorkPeopel = pgWorkPeopel;
	}
	public String getPgIdea() {
		return pgIdea;
	}
	public void setPgIdea(String pgIdea) {
		this.pgIdea = pgIdea;
	}
	public long getPgState() {
		return pgState;
	}
	public void setPgState(long pgState) {
		this.pgState = pgState;
	}
	public String getPgCreateTime() {
		return pgCreateTime;
	}
	public void setPgCreateTime(String pgCreateTime) {
		this.pgCreateTime = pgCreateTime;
	}
	public String getPgAuditingTime() {
		return pgAuditingTime;
	}
	public void setPgAuditingTime(String pgAuditingTime) {
		this.pgAuditingTime = pgAuditingTime;
	}
	public long getPgType() {
		return pgType;
	}
	public void setPgType(long pgType) {
		this.pgType = pgType;
	}
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTrueName() {
		return trueName;
	}
	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}
	public String getInputValue() {
		return inputValue;
	}
	public void setInputValue(String inputValue) {
		this.inputValue = inputValue;
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
	public String getPgCreatePeopel() {
		return pgCreatePeopel;
	}
	public void setPgCreatePeopel(String pgCreatePeopel) {
		this.pgCreatePeopel = pgCreatePeopel;
	}
	public String getInputValueNum() {
		return inputValueNum;
	}
	public void setInputValueNum(String inputValueNum) {
		this.inputValueNum = inputValueNum;
	}
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
}
