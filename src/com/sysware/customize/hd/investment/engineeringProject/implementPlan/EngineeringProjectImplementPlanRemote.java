/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.implementPlan;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;

/**
 * @author algz
 * 
 */
@Name("engineeringProject_EngineeringProjectImplementPlanRemote")
public class EngineeringProjectImplementPlanRemote {

	@In(create = true, value = "engineeringProject_EngineeringProjectImplementPlanServiceImp")
	private EngineeringProjectImplementPlanService service;

	
	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EngineeringProjectPlanVo> getGridData(EngineeringProjectPlanVo vo) {
		GridData<EngineeringProjectPlanVo> resultGrid = new GridData<EngineeringProjectPlanVo>();//封装了,转换成JSON传递给前台
		List<EngineeringProjectPlanVo> list  = new ArrayList<EngineeringProjectPlanVo>();
		
		
		Pager pager = new Pager();
		pager.setPageSize(vo.getLimit() == 0 ? 25 : vo.getLimit());
		pager.setStart(vo.getStart() == 0 ? 0 : vo.getStart());
		
		
		list = service.getGridData(vo,pager);
		resultGrid.setResults(list);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setSuccess(true);//如果执行到此即为成功
		return resultGrid;
	}
	
	/**
	 * 根据土建id查询实施计划GRID所有数据
	 * @param id
	 * @return
	 */
	public GridData<EngineeringProjectPlanVo> getImplementPlanById(String id){
		
		GridData<EngineeringProjectPlanVo> resultGrid = new GridData<EngineeringProjectPlanVo>();//封装了,转换成JSON传递给前台
		List<EngineeringProjectPlanVo> list  = new ArrayList<EngineeringProjectPlanVo>();
		HttpServletRequest request = ServletContexts.getInstance().getRequest();
		String pid = request.getParameter("pid");
		list = service.getImplementPlanById(pid);
		resultGrid.setResults(list);
		resultGrid.setSuccess(true);//如果执行到此即为成功
		return resultGrid;
	}
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveImplementPlan(EngineeringProjectPlanVo vo){
		String returnString = "";
		String msg = service.saveImplementPlan(vo);
		if(msg.equals("1")){
			returnString = "true";
		}else{
			returnString = "false";
		}
		return returnString; 
		//return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
		
	}
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String sendImplementPlan(EngineeringProjectPlanVo vo){
		String returnString = "";
		returnString = service.sendImplementPlan(vo);
		if(returnString.equals("1")){
			returnString = "true";
		}else{
			returnString = "false";
		}
		
		return returnString;
		
		/*String msg=service.sendImplementPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";*/
	}
	
	
	
	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String beforeEditAdd(EngineeringProjectPlanVo vo){
		String returnString = "";
		returnString = service.beforeEditAdd(vo);
		if(returnString.equals("1")){
			returnString = "true";
		}else{
			returnString = "false";
		}
		return returnString;
		/*if(!returnString.equals("")){
			return "{success:true,msg:'"+returnString+"'}";
		}else{
			return "{success:false}";
		}*/
	}
	
	
	
}
