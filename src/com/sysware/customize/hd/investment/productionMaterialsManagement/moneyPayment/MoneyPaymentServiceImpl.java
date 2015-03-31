package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.exception.CanotRemoveObjectException;

@Name("moneyPayment_MoneyPaymentServiceImpl")
public class MoneyPaymentServiceImpl implements MoneyPaymentService {
	@In(create = true, value = "moneyPayment_MoneyPaymentDaoImpl")
	private MoneyPaymentDao moneyPaymentDao;
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
	@Transactional
	public List<MoneyPayment> findAllMoneyPaymentByCondition(
			MoneyPaymentCondition moneyPaymentCondition, int start, int limit) {
		return this.moneyPaymentDao.findAllMoneyPaymentByCondition(moneyPaymentCondition, start, limit);
	}
	/**
	 * 根据条件得到货款支付信息总数
	 * 
	 * @param moneyPaymentCondition
	 *            MoneyPaymentCondition
	 * @return long 
	 */
	@Transactional
	public long countMoneyPaymentByCondition(
			MoneyPaymentCondition moneyPaymentCondition) {
		return this.moneyPaymentDao.countMoneyPaymentByCondition(moneyPaymentCondition);
	}
	/**
	 * 保存货款支付信息
	 * 
	 * @param moneyPayment
	 *            MoneyPayment
	 * @return MoneyPayment 
	 */
	@Transactional
	public MoneyPayment save(MoneyPayment moneyPayment) {
		if (StringUtils.isBlank(moneyPayment.getMoneyPaymentId())) {
			moneyPayment.setMoneyPaymentId(null);
			moneyPayment.setCreateDate(new Date());
			this.moneyPaymentDao.save(moneyPayment);
		}else {
			//moneyPayment.setCreateDate(new Date());
			this.moneyPaymentDao.update(moneyPayment);
		}
		return moneyPayment;
	}
	/**
	 * 批量删除货款支付信息
	 * 
	 * @param ids String[]
	 */
	@Transactional
	public void batchDeleteMoneyPayments(String[] ids)throws CanotRemoveObjectException {
		List<String> errIds = new ArrayList<String>();
		for (String id : ids) {
			try {
				this.delete(id);
			} catch (Exception e) {
				// 不能删除的ID保留下来
				errIds.add(id);
			}
		}
		if (errIds.size() > 0) {
			throw new CanotRemoveObjectException();
		}
	}

	public void update(MoneyPayment moneyPayment) {
		this.moneyPaymentDao.update(moneyPayment);
	}
	@Transactional
	public boolean delete(String id) {
		return this.moneyPaymentDao.remove(id);
	}

	

}
