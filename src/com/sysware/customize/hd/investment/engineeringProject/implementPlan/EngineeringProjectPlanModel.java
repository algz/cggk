package com.sysware.customize.hd.investment.engineeringProject.implementPlan;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;

/**
 * TbDeviceImplementplan entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_ENGINEERINGPLANDETAILS")
public class EngineeringProjectPlanModel implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	
	@Override
	public Object clone(){ 
		EngineeringProjectPlanModel o = null; 
	try{ 
		o = (EngineeringProjectPlanModel)super.clone(); 
    }catch(CloneNotSupportedException e){ 
		e.printStackTrace(); 
    } 
		return o; 
    }
	
	
	
	
	
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	/*
	@ManyToOne(fetch=FetchType.EAGER,optional=true,cascade=CascadeType.REFRESH)
	@JoinColumn(name = "CIVILREGISTID")
	private CivilRegist civilRegist; //外键关联(土建登记表id)
	*/
	
	/*//这里可能有问题 需要后期测试
	@OneToOne(optional=false)
    @JoinColumn(name="CIVILREGISTID", unique=false, nullable=true)
    @PrimaryKeyJoinColumn
    private CivilRegist civilRegist; //外键关联(土建登记表id)
*/	
	@ManyToOne(targetEntity=CivilRegist.class)
	@JoinColumn(name = "CIVILREGISTID")
	private CivilRegist civilRegistId;
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "PLANFILEARRIVALTIME")
	private Date planFileArrivalTime ;//规划文件下达(日期)
	@Column(name = "PLANFILEARRIVALDUTYPERSON", length = 64)
	private String planFileArrivalDutyPerson ;//规划文件下达(责任人)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "PLANLOCATIONFINISHTIME")
	private Date planLocationFinishTime; //规划方案及选址工作完成(日期)
	@Column(name = "PLANLOCATIONFINISHDUTYPERSON", length = 64)
	private String planLocationFinishDutyPerson; //规划方案及选址工作完成(责任人)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "BUILDINGPLANFINISHTIME")
	private Date buildingPlanFinishTime; //初步建设方案完成(日期)
	@Column(name = "BUILDINGPLANFINISHDUTYPERSON", length = 64)
	private String buildingPlanFinishDutyPerson; //初步建设方案完成(责任人)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "LICENSEFINISHTIME")
	private Date licenseFinishTime;//规划许可证办理完成(日期)
	@Column(name = "LICENSEFINISHDUTYPERSON", length = 64)
	private String licenseFinishDutyPerson;//规划许可证办理完成(责任人)
	
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONSTRUCTIONDESIGNFINISHTIME")
	private Date constructionDesignFinishTime;//施工设计完工(日期)
	@Column(name = "CONSTRUCTIONDESIGNDUTYPERSON", length = 64)
	private String constructionDesignDutyPerson;//施工设计完工(责任人)
	
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "APPROVALTIME")
	private Date approvalTime; //招标控制价编制和审批(日期)
	@Column(name = "APPROVALDUTYPERSON", length = 64)
	private String approvalDutyPerson; //招标控制价编制和审批(责任人)
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "TENDERTIME")
	private Date tenderTime;//施工总包招标定标工作完成(日期)
	@Column(name = "TENDERDUTYPERSON", length = 64)
	private String tenderDutyPerson;//施工总包招标定标工作完成(责任人)
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACTSIGNEDTIME")
	private Date contractSignedTime;//合同签订(日期)
	@Column(name = "CONTRACTSIGNEDDUTYPERSON", length = 64)
	private String contractSignedDutyPerson;//合同签订(责任人)
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "STARTWORKTIME")
	private Date startWorkTime;//开工(日期)
	@Column(name = "STARTWORKPERSON", length = 64)
	private String startWorkPerson;//开工(责任人)
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "MAINACCEPTANCETIME")
	private Date mainAcceptanceTime;//主体验收(日期)
	@Column(name = "MAINACCEPTANCEDUTYPERSON", length = 64)
	private String mainAcceptanceDutyPerson;//主体验收(责任人)
	
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "DELIVERTIME")
	private Date deliverTime;//交付(日期)
	@Column(name = "DELIVERDUTYPERSON", length = 64)
	private String deliverDutyPerson;//交付(责任人)
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "LASTUPDATETIME")
	private Date lastupdateTime;//最新更新日期


	@Column(name = "PROJECTMANAGERNAME")
	private String projectManagerName;//项目主管
	
	@Column(name = "STATUS")
	private String status;//审批状态
	
	@Column(name = "HEADPERSON")
	private String headperson;  //指派负责人
	
	@Column(name = "USETYPE")
	private String useType;//使用类别(1实施计划使用,2执行管理使用)
	
	
	@Column(name = "PROJECTCATEGORYS")
	private String projectcategorys;//项目类别
	
	@ManyToOne(targetEntity=CivilRepair.class)
	@JoinColumn(name = "CIVILREPAIR_ID")
	private CivilRepair civilRepairId;
	
	
	
	

	public String getUseType() {
		return useType;
	}


	public void setUseType(String useType) {
		this.useType = useType;
	}


	public String getProjectManagerName() {
		return projectManagerName;
	}


	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}



	public Date getPlanFileArrivalTime() {
		return planFileArrivalTime;
	}


	public void setPlanFileArrivalTime(Date planFileArrivalTime) {
		this.planFileArrivalTime = planFileArrivalTime;
	}


	public String getPlanFileArrivalDutyPerson() {
		return planFileArrivalDutyPerson;
	}


	public void setPlanFileArrivalDutyPerson(String planFileArrivalDutyPerson) {
		this.planFileArrivalDutyPerson = planFileArrivalDutyPerson;
	}


	public Date getPlanLocationFinishTime() {
		return planLocationFinishTime;
	}


	public void setPlanLocationFinishTime(Date planLocationFinishTime) {
		this.planLocationFinishTime = planLocationFinishTime;
	}


	public String getPlanLocationFinishDutyPerson() {
		return planLocationFinishDutyPerson;
	}


	public void setPlanLocationFinishDutyPerson(String planLocationFinishDutyPerson) {
		this.planLocationFinishDutyPerson = planLocationFinishDutyPerson;
	}


	public Date getBuildingPlanFinishTime() {
		return buildingPlanFinishTime;
	}


	public void setBuildingPlanFinishTime(Date buildingPlanFinishTime) {
		this.buildingPlanFinishTime = buildingPlanFinishTime;
	}


	public String getBuildingPlanFinishDutyPerson() {
		return buildingPlanFinishDutyPerson;
	}


	public void setBuildingPlanFinishDutyPerson(String buildingPlanFinishDutyPerson) {
		this.buildingPlanFinishDutyPerson = buildingPlanFinishDutyPerson;
	}


	public Date getLicenseFinishTime() {
		return licenseFinishTime;
	}


	public void setLicenseFinishTime(Date licenseFinishTime) {
		this.licenseFinishTime = licenseFinishTime;
	}


	public String getLicenseFinishDutyPerson() {
		return licenseFinishDutyPerson;
	}


	public void setLicenseFinishDutyPerson(String licenseFinishDutyPerson) {
		this.licenseFinishDutyPerson = licenseFinishDutyPerson;
	}


	public Date getConstructionDesignFinishTime() {
		return constructionDesignFinishTime;
	}


	public void setConstructionDesignFinishTime(Date constructionDesignFinishTime) {
		this.constructionDesignFinishTime = constructionDesignFinishTime;
	}


	public String getConstructionDesignDutyPerson() {
		return constructionDesignDutyPerson;
	}


	public void setConstructionDesignDutyPerson(String constructionDesignDutyPerson) {
		this.constructionDesignDutyPerson = constructionDesignDutyPerson;
	}


	public Date getApprovalTime() {
		return approvalTime;
	}


	public void setApprovalTime(Date approvalTime) {
		this.approvalTime = approvalTime;
	}


	public String getApprovalDutyPerson() {
		return approvalDutyPerson;
	}


	public void setApprovalDutyPerson(String approvalDutyPerson) {
		this.approvalDutyPerson = approvalDutyPerson;
	}


	public Date getTenderTime() {
		return tenderTime;
	}


	public void setTenderTime(Date tenderTime) {
		this.tenderTime = tenderTime;
	}


	public String getTenderDutyPerson() {
		return tenderDutyPerson;
	}


	public void setTenderDutyPerson(String tenderDutyPerson) {
		this.tenderDutyPerson = tenderDutyPerson;
	}


	public Date getContractSignedTime() {
		return contractSignedTime;
	}


	public void setContractSignedTime(Date contractSignedTime) {
		this.contractSignedTime = contractSignedTime;
	}


	public String getContractSignedDutyPerson() {
		return contractSignedDutyPerson;
	}


	public void setContractSignedDutyPerson(String contractSignedDutyPerson) {
		this.contractSignedDutyPerson = contractSignedDutyPerson;
	}


	public Date getStartWorkTime() {
		return startWorkTime;
	}


	public void setStartWorkTime(Date startWorkTime) {
		this.startWorkTime = startWorkTime;
	}


	public String getStartWorkPerson() {
		return startWorkPerson;
	}


	public void setStartWorkPerson(String startWorkPerson) {
		this.startWorkPerson = startWorkPerson;
	}


	public Date getMainAcceptanceTime() {
		return mainAcceptanceTime;
	}


	public void setMainAcceptanceTime(Date mainAcceptanceTime) {
		this.mainAcceptanceTime = mainAcceptanceTime;
	}


	public String getMainAcceptanceDutyPerson() {
		return mainAcceptanceDutyPerson;
	}


	public void setMainAcceptanceDutyPerson(String mainAcceptanceDutyPerson) {
		this.mainAcceptanceDutyPerson = mainAcceptanceDutyPerson;
	}


	public Date getDeliverTime() {
		return deliverTime;
	}


	public void setDeliverTime(Date deliverTime) {
		this.deliverTime = deliverTime;
	}


	public String getDeliverDutyPerson() {
		return deliverDutyPerson;
	}


	public void setDeliverDutyPerson(String deliverDutyPerson) {
		this.deliverDutyPerson = deliverDutyPerson;
	}


	public Date getLastupdateTime() {
		return lastupdateTime;
	}


	public void setLastupdateTime(Date lastupdateTime) {
		this.lastupdateTime = lastupdateTime;
	}


	public String getHeadperson() {
		return headperson;
	}


	public void setHeadperson(String headperson) {
		this.headperson = headperson;
	}


	public CivilRegist getCivilRegistId() {
		return civilRegistId;
	}


	public void setCivilRegistId(CivilRegist civilRegistId) {
		this.civilRegistId = civilRegistId;
	}


	public String getProjectcategorys() {
		return projectcategorys;
	}


	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}


	public CivilRepair getCivilRepairId() {
		return civilRepairId;
	}


	public void setCivilRepairId(CivilRepair civilRepairId) {
		this.civilRepairId = civilRepairId;
	}


}