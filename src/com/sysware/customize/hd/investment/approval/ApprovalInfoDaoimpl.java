package com.sysware.customize.hd.investment.approval;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
@Name("approvalInfoDaoimpl")
public class ApprovalInfoDaoimpl extends GenericDAOImpl<ApprovalInfo> implements ApprovalInfoDao {

	public List<Object[]> getApprovalInfoList(ApprovalInfoVo vo) {
		String sql = "select obj.approvalinfoid, obj.content,obj.approvaldate, obj.status,u.truename as userName from t_ApprovalInfo obj left join t_user u on to_char(u.userid) = obj.userid where 1=1 ";
		
		Query query = createSqlQuery( sql+getSql(vo) + " order by obj.approvalinfoid");
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}

	public BigDecimal getApprovalInfoListCount(ApprovalInfoVo vo) {
		return (BigDecimal) createSqlQuery("select count(0) from t_ApprovalInfo obj where 1=1 "+getSql(vo)).getSingleResult();
	}
	private String getSql(ApprovalInfoVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append(" and obj.objectId = '"+vo.getObjectId()+"'");
		return sql.toString();
	}

	public Object[] getApprovalFlowsById(Long id) {
		String sql = "select t1.name,t2.loginname,t2.truename " +
				"from t_flows t1,t_user t2 " +
				"where t1.id = '" + id + "' " +
				"and t1.starterid = t2.userid";
		Query query = createSqlQuery(sql);
		List<Object[]> list = query.getResultList();
		return list.get(0);
	}

	public Object[] getSenderById(Long id) {
		String sql = "select t.loginname,t.truename "+
				"from t_user t " +
				"where t.userid= '"+id+"'";
		Query query = createSqlQuery(sql);
		List<Object[]> list = query.getResultList();
		return list.get(0);
	}
	 

}
