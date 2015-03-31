package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.util.Date;

/** 申报 明细 查询 条件
 * @author fanzhihui
 *
 */
public class DeclareDetailCondition {
	
	private String departmentName;//部门名称
	private String materialCatalogName; // 物资类别
	private String declareType; // 申请记录类型，1计划内2应急3非应急
	private String useDate; // 使用时间
	private String departmentId; // 采购单位
	private String declareplanID;// 申报计划ID
	private String use; // 采购用途
	private String declareplanDetilID;// 申报计划ID
	private String loginName;//登陆人登陆账号
	private int start; // 起始记录
	private int limit; // 每页记录条数
	private int count;//分页总数
	
	
	
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getMaterialCatalogName() {
		return materialCatalogName;
	}
	public void setMaterialCatalogName(String materialCatalogName) {
		this.materialCatalogName = materialCatalogName;
	}
	public String getDeclareType() {
		return declareType;
	}
	public void setDeclareType(String declareType) {
		this.declareType = declareType;
	}
	public String getUseDate() {
		return useDate;
	}
	public void setUseDate(String useDate) {
		this.useDate = useDate;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	public String getDeclareplanID() {
		return declareplanID;
	}
	public void setDeclareplanID(String declareplanID) {
		this.declareplanID = declareplanID;
	}
	public String getUse() {
		return use;
	}
	public void setUse(String use) {
		this.use = use;
	}
	public String getDeclareplanDetilID() {
		return declareplanDetilID;
	}
	public void setDeclareplanDetilID(String declareplanDetilID) {
		this.declareplanDetilID = declareplanDetilID;
	}
	
	
	
	
	
}
