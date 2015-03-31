package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan.BuinessPlan;

/**
 * 物资需求实体
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
@Entity
@Table(name = "T_PROCUREMENT")
public class Procurement implements Serializable {

	private static final long serialVersionUID = -825320314404205076L;

	private String procurementId;// 采购需求ID
	private String procurementCode;// 采购需求编号
	private BigDecimal actualPurchase;// 实际采购数量
	private Date deliveryDate;// 交货日期
	private String procurementType;// 需求类型：年度采购需求（1）； 零星采购需求（2）
	private String reportedor;// 填报人
	private Date createDate;// 生成日期
	private String remarks;// 备注
	private String flag;// 状态：未发布（0）；已发布（1）
	private String approvalPerson;// 申请人
	private String requireDemartment;// 需求单位
	private BuinessPlan buinessPlan;//经营计划
	private String sourcetype;

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProcurementId() {
		return procurementId;
	}

	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}

	public String getProcurementCode() {
		return procurementCode;
	}

	public void setProcurementCode(String procurementCode) {
		this.procurementCode = procurementCode;
	}

	public BigDecimal getActualPurchase() {
		return actualPurchase;
	}

	public void setActualPurchase(BigDecimal actualPurchase) {
		this.actualPurchase = actualPurchase;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getProcurementType() {
		return procurementType;
	}

	public void setProcurementType(String procurementType) {
		this.procurementType = procurementType;
	}

	public String getReportedor() {
		return reportedor;
	}

	public void setReportedor(String reportedor) {
		this.reportedor = reportedor;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getApprovalPerson() {
		return approvalPerson;
	}

	public void setApprovalPerson(String approvalPerson) {
		this.approvalPerson = approvalPerson;
	}

	public String getRequireDemartment() {
		return requireDemartment;
	}

	public void setRequireDemartment(String requireDemartment) {
		this.requireDemartment = requireDemartment;
	}

	@ManyToOne
	@JoinColumn(name = "buinessPlanId")
	public BuinessPlan getBuinessPlan() {
		return buinessPlan;
	}

	public void setBuinessPlan(BuinessPlan buinessPlan) {
		this.buinessPlan = buinessPlan;
	}

	public String getSourcetype() {
		return sourcetype;
	}

	public void setSourcetype(String sourcetype) {
		this.sourcetype = sourcetype;
	}

	
}
