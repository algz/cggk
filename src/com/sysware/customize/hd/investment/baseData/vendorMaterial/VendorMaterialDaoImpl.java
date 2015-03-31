package com.sysware.customize.hd.investment.baseData.vendorMaterial;

import java.util.Arrays;
import java.util.List;

import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/**
 * 供应商-物料管理DAO实现
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:38
 */
@Name("vendorMaterial_VendorMaterialDaoImpl")
public class VendorMaterialDaoImpl extends GenericDAOImpl<VendorMaterial>
		implements VendorMaterialDao {
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<VendorMaterial> dao;
	
	public VendorMaterialDaoImpl() {

	}

	public void deleteVendorMaterialByVendorIds(String[] vendorIds) {
		StringBuilder sql = new StringBuilder("delete from t_vendor_material ");
		sql.append(" where vendorid in ( ");
		sql.append(Arrays.toString(vendorIds).replace("[", "'")
				.replace(", ", "','").replace("]", "'"));
		sql.append(" )");
		this.executeNativeSQL(sql.toString());

	}

	public VendorMaterial getVendorMaterialByVendorAndMaterial(Vendor vendor,
			Material material) {
		List<VendorMaterial> temp = this.find(
				" obj.vendor = ?1 and obj.material = ?2", new Object[] {
						vendor, material });
		return temp.size() > 0 ? temp.get(0) : null;
	}

	public void deleteVendorMaterialByMaterialIds(String[] materialIds) {
		StringBuilder sql = new StringBuilder(" delete from t_vendor_material ");
		sql.append(" where materialid in ( ");
		sql.append(Arrays.toString(materialIds).replace("[", "'")
				.replace(", ", "','").replace("]", "'"));
		sql.append(" ) ");
		this.executeNativeSQL(sql.toString());
	}

	public List<VendorMaterial> getVendorMaterialsByVendor(Vendor vendor) {
		return this.find(" obj.vendor = ?1 ", new Object[] { vendor });
	}
	
	/**
	 * 删除指定供应商信息
	 * @param vo
	 * @return
	 */
	public int deleteVendorMaterials(VendorMaterialVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("delete from t_vendor_material vm where vm.vendorid in(").append(vo.getVendors());
		sql.append(") and vm.materialid in(").append(vo.getMaterials()).append(")"); 
		return this.createSqlQuery(sql.toString()).executeUpdate();
	}

	public Object getVendorMaterialByVendorIdAndMaterialId(String vendorId,
			String materialId) {
		StringBuilder sql = new StringBuilder(" select count(0) from t_vendor_material ");
		sql.append(" where materialid = '"+materialId+"' and vendorid = '"+vendorId+"' "); 
		return this.createSqlQuery(sql.toString()).getSingleResult();
	}

}