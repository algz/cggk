package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import java.util.List;



import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;


public interface EngineeringProjectDao {
	
	//获取信息列表
	public List<EngineeringProjectVo> getThisModel(EngineeringProjectVo vo,Pager pager);
	
	
	//添加
	public String addThisModel(EngineeringProjectModel model) throws Exception;
	
	//删除
	public int delThisModel(String engineeringContractId)  throws Exception;
	
	//新增一个
	public String addEngineeringProject(EngineeringProjectFormVo vo) throws Exception;
	
	//修改一个
	public String updateEngineeringProject(EngineeringProjectFormVo vo) throws Exception;
	
	
	//查询
	public List<EngineeringProjectVo> searchThisModel(String materialCode ,String name,String designation,String standard,String techniccondition, Pager pager,EngineeringProjectVo vo);
	
	
	
	//获取树根节点
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID);
	
	//根据树节点ID获取列表信息
	public List<Object[]> getListByNodeId(EngineeringProjectModel model, String nodeid,Pager pager);
	
	
	
	//获取根据树节点ID获取列表信息的条数
	public int getCountByNodeId(String nodeid);
	
	//根据ID获取记录集
	public EngineeringProjectModel getListById(String id);
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename);
	
	
	
	/**
	 * 导入excel文件内容入库
	 * @param TbEquipmenttype
	 */
	//public int excelContentsSaveDb(TbEquipmenttype tm)  throws Exception;
	public EngineeringProjectModel excelContentsSaveDb(EngineeringProjectModel model)  throws Exception;
	
	
	
	/***
	 * 根据nodeid获取node名称
	 * @param nodeid
	 * @return
	 */
	public String getNameByNodeId(String nodeid);
	
	//获取子节点的个数
	public int getSubChildCount(String id);
	
	//删除某节点下所有器材信息
	public void deleteAllByNode(String id) throws AppException,Exception;
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	public void updateNodestatus() throws Exception;
	
	
	
	
	
	
	
	/**
	 * 根据文件名称获取导入文件的ID Loop遍历Sheet里面的数据时
	 * @param ename
	 * @return String
	 */
	public String findIdByNameForLoop(String ename,String parentName);
	
	
	
	
	
	
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<EngineeringProjectVo> getProjectByGroup(EngineeringProjectVo vo,Pager pager);
	
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag);
}
