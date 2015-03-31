package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("parityDaoImpl")
public class ParityDaoImpl extends GenericDAOImpl<Parity> implements ParityDao {

	
	@In(create = true)
	Identity identity;
	
	/**
	 * 根据条件查询比价、招投信息记录
	 * 
	 * @param condition
	 *            条件
	 * @return 采购大纲
	 */
	@SuppressWarnings("unchecked")
	public List<Parity> getParityListByCondition(ParityCondition condition) {
		StringBuilder queryStr = new StringBuilder();
		/*String leader = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();*/
		// 登陆用户只能查看编辑人为自己的比价/招标计划
		if(condition.getEditors()!=null)//比价审批的时候判断条件是比价的ID
		queryStr.append(" and ( tp.editors='" + condition.getEditors()
				+ "' or  tp.editors is null ) ");
		// 比价招标信息主键查询条件
		if (StringUtils.isNotBlank(condition.getParityId())) {
			queryStr.append(" and tp.ParityID = '" + condition.getParityId() + "'");
		}
		// 比价招标信息类型查询条件
		if (StringUtils.isNotBlank(condition.getType())) {
//			if(condition.getType().equals("1"))
////				queryStr.append(" and tp.type in ('1','4')");
//			else
				queryStr.append(" and tp.type = '" + condition.getType() + "'");
		}
		// 物料种类名称查询条件
		if (StringUtils.isNotBlank(condition.getSearchCatlogName())) {
			queryStr.append(" and tp.PurchaseID in (select p.PurchaseID from t_purchase p where p.MaterialTypeName like  '"
					+ condition.getSearchCatlogName().trim() + "%' )");
		}
		// 物料信息名称查询条件
		if (StringUtils.isNotBlank(condition.getSearchMaterialName())) {
			queryStr.append(" and tp.MaterialID in (select tm.MATERIALID from T_Material tm where tm.materialItemName like '"
					+ condition.getSearchMaterialName().trim() + "%') ");
		}

		// 用户权限控制
//		String materialCatalogSql = MaterialCatalogUser.getMaterialCatalogRoleByUserId(identity.getLoginUser().getUserid());
//		queryStr.append(" and  tp.MaterialID in (select tm.MATERIALID from T_Material tm where tm.parentid in ("
//				+ materialCatalogSql + "))");
		if(isNotLeader()){
			queryStr.append(" and ip.login_name='"+identity.getLoginUser().getLoginname()+"'");
		}
		
		StringBuilder str=new StringBuilder(queryStr);
		if(isNotLeader()){
			str.insert(0, "select count(*) from(select distinct tp.* from T_Parity tp " +
					"inner join t_material m ON tp.materialid = m.materialid " +
					"inner join t_item_profile ip ON m.materialitemcode = ip.item_code " +
					"where 1=1");
		}else{
			str.insert(0, "select count(*) from(select distinct tp.* from T_Parity tp " +
					"left join t_material m ON tp.materialid = m.materialid " +
					"where 1=1");
		}
		str.append(")");
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(str.toString()).setMaxResults(1).uniqueResult();
		condition.setCount(count.intValue());
		if(isNotLeader()){
			queryStr.insert(0," select distinct tp.* from T_Parity tp " +
					"inner join t_material m ON tp.materialid = m.materialid " +
					"inner join t_item_profile ip ON m.materialitemcode = ip.item_code " +
					"where 1=1");
		}
		else{
			queryStr.insert(0," select distinct tp.* from T_Parity tp " +
					"left join t_material m ON tp.materialid = m.materialid " +
					"where 1=1");
		}
		
		List<Parity> parityList=this.getHibernateSession().createSQLQuery(queryStr.toString())
		                            .addEntity("tp",Parity.class)
		                            .setFirstResult(condition.getStart())
		                            .setMaxResults(condition.getLimit())
		                            .list();
		for(Parity parity:parityList){
			String sql="SELECT COUNT(distinct vendorid) AS materialNums FROM t_vendor_material "+
                       "WHERE EXISTS (SELECT 1 FROM T_VENDOR d WHERE d.vendorid = vendorid AND d.type IN ('1','2') AND d.evaluation_status = '2') "+ 
                       "and materialid='"+parity.getMaterialId()+"' GROUP BY materialid";
			BigDecimal vendornums=(BigDecimal)getHibernateSession().createSQLQuery(sql).uniqueResult();
			parity.setVendorNums(vendornums==null?"0":vendornums.toString());
		}
		return this.executeNativeQuery(queryStr.toString(), Parity.class, null,
				condition.getStart(), condition.getLimit());
	}

