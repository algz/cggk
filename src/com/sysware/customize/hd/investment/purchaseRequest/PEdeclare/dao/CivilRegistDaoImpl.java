package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.Date;
import java.util.List;


import org.hibernate.Query;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("civilRegistDaoImpl")
public class CivilRegistDaoImpl extends GenericDAOImpl<CivilRegist> implements CivilRegistDao{
	
	@In(create = true)
	Identity identity;
	public String saveCivilRegist(CivilRegist civil) {
		try {
			this.getHibernateSession().saveOrUpdate(civil);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	public int getCivilRegistCount(){
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "select count(*) from CivilRegist t " +
					"where t.createperson ='"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "select count(*) from CivilRegist";
		}
		try {
			int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
			return count;
		} catch (Exception e) {
			return 0;
		}
	}

	public List<CivilRegist> getCivilRegistList(Pager pager) {
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "from CivilRegist t " +
				"where t.createperson = '"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "from CivilRegist t ";
		}
		
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(pager.getPageSize());
		query.setFirstResult(pager.getStart());
		return query.list();
	}

	public void updateApprovalState(String id,String flag){
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update CivilRegist t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<CivilRegist> getCivilRegistById(String id) {
		try {
			String hql = "from CivilRegist t " +
					"where t.id = '"+id+"'";
			Query query = this.getHibernateSession().createQuery(hql);
			return query.list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public void delCivilRegist(String id) {
		try {
			String hql = "delete from CivilRegist " +
					"where id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
