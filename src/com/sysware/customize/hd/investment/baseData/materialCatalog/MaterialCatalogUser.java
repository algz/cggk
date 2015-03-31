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

import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name="T_MaterialCatalog_user")
public class MaterialCatalogUser implements Serializable {
	private static final long serialVersionUID = 1L;
	private String ID;//主键 
	private String materialCatalogID;//物料种类ID

	private String userId;//用户ID
    public MaterialCatalogUser() {
    }
    @Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getID() {
		return ID;
	}
	public String getMaterialCatalogID() {
		return materialCatalogID;
	}
	 
	public void setID(String ID) {
		this.ID = ID;
	}
	public void setMaterialCatalogID(String materialCatalogID) {
		this.materialCatalogID = materialCatalogID;
	}
	 

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * 获取用户所属用户对应的物资种类，返回物资种类ID
	 * 
	 */
	public static String getMaterialCatalogRoleByUserId(Long userID) {
		return "select materialCatalogID from T_MaterialCatalog_user where   userID = '"
				+ userID + "'";
	}
	 
	/**
	 * 获取用户所属用户对应的物资种类，返回物资种类ID
	 * 
	 */
	public static String getMaterialCatalogNameRoleByUserId(Long userID) {
		return "select mc.MATERIALTYPENAME from T_MaterialCatalog_user m_r,T_MATERIALCATALOG mc where M_R.materialCatalogID=mc.MATERIALCATALOGID and userID = '"
				+ userID + "'";
	}
}
