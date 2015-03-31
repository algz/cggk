package com.sysware.customize.hd.investment.procurementExecute.tenderFile;

/**
 * 招标项目上传 vo
 * @author fanzhihui
 *
 */
public class TenderFileVo {

	private String tenderFileId;//主键
	private String  tenderFileCode; //编号
	private String plenipotentiary; //全权代表
	private String tenderId;//招标主表
	private String  procurementplanDetilName; //招标项目名称
	
	private String createdate; //上传文件日期
	private String efficiency;//资金来源
	private String  agreementdepartment; //协议单位
	private String selecteddepartment;//中标单位
	private String  tenderFileType; //文件类型1委托审签2委托文件3招标文件4管理登记5评审文件6中标通知书7谈判记录8定向9委托10比价
	
	private String syndic; //评审人员
	private String status;//状态
	private String  remark; //备注
	private String fileId;//文件id
	private String fileName;//文件name
	private String amount;//总金额
	private String applicationDepartment;//申请单位
	public String getTenderFileId() {
		return tenderFileId;
	}
	public void setTenderFileId(String tenderFileId) {
		this.tenderFileId = tenderFileId;
	}
	public String getTenderFileCode() {
		return tenderFileCode;
	}
	public void setTenderFileCode(String tenderFileCode) {
		this.tenderFileCode = tenderFileCode;
	}
	public String getPlenipotentiary() {
		return plenipotentiary;
	}
	public void setPlenipotentiary(String plenipotentiary) {
		this.plenipotentiary = plenipotentiary;
	}
	public String getTenderId() {
		return tenderId;
	}
	public void setTenderId(String tenderId) {
		this.tenderId = tenderId;
	}
	public String getProcurementplanDetilName() {
		return procurementplanDetilName;
	}
	public void setProcurementplanDetilName(String procurementplanDetilName) {
		this.procurementplanDetilName = procurementplanDetilName;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getEfficiency() {
		return efficiency;
	}
	public void setEfficiency(String efficiency) {
		this.efficiency = efficiency;
	}
	public String getAgreementdepartment() {
		return agreementdepartment;
	}
	public void setAgreementdepartment(String agreementdepartment) {
		this.agreementdepartment = agreementdepartment;
	}
	public String getSelecteddepartment() {
		return selecteddepartment;
	}
	public void setSelecteddepartment(String selecteddepartment) {
		this.selecteddepartment = selecteddepartment;
	}

	public String getTenderFileType() {
		return tenderFileType;
	}
	public void setTenderFileType(String tenderFileType) {
		this.tenderFileType = tenderFileType;
	}
	public String getSyndic() {
		return syndic;
	}
	public void setSyndic(String syndic) {
		this.syndic = syndic;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getApplicationDepartment() {
		return applicationDepartment;
	}
	public void setApplicationDepartment(String applicationDepartment) {
		this.applicationDepartment = applicationDepartment;
	}
	
	
	
}
