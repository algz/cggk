package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.util.List;

/**
 * 货款支付信息Service
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 5-八月-2011 
 */
public interface MoneyPaymentService {
	/**
	 * 根据条件得到货款支付信息列表
	 * 
	 * @param moneyPaymentCondition MoneyPaymentCondition
	 * 
	 * @param start
	 * 
	 * @param limit
	 *            
	 * @return Integer 2011-5-17
	 */
	List<MoneyPayment>  findAllMoneyPaymentByCondition(MoneyPaymentCondition moneyPaymentCondition, int start,
			int limit);
	/**
	 * 根据条件得到货款支付信息总数
	 * 
	 * @param moneyPaymentCondition
	 *            MoneyPaymentCondition
	 * @return long 
	 */
	long countMoneyPaymentByCondition(MoneyPaymentCondition moneyPaymentCondition);
	/**
	 * 保存货款支付信息
	 * 
	 * @param moneyPayment
	 *            MoneyPayment
	 * @return MoneyPayment 
	 */
	MoneyPayment save(MoneyPayment moneyPayment);
	/**
	 * 批量删除货款支付信息
	 * 
	 * @param ids String[]
	 */
	void batchDeleteMoneyPayments(String[] ids);
	
	boolean delete(String id);
	
	void update(MoneyPayment moneyPayment);

}
