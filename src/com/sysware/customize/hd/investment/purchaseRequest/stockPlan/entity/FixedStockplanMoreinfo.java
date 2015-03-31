package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * 
 * 固定资产实体类
 * 
 * @author lit
 * 
 * @date 2011.10.10
 * 
 */

@Entity
@Table(name = "T_ProcurementPlan_fixed_detil")
public class FixedStockplanMoreinfo {
	private String fixid;
	private String procurementPlan_ID;
	private String declarePlan_detil_ID;
	private BigDecimal price;
	private BigDecimal budget;
	private BigDecimal budout;
	private BigDecimal selfmoney;
	private BigDecimal total;
	private BigDecimal amount;
	private Date procurementdate;
	private String procurementtype;
	private String demartment;
	private String remark;
	private String status;
	private String task_Code;// 任务编号
	private BigDecimal power_Consumption;// 耗电量
	private BigDecimal area;// 使用面积
	private String plant;// 生产厂家
	private String installationofplant;// 安装厂房
	private String effectiveness;// 有效性
	private Date updateDate;// 修改时间
	private String fileId;//技借卡Id
	private String fileName;//技借卡名称

	@Id
	@Column(name = "PROCUREMENTPLAN_FIXED_DETIL_ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getFixid() {
		return fixid;
	}

	public void setFixid(String fixid) {
		this.fixid = fixid;
	}

	 
	public BigDecimal getBudget() {
		return budget;
	}

	public void setBudget(BigDecimal budget) {
		this.budget = budget;
	}

	public BigDecimal getBudout() {
		return budout;
	}

	public void setBudout(BigDecimal budout) {
		this.budout = budout;
	}

	public BigDecimal getSelfmoney() {
		return selfmoney;
	}

	public void setSelfmoney(BigDecimal selfmoney) {
		this.selfmoney = selfmoney;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Date getProcurementdate() {
		return procurementdate;
	}

	public void setProcurementdate(Date procurementdate) {
		this.procurementdate = procurementdate;
	}

	public String getProcurementtype() {
		return procurementtype;
	}

	public void setProcurementtype(String procurementtype) {
		this.procurementtype = procurementtype;
	}

	public String getDemartment() {
		return demartment;
	}

	public void setDemartment(String demartment) {
		this.demartment = demartment;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getProcurementPlan_ID() {
		return procurementPlan_ID;
	}

	public void setProcurementPlan_ID(String procurementPlanID) {
		procurementPlan_ID = procurementPlanID;
	}

	public String getDeclarePlan_detil_ID() {
		return declarePlan_detil_ID;
	}

	public void setDeclarePlan_detil_ID(String declarePlanDetilID) {
		declarePlan_detil_ID = declarePlanDetilID;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTask_Code() {
		return task_Code;
	}

	public void setTask_Code(String taskCode) {
		task_Code = taskCode;
	}

 
 

	public String getPlant() {
		return plant;
	}

	public void setPlant(String plant) {
		this.plant = plant;
	}

	public String getInstallationofplant() {
		return installationofplant;
	}

	public void setInstallationofplant(String installationofplant) {
		this.installationofplant = installationofplant;
	}

	public String getEffectiveness() {
		return effectiveness;
	}

	public void setEffectiveness(String effectiveness) {
		this.effectiveness = effectiveness;
	}

	 
	public BigDecimal getPower_Consumption() {
		return power_Consumption;
	}

	public void setPower_Consumption(BigDecimal powerConsumption) {
		power_Consumption = powerConsumption;
	}

	public BigDecimal getArea() {
		return area;
	}

	public void setArea(BigDecimal area) {
		this.area = area;
	}
	@Temporal(TemporalType.DATE)
	public Date getUpdateDate() {
		return updateDate;
	}
	
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
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

	 

}
