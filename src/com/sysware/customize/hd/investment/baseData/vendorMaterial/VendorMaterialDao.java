package com.sysware.customize.hd.investment.baseData.vendorMaterial;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/**
 * 供应商-物料管理DAO
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
public interface VendorMaterialDao extends GenericDAO<VendorMaterial> {

	/**
	 * 根据供应商ID删除供应商-物料关系
	 * 
	 * @param vendorIds
	 *            供应商ID
	 */
	void deleteVendorMaterialByVendorIds(String[] vendorIds);

	/**
	 * 根据供应商和物料信息获得供应商-物料关系对象
	 * 
	 * @param vendor
	 *            供应商
	 * @param material
	 *            物料
	 * @return 供应商-物料关系对象
	 */
	VendorMaterial getVendorMaterialByVendorAndMaterial(Vendor vendor,
			Material material);
	
	/**
	 * 根据供应商和物料信息获得供应商-物料关系对象
	 * 
	 * @param vendorId
	 *            供应商id
	 * @param material
	 *            物料
	 * @return 供应商-物料关系对象
	 */
	Object getVendorMaterialByVendorIdAndMaterialId(String vendorId,
			String materialId);
	
	/**
	 * 根据供应商获得供应商-物料关系对象
	 * 
	 * @param vendor
	 *            供应商
	 * @return 供应商-物料关系对象
	 */
	List<VendorMaterial> getVendorMaterialsByVendor(Vendor vendor);

	/**
	 * 根据物料ID删除供应商-物料关系
	 * 
	 * @param materialIds
	 *            物料ID
	 */
	void deleteVendorMaterialByMaterialIds(String[] materialIds);
	
	/**
	 * 删除指定供应商信息
	 * @param vo
	 * @return
	 */
	int deleteVendorMaterials(VendorMaterialVo vo);
}