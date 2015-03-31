package com.sysware.customize.hd.investment.equipreService.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.equipreService.dao.EquipServiceManageDao;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.equipreService.service.EquipServiceManageService;
import com.sysware.customize.hd.investment.equipreService.vo.EquipServiceManageVo;

@Name("equipServiceManageServiceImp")
public class EquipServiceManageServiceImpl implements EquipServiceManageService {

	@In(create = true, value = "equipServiceManageDAOImp")
	private EquipServiceManageDao dao;
	
	public List<EquipServiceManageVo> getGridData(EquipServiceManageVo vo) {
		List<EquipServiceManageVo> retList = new ArrayList<EquipServiceManageVo>();
		List<EquipServiceImplPlan> list = new ArrayList<EquipServiceImplPlan>();
		try {
			list = dao.getGridData(vo);
			for(EquipServiceImplPlan es : list){
				EquipServiceManageVo esvo = new EquipServiceManageVo();
				BeanUtils.copyProperties(esvo, es);
				esvo.setProjectNum(es.getEquipRepairId().getProjectnum());
				esvo.setEquipName(es.getEquipRepairId().getRepairequipname());
				esvo.setEquipModel(es.getEquipRepairId().getRepairequipmodel());

				retList.add(esvo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retList;
	}

	@Transactional
	public void updateApprovalState(String id, String flag) {
		dao.updateApprovalState(id,flag);
	}

	public List<Object[]> getProjectNums(UtilVo vo) {
		return dao.getProjectNums(vo);
	}

}
