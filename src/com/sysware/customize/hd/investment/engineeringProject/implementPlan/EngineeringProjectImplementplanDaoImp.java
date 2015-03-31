package com.sysware.customize.hd.investment.engineeringProject.implementPlan;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAO;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.util.FormatDate;
import com.sysware.customize.hd.investment.util.RoleEnum;
import com.sysware.customize.hd.investment.util.UtilForHD;



@Name("engineeringProject_EngineeringProjectImplementplanDaoImp")
public class EngineeringProjectImplementplanDaoImp extends GenericDAOImpl<EngineeringProjectPlanModel> 
    implements EngineeringProjectImplementplanDao {
	
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<EngineeringProjectPlanModel> engineeringProjectImplementplanDaoImp;
	
	
	@In(create = true, value = "untilsDAOImp")
	private UtilDAO utilDAO;
	
	@In(create = true)
	Identity identity;
	
	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EngineeringProjectPlanVo> getGridData(EngineeringProjectPlanVo vo, Pager pager) {

		List<EngineeringProjectPlanVo> returnList = new ArrayList<EngineeringProjectPlanVo>();
		String time = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime() ;//获取前台传递过来的时间查询参数
		
		//String fuzzyQueryString = StringUtils.isBlank(vo.getFuzzyQueryString()) ? "" : vo.getFuzzyQueryString();
		//查询结果集可能需要修改,暂时就这样
//		String sql  =  
//			"SELECT distinct\n" +
//			"b.id,\n" + 
//			"a.id AS CIVILREGISTID,\n" + 
//			"a.projectnum,\n" + 
//			"a.projectname,\n" + 
//			"a.nums,\n" + 
//			"a.numsunit,\n" + 
//			"b.projectmanagername,\n" + 
//			"a.useunit,\n" + 
//			"b.planfilearrivaltime ,\n" + 
//			"b.planfilearrivaldutyperson ,\n" + 
//			"b.planlocationfinishtime,\n" + 
//			"b.planlocationfinishdutyperson,\n" + 
//			"b.buildingplanfinishtime ,\n" + 
//			"b.buildingplanfinishdutyperson ,\n" + 
//			"b.licensefinishtime,\n" + 
//			"b.licensefinishdutyperson,\n" + 
//			"b.constructiondesignfinishtime,\n" + 
//			"b.constructiondesigndutyperson,\n" + 
//			"b.approvaltime ,\n" + 
//			"b.approvaldutyperson ,\n" + 
//			"b.tendertime ,\n" + 
//			"b.tenderdutyperson ,\n" + 
//			"b.contractsignedtime ,\n" + 
//			"b.contractsigneddutyperson ,\n" + 
//			"b.startworktime ,\n" + 
//			"b.startworkperson ,\n" + 
//			"b.mainacceptancetime ,\n" + 
//			"b.mainacceptancedutyperson ,\n" + 
//			"b.delivertime ,\n" + 
//			"b.deliverdutyperson ,\n" + 
//			"b.lastupdatetime, \n" +
//			"b.status, \n" +
//			"b.usetype, \n" +
//			"b.headperson \n" +
//			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGPLANDETAILS b\n" + 
//			"WHERE a.id = b.civilregistid(+)\n" + 
//			"AND a.approvalstate = '7' \n" +
//			"AND (b.usetype IS NULL  OR  b.usetype != '2') \n";

		/*if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			sql += "AND a.projectnum LIKE '%"+fuzzyQueryString+"%' OR a.projectname LIKE '%"+fuzzyQueryString+"%' \n";
		}*/
		
		String sql = "from EngineeringProjectPlanModel b where 1=1 ";
		if(time.equals("0")){
			//时间为空时,不带入默认的今天的时间参数
			//String timeSql =  "AND YMD = '"+EngineeringProjectDaoImpl.getNowYMD()+ "' \n";
			//sql += timeSql;
		}else if(time.equals("") == false && time.equals("0") == false){
			String timeSql =  "AND EXTRACT ( year FROM b.lastupdateTime) = '"+time+ "' \n";
			sql += timeSql;
		}
		
		String papa = "";
		List<?> roles = utilDAO.getRolesByUser(new UtilVo());
		for(Object obj : roles){
			String s = obj.toString();
			if(s.equals(RoleEnum.DIRECTOR.getValue())){
				papa = " and b.headperson = '"+ identity.getLoginUser().getTruename().trim() +"'";
				break;
			}else if(s.equals(RoleEnum.HEADER.getValue())){
				papa = " and b.projectManagerName = '"+ identity.getLoginUser().getTruename() +"'";
				break;
			}
		}
		sql = sql + papa;
		Query query = engineeringProjectImplementplanDaoImp.getHibernateSession().createQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<EngineeringProjectPlanModel> list = query.list();
			for(EngineeringProjectPlanModel ep : list){
				EngineeringProjectPlanVo thisVo = new EngineeringProjectPlanVo();
				try {
					BeanUtils.copyProperties(thisVo, ep);
				} catch (Exception e) {
					e.printStackTrace();
				}
				thisVo.setProjectName(ep.getCivilRegistId().getProjectname());
				thisVo.setProjectCode(ep.getCivilRegistId().getProjectnum());
				thisVo.setNums(ep.getCivilRegistId().getNums());
				thisVo.setNumsunit(ep.getCivilRegistId().getNumsunit());
				thisVo.setUseunit(ep.getCivilRegistId().getUseunit());
				returnList.add(thisVo);
			}
//			List<Object[]> list = query.list();
//			for (Object[] obj : list) {
//				EngineeringProjectPlanVo thisVo = new EngineeringProjectPlanVo();
//				BeanUtils.copyProperties(thisVo, di);
//				thisVo.setId(String.valueOf(obj[0]));
//				thisVo.setCivilRegistId(String.valueOf(obj[1]));
//				thisVo.setProjectCode(String.valueOf(obj[2]));
//				thisVo.setProjectName(String.valueOf(obj[3]));
//				thisVo.setNums(String.valueOf(obj[4]));
//				thisVo.setNumsunit(String.valueOf(obj[5]));
//				thisVo.setProjectManagerName(String.valueOf(obj[6]));
//				thisVo.setUseunit(String.valueOf(obj[7]));
//				thisVo.setPlanFileArrivalTime((String.valueOf(obj[8])));//2012-08-14
//				thisVo.setPlanFileArrivalDutyPerson(String.valueOf(obj[9]));
//				thisVo.setPlanLocationFinishTime(String.valueOf(obj[10]));
//				thisVo.setPlanLocationFinishDutyPerson(String.valueOf(obj[11]));
//				thisVo.setBuildingPlanFinishTime(String.valueOf(obj[12]));
//				thisVo.setBuildingPlanFinishDutyPerson(String.valueOf(obj[13]));
//				thisVo.setLicenseFinishTime(String.valueOf(obj[14]));
//				thisVo.setLicenseFinishDutyPerson(String.valueOf(obj[15]));
//				thisVo.setConstructionDesignFinishTime(String.valueOf(obj[16]));
//				thisVo.setConstructionDesignDutyPerson(String.valueOf(obj[17]));
//				thisVo.setApprovalTime(String.valueOf(obj[18]));
//				thisVo.setApprovalDutyPerson(String.valueOf(obj[19]));
//				thisVo.setTenderTime(String.valueOf(obj[20]));
//				thisVo.setTenderDutyPerson(String.valueOf(obj[21]));
//				thisVo.setContractSignedTime(String.valueOf(obj[22]));
//				thisVo.setContractSignedDutyPerson(String.valueOf(obj[23]));
//				thisVo.setStartWorkTime(String.valueOf(obj[24]));
//				thisVo.setStartWorkPerson(String.valueOf(obj[25]));
//				thisVo.setMainAcceptanceTime(String.valueOf(obj[26]));
//				thisVo.setMainAcceptanceDutyPerson(String.valueOf(obj[27]));
//				thisVo.setDeliverTime(String.valueOf(obj[28]));
//				thisVo.setDeliverDutyPerson(String.valueOf(obj[29]));
//				thisVo.setLastupdateTime(String.valueOf(obj[30]));
//				thisVo.setStatus(String.valueOf(obj[31]));//审批状态(1编制中,2审批中,3已审批)
//				thisVo.setUseType(String.valueOf(obj[32]));//使用类别(1实施计划使用,2执行管理使用) 
//				thisVo.setHeadperson(String.valueOf(obj[33]));//指派负责人
				
//			}
		}
		return returnList;
	}

	
	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EngineeringProjectPlanVo> getImplementPlanById(String id) {
		List<EngineeringProjectPlanVo> returnList = new ArrayList<EngineeringProjectPlanVo>();
		String sql  =  
			"SELECT distinct\n" +
			"b.id,\n" + 
			"a.id AS CIVILREGISTID,\n" + 
			"a.projectnum,\n" + 
			"a.projectname,\n" + 
			"a.nums,\n" + 
			"a.numsunit,\n" + 
			"b.projectmanagername,\n" + 
			"a.useunit,\n" + 
			"b.planfilearrivaltime ,\n" + 
			"b.planfilearrivaldutyperson ,\n" + 
			"b.planlocationfinishtime,\n" + 
			"b.planlocationfinishdutyperson,\n" + 
			"b.buildingplanfinishtime ,\n" + 
			"b.buildingplanfinishdutyperson ,\n" + 
			"b.licensefinishtime,\n" + 
			"b.licensefinishdutyperson,\n" + 
			"b.constructiondesignfinishtime,\n" + 
			"b.constructiondesigndutyperson,\n" + 
			"b.approvaltime ,\n" + 
			"b.approvaldutyperson ,\n" + 
			"b.tendertime ,\n" + 
			"b.tenderdutyperson ,\n" + 
			"b.contractsignedtime ,\n" + 
			"b.contractsigneddutyperson ,\n" + 
			"b.startworktime ,\n" + 
			"b.startworkperson ,\n" + 
			"b.mainacceptancetime ,\n" + 
			"b.mainacceptancedutyperson ,\n" + 
			"b.delivertime ,\n" + 
			"b.deliverdutyperson ,\n" + 
			"b.lastupdatetime, \n" +
			"b.status, \n" +
			"b.usetype \n" +
			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGPLANDETAILS b\n" + 
			"WHERE a.id = b.civilregistid(+)\n" + 
			"AND a.approvalstate = '7' \n" +
			"AND (b.usetype IS NULL  OR  b.usetype != '2') \n" +
			"AND a.id = '"+id+"'";

		SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数

		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for (Object[] obj : list) {
				EngineeringProjectPlanVo thisVo = new EngineeringProjectPlanVo();
				
				thisVo.setId(String.valueOf(obj[0]));
				thisVo.setCivilRegistId(String.valueOf(obj[1]));
				thisVo.setProjectCode(String.valueOf(obj[2]));
				thisVo.setProjectName(String.valueOf(obj[3]));
				thisVo.setNums(String.valueOf(obj[4]));
				thisVo.setNumsunit(String.valueOf(obj[5]));
				thisVo.setProjectManagerName(String.valueOf(obj[6]));
				thisVo.setUseunit(String.valueOf(obj[7]));
				thisVo.setPlanFileArrivalTime((String.valueOf(obj[8])));//2012-08-14
				thisVo.setPlanFileArrivalDutyPerson(String.valueOf(obj[9]));
				thisVo.setPlanLocationFinishTime(String.valueOf(obj[10]));
				thisVo.setPlanLocationFinishDutyPerson(String.valueOf(obj[11]));
				thisVo.setBuildingPlanFinishTime(String.valueOf(obj[12]));
				thisVo.setBuildingPlanFinishDutyPerson(String.valueOf(obj[13]));
				thisVo.setLicenseFinishTime(String.valueOf(obj[14]));
				thisVo.setLicenseFinishDutyPerson(String.valueOf(obj[15]));
				thisVo.setConstructionDesignFinishTime(String.valueOf(obj[16]));
				thisVo.setConstructionDesignDutyPerson(String.valueOf(obj[17]));
				thisVo.setApprovalTime(String.valueOf(obj[18]));
				thisVo.setApprovalDutyPerson(String.valueOf(obj[19]));
				thisVo.setTenderTime(String.valueOf(obj[20]));
				thisVo.setTenderDutyPerson(String.valueOf(obj[21]));
				thisVo.setContractSignedTime(String.valueOf(obj[22]));
				thisVo.setContractSignedDutyPerson(String.valueOf(obj[23]));
				thisVo.setStartWorkTime(String.valueOf(obj[24]));
				thisVo.setStartWorkPerson(String.valueOf(obj[25]));
				thisVo.setMainAcceptanceTime(String.valueOf(obj[26]));
				thisVo.setMainAcceptanceDutyPerson(String.valueOf(obj[27]));
				thisVo.setDeliverTime(String.valueOf(obj[28]));
				thisVo.setDeliverDutyPerson(String.valueOf(obj[29]));
				thisVo.setLastupdateTime(String.valueOf(obj[30]));
				thisVo.setStatus(String.valueOf(obj[31]));//审批状态(1编制中,2审批中,3已审批)
				thisVo.setUseType(String.valueOf(obj[32]));//使用类别(1实施计划使用,2执行管理使用) 
				returnList.add(thisVo);
			}
		}
		return returnList;
	}
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	@Transactional
	public String saveImplementPlan(EngineeringProjectPlanVo vo) {
		String updateIndex = vo.getUpdateIndex();
		JSONArray ja = JSONArray.fromObject(vo.getDataJsonArray());
		String id = "";
		try {
			for (Object obj : ja) {
				JSONObject jo = JSONObject.fromObject(obj);
				id = jo.getString("id");
				
				if("".equals(updateIndex) || null == updateIndex){
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.HEADPERSON = '"+jo.getString("headperson")+"',\n"+
								 "a.PROJECTMANAGERNAME = '"+jo.getString("projectManagerName")+"'\n"+
								 "WHERE a.id = '"+id+"' \n"+
			                    "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
				
				}
				
				
				//1
				if (updateIndex.equals("9")){
					// 2012-12-12
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("planFileArrivalTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.PLANFILEARRIVALTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
				}
				if (updateIndex.equals("10")){
					String dateString = StringUtils.isBlank(jo.getString("planFileArrivalDutyPerson")) ? "" : jo.getString("planFileArrivalDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.PLANFILEARRIVALDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
				}
				
				//2
				if (updateIndex.equals("11")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("planLocationFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.PLANLOCATIONFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setPlanLocationFinishTime(FormatDate.strToDate(jo.getString("planLocationFinishTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("12")) {
					String dateString = StringUtils.isBlank(jo.getString("planLocationFinishDutyPerson")) ? "" : jo.getString("planLocationFinishDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.PLANLOCATIONFINISHDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setPlanLocationFinishDutyPerson(jo.getString("planLocationFinishDutyPerson"));
				}
				
				//3
				if (updateIndex.equals("13")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("buildingPlanFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.BUILDINGPLANFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setBuildingPlanFinishTime(FormatDate.strToDate(jo.getString("buildingPlanFinishTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("14")) {
					String dateString = StringUtils.isBlank(jo.getString("buildingPlanFinishDutyPerson")) ? "" : jo.getString("buildingPlanFinishDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.BUILDINGPLANFINISHDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setBuildingPlanFinishDutyPerson(jo.getString("buildingPlanFinishDutyPerson"));
				}
				
				//4
				if (updateIndex.equals("15")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("licenseFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.LICENSEFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setLicenseFinishTime(FormatDate.strToDate(jo.getString("licenseFinishTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("16")) {
					String dateString = StringUtils.isBlank(jo.getString("licenseFinishDutyPerson")) ? "" : jo.getString("licenseFinishDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.LICENSEFINISHDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setLicenseFinishDutyPerson(jo.getString("licenseFinishDutyPerson"));
				}
				
				
				//5
				if (updateIndex.equals("17")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("constructionDesignFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.CONSTRUCTIONDESIGNFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setConstructionDesignFinishTime(FormatDate.strToDate(jo.getString("constructionDesignFinishTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("18")) {
					String dateString = StringUtils.isBlank(jo.getString("constructionDesignDutyPerson")) ? "" : jo.getString("constructionDesignDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.CONSTRUCTIONDESIGNDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setConstructionDesignDutyPerson(jo.getString("constructionDesignDutyPerson"));
				}
				
				
				//6
				if (updateIndex.equals("19")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("approvalTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.APPROVALTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setApprovalTime(FormatDate.strToDate(jo.getString("approvalTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("20")) {
					String dateString = StringUtils.isBlank(jo.getString("approvalDutyPerson")) ? "" : jo.getString("approvalDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.APPROVALDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setApprovalDutyPerson(jo.getString("approvalDutyPerson"));
				}
				
				//7
				if (updateIndex.equals("21")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("tenderTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.TENDERTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setTenderTime(FormatDate.strToDate(jo.getString("tenderTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("22")) {
					String dateString = StringUtils.isBlank(jo.getString("tenderDutyPerson")) ? "" : jo.getString("tenderDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.TENDERDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setTenderDutyPerson(jo.getString("tenderDutyPerson"));
				}
				
				//8
				if (updateIndex.equals("23")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("contractSignedTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.CONTRACTSIGNEDTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setContractSignedTime(FormatDate.strToDate(jo.getString("contractSignedTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("24")) {
					String dateString = StringUtils.isBlank(jo.getString("contractSignedDutyPerson")) ? "" : jo.getString("contractSignedDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.CONTRACTSIGNEDDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setContractSignedDutyPerson(jo.getString("contractSignedDutyPerson"));
				}
				
				
				//9
				if (updateIndex.equals("25")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("startWorkTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.STARTWORKTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setStartWorkTime(FormatDate.strToDate(jo.getString("startWorkTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("26")) {
					String dateString = StringUtils.isBlank(jo.getString("startWorkPerson")) ? "" : jo.getString("startWorkPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.STARTWORKPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setStartWorkPerson(jo.getString("startWorkPerson"));
				}
				
				//10
				if (updateIndex.equals("27")){
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("mainAcceptanceTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.MAINACCEPTANCETIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setMainAcceptanceTime(FormatDate.strToDate(jo.getString("mainAcceptanceTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("28")) {
					String dateString = StringUtils.isBlank(jo.getString("mainAcceptanceDutyPerson")) ? "" : jo.getString("mainAcceptanceDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.MAINACCEPTANCEDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setMainAcceptanceDutyPerson(jo.getString("mainAcceptanceDutyPerson"));
				}
				
				//11
				if (updateIndex.equals("29")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("deliverTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
								 "SET a.DELIVERTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setDeliverTime(FormatDate.strToDate(jo.getString("deliverTime"), "yyyy-MM-dd"));
				}
				if (updateIndex.equals("30")) {
					String dateString = StringUtils.isBlank(jo.getString("deliverDutyPerson")) ? "" : jo.getString("deliverDutyPerson");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.DELIVERDUTYPERSON = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setDeliverDutyPerson(jo.getString("deliverDutyPerson"));
				}
				
				
				if (updateIndex.equals("6")) {//项目主管
					String dateString = StringUtils.isBlank(jo.getString("projectManagerName")) ? "" : jo.getString("projectManagerName");
					String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
					             "SET a.PROJECTMANAGERNAME = '"+dateString+"' \n"+
		                         "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '1'  \n";
					SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setProjectManagerName(jo.getString("projectManagerName"));
				}
				
				
				
				//更新最后更新的时间
				/*String dateString = FormatDate.getNowYMD();
				String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
							 "SET a.LASTUPDATETIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
				             "WHERE a.id = '"+id+"' \n";
				SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
				query.executeUpdate();*/
				//engineeringProjectImplementplanDaoImp.getHibernateSession().saveOrUpdate(saveModel);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return e.getLocalizedMessage();
		}
		return "1";
		
		
		
		/*String updateIndex = vo.getUpdateIndex();
		JSONArray ja = JSONArray.fromObject(vo.getDataJsonArray());
		EngineeringProjectPlanModel saveModel = null;
		try {
			for (Object obj : ja) {
				JSONObject jo = JSONObject.fromObject(obj);
				saveModel = new EngineeringProjectPlanModel();
				saveModel.setId(jo.getString("id"));
				System.out.println("更新的ID : "+jo.getString("id"));
				EngineeringProjectPlanModel saveModel = (EngineeringProjectPlanModel)
				                                  engineeringProjectImplementplanDaoImp.getHibernateSession()
				                                  .get(EngineeringProjectPlanModel.class,jo.getString("id"));
				//1
				if (jo.getString("planFileArrivalTime") != null
						&& jo.getString("planFileArrivalTime").equals("")
						&& updateIndex.equals("7")
				    ) {
					saveModel.setApprovalTime(FormatDate.strToDate(jo.getString("planFileArrivalTime"), "yyyy-mm-dd"));
				}
				if (jo.getString("planFileArrivalDutyPerson") != null
						&& !jo.getString("planFileArrivalDutyPerson").equals("")
						&& !jo.getString("planFileArrivalDutyPerson").equals("null")
						&& updateIndex.equals("8")
				    ) {
					saveModel.setPlanFileArrivalDutyPerson(jo.getString("planFileArrivalDutyPerson"));
				}
				
				//2
				if (jo.getString("planLocationFinishTime") != null
						&& jo.getString("planLocationFinishTime").equals("")
						&& updateIndex.equals("9")
				    ) {
					saveModel.setPlanLocationFinishTime(FormatDate.strToDate(jo.getString("planLocationFinishTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("planLocationFinishDutyPerson") != null
						&& !jo.getString("planLocationFinishDutyPerson").equals("")
					    && !jo.getString("planLocationFinishDutyPerson").equals("null")
					    && updateIndex.equals("10")
				    ) {
					saveModel.setPlanLocationFinishDutyPerson(jo.getString("planLocationFinishDutyPerson"));
				}
				
				//3
				if (jo.getString("buildingPlanFinishTime") != null
						&& jo.getString("buildingPlanFinishTime").equals("")
					    && updateIndex.equals("11")
				    ) {
					saveModel.setBuildingPlanFinishTime(FormatDate.strToDate(jo.getString("buildingPlanFinishTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("buildingPlanFinishDutyPerson") != null
						&& !jo.getString("buildingPlanFinishDutyPerson").equals("")
						&& !jo.getString("buildingPlanFinishDutyPerson").equals("null")
						&& updateIndex.equals("12")
				    ) {
					saveModel.setBuildingPlanFinishDutyPerson(jo.getString("buildingPlanFinishDutyPerson"));
				}
				
				//4
				if (jo.getString("licenseFinishTime") != null
						&& jo.getString("licenseFinishTime").equals("")
					    && updateIndex.equals("13")	
				    ) {
					saveModel.setLicenseFinishTime(FormatDate.strToDate(jo.getString("licenseFinishTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("licenseFinishDutyPerson") != null
						&& !jo.getString("licenseFinishDutyPerson").equals("")
					    && !jo.getString("licenseFinishDutyPerson").equals("null")
					    && updateIndex.equals("14")
				    ) {
					saveModel.setLicenseFinishDutyPerson(jo.getString("licenseFinishDutyPerson"));
				}
				
				
				//5
				if (jo.getString("constructionDesignFinishTime") != null
						&& jo.getString("constructionDesignFinishTime").equals("")
					    && updateIndex.equals("15")	
				    ) {
					saveModel.setConstructionDesignFinishTime(FormatDate.strToDate(jo.getString("constructionDesignFinishTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("constructionDesignDutyPerson") != null
						&& !jo.getString("constructionDesignDutyPerson").equals("")
					    && !jo.getString("constructionDesignDutyPerson").equals("null")
					    && updateIndex.equals("16")
				    ) {
					saveModel.setConstructionDesignDutyPerson(jo.getString("constructionDesignDutyPerson"));
				}
				
				
				//6
				if (jo.getString("approvalTime") != null
						&& jo.getString("approvalTime").equals("")
					    && updateIndex.equals("17")	
				    ) {
					saveModel.setApprovalTime(FormatDate.strToDate(jo.getString("approvalTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("approvalDutyPerson") != null
						&& !jo.getString("approvalDutyPerson").equals("")
					    && !jo.getString("approvalDutyPerson").equals("null")
					    && updateIndex.equals("18")
				    ) {
					saveModel.setApprovalDutyPerson(jo.getString("approvalDutyPerson"));
				}
				
				//7
				if (jo.getString("tenderTime") != null
						&& jo.getString("tenderTime").equals("")
					    && updateIndex.equals("19")
				    ) {
					saveModel.setTenderTime(FormatDate.strToDate(jo.getString("tenderTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("tenderDutyPerson") != null
						&& !jo.getString("tenderDutyPerson").equals("")
						&& !jo.getString("tenderDutyPerson").equals("null")
						&& updateIndex.equals("20")
				    ) {
					saveModel.setTenderDutyPerson(jo.getString("tenderDutyPerson"));
				}
				
				//8
				if (jo.getString("contractSignedTime") != null
						&& jo.getString("contractSignedTime").equals("")
					    && updateIndex.equals("21")	
				    ) {
					saveModel.setContractSignedTime(FormatDate.strToDate(jo.getString("contractSignedTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("contractSignedDutyPerson") != null
						&& !jo.getString("contractSignedDutyPerson").equals("")
						&& !jo.getString("contractSignedDutyPerson").equals("null")
						&& updateIndex.equals("22")
					) {
					saveModel.setContractSignedDutyPerson(jo.getString("contractSignedDutyPerson"));
				}
				
				
				//9
				if (jo.getString("startWorkTime") != null 
						&& jo.getString("startWorkTime").equals("")
					    && updateIndex.equals("23")
				    ) {
					saveModel.setStartWorkTime(FormatDate.strToDate(jo.getString("startWorkTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("startWorkPerson") != null 
						&& !jo.getString("startWorkPerson").equals("")
					    && !jo.getString("startWorkPerson").equals("null")
					    && updateIndex.equals("24")
				    ) {
					saveModel.setStartWorkPerson(jo.getString("startWorkPerson"));
				}
				
				//10
				if (jo.getString("mainAcceptanceTime") != null
						&& jo.getString("mainAcceptanceTime").equals("")
					    && updateIndex.equals("25")	
				    ) {
					saveModel.setMainAcceptanceTime(FormatDate.strToDate(jo.getString("mainAcceptanceTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("mainAcceptanceDutyPerson") != null
						&& !jo.getString("mainAcceptanceDutyPerson").equals("")
						&& !jo.getString("mainAcceptanceDutyPerson").equals("null")
						&& updateIndex.equals("26")
			        ) {
					saveModel.setMainAcceptanceDutyPerson(jo.getString("mainAcceptanceDutyPerson"));
				}
				
				//11
				if (jo.getString("deliverTime") != null
						&& jo.getString("deliverTime").equals("")
					    && updateIndex.equals("27")	
				    ) {
					saveModel.setDeliverTime(FormatDate.strToDate(jo.getString("deliverTime"), "yyyy-MM-dd"));
				}
				if (jo.getString("deliverDutyPerson") != null
						&& !jo.getString("deliverDutyPerson").equals("")
					    && !jo.getString("deliverDutyPerson").equals("null")
					    && updateIndex.equals("28")
				    ) {
					saveModel.setDeliverDutyPerson(jo.getString("deliverDutyPerson"));
				}
				
				
				if (jo.getString("projectManagerName") != null&& !jo.getString("projectManagerName").equals("")) {
					saveModel.setProjectManagerName(jo.getString("projectManagerName"));
				}
				//saveModel.setLastupdateTime(new Date());
				engineeringProjectImplementplanDaoImp.getHibernateSession().saveOrUpdate(saveModel);
				
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "1";*/
	}

	
	
	
	
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@Transactional
	public String sendImplementPlan(EngineeringProjectPlanVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getDataJsonArray());
		String id = "";
		try {
			for (Object obj : ja) {
				/*EngineeringProjectPlanModel di = (EngineeringProjectPlanModel) dao.getHibernateSession().get(EngineeringProjectPlanModel.class,obj.toString());
				//di.setStatus("3");
				 */
				id = (String)obj;
				EngineeringProjectPlanModel di = (EngineeringProjectPlanModel) dao.getHibernateSession().get(EngineeringProjectPlanModel.class,id);
				//更新最后更新的时间
				String dateString = FormatDate.getNowYMD();
				String sql = "UPDATE TB_ENGINEERINGPLANDETAILS a \n"+
							 "SET a.LASTUPDATETIME = to_date('"+dateString+"','yyyy-mm-dd') ,a.status = '3' \n"+
				             "WHERE a.id = '"+id+"' \n" +
				             "AND a.usetype = '1' \n";
				SQLQuery query = engineeringProjectImplementplanDaoImp.getHibernateSession().createSQLQuery(sql);
				query.executeUpdate();
				String sql2 = "";
				if(di.getProjectcategorys().equals("1")){
					sql2 = 
						"INSERT INTO TB_ENGINEERINGEXEMANADETAILS(ID,CIVILREGISTID,LASTUPDATETIME,PROJECTMANAGERNAME,STATUS,USETYPE,PROJECTCATEGORYS)\n" +
						"SELECT\n" + 
						"'"+UtilForHD.GetNowTimeForId()+"',\n" + 
						"(SELECT civilregistid FROM TB_ENGINEERINGPLANDETAILS  WHERE id = '"+id+"' AND ROWNUM = 1),\n" + 
						"to_date('"+FormatDate.getSqlDateForDay(new Date())+"','yyyy-mm-dd'),\n" + 
						"(SELECT projectmanagername FROM TB_ENGINEERINGPLANDETAILS  WHERE id = '"+id+"'  AND ROWNUM = 1),\n" + 
						"'1','2',\n" + 
						"(SELECT projectcategorys FROM TB_ENGINEERINGPLANDETAILS WHERE id = '"+id+"'  AND ROWNUM = 1)\n" + 
						"from dual";
				}else if(di.getProjectcategorys().equals("2")){
					sql2 = 
						"INSERT INTO TB_ENGINEERINGEXEMANADETAILS(ID,CIVILREPAIRID,LASTUPDATETIME,PROJECTMANAGERNAME,STATUS,USETYPE,PROJECTCATEGORYS)\n" +
						"SELECT\n" + 
						"'"+UtilForHD.GetNowTimeForId()+"',\n" + 
						"(SELECT civilrepair_id  FROM TB_ENGINEERINGPLANDETAILS  WHERE id = '"+id+"' AND ROWNUM = 1),\n" + 
						"to_date('"+FormatDate.getSqlDateForDay(new Date())+"','yyyy-mm-dd'),\n" + 
						"(SELECT projectmanagername FROM TB_ENGINEERINGPLANDETAILS  WHERE id = '"+id+"'  AND ROWNUM = 1),\n" + 
						"'1','2',\n" + 
						"(SELECT projectcategorys FROM TB_ENGINEERINGPLANDETAILS WHERE id = '"+id+"'  AND ROWNUM = 1)\n" + 
						"from dual";
				}
				
				//已下发后 , 新增,往 工程项目执行管理 表里直接插入一条数据
				
				SQLQuery query2 = dao.getHibernateSession().createSQLQuery(sql2);
				/*
				query2.setParameter(0, UtilForHD.GetNowTimeForId());
				query2.setParameter(1, id);
				query2.setParameter(2, FormatDate.getSqlDateForDay(new Date()));
				query2.setParameter(3, id);*/
				query2.executeUpdate();
				
				 
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "1";
	}

	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	@Transactional
	public String beforeEditAdd(EngineeringProjectPlanVo vo){
		EngineeringProjectPlanModel model = new EngineeringProjectPlanModel();
//		model.setCivilRegistId(vo.getCivilRegistId());
		model.setStatus("编制中");
		model.setUseType("1");
		engineeringProjectImplementplanDaoImp.save(model);//先插入一条数据,就只有主见ID 和外键ID
		return model.getId();
	}
	
	
}