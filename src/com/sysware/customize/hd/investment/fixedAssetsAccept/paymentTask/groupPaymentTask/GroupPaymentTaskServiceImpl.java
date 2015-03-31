package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("GroupPaymentTaskServiceImpl")
public class GroupPaymentTaskServiceImpl implements GroupPaymentTaskService {

	@In(create=true,value="GroupPaymentTaskDaoImpl")
	private GroupPaymentTaskDao dao;
	
	public List<GroupPaymentTaskVo> getUserList(GroupPaymentTaskVo vo){
		return dao.getUserList(vo);
	}
	
	public long getUserListCount(GroupPaymentTaskVo vo){
		return dao.getUserListCount(vo);
	}
	
	public void insertGroupPaymentTask(GroupPaymentTask vo){
		dao.insertGroupPaymentTask(vo);
	}
	
	public void updateGroupPaymentTask(GroupPaymentTask vo){
		dao.updateGroupPaymentTask(vo);
	}
	
	public GroupPaymentTask getGroupPaymentTask(GroupPaymentTaskVo vo){
		return dao.getGroupPaymentTask(vo);
	}
	
	public GroupPaymentTask getGroupPaymentTask(String pgId){
		GroupPaymentTaskVo vo = new GroupPaymentTaskVo();
		vo.setPgId(pgId);
		return dao.getGroupPaymentTask(vo);
	}
	
	public void deleteGroupPaymentTask(String pgIds){
		dao.deleteGroupPaymentTask(pgIds);
	}
	
	public void updateState(String ids,long state){
		dao.updateState(ids, state);
	}
}
