package com.sysware.customize.hd.investment.investSupport.buyerInfo;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.investSupport.entity.Buyer;
import com.sysware.customize.hd.investment.investSupport.vo.BuyerVo;
import com.sysware.util.StrUtil;

/**
 * @ClassName: BuyerDaoImpl
 * @Description: 采购员信息模块 DAO实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:56:34 AM
 * 
 */

@Name("buyerDaoImpl")
public class BuyerDaoImpl implements BuyerDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _connomDao;

	public List<Object> getInfo(BuyerVo vo) {
		String s="select count(*) from t_user u INNER JOIN T_ROLE_USER ru ON u.USERID=RU.USERID and ru.ROLEID='4651752'";
		BigDecimal count=(BigDecimal)this._connomDao.getHibernateSession().createSQLQuery(s).uniqueResult();
		vo.setTotalcount(count.intValue());
		
		StringBuilder sql = new StringBuilder();
		sql.append("select t.id,");//主键
//		sql.append("   t.purchase_code,");
		sql.append(" u.loginName,");//登陆名称
		sql.append(" u.trueName,");//姓名
		sql.append("   t.purchase_sex,");//性别
		sql.append("   t.age,");//年龄
		sql.append("   t.title,");//职称
		sql.append(" u.professional,");//职务
		sql.append("   d.departmentName,");//部门
		sql.append("   t.term_life,");
		sql.append("   t.yn_life");
		sql.append(" from T_USER u INNER JOIN T_ROLE_USER ru ON u.USERID=RU.USERID and ru.ROLEID='4651752' LEFT JOIN T_BUYER t  on u.loginName=t.PURCHASE_CODE left join T_DEPARTMENTS d on d.depcode=u.instcode where u.deleteflag!='0' ");
//		sql.append("  from T_Buyer t where 1=1 ");
		if(!StrUtil.isNullOrEmpty(vo.getDept())){
			sql.append(" and d.departmentName ='");
			sql.append(vo.getDept());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPurchase_code())){
			sql.append(" and u.loginName ='");
			sql.append(vo.getPurchase_code());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPurchase_name())){
			sql.append(" and u.trueName ='");
			sql.append(vo.getPurchase_name());
			sql.append("'");
		}

		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getInfoCount(BuyerVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) ");
		sql.append("  from T_Buyer t where 1=1 ");
		if(!StrUtil.isNullOrEmpty(vo.getDept())){
			sql.append(" and t.dept ='");
			sql.append(vo.getDept());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPurchase_code())){
			sql.append(" and t.purchase_code ='");
			sql.append(vo.getPurchase_code());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getPurchase_name())){
			sql.append(" and t.purchase_name ='");
			sql.append(vo.getPurchase_name());
			sql.append("'");
		}

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	// 成交价格列表 。。。？？？？？ 
	public List<Object> getPriceInfo(BuyerVo oo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.id,");
		sql.append("   t.purchase_code,");
		sql.append("   t.purchase_name,");
		sql.append("   t.purchase_sex,");
		sql.append("   t.age,");
		sql.append("   t.title,");
		sql.append("   t.post,");
		sql.append("   t.dept,");
		sql.append("   t.term_life,");
		sql.append("   t.yn_life");
		sql.append("  from T_Buyer t");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(oo.getLimit());
		q.setFirstResult(oo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getPriceInfoCount(BuyerVo oo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from T_Buyer t");

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}
	

	// 价格与质量
	public List<Object> getPriceAndQualityInfo(BuyerVo oo) {
		StringBuilder sql = new StringBuilder();
		sql.append("from t_registration tr ");
		sql.append("inner join t_procurementcontract pc on pc.procurementcontractid=tr.contract_id ");
		sql.append("inner join t_material tm on tr.item_id=tm.materialid ");
		sql.append("inner join t_user u on tr.creater_id=u.userid ");
		sql.append("where u.loginname='"+oo.getCreater()+"'");
		BigDecimal count=(BigDecimal)this._connomDao.getHibernateSession().createSQLQuery("select count(1) "+sql.toString()).uniqueResult();
		oo.setTotalcount(count.intValue());

//		sql.append("select t.contract_code,");
//		sql.append(" 	t.contract_name,");
//		sql.append(" 	t.materialitemcode,");
//		sql.append(" 	t.materialitemname,");
//		sql.append(" 	t.materialtypename,");
//		sql.append(" 	t.materialstandard,");
//		sql.append(" 	t.lot_no,");
//		sql.append(" 	t.arrival_num,");
//		sql.append("	t.price,");
//		sql.append("    t.arrival_date,");
//		sql.append("  	t.material_ratio");
//		sql.append(" from v_buyer_price t,t_user u ");
//		sql.append(" where t.creater =u.userid and u.loginName='");
//		sql.append(oo.getCreater());
//		sql.append("'");

		if(!StrUtil.isNullOrEmpty(oo.getStartDate())){
			sql.append(" and tr.arrival_date >='");
			sql.append(oo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(oo.getEndDate())){
			sql.append(" and tr.arrival_date <='");
			sql.append(oo.getEndDate());
			sql.append("'");
		}
		
		Query q = _connomDao.createSqlQuery("select distinct pc.contractcode,pc.contractname,tm.materialitemcode,tm.materialitemname,"+
"(select mc.materialtypename from t_materialcatalog mc where mc.parentid='0'"+
"start with mc.materialcatalogid=tm.parentid connect by prior mc.parentid=mc.materialcatalogid)materialtypename,"+
"tm.materialstandard,tr.lot_no,tr.arrival_num,tr.price,tr.arrival_date "+sql.toString());
		q.setMaxResults(oo.getLimit());
		q.setFirstResult(oo.getStart());
		List<Object> list = q.getResultList();

//		System.out.println("getPriceAndQualityInfo");
		return list;
	}

	public Long getPriceAndQualityInfoCount(BuyerVo oo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from T_Buyer t ");
		sql.append(" where t.creater ='");
		sql.append(oo.getCreater());
		sql.append("'");
		
		if(!StrUtil.isNullOrEmpty(oo.getStartDate())){
			sql.append(" and t.arrival_date >='");
			sql.append(oo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(oo.getEndDate())){
			sql.append(" and t.arrival_date <='");
			sql.append(oo.getEndDate());
			sql.append("'");
		}
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	@Transactional
	public String saveBuyerInfo(BuyerVo vo){
		Buyer buyer=new Buyer();
		try{
			buyer.setId(vo.getId().equals("")?null:vo.getId());//主键,为空则创建,有值则更新
			buyer.setPurchase_code(vo.getPurchase_code());//与T_USER表关联USERID
//			buyer.setPurchase_name(vo.getPurchase_name());
			buyer.setPurchase_sex(vo.getPurchase_sex());//性别
//			buyer.setPost(vo.getPost());
			buyer.setAge(vo.getAge());//年龄
//			buyer.setDept(vo.getDept());
			buyer.setTitle(vo.getTitle());//职称
			buyer.setYn_life(vo.getYn_life());//是否超过任期
			buyer.setTerm_life(vo.getTerm_life());//任期
			_connomDao.getHibernateSession().saveOrUpdate(buyer);
				
		}catch(Exception e){
			return e.getLocalizedMessage();
		}
	return "";
	}
	
}
