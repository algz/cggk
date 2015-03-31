package com.sysware.customize.hd.investment.baseData.vendorMaterial;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/**
 * 供应商与物料信息对应关系
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:06:27
 */
@Entity
@Table(name = "T_VENDOR_MATERIAL")
public class VendorMaterial {

	/**
	 * 唯一标识
	 */
	private String vendorMaterialId;
	/**
	 * 物料ID
	 */
	private Material material;
	/**
	 * 供应商ID
	 */
	private Vendor vendor;

	/**
	 * 物资类别
	 */
	private String materialType;

	public VendorMaterial() {

	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getVendorMaterialId() {
		return vendorMaterialId;
	}

	public void setVendorMaterialId(String vendorMaterialId) {
		this.vendorMaterialId = vendorMaterialId;
	}

	@ManyToOne
	@JoinColumn(name = "MATERIALID")
	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	@ManyToOne
	@JoinColumn(name = "VENDORID")
	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public String getMaterialType() {
		return materialType;
	}

	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}

}