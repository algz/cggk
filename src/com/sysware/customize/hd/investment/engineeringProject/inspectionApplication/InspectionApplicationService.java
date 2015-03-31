package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;

import java.util.List;


public interface InspectionApplicationService {

	/**
	 * 查询合同数据
	 * @param vo
	 * @return
	 */
	List<InspectionApplicationVo> getGridData(InspectionApplicationVo vo);
	
	/**
	 * 保存合同管理数据
	 * @param vo
	 * @return
	 */
	String saveInspectionApplication(InspectionApplicationVo vo);

	/**
	 * 删除合同管理数据
	 * @param vo
	 * @return
	 */
	String deleteInspectionApplication(InspectionApplicationVo vo);
}