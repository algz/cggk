package com.sysware.customize.hd.investment.investmentTopMonitor.flow;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

/**
 * 流程审批监控Remote
 * 
 * @author guanqx
 * @version 1.0
 * @create 2011-06-30
 * 
 */
@Name("flow_FlowMonitorRemote")
public class FlowMonitorRemote {

	@In(create = true, value = "flow_FlowService")
	public FlowService flowService;

	// 获取采购清单
	@WebRemote
	public GridData<FlowVo> getPurchaseList(FlowVo vo) {
		GridData<FlowVo> gd = new GridData<FlowVo>();
		List<FlowVo> list = flowService.getMaterialInfo(vo.getId(),
				vo.getStart(), vo.getLimit());
		gd.setTotalProperty(flowService.countMaterialInfo(vo.getId()));
		gd.setResults(list);
		return gd;
	}

	// 获取采购比价
	@WebRemote
	public GridData<FlowVo> getPurchaseRatio(FlowVo vo) {
		GridData<FlowVo> gd = new GridData<FlowVo>();
		List<FlowVo> list = flowService.getMaterialRadioInfo(vo.getId(),
				vo.getStart(), vo.getLimit());
		gd.setTotalProperty(flowService.countMaterialRadioInfo(vo.getId()));
		gd.setResults(list);
		return gd;
	}

	// 获取合同签订
	@WebRemote
	public GridData<FlowVo> getContract(FlowVo vo) {
		GridData<FlowVo> gd = new GridData<FlowVo>();
		List<FlowVo> list = flowService.getMaterialContractInfo(vo.getId(),
				vo.getStart(), vo.getLimit());
		gd.setTotalProperty(flowService.countMaterialContractInfo(vo.getId()));
		gd.setResults(list);
		return gd;
	}

}
