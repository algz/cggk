package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * 采购合同台账
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-11
 * 
 */
@SqlResultSetMapping(name = "ProcurementContractBookResults", entities = {
		@EntityResult(entityClass = ProcurementContractBook.class)}, columns = {
		@ColumnResult(name = "contractCode"),
		@ColumnResult(name = "auditCode"),
		@ColumnResult(name = "vendor"),
		@ColumnResult(name = "vendName"),
		@ColumnResult(name = "contractAmount"),
		@ColumnResult(name = "attachments"),
		@ColumnResult(name= "editors")/*,
		@ColumnResult(name = "materialItemName")*/})
@Entity
@Table(name = "T_ProcurementContractBook")
public class ProcurementContractBook implements Serializable {

	private static final long serialVersionUID = 7976289559047687849L;
	
	private String procurementContractBookId;// 合同台账ID
	private String deliverNode; // 交付节点
	private String executetion;// 执行情况
	private BigDecimal arriveCircs;// 货款支付情况
	private String remarks;// 备注
	private String procurementContractId;// 合同ID
	private String materialId;// 物资ID
	private Date signDate;// 合同签订日期
	
	//非持久化字段
	private String contractCode;// 合同编号
	private String auditCode;// 合同审签编号
	private double contractAmount;// 合同金额
	private String attachments;// 合同附件
	private String vendor;//供应商ID
	private String vendName;// 签订单位
	private String mainMaterialName;// 主要产品
	private String desingnation;// 物料牌号
	private String materialStandard;// 物料规格
	private double referencePrice;// 单价
	private double materialCounts;// 材料需用总量
	
	private String editors;
	
	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProcurementContractBookId() {
		return procurementContractBookId;
	}

	public void setProcurementContractBookId(String procurementContractBookId) {
		this.procurementContractBookId = procurementContractBookId;
	}

	public String getDeliverNode() {
		return deliverNode;
	}

	public void setDeliverNode(String deliverNode) {
		this.deliverNode = deliverNode;
	}

	public String getExecutetion() {
		return executetion;
	}

	public void setExecutetion(String executetion) {
		this.executetion = executetion;
	}

	public BigDecimal getArriveCircs() {
		return arriveCircs;
	}

	public void setArriveCircs(BigDecimal arriveCircs) {
		this.arriveCircs = arriveCircs;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getProcurementContractId() {
		return procurementContractId;
	}

	public void setProcurementContractId(String procurementContractId) {
		this.procurementContractId = procurementContractId;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public Date getSignDate() {
		return signDate;
	}

	public void setSignDate(Date signDate) {
		this.signDate = signDate;
	}

	@Transient
	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	@Transient
	public String getAuditCode() {
		return auditCode;
	}

	public void setAuditCode(String auditCode) {
		this.auditCode = auditCode;
	}

	@Transient
	public double getContractAmount() {
		return contractAmount;
	}

	public void setContractAmount(double contractAmount) {
		this.contractAmount = contractAmount;
	}

	@Transient
	public String getAttachments() {
		return attachments;
	}

	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}
	
	@Transient
	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	@Transient
	public String getVendName() {
		return vendName;
	}

	public void setVendName(String vendName) {
		this.vendName = vendName;
	}

	@Transient
	public String getMainMaterialName() {
		return mainMaterialName;
	}

	public void setMainMaterialName(String mainMaterialName) {
		this.mainMaterialName = mainMaterialName;
	}

	@Transient
	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	@Transient
	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	@Transient
	public double getReferencePrice() {
		return referencePrice;
	}

	public void setReferencePrice(double referencePrice) {
		this.referencePrice = referencePrice;
	}

	@Transient
	public double getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(double materialCounts) {
		this.materialCounts = materialCounts;
	}

	@Transient
	public String getEditors() {
		return editors;
	}

	public void setEditors(String editors) {
		this.editors = editors;
	}

}
