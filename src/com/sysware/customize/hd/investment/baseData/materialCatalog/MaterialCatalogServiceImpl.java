/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;

import net.sf.json.JSONArray;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.user.RoleUserVo;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.MaterialCondition;
import com.sysware.customize.hd.investment.baseData.material.MaterialDao;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

@Name("materialCatalogServiceImpl")
public class MaterialCatalogServiceImpl implements MaterialCatalogService {

	@In(create = true, value = "materialCatalogDaoImpl")
	MaterialCatalogDao materialCatalogDao;
	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;
	@In(create = true, value = "material_MaterialDaoImpl")
	public MaterialDao materialDao;
	@In(create = true)
	Identity identity;

	/**
	 * 根据父id取子物料种类集合
	 * 
	 * @param String
	 *            parentId 父节点ID
	 * 
	 * @return List<MaterialCatalogVo> 物料种类集合
	 * */
	public List<MaterialCatalogVo> getMaterialCatalogListByParentId(
			String parentId) {
		List<MaterialCatalogVo> materialCatalogVos = new ArrayList<MaterialCatalogVo>();
		List<MaterialCatalog> materialCatalogs = materialCatalogDao
				.getMaterialCatalogListByParentId(parentId);
		for (MaterialCatalog materialCatalog : materialCatalogs) {// 将MaterialCatalog转换为MaterialCatalogVo
			MaterialCatalogVo materialCatalogVo = new MaterialCatalogVo();
			materialCatalogVo.setMaterialcatalogid(materialCatalog
					.getMaterialcatalogid());
			materialCatalogVo.setMaterialtypename(materialCatalog
					.getMaterialtypename());
			materialCatalogVo.setParentid(materialCatalog.getParentid());
			materialCatalogVos.add(materialCatalogVo);
		}
		return materialCatalogVos;
	}

	@SuppressWarnings("unchecked")
	public List<RoleUserVo> getAllRole(MaterialCatalogVo vo, int start,
			int limit, HashMap<String, Integer> countMap) {
		List<RoleUserVo> roleVoList = new ArrayList<RoleUserVo>();
		RoleUserVo rvo = null;
		List roleList = materialCatalogDao.getAllRole(start, limit, countMap);
		List<String> list = materialCatalogDao
				.getMaterialCatalogRoleByMaterialCatalogId(vo
						.getMaterialcatalogid());
		if (roleList != null) {
			Iterator it = roleList.iterator();
			Object ob[] = null;
			while (it.hasNext()) {
				ob = (Object[]) it.next();
				rvo = new RoleUserVo();
				rvo.setRoleid(Long.parseLong(String.valueOf(ob[0])));
				rvo.setRolename(String.valueOf(ob[1]));
				rvo.setSign(false);
				if (list != null) {
					for (String roleID : list) {
						if (roleID.equals(String.valueOf(ob[0]))) {
							rvo.setSign(true);
							break;
						}
					}
				}
				roleVoList.add(rvo);
			}
		}
		return roleVoList;
	}

	public List<MaterialCatalog> getMaterialCatalogListById(String id) {
		return materialCatalogDao.getMaterialCatalogListByParentId(id);
	}

	/**
	 * 查询当前物料种类的所有子物料种类信息，并处理顺序，用于getAllRegMaterialCatalogs方法
	 * 
	 * @param String
	 *            startId 当前树节点
	 * 
	 * @return List<MaterialCatalog>
	 * */
	public List<MaterialCatalog> getRegMaterialCatalogs(
			List<MaterialCatalog> childCatalogs) {

		if (childCatalogs != null && childCatalogs.size() > 0) {
			List<MaterialCatalog> childCatalogTemps = new ArrayList<MaterialCatalog>();
			childCatalogTemps.addAll(childCatalogs);
			for (MaterialCatalog childCatalog : childCatalogTemps) {
				List<MaterialCatalog> child = this
						.getMaterialCatalogListById(childCatalog
								.getMaterialcatalogid());
				if (child != null && child.size() > 0) {
					childCatalogs.addAll(this.getRegMaterialCatalogs(child));
				}
			}
		}

		return childCatalogs;
	}

