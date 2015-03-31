package com.sysware.customize.hd.investment.equipreService;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONArray;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.general.tree.JsonTreeNode;



import java.util.Calendar; 


@Name("equipreService_EquipreServiceRemote")
public class EquipreServiceRemote {
	
	@In(create = true, value = "equipreService_EquipreService_ServiceImpl")
	private EquipreService_Service equipreServiceService;

	
	//获取物资种类列表
	@WebRemote
	public GridData<EquipreServiceVo> getAll(EquipreServiceVo vo)
	{
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		GridData<EquipreServiceVo> resultGrid = new GridData<EquipreServiceVo>();//封装了,转换成JSON传递给前台
		GridData<EquipreServiceVo> resultGridForAll = new GridData<EquipreServiceVo>();//封装了,转换成JSON传递给前台
		Pager pager = new Pager();
		Pager pagerForAll = new Pager();
		String opt = request.getParameter("opt");//操作
		String nodeid = request.getParameter("nodeid");//树节点
		String time = request.getParameter("time"); //输入的查询时间
		//String search = request.getParameter("search");
		String searchtype = request.getParameter("searchType");
		String exportExcelFalg = request.getParameter("exportExcelFalg");//是否是导出Excel标志位
		/*System.out.println("opt ------------  "+opt);
		System.out.println("google ------------  "+aaa);*/
		
		
		//远程排序需要
		String dir = request.getParameter("dir");
		String sort = request.getParameter("sort");
		vo.setDir(dir);
		vo.setSort(sort);
		
				
		pager.setPageSize(vo.getLimit() == 0 ? 25 : vo.getLimit());
		pager.setStart(vo.getStart() == 0 ? 0 : vo.getStart());
				
				
		if(!time.equals("0")){//有条件查询
			vo.setTime(time);
			List<EquipreServiceVo> list = equipreServiceService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}else{//无条件显示
			vo.setTime("0");
			List<EquipreServiceVo> list = equipreServiceService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}	
		
		return resultGrid;
		
	}
	
	//新增物料种类
	@WebRemote
	public String ajaxUpdate(String a){
		EquipreServiceModel model = new EquipreServiceModel();
		String returnString = "";
		String finalString = "";
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		String editId = request.getParameter("editId"); 
		String serviceStartTime = request.getParameter("serviceStartTime");
		String serviceInspectionTime = request.getParameter("serviceInspectionTime");
		String serviceDutyUnit = request.getParameter("serviceDutyUnit"); 
		String remarks = request.getParameter("remarks");
		String updateFlag = request.getParameter("updateFlag");
		
		
		model.setId(editId);
		model.setServiceStartTime(serviceStartTime);
		model.setServiceInspectionTime(serviceInspectionTime);
		model.setServiceDutyUnit(serviceDutyUnit);
		model.setRemarks(remarks);
		model.setUpdateFlag(updateFlag);
		try {
			returnString = equipreServiceService.updateThisModel(model);//返回成功与否的消息
		} catch (Exception e) {
			e.printStackTrace();
		}
		finalString = returnString;
		
		return finalString;
		
	}
	
	//删除物料种类
	@WebRemote
	public String delThisModel(String id,String nodeid)
	{	
		String returnStr = null;
		
		try {

			int childCount = equipreServiceService.getSubChildCount(nodeid);

			if (null != id && !id.trim().equals("")) {
				String subid = id.substring(0, id.length() - 1);
				String[] idarr = subid.split(",");

				int arrlength = idarr.length;

				//无实际意义,按操作都是删除点击节点右边GridPanel显示出的节点
				//区别只是是否全部删除,后有传入参数的不同来控制
				//方法后面调用同一个存储过程,删除后刷新节点状态
				if (arrlength == childCount) {// 删除该node下所有节点信息
					//equipreServiceService.deleteAllWlzlByNode(nodeid);
					returnStr = "{success : true}";
				} else if (arrlength != childCount){// 删除所选的几个节点信息
					for (int i = 0; i < idarr.length; i++) {
						String id1 = idarr[i];
						equipreServiceService.delThisModel(id1);
					}
					returnStr = "{success : true}";
				}

			} else {
				returnStr = "{failure : false}";
			}

		} catch (Exception e) {
			e.printStackTrace();
			returnStr = "{failure : false}";
		}
		
		return returnStr;
		
	}
	
