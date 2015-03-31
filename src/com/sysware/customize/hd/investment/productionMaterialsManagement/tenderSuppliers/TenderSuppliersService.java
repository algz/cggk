package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

public interface TenderSuppliersService {

	/**
	 * 查询指定物料的非中标供应商
	 * @param vo
	 * @return
	 */
	List<Vendor> filterAllVendor(TenderSuppliersVo vo);
	
	/**
	 * 获得未选中的供应商
	 * @param vo
	 * @return
	 */
	List<TenderSuppliers> getTenderSuppliersGridData(TenderSuppliersVo vo);

	/**
	 * 保存投标的供应商信息
	 * @param vo
	 * @return
	 */
	String saveTenderSuppliers(TenderSuppliersVo vo);
	
	/**
	 * 删除投标的供应商
	 * @param vo
	 * @return
	 */
	String deleteTenderSuppliers(TenderSuppliersVo vo);
	
//	
//	/**
//	 * 保存比价、招投信息记录
//	 */
//	public Parity saveParity(Parity parity);
//
//	/**
//	 * 更新比价、招投信息记录
//	 */
//	public void updateParity(Parity parity);
//	
//	/**
//	 * 根据ID获得比价、招投信息对象
//	 */
//	public Parity getParityById(String parityId);
//
//	/**
//	 * 根据条件查询比价、招投信息记录
//	 * 
//	 * @param parityCondition
//	 *            条件
//	 * @return 采购大纲
//	 */
//	public List<Parity> getParityListByCondition(ParityCondition parityCondition);
//
//	/**
//	 * 根据条件查询比价、招投信息记录数
//	 * 
//	 * @param parityCondition
//	 *            条件
//	 * @return 比价、招投信息记录数
//	 */
//	public Long getCountByCondition(ParityCondition parityCondition);
//
//	/**
//	 * 获得到比价、招投信息的采购编号的数字编码部分
//	 * 
//	 * @param purchaseType
//	 *            采购方式
//	 * 
//	 * @param procurementType
//	 *            采购需求来源类型
//	 * 
//	 * @return 比价、招投信息的采购编号的数字编码部分
//	 */
//	public int getParityMaxCode(String purchaseType, String procurementType);
//
//	/**
//	 * 比价、招投标指定供应商
//	 * 
//	 * @param parityId
//	 *            比价、招投标清单ID
//	 * @param vendorId
//	 *            供应商ID
//	 * @param vendorName
//	 *            供应商名称
//	 *  @param price
//	 *           供应商报价
//	 * 
//	 */
//	public void assignVendorToParity(String parityId, String vendorId, String vendorName,String price);
//
//	/**
//	 * 更新采购计划审批状态
//	 * 
//	 * @param parityIDs
//	 *            采购比价ID
//	 * 
//	 * @param flag
//	 *            审批状态
//	 */
//	public void updateProperties(String[] parityIDs, String flag);
//
//	/**
//	 * 生成合同
//	 * 
//	 * @param parities
//	 *            待生成合同的清单
//	 */
//	public void generateContractFromParities(List<Parity> parities);

}
