package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Guser;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

/**
 * 物资需求大纲Remote
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
@Name("procurement_ProcurementRemote")
public class ProcurementRemote {

	@In(create = true, value = "procurement_ProcurementServiceImpl")
	private ProcurementService procurementService;

	@In(create = true, value = "department_DepartmentServiceImpl")
	private DepartmentService departmentService;

	@In(create = true, value = "guser_GuserServiceImpl")
	private GuserService guserService;

	// 获取零星需求大纲列表
	@WebRemote
	public GridData<ProcurementVo> getSporadicGridData(
			ProcurementVo procurementVo) throws Exception {
		procurementVo.setProcurementType(ProcurementTypeEnum.LING_XING
				.getValue());
		return getGridData(procurementVo);
	}

	
	
	// 获取年度需求大纲列表
	@WebRemote
	public GridData<ProcurementVo> getAnnualGridData(ProcurementVo procurementVo)
			throws Exception {
		procurementVo.setProcurementType(ProcurementTypeEnum.NIAN_DU.getValue());
		
		// 设置属性转化缺省值
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);

		// 复制查询条件
		ProcurementCondition condition = new ProcurementCondition();
		BeanUtils.copyProperties(condition, procurementVo);
		// 根据条件执行查询
		List<Procurement> procurements = procurementService
				.findAnnualProcurementList(condition);
		// 处理查询结果
		List<ProcurementVo> results = new ArrayList<ProcurementVo>();
		for (Procurement procurement : procurements) {
			ProcurementVo dest = new ProcurementVo();
			BeanUtils.copyProperties(dest, procurement);
			// 处理“编辑人”信息
			if (StringUtils.isNotEmpty(procurement.getReportedor())) {
				Guser guser = guserService.getGuserById(Long
						.valueOf(procurement.getReportedor()));
				dest.setReportedor(guser.getTruename());
				dest.setRepDeptname(departmentService.getDepartmentByCode(
						guser.getGinstitute().getInstcode()).getDepartmetname());
			}
			results.add(dest);
		}
		// 设置GridData
		GridData<ProcurementVo> gridData = new GridData<ProcurementVo>();
		gridData.setResults(results);
		gridData.setTotalProperty(procurementService
				.countProcurements(condition));
		return gridData;
	}
	
	// 设置选定的零星需求大纲发布状态
	@WebRemote
	public String setProcurementFlag(String[] procurementIds){
		procurementService.batchUpdateProcurementsFlag(procurementIds);
		return "{success:true}";
	}
	
	// 删除选定的零星需求大纲
	@WebRemote
	public String deleteProcurement(String[] procurementIds){
		procurementService.batchDeleteProcurements(procurementIds);
		return "{success:true}";
	}
	
	// 保存零星需求大纲表格编辑信息
	@WebRemote
	public String saveGridData(ProcurementVo procurementVo)
			throws Exception {
		// 获取待保存记录（JSON数组字符串形式）
		String updateRecords = procurementVo.getUpdateRecords();
		if (StringUtils.isNotEmpty(updateRecords)) {
			List<Procurement> procurements = new ArrayList<Procurement>();
			JSONArray records = JSONArray.fromObject(updateRecords);
			for (int i = 0; i < records.size(); i++) {
				JSONObject obj = records.getJSONObject(i);
				// 将JSON对象信息封装至Procurement对象
				Procurement dest = (Procurement) JSONObject.toBean(
						obj, Procurement.class);
				procurements.add(dest);
			}
			procurementService.batchUpdateProcurements(procurements);
		}
		return "{success:true}";
	}

	// 根据条件获得需求大纲对象集合
	private GridData<ProcurementVo> getGridData(ProcurementVo procurementVo)
			throws IllegalAccessException, InvocationTargetException {
		// 设置属性转化缺省值
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);

		// 复制查询条件
		ProcurementCondition condition = new ProcurementCondition();
		BeanUtils.copyProperties(condition, procurementVo);
		// 根据条件执行查询
		List<Procurement> procurements = procurementService
				.findProcurements(condition);
		// 处理查询结果
		List<ProcurementVo> results = new ArrayList<ProcurementVo>();
		for (Procurement procurement : procurements) {
			ProcurementVo dest = new ProcurementVo();
			BeanUtils.copyProperties(dest, procurement);
			// 处理“编辑人”信息
			if (StringUtils.isNotEmpty(procurement.getReportedor())) {
				Guser guser = guserService.getGuserById(Long
						.valueOf(procurement.getReportedor()));
				dest.setReportedor(guser.getTruename());
				dest.setRepDeptname(departmentService.getDepartmentByCode(
						guser.getGinstitute().getInstcode()).getDepartmetname());
			}
			results.add(dest);
		}
		// 设置GridData
		GridData<ProcurementVo> gridData = new GridData<ProcurementVo>();
		gridData.setResults(results);
		gridData.setTotalProperty(procurementService
				.countProcurements(condition));
		return gridData;
	}
	
	
	/**
	 * 获取年度需求大纲列表 ComboBox
	 * @param procurementVo
	 * @return
	 * @throws Exception
	 */
	@WebRemote
	public GridData<ProcurementVo> getComboBoxDataForAnnualPlan(ProcurementVo procurementVo)
			throws Exception {
		GridData<ProcurementVo> gridData = new GridData<ProcurementVo>();
		gridData.setResults(this.procurementService.getComboBoxDataForAnnualPlan(procurementVo));
		gridData.setTotalProperty(new Long(procurementVo.getCount()));
		return gridData;
	}
}
