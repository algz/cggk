package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
/**
 * 货款支付信息远程对象
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 5-八月-2011 
 */
@Name("moneyPayment_MoneyPaymentRemote")
public class MoneyPaymentRemote {

	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter(null);
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	@In(create = true, value = "moneyPayment_MoneyPaymentServiceImpl")
	private MoneyPaymentService moneyPaymentService;
	/**
	 * 获得moneyPaymentVos列表
	 * 
	 * @param moneyPaymentVo MoneyPaymentVo
	 * 
	 * @return GridData<MoneyPaymentVo>
	 */
	@WebRemote
	public GridData<MoneyPaymentVo> getMoneyPayment(
			MoneyPaymentVo moneyPaymentVo) throws Exception {
		MoneyPaymentCondition condition=new MoneyPaymentCondition();
		BeanUtils.copyProperties(condition, moneyPaymentVo);
		List<MoneyPayment> moneyPayments=this.moneyPaymentService.findAllMoneyPaymentByCondition(condition, condition.getStart(), condition.getLimit());
		
		List<MoneyPaymentVo> moneyPaymentVos= new ArrayList<MoneyPaymentVo>();
		
		for(MoneyPayment moneyPayment:moneyPayments){
			MoneyPaymentVo temp=new MoneyPaymentVo();
			BeanUtils.copyProperties(temp, moneyPayment);
			moneyPaymentVos.add(temp);
		}
		
		GridData<MoneyPaymentVo> gridData = new GridData<MoneyPaymentVo>();
		gridData.setResults(moneyPaymentVos);
		gridData.setTotalProperty(this.moneyPaymentService.countMoneyPaymentByCondition(condition));
		return gridData;
	}
	/**
	 * 根据moneyPaymentVo保存MoneyPayment对象
	 * 
	 * @param moneyPaymentVo MoneyPaymentVo
	 * 
	 * @return String
	 */
	@WebRemote
	public String saveMoneyPayment(MoneyPaymentVo moneyPaymentVo){
		MoneyPayment mPayment=new MoneyPayment();
		try {
			BeanUtils.copyProperties(mPayment, moneyPaymentVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		this.moneyPaymentService.save(mPayment);
		return "{success : true}";
	}
	/**
	 * 根据所选ids删除物料信息对象
	 * 
	 * @param ids
	 * 
	 * @return String
	 */
	@WebRemote
	public String deleteMoneyPayments(String[] ids){
		try {
			this.moneyPaymentService.batchDeleteMoneyPayments(ids);
		} catch (Exception e) {
			return "{success : false}";
		}
		return "{success : true}";
	}

}
