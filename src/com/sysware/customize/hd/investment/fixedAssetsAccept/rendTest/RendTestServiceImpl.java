package com.sysware.customize.hd.investment.fixedAssetsAccept.rendTest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("RendTestServiceImpl")
public class RendTestServiceImpl implements RendTestService {

	@In(create=true,value="RendTestDaoImpl")
	private RendTestDao dao;
	
	public void insertRendTest(RendTest vo){
		dao.insertRendTest(vo);
	}
	
	public void updateRendTest(RendTest vo){
		dao.updateRendTest(vo);
	}
	
	public RendTest getRendTest(RendTestVo vo){
		return dao.getRendTest(vo);
	}
}
