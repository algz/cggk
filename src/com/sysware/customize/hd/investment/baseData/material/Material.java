package com.sysware.customize.hd.investment.baseData.material;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.baseData.vendorMaterial.VendorMaterial;

/**
 * 物料信息
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 2011-05-16 14:06:27
 */
@Entity
@Table(name = "T_MATERIAL")
public class Material implements Serializable {
	private static final long serialVersionUID = 1L;

	private String materialid;// 唯一标识（物资信息ID）

	private String demension;// 量纲。

	private String desingnation;// 物料牌号。

	private String materialItemName;// 物料名称。

	private String materialStandard;// 物料规格。

	private String preservePeriod;// 保管期。

	private BigDecimal referencePrice;// 计划单价。

	private String remarks;// 备注。

	private String technicCondition;// 技术条件。

	private BigDecimal warningValue;// 预警值。

	private MaterialCatalog materialCatalog; // 物资种类ID
	
	private String materialitemcode;//物资图号/物料编码

	private String deliveryStatus;//交货状态
	
	private String groupType;//组别

	private String materialclass;//物料大类名称
	
	private Set<VendorMaterial> vendorMaterials;// 供应商信息
	
	//非持久化字段
	private String productCode;// 机型

	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)
	public String getMaterialid() {
		return this.materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public String getDemension() {
		return this.demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getDesingnation() {
		return this.desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	// bi-directional many-to-one association to Materialcatalog
	@ManyToOne
	@JoinColumn(name = "PARENTID")
	public MaterialCatalog getMaterialCatalog() {
		return this.materialCatalog;
	}

	public void setMaterialCatalog(MaterialCatalog materialCatalog) {
		this.materialCatalog = materialCatalog;
	}

	// bi-directional many-to-one association to VendorMaterial
	@OneToMany(mappedBy = "material")
	public Set<VendorMaterial> getVendorMaterials() {
		return this.vendorMaterials;
	}

	public void setVendorMaterials(Set<VendorMaterial> vendorMaterials) {
		this.vendorMaterials = vendorMaterials;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getPreservePeriod() {
		return preservePeriod;
	}

	public void setPreservePeriod(String preservePeriod) {
		this.preservePeriod = preservePeriod;
	}

	@Column(precision = 10, scale = 2)
	public BigDecimal getReferencePrice() {
		return referencePrice;
	}

	public void setReferencePrice(BigDecimal referencePrice) {
		this.referencePrice = referencePrice;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	@Column(precision = 10, scale = 4)
	public BigDecimal getWarningValue() {
		return warningValue;
	}

	public void setWarningValue(BigDecimal warningValue) {
		this.warningValue = warningValue;
	}

	@Transient
	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	@Column(name="DELIVERY_STATUS")
	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	
	@Column(name="GROUPTYPE")
	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	
	
	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	@Column(name="MATERIALCLASS")
	public String getMaterialclass() {
		return materialclass;
	}

	public void setMaterialclass(String materialclass) {
		this.materialclass = materialclass;
	}
	
	
	
}