package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.ArrayList;
import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 合同管理DAO
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-08
 * 
 */
public interface ProcurementContractDao extends GenericDAO<ProcurementContract> {

	/**
	 * 根据条件查询合同
	 * 
	 * @param condition
	 *            查询条件
	 * @return 符合条件的合同集合
	 */
	List<ProcurementContract> findByCondition(
			ProcurementContractCondition condition);

	/**
	 * 计算符合条件的合同数量
	 * 
	 * @param condition
	 *            统计条件
	 * @return 符合条件的合同数量
	 */
	long countByCondition(ProcurementContractCondition condition);

	/**
	 * 获取当前最大合同审签单序号
	 * 
	 * @param procurementType
	 *            采购需求类型
	 * @return 当前最大合同审签单序号
	 */
	public int getContractMaxCode(String procurementType);
	
	/**
	 * 获取合同信息，生成合同附件
	 * @param contractId 合同Id
	 * @param contract_model_no 合同模板编号
	 * @return
	 */
    public ArrayList<ArrayList<String>> getContractInfo(String contractId,String contract_model_no);

}
