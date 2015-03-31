package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.io.Serializable;
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
 * 年度计划
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-25 14:11:18
 */
@Entity
@Table(name="T_BuinessPlan")
public class BuinessPlan implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 计划ID
	 */
	private String buinessPlanId;// BUINESSPLANID
	/**
	 * 编制人，即当前登录用户
	 */
	private String author;// AUTHOR
	
	
	/**
	 * 计划名称
	 */
	private String buinessPlanName;// BUINESSPlanName
	
	/**
	 * 编制日期，即导入的时间
	 */
	private Date createDate;//CREATEDATE
	/**
	 * 1预拨年度计划;2调整年度计划;3临时年度计划
	 */
	private String planType;//PLANTYPE
	/**
	 * 下发日期
	 */
	private Date  issuedDate ;//ISSUEDDATE
	/**
	 * 0编制中，1已下发，本系统不对该属性做操作
	 */
	private String planStatus ;//PLANSTATUS
	/**
	 * 备注
	 */
	private String remarks;//REMARKS 
	
	@Id
	@Column(name = "BUINESSPLANID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getBuinessPlanId() {
		return buinessPlanId;
	}
	 
	public void setBuinessPlanId(String buinessPlanId) {
		this.buinessPlanId = buinessPlanId;
	}
	
	
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	

	@Temporal( TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getPlanType() {
		return planType;
	}
	public void setPlanType(String planType) {
		this.planType = planType;
	}
	@Temporal( TemporalType.DATE)
	public Date getIssuedDate() {
		return issuedDate;
	}
	public void setIssuedDate(Date issuedDate) {
		this.issuedDate = issuedDate;
	}
	public String getPlanStatus() {
		return planStatus;
	}
	public void setPlanStatus(String planStatus) {
		this.planStatus = planStatus;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getBuinessPlanName() {
		return buinessPlanName;
	}

	public void setBuinessPlanName(String buinessPlanName) {
		this.buinessPlanName = buinessPlanName;
	}
	
}
