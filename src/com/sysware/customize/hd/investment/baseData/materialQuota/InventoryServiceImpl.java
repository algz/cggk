package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.product.Product;
import com.sysware.customize.hd.investment.baseData.product.ProductService;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

@Name("inventory_InventoryServiceImpl")
public class InventoryServiceImpl implements InventoryService {

	@In(create = true, value = "inventory_InventoryDaoImpl")
	InventoryDao inventoryDao;

	@In(create = true, value = "materialQuota_MaterialQuotaDaoImpl")
	MaterialQuotaDao materialQuotaDao;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;

	@In(create = true, value = "ProductServiceImpl")
	private ProductService productService;

	@Transactional
	public void batchAddInventoryType1(Workbook workbook, String type,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException {

		String[] mCols = { "materialItemName", "desingnation",
				"materialStandard", "technicCondition", "", "", "", "", "", "",
				"", "", "","materialitemcode" };

		String[] iCols = { "", "", "", "", "productCode", "numberOne",
				"numberTwo", "numberThree", "numberFour", "", "useSite",
				"partID", "remark" ,""};//针对type为“2备件清册3设备清册4工具清册”

		int numberOfSheets = workbook.getNumberOfSheets();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			int rows = sheet.getRows();// 行数

			for (int m = 1; m < rows; m++) {
				String productCode = sheet.getCell(4, m).getContents().trim();
				// 如果“机型”未填写，则进入下一条记录
				if(StringUtils.isEmpty(productCode)){
					continue;
				}
				// 如果“机型”已标识为“不存在”，则进入下一条记录
				if (noExistProducts.contains(productCode)) {
					continue;
				}
				// 判断机型是否存在，如果“不存在”则记录，并进入下一条记录
				Product product = productService.getProductByCode(productCode);
				if (product == null) {
					noExistProducts.add(productCode);
					continue;
				}

				Material example = ExcelUtils.processRow(sheet.getRow(m),
						mCols, Material.class);//从xls文件中读取该行记录的物料信息部分
				Material material = this.materialService
						.findMaterialByExample(example);//根据该行记录在数据库中查询是否已存在

				if (material == null) { // 该物料在系统中不存在
					newMaterials.add(example);
					continue;
				}

				Inventory inventory = ExcelUtils.processRow(sheet.getRow(m),
						iCols, Inventory.class);//从xls文件中读取该行记录材料定额部分

				inventory.setType(type);
				inventory.setMaterial(material);

				Inventory temp = this.inventoryDao
						.findInventoryByExample(inventory);//根据该行记录在数据库中查询是否已存在
				if (temp != null
						&& StringUtils.isNotEmpty(temp.getInventoryID())) {
					example.setProductCode(productCode);
					newMaterials.add(example);
					continue;
				}
				this.inventoryDao.save(inventory);
			}
		}
		if (noExistProducts.size() > 0 || newMaterials.size() > 0) {
			throw new ImportExcelFileException();
		}
	}

	public long getCountByCondition(
			MaterialQuotaCondition materialQuotaVoCondition) {

		return this.inventoryDao.getCountByCondition(materialQuotaVoCondition);
	}

	public List<Inventory> getInventoryListByCondition(
			MaterialQuotaCondition materialQuotaVoCondition) {
		return this.inventoryDao
				.getInventoryListByCondition(materialQuotaVoCondition);
	}

	/**
	 * 2012/06/29
	 * 由于材料定额信息采用洪都提供的视图,所以导入功能无效.
	 * 
	 */
	@Transactional
	public void batchAddInventoryType2(Workbook workbook, String type,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException {

//		String[] mCols = { "materialItemName", "desingnation",
//				"materialStandard", "technicCondition", "", "", "", "", "", "","materialitemcode" };//读取xls通用表头数组
//
//		String[] iCols = { "", "", "", "", "productCode", "numbers", "",
//				"useSite", "partID", "remark","" };//针对type为“1成品清单定额5标准件清册”
//
//		int numberOfSheets = workbook.getNumberOfSheets();
//
//		for (int i = 0; i < numberOfSheets; i++) {
//			Sheet sheet = workbook.getSheet(i);
//			int rows = sheet.getRows();// 行数
//
//			for (int m = 1; m < rows; m++) {
//				String productCode = sheet.getCell(4, m).getContents().trim();
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
//						mCols, Material.class);//读取该行数据中的物料信息部分
//				Material material = this.materialService
//						.findMaterialByExample(example);//查询数据库中是否已存在该条记录
//				if (material == null) { // 该物料在系统中不存在
//					newMaterials.add(example);
//					continue;
//				}
//
//				Inventory inventory = ExcelUtils.processRow(sheet.getRow(m),
//						iCols, Inventory.class);//读取该行数据中的材料定额部分
//				inventory.setType(type);//设置清册状态
//				inventory.setMaterial(material);
//
//				MaterialQuota exampleMq = new MaterialQuota();
//				if (StringUtils.isNotEmpty(productCode)) {
//					exampleMq.setProductCode(productCode);//设置材料定额的机型
//				}
//				exampleMq.setMaterial(material);//设置物料信息
//
//				MaterialQuota mq = this.materialQuotaDao
//						.findMaterialQuotaByExample(exampleMq);//查询材料定额是否已在数据库中存在
//				if (mq != null
//						&& StringUtils.isNotEmpty(mq.getMaterialQuotaId())) {//
//					example.setProductCode(productCode);
//					newMaterials.add(example);//材料定额已存在
//					continue;
//				}
//				Inventory ie = this.inventoryDao
//						.findInventoryByExample(inventory);
//				if (ie != null && StringUtils.isNotEmpty(ie.getInventoryID())) {
//					example.setProductCode(productCode);
//					newMaterials.add(example);
//					continue;
//				}
//				this.inventoryDao.save(inventory);
//			}
//		}
//
//		if (noExistProducts.size() > 0 || newMaterials.size() > 0) {
//			throw new ImportExcelFileException();
//		}

	}

}
