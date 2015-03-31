package com.sysware.customize.hd.investment.baseData.vendor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.annotations.remoting.WebRemote;

import jxl.Workbook;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

/**
 * 供应商管理Service
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:32
 */
public interface VendorService {

	/**
	 * 新增供应商信息
	 * 
	 * @param vendor
	 *            供应商对象
	 * @param materialIDs
	 *            所选物料ID集合
	 * @param catalogIDs
	 *            所选物料种类ID集合
	 */
	void addVendor(Vendor vendor, String[] materialIDs, String[] catalogIDs)
			throws ReduplicatedException;

	/**
	 * 保存供应商信息
	 * 
	 * @param vendor
	 *            供应商对象
	 * @return
	 */
	Vendor saveVendor(Vendor vendor) throws ReduplicatedException;

	/**
	 * 根据条件对象查找供应商信息
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的供应商信息
	 */
	List<Vendor> findVendorsByCondition(VendorCondition condition,String type);

	/**
	 * 计算满足条件的供应商信息记录数
	 * 
	 * @param condition
	 *            条件对象
	 * @return 符合条件的供应商信息记录总数
	 */
	long countVendorsByCondition(VendorCondition condition);

	/**
	 * 根据物料ID查找供应商信息
	 * 
	 * @param materialId
	 *            物料ID
	 * @param begin
	 *            每页起始记录行号
	 * @param max
	 *            每页显示记录总数
	 * @return 符合条件的供应商信息
	 */
	List<Vendor> findVendorsByMaterial(String materialId, int begin, int max);

	/**
	 * 计算对应物料ID的供应商信息记录数
	 * 
	 * @param materialId
	 *            物料ID
	 * @return 符合条件的供应商信息
	 */
	long countVendorsByMaterial(String materialId);

	/**
	 * 根据物料种类ID查找供应商信息
	 * 
	 * @param materialCatalogId
	 *            物料种类ID
	 * @param begin
	 *            每页起始记录行号
	 * @param max
	 *            每页显示记录总数
	 * @return 符合条件的供应商信息
	 */
	List<Vendor> findVendorsByMaterialCatalog(String materialCatalogId,
			int begin, int max);

	/**
	 * 计算对应物料种类ID的供应商信息记录数
	 * 
	 * @param materialCatalogId
	 *            物料种类ID
	 * @return 符合条件的供应商信息
	 */
	long countVendorsByMaterialCatalog(String materialCatalogId);

	/**
	 * 根据供应商IDs批量删除供应商
	 * 
	 * @param vendorIds
	 *            供应商IDs
	 * @return
	 */
	boolean batchDeleteVendors(String[] vendorIds);

	/**
	 * 根据供应商ID得到供应商
	 * 
	 * @param ID
	 *            供应商对象数据
	 * @return
	 */
	Vendor getVendorById(String id);

	/**
	 * 批量添加供应商，例如通过Excel批量导入
	 * 
	 * @param workbook
	 *            待添加的供应商Excel表格
	 * @return 系统已经存在的供应商集合
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	
	List<Vendor> batchAddVendor(Workbook workbook,String userId) throws FileUploadException;
	/**
	 * 根据行业组织后四位的流水号
	 * @param vo
	 * @return
	 */
	int GetAVenderCode(Vendor vo);
	/**
	 * 更新供应商(仅限于供应商选评模块的批量更新供应商类别,可扩展)
	 * @param vo
	 * @return
	 */
	public String updateVendor(VendorVo vo);
	
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取所有物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getAll(MaterialVo materialVo, Pager pager);
	public List<VendorVo> getVenderAssessGridData(VendorVo vo);
	public List<VendorVo> getVenderAssessDetailData(VendorVo vo);
	public void saveVendorAssess(VendorVo vo)throws Exception;
	public void saveVendorAssessDetail(VendorVo vo)throws Exception;
	public void delVenderAssessDetail(VendorVo vo)throws Exception;
}