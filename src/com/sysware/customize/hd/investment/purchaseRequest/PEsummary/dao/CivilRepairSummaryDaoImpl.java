package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("civilRepairSummaryDaoImpl")
public class CivilRepairSummaryDaoImpl extends GenericDAOImpl<CivilRepair> implements CivilRepairSummaryDao{
	@In(create = true)
	Identity identity;
	public int getCivilRepairGroupCount() {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "select count(*) from CivilRepair t " +
				"where t.approvalstate not in ('-1','1','2') " +
				"and t.HEADPERSON ='"+identity.getLoginUser().getTruename()+"' "+
				"and t.categorys = '集团'";
		}else{
			hql = "select count(*) from CivilRepair t " +
				"where t.approvalstate not in ('-1','1','2') "+
				"and t.categorys = '集团'";
		}
		try {
			int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
			return count;
		} catch (Exception e) {
			return 0;
		}
	}

	public int getCivilRepairStockCount() {
		String leader = RoleEnum.LEADER.getValue();
		String director = RoleEnum.DIRECTOR.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID = '"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID in ('"+leader+"','"+director+"')";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		String hql = "";
		if(list.size()==0){
			hql = "select count(*) from CivilRepair t " +
				"where t.approvalstate not in ('-1','1','2') " +
				"and t.HEADPERSON ='"+identity.getLoginUser().getTruename()+"' "+
				"and t.categorys = '股份'";
		}else{
			hql = "select count(*) from CivilRepair t " +
				"where t.approvalstate not in ('-1','1','2') "+
				"and t.categorys = '股份'";
		}
		try {
			int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
			return count;
		} catch (Exception e) {
			return 0;
		}
	}

	public List<EquipRepair> getEquipRepairGroupList(EquipRepairVo vo) {
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
				"where t.approvalstate not in ('-1','1','2') " +param.toString()+
//				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' " +
				"order by t.createtime desc ";
		}else{
			hql = "from EquipRepair t " +
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

	public List<CivilRepair> getCivilRepairStockList(CivilRepairVo vo) {
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
				"where t.approvalstate not in ('-1','1','2') " +param.toString()+
				"and t.headperson ='"+identity.getLoginUser().getTruename()+"' " +
				"order by t.createtime desc ";
		}else{
			hql = "from CivilRepair t " +
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

	public void updateApprovalState(String id, String flag) {
		try {
			String date = MyTool.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
			String hql = "update CivilRepair t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = '"+date+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateEquipRepairApprovalState(String id, String flag) {
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

	public String appointPersonToCivilRepair(String id, String person) {
		String[] idd = id.split(",");
		String cid = "";
		for(int i = 0; i< idd.length; i++){
			cid = cid + "'"+idd[i]+"'" + ",";
		}
		cid = cid.substring(0,cid.length()-1);
		String hql = "update CivilRepair t " +
				"set t.headperson = '"+person+"'," +
				"t.assigntime = sysdate "+ 
				"where t.id in("+cid+")";
		this.getHibernateSession().createQuery(hql).executeUpdate();
		return "true";
	}
	
	public String appointPersonToEquipRepair(String id, String person) {
		String[] idd = id.split(",");
		String cid = "";
		for(int i = 0; i< idd.length; i++){
			cid = cid + "'"+idd[i]+"'" + ",";
		}
		cid = cid.substring(0,cid.length()-1);
		String hql = "update EquipRepair t " +
				"set t.headperson = '"+person+"'," +
				"t.assigntime = sysdate "+ 
				"where t.id in("+cid+")";
		this.getHibernateSession().createQuery(hql).executeUpdate();
		return "true";
	}

}
