package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 合同执行情况DAO
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-08-03
 */
public interface ContractExecuteDao extends GenericDAO<ContractExecute> {

	/**
	 * 根据合同ID查找合同执行情况信息
	 * 
	 * @param contractId
	 *            合同ID
	 * @param start
	 *            起始记录索引
	 * @param max
	 *            每次选取的记录条数
	 * @return 符合条件的合同执行情况信息
	 */
	List<ContractExecute> findByContractId(String contractId, int start, int max);

	/**
	 * 计算指定合同ID的合同执行情况信息记录数
	 * 
	 * @param contractId
	 *            合同ID
	 * @return 符合条件的合同执行情况信息记录总数
	 */
	long countByContractId(String contractId);

}
