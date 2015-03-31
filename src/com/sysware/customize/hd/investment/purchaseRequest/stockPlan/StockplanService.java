package com.sysware.customize.hd.investment.purchaseRequest.stockPlan;

import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.StockplanVo;

/**
 * 采购计划 业务逻辑接口
 * 
 * @author LIT
 * 
 * @date 2011.10.10
 * 
 */

public interface StockplanService {

	/**
	 * 获得 计划草案数据集
	 * 
	 * @return
	 */
	public List<Object> getStockdraftData(PlandraftVo vo);

	// page 总数查询
	public Long getStockdraftDataCount(PlandraftVo vo);

	// 计划草案 详细信息
	public List<Object> getStockdraftDataMoreInfo(PlandraftVo vo);

	public Long getStockdraftDataMoreInfoCount(PlandraftVo vo);

	/**
	 * 获得 采购计划 数据集
	 * 
	 * @return
	 */
	public List<Object> getStockPlan(StockplanVo vo);

	public String getProcurementPlanInfo(String procurementPlanID);

	// 固定资产采购计划详细信息
	public List<Object> getFixedStockPlanMoreInfo(PlandraftVo vo);

	public Long getFixedStockPlanMoreInfoCount(PlandraftVo vo);

	public Long getNoFixedStockPlanMoreInfoCount(PlandraftVo vo);

	// 非固定资产采购计划详细信息
	public List<Object> getNoFixedStockPlanMoreInfo(PlandraftVo vo);

	// page 总数查询
	public Long getStockPlanCount(StockplanVo vo);

	public Long getPageCount(String table);

	public String exePro(CommonVo vo);

	public List<Object> getType(CommonVo vo);

	public String getCode();

	/**
	 * 采购执行获取 招标项目列表总数
	 * 
	 * @param vo
	 * @return
	 */
	List<Object> getGridDataByType(PlandraftVo vo);

	/**
	 * 采购执行获取 招标项目列表总数
	 * 
	 * @param vo
	 * @return
	 */
	public long getCountByType(PlandraftVo vo);

	public boolean updateFix(String[] Fixid, String[] Price, String[] Budget,
			String[] Budout, String[] Selfmoney, String[] Total,
			String[] Amount, String[] Procurementdate, String[] Demartment,
			String[] Remark);

	public boolean updateNofix(String[] Planid, String[] Price,
			String[] Subtotal_amount, String[] Super_storage,
			String[] Redeployment, String[] NeedNumber, String[] ActualNumber,
			String[] note, String[] subtotal, String[] contract,
			String[] number_applications, String[] amount_applications,
			String[] subtotal_number,String[] last_year_Consume);

	/**
	 * 批量修改招标项目类型
	 * 
	 * @param fixID
	 *            固定资产采购计划子项ID
	 * @param procurementtype
	 *            招标类型
	 * @return
	 */
	public void updateFixProcurementtype(String fixID[],
			String procurementtype[]);

	/**
	 * 招标任务列表添加部分信息
	 * 
	 * @param
	 * @return
	 */
	public void updateFixInfo(String fixid, String area, String taskCode,
			String price, String powerConsumption, String plant,
			String procurementtype, String installationofplant,
			String fileName, String fileId);

	/**
	 * 修改采购计划状态
	 * 
	 * @param planID
	 *            采购计划Id
	 * @param status
	 *            状态
	 */
	void updateProperties(String planID[], String status);

	
	/**
	 * 生成采购计划
	 * @param vo
	 * @return
	 */
	public String generationProcurementPlan(StockplanVo vo);
	
	List<Object[]> exportDeclareReportGridData(PlandraftVo vo);
	
	List getStockplanInfoDetailListGrid(StockplanVo vo);
}
