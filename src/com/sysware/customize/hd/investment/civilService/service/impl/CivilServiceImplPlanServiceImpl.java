package com.sysware.customize.hd.investment.civilService.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.civilService.dao.CivilServiceImplPlanDao;
import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.civilService.service.CivilServiceImplPlanService;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
@Name("civilServiceImplPlanServiceImp")
public class CivilServiceImplPlanServiceImpl implements
		CivilServiceImplPlanService {

	@In(create = true, value = "civilServiceImplPlanDaoImp")
	private CivilServiceImplPlanDao dao;
	
	public List<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo) {
		List<CivilServiceImplPlanVo> retList = new ArrayList<CivilServiceImplPlanVo>();
		List<CivilServiceImplPlan> list = new ArrayList<CivilServiceImplPlan>();
		try {
			list = dao.getGridData(vo);
			for(CivilServiceImplPlan csip : list){
				CivilServiceImplPlanVo csvo = new CivilServiceImplPlanVo();
				BeanUtils.copyProperties(csvo, csip);
				csvo.setProjectNum(csip.getCivilRepairId().getProjectnum());
				csvo.setRepairProject(csip.getCivilRepairId().getRepairproject());
				csvo.setRepairArea(csip.getCivilRepairId().getRepairarea());
				csvo.setRepairContent(csip.getCivilRepairId().getRepaircontent());
				csvo.setUseUnit(csip.getCivilRepairId().getUseunit());

				retList.add(csvo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retList;
	}

	@Transactional
	public String editCivilServiceImplPlan(CivilServiceImplPlanVo vo) {
		return dao.editCivilServiceImplPlan(vo);
	}

	@Transactional
	public String sendImplementPlan(CivilServiceImplPlanVo vo) {
		return dao.sendImplementPlan(vo);
	}

	
}
