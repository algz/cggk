package com.sysware.customize.hd.investment.baseData.material;

import java.util.List;

import com.luck.common.GenericDAO;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;

/**
 * 物料信息DAO
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:08
 */
public interface MaterialDao extends GenericDAO<Material> {

	/**
	 * 根据物料名称查询物料信息
	 * @param materialVo
	 * @return
	 */
	List<MaterialVo> getMaterialsByCondition(MaterialVo materialVo);
	/**
	 * 根据code查询物料信息对象
	 * 
	 * @param icode
	 *            物料信息编码
	 * @return 指定ID对应的物料信息对象
	 */
	public Material findByCode(String code);
	
	/**
	 * 根据条件得到物料信息总数
	 * 
	 * @author tengWeiJia
	 * @param materialCondition
	 *            MaterialCondition
	 * @return Integer 2011-5-17
	 */
	long countByCondition(MaterialCondition materialCondition);

	/**
	 * 根据条件列示所有直接下一级物料信息
	 * 
	 * @param materialCondition
	 *            MaterialCondition对象
	 * @return 所有物料信息（实体类）
	 */
	public List<Material> findMaterialsByMaterialCatalog(
			MaterialCondition materialCondition);

	/**
	 * 根据物料种类ID列示所有子集物料信息
	 * 
	 * @param materialCatalogId
	 *            物料种类ID
	 * @return 所有物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalog(
			String materialCatalogId);

	/**
	 * 根据物料种类id列示所有子集物料信息-分页
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalog(
			String materialCatalogId, int start, int end);
	
	/**
	 * 根据物料种类id列示所有已有需求的物料信息-分页
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	public List<Material> findProcurementMaterialsByMaterialCatalog(
			String materialCatalogId, int start, int end);

	/**
	 * 获取对应物料种类下已有需求的的物料总数
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @return 对应物料种类下的物料总数
	 */
	long countProcurementMaterialsByMaterialCatalog(String materialCatalogId);

	/**
	 * 列示所有物料信息
	 * 
	 * @param materialCondition
	 *            MaterialCondition对象
	 * @param start
	 *            起始行
	 * @param limit
	 *            每页行数
	 * @return 所有物料信息
	 */
	public List<Material> findAllMaterials(MaterialCondition materialCondition,
			int start, int limit);

	/**
	 * 根据物料信息id和种类id获取物料信息List
	 * 
	 * @param materialIDs
	 *            String[]
	 * @param params
	 *            String[]
	 * @return materials
	 */
	public List<Material> getMaterialsByMaterialAndCatalog(
			String[] materialIDs, String[] catalogIDs);

	/**
	 * 根据文件名称获取导入文件的ID
	 * 
	 * @param ename
	 * @return Material
	 */
	public MaterialCatalog findIdByName(String ename);

	/**
	 * 根据采购合同ID查询物料信息
	 * 
	 * @param contractId
	 *            采购合同ID
	 * @return 符合条件的物料信息
	 */
	public List<Material> getMaterialsByContract(String contractId);

	/**
	 * 根据Material样例获取Material对象
	 * 
	 * @param example
	 *            Material样例对象
	 * @return Material
	 */
	public Material findMaterialByExample(Material example);
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringClassList();
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringKindList(String materialKind);
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringDemensionList();
	
	
	/***
	 * 传入vo,获取库存系统的物质编码
	 * @param form
	 * @return
	 */
	public String getSelectStringDemensionList(MaterialVo materialVo);
	
	/**
	 * 根据登录用户id查询用户关联的物资列表
	 * @param vo
	 * @param uid
	 * @return
	 */
	public List<Material> findAllMaterialsByCurrentUser(MaterialVo vo,String uid)throws Exception;
	
	/**
	 * 物资同步
	 * @param vo
	 * @return
	 */
	String synchronousMaterial(MaterialVo vo);
}