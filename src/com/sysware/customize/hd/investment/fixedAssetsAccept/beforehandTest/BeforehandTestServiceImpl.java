package com.sysware.customize.hd.investment.fixedAssetsAccept.beforehandTest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("BeforehandTestServiceImpl")
public class BeforehandTestServiceImpl implements BeforehandTestService {

	@In(create=true,value="BeforehandTestDaoImpl")
	private BeforehandTestDaoImpl dao;
	
	public void insertBeforehandTest(BeforehandTest vo){
		dao.insertBeforehandTest(vo);
	}
	
	public void updateBeforehandTest(BeforehandTest vo){
		dao.updateBeforehandTest(vo);
	}
	
	/**
	 * 根据验收任务编号查询是否已经新建了任务
	 * @param vo
	 * @return
	 */
	public int getBeforehandTestForOneCount(BeforehandTestVo vo){
		return dao.getBeforehandTestForOneCount(vo);
	}
	
	/**
	 * 根据验收任务编号获取一条预验收信息
	 * @param vo
	 * @return
	 */
	public BeforehandTest getBeforehandTest(BeforehandTestVo vo){
		return dao.getBeforehandTest(vo);
	}
}
