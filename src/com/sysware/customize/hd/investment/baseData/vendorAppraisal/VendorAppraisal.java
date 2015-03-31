package com.sysware.customize.hd.investment.baseData.vendorAppraisal;

/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_Vendor_Appraisal")
public class VendorAppraisal {
	/**
	 * 主键ID
	 */
	private String vendorAppraisalId;
	/**
	 * 考核表名称
	 */
	private String appraisalName;
	/**
	 * 考核表编号：系统自动生成，规则待定
	 */
	private String appraisalNo;
	/**
	 * 供应商ID
	 */
	private String vendorId;
	/**
	 * 分值
	 */
	private BigDecimal appraisalScore;
	/**
	 * 考核状态：0未考核，1合格，2试供,3不合格
	 */
	private char appraisalStatus;
	/**
	 * 修改意见
	 */
	private String appraisalComment;
	
	/**
	 * 审批并提取意见的人,考官.
	 */
	private String examiner;

	/**
	 * 创建人Id
	 */
	private String creater; 
	/**
	 * 创建时间
	 */
	private Date createDate;
	/**
	 * 创建人名称 非持久化
	 */
	private String createName;
	/**
	 * 评论人个数 非持久化
	 */
	private String amount;
	@Transient
	public String getCreateName() {
		return createName;
	}

	public void setCreateName(String createName) {
		this.createName = createName;
	}
	@Transient
	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	@Column(name="Examiner")
	public String getExaminer() {
		return examiner;
	}

	public void setExaminer(String examiner) {
		this.examiner = examiner;
	}
	
	@Column(name="CREATER")
	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}
	@Column(name="CREATE_DATE")
	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getVendorAppraisalId() {
		return vendorAppraisalId;
	}

	public void setVendorAppraisalId(String vendorAppraisalId) {
		this.vendorAppraisalId = vendorAppraisalId;
	}

	@Column(name = "appraisal_name")
	public String getAppraisalName() {
		return appraisalName;
	}

	public void setAppraisalName(String appraisalName) {
		this.appraisalName = appraisalName;
	}

	@Column(name = "appraisal_no")
	public String getAppraisalNo() {
		return appraisalNo;
	}

	public void setAppraisalNo(String appraisalNo) {
		this.appraisalNo = appraisalNo;
	}

	@Column(name = "vendor_id")
	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	@Column(name = "appraisal_score")
	public BigDecimal getAppraisalScore() {
		return appraisalScore;
	}

	public void setAppraisalScore(BigDecimal appraisalScore) {
		this.appraisalScore = appraisalScore;
	}

	@Column(name = "appraisal_status")
	public char getAppraisalStatus() {
		return appraisalStatus;
	}

	public void setAppraisalStatus(char appraisalStatus) {
		this.appraisalStatus = appraisalStatus;
	}

	@Column(name = "appraisal_comment")
	public String getAppraisalComment() {
		return appraisalComment;
	}

	public void setAppraisalComment(String appraisalComment) {
		this.appraisalComment = appraisalComment;
	}
}
