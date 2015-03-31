package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTaskForContract;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("AcceptTaskForContractServiceImpl")
public class AcceptTaskForContractServiceImpl {

	@In(create=true,value="AcceptTaskForContractDaoImpl")
	private AcceptTaskForContractDaoImpl dao;
	
	/**
	 * 获取拥有输入内容的项目编号条目
	 * @param vo
	 * @return
	 */
	public List<AcceptTaskForContractVo> getTaskList(AcceptTaskForContractVo vo){
		return dao.getTaskList(vo);
	}
	
	public long getTaskListCount(AcceptTaskForContractVo vo){
		return dao.getTaskListCount(vo);
	}
	
	public AcceptTaskForContract getAcceptTaskForContract(AcceptTaskForContractVo vo){
		return dao.getAcceptTaskForContract(vo);
	}
	
	public void updateAcceptTaskForContract(AcceptTaskForContract vo){
		dao.updateAcceptTaskForContract(vo);
	}
	
	public void insertAcceptTaskForContract(AcceptTaskForContract vo){
		dao.insertAcceptTaskForContract(vo);
	}
	
	public long getAcceptNumCount(AcceptTaskForContractVo vo){
		return dao.getAcceptNumCount(vo);
	}
}
