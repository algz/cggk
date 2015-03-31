package com.sysware.customize.hd.investment.investmentTopMonitor.unplannedPurchase;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("unplannedPurchase_UnplannedPurchaseDaoImpl")
public class UnplannedPurchaseDaoImpl extends GenericDAOImpl<UnplannedPurchase>
		implements UnplannedPurchaseDao {

	@SuppressWarnings("unchecked")
	public List<UnplannedPurchase> getUnplanedPurchases(String[] materialIds,
			final int begin, final int max) {
		StringBuilder sql = new StringBuilder();
		sql.append("select p.procurementcode as \"procurementCode\", m.materialitemname as \"materialItemName\", ");
		sql.append(" m.desingnation as \"desingnation\", m.materialstandard as \"materialStandard\", ");
		sql.append(" m.techniccondition as \"technicCondition\", m.demension as \"demension\", ");
		sql.append(" pu.status as \"status\", pd.productcode as \"productCode\",pd.materialcounts as \"materialCounts\", ");
		sql.append(" pd.purchaseType as \"purchaseType\", pc.editors as \"editors\", ");
		sql.append(" pc.applicationstatus as \"applicationStatus\", sum(nvl(mp.amount,0)) as \"arriveCircs\", ");
		sql.append(" pcb.signdate as \"signDate\", pd.procurementdetailid as \"procurementDetailId\" ");
		sql.append(" from t_procurement p join t_procurementdetail pd on p.procurementid = pd.procurementid ");
		sql.append(" left outer join t_purchase pu on pd.purchaseid = pu.purchaseid ");
		sql.append(" left outer join t_procurementcontract_purchase pcpu on pu.purchaseid = pcpu.purchaseid ");
		sql.append(" and pd.materialid = pcpu.materialid ");
		sql.append(" left outer join t_procurementcontract pc on pcpu.procurementcontractid = pc.procurementcontractid ");
		sql.append(" left outer join t_procurementcontractbook pcb on pc.procurementcontractid = pcb.procurementcontractid ");
		sql.append(" left outer join t_moneypayment mp on pc.procurementcontractid = mp.procurementcontractid ");
		sql.append(" join t_material m on pd.materialid = m.materialid ");
		sql.append(" where p.procurementtype = '2' ");
		if (materialIds != null && materialIds.length > 0) {
			sql.append(" and pd.materialid in (");
			for (int i = 0; i < materialIds.length; i++) {
				sql.append("?");
				if (i < materialIds.length - 1) {
					sql.append(",");
				}
			}
			sql.append(")");
		}
		sql.append(" group by p.procurementcode, m.materialitemname, m.desingnation, m.materialstandard, m.techniccondition,");
		sql.append(" m.demension, pu.status, pd.productcode, pd.materialcounts, pd.purchaseType, pc.editors,");
		sql.append(" pc.applicationstatus, pcb.signdate, pd.procurementdetailid");		
		sql.append(" order by p.procurementcode ");

		Query query = this.getHibernateSession().createSQLQuery(sql.toString());

		if (begin >= 0 && max > 0) {
			query.setFirstResult(begin);
			query.setMaxResults(max);
		}

		query.setResultTransformer(Transformers
				.aliasToBean(UnplannedPurchase.class));

		if (materialIds != null && materialIds.length > 0) {
			for (int i = 0; i < materialIds.length; i++) {
				query.setParameter(i, materialIds[i]);
			}
		}

		return query.list();
	}

	public long countUnplanedPurchases(String[] materialIds) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*) from t_procurement p, t_procurementdetail pd ");
		sql.append(" where p.procurementid = pd.procurementid ");
		sql.append(" and p.procurementtype = '2' ");
		if (materialIds != null && materialIds.length > 0) {
			sql.append(" and pd.materialid in (");
			for (int i = 0; i < materialIds.length; i++) {
				sql.append("?").append(i + 1);
				if (i < materialIds.length - 1) {
					sql.append(",");
				}
			}
			sql.append(")");
		}

		javax.persistence.Query query = this.em.createNativeQuery(sql
				.toString());

		if (materialIds != null && materialIds.length > 0) {
			for (int i = 0; i < materialIds.length; i++) {
				query.setParameter(i + 1, materialIds[i]);
			}
		}
		return ((BigDecimal) query.getSingleResult()).longValue();
	}

}
