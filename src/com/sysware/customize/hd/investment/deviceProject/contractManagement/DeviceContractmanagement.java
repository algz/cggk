package com.sysware.customize.hd.investment.deviceProject.contractManagement;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;


/**
 * TbDeviceContractmanagement entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_DEVICE_CONTRACTMANAGEMENT")
public class DeviceContractmanagement implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7226879842280565914L;

	// Fields
	@Id
	@Column(name = "CONTRACTID", nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String contractid; //主键
	
	@Column(name = "CONTRACTCODE", length = 50)
	private String contractcode; //合同编号
	
	@Column(name = "CONTRACTNAME", length = 50)
	private String contractname; //合同名称
	
	@Column(name = "AMOUNT", precision = 20, scale = 4)
	private BigDecimal amount; //(合同)金额
	
	@Column(name = "AMOUNT_UNIT", length = 50)
	private String amountUnit; //金额单位
	
	@Column(name = "SECRECY", length = 50)
	private String secrecy; //合同密级
	
	@Column(name = "PARTYA", length = 50)
	private String partya; //甲方单位

	@Column(name = "OPERATORID", length = 50)
	private String operatorid; //经办人
	
	@Column(name = "CONTRACTMANAGER", length = 50)
	private String contractmanager; //合同管理员
	
	@Column(name = "LEADER", length = 50)
	private String leader; //行政分管领导

	@Column(name = "REMARK", length = 200)
	private String remark; //备注
	
	@Column(name = "FILEID", length = 100)
	private String fileid;//文件ID
	
	@Column(name = "FILENAME", length = 100)
	private String filename;//文件名称
	
	@Column(name = "status", length = 2)
	private String status;//状态
	
	@Temporal(TemporalType.DATE)
	@Column(name = "APPROVALTIME", length = 7)
	private Date approvaltime;//送审时间

	@Column(name="CONTRACT_TYPE",length=2)
	private String contracttype; //合同类型:1或空设备类型;2工程类型
	
	@Column(name="CONTRACT_LEVEL")
	private String contractlevel; //合同级别:1股份公司;2集团公司
	
	@ManyToOne(targetEntity=Vendor.class)
	@JoinColumn(name = "PARTYB")
	private Vendor partyb; //乙方
	
	@ManyToOne(targetEntity=EquipRegist.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "EQUIPREGIST_ID",insertable=false,updatable=false)
	private EquipRegist equipregist; //外键关联设备登记表ID
	
	@ManyToOne(targetEntity=CivilRegist.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "EQUIPREGIST_id",insertable=false,updatable=false)
	private CivilRegist civilregist; //外键关联土建登记表ID
	
	@ManyToOne(targetEntity=CivilRepair.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "EQUIPREGIST_id",insertable=false,updatable=false)
	private CivilRepair civilrepair; //外键关联土建大修表ID
	
	@Column(name = "EQUIPREGIST_ID")
	private String equipregistId; //设备登记表ID/设备登记表ID
	
	
	@ManyToOne(targetEntity=EquipRepair.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "EQUIPREGIST_ID",insertable=false,updatable=false)
	private EquipRepair equiprepair; //外键关联设备大修表ID

	@Column(name = "PROJECTCATEGORYS")
	private String projectcategorys;
	// Constructors
	
	/** default constructor */
	public DeviceContractmanagement() {
	}

	/** minimal constructor */
	public DeviceContractmanagement(String contractid) {
		this.contractid = contractid;
	}


	// Property accessors

	
	
	
	public String getContractid() {
		return contractid;
	}

	public void setContractid(String contractid) {
		this.contractid = contractid;
	}
	
	
	
	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
	}
	
	public String getEquipregistId() {
		return equipregistId;
	}

	public void setEquipregistId(String equipregistId) {
		this.equipregistId = equipregistId;
	}

	public String getContractcode() {
		return this.contractcode;
	}

	public void setContractcode(String contractcode) {
		this.contractcode = contractcode;
	}


	public String getContractname() {
		return this.contractname;
	}

	public void setContractname(String contractname) {
		this.contractname = contractname;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}


	public String getAmountUnit() {
		return this.amountUnit;
	}

	public void setAmountUnit(String amountUnit) {
		this.amountUnit = amountUnit;
	}


	public String getSecrecy() {
		return this.secrecy;
	}

	public void setSecrecy(String secrecy) {
		this.secrecy = secrecy;
	}


	public String getPartya() {
		return this.partya;
	}

	public void setPartya(String partya) {
		this.partya = partya;
	}

	public String getOperatorid() {
		return this.operatorid;
	}

	public void setOperatorid(String operatorid) {
		this.operatorid = operatorid;
	}


	public String getContractmanager() {
		return this.contractmanager;
	}

	public void setContractmanager(String contractmanager) {
		this.contractmanager = contractmanager;
	}


	public String getLeader() {
		return this.leader;
	}

	public void setLeader(String leader) {
		this.leader = leader;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getApprovaltime() {
		return approvaltime;
	}

	public void setApprovaltime(Date approvaltime) {
		this.approvaltime = approvaltime;
	}

	public Vendor getPartyb() {
		return partyb;
	}

	public void setPartyb(Vendor partyb) {
		this.partyb = partyb;
	}

	public String getContracttype() {
		return contracttype;
	}

	public void setContracttype(String contracttype) {
		this.contracttype = contracttype;
	}

	public EquipRegist getEquipregist() {
		return equipregist;
	}

	public void setEquipregist(EquipRegist equipregist) {
		this.equipregist = equipregist;
	}

	public CivilRegist getCivilregist() {
		return civilregist;
	}

	public void setCivilregist(CivilRegist civilregist) {
		this.civilregist = civilregist;
	}

	public String getContractlevel() {
		return contractlevel;
	}

	public void setContractlevel(String contractlevel) {
		this.contractlevel = contractlevel;
	}

	public String getProjectcategorys() {
		return projectcategorys;
	}

	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}

	public EquipRepair getEquiprepair() {
		return equiprepair;
	}

	public void setEquiprepair(EquipRepair equiprepair) {
		this.equiprepair = equiprepair;
	}

	public CivilRepair getCivilrepair() {
		return civilrepair;
	}

	public void setCivilrepair(CivilRepair civilrepair) {
		this.civilrepair = civilrepair;
	}






	
	
}