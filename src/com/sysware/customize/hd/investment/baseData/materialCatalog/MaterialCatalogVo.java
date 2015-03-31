/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

public class MaterialCatalogVo {
	private String id;// 表单id属性
	private String materialcatalogid;// 主键

	private String materialtypename;// 物料种类名称
	private String remark;// 备注
	private String parentid;// 父ID
	private String parentName;//父名

	private String startId;// 开始列表参数（父Id）

	private Integer start;// 分页开始
	private Integer limit;// 每页页列表数
	private String sumValue;//
	private String requestSumValue;// 需求量
	private String planSumvalue;// 计划量
	private String purchaseSumValue;// 采购比价量
	private String contractSumValue;// 合同签订量
	private String materialcatalogCode;//物资种类编码
	public String getMaterialcatalogCode() {
		return materialcatalogCode;
	}

	public void setMaterialcatalogCode(String materialcatalogCode) {
		this.materialcatalogCode = materialcatalogCode;
	}

	private String isUpdate;//是否编辑操作

	public String getContractSumValue() {
		return contractSumValue;
	}

	public void setContractSumValue(String contractSumValue) {
		this.contractSumValue = contractSumValue;
	}

	public String getPurchaseSumValue() {
		return purchaseSumValue;
	}

	public void setPurchaseSumValue(String purchaseSumValue) {
		this.purchaseSumValue = purchaseSumValue;
	}

	public String getRequestSumValue() {
		return requestSumValue;
	}

	public void setRequestSumValue(String requestSumValue) {
		this.requestSumValue = requestSumValue;
	}

	public String getPlanSumvalue() {
		return planSumvalue;
	}

	public void setPlanSumvalue(String planSumvalue) {
		this.planSumvalue = planSumvalue;
	}

	public String getSumValue() {
		return sumValue;
	}

	public void setSumValue(String sumValue) {
		this.sumValue = sumValue;
	}

	public String getMaterialcatalogid() {
		return materialcatalogid;
	}

	public void setMaterialcatalogid(String materialcatalogid) {
		this.materialcatalogid = materialcatalogid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMaterialtypename() {
		return materialtypename;
	}

	public void setMaterialtypename(String materialtypename) {
		this.materialtypename = materialtypename;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public String getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(String isUpdate) {
		this.isUpdate = isUpdate;
	}
}
