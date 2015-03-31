package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_paymentTask_group")
public class GroupPaymentTask {

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
	private Date pgCreateTime;//申请时间
	private Date pgAuditingTime;//审批通过时间
	private long pgType;//类别。此表默认为2（集团公司）
	private String pgCreatePeopel;//集团支付任务编制人信息
	
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	
	@Id
	@Column(name="pgId",unique=true,nullable=false)
	public String getPgId() {
		return pgId;
	}
	public void setPgId(String pgId) {
		this.pgId = pgId;
	}
	
	@Column(name="pgFinanceRemark")
	public String getPgFinanceRemark() {
		return pgFinanceRemark;
	}
	public void setPgFinanceRemark(String pgFinanceRemark) {
		this.pgFinanceRemark = pgFinanceRemark;
	}
	
	@Column(name="contractId")
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	
	@Column(name="contractProof")
	public String getContractProof() {
		return contractProof;
	}
	public void setContractProof(String contractProof) {
		this.contractProof = contractProof;
	}
	
	@Column(name="contractMoney")
	public String getContractMoney() {
		return contractMoney;
	}
	public void setContractMoney(String contractMoney) {
		this.contractMoney = contractMoney;
	}
	
	@Column(name="paymentMoney")
	public String getPaymentMoney() {
		return paymentMoney;
	}
	public void setPaymentMoney(String paymentMoney) {
		this.paymentMoney = paymentMoney;
	}
	
	@Column(name="pgRemark")
	public String getPgRemark() {
		return pgRemark;
	}
	public void setPgRemark(String pgRemark) {
		this.pgRemark = pgRemark;
	}
	
	@Column(name="pgAuditingBrow")
	public String getPgAuditingBrow() {
		return pgAuditingBrow;
	}
	public void setPgAuditingBrow(String pgAuditingBrow) {
		this.pgAuditingBrow = pgAuditingBrow;
	}
	
	@Column(name="pgLiabilityPeopel")
	public String getPgLiabilityPeopel() {
		return pgLiabilityPeopel;
	}
	public void setPgLiabilityPeopel(String pgLiabilityPeopel) {
		this.pgLiabilityPeopel = pgLiabilityPeopel;
	}
	
	@Column(name="pgWorkPeopel")
	public String getPgWorkPeopel() {
		return pgWorkPeopel;
	}
	public void setPgWorkPeopel(String pgWorkPeopel) {
		this.pgWorkPeopel = pgWorkPeopel;
	}
	
	@Column(name="pgIdea")
	public String getPgIdea() {
		return pgIdea;
	}
	public void setPgIdea(String pgIdea) {
		this.pgIdea = pgIdea;
	}
	
	@Column(name="pgState")
	public long getPgState() {
		return pgState;
	}
	public void setPgState(long pgState) {
		this.pgState = pgState;
	}
	
	@Column(name="pgCreateTime")
	public Date getPgCreateTime() {
		return pgCreateTime;
	}
	public void setPgCreateTime(Date pgCreateTime) {
		this.pgCreateTime = pgCreateTime;
	}
	
	@Column(name="pgAuditingTime")
	public Date getPgAuditingTime() {
		return pgAuditingTime;
	}
	public void setPgAuditingTime(Date pgAuditingTime) {
		this.pgAuditingTime = pgAuditingTime;
	}
	
	@Column(name="pgType")
	public long getPgType() {
		return pgType;
	}
	public void setPgType(long pgType) {
		this.pgType = pgType;
	}
	
	@Column(name="pgCreatePeopel")
	public String getPgCreatePeopel() {
		return pgCreatePeopel;
	}
	public void setPgCreatePeopel(String pgCreatePeopel) {
		this.pgCreatePeopel = pgCreatePeopel;
	}
	
	@Column(name="selectType")
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
}
