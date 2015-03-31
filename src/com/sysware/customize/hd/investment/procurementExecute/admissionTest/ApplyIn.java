package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * 入库申请
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
@Table(name="T_Apply_In")
@Entity
public class ApplyIn {
	/**
	 *申请时间
	 */
	private Date applyDate;
	/**
	 *申请部门ID
	 */
	private String applyDeptId;
	/**
	 *申请人
	 */
	private String applyer;
	/**
	 *申请单状态：0未提交，1已提交，2已通过
	 */
	private char applyeStatus;
	/**
	 * 主键
	 */
	private String applyInId;
	/**
	 *申请单编号
	 */
	private String applyNo;
	/**
	 *申请数量
	 */
	private BigDecimal applyNum;
	/**
	 *目的库房
	 */
	private String applyStorage;

	private String checkId;
	private String itemId;
	/**
	 *计划价
	 */
	private BigDecimal planPrice;
	/**
	 *检验员工号
	 */
	private String chkUserNo;
	/**
	 *特殊数量
	 */
	private BigDecimal ea;
	/**
	 *凭证号
	 */
	private String certificateNo;
	/**
	 *质量编号
	 */
	private String qualityCode;
	/**
	 *起始架次
	 */
	private String startJc;
	/**
	 *终止架次
	 */
	private String endJc;
	/**
	 * 质量信息Id
	 */
	private String itemBillId;
	
	/**
	 * 物资状态:1正常入库;2委托加工;3返修品
	 */
	private String materialstate;
	
	
	public String getItemBillId() {
		return itemBillId;
	}
	public void setItemBillId(String itemBillId) {
		this.itemBillId = itemBillId;
	}
	public BigDecimal getPlanPrice() {
		return planPrice;
	}
	public void setPlanPrice(BigDecimal planPrice) {
		this.planPrice = planPrice;
	}
	public String getChkUserNo() {
		return chkUserNo;
	}
	public void setChkUserNo(String chkUserNo) {
		this.chkUserNo = chkUserNo;
	}
	public BigDecimal getEa() {
		return ea;
	}
	public void setEa(BigDecimal ea) {
		this.ea = ea;
	}
	public String getCertificateNo() {
		return certificateNo;
	}
	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}
	public String getQualityCode() {
		return qualityCode;
	}
	public void setQualityCode(String qualityCode) {
		this.qualityCode = qualityCode;
	}
	public String getStartJc() {
		return startJc;
	}
	public void setStartJc(String startJc) {
		this.startJc = startJc;
	}
	public String getEndJc() {
		return endJc;
	}
	public void setEndJc(String endJc) {
		this.endJc = endJc;
	}
	@Column(name="CHECK_ID")
	public String getCheckId() {
		return checkId;
	}
	public void setCheckId(String checkId) {
		this.checkId = checkId;
	}
	@Column(name="MATERIAL_ID")
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	@Column(name="apply_date")
	@Temporal(TemporalType.DATE)
	public Date getApplyDate() {
		return applyDate;
	}
	@Column(name="apply_dept_id")
	public String getApplyDeptId() {
		return applyDeptId;
	}
	@Column(name="applyer")
	public String getApplyer() {
		return applyer;
	}
	@Column(name="applye_status")
	public char getApplyeStatus() {
		return applyeStatus;
	}
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getApplyInId() {
		return applyInId;
	}
	@Column(name="apply_no")
	public String getApplyNo() {
		return applyNo;
	}
	@Column(name="apply_num")
	public BigDecimal getApplyNum() {
		return applyNum;
	}
	@Column(name="apply_storage")
	public String getApplyStorage() {
		return applyStorage;
	}

	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}

	public void setApplyDeptId(String applyDeptId) {
		this.applyDeptId = applyDeptId;
	}

	public void setApplyer(String applyer) {
		this.applyer = applyer;
	}

	public void setApplyeStatus(char applyeStatus) {
		this.applyeStatus = applyeStatus;
	}

	public void setApplyInId(String applyInId) {
		this.applyInId = applyInId;
	}

	public void setApplyNo(String applyNo) {
		this.applyNo = applyNo;
	}

	public void setApplyNum(BigDecimal applyNum) {
		this.applyNum = applyNum;
	}

	public void setApplyStorage(String applyStorage) {
		this.applyStorage = applyStorage;
	}
	
	@Column(name="MATERIAL_STATE")
	public String getMaterialstate() {
		return materialstate;
	}
	public void setMaterialstate(String materialstate) {
		this.materialstate = materialstate;
	}
	
	
	
	
}
