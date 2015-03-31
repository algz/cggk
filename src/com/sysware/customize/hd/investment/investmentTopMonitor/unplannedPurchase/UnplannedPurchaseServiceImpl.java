package com.sysware.customize.hd.investment.investmentTopMonitor.unplannedPurchase;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("unplannedPurchase_UnplannedPurchaseServiceImpl")
public class UnplannedPurchaseServiceImpl implements UnplannedPurchaseService {

	@In(create = true, value = "unplannedPurchase_UnplannedPurchaseDaoImpl")
	private UnplannedPurchaseDao unplannedPurchaseDao;

	public List<UnplannedPurchase> getUnplanedPurchases(String[] materialIds, final int begin, final int max) {
		return unplannedPurchaseDao.getUnplanedPurchases(materialIds, begin, max);
	}

	public long countUnplanedPurchases(String[] materialIds) {
		return unplannedPurchaseDao.countUnplanedPurchases(materialIds);
	}

}
