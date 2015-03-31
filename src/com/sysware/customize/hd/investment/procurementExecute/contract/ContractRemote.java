package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo;
import com.sysware.customize.hd.investment.procurementExecute.contract.vo.TenderVo;
import com.sysware.customize.hd.investment.procurementExecute.tenderFile.TenderFileVo;

/**
 * 合同管理 页面交互 REMOTE 类
 * 
 * @author LIT
 * @date 2011-10-18
 * 
 */

@Name("contract_Remote")
public class ContractRemote {

	@In(create = true, value = "Contract_ServiceImpl")
	ContractService _Service;

	// 合同列表
	@WebRemote
	public GridData<ContractVo> getContractList(ContractVo voo) {
		GridData<ContractVo> g = new GridData<ContractVo>();
		List<Object> list = _Service.getContractList(voo);
		Iterator<Object> it = list.iterator();
		List<ContractVo> voList = new ArrayList<ContractVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			ContractVo vo = new ContractVo();
			vo.setContractId(obj[0] + "");
			vo.setContractName(obj[1] + "");
			vo.setContractCode(obj[2] + "");
			vo.setDepartmentA(obj[3] + "");
			vo.setDepartmentB(obj[4] + "");
			vo.setContractAmount(obj[5] + "");
			vo.setCreateDate(obj[6] + "");
			vo.setContractFile(obj[7] + "");
			vo.setReMark(obj[8] + "");
			vo.setStatus(obj[9] + "");
			vo.setFileName(obj[10] + "");
			vo.setFileId(obj[11] + "");
			vo.setAcceptnum(obj[12]+"");
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getContractListCount(voo));
		return g;
	}

	// 根据合同ID 查询详细信息
	@WebRemote
	public GridData<ContractVo> getContractById(ContractVo voo) {
		GridData<ContractVo> g = new GridData<ContractVo>();
		List<Object> list = _Service.getContractById(voo);
		Iterator<Object> it = list.iterator();
		List<ContractVo> voList = new ArrayList<ContractVo>();
		while (it.hasNext()) {
			
			Object[] obj = (Object[]) it.next();
			
			String[] str = (obj[7] + "").split("\\|\\|");
			ContractVo vo = new ContractVo();
			vo.setContractId(obj[0] + "");
			vo.setContractName(obj[1] + "");
			vo.setContractCode(obj[2] + "");
			vo.setDepartmentA(obj[3] + "");
			vo.setDepartmentB(obj[4] + "");
			vo.setContractAmount(obj[5] + "");
			vo.setCreateDate(obj[6] + ""); 
			vo.setReMark(obj[8] + "");
			vo.setStatus(obj[9] + "");
			vo.setFileName(obj[10] + "");
			vo.setFileId(obj[11] + "");
			vo.setVendorId(obj[12] + "");
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(10);
		return g;
	}
     @WebRemote
     public String getContractForApprovalById(ContractVo voo){ 
    		List<Object> list = _Service.getContractById(voo);
    		Iterator<Object> it = list.iterator();
    		ContractVo vo = null;
    		Object[] obj = null;
    		while (it.hasNext()) { 
    			obj = (Object[]) it.next(); 
    			vo = new ContractVo();
    			vo.setContractId(obj[0] + "");
    			vo.setContractName(obj[1] + "");
    			vo.setContractCode(obj[2] + "");
    			vo.setDepartmentA(obj[3] + "");
    			vo.setDepartmentB(obj[4] + "");
    			vo.setContractAmount(obj[5] + "");
    			vo.setCreateDate(obj[6] + ""); 
    			vo.setReMark(obj[8] + "");
    			vo.setStatus(obj[9] + "");
    			vo.setFileName(obj[10] + "");
    			vo.setFileId(obj[11] + ""); 
    			vo.setVendorId(obj[12] + "");
    		} 
			JSONObject jsobj = new JSONObject();
			jsobj.element("success", true).element("trueFileName", vo.getFileName()).element("data",
					JSONObject.fromObject(vo));
			return jsobj.toString();
     }
	// tender 列表
	@WebRemote
	public GridData<TenderVo> getTenderList(ContractVo voo) {
		GridData<TenderVo> g = new GridData<TenderVo>();
		List<Object> list = _Service.getTenderList(voo);
		Iterator<Object> it = list.iterator();
		List<TenderVo> voList = new ArrayList<TenderVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			TenderVo oo = new TenderVo();
			oo.setTender_id(obj[0] + "");
			oo.setTender_code(obj[1] + "");
			oo.setTender_name(obj[2] + "");
			oo.setTender_department(obj[3] + "");
			oo.setTender_type(obj[4] + "");
			oo.setCreatedate(obj[5] + "");
			oo.setFlag(obj[6] + "");
			voList.add(oo);
		}
		g.setResults(voList);
		g.setTotalProperty(_Service.getTenderListCount(voo));
		return g;
	}

	// 删除
	@WebRemote
	public boolean delContractList(String[] ids) {
		for (int i = 0; i < ids.length; i++) {
			ContractVo vo = new ContractVo();
			vo.setContractId(ids[i]);
			_Service.delContractList(vo);
		}
		return true;
	}

	/*// 修改
	@WebRemote
	public boolean updaeContract(ContractVo voo) {
		return _Service.updaeContract(voo);
	}*/
	// 修改
	@WebRemote
	public boolean updaeContract(ContractVo voo, String[] tenderIds) {
		return _Service.updaeContract(voo,tenderIds);
	}

	// 新增
	@WebRemote
	public boolean createContract(ContractVo voo, String[] tenderIds) {
		return _Service.createContract(voo, tenderIds);
	}
	@WebRemote
	public String updateStatus(String[] id){
		_Service.updateStatus(id, "2");
		return "{success:true}";
	}
}