	// 修改物料种类
	@WebRemote
	public String updateWlzl(EquipreServiceVo vo){
		//获取前台传递来的值
		/*String id = vo.getId();//id
		String cliqueCode = vo.getCliqueCode();//集团代码
		String materialCode = vo.getMaterialCode();//物资代码
		String name = vo.getEquipmentname();//物资名称
		String designtion = vo.getDesigntion();//牌号
		String standard = vo.getStandard();//规格型号
		String techniccondition = vo.getTechniccondition();//技术条件
		String standardSize = vo.getStandardSize();//标准尺寸
		String dimension = vo.getDimension();//计量单位
		String startOrderQuantity = vo.getStartOrderQuantity();//起订量
		String warningvaluestring = vo.getWarningvaluestring();//预警量
		String priceStr = vo.getPriceStr();//计划单价
		String actualPrice = vo.getActualPrice();//实际单价
		String procurementCycleDate = vo.getProcurementCycleDate();//采购周期(月)
		String reTention = vo.getReTention();//保管周期(月)
		String mainManufactureName = vo.getMainManufactureName();//主选供应商
		String alternativeManufactureName = vo.getAlternativeManufactureName();//备选供应商1
		String alternativeManufacture2Name = vo.getAlternativeManufacture2Name();//备选供应商2
		String remark = vo.getRemark();//备注
*/		
		
		
		
		EquipreServiceModel model = new EquipreServiceModel();/*
		model.setId(id);//id
		model.setCliqueCode(cliqueCode);//集团代码
		model.setMaterialCode(materialCode);//物资代码
		model.setEquipmentname(name);//物资名称
		model.setDesigntion(designtion);//牌号
		model.setStandard(standard);//规格型号
		model.setTechniccondition(techniccondition);//技术条件
		model.setStandardSize(standardSize);//标准尺寸
		model.setDimension(dimension);//计量单位
		try {
			model.setStartOrderQuantity(BigDecimal.valueOf(Double.parseDouble(startOrderQuantity)));// 起订量
		} catch (NumberFormatException e) {
			if (startOrderQuantity == null || startOrderQuantity == "") {
				model.setStartOrderQuantity(BigDecimal.valueOf(Double.parseDouble("0")));// 起订量
			}
		}
		try {
			model.setWarningvalue(BigDecimal.valueOf(Double.parseDouble(warningvaluestring)));// 预警量
		} catch (NumberFormatException e) {
			if (warningvaluestring == null || warningvaluestring == "") {
				model.setWarningvalue(BigDecimal.valueOf(Double.parseDouble("0")));//预警量
			}
		}
		try {
			model.setReferenceprice(BigDecimal.valueOf(Double.parseDouble(priceStr)));//计划单价
		} catch (NumberFormatException e) {
			if (priceStr == null || priceStr == "") {
				model.setReferenceprice(BigDecimal.valueOf(Double.parseDouble("0")));//计划单价
			}
		}
		try {
			model.setActualPrice(BigDecimal.valueOf(Double.parseDouble(actualPrice)));//实际单价
		} catch (NumberFormatException e) {
			if (actualPrice == null || actualPrice == "") {
				model.setActualPrice(BigDecimal.valueOf(Double.parseDouble("0")));//实际单价
			}
		}
		model.setProcurementCycleDate(procurementCycleDate);//采购周期(月)
		model.setReTention(reTention);//保管周期(月)
		model.setMainManufactureName(mainManufactureName);//主选供应商
		model.setAlternativeManufactureName(alternativeManufactureName);//备选供应商1
		model.setAlternativeManufacture2Name(alternativeManufacture2Name);//备选供应商2
		model.setRemark(remark);//备注
		
		
		*/
		
		
		
		
		
		try {
			equipreServiceService.updateThisModel(model);//执行保存
			return "{success:true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{failure : false}";
		}
		
		
	}
	
	
	
	
	/**
	 * 查询物料种类
	 * @param form
	 * @return GridData
	 */
	@WebRemote
	public  GridData<EquipreServiceVo> searchWlzl(EquipreServiceVo vo)
	{
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		//String name = vo.getEquipmentname();
		//String designation = vo.getDesigntion();
		//String standard = vo.getStandard();
		String materialCode = request.getParameter("materialcode"); //物资代码
		String name = request.getParameter("ename");
		String designation = request.getParameter("designation");
		String standard = request.getParameter("standard");
		String techniccondition = request.getParameter("techniccondition");
		
		
		GridData<EquipreServiceVo> resultGrid = new GridData<EquipreServiceVo>();
		Pager pager = new Pager();
		pager.setPageSize(25);
		pager.setStart(vo.getStart());
		List<EquipreServiceVo> wlzlList = equipreServiceService.searchThisModel(materialCode, name,designation,standard,techniccondition,pager,vo);
		resultGrid.setResults(wlzlList);
		resultGrid.setTotalProperty(pager.getRecordCount());
		//导出Excel的单页查询 -------开始
		request.getSession().setAttribute("resultGridWlzlList", resultGrid.getResults());//存放导出Excel的本页查询结果List
		//导出Excel的单页查询 -------结束
		
		//导出Excel的全部查询 -------开始
		Pager pagerForAll = new Pager();
		pagerForAll.setPageSize(99999);
		pagerForAll.setStart(0);
		List<EquipreServiceVo> wlzlList2 = equipreServiceService.searchThisModel(materialCode, name,designation,standard,techniccondition,pagerForAll,vo);
		request.getSession().setAttribute("resultGridWlzlListForAll", wlzlList2);//存放导出Excel的全部页查询结果List
		//导出Excel的全部查询 -------结束
		
		
		return resultGrid;
	}
	

	
	/***
	 * 获取树根节点
	 * @return
	 */
	@WebRemote
	public String getTreeRootNode(String parentid,long uID){
		List<Object[]> list = equipreServiceService.getTreeRootNode(parentid,"2",uID);
		List<JsonTreeNode> nodeList = new ArrayList<JsonTreeNode>();
		
		JsonTreeNode treeNode = null;
		
		for(Object[] obj:list){
			String issheet = String.valueOf(obj[3]);
			String isleaf = String.valueOf(obj[4]);
			String standard = String.valueOf(obj[5]==null?"":obj[5]);
			String standard1 = "";
			if (!standard.trim().equals("null")) {
				standard1 = standard;
			}
			
			String desingnation = String.valueOf(obj[2]);
			String desingnation1 = "";
			if (!desingnation.trim().equals("null")) {
				desingnation1 = desingnation;
			}
			
			
			String techniccondition = String.valueOf(obj[6]==null?"":obj[6]);
			String techniccondition1 ="";
			if (!techniccondition.trim().equals("null")) {
				techniccondition1 = techniccondition;
			}
			
			
			
			if(issheet.equals("1") && isleaf.equals("0")){//非叶子节点,是sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				treeNode.setExpandable(true);
				treeNode.setIconCls("folder");
				treeNode.setQtip(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				nodeList.add(treeNode);
			}
			if(issheet.equals("0") && isleaf.equals("0")){//非叶子节点,非sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				treeNode.setExpandable(true);
				treeNode.setIconCls("folder");
				treeNode.setQtip(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				nodeList.add(treeNode);
			}
			if(issheet.equals("0") && isleaf.equals("1")){//是叶子节点，非sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				treeNode.setExpandable(false);
				treeNode.setLeaf(true);
				treeNode.setIconCls("file");
				treeNode.setQtip(String.valueOf(obj[1])+"   "+desingnation1+"   "+standard1+"   "+techniccondition1);
				nodeList.add(treeNode);
				
			}
			
			
			
			
			
		}
		
		JSONArray jsonarr = JSONArray.fromObject(nodeList);
		return jsonarr.toString();
	}
	
	/***
	 * 根据树节点ID获取列表信息
	 * @param form
	 * @return
	 */
	@WebRemote
	public GridData<EquipreServiceVo> getListByNodeId(EquipreServiceVo vo, String id)
	{
		GridData<EquipreServiceVo> resultGrid = new GridData<EquipreServiceVo>();
		EquipreServiceModel model = new EquipreServiceModel();
		String nodeid = null;
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		nodeid = request.getParameter("nodeid");
		//System.out.println(nodeid);
		
		
		//设置翻页参数
		Pager pager = new Pager();
		pager.setPageSize(25);
		pager.setStart(vo.getStart());
		int totalCount = equipreServiceService.getAllListByNodeId(nodeid, pager);
		pager.setRecordCount(totalCount);
		
		
		
		List<EquipreServiceVo> list = equipreServiceService.getListByNodeId(model, nodeid, pager);
		resultGrid.setResults(list);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setSuccess(true);
		//resultGrid.setTotalProperty(equipreServiceService.getCountByNodeId(nodeid));
		
		return resultGrid;
		
	}
	
	
	/***
	 * 根据树节点ID获取列表信息 为了Excel导出查询全部 修改 strat和pagesize
	 * @param form
	 * @return
	 */
	@WebRemote
	public GridData<EquipreServiceVo> getListByNodeIdForAll(EquipreServiceVo vo, String id)
	{
		GridData<EquipreServiceVo> resultGrid = new GridData<EquipreServiceVo>();
		EquipreServiceModel model = new EquipreServiceModel();
		String nodeid = null;
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		nodeid = request.getParameter("nodeid");
		//System.out.println(nodeid);
		
		
		//设置翻页参数
		Pager pager = new Pager();
		pager.setStart(0);//设置为0
		pager.setPageSize(99999);//设置99999最大
		int totalCount = equipreServiceService.getAllListByNodeId(nodeid, pager);
		pager.setRecordCount(totalCount);
		
		
		
		List<EquipreServiceVo> list = equipreServiceService.getListByNodeId(model, nodeid, pager);
		resultGrid.setResults(list);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setSuccess(true);
		//resultGrid.setTotalProperty(equipreServiceService.getCountByNodeId(nodeid));
		return resultGrid;
		
	}
	
	
	
	
	
	
	
	
	/**
	 * 导出Excel标准模板
	 * @param response
	 * @param filename
	 * @param heads
	 * @param datalist
	 */
	public void createExcelStream(String filename, String[] heads, List<EquipreServiceVo> datalist) {
		int rownum = heads.length;//列数
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		HttpServletResponse response = null;//创建一个HttpServletResponse 对象
		
		try {
			OutputStream os = response.getOutputStream();
			WritableWorkbook wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(filename, 0);
			//拼装需要导出的Excel列头
			for (int i = 0; i < rownum; i++) {
				Label label = new Label(i, 0, heads[i]);
				wsheet.addCell(label);
			}
			//读取List的数据 如果是List<String[]>
			/*for (int i = 0; i < datalist.size(); i++) {
				for (int j = 0; j < datalist.get(i).length; j++) {
					Label label = new Label(j, i + 1, datalist.get(i)[j]);
					wsheet.addCell(label);
				}
			}*/
			//如果是List<vo>
			for (int i = 0; i < datalist.size(); i++) {
				//由于后台查询出来的都是vo对象,所以这里需要解开,一个个单独存放
				for(EquipreServiceVo vo : datalist){
					/*Label label0 = new Label(0, i + 1, vo.getCliqueCode());
					wsheet.addCell(label0);
					Label label1 = new Label(1, i + 1, vo.getCliqueCode());
					wsheet.addCell(label1);
					Label label2 = new Label(2, i + 1, vo.getCliqueCode());
					wsheet.addCell(label2);
					Label label3 = new Label(3, i + 1, vo.getCliqueCode());
					wsheet.addCell(label3);
					Label label4 = new Label(4, i + 1, vo.getCliqueCode());
					wsheet.addCell(label4);
					Label label5 = new Label(5, i + 1, vo.getCliqueCode());
					wsheet.addCell(label5);
					Label label6 = new Label(6, i + 1, vo.getCliqueCode());
					wsheet.addCell(label6);
					Label label7 = new Label(7, i + 1, vo.getCliqueCode());
					wsheet.addCell(label7);
					Label label8 = new Label(8, i + 1, vo.getCliqueCode());
					wsheet.addCell(label8);
					Label label9 = new Label(9, i + 1, vo.getCliqueCode());
					wsheet.addCell(label9);
					Label label10 = new Label(10, i + 1, vo.getCliqueCode());
					wsheet.addCell(label10);
					Label label11 = new Label(11, i + 1, vo.getCliqueCode());
					wsheet.addCell(label11);
					Label label12 = new Label(12, i + 1, vo.getCliqueCode());
					wsheet.addCell(label12);
					Label label13 = new Label(13, i + 1, vo.getCliqueCode());
					wsheet.addCell(label13);
					Label label14 = new Label(14, i + 1, vo.getCliqueCode());
					wsheet.addCell(label14);
					*/
				}
			}
			
			response.setHeader("Content-disposition", "attachment;"+"filename="+ new String(filename.getBytes("iso-8859-1"), "utf-8")+ ".xls");
			response.setContentType("application/vnd.ms-excel");
			wbook.write();
			wbook.close();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * 获取当前年月日
	 */
	public static String getNowYMD(){
		Calendar now = Calendar.getInstance();
		/*
        System.out.println("年: " + now.get(Calendar.YEAR));  
        System.out.println("月: " + (now.get(Calendar.MONTH) + 1) + "");  
        System.out.println("日: " + now.get(Calendar.DAY_OF_MONTH));  
        System.out.println("时: " + now.get(Calendar.HOUR_OF_DAY));  
        System.out.println("分: " + now.get(Calendar.MINUTE));  
        System.out.println("秒: " + now.get(Calendar.SECOND));  
        System.out.println("当前时间毫秒数：" + now.getTimeInMillis());
        System.out.println(now.getTime());
        */
		String year = now.get(Calendar.YEAR)+"";
        String month = now.get(Calendar.MONTH) + 1 + "" ;
        if(Integer.valueOf(month) < 10){
        	month = "0".concat(month);
        }
        String day = String.valueOf(now.get(Calendar.DAY_OF_MONTH));
        if(Integer.valueOf(day) < 10){
        	day = "0".concat(day);
        }
        return year+month+day;
	}
	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EquipreServiceVo> getGridData(EquipreServiceVo vo) {
		GridData<EquipreServiceVo> gd = new GridData<EquipreServiceVo>();
		List<EquipreServiceVo> vos = new ArrayList<EquipreServiceVo>();
		try {
			vos = equipreServiceService.getGridData(vo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	
	/**
	 * 编辑设备大修实施计划
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String editEquipServiceImplPlan(EquipreServiceVo vo){
		String msg = equipreServiceService.editEquipServiceImplPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String sendImplementPlan(EquipreServiceVo vo){
		String msg=equipreServiceService.sendImplementPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
}
