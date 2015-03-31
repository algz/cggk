package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.math.BigDecimal;
import java.util.List;

import com.luck.itumserv.entity.Department;
import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;

/**
 * 采购申报明细Service
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public interface DeclareDetailService {
	/**
	 * 保存采购申报记录详情
	 *   
	 * @return 保存后的采购申报记录详情对象
	 */
	void saveDeclareDetail(String declareId,
			String declareDetailId, String materialid[], String quantity[],
			String use[], String useDate[], String amount[], String declareType[],
			String materialCatalogName[], String fileName[], String fileId[],String  userId,
			String departmentId,String[] reportType,String[] remark,String[] taskno,String[] contactPerson,String[] contactTelephone,
			String amountSource,String costNum);

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
	List<DeclareDetail> getDeclareDetailsByDeclareId(String declareId, int start, int limit,String declareDetailStatus);

	/**
	 * 获取指定ID的采购申报记录详情总数
	 * 
	 * @param declareId
	 *            采购申报记录ID
	 * @return 符合条件的采购申报记录详情总数
	 */
	long countDeclareDetailsByDeclareId(String declareId,String declareDetailStatus);

	/**
	 * 根据指定IDs批量删除采购申报记录详情
	 * 
	 * @param declareDetailIds
	 *            指定采购申报记录详情IDs
	 */
	void batchDeleteDeclareDetailsByIds(String[] declareDetailIds);

	/**
	 * 根据指定采购申报记录ID批量删除对应的详情
	 * 
	 * @param declareId
	 *            指定采购申报记录ID
	 */
	void batchDeleteDeclareDetailsByDeclareId(String declareId);
	
	/**
	 * 根据详情ID获取详情信息
	 * 
	 * @param declareDetailId
	 *            指定采购申报记录详情ID
	 */
	DeclareDetail getDeclareDetails (String declareDetailId);
	
	
	
	
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
	long countByCondition(DeclareDetailCondition condition);

	List<Object[]> getGridDataByType(DeclareDetailVo declareDetailVo);
	
	BigDecimal getGridDataByTypeCount(DeclareDetailVo declareDetailVo);
	
	String updateDeclareDetail(DeclareDetailVo vo);
	
	void saveMaterialToDeclarePlan(DeclareDetailVo vo)throws Exception;
	

	/**
	 * 获取所有部门
	 * @return
	 */
	public List<Department> getDeptypeList();
	
	List getOut_Num(DeclareDetailVo vo);
}
