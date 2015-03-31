package com.sysware.customize.hd.investment.engineeringProject.util;



import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;

import net.sf.json.JSONObject;

public interface UtilDao {

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
	List<?> getProjectDateData(UtilVo vo,Pager pager);
	
	/**
	 * 查询供应商数据
	 * @param vo
	 * @return
	 */
	List<?> getSupplierData(UtilVo vo);
	
	
	
	
}