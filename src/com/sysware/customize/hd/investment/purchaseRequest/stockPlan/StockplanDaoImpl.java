package com.sysware.customize.hd.investment.purchaseRequest.stockPlan;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.StockplanVo;
import com.sysware.customize.hd.investment.util.RoleEnum;
import com.sysware.util.StrUtil;

/**
 * 采购计划 DAO实现类
 * 
 * @author lit
 * @date 2011-10-18
 * 
 */

@Name("stockPlan_DaoImpl")
public class StockplanDaoImpl implements StockplanDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _dao;

	@In(create = true)
	Identity identity;
	
	private static boolean isStrEmpty(String str) {
		if ("".equals(str) || null == str) {
			return false;
		} else {
			return true;
		}
	}

	// 草案计划主信息
	@SuppressWarnings("unchecked")
	public List<Object> getStockdraftData(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select T.DECLAREPLAN_ID,T.DECLAREPLAN_NAME,T.DECLAREPLAN_CODE,");
		sql.append("SUM(t.AMOUNT),COUNT(1),T.STATUS,t.TRUENAME,T.EDITDATE,");
		sql.append("T.SENDDATE,t.USERID,T.PROPERTYTYPE ");
		sql.append("from v_declarePlanDetail t ");
		if(isNotLeader()){
			sql.append("INNER JOIN t_item_profile ip ON t.materialitemcode=ip.item_code ");
		}
		sql.append("where 1=1 ");
		if(isNotLeader()){
			sql.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
		
/*		sql.append("select t.declareplan_id,");
		sql.append("    t.declareplan_name,");
		sql.append("    t.declareplan_code,");
		sql.append("    t.amount,");
		sql.append("    t.quantity,");
		sql.append("    t.status,");
		//sql.append("    t.editer,");
		sql.append("    u.truename,");
		sql.append("    t.editdate,");
		sql.append("    t.senddate,");
		//申报人编号
		sql.append("    u.userid,");
		//资产类别
		sql.append(" t.propertyType");
		//sql.append(" from T_DeclarePlan t where t.status=4 ");
		sql.append(" from T_DeclarePlan t ");
		sql.append(" left outer join T_user u ");
		sql.append(" on t.editer = u.userid ");
		sql.append(" where t.status=4 or t.status=6");*/
		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status =");
			sql.append(vo.getStatus());
			sql.append("");
		}
		if (isStrEmpty(vo.getMakeTablePerson())) {
			sql.append(" and t.truename like '%");
			sql.append(vo.getMakeTablePerson());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMakeTime())) {
			sql.append(" and t.editdate =to_date('");
			sql.append(vo.getMakeTime().substring(0, 10));
			sql.append("','yyyy-mm-dd')");
		}
		if (isStrEmpty(vo.getDeclarePlanNum())) {
			sql.append(" and t.declareplan_code like '%");
			sql.append(vo.getDeclarePlanNum());
			sql.append("%'");
		}
