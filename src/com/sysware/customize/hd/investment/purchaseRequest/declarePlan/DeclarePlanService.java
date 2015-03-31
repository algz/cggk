package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.math.BigDecimal;
import java.util.List;

/**
 * 申报计划service
 * @author fanzhihui
 *
 */
public interface DeclarePlanService {

	/**
	 * 根据条件对象查找申报计划信息
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的申报计划信息
	 */
	List<DeclarePlan> findDeclarePlanByCondition(DeclarePlanCondition condition);
	
	/**
	 * 计算满足条件的申报计划数
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的申报计划记录总数
	 */
	long countDeclarePlansByCondition(DeclarePlanCondition condition);
	
	/**
	 * 获取 申报单位信息
	 * @param condition 条件
	 * @return 申报单位信息
	 */
	List<DeclarePlanVo> getDeclareDepartment(DeclarePlanCondition condition) ;

	/**
	 * 获取 申报单位 数
	 * @return 申报单位 数
	 */
	long countDeclareDepartment(DeclarePlanCondition condition);
	
	/**
	 * 获取 申报单位信息
	 * @param condition 条件
	 * @return 申报单位信息
	 */
	List<DeclarePlanVo> getDeclareUse(DeclarePlanCondition condition) ;

	/**
	 * 获取 申报单位 数
	 * @return 申报单位 数
	 */
	long countDeclareUse(DeclarePlanCondition condition);
	
    /**
     *  生成申报计划 编号
     * @return
     */
    String getPlan_Code();
    
  /**
   *  生成申报计划 
   * @param declareplanName 申报计划名
   * @param declareplanCode 申报计划编码
   * @param userId  申报人
   * @param declareId 申报项 id
   * @param declareId 申报项类型
   * @param propertyType 资产类别
   */
    void saveDeclarePlan(String declareplanName,String declareplanCode,String userId,String declareId,String declareplanType,String propertyType);
    /**
     *  修改申报计划 
     * @param DeclarePlan 申报计划 
     */
     void updateDeclarePlan(DeclarePlan declarePlan);
     /**
      *  修改申报计划 
      * @param DeclarePlan 申报计划 
      */
     DeclarePlan getDeclarePlan(String declarePlanID);
     /**
      *  申报计划打回 
      * @param DeclarePlan 申报计划 
      */
     void callBack(String declareDetilIds[]);
     
 	/**
	* 申报项删除
    * deleteDeclarePlan 申报计划Id集合
	*/ 
	void deleteDeclarePlan(String declarePlanIds[]);
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
	void createDeclarePlan(DeclarePlanVo vo);
	
	void delMaterial(String[] ids,String idd,String[] amounts,String declareplanId)throws Exception;
	
	/**
	 * 提交新建申报计划
	 * @param ids
	 * @throws Exception
	 */
	void submitDeclarePlan(String[] ids)throws Exception;
	
	 /**
	 * 删除新建的申报计划
	 * @param ids
	 * @return
	 */
	void deleteDeclarePlan2(String[] ids)throws Exception;
}
