package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 材料定额DAO
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 26-五月-2011 13:46:08
 */
public interface MaterialQuotaDao extends GenericDAO<MaterialQuota> {

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息总数
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return
	 */
	public long getCountByCondition(MaterialQuotaCondition condition);

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息list
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return LIST
	 */
	public List<MaterialQuotaVo> getMaterialQuotaListByCondition(
			MaterialQuotaCondition condition);

	/**
	 * 根据productId获得材料定额信息list
	 * 
	 * @param productId
	 * @return LIST
	 */
	public List<MaterialQuota> getMaterialQuotaListByProductId(String productId,String GroupType);

	/**
	 * 根据MaterialQuota样例获取MaterialQuota对象
	 * 
	 * @param example
	 *            MaterialQuota样例对象
	 * @return MaterialQuota
	 */
	public MaterialQuota findMaterialQuotaByExample(MaterialQuota example);

	/**
	 * 根据材料定额id查询其修改记录明细
	 * @param mid
	 * @return
	 */
	public List<MaterialQuotaRecord> getAllMaterialQuotaRecordVos(MaterialQuotaRecordVo vo);

	/**
	 * 获取所有机型
	 * @return
	 */
	public List<String> getAllJx();
	
	/**
	 * 根据材料定额id删除数据
	 * @param id
	 */
	public void deleteMaterialQuota(String id);
	
}
