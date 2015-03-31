package com.sysware.customize.hd.investment.procurementExecute.tenderFile;

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
 * 招标管理
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-10-25
 * 
 */
@Entity
@Table(name="t_tender_file")
public class TenderFile {
	private String tenderFileId;//主键
	private String tenderFileCode;//编号
	private String plenipotentiary;//全权代表
	private String tenderId;//招标管理ID
	private String procurementPlanDetilName;//招标项目名称
	private Date createDate;//日期
	private String efficiency;//资金来源
	private String agreementDepartment;//协议单位
	private String selectedDepartment;//中标单位
	private String tenderFileType;//文件类型1委托审签2委托文件3招标文件4管理登记5评审文件6中标通知书7谈判记录
	private String syndic;//评审人员
	private String status;//状态
	private String remark;//备注
	private String fileId;//文件id
	private String fileName;//文件name
	private BigDecimal amount;//总金额
	private String applicationDepartment;//申请单位
	  @Id
  	@Column(name = "tender_file_Id", unique = true, nullable = false)
  	@GeneratedValue(generator="myGuidGenerator")
  	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	
	public String getTenderFileId() {
		return tenderFileId;
	}
	public void setTenderFileId(String tenderFileId) {
		this.tenderFileId = tenderFileId;
	}
	@Column(name = "tender_file_code")
	public String getTenderFileCode() {
		return tenderFileCode;
	}
	public void setTenderFileCode(String tenderFileCode) {
		this.tenderFileCode = tenderFileCode;
	}
	@Column(name = "Plenipotentiary")
	public String getPlenipotentiary() {
		return plenipotentiary;
	}
	public void setPlenipotentiary(String plenipotentiary) {
		this.plenipotentiary = plenipotentiary;
	}
	@Column(name = "tender_id")
	public String getTenderId() {
		return tenderId;
	}
	public void setTenderId(String tenderId) {
		this.tenderId = tenderId;
	}
	@Column(name = "ProcurementPlan_detil_name")
	public String getProcurementPlanDetilName() {
		return procurementPlanDetilName;
	}
	public void setProcurementPlanDetilName(String procurementPlanDetilName) {
		this.procurementPlanDetilName = procurementPlanDetilName;
	}
	@Column(name = "createDate")
	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	@Column(name = "efficiency")
	public String getEfficiency() {
		return efficiency;
	}
	public void setEfficiency(String efficiency) {
		this.efficiency = efficiency;
	}
	@Column(name = "agreementDepartment")
	public String getAgreementDepartment() {
		return agreementDepartment;
	}
	public void setAgreementDepartment(String agreementDepartment) {
		this.agreementDepartment = agreementDepartment;
	}
	@Column(name = "selectedDepartment")
	public String getSelectedDepartment() {
		return selectedDepartment;
	}
	public void setSelectedDepartment(String selectedDepartment) {
		this.selectedDepartment = selectedDepartment;
	}
	@Column(name = "tender_file_type")
	public String getTenderFileType() {
		return tenderFileType;
	}
	public void setTenderFileType(String tenderFileType) {
		this.tenderFileType = tenderFileType;
	}
	@Column(name = "syndic")
	public String getSyndic() {
		return syndic;
	}
	public void setSyndic(String syndic) {
		this.syndic = syndic;
	}
	@Column(name = "status")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Column(name = "remark")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Column(name = "fileId")
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	
	@Column(name = "fileName")
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	} 
	@Column(name = "applicationDepartment")
	public String getApplicationDepartment() {
		return applicationDepartment;
	}
	public void setApplicationDepartment(String applicationDepartment) {
		this.applicationDepartment = applicationDepartment;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	@Column(name = "amount")
	public BigDecimal getAmount() {
		return amount;
	}
	
	
}
