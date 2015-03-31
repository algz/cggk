package com.sysware.customize.hd.investment.purchaseRequest.zongti;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.xac.productionMgm.chartEntity.Graph;

/**
 * 综合分析 UI交互对象
 * 
 * @author LIT
 * 
 */

@Name("zongtiControl_Remote")
public class ZongtiControlRemote {

	@In(create = true, value = "ZongTi_ServiceImpl")
	ZongtiControlService _Service;

	// 统计图

	@WebRemote
	public String getProjectBar() {
		Graph g = new Graph();
		List<String> data = new ArrayList<String>();
		List<String> labels = new ArrayList<String>();
		List<String> links = new ArrayList<String>();
		List<String> colors = new ArrayList<String>();

		Object[] obj = _Service.getForAreapic();

		data.add(obj[0] + "");
		labels.add("计划内");
		links.add("#");
		colors.add(this.getRandColorCode());

		data.add(obj[1] + "");
		labels.add("非应急");
		links.add("#");
		colors.add(this.getRandColorCode());

		data.add(obj[2] + "");
		labels.add("应急类");
		links.add("#");
		colors.add(this.getRandColorCode());

		g.title("采购情况", "{font-size: 12px;}");
		g.pie(80, "#505050", "{font-size: 12px; color: #404040;}");
		g.pie_values(data, labels, links);

		g.pie_slice_colours(colors);
		g.set_tool_tip("#val# ,项<br>");
		return g.render();
	}

	@WebRemote
	public String getBarInfo(ZongtiControlVo voo) {
		Object[] obj = _Service.getForAreapic();
		StringBuilder data = new StringBuilder("");
		// StringBuilder data = new StringBuilder("[");
		// data.append("one:" + obj[0]);
		// data.append("',two:'" + obj[1]);
		// data.append("',three:'" + obj[2]);
		// data.append("',p1:'" + Long.parseLong(obj[0] + "")
		// / Long.parseLong(obj[3] + ""));
		// data.append("',p2:'" + Long.parseLong(obj[1] + "")
		// / Long.parseLong(obj[3] + ""));
		// data.append("',p3:'" + Long.parseLong(obj[2] + "")
		// / Long.parseLong(obj[3] + ""));
		// data.append("]");
		double p1 = (double) Long.parseLong(obj[0] + "")
				/ Long.parseLong(obj[3] + "");
		double p2 = (double) Long.parseLong(obj[1] + "")
				/ Long.parseLong(obj[3] + "");
		double p3 = (double) Long.parseLong(obj[2] + "")
				/ Long.parseLong(obj[3] + "");

		DecimalFormat format = new DecimalFormat("0.00%");

		data
				.append("<br><table style=\"border-collapse:collapse; border:1px,black\" ><tr bgcolor=\"#f4f4f4\"><td width=\"100\">类别</td><td width=\"100\">项数</td><td width=\"100\">百分比</td></tr>");
		data.append("<tr><td>计划内</td><td>" + obj[0] + "</td><td>"
				+ format.format(p1) + "</td></tr>");
		data.append("<tr><td>非应急</td><td>" + obj[1] + "</td><td>"
				+ format.format(p2) + "</td></tr>");
		data.append("<tr><td>应急类</td><td>" + obj[2] + "</td><td>"
				+ format.format(p3) + "</td></tr></table>");
		return data.toString();
	}

	// 详单
	@WebRemote
	public GridData<ZongtiControlVo> getContractData(ZongtiControlVo voo) {
		GridData<ZongtiControlVo> g = new GridData<ZongtiControlVo>();
		List<Object> list = _Service.getContractData(voo);
		Iterator<Object> it = list.iterator();
		List<ZongtiControlVo> voList = new ArrayList<ZongtiControlVo>();
		int mark = 0;
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			ZongtiControlVo vo = new ZongtiControlVo();
			vo.setId(mark + "");
			vo.setMatterName(obj[1] + "");
			vo.setRuleType(obj[2] + "");
			vo.setPropertiesType(obj[3] + "");
			vo.setStockType(obj[4] + "");
			vo.setNum(obj[5] + "");
			vo.setApplyTime(obj[6] + "");
			vo.setOneMoney(obj[7] + "");
			vo.setTotalMoney(obj[8] + "");
			vo.setDept(obj[9] + "");
			vo.setPurpose(obj[10] + "");
			vo.setCause(obj[11] + "");
			vo.setExeReport(obj[12] + "");
			vo.setCheckFile(obj[13] + "");
			mark++;
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getContractDataCount(voo));
		return g;
	}

	// 为统计图表获得随机颜色
	private String getRandColorCode() {
		String r, g, b;
		Random random = new Random();
		r = Integer.toHexString(random.nextInt(256)).toUpperCase();
		g = Integer.toHexString(random.nextInt(256)).toUpperCase();
		b = Integer.toHexString(random.nextInt(256)).toUpperCase();

		r = r.length() == 1 ? "0" + r : r;
		g = g.length() == 1 ? "0" + g : g;
		b = b.length() == 1 ? "0" + b : b;

		return r + g + b;
	}

	// 为柱状图和折线图取合理的Y轴最大值
	private Integer getMaxNum(List<Integer> temp) {
		Integer mark = 10;
		for (Integer oo : temp) {
			if (oo > mark) {
				mark = oo;
			}
		}
		if (mark > 10) {
			return (mark / 10) * 20;
		} else {
			return mark;
		}
	}
}
