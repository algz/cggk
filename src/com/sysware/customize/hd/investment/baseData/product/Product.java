package com.sysware.customize.hd.investment.baseData.product;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * 产品。 可以用来表示飞机型号、飞机座椅等各种商业产品，总之是一个通用对象。
 * 
 * @author mengl
 * @version 1.0
 * @created 16-五月-2011 13:56:59
 */

@Entity
@Table(name = "T_PRODUCT")
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 唯一标识。
	 */
	private String productid;
	/**
	 * 产品批次。
	 */
	private String batchno;
	/**
	 * 产品代号。
	 */
	private String productcode;
	/**
	 * 产品名称。
	 */
	private String productname;
	/**
	 * 备注。
	 */
	private String remarks;
	/**
	 * 父节点号。
	 */
	private String parentid;
	/**
	 * 是否叶子节点。
	 */
	private String leaf;
	
	//以下为“非持久化字段”
	private String startId;// 开始列表参数（父Id）

	public Product() {
	}

	@Id
	@Column(name = "productid", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}

	public String getBatchno() {
		return batchno;
	}

	public void setBatchno(String batchno) {
		this.batchno = batchno;
	}

	public String getProductcode() {
		return productcode;
	}

	public void setProductcode(String productcode) {
		this.productcode = productcode;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Transient
	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
	}

}