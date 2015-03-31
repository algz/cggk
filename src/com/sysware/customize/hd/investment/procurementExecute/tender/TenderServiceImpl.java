package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
@Name("tenderServiceImpl")
public class TenderServiceImpl implements TenderService{

	@In(create = true,value="tenderDaoImpl")
	TenderDao tenderDao;
	
	
	@Transactional
	public void saveTender(TenderVo vo) {
		tenderDao.saveTender(vo);
	}
	 
	public List<Tender> getTenderList(TenderVo vo) {  
		return tenderDao.getTenderList(vo);
	}

	public long getTenderCount(TenderVo vo) {
		return tenderDao.getTenderCount(vo);
	}

	@Transactional
	public void deleteTender(String[] tenderId) {
		for(String id : tenderId){
			tenderDao.deleteTender(id);
		}
	}

	public void updateTenderFileType(String tenderId,String status) {
		Tender tender = tenderDao.get(tenderId);
		if((tender.getTenderFileType()==0L && status.equals("2")) || status.equals("3"))
		{
			tender.setTenderFileType(tender.getTenderFileType()+1);
			tenderDao.update(tender);
		}
		
	}

	public void updateTenderFileFlag(String tenderId) {
		Tender tender = tenderDao.get(tenderId);
		tender.setTenderFileType(tender.getTenderFileType()+1);
		tender.setFlag("1");
		tenderDao.update(tender);
	}
}
