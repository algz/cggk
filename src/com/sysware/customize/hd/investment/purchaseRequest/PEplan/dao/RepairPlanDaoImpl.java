package com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.engineeringProject.implementPlan.EngineeringProjectPlanModel;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("repairPlanDaoImpl")
public class RepairPlanDaoImpl extends GenericDAOImpl<EquipRepair> implements RepairPlanDao{
	@In(create = true)
	Identity identity;
	
	public List<CivilRepair> getCivilRepairPlanList(CivilRepairVo vo) {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		StringBuilder param=new StringBuilder();
		if(vo.getRepairproject()!=null&&!vo.getRepairproject().equals("")){
			param.append(" and t.repairproject like '%"+vo.getRepairproject()+"%' ");
		}
		if(list.size()==0){
			hql = "from CivilRepair t " +
				"where t.approvalstate in ('-5','5','6','7') " +param.toString()+
				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' " +
				"order by t.createtime desc ";
		}else{
			hql = "from CivilRepair t " +
				"where t.approvalstate in ('-5','5','6','7') " +param.toString()+
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

	public List<EquipRepair> getEquipRepairPlanList(EquipRepairVo vo) {

		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		StringBuilder param=new StringBuilder();
		if(vo.getRepairequipname()!=null&&!vo.getRepairequipname().equals("")){
			param.append(" and t.repairequipname like '%"+vo.getRepairequipname()+"%' ");
		}
		
		if(list.size()==0){
			hql = "from EquipRepair t " +
				"where t.approvalstate in ('-5','5','6','7') " +param.toString()+
//				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' " +
				"order by t.createtime desc ";
		}else{
			hql = "from EquipRepair t " +
				"where t.approvalstate in ('-5','5','6','7') " +param.toString()+
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

	public List<CivilRepair> getCivilRepairById(String id) {
		String hql = "from CivilRepair t " +
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public List<EquipRepair> getEquipRepairById(String id) {
		String hql = "from EquipRepair t " +
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public String editCivilRepairPlan(String id, String column, String value) {
		try {
			String hql = "update CivilRepair t " +
					"set " + column + " = '" + value + "' " +
					"where t.id = '" + id + "'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public String editEquipRepairPlan(String id, String column, String value) {
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

	public void updateEquipApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update EquipRepair t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			//设备项目管理--实施计划表增加设备已审批的数据
			if(flag.equals("7")){
				//设备大修执行管理--实施计划表增加设备已审批的数据
				EquipServiceImplPlan esi = new EquipServiceImplPlan();
				EquipRepair er=(EquipRepair)getHibernateSession().get(EquipRepair.class, id);
				esi.setEquipRepairId(er);
				esi.setStatus("1");
				esi.setCreateTime(new Date());
				getHibernateSession().save(esi);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateCivilApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update CivilRepair t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			if(flag.equals("7")){
				//土建大修执行管理--实施计划表增加土建大修计划已审批的数据
				CivilServiceImplPlan csip = new CivilServiceImplPlan();
				CivilRepair cr=(CivilRepair)getHibernateSession().get(CivilRepair.class, id);
				csip.setCivilRepairId(cr);
				csip.setStatus("1");
				csip.setCreateTime(new Date());
				getHibernateSession().save(csip);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
