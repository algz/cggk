package com.sysware.customize.hd.investment.procurementExecute.tenderUnits;

import java.util.List;

/**
 * 招标项目上传 Service
 * @author fanzhihui
 *
 */
public interface TenderUnitsService { 
	 
	/**
	 * 获取招标单位
	 */
	List<Object[]> getGridData(TenderUnitsVo vo);
	/**
	 * 获取招标单位总数
	 */
	long getCount(TenderUnitsVo vo);
	
	/**
	 * 保存招标单位信息
	 * @param tenderFileId 招标子项id
	 * @param tenderUnitsID 招标单位主键
	 * @param price 价格
	 * @param constructionUnderPoint 承建下浮点
	 * @param venderId 供应商信息
	 * @param remark 备注
	 */
	void saveTenderUnits(String tenderFileId,String tenderUnitsID[], String price[],String constructionUnderPoint[],String venderId[],String remark[]);
}
