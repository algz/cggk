package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRegistVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("equipPlanDaoImpl")
public class EquipPlanDaoImpl extends GenericDAOImpl<EquipRegist> implements EquipPlanDao{
	@In(create = true)
	Identity identity;
	public int getEquipPlanCount() {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "select count(*) from EquipRegist t " +
				"where t.approvalstate not in ('-1','1','2') " +
				"and t.HEADPERSON ='"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "select count(*) from EquipRegist t " +
				"where t.approvalstate not in ('-1','1','2') ";
		}
		try {
			int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
			return count;
		} catch (Exception e) {
			return 0;
		}
	}

	public List<EquipRegist> getEquipPlanList(EquipRegistVo vo) {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		StringBuilder param=new StringBuilder();
		if(vo.getProjectname()!=null&&!vo.getProjectname().equals("")){
			param.append(" and t.projectname like '%"+vo.getProjectname()+"%' ");
		}
		if(list.size()==0){
			hql = "from EquipRegist t " +
				"where t.approvalstate not in ('-1','1','2') " +param.toString()+
				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' " +
				"order by t.createtime desc ";
		}else{
			hql = "from EquipRegist t " +
				"where t.approvalstate not in ('-1','1','2') " +param.toString()+
				"order by t.createtime desc ";
		}
		//计算总数
		Long count=(Long)this.getHibernateSession().createQuery("select count(*) "+hql).setMaxResults(1).uniqueResult();
	    vo.setCount(count.intValue());
		
		
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}

	public String editEquipPlan(String id, String column, String value) {
		try {
			String hql = "update EquipRegist t " +
					"set " + column + " = '" + value + "' " +
					"where t.id = '" + id + "'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	public String editEquipRepair(String id, String column, String value) {
		try {
			String hql = "update EquipRepair t " +
					"set " + column + " = '" + value + "' " +
					"where t.id = '" + id + "'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public void updateApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update EquipRegist t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<EquipRegist> getEquipPlanById(String id) {
		String hql = "from EquipRegist t " +
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public String appointPersonToEquipRegist(String id, String person) {
		String[] idd = id.split(",");
		String cid = "";
		for(int i = 0; i< idd.length; i++){
			cid = cid + "'"+idd[i]+"'" + ",";
		}
		cid = cid.substring(0,cid.length()-1);
		String hql = "update EquipRegist t " +
				"set t.headperson = '"+person+"'," +
				"t.assigntime = sysdate "+ 
				"where t.id in("+cid+")";
		this.getHibernateSession().createQuery(hql).executeUpdate();
		return "true";
	}

	public void saveEquipPlan(EquipRegist er) throws Exception {
		this.getHibernateSession().save(er);
	}

	public void delEquipPlan(String id) throws Exception {
		String hql = "delete from EquipRegist " +
			"where id = '"+id+"'";
		this.getHibernateSession().createQuery(hql).executeUpdate();
	}

}
