package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.vendorMaterial.VendorMaterial;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * 采购申报
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
@Entity
@Table(name = "T_DECLARE")
public class Declare implements Serializable {
	private static final long serialVersionUID = 1L;
	private String declareId; // 申报记录ID
	private BigDecimal amount; // 金额
	private Date createDate; // 生成时间
	private String declareCode; // 编号
	private Date declareDate; // 申报月份
	private String departmentId; // 采购单位
	private String editor; // 编辑人
	private String status; // 申报状态 1待审批(编制中)2审批中3已审批
	private Date updateDate; // 最后修改时间
	private String dir;//排序参数
	private String sort;//排序对象参数
	private String generator;//生成方式：空-申报记录正常流程;1-申报补充计划';
	private String amountSource;
	private String costNum;
	private BigDecimal quantity;//项数
	
	private Set<DeclareDetail> declareDetails=new HashSet<DeclareDetail>();// 供应商信息
	
	@Transient
	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}
	@Transient
	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Declare() {
	}

	@Id
	@Column(name = "DECLARE_ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getDeclareId() {
		return this.declareId;
	}

	public void setDeclareId(String declareId) {
		this.declareId = declareId;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(name = "DECLARE_CODE")
	public String getDeclareCode() {
		return this.declareCode;
	}

	public void setDeclareCode(String declareCode) {
		this.declareCode = declareCode;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DECLARE_DATE")
	public Date getDeclareDate() {
		return this.declareDate;
	}

	public void setDeclareDate(Date declareDate) {
		this.declareDate = declareDate;
	}

	@Column(name = "DEMARTMENTID")
	public String getDepartmentId() {
		return this.departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	@Column(name = "EDITER")
	public String getEditor() {
		return this.editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Temporal(TemporalType.DATE)
	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	@OneToMany(mappedBy = "declareDetailId")
	public Set<DeclareDetail> getDeclareDetails() {
		return declareDetails;
	}

	public void setDeclareDetails(Set<DeclareDetail> declareDetails) {
		this.declareDetails = declareDetails;
	}

	@Column(name = "GENERATOR")
	public String getGenerator() {
		return generator;
	}

	public void setGenerator(String generator) {
		this.generator = generator;
	}

	@Column(name = "AMOUNTSOURCE")
	public String getAmountSource() {
		return amountSource;
	}

	public void setAmountSource(String amountSource) {
		this.amountSource = amountSource;
	}

	@Column(name = "COSTNUM")
	public String getCostNum() {
		return costNum;
	}

	public void setCostNum(String costNum) {
		this.costNum = costNum;
	}

	@Column(name = "QUANTITY")
	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	
	
}