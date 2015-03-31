package com.sysware.customize.hd.investment.fixedAssetsAccept.lastTest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("LastTestServiceImpl")
public class LastTestServiceImpl implements LastTestService {

	@In(create=true,value="LastTestDaoImpl")
	private LastTestDao dao;
	
	public void insertLastTest(LastTest vo){
		dao.insertLastTest(vo);
	}
	
	public void updateLastTest(LastTest vo){
		dao.updateLastTest(vo);
	}
	
	public LastTest getLastTest(LastTestVo vo){
		return dao.getLastTest(vo);
	}
}
