package com.sysware.customize.hd.investment.purchaseRequest.stockPlan;

import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.StockplanVo;

/**
 * 采购计划 DAO接口类
 * 
 * @author LIT
 * 
 * @date 2011.10.10
 * 
 */

public interface StockplanDao {
	/**
	 * 获得 计划草案数据集
	 * 
	 * @return
	 */
	public List<Object> getStockdraftData(PlandraftVo vo);

	// 分页 总数查询
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

	// 固定资产采购计划详细信息
	public List<Object> getFixedStockPlanMoreInfo(PlandraftVo vo);
	public Long getFixedStockPlanMoreInfoCount(PlandraftVo vo);
	public Long getNoFixedStockPlanMoreInfoCount(PlandraftVo vo);

	// 非固定资产采购计划详细信息
	public List<Object> getNoFixedStockPlanMoreInfo(PlandraftVo vo);

	// 分页 总数查询
	public Long getStockPlanCount(StockplanVo vo);

	public Long getPageCount(String table);

	public String exePro(CommonVo vo);

	public Object get(String id, String col, Object obj);
	
	public List<Object> getType(CommonVo vo);
	
	public String getCode();
	 /**
	  * 采购执行获取 招标项目列表
	  * @param vo
	  * @return
	  */
	 List<Object> getGridDataByType(PlandraftVo vo);
	 /**
	  * 采购执行获取 招标项目列表总数
	  * @param vo
	  * @return
	  */
	 public long getCountByType(PlandraftVo vo);
	 public void updateFixProcurementtype(String[] fixID,
				String[] procurementtype); 
	 public String getProcurementtypeValue(String procurementtype);
	 
		/**
		 * 生成采购计划
		 * @param vo
		 * @return
		 */
		public String generationProcurementPlan(StockplanVo vo);
		
		List<Object[]> exportDeclareReportGridData(PlandraftVo vo);
		
		List getStockplanInfoDetailListGrid(StockplanVo vo);
}
