package com.sysware.customize.hd.investment.baseData.vendorMaterial;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/**
 * 供应商-物料管理Service实现
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:28
 */
@Name("vendorMaterial_VendorMaterialServiceImpl")
public class VendorMaterialServiceImpl implements VendorMaterialService {

	@In(create = true, value = "vendorMaterial_VendorMaterialDaoImpl")
	private VendorMaterialDao vendorMaterialDao;

	@In(create = true, value = "material_MaterialServiceImpl")
	private MaterialService materialService;

	public VendorMaterialServiceImpl() {

	}

	@Transactional
	public void saveVendorMaterial(VendorMaterial vendorMaterial) {
		vendorMaterialDao.add(vendorMaterial);
	}

	@Transactional
	public void setVendorAndMaterial(String[] vendorIds, String[] materialIDs) {
		Vendor vendor = null;
		Material material = null;
		VendorMaterial vendorMaterial = null;
		Object ob = null;
		for (String vendorID : vendorIds) {
			vendor = new Vendor();
			vendor.setVendorID(vendorID);
			for (String materialid : materialIDs) {
				materialid = materialid.replaceAll("'", "");
				ob = vendorMaterialDao
						.getVendorMaterialByVendorIdAndMaterialId(vendorID, materialid);
				if (ob == null || String.valueOf(ob).equals("0")) { 
					material = new Material();
					material.setMaterialid(materialid);
					vendorMaterial = new VendorMaterial();
					vendorMaterial.setMaterial(material);
					vendorMaterial.setVendor(vendor);
					this.saveVendorMaterial(vendorMaterial);
				}
			}
		}

	}

	@Transactional
	public void deleteVendorMaterialByVendorIds(String[] vendorIds) {
		vendorMaterialDao.deleteVendorMaterialByVendorIds(vendorIds);
	}

	@Transactional
	public void deleteVendorMaterialByMaterialIds(String[] materialIds) {
		vendorMaterialDao.deleteVendorMaterialByMaterialIds(materialIds);
	}
	
	/**
	 * 删除指定供应商信息
	 * @param vo
	 * @return
	 */
	@Transactional
	public int deleteVendorMaterials(VendorMaterialVo vo){
		return vendorMaterialDao.deleteVendorMaterials(vo);
	}

}