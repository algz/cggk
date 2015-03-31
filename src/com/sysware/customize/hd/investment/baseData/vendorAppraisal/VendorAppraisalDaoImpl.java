package com.sysware.customize.hd.investment.baseData.vendorAppraisal;
/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
@Name("vendorAppraisalDaoImpl")
public class VendorAppraisalDaoImpl extends GenericDAOImpl<VendorAppraisal>  implements VendorAppraisalDao {

	 @In(create=true)
	 Identity identity; 
	
	@SuppressWarnings("unchecked")
	public List<Object[]> getVendorAppraisalList(VendorAppraisalVo vo) {
		Query query = this.createSqlQuery(getVendorAppraisalSql(vo,"obj")+" order by obj.CREATE_DATE desc, obj.APPRAISAL_NAME  ");
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}
	public BigDecimal getVendorAppraisalListCount(VendorAppraisalVo vo) {
		return (BigDecimal) this.createSqlQuery(getVendorAppraisalSql(vo,"count(obj)")).getSingleResult();
	}
	
	/**
	 * 仅查询属于当前登陆用户的评分或意见提交记录
	 * @param vo
	 * @param name
	 * @return
	 */
	private String getVendorAppraisalSql(VendorAppraisalVo vo,String name){
		StringBuilder sql = new StringBuilder();
		String userid=identity.getLoginUser().getUserid().toString();
		if(name.equals("obj"))
		{
			sql.append(" select distinct obj.ID,obj.APPRAISAL_NAME,obj.APPRAISAL_NO,obj.APPRAISAL_SCORE,obj.APPRAISAL_STATUS,obj.CREATER,obj.CREATE_DATE, ");
			sql.append(" (select count(ad.id) from t_appraisal_detail ad where ad.appraisal_id = obj.id) as amount,u.truename,obj.appraisal_comment ");
			sql.append(" ,v.businessscope,v.scale,v.vendorname,v.vendorcode,v.vendorid ");
			sql.append(" ,OBJ.EXAMINER, ");//增加意见人和评分人,用于在前端识别显示app.appraisaler
			//查询评分人
			//sql.append("  (select count(0)  appraisal_id from T_APPRAISAL_DETAIL ad where app.appraisal_id = obj.id and ad.appraisaler = '"+userid+"' and obj.examiner = '"+userid+"' ) ");//判断意见人和评分人是否为同一人
			sql.append("  (select appraisaler from T_APPRAISAL_DETAIL ad where app.appraisal_id = obj.id and ad.appraisaler = '"+userid+"'   and rownum=1 ) ");//获取评分人是否为当前用户
			
			//
			sql.append(" from t_Vendor_Appraisal obj left join t_User u on obj.creater = u.userid ");
			sql.append(" left join t_vendor v on obj.vendor_id = v.vendorid ");
			sql.append(" LEFT JOIN T_APPRAISAL_DETAIL app on app.appraisal_id=obj.id ");
			sql.append(" where obj.examiner='"+userid+"' or app.appraisaler='"+userid+"' or obj.CREATER='"+userid+"' ");
		  
		}
		else
		{
			sql.append("select count(distinct  obj.ID) ");
			sql.append(" from t_Vendor_Appraisal obj left join t_User u on obj.creater = u.userid ");
			sql.append(" left join t_vendor v on obj.vendor_id = v.vendorid ");
			sql.append(" LEFT JOIN T_APPRAISAL_DETAIL app on app.appraisal_id=obj.id ");
			sql.append(" where obj.examiner='"+userid+"' or app.appraisaler='"+userid+"' or obj.CREATER='"+userid+"' ");
		}
		if(vo.getAppraisalNo()!=null && !vo.getAppraisalNo().equals(""))
			sql.append(" and obj.APPRAISAL_NO like '%").append(vo.getAppraisalNo()).append("%'");
		if(vo.getAppraisalName()!=null && !vo.getAppraisalName().equals(""))
			sql.append(" and obj.APPRAISAL_NAME like '%").append(vo.getAppraisalName()).append("%'");
		if(vo.getAppraisalStatus()!=null && !vo.getAppraisalStatus().equals(""))
			sql.append(" and obj.APPRAISAL_STATUS like '%").append(vo.getAppraisalStatus()).append("%'");
		return sql.toString();
	}
	
	@SuppressWarnings("unchecked")
	public List<Object[]> getDepartmentList(VendorAppraisalVo vo) {
		String sql = "select t.depcode  as departmentCode,t.depcode  as departmentId ,t.departmentname as departmentName," +
				" t.phone as phone,(select tp.departmentname from t_Departments tp where tp.depcode=t.parentcode )  " +
				" from t_Departments t " + 
				"  where t.depcode<>'0' ";
		Query query = this.createSqlQuery(sql);
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	} 
	public BigDecimal getDepartmentListCount(VendorAppraisalVo vo){
		String sql = "select count(*) from t_Departments t where t.depcode<>'0'"; 
		return (BigDecimal) this.createSqlQuery(sql).getSingleResult();
    }

