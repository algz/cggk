package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.Date;
import java.util.List;
import org.hibernate.Query;
import org.jboss.seam.annotations.Name;
import com.luck.common.GenericDAOImpl;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProject;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProjectDetails;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

@Name("specialProjectDaoImpl")
public class SpecialProjectDaoImpl extends GenericDAOImpl<SpecialProject> implements SpecialProjectDao{

	public String saveSpecialProject(SpecialProject sp) {
		try {
			this.getHibernateSession().saveOrUpdate(sp);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public int getSpecialProjectCount() {
		String hql = "select count(*) from SpecialProject t";
		int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
		return count;
	}
	
	public int getSpecialProjectDetailsCount(String id) {
		String hql = "select count(*) from SpecialProjectDetails t " +
				"where t.specialproject.id = '"+id+"'";
		int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
		return count;
	}
	
	public List<SpecialProject> getSpecialProjectList(Pager pager) {
		String hql = "from SpecialProject t "+
				"order by t.createtime desc";
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(pager.getPageSize());
		query.setFirstResult(pager.getStart());
		return query.list();
	}

	public List<SpecialProject> getSpecialProjectById(String id) {
		String hql = "from SpecialProject t "+
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public String saveSpecialProjectDetail(SpecialProjectDetails spd) {
		try {
			this.getHibernateSession().saveOrUpdate(spd);
			this.getHibernateSession().flush();
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public String getSumContractmoney(String id) {
		String sql = "select sum(t.contractmoney) as money " +
				"from tb_SpecialProjectDetails t " +
				"group by t.specialprojectid " +
				"having t.specialprojectid = '"+id+"'";
		try {
			List list = this.getHibernateSession().createSQLQuery(sql).list();
			return list.get(0).toString();
		} catch (Exception e) {
			return "0";
		}
	}

	public void updateSpecialProjectContractmoney(String id, String money) {
		String hql = "update SpecialProject t " +
				"set t.contractmoney = '" + money + "' " + 
				"where t.id = '"+id+"'";
		this.getHibernateSession().createQuery(hql).executeUpdate();
		
	}

	public List<SpecialProjectDetails> getSpecialProjectDetailsById(String id) {
		String hql = "from SpecialProjectDetails t " +
				"where t.specialproject.id = '"+id+"'";
		return this.getHibernateSession().createQuery(hql).list();
	}

	public void updateApprovalState(String id, String flag) {
		try {
			String hql = "update SpecialProject t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = sysdate " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void delSpecialProject(SpecialProject sp) {
		try {
			this.getHibernateSession().delete(sp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void delSpecialProjectDetail(String id) {
		try {
			String hql = "delete from SpecialProjectDetails " +
					"where id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			this.getHibernateSession().flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<SpecialProject> getSpecialProjectList(StockInspectVo vo) {
		String hql = "from SpecialProject t "+
				"order by t.createtime desc";
		Query query = this.getHibernateSession().createQuery(hql);

		return query.list();
	}

}
