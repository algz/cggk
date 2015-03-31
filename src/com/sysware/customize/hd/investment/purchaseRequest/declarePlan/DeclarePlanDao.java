package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;

/**
 * 申报计划DAO
 * 
 * @author fanzhihui
 * 
 */
public interface DeclarePlanDao extends GenericDAO<DeclarePlan> {

	/**
	 * 获得申报计划信息
	 * 
	 * @param condition
	 *            查询条件
	 * @return 申报计划信息
	 */
	List<DeclarePlan> findByCondition(DeclarePlanCondition condition);

	/**
	 * 计算满足条件的申报计划数
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的申报计划记录总数
	 */
	long countByCondition(DeclarePlanCondition condition);

	/**
	 * 获取 申报单位信息
	 * 
	 * @param condition
	 * @return 申报单位信息
	 */
	List<DeclarePlanVo> getDeclareDepartment(DeclarePlanCondition condition);

	/**
	 * 获取 申报单位数
	 * 
	 * @return 申报单位数
	 */
	long countDeclareDepartment(DeclarePlanCondition condition);

	/**
	 * 获取 申报用途信息
	 * 
	 * @param condition
	 * @return 申报单位信息
	 */
	List<DeclarePlanVo> getDeclareUse(DeclarePlanCondition condition);

	/**
	 * 获取 申报用途信息数
	 * 
	 * @return 申报用途数
	 */
	long countDeclareUse(DeclarePlanCondition condition);

	/**
	 * 生成申报计划 编号
	 * 
	 * @return
	 */
	String getPlan_Code();

	/**
	 * 生成申报计划
	 * 
	 * @param declareplanName
	 *            申报计划名
	 * @param declareplanCode
	 *            申报计划编码
	 * @param userId
	 *            申报人
	 * @param declareId
	 *            申报项 id
	 * @param declareId 申报项类型
	 * @param type 资产类别
	 */
	void saveDeclarePlan(String declareplanName, String declareplanCode,
			String userId, String declareId,String declareplanType,String propertyType);

	/**
	 * 申报计划打回 param declareDetilId 采购申报详情
	 * 
	 * @return
	 */
	void callBack(String declareDetilId);

	/**
	 * 通过申报计划ID获取申报计划详情 param declarePlanId 申报计划ID
	 * 
	 * @return
	 */
	List getdeclarePlanDetilListByDeclarePlanId(String declarePlanId);

	/**
	* 申报项修改状态
    * deleteDeclarePlan 申报计划Id集合
    * status 状态
	*/ 
	void updateProperties(String declarePlanDetilIds[],String status);
	/**
	* 获取申报相名称
    * deleteDeclarePlan 申报计划Id 
	*/ 
	String getDeclareDetilName(String declarePlanDetilId);
	List<Object[]> getDeclarePlanByCondition(DeclarePlanVo declarePlanvo);

	BigDecimal getDeclarePlanByConditionCount(DeclarePlanVo declarePlanvo);
	
	/**
	 * 新建申报计划
	 * */
	void createDeclarePlan(DeclarePlan vo);
	
	/**
	 * 删除申报记录明细表数据
	 * @param ids
	 */
	void delDeclareDetail(String[] ids);
	/**
	 * 删除申报计划明细表数据
	 * @param ids
	 */
	void delDeclarePlanDetail(String[] ids);
	
	/**
	 * 获取idd关联的申报计划明细表数据总数
	 * @param idd
	 * @return
	 */
	long getCountByDeclareId(String idd);
	
	/**
	 * 提交新建的申报计划
	 * @param ids
	 */
	void submitDeclarePlan(String[] ids);
	
	/**
	 * 根据申报计划id查询申报记录id
	 * @param id
	 * @return
	 */
	String getDeclareIdByPlanId(String id);
	
	/**
	 * 删除申报计划关联关系表
	 * @param id
	 */
	void delDeclarePlan(String id);
	/**
	 * 删除申报计划关联关系表
	 * @param id
	 */
	void delDeclarePlanDetail(String id);
	
	/**
	 * 删除申报记录关联关系表
	 * @param id
	 */
	void delDeclare(String id);
	/**
	 * 删除申报记录关联关系表
	 * @param id
	 */
	void delDeclareDetail(String id);
	
	public List<Object[]> getDeptypeList();
}
