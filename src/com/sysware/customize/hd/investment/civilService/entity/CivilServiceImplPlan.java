package com.sysware.customize.hd.investment.civilService.entity;

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
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;

@Entity
@Table(name = "TB_CIVILSERVICE_IMPLPLAN")
public class CivilServiceImplPlan implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7458894652028550439L;

	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@ManyToOne(targetEntity=CivilRepair.class)
	@JoinColumn(name = "CIVILREPAIR_ID")
	private CivilRepair civilRepairId;//外键关联设备大修
	
	@Column(name = "PROJECTMANAGERID", length = 50)
	private String projectManagerId; //项目主管(用户ID)
	
	@Column(name = "PROJECTMANAGER", length = 50)
	private String projectManager; //项目主管
	
	@Column(name = "HEADPERSON", length = 50)
	private String headPerson;//负责人
	
	@Column(name = "HEADPERSONID", length = 50)
	private String headPersonId;//负责人id
	
	@Temporal(TemporalType.DATE)
	@Column(name = "THINREQUIRETIME",length = 7)
	private Date thinRequireTime; //计划细化需求时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "COMPLETEBIDSTIME",length = 7)
	private Date completeBidsTime; //计划完成招标时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "BEGINCARDTIME",length = 7)
	private Date beginCardTime; //计划开工卡片时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "FORMALBEGINTIME",length = 7)
	private Date formalBeginTime; //计划正式开工时间
	
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
	@Column(name = "THINREQUIRETIME_EXECUTE",length = 7)
	private Date thinRequireTimeExecute; //执行细化需求时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "COMPLETEBIDSTIME_EXECUTE",length = 7)
	private Date completeBidsTimeExecute; //执行完成招标时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "BEGINCARDTIME_EXECUTE",length = 7)
	private Date beginCardTimeExecute; //执行开工卡片时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "FORMALBEGINTIME_EXECUTE",length = 7)
	private Date formalBeginTimeExecute; //执行正式开工时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SUBAPPROVALTIME_EXECUTE",length = 7)
	private Date subApprovalTimeExecute; //执行提交验收时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public CivilRepair getCivilRepairId() {
		return civilRepairId;
	}

	public void setCivilRepairId(CivilRepair civilRepairId) {
		this.civilRepairId = civilRepairId;
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

	public Date getThinRequireTime() {
		return thinRequireTime;
	}

	public void setThinRequireTime(Date thinRequireTime) {
		this.thinRequireTime = thinRequireTime;
	}

	public Date getCompleteBidsTime() {
		return completeBidsTime;
	}

	public void setCompleteBidsTime(Date completeBidsTime) {
		this.completeBidsTime = completeBidsTime;
	}

	public Date getBeginCardTime() {
		return beginCardTime;
	}

	public void setBeginCardTime(Date beginCardTime) {
		this.beginCardTime = beginCardTime;
	}

	public Date getFormalBeginTime() {
		return formalBeginTime;
	}

	public void setFormalBeginTime(Date formalBeginTime) {
		this.formalBeginTime = formalBeginTime;
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

	public Date getThinRequireTimeExecute() {
		return thinRequireTimeExecute;
	}

	public void setThinRequireTimeExecute(Date thinRequireTimeExecute) {
		this.thinRequireTimeExecute = thinRequireTimeExecute;
	}

	public Date getCompleteBidsTimeExecute() {
		return completeBidsTimeExecute;
	}

	public void setCompleteBidsTimeExecute(Date completeBidsTimeExecute) {
		this.completeBidsTimeExecute = completeBidsTimeExecute;
	}

	public Date getBeginCardTimeExecute() {
		return beginCardTimeExecute;
	}

	public void setBeginCardTimeExecute(Date beginCardTimeExecute) {
		this.beginCardTimeExecute = beginCardTimeExecute;
	}

	public Date getFormalBeginTimeExecute() {
		return formalBeginTimeExecute;
	}

	public void setFormalBeginTimeExecute(Date formalBeginTimeExecute) {
		this.formalBeginTimeExecute = formalBeginTimeExecute;
	}

	public Date getSubApprovalTimeExecute() {
		return subApprovalTimeExecute;
	}

	public void setSubApprovalTimeExecute(Date subApprovalTimeExecute) {
		this.subApprovalTimeExecute = subApprovalTimeExecute;
	}
	
	
}
