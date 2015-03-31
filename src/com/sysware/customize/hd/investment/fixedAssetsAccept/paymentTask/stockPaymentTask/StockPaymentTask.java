package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_paymentTask_stock")
public class StockPaymentTask {

	private String psId;//股份公司支付任务编号
	private String depcode;//申请单位
	private String psPhone;//联系电话
	private String psContent;//申请事项
	private String psAccessoriesType;//主要附件种类
	private String contractId;//合同号
	private String psPaymentScale;//分期付款比例
	private String psPlanType;//资金计划种类
	private String psRemark;//其他信息
	private String psApplicationBrow;//业务申请额度
	private String psAuditingBrow;//财务审核额度
	private String psPayee;//收款人全称
	private String psBankName;//银行全称
	private String psBankNum;//银行账号
	private long psState;//当前状态
	private Date psCreateTime;//申请时间
	private Date psAuditingTime;//审批通过时间
	private long psType;//类别。此表默认为1（股份公司）
	private String psCreatePeopel;//股份支付任务编制人信息
	
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	
	@Id
	@Column(name="psId",unique=true,nullable=false)
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}
	
	@Column(name="depcode")
	public String getDepcode() {
		return depcode;
	}
	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}
	
	@Column(name="psPhone")
	public String getPsPhone() {
		return psPhone;
	}
	public void setPsPhone(String psPhone) {
		this.psPhone = psPhone;
	}
	
	@Column(name="psContent")
	public String getPsContent() {
		return psContent;
	}
	public void setPsContent(String psContent) {
		this.psContent = psContent;
	}
	
	@Column(name="psAccessoriesType")
	public String getPsAccessoriesType() {
		return psAccessoriesType;
	}
	public void setPsAccessoriesType(String psAccessoriesType) {
		this.psAccessoriesType = psAccessoriesType;
	}
	
	@Column(name="contractId")
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	
	@Column(name="psPaymentScale")
	public String getPsPaymentScale() {
		return psPaymentScale;
	}
	public void setPsPaymentScale(String psPaymentScale) {
		this.psPaymentScale = psPaymentScale;
	}
	
	@Column(name="psPlanType")
	public String getPsPlanType() {
		return psPlanType;
	}
	public void setPsPlanType(String psPlanType) {
		this.psPlanType = psPlanType;
	}
	
	@Column(name="psRemark")
	public String getPsRemark() {
		return psRemark;
	}
	public void setPsRemark(String psRemark) {
		this.psRemark = psRemark;
	}
	
	@Column(name="psApplicationBrow")
	public String getPsApplicationBrow() {
		return psApplicationBrow;
	}
	public void setPsApplicationBrow(String psApplicationBrow) {
		this.psApplicationBrow = psApplicationBrow;
	}
	
	@Column(name="psAuditingBrow")
	public String getPsAuditingBrow() {
		return psAuditingBrow;
	}
	public void setPsAuditingBrow(String psAuditingBrow) {
		this.psAuditingBrow = psAuditingBrow;
	}
	
	@Column(name="psPayee")
	public String getPsPayee() {
		return psPayee;
	}
	public void setPsPayee(String psPayee) {
		this.psPayee = psPayee;
	}
	
	@Column(name="psBankName")
	public String getPsBankName() {
		return psBankName;
	}
	public void setPsBankName(String psBankName) {
		this.psBankName = psBankName;
	}
	
	@Column(name="psBankNum")
	public String getPsBankNum() {
		return psBankNum;
	}
	public void setPsBankNum(String psBankNum) {
		this.psBankNum = psBankNum;
	}
	
	@Column(name="psState")
	public long getPsState() {
		return psState;
	}
	public void setPsState(long psState) {
		this.psState = psState;
	}
	
	@Column(name="psCreateTime")
	public Date getPsCreateTime() {
		return psCreateTime;
	}
	public void setPsCreateTime(Date psCreateTime) {
		this.psCreateTime = psCreateTime;
	}
	
	@Column(name="psAuditingTime")
	public Date getPsAuditingTime() {
		return psAuditingTime;
	}
	public void setPsAuditingTime(Date psAuditingTime) {
		this.psAuditingTime = psAuditingTime;
	}
	
	@Column(name="psType")
	public long getPsType() {
		return psType;
	}
	public void setPsType(long psType) {
		this.psType = psType;
	}
	
	@Column(name="psCreatePeopel")
	public String getPsCreatePeopel() {
		return psCreatePeopel;
	}
	public void setPsCreatePeopel(String psCreatePeopel) {
		this.psCreatePeopel = psCreatePeopel;
	}
	
	@Column(name="selectType")
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
}
