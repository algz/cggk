package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 各种清册明显DAO
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 26-五月-2011 13:46:08
 */
public interface InventoryDao extends GenericDAO<Inventory> {

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息总数
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return
	 */
	public long getCountByCondition(MaterialQuotaCondition condition);

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息list
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return LIST
	 */
	public List<Inventory> getInventoryListByCondition(
			MaterialQuotaCondition condition);
	
	/**
	 * 根据Inventory样例获取Inventory对象
	 * 
	 * @param example
	 *            Inventory样例对象
	 * @return Inventory
	 */
	public Inventory findInventoryByExample(Inventory example);
}
