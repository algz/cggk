package com.sysware.customize.hd.investment.baseData.material;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 物料权限表
 * 
 */
@Entity
@Table(name = "T_ITEM_PROFILE")
public class ItemProfile implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6862422967315367332L;
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@Column(name="ITEM_CODE")
	private String itemCode;
	
	@Column(name="USER_NAME")
	private String userName;
	
	@Column(name="LOGIN_NAME")
	private String loginName;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

}
