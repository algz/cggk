package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;

/**
 * 比价招标信息主表
 */
@Entity
@Table(name = "T_TENDER_SUPPLIERS")
public class TenderSuppliers implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9127161034408437617L;
	
	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String id;//主键
	
	@ManyToOne
	@JoinColumn(name="VENDORID")
	private Vendor vendor;//供应商ID
	
	@ManyToOne
	@JoinColumn(name="PARITYID")
	private Parity parity;//采购(投标)计划ID
	
	@Column(name = "PRICE")
	private BigDecimal price;//招标的供应商价格
	
	@Column(name = "STATUS")
	private String status;//供应商状态,0参与投标的供应商(初始状态),1中标的供应商,2未中标的供应商
	

	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Vendor getVendor() {
		return vendor;
	}
	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Parity getParity() {
		return parity;
	}
	public void setParity(Parity parity) {
		this.parity = parity;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	
//	
//	private String parityId;//主键
//	private String parityCode;// 编号
//	private Date createDate;// 创建时间
//	private Date deliveryDate;// 交货日期
//	private  String applicationStatus;// 申请状态
//	private  String editors;//编制人
//	private String purchaseId;// 清单大纲id
//	private String vendorName;// 中标厂商名
//	private String type;//1比价,2招标,3直接采购,4协议采购,5其他采购
//	private String materialId;// 物资信息
//	
//	
//	
//	
//	
//	public BigDecimal getPrice() {
//		return price;
//	}
//	public void setPrice(BigDecimal price) {
//		this.price = price;
//	}
//	private List<String> materialIdsList = new ArrayList<String>();//物资信息Id集合
//	
//	public String getParityId() {
//		return parityId;
//	}
//	public void setParityId(String parityId) {
//		this.parityId = parityId;
//	}
//	public String getParityCode() {
//		return parityCode;
//	}
//	public void setParityCode(String parityCode) {
//		this.parityCode = parityCode;
//	}
//	public Date getCreateDate() {
//		return createDate;
//	}
//	public void setCreateDate(Date createDate) {
//		this.createDate = createDate;
//	}
//	public Date getDeliveryDate() {
//		return deliveryDate;
//	}
//	public void setDeliveryDate(Date deliveryDate) {
//		this.deliveryDate = deliveryDate;
//	}
//	public String getApplicationStatus() {
//		return applicationStatus;
//	}
//	public void setApplicationStatus(String applicationStatus) {
//		this.applicationStatus = applicationStatus;
//	}
//	public String getEditors() {
//		return editors;
//	}
//	public void setEditors(String editors) {
//		this.editors = editors;
//	}
//	public String getPurchaseId() {
//		return purchaseId;
//	}
//	public void setPurchaseId(String purchaseId) {
//		this.purchaseId = purchaseId;
//	}
//	public String getVendorId() {
//		return vendorId;
//	}
//	public void setVendorId(String vendorId) {
//		this.vendorId = vendorId;
//	}
//	public String getVendorName() {
//		return vendorName;
//	}
//	public void setVendorName(String vendorName) {
//		this.vendorName = vendorName;
//	}
//	public String getType() {
//		return type;
//	}
//	public void setType(String type) {
//		this.type = type;
//	}
//	public String getMaterialId() {
//		return materialId;
//	}
//	public void setMaterialId(String materialId) {
//		this.materialId = materialId;
//	}
//	@Transient
//	public List<String> getMaterialIdsList() {
//		return materialIdsList;
//	}
//	public void setMaterialIdsList(List<String> materialIdsList) {
//		this.materialIdsList = materialIdsList;
//	}
	
	
}
