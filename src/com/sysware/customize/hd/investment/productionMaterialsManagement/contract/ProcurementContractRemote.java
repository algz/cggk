package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

@Name("contract_ProcurementContractRemote")
public class ProcurementContractRemote {

	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	@In(create = true)
	Identity identity;

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService contractService;

	@In(create = true, value = "guser_GuserServiceImpl")
	private GuserService guserService;

	@In(create = true, value = "department_DepartmentServiceImpl")
	private DepartmentService departmentService;

	@WebRemote
	public GridData<ProcurementContractVo> getContracts(
			ProcurementContractVo procurementContractVo) throws Exception {

		ProcurementContractCondition condition = new ProcurementContractCondition();
		BeanUtils.copyProperties(condition, procurementContractVo);

//		Long loginUserId = identity.getLoginUser().getUserid();
//		condition.setUserId(loginUserId);

//		Guser guser = guserService.getGuserById(loginUserId);
//		String deptName = departmentService.getDepartmentByCode(
//				guser.getGinstitute().getInstcode()).getDepartmetname();
		List<ProcurementContract> procurementContracts = this.contractService
				.getContractsByCondition(condition);

		// 数据复制
		List<ProcurementContractVo> contractVos = new ArrayList<ProcurementContractVo>();
		for (ProcurementContract contract : procurementContracts) {
			ProcurementContractVo contractVo = new ProcurementContractVo();
			BeanUtils.copyProperties(contractVo, contract);
			if (StringUtils.isNotEmpty(contract.getEditors())) {
				contractVo.setEditors(guserService.getGuserById(Long.parseLong(contract.getEditors())).getTruename());
				contractVo.setEditorDept(departmentService.getDepartmentByCode(
						guserService.getGuserById(Long.parseLong(contract.getEditors())).getGinstitute().getInstcode()).getDepartmetname());
			}
			if (StringUtils.isNotEmpty(contract.getApplicationStatus())) {
				contractVo.setApplicationStatus(ContractApplicationStatusEnum
						.getByValue(contract.getApplicationStatus()).getName());
			}
			contractVos.add(contractVo);
		}

		GridData<ProcurementContractVo> gridData = new GridData<ProcurementContractVo>();
		gridData.setResults(contractVos);
		gridData.setTotalProperty(condition.getCount());
//		gridData.setTotalProperty(contractService.countContractsByCondition(condition));
		return gridData;
	}

	@WebRemote
	public String setContractProperties(String[] procurementContractIds)
			throws Exception {
		contractService.batchUpdateContract(procurementContractIds);
		return "{success:true}";
	}

	@WebRemote
	public String getProcurementContractById(
			ProcurementContractVo procurementContractVo) throws Exception {
		ProcurementContract procurementContract = contractService
				.getContractById(procurementContractVo
						.getProcurementContractId());
		BeanUtils.copyProperties(procurementContractVo, procurementContract);
		JSONObject jsonObject = new JSONObject();
		jsonObject.element("success", true).element("data",
				JSONObject.fromObject(procurementContractVo));
		return jsonObject.toString();
	}
	
	@WebRemote
	public String delProcurementContractById(ProcurementContractVo procurementContractVo){
		contractService.delProcurementContractById(procurementContractVo);
		return "{success:true}";
	}
}
