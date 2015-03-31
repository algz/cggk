package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

/**
 * 采购需求管理Service
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01 15:21
 * 
 */
public interface ProcurementService {

	/**
	 * 添加新需求大纲
	 * 
	 * @param procurement
	 *            需求大纲对象
	 * @return 添加后需求大纲对象
	 */
	Procurement addProcurement(Procurement procurement);

	/**
	 * 根据ID删除需求大纲对象
	 * 
	 * @param procurementId
	 *            需求大纲ID
	 */
	void deleteProcurement(String procurementId);

	/**
	 * 根据ID获取需求大纲对象
	 * 
	 * @param procurementId
	 * @return 需求大纲对象
	 */
	Procurement findProcurementById(String procurementId);

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
	 * 批量更改零星需求大纲状态
	 * 
	 * @param procurementIds
	 *            待更改大纲ID
	 */
	void batchUpdateProcurementsFlag(String[] procurementIds);

	/**
	 * 批量更改零星需求大纲信息
	 * 
	 * @param procurements
	 *            待更改大纲对象
	 */
	void batchUpdateProcurements(List<Procurement> procurements);

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
