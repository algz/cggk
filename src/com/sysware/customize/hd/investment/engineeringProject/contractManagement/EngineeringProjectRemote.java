package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.general.tree.JsonTreeNode;



import java.util.Calendar; 


@Name("engineeringProject_EngineeringProjectRemote")
@SuppressWarnings({"unused","unchecked","deprecation"})
public class EngineeringProjectRemote {
	
	@In(create = true, value = "engineeringProject_EngineeringProjectServiceImpl")
	private EngineeringProjectService engineeringProjectService;

	
	//获取物资种类列表
	@WebRemote
	public GridData<EngineeringProjectVo> getAll(EngineeringProjectVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		GridData<EngineeringProjectVo> resultGrid = new GridData<EngineeringProjectVo>();//封装了,转换成JSON传递给前台
		GridData<EngineeringProjectVo> resultGridForAll = new GridData<EngineeringProjectVo>();//封装了,转换成JSON传递给前台
		Pager pager = new Pager();
		Pager pagerForAll = new Pager();
		String opt = request.getParameter("opt");//操作
		String nodeid = request.getParameter("nodeid");//树节点
		String time = request.getParameter("time"); //输入的查询时间
		//String search = request.getParameter("search");
		String searchtype = request.getParameter("searchType");
		String exportExcelFalg = request.getParameter("exportExcelFalg");//是否是导出Excel标志位
		
		
		//远程排序需要
		String dir = request.getParameter("dir");
		String sort = request.getParameter("sort");
		vo.setDir(dir);
		vo.setSort(sort);
		
				
		pager.setPageSize(vo.getLimit() == 0 ? 25 : vo.getLimit());
		pager.setStart(vo.getStart() == 0 ? 0 : vo.getStart());
				
				
		if(!time.equals("0")){//有条件查询
			vo.setTime(time);//传入查询时间
			List<EngineeringProjectVo> list = engineeringProjectService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}else{//无条件显示
			vo.setTime("0");
			List<EngineeringProjectVo> list = engineeringProjectService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}	
		
		return resultGrid;
		
	}
	
	//新增物料种类
	@WebRemote
	public String ajaxUpdate(String a){
		EngineeringProjectModel model = new EngineeringProjectModel();
		String returnString = "";
		String finalString = "";
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		String editId = request.getParameter("editId"); 
		String serviceStartTime = request.getParameter("serviceStartTime");
		String serviceInspectionTime = request.getParameter("serviceInspectionTime");
		String serviceDutyUnit = request.getParameter("serviceDutyUnit"); 
		
		/*model.setId(editId);
		model.setServiceStartTime(serviceStartTime);
		model.setServiceInspectionTime(serviceInspectionTime);
		model.setServiceDutyUnit(serviceDutyUnit);*/
		try {
			//returnString = engineeringProjectService.updateThisModel(model);//返回成功与否的消息
		} catch (Exception e) {
			e.printStackTrace();
		}
		finalString = returnString;
		
		return finalString;
		
	}
	
