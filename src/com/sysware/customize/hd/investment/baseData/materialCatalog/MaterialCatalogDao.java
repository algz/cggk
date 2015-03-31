/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONArray;

import com.luck.common.GenericDAO;
import com.luck.itumserv.entity.Grole;

public interface MaterialCatalogDao extends GenericDAO<MaterialCatalog> {

	/**
	 * 根据父id取物料种类集合
	 */
	public List<MaterialCatalog> getMaterialCatalogListByParentId(
			String parentId);

	/**
	 * 删除单个物料种类
	 */
	public void deleteMaterialCatalog(MaterialCatalog materialCatalog);

	/**
	 * 查询所有物料种类，并分页
	 */
	public List<MaterialCatalog> getAllMaterialCatalogs(MaterialCatalogVo mcv,
			Integer begin, Integer max);

	/**
	 * 得到物料种类总数,有限制条件
	 */
	public Integer getCount(MaterialCatalogVo mcv);

	/**
	 * 根据id得到父id
	 */
	public String getParentIdById(String id);

	/**
	 * 根据选定的id获得所有子节点的id
	 */
	public List<String> getAllMaterialCatalogIdsByParentId(String id);

	/**
	 * 获取角色列表
	 */
	public List<Grole> getAllRole(int start, int limit,
			HashMap<String, Integer> countMap);

	/**
	 * 获取物资种类对应的角色
	 */
	public List<String> getMaterialCatalogRoleByMaterialCatalogId(
			String MaterialCatalogId);

	/**
	 * 用户获取物资种类
	 */
	public String getMaterialCatalogRoleByUserId(Long userID);

	/**
	 * 获取所选用户对应的物资种类ID
	 */
	public List<String> getMaterialCatalogIdsByUserId(Long userID);

	/**
	 * 保存用户和物资种类的对应关系
	 */
	public void saveMaterialCatalogUser(String[] materialCatalogID,
			String[] userID);

	/**
	 * 保存指定用户-物资种类的对应关系
	 */
	public void saveMaterialCatalogUser(String[] materialCatalogIDs,
			String userID);

	/**
	 * 删除用户和物资种类的对应关系
	 */
	public void delMaterialCatalogUser(String[] materialCatalogIDs,
			String userID);

	/**
	 * 根据选定的id获得所有根节点的id
	 */
	public MaterialCatalog getRootMaterialCatalogId(String id);

	/**
	 * 根据选定的id，查询同一父id下的所有物料信息进货价总和
	 */
	public List<MaterialCatalog> sumMaterialCatalogById(String id);

	/**
	 * 根据样本example，查询MaterialCatalog信息
	 */
	public MaterialCatalog findMaterialCatalogByExample(MaterialCatalog example);
	
	public List<MaterialCatalog> getMaterialCatalogsByProcurement(String procurementId,String userId);
	
	public List<MaterialCatalog> getParentMaterialCatalogs(List<String> list);
	
	/**
	 * 查询物料种类 ComboBox
	 * @param vo
	 * @return
	 */
	JSONArray getMaterialCatalogComboBox(MaterialCatalogVo vo);
	
}

