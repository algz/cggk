package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.math.BigDecimal;
import java.util.List;

import com.sysware.customize.hd.investment.baseData.material.Material;

public interface PurchaseService {
	

	
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
	 * 保存或更新采购清单
	 * 
	 * @param purchase
	 *            采购清单实体
	 */
	public void saveOrUpdatePurchase(Purchase purchase);

	/**
	 * 删除采购清单实体集
	 * 
	 * @param ids
	 */
	public void deletePurchase(String[] ids);

	/**
	 * 根据id 查询采购大纲
	 * 
	 * @param id
	 *            条件
	 * @return 采购大纲
	 */
	public Purchase getPurchaseById(String id);

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
	 * 根据清单Id生成比价、招投、合同的数据
	 * 
	 * @param parityId
	 * 
	 */
	public String createParityContractDataByPurchaseId(String purchaseId);
	
	public String createParityContractData(String[] ddIds,String purchaseId,String type)throws Exception;
	
	public String handlerPurchaseByCount(String purchaseId)throws Exception;

	/**
	 * @param purchaseID
	 *            采购计划Id
	 * @param flag
	 *            状态
	 * 
	 */
	public void updateProperties(String purchaseID[], String flag);

	/**
	 * 定额计划列表中获取采购需求数据
	 * @param purchaseVo
	 * @return
	 */
	public List<PurchaseVo> getPurchaseOfAnnualPlan(PurchaseVo purchaseVo);
	
}
