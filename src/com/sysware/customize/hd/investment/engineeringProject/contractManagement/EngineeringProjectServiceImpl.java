package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.read.biff.BiffException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;
import com.sysware.customize.hd.investment.exception.BusinessException;




@Name("engineeringProject_EngineeringProjectServiceImpl")
@SuppressWarnings({"unused","unchecked","deprecation"})
public class EngineeringProjectServiceImpl implements EngineeringProjectService{
	
	@In(create = true, value = "engineeringProject_EngineeringProjectDaoImpl")
	private EngineeringProjectDao engineeringProjectDao;
	
	
	
	//获取物料种类列表
	public List<EngineeringProjectVo> getWlzl(EngineeringProjectVo model, Pager pager) {
		//List<Object[]> wlzlList = engineeringProjectDao.getThisModel(model,pager);
		List<Object[]> wlzlList = null;
		List<EngineeringProjectVo> resultList = new ArrayList<EngineeringProjectVo>();
		List<EngineeringProjectVo> finalResultList = new ArrayList<EngineeringProjectVo>();
		EngineeringProjectVo vo=null;
		
		
		for(Object[] obj : wlzlList)
		{	
			if(obj[1]!= null && String.valueOf(obj[1]).equals("外协件"))//////////////////////////////zdw
				continue;
			/*vo=new equipreServiceVo();
			vo.setId(String.valueOf(obj[0]));//id
			vo.setEquipmentname(String.valueOf(obj[1]));
			vo.setParentId(String.valueOf(obj[2]));//parentId
			vo.setWarningvaluestring(String.valueOf(obj[6]));
			vo.setStorenumberstring(String.valueOf(obj[7]));
			vo.setDimension(String.valueOf(obj[8]));
			vo.setDesigntion(String.valueOf(obj[3]));
			vo.setStandard(String.valueOf(obj[4]));
			vo.setTechniccondition(String.valueOf(obj[5]));
			vo.setPriceStr(String.valueOf(obj[9]));
			vo.setRemark(String.valueOf(obj[11]));
			vo.setReTention(String.valueOf(obj[16]));
			vo.setRetestProject(String.valueOf(obj[17]));
			vo.setRetestHelp(String.valueOf(obj[18]));
			vo.setReTention(String.valueOf(obj[17]));
			vo.setRetestProject(String.valueOf(obj[18]));
			vo.setRetestHelp(String.valueOf(obj[19]));
			
			
			
			vo.setMaterialCode(String.valueOf(obj[20]));//物质代码
			vo.setStandardSize(String.valueOf(obj[21]));//标准尺寸
			vo.setStartOrderQuantity(String.valueOf(obj[22]));//起订量
			vo.setBeginningStocks(String.valueOf(obj[29]));//初期库存
			vo.setActualPrice(String.valueOf(obj[23]));//实际单价
			vo.setProcurementCycleDate(String.valueOf(obj[24]));//采购周期月
			vo.setCliqueCode(String.valueOf(obj[30]));//集团代码
			vo.setMainManufactureName(String.valueOf(obj[26]));//主供应商
			vo.setAlternativeManufactureName(String.valueOf(obj[28]));//备选供应商1
			vo.setAlternativeManufacture2Name(String.valueOf(obj[33]));//备选供应商2
*/			
			
			resultList.add(vo);
		}
		
		//插入第一条记录到返回的list中
		if(resultList.size() > 0)
		{
			EngineeringProjectVo vo1 = resultList.get(0);
			finalResultList.add(vo1);
			
			for(int i=1;i<resultList.size();i++)
			{
				EngineeringProjectVo vo2 = new EngineeringProjectVo();
				boolean flag = false;
				vo2 = resultList.get(i);
				
				/*String ename = vo2.getEquipmentname();
				String designation = vo2.getDesigntion();
				String standard = vo2.getStandard();
				String priceStr = vo2.getPriceStr();
				if(ename.equals("外协件"))//////////////////////////////zdw
					continue;*/
				//遍历需要返回的List
				for(int j=0;j<finalResultList.size();j++)
				{
					EngineeringProjectVo vo3 = new EngineeringProjectVo();
					vo3 = finalResultList.get(j);
					
					/*//判断四者是否相同
					if(ename.trim().equals(vo3.getEquipmentname()) && designation.trim().equals(vo3.getDesigntion()) && standard.trim().equals(vo3.getStandard()) && priceStr.trim().equals(vo3.getPriceStr()))
					{
						EquipreServiceVo vo4 = new EquipreServiceVo();
						vo4.setId(vo3.getId());//id
						vo4.setEquipmentname(vo3.getEquipmentname());
						vo4.setParentId(vo3.getParentId());//parentId
						vo4.setWarningvaluestring(vo3.getWarningvaluestring());
						vo4.setStorenumberstring(vo3.getStorenumberstring());
						vo4.setDesigntion(vo3.getDesigntion());
						vo4.setStandard(vo3.getStandard());
						vo4.setPriceStr(vo3.getPriceStr());
						vo4.setTechniccondition(vo3.getTechniccondition());
						vo4.setRemark(vo3.getRemark());
						vo4.setReTention(vo3.getReTention());
						vo4.setRetestProject(vo3.getRetestProject());
						vo4.setRetestHelp(vo3.getRetestHelp());
						
						vo4.setMaterialCode(vo3.getMaterialCode());//物质代码
						vo4.setStandardSize(vo3.getStandardSize());//标准尺寸
						vo4.setStartOrderQuantity(vo3.getStartOrderQuantity());//起订量
						vo4.setBeginningStocks(vo3.getBeginningStocks());//初期库存
						vo4.setActualPrice(vo3.getActualPrice());//实际单价
						vo4.setProcurementCycleDate(vo3.getProcurementCycleDate());//采购周期月
						vo4.setCliqueCode(vo3.getCliqueCode());//集团代码
						vo4.setMainManufactureName(vo3.getMainManufactureName());//主供应商
						vo4.setAlternativeManufactureName(vo3.getAlternativeManufactureName());//备选供应商1
						vo4.setAlternativeManufacture2Name(vo3.getAlternativeManufacture2Name());//备选供应商2
						
						finalResultList.remove(vo3);
						finalResultList.add(vo4);
						flag = true;
						break;
					}*/
				}
				
				if(flag == false)
				{
					finalResultList.add(vo2);
				}
				
			}
		}
		
		
		return finalResultList;
	}
	
	
	//添加
	public String addThisModel(EngineeringProjectModel model) throws Exception {
		return engineeringProjectDao.addThisModel(model);
	}
	
