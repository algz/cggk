package com.sysware.customize.hd.investment.deviceProject.util;



import java.util.List;

import net.sf.json.JSONObject;

public interface UtilDAO {

	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	List<Object[]> getProjectData(UtilVo vo);
	
	/**
	 * 查询实施计划日期数据
	 * @param vo
	 * @return
	 */
	List<?> getProjectDateData(UtilVo vo);
	
	/**
	 * 查询供应商数据
	 * @param vo
	 * @return
	 */
	List<?> getSupplierData(UtilVo vo);
	
	
	List<?> getDepartmentList(UtilVo vo);
	
	List<?> getDepartmentsByUser(UtilVo vo);
	
	List<?> getRolesByUser(UtilVo vo);
	
	List<?> getRolesByUser2(UtilVo vo);
	
	JSONObject getLoginUser();
	
}