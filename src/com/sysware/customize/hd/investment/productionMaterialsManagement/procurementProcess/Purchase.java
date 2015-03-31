package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "t_purchase")
public class Purchase implements Serializable {
	private static final long serialVersionUID = -2054070902091524303L;

	private String purchaseId;// 主键
	private String purchaseCode;// 采购编号
	private String purchaseName;//采购需求名称
	private Date createDate;// 生成日期
	private String status;// 申请状态:1待审批;2审批中;3已审批;4已生成 
	private String materialTypeName;// 物资种类
	private String editor;// 编辑人
	private String type;// 采购需求类型：1年度需求, 2 零星需求
	private String remark;// 备注

	// 非持久化字段
	private String stateName;// 申请状态名称
	private String editorName;// 编辑人名称
	private String editorDeptName;// 编辑人部门名称
	private String editorRoleName;// 编辑人角色名称
	private String purchaseTypeName;// 需求来源类型名称

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getPurchaseCode() {
		return purchaseCode;
	}

	public void setPurchaseCode(String purchaseCode) {
		this.purchaseCode = purchaseCode;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMaterialTypeName() {
		return materialTypeName;
	}

	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Transient
	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	@Transient
	public String getEditorName() {
		return editorName;
	}

	public void setEditorName(String editorName) {
		this.editorName = editorName;
	}

	@Transient
	public String getEditorDeptName() {
		return editorDeptName;
	}

	public void setEditorDeptName(String editorDeptName) {
		this.editorDeptName = editorDeptName;
	}

	@Transient
	public String getEditorRoleName() {
		return editorRoleName;
	}

	public void setEditorRoleName(String editorRoleName) {
		this.editorRoleName = editorRoleName;
	}

	@Transient
	public String getPurchaseTypeName() {
		return purchaseTypeName;
	}

	public void setPurchaseTypeName(String purchaseTypeName) {
		this.purchaseTypeName = purchaseTypeName;
	}

	@Column(name="PURCHASENAME")
	public String getPurchaseName() {
		return purchaseName;
	}

	public void setPurchaseName(String purchaseName) {
		this.purchaseName = purchaseName;
	}

	
	
}
