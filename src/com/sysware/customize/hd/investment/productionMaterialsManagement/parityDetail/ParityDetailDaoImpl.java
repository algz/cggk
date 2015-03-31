package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;

import java.math.BigDecimal;
import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
@Name("parityDetailDaoImpl")
public class ParityDetailDaoImpl extends GenericDAOImpl<ParityDetail> implements ParityDetailDao {
	/**
	 * 保存比价详情信息
	 * 
	 * @param parityDetail 对象
	 */
	public void saveParityDetail(ParityDetail parityDetail) {
		this.save(parityDetail);
	}
	/**
	 * 根据条件查询比价详情
	 * 
	 * @param parityDetailCondition
	 *           条件
	 * @return 比价详情
	 */
	public List<ParityDetail> getParityDetailListByCondition(
			ParityDetailCondition parityDetailCondition) {
		Integer start = parityDetailCondition.getStart();
		if(start==null){
			start=0;
		}
		Integer limit = parityDetailCondition.getLimit();
		if(limit==null){
			limit=20;
		}	
		String parityId = parityDetailCondition.getParityId();
		StringBuffer strBuffer = new StringBuffer(" parityId=? ");
		
		String[] 	 params = new String [1];
		 params[0] =parityId;
		strBuffer.append(" order by parityDetailId desc ");
		return this.find(strBuffer.toString(), params, start, limit);
	}
	/**
	 * 根据条件查询比价详情记录数
	 * 
	 * @param parityDetailCondition
	 *           条件
	 * @return parityDetailCondition记录数
	 */
	public Long getCountByCondition(ParityDetailCondition parityDetailCondition) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select count(*) from T_ParityDetail  tpd ");
		if(parityDetailCondition.getParityId()!=null&&!"".equals(parityDetailCondition.getParityId().trim())){
			queryStr.append(" where tpd.ParityID='"+parityDetailCondition.getParityId()+"'");
		}
		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(),
				null, 0, 0).get(0)).longValue();
	}

	
}
