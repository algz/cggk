package com.sysware.customize.hd.investment.civilService;

import java.util.List;

import org.apache.commons.fileupload.FileItem;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;


public interface CivilService_Service {
	
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
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename);
	
	
	
	/**
	 * 导入sheet名存库
	 * @param CivilServiceVo
	 */
	public Object[] sheetNameSaveDb(CivilServiceVo model)  throws Exception;
	
	/**
	 * 导入文件文件名存库
	 * @param CivilServiceVo
	 */
	public Object[] fileNameSaveDb(CivilServiceVo model)  throws Exception;
	
	/**
	 * 导入excel文件内容入库
	 * @param CivilServiceVo
	 */
	//public int excelContentsSaveDb(equipreServiceVo tm)  throws Exception;
	public CivilServiceModel excelContentsSaveDb(CivilServiceModel model)  throws Exception;
	
	/***
	 * 导入excel文件操作
	 * @param items
	 * @throws BusinessException 
	 * @throws AppException 
	 * @throws NoIsMicroSoftExcelException 
	 */
	public void ImportExcelFile(List<FileItem> items, String nodeId, String nodeIdForGYS) throws NoIsMicroSoftExcelException, AppException, BusinessException;
	
	
	
	
	/***
	 * 导入excel文件的检查操作
	 * @param items
	 * @throws BusinessException 
	 * @throws AppException 
	 * @throws NoIsMicroSoftExcelException 
	 */
	public void checkImportExcelFile(List<FileItem> items) throws NoIsMicroSoftExcelException, AppException, BusinessException;
	
	/***
	 * 根据nodeid获取node名称
	 * @param nodeid
	 * @return
	 */
	public String getNameByNodeId(String nodeid);
	
	//获取子节点的个数
	public int getSubChildCount(String id);
	
	//删除某节点下所有器材信息
	public void deleteWlzlByNode(String id) throws AppException,Exception;
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	public void updateNodestatus() throws Exception;
	
	
	
	
	
	
	/**
	 * //更新后台表 主供应商、副供应商1、供应商2的id  不需要返回
	 */
	public void updateProvidersStatus();
	
	
	
	
	
	
	
	/**
	 * 导出实验代码
	 * @param filename是导出的文件名，heads是excel表头,datalist是数据
	 */
	public void createExcelStream(String filename, String[] heads, List<String[]> datalist);
	
}
