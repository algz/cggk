package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.Date;
import java.util.List;

/**
 * 合同台账管理Service
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-11
 * 
 */
public interface ProcurementContractBookService {

	/**
	 * 根据条件获取合同台账
	 * 
	 * @param condition
	 *            查询条件
	 * @return 符合条件的合同台账
	 */
	List<ProcurementContractBook> getContractBooksByCondition(
			ProcurementContractBookCondition condition);

	/**
	 * 计算符合条件的合同台账数量
	 * 
	 * @param condition
	 *            统计条件
	 * @return 符合条件的合同台账数量
	 */
	long countContractBooksByCondition(ProcurementContractBookCondition condition);

	/**
	 * 根据ID获得合同台账对象
	 * 
	 * @param procurementContractBookId
	 *            合同台账ID
	 * @return 合同台账对象
	 */
	ProcurementContractBook getContractBookById(String procurementContractBookId);

	/**
	 * 保存合同台账对象
	 * 
	 * @param contractBook
	 *            待保存合同台账对象
	 */
	void saveContractBook(ProcurementContractBook contractBook);

	/**
	 * 批量生成合同台账
	 * 
	 * @param contractIds
	 *            待生成合同台账的合同IDs
	 * @param signDate
	 *            合同签订日期
	 */
	void batchAddContractBook(String[] contractIds, Date signDate);

	/**
	 * 批量更新合同台账
	 * 
	 * @param contractBooks
	 *            待更新合同台账对象集合
	 */
	void batchUpdateProcurementDetails(List<ProcurementContractBook> contractBooks);
}
