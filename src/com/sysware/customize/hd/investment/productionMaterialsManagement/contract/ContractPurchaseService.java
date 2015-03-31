package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.List;

public interface ContractPurchaseService {
	void saveContractPurchase(ContractPurchase contractPurchase);

	/**
	 * 根据样例信息查找符合条件的对象集合
	 * 
	 * @param example
	 *            样例对象
	 * @return 符合条件的对象集合
	 */
	List<ContractPurchase> getContractPurchasesByExample(ContractPurchase example);
}
