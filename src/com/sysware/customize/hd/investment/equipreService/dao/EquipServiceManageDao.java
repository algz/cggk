package com.sysware.customize.hd.investment.equipreService.dao;

import java.util.List;

import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.equipreService.vo.EquipServiceManageVo;

public interface EquipServiceManageDao {

	/**
	 * 查询执行计划数据
	 * @param vo
	 * @return
	 */
	List<EquipServiceImplPlan> getGridData(EquipServiceManageVo vo);
	
	/**
	 * 修改设备大修执行计划审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag);

	/**
	 * 查询执行计划项目编号
	 * @param vo
	 * @return
	 */
	List<Object[]> getProjectNums(UtilVo vo);
}
