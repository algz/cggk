package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * 比价,招标,协议,直接采购信息主表.采购策略表
 */
@Entity
@Table(name = "T_Parity")
public class Parity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9127161034408437617L;
	
	private String parityId;//主键
	private String parityCode;// 编号
	private Date createDate;// 创建时间
	private Date deliveryDate;// 交货日期
	private String applicationStatus;// 申请状态   1编制中,2待审批,3审批中,4已审批,5已生成,6待生成合同
	private String editors;//编制人
	private String purchaseId;// 清单大纲id
	private String vendorId;// 供应商、中标厂商
	private String vendorName;// 中标厂商名
	private String type;//1比价,2招标,3直接采购,4协议采购,5其他采购(直接采购)
	private String materialId;// 物资信息
	private BigDecimal price;//招标或比价选择的供应商价格
	private String procurementDetailId;// 需求明细ID
	
	private String vendorNums;//物资关联的供应商总数
	
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	private List<String> materialIdsList = new ArrayList<String>();//物资信息Id集合
	
	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getParityId() {
		return parityId;
	}
	public void setParityId(String parityId) {
		this.parityId = parityId;
	}
	public String getParityCode() {
		return parityCode;
	}
	public void setParityCode(String parityCode) {
		this.parityCode = parityCode;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
	public String getEditors() {
		return editors;
	}
	public void setEditors(String editors) {
		this.editors = editors;
	}
	public String getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getMaterialId() {
		return materialId;
	}
	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
	public String getProcurementDetailId() {
		return procurementDetailId;
	}
	public void setProcurementDetailId(String procurementDetailId) {
		this.procurementDetailId = procurementDetailId;
	}
	@Transient
	public List<String> getMaterialIdsList() {
		return materialIdsList;
	}
	public void setMaterialIdsList(List<String> materialIdsList) {
		this.materialIdsList = materialIdsList;
	}
	@Transient
	public String getVendorNums() {
		return vendorNums;
	}
	public void setVendorNums(String vendorNums) {
		this.vendorNums = vendorNums;
	}
	
	
}
