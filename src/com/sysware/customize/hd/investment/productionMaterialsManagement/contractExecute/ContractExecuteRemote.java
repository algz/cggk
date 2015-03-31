package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

@Name("contractExecute_ContractExecuteRemote")
public class ContractExecuteRemote {

	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter(null);
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	@In(create = true, value = "contractExecute_ContractExecuteServiceImpl")
	private ContractExecuteService contractExecuteService;

	@WebRemote
	public GridData<ContractExecuteVo> getGridData(
			ContractExecuteVo contractExecuteVo) throws Exception {
		String contractId = contractExecuteVo.getProcurementContractId();
		List<ContractExecute> contractExecutes = this.contractExecuteService
				.findContractExecutesByContractId(contractId,
						contractExecuteVo.getStart(),
						contractExecuteVo.getLimit());

		List<ContractExecuteVo> contractVos = new ArrayList<ContractExecuteVo>(
				contractExecutes.size());
		for (ContractExecute contractExecute : contractExecutes) {
			ContractExecuteVo temp = new ContractExecuteVo();
			BeanUtils.copyProperties(temp, contractExecute);
			contractVos.add(temp);
		}
		GridData<ContractExecuteVo> gridData = new GridData<ContractExecuteVo>();
		gridData.setResults(contractVos);
		gridData.setTotalProperty(contractExecuteService
				.countContractExecutesByContractId(contractId));
		return gridData;
	}

	@WebRemote
	public String saveContractExecute(ContractExecuteVo contractExecuteVo)
			throws Exception {
		ContractExecute contractExecute = new ContractExecute();
		BeanUtils.copyProperties(contractExecute, contractExecuteVo);
		this.contractExecuteService.saveContractExecute(contractExecute);
		return "{success:true}";
	}

	@WebRemote
	public String deleteContractExecute(String[] contractExecuteIds) {
		this.contractExecuteService
				.batchDeleteContractExecutes(contractExecuteIds);
		return "{success:true}";
	}
}
