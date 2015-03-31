package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import java.util.List;

import org.apache.commons.fileupload.FileItem;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;


public interface EngineeringProjectService {
	
	//获取信息列表
	public List<EngineeringProjectVo> getThisModel(EngineeringProjectVo vo,Pager pager);
	
	
	//添加
	public String addThisModel(EngineeringProjectModel model) throws Exception;
	
	//删除
	public int delThisModel(String id)  throws Exception;
	
	//修改
	public String addOrUpdateEngineeringProject(EngineeringProjectFormVo vo) throws Exception;
	
	
	//查询
	public List<EngineeringProjectVo> searchThisModel(String materialCode ,String name,String designation,String standard,String techniccondition, Pager pager,EngineeringProjectVo vo);
	
	
	
	
	//获取树根节点
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID);
	
	//根据树节点ID获取列表信息
	public List<EngineeringProjectVo> getListByNodeId(EngineeringProjectModel model, String nodeid,Pager pager);
	
	
	//获取根据树节点ID获取列表信息的条数
	public int getCountByNodeId(String nodeid);
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename);
	
	
	
	
	
	/**
	 * 导入excel文件内容入库
	 * @param EngineeringProjectVo
	 */
	//public int excelContentsSaveDb(equipreServiceVo tm)  throws Exception;
	public EngineeringProjectModel excelContentsSaveDb(EngineeringProjectModel model)  throws Exception;
	
	
	
	
	/***
	 * 根据nodeid获取node名称
	 * @param nodeid
	 * @return
	 */
	public String getNameByNodeId(String nodeid);
	
	//获取子节点的个数
	public int getSubChildCount(String id);
	
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	public void updateNodestatus() throws Exception;
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 导出实验代码
	 * @param filename是导出的文件名，heads是excel表头,datalist是数据
	 */
	public void createExcelStream(String filename, String[] heads, List<String[]> datalist);
	
	
	
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