	/**
	 * 根据条件查询比价、招投信息记录数
	 * 
	 * @param parityCondition
	 *            条件
	 * @return 比价、招投信息记录数
	 */
	public Long getCountByCondition(ParityCondition parityCondition) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select count(*) from T_Parity t where 1=1 ");
		queryStr.append(" and ( t.editors='" + parityCondition.getEditors()
				+ "' or  t.editors is null ) ");
		// 比价招标信息主键查询条件
		if (StringUtils.isNotBlank(parityCondition.getParityId())) {
			queryStr.append(" and t.ParityID = '" + parityCondition.getParityId() + "'");
		}
		// 比价招标信息类型查询条件
		if (StringUtils.isNotBlank(parityCondition.getType())) {
			queryStr.append(" and t.type = '" + parityCondition.getType() + "'");
		}
		// 物料种类名称查询条件
		if (StringUtils.isNotBlank(parityCondition.getSearchCatlogName())) {
			queryStr.append(" and t.PurchaseID in (select p.PurchaseID from t_purchase p where p.MaterialTypeName like  '"
					+ parityCondition.getSearchCatlogName().trim() + "%' )");
		}
		// 物料信息名称查询条件
		if (StringUtils.isNotBlank(parityCondition.getSearchMaterialName())) {
			queryStr.append(" and t.MaterialID in (select tm.MATERIALID from T_Material tm where tm.materialItemName like '"
					+ parityCondition.getSearchMaterialName().trim() + "%') ");
		}
		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(), null, 0, 0).get(0))
				.longValue();
	}

	public int getParityMaxCode(String purchaseType, String procurementType) {
		// 锁定该表，以保证并发情况下正确的获得MaxCode
		// 该锁定将在当前事务提交或回滚时释放
		String lockSql = "lock table t_parity in exclusive mode";
		this.em.createNativeQuery(lockSql).executeUpdate();

		String sql = "select substr(max(parityCode),7) + 1 from t_parity t " + " where t.type= '"
				+ purchaseType + "'";
		sql += " and t.parityCode like '%"
				+ ProcurementTypeEnum.getByValue(procurementType).getCode() + "%'";

		Object obj = this.em.createNativeQuery(sql).getSingleResult();
		if (obj == null) {
			return 1;
		}
		return ((BigDecimal) obj).intValue();
	}

	/**
	 * 根据sql语句查询得结果集转换为拥有相应目标实体类范型的集合
	 * 
	 * @param String
	 *            nnq 目标 sql语句
	 * @param Class
	 *            resultClass 所要转换为的目标实体类
	 * @param Object
	 *            [] params sql 命名参数
	 * @param int begin 分页参数
	 * @param int max 分页参数
	 * @return List<Class resultClass>
	 */
	@SuppressWarnings("unchecked")
	private List executeNativeQuery(final String nnq, Class resultClass, final Object[] params,
			final int begin, final int max) {

		SQLQuery query = this.getHibernateSession().createSQLQuery(nnq);
		query.addEntity(resultClass);

		int parameterIndex = 1;
		if (params != null && params.length > 0) {
			for (Object obj : params) {
				query.setParameter(parameterIndex++, obj);
			}
		}
		if (begin >= 0 && max > 0) {
			query.setFirstResult(begin);
			query.setMaxResults(max);
		}
		List ret = query.list();

		if (ret != null && ret.size() >= 0) {
			return ret;
		} else {
			return new ArrayList(0);
		}

	}

	/**
	 * 查询比价单中标的供应商金额
	 * @param paritydetailId 比价详细Id
	 * @param vendorId 供应商Id
	 * 
	 */
	public BigDecimal getAmout(String parityId, String vendorId) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select par.price*nvl(pd.actualnumber,0) amount ");
		queryStr.append(" from t_parity par inner join t_procurementdetail pd ");
		queryStr.append(" on par.procurementdetailid=pd.procurementdetailid where par.parityid=:parityid ");
		return (BigDecimal)getHibernateSession().createSQLQuery(queryStr.toString())
		                                        .setParameter("parityid", parityId)
		                                        .uniqueResult();
	}

	public List<Parity> getParityGridDataById(ParityVo vo) {
		String hql = "from Parity p " +
				"where p.type = '" + vo.getType() +"' " +
				"and p.applicationStatus <> 5 " +
				"and p.vendorId = '"+vo.getVendorId()+"'";
		List list = this.getHibernateSession().createQuery(hql).list();
		vo.setCount(list.size());
		return this.getHibernateSession().createQuery(hql).
			setMaxResults(vo.getLimit()).setFirstResult(vo.getStart()).list();
	}

	public void delcontractPurchase(String pid, String cid, String mid) {
		String sql = "delete from t_procurementcontract_purchase t " +
				"where t.purchaseid = '"+pid+"' "+
				"and t.procurementcontractid = '"+cid+"' " +
				"and t.materialid = '"+mid+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
	}

	public void updateParityBy(String pid, String vid, String mid, String type) {
		String sql = "update t_parity t " +
				"set t.applicationstatus = 6 " +
				"where t.purchaseid = '"+pid+"' " +
				"and t.materialid = '"+mid+"' " +
				"and t.vendorid = '"+vid+"' " +
				"and t.type = '"+type+"'";
		this.getHibernateSession().createSQLQuery(sql).executeUpdate();
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
}
