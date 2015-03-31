package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;
import java.util.Date;


public class FixedAssetAcceptanceApplyModelVo {
	private String fixedAssetAcceptanceApplyId;//主键
	private String civilregistId; //外键关联ID
	private String applyAcceptanceTime ; //申请验收时间
	private String projectManagerName ; //项目主管
	private String tel ; //联系电话
	private String contractmanuFacturers ; //合同厂商
	private String contractmanuFacturersTel ; //联系电话
	private String contactPerson ; //联系人
	private String opinion ; //主管意见
	private String dataJsonArray;
	private String projectCode ;//项目编号
	private String projectName ;//项目名称
	private String status;//状态 
	
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private String dir;//远程排序使用 asc or desc 
	private String sort; //排序字段
	private String time;//查询时间
	private String fuzzyQueryString;//模糊查询的条件
	private String updateIndex;
	
	private String vendorId;
	
	
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getFixedAssetAcceptanceApplyId() {
		return fixedAssetAcceptanceApplyId;
	}
	public void setFixedAssetAcceptanceApplyId(String fixedAssetAcceptanceApplyId) {
		this.fixedAssetAcceptanceApplyId = fixedAssetAcceptanceApplyId;
	}
	public String getCivilregistId() {
		return civilregistId;
	}
	public void setCivilregistId(String civilregistId) {
		this.civilregistId = civilregistId;
	}
	public String getApplyAcceptanceTime() {
		return applyAcceptanceTime;
	}
	public void setApplyAcceptanceTime(String applyAcceptanceTime) {
		this.applyAcceptanceTime = applyAcceptanceTime;
	}
	public String getProjectManagerName() {
		return projectManagerName;
	}
	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getContractmanuFacturers() {
		return contractmanuFacturers;
	}
	public void setContractmanuFacturers(String contractmanuFacturers) {
		this.contractmanuFacturers = contractmanuFacturers;
	}
	public String getContractmanuFacturersTel() {
		return contractmanuFacturersTel;
	}
	public void setContractmanuFacturersTel(String contractmanuFacturersTel) {
		this.contractmanuFacturersTel = contractmanuFacturersTel;
	}
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	public String getOpinion() {
		return opinion;
	}
	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}
	public String getDataJsonArray() {
		return dataJsonArray;
	}
	public void setDataJsonArray(String dataJsonArray) {
		this.dataJsonArray = dataJsonArray;
	}
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getFuzzyQueryString() {
		return fuzzyQueryString;
	}
	public void setFuzzyQueryString(String fuzzyQueryString) {
		this.fuzzyQueryString = fuzzyQueryString;
	}
	public String getUpdateIndex() {
		return updateIndex;
	}
	public void setUpdateIndex(String updateIndex) {
		this.updateIndex = updateIndex;
	}
	
	
}
