package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;

import java.util.List;

public interface ParityService {

	/**
	 * 保存比价、招投信息记录
	 */
	public Parity saveParity(Parity parity);

	/**
	 * 更新比价、招投信息记录
	 */
	public void updateParity(Parity parity);
	
	/**
	 * 根据ID获得比价、招投信息对象
	 */
	public Parity getParityById(String parityId);

	/**
	 * 根据条件查询比价、招投信息记录
	 * 
	 * @param parityCondition
	 *            条件
	 * @return 采购大纲
	 */
	public List<Parity> getParityListByCondition(ParityCondition parityCondition);

	/**
	 * 根据条件查询比价、招投信息记录数
	 * 
	 * @param parityCondition
	 *            条件
	 * @return 比价、招投信息记录数
	 */
	public Long getCountByCondition(ParityCondition parityCondition);

	/**
	 * 获得到比价、招投信息的采购编号的数字编码部分
	 * 
	 * @param purchaseType
	 *            采购方式
	 * 
	 * @param procurementType
	 *            采购需求来源类型
	 * 
	 * @return 比价、招投信息的采购编号的数字编码部分
	 */
	public int getParityMaxCode(String purchaseType, String procurementType);

	/**
	 * 比价、招投标指定供应商
	 * 
	 * @param parityId
	 *            比价、招投标清单ID
	 * @param vendorId
	 *            供应商ID
	 * @param vendorName
	 *            供应商名称
	 *  @param price
	 *           供应商报价
	 * 
	 */
	public void assignVendorToParity(String parityId, String vendorId, String vendorName,String price);

	/**
	 * 更新采购计划审批状态
	 * 
	 * @param parityIDs
	 *            采购比价ID
	 * 
	 * @param flag
	 *            审批状态
	 */
	public void updateProperties(String[] parityIDs, String flag);

	/**
	 * 生成合同
	 * 
	 * @param parities
	 *            待生成合同的清单
	 */
	public void generateContractFromParities(List<Parity> parities);

	/**
	 * 根据合同id获取与合同匹配的可添加物资列表
	 * @param vo
	 * @return
	 */
	public List<ParityVo> getParityGridDataById(ParityVo vo)throws Exception;
	
	/**
	 * 是保存合同关联关系表
	 * @param ids parityid
	 * @param id 合同id
	 * @throws Exception
	 */
	public void submitMaterial(String[] ids,String id)throws Exception;
	
	/**
	 * 删除合同物资关联关系
	 * @param vo
	 * @throws Exception
	 */
	public void delMaterialFromContract(ParityVo vo)throws Exception;
	
	/**
	 * 从采购策略表里删除物资
	 * @param vo
	 * @return
	 */
	String delMaterialFromParity(ParityVo vo);
	
}
