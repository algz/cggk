package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("contractPurchaseDaoImpl")
public class ContractPurchaseDaoImpl extends GenericDAOImpl<ContractPurchase>
		implements ContractPurchaseDao {

	public List<ContractPurchase> findByExample(ContractPurchase example) {
		StringBuilder queryStr = new StringBuilder(" 1=1 ");
		List<String> params = new ArrayList<String>();
		int paramIndex = 1;
		if (StringUtils.isNotEmpty(example.getProcurementContractId())) {
			queryStr.append(" and obj.procurementContractId = ?" + paramIndex++);
			params.add(example.getProcurementContractId());
		}
		return this.find(queryStr.toString(), params.toArray());
	}

}