	/**
	 * 查询当前物料种类和所有的子物料种类，并处理顺序
	 * 
	 * @param String
	 *            startId 当前树节点
	 * 
	 * @return List<MaterialCatalog>
	 * */
	public List<MaterialCatalog> getAllRegMaterialCatalogs(String startId) {
		List<MaterialCatalog> materialCatalogs = new ArrayList<MaterialCatalog>();
		MaterialCatalog rootMC = materialCatalogDao.get(startId);// 获得当前节点MaterialCatalog对象
		materialCatalogs.add(rootMC);
		List<MaterialCatalog> childCatalogs = this
				.getMaterialCatalogListById(startId);// 获得当前节点的子节点MaterialCatalog对象
		materialCatalogs.addAll(this.getRegMaterialCatalogs(childCatalogs));
		return materialCatalogs;
	}

	/**
	 * 删除当前物料种类和所有的子物料种类
	 * 
	 * @param String
	 *            startId 当前树节点
	 * */
	@Transactional
	public void deleteMaterialCatalogs(String startId) {
		List<MaterialCatalog> materialCatalogs = this
				.getAllRegMaterialCatalogs(startId);
		// 倒序删除
		for (int i = materialCatalogs.size() - 1; i >= 0; i--) {
			MaterialCatalog materialCatalog = materialCatalogs.get(i);

			materialCatalogDao.deleteMaterialCatalog(materialCatalog);
		}
	}

	/**
	 * 新增物料种类
	 * 
	 * @param materialCatalog
	 *            MaterialCatalog
	 * */
	@Transactional
	public void addMaterialCatalog(MaterialCatalog materialCatalog)
			throws ReduplicatedException {
		MaterialCatalog temp = materialCatalogDao
				.findMaterialCatalogByExample(materialCatalog);
		if (StringUtils.isEmpty(materialCatalog.getMaterialcatalogid())) {
			if (temp != null
					&& StringUtils.isNotEmpty(temp.getMaterialcatalogid())) {
				throw new ReduplicatedException("物料种类信息重复！");
			}
			materialCatalog.setMaterialcatalogid(null);
			this.materialCatalogDao.save(materialCatalog);
		} else {
			if (temp != null
					&& !materialCatalog.getMaterialcatalogid().equals(
							temp.getMaterialcatalogid())) {
				throw new ReduplicatedException("物料种类信息已存在");
			}
			this.materialCatalogDao.update(materialCatalog);
		}
	}

	/**
	 * 得到物料种类总数
	 * 
	 * @return Integer
	 * */
	public Integer getCount() {

		return materialCatalogDao.getCount();
	}

	/**
	 * 新增或修改物料种类
	 * 
	 * @param materialCatalog
	 *            MaterialCatalog
	 * */
	@Transactional
	public void saveOrUpdateMaterialCatalog(MaterialCatalog materialCatalog) {
		// 如果是新增
		if (materialCatalog.getMaterialcatalogid() == null) {
			materialCatalogDao.save(materialCatalog);
		}
		// 如果是修改
		else {
			materialCatalogDao.update(materialCatalog);
		}
	}

	/***
	 * 获取当前 树节点 （包含 为根节点时 情况）以及 子节点 信息
	 * 
	 * @param String
	 *            parentId 当前父节点
	 * 
	 * @param Long
	 *            userID 当前操作人 权限
	 * 
	 * @return List<Object[]> 包含树节点信息的集合
	 */
	public List<Object[]> getTreeRootNode(String parentid, Long userID) {
		List<String> catalogIdsRole = new ArrayList<String>(0);
		List<Object[]> objects = new ArrayList<Object[]>();
		List<MaterialCatalog> materialCatalogs = materialCatalogDao// 根据父节点获得子节点
				.getMaterialCatalogListByParentId(parentid);
		if (userID != null) {
			catalogIdsRole = materialCatalogDao
					.getMaterialCatalogIdsByUserId(userID);
		}
		for (MaterialCatalog materialCatalog : materialCatalogs) {
			Object[] materialCatalogObj = new Object[7];
			materialCatalogObj[0] = materialCatalog.getMaterialcatalogid();// 对树节点进行设置物料种类ID
			materialCatalogObj[1] = materialCatalog.getMaterialtypename();// 对树节点Text进行设置物料种类名称
			materialCatalogObj[2] = "（物资种类）";// 对树 节点 物料含 类型进行设置
			MaterialCatalogVo mcv = new MaterialCatalogVo();
			mcv.setStartId(materialCatalog.getMaterialcatalogid());// 设置父节点的物料种类ID
			if (this.getCount(mcv) > 0) {// 如果该节点有子节点 ，则isLeaf为 0，isSheet为1.
				materialCatalogObj[3] = 1;
				materialCatalogObj[4] = 0;
			} else {
				materialCatalogObj[3] = 0;
				materialCatalogObj[4] = 1;
			}
			materialCatalogObj[5] = "";
			if (userID != null || catalogIdsRole.size() > 0) {// 权限处理
				if (catalogIdsRole.contains(materialCatalog
						.getMaterialcatalogid())) {
					materialCatalogObj[6] = "checked";
				} else {
					materialCatalogObj[6] = "";
				}
			}
			objects.add(materialCatalogObj);
		}
		return objects;
	}

