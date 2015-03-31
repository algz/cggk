package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("AcceptTaskServiceImpl")
public class AcceptTaskServiceImpl implements AcceptTaskService {

	@In(create=true,value="AcceptTaskDaoImpl")
	private AcceptTaskDaoImpl dao;
	
	public List<AcceptTaskVo> getAcceptTask(AcceptTaskVo vo){
		return dao.getAcceptTask(vo);
	}
	
	public List<AcceptTaskVo> getAcceptTaskById(String id) {
		return dao.getAcceptTaskById(id);
	}

	public long getAcceptTaskCount(AcceptTaskVo vo){
		return dao.getAcceptTaskCount(vo);
	}
	
	public void insertAcceptTask(AcceptTask vo){
		dao.insertAcceptTask(vo);
	}
	
	public AcceptTask getOneAcceptTask(AcceptTaskVo vo){
		return dao.getOneAcceptTask(vo);
	}
	
	public AcceptTask getOneAcceptTask(String acceptId){
		AcceptTaskVo vo = new AcceptTaskVo();
		vo.setAcceptId(acceptId);
		return dao.getOneAcceptTask(vo);
	}
	
	/**
	 * 根据编号组删除所有勾选的任务
	 * @param vo
	 */
	public void removeAcceptTask(AcceptTaskVo vo){
		dao.removeAcceptTask(vo);
	}
	
	public void updateAcceptTaskSatate(String id,long state){
		dao.updateAcceptTaskSatate(id, state);
	}
	
	public String getProjectPlan(AcceptTaskVo vo){
		StringBuffer str = new StringBuffer();
		AcceptTaskVo acceptTaskVo = dao.getProjectPlan(vo);
		if(acceptTaskVo.getAssetConnectDay()==0)
			acceptTaskVo.setAssetConnectDay(1);
		if(acceptTaskVo.getTestDay()==0)
			acceptTaskVo.setTestDay(1);
		if(acceptTaskVo.getRendTestDay()==0)
			acceptTaskVo.setRendTestDay(1);
		if(acceptTaskVo.getBeforehandTestDay()==0)
			acceptTaskVo.setBeforehandTestDay(1);
		//初始头信息
		str.append("<chart caption=\"项目进度\" xAxisName=\"项目名称\" yAxisName=\"天数\" showValues=\"0\" decimals=\"0\" formatNumberScale=\"0\" chartRightMargin=\"30\">");
			str.append("<set label=\"资产交接\" value=\"").append(acceptTaskVo.getAssetConnectDay()).append("\" />");
			str.append("<set label=\"验收时间\" value=\"").append(acceptTaskVo.getTestDay()).append("\" />");
			str.append("<set label=\"开箱验收\" value=\"").append(acceptTaskVo.getRendTestDay()).append("\" />");
			str.append("<set label=\"预验收\" value=\"").append(acceptTaskVo.getBeforehandTestDay()).append("\" />");
		str.append("</chart>");
		return str.toString();
	}
	
	public String getContractCode(AcceptTaskVo vo){
		return dao.getContractCode(vo);
	}
}
