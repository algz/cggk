package com.sysware.customize.hd.investment.investSupport.supplierInfo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.investSupport.vo.SupplierInfoVo;
import com.sysware.util.StrUtil;

/**
 * @ClassName: SupplierInfoDaoImpl
 * @Description: 供应商资讯模块 DAO 层实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:59:37 AM
 * 
 */

@Name("supplierInfoDaoImpl")
public class SupplierInfoDaoImpl implements SupplierInfoDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _connomDao;

	public List<Object> getInfo(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder(),param = new StringBuilder(),count_sql = new StringBuilder();
		sql.append("select t.vendorid,");
		sql.append("    t.vendorcode,");
		sql.append("    t.vendorname,");
		sql.append("    t.scale,");
		sql.append("    t.businessscope,");
		sql.append("    (select AVG(s.appraisal_score) from T_Vendor_Appraisal s where s.vendor_id = t.vendorid) score,");
		sql.append("     t.type,");
		sql.append("    t.deliveryaddress,");
		sql.append("    t.phone,");
		sql.append("    t.fax,");
		sql.append("    t.create_date,");
		sql.append("    t.kind ");
		sql.append("  from t_vendor t where 1=1 ");//,t_user u where t.creater=u.userid ");
		
//		if(vo.getCreater()!=null&&!vo.getCreater().equals("")){
//			sql.append(" and u.LOGINNAME like '"+vo.getCreater()+"' ");
//		}
		
		if(!StrUtil.isNullOrEmpty(vo.getVendorCode())){
			param.append(" and t.vendorcode ='");
			param.append(vo.getVendorCode());
			param.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getVendorName())){
			param.append(" and t.vendorname ='");
			param.append(vo.getVendorName());
			param.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getScale())){
			param.append(" and t.scale ='");
			param.append(vo.getScale());
			param.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			param.append(" and t.type ='");
			param.append(vo.getType());
			param.append("'");
		}

		count_sql.append("select count(*) from t_vendor t where 1=1");
		BigDecimal count=(BigDecimal)_connomDao.createSqlQuery(count_sql.toString()).getSingleResult();
		vo.setCount(count.intValue());
		
//		System.out.println(sql.toString());
		sql.append(param);
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getInfoCount(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) ");
		sql.append("  from t_vendor t ,t_user u where t.creater=u.userid and u.loginname='"+vo.getCreater()+"'  ");

		if(!StrUtil.isNullOrEmpty(vo.getVendorCode())){
			sql.append(" and t.vendorcode ='");
			sql.append(vo.getVendorCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getVendorName())){
			sql.append(" and t.vendorname ='");
			sql.append(vo.getVendorName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getScale())){
			sql.append(" and t.scale ='");
			sql.append(vo.getScale());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getType())){
			sql.append(" and t.type ='");
			sql.append(vo.getType());
			sql.append("'");
		}
		
