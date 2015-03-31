package com.sysware.customize.hd.investment.baseData.expert;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("expertServiceImpl")
public class ExpertServiceImpl implements  ExpertService{
	@In(value="expertDaoImpl",create=true)
	ExpertDao  expertDaoImpl;
	public List<Expert> getExportList(ExpertVo vo) {
		return expertDaoImpl.getExportList(vo);
	}

	public List<ProjectExpertRelation> getProjectExportList(ExpertVo vo) {
		return expertDaoImpl.getProjectExportList(vo);
	}

	public Long getExportListCount(ExpertVo vo) {
		return expertDaoImpl.getExportListCount(vo);
	}

	public Long getProjectExportListCount(ExpertVo vo) {
		return expertDaoImpl.getProjectExportListCount(vo);
	}

	public String saveExpert(ExpertVo vo) {
		// TODO Auto-generated method stub
		return this.expertDaoImpl.saveExpert(vo);
	}

	public String delExpert(ExpertVo vo) {
		// TODO Auto-generated method stub
		return this.expertDaoImpl.delExpert(vo);
	}

}
