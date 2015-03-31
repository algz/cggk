package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.List;

import org.apache.commons.fileupload.FileUploadException;

import jxl.Workbook;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

/**
 * 各种清册明显Serivce
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 26-五月-2011 13:46:08
 */

public interface InventoryService {

	/**
	 * 导入备件、设备、工具清册
	 * 
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	public void batchAddInventoryType1(Workbook workbook, String type,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException;

	/**
	 * 成品清单定额、标准件清册
	 * 
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	public void batchAddInventoryType2(Workbook workbook, String type,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException;

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息总数
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return
	 */
	public long getCountByCondition(MaterialQuotaCondition condition);

	/**
	 * 根据materialQuotaCondition获得材料定额信息list
	 * 
	 * @param condition
	 *            MaterialQuotaCondition
	 * @return LIST
	 */
	public List<Inventory> getInventoryListByCondition(
			MaterialQuotaCondition condition);

}
