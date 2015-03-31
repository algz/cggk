package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

@Name("buinessPlanDetailServiceImpl")
public class BuinessPlanDetailServiceImpl implements BuinessPlanDetailService {
	@In(create = true, value = "buinessPlanDetailDaoImpl")
	private BuinessPlanDetailDao buinessPlanDetailDao;
	/**
	 * 保存计划明细信息
	 * 
	 * @param buinessPlanDetail
	 *            BuinessPlanDetail
	 */
	public void saveBuinessPlanDetail(BuinessPlanDetail buinessPlanDetail) {
		buinessPlanDetailDao.save(buinessPlanDetail);
	}
	/**
	 * 根据条件得到计划明细信息总数
	 * 
	 * @author chendongjie
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition
	 * @return Long 2011-5-27
	 */
	public long countByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition) {
		return buinessPlanDetailDao.countByCondition(buinessPlanDetailCondition);
	}
	/**
	 * 条件查询所有计划明细
	 * 
	 * @param buinessPlanDetailCondition
	 *            BuinessPlanDetailCondition对象
	 * @return 所有计划信息（实体类）
	 */
	public List<BuinessPlanDetail> findBuinessPlanDetailsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition) {
		return buinessPlanDetailDao.findBuinessPlanDetailsByCondition(buinessPlanDetailCondition);
	}
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
	public List<BuinessPlanDetail> findAllBuinessPlanDetails(
			BuinessPlanDetailCondition buinessPlanDetailCondition, int start,
			int limit) {
		return buinessPlanDetailDao.findAllBuinessPlanDetails(buinessPlanDetailCondition, start, limit);
	}
	/**
	 * 条件查询所有计划detail Ids
	 * 
	 * @param buinessPlanDetailCondition
	 *            BuinessPlanDetailCondition对象
	 * @return 所有计划明细
	 * Ids
	 */
	public String[] findBuinessPDIdsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition) {
		return buinessPlanDetailDao.findBuinessPDIdsByCondition(buinessPlanDetailCondition);
	}
	public void batchDeleteBuinessPlanDetails(String buinessPlanId) {
		buinessPlanDetailDao.batchDeleteBuinessPlanDetails(buinessPlanId);		
	}
	
	@Transactional
	public String changeBuinessPlanDetail(BuinessPlanDetailVo bpv) {
		return buinessPlanDetailDao.changeBuinessPlanDetail(bpv);
	}
	
	
}
