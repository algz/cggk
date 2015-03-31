package com.sysware.customize.hd.investment.procurementExecute.tender;

public class TenderVo {
	   private String tenderId;//标书ID
       private String tenderName;//标书名称
       private String tenderCode;//标书编号
       private String tenderType;//招标类型1招标2委托3定向采购4委托招标5自行比价
       private String tenderDepartment;//招标单位 
       private String plenipotentiary;//全权代表
       private String createDate;//日期
       private String tenderFile;//招标文件
       private String registrationFile;//招标管理登记文件或采购/比价/协议
       private String remark;//招标备注
       private String reviewFile;//评审文件
       private String status;//状态
       private String noticeFile;//通知文件
       private String negotiationFile;//谈判记录
       private String  TenderProcurementdetilId;//唯一标识
       private String  procurementPlanDetilId;//采购计划详细ID
       private String  procurementPlanDetilName;// 采购计划详细名称  
       private String tenderFileType;//招标文件执行流程
       public String getTenderFileType() {
		return tenderFileType;
	}
	public void setTenderFileType(String tenderFileType) {
		this.tenderFileType = tenderFileType;
	}
	private String pageType;
       private int start;
       private int limit;
	 
	public String getTenderName() {
		return tenderName;
	}
	public void setTenderName(String tenderName) {
		this.tenderName = tenderName;
	}
	public String getTenderCode() {
		return tenderCode;
	}
	public void setTenderCode(String tenderCode) {
		this.tenderCode = tenderCode;
	}
	public String getTenderType() {
		return tenderType;
	}
	public void setTenderType(String tenderType) {
		this.tenderType = tenderType;
	}
	public String getTenderDepartment() {
		return tenderDepartment;
	}
	public void setTenderDepartment(String tenderDepartment) {
		this.tenderDepartment = tenderDepartment;
	}
	public String getPlenipotentiary() {
		return plenipotentiary;
	}
	public void setPlenipotentiary(String plenipotentiary) {
		this.plenipotentiary = plenipotentiary;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getTenderFile() {
		return tenderFile;
	}
	public void setTenderFile(String tenderFile) {
		this.tenderFile = tenderFile;
	}
	public String getRegistrationFile() {
		return registrationFile;
	}
	public void setRegistrationFile(String registrationFile) {
		this.registrationFile = registrationFile;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getReviewFile() {
		return reviewFile;
	}
	public void setReviewFile(String reviewFile) {
		this.reviewFile = reviewFile;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getNoticeFile() {
		return noticeFile;
	}
	public void setNoticeFile(String noticeFile) {
		this.noticeFile = noticeFile;
	}
	public String getNegotiationFile() {
		return negotiationFile;
	}
	public void setNegotiationFile(String negotiationFile) {
		this.negotiationFile = negotiationFile;
	}
 
	public String getProcurementPlanDetilName() {
		return procurementPlanDetilName;
	}
	public void setProcurementPlanDetilName(String procurementPlanDetilName) {
		this.procurementPlanDetilName = procurementPlanDetilName;
	} 
	public String getTenderProcurementdetilId() {
		return TenderProcurementdetilId;
	}
	public void setTenderProcurementdetilId(String tenderProcurementdetilId) {
		TenderProcurementdetilId = tenderProcurementdetilId;
	}
	public String getProcurementPlanDetilId() {
		return procurementPlanDetilId;
	}
	public void setProcurementPlanDetilId(String procurementPlanDetilId) {
		this.procurementPlanDetilId = procurementPlanDetilId;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getPageType() {
		return pageType;
	}
	public void setPageType(String pageType) {
		this.pageType = pageType;
	}
	public String getTenderId() {
		return tenderId;
	}
	public void setTenderId(String tenderId) {
		this.tenderId = tenderId;
	}
}
