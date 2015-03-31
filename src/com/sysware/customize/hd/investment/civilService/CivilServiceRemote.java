package com.sysware.customize.hd.investment.civilService;

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


@Name("civilService_CivilServiceRemote")
@SuppressWarnings({"unused","unchecked","deprecation"})
public class CivilServiceRemote {
	
	@In(create = true, value = "civilService_CivilService_ServiceImpl")
	private CivilService_Service civilServiceService;

	
	//获取物资种类列表
	@WebRemote
	public GridData<CivilServiceVo> getAll(CivilServiceVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		GridData<CivilServiceVo> resultGrid = new GridData<CivilServiceVo>();//封装了,转换成JSON传递给前台
		GridData<CivilServiceVo> resultGridForAll = new GridData<CivilServiceVo>();//封装了,转换成JSON传递给前台
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
			List<CivilServiceVo> list = civilServiceService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}else{//无条件显示
			vo.setTime("0");
			List<CivilServiceVo> list = civilServiceService.getThisModel(vo,pager);
			resultGrid.setResults(list);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);//如果执行到此即为成功
		}	
		
		return resultGrid;
		
	}
	
	//新增
	@WebRemote
	public String ajaxUpdate(String a){
		CivilServiceModel model = new CivilServiceModel();
		String returnString = "";
		String finalString = "";
		
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		String editId = request.getParameter("editId"); 
		String repairStartTime = request.getParameter("repairStartTime");
		String repairAcceptanceTime = request.getParameter("repairAcceptanceTime");
		String repairDutyUnit = request.getParameter("repairDutyUnit"); 
		String remark = request.getParameter("remark");
		String updateFlag = request.getParameter("updateFlag");
		
		
		model.setId(editId);
		model.setRepairStartTime(repairStartTime);
		model.setRepairAcceptanceTime(repairAcceptanceTime);
		model.setRepairDutyUnit(repairDutyUnit);
		model.setRemark(remark);
		model.setUpdateFlag(updateFlag);
		try {
			returnString = civilServiceService.updateThisModel(model);//返回成功与否的消息
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

			int childCount = civilServiceService.getSubChildCount(nodeid);

			if (null != id && !id.trim().equals("")) {
				String subid = id.substring(0, id.length() - 1);
				String[] idarr = subid.split(",");

				int arrlength = idarr.length;

				//无实际意义,按操作都是删除点击节点右边GridPanel显示出的节点
				//区别只是是否全部删除,后有传入参数的不同来控制
				//方法后面调用同一个存储过程,删除后刷新节点状态
				if (arrlength == childCount) {// 删除该node下所有节点信息
					//civilServiceService.deleteAllWlzlByNode(nodeid);
					returnStr = "{success : true}";
				} else if (arrlength != childCount){// 删除所选的几个节点信息
					for (int i = 0; i < idarr.length; i++) {
						String id1 = idarr[i];
						civilServiceService.delThisModel(id1);
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
	public String updateThisModel(CivilServiceVo vo){
		CivilServiceModel model = new CivilServiceModel();
		
		try {
			civilServiceService.updateThisModel(model);//执行保存
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
	public  GridData<CivilServiceVo> searchThisModel(CivilServiceVo vo)
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
		
		
		GridData<CivilServiceVo> resultGrid = new GridData<CivilServiceVo>();
		Pager pager = new Pager();
		pager.setPageSize(25);
		pager.setStart(vo.getStart());
		List<CivilServiceVo> wlzlList = civilServiceService.searchThisModel(materialCode, name,designation,standard,techniccondition,pager,vo);
		resultGrid.setResults(wlzlList);
		resultGrid.setTotalProperty(pager.getRecordCount());
		//导出Excel的单页查询 -------开始
		request.getSession().setAttribute("resultGridWlzlList", resultGrid.getResults());//存放导出Excel的本页查询结果List
		//导出Excel的单页查询 -------结束
		
		//导出Excel的全部查询 -------开始
		Pager pagerForAll = new Pager();
		pagerForAll.setPageSize(99999);
		pagerForAll.setStart(0);
		List<CivilServiceVo> wlzlList2 = civilServiceService.searchThisModel(materialCode, name,designation,standard,techniccondition,pagerForAll,vo);
		request.getSession().setAttribute("resultGridWlzlListForAll", wlzlList2);//存放导出Excel的全部页查询结果List
		//导出Excel的全部查询 -------结束
		
		
		return resultGrid;
	}
	

	
	
	
	/**
	 * 导出Excel标准模板
	 * @param response
	 * @param filename
	 * @param heads
	 * @param datalist
	 */
	public void createExcelStream(String filename, String[] heads, List<CivilServiceVo> datalist) {
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
				for(CivilServiceVo vo : datalist){
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
	
	
}
