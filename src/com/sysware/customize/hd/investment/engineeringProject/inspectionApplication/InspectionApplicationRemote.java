/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;


import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import com.luck.itumserv.common.GridData;

/**
 * @author algz
 * 
 */
@Name("engineeringInspectionApplicationRemote")
public class InspectionApplicationRemote {

	@In(create = true, value = "engineeringInspectionApplicationServiceImp")
	private InspectionApplicationService service;

	/**
	 * 查询合同管理GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<InspectionApplicationVo> getGridData(InspectionApplicationVo vo) {
		GridData<InspectionApplicationVo> gd = new GridData<InspectionApplicationVo>();
		List<InspectionApplicationVo> vos = service.getGridData(vo);
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}

	/**
	 * 保存合同管理数据
	 * @param vo
	 * @return
	 */
	@WebRemote    
	public String saveInspectionApplication(InspectionApplicationVo vo){
		String msg=service.saveInspectionApplication(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	
	public String deleteInspectionApplication(InspectionApplicationVo vo){
		String msg=service.deleteInspectionApplication(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
}
