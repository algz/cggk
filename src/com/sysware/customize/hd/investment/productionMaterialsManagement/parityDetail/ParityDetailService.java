package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;

import java.util.List;

import com.sysware.customize.hd.investment.baseData.material.Material;

public interface ParityDetailService {
	
	/**
	 * 获取物资数据
	 * @return
	 */
	public Material getMaterial(String materialID);
	
	/**
	 * 保存比价详情信息
	 * 
	 * @param parityDetail
	 *            对象
	 */
	public void saveOrUpdateParityDetail(ParityDetail parityDetail);

	/**
	 * 根据条件查询比价详情
	 * 
	 * @param parityDetailCondition
	 *            条件
	 * @return 比价详情
	 */
	public List<ParityDetail> getParityDetailListByCondition(
			ParityDetailCondition parityDetailCondition);

	/**
	 * 根据条件查询比价详情记录数
	 * 
	 * @param parityDetailCondition
	 *            条件
	 * @return parityDetailCondition记录数
	 */
	public Long getCountByCondition(ParityDetailCondition parityDetailCondition);

}
