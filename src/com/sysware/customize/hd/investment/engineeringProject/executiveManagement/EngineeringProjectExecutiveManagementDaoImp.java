package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Logger;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.jboss.seam.log.Log;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.util.FormatDate;
import com.sysware.customize.hd.investment.util.UtilForHD;



@Name("engineeringProject_EngineeringProjectExecutiveManagementDaoImp")
public class EngineeringProjectExecutiveManagementDaoImp extends GenericDAOImpl<EngineeringProjectExecutiveManagementModel> 
    implements EngineeringProjectExecutiveManagementDao {
	@SuppressWarnings("unused")
	@Logger private Log log;
	
	/*
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;*/
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<EngineeringProjectExecutiveManagementModel> engineeringProjectExecutiveManagementDaoImp;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<FixedAssetAcceptanceApplyModel> fixedAssetAcceptanceApplyDao;
	
	
	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EngineeringProjectExecutiveManagementVo> getGridData(EngineeringProjectExecutiveManagementVo vo, Pager pager) {
//		Calendar cal = Calendar.getInstance(); 
//		cal.set(9999,99,99); 
//		Date defaultDate = cal.getTime();
		String inputId = StringUtils.isBlank(vo.getId()) ? "" : vo.getId();//流程审批需要传入一个ID,返回一行结果集
		
		
		List<EngineeringProjectExecutiveManagementVo> returnList = new ArrayList<EngineeringProjectExecutiveManagementVo>();
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
//			"b.usetype \n" +
//			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGEXEMANADETAILS b\n" + 
//			"WHERE a.id = b.civilregistid(+)\n" + 
//			"AND a.approvalstate = '7' \n" +
//		    "AND (b.usetype IS NULL  OR  b.usetype != '1') \n" +
//		    //新增对 工程项目实施计划 表的 已下发状态的约束
//		    "AND EXISTS (SELECT 1 FROM  TB_ENGINEERINGPLANDETAILS c \n" + 
//		    "WHERE c.civilregistid = b.civilregistid \n" +
//		    "AND c.status = '已下发') \n";
		/*if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			sql += "AND a.projectnum LIKE '%"+fuzzyQueryString+"%' OR a.projectname LIKE '%"+fuzzyQueryString+"%' \n";
		}*/
		String sql = "from EngineeringProjectExecutiveManagementModel b where 1=1 ";
		if(time.equals("")){
			//时间为空时,不带入默认的今天的时间参数
			//String timeSql =  "AND YMD = '"+EngineeringProjectDaoImpl.getNowYMD()+ "' \n";
			//sql += timeSql;
		}else if(time.equals("") == false && time.equals("0") == false){
			String timeSql =  "AND SUBSTR(a.approvaltime,1,4) = '"+time+ "' \n";
			sql += timeSql;
		}
		
		if(inputId != "" && inputId != "null" && inputId != null){
			sql += "AND b.id = '"+inputId+"' \n";
		}
		
		
		
		Query query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<EngineeringProjectExecutiveManagementModel> list = query.list();
			for (EngineeringProjectExecutiveManagementModel ee : list) {
				EngineeringProjectExecutiveManagementVo thisVo = new EngineeringProjectExecutiveManagementVo();
				try {
					BeanUtils.copyProperties(thisVo, ee);
				} catch (Exception e) {
					e.printStackTrace();
				}
				thisVo.setProjectName(ee.getCivilRegist().getProjectname());
				thisVo.setProjectCode(ee.getCivilRegist().getProjectnum());
				thisVo.setNums(ee.getCivilRegist().getNums());
				thisVo.setNumsunit(ee.getCivilRegist().getNumsunit());
				thisVo.setUseunit(ee.getCivilRegist().getUseunit());
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
				returnList.add(thisVo);
			}
		}
		return returnList;
	}

	
	public List<EngineeringProjectExecutiveManagementVo> getCivilManageById(
			String id) {
		List<EngineeringProjectExecutiveManagementVo> returnList = new ArrayList<EngineeringProjectExecutiveManagementVo>();
		//String fuzzyQueryString = StringUtils.isBlank(vo.getFuzzyQueryString()) ? "" : vo.getFuzzyQueryString();
		//查询结果集可能需要修改,暂时就这样
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
			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGEXEMANADETAILS b\n" + 
			"WHERE a.id = b.civilregistid(+)\n" + 
			"AND a.approvalstate = '7' \n" +
		    "AND (b.usetype IS NULL  OR  b.usetype != '1') \n" +
		    //新增对 工程项目实施计划 表的 已下发状态的约束
		    "AND EXISTS (SELECT 1 FROM  TB_ENGINEERINGPLANDETAILS c \n" + 
		    "WHERE c.civilregistid = b.civilregistid \n" +
		    "AND c.status = '已下发') \n" +
		    "And a.id = '"+id+"'";
		/*if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			sql += "AND a.projectnum LIKE '%"+fuzzyQueryString+"%' OR a.projectname LIKE '%"+fuzzyQueryString+"%' \n";
		}*/
		
		SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for (Object[] obj : list) {
				EngineeringProjectExecutiveManagementVo thisVo = new EngineeringProjectExecutiveManagementVo();
				
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
	public String saveImplementPlan(EngineeringProjectExecutiveManagementVo vo) {
		String updateIndex = vo.getUpdateIndex();
		JSONArray ja = JSONArray.fromObject(vo.getDataJsonArray());
		String id = "";
		try {
			for (Object obj : ja) {
				JSONObject jo = JSONObject.fromObject(obj);
				id = jo.getString("id");
				

				//1
				if (updateIndex.equals("9")){
					// 2012-12-12
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("planFileArrivalTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.PLANFILEARRIVALTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
				}
				
				//2
				if (updateIndex.equals("10")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("planLocationFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.PLANLOCATIONFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setPlanLocationFinishTime(FormatDate.strToDate(jo.getString("planLocationFinishTime"), "yyyy-MM-dd"));
				}
				
				//3
				if (updateIndex.equals("11")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("buildingPlanFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.BUILDINGPLANFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setBuildingPlanFinishTime(FormatDate.strToDate(jo.getString("buildingPlanFinishTime"), "yyyy-MM-dd"));
				}
				
				//4
				if (updateIndex.equals("12")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("licenseFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.LICENSEFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setLicenseFinishTime(FormatDate.strToDate(jo.getString("licenseFinishTime"), "yyyy-MM-dd"));
				}
				
				//5
				if (updateIndex.equals("13")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("constructionDesignFinishTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.CONSTRUCTIONDESIGNFINISHTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setConstructionDesignFinishTime(FormatDate.strToDate(jo.getString("constructionDesignFinishTime"), "yyyy-MM-dd"));
				}
				
				//6
				if (updateIndex.equals("14")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("approvalTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.APPROVALTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setApprovalTime(FormatDate.strToDate(jo.getString("approvalTime"), "yyyy-MM-dd"));
				}
				
				//7
				if (updateIndex.equals("15")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("tenderTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.TENDERTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setTenderTime(FormatDate.strToDate(jo.getString("tenderTime"), "yyyy-MM-dd"));
				}
				
				//8
				if (updateIndex.equals("16")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("contractSignedTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.CONTRACTSIGNEDTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setContractSignedTime(FormatDate.strToDate(jo.getString("contractSignedTime"), "yyyy-MM-dd"));
				}
				
				
				//9
				if (updateIndex.equals("17")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("startWorkTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.STARTWORKTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setStartWorkTime(FormatDate.strToDate(jo.getString("startWorkTime"), "yyyy-MM-dd"));
				}
				
				//10
				if (updateIndex.equals("18")){
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("mainAcceptanceTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.MAINACCEPTANCETIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setMainAcceptanceTime(FormatDate.strToDate(jo.getString("mainAcceptanceTime"), "yyyy-MM-dd"));
				}
				
				//11
				if (updateIndex.equals("19")) {
					String dateString = FormatDate.getSqlDateForDay(FormatDate.strToDate(jo.getString("deliverTime"),"yyyy-MM-dd"));
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
								 "SET a.DELIVERTIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
								 "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setDeliverTime(FormatDate.strToDate(jo.getString("deliverTime"), "yyyy-MM-dd"));
				}
				
				
				if (updateIndex.equals("7")) {//项目主管
					String dateString = StringUtils.isBlank(jo.getString("projectManagerName")) ? "" : jo.getString("projectManagerName");
					String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
					             "SET a.PROJECTMANAGERNAME = '"+dateString+"' \n"+
					             "WHERE a.id = '"+id+"' \n"+
		                         "AND a.usetype = '2'  \n";
					SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
					query.executeUpdate();
					//saveModel.setProjectManagerName(jo.getString("projectManagerName"));
				}
				
				
				
				//更新最后更新的时间
				/*String dateString = FormatDate.getNowYMD();
				String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
							 "SET a.LASTUPDATETIME = to_date('"+dateString+"','yyyy-mm-dd') \n"+
				             "WHERE a.id = '"+id+"' \n";
				SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
				query.executeUpdate();*/
				//engineeringProjectExecutiveManagementDaoImp.getHibernateSession().saveOrUpdate(saveModel);
				
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "1";
	}

	
	
	
	
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@Transactional
	public String sendImplementPlan(EngineeringProjectExecutiveManagementVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getDataJsonArray());
		String id = "";
		try {
			for (Object obj : ja) {
				/*EngineeringProjectPlanModel di = (EngineeringProjectPlanModel) dao.getHibernateSession().get(EngineeringProjectPlanModel.class,obj.toString());
				//di.setStatus("3");
				 */
				id = (String)obj;
				
				//更新最后更新的时间
				String dateString = FormatDate.getNowYMD();
				String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
							 "SET a.LASTUPDATETIME = to_date('"+dateString+"','yyyy-mm-dd') ,a.status = '已审批' \n"+
				             "WHERE a.id = '"+id+"' \n"+
				             "AND a.usetype = '2' \n";
				SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
				query.executeUpdate();
				
				 
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
	public String beforeEditAdd(EngineeringProjectExecutiveManagementVo vo){
		EngineeringProjectExecutiveManagementModel model = new EngineeringProjectExecutiveManagementModel();
		model.setCivilRegistId(vo.getCivilRegistId());
		model.setStatus("编制中");
		model.setUseType("2");
		engineeringProjectExecutiveManagementDaoImp.save(model);//先插入一条数据,就只有主见ID 和外键ID
		return model.getId();
	}
	
	
	
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<FixedAssetAcceptanceApplyModelVo> getVendorByGroup(FixedAssetAcceptanceApplyModelVo vo,Pager pager){
		List<FixedAssetAcceptanceApplyModelVo> returnList = new ArrayList<FixedAssetAcceptanceApplyModelVo>();
		//String time = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime() ;//获取前台传递过来的时间查询参数
		String fuzzyQueryString = StringUtils.isBlank(vo.getFuzzyQueryString()) ? "" : vo.getFuzzyQueryString();
		
		String sql =  
			"SELECT\n" +
			"a.vendorid,\n" + 
			"a.vendorname,\n" + 
			"a.egal,\n" + 
			"a.phone,\n" + 
			"a.email,\n" + 
			"a.zipcode\n" + 
			"FROM t_vendor a \n" +
			"WHERE 1=1 \n"+
		    "AND EVALUATION_STATUS=2 \n";
		
		if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			sql += "AND a.vendorname LIKE '%"+fuzzyQueryString+"%' or a.egal LIKE '%"+fuzzyQueryString+"%' or a.phone LIKE '%"+fuzzyQueryString+"%' \n";
		}
		
		
		
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for(Object[] obj : list){
				FixedAssetAcceptanceApplyModelVo thisVo = new FixedAssetAcceptanceApplyModelVo();
				
				/*thisVo.setEngineeringContractId(String.valueOf(obj[0]));//id
				thisVo.setProjectCode(String.valueOf(obj[1]));//项目编号
				thisVo.setProjectName(String.valueOf(obj[2]));//项目名称
				 */
				thisVo.setVendorId(String.valueOf(obj[0]));//id
				thisVo.setContractmanuFacturers(String.valueOf(obj[1]));//供应商名字
				thisVo.setContactPerson(String.valueOf(obj[2]));//法人
				thisVo.setContractmanuFacturersTel(String.valueOf(obj[3]));//电话
				returnList.add(thisVo);
			}
		}
		return returnList;
		
	}
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	public String selectModel(FixedAssetAcceptanceApplyModelVo vo){
		String returnString = "";
		String civilregistId = StringUtils.isBlank(vo.getCivilregistId()) ? "" : vo.getCivilregistId();
		String sql = "SELECT * FROM TB_FIXEDASSETACCEPTANCEAPPLY  a \n"+
					 "WHERE a.civilregistid = '"+civilregistId+"' \n";
		SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
		int nums = query.list().size();
		if(nums>0){//有>=1条记录,返回失败
			returnString = "no";
		}else{
			returnString = "yes";
		}
		
		return returnString;
	}
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	@Transactional
	public String saveModel(FixedAssetAcceptanceApplyModelVo vo){
		String returnString  = "no";
		/*try{
			FixedAssetAcceptanceApplyModel model = new FixedAssetAcceptanceApplyModel();
			model.setApplyAcceptanceTime(FormatDate.strToDate(vo.getApplyAcceptanceTime(),"yyyy-MM-dd"));
			//BeanUtils.copyProperties(model,vo);//时间不复制,必须手工传入
			PropertyUtils.copyProperties(model,vo);
			fixedAssetAcceptanceApplyDao.save(model);//先插入一条数据,就只有主见ID 和外键ID
			returnString = "yes";
		}catch(Exception e){
			e.printStackTrace();
		}*/
		
		
		String applyAcceptanceTime = StringUtils.isBlank(vo.getApplyAcceptanceTime()) ? "" : vo.getApplyAcceptanceTime() ;
		if(!applyAcceptanceTime.equals("")){
			//applyAcceptanceTime = "to_date('"+applyAcceptanceTime+"','yyyy-mm-dd')";
		}
		String projectManagerName= StringUtils.isBlank(vo.getProjectManagerName()) ? "" : vo.getProjectManagerName() ;
		String tel= StringUtils.isBlank(vo.getTel()) ? "" : vo.getTel() ;
		String contractmanuFacturers= StringUtils.isBlank(vo.getContractmanuFacturers()) ? "" : vo.getContractmanuFacturers() ;
		String contractmanuFacturersTel= StringUtils.isBlank(vo.getContractmanuFacturersTel()) ? "" : vo.getContractmanuFacturersTel() ;
		String contactPerson = StringUtils.isBlank(vo.getContactPerson()) ? "" : vo.getContactPerson() ;
		String opinion= StringUtils.isBlank(vo.getOpinion()) ? "" : vo.getOpinion() ;
		String status = StringUtils.isBlank(vo.getStatus()) ? "" : vo.getStatus() ;
		String civilRegistId = StringUtils.isBlank(vo.getCivilregistId()) ? "" : vo.getCivilregistId() ;

		
		//更新最后更新的时间
		String dateString = FormatDate.getNowYMD();
		String sql = "INSERT INTO TB_FIXEDASSETACCEPTANCEAPPLY VALUES (?,?,to_date(?,'yyyy-mm-dd'),?,?,?,?,?,?,?) \n";
		SQLQuery query = engineeringProjectExecutiveManagementDaoImp.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, UtilForHD.GetNowTimeForId());
		query.setParameter(1, civilRegistId);
		query.setParameter(2, applyAcceptanceTime);
		query.setParameter(3, projectManagerName);
		query.setParameter(4, tel);
		query.setParameter(5, contractmanuFacturers);
		query.setParameter(6, contractmanuFacturersTel);
		query.setParameter(7, contactPerson);
		query.setParameter(8, opinion);
		query.setParameter(9, status);
		query.executeUpdate();
		returnString = "yes";
		return returnString;
	}
	
	
	
	
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag){
		try {
			/*String hql = "update CivilRepair t " +
					"set t.approvalstate = '"+flag+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();*/
			String sql = "UPDATE TB_ENGINEERINGEXEMANADETAILS a \n"+
						 "SET a.status = ? \n"+
						 "WHERE a.id = ? \n";
			SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
			query.setParameter(0, flag);
			query.setParameter(1, id);
			query.executeUpdate();
			log.info("修改TB_ENGINEERINGEXEMANADETAILS 表的审批状态为2(审批中)---成功!");
		} catch (Exception e) {
			log.info("修改TB_ENGINEERINGEXEMANADETAILS 表的审批状态为2(审批中)---失败!");
			e.printStackTrace();
		}
	}
}