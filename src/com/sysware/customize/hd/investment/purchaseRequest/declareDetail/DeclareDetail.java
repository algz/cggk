package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

/**
 * 采购申报明细
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
@Entity
@Table(name = "T_DECLARE_DETIL")
public class DeclareDetail implements Serializable {
	private static final long serialVersionUID = 1L;
	private String declareDetailId; // 采购申报表ID
	private BigDecimal amount; // 资金预算
	private String declareDetailStatus; // 是否成功通过申报，0未提交，1已提交，2未通过，3通过,5变更
	private String declareId; // 所属申请记录
	private String declareType; // 申请记录类型，1计划内2应急3非应急
	private String materialid; // 物资信息ID
	private String materialCatalogName; // 物资类别
	private BigDecimal quantity; // 数量
	private String reason; // 未通过原因
	private String fileName; // 可行性分析报告
	private String fileId; // 可行性分析报告id
	private String use; // 采购用途
	private Date useDate; // 使用时间
	private String reportType;//报告类型 1可行性报告、2需求报告、3申报依据  
	private String taskno; //任务编号
	private String remark;
	private String contactPerson;//联系人
	private String contactTelephone;//联系电话
	private BigDecimal oldquantity;//变量前数量
	private String changer;//变更人
	private Date changeTime;//变更时间
	private String changeReson;//变更原因
	
	public String getReportType() {
		return reportType;
	} 
	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	//以下为非持久化属性
	private String materialItemName;// 物资名称
	private String materialStandard;// 规格型号
	private String technicCondition;// 技术条件
	private String demension;// 计量单位
	private String departmentName;//部门名称
	
	public DeclareDetail() {
	}

	@Id
	@Column(name = "DECLARE_DETIL_ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getDeclareDetailId() {
		return this.declareDetailId;
	}

	public void setDeclareDetailId(String declareDetailId) {
		this.declareDetailId = declareDetailId;
	}

	@Column(name = "AMOUNT")
	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Column(name = "DECLARE_DETIL_STATUS")
	public String getDeclareDetailStatus() {
		return this.declareDetailStatus;
	}

	public void setDeclareDetailStatus(String declareDetailStatus) {
		this.declareDetailStatus = declareDetailStatus;
	}

	@Column(name = "DECLARE_ID")
	public String getDeclareId() {
		return this.declareId;
	}

	public void setDeclareId(String declareId) {
		this.declareId = declareId;
	}

	@Column(name = "DECLARE_TYPE")
	public String getDeclareType() {
		return this.declareType;
	}

	public void setDeclareType(String declareType) {
		this.declareType = declareType;
	}

	@Column(name = "MATERIAL_ID")
	public String getMaterialid() {
		return this.materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	@Column(name = "MATERIALCATALOG_NAME")
	public String getMaterialCatalogName() {
		return this.materialCatalogName;
	}

	public void setMaterialCatalogName(String materialCatalogName) {
		this.materialCatalogName = materialCatalogName;
	}

	@Column(name = "QUANTITY")
	public BigDecimal getQuantity() {
		return this.quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	@Column(name = "REASON")
	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Column(name = "fileName") 
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	@Column(name = "fileId") 
	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	@Column(name = "USE")
	public String getUse() {
		return this.use;
	}
	public void setUse(String use) {
		this.use = use;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "USEDATE")
	public Date getUseDate() {
		return this.useDate;
	}

	@Column(name="REMARK")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public void setUseDate(Date useDate) {
		this.useDate = useDate;
	}
	
	@Column(name="TASKNO")
	public String getTaskno() {
		return taskno;
	}
	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}
	@Transient
	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	@Transient
	
	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	@Transient
	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	@Transient
	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}
	
	@Transient
	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	@Transient
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	@Column(name="CONTACT_PERSON")
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	
	@Column(name="CONTACT_TELEPHONE")
	public String getContactTelephone() {
		return contactTelephone;
	}
	public void setContactTelephone(String contactTelephone) {
		this.contactTelephone = contactTelephone;
	}
	@Column(name="OLDQUANTITY")
	public BigDecimal getOldquantity() {
		return oldquantity;
	}
	
	public void setOldquantity(BigDecimal oldquantity) {
		this.oldquantity = oldquantity;
	}
	@Column(name="CHANGER")
	public String getChanger() {
		return changer;
	}
	public void setChanger(String changer) {
		this.changer = changer;
	}
	@Column(name="CHANGTIME")
	public Date getChangeTime() {
		return changeTime;
	}
	public void setChangeTime(Date changeTime) {
		this.changeTime = changeTime;
	}
	@Column(name="CHANGRESON")
	public String getChangeReson() {
		return changeReson;
	}
	public void setChangeReson(String changeReson) {
		this.changeReson = changeReson;
	}

	
	

}