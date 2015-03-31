package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.List;

import com.luck.common.GenericDAO;

public interface ContractPurchaseDao extends GenericDAO<ContractPurchase>{

	/**
	 * 根据样例信息查找符合条件的对象集合
	 * 
	 * @param example
	 *            样例对象
	 * @return 符合条件的对象集合
	 */
	List<ContractPurchase> findByExample(ContractPurchase example);
}
