package com.sysware.customize.hd.investment.procurementExecute.tenderUnits;

import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

@Name("tenderUnits_tenderUnitsRemote")
public class TenderUnitsRemote {
	@In(value="tenderUnitsServiceImpl",create = true)
	TenderUnitsService  tenderUnitsServiceImpl;
	/**
	 * 获取招标单位列表
	 * @param vo
	 * @return
	 */
    @WebRemote
    public GridData<TenderUnitsVo> getGridData(TenderUnitsVo vo){
    	GridData<TenderUnitsVo> result = new GridData<TenderUnitsVo>();
    	List<Object[]> obList = tenderUnitsServiceImpl.getGridData(vo);
    	List<TenderUnitsVo> TenderUnitsVoList = new ArrayList<TenderUnitsVo>();
    	for(Object ob[] : obList){
    		TenderUnitsVoList.add(getTenderUnitsVo(ob));
    	}
    	result.setResults(TenderUnitsVoList);
    	result.setTotalProperty(tenderUnitsServiceImpl.getCount(vo));
    	return result;
    }
    private TenderUnitsVo getTenderUnitsVo(Object ob[]){
    	TenderUnitsVo vo = new TenderUnitsVo();
    	vo.setAddress(ob[3]==null?"":ob[3].toString());
    	vo.setBusinessScope(ob[2]==null?"":ob[2].toString());
    	vo.setVenderCode(ob[0]==null?"":ob[0].toString());
    	vo.setVenderName(ob[1]==null?"":ob[1].toString());
    	vo.setTenderUnitsID(ob[4]==null?"":ob[4].toString());
    	vo.setTenderFileId(ob[5]==null?"":ob[5].toString());
    	vo.setVenderId(ob[6]==null?"":ob[6].toString());
    	vo.setPrice(ob[7]==null?"":ob[7].toString());
    	vo.setRemark(ob[8]==null?"":ob[8].toString());
    	vo.setConstructionUnderPoint(ob[9]==null?"":ob[9].toString());
    	return vo;
    }
    /**
	 * 保存招标单位信息
	 * @param tenderFileId 招标子项id
	 * @param tenderUnitsID 招标单位主键
	 * @param price 价格
	 * @param constructionUnderPoint 承建下浮点
	 * @param venderId 供应商信息
	 * @param remark 备注
	 */
    @WebRemote
    public String saveTenderUnits(String tenderFileId,String tenderUnitsID[],
    		String price[],String constructionUnderPoint[],String venderId[],String remark[]){
    	tenderUnitsServiceImpl.saveTenderUnits(tenderFileId, tenderUnitsID, price, constructionUnderPoint, venderId, remark);
    	return "{success ： ture}";
    }
}
