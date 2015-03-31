package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
import com.luck.itumserv.services.security.Identity;
import com.sysware.p2m.guser.GuserService;

@Name("contract_ProcurementContractBookRemote")
public class ProcurementContractBookRemote {

	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)), BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	@In(create = true)
	Identity identity;

	@In(create = true, value = "contract_ProcurementContractBookServiceImpl")
	private ProcurementContractBookService contractBookService;
	
	@In(create = true, value = "guser_GuserServiceImpl")
	private GuserService guserService;

	/**
	 * 采购合同管理--合同管理列表GRID
	 * @param procurementContractBookVo
	 * @return
	 * @throws Exception
	 */
	@WebRemote
	public GridData<ProcurementContractBookVo> getContractBooks(
			ProcurementContractBookVo procurementContractBookVo) throws Exception {

		ProcurementContractBookCondition condition = new ProcurementContractBookCondition();
		BeanUtils.copyProperties(condition, procurementContractBookVo);

//		Long loginUserId = identity.getLoginUser().getUserid();
//		condition.setUserId(loginUserId);

		List<ProcurementContractBook> procurementContractBooks = this.contractBookService
				.getContractBooksByCondition(condition);

		// 数据复制
		List<ProcurementContractBookVo> contractBookVos = new ArrayList<ProcurementContractBookVo>();
		for (ProcurementContractBook contractBook : procurementContractBooks) {
			ProcurementContractBookVo contractBookVo = new ProcurementContractBookVo();
			BeanUtils.copyProperties(contractBookVo, contractBook);
			contractBookVo.setEditors(guserService.getGuserById(Long.parseLong(contractBook.getEditors())).getTruename());
			contractBookVos.add(contractBookVo);
		}

		GridData<ProcurementContractBookVo> gridData = new GridData<ProcurementContractBookVo>();
		gridData.setResults(contractBookVos);
		gridData.setTotalProperty(contractBookService.countContractBooksByCondition(condition));
		return gridData;
	}

	@WebRemote
	public String saveGridData(ProcurementContractBookVo contractBookVo) throws Exception {
		String updateRecords = contractBookVo.getUpdateRecords();
		if (StringUtils.isNotEmpty(updateRecords)) {
			List<ProcurementContractBook> procurementContractBooks = new ArrayList<ProcurementContractBook>();
			JSONArray records = JSONArray.fromObject(updateRecords);
			for (int i = 0; i < records.size(); i++) {
				JSONObject obj = records.getJSONObject(i);
				ProcurementContractBook dest = (ProcurementContractBook) JSONObject.toBean(obj,
						ProcurementContractBook.class);
				dest.setArriveCircs(new BigDecimal(obj.getString("arriveCircs")));
				procurementContractBooks.add(dest);
			}
			this.contractBookService.batchUpdateProcurementDetails(procurementContractBooks);
		}
		return "{success:true}";
	}

	@WebRemote
	public String addContractBook(ProcurementContractBookVo contractBookVo) throws Exception {

		String[] contractIds = contractBookVo.getProcurementContractId().split(",");		
		Date signDate = new SimpleDateFormat("yyyy-MM-dd").parse(contractBookVo.getSignDate());
		this.contractBookService.batchAddContractBook(contractIds, signDate);
		return "{success:true}";
	}

}
