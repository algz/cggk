package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("declareDetail_DeclareDetailDaoImpl")
public class DeclareDetailDaoImpl extends GenericDAOImpl<DeclareDetail> implements DeclareDetailDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true)
	Identity identity; 

	public List<DeclareDetail> getByDeclareId(String declareId, int start, int limit, String declareDetailStatus) {
		String sql = " and obj.declareDetailStatus = '2' ";
		if (declareDetailStatus.equals("1"))
			sql = " and obj.declareDetailStatus != '2' ";
		return this.find(" obj.declareId=?1 " + sql, new String[] { declareId }, start, limit);
	}

	public long countByDeclareId(String declareId, String declareDetailStatus) {
		String sql = " and dd.declareDetailStatus = '2' ";
		if (declareDetailStatus.equals("1"))
			sql = " and dd.declareDetailStatus != '2' ";
		Query query = this.createQuery("select count(*) from DeclareDetail dd where dd.declareId=?1 " + sql);
		query.setParameter(1, declareId);
		return (Long) query.getSingleResult();
	}

	public void batchDeleteByIds(String[] declareDetailIds) {
		for (String declareDetailId : declareDetailIds) {
			this.remove(declareDetailId);
		}
		String sql="select d.* from t_declare d,t_declare_detil dd where d.declare_id=dd.declare_id and dd.declare_detil_id=:declareDetilId";
		Declare d=(Declare)dao.getHibernateSession().createSQLQuery(sql).addEntity("d",Declare.class)
		                                                       .setParameter("declareDetilId", declareDetailIds[0])
		                                                       .setMaxResults(1).uniqueResult();
		d.setQuantity(d.getQuantity().subtract(new BigDecimal(declareDetailIds.length)));
	}

	public void batchDeleteByDeclareId(String declareId) {
		Query query = this.createQuery("delete from DeclareDetail dd where dd.declareId=?1 ");
		query.setParameter(1, declareId);
		query.executeUpdate();
	}

	@Transactional
	public void batchUpdateByDeclareId(String declareId, String status) {
		int i = dao.getHibernateSession().createQuery("update DeclareDetail dd set dd.declareDetailStatus=:status  where dd.declareId=:declareid").setParameter("declareid",
				declareId).setParameter("status", status).executeUpdate();
		System.out.print(i);
	}

	// update by 王立法 20120112 修改过滤条件 申报项状态从原来的1 申报主表的状态从2更改为3
	public List getByCondition(DeclareDetailCondition condition) {
		/*
		 * StringBuilder queryStr = new
		 * StringBuilder("select distinct dd.declareDetailId," +
		 * "dd.amount,dd.declareDetailStatus,dd.materialid,dd.materialCatalogName"
		 * +
		 * ",dd.quantity,dd.use,dd.declareId,dd.declareType,dd.amount,dd.useDate,"
		 * +
		 * "dp.departmetname,dp.departmetname,dp.departmetname from  DeclareDetail dd,"
		 * +
		 * "Declare dl,Department dp where dd.declareId = dl.declareId and dd.declareDetailStatus in ('1','2')"
		 * + " and dl.departmentId=dp.depcode and dl.status='3' ");
		 */

		StringBuilder queryStr = new StringBuilder("select distinct \t" + "dd.declareDetailId, \t" + "dd.amount,\t" + "dd.declareDetailStatus,\t" + "dd.materialid,\t"
//		StringBuilder queryStr = new StringBuilder("select \t" + "dd.declareDetailId, \t" + "dd.amount,\t" + "dd.declareDetailStatus,\t" + "dd.materialid,\t"
				+ "dd.materialCatalogName,\t" + "dd.quantity,\t" + "dd.use,\t" + "dd.declareId,\t" + "dd.declareType,\t" + "dd.amount,\t" + "dd.useDate, \t"
				+ "dp.departmetname,\t" + "dp.departmetname,\t" + "dp.departmetname, \t" + "dd.reportType, \t" + "dd.remark, \t" + "dd.taskno, \t"
				+ "dd.contactPerson, \t" + "dd.contactTelephone, \t"+ "dd.declareId, \t" 
				+ "dd.oldquantity,dd.changer,dd.changeTime,dd.changeReson "
				+ "from  DeclareDetail dd,Declare dl,Department dp,Material m,ItemProfile ip \t" 
				+ "where dd.declareId = dl.declareId \t" 
				+ "and dd.declareDetailStatus in ('1') \t"
				+ "and dl.departmentId = dp.depcode \t" 
				+ "and dl.status='3' \t"
				+ "and dd.materialid=m.materialid \t"
				+ "and m.materialitemcode=ip.itemCode \t");
		if(isNotLeader()){
			if(!isAllMaterial()){
				queryStr.append("and ip.loginName='"+identity.getLoginUser().getLoginname()+"' \t");
			}
		}

		if ((condition.getDeclareplanID() != null && !"".equals(condition.getDeclareplanID()))
				|| (condition.getDeclareplanDetilID() != null && !"".equals(condition.getDeclareplanDetilID()))) {

			queryStr = new StringBuilder("select distinct \t" + "dd.declareDetailId,\t" + "dd.amount,\t" + "dd.declareDetailStatus,\t" + "dd.materialid,\t"
//			queryStr = new StringBuilder("select \t" + "dd.declareDetailId,\t" + "dd.amount,\t" + "dd.declareDetailStatus,\t" + "dd.materialid,\t"
					+ "dd.materialCatalogName,\t" + "dd.quantity,\t" + "dd.use,\t" + "dd.declareId,\t" + "dd.declareType,\t" + "dd.amount,\t" + "dd.useDate,\t" + "dpd.status,\t"  
					+ "dpd.declarePlanDetilId,\t" + "dp.departmetname, \t" + "dd.reportType, \t" + "dd.remark, \t" + "dd.taskno, \t"
					+ "dd.contactPerson, \t" + "dd.contactTelephone, \t"+ "dd.declareId, \t"
					+ "dd.oldquantity,dd.changer,dd.changeTime,dd.changeReson "
					+ "from DeclareDetail dd,Declare dl,Department dp,DeclarePlanDetil dpd,Material m \t" 
					+ "where dd.declareId = dl.declareId \t" 
					+ "and dd.declareDetailStatus in ('3','5') \t"
					+ "and dl.departmentId = dp.depcode \t" 
					+ "and dd.declareDetailId = dpd.declareDetilId \t "
					+ "and dd.materialid=m.materialid \t");
		}
		List<Object> params = new ArrayList<Object>();
		int parms_index = 1;

		if (StringUtils.isNotEmpty(condition.getDepartmentName())) {
			queryStr.append(" and ");
			queryStr.append(" dp.departmetname like ?");
			queryStr.append(parms_index);
			params.add("%" + condition.getDepartmentName() + "%");
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getDeclareType())) {
			queryStr.append(" and ");
			queryStr.append(" dd.declareType = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareType());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getMaterialCatalogName())) {
			queryStr.append(" and ");
			queryStr.append(" dd.materialCatalogName = ?");
			queryStr.append(parms_index);
			params.add(condition.getMaterialCatalogName());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getUseDate())) {
			queryStr.append(" and ");
			queryStr.append(" dd.useDate = to_date(?");
			queryStr.append(parms_index);
			queryStr.append(",'yyyy-mm-dd')");
			params.add(condition.getUseDate());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getDeclareplanID())) {
			queryStr.append(" and ");
			queryStr.append(" dpd.declarePlanId = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareplanID());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getUse())) {
			queryStr.append(" and ");
			queryStr.append(" dd.use = ?");
			queryStr.append(parms_index);
			params.add(condition.getUse());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getDepartmentId())) {
			queryStr.append(" and ");
			queryStr.append(" dl.departmentId = ?");
			queryStr.append(parms_index);
			params.add(condition.getDepartmentId());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getDeclareplanDetilID())) {
			queryStr.append(" and ");
			queryStr.append(" dpd.declarePlanDetilId = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareplanDetilID());
			parms_index++;
		}
		condition.setCount(this.query(queryStr.toString(), params.toArray(), 0, 0).size());
		return this.query(queryStr.toString(), params.toArray(), condition.getStart(), condition.getLimit());
	}

	// update by 王立法 20120113 修改过滤条件：把“dl.status”的值从2更改为3
	public long countByByCondition(DeclareDetailCondition condition) {
		// TODO Auto-generated method stub
		StringBuilder queryStr = new StringBuilder("select count(*) from  " +
				"DeclareDetail dd,Declare dl,Department dp,Material m,ItemProfile ip \t" +
				"where dd.declareId = dl.declareId " +
				"and dd.declareDetailStatus in('1') " + 
				"and dl.departmentId=dp.depcode " +
				"and dl.status='3' " +
				"and dd.materialid=m.materialid \t"+
				"and m.materialitemcode=ip.itemCode \t");
		if(isNotLeader()){
			if(!isAllMaterial()){
				queryStr.append("and ip.loginName='"+identity.getLoginUser().getLoginname()+"' \t");
			}
		}
		if ((condition.getDeclareplanID() != null && !"".equals(condition.getDeclareplanID()))
				|| (condition.getDeclareplanDetilID() != null && !"".equals(condition.getDeclareplanDetilID()))){
			queryStr = new StringBuilder("select count(*) from  " +
					"DeclareDetail dd,Declare dl,Department dp,DeclarePlanDetil dpd,Material m \t " + 
					"where dd.declareId = dl.declareId "+ 
					"and dd.declareDetailStatus='3' " + 
					"and dl.departmentId = dp.depcode " + 
					"and dd.declareDetailId = dpd.declareDetilId " +
					"and dd.materialid=m.materialid \t");
			}
		List<Object> params = new ArrayList<Object>();
		int parms_index = 1;

		if (StringUtils.isNotEmpty(condition.getDepartmentName())) {
			queryStr.append(" and ");
			queryStr.append(" dp.departmetname like ?");
			queryStr.append(parms_index);
			params.add("%" + condition.getDepartmentName() + "%");
			parms_index++;
		}
		if (StringUtils.isNotEmpty(condition.getDeclareplanID())) {
			queryStr.append(" and ");
			queryStr.append(" dpd.declarePlanId = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareplanID());
			parms_index++;
		}
		if (StringUtils.isNotEmpty(condition.getDeclareType())) {
			queryStr.append(" and ");
			queryStr.append(" dd.declareType = ?");
			queryStr.append(parms_index);
			params.add(condition.getDeclareType());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getMaterialCatalogName())) {
			queryStr.append(" and ");
			queryStr.append(" dd.materialCatalogName = ?");
			queryStr.append(parms_index);
			params.add(condition.getMaterialCatalogName());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getUseDate())) {
			queryStr.append(" and ");
			queryStr.append(" dd.useDate = to_date(?");
			queryStr.append(parms_index);
			queryStr.append(",'yyyy-mm-dd')");
			params.add(condition.getUseDate());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getUse())) {
			queryStr.append(" and ");
			queryStr.append(" dd.use = ?");
			queryStr.append(parms_index);
			params.add(condition.getUse());
			parms_index++;
		}

		if (StringUtils.isNotEmpty(condition.getDepartmentId())) {
			queryStr.append(" and ");
			queryStr.append(" dl.departmentId = ?");
			queryStr.append(parms_index);
			params.add(condition.getDepartmentId());
			parms_index++;
		}

		return (Long) this.query(queryStr.toString(), params.toArray(), 0, 0).get(0);
	}

	public List<Object[]> getGridDataByType(DeclareDetailVo declareDetailVo) {
		String sql = getSql(declareDetailVo, " t.materialcatalog_name,t.quantity,t.amount,t.use,t.usedate,t.filename,t.fileid,t.material_id ");
		Query query = this.createSqlQuery(sql);
		query.setFirstResult(declareDetailVo.getStart());
		query.setMaxResults(declareDetailVo.getLimit());
		return query.getResultList();
	}

	public BigDecimal getGridDataByTypeCount(DeclareDetailVo declareDetailVo) {
		return (BigDecimal) this.createSqlQuery(getSql(declareDetailVo, "count(*)")).getSingleResult();
	}

	private String getSql(DeclareDetailVo declareDetailVo, String name) {
		StringBuilder sql = new StringBuilder();
		sql.append("select " + name + " from t_Declare_Detil t ");
		sql.append(" left join t_declareplan_detil tdd on t.declare_detil_id = tdd.declare_detil_id  ");
		if (declareDetailVo.getPlantype().equals("1"))
			sql.append(" left join t_procurementplan_fixed_detil tpf on tdd.declareplan_detil_id = tpf.declareplan_detil_id  ");
		else
			sql.append(" left join t_procurementplan_detil tpf on tdd.declareplan_detil_id = tpf.declareplan_detil_id  ");
		sql.append(" left join t_procurementplan tp on tpf.procurementplan_id = tp.procurementplan_id ");
		sql.append(" where tp.procurementplan_id = '" + declareDetailVo.getProcurementplanId() + "' ");
		return sql.toString();
	}

	
	public String updateDeclareDetail(DeclareDetailVo vo) {
		// TODO Auto-generated method stub
				//获取当前登录用户信息
	    Identity identity  = (Identity)Component
			.getInstance("org.jboss.seam.security.identity");
	    String loginname=identity.getLoginUser().getLoginname();
	    
		DeclareDetail dd=(DeclareDetail)dao.getHibernateSession().get(DeclareDetail.class, vo.getDeclareDetailId());
		if(dd.getOldquantity()==null||dd.getOldquantity().equals(BigDecimal.ZERO)){
			dd.setOldquantity(dd.getQuantity());
		}
		dd.setQuantity(new BigDecimal(vo.getQuantity()));
		dd.setChanger(loginname);
		dd.setChangeTime(new Date());
		dd.setChangeReson(vo.getChangeReson());
		dd.setDeclareDetailStatus("5");
		
	    //采购计划变更需求量
	    String sql="select ppd.* from t_declareplan_detil dpd "
            +"inner join T_ProcurementPlan_detil ppd on ppd.declareplan_detil_id=dpd.declareplan_detil_id "
            +"where dpd.declare_detil_id='"+vo.getDeclareDetailId()+"'";
	    NoFixedStockplanMoreinfo detail=(NoFixedStockplanMoreinfo)dao.getHibernateSession()
	                                        .createSQLQuery(sql)
	                                        .addEntity(NoFixedStockplanMoreinfo.class)
	                                        .uniqueResult();
	    if(detail!=null){
	    	detail.setNeedNumber(dd.getQuantity());
	    }
		
	    //采购过程管理模块:1零星,2年度采购计划
	    sql="update T_PROCUREMENTDETAIL pd set pd.NEEDNUMBER='"+dd.getQuantity()+"'  where pd.DECLARE_DETIL_ID='"+vo.getDeclareDetailId()+"'";
	    dao.getHibernateSession().createSQLQuery(sql).executeUpdate();
	    
		return "";
	}

	public long findDeclarePlanDetailById(String id) {
		String sql = "select COUNT(*) from t_declareplan_detil t " +
				"where t.declareplan_id='"+id+"'";
		return Long.valueOf(this.getHibernateSession().createSQLQuery(sql).uniqueResult().toString());
	}

	public String getDepartmentIdByUserId(String id){
		String sql = "select dep.depcode from T_DEPARTMENTS dep,t_user u " +
				"where u.userid='"+id+"' " +
				"AND dep.depcode=u.instcode";
		return this.getHibernateSession().createSQLQuery(sql).uniqueResult().toString();
	}

	public String getDeclareIdByPlanId(String id) {
		String sql = "SELECT Distinct a.declare_id " +
				"FROM t_declare_detil a,t_declareplan_detil b "+
				"WHERE a.declare_detil_id=b.declare_detil_id "+
				"AND b.declareplan_id='"+id+"'";
		return this.getHibernateSession().createSQLQuery(sql).uniqueResult().toString();
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
