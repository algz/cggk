package com.sysware.customize.hd.investment.purchaseRequest.stockPlan;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.FixedStockplanMoreinfoVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.NofixedStockplanMoreInfoVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftMoreinfoVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.StockplanVo;

/**
 * 采购计划 UI交互对象
 * 
 * @author LIT
 * 
 * @date 2011.10.10
 * 
 */

@Name("stockPlan_Remote")
public class StockplanRemote {

	@In(create = true, value = "stockPlan_ServiceImpl")
	StockplanService _Service;

	// 采购草案信息
	@WebRemote
	public GridData<PlandraftVo> getStockdraftData(PlandraftVo voo) {
		GridData<PlandraftVo> g = new GridData<PlandraftVo>();
		List<PlandraftVo> voList = new ArrayList<PlandraftVo>();
		List<Object> list = _Service.getStockdraftData(voo);
		if(list!=null){
			Iterator<Object> it = list.iterator();
			while (it.hasNext()) {
				Object[] obj = (Object[]) it.next();
				PlandraftVo vo = new PlandraftVo();
				vo.setDeclareId(obj[0] + "");
				vo.setDeclarePlanName(obj[1] + "");
				vo.setDeclarePlanNum(obj[2] + "");
				vo.setTotalItem(obj[4] + "");
				vo.setMoney(obj[3] + "");
				vo.setStatus(obj[5] + "");
				vo.setMakeTablePerson(obj[6] + "");
				vo.setMakeTime(obj[7] + "");
				vo.setSubmitTime(obj[8] + "");
				vo.setMakeTablePersonId(obj[9] + "");
				if (obj[10] == null)
					vo.setPropertyType("");
				else if (String.valueOf(obj[10]).equals("1"))
					vo.setPropertyType("固定资产");
				else
					vo.setPropertyType("非固定资产");
				voList.add(vo);
			}
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getStockdraftDataCount(voo));
		return g;
	}

