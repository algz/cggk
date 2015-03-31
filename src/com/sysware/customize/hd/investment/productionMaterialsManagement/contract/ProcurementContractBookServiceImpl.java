package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;

@Name("contract_ProcurementContractBookServiceImpl")
public class ProcurementContractBookServiceImpl implements
		ProcurementContractBookService {

	@In(create = true, value = "contract_ProcurementContractBookDaoImpl")
	private ProcurementContractBookDao procurementContractBookDao;

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService contractService;
	
	@In(create = true, value = "contractPurchaseServiceImpl")
	private ContractPurchaseService contractPurchaseService;

	public List<ProcurementContractBook> getContractBooksByCondition(
			ProcurementContractBookCondition condition) {
		return this.procurementContractBookDao.findByCondition(condition);
	}

	public long countContractBooksByCondition(
			ProcurementContractBookCondition condition) {
		return this.procurementContractBookDao.countByCondition(condition);
	}

	public ProcurementContractBook getContractBookById(
			String procurementContractBookId) {
		return this.procurementContractBookDao.get(procurementContractBookId);
	}

	@Transactional
	public void saveContractBook(ProcurementContractBook contractBook) {
		if (StringUtils.isEmpty(contractBook.getProcurementContractBookId())) {
			this.procurementContractBookDao.save(contractBook);
			ProcurementContract contract = contractService
					.getContractById(contractBook.getProcurementContractId());
			contract.setApplicationStatus(ContractApplicationStatusEnum.YI_SHENG_CHENG
					.getValue());
			try {
				contractService.saveContract(contract);
			} catch (ReduplicatedException e) {
				e.printStackTrace();
			}
		} else {
			this.procurementContractBookDao.update(contractBook);
		}

	}

	@Transactional
	public void batchUpdateProcurementDetails(
			List<ProcurementContractBook> contractBooks) {
		for (ProcurementContractBook procurementContractBook : contractBooks) {
			this.procurementContractBookDao.update(procurementContractBook);
		}

	}

	@Transactional
	public void batchAddContractBook(String[] contractIds, Date signDate) {
		for (String procurementContractId : contractIds) {
			// 通过合同ID获得“合同-采购”对应信息
			ContractPurchase example = new ContractPurchase();
			example.setProcurementContractId(procurementContractId);
			List<ContractPurchase> contractPurchases = contractPurchaseService
					.getContractPurchasesByExample(example);

			ProcurementContractBook contractBook = new ProcurementContractBook();
			contractBook.setProcurementContractId(procurementContractId);
			// 从合同对应的物料中任意取出一个保存至合同台账
			contractBook.setMaterialId(contractPurchases.get(0).getMaterialId());
			contractBook.setSignDate(signDate);
			
			this.saveContractBook(contractBook);
		}
		
	}

}
