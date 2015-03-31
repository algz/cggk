package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

@Name("contractExecute_ContractExecuteServiceImpl")
public class ContractExecuteServiceImpl implements ContractExecuteService {
	@In(create = true, value = "contractExecute_ContractExecuteDaoImpl")
	private ContractExecuteDao contractExecuteDao;

	@Transactional
	public ContractExecute saveContractExecute(ContractExecute contractExecute) {
		if (StringUtils.isBlank(contractExecute.getContractExecuteId())) {
			contractExecute.setContractExecuteId(null);
			contractExecute.setCreateDate(new Date());
			contractExecute = this.contractExecuteDao.save(contractExecute);
		} else {
			this.contractExecuteDao.update(contractExecute);
		}
		return contractExecute;
	}

	public List<ContractExecute> findContractExecutesByContractId(
			String contractId, int start, int limit) {
		return this.contractExecuteDao.findByContractId(contractId, start,
				limit);
	}

	public long countContractExecutesByContractId(String contractId) {
		return this.contractExecuteDao.countByContractId(contractId);
	}

	@Transactional
	public void batchDeleteContractExecutes(String[] contractExecuteIds) {
		for (String contractExecuteId : contractExecuteIds) {
			this.contractExecuteDao.remove(contractExecuteId);
		}
	}

}
