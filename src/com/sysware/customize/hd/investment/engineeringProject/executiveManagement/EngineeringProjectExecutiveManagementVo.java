package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;



import java.util.Date;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;

/**
 * TbDeviceImplementplan entity. @author MyEclipse Persistence Tools
 */
public class EngineeringProjectExecutiveManagementVo {

	private String id;
    private String dataJsonArray;
    private String civilRegistId;
	private String planFileArrivalTime ;//规划文件下达(日期)
	private String planFileArrivalDutyPerson ;//规划文件下达(责任人)
	private String planLocationFinishTime; //规划方案及选址工作完成(日期)
	private String planLocationFinishDutyPerson; //规划方案及选址工作完成(责任人)
	private String buildingPlanFinishTime; //初步建设方案完成(日期)
	private String buildingPlanFinishDutyPerson; //初步建设方案完成(责任人)
	private String licenseFinishTime;//规划许可证办理完成(日期)
	private String licenseFinishDutyPerson;//规划许可证办理完成(责任人)
	private String constructionDesignFinishTime;//施工设计完工(日期)
	private String constructionDesignDutyPerson;//施工设计完工(责任人)
	private String approvalTime; //招标控制价编制和审批(日期)
	private String approvalDutyPerson; //招标控制价编制和审批(责任人)
	private String tenderTime;//施工总包招标定标工作完成(日期)
	private String tenderDutyPerson;//施工总包招标定标工作完成(责任人)
	private String contractSignedTime;//合同签订(日期)
	private String contractSignedDutyPerson;//合同签订(责任人)
	private String startWorkTime;//开工(日期)
	private String startWorkPerson;//开工(责任人)
	private String mainAcceptanceTime;//主体验收(日期)
	private String mainAcceptanceDutyPerson;//主体验收(责任人)
	private String deliverTime;//交付(日期)
	private String deliverDutyPerson;//交付(责任人)
	private String lastupdateTime;//最新更新日期
	private String status;//审批状态
	private String projectManagerid; //项目主管ID
	private String projectManagerName; //项目主管名称
	private String useType;//使用类别(1实施计划使用,2执行管理使用)
	
	
	//其他表的关联字段
	private String projectCode ;//项目编号
	private String projectName ;//项目名称
	private String nums; //数量 
	private String numsunit; //数量单位
	private String useunit; //使用单位
	private String createtime; //计划创建时间  
	private String approvalstate; //状态
	private String remarke; //备注 
	
	
	private String projectcategorys;//项目类别
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private String dir;//远程排序使用 asc or desc 
	private String sort; //排序字段
	private String time;//查询时间
	private String fuzzyQueryString;//模糊查询的条件
	private String updateIndex;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDataJsonArray() {
		return dataJsonArray;
	}
	public void setDataJsonArray(String dataJsonArray) {
		this.dataJsonArray = dataJsonArray;
	}
	public String getCivilRegistId() {
		return civilRegistId;
	}
	public void setCivilRegistId(String civilRegistId) {
		this.civilRegistId = civilRegistId;
	}
	public String getPlanFileArrivalTime() {
		return planFileArrivalTime;
	}
	public void setPlanFileArrivalTime(String planFileArrivalTime) {
		this.planFileArrivalTime = planFileArrivalTime;
	}
	public String getPlanFileArrivalDutyPerson() {
		return planFileArrivalDutyPerson;
	}
	public void setPlanFileArrivalDutyPerson(String planFileArrivalDutyPerson) {
		this.planFileArrivalDutyPerson = planFileArrivalDutyPerson;
	}
	public String getPlanLocationFinishTime() {
		return planLocationFinishTime;
	}
	public void setPlanLocationFinishTime(String planLocationFinishTime) {
		this.planLocationFinishTime = planLocationFinishTime;
	}
	public String getPlanLocationFinishDutyPerson() {
		return planLocationFinishDutyPerson;
	}
	public void setPlanLocationFinishDutyPerson(String planLocationFinishDutyPerson) {
		this.planLocationFinishDutyPerson = planLocationFinishDutyPerson;
	}
	public String getBuildingPlanFinishTime() {
		return buildingPlanFinishTime;
	}
	public void setBuildingPlanFinishTime(String buildingPlanFinishTime) {
		this.buildingPlanFinishTime = buildingPlanFinishTime;
	}
	public String getBuildingPlanFinishDutyPerson() {
		return buildingPlanFinishDutyPerson;
	}
	public void setBuildingPlanFinishDutyPerson(String buildingPlanFinishDutyPerson) {
		this.buildingPlanFinishDutyPerson = buildingPlanFinishDutyPerson;
	}
	public String getLicenseFinishTime() {
		return licenseFinishTime;
	}
	public void setLicenseFinishTime(String licenseFinishTime) {
		this.licenseFinishTime = licenseFinishTime;
	}
	public String getLicenseFinishDutyPerson() {
		return licenseFinishDutyPerson;
	}
	public void setLicenseFinishDutyPerson(String licenseFinishDutyPerson) {
		this.licenseFinishDutyPerson = licenseFinishDutyPerson;
	}
	public String getConstructionDesignFinishTime() {
		return constructionDesignFinishTime;
	}
	public void setConstructionDesignFinishTime(String constructionDesignFinishTime) {
		this.constructionDesignFinishTime = constructionDesignFinishTime;
	}
	public String getConstructionDesignDutyPerson() {
		return constructionDesignDutyPerson;
	}
	public void setConstructionDesignDutyPerson(String constructionDesignDutyPerson) {
		this.constructionDesignDutyPerson = constructionDesignDutyPerson;
	}
	public String getApprovalTime() {
		return approvalTime;
	}
	public void setApprovalTime(String approvalTime) {
		this.approvalTime = approvalTime;
	}
	public String getApprovalDutyPerson() {
		return approvalDutyPerson;
	}
	public void setApprovalDutyPerson(String approvalDutyPerson) {
		this.approvalDutyPerson = approvalDutyPerson;
	}
	public String getTenderTime() {
		return tenderTime;
	}
	public void setTenderTime(String tenderTime) {
		this.tenderTime = tenderTime;
	}
	public String getTenderDutyPerson() {
		return tenderDutyPerson;
	}
	public void setTenderDutyPerson(String tenderDutyPerson) {
		this.tenderDutyPerson = tenderDutyPerson;
	}
	public String getContractSignedTime() {
		return contractSignedTime;
	}
	public void setContractSignedTime(String contractSignedTime) {
		this.contractSignedTime = contractSignedTime;
	}
	public String getContractSignedDutyPerson() {
		return contractSignedDutyPerson;
	}
	public void setContractSignedDutyPerson(String contractSignedDutyPerson) {
		this.contractSignedDutyPerson = contractSignedDutyPerson;
	}
	public String getStartWorkTime() {
		return startWorkTime;
	}
	public void setStartWorkTime(String startWorkTime) {
		this.startWorkTime = startWorkTime;
	}
	public String getStartWorkPerson() {
		return startWorkPerson;
	}
	public void setStartWorkPerson(String startWorkPerson) {
		this.startWorkPerson = startWorkPerson;
	}
	public String getMainAcceptanceTime() {
		return mainAcceptanceTime;
	}
	public void setMainAcceptanceTime(String mainAcceptanceTime) {
		this.mainAcceptanceTime = mainAcceptanceTime;
	}
	public String getMainAcceptanceDutyPerson() {
		return mainAcceptanceDutyPerson;
	}
	public void setMainAcceptanceDutyPerson(String mainAcceptanceDutyPerson) {
		this.mainAcceptanceDutyPerson = mainAcceptanceDutyPerson;
	}
	public String getDeliverTime() {
		return deliverTime;
	}
	public void setDeliverTime(String deliverTime) {
		this.deliverTime = deliverTime;
	}
	public String getDeliverDutyPerson() {
		return deliverDutyPerson;
	}
	public void setDeliverDutyPerson(String deliverDutyPerson) {
		this.deliverDutyPerson = deliverDutyPerson;
	}
	public String getLastupdateTime() {
		return lastupdateTime;
	}
	public void setLastupdateTime(String lastupdateTime) {
		this.lastupdateTime = lastupdateTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getProjectManagerid() {
		return projectManagerid;
	}
	public void setProjectManagerid(String projectManagerid) {
		this.projectManagerid = projectManagerid;
	}
	public String getProjectManagerName() {
		return projectManagerName;
	}
	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
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
	public String getNums() {
		return nums;
	}
	public void setNums(String nums) {
		this.nums = nums;
	}
	public String getNumsunit() {
		return numsunit;
	}
	public void setNumsunit(String numsunit) {
		this.numsunit = numsunit;
	}
	public String getUseunit() {
		return useunit;
	}
	public void setUseunit(String useunit) {
		this.useunit = useunit;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getApprovalstate() {
		return approvalstate;
	}
	public void setApprovalstate(String approvalstate) {
		this.approvalstate = approvalstate;
	}
	public String getRemarke() {
		return remarke;
	}
	public void setRemarke(String remarke) {
		this.remarke = remarke;
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
	public String getUseType() {
		return useType;
	}
	public void setUseType(String useType) {
		this.useType = useType;
	}
	public String getProjectcategorys() {
		return projectcategorys;
	}
	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}
	
	
	
	
	
	
}