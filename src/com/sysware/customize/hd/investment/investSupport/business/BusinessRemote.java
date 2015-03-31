package com.sysware.customize.hd.investment.investSupport.business;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;
import com.sysware.customize.hd.investment.util.CreateBusinessChartXml;
import com.sysware.customize.hd.investment.util.CreatePlanTypeInspectXMl;
import com.sysware.customize.xac.productionMgm.chartEntity.Graph;
import com.sysware.util.StrUtil;

/**
 * @ClassName: BusinessRemote
 * @Description: 商情与报价模块 UI交互类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:48:40 AM
 * 
 */

@Name("businessRemote")
public class BusinessRemote {

	@In(create = true, value = "businessServiceImpl")
	private BusinessService _service;

	@WebRemote
	public GridData<BusinessVo> getInfo(BusinessVo oo) {
		GridData<BusinessVo> g = new GridData<BusinessVo>();
		List<Object> list = _service.getInfo(oo);
		Iterator<Object> it = list.iterator();
		List<BusinessVo> voList = new ArrayList<BusinessVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			BusinessVo vo = new BusinessVo();
			vo.setCode(String.valueOf(obj[0]));
			vo.setName(String.valueOf(obj[1]));
			vo.setScale(String.valueOf(obj[2]));
			vo.setPartType(String.valueOf(obj[3]));
			vo.setNewPrice(String.valueOf(obj[4]));
			vo.setPriceDate(String.valueOf(obj[5]));
			vo.setId(String.valueOf(obj[6]));//物料ID
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public GridData<BusinessVo> getIndagateInfo(BusinessVo oo) {
		GridData<BusinessVo> g = new GridData<BusinessVo>();
		List<Object> list = _service.getIndagateInfo(oo);
		Iterator<Object> it = list.iterator();
		List<BusinessVo> voList = new ArrayList<BusinessVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			BusinessVo vo = new BusinessVo();
			vo.setCode(String.valueOf(obj[0]));
			vo.setName(String.valueOf(obj[1]));
			vo.setPartType(String.valueOf(obj[2]));
			vo.setType(String.valueOf(obj[3]));
			vo.setRatio(String.valueOf(obj[4]));
			vo.setContractCode(String.valueOf(obj[5]));
			vo.setContractName(String.valueOf(obj[6]));
			vo.setNewPrice(String.valueOf(obj[7]));
			vo.setMaterialid(String.valueOf(obj[8]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getIndagateInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public GridData<BusinessVo> getOtherPriceInfo(BusinessVo oo) {
		GridData<BusinessVo> g = new GridData<BusinessVo>();
		List<Object> list = _service.getOtherPriceInfo(oo);
		Iterator<Object> it = list.iterator();
		List<BusinessVo> voList = new ArrayList<BusinessVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			BusinessVo vo = new BusinessVo();
			vo.setQname(String.valueOf(obj[0]));
			vo.setCode(String.valueOf(obj[1]));
			vo.setName(String.valueOf(obj[2]));
			vo.setScale(String.valueOf(obj[3]));
			vo.setType(String.valueOf(obj[4]));
			vo.setNewPrice(String.valueOf(obj[5]));
			vo.setPriceDate(String.valueOf(obj[6]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getOtherPriceInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public String getHistoryPic(BusinessVo vo) {
		List<Object> list = _service.getHistoryPic(vo);
		
		List<String> data = new ArrayList<String>();

		List<String> labels = new ArrayList<String>();
		List<String> links = new ArrayList<String>();

		List<Integer> tempList = new ArrayList<Integer>();
		
		
		for (int i = 0; i < list.size(); i++) {
			Object[] obj = (Object[]) list.get(i);
			if(!StrUtil.isNullOrEmpty(String.valueOf(obj[1]))){
				data.add(obj[1] + "");
				labels.add(obj[0] + "");
				tempList.add(obj[1] == null?0:Integer.valueOf(String.valueOf((obj[1]))));
			}
		}

		Graph g = new Graph();

		g.title("历史成交记录", "{font-size: 12px;}");
		g.set_data(data);

		g.set_links(links);
		g.set_x_labels(labels);

		g.line(8, "0x9933CC", "价格趋势", 12, 2); // （线的粗细，颜色，名称，字的大小，未知）
		//g.line(8, "0x006699", "采购量", 12, 2); // （线的粗细，颜色，名称，字的大小，未知）
		//g.line_hollow("8", "6", "0x80a033", "工装生产完成数量", "12"); // (粗细，热点的大小，颜色，名称，名称在上面的字体大小)
		
		//g.line_dot("50", "150", "0x006699");

		g.set_x_label_style("12", "#FF0000", 2, list.size()/15, ""); // (
		// 字的大小，颜色，面板倾斜度，隔几个坐标显示汉字，未知)
		g.set_x_legend("历史成交记录，统计图", 12, "#736AFF"); // （名称，字的大小，颜色）

		g.set_y_max(this.getMaxNum(tempList));
		g.y_label_steps(10);

		return g.render();
	}
	
	/**
	 * 获得一个物资在一段时间的价格曲线
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetBusinessChart(BusinessVo vo){
//		System.out.println("双轴线结果："+CreateBusinessChartXml.BusinessXml());
		return CreateBusinessChartXml.BusinessXml();
	}
	
	@WebRemote
	public String getAnalysePic(BusinessVo vo) {
		List<Object> list = _service.getAnalysePic(vo); 
		return  CreatePlanTypeInspectXMl.getAnalysePicXML(list);
	}
	
	// 随机颜色
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
	
	private Integer getMaxNum(List<Integer> temp) {
		Integer mark = 10;
		for (Integer oo : temp) {
			if (oo > mark) {
				mark = oo;
			}
		}
		if (mark > 15) {
			return (mark / 15) * 20;
		} else {
			return mark;
		}

	}
	
	@SuppressWarnings("unchecked")
	@WebRemote
	public GridData<?> getProjectInfo(BusinessVo vo){
		GridData gd=new GridData();
		List<?> list=_service.getProjectInfo(vo);
		gd.setTotalProperty(vo.getCount());
		gd.setResults(list);
		gd.setSuccess(true);
		return gd;
	}
	
}
