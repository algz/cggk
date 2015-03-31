package com.sysware.customize.hd.investment.investSupport.buyerInfo;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.investSupport.vo.BuyerVo;

/**
 * @ClassName: BuyerServiceImpl
 * @Description: 采购员信息模块 服务层实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:56:22 AM
 * 
 */

@Name("buyerServiceImpl")
public class BuyerServiceImpl implements BuyerService {

	@In(create = true, value = "buyerDaoImpl")
	private BuyerDao _dao;

	public List<Object> getInfo(BuyerVo vo) {
		return _dao.getInfo(vo);
	}

	public Long getInfoCount(BuyerVo vo) {
		return _dao.getInfoCount(vo);
	}

	public List<Object> getPriceInfo(BuyerVo oo) {
		return _dao.getPriceInfo(oo);
	}

	public Long getPriceInfoCount(BuyerVo oo) {
		return _dao.getPriceInfoCount(oo);
	}

	public List<Object> getPriceAndQualityInfo(BuyerVo oo) {
		return _dao.getPriceAndQualityInfo(oo);
	}

	public Long getPriceAndQualityInfoCount(BuyerVo oo) {
		return _dao.getPriceAndQualityInfoCount(oo);
	}

	public String saveBuyerInfo(BuyerVo vo){
		return _dao.saveBuyerInfo(vo);
	}
	
}
