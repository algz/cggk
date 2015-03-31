/**
 * 物料种类
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:18
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_MaterialCatalog")
public class MaterialCatalog implements Serializable {

	private static final long serialVersionUID = 1L;

	private String materialcatalogid;// 主键

	private String materialtypename;// 物料种类名称

	private String parentid;// 父ID

	private String remark;// 备注

	private String sumValue;

	private String parentName;// 父物料种类名
	
	private String materialcatalogCode;// 编码

	public MaterialCatalog(String sumValue, String parentid) {
		this.sumValue = sumValue;
		this.parentid = parentid;
	}

	public String getMaterialcatalogCode() {
		return materialcatalogCode;
	}

	public void setMaterialcatalogCode(String materialcatalogCode) {
		this.materialcatalogCode = materialcatalogCode;
	}

	public MaterialCatalog() {
	}

	@Id
	@Column(name = "MaterialCatalogID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getMaterialcatalogid() {
		return this.materialcatalogid;
	}

	public void setMaterialcatalogid(String materialcatalogid) {
		this.materialcatalogid = materialcatalogid;
	}

	public String getMaterialtypename() {
		return this.materialtypename;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public void setMaterialtypename(String materialtypename) {
		this.materialtypename = materialtypename;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Transient
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	@Transient
	public String getSumValue() {
		return sumValue;
	}

	public void setSumValue(String sumValue) {
		this.sumValue = sumValue;
	}
}