//		//限定每个人只是看到自己负责的物资。//2012/06/27 修改可查看所有人的计划
//		Long userid=this.identity.getLoginUser().getUserid();
//		sql.append(" and u.userid="+userid);
		sql.append("GROUP BY T.DECLAREPLAN_ID,T.DECLAREPLAN_NAME, T.DECLAREPLAN_CODE,");
		sql.append("T.STATUS,t.TRUENAME,T.EDITDATE,T.SENDDATE,t.USERID,T.PROPERTYTYPE");
		sql.append(" order by t.editdate desc ");
		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit()); 
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();
		return list;
	}

	public Long getStockdraftDataCount(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();

//		sql.append("select count(*) ");
//		sql.append(" from T_DeclarePlan t where t.status=4 ");
		sql.append("select count(*) from (");
		sql.append("select T.DECLAREPLAN_ID,T.DECLAREPLAN_NAME,T.DECLAREPLAN_CODE,");
		sql.append("SUM(t.AMOUNT),COUNT(1),T.STATUS,t.TRUENAME,T.EDITDATE,");
		sql.append("T.SENDDATE,t.USERID,T.PROPERTYTYPE ");
		sql.append("from v_declarePlanDetail t ");
		if(isNotLeader()){
			sql.append("INNER JOIN t_item_profile ip ON t.materialitemcode=ip.item_code ");
		}
		sql.append("where 1=1 ");
		if(isNotLeader()){
			sql.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status =");
			sql.append(vo.getStatus());
			sql.append("");
		}
		if (isStrEmpty(vo.getMakeTablePerson())) {
			sql.append(" and t.truename like'%");
			sql.append(vo.getMakeTablePerson());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMakeTime())) {
			sql.append(" and t.editdate =to_date('");
			sql.append(vo.getMakeTime().substring(0, 10));
			sql.append("','yyyy-mm-dd')");
		}
		if (isStrEmpty(vo.getDeclarePlanNum())) {
			sql.append(" and t.declareplan_code like'%");
			sql.append(vo.getDeclarePlanNum());
			sql.append("%'");
		}
		sql.append("GROUP BY T.DECLAREPLAN_ID,T.DECLAREPLAN_NAME, T.DECLAREPLAN_CODE,");
		sql.append("T.STATUS,t.TRUENAME,T.EDITDATE,T.SENDDATE,t.USERID,T.PROPERTYTYPE)");
		
		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getType(CommonVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.vendorid , t.vendorname  from t_vendor t ");
		Query q = _dao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();
		return list;
	}
	
	// 采购计划主信息
	public List<Object> getStockPlan(StockplanVo vo) {
		StringBuilder sql = new StringBuilder();

		sql.append("select t.procurementplan_id,");
		sql.append("    t.procurementplan_name,");
		sql.append("    t.procurementplan_code,");
		sql.append("    t.plantype,");
		sql.append("    t.status,");
		sql.append("    t.amount,");
		//sql.append("    t.editer,");
		sql.append("    u.truename,");
		sql.append("    t.editdate,");
		sql.append("    t.senddate");
		//sql.append(" from T_ProcurementPlan t where 1=1 ");
		sql.append(" from T_ProcurementPlan t ");
		sql.append(" left outer join T_user u ");
		sql.append(" on t.editer = to_char(u.userid) ");
		sql.append(" where 1=1 ");
		if (isStrEmpty(vo.getPlanName())) {
			sql.append(" and t.procurementplan_name like'%");
			sql.append(vo.getPlanName());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getPlanNum())) {
			sql.append(" and t.procurementplan_code like'%");
			sql.append(vo.getPlanNum());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMinAmount())) {
			sql.append(" and t.amount >='");
			sql.append(vo.getMinAmount());
		}
		if (isStrEmpty(vo.getMaxAmount())) {
			sql.append(" and t.amount <='");
			sql.append(vo.getMaxAmount());
		}
		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status ='");
			sql.append(vo.getStatus());
			sql.append("'");
		}
		if (isStrEmpty(vo.getTruename())) {
			sql.append(" and u.truename like '%");
			sql.append(vo.getTruename());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMarkTime())) {
			sql.append(" and t.editdate = to_date('");
			sql.append(vo.getMarkTime().substring(0, 10));
			sql.append("','yyyy-mm-dd')");
		}
		if(isNotLeader()){
			sql.append(" and t.editer = '"+identity.getLoginUser().getUserid()+"'");
		}
		sql.append(" order by t.status ");
		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getStockPlanCount(StockplanVo vo) {
		StringBuilder sql = new StringBuilder();

		sql.append("select count(*) from(");
		sql.append("select t.procurementplan_id,");
		sql.append("    t.procurementplan_name,");
		sql.append("    t.procurementplan_code,");
		sql.append("    t.plantype,");
		sql.append("    t.status,");
		sql.append("    t.amount,");
		//sql.append("    t.editer,");
		sql.append("    u.truename,");
		sql.append("    t.editdate,");
		sql.append("    t.senddate");
		//sql.append(" from T_ProcurementPlan t where 1=1 ");
		sql.append(" from T_ProcurementPlan t ");
		sql.append(" left outer join T_user u ");
		sql.append(" on t.editer = to_char(u.userid) ");
		sql.append(" where 1=1 ");

		if (isStrEmpty(vo.getPlanName())) {
			sql.append(" and t.procurementplan_name like'%");
			sql.append(vo.getPlanName());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getPlanNum())) {
			sql.append(" and t.procurementplan_code like'%");
			sql.append(vo.getPlanNum());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMinAmount())) {
			sql.append(" and t.amount >='");
			sql.append(vo.getMinAmount());
		}
		if (isStrEmpty(vo.getMaxAmount())) {
			sql.append(" and t.amount <='");
			sql.append(vo.getMaxAmount());
		}
		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status ='");
			sql.append(vo.getStatus());
			sql.append("'");
		}
		if (isStrEmpty(vo.getTruename())) {
			sql.append(" and u.truename like '%");
			sql.append(vo.getTruename());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getMarkTime())) {
			sql.append(" and t.editdate = to_date('");
			sql.append(vo.getMarkTime().substring(0, 10));
			sql.append("','yyyy-mm-dd')");
		}
		if(isNotLeader()){
			sql.append(" and t.editer = '"+identity.getLoginUser().getUserid()+"'");
		}
		sql.append(")");
		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	// 草案计划 详细信息
	public List<Object> getStockdraftDataMoreInfo(PlandraftVo vo) {

		StringBuilder sql = new StringBuilder();
        sql.append("select t.*,tm.parentid,tm.delivery_status from stock_draftplan_moreinfo t ");
        if(isNotLeader()){
            sql.append("left join t_item_profile ip on t.materialitemcode=ip.item_code ");
        }
        sql.append("left join t_material tm on tm.materialitemcode=t.materialitemcode ");
        sql.append("where t.declareplan_id='");
		sql.append(vo.getDeclareId());
		sql.append("' ");
		if(isNotLeader()){
			sql.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
		org.hibernate.Query q = _dao.getHibernateSession().createSQLQuery(sql.toString());
//		                            .setMaxResults(vo.getLimit())
//		                            .setFirstResult(vo.getStart());
		List<Object> list = q.list();//.getResultList();

		return list;
	}

	// 固定资产采购计划详细信息
	public List<Object> getFixedStockPlanMoreInfo(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql
				.append("select * from stock_fixedplan_moreinfo t where t.procurementplan_id= '");
		sql.append(vo.getDeclareId());
		sql.append("'");

		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}
	public Long getFixedStockPlanMoreInfoCount(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql
				.append("select count(0) from stock_fixedplan_moreinfo t where t.procurementplan_id= '");
		sql.append(vo.getDeclareId());
		sql.append("'");

		Query q = _dao.createSqlQuery(sql.toString()); 
		return new Long(q.getSingleResult().toString());
	}

	// 非固定资产采购计划详细信息
	public List<Object> getNoFixedStockPlanMoreInfo(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from stock_nofixedplan_moreinfo t where t.procurementplan_id= '"
						+ vo.getDeclareId()).append("'");
		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}
	public Long getNoFixedStockPlanMoreInfoCount(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql
				.append("select count(0) from stock_nofixedplan_moreinfo t where t.procurementplan_id= '");
		sql.append(vo.getDeclareId());
		sql.append("'");

		Query q = _dao.createSqlQuery(sql.toString()); 
		return new Long(q.getSingleResult().toString());
	}
	public Long getPageCount(String table) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) from  ");
		sql.append(table);
		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	@Transactional
	public String exePro(CommonVo vo) {
		String res = null;
		try {
			if (1 == vo.getFlag()) {
				String proStr = "{call " + vo.getProName() + "(?,?,?,?) }";
				CallableStatement m = _dao.getHibernateSession().connection()
						.prepareCall(proStr);
				m.setDate(1, new Date(System.currentTimeMillis()));
				m.setString(2, "CG_" + System.currentTimeMillis());
				m.registerOutParameter(3, oracle.jdbc.OracleTypes.INTEGER);
				m.registerOutParameter(4, oracle.jdbc.OracleTypes.VARCHAR);
				m.execute();
				res = m.getString(4);
			} else if (2 == vo.getFlag()) {
				//非固定资产采购计划生成,同时进行资源平衡.
				String proStr = "{call " + vo.getProName()
						+ "(?,?,?,?,?,?,?,?,?) }";
				CallableStatement m = _dao.getHibernateSession().connection()
						.prepareCall(proStr);
				m.setString(1, vo.getPlanName());//采购计划名称
				Calendar c = Calendar.getInstance();
				String type = "FGDZC";
				String num = "10";
				
				if(vo.getPlanType().equals("1"))
				{
					type = "GDZC";
					num = "9";
				}
				String code = type+c.get(Calendar.YEAR); 
				String sql = "select max(substr(t.PROCUREMENTPLAN_CODE,"+num+")) from t_procurementplan t where t.PLANTYPE like '%"+vo.getPlanType()+"%'";
				String maxcode =  (String) _dao.createSqlQuery(sql).getSingleResult();
				if(maxcode==null)
					code+="0000001";
				else
				{
					maxcode =new BigDecimal(maxcode).add(new BigDecimal("1")).toString();
					for (int i = 0; i < 7 - String.valueOf(new BigDecimal(maxcode)).length();i++){
						code+="0";
					}
					code+=maxcode;
				} 
				
				m.setString(2, code);//采购计划编号
				m.setString(3, vo.getPlanType());
				m.setString(4, vo.getUserId());
				m.setDate(5, new Date(StrUtil.getDateforString(vo.getInsertDate()).getTime()));
				m.setString(6, vo.getDeclarePlanId());
				m.setString(7,vo.getDeclarePlanDetailId().substring(0, vo.getDeclarePlanDetailId().length()-1));
				m.registerOutParameter(8, oracle.jdbc.OracleTypes.INTEGER);

				m.registerOutParameter(9, oracle.jdbc.OracleTypes.VARCHAR);
				m.execute();
				res = m.getString(8);
			} else if (3 == vo.getFlag()) {//采购计划退回
				String proStr = "{call " + vo.getProName() + "(?,?,?) }";
				CallableStatement m = _dao.getHibernateSession().connection()
						.prepareCall(proStr);
				m.setString(1, vo.getProcurementPlan_ID());
				m.registerOutParameter(2, oracle.jdbc.OracleTypes.INTEGER);
				m.registerOutParameter(3, oracle.jdbc.OracleTypes.VARCHAR);
				m.execute();
				res = m.getString(3);
				//记录审批意见
				//ApprovalInfoService approvalInfoServiceImpl=(ApprovalInfoService)Component.getInstance("approvalInfoServiceImpl");
		        //approvalInfoServiceImpl.save("",vo.getProcurementPlan_ID(),"退回");

			} else if (4 == vo.getFlag()) { // 生产采购合同
				String proStr = "{call " + vo.getProName() + "(?,?,?,?,?,?,?,?,?,?,?,?) }";
				CallableStatement m = _dao.getHibernateSession().connection()
						.prepareCall(proStr);
				m.setString(1, vo.getStockId());
				m.setString(2, vo.getSCode());
				m.setString(3, vo.getContractCode());
				m.setString(4, vo.getContractName());
				m.setLong(5, new Long((vo.getContractAmount()==null?"0":vo.getContractAmount())));
				m.setString(6, identity.getLoginUser().getUserid().toString());
				m.setString(7, vo.getSupplierId());
				m.setString(8, vo.getContractType());
				m.setString(9, vo.getReMark());
				m.setString(10, vo.getFileName());
				m.registerOutParameter(11, oracle.jdbc.OracleTypes.INTEGER);
				m.registerOutParameter(12, oracle.jdbc.OracleTypes.VARCHAR);
				m.execute();
				res = m.getString(12);
			} else {
				res = "执行失败！";
			}
		} catch (Exception e) {
			e.printStackTrace();
			res = "执行失败！";
		}
		return res;
	}

	public Object get(String id, String col, Object obj) {
		String hql = "select obj from " + obj.getClass().getName()
				+ " obj where " + col + "=:id";
		Query q = _dao.createQuery(hql);
		q.setParameter("id", id);
		return q.getSingleResult();
	}

	public List<Object> getGridDataByType(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select v.* from ( ");
		sql.append("select tm.materialItemName,tdd.amount,ts.departmentname,fd.ProcurementType,rownum num,fd.ProcurementPlan_fixed_detil_ID,tdd.Quantity");
		sql.append(",fd.Task_code,fd.Power_consumption,fd.Area,fd.Plant,fd.Installationofplant,tm.MaterialStandard,fd.price,fd.fileId,fd.fileName,tm.MATERIALID ");
		sql.append(" from T_procurementplan_fixed_detil fd ");
		sql.append("left join T_procurementplan tp on fd.procurementplan_id = tp.procurementplan_id  ");
		sql.append("left join T_DeclarePlan_detil dd on fd.declareplan_detil_id = dd.declareplan_detil_id ");
		sql.append("left join T_Declare_Detil tdd on dd.declare_detil_id = tdd.declare_detil_id  ");
		sql.append("left join T_Declare td on tdd.declare_id = td.declare_id ");
		sql.append("left join t_Departments ts on  td.demartmentid = ts.depcode ");
		sql.append("left join t_Material tm on tdd.material_id = tm.materialid ");
		sql.append(" where tp.status = '3' and  tp.plantype = '1' and ");
		if(vo.getMaterialcatalogName().equals("土建"))
		{
			sql.append(" tdd.materialcatalog_name = '"+vo.getMaterialcatalogName()+"' ");
		}
		else{
			sql.append(" tdd.materialcatalog_name != '土建' ");
		}
		if(vo.getProcurementType()!=null)
		{
			if(vo.getProcurementType().equals("type") && vo.getPlanId()==null)
				sql.append(" and fd.ProcurementType is not null and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t)  ");
			else if(!vo.getProcurementType().equals("type") && vo.getTenderId().equals(""))
				sql.append(" and fd.ProcurementType = '"+vo.getProcurementType()+"' and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t)  ");
			else
			{
				sql.append(" and fd.ProcurementType = '"+vo.getProcurementType()+"' and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t where  t.tender_id !='"+vo.getTenderId()+"' ) ");
			}
		}
		else
			sql.append(" and fd.ProcurementType is null ");
		sql.append(") v where ");
		String addSql = getSql(vo); 
		sql.append(getSql(vo));
		if(!"".equals(addSql))
			sql.append(" and ");
		sql.append("   v.num between ");
		sql.append(vo.getStart()+1);
		sql.append(" and ");
		sql.append(vo.getStart()+vo.getLimit());
		return _dao.createSqlQuery(sql.toString()).getResultList();
	}
	
	public long getCountByType(PlandraftVo vo) {
		StringBuilder sql = new StringBuilder(); 
		sql.append("select count(*)  from ( ");
		sql.append("select tm.materialItemName,tdd.amount,ts.departmentname,fd.ProcurementType,rownum num,fd.ProcurementPlan_fixed_detil_ID,tdd.Quantity");
		sql.append(",fd.Task_code,fd.Power_consumption,fd.Area,fd.Plant,fd.Installationofplant,tm.MaterialStandard,fd.price,fd.fileId,fd.fileName,tm.MATERIALID ");
		sql.append(" from T_procurementplan_fixed_detil fd ");
		sql.append("left join T_procurementplan tp on fd.procurementplan_id = tp.procurementplan_id  ");
		sql.append("left join T_DeclarePlan_detil dd on fd.declareplan_detil_id = dd.declareplan_detil_id ");
		sql.append("left join T_Declare_Detil tdd on dd.declare_detil_id = tdd.declare_detil_id  ");
		sql.append("left join T_Declare td on tdd.declare_id = td.declare_id ");
		sql.append("left join t_Departments ts on  td.demartmentid = ts.depcode ");
		sql.append("left join t_Material tm on tdd.material_id = tm.materialid ");
		sql.append(" where tp.status = '3' and  tp.plantype = '1' and ");
		if(vo.getMaterialcatalogName().equals("土建"))
		{
			sql.append(" tdd.materialcatalog_name = '"+vo.getMaterialcatalogName()+"' ");
		}
		else{
			sql.append(" tdd.materialcatalog_name != '土建' ");
		}
		if(vo.getProcurementType()!=null)
		{
			if(vo.getProcurementType().equals("type"))
				sql.append(" and fd.ProcurementType is not null and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t)  ");
			else if(!vo.getProcurementType().equals("type") && vo.getTenderId().equals(""))
				sql.append(" and fd.ProcurementType = '"+vo.getProcurementType()+"' and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t)  ");
			else
			{
				sql.append(" and fd.ProcurementType = '"+vo.getProcurementType()+"' and fd.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t where  t.tender_id !='"+vo.getTenderId()+"' ) ");
			}
		}
		else
			sql.append(" and fd.ProcurementType is null ");
		sql.append(") v  ");
		String addSql = getSql(vo);
		if(!"".equals(addSql))
				sql.append(" where ").append(addSql);
		return ((BigDecimal) _dao.createSqlQuery(sql.toString())
				.getSingleResult()).longValue();
	}
	
	private String getSql(PlandraftVo vo){
		StringBuilder sql = new StringBuilder();
		if(vo.getMaterialItemName()!=null && !"".equals(vo.getMaterialItemName())){
			sql.append(" v.materialItemName = '"+vo.getMaterialItemName()+"' ");
		}
		if(vo.getDepartmentName()!=null && !"".equals(vo.getDepartmentName())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.departmentname ='"+vo.getDepartmentName()+"'");
				
		}
		if(vo.getProcurementType()!=null && !"".equals(vo.getProcurementType())){
			if(sql.length()>0)
				sql.append(" and ");
			if(vo.getProcurementType().equals("type"))
				sql.append("  v.ProcurementType is not null  ");
			else if(!vo.getProcurementType().equals("type") && vo.getPlanId()!=null)
				sql.append("  v.ProcurementType = '"+vo.getProcurementType()+"' and v.procurementplan_fixed_detil_id not in (select t.procurementplan_detil_id from t_tender t)  ");
			else
				sql.append("  v.ProcurementType = '"+vo.getProcurementType()+"' ");
				
		} 
		if(vo.getAmount()!=null && !"".equals(vo.getAmount())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.amount ='"+vo.getAmount()+"'");
				
		}
		if(vo.getTaskCode()!=null && !"".equals(vo.getTaskCode())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.Task_code ='"+vo.getTaskCode()+"'");
				
		}
		if(vo.getMaterialStandard()!=null && !"".equals(vo.getMaterialStandard())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.MaterialStandard ='"+vo.getMaterialStandard()+"'");
				
		}
		if(vo.getQuantity()!=null && !"".equals(vo.getQuantity())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.Quantity ='"+vo.getQuantity()+"'");
				
		}
		if(vo.getPlant()!=null && !"".equals(vo.getPlant())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" v.plant ='"+vo.getPlant()+"'");
				
		} 
		
		return sql.toString();
	}
	
	

	public String getCode() {
		Query q = _dao.createSqlQuery("select lpad(seq_shenqian.nextval,6,0) from dual");
		return q.getSingleResult().toString();
	}

	public void updateFixProcurementtype(String[] fixID,
			String[] procurementtype) {
		
		FixedStockplanMoreinfo info = null;
		int index = 0;
		for(String fixId : fixID)
		{
			info = (FixedStockplanMoreinfo)get(fixId, "fixid", new FixedStockplanMoreinfo());
			info.setProcurementtype(getProcurementtypeValue(procurementtype[index]));
			index++;
		}
	}
	public String getProcurementtypeValue(String procurementtype){
		if(procurementtype.equals("自行招标"))
			return "2";
		else if(procurementtype.equals("委托招标"))
			return "1";
		else if(procurementtype.equals("定向采购"))
			return "3"; 
		else if(procurementtype.equals("自行比价"))
			return "5";
		else
			return "";
	}

	public Long getStockdraftDataMoreInfoCount(PlandraftVo vo) {

		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from(");
		sql.append("select t.*,tm.parentid from stock_draftplan_moreinfo t ");
		if(isNotLeader()){
			sql.append("left join t_item_profile ip on t.materialitemcode=ip.item_code ");
	    }
	    sql.append("left join t_material tm on tm.materialitemcode=t.materialitemcode ");
	    sql.append("where t.declareplan_id='");
//		sql
//				.append("select count(0) from stock_draftplan_moreinfo t where t.declareplan_id='");
		sql.append(vo.getDeclareId());
		sql.append("'");
		if(isNotLeader()){
			sql.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
		sql.append(")");
		Query q = _dao.createSqlQuery(sql.toString());  
		return new Long(q.getSingleResult().toString());
	}
	
	
	public  String getApplyNo(String materialTypeName){
//		CG+材料类别+年+月+四位流水，其中年4位月两位。例如：CG-AA-2012050001。
		//JS金属/FJS非金属/CJ成件/JD机电
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM-");
		StringBuffer applyno=new StringBuffer("CG-");
	    applyno.append(sdf.format(new java.util.Date()));
	    String sql="SELECT cast(SUBSTR(MAX(a.APPLY_NO),12,4) as NUMBER(4)) from T_ProcurementPlan a where SUBSTR(a.APPLY_NO,0,3)='CG-' and TO_CHAR(SYSDATE,'yyyyMM')=SUBSTR(a.APPLY_NO, 5, 6)";
	    BigDecimal applyNo_MAX=(BigDecimal)_dao.getHibernateSession().createSQLQuery(sql).uniqueResult();
		sdf.applyPattern("dd");
		if(applyNo_MAX==null){//sdf.format(new Date()).equals("01")
	    	applyNo_MAX=BigDecimal.ONE;
	    }else{
	    	applyNo_MAX=applyNo_MAX.add(BigDecimal.ONE);
	    }
	    // 0 代表前面补充0  
	    // 4 代表长度为4  
	    // d 代表参数为正数型  
	    applyno.append(String.format("%04d", applyNo_MAX.intValue()));
	    return applyno.toString();
	}

	public String generationProcurementPlan(StockplanVo vo) {
		String planName;//采购计划名称
//		String sql="select m.materialtypename from("
//                    +"select mc.materialtypename,mc.parentid from t_materialcatalog mc start with mc.materialcatalogid=:materialcatalogid "
//                    +"connect by  prior  mc.parentid=mc.materialcatalogid )m where  m.parentid='0'";
//		String materialcatalogname=(String)_dao.getHibernateSession().createSQLQuery(sql)
//		                               .setParameter("materialcatalogid", vo.getMaterialcatalogid())
//		                               .setMaxResults(1).uniqueResult();
		String materialcatalogname=vo.getMaterialcatalogname();
		if(materialcatalogname.equals("黑色金属材料大类")){
			materialcatalogname="JS";
			planName="黑色金属采购计划";
		}else if(materialcatalogname.equals("有色金属材料大类")){
			materialcatalogname="JS";
			planName="有色金属采购计划";
		}else if(materialcatalogname.equals("机电产品大类")){
			materialcatalogname="JD";
			planName="机电产品采购计划";
		}else if(materialcatalogname.equals("航空成附件大类")){
			materialcatalogname="CJ";
			planName="航空成附件采购计划";
		}else if(materialcatalogname.equals("非金属材料大类")){
			materialcatalogname="FJ";
			planName="非金属材料采购计划";
		}else{
			return "物资类别名称为空!";
//			materialcatalogname="WZ";
//			planName="未知材料采购计划";
		}
		String res = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c = Calendar.getInstance();
        String code="CG-"+materialcatalogname+"-";
		String sql ="SELECT cast(SUBSTR(MAX(a.procurementplan_code),7,10) as NUMBER(10)) from T_ProcurementPlan a where SUBSTR(a.procurementplan_code,1,6)='"+code+"' and TO_CHAR(SYSDATE,'yyyyMM')=SUBSTR(a.procurementplan_code, 7,6)";
//		String sql = "select max(substr(t.PROCUREMENTPLAN_CODE,"+num+")) from t_procurementplan t where t.PLANTYPE like '%"+vo.getPlanType()+"%'";
		BigDecimal maxcode =  (BigDecimal) _dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		if(maxcode==null){
			code+=(sdf.format(c.getTime())+"0001");
		}else{
			maxcode =maxcode.add(BigDecimal.ONE);
			code+=maxcode;
		} 
		try {
				//非固定资产采购计划生成,同时进行资源平衡.
				String proStr = "{call Auto_Code_p.Cgjh_Plan_Insert_p (?,?,?,?,?,?,?,?,?) }";
				CallableStatement m = _dao.getHibernateSession().connection()
						.prepareCall(proStr);
				m.setString(1, planName);//采购计划名称
				m.setString(2, code);//采购计划编号
				m.setString(3, "2");//采购计划类型
				m.setString(4, this.identity.getLoginUser().getUserid().toString());//填报人
				//2012-12-20
				m.setDate(5, new Date(c.getTime().getTime()));
//				m.setDate(5, new Date(StrUtil.getDateforString(vo.getInsertDate()).getTime()));
				m.setString(6, vo.getDeclarePlanId());//申报计划ID
				//申报计划字表ID
				m.setString(7,vo.getDeclarePlanDetailId());
				m.registerOutParameter(8, oracle.jdbc.OracleTypes.INTEGER);
				m.registerOutParameter(9, oracle.jdbc.OracleTypes.VARCHAR);
				m.execute();
				res = m.getString(8);
		} catch (Exception e) {
			e.printStackTrace();
			res = "执行失败！";
		}
		return res;
	}
	
	
	public static void  main(String[] args){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c = Calendar.getInstance();
        String code="CG-JS-";
		//String sql ="SELECT cast(SUBSTR(MAX(a.procurementplan_code),6,10) as NUMBER(4)) from T_ProcurementPlan a where SUBSTR(a.procurementplan_code,0,6)='"+code+"' and TO_CHAR(SYSDATE,'yyyyMM')=SUBSTR(a.procurementplan_code, 10,6)";
//		String sql = "select max(substr(t.PROCUREMENTPLAN_CODE,"+num+")) from t_procurementplan t where t.PLANTYPE like '%"+vo.getPlanType()+"%'";
		BigDecimal maxcode = null;// (BigDecimal) _dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		if(maxcode==null){
			code+=(sdf.format(c.getTime())+"0001");
		}else{
			maxcode =maxcode.add(BigDecimal.ONE);
			code+=maxcode;
		} 
		System.out.print(code);
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> exportDeclareReportGridData(PlandraftVo vo) {
		String sql="select rownum,m.materialitemcode, m.materialitemname,m.desingnation,m.materialstandard,m.techniccondition,m.demension,dd.amount,t.actualNumber,dd.usedate,dd.use,dd.taskno,dd.remark "
			+" from T_ProcurementPlan_detil t ,T_DeclarePlan_detil dpd,t_declare_detil dd,t_material m "
			+" where t.procurementplan_id=:planid and dpd.declareplan_detil_id= t.declareplan_detil_id and dpd.declare_detil_id=dd.declare_detil_id and  m.materialid=dd.material_id ";
		List<Object[]> objList=_dao.getHibernateSession().createSQLQuery(sql)
		                                    .setParameter("planid", vo.getPlanId())
		                                    .list();
		List list=new ArrayList();
		list.add(vo);
		list.add(objList);
//		String[] str={"物资名称","规格型号","物资类别","数量","单位","资金预算(单位:元)","采购用途","采购类型","采购编号","使用时间"};
//		list.add(str);
		return list;
	}

	public List getStockplanInfoDetailListGrid(StockplanVo vo) {
		// TODO Auto-generated method stub
		String paramSQL="";
		if(vo.getDesingnation()!=null&&!vo.getDesingnation().equals("")){
			paramSQL+=" and desingnation like '%"+vo.getDesingnation()+"%'";
		}
		if(vo.getMaterialstandard()!=null&&!vo.getMaterialstandard().equals("")){
			paramSQL+=" and materialstandard like '%"+vo.getMaterialstandard()+"%'";
		}
		if(vo.getDeliveryStatus()!=null&&!vo.getDeliveryStatus().equals("")){
			paramSQL+=" and delivery_status like '%"+vo.getDeliveryStatus()+"%'";
		}
		if(vo.getMaterialcatalogname()!=null&&!vo.getMaterialcatalogname().equals("")){
			paramSQL+=" and materialcatalog_name like '%"+vo.getMaterialcatalogname()+"%'";
		}
		if(vo.getUse()!=null&&!vo.getUse().equals("")){
			paramSQL+=" and use like '%"+vo.getUse()+"%'";
		}
		if(vo.getProcurementplanCode()!=null&&!vo.getProcurementplanCode().equals("")){
			paramSQL+=" and procurementplan_code like '%"+vo.getProcurementplanCode()+"%'";
		}
		
		if(vo.getMaterialitemname()!=null&&!vo.getMaterialitemname().equals("")){
			paramSQL+=" and materialitemname like '%"+vo.getMaterialitemname()+"%'";
		}
		if(vo.getMaterialitemcode()!=null&&!vo.getMaterialitemcode().equals("")){
			paramSQL+=" and materialitemcode like'%"+vo.getMaterialitemcode()+"%'";
		}
		if(vo.getTaskno()!=null&&!vo.getTaskno().equals("")){
			paramSQL+=" and taskno like'%"+vo.getTaskno()+"%'";
		}
		BigDecimal count = BigDecimal.ZERO;
		List list=new ArrayList();
		if(isNotLeader()){
			paramSQL += " and ip.login_name='"+identity.getLoginUser().getLoginname()+"'";
			count=(BigDecimal)_dao.getHibernateSession().createSQLQuery("select count(1) from stockplanInfoDetailList vs " +
					"INNER JOIN t_item_profile ip ON vs.materialitemcode=ip.item_code " +
					"where 1=1 "+paramSQL).uniqueResult();
			list=_dao.getHibernateSession().createSQLQuery("select * from stockplanInfoDetailList vs " +
		    		"INNER JOIN t_item_profile ip ON vs.materialitemcode=ip.item_code " +
		    		"where 1=1 "+paramSQL).setFirstResult(vo.getStart())
			                                    .setMaxResults(vo.getLimit())
			                                    .list();
		}else{
			count=(BigDecimal)_dao.getHibernateSession().createSQLQuery("select count(1) from stockplanInfoDetailList vs " +
//					"INNER JOIN t_item_profile ip ON vs.materialitemcode=ip.item_code " +
					"where 1=1 "+paramSQL).uniqueResult();
			list=_dao.getHibernateSession().createSQLQuery("select * from stockplanInfoDetailList vs " +
//		    		"INNER JOIN t_item_profile ip ON vs.materialitemcode=ip.item_code " +
		    		"where 1=1 "+paramSQL).setFirstResult(vo.getStart())
			                                    .setMaxResults(vo.getLimit())
			                                    .list();
		}
		vo.setCount(count.intValue());
	    
		return list;
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
		List list = _dao.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return true;
		}else{
			return false;
		}
	}
}
