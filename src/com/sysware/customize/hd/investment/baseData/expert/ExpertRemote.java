package com.sysware.customize.hd.investment.baseData.expert;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sun.org.apache.commons.beanutils.BeanUtils;

@Name("expertRemote")
public class ExpertRemote {  
	@In(value="expertServiceImpl",create=true)
	ExpertService  expertServiceImpl;
	
	@WebRemote
	public GridData<ExpertVo> getExportList(ExpertVo vo) throws IllegalAccessException, InvocationTargetException{
		GridData<ExpertVo> result = new GridData<ExpertVo>();
		List<Expert> expertList = expertServiceImpl.getExportList(vo);
		ExpertVo expertVo = null;
		List<ExpertVo> expertVoList = new ArrayList<ExpertVo>();
		for(Expert expert : expertList){
			expertVo = new ExpertVo(); 
			BeanUtils.copyProperties(expertVo, expert);
			expertVoList.add(expertVo);
		}
		result.setResults(expertVoList);
		result.setTotalProperty(expertServiceImpl.getExportListCount(vo));
		return result;
	}
	@WebRemote
	public GridData<ExpertVo> getProjectExpertRelationList(ExpertVo vo) throws IllegalAccessException, InvocationTargetException{
		GridData<ExpertVo> result = new GridData<ExpertVo>();
		List<ProjectExpertRelation> expertList = expertServiceImpl.getProjectExportList(vo);
		ExpertVo expertVo = null;
		List<ExpertVo> expertVoList = new ArrayList<ExpertVo>();
		for(ProjectExpertRelation projectExpertRelation : expertList){
			expertVo = new ExpertVo();
			BeanUtils.copyProperties(expertVo, projectExpertRelation);
			expertVoList.add(expertVo);
		}
		result.setResults(expertVoList);
		result.setTotalProperty(expertServiceImpl.getProjectExportListCount(vo));
		return result;
	}
	
	@WebRemote
public String saveExpert(ExpertVo vo){
		String msg=this.expertServiceImpl.saveExpert(vo);
	return "{success:"+(msg==null||msg.equals("")?true:false)+",msg:'"+msg+"'}";
}
	
	@WebRemote
	public String delExpert(ExpertVo vo){
		String msg=this.expertServiceImpl.delExpert(vo);
		return "{success:"+(msg==null||msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
}
