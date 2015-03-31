package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.material.Material;

/**
 * 各种清册明细实体
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 2011-05-26 10:22
 */
@Entity
@Table(name = "T_Inventory")
public class Inventory {

	private String inventoryID;// 各种清册明显唯一标示
	private Material material;// 物料信息
	private String productCode;// 产品型号
	private BigDecimal numberOne;// 件数（1：1）
	private BigDecimal numberTwo;// 件数（1：4）
	private BigDecimal numberThree;// 件数（1：12）
	private BigDecimal numberFour;// 件数（1：26）
	private BigDecimal numbers;// 数量
	private String useSite;// 使用部位
	private String partID;// 装配图号
	private String type;// 清册类型：1成品清单定额2备件清册3设备清册4工具清册5标准件清册
	private String remark;//备注
	
	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)
	public String getInventoryID() {
		return inventoryID;
	}

	public void setInventoryID(String inventoryID) {
		this.inventoryID = inventoryID;
	}

	@ManyToOne
	@JoinColumn(name = "MATERIALID")
	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public BigDecimal getNumberOne() {
		return numberOne;
	}

	public void setNumberOne(BigDecimal numberOne) {
		this.numberOne = numberOne;
	}

	public BigDecimal getNumberTwo() {
		return numberTwo;
	}

	public void setNumberTwo(BigDecimal numberTwo) {
		this.numberTwo = numberTwo;
	}

	public BigDecimal getNumberThree() {
		return numberThree;
	}

	public void setNumberThree(BigDecimal numberThree) {
		this.numberThree = numberThree;
	}

	public BigDecimal getNumberFour() {
		return numberFour;
	}

	public void setNumberFour(BigDecimal numberFour) {
		this.numberFour = numberFour;
	}

	public BigDecimal getNumbers() {
		return numbers;
	}

	public void setNumbers(BigDecimal numbers) {
		this.numbers = numbers;
	}

	public String getUseSite() {
		return useSite;
	}

	public void setUseSite(String useSite) {
		this.useSite = useSite;
	}

	public String getPartID() {
		return partID;
	}

	public void setPartID(String partID) {
		this.partID = partID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
