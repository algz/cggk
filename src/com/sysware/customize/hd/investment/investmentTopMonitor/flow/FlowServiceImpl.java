package com.sysware.customize.hd.investment.investmentTopMonitor.flow;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("flow_FlowService")
public class FlowServiceImpl implements FlowService, Serializable {

	private static final long serialVersionUID = 5150985281236380856L;

	@In(create = true, value = "flow_FlowDao")
	public FlowDao flowDao;

	public List<FlowVo> getMaterialInfo(String id, int start, int limit) {
		List<FlowVo> tmp = flowDao.getMaterialInfo(id, start, limit);
		if (tmp == null || tmp != null && tmp.size() == 0) {
			return new ArrayList<FlowVo>();
		}
		for (FlowVo vo : tmp) {
			vo.setMaterialCode("<font color='red'><u>" + vo.getMaterialCode()
					+ "</u></font>");
			vo.setAuthor(convertToHtml("1", vo.getAuthorName(),
					vo.getAuthorDate()));
			vo.setPurcherDirector(convertToHtml(vo.getPurcherDirectorState(),
					vo.getPurcherDirectorName(), vo.getPurcherDirectorDate()));
			vo.setPurcherLeader(convertToHtml(vo.getPurcherLeaderState(),
					vo.getPurcherLeaderName(), vo.getPurcherLeaderDate()));
			vo.setPurcherMinister(convertToHtml(vo.getPurcherMinisterState(),
					vo.getPurcherMinisterName(), vo.getPurcherMinisterDate()));
		}

		return tmp;
	}

	public List<FlowVo> getMaterialRadioInfo(String id, int start, int limit) {
		List<FlowVo> tmp = flowDao.getMaterialRadioInfo(id, start, limit);
		if (tmp == null || tmp != null && tmp.size() == 0) {
			return new ArrayList<FlowVo>();
		}
		for (FlowVo vo : tmp) {
			vo.setMaterialCode("<font color='red'><u>" + vo.getMaterialCode()
					+ "</u></font>");
			vo.setAuthor(convertToHtml("1", vo.getAuthorName(),
					vo.getAuthorDate()));
			vo.setPurcherDirector(convertToHtml(vo.getPurcherDirectorState(),
					vo.getPurcherDirectorName(), vo.getPurcherDirectorDate()));
			vo.setPurcherLeader(convertToHtml(vo.getPurcherLeaderState(),
					vo.getPurcherLeaderName(), vo.getPurcherLeaderDate()));
			vo.setPurcherMinister(convertToHtml(vo.getPurcherMinisterState(),
					vo.getPurcherMinisterName(), vo.getPurcherMinisterDate()));
			vo.setParityPersion(convertToHtml(vo.getParityState(),
					vo.getParityName(), vo.getParityDate()));
		}
		return tmp;
	}

	public List<FlowVo> getMaterialContractInfo(String id, int start, int limit) {
		List<FlowVo> tmp = flowDao.getMaterialContractInfo(id, start, limit);
		if (tmp == null || tmp != null && tmp.size() == 0) {
			return new ArrayList<FlowVo>();
		}
		for (FlowVo vo : tmp) {
			vo.setMaterialCode("<font color='red'><u>" + vo.getMaterialCode()
					+ "</u></font>");
			vo.setAuthor(convertToHtml("1", vo.getAuthorName(),
					vo.getAuthorDate()));
			vo.setVicePresident(convertToHtml(vo.getVicePresidentState(),
					vo.getVicePresidentName(), vo.getVicePresidentDate()));
			vo.setGeneralCounsel(convertToHtml(vo.getGeneralCounselState(),
					vo.getGeneralCounselName(), vo.getGeneralCounselDate()));
			vo.setGeneralManager(convertToHtml(vo.getGeneralManagerState(),
					vo.getGeneralManagerName(), vo.getGeneralManagerDate()));
			vo.setMetalDirector(convertToHtml(vo.getMetalDirectorState(),
					vo.getMetalDirectorName(), vo.getMetalDirectorDate()));
			vo.setMetalLeader(convertToHtml(vo.getMetalLeaderState(),
					vo.getMetalLeaderName(), vo.getMetalLeaderDate()));
			vo.setMetalMinister(convertToHtml(vo.getMetalMinisterState(),
					vo.getMetalMinisterName(), vo.getMetalMinisterDate()));

		}

		return tmp;
	}

	public long countMaterialInfo(String id) {
		return flowDao.countMaterialInfo(id);
	}

	public long countMaterialRadioInfo(String id) {
		return flowDao.countMaterialRadioInfo(id);
	}

	public long countMaterialContractInfo(String id) {
		return flowDao.countMaterialContractInfo(id);
	}

	/**
	 * 数据信息转换为HTML展示
	 * 
	 * @param state
	 *            审批状态
	 * @param name
	 *            审批人姓名
	 * @param date
	 *            审批日期
	 * @return
	 */
	private String convertToHtml(String state, String name, String date) {
		String ico1 = "<img src='icons/u1157.png' width='12' height='12'/>";// 未通过、处理中
		String ico2 = "<img src='icons/u1147.png' width='12' height='12'/>";// 通过
		String str = "";
		if (StringUtils.isEmpty(name))
			return str;
		if (state.equals(""))
			state = "-1";

		switch (Integer.parseInt(state)) {
		case -1:
		case 0:
			str = ico1 + "&nbsp;<font color='red'>" + name + "&nbsp;" + date
					+ "</font> ";
			break;
		case 1:
			str = ico2 + "&nbsp;<font color='blue'>" + name + "&nbsp;" + date
					+ "</font> ";
			break;
		}
		return str;
	}

}
