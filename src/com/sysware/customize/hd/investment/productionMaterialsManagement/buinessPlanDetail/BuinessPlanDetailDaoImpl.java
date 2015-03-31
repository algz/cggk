package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;

@Name("buinessPlanDetailDaoImpl")
public class BuinessPlanDetailDaoImpl extends GenericDAOImpl<BuinessPlanDetail> implements
		BuinessPlanDetailDao {

	public long countByCondition(BuinessPlanDetailCondition buinessPlanDetailCondition) {
		StringBuffer strBuffer = new StringBuffer(" 1=1");
		String productName = buinessPlanDetailCondition.getProductName();
		if (productName != null && !"".equals(productName.trim())) {
			strBuffer.append(" and product.productname like '" + productName.trim() + "%' ");
		}
		String productCode = buinessPlanDetailCondition.getProductCode();
		if (productCode != null && !"".equals(productCode.trim())) {
			strBuffer.append(" and productCode ='" + productCode.trim() + "' ");
		}
		String buinessPlanId = buinessPlanDetailCondition.getBuinessPlanId();
		if (buinessPlanId != null && !"".equals(buinessPlanId.trim())) {
			strBuffer.append(" and buinessPlan.buinessPlanId ='" + buinessPlanId.trim() + "' ");
		}
		return this.find(strBuffer.toString(), null).size();
	}

	public List<BuinessPlanDetail> findBuinessPlanDetailsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition) {
		StringBuffer strBuffer = new StringBuffer(" 1=1");
		String productName = buinessPlanDetailCondition.getProductName();
		if (productName != null && !"".equals(productName.trim())) {
			strBuffer.append(" and product.productname like '" + productName.trim() + "%' ");
		}
		String productCode = buinessPlanDetailCondition.getProductCode();
		if (productCode != null && !"".equals(productCode.trim())) {
			strBuffer.append(" and productCode ='" + productCode.trim() + "' ");
		}
		String buinessPlanId = buinessPlanDetailCondition.getBuinessPlanId();
		if (buinessPlanId != null && !"".equals(buinessPlanId.trim())) {
			strBuffer.append(" and buinessPlan.buinessPlanId ='" + buinessPlanId.trim() + "' ");
		}
		return this.find(strBuffer.toString(), null);
	}

	public List<BuinessPlanDetail> findAllBuinessPlanDetails(
			BuinessPlanDetailCondition buinessPlanDetailCondition, int start, int limit) {
		StringBuffer strBuffer = new StringBuffer(" 1=1");
		String productName = buinessPlanDetailCondition.getProductName();
		if (productName != null && !"".equals(productName.trim())) {
			strBuffer.append(" and product.productname like '" + productName.trim() + "%' ");
		}
		String productCode = buinessPlanDetailCondition.getProductCode();
		if (productCode != null && !"".equals(productCode.trim())) {
			strBuffer.append(" and productCode ='" + productCode.trim() + "' ");
		}
		String buinessPlanId = buinessPlanDetailCondition.getBuinessPlanId();
		if (buinessPlanId != null && !"".equals(buinessPlanId.trim())) {
			strBuffer.append(" and buinessPlan.buinessPlanId ='" + buinessPlanId.trim() + "' ");
		}
		if(limit==-1){
			return this.find(strBuffer.toString(), null);
		}
		return this.find(strBuffer.toString(), null, start, limit);
	}

	@SuppressWarnings("rawtypes")
	public String[] findBuinessPDIdsByCondition(
			BuinessPlanDetailCondition buinessPlanDetailCondition) {
		StringBuffer strBuffer = new StringBuffer(
				"select buinessPlanDetailId from BuinessPlanDetail where 1=1");
		String productName = buinessPlanDetailCondition.getProductName();
		if (productName != null && !"".equals(productName.trim())) {
			strBuffer.append(" and product.productname like '" + productName.trim() + "%' ");
		}
		String productCode = buinessPlanDetailCondition.getProductCode();
		if (productCode != null && !"".equals(productCode.trim())) {
			strBuffer.append(" and productCode ='" + productCode.trim() + "' ");
		}
		String buinessPlanId = buinessPlanDetailCondition.getBuinessPlanId();
		if (buinessPlanId != null && !"".equals(buinessPlanId.trim())) {
			strBuffer.append(" and buinessPlan.buinessPlanId ='" + buinessPlanId.trim() + "' ");
		}
		List idList = this.createQuery(strBuffer.toString()).getResultList();
		String[] ids = new String[idList.size()];
		for (int i = 0; i < idList.size(); i++) {
			ids[i] = (String) idList.get(i);
		}
		return ids;
	}

	public void batchDeleteBuinessPlanDetails(String buinessPlanId) {
		this.createQuery(
				"delete from BuinessPlanDetail where buinessPlan.buinessPlanId='" + buinessPlanId
						+ "'").executeUpdate();

	}

	public String changeBuinessPlanDetail(BuinessPlanDetailVo bpv) {
				//获取当前登录用户信息
	    Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
	    
		
		BuinessPlanDetail bpd=(BuinessPlanDetail)this.getHibernateSession().get(BuinessPlanDetail.class, bpv.getBuinessPlanDetailId());
	    if(bpd.getOldDeliverycount()==null||bpd.getOldDeliverycount().equals(BigDecimal.ZERO)){
	    	bpd.setOldDeliverycount(bpd.getDeliveryCount());
	    }
	    bpd.setDeliveryCount(new BigDecimal(bpv.getDeliveryCount()));
	    bpd.setChanger(identity.getLoginUser().getLoginname());
	    bpd.setChangeReson(bpv.getChangeReson());
	    bpd.setChangeTime(new Date());
	    
	     
		return null;
	}

}
