package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("buinessPlanDaoImpl")
public class BuinessPlanDaoImpl extends GenericDAOImpl<BuinessPlan> implements BuinessPlanDao {

	public long countByCondition(BuinessPlanCondition buinessPlanCondition) {

		StringBuilder queryStr = new StringBuilder("select count(*) from BuinessPlan where 1=1");
		String planName = buinessPlanCondition.getBuinessPlanName();
		if (StringUtils.isNotBlank(planName)) {
			queryStr.append(" and buinessPlanName like '%" + planName.trim() + "%' ");
		}

		return (Long) (this.query(queryStr.toString(), null, 0, 0).get(0));
	}

	public List<BuinessPlan> findBuinessPlansByCondition(BuinessPlanCondition buinessPlanCondition) {

		StringBuffer strBuffer = new StringBuffer(" 1=1 ");
		String planName = buinessPlanCondition.getBuinessPlanName();
		if (StringUtils.isNotBlank(planName)) {
			strBuffer.append(" and buinessPlanName like '%" + planName.trim() + "%' ");
		}

		return this.find(strBuffer.toString(), null, buinessPlanCondition.getStart(),
				buinessPlanCondition.getLimit());
	}

}
