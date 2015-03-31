package com.sysware.customize.hd.investment.investSupport.business;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;
import com.sysware.util.StrUtil;

/**
 * @ClassName: BusinessDaoImpl
 * @Description: 商情与报价模块 DAO 实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:55:33 AM
 * 
 */

@Name("businessDaoImpl")
public class BusinessDaoImpl implements BusinessDao {
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _connomDao;

	public List<Object> getInfo(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
//		sql.append("select  ");
//		sql.append("  t.contract_id,");
//		sql.append("  t.contract_name,");
//		sql.append("  t.contract_code,");
//		sql.append("  t.department_a,");
//		sql.append("  t.department_b,");
//		sql.append("  t.contract_amount,");
//		sql.append("  t.createdate,");
//		sql.append("  t.contract_file,");
//		sql.append("  t.remark,");
//		sql.append("  t.status");
//		sql.append("  from t_contract t where 1=1 ");
//
//		sql.append(" order by t.contract_id desc");
		
		sql.append("select t.materialitemcode,");
		sql.append("   t.materialitemname,");
		sql.append("   t.materialstandard,");
		sql.append("   t.materialtypename,");
		sql.append("   t.price,");
		sql.append("   t.create_date,");
		sql.append(" t.item_id");
		sql.append(" from v_material_newprice t where 1=1 ");
		
		if(!StrUtil.isNullOrEmpty(vo.getCode())){
			sql.append(" and t.materialitemcode ='");
			sql.append(vo.getCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getName())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getScale())){
			sql.append(" and t.materialstandard ='");
			sql.append(vo.getScale());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			sql.append(" and t.materialtypename ='");
			sql.append(vo.getType());
			sql.append("'");
		}

		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getInfoCount(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) ");
		sql.append(" from v_material_newprice t where 1=1 ");
		
		if(!StrUtil.isNullOrEmpty(vo.getCode())){
			sql.append(" and t.materialitemcode ='");
			sql.append(vo.getCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getName())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getScale())){
			sql.append(" and t.materialstandard ='");
			sql.append(vo.getScale());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			sql.append(" and t.materialtypename ='");
			sql.append(vo.getType());
			sql.append("'");
		}

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());

	}

	public List<Object> getOtherPriceInfo(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.vendname,");
		sql.append("   t.vendorcode,");
		sql.append("   t.materialitemname,");
		sql.append("   t.materialstandard,");
		sql.append("   t.materialtypename,");
		sql.append("   t.new_price,");
		sql.append("   t.create_date");
		sql.append(" from v_smaterial_price t");
		sql.append(" where t.materialitemcode='");
		sql.append(vo.getCode());
		sql.append("'");

		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getOtherPriceInfoCount(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select  count(*) ");
		sql.append("  from v_smaterial_price t");
		sql.append(" where t.item_id='");
		sql.append(vo.getCode());
		sql.append("'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getHistoryPic(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.create_date, t.new_price");
		sql.append("  from v_smaterial_price t");
//		sql.append(" where t.item_id='");
		sql.append(" where t.materialitemcode='");
		sql.append(vo.getCode());
		sql.append("'");
		sql.append(" group by t.create_date, t.new_price");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();
		
		return list;
	}

	public List<Object> getAnalysePic(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.create_date, t.price, t.arrival_num");
		sql.append("  from v_material_history t where t.create_date is not null ");
		if(vo.getMaterialid()!=null){
			sql.append(" and t.item_id='"+vo.getMaterialid()+"'");
		}
		sql.append("  group by t.create_date, t.price, t.arrival_num");
			
		Query q = _connomDao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();
		return list;
	}

	public List<Object> getIndagateInfo(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		
		sql.append("select t.materialitemcode,");
		sql.append("   t.materialitemname,");
		sql.append("   t.materialstandard,");
		sql.append("   t.materialtypename,");
		sql.append("   '' as ratio,");
		sql.append("   t.contract_code,");
		sql.append("   t.contract_name,");
		sql.append("   t.price,t.item_id");
		sql.append(" from v_material_newprice t where 1=1 ");
		
		if(!StrUtil.isNullOrEmpty(vo.getCode())){
			sql.append(" and t.materialitemcode ='");
			sql.append(vo.getCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getName())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPartType())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getPartType());
			sql.append("'");
		}
		
		if(!StrUtil.isNullOrEmpty(vo.getRatio())){
			sql.append(" and t.materialstandard ='");
			sql.append(vo.getRatio());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			sql.append(" and t.materialtypename ='");
			sql.append(vo.getType());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.createdate >='");
			sql.append(vo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.createdate <='");
			sql.append(vo.getEndDate());
			sql.append("'");
		}

//		System.out.println("输出："+sql.toString());
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();
		return list;
	}
	
	public Long getIndagateInfoCount(BusinessVo vo) {
		StringBuilder sql = new StringBuilder();
		
		sql.append("select count(*) ");
		sql.append(" from v_material_newprice t where 1=1 ");
		
		if(!StrUtil.isNullOrEmpty(vo.getCode())){
			sql.append(" and t.materialitemcode ='");
			sql.append(vo.getCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getName())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPartType())){
			sql.append(" and t.materialitemname ='");
			sql.append(vo.getPartType());
			sql.append("'");
		}
		
		if(!StrUtil.isNullOrEmpty(vo.getRatio())){
			sql.append(" and t.materialstandard ='");
			sql.append(vo.getRatio());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			sql.append(" and t.materialtypename ='");
			sql.append(vo.getType());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.createdate >='");
			sql.append(vo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.createdate <='");
			sql.append(vo.getEndDate());
			sql.append("'");
		}
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	@SuppressWarnings("unchecked")
	public List<?> getProjectInfo(BusinessVo vo) {
		// TODO Auto-generated method stub
		
		StringBuffer params=new StringBuffer();
		if(vo.getProjectnum()!=null&&!vo.getProjectnum().equals("")){
			params.append(" and v.projectnum='"+vo.getProjectnum()+"'");
		}
		if(vo.getProjectname()!=null&&!vo.getProjectname().equals("")){
		    params.append(" and v.projectname like '"+vo.getProjectname()+"%'");
		}
		
		String sql="select count(*) from BUSINESS_PROJECTINFO_V v where 1=1 "+params.toString();
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		
		sql="select * from BUSINESS_PROJECTINFO_V v where 1=1 "+params;
		List<Object[]> list=_connomDao.getHibernateSession().createSQLQuery(sql)
		                              .setFirstResult(vo.getStart())
		                              .setMaxResults(vo.getLimit()).list();
		
		
		List<JSONObject> objList=new ArrayList<JSONObject>();
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("projectnum", objs[0]);
			jo.put("projectname", objs[1]);
			jo.put("projectamount", objs[2]);
			jo.put("amountunit", objs[3]);
			jo.put("projecttype", objs[4]);
			jo.put("state", objs[5]);
			objList.add(jo);
		}
		return objList;
	}
	
	
}
