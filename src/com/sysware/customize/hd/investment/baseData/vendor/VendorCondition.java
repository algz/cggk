package com.sysware.customize.hd.investment.baseData.vendor;

import java.math.BigDecimal;

/**
 * 供应商查询条件
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-20 14:05:28
 */
public class VendorCondition {

	private String vendorName;// 供应商名称
	private String vendorID;// 供应商Id
	private String vendorByMaterial;//通过物资查询供应商，1已关联的 2 未关联的
	private String materialIds;//通过物资关联供应商可以是多个物资
	public String getMaterialIds() {
		return materialIds;
	}

	public void setMaterialIds(String materialIds) {
		this.materialIds = materialIds;
	}

	public String getVendorByMaterial() {
		return vendorByMaterial;
	}

	public void setVendorByMaterial(String vendorByMaterial) {
		this.vendorByMaterial = vendorByMaterial;
	}

	public String getVendorID() {
		return vendorID;
	}

	public void setVendorID(String vendorID) {
		this.vendorID = vendorID;
	}

	private String address;// 经营地址
	private int start;// 分页开始
	private int limit;// 分页条数
	private BigDecimal count;
	private boolean isNotRelatedMaterial;// 是否未关联物料
	private String materialId;// 物料Id
	private String oldVendorIDString;
	private String evaluationStatus;//选评状态
	
	private long selectStatus;//判断状态确定显示的是哪一个页面  1代表加载供应商目录的表格
	
	public String getEvaluationStatus() {
		return evaluationStatus;
	}

	public void setEvaluationStatus(String evaluationStatus) {
		this.evaluationStatus = evaluationStatus;
	}

	/**
	 * 供应商编号
	 */
	private String vendorCode;
	/**
	 *规模
	 */
	private String scale;
	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getBusinessScope() {
		return businessScope;
	}

	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVendorLevel() {
		return vendorLevel;
	}

	public void setVendorLevel(String vendorLevel) {
		this.vendorLevel = vendorLevel;
	}

	/**
	 * 经营范围
	 */
	private String businessScope;
	/**
	 *类别
	 */
	private String type;
	/**
	 * 等级
	 */
	private String vendorLevel;
	

	public String getOldVendorIDString() {
		return oldVendorIDString;
	}

	public void setOldVendorIDString(String oldVendorIDString) {
		this.oldVendorIDString = oldVendorIDString;
	}

	public VendorCondition() {

	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public boolean isNotRelatedMaterial() {
		return isNotRelatedMaterial;
	}

	public void setNotRelatedMaterial(boolean isNotRelatedMaterial) {
		this.isNotRelatedMaterial = isNotRelatedMaterial;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public long getSelectStatus() {
		return selectStatus;
	}

	public void setSelectStatus(long selectStatus) {
		this.selectStatus = selectStatus;
	}

	public BigDecimal getCount() {
		return count;
	}

	public void setCount(BigDecimal count) {
		this.count = count;
	}

}
