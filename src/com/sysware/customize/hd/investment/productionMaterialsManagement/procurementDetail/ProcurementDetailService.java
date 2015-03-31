package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;

/**
 * 物资需求详情Service
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-27
 */
public interface ProcurementDetailService {

	/**
	 * 保存需求详情信息
	 * 
	 * @param procurementDetail
	 *            需求详情对象
	 */
	void addProcurementDetail(ProcurementDetail procurementDetail);

	/**
	 * 根据导入的年度计划详情信息添加物资需求详情信息
	 * 
	 * @param buinessPlanName
	 *            年度计划名称
	 * @param businessPlanDetails
	 *            年度计划详情信息
	 */
	void batchAddProcurementDetails(String buinessPlanName,
			List<BuinessPlanDetail> businessPlanDetails);

	/**
	 * 导入零星需求
	 * 
	 * @param workbook
	 *            零星需求Excel表格对象
	 * @param formField
	 *            零星需求其他信息，例如：备注等
	 * @param noExistProducts
	 *            系统中不存在的机型
	 * @param newMaterials
	 *            系统中不存在的物料
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	void batchAddProcurementDetails(Workbook workbook,
			Map<String, String> formField, List<String> noExistProducts,
			List<Material> newMaterials) throws FileUploadException;

	/**
	 * 
	 * @param workbook
	 * @param formField
	 * @param noExistProducts
	 * @param newMaterials
	 * @throws FileUploadException
	 */
	public void importProcurementPlan(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException ;
	
	/**
	 * 根据年度计划详情IDs删除物资需求详情信息
	 * 
	 * @param businessPlanDetailIds
	 *            年度计划详情IDs
	 */
	void batchDeleteProcurementDetails(String[] businessPlanDetailIds);

	/**
	 * 根据需求大纲IDs删除物资需求详情信息
	 * 
	 * @param procurementIds
	 *            需求大纲IDs
	 */
	void batchDeleteByProcurementIds(String[] procurementIds);

	/**
	 * 根据物料ID获得指定年度需求大纲的物资需求详情
	 * 
	 * @param procurementId
	 *            需求大纲ID
	 * @param nodeId
	 *            物料种类ID
	 * @param start
	 *            每页起始记录行号
	 * @param limit
	 *            每页显示记录总数
	 * @param type 是否查看物资的采购明细
	 * @return 物资需求详情
	 */
	List<ProcurementDetail> getAnnualDetailByMaterial(String procurementId,
			String nodeId, int start, int limit, String pieceType,
			String materialCatLogId,String type);

	/**
	 * 根据物料ID获得指定零星需求大纲的物资需求详情
	 * 
	 * @param procurementId
	 *            需求大纲ID
	 * @param materialIds
	 *            物料ID
	 * @param start
	 *            每页起始记录行号
	 * @param limit
	 *            每页显示记录总数
	 * @return 物资需求详情
	 */
	List<ProcurementDetail> getSporadicDetailByMaterial(String procurementId,
			String nodeId, int start, int limit, String pieceType,
			String materialCatLogId);
	/**
	 * 通过物料信息获取库存相关数据
	 * @param vo
	 * @return
	 */
	List<Object[]> getWmsInfoByMaterial(ProcurementDetailVo vo);
	/**
	 * 获取累计发放数量
	 * @param vo
	 * @return
	 */
	String getProvideNumber(ProcurementDetailVo vo);
	
	/**
	 * 年度/零星采购计划详情      获取需求单位
	 * @param vo
	 * @return
	 */
	String getDepartment (ProcurementDetail pd);
	
	/**
	 * 通过机型物料获取批次发放信息列表
	 * @param vo
	 * @return
	 */
	public List<Object[]>getProvideInfo(ProcurementDetailVo vo);
	
	/**
	 * 通过机型物料获取批次发放信息列表总数
	 * @param vo
	 * @return
	 */
	public BigDecimal getProvideInfoCount(ProcurementDetailVo vo);

	/**
	 * 根据采购清单ID获得物资需求详情
	 * 
	 * @param purchaseId
	 *            采购清单ID
	 * @param start
	 *            每页起始记录行号
	 * @param limit
	 *            每页显示记录总数
	 * @return 物资需求详情
	 */
	List<ProcurementDetail> getByPurchaseId(String purchaseId, int start,
			int limit,String purchaseType);

	/**
	 * 根据采购清单ID和采购方式获得物资需求详情
	 * 
	 * @param purchaseId
	 *            采购清单ID
	 * @param purchaseType
	 *            采购方式
	 * @return 物资需求详情
	 */
	List<ProcurementDetail> getByPurchaseIdAndType(String purchaseId,
			PurchaseTypeEnum purchaseType);

	/**
	 * 根据采购清单ID获得物资需求详情总记录数
	 * 
	 * @param purchaseId
	 *            采购清单ID
	 * @return 物资需求详情总记录数
	 */
	long countByPurchaseId(String purchaseId);

	/**
	 * 根据物料ID获得指定需求大纲（年度或零星）的物资需求详情总记录数
	 * 
	 * @param procurementId
	 *            需求大纲ID
	 * @param materialIds
	 *            物料ID
	 * @return 物资需求详情总记录数
	 */
	long countProcurementDetailByMaterial(String procurementId,
			String nodeId,String materialCatalogId);
	/**
	 * 根据物料IDs获得指定年度需求大纲的物资需求详情
	 * 
	 
	 * @param materialIds
	 *            物料IDs
 
	 * @return 物资需求详情
	 */
	 long getAnnualDetailByMaterialIdsCount(String procurementId,String nodeId,  String pieceType, String materialCatLogId,String type);

	/**
	 * 批量更新物资需求详情
	 * 
	 * @param procurementDetails
	 *            待更新需求详情集合
	 */
	void batchUpdateProcurementDetails(
			List<ProcurementDetail> procurementDetails);

	/**
	 * 批量更新已展示物资需求详情
	 * 
	 * @param procurementDetails
	 *            待更新需求详情集合
	 */
	void batchUpdateViewProcurementDetails(
			List<ProcurementDetail> procurementDetails);

	/**
	 * 批量增加清单详情
	 * 
	 * @param procurementDetails
	 *            待更新需求详情集合
	 */
	void batchAddProPurchaseDetails(List<ProcurementDetail> procurementDetails);

	/**
	 * 断掉与清单大纲关系
	 * 
	 * @param procurementDetail
	 *            要修改的信息
	 */
	void removePurchaseRelation(String purchaseId);

	/**
	 * 删除与清单大纲关系
	 * 
	 * @param procurementDetail
	 *            要修改的信息
	 * @return
	 */
	void deletePurchaseRelation(String purchaseId);

	/**
	 * 根据采购清单获取需求详情集合
	 * 
	 * @param purchaseId
	 *            采购清单ID
	 * @return 需求详情集合
	 */
	List<ProcurementDetail> getProcurementDetailByPurchase(String purchaseId,
			int start, int limit);

	/**
	 * 根据采购清单获取需求详情总记录数
	 * 
	 * @param purchaseId
	 *            采购清单ID
	 * @return 物资需求详情总记录数
	 */
	long countProcurementDetailByPurchase(String purchaseId);

	/**
	 * 根据合同获取需求详情集合
	 * 
	 * @param contractId
	 *            合同ID
	 * @return 需求详情集合
	 */
	List<ProcurementDetail> getProcurementDetailByContract(ProcurementDetailVo vo);

	/**
	 * 根据合同获取需求详情总记录数
	 * 
	 * @param contractId
	 *            合同ID
	 * @return 物资需求详情总记录数
	 */
	long countProcurementDetailByContract(String contractId,String materialids);

	/**
	 * 根据清单和物料Id获得需求详情集合
	 * 
	 * @param purchase
	 *            ,materialId
	 * 
	 * @return 需求详情集合
	 */
	List<ProcurementDetail> getByPurchaseAndMaterialId(Purchase purchase,
			String materialId);

	/**
	 * 根据物料ID查询需求量
	 * 
	 * @param materialid
	 *            物料ID
	 * @return sum 需求量和
	 */
	String sumRequestValuebyMaterialid(String materialid);

	/**
	 * 根据物料ID查询计划量
	 * 
	 * @param id
	 *            物料ID
	 * @return sum 计划量和
	 */
	String sumPlanValueByMaterialid(String materialid);

	/**
	 * 根据物料ID查询采购比价量
	 * 
	 * @param id
	 *            物料ID
	 * @return sum 采购比价量和
	 */
	String sumProcureValueByMaterialid(String materialid);

	/**
	 * 根据物料ID查询合同签订量
	 * 
	 * @param id
	 *            物料ID
	 * @return sum 合同签订量和
	 */
	String sumContractValueByMaterialid(String materialid);

	/**
	 * 根据比价招标信息查询需求明细对象
	 * 
	 * @param parity
	 *            Parity 对象
	 * @return ProcurementDetail 对象
	 */
	List<ProcurementDetail> getProcurementDetailByParity(Parity parity);

	/**
	 * 根据比价招标信息查询需求明细对象
	 * 
	 * @param parity
	 *            Parity 对象
	 * @return ProcurementDetail 对象
	 */
	void saveOrUpdateProcurementDetail(ProcurementDetail procurementDetail);
	
	/**
	 * 获取指定供应商在指定采购清单中所供应的物资IDs
	 * 
	 * @param purchaseId
	 *            指定采购清单ID
	 * @param vendorId
	 *            指定供应商ID
	 * @return 物资IDs
	 */
	List<String> getMaterialIdsByPurchaseIdAndVendorId(String purchaseId,
			String vendorId,String type);
	/**
	 * 获取统一供应商的采购计划子项的总金额
	 * @param purchaseId 采购计划Id
	 * vendorId 供应商Id
	 * materialId 物资信息Id
	 * @return
	 */
	BigDecimal getSumContractAmount(String purchaseId,String vendorId,String materialId);
	
	public List<ProcurementDetail> getAnnualDetail(ProcurementDetailVo procurementDetailVo);
	
	/**
	 * 获取年度计划小计汇总表数据,并进行资源平衡.
	 * @param procurementDetailVo
	 * @param loginName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ProcurementDetailVo> getAnnualProcumentDetail(ProcurementDetailVo procurementDetailVo) ;
	
	
	/**
	 * 实时保存年度采购计划提交数据
	 */
	public String realtimeSaveAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception;
	
	/**
	 * 提交年度定额计划
	 */
	public String submitAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception;
	
	/**
	 * 获取年度计划需求明细
	 * @param procurementDetailVo
	 * @return
	 * @throws Exception
	 */
	public List<ProcurementDetailVo> getPurchaseForAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception;
	
	/**
	 * 删除年度计划
	 * @param procurementDetailVo
	 * @throws Exception
	 */
	public void removeAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception;
	
	
	List getContractInfoDetailList(ProcurementDetailVo vo);
	
	List getBuinessPlanInfoDetailList(ProcurementDetailVo vo);
	
	String changeToConfirm(ProcurementDetailVo vo);

	ProcurementDetailVo getProcurementDetailById(String id);

    String resolveProcurementDetail(ProcurementDetailVo vo);

}
