package com.sysware.customize.hd.investment.procurementExecute.tenderFile;


import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

/**
 * 招标管理 remote  
 * @author fanzhihui
 *
 */
@Name("tenderFileRemote")
public class TenderFileRemote {

	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	@In(create = true, value = "tenderFileServiceImpl")
	private TenderFileService tenderFileService;
	
	@WebRemote
	public String saveTenderFile(TenderFileVo vo){
		this.tenderFileService.saveTenderFile(vo);
		return "{success:true}";
	}
	@WebRemote
	public String getTenderFile(TenderFileVo vo){
		return tenderFileService.getTenderFileById(vo);
	}
	@WebRemote
	public String updateStatus(String tenderFileId){
		String[] id = {tenderFileId};
		tenderFileService.updateStatus(id, "2",null);
		return "{success : true}";
	}
	@WebRemote
	public String updateStatusById(String tenderFileId){
		String[] id = {tenderFileId};
		tenderFileService.updateStatus(id, "3",null);
		return "{success : true}";
	}
	@WebRemote
	public String getTenderFileByTenderFileId(TenderFileVo vo) { 
		return getTenderFileVo(tenderFileService.getTenderFile(vo));
	}
	private String getTenderFileVo(TenderFile tenderFile){
			TenderFileVo tenderFileVo = new TenderFileVo(); 
			tenderFileVo.setTenderFileCode(tenderFile.getTenderFileCode()); 
			tenderFileVo.setPlenipotentiary(tenderFile.getPlenipotentiary()==null?"":tenderFile.getPlenipotentiary()); 
			tenderFileVo.setTenderId(tenderFile.getTenderId()); 
			tenderFileVo.setProcurementplanDetilName(tenderFile.getProcurementPlanDetilName()); 
			if(tenderFile.getCreateDate()!=null)
			tenderFileVo.setCreatedate(df.format(tenderFile.getCreateDate()));  
			tenderFileVo.setAgreementdepartment(tenderFile.getAgreementDepartment()==null?"":tenderFile.getAgreementDepartment()); 
			tenderFileVo.setSelecteddepartment(tenderFile.getSelectedDepartment()==null?"":tenderFile.getSelectedDepartment()); 
			tenderFileVo.setTenderFileType(tenderFile.getTenderFileType()); 
			tenderFileVo.setSyndic(tenderFile.getSyndic()); 
			tenderFileVo.setStatus(tenderFile.getStatus()); 
			tenderFileVo.setRemark(tenderFile.getRemark()); 
			tenderFileVo.setFileId(tenderFile.getFileId()); 
			String fileName = tenderFile.getFileName();
			if(fileName.indexOf("\\")!=-1)
			    fileName = fileName.substring(fileName.lastIndexOf("\\")+1); 
			tenderFileVo.setFileName(fileName); 
			tenderFileVo.setAmount(tenderFile.getAmount()==null?"":tenderFile.getAmount().toString()); 
			tenderFileVo.setApplicationDepartment(tenderFile.getApplicationDepartment()); 
			tenderFileVo.setEfficiency(tenderFile.getEfficiency()==null?"":tenderFile.getEfficiency()); 
			tenderFileVo.setStatus(tenderFile.getStatus()); 
			JSONObject obj = new JSONObject();
			obj.element("success", true).element("trueFileName", tenderFile.getFileName()).element("data",
					JSONObject.fromObject(tenderFileVo));
			return obj.toString();
	}
	
	/**
     * 查询是否有上传招标文档
     * @param vo
     * @return
     */
	@WebRemote
    public String GetTenderForTenderFile(TenderFileVo vo){
		int flag = tenderFileService.GetTenderForTenderFile(vo);
		if(flag >0)
			return "false";
		else
			return "true";
	}
}