	/**
	 * 删除物料种类
	 */
	public void delWlzl(String id)  throws Exception {
		engineeringProjectDao.delThisModel(id);
		
	}
	
	/**
	 * 修改物料种类
	 */
	@Transactional
	public String addOrUpdateEngineeringProject(EngineeringProjectFormVo vo)  throws Exception {
		String action = StringUtils.isBlank(vo.getAction()) ? "" : vo.getAction();
		String returnString = "";
		if(action.equals("add")){
			returnString = engineeringProjectDao.addEngineeringProject(vo);
		}else if(action.equals("update")){
			returnString =  engineeringProjectDao.updateEngineeringProject(vo);
		}
		return returnString ;
	}
	
	/**
	 * 查询物料种类
	 */
	public List<EngineeringProjectVo> searchWlzl(String materialCode,String name,String designation,String standard,String techniccondition,Pager pager,EngineeringProjectVo vo) {
		List<EngineeringProjectVo> list = engineeringProjectDao.searchThisModel(materialCode,name,designation,standard,techniccondition, pager, vo);
		return list;
	}
	
	
	/***
	 * 获取树根节点
	 */
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID) {
		List<Object[]> list = engineeringProjectDao.getTreeRootNode(parentid,type,uID);
		return list;
	}
	
	
	/***
	 * 根据树节点ID获取列表信息
	 */
	public List<EngineeringProjectVo> getListByNodeId(EngineeringProjectModel model,String nodeid,Pager pager) {
		List<Object[]> list = engineeringProjectDao.getListByNodeId(model,nodeid,pager);
		List<EngineeringProjectVo> resultList = new ArrayList<EngineeringProjectVo>();
		List<EngineeringProjectVo> finalResultList = new ArrayList<EngineeringProjectVo>();
		EngineeringProjectVo vo=null;
		
		for(Object[] obj : list)
		{	
			vo = new EngineeringProjectVo();/*
			vo.setId(String.valueOf(obj[0]));//id
			vo.setEquipmentname(String.valueOf(obj[1]));
			vo.setParentId(String.valueOf(obj[2]));//parentId
			vo.setWarningvaluestring(String.valueOf(obj[6]));
			vo.setStorenumberstring(String.valueOf(obj[7]));
			vo.setDimension(String.valueOf(obj[8]));
			vo.setDesigntion(String.valueOf(obj[3]));
			vo.setStandard(String.valueOf(obj[4]));
			vo.setTechniccondition(String.valueOf(obj[5]));
			vo.setPriceStr(String.valueOf(obj[9]));
			vo.setRemark(String.valueOf(obj[11]));//备注
			vo.setReTention(String.valueOf(obj[17]));
			vo.setRetestProject(String.valueOf(obj[18]));
			vo.setRetestHelp(String.valueOf(obj[19]));
			
			vo.setMaterialCode(String.valueOf(obj[20]));//物质代码
			vo.setStandardSize(String.valueOf(obj[21]));//标准尺寸
			vo.setStartOrderQuantity(String.valueOf(obj[22]));//起订量
			vo.setBeginningStocks(String.valueOf(obj[29]));//初期库存
			vo.setActualPrice(String.valueOf(obj[23]));//实际单价
			vo.setProcurementCycleDate(String.valueOf(obj[24]));//采购周期月
			vo.setMainManufactureName(String.valueOf(obj[26]));//主供应商
			vo.setAlternativeManufactureName(String.valueOf(obj[28]));//备选供应商1
			vo.setAlternativeManufacture2Name(String.valueOf(obj[33]));//备选供应商2
			vo.setCliqueCode(String.valueOf(obj[30]));//集团代码
*/			
			resultList.add(vo);
		}
		
		
		if(resultList.size() > 0)
		{
			//插入第一条记录到返回的list中
			EngineeringProjectVo vo1 = resultList.get(0);
			finalResultList.add(vo1);
			
			for(int i=1;i<resultList.size();i++)
			{
				EngineeringProjectVo vo2 = new EngineeringProjectVo();
				boolean flag = false;
				vo2 = resultList.get(i);
				
				/*String ename = vo2.getEquipmentname();//器材名称
				String designation = vo2.getDesigntion();//牌号
				String standard = vo2.getStandard();//规格
				String priceStr = vo2.getPriceStr();//计划单价字符串
				*/
				
				//遍历需要返回的List
				for(int j=0;j<finalResultList.size();j++)
				{
					EngineeringProjectVo vo3 = new EngineeringProjectVo();
					vo3 = finalResultList.get(j);
					
					//判断四者是否相同
					//如果四者相同,就合并,且显示一条 这是原来的逻辑
					/*if(ename.trim().equals(vo3.getEquipmentname()) && designation.trim().equals(vo3.getDesigntion()) && standard.trim().equals(vo3.getStandard()) && priceStr.trim().equals(vo3.getPriceStr()))
					{
						equipreServiceVo vo4 = new equipreServiceVo();
						vo4.setId(vo3.getId());//id
						vo4.setEquipmentname(vo3.getEquipmentname());
						vo4.setParentId(vo3.getParentId());//parentId
						vo4.setWarningvaluestring(vo3.getWarningvaluestring());
						vo4.setStorenumberstring(vo3.getStorenumberstring());
						vo4.setDesigntion(vo3.getDesigntion());
						vo4.setStandard(vo3.getStandard());
						vo4.setPriceStr(vo3.getPriceStr());
						vo4.setTechniccondition(vo3.getTechniccondition());
						vo4.setRemark(vo3.getRemark());
						vo4.setReTention(vo3.getReTention());
						vo4.setRetestProject(vo3.getRetestProject());
						vo4.setRetestHelp(vo3.getRetestHelp());
						
						finalResultList.remove(vo3);
						finalResultList.add(vo4);
						flag = true;
						break;
					}*/
				}
				
				if(flag == false)
				{
					finalResultList.add(vo2);
				}
				
			}
		}
		
		return finalResultList;
	
	}
	
	/***
	 * 获取根据树节点ID获取列表信息的条数
	 */
	public int getCountByNodeId(String nodeid) {
		int count = engineeringProjectDao.getCountByNodeId(nodeid);
		return count;
	}
	
	/**
	 * 导入excel文件内容入库  修改原返回类型int 为 TbEquipmenttype
	 * @param TbEquipmenttype
	 */
	public EngineeringProjectModel excelContentsSaveDb(EngineeringProjectModel model) throws Exception {
		/*int flag = engineeringProjectDao.excelContentsSaveDb(tm);
		return flag;*/
		return engineeringProjectDao.excelContentsSaveDb(model);
	}
	
	
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename) {
		return engineeringProjectDao.findIdByName(ename);
	}
	
	
	
	
	/***
	 * 获取sheet名称
	 * @param fi
	 * @return
	 * @throws Exception
	 */
	private ArrayList<String> getSheetName(FileItem fi)
	{
		Workbook workbook = null ;
		ArrayList<String> arr = new ArrayList<String>();
		try {
			workbook = Workbook.getWorkbook(fi.getInputStream());
			Sheet[] sheetarr = workbook.getSheets();
			for (int i = 0; i < sheetarr.length; i++) {
				String sheetName = sheetarr[i].getName();
				arr.add(sheetName);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != workbook) {
				workbook.close();
			}
		}
		
		return arr;
	}
	
	/***
	 * 根据nodeid获取node名称
	 */
	public String getNameByNodeId(String nodeid) {
		String name = engineeringProjectDao.getNameByNodeId(nodeid);
		return name;
	}
	

	public int getSubChildCount(String id) {
		int count = engineeringProjectDao.getSubChildCount(id);
		return count;
	}

	public void deleteAllWlzlByNode(String id) throws AppException,Exception {
		engineeringProjectDao.deleteAllByNode(id);
	}
	
	
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	public void updateNodestatus() throws Exception{
		engineeringProjectDao.updateNodestatus();
	}
	
	
	/**
	 * 导出实验代码
	 * @param filename是导出的文件名，heads是excel表头,datalist是数据
	 */
	public void createExcelStream(String filename, String[] heads, List<String[]> datalist) {
		try {
			/*OutputStream os = response.getOutputStream();
			WritableWorkbook wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(filename, 0);//创建Sheet
			for (int i = 0; i < heads.length; i++) {
				Label label = new Label(i, 0, heads[i]);
				wsheet.addCell(label);
			}
			for (int i = 0; i < datalist.size(); i++) {
				for (int j = 0; j < datalist.get(i).length; j++) {
					Label label = new Label(j, i + 1, datalist.get(i)[j]);
					wsheet.addCell(label);
				}
			}
			response.setHeader("Content-disposition", "attachment;" + "filename=" + new String(filename.getBytes("GBK"), "ISO_8859_1") + ".xls");
			response.setContentType("application/vnd.ms-excel");
			wbook.write();
			wbook.close();
			os.close();*/
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	
	
	
	
	
	public int delThisModel(String engineeringContractId) throws Exception {
		return engineeringProjectDao.delThisModel(engineeringContractId);
		
	}




	public List<EngineeringProjectVo> getThisModel(EngineeringProjectVo vo, Pager pager) {
		return engineeringProjectDao.getThisModel(vo, pager);
	}

	public List<EngineeringProjectVo> searchThisModel(String materialCode,
			String name, String designation, String standard,
			String techniccondition, Pager pager, EngineeringProjectVo vo) {
		// TODO Auto-generated method stub
		return null;
	}


	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<EngineeringProjectVo> getProjectByGroup(EngineeringProjectVo vo,Pager pager){
		return engineeringProjectDao.getProjectByGroup(vo, pager);
	}
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	@Transactional
	public void updateApprovalState(String id,String flag){
		engineeringProjectDao.updateApprovalState(id, flag);
	}
}