	/**
	 * 查询物料种类信息列表分页
	 * 
	 * @param MaterialCatalogVo
	 *            mcv 物料种类信息Vo类
	 * 
	 * @param Integer
	 *            begin 分页参数
	 * 
	 * @param Integer
	 *            max 分页参数
	 * 
	 * @return List<MaterialCatalog>
	 * */
	public List<MaterialCatalog> getAllMaterialCatalogs(MaterialCatalogVo mcv,
			Integer begin, Integer max) {

		return materialCatalogDao.getAllMaterialCatalogs(mcv, begin, max);
	}

	/**
	 * 得到物料种类总数
	 * */
	public Integer getCount(MaterialCatalogVo mcv) {
		return materialCatalogDao.getCount(mcv);
	}

	/**
	 * 根据当前id查询根节点id
	 * */
	public String getRootIdById(String id) {

		if ("0".equals(id)) {// 本身为根节点
			return id;
		} else {
			String tempId = id;
			String parentId = this.getParentIdById(tempId);
			if (parentId == null || "".equals(parentId.trim())) {// 父节点 为 根节点
				return tempId;
			}
			int i = 0;
			while (!"0".equals(parentId)) {// 多级父节点 为 根节点 时，进行 迭代查找
				i++;
				tempId = parentId;
				parentId = this.getParentIdById(tempId);
				if (parentId == null || "".equals(parentId.trim())) {
					break;
				}
				// 当超过20层时，保护一下
				if (i > 20) {
					break;
				}
			}

			return tempId;
		}
	}

	/**
	 * 根据id得到父id
	 * */
	public String getParentIdById(String id) {
		return materialCatalogDao.getParentIdById(id);
	}

	/**
	 * 批量删除当前物料种类和所有的子物料种类
	 * 
	 * @param startIds
	 *            String[]
	 * */
	@Transactional
	public void deleteMaterialCatalogs(String[] startIds) {
		for (String id : startIds) {
			this.deleteMaterialCatalogs(id);
		}
	}

	/**
	 * 根据种类id判断是否有物料的外键关联
	 * */
	public boolean checkCatlogHsMetarials(String catlogId) {
		MaterialCondition materialCondition = new MaterialCondition();
		materialCondition.setStartId(catlogId);
		long count = materialService.countByCondition(materialCondition);
		if (count > 0) {
			return true;
		}
		return false;
	}

	/**
	 *判断物料种类树下是否有物料外键关联
	 * */
	public boolean checkMetarialExistInCatlogTree(String startId) {
		// 得到树节点下所有的物料种类
		List<MaterialCatalog> materialCatalogs = this
				.getAllRegMaterialCatalogs(startId);
		boolean isExist = false;
		for (MaterialCatalog mCatalog : materialCatalogs) {
			if (this.checkCatlogHsMetarials(mCatalog.getMaterialcatalogid())) {
				isExist = true;
				break;
			}
		}

		return isExist;
	}

	/**
	 * 根据id查询根节点的 MaterialCatalog 对象
	 * */
	public MaterialCatalog getRootMCById(String id) {
		String rootId = this.getRootIdById(id);
		return materialCatalogDao.get(rootId);
	}

	/**
	 * 根据选定的id获得所有子节点的id
	 * 
	 * @param String
	 *            id 父节点
	 * 
	 * @return List<String> 节点id集合
	 * */
	public List<String> getAllMaterialCatalogIdsByParentId(String id) {
		return this.materialCatalogDao.getAllMaterialCatalogIdsByParentId(id);
	}

