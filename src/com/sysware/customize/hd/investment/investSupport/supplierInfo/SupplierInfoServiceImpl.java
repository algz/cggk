package com.sysware.customize.hd.investment.investSupport.supplierInfo;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.investSupport.vo.SupplierInfoVo;

/**
 * @ClassName: SupplierInfoServiceImpl
 * @Description: 供应商资讯模块 Service 层实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:59:54 AM
 * 
 */

@Name("supplierInfoServiceImpl")
public class SupplierInfoServiceImpl implements SupplierInfoService {

	@In(create = true, value = "supplierInfoDaoImpl")
	private SupplierInfoDao _dao;

	public List<Object> getInfo(SupplierInfoVo vo) {
		return _dao.getInfo(vo);
	}

	public Long getInfoCount(SupplierInfoVo vo) {
		return _dao.getInfoCount(vo);
	}

	public List<Object> getInfoForBuyer(SupplierInfoVo vo) {
		return _dao.getInfoForBuyer(vo);
	}

	public Long getInfoForBuyerCount(SupplierInfoVo vo) {
		return _dao.getInfoForBuyerCount(vo);
	}

	public List<Object> getGradeInfo(SupplierInfoVo vo) {
		return _dao.getGradeInfo(vo);
	}

	public Long getGradeInfoCount(SupplierInfoVo vo) {
		return _dao.getGradeInfoCount(vo);
	}

	public List<Object> getSupplyMaterialInfo(SupplierInfoVo vo) {
		return _dao.getSupplyMaterialInfo(vo);
	}

	public Long getSupplyMaterialInfoCount(SupplierInfoVo vo) {
		return _dao.getSupplyMaterialInfoCount(vo);
	}

	public List<Object> getGradeDeptInfo(SupplierInfoVo vo) {
		return _dao.getGradeDeptInfo(vo);
	}

	public List<?> getSupplierOfContractInfo(SupplierInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getSupplierOfContractInfo(vo);
	}

	public List<Object> getGradeMoreInfo(SupplierInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getGradeMoreInfo(vo);
	}
}
