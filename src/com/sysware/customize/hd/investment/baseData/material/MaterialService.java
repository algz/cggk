package com.sysware.customize.hd.investment.baseData.material;

import java.util.List;

import net.sf.json.JSONArray;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.annotations.remoting.WebRemote;

import jxl.Workbook;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.investmentTopMonitor.material.MaterialTraceVo;

/**
 * 物料信息Service
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:08
 */
public interface MaterialService {

	/**
	 * 根据物料名称查询物料信息
	 * @param materialVo
	 * @return
	 */
	List<MaterialVo> getMaterialsByCondition(MaterialVo materialVo);
	
	/**
	 * 列示所有物料信息
	 * 
	 * @param mc
	 *            MaterialCondition对象
	 * @param start
	 *            起始行
	 * @param limit
	 *            每页行数
	 * @return 所有物料信息
	 */
	public List<Material> findAllMaterials(MaterialCondition mc, int start,
			int limit);

	/**
	 * 根据物料种类id列示所有直接下一级物料信息
	 * 
	 * @param id
	 *            物料种类id
	 * @return 物料信息（实体类）
	 */
	public List<Material> findMaterialsByMaterialCatalogId(String id);

	/**
	 * 根据物料种类id列示所有子集物料信息
	 * 
	 * @param id
	 *            物料种类id
	 * @return 物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalogId(String id);

	/**
	 * 根据物料种类id列示所有子集物料信息-分页
	 * 
	 * @param id
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalogId(String id,
			int start, int limit);

	/**
	 * 根据物料种类id列示所有已有需求的物料信息-分页
	 * 
	 * @param id
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	public List<Material> findProcurementMaterialsByMaterialCatalogId(
			String id, int start, int limit);

	/**
	 * 获取对应物料种类下已有需求的物料总数
	 * 
	 * @param id
	 *            物料种类id
	 * @return 对应物料种类下的物料总数
	 */
	public long countProcurementMaterialsByMaterialCatalogId(String id);

	/**
	 * 根据ID查询物料信息对象
	 * 
	 * @param id
	 *            物料信息ID
	 * @return 指定ID对应的物料信息对象
	 */
	public Material findById(String id);
	
	/**
	 * 根据code查询物料信息对象
	 * 
	 * @param icode
	 *            物料信息编码
	 * @return 指定ID对应的物料信息对象
	 */
	public Material findByCode(String code);

	/**
	 * 保存物料信息对象
	 * 
	 * @param material
	 *            待保存物料信息对象
	 * @throws ReduplicatedException
	 *             对象信息已经重复异常
	 */
	public void save(Material material) throws ReduplicatedException;

	/**
	 * 批量删除物料信息
	 * 
	 * @param ids
	 *            待删除物料信息对象ID数组
	 */
	public void batchDeleteMaterials(String[] ids);

	/**
	 * 根据条件获取物料信息总记录数
	 * 
	 * @param mater
	 *            MaterialCondition对象
	 * @return 物料信息总记录数
	 */
	public long countByCondition(MaterialCondition materialCondition);

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

	/***
	 * 批量添加物料信息，导入excel文件操作
	 * 
	 * @param workbook
	 *            待导入的信息
	 * @return 已存在的物料信息
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	public List<Material> batchAddMaterials(Workbook workbook)
			throws ImportExcelFileException, FileUploadException;

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
	public List<MaterialVo> getSelectStringClassList();
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<MaterialVo> getSelectStringKindList(String materialKind);
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>(无需参数)
	 * @param form
	 * @return
	 */
	public List<MaterialVo> getSelectStringDemensionList();
	
	
	
	
	/***
	 * 传入vo,获取库存系统的物质编码
	 * @param form
	 * @return
	 */
	public String getSelectStringDemensionList(MaterialVo materialVo);
	
	/**
	 * 根据登录用户id查询用户关联的物资列表
	 * @param vo
	 * @return
	 */
	public List<MaterialVo> findAllMaterialsByCurrentUser(MaterialVo vo,String uid)throws Exception;
	
	/**
	 * 通过物资种类ID获取顶层物资大类
	 */
	public MaterialCatalog getMaterialCatalogByMaterialCatalogid(String MaterialCatalogid);
	
	/**
	 * 物资同步
	 * @param vo
	 * @return
	 */
	String synchronousMaterial(MaterialVo vo);
	
	/**
	 * 物资追踪
	 * @param vo
	 * @return
	 */
	JSONArray getMaterialTrace(MaterialTraceVo vo);
	
	/**
	 * 物资追踪详情日志
	 * @param vo
	 * @return
	 */
	JSONArray getMaterialTraceDetail(MaterialTraceVo vo);
}