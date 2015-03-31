package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.common.dao.Pager;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogUser;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorCondition;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;

@Name("tenderSuppliersDaoImpl")
public class TenderSuppliersDaoImpl extends GenericDAOImpl<TenderSuppliers> implements TenderSuppliersDao {

	
	@In(create = true)
	Identity identity;

	@SuppressWarnings("unchecked")
	public List<TenderSuppliers> getTenderSuppliersGridData(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		String hql="select count(*) from TenderSuppliers ts where ts.parity.parityId=:parityId";
		Long count=(Long)getHibernateSession().createQuery(hql)
		                                      .setParameter("parityId", vo.getParityId())
		                                      .setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		hql="from TenderSuppliers ts where ts.parity.parityId=:parityId";
		List<TenderSuppliers> tsList=getHibernateSession().createQuery(hql)
		                                                  .setParameter("parityId", vo.getParityId())
		                                                  .setFirstResult(vo.getStart())
		                                                  .setMaxResults(vo.getLimit()).list();
		return tsList;
	}

	@Transactional
	public String saveTenderSuppliers(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub

		JSONArray ja = JSONArray.fromObject(vo.getJson());
		for (Object obj : ja) {
			JSONObject jo = JSONObject.fromObject(obj);
			TenderSuppliers ts = new TenderSuppliers();
			if(jo.getString("id")!=null&&!jo.getString("id").equals("")){
				ts=(TenderSuppliers)this.getHibernateSession().get(TenderSuppliers.class, jo.getString("id"));
			}else{
				
			}
			if (vo.getParityId() != null) {
				ts.setParity((Parity) this.getHibernateSession().get(
						Parity.class, vo.getParityId()));
			}
			if (jo.getString("vendorId") != null&&!jo.getString("vendorId").equals("")) {
				ts.setVendor((Vendor) this.getHibernateSession().get(
						Vendor.class, jo.getString("vendorId")));
			}
			if (jo.getString("vendorPrice") != null&&!jo.getString("vendorPrice").equals("")) {
				ts.setPrice(new BigDecimal(jo.getString("vendorPrice")));
			}
//			if (vo.getStatus() != null) {
//				ts.setStatus(vo.getStatus());
//			}
			this.getHibernateSession().saveOrUpdate(ts);
		}
		return null;
	}

