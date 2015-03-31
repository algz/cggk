package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.product.ProductService;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

/**
 * 材料定额ServiceImpl
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 26-五月-2011 13:46:08
 */
@Name("materialQuota_MaterialQuotaServiceImpl")
public class MaterialQuotaServiceImpl implements MaterialQuotaService {

	@In(create = true, value = "materialQuota_MaterialQuotaDaoImpl")
	MaterialQuotaDao materialQuotaDao;

	@In(create = true, value = "inventory_InventoryDaoImpl")
	InventoryDao inventoryDao;

	@In(create = true, value = "material_MaterialServiceImpl")
	MaterialService materialService;

	@In(create = true, value = "ProductServiceImpl")
	private ProductService productService;

	@In(create = true)
	Identity identity; 
	/***
	 * 2012/06/29
	 * 采用洪都提供的材料定额视图,导入功能无效.
	 * 
	 * 批量添加材料定额信息-导入excel文件操作
	 * 
	 * @param workbook
	 *            待导入的文件
	 * @param noExistProducts
	 *            系统中不存在的机型代号
	 * @param newMaterials
	 *            系统中不存在的新物料信息
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	@Transactional
	public void batchAddMaterialQuotas(Workbook workbook,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException {
		int numberOfSheets = workbook.getNumberOfSheets();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			int rows = sheet.getRows();// 行数
			for (int m = 1; m < rows; m++) {
				MaterialQuota materialQuota = new MaterialQuota();
				String jx = sheet.getCell(10,m).getContents().trim();
				String cldm = sheet.getCell(0,m).getContents().trim();
				String qjde = sheet.getCell(13,m).getContents().trim();
				if(jx.equals("")||cldm.equals("")){
					continue;
				}
				materialQuota.setJX(jx);
				materialQuota.setQSJH(sheet.getCell(11,m).getContents().trim());
				materialQuota.setZZJH(sheet.getCell(12,m).getContents().trim());
				materialQuota.setCLDM(cldm);
				materialQuota.setCLMC(sheet.getCell(1,m).getContents().trim());
				materialQuota.setCLPH(sheet.getCell(2,m).getContents().trim());
				materialQuota.setCLGG(sheet.getCell(3,m).getContents().trim());
				materialQuota.setJSTJ(sheet.getCell(4,m).getContents().trim());
				materialQuota.setQJDE(new BigDecimal(qjde==""||qjde==null?"0":qjde));
				materialQuota.setQJPSDE(BigDecimal.ZERO);
				materialQuota.setJLDWMC(sheet.getCell(6,m).getContents().trim());
				materialQuota.setImporttime(new Date());
//				通过材料代码查询材料id
				Material material = this.materialService
						.findByCode(cldm);
				if (material != null) {// 该物料在系统中存在
					materialQuota.setMaterialid(material.getMaterialid());
				}else{
					continue;
				}
				MaterialQuota mq = this.materialQuotaDao.findMaterialQuotaByExample(materialQuota);
				if (mq == null) {
					materialQuota.setRemarks(BigDecimal.ZERO);
					this.materialQuotaDao.save(materialQuota);
				}else{
					materialQuota.setId(mq.getId());
					materialQuota.setRemarks(mq.getRemarks());
					this.materialQuotaDao.update(materialQuota);
				}
			}
		}
//				// 如果“机型”已标识为“不存在”，则进入下一条记录
//				if (noExistProducts.contains(productCode)) {
//					continue;
//				}
//				// 判断机型是否存在，如果“不存在”则记录，并进入下一条记录
//				Product product = productService.getProductByCode(productCode);
//				if (product == null) {
//					noExistProducts.add(productCode);
//					continue;
//				}
//
//				Material example = ExcelUtils.processRow(sheet.getRow(m),
//						mCols, Material.class);
//				Material material = this.materialService
//						.findMaterialByExample(example);
//				if (material == null) {// 该物料在系统中不存在
//					newMaterials.add(example);
//					continue;
//				}

//				Inventory inventory = new Inventory();
//				NumberCell numberCell = (NumberCell)sheet.getCell(4, m);
//				String materialCount = String.valueOf(numberCell.getValue());
//				if (StringUtils.isNotEmpty(materialCount)) {
//					materialQuota
//							.setMaterialCount(new BigDecimal(materialCount));
//				}
//
//				if (StringUtils.isNotEmpty(productCode)) {
//					materialQuota.setProductCode(productCode);
//					inventory.setProductCode(productCode);
//				}
//
//				materialQuota.setMaterial(material);
//				inventory.setMaterial(material);
//
//				MaterialQuota mq = this.materialQuotaDao
//						.findMaterialQuotaByExample(materialQuota);
//
//				if (mq != null
//						&& StringUtils.isNotEmpty(mq.getMaterialQuotaId())) {
//					example.setProductCode(productCode);
//					newMaterials.add(example);
//					continue;
//				}
//				Inventory ie = this.inventoryDao
//						.findInventoryByExample(inventory);
//				if (ie != null && StringUtils.isNotEmpty(ie.getInventoryID())) {
//					example.setProductCode(productCode);
//					newMaterials.add(example);
//					continue;
//				}
//				this.materialQuotaDao.save(materialQuota);
//			}
//		}
//
//		if (noExistProducts.size() > 0 || newMaterials.size() > 0) {
//			throw new ImportExcelFileException();
//		}
	}

	public long getCountByMaterialQuotaCondition(
			MaterialQuotaCondition materialQuotaVoCondition) {
		return this.materialQuotaDao
				.getCountByCondition(materialQuotaVoCondition);
	}

	public List<MaterialQuotaVo> getMaterialQuotaListByCondition(
			MaterialQuotaCondition condition) {
		return this.materialQuotaDao.getMaterialQuotaListByCondition(condition);
	}

	public List<MaterialQuota> getMaterialQuotaListByProductId(String productId,String GroupType) {
		return this.materialQuotaDao.getMaterialQuotaListByProductId(productId, GroupType.equals("零件")?"1":(GroupType.equals("初装")?"2":"3"));
	}

	@Transactional
	public String saveMaterialQuotaRecord(MaterialQuotaRecordVo vo) throws Exception{
//		1.保存定额计划表修改字段，并记录修改记录条数
		MaterialQuota quota = materialQuotaDao.get(vo.getMqid());
		quota.setQJDE(new BigDecimal(vo.getQJDE()));
		quota.setRemarks(quota.getRemarks().add(BigDecimal.ONE));
		materialQuotaDao.update(quota);
//		2.添加定额计划字表---修改记录信息
		MaterialQuotaRecord record = new MaterialQuotaRecord();
		record.setMaterialQuota(quota);
		record.setEdittime(new Date());
		record.setEditperson(identity.getLoginUser().getLoginname());
		record.setEditreason(vo.getEditreason());
		materialQuotaDao.save(record);
		return "";
	}

	public List<MaterialQuotaRecordVo> getAllMaterialQuotaRecordVos(
			MaterialQuotaRecordVo vo) {
		List<MaterialQuotaRecord> list = materialQuotaDao.getAllMaterialQuotaRecordVos(vo);
		List<MaterialQuotaRecordVo> retList = new ArrayList<MaterialQuotaRecordVo>();
		for(MaterialQuotaRecord record : list){
			MaterialQuotaRecordVo rvo = new MaterialQuotaRecordVo();
			rvo.setEditreason(record.getEditreason());
			rvo.setEditperson(record.getEditperson());
			rvo.setEdittime(record.getEdittime().toString());
			retList.add(rvo);
		}
		return retList;
	}

	public List<MaterialQuotaVo> getAllJx() {
		List<MaterialQuotaVo> retList = new ArrayList<MaterialQuotaVo>();
		List<String> list = materialQuotaDao.getAllJx();
		for(int i = 0; i < list.size(); i++){
			MaterialQuotaVo vo = new MaterialQuotaVo();
			vo.setJX(list.get(i));
			retList.add(vo);
		}
		return retList;
	}

	@Transactional
	public String saveMaterialQuota(MaterialQuotaVo vo)throws Exception{
		//根据机型、物资id查询材料定额表
		MaterialQuota mq = new MaterialQuota();
		mq.setJX(vo.getJX());
		mq.setCLDM(vo.getCLDM());
		mq.setCLMC(vo.getCLMC());
		mq.setCLPH(vo.getCLPH());
		mq.setCLGG(vo.getCLGG());
		mq.setJSTJ(vo.getJSTJ());
		mq.setJLDWMC(vo.getJLDWMC());
		mq.setQSJH(vo.getQSJH());
		mq.setZZJH(vo.getZZJH());
		mq.setQJDE(new BigDecimal(vo.getQJDE()));
		mq.setImporttime(new Date());
		mq.setRemarks(BigDecimal.ZERO);
		mq.setQJPSDE(BigDecimal.ZERO);
		mq.setMaterialid(vo.getMaterialid());
		MaterialQuota mqq = this.materialQuotaDao.findMaterialQuotaByExample(mq);
		if (mqq == null) {
			materialQuotaDao.save(mq);
			return "{success:true,msg:'保存成功'}";
		}else{
			return "{success:true,msg:'添加的数据已存在'}";
		}
	}

	@Transactional
	public void deleteMaterialQuota(String qid) {
		String[] ids = qid.split(",");
		for(int i = 0; i < ids.length; i++){
			materialQuotaDao.deleteMaterialQuota(ids[i]);
		}
	}

}