	@Transactional
	public void saveMaterialCatalogUser(String[] materialCatalogID,
			String[] userID) {
		materialCatalogDao.saveMaterialCatalogUser(materialCatalogID, userID);
	}

	@Transactional
	public void saveMaterialCatalogUser(String[] materialCatalogIDs,
			String[] uncheckedCatalogIDs, String userID) {
		if (uncheckedCatalogIDs.length > 0) {
			materialCatalogDao.delMaterialCatalogUser(uncheckedCatalogIDs,
					userID);
		}
		if (materialCatalogIDs.length > 0) {
			materialCatalogDao.delMaterialCatalogUser(materialCatalogIDs,
					userID);
			materialCatalogDao.saveMaterialCatalogUser(materialCatalogIDs,
					userID);
		}
	}

	public String getMaterialCatalog() {
		Long userID = identity.getLoginUser().getUserid();
		return materialCatalogDao.getMaterialCatalogRoleByUserId(userID);
	}

	/**
	 * 根据选定的id获得所有根节点的的MaterialCatalog对象
	 * */
	public MaterialCatalog getRootMaterialCatalogId(String id) {
		return materialCatalogDao.getRootMaterialCatalogId(id);
	}

	/**
	 * 根据选定的id获得所有节点的 按照类别求和
	 * */
	public List<MaterialCatalog> getSumMaterialCatalogValueGroupByParentid(
			String id) {
		List<MaterialCatalog> tmp = this.materialCatalogDao
				.sumMaterialCatalogById(id);

		return tmp;
	}

	/**
	 * 根据选定的id判断是否是父节点
	 * */
	public boolean checkIsLeaf(String id) {
		MaterialCatalog m = this.materialCatalogDao.getBy("parentid", id);
		if (m == null) {
			return true;
		}
		return false;
	}

	/**
	 * 根据id 获得 MaterialCatalog对象
	 * */
	public MaterialCatalog getMaterialCatalogById(String id) {

		return this.materialCatalogDao.get(id);
	}

	/**
	 * 判断新增物料种类是否已存在
	 * */
	public boolean checkMaterialCatalog(MaterialCatalogVo materialCatalogVo) {
		String sql = "select count(MaterialCatalogId) from  t_materialCatalog where PARENTID = '"
				+ materialCatalogVo.getParentid()
				+ "' AND Materialtypename = '"
				+ materialCatalogVo.getMaterialtypename() + "'";
		Object number = materialCatalogDao.createSqlQuery(sql)
				.getSingleResult();
		if (number == null || String.valueOf(number).equals("0"))
			return false;
		else
			return true;
	}

	@Transactional
	public List<MaterialCatalogVo> importExcelFile(List<FileItem> items) {
		// 导入文件中已存在的物料种类集合
		List<MaterialCatalogVo> reMaterialCatalogs = new ArrayList<MaterialCatalogVo>();
		// 不存在的物料种类集合
		List<String> notExsitCatalog = new ArrayList<String>();

		Iterator<FileItem> itera = items.iterator();

		Workbook workbook = null;

		while (itera.hasNext()) {

			FileItem file = (FileItem) itera.next();

			try {
				WorkbookSettings ws = new WorkbookSettings();
				ws.setEncoding("ISO-8859-1");
				workbook = Workbook.getWorkbook(file.getInputStream(), ws);
				int numberOfSheets = workbook.getNumberOfSheets();

				MaterialCatalog materialCatalog = null;

				for (int i = 0; i < numberOfSheets; i++) {
					Sheet sheet = workbook.getSheet(i);
					int rows = sheet.getRows();// 行数

					for (int j = 1; j < rows; j++) {

						materialCatalog = new MaterialCatalog();

						String materialtypename = sheet.getCell(0, j)
								.getContents().trim();

						if (StringUtils.isNotEmpty(materialtypename)) {

							// 设置物料种类名
							materialCatalog
									.setMaterialtypename(materialtypename);

							String parentMaterialtypename = sheet.getCell(1, j)
									.getContents().trim();

							if (StringUtils.isNotEmpty(parentMaterialtypename)) {

								MaterialCatalog mat = this.materialDao
										.findIdByName(parentMaterialtypename);
								// 判断物料种类父id是否存在
								if (mat == null) {
									notExsitCatalog.add(parentMaterialtypename);
								} else {
									// 设置物料种类父id
									materialCatalog.setParentid(mat
											.getMaterialcatalogid());

								}
							} else {
								// 默认为根节点
								materialCatalog.setParentid("0");
							}

							String remark = sheet.getCell(2, j).getContents()
									.trim();
							// 设置备注
							materialCatalog.setRemark(remark);

							try {
								if (StringUtils.isNotEmpty(materialCatalog
										.getMaterialtypename())) {
									this.addMaterialCatalog(materialCatalog);
								}

							} catch (ReduplicatedException e1) {

								MaterialCatalogVo mat = new MaterialCatalogVo();
								mat.setMaterialtypename(materialCatalog
										.getMaterialtypename());
								mat.setParentid(materialCatalog.getParentid());
								mat.setParentName(parentMaterialtypename);
								mat.setRemark(remark);
								reMaterialCatalogs.add(mat);
							}

						}
					}

				}

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (null != workbook) {
					workbook.close();
				}
				if (notExsitCatalog.size() > 0) {
					throw new ImportExcelFileException(notExsitCatalog
							.toString());
				}
			}

		}

		return reMaterialCatalogs;
	}