	//删除物料种类
	@WebRemote
	public String delThisModel(String id){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		String engineeringContractId = request.getParameter("engineeringContractId");
		String returnStr = "";

		int resultId = 0;
		try {
			resultId = engineeringProjectService.delThisModel(engineeringContractId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(resultId == 1){
			returnStr = 1+"";
			return returnStr;
		}else{
			returnStr = 0+"";
			return returnStr;
		}
		
		
	}
	
	// 修改物料种类
	@WebRemote
	public String addOrUpdateEngineeringProject(EngineeringProjectFormVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		
		
		String projectCode = request.getParameter("projectCode");//项目编号
		String contractCode = request.getParameter("contractCode");//合同编号
		String partTwo = request.getParameter("partTwo");//乙方
		String fundUnit = request.getParameter("fundUnit");//金额单位
		String projectName = request.getParameter("projectName");//项目名称
		String contractName = request.getParameter("contractName");//合同名称
		String fund = request.getParameter("fund");//金额
		String contractLevel = request.getParameter("contractLevel");//合同密级
		String unitName = request.getParameter("unitName");//单位名称
		String contractManagerPerson = request.getParameter("contractManagerPerson");//合同管理员
		String workPerson = request.getParameter("workPerson");//经办人
		String superiorPerson = request.getParameter("superiorPerson");//行政分管领导
		String uploadFileId = request.getParameter("uploadFileId");//上传附件ID
		String uploadFile = request.getParameter("uploadFile");//上传附件名字
		String status = request.getParameter("status");//状态
		String projectId = request.getParameter("projectId");//项目编号的ID
		String action  = request.getParameter("action");//行为动作标记位
		String engineeringContractId = request.getParameter("engineeringContractId");//获取主键ID
		
		
		EngineeringProjectFormVo vo2 = new EngineeringProjectFormVo();
		vo2.setProjectCode(projectCode);
		vo2.setContractCode(contractCode);
		vo2.setPartTwo(partTwo);
		vo2.setFundUnit(fundUnit);
		vo2.setProjectName(projectName);
		vo2.setContractName(contractName);
		vo2.setFund(fund);
		vo2.setContractLevel(contractLevel);
		vo2.setUnitName(unitName);
		vo2.setContractManagerPerson(contractManagerPerson);
		vo2.setWorkPerson(workPerson);
		vo2.setSuperiorPerson(superiorPerson);
		vo2.setUploadFileId(uploadFileId);
		vo2.setUploadFile(uploadFile);
		vo2.setStatus(status);
		vo2.setProjectId(projectId);
		vo2.setAction(action);
		vo2.setId(engineeringContractId);
		try {
			String a = engineeringProjectService.addOrUpdateEngineeringProject(vo2);//执行保存
			//return "{success:true}";
			return "1";   //ok
		} catch (Exception e) {
			e.printStackTrace();
			//return "{failure : false}";
			return "0";  //fail
		}
		
		
	}
	
	
	
	
	/**
	 * 查询物料种类
	 * @param form
	 * @return GridData
	 */
	@WebRemote
	public  GridData<EngineeringProjectVo> searchWlzl(EngineeringProjectVo vo)
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
		
		
		GridData<EngineeringProjectVo> resultGrid = new GridData<EngineeringProjectVo>();
		Pager pager = new Pager();
		pager.setPageSize(25);
		pager.setStart(vo.getStart());
		List<EngineeringProjectVo> wlzlList = engineeringProjectService.searchThisModel(materialCode, name,designation,standard,techniccondition,pager,vo);
		resultGrid.setResults(wlzlList);
		resultGrid.setTotalProperty(pager.getRecordCount());
		//导出Excel的单页查询 -------开始
		request.getSession().setAttribute("resultGridWlzlList", resultGrid.getResults());//存放导出Excel的本页查询结果List
		//导出Excel的单页查询 -------结束
		
		//导出Excel的全部查询 -------开始
		Pager pagerForAll = new Pager();
		pagerForAll.setPageSize(99999);
		pagerForAll.setStart(0);
		List<EngineeringProjectVo> wlzlList2 = engineeringProjectService.searchThisModel(materialCode, name,designation,standard,techniccondition,pagerForAll,vo);
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
		List<Object[]> list = engineeringProjectService.getTreeRootNode(parentid,"2",uID);
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
	public GridData<EngineeringProjectVo> getListByNodeId(EngineeringProjectVo vo, String id)
	{
		GridData<EngineeringProjectVo> resultGrid = new GridData<EngineeringProjectVo>();
		EngineeringProjectModel model = new EngineeringProjectModel();
		String nodeid = null;
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		nodeid = request.getParameter("nodeid");
		//System.out.println(nodeid);
		
		
		//设置翻页参数
		Pager pager = new Pager();
		pager.setPageSize(25);
		pager.setStart(vo.getStart());
		//int totalCount = engineeringProjectService.getAllListByNodeId(nodeid, pager);
		//pager.setRecordCount(totalCount);
		
		
		
		List<EngineeringProjectVo> list = engineeringProjectService.getListByNodeId(model, nodeid, pager);
		resultGrid.setResults(list);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setSuccess(true);
		//resultGrid.setTotalProperty(engineeringProjectService.getCountByNodeId(nodeid));
		
		return resultGrid;
		
	}
	
	
	/***
	 * 根据树节点ID获取列表信息 为了Excel导出查询全部 修改 strat和pagesize
	 * @param form
	 * @return
	 */
	@WebRemote
	public GridData<EngineeringProjectVo> getListByNodeIdForAll(EngineeringProjectVo vo, String id)
	{
		GridData<EngineeringProjectVo> resultGrid = new GridData<EngineeringProjectVo>();
		EngineeringProjectModel model = new EngineeringProjectModel();
		String nodeid = null;
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		nodeid = request.getParameter("nodeid");
		//System.out.println(nodeid);
		
		
		//设置翻页参数
		Pager pager = new Pager();
		pager.setStart(0);//设置为0
		pager.setPageSize(99999);//设置99999最大
		//int totalCount = engineeringProjectService.getAllListByNodeId(nodeid, pager);
		//pager.setRecordCount(totalCount);
		
		
		
		List<EngineeringProjectVo> list = engineeringProjectService.getListByNodeId(model, nodeid, pager);
		resultGrid.setResults(list);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setSuccess(true);
		//resultGrid.setTotalProperty(engineeringProjectService.getCountByNodeId(nodeid));
		return resultGrid;
		
	}
	
	
	
	
	
	
	
	
	/**
	 * 导出Excel标准模板
	 * @param response
	 * @param filename
	 * @param heads
	 * @param datalist
	 */
	public void createExcelStream(String filename, String[] heads, List<EngineeringProjectVo> datalist) {
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
				for(EngineeringProjectVo vo : datalist){
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
	 * 获取 项目编码
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EngineeringProjectVo> getProjectByGroup(EngineeringProjectVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		
		
		Pager pager = new Pager();
		GridData<EngineeringProjectVo> resultGrid = new GridData<EngineeringProjectVo>();
		pager.setPageSize(vo.getLimit() == 0 ? 25 : vo.getLimit());
		pager.setStart(vo.getStart() == 0 ? 0 : vo.getStart());
		
		
		try {
			//对 供应类型 字符串进行处理
			try {
				if(vo.getFuzzyQueryString() != "" && vo.getFuzzyQueryString() != "null" && vo.getFuzzyQueryString() != null){
					String tmp = URLDecoder.decode(vo.getFuzzyQueryString(),"utf-8");//解码
					vo.setFuzzyQueryString(tmp);
				}
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} 
			
			
			List<EngineeringProjectVo> plist = engineeringProjectService.getProjectByGroup(vo,pager);
			resultGrid.setResults(plist);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);
			
		} catch (AppException e) {
			e.printStackTrace();
		}
		
		return resultGrid;
		
	}
	
	
}
