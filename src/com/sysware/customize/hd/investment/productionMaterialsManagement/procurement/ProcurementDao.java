package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 物资需求大纲Dao
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
public interface ProcurementDao extends GenericDAO<Procurement> {

	/**
	 * 根据条件查询需求大纲列表
	 * 
	 * @param condition
	 *            查询条件
	 * @return 查询结果
	 */
	List<Procurement> findProcurements(ProcurementCondition condition);
	
	/**
	 * 获取符合条件的需求大纲记录总数
	 * 
	 * @param condition
	 *            查询条件
	 * @return 查询结果
	 */
	long countProcurements(ProcurementCondition condition);
	
	/**
	 * 获取需求大纲已存在最大Code值
	 * @return 查询结果
	 */
	int getProcurementMaxCode();
	
	/**
	 * 批量更改零星需求大纲状态
	 * 
	 * @param procurementIds
	 *            待更改大纲ID
	 */
	void batchUpdateProcurementsFlag(String[] procurementIds);

	/**
	 * 批量删除零星需求大纲状态
	 * 
	 * @param procurementIds
	 *            待删除大纲ID
	 */
	void batchDeleteProcurements(String[] procurementIds);
	
	/**
	 * 查询年度计划列表
	 * @param condition
	 * @return
	 */
	public List<Procurement> findAnnualProcurementList(ProcurementCondition condition);
	
	/**
	 * 获取年度需求大纲列表 ComboBox
	 * @param procurementVo
	 * @return
	 * @throws Exception
	 */
	public List<ProcurementVo> getComboBoxDataForAnnualPlan(ProcurementVo procurementVo)throws Exception;

}