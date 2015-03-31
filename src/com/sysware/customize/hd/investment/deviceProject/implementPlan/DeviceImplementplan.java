package com.sysware.customize.hd.investment.deviceProject.implementPlan;

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

import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.GenericGenerator;

import com.luck.itumserv.entity.Department;
import com.sysware.customize.hd.investment.deviceProject.manage.DeviceManageDirpurchase;
import com.sysware.customize.hd.investment.deviceProject.manage.DeviceManageEntrusttender;
import com.sysware.customize.hd.investment.deviceProject.manage.DeviceManageSelftender;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;

/**
 * TbDeviceImplementplan entity. @author MyEclipse Persistence Tools
 */


@Entity
@Table(name = "TB_DEVICE_IMPLEMENTPLAN")
@FilterDef(name="UserPrivileges",parameters={@ParamDef(name="userid",type="string")})
@Filters({
@Filter(name = "UserPrivileges", condition = ":userid =projectmanagerid")
        })
public class DeviceImplementplan implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -5730480060018649569L;

	@Id
	@Column(name = "IMPLEMENTPLANID", nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String implementplanid;

	@Column(name = "CATEGORYS", length = 50)
	private String categorys; //类别
	
	@Column(name = "PROJECTMANAGERID", length = 50)
	private String projectmanagerid; //项目主管(用户ID)
	
	@Column(name = "PROJECTMANAGERNAME", length = 50)
	private String projectmanagername; //项目主管(用户ID)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SUBMITDATE", length = 7)
	private Date submitdate; //卡片和论证书提交时间(使用单位)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "COMPLETIONDATE", length = 7)
	private Date completiondate; //可行性论证完成时间(经营发展部)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONFIRMDATE", length = 7)
	private Date confirmdate;  //技术指标确定时间(技术改造部)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CALIBRATIONDATE", length = 7)
	private Date calibrationdate;  //完成招标和定标时间(技术改造部)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "AGREEMENT_SIGNINGDATE", length = 7)
	private Date agreementSigningdate;  //技术协议签订时间(使用单位)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACT_SIGNINGDATE", length = 7)
	private Date contractSigningdate;  //合同签订时间(签订合同单位)
	
	@Column(name = "PLANSREMARKS", length = 100)
	private String plansremarks;  //实施计划说明
	
	@Temporal(TemporalType.DATE)
	@Column(name = "PLANNINGDATE", length = 7,updatable = false,insertable=false)
	private Date planningdate;  //计划编制时间(创建时间,即执行一次)
	
	@Temporal(TemporalType.DATE)
	@Column(name = "IMPLEMENTPLAN_APPROVALTIME", length = 7)
	private Date implementplanApprovaltime;//实施计划送审时间
	
	@Temporal(TemporalType.DATE)
	@Column(name = "MANAGE_APPROVALTIME", length = 7)
	private Date manageApprovaltime;//执行管理送审时间
	
	@ManyToOne(targetEntity=Department.class)
	@JoinColumn(name="CONTRACTSIGNINGDEPARTMENT")
	private Department contractsigningdepartment;//执行管理指定的下发单位
	
	/**
	 * 实施管理:1.编制中;2.下发中;3.已下发
	 * 执行管理:3.待编制(执行管理空数据);4.编制中(定向采购);5.编制中(自行招标);6.编制中(委托招标)
	 * 7.下发中;8.已下发
	 */
	@Column(name = "STATUS", length = 2)
	private String status;  //状态
	
	@Column(name = "REMARK", length = 200)
	private String remark;  //备注
	
	@Column(name = "HEADPERSON", length = 50)
	private String headperson;  //指派负责人
	
	@ManyToOne(targetEntity=EquipRegist.class)
	@JoinColumn(name = "EQUIPREGIST_ID")
	private EquipRegist equipregistId; //外键关联设备登记表ID

	@ManyToOne(targetEntity=DeviceManageDirpurchase.class)
	@JoinColumn(name = "DIRPURCHASE_ID")
	private DeviceManageDirpurchase dirpurchaseId; //外键关联定向采购表ID
	
	@ManyToOne(targetEntity=DeviceManageSelftender.class)
	@JoinColumn(name = "SELFTENDER_ID")
	private DeviceManageSelftender selftenderId; //外键关联自行招标表ID
	
	@ManyToOne(targetEntity=DeviceManageEntrusttender.class)
	@JoinColumn(name = "ENTRUSTTENDER_ID")
	private DeviceManageEntrusttender entrusttenderId; //外键关联委托招标表ID
	
	@Column(name = "PROJECTCATEGORYS")
	private String projectcategorys;
	
	@ManyToOne(targetEntity=EquipRepair.class)
	@JoinColumn(name = "EQUIPREPAIR_ID")
	private EquipRepair equiprepairId; //外键关联设备表ID
	// Constructors

	/** default constructor */
	public DeviceImplementplan() {
	}

	/** minimal constructor */
	public DeviceImplementplan(String id) {
		this.implementplanid = id;
	}

	/** full constructor */
	public DeviceImplementplan(String id, String categorys, Date submitdate,
			Date completiondate, Date confirmdate, Date calibrationdate,
			Date agreementSigningdate, Date contractSigningdate,
			String plansremarks, Date planningdate, String status,
			String remark, String equipregistId) {
		this.implementplanid = id;
		this.categorys = categorys;
		this.submitdate = submitdate;
		this.completiondate = completiondate;
		this.confirmdate = confirmdate;
		this.calibrationdate = calibrationdate;
		this.agreementSigningdate = agreementSigningdate;
		this.contractSigningdate = contractSigningdate;
		this.plansremarks = plansremarks;
		this.planningdate = planningdate;
		this.status = status;
		this.remark = remark;
	}

	// Property accessors






	public String getImplementplanid() {
		return implementplanid;
	}

	public void setImplementplanid(String implementplanid) {
		this.implementplanid = implementplanid;
	}

	public String getCategorys() {
		return this.categorys;
	}
	
	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}


	public String getProjectmanagerid() {
		return projectmanagerid;
	}

	public void setProjectmanagerid(String projectmanagerid) {
		this.projectmanagerid = projectmanagerid;
	}

	public Date getSubmitdate() {
		return this.submitdate;
	}

	public void setSubmitdate(Date submitdate) {
		this.submitdate = submitdate;
	}


	public Date getCompletiondate() {
		return this.completiondate;
	}

	public void setCompletiondate(Date completiondate) {
		this.completiondate = completiondate;
	}


	public Date getConfirmdate() {
		return this.confirmdate;
	}

	public void setConfirmdate(Date confirmdate) {
		this.confirmdate = confirmdate;
	}


	public Date getCalibrationdate() {
		return this.calibrationdate;
	}

	public void setCalibrationdate(Date calibrationdate) {
		this.calibrationdate = calibrationdate;
	}


	public Date getAgreementSigningdate() {
		return this.agreementSigningdate;
	}

	public void setAgreementSigningdate(Date agreementSigningdate) {
		this.agreementSigningdate = agreementSigningdate;
	}


	public Date getContractSigningdate() {
		return this.contractSigningdate;
	}

	public void setContractSigningdate(Date contractSigningdate) {
		this.contractSigningdate = contractSigningdate;
	}


	public String getPlansremarks() {
		return this.plansremarks;
	}

	public void setPlansremarks(String plansremarks) {
		this.plansremarks = plansremarks;
	}


	public Date getPlanningdate() {
		return this.planningdate;
	}

	public void setPlanningdate(Date planningdate) {
		this.planningdate = planningdate;
	}


	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public EquipRegist getEquipregistId() {
		return equipregistId;
	}

	public void setEquipregistId(EquipRegist equipregistId) {
		this.equipregistId = equipregistId;
	}

	public String getProjectmanagername() {
		return projectmanagername;
	}

	public void setProjectmanagername(String projectmanagername) {
		this.projectmanagername = projectmanagername;
	}

	public DeviceManageDirpurchase getDirpurchaseId() {
		return dirpurchaseId;
	}

	public void setDirpurchaseId(DeviceManageDirpurchase dirpurchaseId) {
		this.dirpurchaseId = dirpurchaseId;
	}

	public DeviceManageSelftender getSelftenderId() {
		return selftenderId;
	}

	public void setSelftenderId(DeviceManageSelftender selftenderId) {
		this.selftenderId = selftenderId;
	}

	public DeviceManageEntrusttender getEntrusttenderId() {
		return entrusttenderId;
	}

	public void setEntrusttenderId(DeviceManageEntrusttender entrusttenderId) {
		this.entrusttenderId = entrusttenderId;
	}

	public Date getImplementplanApprovaltime() {
		return implementplanApprovaltime;
	}

	public void setImplementplanApprovaltime(Date implementplanApprovaltime) {
		this.implementplanApprovaltime = implementplanApprovaltime;
	}

	public Date getManageApprovaltime() {
		return manageApprovaltime;
	}

	public void setManageApprovaltime(Date manageApprovaltime) {
		this.manageApprovaltime = manageApprovaltime;
	}

	public Department getContractsigningdepartment() {
		return contractsigningdepartment;
	}

	public void setContractsigningdepartment(Department contractsigningdepartment) {
		this.contractsigningdepartment = contractsigningdepartment;
	}

	public String getHeadperson() {
		return headperson;
	}

	public void setHeadperson(String headperson) {
		this.headperson = headperson;
	}

	public String getProjectcategorys() {
		return projectcategorys;
	}

	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}

	public EquipRepair getEquiprepairId() {
		return equiprepairId;
	}

	public void setEquiprepairId(EquipRepair equiprepairId) {
		this.equiprepairId = equiprepairId;
	}





	
	
}