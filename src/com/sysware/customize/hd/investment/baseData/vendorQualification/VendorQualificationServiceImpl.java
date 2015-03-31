package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.math.BigDecimal;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

@Name("vendorQualificationServiceImpl")
public class VendorQualificationServiceImpl implements VendorQualificationService{
	@In(create = true,value="vendorQualificationDaoImpl")
	VendorQualificationDao vendorQualificationDaoImpl;
	@Transactional
	public void delete(String ids[]) {
		for(String id: ids)
			vendorQualificationDaoImpl.remove(id);
	}

	public List<VendorQualification> getVendorQualificationList(
			VendorQualificationVo vo) {
		return vendorQualificationDaoImpl.getVendorQualificationList(vo);
	}
	public Long getCount(
			VendorQualificationVo vo) {
		return vendorQualificationDaoImpl.getCount(vo);
	}
	@Transactional
	public void save(VendorQualification info) {
		if(info.getId()==null || info.getId().equals(""))
			vendorQualificationDaoImpl.save(info);
		else
			vendorQualificationDaoImpl.getHibernateSession().merge(info);
	}

	public VendorQualification getVendorQualification(String id) {
		return vendorQualificationDaoImpl.get(id);
	}

	public List<VendorQualification> getDealVendor(String[] vendorId,String vendors) {
		return vendorQualificationDaoImpl.getDealVendor(vendorId,vendors);
	}

}
