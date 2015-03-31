package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

@Name("parity_ParityVendorRemote")
public class ParityVendorRemote {

	@In(create = true, value = "parity_ParityVendorServiceImpl")
	private ParityVendorService parityVendorService;
	
	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter(null);
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}
	/**
	 * 获取采购供应商列表
	 * 
	 * @param parityVendorVo ParityVendorVo
	 * 
	 * @return gridData GridData<ParityVendorVo>
	 * */
	@WebRemote
	public GridData<ParityVendorVo> getParityVendorList(
			ParityVendorVo parityVendorVo) throws Exception{
		 
		ParityVendorCondition condition=new ParityVendorCondition();
		BeanUtils.copyProperties(condition, parityVendorVo);
		List<ParityVendor> parityVendors=this.parityVendorService.getParityVendorListByParityDetail(condition);
		
		List<ParityVendorVo> parityVendorVos= new ArrayList<ParityVendorVo>();
		
		for(ParityVendor par:parityVendors){
			ParityVendorVo temp=new ParityVendorVo();
			Vendor vendor=par.getVendor();
			BeanUtils.copyProperties(temp, par);
			BeanUtils.copyProperties(temp, vendor);
			temp.setParityDetailId(par.getParityDetail().getParityDetailId());
			parityVendorVos.add(temp);
		}
		
		GridData<ParityVendorVo> gridData = new GridData<ParityVendorVo>();
		gridData.setResults(parityVendorVos);
		gridData.setTotalProperty(this.parityVendorService.countParityVendorByCondition(condition));
		return gridData;
		
	}
	
}
