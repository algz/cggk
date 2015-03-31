package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.util.List;

import net.sf.json.JSONObject;

import com.luck.common.GenericDAO;

/**
 * 采购申报Dao
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public interface DeclareDao extends GenericDAO<Declare> {

	/**
	 * 获取符合条件的采购申报记录对象集合
	 * 
	 * @param example
	 *            查询样例
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 *  @param type
	 *            页签类型
	 * @return 采购申报记录对象集合
	 */
	List<Declare> getByExample(Declare example,int start,int limit,String type);

	/**
	 * 获取符合条件的采购申报记录对象总数
	 * 
	 * @param example
	 *            查询样例
	 *  @param type
	 *            页签类型
	 * @return 采购申报记录对象总数
	 */
	public long countByExample(Declare example,String type);
	
	/**
	 * 获取采购申报的总金额
	 * @param id
	 * @return
	 */
	String getSumByAmount(String id);
	/**
	 *获取未通过申报的申报金额
	 */
	Double getAmoutByType(String id);

	public JSONObject getComboBoxDataForDeclare(DeclareVo declareVo);
	
	List<Object[]> exportDeclareReportGridData(DeclareVo vo);
	
	/**
	 * 判断当前用户是否领导
	 * @return
	 */
	public boolean isNotLeader();
}
