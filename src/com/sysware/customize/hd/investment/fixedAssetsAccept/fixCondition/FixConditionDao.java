package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

import java.util.List;

public interface FixConditionDao {

	List<FixConditionVo> getDepList(FixConditionVo vo);
	
	long getDepListCount(FixConditionVo vo);
	
	List<FixConditionVo> getVendorList(FixConditionVo vo);
	
	long getVendorListCount(FixConditionVo vo);
	
	void insertFixCondition(FixCondition vo);
	
	List<FixCondition> getFixCondition(FixConditionVo vo);
	
	void updateFixCondition(FixCondition vo);
}