	public List<Object[]> getUserList(VendorAppraisalVo vo) {
		String sql = "select userid,truename from t_user  where instcode ='"+vo.getAppraisalDeptId()+"'";
		Query query = this.createSqlQuery(sql);
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList(); 
	}

	public BigDecimal getUserListCount(VendorAppraisalVo vo) {
		String sql = "select count(*) from t_user  where instcode ='"+vo.getDepartmentId()+"'"; 
		return (BigDecimal) this.createSqlQuery(sql).getSingleResult();
	}
	
	public void savevendorAppraisal(String vendorAppraisalId,
			String appraisalNo, String appraisalName, String vendorId,
			String[] departId,String[] appraisaler,String[] appraisalDetailId,String[] appraisalScore,String userId,String examiner) {
		BigDecimal count = new BigDecimal("0");
		VendorAppraisal vendorAppraisal = new VendorAppraisal();
		if(vendorAppraisalId!=null && !vendorAppraisalId.equals(""))
			//编辑考核表
			vendorAppraisal = get(vendorAppraisalId);
		else
			//创建考核表
		{
			vendorAppraisal.setCreateDate(new Date());
			vendorAppraisal.setCreater(userId);//创建考核表的人,下发考核表的人不关注下发的结果.业务如此定的.
		}
		vendorAppraisal.setAppraisalName(appraisalName);//考核表名称
		vendorAppraisal.setAppraisalNo(appraisalNo);//考核表编号
		vendorAppraisal.setVendorId(vendorId);//供应商ID
		vendorAppraisal.setAppraisalStatus('0');//考核状态：0未考核，1合格，2试供,3不合格
		if(examiner!=null&&!examiner.equals("")){
			vendorAppraisal.setExaminer(examiner);//考核并提交意见的人
		}
		
		if(appraisalScore!=null){
			for(String score :appraisalScore){
				count = count.add(new BigDecimal(score));
			}
			if(!count.equals("0")){
				vendorAppraisal.setAppraisalScore(new BigDecimal(String.valueOf(count.doubleValue()/appraisalScore.length)) );
			}
		}
		if(vendorAppraisalId!=null && !vendorAppraisalId.equals(""))
			update(vendorAppraisal);
		else
			vendorAppraisalId = save(vendorAppraisal).getVendorAppraisalId();
		AppraisalDetail appraisalDetail = null;
		for(int i=0 ; i<appraisalDetailId.length;i++){
			 appraisalDetail = new AppraisalDetail(); 
			 appraisalDetail.setAppraisaler(appraisaler[i]);//评分人ID
			 appraisalDetail.setVendorAppraisalId(vendorAppraisalId);//考核表ID
			 appraisalDetail.setAppraisalDeptId(departId[i]);
			 if(appraisalScore!=null)
			 {
				 appraisalDetail.setScore(new BigDecimal(appraisalScore[i]));
				 appraisalDetail.setAppraisalDate(new Date());
			 }
			 if(appraisalDetailId[i]!=null && !appraisalDetailId[i].equals("")){
				 appraisalDetail.setAppraisalDetailId(appraisalDetailId[i]);
				 this.em.merge(appraisalDetail);
			 }else
			     save(appraisalDetail);
		}
	}
	public List<Object[]> getVendorAppraisalDepartment(VendorAppraisalVo vo) {
		String sql = "select d.depcode ,d.depcode ,d.departmentname ,d.phone,t.id,t.score,t.appraisaler ,u.truename,t.appraisal_date " +
		" from T_Appraisal_Detail t " + 
		" left join t_departments d on t.appraisal_dept_id = d.depcode "+
		" left join t_user u on t.appraisaler = u.userid where 1=1 ";
		if(vo.getVendorAppraisalId()!=null && !vo.getVendorAppraisalId().equals("")){
			sql += " and t.APPRAISAL_ID = '"+vo.getVendorAppraisalId()+"' ";
		}
		if(vo.getAppraisaler()!=null && !vo.getAppraisaler().equals("")){
			sql += " and u.userid = '"+vo.getAppraisaler()+"' and t.SCORE is null ";
		}
		if(vo.getIsExaminer()!=null&&vo.getIsExaminer().equals("1")){//意见审核人查询
			
		}else{//评分人查询
			sql+=" and t.appraisaler='"+this.identity.getLoginUser().getUserid()+"' ";
		}
		Query query = this.createSqlQuery(sql); 
		return query.getResultList();
	}
}
