package com.sysware.customize.hd.investment.procurementExecute.tenderUnits;



import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;


/**
 * 招标单位
 * @author zhaodw
 *
 */
@Name("tenderUnitsServiceImpl")
public class TenderUnitsServiceImpl implements TenderUnitsService {
 
	
	@In(create = true, value = "tenderUnitsDaoImpl")
	private TenderUnitsDao tenderUnitsDao;
 

	public List<Object[]> getGridData(TenderUnitsVo vo) {
		Query query =  tenderUnitsDao.createSqlQuery(getSql(vo));
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}
	public long getCount(TenderUnitsVo vo){
		return tenderUnitsDao.createSqlQuery(getSql(vo)).getResultList().size();
	}
	/**
	 * 获取招标单位列表的查询语句
	 * @param vo
	 * @return
	 */
	
    private String getSql(TenderUnitsVo vo){
    	StringBuilder sql = new StringBuilder();
    	sql.append("select vd.vendorCode,vd.vendorName,vd.businessScope, ");
    	sql.append("vd.address,obj.tender_units_id,obj.tender_file_id, ");
    	sql.append("vd.vendorID,obj.price,obj.remark,obj.constructionUnderPoint ");
    	sql.append("from t_Vendor vd ");
    	sql.append("left join T_tender_units obj on vd.vendorID = obj.vender_id "); 
    	int index = 0;//标示是否有查询条件 
    	if(vo.getAddress()!=null && !"".equals(vo.getAddress())){ 
    		index++;
    		sql.append(" where vd.address like '%").append(vo.getAddress()).append("%' ");
    	}
    	if(vo.getVenderName()!=null && !"".equals(vo.getVenderName())){ 
    		if(index==0)
    		{
    			sql.append(" where ");
    			index++;
    		}else
    			sql.append(" and ");
    		sql.append(" vd.vendorName like '%").append(vo.getVenderName()).append("%' ");
    	}
    	if(vo.getVenderCode()!=null && !"".equals(vo.getVenderCode())){ 
    		if(index==0)
    		{
    			sql.append(" where ");
    			index++;
    		}else
    			sql.append(" and ");
    		sql.append(" vd.vendorCode like '%").append(vo.getVenderCode()).append("%' ");
    	}
    	if(vo.getBusinessScope()!=null && !"".equals(vo.getBusinessScope())){ 
    		if(index==0)
    		{
    			sql.append(" where ");
    			index++;
    		}else
    			sql.append(" and ");
    		sql.append(" vd.businessScope like '%").append(vo.getBusinessScope()).append("%' ");
    	}
    	if(vo.getPrice()!=null && !"".equals(vo.getPrice())){ 
    		if(index==0)
    		{
    			sql.append(" where ");
    			index++;
    		}else
    			sql.append(" and ");
    		sql.append(" obj.price like '%").append(vo.getPrice()).append("%' ");
    	}
    	sql.append("order by obj.tender_units_id ");
    	return sql.toString();
    }
    /**
     * 保存招标单位信息
     */
    @Transactional
	public void saveTenderUnits(String tenderFileId, String[] tenderUnitsID,
			String[] price, String[] constructionUnderPoint, String venderId[],String[] remark) {
    	TenderUnits tenderUnits = null;
		for(int i=0;i<tenderUnitsID.length;i++){
			if(tenderUnitsID[i]==null || tenderUnitsID[i].equals("")){
				tenderUnits = new TenderUnits(); 
			}else{
				tenderUnits = tenderUnitsDao.get(tenderUnitsID[i]);
			}
			tenderUnits.setTenderFileId(tenderFileId);
			tenderUnits.setConstructionUnderPoint(constructionUnderPoint==null?"":constructionUnderPoint[i]);
			tenderUnits.setVenderId(venderId[i]);
			tenderUnits.setPrice(new BigDecimal(price==null?"":price[i]));
			tenderUnits.setRemark(remark==null?"":remark[i]);
			if(tenderUnitsID[i]==null || tenderUnitsID[i].equals("")){
				tenderUnitsDao.add(tenderUnits);
			}else
				tenderUnitsDao.update(tenderUnits);
		}
	}  
	 
}
