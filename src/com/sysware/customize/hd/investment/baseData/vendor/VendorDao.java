package com.sysware.customize.hd.investment.baseData.vendor;

import java.util.List;

import com.luck.common.GenericDAO;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;

/**
 * 供应商管理DAO
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
public interface VendorDao extends GenericDAO<Vendor> {
	/**
	 * 根据条件对象查找供应商信息
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的供应商信息
	 */
	//List<Vendor> findByCondition(VendorCondition condition,String type);
	List<Vendor> findVendorsByCondition(VendorCondition condition,String type);

	/**
	 * 计算满足条件的供应商信息记录数
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的供应商信息记录总数
	 */
	//long countByCondition(VendorCondition condition);
	long countVendorsByCondition(VendorCondition condition);

	/**
	 * 根据物料IDs查找供应商信息
	 * 
	 * @param materialIds
	 *            物料IDs
	 * @param begin
	 *            每页起始记录行号
	 * @param max
	 *            每页显示记录总数
	 * @return 符合条件的供应商信息
	 */
	List<Vendor> findByMaterialIds(String materialIds, int begin, int max,String type);

	/**
	 * 计算对应物料IDs的供应商信息记录数
	 * 
	 * @param materialIds
	 *            物料IDs
	 * @return 符合条件的供应商信息
	 */
	long countByMaterialIds(String materialIds ,String type);
	
	/**
	 * 判断在数据库中是否存在当前供应商信息
	 * @param vendorName
	 * @return
	 */
	public List<Vendor> GetAVendor(String vendorName);
	
	/**
	 * 根据行业组织后四位的流水号
	 * @param vo
	 * @return
	 */
	public int GetAVenderCode(Vendor vo);
	
	/**
	 * 根据供应商的名称修改匹配中行工业名称来修改编号
	 * @param vo
	 * @return
	 */
	public int UpdateAVendor(Vendor vo);
	
	/**
	 * 向供应商信息表中插入一条数据
	 * @param vo
	 * @return
	 */
	public int InsetAVendor(Vendor vo);
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取所有物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getAll(MaterialVo materialVo, Pager pager);
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取带条件查询的物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getSelect(MaterialVo materialVo, Pager pager);
}