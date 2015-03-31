package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

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
 * 申报计划信息
 * 
 * @author fanzhihui
 * 
 */
@Entity
@Table(name = "T_DECLAREPLAN")
public class DeclarePlan {

	private String declareplanID;// 申报计划ID

	private String declareplanName;// 申报计划名称

	private String declareplanCode;// 编号为9为流水号

	private BigDecimal amount;// 金额

	private BigDecimal quantity;// 项数

	private String status;// 状态 1编制中2待审批3审批中4已审批
	private String declareplanType;//申报计划添加采购类型，用于送审。1计划内2应急3非应急
	private String propertyType;//资产类别：固定资产，非固定资产 用于生成采购计划的依据
	@Column(name = "DECLAREPLAN_Type")
	public String getDeclareplanType() {
		return declareplanType;
	}

	public void setDeclareplanType(String declareplanType) {
		this.declareplanType = declareplanType;
	}

	private String editer;// 编制人

	private Date editDate;// 编制时间

	private Date sendDate;// 送审时间
	
	private String generator;//生成方式:空-申报记录正常流程;1-申报补充计划
	
	public DeclarePlan(){
		
	}

	@Id
	@Column(name = "DECLAREPLAN_ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getDeclareplanID() {
		return declareplanID;
	}

	public void setDeclareplanID(String declareplanID) {
		this.declareplanID = declareplanID;
	}
	@Column(name = "DECLAREPLAN_NAME")
	public String getDeclareplanName() {
		return declareplanName;
	}

	public void setDeclareplanName(String declareplanName) {
		this.declareplanName = declareplanName;
	}

	@Column(name = "DECLAREPLAN_CODE")
	public String getDeclareplanCode() {
		return declareplanCode;
	}

	public void setDeclareplanCode(String declareplanCode) {
		this.declareplanCode = declareplanCode;
	}

	@Column(name = "AMOUNT")
	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	@Column(name = "QUANTITY")
	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	@Column(name = "STATUS")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "EDITER")
	public String getEditer() {
		return editer;
	}

	public void setEditer(String editer) {
		this.editer = editer;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EDITDATE")
	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editdate) {
		this.editDate = editdate;
	}

	@Column(name = "SENDDATE")
	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date senddate) {
		this.sendDate = senddate;
	} 
	 
	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	@Column(name = "GENERATOR")
	public String getGenerator() {
		return generator;
	}

	public void setGenerator(String generator) {
		this.generator = generator;
	}

	
}
