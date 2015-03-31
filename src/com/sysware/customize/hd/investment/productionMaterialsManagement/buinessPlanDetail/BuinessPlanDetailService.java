package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

import java.util.List;

public interface BuinessPlanDetailService {
	/**
	 * 保存计划明细信息
	 * 
	 * @param buinessPlanDetail
	 *            BuinessPlanDetail
	 */
	public void saveBuinessPlanDetail(BuinessPlanDetail buinessPlanDetail);
	/**
	 * 根据条件得到计划明细信息总数
	 * 
	 * @author chendongjie
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition
	 * @return Long 2011-5-27
	 */
	long countByCondition(BuinessPlanDetailCondition buinessPlanDetailCondition);

	/**
	 * 条件查询所有计划明细
	 * 
	 * @param buinessPlanDetailCondition
	 *            BuinessPlanDetailCondition对象
	 * @return 所有计划信息（实体类）
	 */
	public List<BuinessPlanDetail> findBuinessPlanDetailsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition);

	/**
	 * 列示所有计划明细信息
	 * 
	 * @param buinessPlanDetailCondition
	 *            BuinessPlanDetailCondition对象
	 * @param start
	 *            起始行
	 * @param limit
	 *            每页行数
	 * @return 所有计划信息（分页）
	 */
	public List<BuinessPlanDetail> findAllBuinessPlanDetails(BuinessPlanDetailCondition buinessPlanDetailCondition,
			int start, int limit);
	
	/**
	 * 条件查询所有计划detail Ids
	 * 
	 * @param buinessPlanDetailCondition
	 *            BuinessPlanDetailCondition对象
	 * @return 所有计划明细
	 * Ids
	 */
	public String[] findBuinessPDIdsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition);
	
	/**
	 * 删除指定计划大纲的所有计划详情
	 * 
	 * @param buinessPlanId
	 *            计划大纲ID
	 */
	public void batchDeleteBuinessPlanDetails(String buinessPlanId);
	
	/**
	 * 年度经营计划变更
	 * @param bpv
	 * @return
	 */
	String changeBuinessPlanDetail(BuinessPlanDetailVo bpv);
}
