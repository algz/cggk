package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.util.List;

import com.luck.common.GenericDAO;

public interface BuinessPlanDao extends GenericDAO<BuinessPlan> {

	/**
	 * 根据条件得到计划信息总数
	 * 
	 * @author chendongjie
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition
	 * @return Long 2011-5-17
	 */
	long countByCondition(BuinessPlanCondition buinessPlanCondition);

	/**
	 * 条件查询所有计划
	 * 
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition对象
	 * @return 所有计划信息（实体类）
	 */
	public List<BuinessPlan> findBuinessPlansByCondition(
			BuinessPlanCondition buinessPlanCondition);
		
}