//		System.out.println(sql.toString());
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());

	}

	public List<Object> getInfoForBuyer(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.vendorid,");
		sql.append("   t.vendorcode,");
		sql.append("   t.vendorname,");
		sql.append("   t.scale,");
		sql.append("   t.businessscope,t.create_date ");
/*		sql.append("     (select AVG(s.appraisal_score)");
		sql.append("        from T_Vendor_Appraisal s");
		sql.append("       where s.vendor_id = t.vendorid) score,");
		sql.append("     t.create_date");
		sql.append("  from t_vendor t, t_contract tc, t_contact tp");
		sql.append("  where t.vendorname = tc.contract_name");
		sql.append("  and tc.creater = '");
		sql.append(vo.getCreater());
		sql.append("'");*/
		sql.append("from t_vendor t,t_user u where t.creater=u.userid and u.loginname='"+vo.getCreater()+"'");
		
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.arrival_date >='");
			sql.append(vo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.arrival_date <='");
			sql.append(vo.getEndDate());
			sql.append("'");
		}
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

//		System.out.println("getInfoForBuyer");
		return list;
	}

	public Long getInfoForBuyerCount(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from t_vendor t, t_contract tc, t_contact tp");
		sql.append("  where t.vendorname = tc.contract_name");
		sql.append("  and tc.creater = '");
		sql.append(vo.getCreater());
		sql.append("'");
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.arrival_date >='");
			sql.append(vo.getStartDate());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.arrival_date <='");
			sql.append(vo.getEndDate());
			sql.append("'");
		}
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());

	}

	public List<Object> getGradeInfo(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM ");
		sql.append(" (SELECT va.id, t.vendorcode,t.vendorname,t.SCALE,t.BUSINESSSCOPE,VA.APPRAISAL_SCORE,t.RECENTEVALUATIONDATE from T_VENDOR t,T_VENDOR_APPRAISAL va ");
		sql.append(" where VA.VENDOR_ID=t.VENDORID and t.VENDORID='"+vo.getVendorID()+"' and va.APPRAISAL_STATUS !='0' order by va.CREATE_DATE desc) ");
		sql.append(" where   rownum=1");
		
		
//		sql.append("select t.vendorcode,");
//		sql.append("    t.vendorname,");
//		sql.append("    t.scale,");
//		sql.append("    t.BUSINESSSCOPE,");
//		sql.append("    t.avg_score,");
//		sql.append("    t.appraisal_date,");
//		sql.append("    t.appraisal_status,");
//		sql.append("    t.appraisal_comment,");
//		sql.append("    detail_id ");
//		sql.append(" from v_contract_procurementcontract vp where vp.vendorId = t.vendor_id ");
//		sql.append("  vp.contract_code='");
//		sql.append(vo.getVendorID());
//		sql.append("'");
		Query q = _connomDao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();
		vo.setCount(list.size()!=0?1:0);
//		System.out.println("getGradeInfo");
		return list;
	}

	public Long getGradeInfoCount(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append(" from ,v_contract_procurementcontract vp where vp.vendorId = t.vendor_id ");
		sql.append("  vp.contract_code='");
		sql.append(vo.getVendorID());
		sql.append("'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getSupplyMaterialInfo(SupplierInfoVo oo) {
		StringBuilder sql = new StringBuilder();
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
//		sql.append(" from v_buyer_price t");

		sql.append("select tc.procurementcontractid,tc.contractcode,tc.contractname,tm.materialitemcode,tm.materialitemname,tm.materialstandard,tr.price,tr.lot_no,tr.arrival_num,tr.arrival_date,'' as material_ratio from T_Registration tr left join t_procurementcontract tc on tc.contractcode = tr.contractcode left join t_material tm on tm.materialid = tr.item_id where TC.VENDOR='"+oo.getVendorID()+"'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(oo.getLimit());
		q.setFirstResult(oo.getStart());
		List<Object> list = q.getResultList();

//		System.out.println("getSupplyMaterialInfo");
		return list;
	}

	public Long getSupplyMaterialInfoCount(SupplierInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from T_Buyer t");

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getGradeDeptInfo(SupplierInfoVo vo) {
		
		StringBuilder sql = new StringBuilder();
//		sql.append("select t.appraisaler, t.score, d.departmentname");
//		sql.append("  from t_appraisal_detail t");
//		sql.append("  left join t_departments d on t.appraisal_dept_id = d.depcode");
//		sql.append("  left join v_vendor_appraisal v on v.detail_id = t.appraisal_id");
//		sql.append("  left join t_vendor_appraisal tv on tv.vendor_id = v.vendor_id");
//		sql.append("  where tv.vendor_id = ");
//		sql.append(vo.getVendorID());
		
		sql.append(" select t.appraisaler, t.score,d.departmentname ");
		sql.append(" from t_appraisal_detail t  LEFT JOIN T_USER u ON t.APPRAISALER=u.USERID ");
		sql.append(" LEFT JOIN T_DEPARTMENTS d ON u.INSTCODE=d.depcode ");
		sql.append(" where  t.APPRAISAL_ID='"+vo.getVendorAppraisalId()+"'");
		Query q = _connomDao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();

		return list;
	}

	public List<?> getSupplierOfContractInfo(SupplierInfoVo vo) {
		StringBuffer param = new StringBuffer();
		// 按供应商查询
		if (vo.getVendorID() != null && !vo.getVendorID().equals("")) {
			param.append(" and dc.partyb='" + vo.getVendorID() + "' ");
		}
		if(vo.getStatus()!=null&&!vo.getStatus().equals("")){
			param.append(" and dc.status='"+vo.getStatus()+"'");
		}
		
//		// 按年份查询
//		if (vo.getApprovaltime() != null && !vo.getApprovaltime().equals("")) {
//			if (vo.getApprovaltime().equals(MyTool.dateToStr(new Date(), "yyyy"))) {
//				// 查询年份＝＝今年，即查询所有未下发的数据+今年的所有数据（已下发）
//				param.append(" and (dc.status in ('1','2') or EXTRACT(Year FROM dc.approvaltime)='" + vo.getApprovaltime() + "') ");
//			} else {
//				// 查询以前年份的已下发数据
//				param.append(" and dc.status not in ('1','2') and EXTRACT(Year FROM dc.approvaltime)='" + vo.getApprovaltime() + "' ");
//			}
//		}

		String hql = "select count(*) from DeviceContractmanagement dc where 1=1 " + param;
		Long count = (Long) _connomDao.getHibernateSession().createQuery(hql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		hql = "from DeviceContractmanagement dc where 1=1 " + param+" order by dc.status";
		List<DeviceContractmanagement> list = _connomDao.getHibernateSession().createQuery(hql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		return list;
	}

	public List<Object> getGradeMoreInfo(SupplierInfoVo vo) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT VA.APPRAISAL_COMMENT,VA.APPRAISAL_STATUS  ");
		sql.append(" FROM T_VENDOR_APPRAISAL va ");
		sql.append("where VA.id='"+vo.getVendorAppraisalId()+"' ");
		vo.setCount(1);
		Query q = _connomDao.createSqlQuery(sql.toString());
		List<Object> list = q.getResultList();	
		return list;
	}
}
