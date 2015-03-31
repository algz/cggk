package com.sysware.customize.hd.investment.investSupport.buyerInfo;

import java.util.List;

import com.sysware.customize.hd.investment.investSupport.vo.BuyerVo;

/**
 * @ClassName: BuyerService
 * @Description: 采购员信息模块 服务层接口
 * 
 * @author LIT
 * @date Nov 24, 2011 9:56:13 AM
 * 
 */

public interface BuyerService {

	/**
	 * 获得采购员信息主页面数据列表
	 * @param vo
	 * @return
	 */
	public List<Object> getInfo(BuyerVo vo);
	/**
	 * 采购员信息，分页总数
	 */
	public Long getInfoCount(BuyerVo vo);

	/**
	 * 获得采购员信息中的 供应商信息详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getPriceInfo(BuyerVo oo);
	/**
	 *供应商信息 ，分页总数
	 */
	public Long getPriceInfoCount(BuyerVo oo);

	/**
	 * 获得采购员信息中的 价格与质量详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getPriceAndQualityInfo(BuyerVo oo);
	/**
	 * 价格与质量，分页总数
	 */
	public Long getPriceAndQualityInfoCount(BuyerVo oo);

	/**
	 * 更新采购员信息
	 * @param vo
	 * @return
	 */
	public String saveBuyerInfo(BuyerVo vo);
	
}
