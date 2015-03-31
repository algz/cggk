package com.sysware.customize.hd.investment.procurementExecute.tenderFile;



import java.text.SimpleDateFormat;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.procurementExecute.tender.TenderService;


/**
 * 招标项目上传 Service实现
 * @author zhaodw
 *
 */
@Name("tenderFileServiceImpl")
public class TenderFileServiceImpl implements TenderFileService {

	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	@In(create = true, value = "tenderFileDaoImpl")
	private TenderFileDao tenderFileDao;

	@In(create = true, value = "tenderServiceImpl")
	private TenderService tenderService;
	@Transactional
	public void saveTenderFile(TenderFileVo vo) {
		TenderFile tenderFile = getTenderFile(vo); 
		if(tenderFile.getTenderFileId()==null){
			this.tenderFileDao.save(tenderFile);
		}else{
			this.tenderFileDao.update(tenderFile);
		}
		
	}
	
	public TenderFile getTenderFile(TenderFileVo vo) { 
		return tenderFileDao.getTenderFile(vo);
	}

	public String getTenderFileById(TenderFileVo vo) {
		return tenderFileDao.getTenderFileById(vo); 
	} 
	@Transactional
	public void updateStatus(String tenderFileId[], String status,String tenderFileType) {  
		 TenderFile tenderFile = null; 
	     for(String id : tenderFileId){
	    	 if(tenderFileType!=null){
	    		 id = id.substring(0,id.length()-1);
	    		 tenderFileType = id.substring(id.length()-1);
	    	 }
	    	 tenderFile = tenderFileDao.updateStatus(id, status);
	    	 if(status.equals("3") || (tenderFileType!=null && (tenderFileType.equals("8") || tenderFileType.equals("9") ||  tenderFileType.equals("10")|| tenderFileType.equals("2") ||  tenderFileType.equals("3"))))
	    		 tenderService.updateTenderFileType(tenderFile.getTenderId(),status);
	    	 if(status.equals("3") && tenderFileType!=null && tenderFile.getTenderFileType().equals("6")){
	    		 tenderService.updateTenderFileFlag(tenderFile.getTenderId());
	    	 }else if(status.equals("2") && (tenderFile.getTenderFileType().equals("8") || tenderFile.getTenderFileType().equals("9") ||  tenderFile.getTenderFileType().equals("10")|| tenderFile.getTenderFileType().equals("2") ||  tenderFile.getTenderFileType().equals("3"))){
	    		 tenderService.updateTenderFileType(tenderFile.getTenderId(),status);
	    	 }else if(status.equals("3") && tenderFile.getTenderFileType().equals("2")){
	    		 tenderService.updateTenderFileType(tenderFile.getTenderId(),status);
	    	 }else if(status.equals("3") && tenderFile.getTenderFileType().equals("10") && tenderFileType==null){//自行比价不需要送审的处理
	    		 tenderService.updateTenderFileType(tenderFile.getTenderId(),status);
	    	 }
	     }
	}

	public TenderFile getTenderFileByTendFileId(String tenderFileId) {
		return  this.tenderFileDao.get(tenderFileId);
	}
	public String getTenderFileVo(TenderFile tenderFile){
		return  this.tenderFileDao.getTenderFileVo(tenderFile);
	}
	
	 /**
     * 查询是否有上传招标文档
     * @param vo
     * @return
     */
    public int GetTenderForTenderFile(TenderFileVo vo){
    	return tenderFileDao.GetTenderForTenderFile(vo);
    }
}
