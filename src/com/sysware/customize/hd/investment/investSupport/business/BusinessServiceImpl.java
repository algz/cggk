package com.sysware.customize.hd.investment.investSupport.business;

import java.util.List;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;

/**
 * @ClassName: BusinessServiceImpl
 * @Description: 商情与报价模块 服务层接口实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:54:53 AM
 * 
 */

@Name("businessServiceImpl")
public class BusinessServiceImpl implements BusinessService {

	@In(create = true, value = "businessDaoImpl")
	private BusinessDao _dao;

	public List<Object> getInfo(BusinessVo vo) {
		return _dao.getInfo(vo);
	}

	public Long getInfoCount(BusinessVo vo) {
		return _dao.getInfoCount(vo);
	}

	public List<Object> getOtherPriceInfo(BusinessVo vo) {
		return _dao.getOtherPriceInfo(vo);
	}

	public Long getOtherPriceInfoCount(BusinessVo vo) {
		return _dao.getOtherPriceInfoCount(vo);
	}
	
	public List<Object> getHistoryPic(BusinessVo vo) {
		return _dao.getHistoryPic(vo);
	}

	public List<Object> getAnalysePic(BusinessVo vo) {
		return _dao.getAnalysePic(vo);
	}

	public List<Object> getIndagateInfo(BusinessVo vo) {
		return _dao.getIndagateInfo(vo);
	}
	
	public Long getIndagateInfoCount(BusinessVo vo) {
		return _dao.getIndagateInfoCount(vo);
	}

	public List<?> getProjectInfo(BusinessVo vo) {
		// TODO Auto-generated method stub
		return _dao.getProjectInfo(vo);
	}

}
