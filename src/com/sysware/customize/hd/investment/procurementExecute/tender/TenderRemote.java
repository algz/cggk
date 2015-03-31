package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
/**
 * 招标管理
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-10-24
 * 
 */
@Name("tenderRemote")
public class TenderRemote {
	@In(create= true,value = "tenderServiceImpl")
	TenderService tenderService;
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	/**
	 * 保存招标管理
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveTender(TenderVo vo){
		tenderService.saveTender(vo);
		return "{success:true}";
	}
	/**
	 * 招标管理上传文件
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String updateTender(TenderVo vo){
		tenderService.saveTender(vo);
		return "{success:true}";
	}
	/**
	 * 删除招标
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String deleteTender(String tenderId[]){
		tenderService.deleteTender(tenderId);
		return "{success:true}";
	}
	/**
	 * 获取招标列表
	 * 
	 * 
	*/
	@WebRemote
	public GridData<TenderVo> getGridData(TenderVo vo){
		GridData<TenderVo> result = new GridData<TenderVo>();
		List<Tender> tenderList = tenderService.getTenderList(vo);
		List<TenderVo> tenderVoList = new ArrayList<TenderVo>();
		for(Tender tender : tenderList){
			tenderVoList.add(getTender(tender));
		}
		result.setResults(tenderVoList);
		result.setTotalProperty(tenderService.getTenderCount(vo));
		return result;
	}
	private TenderVo getTender(Tender tender){
		TenderVo vo = new TenderVo();  
		vo.setTenderDepartment(tender.getTenderDepartment());
		vo.setRemark(tender.getRemark());
		vo.setTenderCode(tender.getTenderCode());
		vo.setTenderName(tender.getTenderName());
		vo.setTenderType(tender.getTenderType());
		vo.setCreateDate(df.format(tender.getCreateDate()));  
		vo.setTenderId(tender.getTenderID());
		vo.setProcurementPlanDetilName(tender.getProcurementPlanDetilName());
		vo.setProcurementPlanDetilId(tender.getProcurementPlanDetilId());
		vo.setTenderId(tender.getTenderID());
		vo.setTenderFileType(tender.getTenderFileType().toString());
		return vo;
	} 
	private String getTenderStatus(String status){
		if(status.equals("1")){
			return "编制中";
		}else if(status.equals("2")){
			return "已送审";
		}else if(status.equals("3")){
			return "已审批";
		}
		return "";
	}
}
