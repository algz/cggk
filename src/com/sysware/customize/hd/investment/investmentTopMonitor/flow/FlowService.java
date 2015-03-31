package com.sysware.customize.hd.investment.investmentTopMonitor.flow;

import java.util.List;

/**
 * 流程审批监控Service
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-30
 * 
 */
public interface FlowService {

	/**
	 * 根据物料种类ID查询采购的流程进度
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	List<FlowVo> getMaterialInfo(String id, int start, int limit);

	/**
	 * 根据物料种类ID查询采购比价的流程进度
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	List<FlowVo> getMaterialRadioInfo(String id, int start, int limit);

	/**
	 * 根据物料种类ID查询合同签订的流程进度
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	List<FlowVo> getMaterialContractInfo(String id, int start, int limit);
	
	/**
	 * 根据物料种类ID查询采购的流程进度总数
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	long countMaterialInfo(String id);

	/**
	 * 根据物料种类ID查询采购比价的流程进度总数
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	long countMaterialRadioInfo(String id);

	/**
	 * 根据物料种类ID查询合同签订的流程进度总数
	 * 
	 * @param id
	 *            物料种类ID
	 * @return
	 */
	long countMaterialContractInfo(String id);
}
