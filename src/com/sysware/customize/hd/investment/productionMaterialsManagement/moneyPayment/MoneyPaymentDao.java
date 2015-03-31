package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.util.List;

import com.luck.common.GenericDAO;
/**
 * 货款支付信息Dao
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 5-八月-2011 
 */
public interface MoneyPaymentDao extends GenericDAO<MoneyPayment>{
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
	List<MoneyPayment>  findAllMoneyPaymentByCondition(MoneyPaymentCondition  moneyPaymentCondition, int start,
			int limit);
	/**
	 * 根据条件得到货款支付信息总数
	 * 
	 * @param moneyPaymentCondition
	 *            MoneyPaymentCondition
	 * @return long 
	 */
	long countMoneyPaymentByCondition(MoneyPaymentCondition moneyPaymentCondition);
}
