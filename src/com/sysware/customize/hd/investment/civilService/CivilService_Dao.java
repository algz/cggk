package com.sysware.customize.hd.investment.civilService;

import java.util.List;



import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;


public interface CivilService_Dao {
	
	//获取信息列表
	public List<CivilServiceVo> getThisModel(CivilServiceVo vo,Pager pager);
	
	//获取数据总条数
	public int getCount(CivilServiceVo vo);
	
	//添加
	public String addThisModel(CivilServiceModel model) throws Exception;
	
	//删除
	public void delThisModel(String id)  throws Exception;
	
	//修改
	public String updateThisModel(CivilServiceModel model) throws Exception;
	
	
	//查询
	public List<CivilServiceVo> searchThisModel(String materialCode ,String name,String designation,String standard,String techniccondition, Pager pager,CivilServiceVo vo);
	
	//获取查询记录条数
	public int getSeachCount(String name);
	
	
	
	
	//获取根据树节点ID获取列表信息的条数
	public int getCountByNodeId(String nodeid);
	
	//根据ID获取记录集
	public CivilServiceModel getListById(String id);
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename);
	
	/**
	 * 导入sheet名存库
	 * @param TbEquipmenttype
	 */
	public Object[] sheetNameSaveDb(CivilServiceModel model)  throws Exception;
	
	/**
	 * 导入文件文件名存库
	 * @param TbEquipmenttype
	 */
	public Object[] fileNameSaveDb(CivilServiceModel model)  throws Exception;
	
	/**
	 * 导入excel文件内容入库
	 * @param TbEquipmenttype
	 */
	//public int excelContentsSaveDb(TbEquipmenttype tm)  throws Exception;
	public CivilServiceModel excelContentsSaveDb(CivilServiceModel model)  throws Exception;
	
	
	
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
	 * 更新后台表 主供应商、副供应商1、供应商2的id  不需要返回
	 */
	public void updateProvidersStatus();
	
	
	
	
	
	
}
