package com.sysware.customize.hd.investment.purchaseRequest.zongti;

import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;

/**
 * 综合分析 DAO实现类
 * 
  * @author LIT
 * 
 */

@Name("ZongTi_DaoImpl")
public class ZongtiControlDaoImpl implements ZongtiControlDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _dao;

	public List<Object> getContractData(ZongtiControlVo vo) {
		StringBuilder sql = new StringBuilder();
		if ("1".equals(vo.getFlag())) { // in plan
			sql.append("select * from stock_planType_query t where type=1");
		} else if ("2".equals(vo.getFlag())) {
			sql
					.append("select * from stock_planType_query t where type=2");
		} else {
			sql.append("select * from stock_planType_query t where type =3");
		}

		if (isStrEmpty(vo.getStartTime()) && isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate >= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
			sql.append(" and t.usedate <= to_date(substr('" + vo.getEndTime()
					+ "',0,10), 'YYYY-mm-DD')");
		} else if (!isStrEmpty(vo.getStartTime())
				&& isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate <= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
		} else if (isStrEmpty(vo.getStartTime())
				&& !isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate >= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
		}
		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();
		return list;
	}

	public Long getContractDataCount(ZongtiControlVo vo) {
		StringBuilder sql = new StringBuilder();
		if ("1".equals(vo.getFlag())) { // in plan
			sql.append("select count(*) from stock_planType_query t where type=1");
		} else if ("2".equals(vo.getFlag())) {
			sql
					.append("select count(*) from stock_planType_query t where type=2");
		} else {
			sql.append("select count(*) from stock_planType_query t where type =3");
		}

		if (isStrEmpty(vo.getStartTime()) && isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate >= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
			sql.append(" and t.usedate <= to_date(substr('" + vo.getEndTime()
					+ "',0,10), 'YYYY-mm-DD')");
		} else if (!isStrEmpty(vo.getStartTime())
				&& isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate <= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
		} else if (isStrEmpty(vo.getStartTime())
				&& !isStrEmpty(vo.getEndTime())) {
			sql.append(" and t.usedate >= to_date(substr('" + vo.getStartTime()
					+ "',0,10), 'YYYY-mm-DD')");
		}
		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public Object[] getForAreapic() {
		StringBuilder sql = new StringBuilder();
		sql.append(" select * from stock_plan_total");
		Query q = _dao.createSqlQuery(sql.toString());

		List<Object> list = q.getResultList();
		Object[] res = (Object[]) list.get(0);

		Object[] obj = new Object[4];
		obj[0] = res[0];
		obj[1] = res[1];
		obj[2] = res[2];
		obj[3] = res[3];
		return obj;
	}

	private static boolean isStrEmpty(String str) {
		if ("".equals(str) || null == str) {
			return false;
		} else {
			return true;
		}
	}
}