	@Transactional
	public String deleteTenderSuppliers(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		JSONArray ja=JSONArray.fromObject(vo.getId());
		for(Object jo:ja){
			String id=(String)jo;
			TenderSuppliers ts=(TenderSuppliers)this.getHibernateSession().get(TenderSuppliers.class,id);
			if(ts!=null){
				this.getHibernateSession().delete(ts);
			}
		}

		return null;
	}
	
	
	public List<Vendor> filterAllVendor(TenderSuppliersVo vo){
		String hql="select count(*) from VendorMaterial vm where vm.material.materialid=:materialid ";
		if(vo.getVendorId()!=null && !vo.getVendorId().equals(""))
			hql+="and vm.vendor.vendorID!='"+vo.getVendorId()+"'";
		Long count=(Long)this.getHibernateSession().createQuery(hql)
		                     .setParameter("materialid", vo.getMaterialId()) 
		                     .setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		hql="select vm.vendor from VendorMaterial vm where vm.material.materialid=:materialid ";
		if(vo.getVendorId()!=null && !vo.getVendorId().equals(""))
			hql+="and vm.vendor.vendorID!='"+vo.getVendorId()+"'";
		List<Vendor> vendorList=this.getHibernateSession().createQuery(hql)
		                     .setParameter("materialid", vo.getMaterialId()) 
		                     .setFirstResult(vo.getStart())
		                     .setMaxResults(vo.getLimit()).list();
		return vendorList;
	}
	
//	/**
//	 * 根据条件查询比价、招投信息记录
//	 * 
//	 * @param condition
//	 *            条件
//	 * @return 采购大纲
//	 */
//	@SuppressWarnings("unchecked")
//	public List<Parity> getParityListByCondition(ParityCondition condition) {
//		StringBuilder queryStr = new StringBuilder();
//		
//		// 登陆用户只能查看编辑人为自己的比价/招标计划
//		if(condition.getEditors()!=null)//比价审批的时候判断条件是比价的ID
//		queryStr.append(" and ( tp.editors='" + condition.getEditors()
//				+ "' or  tp.editors is null ) ");
//		// 比价招标信息主键查询条件
//		if (StringUtils.isNotBlank(condition.getParityId())) {
//			queryStr.append(" and tp.ParityID = '" + condition.getParityId() + "'");
//		}
//		// 比价招标信息类型查询条件
//		if (StringUtils.isNotBlank(condition.getType())) {
//			if(condition.getType().equals("1"))
//				queryStr.append(" and tp.type in ('1','4')");
//			else
//				queryStr.append(" and tp.type = '" + condition.getType() + "'");
//		}
//		// 物料种类名称查询条件
//		if (StringUtils.isNotBlank(condition.getSearchCatlogName())) {
//			queryStr.append(" and tp.PurchaseID in (select p.PurchaseID from t_purchase p where p.MaterialTypeName like  '"
//					+ condition.getSearchCatlogName().trim() + "%' )");
//		}
//		// 物料信息名称查询条件
//		if (StringUtils.isNotBlank(condition.getSearchMaterialName())) {
//			queryStr.append(" and tp.MaterialID in (select tm.MATERIALID from T_Material tm where tm.materialItemName like '"
//					+ condition.getSearchMaterialName().trim() + "%') ");
//		}
//
//		// 用户权限控制
//		String materialCatalogSql = MaterialCatalogRole.getMaterialCatalogRoleByUserId(identity.getLoginUser().getUserid());
//		queryStr.append(" and  tp.MaterialID in (select tm.MATERIALID from T_Material tm where tm.parentid in ("
//				+ materialCatalogSql + "))");
//		
//		StringBuilder str=new StringBuilder(queryStr);
//		str.insert(0, "select count(*) from T_Parity tp where 1=1");
//		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(str.toString()).setMaxResults(1).uniqueResult();
//		condition.setCount(count.intValue());
//		queryStr.insert(0," select * from T_Parity tp where 1=1");
//		
//		return this.executeNativeQuery(queryStr.toString(), Parity.class, null,
//				condition.getStart(), condition.getLimit());
//	}
//
//	/**
//	 * 根据条件查询比价、招投信息记录数
//	 * 
//	 * @param parityCondition
//	 *            条件
//	 * @return 比价、招投信息记录数
//	 */
//	public Long getCountByCondition(ParityCondition parityCondition) {
//		StringBuilder queryStr = new StringBuilder();
//		queryStr.append(" select count(*) from T_Parity t where 1=1 ");
//		queryStr.append(" and ( t.editors='" + parityCondition.getEditors()
//				+ "' or  t.editors is null ) ");
//		// 比价招标信息主键查询条件
//		if (StringUtils.isNotBlank(parityCondition.getParityId())) {
//			queryStr.append(" and t.ParityID = '" + parityCondition.getParityId() + "'");
//		}
//		// 比价招标信息类型查询条件
//		if (StringUtils.isNotBlank(parityCondition.getType())) {
//			queryStr.append(" and t.type = '" + parityCondition.getType() + "'");
//		}
//		// 物料种类名称查询条件
//		if (StringUtils.isNotBlank(parityCondition.getSearchCatlogName())) {
//			queryStr.append(" and t.PurchaseID in (select p.PurchaseID from t_purchase p where p.MaterialTypeName like  '"
//					+ parityCondition.getSearchCatlogName().trim() + "%' )");
//		}
//		// 物料信息名称查询条件
//		if (StringUtils.isNotBlank(parityCondition.getSearchMaterialName())) {
//			queryStr.append(" and t.MaterialID in (select tm.MATERIALID from T_Material tm where tm.materialItemName like '"
//					+ parityCondition.getSearchMaterialName().trim() + "%') ");
//		}
//		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(), null, 0, 0).get(0))
//				.longValue();
//	}
//
//	public int getParityMaxCode(String purchaseType, String procurementType) {
//		// 锁定该表，以保证并发情况下正确的获得MaxCode
//		// 该锁定将在当前事务提交或回滚时释放
//		String lockSql = "lock table t_parity in exclusive mode";
//		this.em.createNativeQuery(lockSql).executeUpdate();
//
//		String sql = "select substr(max(parityCode),7) + 1 from t_parity t " + " where t.type= '"
//				+ purchaseType + "'";
//		sql += " and t.parityCode like '%"
//				+ ProcurementTypeEnum.getByValue(procurementType).getCode() + "%'";
//
//		Object obj = this.em.createNativeQuery(sql).getSingleResult();
//		if (obj == null) {
//			return 1;
//		}
//		return ((BigDecimal) obj).intValue();
//	}
//
//	/**
//	 * 根据sql语句查询得结果集转换为拥有相应目标实体类范型的集合
//	 * 
//	 * @param String
//	 *            nnq 目标 sql语句
//	 * @param Class
//	 *            resultClass 所要转换为的目标实体类
//	 * @param Object
//	 *            [] params sql 命名参数
//	 * @param int begin 分页参数
//	 * @param int max 分页参数
//	 * @return List<Class resultClass>
//	 */
//	@SuppressWarnings("unchecked")
//	private List executeNativeQuery(final String nnq, Class resultClass, final Object[] params,
//			final int begin, final int max) {
//
//		SQLQuery query = this.getHibernateSession().createSQLQuery(nnq);
//		query.addEntity(resultClass);
//
//		int parameterIndex = 1;
//		if (params != null && params.length > 0) {
//			for (Object obj : params) {
//				query.setParameter(parameterIndex++, obj);
//			}
//		}
//		if (begin >= 0 && max > 0) {
//			query.setFirstResult(begin);
//			query.setMaxResults(max);
//		}
//		List ret = query.list();
//
//		if (ret != null && ret.size() >= 0) {
//			return ret;
//		} else {
//			return new ArrayList(0);
//		}
//
//	}
//
//	/**
//	 * 查询比价单中标的供应商金额
//	 * @param paritydetailId 比价详细Id
//	 * @param vendorId 供应商Id
//	 * 
//	 */
//	public BigDecimal getAmout(String parityId, String vendorId) {
//		StringBuilder queryStr = new StringBuilder();
//	    queryStr.append(" select t.price * tp.actualnumber from t_parity t,t_procurementdetail tp where t.purchaseid = tp.purchaseid and t.materialid = tp.materialid  ");
//		queryStr.append(" and t.parityid = ?  and  t.vendorid=? ");   
//		Query query = this.createSqlQuery(queryStr.toString());
//		query.setParameter(1, parityId); 
//		query.setParameter(2,vendorId); 
//		return (BigDecimal)query.getSingleResult();
//	}
}
