package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.util.List;

import com.luck.common.GenericDAO;

public interface ParityVendorDao extends GenericDAO<ParityVendor>{
	/**
	 * 根据采购审批明细记录获取供应商关系列表
	 * 
	 * @param parityVendorCondition
	 * 
	 * @return List<ParityVendor>
	 * */
	public List<ParityVendor> getParityVendorListByParityDetail(ParityVendorCondition parityVendorCondition);
	/**
	 * 根据采购审批明细记录获取供应商关系列表总数
	 * 
	 * @param  condition ParityVendorCondition
	 * 
	 * @return long
	 * */
	public long countParityVendorByCondition(ParityVendorCondition condition);
	/**
	 * 根据采购审批明细记录ID删除供应商关系列表记录
	 * 
	 * @param  condition ParityVendorCondition
	 * 
	 * */
	public void deleteParityVendorByParityDetailId(String id);
}