	// 采购草案详单
	@WebRemote
	public GridData<PlandraftMoreinfoVo> getStockdraftDataMoreInfo(
			PlandraftVo voo) {
		GridData<PlandraftMoreinfoVo> g = new GridData<PlandraftMoreinfoVo>();
		List<Object> list = _Service.getStockdraftDataMoreInfo(voo);
		Iterator<Object> it = list.iterator();
		List<PlandraftMoreinfoVo> voList = new ArrayList<PlandraftMoreinfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			PlandraftMoreinfoVo vo = new PlandraftMoreinfoVo();
			vo.setDeclare_detil_id(obj[0] + "");
			vo.setMaterialitemname(obj[1] + "");
			vo.setDepartmentname(obj[2] + "");
			vo.setMaterialStandard(obj[3] + "");
			vo.setTechnicCondition(obj[4] + "");
			vo.setMaterialcatalog_name(obj[5] + "");
			vo.setDeclareType(obj[6] + "");
			
			vo.setAmount(obj[7] + "");
			vo.setDemension(obj[8] + "");
			vo.setQuantity(obj[9] + "");
			vo.setUsedate(obj[10] + "");
			vo.setReport(obj[11] + "");
			vo.setFileName(obj[11] + "");
			vo.setFileId(obj[12] + "");
			if (obj[14] == null || String.valueOf(obj[14]).equals("1"))
				vo.setReportType("可行性报告");
			else if (String.valueOf(obj[14]).equals("2"))
				vo.setReportType("需求报告");
			else if (String.valueOf(obj[14]).equals("3"))
				vo.setReportType("申报依据");
			vo.setUse(obj[16]+"");
			vo.setTaskno(obj[17]+"");
			vo.setMaterialcatalogid(String.valueOf(obj[18]));//物资类别ID
			vo.setDeliveryStatus(obj[19]==null?"":obj[19].toString());
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getStockdraftDataMoreInfoCount(voo));
		return g;
	}

	// 采购计划
	@WebRemote
	public GridData<StockplanVo> getStockPlan(StockplanVo voo) {
		GridData<StockplanVo> g = new GridData<StockplanVo>();
		List<Object> list = _Service.getStockPlan(voo);
		Iterator<Object> it = list.iterator();
		List<StockplanVo> voList = new ArrayList<StockplanVo>();
		Long mark = new Long(1);
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			StockplanVo vo = new StockplanVo();
			vo.setPlanId(obj[0] + "");
			vo.setPlanName(obj[1] + "");
			vo.setPlanNum(obj[2] + "");
			vo.setPlanType(obj[3] + "");
			vo.setStatus(obj[4] + "");
			vo.setMoney(obj[5] + "");
			vo.setMarkPerson(obj[6] + "");
			vo.setMarkTime(obj[7] + "");
			vo.setSubmitTime(obj[8] + "");

			mark++;
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getStockPlanCount(voo));
		return g;
	}

	// 采购执行 招标项目列表
	@WebRemote
	public GridData<FixedStockplanMoreinfoVo> getGridDataByType(PlandraftVo vo) {
		GridData<FixedStockplanMoreinfoVo> g = new GridData<FixedStockplanMoreinfoVo>();
		List<FixedStockplanMoreinfoVo> voList = new ArrayList<FixedStockplanMoreinfoVo>();
		List<Object> list = _Service.getGridDataByType(vo);
		Iterator<Object> it = list.iterator();
		while (it.hasNext()) {
			voList.add(toFixedStockplanMoreinfoVo((Object[]) it.next()));
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getCountByType(vo));
		return g;
	}

	private FixedStockplanMoreinfoVo toFixedStockplanMoreinfoVo(Object[] obj) {
		FixedStockplanMoreinfoVo vo = new FixedStockplanMoreinfoVo();
		vo.setMaterialitemname(obj[0] == null ? "" : String.valueOf(obj[0]));
		vo.setAmount(obj[1] == null ? "" : String.valueOf(obj[1]));
		vo.setDemartment(obj[2] == null ? "" : String.valueOf(obj[2]));
		if (obj[3] != null) {
			if (String.valueOf(obj[3]).equals("2"))
				vo.setProcurementtype("招标");
			else if (String.valueOf(obj[3]).equals("1"))
				vo.setProcurementtype("委托");
			else if (String.valueOf(obj[3]).equals("3"))
				vo.setProcurementtype("定向采购");
			else if (String.valueOf(obj[3]).equals("4"))
				vo.setProcurementtype("委托招标");
			else if (String.valueOf(obj[3]).equals("5"))
				vo.setProcurementtype("自行比价");
		} else
			vo.setProcurementtype("");
		vo.setRownum(obj[4] == null ? "" : String.valueOf(obj[4]));
		vo.setFixid(obj[5] == null ? "" : String.valueOf(obj[5]));
		vo.setTotal(obj[6] == null ? "" : String.valueOf(obj[6]));
		vo.setTaskCode(obj[7] == null ? "" : String.valueOf(obj[7]));
		vo.setPowerConsumption(obj[8] == null ? "" : String.valueOf(obj[8]));
		vo.setArea(obj[9] == null ? "" : String.valueOf(obj[9]));
		vo.setPlant(obj[10] == null ? "" : String.valueOf(obj[10]));
		vo.setInstallationofplant(obj[11] == null ? "" : String
				.valueOf(obj[11]));
		vo.setMaterialstandard(obj[12] == null ? "" : String.valueOf(obj[12]));
		vo.setPrice(obj[13] == null ? "" : String.valueOf(obj[13]));
		vo.setFileId(obj[14] == null ? "" : String.valueOf(obj[14]));
		vo.setFileName(obj[15] == null ? "" : String.valueOf(obj[15]));
		vo.setMaterialId(obj[16] == null ? "" : String.valueOf(obj[16]));
		return vo;
	}

	// 固定资产
	@WebRemote
	public GridData<FixedStockplanMoreinfoVo> getFixedMoreInfo(PlandraftVo voo) {
		GridData<FixedStockplanMoreinfoVo> g = new GridData<FixedStockplanMoreinfoVo>();
		List<Object> list = _Service.getFixedStockPlanMoreInfo(voo);
		Iterator<Object> it = list.iterator();
		List<FixedStockplanMoreinfoVo> voList = new ArrayList<FixedStockplanMoreinfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			FixedStockplanMoreinfoVo vo = new FixedStockplanMoreinfoVo();
			vo.setMaterialitemname(obj[0] + "");
			vo.setMaterialstandard(obj[1] + "");
			vo.setPrice(obj[2] + "");
			vo.setBudget(obj[3] + "");
			vo.setBudout(obj[4] + "");
			vo.setSelfmoney(obj[5] + "");
			vo.setTotal(obj[6] + "");
			vo.setAmount(obj[7] + "");
			// 后台取出的时间类型字符串为 2006-05-04 现要转换为 05/04/2006 or 05-04-2006
			vo.setProcurementdate(getTheDateForJs(String.valueOf(obj[8])) + "");
			vo.setProcurementtype(obj[9] + "");
			vo.setMaterialcatalog_name(obj[10] + "");
			vo.setDemartment(obj[11] + "");
			vo.setRemark(obj[12] + "");
			vo.setFixid(obj[13] + "");
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getFixedStockPlanMoreInfoCount(voo));
		return g;
	}

	// 非固定资产
	@WebRemote
	public GridData<NofixedStockplanMoreInfoVo> getNoFixedMoreInfo(
			PlandraftVo voo) {
		GridData<NofixedStockplanMoreInfoVo> g = new GridData<NofixedStockplanMoreInfoVo>();
		List<Object> list = _Service.getNoFixedStockPlanMoreInfo(voo);
		Iterator<Object> it = list.iterator();
		List<NofixedStockplanMoreInfoVo> voList = new ArrayList<NofixedStockplanMoreInfoVo>();
		BigDecimal Inventory = new BigDecimal("0");
		BigDecimal tobetested = new BigDecimal("0");
		BigDecimal contract = new BigDecimal("0");
		BigDecimal outstanding = new BigDecimal("0");
		BigDecimal Subtotal = new BigDecimal("0");
		BigDecimal temp = new BigDecimal("0");
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			NofixedStockplanMoreInfoVo vo = new NofixedStockplanMoreInfoVo();
			vo.setMaterialitemname(obj[0] + "");
			vo.setDesingnation(obj[1] + "");
			vo.setMaterialstandard(obj[2] + "");
			vo.setTechniccondition(obj[3] + "");
			vo.setDemension(obj[4] + "");
			vo.setPrice(obj[5] + "");
			vo.setLast_year_Consume(obj[6] + "");
			if (obj[8] != null && !String.valueOf(obj[8]).equals(""))
				Inventory = new BigDecimal(String.valueOf(obj[8]));
			if (obj[9] != null && !String.valueOf(obj[9]).equals(""))
				tobetested = new BigDecimal(String.valueOf(obj[9]));
			if (obj[10] != null && !String.valueOf(obj[10]).equals(""))
				contract = new BigDecimal(String.valueOf(obj[10]));
			if (obj[11] != null && !String.valueOf(obj[11]).equals(""))
				outstanding = new BigDecimal(String.valueOf(obj[11]));
//			Subtotal = Inventory.add(tobetested).add(contract).add(outstanding).subtract(new BigDecimal(obj[38] == null?"0":obj[38].toString()));
			Subtotal = Inventory.add(tobetested).add(contract).add(outstanding).add(new BigDecimal(obj[38] == null?"0":obj[38].toString()));
			vo.setSubtotal(Subtotal.toString().equals("0") ? "" : Subtotal
					.toString());
			vo.setInventory(obj[8] + "");
			vo.setTobetested(obj[9] + "");
			vo.setContract(obj[10] + "");
			vo.setOutstanding(obj[11] + "");
			vo.setYear_inventory(obj[12] + "");
//			vo.setHalf_year_consume(obj[13] + "");
			vo.setGap_number(obj[14] + "");
			vo.setDirect_materials(obj[15] + "");
			vo.setAuxiliary_materials(obj[16] + "");
			vo.setReserve(obj[17] + "");
			vo.setNeedNumber(obj[33] == null ? "0" : obj[33] + "");
			//
//			temp = new BigDecimal(vo.getNeedNumber()==null?"0":vo.getNeedNumber()).
//			            subtract(Subtotal);
//			vo.setNumber_applications(obj[18]==null? temp.floatValue()>0?temp.toString():"" : obj[18]+"");
			vo.setNumber_applications(obj[18]==null?"" : obj[18]+"");
			vo.setAmount_applications(obj[19] + "");
			vo.setDeliver(obj[20] + "");
			vo.setWip(obj[21] + "");
			vo.setOther(obj[22] + "");
			vo.setApply_reserve(obj[23] + "");
//			vo.setSubtotal_number(obj[24] ==null? temp.floatValue()<0?String.valueOf(Math.abs(temp.floatValue())):"" :  obj[24]+ "");
			vo.setSubtotal_number(obj[24] ==null? "" :  obj[24]+ "");
			vo.setSubtotal_amount(obj[25] + "");
			vo.setSuper_storage(obj[26] + "");
			vo.setRedeployment(obj[27] + "");
			vo.setVendor_id(obj[28] + "");
			vo.setProcurementtype(obj[29] + "");
			vo.setPlanid(obj[30] + "");
			vo.setMaterialCalalogName(obj[32] + "");
			
			vo.setActualNumber(obj[34] == null ?  temp.floatValue()>0?temp.toString():"" : obj[34] + "");
			if (obj[35] != null) {
				if (String.valueOf(obj[35]).equals("1")) {
					vo.setPurchaseType("比价");
				} else if (String.valueOf(obj[35]).equals("2")) {
					vo.setPurchaseType("招标");
				} else if (String.valueOf(obj[35]).equals("3")) {
					vo.setPurchaseType("直接采购");
				}else if (String.valueOf(obj[35]).equals("4")) {
					vo.setPurchaseType("协议采购");
				}else if (String.valueOf(obj[35]).equals("5")) {
					vo.setPurchaseType("其它采购");
				}
			}
			vo.setVendorName(obj[36] == null ? "" : obj[36] + "");
			vo.setMaterialId(obj[37] == null ? "" : obj[37] + "");
			vo.setOperable(obj[38] == null ? "" : obj[38] + "");
			vo.setNote(obj[39] == null ? "" : obj[39] + ""); 
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			vo.setDeliverydate(obj[41]==null?"":sdf.format(obj[41]));
			vo.setUse(obj[42]==null?"":obj[42].toString());
			vo.setTaskno(obj[43]==null?"":obj[43].toString());
			vo.setDeclare_detil_status(obj[44]==null?"":obj[44].toString());
			vo.setConfirmcontract(obj[45]==null?"":obj[45].toString());
			vo.setDeliveryStatus(obj[50]==null?"":obj[50].toString());
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getNoFixedStockPlanMoreInfoCount(voo));
		return g;
	}

	@WebRemote
	public String exePro(CommonVo vo) {
		return _Service.exePro(vo);
	}

	@WebRemote
	public boolean updateFix(String[] Fixid, String[] Price, String[] Budget,
			String[] Budout, String[] Selfmoney, String[] Total,
			String[] Amount, String[] Procurementdate, String[] Demartment,
			String[] Remark) {
		return _Service.updateFix(Fixid, Price, Budget, Budout, Selfmoney,
				Total, Amount, Procurementdate, Demartment, Remark);
	}

	@WebRemote
	public String updateFixProcurementtype(String fixID[],
			String procurementtype[]) {
		_Service.updateFixProcurementtype(fixID, procurementtype);
		return "{success : true}";
	}

	@WebRemote
	public boolean updateNofix(String[] Planid, String[] Price,
			String[] Subtotal_amount, String[] Super_storage,
			String[] Redeployment, String[] NeedNumber, String[] ActualNumber,
			String[] note, String[] subtotal, String[] contract,
			String[] number_applications, String[] amount_applications,
			String[] subtotal_number,String[] last_year_Consume) {
		return _Service.updateNofix(Planid, Price, Subtotal_amount,
				Super_storage, Redeployment, NeedNumber, ActualNumber,
				note,subtotal, contract, number_applications,
				amount_applications, subtotal_number,last_year_Consume);
	}

	@WebRemote
	public String updateFixInfo(String fixid, String area, String taskCode,
			String price, String powerConsumption, String plant,
			String procurementtype, String installationofplant,
			String fileName, String fileId) {
		_Service.updateFixInfo(fixid, area, taskCode, price, powerConsumption,
				plant, procurementtype, installationofplant, fileName, fileId);
		return "{success : true}";
	}

	@WebRemote
	public String updateProperties(String planId[]) {
		_Service.updateProperties(planId, "2");
		return "{success : true}";
	}

	@WebRemote
	public String getType(CommonVo vo) {
		List<Object> list = _Service.getType(vo);
		StringBuilder data = new StringBuilder("[");
		Iterator<Object> it = list.iterator();
		while (it.hasNext()) {
			Object[] oo = (Object[]) it.next();
			if (oo[0] != null && !"".equals(oo[0])) {
				data.append("['");
				data.append(oo[0]);
				data.append("','");
				data.append(oo[1]);
				data.append("'],");
			}
		}
		if (data.length() != 1)
			data.deleteCharAt(data.length() - 1);
		data.append("]");
		return data.toString();
	}

	@WebRemote
	public String getCode() {
		return _Service.getCode();
	}

	@WebRemote
	/**
	 * 格式化后台取出的Date类型为前台可识别的 02-28-2012类型
	 */
	public static String getTheDateForJs(String inputDateString) {
		// 输入的时间类型的字符串形式如 : "2006-05-04";
		// 如果时间的字符串的形式有所变化这个方法必须修改
		if (inputDateString == null || inputDateString.equals("")
				|| inputDateString.equals("null"))
			return "";
		String returnString = "";
		String year = inputDateString.substring(0, 4);
		String month = inputDateString.substring(5, 7);
		String day = inputDateString.substring(8, 10);
		returnString = month + "-" + day + "-" + year;
		return returnString;
	}

	@WebRemote
	/**
	 * 格式化前台传递到Java层的时间类型 格式化为 2012-02-28类型的时间格式
	 */
	public static Date localDateToString(Date date) {
		// 传入的事件格式是 "02-28-2012" 需要转化成数据库可认的 2012-02-28的时间类型
		Date formatDate = new Date();

		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-mm-dd");
		String b = sdf1.format(date);
		try {
			formatDate = sdf1.parse(b);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return formatDate;
	}

	/**
	 * 生成采购计划
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String generationProcurementPlan(StockplanVo vo) {
		String msg=_Service.generationProcurementPlan(vo);
		return "{success:"+(msg.equals("0")?true:(false+",msg:'"+msg+"'"))+"}";
	}
	
	//导出excel
	@WebRemote
	public List<Object[]> exportDeclareReportGridData(Object obj){
		PlandraftVo vo = new PlandraftVo();
		HttpServletRequest request = (HttpServletRequest) obj;
		vo.setPlanId(request.getParameter("planId"));//采购计划ID
		vo.setPlant(request.getParameter("plan"));//采购计划编号
		return _Service.exportDeclareReportGridData(vo);
	}
	
	
	@WebRemote
	public JSONObject getStockplanInfoDetailList(StockplanVo vo){
		JSONObject json=new JSONObject();
		JSONArray ja=new JSONArray();
		List<Object[]> list=_Service.getStockplanInfoDetailListGrid(vo);
		for(Object[]objs:list){
			JSONObject jo=new JSONObject();
			jo.put("materialitemname", objs[0]);//物资名称
			jo.put("materialitemcode", objs[1]);//物资编号
			jo.put("desingnation", objs[2]);//牌号
			jo.put("materialstandard", objs[3]);//规格
			jo.put("techniccondition", objs[4]);//技术条件
			jo.put("referenceprice", objs[5]);//单价
			jo.put("demension", objs[6]);//技量单位
			jo.put("declare_detil_id", objs[7]);
			jo.put("materialcatalog_name", objs[8]);//物资类别
			jo.put("use", objs[9]);
			jo.put("taskno", objs[10]);//任务编号
			jo.put("declare_detil_status", objs[11]);//申报记录状态
			jo.put("confirmcontract", objs[12]);//确入合同  1确认入库
			jo.put("quantity", objs[13]);//需求量
			jo.put("oldquantity", objs[14]);//申报记录变更前数量
			jo.put("changer", objs[15]);//变更人
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			jo.put("changtime", objs[16]==null?"":sdf.format(objs[16]));//变更时间
			jo.put("changreson", objs[17]);//变更原因
			jo.put("materialcounts", objs[18]);//需求量
			jo.put("actualnumber", objs[19]);//建议采购量
			jo.put("procurementplan_name", objs[20]);//计划名称
			jo.put("procurementplan_code", objs[21]);//计划编号
			jo.put("procurementplan_code", objs[22]);//物资交货状态
			ja.add(jo);
		}
		json.put("totalProperty", vo.getCount());
		json.put("results", ja);
		json.put("success", true);
		return json;
	}
	
}
