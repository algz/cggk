package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.MaterialDao;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("contract_ProcurementContractBookDaoImpl")
public class ProcurementContractBookDaoImpl extends
		GenericDAOImpl<ProcurementContractBook> implements
		ProcurementContractBookDao {

	@In(create = true, value = "material_MaterialDaoImpl")
	public MaterialDao materialDao;
	@In(create = true)
	Identity identity;

	@SuppressWarnings("unchecked")
	public List<ProcurementContractBook> findByCondition(
			ProcurementContractBookCondition condition) {
		List<String> params = new ArrayList<String>();
		int paramIndex = 1;
//		String leader = RoleEnum.LEADER.getValue();
//		String sql = "select DISTINCT t.ROLEID " +
//				"from T_ROLE_USER t " +
//				"where t.USERID='"+condition.getUserId()+"' " +
//				"and t.ROLEID in ('"+leader+"')";
//		List list = this.getHibernateSession().createSQLQuery(sql).list();
		
		StringBuilder queryStr = new StringBuilder(
				"select pcb.*, pc.contractCode, pc.auditCode,pc.vendor, pc.vendName, ");
		queryStr.append(" pc.contractAmount, pc.attachments,pc.editors ");//, m.materialItemName ");
		queryStr.append(" from t_procurementContractBook pcb,t_procurementContract pc ");//,t_material m ");
		queryStr.append(" where pcb.procurementContractId = pc.procurementContractId ");
//		queryStr.append(" and pcb.materialid = m.materialid ");
		if (StringUtils.isNotBlank(condition.getMainMaterialName())) {
			queryStr.append(" and m.materialitemname like ?" + paramIndex++);
			params.add("%" + condition.getMainMaterialName() + "%");
		}
		if (StringUtils.isNotBlank(condition.getContractCode())) {
			queryStr.append(" and pc.contractCode like ?" + paramIndex++);
			params.add("%" +condition.getContractCode()+"%");
		}
		if (StringUtils.isNotBlank(condition.getVendName())) {
			queryStr.append(" and pc.vendName like ?" + paramIndex++);
			params.add("%" + condition.getVendName() + "%");
		}
		if(isNotLeader()){
			queryStr.append(" and pc.editors like ?" + paramIndex++);
			params.add("%" +identity.getLoginUser().getUserid() + "%");
		
		}
		

		Query query = this.em.createNativeQuery(queryStr.toString(),
				"ProcurementContractBookResults");
		for (int index = 0; index < params.size(); index++) {
			query.setParameter(index + 1, params.get(index));
		}
		query.setFirstResult(condition.getStart());
		query.setMaxResults(condition.getLimit());
		List<Object[]> temp = query.getResultList();
		List<ProcurementContractBook> results = new ArrayList<ProcurementContractBook>(
				temp.size());
		for (Object[] objects : temp) {
			ProcurementContractBook pcb = (ProcurementContractBook) objects[0];
			pcb.setContractCode((String) objects[1]);
			pcb.setAuditCode((String) objects[2]);
			pcb.setVendor((String)objects[3]);
			pcb.setVendName((String) objects[4]);
			pcb.setContractAmount(((BigDecimal) objects[5]).doubleValue());
			pcb.setAttachments((String) objects[6]);
//			pcb.setMainMaterialName((String) objects[7]);
			pcb.setMainMaterialName("物资名称");
			pcb.setEditors((String)objects[7]);
			results.add(pcb);
		}
		return results;
	}

	public long countByCondition(ProcurementContractBookCondition condition) {
		List<String> params = new ArrayList<String>();
		int paramIndex = 1;
//		String leader = RoleEnum.LEADER.getValue();
//		String sql = "select DISTINCT t.ROLEID " +
//				"from T_ROLE_USER t " +
//				"where t.USERID='"+condition.getUserId()+"' " +
//				"and t.ROLEID in ('"+leader+"')";
//		List list = this.getHibernateSession().createSQLQuery(sql).list();
		
		StringBuilder queryStr = new StringBuilder(
				"select count(*) from ProcurementContractBook pcb,ProcurementContract pc,Material m ");
		queryStr.append(" where pcb.procurementContractId = pc.procurementContractId ");
		queryStr.append(" and pcb.materialId = m.materialid ");
		if (StringUtils.isNotBlank(condition.getMainMaterialName())) {
			queryStr.append(" and m.materialItemName like ?" + paramIndex++);
			params.add("%" + condition.getMainMaterialName() + "%");
		}
		if (StringUtils.isNotBlank(condition.getContractCode())) {
			queryStr.append(" and pc.contractCode = ?" + paramIndex++);
			params.add(condition.getContractCode());
		}
		if (StringUtils.isNotBlank(condition.getVendName())) {
			queryStr.append(" and pc.vendName like ?" + paramIndex++);
			params.add("%" + condition.getVendName() + "%");
		}
		if(isNotLeader()){
			queryStr.append(" and pc.editors = ?" + paramIndex++);
			params.add("%"+identity.getLoginUser().getUserid()+"%");
		}

		Query query = this.em.createQuery(queryStr.toString());
		for (int index = 0; index < params.size(); index++) {
			query.setParameter(index + 1, params.get(index));
		}

		return (Long) query.getSingleResult();
	}
	/**
	 * 判断当前用户是否领导
	 * @return
	 */
	public boolean isNotLeader(){
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return true;
		}else{
			return false;
		}
	}
}
