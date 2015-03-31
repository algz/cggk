package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 合同台账管理DAO
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-11
 * 
 */
public interface ProcurementContractBookDao extends
		GenericDAO<ProcurementContractBook> {

	/**
	 * 根据条件查询合同台账
	 * 
	 * @param condition
	 *            查询条件
	 * @return 符合条件的合同台账集合
	 */
	List<ProcurementContractBook> findByCondition(
			ProcurementContractBookCondition condition);

	/**
	 * 计算符合条件的合同台账数量
	 * 
	 * @param condition
	 *            统计条件
	 * @return 符合条件的合同台账数量
	 */
	long countByCondition(ProcurementContractBookCondition condition);

}
