package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.base.jdbc.SingleConnection;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.util.RoleEnum;

/**
 * 申报计划DAO实现
 * 
 * @author fanzhihui
 *
 */
@Name("declarePlan_DeclarePlanDaoImpl")
public class DeclarePlanDaoImpl extends GenericDAOImpl<DeclarePlan> implements DeclarePlanDao {

	@In(create = true)
	Identity identity; 
	
	public List<DeclarePlan> findByCondition(DeclarePlanCondition  condition) {
		StringBuilder queryStr = new StringBuilder("select dp from DeclarePlan dp ,Guser user where dp.editer=user.userid ");
//		queryStr.append("and dp.editer = '"+condition.getEditer()+"'");
		List<Object> params = new ArrayList<Object>();
		int parms_index = 1;
		if (StringUtils.isNotEmpty(condition.getDeclareplanType())){
			queryStr.append(" and ");
			queryStr.append(" dp.declareplanType = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareplanType());
			parms_index ++;
		}
		if (StringUtils.isNotEmpty(condition.getMinAmount())){
			queryStr.append(" and ");
			queryStr.append(" dp.amount >= ?");
			queryStr.append(parms_index);
			params.add(condition.getMinAmount());
			parms_index ++;
		}
		if (StringUtils.isNotEmpty(condition.getMaxAmount())){
			queryStr.append(" and ");
			queryStr.append(" dp.amount <= ?");
			queryStr.append(parms_index);
			params.add(condition.getMaxAmount());
			parms_index ++;
		}
		if (StringUtils.isNotEmpty(condition.getEditer())){
			queryStr.append(" and ");
			queryStr.append(" user.truename like ?");
			queryStr.append(parms_index);
			params.add("%"+condition.getEditer()+"%");
			parms_index ++;
		}
		
		if (StringUtils.isNotEmpty(condition.getStatus())){
			queryStr.append(" and ");
			queryStr.append(" dp.status = ?");
			queryStr.append(parms_index);
			params.add(condition.getStatus());
			parms_index ++;
		}
		if(isNotLeader()){
			queryStr.append(" and dp.editer = '"+identity.getLoginUser().getUserid()+"'");
		}
		if (StringUtils.isNotEmpty(condition.getEditDate())){
			queryStr.append(" and ");
			queryStr.append(" dp.editDate = to_date(?");
			queryStr.append(parms_index);
			queryStr.append(",'yyyy-mm-dd')");
			params.add(condition.getEditDate());
		}
		queryStr.append(" order by dp.editDate desc,dp.sendDate desc ");
	
		return this.query(queryStr.toString(), params.toArray(),
				condition.getStart(), condition.getLimit());
	}

	public long countByCondition(DeclarePlanCondition condition) {

		StringBuilder queryStr = new StringBuilder("select count(*) from DeclarePlan dp ,Guser user where dp.editer=user.userid ");
		List<Object> params = new ArrayList<Object>();
		int parms_index = 1;
		if (StringUtils.isNotEmpty(condition.getEditer())){
			queryStr.append(" and ");
			queryStr.append(" user.truename like ?");
			queryStr.append(parms_index);
			params.add(condition.getEditer());
			parms_index ++;
		}
		
		if (StringUtils.isNotEmpty(condition.getStatus())){
			queryStr.append(" and ");
			queryStr.append(" dp.status = ?");
			queryStr.append(parms_index);
			params.add(condition.getStatus());
			parms_index ++;
		}
		if(isNotLeader()){
			queryStr.append(" and dp.editer = '"+identity.getLoginUser().getUserid()+"'");
		}
		if (StringUtils.isNotEmpty(condition.getEditDate())){
			queryStr.append(" and ");
			queryStr.append(" dp.editDate <= to_date(?");
			queryStr.append(parms_index);
			queryStr.append(",'yyyy-mm-dd')");
			params.add(condition.getEditDate());
		}
		
		return (Long) (this.query(queryStr.toString(), params.toArray(), 0, 0)
				.get(0));
	
	}

	public List<DeclarePlanVo> getDeclareDepartment(DeclarePlanCondition condition) {
		List<DeclarePlanVo> results = new ArrayList<DeclarePlanVo>();
//		StringBuilder queryStr = new StringBuilder("select demartmentid ,departmentname,total_count ,total_amount," +
//				" num from ( select demartmentid ,departmentname,total_count ,total_amount,rownum num " +
//				" from decleare_dept_v dv ,t_Departments ds where dv.demartmentid = ds.depcode" +
//				"  and total_count>=0 and total_amount>=0) v where v.num between ");
		StringBuilder queryStr = new StringBuilder("select v.demartmentid,v.departmentname,count(v.demartmentid) as total_count,sum(v.amount) as total_amount ") ;
//				"from V_DECLAREDETAILBYDEPT v " +
//				"where 1=1 " );
		if(isNotLeader()){
			if(!isAllMaterial()){
				queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,ip.login_name,tdd.amount,");	
			}else{
				queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,tdd.amount,");
			}
			queryStr.append("tm.materialitemname,tm.materialitemcode,tdd.quantity,tdd.use ");
			queryStr.append("FROM T_DECLARE TD ");
			queryStr.append("LEFT JOIN T_DEPARTMENTS tpd ON TD.DEMARTMENTID = tpd.DEPCODE ");
			queryStr.append("LEFT JOIN T_DECLARE_DETIL TDD ON TD.DECLARE_ID = TDD.DECLARE_ID ");
			queryStr.append("INNER JOIN T_MATERIAL TM ON TDD.MATERIAL_ID = TM.MATERIALID ");
//			判断是否有全部物资权限
			if(!isAllMaterial()){
				queryStr.append("INNER JOIN T_ITEM_PROFILE IP ON TM.MATERIALITEMCODE = IP.ITEM_CODE ");
			}
			queryStr.append("WHERE tdd.declare_detil_status IN(1) ");
			queryStr.append("AND td.status='3') v ");
			queryStr.append("where 1=1 ");
			if(!isAllMaterial()){
				queryStr.append("and v.login_name='"+condition.getEditer()+"' ");
			}
		}else{
			queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,tdd.amount,");
			queryStr.append("tm.materialitemname,tm.materialitemcode,tdd.quantity,tdd.use ");
			queryStr.append("FROM T_DECLARE TD ");
			queryStr.append("LEFT JOIN T_DEPARTMENTS tpd ON TD.DEMARTMENTID = tpd.DEPCODE ");
			queryStr.append("LEFT JOIN T_DECLARE_DETIL TDD ON TD.DECLARE_ID = TDD.DECLARE_ID ");
			queryStr.append("INNER JOIN T_MATERIAL TM ON TDD.MATERIAL_ID = TM.MATERIALID ");
			queryStr.append("WHERE tdd.declare_detil_status IN(1) ");
			queryStr.append("AND td.status='3') v ");
			queryStr.append("where 1=1 ");
		}
//		queryStr.append(condition.getStart()+1);
//		queryStr.append(" and ");
//		queryStr.append(condition.getStart()+condition.getLimit());
		
		if (StringUtils.isNotEmpty(condition.getDepartmentName())){
			queryStr.append(" and ");
			queryStr.append("departmentName like '%");
			queryStr.append(condition.getDepartmentName());
			queryStr.append("%'");
		}
		
		if (StringUtils.isNotEmpty(condition.getTotalAmount())){
			queryStr.append(" and ");
			queryStr.append("total_amount");
			queryStr.append(condition.getTotalAmount());
		}

		if (StringUtils.isNotEmpty(condition.getTotalCount())){
			queryStr.append(" and ");
			queryStr.append("total_count");
			queryStr.append(condition.getTotalCount());
		}
		queryStr.append(" group by v.demartmentid,v.departmentname");
		List<Object[]> list = this.createSqlQuery(queryStr.toString()).setMaxResults(condition.getLimit()).setFirstResult(condition.getStart()).getResultList();
		for(Object[] obs  : list){
			DeclarePlanVo declarePlanVo = new DeclarePlanVo();
			declarePlanVo.setDepartmentId(obs[0] != null ? obs[0].toString() : "");
			declarePlanVo.setDepartmentName(obs[1] != null ? obs[1].toString() : "");
			declarePlanVo.setTotalCount(obs[2] != null ? obs[2].toString() : "");
			declarePlanVo.setTotalAmount(obs[3] != null ? obs[3].toString() : "");
//			declarePlanVo.setRownum(obs[4] != null ? obs[4].toString() :"");
			results.add(declarePlanVo);
		}
		return results;
	}
	

	public long countDeclareDepartment(DeclarePlanCondition condition) {
//		StringBuilder queryStr = new StringBuilder();
//		queryStr.append("select count(*) from ( select demartmentid ,departmentname,total_count ,total_amount,rownum num  from decleare_dept_v dv ,t_Departments ds where dv.demartmentid = ds.depcode  and total_count>0 and total_amount>0) v where 1 = 1 ");
		StringBuilder queryStr = new StringBuilder("select count(1) from(select v.demartmentid,v.departmentname,count(v.demartmentid) as total_count,sum(v.amount) as total_amount " +
				"from V_DECLAREDETAILBYDEPT v " +
				"where 1=1 " );
		if(isNotLeader()){
			queryStr.append("and v.login_name='"+condition.getEditer()+"' ");
		}
		if (StringUtils.isNotEmpty(condition.getDepartmentName())){
			queryStr.append(" and ");
			queryStr.append("departmentName like '%");
			queryStr.append(condition.getDepartmentName());
			queryStr.append("%'");
		}
		
		if (StringUtils.isNotEmpty(condition.getTotalAmount())){
			queryStr.append(" and ");
			queryStr.append("total_amount");
			queryStr.append(condition.getTotalAmount());
		}

		if (StringUtils.isNotEmpty(condition.getTotalCount())){
			queryStr.append(" and ");
			queryStr.append("total_count");
			queryStr.append(condition.getTotalCount());
		}
		queryStr.append("group by v.demartmentid,v.departmentname)");
		return ((BigDecimal) this.createSqlQuery(queryStr.toString())
				.getSingleResult()).longValue();
	}

	public List<DeclarePlanVo> getDeclareUse(DeclarePlanCondition condition) {
		List<DeclarePlanVo> results = new ArrayList<DeclarePlanVo>();
//		StringBuilder queryStr = new StringBuilder("select use ,total_count ,total_amount, num from (select use ,total_count ,total_amount,rownum num  from decleare_use_v where total_count>=0 and total_amount>=0) v where v.num between ");
//		queryStr.append(condition.getStart()+1);
//		queryStr.append(" and ");
//		queryStr.append(condition.getStart()+condition.getLimit());
		StringBuilder queryStr = new StringBuilder("select v.use,count(v.use) as total_count,sum(v.amount) as total_amount ");
//				"from V_DECLAREDETAILBYDEPT v " +
//				"where 1=1 " );
//		if(isNotLeader()){
//			queryStr.append("and v.login_name='"+condition.getEditer()+"' ");
//		}
		if(isNotLeader()){
			if(!isAllMaterial()){
				queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,ip.login_name,tdd.amount,");
			}else{
				queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,tdd.amount,");
			}
			queryStr.append("tm.materialitemname,tm.materialitemcode,tdd.quantity,tdd.use ");
			queryStr.append("FROM T_DECLARE TD ");
			queryStr.append("LEFT JOIN T_DEPARTMENTS tpd ON TD.DEMARTMENTID = tpd.DEPCODE ");
			queryStr.append("LEFT JOIN T_DECLARE_DETIL TDD ON TD.DECLARE_ID = TDD.DECLARE_ID ");
			queryStr.append("INNER JOIN T_MATERIAL TM ON TDD.MATERIAL_ID = TM.MATERIALID ");
			if(!isAllMaterial()){
				queryStr.append("INNER JOIN T_ITEM_PROFILE IP ON TM.MATERIALITEMCODE = IP.ITEM_CODE ");
			}
			queryStr.append("WHERE tdd.declare_detil_status IN(1) ");
			queryStr.append("AND td.status='3') v ");
			queryStr.append("where 1=1 ");
			if(!isAllMaterial()){
				queryStr.append("and v.login_name='"+condition.getEditer()+"' ");
			}
		}else{
			queryStr.append("from (SELECT TD.DEMARTMENTID,tpd.departmentname,tdd.amount,");
			queryStr.append("tm.materialitemname,tm.materialitemcode,tdd.quantity,tdd.use ");
			queryStr.append("FROM T_DECLARE TD ");
			queryStr.append("LEFT JOIN T_DEPARTMENTS tpd ON TD.DEMARTMENTID = tpd.DEPCODE ");
			queryStr.append("LEFT JOIN T_DECLARE_DETIL TDD ON TD.DECLARE_ID = TDD.DECLARE_ID ");
			queryStr.append("INNER JOIN T_MATERIAL TM ON TDD.MATERIAL_ID = TM.MATERIALID ");
			queryStr.append("WHERE tdd.declare_detil_status IN(1) ");
			queryStr.append("AND td.status='3') v ");
			queryStr.append("where 1=1 ");
		}
		if (StringUtils.isNotEmpty(condition.getUse())){
			queryStr.append(" and ");
			queryStr.append("use like '%");
			queryStr.append(condition.getUse());
			queryStr.append("%'");
		}
		
		if (StringUtils.isNotEmpty(condition.getTotalAmount())){
			queryStr.append(" and ");
			queryStr.append("total_amount");
			queryStr.append(condition.getTotalAmount());
		}

		if (StringUtils.isNotEmpty(condition.getTotalCount())){
			queryStr.append(" and ");
			queryStr.append("total_count");
			queryStr.append(condition.getTotalCount());
		}
		queryStr.append("group by v.use");
		List<Object[]> list = this.createSqlQuery(queryStr.toString()).setMaxResults(condition.getLimit()).setFirstResult(condition.getStart()).getResultList();
		for(Object[] obs  : list){
			DeclarePlanVo declarePlanVo = new DeclarePlanVo();
			declarePlanVo.setUse(obs[0].toString());
			declarePlanVo.setTotalCount(obs[1]==null?"":obs[1].toString());
			declarePlanVo.setTotalAmount(obs[2]==null?"":obs[2].toString());
//			declarePlanVo.setRownum(obs[3]==null?"":obs[3].toString());
			results.add(declarePlanVo);
		}
		return results;
	}

	public long countDeclareUse(DeclarePlanCondition condition) {
//		StringBuilder queryStr = new StringBuilder();
//		queryStr.append("select count(*) from (select use ,total_count ,total_amount,rownum num  from decleare_use_v  where total_count>0 and total_amount>0) v  where 1=1");
		StringBuilder queryStr = new StringBuilder("select count(1) from(select v.use,count(v.use) as total_count,sum(v.amount) as total_amount " +
				"from V_DECLAREDETAILBYDEPT v " +
				"where 1=1 " );
		if(isNotLeader()){
			queryStr.append("and v.login_name='"+condition.getEditer()+"' ");
		}
		if (StringUtils.isNotEmpty(condition.getUse())){
			queryStr.append(" and ");
			queryStr.append("use like '%");
			queryStr.append(condition.getUse());
			queryStr.append("%'");
		}
		
		if (StringUtils.isNotEmpty(condition.getTotalAmount())){
			queryStr.append(" and ");
			queryStr.append("total_amount");
			queryStr.append(condition.getTotalAmount());
		}

		if (StringUtils.isNotEmpty(condition.getTotalCount())){
			queryStr.append(" and ");
			queryStr.append("total_count");
			queryStr.append(condition.getTotalCount());
		}
		queryStr.append("group by v.use)");
		return ((BigDecimal) this.createSqlQuery(queryStr.toString())
				.getSingleResult()).longValue();
	}

	public String getPlan_Code() {
		String code = null;
		Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call Auto_Code_p.Get_Auto_Code_p(?,?,?,?)}";
		CallableStatement proc;
		ResultSet rs = null;
	
		try {
			proc = conn.prepareCall(call);
			proc.setString(1, new SimpleDateFormat("yyyyMMdd").format(new Date()));
			proc.setString(2, "CGSB_");
			proc.registerOutParameter(3, oracle.jdbc.OracleTypes.INTEGER);
			proc.registerOutParameter(4, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
			code = (String) proc.getObject(4); 
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			sc.colseConnection(conn);
		}
		
		return code;
	}

	public void saveDeclarePlan(String declareplanName, String declareplanCode, String userId,
			String declareId,String declareplanType,String propertyType) {
		
		Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call Auto_Code_p.Sbjh_Plan_Insert_p(?,?,?,?,?,?,?,?)}";
		CallableStatement proc;
		ResultSet rs = null;
//	    if(declareplanType.equals("计划内"))
//	    	declareplanType = "1";
//	    else
//	    	declareplanType = declareplanType.equals("应急")?"2":"3";
		try {
			proc = conn.prepareCall(call);
			proc.setString(1, declareplanName);
			proc.setString(2, declareplanCode);
			proc.setString(3, userId);
			proc.setDate(4, new java.sql.Date(new Date().getTime()));
			proc.setString(5, declareId);
//			proc.setString(6,declareplanType);
			proc.setString(6,propertyType);
			proc.registerOutParameter(7, oracle.jdbc.OracleTypes.INTEGER);
			proc.registerOutParameter(8, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			sc.colseConnection(conn);
		}
		
		
	}

	public void callBack(String declareDetilId) {
		Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call Auto_Code_p.Sbjh_Plan_Back_p(?,?,?)}";
		//String call = "{call Auto_Code_p.Sbjh_Back_P(?,?,?)}";
		CallableStatement proc; 
		try {
			proc = conn.prepareCall(call);
			proc.setString(1, declareDetilId); 
			proc.registerOutParameter(2, oracle.jdbc.OracleTypes.INTEGER);
			proc.registerOutParameter(3, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute(); 
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			sc.colseConnection(conn);
		}
	}
	
	public  List getdeclarePlanDetilListByDeclarePlanId(String declarePlanId){
		String sql = "select declare_detil_id from T_DECLAREPLAN_DETIL where DeclarePlan_ID = '"+declarePlanId+"'";
		return this.createSqlQuery(sql).getResultList();
	}

	public String getDeclareDetilName(String declarePlanDetilId) {
		return (String) createSqlQuery("select obj.materialItemName from T_Material obj "+
				  "left join t_Declare_Detil dd on obj.materialid = dd.material_id "+
				  "left join t_Declareplan_Detil dpd on dd.declare_detil_id = dpd.declare_detil_id "+
				  "where dpd.declareplan_detil_id = '"+declarePlanDetilId+"'").getSingleResult();
	}

	public void updateProperties(String[] declareplanIDs, String status) {
		 for(String declareplanID:declareplanIDs){
			 createSqlQuery("update T_DeclarePlan set status ='"+status+"' where DeclarePlan_ID ='"+declareplanID+"'").executeUpdate();
			 // 送审后设定送审时间
			 if("3".equals(status)){
				 createSqlQuery("update T_DeclarePlan set senddate = SYSDATE where DeclarePlan_ID ='"+declareplanID+"'").executeUpdate();
			 }
		 } 
	}

	public List<Object[]> getDeclarePlanByCondition(DeclarePlanVo declarePlanvo) {
		String sql = getSql(declarePlanvo,"td.declareplan_name,td.declareplan_code,tdd.declareplan_detil_id,t.amount,tdd.status,td.editdate,tu.truename");
		Query query = this.createSqlQuery(sql);
		query.setFirstResult(declarePlanvo.getStart());
		query.setMaxResults(declarePlanvo.getLimit());
		return query.getResultList();
	}

	public BigDecimal getDeclarePlanByConditionCount(DeclarePlanVo declarePlanvo) {
		return (BigDecimal) this.createSqlQuery(getSql(declarePlanvo,"count(*)")).getSingleResult();
	}
	private String getSql(DeclarePlanVo declarePlanvo,String name){
		StringBuilder sql = new StringBuilder();
		sql.append(" select "+name+" from t_declareplan_detil tdd  ");
		sql.append(" left join t_declareplan td on tdd.declareplan_id = td.declareplan_id ");
		sql.append(" left join t_declare_detil t on tdd.declare_detil_id = t.declare_detil_id ");
		if(declarePlanvo.getProcurementplanType().equals("1"))
			sql.append(" left join t_procurementplan_fixed_detil tpf on tdd.declareplan_detil_id = tpf.declareplan_detil_id  ");
		else
			sql.append(" left join t_procurementplan_detil tpf on tdd.declareplan_detil_id = tpf.declareplan_detil_id  ");
		sql.append(" left join t_procurementplan tp on tpf.procurementplan_id = tp.procurementplan_id ");
		sql.append(" left join t_user tu on td.editer = to_char(tu.userid) ");
		sql.append(" where tp.procurementplan_id = '"+declarePlanvo.getProcurementplanId()+"' ");
		return sql.toString();
	}

	public void createDeclarePlan(DeclarePlan dp) {
		this.getHibernateSession().save(dp);
	}

	public void delDeclareDetail(String[] ids) {
		String param = "";
		for(int i = 0; i < ids.length; i++){
			param  = param + "'" +ids[i]+ "',";
		}
		param = param.substring(0, param.length()-1);
		String sql = "delete from T_DECLARE_DETIL t " +
				"where t.declare_detil_id in (" + param +")";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}

	public void delDeclarePlanDetail(String[] ids) {
		String param = "";
		for(int i = 0; i < ids.length; i++){
			param  = param + "'" +ids[i]+ "',";
		}
		param = param.substring(0, param.length()-1);
		String sql = "delete from T_DECLAREPLAN_DETIL t " +
				"where t.declare_detil_id in (" + param +")";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}

	public long getCountByDeclareId(String idd) {
		String sql = "select count(*) from t_declare_detil t " +
				"where t.declare_id = '"+ idd +"'";
		String count = this.getHibernateSession().createSQLQuery(sql).uniqueResult().toString();
		return Long.valueOf(count);
	}

	public void submitDeclarePlan(String[] ids) {
		String param = "";
		for(int i = 0; i < ids.length; i++){
			param  = param + "'" +ids[i]+ "',";
		}
		param = param.substring(0, param.length()-1);
		String sql = "update t_declareplan t " +
				"set t.status = '4' " +
				"where t.declareplan_id in ("+param+")";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}

	public String getDeclareIdByPlanId(String id) {
		String sql = "SELECT DISTINCT d.declare_id "+
			"FROM t_declareplan a,T_DECLAREPLAN_DETIL b,T_DECLARE_DETIL c,T_DECLARE d "+
			"WHERE a.declareplan_id=b.declareplan_id "+
			"AND b.declare_detil_id=c.declare_detil_id "+
			"AND c.declare_id=d.declare_id "+
			"AND a.declareplan_id='"+id+"'";
		Object obj = this.getHibernateSession().createSQLQuery(sql).uniqueResult();
		return obj==null?"":obj.toString();
	}

	public void delDeclarePlan(String id) {
		String sql = "delete from T_DECLAREPLAN t where t.declareplan_id ='"+id+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}

	public void delDeclarePlanDetail(String id) {
		String sql = "delete from T_DECLAREPLAN_DETIL t where t.declareplan_id ='"+id+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}
	public void delDeclare(String id) {
		String sql = "delete from T_DECLARE t where t.declare_id  ='"+id+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}
	public void delDeclareDetail(String id){
		String sql = "delete from T_DECLARE_DETIL t where t.declare_id  ='"+id+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}
	
	public List<Object[]> getDeptypeList() {

		String s1 = "select t.depcode,t.departmentname " +
				"from t_Departments t " +
				"where t.instlevel is not null";

		return this.createSqlQuery(s1).getResultList();
	}

	/**
	 * 判断当前用户是否领导
	 * @return
	 */
	public boolean isNotLeader(){
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 判断是否全部物资权限
	 * @return
	 */
	public boolean isAllMaterial(){
		String roleId = RoleEnum.ALLMATERIAL.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return false;
		}else{
			return true;
		}
	} 
}
