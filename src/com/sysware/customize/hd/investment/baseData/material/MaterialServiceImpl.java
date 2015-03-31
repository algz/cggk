package com.sysware.customize.hd.investment.baseData.material;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.exception.CanotRemoveObjectException;
import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.investmentTopMonitor.material.MaterialTraceVo;

/**
 * 物料信息Service实现类
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:08
 */
@Name("material_MaterialServiceImpl")
public class MaterialServiceImpl implements MaterialService {

	@In(create = true, value = "material_MaterialDaoImpl")
	private MaterialDao materialDao;

	/**
	 * @return the materialDao
	 */
	public MaterialDao getMaterialDao() {
		return materialDao;
	}

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
			int start, int limit) {

		return this.getMaterialDao().findAllMaterials(materialCondition, start,
				limit);
	}

	/**
	 * 根据条件获取物料信息总记录数
	 * 
	 * @param mater
	 *            MaterialCondition对象
	 * @return 物料信息总记录数
	 */
	public long countByCondition(MaterialCondition materialCondition) {
		return this.getMaterialDao().countByCondition(materialCondition);
	}

	/**
	 * 根据ID查询物料信息对象
	 * 
	 * @param id
	 *            物料信息ID
	 * @return 指定ID对应的物料信息对象
	 */

	public Material findById(String id) {
		return this.getMaterialDao().get(id);
	}

	/**
	 * 保存物料信息对象
	 * 
	 * @param material
	 *            待保存物料信息对象
	 */
	@Transactional
	public void save(Material material) throws ReduplicatedException {
		Material temp = getMaterialDao().findMaterialByExample(material);
		if (StringUtils.isEmpty(material.getMaterialid())) {
			if (temp != null && StringUtils.isNotEmpty(temp.getMaterialid())) {
				throw new ReduplicatedException("物料信息重复！");
			}
			material.setMaterialid(null);
			this.getMaterialDao().save(material);
		} else {
			if (temp != null
					&& !material.getMaterialid().equals(temp.getMaterialid())) {
				throw new ReduplicatedException("物料信息已存在！");
			}
			this.getMaterialDao().update(material);
		}
	}

	/**
	 * 删除物料信息
	 * 
	 * @param id
	 *            待删除物料信息对象ID
	 */
	@Transactional
	public boolean delete(String id) {
		return this.getMaterialDao().remove(id);
	}

	/**
	 * 根据物料种类id列示所有物料信息
	 * 
	 * @param id
	 *            物料种类ID
	 * @return 所有物料信息（实体类）
	 */
	@Transactional
	public List<Material> findMaterialsByMaterialCatalogId(String id) {

		MaterialCondition materialCondition = new MaterialCondition();

		materialCondition.setParentId(id);

		return this.getMaterialDao()
				.findMaterialsByMaterialCatalog(materialCondition);

	}

	/**
	 * 根据物料信息id和种类id获取物料信息List
	 * 
	 * @param materialIDs
	 *            String[]
	 * @param params
	 *            String[]
	 * @return materials
	 */
	@Transactional
	public List<Material> getMaterialsByMaterialAndCatalog(
			String[] materialIDs, String[] catalogIDs) {
		return this.getMaterialDao().getMaterialsByMaterialAndCatalog(materialIDs,
				catalogIDs);
	}

	/**
	 * 批量删除物料信息
	 * 
	 * @param ids
	 *            待删除物料信息对象ID数组
	 * @return boolean
	 */
	@Transactional
	public void batchDeleteMaterials(String[] ids)
			throws CanotRemoveObjectException {
		List<String> errIds = new ArrayList<String>();
		for (String id : ids) {
			try {
				this.delete(id);
			} catch (Exception e) {
				// 不能删除的ID保留下来
				errIds.add(id);
			}
		}
		if (errIds.size() > 0) {
			// errIds.toArray(new String[0]);
			throw new CanotRemoveObjectException();
		}
	}

	/***
	 * 批量添加物料信息，导入excel文件操作
	 * 
	 * @param workbook
	 *            待导入的信息
	 * @return 已存在的物料信息
	 * @throws FileUploadException 
	 */
	@Transactional
	public List<Material> batchAddMaterials(Workbook workbook)
			throws ImportExcelFileException, FileUploadException {

		String[] mCols = { "materialitemcode", "materialItemName", "desingnation",
				"materialStandard", "demension", "referencePrice",
				"technicCondition", "warningValue", "preservePeriod", "remarks","materialitemcode" };// 获取要读取的相应
		// Excel文件表头的数组

		List<Material> redupMaterials = new ArrayList<Material>();// 数据库中已存在物料信息集合
		List<String> notExsitCatalog = new ArrayList<String>();// 不存在的物料种类信息集合

		int numberOfSheets = workbook.getNumberOfSheets();// 获取Excel的sheet数目
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);// 获取Excel的sheet
			String sheetname = sheet.getName();// 获取Excel的sheet名称
			MaterialCatalog materialCatalog = this.getMaterialDao()
					.findIdByName(sheetname);// 根据sheet名称获取相应的物料种类
			if (materialCatalog == null) {
				notExsitCatalog.add(sheetname);// 如果相应的物料种类不存在，则将sheet名称加入到不存在的物料种类集合中
				continue;
			}
			int rows = sheet.getRows();// 当前sheet的行数
			for (int m = 2; m < rows; m++) {
				Material material = ExcelUtils.processRow(sheet.getRow(m),
						mCols, Material.class);// 从Excel中读取相应的物料信息
				material.setMaterialCatalog(materialCatalog);// 设置物料种类ID
				try {
					if (StringUtils.isNotEmpty(material.getMaterialItemName())) {
						this.save(material);
					}
				} catch (ReduplicatedException e1) {
					redupMaterials.add(material);// 如果在添加方法中出现重复信息异常，则将相应
					// material信息加入到数据库中已存在物料信息集合
				}
			}
		}
		if (notExsitCatalog.size() > 0) {
			throw new ImportExcelFileException(notExsitCatalog.toString());
		}
		return redupMaterials;
	}

	/**
	 * 根据采购合同ID查询物料信息
	 * 
	 * @param contractId
	 *            采购合同ID
	 * @return 符合条件的物料信息
	 */
	public List<Material> getMaterialsByContract(String contractId) {
		return this.getMaterialDao().getMaterialsByContract(contractId);
	}

	/**
	 * 根据Material样例获取Material对象
	 * 
	 * @param example
	 *            Material样例对象
	 * @return Material
	 */
	public Material findMaterialByExample(Material example) {
		return this.getMaterialDao().findMaterialByExample(example);
	}

	/**
	 * 根据物料种类id列示所有子集物料信息
	 * 
	 * @param id
	 *            物料种类id
	 * @return 物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalogId(String id) {
		return this.getMaterialDao().findAllMaterialsByMaterialCatalog(id);
	}

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
			int start, int limit) {
		return this.getMaterialDao().findAllMaterialsByMaterialCatalog(id, start,
				limit);
	}

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
			String id, int start, int limit) {
		return this.getMaterialDao().findProcurementMaterialsByMaterialCatalog(id,
				start, limit);
	}

	/**
	 * 获取对应物料种类下已有需求的物料总数
	 * 
	 * @param id
	 *            物料种类id
	 * @return 对应物料种类下的物料总数
	 */
	public long countProcurementMaterialsByMaterialCatalogId(String id) {
		return this.getMaterialDao().countProcurementMaterialsByMaterialCatalog(id);
	}
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 */
	public List<MaterialVo> getSelectStringClassList(){
		List<Object[]> list = this.getMaterialDao().getSelectStringClassList();
		List<MaterialVo> returnList = new ArrayList<MaterialVo>();
		
		for(Object[] o : list){
			MaterialVo vo = new MaterialVo();
			vo.setMaterialClass(String.valueOf(o[1]));
			//vo.setEquipmentname(String.valueOf(o[0]));
			//vo.setProductCode(String.valueOf(o[4]));
			returnList.add(vo);
		}
		return returnList;
	}
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<MaterialVo> getSelectStringKindList(String materialKind){
		List<Object[]> list = this.getMaterialDao().getSelectStringKindList(materialKind);
		List<MaterialVo> returnList = new ArrayList<MaterialVo>();
		
		for(Object[] o : list){
			MaterialVo vo = new MaterialVo();
			vo.setMaterialKind(String.valueOf(o[1]));
			//vo.setEquipmentname(String.valueOf(o[0]));
			//vo.setProductCode(String.valueOf(o[4]));
			returnList.add(vo);
		}
		return returnList;
	}
	
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>(无需参数)
	 * @param form
	 * @return
	 */
	public List<MaterialVo> getSelectStringDemensionList(){
		List<Object[]> list = this.getMaterialDao().getSelectStringDemensionList();
		List<MaterialVo> returnList = new ArrayList<MaterialVo>();
		
		for(Object o : list){
			MaterialVo vo = new MaterialVo();
			vo.setDemension(String.valueOf(o));
			//vo.setEquipmentname(String.valueOf(o[0]));
			//vo.setProductCode(String.valueOf(o[4]));
			returnList.add(vo);
		}
		return returnList;
	}
	
	
	
	/***
	 * 传入vo,获取库存系统的物质编码
	 * @param form
	 * @return
	 */
	public String getSelectStringDemensionList(MaterialVo materialVo){
		return this.getMaterialDao().getSelectStringDemensionList(materialVo);
	}
	

	public List<MaterialVo> getMaterialsByCondition(MaterialVo materialVo) {
		// TODO Auto-generated method stub
		return materialDao.getMaterialsByCondition(materialVo);
	}

	public Material findByCode(String code) {
		return materialDao.findByCode(code);
	}

	public List<MaterialVo> findAllMaterialsByCurrentUser(MaterialVo vo,
			String uid) throws Exception{
		List<Material> list = materialDao.findAllMaterialsByCurrentUser(vo,uid);
		List<MaterialVo> listVo = new ArrayList<MaterialVo>();
		for (Material material : list) {
			MaterialVo mvo = new MaterialVo();
			BeanUtils.copyProperties(mvo, material);
			mvo.setFileId("");
			mvo.setFileName("");
			listVo.add(mvo);
		}
		return listVo;
	}
	

	/**
	 * 用户获取物资种类,返回物料编码
	 */
	public static String getMaterialitemcodeAuthorityByLoginName(String loginName) {
		return "select item_code from t_item_profile where login_name = '"
				+ loginName + "' ";
	}
	
	/**
	 * 用户获取物资(ID)权限
	 */
	public static String getMaterialidAuthorityByLoginName(String loginName) {
		return "select tm.materialid from t_item_profile ip,t_material tm where tm.materialitemcode=ip.item_code and ip.login_name = '"
				+ loginName + "' ";
	}
	
	/**
	 * 用户获取物资(编号)权限
	 */
	public static String getMaterialcodeAuthorityByLoginName(String loginName) {
		return "select tm.materialitemcode from t_item_profile ip,t_material tm where tm.materialitemcode=ip.item_code and ip.login_name = '"
				+ loginName + "' ";
	}
	
	/**
	 * 通过物资种类ID获取顶层物资大类
	 */
	public MaterialCatalog getMaterialCatalogByMaterialCatalogid(String MaterialCatalogid) {
		String sql="select t1.* from (select t.* from t_materialcatalog t  start with t.materialcatalogid='"+MaterialCatalogid+"' connect by  t.materialcatalogid= prior t.parentid ) t1 where  t1.parentid ='0'";
		return (MaterialCatalog)this.materialDao.getHibernateSession().createSQLQuery(sql).addEntity("t1",MaterialCatalog.class).setMaxResults(1).uniqueResult();
		
	}

	public String synchronousMaterial(MaterialVo vo) {
		return materialDao.synchronousMaterial(vo);
	}


	public JSONArray getMaterialTrace(MaterialTraceVo vo) {
		StringBuilder sql=new StringBuilder(" from v_materialtrace t where 1=1 ");
		if(vo.getDeclare_detail_id()!=null&&!vo.getDeclare_detail_id().equals("")){
			sql.append(" and declare_detil_id like '%"+vo.getDeclare_detail_id()+"%'");
		}
		if(vo.getDeclare_code()!=null&&!vo.getDeclare_code().equals("")){
			sql.append(" and declare_code like '%"+vo.getDeclare_code()+"%'");
		}
		if(vo.getMaterialitemcode()!=null&&!vo.getMaterialitemcode().equals("")){
			sql.append(" and materialitemcode like '%"+vo.getMaterialitemcode()+"%'");
		}
		if(vo.getMaterialstandard()!=null&&!vo.getMaterialstandard().equals("")){
			sql.append(" and materialstandard like '%"+vo.getMaterialstandard()+"%'");
		}
		if(vo.getDesingnation()!=null&&!vo.getDesingnation().equals("")){
			sql.append(" and desingnation like '%"+vo.getDesingnation()+"%'");
		}
		if(vo.getDemension()!=null&&!vo.getDemension().equals("")){
			sql.append(" and demension like '%"+vo.getDemension()+"%'");
		}
		if(vo.getMaterialclass()!=null&&!vo.getMaterialclass().equals("")){
			sql.append(" and materialclass like '%"+vo.getMaterialclass()+"%'");
		}
		if(vo.getDeclare_code()!=null&&!vo.getDeclare_code().equals("")){
			sql.append(" and declare_code like '%"+vo.getDeclare_code()+"%'");
		}
		if(vo.getDeclareplan_name()!=null&&!vo.getDeclareplan_name().equals("")){
			sql.append(" and declareplan_name like '%"+vo.getDeclareplan_name()+"%'");
		}
		if(vo.getProcurementplan_code()!=null&&!vo.getProcurementplan_code().equals("")){
			sql.append(" and procurementplan_code like '%"+vo.getProcurementplan_code()+"%'");
		}
		if(vo.getProcurementplan_name()!=null&&!vo.getProcurementplan_name().equals("")){
			sql.append(" and procurementplan_name like '%"+vo.getProcurementplan_name()+"%'");
		}
		if(vo.getContractcode()!=null&&!vo.getContractcode().equals("")){
			sql.append(" and contractcode like '%"+vo.getContractcode()+"%'");
		}
		if(vo.getContractname()!=null&&!vo.getContractname().equals("")){
			sql.append(" and contractname like '%"+vo.getContractname()+"%'");
		}
		if(vo.getD_createdate_start()!=null&&!vo.getMaterialitemname().equals("")){
			sql.append(" and d_createdate between to_Date('"+vo.getD_createdate_start()+"','yyyy-mm-dd') ");
			sql.append(" and "+(vo.getD_createdate_end()!=null&&!vo.getD_createdate_end().equals("")?vo.getD_createdate_end():"sysdate")+"");
		}
		BigDecimal count=(BigDecimal)materialDao.getHibernateSession()
		                         .createSQLQuery(" select count(1) "+sql.toString()).uniqueResult();
		vo.setCount(count.toString());
		List<Object[]> list=materialDao.getHibernateSession()
		                               .createSQLQuery("select * "+sql.toString())
		                               .setFirstResult(Integer.parseInt(vo.getStart()))
		                               .setMaxResults(Integer.parseInt(vo.getLimit()))
		                               .list();
		JSONArray ja=new JSONArray();
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("declare_detil_id", objs[0]);
			jo.put("declare_code", objs[1]);
			jo.put("d_createdate", UtilDAOImp.dateToStr((Date)objs[2],"yyyy-MM-dd"));
			jo.put("d_creater", objs[3]);
			jo.put("materialitemcode", objs[4]);
			jo.put("materialitemname", objs[5]);
            jo.put("materialstandard", objs[6]);
			jo.put("desingnation", objs[7]);
			jo.put("demension", objs[8]);
			jo.put("delivery_status", objs[9]);
			jo.put("materialclass", objs[10]);
			jo.put("amountsource", objs[11]);
			jo.put("costnum", objs[12]);
			jo.put("departmentname", objs[13]);
			jo.put("quantity", objs[14]);
			jo.put("usedate", UtilDAOImp.dateToStr((Date)objs[15],"yyyy-MM-dd"));
			jo.put("use", objs[16]);
			jo.put("declaretype", objs[17]);
			jo.put("taskno", objs[18]);
			jo.put("declareplan_code", objs[19]);
			jo.put("declareplan_name", objs[20]);
			jo.put("procurementplan_code", objs[21]);
			jo.put("procurementplan_name", objs[22]);
			jo.put("number_applications", objs[23]);
			jo.put("actualnumber", objs[24]);
			jo.put("purchasetype", objs[25]);
			jo.put("vendname", objs[26]);
			jo.put("contractcode", objs[27]);
			jo.put("contractname", objs[28]);
			jo.put("procurementdetailid", objs[29]);
			ja.add(jo);
		}
		return ja;
	}

	public JSONArray getMaterialTraceDetail(MaterialTraceVo vo) {
		String sql="select * from v_materialtracedetail t "+
		           "where t.declare_detil_id='"+vo.getDeclare_detail_id()+"'";
		Object[] objs=(Object[])materialDao.getHibernateSession()
		                                   .createSQLQuery(sql).uniqueResult();
		
		JSONArray ja=new JSONArray();
		JSONObject jo=new JSONObject();
		jo.put("declareText",(String)objs[1]);
		jo.put("declarePlanText",(String)objs[2]);
		jo.put("procurementPlanText",(String)objs[3]);
		jo.put("parityText", (String)objs[4]);
		jo.put("procurementContractText",(String)objs[5]);
		jo.put("registrationText",(String)objs[6]);
		jo.put("arrivalCheckText",(String)objs[7]);
		ja.add(jo);
		return ja;
	}
	
}