package com.sysware.customize.hd.investment.util;

import java.util.List;

import com.sysware.customize.hd.investment.stockInspect.planTypeInspect.PlanTypeInspectVo;
import com.sysware.util.StrUtil;

public class CreatePlanTypeInspectXMl {
	/**
	 * 商情调查-历史成交记录
	 * @param list
	 * @return
	 */
	public static String getAnalysePicXML(List<Object> list){
		StringBuilder pic = new StringBuilder();
		pic.append(" <chart palette='2' caption='历史成交记录' showValues='0'");
		pic.append(" divLineDecimalPrecision='1' limitsDecimalPrecision='1' PYAxisName='价格' SYAxisName='采购量' " );
		pic.append(" formatNumberScale='0'>");
		pic.append("<categories>");
		Object[] obj = null;
		for(int i=0;i<list.size();i++){
		    obj = (Object[]) list.get(i); 
			pic.append("<category label='"+obj[0].toString().replaceAll("-", "")+"' /> ");
		}
		pic.append("</categories> "); 
		pic.append("<dataset seriesName='价格' renderAs='Line' parentYAxis='P'> ");
		for(int i=0;i<list.size();i++){
			obj = (Object[]) list.get(i); 
			pic.append("<set value='"+obj[1]+"' /> ");
		}
		pic.append("</dataset>");
		pic.append("<dataset lineThickness='3' seriesName='采购量' parentYAxis='S'>");
		for(int i=0;i<list.size();i++){
			obj = (Object[]) list.get(i); 
			pic.append("<set value='"+obj[2]+"' /> ");
		}
	    pic.append("</dataset>");
		pic.append("</chart>");
		return pic.toString();
	}
	/**
	 * 组织金额的XML
	 * @param list
	 * @return
	 */
	public static String amoteXMl(List<PlanTypeInspectVo> list){
		StringBuilder amote = new StringBuilder();
		amote.append("<chart palette=\"4\" decimals=\"0\" enableSmartLabels=\"1\" enableRotation=\"0\" bgColor=\"99CCFF,FFFFFF\" bgAlpha=\"40,100\" bgRatio=\"0,100\" bgAngle=\"360\" showBorder=\"1\" startingAngle=\"70\">");
		for (PlanTypeInspectVo vo : list) {
			amote.append("<set label=\"").append(vo.getTypeName()).append("\" value=\"").append(vo.getRamount());
			if(vo.getTypeName().equals("计划内"))
				amote.append("\" isSliced=\"1\"/>");
			else
				amote.append("\"/>");
		}
		amote.append("</chart>");
		return amote.toString();
	}
	
	
	/**
	 * 组织项数的XML
	 * @param list
	 * @return
	 */
	public static String QuantityXMl(List<PlanTypeInspectVo> list){
		StringBuilder quantity = new StringBuilder();
		quantity.append("<chart palette=\"4\" decimals=\"0\" enableSmartLabels=\"1\" enableRotation=\"0\" bgColor=\"99CCFF,FFFFFF\" bgAlpha=\"40,100\" bgRatio=\"0,100\" bgAngle=\"360\" showBorder=\"1\" startingAngle=\"70\">");
		for (PlanTypeInspectVo vo : list) {
			quantity.append("<set label=\"").append(vo.getTypeName()).append("\" value=\"").append(vo.getRquantity());
			if(vo.getTypeName().equals("计划内"))
				quantity.append("\" isSliced=\"1\"/>");
			else
				quantity.append("\"/>");
		}
		quantity.append("</chart>");
		return quantity.toString();
	}
}
