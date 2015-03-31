package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO; 

public interface VendorQualificationDao extends GenericDAO<VendorQualification> {
	/**
	 * 获取供应商列表
	 * @return
	 */
	public List<VendorQualification> getVendorQualificationList(VendorQualificationVo vo);
	/**
	 * 获取供应商列表总数
	 * @return
	 */
	public Long getCount(VendorQualificationVo vo);
	 /**
	  * 获取过期的供应商信息
	  */
	 public List<VendorQualification> getDealVendor(String[] vendorId,String vendors);
}
