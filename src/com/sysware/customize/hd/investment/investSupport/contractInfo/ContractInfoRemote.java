package com.sysware.customize.hd.investment.investSupport.contractInfo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;
import com.sysware.customize.hd.investment.investSupport.vo.ContractExecuteInfoVo;
import com.sysware.customize.hd.investment.investSupport.vo.ContractInfoVo;
import com.sysware.customize.hd.investment.investSupport.vo.DamandVo;
import com.sysware.customize.hd.investment.investSupport.vo.TenderInfoVo;

/**
 * @ClassName: ContractInfoRemote
 * @Description: 合同资讯模块 UI 类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:58:17 AM
 * 
 */

@Name("contractInfoRemote")
public class ContractInfoRemote {

	@In(create = true, value = "contractInfoServiceImpl")
	private ContractInfoService _service;

	@WebRemote
	public GridData<ContractInfoVo> getInfo(ContractInfoVo oo) {
		GridData<ContractInfoVo> g = new GridData<ContractInfoVo>();
		List<Object> list = _service.getInfo(oo);
		Iterator<Object> it = list.iterator();
		List<ContractInfoVo> voList = new ArrayList<ContractInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			ContractInfoVo vo = new ContractInfoVo();
			vo.setContractId(String.valueOf(obj[0]));
			vo.setContractCode(String.valueOf(obj[1]));
			vo.setContractName(String.valueOf(obj[2]));
			vo.setDepartmentA(String.valueOf(obj[3]));
			vo.setContractAmount(new BigDecimal(String.valueOf(obj[4])));
			vo.setCreateTime(String.valueOf(obj[5]));
			vo.setCreateType(String.valueOf(obj[6]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public GridData<DamandVo> getDamanInfo(ContractInfoVo oo) {
		GridData<DamandVo> g = new GridData<DamandVo>();
		List<Object> list = _service.getDamanInfo(oo);
		Iterator<Object> it = list.iterator();
		List<DamandVo> voList = new ArrayList<DamandVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			DamandVo vo = new DamandVo();
			vo.setCode(String.valueOf(obj[0]));
			vo.setName(String.valueOf(obj[1]));
			vo.setPartType(String.valueOf(obj[2]));
			vo.setDeclareNum(String.valueOf(obj[3]));
			vo.setBankrollBudget(String.valueOf(obj[4]));
			vo.setDeclareDept(String.valueOf(obj[5]));
			vo.setFileId(obj[6]==null?"":String.valueOf(obj[6]));
			vo.setFileName(obj[7]==null?"":String.valueOf(obj[7]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getDamanInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public GridData<ContractExecuteInfoVo> getContractExeInfo(ContractInfoVo oo) {
		GridData<ContractExecuteInfoVo> g = new GridData<ContractExecuteInfoVo>();
		List<Object> list = _service.getContractExeInfo(oo);
		Iterator<Object> it = list.iterator();
		List<ContractExecuteInfoVo> voList = new ArrayList<ContractExecuteInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			ContractExecuteInfoVo vo = new ContractExecuteInfoVo();
			vo.setMaterialitemCode(String.valueOf(obj[0]==null?"":obj[0]));
			vo.setMaterialitemName(String.valueOf(obj[1]==null?"":obj[1]));
			vo.setMaterialStandard(String.valueOf(obj[2]==null?"":obj[2]));
			vo.setArrivalLoton(String.valueOf(obj[3]==null?"":obj[3]));//批次数量
			vo.setArrivalCount(String.valueOf(obj[4]==null?"":obj[4]));//到货数量
			vo.setPurchaseNum(String.valueOf(obj[5]==null?"":obj[5]));//订货总数
			vo.setNotAarrivalCount(String.valueOf(obj[6]==null?"":obj[6]));//未到货数量
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getContractExeInfoCount(oo));
		return g;
	}
	
	@WebRemote
	public GridData<ContractExecuteInfoVo> getContractPaymentInfo(ContractInfoVo oo) {
		GridData<ContractExecuteInfoVo> g = new GridData<ContractExecuteInfoVo>();
		List<Object> list = _service.getContractPaymentInfo(oo);
		Iterator<Object> it = list.iterator();
		List<ContractExecuteInfoVo> voList = new ArrayList<ContractExecuteInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			ContractExecuteInfoVo vo = new ContractExecuteInfoVo();
			vo.setContractCode(String.valueOf(obj[0]));
			vo.setContractName(String.valueOf(obj[1]));
			vo.setPayMentAmount(String.valueOf(obj[2]));
//			vo.setArrearageAmount(String.valueOf(obj[3]));
			vo.setIncurredDate(UtilDAOImp.dateToStr((Date)obj[3], "yyyy-MM-dd"));
			vo.setConttractAmount(String.valueOf(obj[4]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(oo.getCount());
		return g;
	}
	
	@WebRemote
	public GridData<TenderInfoVo> getTenderInfo(ContractInfoVo oo) {
		GridData<TenderInfoVo> g = new GridData<TenderInfoVo>();
		List<Object> list = _service.getTenderInfo(oo);
		Iterator<Object> it = list.iterator();
		List<TenderInfoVo> voList = new ArrayList<TenderInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			TenderInfoVo vo = new TenderInfoVo();
			vo.setTenderCode(String.valueOf(obj[0]));
			vo.setTenderName(String.valueOf(obj[1]==null?"":obj[1]));
			vo.setProcurementPlanDetilName(String.valueOf(obj[2]==null?"":obj[2]));
			vo.setTenderDepartment(String.valueOf(obj[3]));
			vo.setTenderType(String.valueOf(obj[4]==null?"":obj[4]));
			vo.setSupplier(String.valueOf(obj[5]==null?"":obj[5]));
			vo.setCheckTenderPenson(String.valueOf(obj[6]==null?"":obj[6]));
			vo.setTenderFileId(String.valueOf(obj[7]==null?"":obj[7]));
			vo.setTenderFileName(String.valueOf(obj[8]==null?"":obj[8]));
			vo.setReviewFileId(String.valueOf(obj[9]==null?"":obj[9]));
			vo.setReviewFileName(String.valueOf(obj[10]==null?"":obj[10]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_service.getTenderInfoCount(oo));
		return g;
	}
	
	@SuppressWarnings("unchecked")
	@WebRemote
	public GridData<?> getProjectList(ContractInfoVo vo){
		GridData gd=new GridData();
		List<?> list=_service.getProjectList(vo);
		gd.setTotalProperty(vo.getCount());
		gd.setResults(list);
		gd.setSuccess(true);
		return gd;
	}
	
	@SuppressWarnings("unchecked")
	@WebRemote
	public GridData<?> getContractList(ContractInfoVo vo){
		GridData gd=new GridData();
		List<?> list=_service.getContractList(vo);
		gd.setTotalProperty(vo.getCount());
		gd.setResults(list);
		gd.setSuccess(true);
		return gd;
	}
	
	@WebRemote
	public GridData<?> getPaymentList(ContractInfoVo vo){
		GridData gd=new GridData();
		List<?> list=_service.getPaymentList(vo);
		gd.setTotalProperty(vo.getCount());
		gd.setResults(list);
		gd.setSuccess(true);
		return gd;
	}
	
	@WebRemote
	public GridData<?> getPaymentDetails(ContractInfoVo vo){
		GridData gd=new GridData();
		List<?> list=_service.getPaymentDetails(vo);
		gd.setTotalProperty(vo.getCount());
		gd.setResults(list);
		gd.setSuccess(true);
		return gd;
	}
	
}
