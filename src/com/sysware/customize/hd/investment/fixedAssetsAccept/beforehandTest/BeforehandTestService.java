package com.sysware.customize.hd.investment.fixedAssetsAccept.beforehandTest;

public interface BeforehandTestService {

	void insertBeforehandTest(BeforehandTest vo);
	
	/**
	 * 根据验收任务编号查询是否已经新建了任务
	 * @param vo
	 * @return
	 */
	int getBeforehandTestForOneCount(BeforehandTestVo vo);
	
	/**
	 * 根据验收任务编号获取一条预验收信息
	 * @param vo
	 * @return
	 */
	BeforehandTest getBeforehandTest(BeforehandTestVo vo);
	
	void updateBeforehandTest(BeforehandTest vo);
}
