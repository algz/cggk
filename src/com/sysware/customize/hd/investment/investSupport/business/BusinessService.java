package com.sysware.customize.hd.investment.investSupport.business;

import java.util.List;

import net.sf.json.JSONObject;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;

/**
 * @ClassName: BusinessService
 * @Description: 商情与报价模块 服务层接口
 * 
 * @author LIT
 * @date Nov 24, 2011 9:54:36 AM
 * 
 */

public interface BusinessService {

	/**
	 * 获得报价分析主页面信息
	 * 
	 * @param vo
	 * @return
	 */
	public List<Object> getInfo(BusinessVo vo);
	
	/**
	 * 报价分析，分页总数
	 */
	public Long getInfoCount(BusinessVo vo);

	/**
	 * 获取同行他价信息
	 * @param vo
	 * @return
	 */
	public List<Object> getOtherPriceInfo(BusinessVo vo);

	/**
	 * 同行他价，分页总数 
	 */
	public Long getOtherPriceInfoCount(BusinessVo vo);
	
	/**
	 * 获得历史趋势折线图统计数据
	 * @param vo
	 * @return
	 */
	public List<Object> getHistoryPic(BusinessVo vo);
	
	/**
	 * 获得商情调查折线图统计数据
	 * @param vo
	 * @return
	 */
	public List<Object> getAnalysePic(BusinessVo vo);
	
	/**
	 * 获得商情调查列表数据集
	 * @param vo
	 * @return
	 */
	public List<Object> getIndagateInfo(BusinessVo vo) ;
	
	/**
	 * 商情调查，分页总数
	 */
	public Long getIndagateInfoCount(BusinessVo vo) ;
	
	/**
	 * 项目详情
	 * @param vo
	 * @return
	 */
	public List<?> getProjectInfo(BusinessVo vo);
	
}
