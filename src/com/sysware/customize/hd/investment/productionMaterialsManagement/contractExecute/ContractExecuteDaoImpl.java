package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("contractExecute_ContractExecuteDaoImpl")
public class ContractExecuteDaoImpl extends GenericDAOImpl<ContractExecute>
		implements ContractExecuteDao {

	public List<ContractExecute> findByContractId(String contractId, int start,
			int max) {
		return this.find(" obj.procurementContractId = ?1 ",
				new String[] { contractId }, start, max);
	}

	public long countByContractId(String contractId) {
		return (Long) (this
				.query("select count(*) from ContractExecute ce where ce.procurementContractId = ?1",
						new String[] { contractId }, 0, 0).get(0));
	}

}
