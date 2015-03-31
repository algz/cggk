package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.util.List;

public interface ParityVendorService {
	/**
	 * 根据采购审批明细记录获取供应商关系列表
	 * 
	 * @param parityVendorCondition
	 * 
	 * @return List<ParityVendor>
	 * */
	public List<ParityVendor> getParityVendorListByParityDetail(ParityVendorCondition parityVendorCondition);
	/**
	 * 保存采购审批明细记录
	 * 
	 * @param parityVendorCondition
	 * 
	 * @return List<ParityVendor>
	 * */
	public void saveParityVendor(ParityVendor parityVendor);
	/**
	 * 根据采购审批明细记录ID删除供应商关系列表记录
	 * 
	 * @param  id String
	 * 
	 * */
	public void deleteParityVendorByParityDetailId(String id);
	/**
	 * 根据采购审批明细记录获取供应商关系列表总数
	 * 
	 * @param  condition ParityVendorCondition
	 * 
	 * @return long
	 * */
	long countParityVendorByCondition(ParityVendorCondition parityVendorCondition);
}
