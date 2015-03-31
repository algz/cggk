/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.util.HashMap;
import java.util.List;

import jxl.Workbook;

import net.sf.json.JSONArray;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

import com.luck.itumserv.base.user.RoleUserVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

public interface MaterialCatalogService {
	// 根据父id取子物料种类集合
	public List<MaterialCatalogVo> getMaterialCatalogListByParentId(
			String parentId);

	// 查询当前物料种类和所有的子物料种类，并处理顺序
	public List<MaterialCatalog> getAllRegMaterialCatalogs(String startId);

	// 删除当前物料种类和所有的子物料种类
	public void deleteMaterialCatalogs(String startId);

	// 批量删除当前物料种类和所有的子物料种类
	public void deleteMaterialCatalogs(String[] startIds);

	// 新增物料种类
	public void addMaterialCatalog(MaterialCatalog materialCatalog)
			throws ReduplicatedException;

	// 修改物料种类
	public void saveOrUpdateMaterialCatalog(MaterialCatalog materialCatalog);

	// 得到物料种类总数
	public Integer getCount();

	public List<MaterialCatalog> getMaterialCatalogListById(String parentId);

	public List<Object[]> getTreeRootNode(String parentid, Long userID);

	// 查询物料种类
	public List<MaterialCatalog> getAllMaterialCatalogs(MaterialCatalogVo mcv,
			Integer begin, Integer max);

	// 得到物料种类总数,有限制条件
	public Integer getCount(MaterialCatalogVo mcv);

	// 根据id查询根节点id
	public String getRootIdById(String id);

	// 根据id查询根节点id
	public MaterialCatalog getRootMCById(String id);

	// 根据id得到父id
	public String getParentIdById(String id);

	// 根据种类id判断是否有物料的外键关联
	public boolean checkCatlogHsMetarials(String catlogId);

	// 判断物料种类树下是否有物料外键关联
	public boolean checkMetarialExistInCatlogTree(String startId);

	// 根据选定的id获得所有子节点的id
	public List<String> getAllMaterialCatalogIdsByParentId(String id);

	public List<RoleUserVo> getAllRole(MaterialCatalogVo vo, int start,
			int limit, HashMap<String, Integer> countMap);

	// 保存用户和物资种类的对应关系
	public void saveMaterialCatalogUser(String[] materialCatalogID,
			String[] roleID);

	// 保存指定用户-物资种类的对应关系
	public void saveMaterialCatalogUser(String[] materialCatalogIDs,
			String[] uncheckedCatalogIDs, String userID);

	// 通过用户获取物资种类
	public String getMaterialCatalog();

	public MaterialCatalog getMaterialCatalogById(String id);

	// 根据选定的id获得所有根节点的id
	public MaterialCatalog getRootMaterialCatalogId(String id);

	// 根据选定的id获得所有节点的 按照类别求和
	public List<MaterialCatalog> getSumMaterialCatalogValueGroupByParentid(
			String id);

	// 根据选定的id判断是否是父节点
	public boolean checkIsLeaf(String id);

	// 判断新增物料种类是否已存在
	public boolean checkMaterialCatalog(MaterialCatalogVo materialCatalogVo);

	public List<MaterialCatalogVo> importExcelFile(List<FileItem> items);

	public MaterialCatalog findMaterialCatalogByExample(MaterialCatalog example);

	public List<MaterialCatalog> batchAddMaterialCatalogVos(Workbook workbook,
			List<MaterialCatalog> reMaterialCatalogs,
			List<String> notExsitCatalog) throws ImportExcelFileException, FileUploadException;
	
	
	public List<MaterialCatalog> getMaterialCatalogsByProcurement(String procurementId,String userId);
	
	public List<MaterialCatalog> getParentMaterialCatalogs(List<String> list);
	
	/**
	 * 查询物料种类 ComboBox
	 * @param vo
	 * @return
	 */
	JSONArray getMaterialCatalogComboBox(MaterialCatalogVo vo);
	
}
