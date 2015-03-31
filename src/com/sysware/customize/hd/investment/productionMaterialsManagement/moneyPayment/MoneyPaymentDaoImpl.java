package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("moneyPayment_MoneyPaymentDaoImpl")
public class MoneyPaymentDaoImpl extends GenericDAOImpl<MoneyPayment>
		implements MoneyPaymentDao {
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
	public List<MoneyPayment> findAllMoneyPaymentByCondition(
			MoneyPaymentCondition condition, int start, int limit) {
		return this.find(" obj.procurementContractId = ?1 ",
				new String[] { condition.getProcurementContractId() }, start, limit);
	}
	/**
	 * 根据条件得到货款支付信息总数
	 * 
	 * @param moneyPaymentCondition
	 *            MoneyPaymentCondition
	 * @return long 
	 */
	public long countMoneyPaymentByCondition(
			MoneyPaymentCondition condition) {
		return (Long) (this
				.query("select count(*) from MoneyPayment mp where mp.procurementContractId = ?1",
						new String[] { condition.getProcurementContractId() }, 0, 0).get(0));
	}
}
