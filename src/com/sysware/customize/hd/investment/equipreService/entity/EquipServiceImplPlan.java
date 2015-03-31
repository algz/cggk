package com.sysware.customize.hd.investment.equipreService.entity;

import java.io.Serializable;
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

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;

@Entity
@Table(name = "TB_EQUIPSERVICE_IMPLPLAN")
public class EquipServiceImplPlan implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2491841270069342852L;
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@ManyToOne(targetEntity=EquipRepair.class)
	@JoinColumn(name = "EQUIPREPAIR_ID")
	private EquipRepair equipRepairId;//外键关联设备大修
	
	@Column(name = "PROJECTMANAGERID", length = 50)
	private String projectManagerId; //项目主管(用户ID)
	
	@Column(name = "PROJECTMANAGER", length = 50)
	private String projectManager; //项目主管
	
	@Column(name = "HEADPERSON", length = 50)
	private String headPerson;//负责人
	
	@Column(name = "HEADPERSONID", length = 50)
	private String headPersonId;//负责人id
	
	@Temporal(TemporalType.DATE)
	@Column(name = "REPAIRCARDTIME",length = 7)
	private Date repairCardTime; //计划维修卡片时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "REPAIRUNITIME",length = 7)
	private Date repairUnitime; //计划确定维修单位时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACTSIGNTIME",length = 7)
	private Date contractSignTime; //计划合同签订时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SUBAPPROVALTIME",length = 7)
	private Date subApprovalTime; //计划提交验收时间
	
	@Column(name = "CREATETIME")
	private Date createTime; //计划编制时间
	
	@Column(name = "STATUS")
	private String status;//审批状态

	@Column(name = "REMARK")
	private String remark;//备注
	
	@Temporal(TemporalType.DATE)
	@Column(name = "REPAIRCARDTIME_EXECUTE",length = 7)
	private Date repairCardTimeExecute; //执行维修卡片时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "REPAIRUNITIME_EXECUTE",length = 7)
	private Date repairUnitimeExecute; //执行确定维修单位时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACTSIGNTIME_EXECUTE",length = 7)
	private Date contractSignTimeExecute; //执行合同签订时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SUBAPPROVALTIME_EXECUTE",length = 7)
	private Date subApprovalTimeExecute; //执行提交验收时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public EquipRepair getEquipRepairId() {
		return equipRepairId;
	}

	public void setEquipRepairId(EquipRepair equipRepairId) {
		this.equipRepairId = equipRepairId;
	}

	public String getProjectManagerId() {
		return projectManagerId;
	}

	public void setProjectManagerId(String projectManagerId) {
		this.projectManagerId = projectManagerId;
	}

	public String getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}

	public String getHeadPerson() {
		return headPerson;
	}

	public void setHeadPerson(String headPerson) {
		this.headPerson = headPerson;
	}

	public String getHeadPersonId() {
		return headPersonId;
	}

	public void setHeadPersonId(String headPersonId) {
		this.headPersonId = headPersonId;
	}

	public Date getRepairCardTime() {
		return repairCardTime;
	}

	public void setRepairCardTime(Date repairCardTime) {
		this.repairCardTime = repairCardTime;
	}

	public Date getRepairUnitime() {
		return repairUnitime;
	}

	public void setRepairUnitime(Date repairUnitime) {
		this.repairUnitime = repairUnitime;
	}

	public Date getContractSignTime() {
		return contractSignTime;
	}

	public void setContractSignTime(Date contractSignTime) {
		this.contractSignTime = contractSignTime;
	}

	public Date getSubApprovalTime() {
		return subApprovalTime;
	}

	public void setSubApprovalTime(Date subApprovalTime) {
		this.subApprovalTime = subApprovalTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	public Date getRepairCardTimeExecute() {
		return repairCardTimeExecute;
	}

	public void setRepairCardTimeExecute(Date repairCardTimeExecute) {
		this.repairCardTimeExecute = repairCardTimeExecute;
	}

	public Date getRepairUnitimeExecute() {
		return repairUnitimeExecute;
	}

	public void setRepairUnitimeExecute(Date repairUnitimeExecute) {
		this.repairUnitimeExecute = repairUnitimeExecute;
	}

	public Date getContractSignTimeExecute() {
		return contractSignTimeExecute;
	}

	public void setContractSignTimeExecute(Date contractSignTimeExecute) {
		this.contractSignTimeExecute = contractSignTimeExecute;
	}

	public Date getSubApprovalTimeExecute() {
		return subApprovalTimeExecute;
	}

	public void setSubApprovalTimeExecute(Date subApprovalTimeExecute) {
		this.subApprovalTimeExecute = subApprovalTimeExecute;
	}
	
	
}
