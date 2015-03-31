package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("contractPurchaseServiceImpl")
public class ContractPurchaseServiceImpl implements ContractPurchaseService {
	@In(create = true, value = "contractPurchaseDaoImpl")
	private ContractPurchaseDao contractPurchaseDao;

	public void saveContractPurchase(ContractPurchase contractPurchase) {
		contractPurchaseDao.save(contractPurchase);
	}

	public List<ContractPurchase> getContractPurchasesByExample(
			ContractPurchase example) {
		return contractPurchaseDao.findByExample(example);
	}

}
