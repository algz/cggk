package com.sysware.customize.hd.investment.baseData.vendorMaterial;

/**
 * 供应商-物料管理Service
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:32
 */
public interface VendorMaterialService {

	/**
	 * 保存供应商-物料关系对象
	 * 
	 * @param vendorMaterial
	 *            供应商-物料关系对象
	 */
	void saveVendorMaterial(VendorMaterial vendorMaterial);

	/**
	 * 建立供应商-物料关系
	 * 
	 * @param vendorIds
	 *            供应商ID
	 * @param materialIDs
	 *            物料ID 
	 */
	void setVendorAndMaterial(String[] vendorIds, String[] materialIDs);

	/**
	 * 根据供应商ID删除供应商-物料关系
	 * 
	 * @param vendorIds
	 *            供应商ID
	 */
	void deleteVendorMaterialByVendorIds(String[] vendorIds);
	
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