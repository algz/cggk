package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

/**
 * 需求大纲查询条件对象
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
public class ProcurementCondition {

	private String procurementType;// 需求类型：年度采购需求（N）； 零星采购需求（L）

	private int start;// 起始行号
	private int limit;// 每页行数
	
	private String isPurchaseDataSelect;//是否为计划清单生成时的下拉列表，1为是
	public String getProcurementType() {
		return procurementType;
	}

	public void setProcurementType(String procurementType) {
		this.procurementType = procurementType;
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

	public String getIsPurchaseDataSelect() {
		return isPurchaseDataSelect;
	}

	public void setIsPurchaseDataSelect(String isPurchaseDataSelect) {
		this.isPurchaseDataSelect = isPurchaseDataSelect;
	}

}
