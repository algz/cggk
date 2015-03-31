package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 采购申报明细Dao
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public interface DeclareDetailDao extends GenericDAO<DeclareDetail> {

	/**
	 * 获取指定ID的采购申报记录详情
	 * 
	 * @param declareId
	 *            采购申报记录ID
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页条数
	 * @return 符合条件的采购申报记录详情
	 */
	List<DeclareDetail> getByDeclareId(String declareId, int start, int limit,String declareDetailStatus);

	/**
	 * 获取指定ID的采购申报记录详情总数
	 * 
	 * @param declareId
	 *            采购申报记录ID
	 * @return 符合条件的采购申报记录详情总数
	 */
	long countByDeclareId(String declareId,String declareDetailStatus);

	/**
	 * 根据指定IDs批量删除采购申报记录详情
	 * 
	 * @param declareDetailIds
	 *            指定采购申报记录详情IDs
	 */
	void batchDeleteByIds(String[] declareDetailIds);

	/**
	 * 根据指定采购申报记录ID批量删除对应的详情
	 * 
	 * @param declareId
	 *            指定采购申报记录ID
	 */
	void batchDeleteByDeclareId(String declareId);
	/**
	 * 根据指定采购申报记录ID批量修改对应的子项状态
	 * 
	 * @param declareId
	 *            指定采购申报记录ID
	 * @param status 修改的申报记录的状态
	 */
	void batchUpdateByDeclareId(String declareId,String status);
	
	
	
	/**
	 * 获取申报记录详情
	 * @param condition
	 * 			查询条件
	 * @return
	 * 		 符合条件的采购申报记录详情
	 */
	List getByCondition(DeclareDetailCondition condition);

	/**
	 * 获取申报记录详情数
	 * @param condition
	 * 			查询条件
	 * @return
	 * 		 符合条件的采购申报记录详情
	 */
	long countByByCondition(DeclareDetailCondition condition);
	

	List<Object[]> getGridDataByType(DeclareDetailVo declareDetailVo);
	
	BigDecimal getGridDataByTypeCount(DeclareDetailVo declareDetailVo);
	
	String updateDeclareDetail(DeclareDetailVo vo);
	
	/**
	 * 根据申报计划id查询明细中是否存在数据
	 * @param id
	 * @return
	 */
	long findDeclarePlanDetailById(String id);
	
	/**
	 * 根据用户id查询部门id
	 * @param id
	 * @return
	 */
	String getDepartmentIdByUserId(String id);
	
	String getDeclareIdByPlanId(String id);
}
