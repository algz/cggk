package com.sysware.customize.hd.investment.civilService.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.civilService.dao.CivilServiceManageDao;
import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.civilService.service.CivilServiceManageService;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.equipreService.vo.EquipServiceManageVo;

@Name("civilServiceManageServiceImp")
public class CivilServiceManageServiceImpl implements CivilServiceManageService {

	@In(create = true, value = "civilServiceManageDaoImp")
	private CivilServiceManageDao dao;

	public List<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo) {
		List<CivilServiceImplPlanVo> retList = new ArrayList<CivilServiceImplPlanVo>();
		List<CivilServiceImplPlan> list = new ArrayList<CivilServiceImplPlan>();
		try {
			list = dao.getGridData(vo);
			for(CivilServiceImplPlan es : list){
				CivilServiceImplPlanVo esvo = new CivilServiceImplPlanVo();
				BeanUtils.copyProperties(esvo, es);
				esvo.setProjectNum(es.getCivilRepairId().getProjectnum());
				esvo.setRepairProject(es.getCivilRepairId().getRepairproject());
				esvo.setRepairArea(es.getCivilRepairId().getRepairarea());
				esvo.setRepairContent(es.getCivilRepairId().getRepaircontent());
				esvo.setUseUnit(es.getCivilRepairId().getUseunit());

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
