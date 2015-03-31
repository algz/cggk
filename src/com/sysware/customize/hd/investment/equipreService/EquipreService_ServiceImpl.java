package com.sysware.customize.hd.investment.equipreService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.read.biff.BiffException;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;
import com.sysware.customize.hd.investment.exception.BusinessException;




@Name("equipreService_EquipreService_ServiceImpl")
@SuppressWarnings({"unused","unchecked","deprecation"})
public class EquipreService_ServiceImpl implements EquipreService_Service{
	
	@In(create = true, value = "equipreService_EquipreService_DaoImpl")
	private EquipreService_Dao equipreServiceDao;
	
	
	
	//获取物料种类列表
	public List<EquipreServiceVo> getWlzl(EquipreServiceVo model, Pager pager) {
		//List<Object[]> wlzlList = equipreServiceDao.getThisModel(model,pager);
		List<Object[]> wlzlList = null;
		List<EquipreServiceVo> resultList = new ArrayList<EquipreServiceVo>();
		List<EquipreServiceVo> finalResultList = new ArrayList<EquipreServiceVo>();
		EquipreServiceVo vo=null;
		
		
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
			EquipreServiceVo vo1 = resultList.get(0);
			finalResultList.add(vo1);
			
			for(int i=1;i<resultList.size();i++)
			{
				EquipreServiceVo vo2 = new EquipreServiceVo();
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
					EquipreServiceVo vo3 = new EquipreServiceVo();
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
	
	//获取物料种类表数据总条数
	public int getWlzlCount(EquipreServiceVo vo) {
		return equipreServiceDao.getCount(vo);
	}
	
	//添加
	public String addThisModel(EquipreServiceModel model) throws Exception {
		return equipreServiceDao.addThisModel(model);
	}
	
	/**
	 * 删除物料种类
	 */
	public void delWlzl(String id)  throws Exception {
		equipreServiceDao.delThisModel(id);
		
	}
	
	/**
	 * 修改物料种类
	 */
	@Transactional
	public String updateThisModel(EquipreServiceModel model)  throws Exception {
		return equipreServiceDao.updateThisModel(model);
	}
	
	/**
	 * 查询物料种类
	 */
	public List<EquipreServiceVo> searchWlzl(String materialCode,String name,String designation,String standard,String techniccondition,Pager pager,EquipreServiceVo vo) {
		List<EquipreServiceVo> list = equipreServiceDao.searchThisModel(materialCode,name,designation,standard,techniccondition, pager, vo);
		return list;
	}
	
	//获取物料名称查询记录条数
	public int getSeachWlzlCount(String name){
		int count = equipreServiceDao.getSeachCount(name);
		return count;
	}
	
	/***
	 * 获取树根节点
	 */
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID) {
		List<Object[]> list = equipreServiceDao.getTreeRootNode(parentid,type,uID);
		return list;
	}
	
	
	/***
	 * 根据树节点ID获取列表信息
	 */
	public List<EquipreServiceVo> getListByNodeId(EquipreServiceModel model,String nodeid,Pager pager) {
		List<Object[]> list = equipreServiceDao.getListByNodeId(model,nodeid,pager);
		List<EquipreServiceVo> resultList = new ArrayList<EquipreServiceVo>();
		List<EquipreServiceVo> finalResultList = new ArrayList<EquipreServiceVo>();
		EquipreServiceVo vo=null;
		
		for(Object[] obj : list)
		{	
			vo = new EquipreServiceVo();/*
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
			EquipreServiceVo vo1 = resultList.get(0);
			finalResultList.add(vo1);
			
			for(int i=1;i<resultList.size();i++)
			{
				EquipreServiceVo vo2 = new EquipreServiceVo();
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
					EquipreServiceVo vo3 = new EquipreServiceVo();
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
		int count = equipreServiceDao.getCountByNodeId(nodeid);
		return count;
	}
	
	/**
	 * 导入excel文件内容入库  修改原返回类型int 为 TbEquipmenttype
	 * @param TbEquipmenttype
	 */
	public EquipreServiceModel excelContentsSaveDb(EquipreServiceModel model) throws Exception {
		/*int flag = equipreServiceDao.excelContentsSaveDb(tm);
		return flag;*/
		return equipreServiceDao.excelContentsSaveDb(model);
	}
	
	/**
	 * 导入文件文件名存库
	 * @param TbEquipmenttype
	 */
	public Object[] fileNameSaveDb(EquipreServiceModel model) throws Exception {
		Object[] returnArrayObject = equipreServiceDao.fileNameSaveDb(model);
		return returnArrayObject;
	}
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename) {
		return equipreServiceDao.findIdByName(ename);
	}
	
	/**
	 * 导入sheet名存库
	 * @param TbEquipmenttype
	 */
	public Object[] sheetNameSaveDb(EquipreServiceModel model) throws Exception {
		return equipreServiceDao.sheetNameSaveDb(model);
	}
	
	
	/***
	 * 导入excel文件操作
	 * @param items
	 */
	@Transactional
	public void ImportExcelFile(List<FileItem> items, String nodeId, String nodeIdForGYS) throws NoIsMicroSoftExcelException,AppException,BusinessException{
		Iterator<FileItem> itr = items.iterator();
		ArrayList<String> sheetNameArr = new ArrayList<String>(); 
		String filename=null;
		
		EquipreServiceModel tm = null;
		Workbook workbook = null;
		Workbook workbook2 = null;
		EquipreServiceModel returnVo = null;//保存后,clone后,返回的vo
		EquipreServiceVo tbequipmenttypevo = null;
		String fileNameOrManufactureType = "";//文件名 以及 供应商类型
		Object[] arrayObj = new Object[2];//插入Excel名后得到的返回Object[]
		Object[] arrayObj2 = new Object[2];//插入Sheet名后得到的返回Object[]
		
		while(itr.hasNext()){
			FileItem fi = (FileItem)itr.next();
			
			filename = fi.getName();
			
			String[] namearr1 = null;
			String prename = null;
			String extension = ""; //上传文件的后缀名 
			if (filename.indexOf("\\") != -1) {
				String[] namearr = filename.split("\\\\");
				String filename1 = namearr[namearr.length - 1];

				namearr1 = filename1.split("\\.");
				prename = namearr1[0];
				extension = namearr1[namearr1.length - 1];
			} else {
				namearr1 = filename.split("\\.");
				prename = namearr1[0];
				extension = namearr1[namearr1.length - 1];
			}

			//2011/6/21 添加对文件后缀名的判断,只能是xls或xlsx
			if(extension.equals("xls") == false && extension.equals("xlsx") == false ){
				throw new NoIsMicroSoftExcelException("不是 Microsoft Excel 文件!");
			}
			
				
				
			tm = new EquipreServiceModel();
			//tm.setEquipmentname(prename);
			//tm.setParentId("0");
			//tm.setParentId(nodeId);//前台jS传递过来的点击的节点参数
			//tm.setIsLeaf(0);
			/*
			if(nodeIdForGYS.equals("0")){//如果点击节点的父父父...节点的下一节点为 根节点...
				fileNameOrManufactureType = tm.getEquipmentname();//存供应商类型就取Excel的文件名
				nodeIdForGYS = "0";
			}else{
				fileNameOrManufactureType = "0";
				
			}*/
			
			
			
			
			//1、文件名入库操作
			try {
				arrayObj = equipreServiceDao.fileNameSaveDb(tm);//1.Excel入库
			} catch (Exception e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			}
			
			//2、sheet名入库操作
			EquipreServiceModel newTm = new EquipreServiceModel();
			newTm = (EquipreServiceModel)arrayObj[0];
			//String id = equipreServiceDao.findIdByName(prename,newTm);
			String id = newTm.getId();

			try {
				sheetNameArr = this.getSheetName(fi);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			}
			
			
			
			
			
			EquipreServiceModel newTm2 = new EquipreServiceModel();
			WorkbookSettings ws2 = new WorkbookSettings();
			ws2.setEncoding("ISO-8859-1");
			try {
				workbook2 = Workbook.getWorkbook(fi.getInputStream(), ws2);
			} catch (BiffException e2) {
				e2.printStackTrace();
			} catch (IOException e2) {
				e2.printStackTrace();
			}
			Sheet[] sheetarr2 = workbook2.getSheets();
			String[] arrayId = new String[sheetarr2.length];//创建动态大小的字符串数组,存放Sheet的id
			int loopFlag = 0;
			for (String str : sheetNameArr) {
				tm = new EquipreServiceModel();
				/*
				tm.setEquipmentname(str);
				tm.setParentId(id);
				tm.setIsLeaf(0);
				try {
					arrayObj2 = equipreServiceDao.sheetNameSaveDb(tm);//2.Sheet入库
					newTm2 = (TbEquipmenttype)arrayObj2[0];//这里的id就是 数据的父节点的id
					arrayId[loopFlag] = newTm2.getId();
					
					loopFlag++;
				} catch (Exception e) {
					e.printStackTrace();
					throw new AppException(e.getMessage());
				}*/
			}
			
			
			
			
			
			
			
			//3、excel文件内容入库
			try {
				WorkbookSettings ws = new WorkbookSettings();
				ws.setEncoding("ISO-8859-1");
				workbook = Workbook.getWorkbook(fi.getInputStream(), ws);
				Sheet[] sheetarr = workbook.getSheets();
				for (int i = 0; i < sheetarr.length; i++) {
					String sheetname = sheetarr[i].getName();
					//String sheetid = equipreServiceDao.findIdByName(sheetname);
					String sheetid = arrayId[i];
					int rows = sheetarr[i].getRows();// 行数
					for (int m = 2; m < rows; m++)//遍历行
					{
						tm = new EquipreServiceModel();
						
						//遍历excel内容一行数据
						String cliqueCode = sheetarr[i].getCell(0,m).getContents().trim();//集团代码
						String materialcode = sheetarr[i].getCell(1,m).getContents().trim(); //物质代码
						String equipmentname = sheetarr[i].getCell(2,m).getContents().trim(); //物资名称
						String designtion = sheetarr[i].getCell(3,m).getContents().trim(); //牌号
						String standard = sheetarr[i].getCell(4,m).getContents().trim(); //规格型号
						String techniccondition = sheetarr[i].getCell(5,m).getContents().trim(); //技术条件
						String standardsize = sheetarr[i].getCell(6,m).getContents().trim(); //标准尺寸
						String dimension =  sheetarr[i].getCell(7,m).getContents().trim(); //计量单位
						String startorderquantity = sheetarr[i].getCell(8,m).getContents().trim();  //起订量
						String warningvalue = sheetarr[i].getCell(9,m).getContents().trim();  //预警值
						String beginningstocks = sheetarr[i].getCell(10,m).getContents().trim(); //初期库存
						String referenceprice = sheetarr[i].getCell(11,m).getContents().trim(); //计划单价
						String actualprice = sheetarr[i].getCell(12,m).getContents().trim();//实际单价
						String procurementcycledate = sheetarr[i].getCell(13,m).getContents().trim();//采购周期(月)
						String retention = sheetarr[i].getCell(14,m).getContents().trim();//保管周期(月)
						String retestproject = sheetarr[i].getCell(15,m).getContents().trim(); //复验项目
						String retesthelp = sheetarr[i].getCell(16,m).getContents().trim(); //复验说明
						String mainmanufacturename = sheetarr[i].getCell(17,m).getContents().trim(); //主选供应商名称
						String alternativemanufacturename = sheetarr[i].getCell(18,m).getContents().trim(); //备选供应商1名称
						String alternativemanufacture2name = sheetarr[i].getCell(19,m).getContents().trim(); //备选供应商2名称
						String remark = sheetarr[i].getCell(20,m).getContents().trim();//备注
						
						
						
						
						
						
						/*//处理后的数据,装入model
						tm.setCliqueCode(cliqueCode);//集团代码
						tm.setMaterialCode(materialcode); //物质代码
						tm.setEquipmentname(equipmentname);//物资名称
						tm.setDesigntion(designtion);//牌号
						tm.setStandard(standard);//规格型号
						tm.setTechniccondition(techniccondition);//技术条件
						tm.setStandardSize(standardsize);//标准尺寸
						tm.setDimension(dimension);//计量单位
						try{
							tm.setStartOrderQuantity(BigDecimal.valueOf(Double.parseDouble(startorderquantity)));//起订量
						}catch(NumberFormatException e){
							if(startorderquantity == null || startorderquantity == ""){
								tm.setStartOrderQuantity(BigDecimal.valueOf(Double.parseDouble("0")));
							}
						}
						try{
							tm.setWarningvalue(BigDecimal.valueOf(Double.parseDouble(warningvalue)));//预警值
						}catch(NumberFormatException e){
							if(warningvalue == null || warningvalue == ""){
								tm.setWarningvalue(BigDecimal.valueOf(Double.parseDouble("0")));
							}
						}
						try{
							tm.setBeginningStocks(BigDecimal.valueOf(Double.parseDouble(beginningstocks)));//初期库存
							tm.setStorenumber(BigDecimal.valueOf(Double.parseDouble(beginningstocks)));//storenumber 库存量
						}catch(NumberFormatException e){
							if(beginningstocks == null || beginningstocks == ""){
								tm.setBeginningStocks(BigDecimal.valueOf(Double.parseDouble("0")));//初期库存
								tm.setStorenumber(BigDecimal.valueOf(Double.parseDouble("0")));//storenumber 库存量
							}
						}
						try{
							tm.setReferenceprice(BigDecimal.valueOf(Double.parseDouble(referenceprice)));//计划单价
						}catch(NumberFormatException e){
							if(referenceprice == null || referenceprice == ""){
								tm.setReferenceprice(BigDecimal.valueOf(Double.parseDouble("0")));
							}
						}
						try{
							tm.setActualPrice(BigDecimal.valueOf(Double.parseDouble(actualprice)));//实际单价
						}catch(NumberFormatException e){
							if(actualprice == null || actualprice == ""){
								tm.setActualPrice(BigDecimal.valueOf(Double.parseDouble("0")));
							}
						}
						tm.setProcurementCycleDate(procurementcycledate);  //采购周期(月)
						tm.setReTention(retention);//保管周期(月)
						tm.setRetestProject(retestproject);//复验项目
						tm.setRetestHelp(retesthelp);//复验说明
						tm.setMainManufactureName(mainmanufacturename); //主选供应商名称
						tm.setAlternativeManufactureName(alternativemanufacturename); //备选供应商1名称
						tm.setAlternativeManufacture2Name(alternativemanufacture2name); //备选供应商2名称
						tm.setRemark(remark);//备注
						
						
						
						
						//设置节点属性
						tm.setParentId(sheetid);
						tm.setIsDelete(0);
						tm.setIsLeaf(1);*/
						try {
							//物质代码 或 物资名称 为空,跳到下个循环
							//if (tm.getEquipmentname().trim().equals("") || tm.getMaterialCode().trim().equals("")) {
							if (1>2) {
								//tm.setMaterialCode(materialcode); 
								//tm.setEquipmentname(equipmentname);
								
								continue;
								// throw new BusinessException("导入文件存在器材名称为空,sheet名为："+sheetname+",行数为："+m+", 请检查,并重新导入");
							} else {
								returnVo = equipreServiceDao.excelContentsSaveDb(tm);
								
								/*if(returnVo != null){//returnVo为null表示不需要处理
									tbequipmenttypevo = new TbEquipmenttypeVo();								
									tbequipmenttypevo.setMaterialCode(returnVo.getMaterialCode());// 物资代码
									tbequipmenttypevo.setEquipmentname(returnVo.getEquipmentname());//器材名称
									tbequipmenttypevo.setDesigntion(returnVo.getDesigntion());// 牌号
									tbequipmenttypevo.setStandard(returnVo.getStandard());// 规格 可有可无
									tbequipmenttypevo.setReferenceprice(returnVo.getReferenceprice());// 计划单价
									tbequipmenttypevo.setMainManufactureName(returnVo.getMainManufactureName());// 主选供应商名称
									tbequipmenttypevo.setAlternativeManufactureName(returnVo.getAlternativeManufactureName());//备选供应商1名称
									tbequipmenttypevo.setAlternativeManufacture2Name(returnVo.getAlternativeManufacture2Name());// 备选供应商2名称
									tbequipmenttypevo.setId(returnVo.getId());//tb_equipmenttype 表 id
									tbequipmenttypevo.setFileNameOrManufactureType(fileNameOrManufactureType);//存入供应商类型给vo传递给后台使用
									tbequipmenttypevo.setNodeIdForGYS(nodeIdForGYS);//点击节点的很多父节点的下一子节点
									tbequipmenttypevo.setStorenumber(tm.getStorenumber());//期初库存
									
									
									
									//新增方法,对后续的主供应商 副供应商进行处理
									if(tbequipmenttypevo != null){
										equipreServiceDao.dealTheManufacture(tbequipmenttypevo);
									}
									//2011-10-13 插入  器材明细账表(TB_EQUIPMENTACCOUNT)
									if(tbequipmenttypevo != null){
										equipreServiceDao.insertEquipmentAccount(tbequipmenttypevo);
									}
								}*/
							}
						} catch (AppException e1) {
							e1.printStackTrace();
							throw new AppException("数据错误,过程回滚");
						} catch (Exception e) {
							e.printStackTrace();
							throw new AppException(e.getMessage());
						}
						
					}
					
				}
				
				
			} catch (ArrayIndexOutOfBoundsException e){
				e.printStackTrace();
				throw new AppException("Sheet取列下标越界,请检查列数是否符合原模板");
			} catch (BiffException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			} finally {
				if (null != workbook) {
					workbook.close();
				}
			}
			
		}
		
		
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
		String name = equipreServiceDao.getNameByNodeId(nodeid);
		return name;
	}
	

	public int getSubChildCount(String id) {
		int count = equipreServiceDao.getSubChildCount(id);
		return count;
	}

	public void deleteAllWlzlByNode(String id) throws AppException,Exception {
		equipreServiceDao.deleteAllByNode(id);
	}
	
	
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	public void updateNodestatus() throws Exception{
		equipreServiceDao.updateNodestatus();
	}
	
	
	
	
	
	
	/***
	 * 导入excel文件操作
	 * @param items
	 */
	@Transactional
	public void checkImportExcelFile(List<FileItem> items) throws NoIsMicroSoftExcelException,AppException,BusinessException{
		Iterator<FileItem> itr = items.iterator();
		ArrayList<String> sheetNameArr = new ArrayList<String>(); 
		String filename=null;
		
		EquipreServiceModel tm = null;
		Workbook workbook = null;
		Workbook workbook2 = null;
		EquipreServiceModel returnVo = null;//保存后,clone后,返回的vo
		EquipreServiceVo tbequipmenttypevo = null;
		//String fileNameOrManufactureType = "";//文件名 以及 供应商类型
		Object[] arrayObj = new Object[2];//插入Excel名后得到的返回Object[]
		Object[] arrayObj2 = new Object[2];//插入Sheet名后得到的返回Object[]
		String returnMsg = "";//返回的消息 如果导入的新产品在物资表里没找到,需要保存的那些需要提示出的消息
		
		
		while(itr.hasNext()){
			FileItem fi = (FileItem)itr.next();
			
			filename = fi.getName();
			
			String[] namearr1 = null;
			String prename = null;
			String extension = ""; //上传文件的后缀名 
			if (filename.indexOf("\\") != -1) {
				String[] namearr = filename.split("\\\\");
				String filename1 = namearr[namearr.length - 1];

				namearr1 = filename1.split("\\.");
				prename = namearr1[0];
				extension = namearr1[namearr1.length - 1];
			} else {
				namearr1 = filename.split("\\.");
				prename = namearr1[0];
				extension = namearr1[namearr1.length - 1];
			}

			//2011/6/21 添加对文件后缀名的判断,只能是xls或xlsx
			if(extension.equals("xls") == false && extension.equals("xlsx") == false ){
				throw new NoIsMicroSoftExcelException("不是 Microsoft Excel 文件!");
			}
			
				
				
			tm = new EquipreServiceModel();
			//tm.setEquipmentname(prename);
			//tm.setParentId("0");
			//tm.setParentId(nodeId);//前台jS传递过来的点击的节点参数
			//tm.setIsLeaf(0);
			/*if(nodeIdForGYS.equals("0")){//如果点击节点的父父父...节点的下一节点为 根节点...
				fileNameOrManufactureType = tm.getEquipmentname();//存供应商类型就取Excel的文件名
				nodeIdForGYS = "0";
			}else{
				fileNameOrManufactureType = "0";
				
			}*/
			
			
			
			
			//1、文件名入库操作
			try {
				//arrayObj = equipreServiceDao.fileNameSaveDb(tm);//1.Excel入库
			} catch (Exception e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			}
			
			//2、sheet名入库操作
			//TbEquipmenttype newTm = new TbEquipmenttype();
			//newTm = (TbEquipmenttype)arrayObj[0];
			//String id = equipreServiceDao.findIdByName(prename,newTm);
			//String id = newTm.getId();

			try {
				sheetNameArr = this.getSheetName(fi);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			}
			
			
			
			
			
			EquipreServiceModel newTm2 = new EquipreServiceModel();
			WorkbookSettings ws2 = new WorkbookSettings();
			ws2.setEncoding("ISO-8859-1");
			try {
				workbook2 = Workbook.getWorkbook(fi.getInputStream(), ws2);
			} catch (BiffException e2) {
				e2.printStackTrace();
			} catch (IOException e2) {
				e2.printStackTrace();
			}
			Sheet[] sheetarr2 = workbook2.getSheets();
			String[] arrayId = new String[sheetarr2.length];//创建动态大小的字符串数组,存放Sheet的id
			int loopFlag = 0;
			for (String str : sheetNameArr) {
				/*tm = new TbEquipmenttype();
				tm.setEquipmentname(str);
				tm.setParentId(id);
				tm.setIsLeaf(0);*/
				try {
					//arrayObj2 = equipreServiceDao.sheetNameSaveDb(tm);//2.Sheet入库
					//newTm2 = (TbEquipmenttype)arrayObj2[0];//这里的id就是 数据的父节点的id
					//arrayId[loopFlag] = newTm2.getId();
					
					//loopFlag++;
				} catch (Exception e) {
					e.printStackTrace();
					throw new AppException(e.getMessage());
				}
			}
			
			
			
			
			
			
			
			//3、excel文件内容入库
			try {
				WorkbookSettings ws = new WorkbookSettings();
				ws.setEncoding("ISO-8859-1");
				workbook = Workbook.getWorkbook(fi.getInputStream(), ws);
				Sheet[] sheetarr = workbook.getSheets();
				for (int i = 0; i < sheetarr.length; i++) {
					String sheetname = sheetarr[i].getName();
					//String sheetid = equipreServiceDao.findIdByName(sheetname);
					String sheetid = arrayId[i];
					int rows = sheetarr[i].getRows();// 行数
					for (int m = 2; m < rows; m++)//遍历行
					{
						
						//遍历excel内容一行数据
						String cliqueCode = sheetarr[i].getCell(0,m).getContents().trim();//集团代码
						String materialcode = sheetarr[i].getCell(1,m).getContents().trim(); //物质代码
						String equipmentname = sheetarr[i].getCell(2,m).getContents().trim(); //物资名称
						String designtion = sheetarr[i].getCell(3,m).getContents().trim(); //牌号
						String standard = sheetarr[i].getCell(4,m).getContents().trim(); //规格型号
						String techniccondition = sheetarr[i].getCell(5,m).getContents().trim(); //技术条件
						String standardsize = sheetarr[i].getCell(6,m).getContents().trim(); //标准尺寸
						String dimension =  sheetarr[i].getCell(7,m).getContents().trim(); //计量单位
						String startorderquantity = sheetarr[i].getCell(8,m).getContents().trim();  //起订量
						String warningvalue = sheetarr[i].getCell(9,m).getContents().trim();  //预警值
						String beginningstocks = sheetarr[i].getCell(10,m).getContents().trim(); //初期库存
						String referenceprice = sheetarr[i].getCell(11,m).getContents().trim(); //计划单价
						String actualprice = sheetarr[i].getCell(12,m).getContents().trim();//实际单价
						String procurementcycledate = sheetarr[i].getCell(13,m).getContents().trim();//采购周期(月)
						String retention = sheetarr[i].getCell(14,m).getContents().trim();//保管周期(月)
						String retestproject = sheetarr[i].getCell(15,m).getContents().trim(); //复验项目
						String retesthelp = sheetarr[i].getCell(16,m).getContents().trim(); //复验说明
						String mainmanufacturename = sheetarr[i].getCell(17,m).getContents().trim(); //主选供应商名称
						String alternativemanufacturename = sheetarr[i].getCell(18,m).getContents().trim(); //备选供应商1名称
						String alternativemanufacture2name = sheetarr[i].getCell(19,m).getContents().trim(); //备选供应商2名称
						String remark = sheetarr[i].getCell(20,m).getContents().trim();//备注
						
						
						//去掉检验
						/*
						if(MyTool.checkTheStr(cliqueCode).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第A列},"+MyTool.checkTheStr(cliqueCode);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(materialcode).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第B列},"+MyTool.checkTheStr(materialcode);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(equipmentname).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第C列},"+MyTool.checkTheStr(equipmentname);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(designtion).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第D列},"+MyTool.checkTheStr(designtion);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(standard).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第E列},"+MyTool.checkTheStr(standard);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(techniccondition).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第F列},"+MyTool.checkTheStr(techniccondition);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(standardsize).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第G列},"+MyTool.checkTheStr(standardsize);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(dimension).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第H列},"+MyTool.checkTheStr(dimension);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(startorderquantity).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第I列},"+MyTool.checkTheStr(startorderquantity);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(warningvalue).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第J列},"+MyTool.checkTheStr(warningvalue);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(beginningstocks).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第K列},"+MyTool.checkTheStr(beginningstocks);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(referenceprice).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第L列},"+MyTool.checkTheStr(referenceprice);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(actualprice).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第M列},"+MyTool.checkTheStr(actualprice);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(procurementcycledate).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第N列},"+MyTool.checkTheStr(procurementcycledate);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(retention).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第O列},"+MyTool.checkTheStr(retention);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(retestproject).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第P列},"+MyTool.checkTheStr(retestproject);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(retesthelp).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第Q列},"+MyTool.checkTheStr(retesthelp);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(mainmanufacturename).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第R列},"+MyTool.checkTheStr(mainmanufacturename);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(alternativemanufacturename).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第S列},"+MyTool.checkTheStr(alternativemanufacturename);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(alternativemanufacture2name).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第T列},"+MyTool.checkTheStr(alternativemanufacture2name);
							throw new AppException(returnMsg);
						}
						if(MyTool.checkTheStr(remark).equals("") == false){//不为空及为有中文状态下的输入符号
							returnMsg += sheetarr[i].getName()+"页"+"{"+"第"+(m+1)+"行,第U列},"+MyTool.checkTheStr(remark);
							throw new AppException(returnMsg);
						}
						*/
					}
					
				}
				
				
			} catch (ArrayIndexOutOfBoundsException e){
				e.printStackTrace();
				throw new AppException("Sheet取列下标越界,请检查列数是否符合原模板");
			} catch (BiffException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
				throw new AppException(e.getMessage());
			} finally {
				if (null != workbook) {
					workbook.close();
				}
			}
			
		}
		
	}
	
	
	/***
	 * 根据树节点ID获取列表信息
	 */
	public int getAllListByNodeId(String nodeid,Pager pager) {
		return equipreServiceDao.getAllListByNodeId(nodeid,pager);
	}
	
	
	
	/**
	 * //更新后台表 主供应商、副供应商1、供应商2的id  不需要返回
	 */
	public void updateProvidersStatus(){
		equipreServiceDao.updateProvidersStatus();
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

	
	
	
	
	
	
	public void delThisModel(String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	public void deleteWlzlByNode(String id) throws AppException, Exception {
		// TODO Auto-generated method stub
		
	}

	public Object[] fileNameSaveDb(EquipreServiceVo model) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public int getCount(EquipreServiceVo vo) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int getSeachCount(String name) {
		// TODO Auto-generated method stub
		return 0;
	}

	public List<EquipreServiceVo> getThisModel(EquipreServiceVo vo, Pager pager) {
		return equipreServiceDao.getThisModel(vo, pager);
	}

	public List<EquipreServiceVo> searchThisModel(String materialCode,
			String name, String designation, String standard,
			String techniccondition, Pager pager, EquipreServiceVo vo) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object[] sheetNameSaveDb(EquipreServiceVo model) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public List<EquipreServiceVo> getGridData(EquipreServiceVo vo) {
		List<EquipreServiceVo> retList = new ArrayList<EquipreServiceVo>();
		List<EquipServiceImplPlan> list = new ArrayList<EquipServiceImplPlan>();
		try {
			list = equipreServiceDao.getGridData(vo);
			for(EquipServiceImplPlan es : list){
				EquipreServiceVo esvo = new EquipreServiceVo();
				BeanUtils.copyProperties(esvo, es);
				esvo.setProjectNum(es.getEquipRepairId().getProjectnum());
				esvo.setServiceEquipmentName(es.getEquipRepairId().getRepairequipname());
				esvo.setServiceEquipmentModel(es.getEquipRepairId().getRepairequipmodel());

				retList.add(esvo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retList;
	}

	@Transactional
	public String editEquipServiceImplPlan(EquipreServiceVo vo) {
		return equipreServiceDao.editEquipServiceImplPlan(vo);
	}

	@Transactional
	public String sendImplementPlan(EquipreServiceVo vo) {
		return equipreServiceDao.sendImplementPlan(vo);
	}
	
}
