package com.sysware.customize.hd.investment.stockInspect.planTypeInspect;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("PlanTypeInspectServiceImpl")
public class PlanTypeInspectServiceImpl {

	@In(create=true,value="PlanTypeInspectDaoImpl")
	private PlanTypeInspectDaoImpl dao;
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	public List<PlanTypeInspectVo> GetAllAmoteAndQuantity(PlanTypeInspectVo vo){
		return dao.GetAllAmoteAndQuantity(vo);
	}
	
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	public List<PlanTypeInspectVo> GetAmoteAndQuantity(PlanTypeInspectVo vo){
		return dao.GetAmoteAndQuantity(vo);
	}
}
