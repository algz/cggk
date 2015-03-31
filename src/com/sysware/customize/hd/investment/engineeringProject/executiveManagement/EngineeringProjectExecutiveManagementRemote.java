/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.exception.AppException;

/**
 * @author algz
 * 
 */
@Name("engineeringProject_EngineeringProjectExecutiveManagementRemote")
public class EngineeringProjectExecutiveManagementRemote {

	@In(create = true, value = "engineeringProject_EngineeringProjectExecutiveManagementServiceImp")
	private EngineeringProjectExecutiveManagementServiceImp service;

	
	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EngineeringProjectExecutiveManagementVo> getGridData(EngineeringProjectExecutiveManagementVo vo) {
		GridData<EngineeringProjectExecutiveManagementVo> resultGrid = new GridData<EngineeringProjectExecutiveManagementVo>();//封装了,转换成JSON传递给前台
		List<EngineeringProjectExecutiveManagementVo> list  = new ArrayList<EngineeringProjectExecutiveManagementVo>();
		
		
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
	 * 根据土建id查询执行计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EngineeringProjectExecutiveManagementVo> getCivilManageById(String id) {
		GridData<EngineeringProjectExecutiveManagementVo> resultGrid = new GridData<EngineeringProjectExecutiveManagementVo>();//封装了,转换成JSON传递给前台
		List<EngineeringProjectExecutiveManagementVo> list  = new ArrayList<EngineeringProjectExecutiveManagementVo>();
		HttpServletRequest request = ServletContexts.getInstance().getRequest();
		String pid = request.getParameter("pid");
		list = service.getCivilManageById(pid);
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
	public String saveImplementPlan(EngineeringProjectExecutiveManagementVo vo){
		String returnString = "";
		String msg = service.saveImplementPlan(vo);
		if(msg.equals("1")){
			returnString = "success";
		}else{
			returnString = "fail";
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
	public String sendImplementPlan(EngineeringProjectExecutiveManagementVo vo){
		String returnString = "";
		returnString = service.sendImplementPlan(vo);
		if(returnString.equals("1")){
			returnString = "success";
		}else{
			returnString = "fail";
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
	public String beforeEditAdd(EngineeringProjectExecutiveManagementVo vo){
		String returnString = "";
		returnString = service.beforeEditAdd(vo);
		return returnString;
		
		/*if(!returnString.equals("")){
			return "{success:true,msg:'"+returnString+"'}";
		}else{
			return "{success:false}";
		}*/
	}
	
	
	
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<FixedAssetAcceptanceApplyModelVo> getVendorByGroup(FixedAssetAcceptanceApplyModelVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		
		
		Pager pager = new Pager();
		GridData<FixedAssetAcceptanceApplyModelVo> resultGrid = new GridData<FixedAssetAcceptanceApplyModelVo>();
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
			
			
			List<FixedAssetAcceptanceApplyModelVo> plist = service.getVendorByGroup(vo,pager);
			resultGrid.setResults(plist);
			resultGrid.setTotalProperty(pager.getRecordCount());
			resultGrid.setSuccess(true);
			
		} catch (AppException e) {
			e.printStackTrace();
		}
		
		return resultGrid;
		
	}
	
	
	
	
	
	
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String selectOrAdd(FixedAssetAcceptanceApplyModelVo vo){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		
		String applyAcceptanceTime = request.getParameter("applyAcceptanceTime");
		String projectManagerName = request.getParameter("projectManagerName");
		String tel = request.getParameter("tel");
		String contractmanuFacturers = request.getParameter("contractmanuFacturers");
		String contractmanuFacturersTel = request.getParameter("contractmanuFacturersTel");
		String contactPerson = request.getParameter("contactPerson");
		String civilRegistId = request.getParameter("civilRegistId");
		String opinion = request.getParameter("opinion");
		String status = request.getParameter("status");
		
		FixedAssetAcceptanceApplyModelVo vo2 = new FixedAssetAcceptanceApplyModelVo();
		vo2.setApplyAcceptanceTime(applyAcceptanceTime);
		vo2.setProjectManagerName(projectManagerName);
		vo2.setTel(tel);
		vo2.setContractmanuFacturers(contractmanuFacturers);
		vo2.setContractmanuFacturersTel(contractmanuFacturersTel);
		vo2.setContactPerson(contactPerson);
		vo2.setCivilregistId(civilRegistId);
		vo2.setOpinion(opinion);
		vo2.setStatus(status);
		
		
		
		String returnString = "2";
		//returnStringFinal = "0";// 新增成功
		//returnStringFinal = "2";// 错误2 插入数据库异常,需要检查
	    //returnStringFinal = "1";// 错误1 有>=1条的数据了,不要再添加了
		try {
			returnString = service.selectOrAdd(vo2);// 执行保存
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnString;
		
		
	}
	
	
	
	
	
	
}
