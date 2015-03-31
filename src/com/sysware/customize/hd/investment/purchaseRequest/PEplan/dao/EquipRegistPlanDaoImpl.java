package com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.deviceProject.implementPlan.DeviceImplementplan;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("equipRegistPlanDaoImpl")
public class EquipRegistPlanDaoImpl extends GenericDAOImpl<EquipRegist> implements EquipRegistPlanDao{
	@In(create = true)
	Identity identity;
	public List<EquipRegist> getEquipRegistPlanList(Pager pager) {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "from EquipRegist t " +
				"where t.approvalstate in ('-5','5','6','7') " +
				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' "+
				"order by t.createtime desc";
		}else{
			hql = "from EquipRegist t " +
				"where t.approvalstate in ('-5','5','6','7') " +
				"order by t.createtime desc";
		}
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(pager.getPageSize());
		query.setFirstResult(pager.getStart());
		return query.list();
	}

	public int getEquipRegistPlanCount() {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "select count(*) from EquipRegist t " +
				"where t.approvalstate in('-5','5','6','7') " +
				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' ";
		}else{
			hql = "select count(*) from EquipRegist t " +
				"where t.approvalstate in('-5','5','6','7')";
		}
		try {
			int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
			return count;
		} catch (Exception e) {
			return 0;
		}
	}

	public String editEquipPurchasePlan(String id, String column, String value) {
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

	public void updateApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update EquipRegist t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			//设备项目管理--实施计划表增加设备已审批的数据
			if(flag.equals("7")){
				//设备项目管理--实施计划表增加设备已审批的数据
				DeviceImplementplan di = new DeviceImplementplan();
				EquipRegist equipregistId=(EquipRegist)getHibernateSession().get(EquipRegist.class, id);
				di.setEquipregistId(equipregistId);
				di.setStatus("1");
				di.setProjectcategorys("1");
				getHibernateSession().save(di);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<EquipRegist> getEquipRegistPlanById(String id) {
		String hql = "from EquipRegist t " +
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public List<EquipRegist> getEquipRegistPlanList(StockInspectVo vo) {
		String hql = "from EquipRegist t " +
				"where t.approvalstate in ('-5','5','6','7') " +
				"order by t.createtime desc";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}
	
}
