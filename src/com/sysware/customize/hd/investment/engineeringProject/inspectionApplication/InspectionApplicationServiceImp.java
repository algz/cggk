/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;

import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;


/**
 * @author algz
 *
 */
@Name("engineeringInspectionApplicationServiceImp")
public class InspectionApplicationServiceImp implements InspectionApplicationService {

	@In(create = true, value = "engineeringInspectionApplicationDAOImp")
	private InspectionApplicationDAO dao;

	public List<InspectionApplicationVo> getGridData(InspectionApplicationVo vo){
		return dao.getGridData(vo);
	}

	public String saveInspectionApplication(InspectionApplicationVo vo) {
		// TODO Auto-generated method stub
		return dao.saveInspectionApplication(vo);
	}

	public String deleteInspectionApplication(InspectionApplicationVo vo) {
		// TODO Auto-generated method stub
		return dao.deleteInspectionApplication(vo);
	}
	
}
