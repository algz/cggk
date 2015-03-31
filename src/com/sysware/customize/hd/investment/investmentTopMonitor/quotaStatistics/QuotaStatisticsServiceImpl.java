package com.sysware.customize.hd.investment.investmentTopMonitor.quotaStatistics;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogVo;
import com.sysware.customize.hd.investment.engineeringProject.util.UtilDaoImp;

@Name("quotaStatisticsService")
public class QuotaStatisticsServiceImpl implements QuotaStatisticsService {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	public List<JSONObject>  getExecuteRateData(QuotaStatisticsVo vo) {
		
		List<JSONObject> list=new ArrayList<JSONObject>();
		String[] arr={"有色金属材料大类","非金属材料大类","黑色金属材料大类","机电产品大类","航空成附件大类"};

		for(String s:arr){
			JSONObject jo=new JSONObject();
			
			jo.put("materialCatalogName", s);
			jo.put("annualPlanExecuteRate", countRate(new int[]{1,0},s,vo.getQueryYear()));//年度计划执行率
			jo.put("annualPlanFinishRate", countRate(new int[]{1,1},s,vo.getQueryYear()));//年度计划完成率
			jo.put("scatteredPlanExecuteRate", countRate(new int[]{2,0},s,vo.getQueryYear()));//零星计划执行率
			jo.put("scatteredPlanFinishRate", countRate(new int[]{2,1},s,vo.getQueryYear()));//零星计划完成率
			jo.put("immediateDeliveryRate", countRate(new int[]{2,2},s,vo.getQueryYear()));
			list.add(jo);
		}

		return list;
	}
	
	/**
	 * 统计执行率和完成率
	 * @param rateType 
	 * @param planType int[2] 第一个元素：1年度计划，2零星计划；第二个元素：0执行率；1完成率,2交付率
	 * @param materialClass 物资大类
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @return
	 */
	private BigDecimal countRate(int[] type,String materialClass,String year){
		String sql="";
		switch (type[1]) {
		case 0:
			//执行率
			sql="SELECT COUNT(1) FROM m_planexecuterate M " +
					"WHERE M.TYPE='"+type[0]+"' and m.MATERIALCLASS='"+materialClass+"'"+
					" and to_char(m.createdate,'yyyy')='"+year+"'";
			break;
		case 1:
			//完成率
			sql="SELECT COUNT(1) FROM m_planfinishrate M " +
					" WHERE M.TYPE='"+type[0]+"' and m.MATERIALCLASS='"+materialClass+"'"+
					" and to_char(m.apply_date,'yyyy')='"+year+"'";
			break;
		case 2:
			//交付率
			sql="SELECT COUNT(1) FROM m_lixingimmediatelyrate M " +
					" WHERE m.MATERIALCLASS='"+materialClass+"'"+
					" and to_char(create_date,'yyyy')='"+year+"'";
			break;
		}
		BigDecimal num=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql).uniqueResult();
		sql="SELECT COUNT(1) FROM M_PLANDETAILSUM M " +
				" WHERE M.TYPE='"+type[0]+"' and m.MATERIALCLASS='"+materialClass+"'"+
				" and to_char(m.createdate,'yyyy')='"+year+"'";
		BigDecimal sum=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql).uniqueResult();
		return sum.equals(BigDecimal.ZERO)?BigDecimal.ZERO:new BigDecimal(num.doubleValue()/sum.doubleValue()*100).setScale(2,BigDecimal.ROUND_HALF_UP);
	}
	
	/**
	 * 零星计划数走势图
	 */
	public List<JSONObject> scatteredPlanChart(QuotaStatisticsVo vo){
		String[] arr={"","有色金属材料大类","非金属材料大类","黑色金属材料大类","机电产品大类","航空成附件大类"};
		String sql="select count(1) from m_scatteredPlanChart m where 1=1 ";
		List<JSONObject> list=new ArrayList<JSONObject>();

		for (int i = 0; i < 12; i++) {
			JSONObject jo = new JSONObject();
			for (int j = 0; j < arr.length; j++) {
				BigDecimal count = countChart(sql, arr[j], vo.getQueryYear()+ "-" + String.format("%02d", (i + 1)));
				jo.put("yAxis" + j, count==null?"0":count);
			}
			jo.put("xAxis", (i + 1)+"月");

			list.add(jo);
		}
		return  list;
	}
	
	private BigDecimal countChart(String sql, String materialClass, String year_Moth) {
		String s = sql + " and to_char(m.createdate,'yyyy-mm')='"+ year_Moth+"'";
		if (!materialClass.equals("")) {
			s += " and m.MATERIALCLASS='" + materialClass + "'";
		}
		return (BigDecimal) dao.getHibernateSession().createSQLQuery(s).uniqueResult();
	}
	
	/**
	 * 合同签订金额走势图
	 */
	public List<JSONObject> countContractAmoutChart(QuotaStatisticsVo vo){
		String[] arr={"","有色金属材料大类","非金属材料大类","黑色金属材料大类","机电产品大类","航空成附件大类"};
		String sql="select sum(m.contractamount) from m_contractAmountChart m where 1=1 ";
		List<JSONObject> list=new ArrayList<JSONObject>();
		for (int i = 0; i < 12; i++) {
			JSONObject jo = new JSONObject();
			for (int j = 0; j < arr.length; j++) {
				BigDecimal count = countChart(sql, arr[j], vo.getQueryYear()+ "-" + String.format("%02d", (i + 1)));
				jo.put("yAxis" + j, count==null?"0":count);
			}
			jo.put("xAxis", (i + 1)+"月");
			list.add(jo);
		}
		return  list;
	}
	
	/**
	 * 年度计划预算金额走势图
	 */
	public List<JSONObject> countAnnualBudgetAmoutChart(QuotaStatisticsVo vo){
		String sql="select pd.actualnumber*m.referenceprice sumPrice from t_purchase pur "+
           "inner join t_procurementdetail pd on pur.type=1 and pur.purchaseid=pd.purchaseid "+
           "inner join t_material m on pd.materialid=m.materialid";
		List<JSONObject> list=new ArrayList<JSONObject>();
		Date d=new Date();
		for(int i=2013;i<=d.getYear()+1900;i++){
			JSONObject jo=new JSONObject();
			String s=sql+" and to_char(pur.createdate,'yyyy')='"+i+"'";
			BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery(s).uniqueResult();
		    jo.put("xAxis", i);
		    jo.put("yAxis", count);
		    list.add(jo);
		}	
		return  list;
	}
	
}
