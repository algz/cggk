package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
@Name("parity_ParityVendorServiceImpl")
public class ParityVendorServiceImpl implements ParityVendorService {

	@In(create = true, value = "parity_ParityVendorDaoImpl")
	private ParityVendorDao parityVendorDao;
	

	public List<ParityVendor> getParityVendorListByParityDetail(
			ParityVendorCondition parityVendorCondition) {
			return this.parityVendorDao.getParityVendorListByParityDetail(parityVendorCondition);
	}
	
	@Transactional
	public void saveParityVendor(ParityVendor parityVendor) {
		parityVendorDao.save(parityVendor);

	}

	public long countParityVendorByCondition(
			ParityVendorCondition parityVendorCondition) {
		
		return this.parityVendorDao.countParityVendorByCondition(parityVendorCondition);
	}
	@Transactional
	public void deleteParityVendorByParityDetailId(String id) {
		parityVendorDao.deleteParityVendorByParityDetailId(id);
	}

}
