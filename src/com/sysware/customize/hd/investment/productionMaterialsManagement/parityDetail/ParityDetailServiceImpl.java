package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityDao;

@Name("parityDetailServiceImpl")
public class ParityDetailServiceImpl implements ParityDetailService {
	@In(create = true, value = "parityDetailDaoImpl")
	private ParityDetailDao parityDetailDao;

	@In(create = true, value = "parityDaoImpl")
	private ParityDao parityDao;
	
	@In(create = true)
	Identity identity;

	

	public Material getMaterial(String materialID){
		return (Material)this.parityDao.getHibernateSession().get(Material.class,materialID);
	}
	
	/**
	 * 保存比价详情信息
	 * 
	 * @param parityDetail
	 *            对象
	 */
	@Transactional
	public void saveOrUpdateParityDetail(ParityDetail parityDetail) {
		Parity parity = parityDao.get(parityDetail.getParityId());
		parity.setApplicationStatus("2");// 待审批
		parityDao.update(parity);
		// 修改
		if (parityDetail.getParityDetailId() != null
				&& !"".equals(parityDetail.getParityDetailId().trim())) {
			parityDetailDao.update(parityDetail);
		} else {// 删除
			parityDetailDao.saveParityDetail(parityDetail);
			Parity par=parityDao.get(parityDetail.getParityId());
			String userId = identity.getLoginUser().getUserid().toString();// 用户id
			par.setEditors(userId);
			parityDao.update(par);
		}
	}

	/**
	 * 根据条件查询比价详情
	 * 
	 * @param parityDetailCondition
	 *            条件
	 * @return 比价详情
	 */
	public List<ParityDetail> getParityDetailListByCondition(
			ParityDetailCondition parityDetailCondition) {
		return parityDetailDao
				.getParityDetailListByCondition(parityDetailCondition);
	}

	/**
	 * 根据条件查询比价详情记录数
	 * 
	 * @param parityDetailCondition
	 *            条件
	 * @return parityDetailCondition记录数
	 */
	public Long getCountByCondition(ParityDetailCondition parityDetailCondition) {
		return parityDetailDao.getCountByCondition(parityDetailCondition);
	}

}
