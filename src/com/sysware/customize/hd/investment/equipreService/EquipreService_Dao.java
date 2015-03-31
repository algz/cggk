package com.sysware.customize.hd.investment.equipreService;

import java.util.List;



import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.exception.AppException;


public interface EquipreService_Dao {
	
	//获取信息列表
	public List<EquipreServiceVo> getThisModel(EquipreServiceVo vo,Pager pager);
	
	//获取数据总条数
	public int getCount(EquipreServiceVo vo);
	
	//添加
	public String addThisModel(EquipreServiceModel model) throws Exception;
	
	//删除
	public void delThisModel(String id)  throws Exception;
	
	//修改
	public String updateThisModel(EquipreServiceModel model) throws Exception;
	
	
	//查询
	public List<EquipreServiceVo> searchThisModel(String materialCode ,String name,String designation,String standard,String techniccondition, Pager pager,EquipreServiceVo vo);
	
	//获取查询记录条数
	public int getSeachCount(String name);
	
	
	//获取树根节点
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID);
	
	//根据树节点ID获取列表信息
	public List<Object[]> getListByNodeId(EquipreServiceModel model, String nodeid,Pager pager);
	
	//根据树节点ID获取列表信息 获取列表的条数
	public int getAllListByNodeId(String nodeid,Pager pager);
	
	
	//获取根据树节点ID获取列表信息的条数
	public int getCountByNodeId(String nodeid);
	
	//根据ID获取记录集
	public EquipreServiceModel getListById(String id);
	
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
	public Object[] sheetNameSaveDb(EquipreServiceModel model)  throws Exception;
	
	/**
	 * 导入文件文件名存库
	 * @param TbEquipmenttype
	 */
	public Object[] fileNameSaveDb(EquipreServiceModel model)  throws Exception;
	
	/**
	 * 导入excel文件内容入库
	 * @param TbEquipmenttype
	 */
	//public int excelContentsSaveDb(TbEquipmenttype tm)  throws Exception;
	public EquipreServiceModel excelContentsSaveDb(EquipreServiceModel model)  throws Exception;
	
	
	
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
	
	
	
	public List<EquipServiceImplPlan> getGridData(EquipreServiceVo vo);
	
	/**
	 * 编辑设备大修实施计划
	 * @param vo
	 * @return
	 */
	String editEquipServiceImplPlan(EquipreServiceVo vo);
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(EquipreServiceVo vo);
}
