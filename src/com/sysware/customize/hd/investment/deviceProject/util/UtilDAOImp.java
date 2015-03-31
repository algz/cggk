package com.sysware.customize.hd.investment.deviceProject.util;

/**
 * 
 */

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONObject;

import org.hibernate.Session;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.luck.itumserv.services.security.LoginUser;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.util.RoleEnum;

/**
 * @author algz
 * 
 */
@Name("untilsDAOImp")
public class UtilDAOImp implements UtilDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	public static String dateToStr(Date date, String s) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s);
		String s1 = "";
		if (date != null && !"".equals(date))
			s1 = simpledateformat.format(date);
		return s1;
	}

	public static Date strToDate(String s, String s1) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s1);
		Date date = new Date();
		if (s != null && !"".equals(s) && !"null".equals(s))
			try {
				date = simpledateformat.parse(s);
			} catch (ParseException parseexception) {
				parseexception.printStackTrace();
			}
		return date;
	}

	public static Date strToNoneDate(String s, String s1) {
		if(s==null||s.equals("")){
			return null;
		}
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s1);
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
			count_sql = "select count(1) from V_IMPLPLANCONTRACT_FIXED vi where vi.status=8 and vi.CONTRACTSIGNINGDEPARTMENT='"+depcode+"'";
			list_sql = "select vi.id,vi.PROJECTNUM,vi.PROJECTNAME,vi.PROJECTCATEGORYS from V_IMPLPLANCONTRACT_FIXED vi where vi.status=8 and vi.CONTRACTSIGNINGDEPARTMENT='"+depcode+"'";
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
	public List<?> getProjectDateData(UtilVo vo) {
		List<Object[]> list = new ArrayList<Object[]>();
		String count_sql = "";
		String list_sql = "";

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
		return list;
	}

	public List<?> getSupplierData(UtilVo vo) {
		String sql = "select count(*) from T_VENDOR v where v.EVALUATION_STATUS='2' and v.KIND='1'";
		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		sql = "select v.VENDORID,v.VENDORNAME from T_VENDOR v where v.EVALUATION_STATUS='2' and v.kind='1'";
		return dao.getHibernateSession().createSQLQuery(sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
	}

	public List<?> getDepartmentList(UtilVo vo) {
		String params = "";
		if(vo.getDepartmentName()!=null && !vo.getDepartmentName().equals("")){
			params += "and d.departmentname like '%"+vo.getDepartmentName()+"%' ";
		}
		String sql = "select count(*) from T_DEPARTMENTS d where 1=1 "+params;
		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		sql = "select d.depcode,d.departmentName from T_DEPARTMENTS d where 1=1 "+params;
		return dao.getHibernateSession().createSQLQuery(sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
	}

	public List<?> getDepartmentsByUser(UtilVo vo) {
		// TODO Auto-generated method stub
		Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
		String instcode=identity.getLoginUser().getInstcode();
		String sql="SELECT distinct d.DEPCODE FROM T_DEPARTMENTS d start WITH d.DEPCODE='"+instcode+"' CONNECT by  d.DEPCODE= prior d.PARENTCODE ";
		return dao.getHibernateSession().createSQLQuery(sql).list();
	}

	public List<?> getRolesByUser(UtilVo vo){
		Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
		String userid=identity.getLoginUser().getUserid().toString();
		String sql="select DISTINCT t.ROLEID  from T_ROLE_USER t where t.USERID='"+userid+"'";
		return dao.getHibernateSession().createSQLQuery(sql).list();
	}

	public List<?> getRolesByUser2(UtilVo vo){
		String sql="select DISTINCT t.ROLEID  from T_ROLE_USER t where t.USERID='"+vo.getProjectmanagerid()+"'";
		return dao.getHibernateSession().createSQLQuery(sql).list();
	}

	public JSONObject getLoginUser() {
		JSONObject jo=new JSONObject();
		Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
		LoginUser user=identity.getLoginUser();
		jo.put("userid", user.getUserid());
		jo.put("truename", user.getTruename());
		return jo;
	}
	
	/**
	 * 判断当前用户是否领导
	 * @return true不是领导;false是领导
	 */
	public static boolean isLeader(Session session){
		 //获取当前登录用户信息
		Identity identity  = (Identity)Component
		.getInstance("org.jboss.seam.security.identity",true);
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select count(1) " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		BigDecimal count = (BigDecimal)session.createSQLQuery(sql).uniqueResult();
		if(!count.equals(BigDecimal.ZERO)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 获取物资大类
	 * @param session
	 * @param materialcode
	 * @return
	 */
	public static MaterialCatalog getMaterialCatalogByMaterialID(Session session,String materialid){
		String sql="select t.* from (select mc.* from t_materialcatalog mc start with mc.materialcatalogid=(select distinct m.parentid from t_material m where m.materialid=:materialid) connect by  prior mc.parentid=mc.materialcatalogid)t where t.parentid='0'";
		return (MaterialCatalog)session.createSQLQuery(sql).addEntity("t",MaterialCatalog.class).setParameter("materialid", materialid).uniqueResult();
	}
}
