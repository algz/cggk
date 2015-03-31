package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

public interface TenderSuppliersDao extends GenericDAO<TenderSuppliers> {

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
//	 * 根据purchaseType，得到比价、招投信息的采购编号的编码部分
//	 * 
//	 * @param purchaseType
//	 *            String
//	 * 
//	 * @param procurementType
//	 *            String
//	 * 
//	 * @return 比价、招投信息的采购编号的编码部分
//	 */
//	public int getParityMaxCode(String purchaseType, String procurementType);
//	/**
//	 * @param paritydetailId
//	 *            比价详细Id
//	 * @param vendorId
//	 *            供应商Id
//	 * 
//	 */
//	public BigDecimal getAmout(String parityId, String vendorId);
}
