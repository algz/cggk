package com.sysware.customize.hd.investment.util;

public class CreateBusinessChartXml {

	/**
	 * 获得某个物质每次购买的单价和数量
	 * @return
	 */
	public static String BusinessXml(){
		StringBuilder business = new StringBuilder();
		business.append("<chart palette=\"4\" caption=\"Sales\" sunCaption=\"aaaa\" showvalues=\"0\"");
		business.append(" divLineDecimalPrecision=\"1\" limitsDecimalPrecision=\"1\"");
		business.append(" PYAxisName=\"Revenue\" SYAxisName=\"Quantity\" numberPrefix=\"$\" formatNumberScale=\"0\" numVisiblePlot=\"10\"");
		business.append(">");
		//添加实体
		business.append("<categories>");
		business.append("<category label=\"A\"/>");
		business.append("<category label=\"B\"/>");
		business.append("<category label=\"C\"/>");
		business.append("<category label=\"D\"/>");
		business.append("<category label=\"E\"/>");
		business.append("</categories>");
		business.append("<dataset seriesName=\"价格\">");
		business.append("<set value=\"5854\"/>");
		business.append("<set value=\"1332\"/>");
		business.append("<set value=\"543\"/>");
		business.append("<set value=\"1232\"/>");
		business.append("<set value=\"58421\"/>");
		business.append("</dataset>");
		business.append("<dataset seriesName=\"Profit\" renderAs=\"Ares\" parentYAxis=\"p\">");
		business.append("<set value=\"1741\"/>");
		business.append("<set value=\"1971\"/>");
		business.append("<set value=\"1551\"/>");
		business.append("<set value=\"511\"/>");
		business.append("<set value=\"3712\"/>");
		business.append("</dataset>");
		business.append("<dataset lineThickness=\"3\" seriesName=\"总量\" parentYAxis=\"s\">");
		business.append("<set value=\"174\"/>");
		business.append("<set value=\"197\"/>");
		business.append("<set value=\"155\"/>");
		business.append("<set value=\"5\"/>");
		business.append("<set value=\"37\"/>");
		business.append("</dataset>");
		//结束XMl
		business.append("</chart>");
		return business.toString();
	}
}
