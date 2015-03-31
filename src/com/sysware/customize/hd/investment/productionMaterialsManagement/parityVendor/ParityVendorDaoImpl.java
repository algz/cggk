package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("parity_ParityVendorDaoImpl")
public class ParityVendorDaoImpl extends GenericDAOImpl<ParityVendor> implements ParityVendorDao {

	public List<ParityVendor> getParityVendorListByParityDetail(
			ParityVendorCondition parityVendorCondition) {
		StringBuilder queryStr = new StringBuilder(" select t.paritydetailid,t.price,t.parityvendorid,t.vendorid,v.vendorname,v.phone,v.reposal,v.property from t_parity_vendor t,t_vendor v,t_paritydetail p where p.paritydetailid=t.paritydetailid and v.vendorid=t.vendorid  ");
		
		if(StringUtils.isNotEmpty(parityVendorCondition.getParityDetailId())){
			queryStr.append(" and t.paritydetailid= '"+ parityVendorCondition.getParityDetailId() +"'");
		}
		if(StringUtils.isNotEmpty(parityVendorCondition.getParityId())){
			queryStr.append(" and t.paritydetailid in (select t.paritydetailid from t_paritydetail t where t.parityid=  '"+ parityVendorCondition.getParityId() +"')");
		}
		return this.executeNativeQuery(queryStr.toString(),ParityVendor.class,null, -1, -1);
	}
	public long countParityVendorByCondition(
			ParityVendorCondition condition) {
		if(StringUtils.isNotEmpty(condition.getParityDetailId())){
			return (Long) (this
					.query("select count(*) from ParityVendor t where t.parityDetail.parityDetailId = '"+condition.getParityDetailId()+"'",
							null, 0, 0).get(0));
		}else if(StringUtils.isNotEmpty(condition.getParityId())){
			return (Long) (this
					.query("select count(*) from ParityVendor t where t.parityDetail.parityDetailId in (select t.parityDetailId from ParityDetail t where t.parityId=  '"+ condition.getParityId() +"')",
							null, 0, 0).get(0));
		}else{
			return (Long) (this
					.query("select count(*) from ParityVendor t ",
							null, 0, 0).get(0));
		}
		
	}
	/**
	 * 根据sql语句查询得结果集转换为拥有相应目标实体类范型的集合
	 * 
	 * @param  String nnq  目标 sql语句 
	 * @param  Class resultClass  所要转换为的目标实体类 
	 * @param  Object[] params    sql 命名参数
	 * @param  int begin   分页参数
	 * @param  int max   分页参数 
	 * @return  List<Class resultClass>
	 */
	@SuppressWarnings("unchecked")
	private <T> List<T> executeNativeQuery(final String nnq, Class resultClass,
			final Object[] params, final int begin, final int max) {

		javax.persistence.Query query = this.em.createNativeQuery(nnq,
				resultClass);
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
		List ret = query.getResultList();

		if (ret != null && ret.size() >= 0) {
			return ret;
		} else {
			return new ArrayList();
		}

	}
	public void deleteParityVendorByParityDetailId(String id) {
		StringBuffer sql=new StringBuffer();
		if(StringUtils.isNotEmpty(id)){
			sql.append(" delete from t_parity_vendor t where t.parityDetailId = '"+ id +"'");
			Query query = this.createSqlQuery(sql.toString());
			query.executeUpdate();
		}
	}

}
