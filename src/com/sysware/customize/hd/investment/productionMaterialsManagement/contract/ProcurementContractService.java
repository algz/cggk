package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

/**
 * 合同管理Service
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-08
 * 
 */
public interface ProcurementContractService {

	/**
	 * 根据条件获取合同
	 * 
	 * @param condition
	 *            查询条件
	 * @return 符合条件的合同
	 */
	List<ProcurementContract> getContractsByCondition(
			ProcurementContractCondition condition);

	/**
	 * 计算符合条件的合同数量
	 * 
	 * @param condition
	 *            统计条件
	 * @return 符合条件的合同数量
	 */
	long countContractsByCondition(ProcurementContractCondition condition);

	/**
	 * 根据ID获得合同对象
	 * 
	 * @param procurementContractId
	 *            合同ID
	 * @return 合同对象
	 */
	ProcurementContract getContractById(String procurementContractId);

	/**
	 * 保存合同对象
	 * 
	 * @param contract
	 *            待保存合同对象
	 * @throws ReduplicatedException
	 *             合同编号重复时抛出异常
	 */
	void saveContract(ProcurementContract contract)
			throws ReduplicatedException;

	/**
	 * 获得合同审签单编号最大值
	 * 
	 * @param procurementType
	 *            采购需求类型
	 * @return 合同审签单编号最大值
	 */
	public int getContractMaxCode(String procurementType);

	/**
	 * 批量更新合同信息
	 * 
	 * @param contractIds
	 *            待更新合同ID
	 */
	void batchUpdateContract(String[] contractIds);

	/**
	 * 批量更新合同信息
	 * 
	 * @param contractIds
	 *            待更新合同ID
	 * @param isApprovalSuccess
	 *            是否审批通过
	 */
	void batchUpdateContract(String[] contractIds, boolean isApprovalSuccess);

	/**
	 * 保存合同及清单关系
	 * 
	 * @param contract
	 *            ,contractPurchase 待保存合同对象
	 */
	void saveContractAndRelation(ProcurementContract contract,
			ContractPurchase contractPurchase);
/**
 * 导入合同详情
 * @param workbook
 * @param formField
 * @param noExistProducts
 * @param newMaterials
 * @throws FileUploadException
 */
	void importContractDetail(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException;
	/**
	 * 导入合同
	 * @param workbook
	 * @param formField
	 * @param noExistProducts
	 * @param newMaterials
	 * @throws FileUploadException
	 */
	public void importContract(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException;
	/**
	 * 获取合同信息，生成合同附件
	 * @param contractId 合同Id
	 * @param contract_model_no 合同模板编号
	 * @return
	 */
    public ArrayList<ArrayList<String>> getContractInfo(String contractId,String contract_model_no);
    
    String delProcurementContractById(ProcurementContractVo procurementContractVo);
}
