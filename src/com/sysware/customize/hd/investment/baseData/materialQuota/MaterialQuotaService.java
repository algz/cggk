package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.List;

import org.apache.commons.fileupload.FileUploadException;

import jxl.Workbook;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

/**
 * 材料定额Service
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 26-五月-2011 13:46:08
 */
public interface MaterialQuotaService {

	/***
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
	public void batchAddMaterialQuotas(Workbook workbook,
			List<String> noExistProducts, List<Material> newMaterials)
			throws ImportExcelFileException, FileUploadException;

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息总数
	 * 
	 * @param materialQuotaVoCondition
	 *            MaterialQuotaVoCondition
	 * @return
	 */
	public long getCountByMaterialQuotaCondition(
			MaterialQuotaCondition materialQuotaVoCondition);

	/**
	 * 根据materialQuotaVoCondition获得材料定额信息list
	 * 
	 * @param materialQuotaVoCondition
	 *            MaterialQuotaVoCondition
	 * @return LIST
	 */
	public List<MaterialQuotaVo> getMaterialQuotaListByCondition(
			MaterialQuotaCondition materialQuotaVoCondition);

	/**
	 * 根据productId获得材料定额信息list
	 * 
	 * @param productId
	 * @return LIST
	 */
	public List<MaterialQuota> getMaterialQuotaListByProductId(String productId,String GroupType);

	
	/**
	 * 保存材料定额修改信息
	 * @param vo
	 * @return
	 */
	public String saveMaterialQuotaRecord(MaterialQuotaRecordVo vo)throws Exception;

	/**
	 * 获取定额计划修改记录明细
	 * @param vo
	 * @return
	 */
	public List<MaterialQuotaRecordVo>getAllMaterialQuotaRecordVos(MaterialQuotaRecordVo vo);
	
	/**
	 * 获取所有材料定额机型
	 * @return
	 */
	public List<MaterialQuotaVo> getAllJx();
	
	/**
	 * 保存材料定额
	 * @param vo
	 * @return
	 * @throws Exception 
	 */
	public String saveMaterialQuota(MaterialQuotaVo vo) throws Exception;
	
	/**
	 * 删除材料定额
	 * @param qid
	 */
	public void deleteMaterialQuota(String qid);
}
