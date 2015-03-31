package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("FixConditionServiceImpl")
public class FixConditionServiceImpl implements FixConditionService {

	@In(create=true,value="FixConditionDaoImpl")
	private FixConditionDao dao;
	
	public List<FixConditionVo> getDepList(FixConditionVo vo){
		return dao.getDepList(vo);
	}
	
	public long getDepListCount(FixConditionVo vo){
		return dao.getDepListCount(vo);
	}
	
	public long getVendorListCount(FixConditionVo vo){
		return dao.getVendorListCount(vo);
	}
	
	public List<FixConditionVo> getVendorList(FixConditionVo vo){
		return dao.getVendorList(vo);
	}
	
	public void insertFixCondition(FixCondition vo){
		dao.insertFixCondition(vo);
	}
	
	public List<FixCondition> getFixCondition(FixConditionVo vo){
		return dao.getFixCondition(vo);
	}
	
	public void updateFixCondition(FixCondition vo){
		dao.updateFixCondition(vo);
	}
}
