package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;


import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import com.sysware.customize.hd.investment.util.UtilForHD;

import freemarker.core.ReturnInstruction.Return;

@Name("StockPaymentTaskServiceImpl")
public class StockPaymentTaskServiceImpl implements StockPaymentTaskService {

	@In(create=true,value="StockPaymentTaskDaoImpl")
	private StockPaymentTaskDao dao;
	
	public List<StockPaymentTaskVo> getContractList(StockPaymentTaskVo vo){
		return dao.getContractList(vo);
	}
	
	public long getContractListCount(StockPaymentTaskVo vo){
		return dao.getContractListCount(vo);
	}
	
	/**
	 * 通过供应商编号获取所有开户信息
	 * @param vo
	 * @return
	 */
	public List<StockPaymentTaskVo> getVendorAccountList(StockPaymentTaskVo vo){
		StockPaymentTaskVo paymentTaskVo = dao.getVendorAccountList(vo);
		List<StockPaymentTaskVo> list = new ArrayList<StockPaymentTaskVo>();
		if(paymentTaskVo==null)
			return list;
		else{
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getBank())))
//				paymentTaskVo.setBank("空");
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getBank2())))
//				paymentTaskVo.setBank2("空");
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getBank3())))
//				paymentTaskVo.setBank3("空");
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getAccountid())))
//				paymentTaskVo.setAccountid("空");
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getAccountid2())))
//				paymentTaskVo.setAccountid2("空");
//			if(!(UtilForHD.IsStrEmpty(paymentTaskVo.getAccountid3())))
//				paymentTaskVo.setAccountid3("空");
			StockPaymentTaskVo taskVo = new StockPaymentTaskVo();
			StockPaymentTaskVo taskVo2 = new StockPaymentTaskVo();
			StockPaymentTaskVo taskVo3 = new StockPaymentTaskVo();
			taskVo.setPsBankName(paymentTaskVo.getBank());
			taskVo.setPsBankNum(paymentTaskVo.getAccountid());
			taskVo2.setPsBankName(paymentTaskVo.getBank2());
			taskVo2.setPsBankNum(paymentTaskVo.getAccountid2());
			taskVo3.setPsBankName(paymentTaskVo.getBank3());
			taskVo3.setPsBankNum(paymentTaskVo.getAccountid3());
			list.add(taskVo);
			list.add(taskVo2);
			list.add(taskVo3);
		}
		return list;
	}
	
	public void updateStockPaymentTask(StockPaymentTask vo){
		dao.updateStockPaymentTask(vo);
	}
	
	public void insertStockPaymentTask(StockPaymentTask vo){
		dao.insertStockPaymentTask(vo);
	}
	
	public List<StockPaymentTaskVo> getPaymentTask(StockPaymentTaskVo vo){
		return dao.getPaymentTask(vo);
	}
	
	public long getPaymentTaskCount(StockPaymentTaskVo vo){
		return dao.getPaymentTaskCount(vo);
	}
	
	public StockPaymentTask getStockPaymentTask(StockPaymentTaskVo vo){
		return dao.getStockPaymentTask(vo);
	}
	
	public StockPaymentTask getStockPaymentTask(String psId){
		StockPaymentTaskVo vo = new StockPaymentTaskVo();
		vo.setPsId(psId);
		return dao.getStockPaymentTask(vo);
	}
	
	public void deleteStockPaymentTask(String psIds){
		dao.deleteStockPaymentTask(psIds);
	}
	
	public void updateState(String ids,long state){
		dao.updateState(ids, state);
	}
}
