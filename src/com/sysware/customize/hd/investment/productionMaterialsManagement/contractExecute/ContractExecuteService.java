package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.util.List;

/**
 * 合同执行情况Service
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-08-03
 */
public interface ContractExecuteService {

	/**
	 * 保存合同执行情况信息
	 * 
	 * @param contractExecute
	 *            合同执行情况对象
	 * @return
	 */
	ContractExecute saveContractExecute(ContractExecute contractExecute);

	/**
	 * 根据条件对象查找合同执行情况信息
	 * 
	 * @param contractId
	 *            合同ID
	 * @param start
	 *            起始记录索引
	 * @param limit
	 *            每页记录条数
	 * 
	 * @return 符合条件的合同执行情况信息
	 */
	List<ContractExecute> findContractExecutesByContractId(String contractId,
			int start, int limit);

	/**
	 * 计算满足条件的合同执行情况信息记录数
	 * 
	 * @param contractId
	 *            合同ID
	 * @return 符合条件的合同执行情况信息记录总数
	 */
	long countContractExecutesByContractId(String contractId);

	/**
	 * 根据合同执行情况IDs批量删除合同执行情况
	 * 
	 * @param contractExecuteIds
	 *            合同执行情况IDs
	 */
	void batchDeleteContractExecutes(String[] contractExecuteIds);

}
