package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;


@Entity
@Table(name="TB_ENGINEERINGCONTRACT")
public class EngineeringProjectModel implements java.io.Serializable,Cloneable {
	
	private static final long serialVersionUID = 1L;

	
	@Override
	public Object clone(){ 
		EngineeringProjectModel o = null; 
	try{ 
		o = (EngineeringProjectModel)super.clone(); 
    }catch(CloneNotSupportedException e){ 
		e.printStackTrace(); 
    } 
		return o; 
    }
	
	

	private String engineeringContractId ;//主键id
	private String contractCode;//合同编号
	private String contractName;//合同名称
	//private String tbCivilregistId;//外键:土建登记表的ID
	private CivilRegist civilRegist; //外键:土建登记表的ID
	private String partTwo;//乙方
	private String unitName;//单位名称
	private String workPerson;//经办人
	private String contractManagerPerson;//合同管理员
	private String superiorPerson;//行政分管领导
	private String fund;//金额
	private String fundUnit;//金额单位
	private String contractLevel;//合同密级
	private String approvalLog;//审批记录
	private String remarks;//备注
	private String uploadFileId;//上传文件ID
	private String uploadFile;//上传文件
	private String status;//状态
	private String ymd;//年月日

	
	
	public String getUploadFileId() {
		return uploadFileId;
	}
	public void setUploadFileId(String uploadFileId) {
		this.uploadFileId = uploadFileId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Id
	@Column(name = "ENGINEERINGCONTRACTID", unique = true, nullable = false)
	@GeneratedValue(generator = "paymentableGenerator")     
    @GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	public String getEngineeringContractId() {
		return engineeringContractId;
	}
	public void setEngineeringContractId(String engineeringContractId) {
		this.engineeringContractId = engineeringContractId;
	}
	
	
	
	@Column(name="CONTRACTCODE")
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	
	@Column(name="CONTRACTNAME")
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	
	
	
	
	

	
	//@Column(name="TBCIVILREGISTID")
	@ManyToOne(fetch=FetchType.EAGER,optional=true,cascade=CascadeType.REFRESH)
	@JoinColumn(name="TBCIVILREGISTID")
	public CivilRegist getCivilRegist() {
		return civilRegist;
	}
	public void setCivilRegist(CivilRegist civilRegist) {
		this.civilRegist = civilRegist;
	}
	
	
	@Column(name="PARTTWO")
	public String getPartTwo() {
		return partTwo;
	}
	public void setPartTwo(String partTwo) {
		this.partTwo = partTwo;
	}
	
	@Column(name="UNITNAME")
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	@Column(name="WORKPERSON")
	public String getWorkPerson() {
		return workPerson;
	}
	public void setWorkPerson(String workPerson) {
		this.workPerson = workPerson;
	}
	
	@Column(name="CONTRACTMANAGERPERSON")
	public String getContractManagerPerson() {
		return contractManagerPerson;
	}
	public void setContractManagerPerson(String contractManagerPerson) {
		this.contractManagerPerson = contractManagerPerson;
	}
	
	@Column(name="SUPERIORPERSON")
	public String getSuperiorPerson() {
		return superiorPerson;
	}
	public void setSuperiorPerson(String superiorPerson) {
		this.superiorPerson = superiorPerson;
	}
	
	@Column(name="FUND")
	public String getFund() {
		return fund;
	}
	public void setFund(String fund) {
		this.fund = fund;
	}
	
	@Column(name="FUNDUNIT")
	public String getFundUnit() {
		return fundUnit;
	}
	public void setFundUnit(String fundUnit) {
		this.fundUnit = fundUnit;
	}
	
	@Column(name="CONTRACTLEVEL")
	public String getContractLevel() {
		return contractLevel;
	}
	public void setContractLevel(String contractLevel) {
		this.contractLevel = contractLevel;
	}
	
	@Column(name="APPROVALLOG")
	public String getApprovalLog() {
		return approvalLog;
	}
	public void setApprovalLog(String approvalLog) {
		this.approvalLog = approvalLog;
	}
	
	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Column(name="UPLOADFILE")
	public String getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(String uploadFile) {
		this.uploadFile = uploadFile;
	}
	
	@Column(name="YMD")
	public String getYmd() {
		return ymd;
	}
	public void setYmd(String ymd) {
		this.ymd = ymd;
	}



	
	
	
	
	
	
	
}