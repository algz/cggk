package com.sysware.customize.hd.investment.engineeringProject.util;

/**
 * 
 */

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.SQLQuery;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.model.Pager;

/**
 * @author 
 * 
 */
@Name("engineeringProject_UtilDaoImp")
public class UtilDaoImp implements UtilDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	public static String dateToStr(Date date, String s) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s);
		String s1 = "";
		if (date != null && !"".equals(date))
			s1 = simpledateformat.format(date);
		return s1;
	}

	public static Date strToDate(String s, String pattern) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(pattern);
		Date date = new Date();
		if (s != null && !"".equals(s) && !"null".equals(s))
			try {
				date = simpledateformat.parse(s);
			} catch (ParseException parseexception) {
				parseexception.printStackTrace();
			}
		return date;
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> getProjectData(UtilVo vo) {
		List<Object[]> list = new ArrayList<Object[]>();
		String count_sql = "";
		String list_sql = "";

		if (vo.getProjectDataType().equals("1")) {
			// 实施计划获取数据
			count_sql = "select count(1) from TB_EQUIPREGIST eg,TB_DEVICE_IMPLEMENTPLAN im where IM.EQUIPREGIST_ID=EG.id and im.status=3 ";
			list_sql = "select eg.id,eg.PROJECTNUM,eg.PROJECTNAME,im.IMPLEMENTPLANID from TB_EQUIPREGIST eg,TB_DEVICE_IMPLEMENTPLAN im where IM.EQUIPREGIST_ID=EG.id and im.status=3 ";
		} else if (vo.getProjectDataType().equals("2")) {
			// 设备登记表获取数据(暂没使用)
			count_sql = "select count(1) from TB_EQUIPREGIST er where ER.APPROVALSTATE=7";
			list_sql = "select er.id,er.PROJECTNUM,er.PROJECTNAME from TB_EQUIPREGIST er where ER.APPROVALSTATE=7";
		} else if (vo.getProjectDataType().equals("3")) {
			// 合同管理获取执行管理数据
			// 权限控制,即指定的项目管理员查看自已的项目
			Identity identity = (Identity) Component.getInstance("org.jboss.seam.security.identity");
			String depcode = identity.getLoginUser().getInstcode();
			count_sql = "select count(1) from V_IMPLPLANCONTRACT_FIXED vi  where vi.status='3' and vi.CONTRACTSIGNINGDEPARTMENT is null";
			list_sql = "select vi.id,vi.PROJECTNUM,vi.PROJECTNAME,vi.PROJECTCATEGORYS from V_IMPLPLANCONTRACT_FIXED vi  where vi.status='3' and vi.CONTRACTSIGNINGDEPARTMENT is null";
//			EG.HEADPERSON,eg.useunit
		} else {
			return list;
		}

		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(count_sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		if (count.intValue() != 0) {
			list = dao.getHibernateSession().createSQLQuery(list_sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	public List<?> getProjectDateData(UtilVo vo,Pager pager) {
		List<Object[]> list = new ArrayList<Object[]>();
		String count_sql = "";
		String list_sql = "";
/*
		if (vo.getProjectDataType().equals("1")) {
			// 实施计划日期;
			count_sql = "SELECT  count(DISTINCT extract( year from di.IMPLEMENTPLAN_APPROVALTIME)) APPROVALTIME from TB_DEVICE_IMPLEMENTPLAN di WHERE di.IMPLEMENTPLAN_APPROVALTIME is not NULL";
			list_sql = "SELECT  DISTINCT extract( year from di.IMPLEMENTPLAN_APPROVALTIME) APPROVALTIME from TB_DEVICE_IMPLEMENTPLAN di WHERE di.IMPLEMENTPLAN_APPROVALTIME is not NULL";
		} else if (vo.getProjectDataType().equals("2")) {
			// 查询执行管理日期;
			count_sql = "select count(DISTINCT extract( year from di.MANAGE_APPROVALTIME)) APPROVALTIME from TB_DEVICE_IMPLEMENTPLAN di where di.STATUS IN ('3','4','5','6','7','8') and di.MANAGE_APPROVALTIME is not NULL";
			list_sql = "SELECT  DISTINCT extract( year from di.MANAGE_APPROVALTIME) APPROVALTIME from TB_DEVICE_IMPLEMENTPLAN di where di.STATUS IN ('3','4','5','6','7','8') and di.MANAGE_APPROVALTIME is not NULL";
		} else if (vo.getProjectDataType().equals("3")) {
			// 查询合同管理日期;
			count_sql = "select count(DISTINCT extract( year from dc.APPROVALTIME)) from TB_DEVICE_CONTRACTMANAGEMENT dc WHERE dc.APPROVALTIME is not NULL";
			list_sql = "SELECT  DISTINCT extract( year from dc.APPROVALTIME) APPROVALTIME from TB_DEVICE_CONTRACTMANAGEMENT dc WHERE dc.APPROVALTIME is not NULL";
		} else {
			return list;
		}

		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(count_sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		if (count.intValue() != 0) {
			list = dao.getHibernateSession().createSQLQuery(list_sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		}
		*/
		
		String finalSql = "";
		//实施计划
		String sql1 = 
			"SELECT DISTINCT EXTRACT ( year FROM b.lastupdatetime)\n" +
			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGPLANDETAILS b\n" + 
			"WHERE a.id = b.civilregistid(+)\n" + 
			"AND a.approvalstate = '7'\n" + 
			"AND (b.usetype IS NULL  OR  b.usetype != '2')\n" + 
			"AND b.lastupdatetime IS NOT NULL";
		//执行管理
		String sql2 = 
			"SELECT  DISTINCT SUBSTR(a.approvaltime,1,4) \n" +
			"FROM  TB_CIVILREGIST a , TB_ENGINEERINGEXEMANADETAILS b\n" + 
			"WHERE a.id = b.civilregistid(+)\n" + 
			"AND a.approvalstate = '7'\n" + 
			"AND (b.usetype IS NULL  OR  b.usetype != '1')\n" + 
			"AND b.lastupdatetime IS NOT NULL\n" +
			"AND a.approvaltime IS NOT NULL \n" +
			"AND EXISTS (SELECT 1 FROM  TB_ENGINEERINGPLANDETAILS c\n" + 
			"WHERE c.civilregistid = b.civilregistid\n" + 
			"AND c.status = '已下发') ";
		//合同管理
		String sql3 = 
			"SELECT  DISTINCT SUBSTR(b.approvaltime,1,4)\n" +
			"FROM TB_ENGINEERINGCONTRACT a , TB_CIVILREGIST b\n" + 
			"WHERE 1=1\n" + 
			"AND a.tbcivilregistid = b.id\n" + 
			"AND b.approvalstate = '7'\n" + 
			"AND b.approvaltime IS NOT NULL \n" +
			"AND EXISTS (SELECT 1 FROM  TB_ENGINEERINGPLANDETAILS c\n" + 
			"WHERE c.civilregistid = a.tbcivilregistid\n" + 
			"AND c.status = '已下发') ";
		//设备维修
		String sql4 = 
			"SELECT  DISTINCT substr(a.repairstarttime,1,4)\n" +
			"FROM TB_EQUIPREPAIR a\n" + 
			"AND a.repairstarttime IS NOT NULL \n" +
			"WHERE a.approvalstate = '3'";
		//土建维修
		String sql5 = 
			"SELECT DISTINCT substr(a.repairstarttime,1,4)\n" +
			"FROM TB_CIVILREPAIR a\n" + 
			"AND a.repairstarttime IS NOT NULL \n" +
			"WHERE a.approvalstate = '5'";
		
		if(vo.getProjectDataType().equals("1")){
			finalSql = sql1 ;
		}else if(vo.getProjectDataType().equals("2")){
			finalSql = sql2 ;
		}else if(vo.getProjectDataType().equals("3")){
			finalSql = sql3 ;
		}else if(vo.getProjectDataType().equals("4")){
			finalSql = sql4 ;
		}else if(vo.getProjectDataType().equals("5")){
			finalSql = sql5 ;
		}
		SQLQuery quert = dao.getHibernateSession().createSQLQuery(finalSql);
		//设置分页参数
		/*if(pager != null){
			quert.setFirstResult(pager.getStart());
			quert.setMaxResults(pager.getPageSize());
		}*/
		list = quert.list();
		pager.setRecordCount(list.size());
		return list;
	}

	public List<?> getSupplierData(UtilVo vo) {
		return null;
		/*
		String sql = "select count(*) from T_VENDOR v where v.EVALUATION_STATUS=2";
		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		sql = "select v.VENDORID,v.VENDORNAME from T_VENDOR v where v.EVALUATION_STATUS=2";
		return dao.getHibernateSession().createSQLQuery(sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		*/
	}

}
