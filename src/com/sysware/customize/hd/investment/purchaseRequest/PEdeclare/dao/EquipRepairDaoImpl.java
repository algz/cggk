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
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("equipRepairDaoImpl")
public class EquipRepairDaoImpl extends GenericDAOImpl<EquipRepair> implements EquipRepairDao{
	@In(create = true)
	Identity identity;
	public List<EquipRepair> getEquipRePairList(Pager pager) {
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "from EquipRepair t " +
					"where t.createperson ='"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "from EquipRepair t ";
		}
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(pager.getPageSize());
		query.setFirstResult(pager.getStart());
		return query.list();
	}

	public int getEquipRepairCount() {
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		int count = 0;
		if(list.size()==0){
			hql = "select count(*) from EquipRepair t " +
					"where t.createperson ='"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "select count(*) from EquipRepair";
		}
		try {
			count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	public String saveEquipRepair(EquipRepair equip) {
		try {
			this.getHibernateSession().saveOrUpdate(equip);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	
	public void updateApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update EquipRepair t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<EquipRepair> getEquipRepairById(String id) {
		try {
			String hql = "from EquipRepair t " +
					"where t.id = '"+id+"'";
			Query query = this.getHibernateSession().createQuery(hql);
			return query.list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void delEquipRepair(String id) {
		try {
			String hql = "delete from EquipRepair " +
					"where id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