	/**
	 * 根据样本查找MaterialCatalog对象
	 * */
	public MaterialCatalog findMaterialCatalogByExample(MaterialCatalog example) {
		return this.materialCatalogDao.findMaterialCatalogByExample(example);
	}

	/**
	 * 导入Excel操作
	 * 
	 * @param Workbook
	 *            workbook
	 * 
	 * @param List
	 *            <MaterialCatalog> reMaterialCatalogs 重复物料种类信息集合
	 * 
	 * @param List
	 *            <String> notExsitCatalog 不存在物料种类机型集合
	 * 
	 * @return List<MaterialCatalog>
	 * @throws FileUploadException 
	 * */
	@Transactional
	public List<MaterialCatalog> batchAddMaterialCatalogVos(Workbook workbook,
			List<MaterialCatalog> reMaterialCatalogs,
			List<String> notExsitCatalog) throws ImportExcelFileException, FileUploadException {
		String[] mCols = { "materialcatalogCode","materialtypename", "parentName", "remark" };
		int numberOfSheets = workbook.getNumberOfSheets();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			int rows = sheet.getRows();// 行数
			for (int m = 1; m < rows; m++) {
				MaterialCatalog materialCatalog = ExcelUtils.processRow(sheet
						.getRow(m), mCols, MaterialCatalog.class);

				if (StringUtils.isEmpty(materialCatalog.getMaterialtypename()))
					continue;
				
				String parentMaterialtypename = materialCatalog.getParentName();
				materialCatalog.setMaterialcatalogCode(materialCatalog.getMaterialcatalogCode());
				if (StringUtils.isNotEmpty(parentMaterialtypename)) {
					MaterialCatalog mat = this.materialDao
							.findIdByName(parentMaterialtypename);
					// 判断物料种类父id是否存在
					if (mat == null) {
						if(notExsitCatalog.indexOf(parentMaterialtypename)==-1){
							notExsitCatalog.add(parentMaterialtypename);
						}
						continue;
					} else {
						// 设置物料种类父id
					
						materialCatalog.setParentid(mat.getMaterialcatalogid());
					}
				} else {
					// 默认为根节点
					materialCatalog.setParentid("0");
				}
				
				try {
					this.addMaterialCatalog(materialCatalog);
				} catch (ReduplicatedException e) {
					reMaterialCatalogs.add(materialCatalog);
				}
			}

		}

		if (notExsitCatalog.size() > 0 || reMaterialCatalogs.size() > 0) {
			throw new ImportExcelFileException(notExsitCatalog.toString());
		}
		return reMaterialCatalogs;
	}

	public List<MaterialCatalog> getMaterialCatalogsByProcurement(
			String procurementId,String userId) {
		return this.materialCatalogDao.getMaterialCatalogsByProcurement(procurementId,userId);
	}

	public List<MaterialCatalog> getParentMaterialCatalogs(List<String> list) {
		
		return this.materialCatalogDao.getParentMaterialCatalogs(list);
	}

	public JSONArray getMaterialCatalogComboBox(MaterialCatalogVo vo) {
		// TODO Auto-generated method stub
		return materialCatalogDao.getMaterialCatalogComboBox(vo);
	}
}
