package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.math.BigDecimal;
import java.util.List;

public interface VendorQualificationService {
	/**
	 * 保存
	 */ 
	 public void save(VendorQualification info);
	 /**
	  * 删除供应商资质
	  * @param id 供应商资质id
	  */
	 public void delete(String ids[]);
	 /**
	  * 获取供应商资质列表
	  */
	 public List<VendorQualification> getVendorQualificationList(VendorQualificationVo vo);
	 /**
	  * 获取供应商资质列表总数
	  */
	 public Long getCount(
				VendorQualificationVo vo);
	 
	 /**
	  * 获取供应商资质信息
	  */
	 public VendorQualification getVendorQualification(String id);
	 /**
	  * 获取过期的供应商信息
	  */
	 public List<VendorQualification> getDealVendor(String[] vendorId,String vendors);
}
