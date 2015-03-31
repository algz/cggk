package com.sysware.customize.hd.investment.general;

/**
 * 导入Excel文件Vo
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-22
 * 
 */
public class ImportExcelVo {

	private String returnMsg;// 返回信息

	private String failureReason;// 出错原因

	private String failRowsNum;// 出错行号

	private String failSheetName;// 出错Sheet名称

	private String rowsNum;// 行号

	private String failureNum;// 错误数

	private String newMaterials;// 新物料信息

	private String redupMaterials;// 重复物料信息

	private String noExistProducts;// 不存在的产品信息

	private String bankExistProducts;// 数据缺失的产品型号

	private String redupMaterialCatalogVos;// 重复物料种类信息

	private String redupObjs;// 保存已重复的对象Json字符串
	
	private boolean isShort = false;// 是否为短错误信息，即只用警示框显示即可

	public String getFailRowsNum() {
		return failRowsNum;
	}

	public void setFailRowsNum(String failRowsNum) {
		this.failRowsNum = failRowsNum;
	}

	public String getFailSheetName() {
		return failSheetName;
	}

	public void setFailSheetName(String failSheetName) {
		this.failSheetName = failSheetName;
	}

	public String getFailureReason() {
		return failureReason;
	}

	public void setFailureReason(String failureReason) {
		this.failureReason = failureReason;
	}

	public String getRowsNum() {
		return rowsNum;
	}

	public void setRowsNum(String rowsNum) {
		this.rowsNum = rowsNum;
	}

	public String getFailureNum() {
		return failureNum;
	}

	public void setFailureNum(String failureNum) {
		this.failureNum = failureNum;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

	public String getNewMaterials() {
		return newMaterials;
	}

	public void setNewMaterials(String newMaterials) {
		this.newMaterials = newMaterials;
	}

	public String getRedupMaterials() {
		return redupMaterials;
	}

	public void setRedupMaterials(String redupMaterials) {
		this.redupMaterials = redupMaterials;
	}

	public String getNoExistProducts() {
		return noExistProducts;
	}

	public void setNoExistProducts(String noExistProducts) {
		this.noExistProducts = noExistProducts;
	}

	public String getBankExistProducts() {
		return bankExistProducts;
	}

	public void setBankExistProducts(String bankExistProducts) {
		this.bankExistProducts = bankExistProducts;
	}

	public String getRedupMaterialCatalogVos() {
		return redupMaterialCatalogVos;
	}

	public void setRedupMaterialCatalogVos(String redupMaterialCatalogVos) {
		this.redupMaterialCatalogVos = redupMaterialCatalogVos;
	}

	public String getRedupObjs() {
		return redupObjs;
	}

	public void setRedupObjs(String redupObjs) {
		this.redupObjs = redupObjs;
	}

	public boolean isShort() {
		return isShort;
	}

	public void setShort(boolean isShort) {
		this.isShort = isShort;
	}

}
