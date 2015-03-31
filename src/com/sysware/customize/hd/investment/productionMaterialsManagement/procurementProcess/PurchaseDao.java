package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.baseData.material.Material;

public interface PurchaseDao extends GenericDAO<Purchase> {

	
	/**
	 * 根据条件查询采购大纲记录
	 * 
	 * @param purchaseCondition
	 *            条件
	 * @return 采购大纲
	 */
	public List<PurchaseVo> getPurchaseListByCondition(
			PurchaseCondition purchaseCondition);

	/**
	 * 根据条件查询采购大纲总记录数
	 * 
	 * @param purchaseCondition
	 *            条件
	 * @return 采购大纲总记录数
	 */
	public Long getCountByCondition(PurchaseCondition purchaseCondition);

	/**
	 * 根据需求来源类型获得purchaseCode采购编号
	 * 
	 * @param String
	 *            purchaseType 需求来源类型
	 * 
	 * @return purchaseCode采购编号的purchaseMaxCode部分
	 */
	public int getPurchaseMaxCode(String purchaseType);

	/**
	 * 定额计划列表中获取采购需求数据
	 * @param purchaseVo
	 * @return
	 */
	public List<PurchaseVo> getPurchaseOfAnnualPlan(PurchaseVo purchaseVo);
	
}
