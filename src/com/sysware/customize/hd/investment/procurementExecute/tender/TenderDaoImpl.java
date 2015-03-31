package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
@Name("tenderDaoImpl")
public class TenderDaoImpl extends GenericDAOImpl<Tender> implements TenderDao{

	public void deleteTender(String id) {
		remove(id);
		createQuery("delete from TenderProcurementDetil where tenderID = '"+id+"'").executeUpdate();
		createQuery("delete from TenderFile where tenderId = '"+id+"'").executeUpdate();
	}

	public long getTenderCount(TenderVo vo) {
		String sql = "select count(*) from Tender obj where " + getSql(vo);
		Query query = createQuery(sql);
		return (Long)query.getSingleResult() ;
	}

	public void saveTender(TenderVo vo) {
		Tender tender = getTender(vo);
		TenderProcurementDetil tenderProcurementDetil = null;
		if(vo.getTenderId()==null || "".equals(vo.getTenderId())){
//			tender.setTenderFileType(Long.parseLong("0"));
			tender = save(tender);
			tenderProcurementDetil = new TenderProcurementDetil();
			tenderProcurementDetil.setTenderID(tender.getTenderID());
			tenderProcurementDetil.setProcurementPlanDetilID(vo.getProcurementPlanDetilId());
			tenderProcurementDetil.setProcurementPlanDetilName(vo.getProcurementPlanDetilName());
			save(tenderProcurementDetil);
		}else{
			update(tender);
			String sql = "update TenderProcurementDetil obj set obj.procurementPlanDetilID = ? , obj.procurementPlanDetilName = ? where obj.tenderID = ?";
			Query query = createQuery(sql);
			query.setParameter(1, vo.getProcurementPlanDetilId());
			query.setParameter(2, vo.getProcurementPlanDetilName());
			query.setParameter(3, tender.getTenderID());
			query.executeUpdate();
		} 
	}
	private Tender getTender(TenderVo vo){
		Tender tender = null; 
		if(vo.getTenderId()!=null && !"".equals(vo.getTenderId())){
			tender = get(vo.getTenderId());
		}else{
			tender = new Tender();
			tender.setCreateDate(new Date());  
			tender.setTenderFileType(new Long(0));
			tender.setTenderType(vo.getTenderType());
			tender.setFlag("0");
		} 
		tender.setTenderDepartment(vo.getTenderDepartment());
		tender.setRemark(vo.getRemark());
		if(vo.getTenderCode()!=null && !vo.getTenderCode().equals(""))
			tender.setTenderCode(vo.getTenderCode());
		else
		{
			Calendar c = Calendar.getInstance();
			String code = "ZBGL"+c.get(Calendar.YEAR); 
			String sql = "select max(substr(t.tender_code,9)) from t_tender t ";
			String maxcode =  (String) this.createSqlQuery(sql).getSingleResult();
			if(maxcode==null)
				code+="0000001";
			else
			{
//				maxcode =new BigDecimal(maxcode).add(new BigDecimal("1")).toString();
				maxcode = String.valueOf((Long.parseLong(maxcode)+1));
				for (int i = 0; i < 7 - String.valueOf(new BigDecimal(maxcode)).length();i++){
					code+="0";
				}
				code+=maxcode;
			}
			tender.setTenderCode(code);
		}
		tender.setTenderName(vo.getTenderName()); 
		tender.setProcurementPlanDetilName(vo.getProcurementPlanDetilName());
		tender.setProcurementPlanDetilId(vo.getProcurementPlanDetilId());
		return tender;
	}

	public List<Tender> getTenderList(TenderVo vo) {
		String sql = getSql(vo) + " order by obj.createDate desc ";
		return find(sql, null, vo.getStart(), vo.getLimit());
	}
	private String getSql(TenderVo vo){
		StringBuilder sql = new StringBuilder("obj.tenderType ");
		if(vo.getTenderType()!=null && !"".equals(vo.getTenderType())){
			sql.append(" = '").append(vo.getTenderType()).append("'");
		}
		else if(vo.getPageType().equals("1"))
			sql.append("in ('1','2')");
		else
			sql.append("in ('3','4','5')");
		if(vo.getTenderCode()!=null && !"".equals(vo.getTenderCode())){
			sql.append(" and obj.tenderCode like '%").append(vo.getTenderCode()).append("%' ");
		}
		if(vo.getTenderName()!=null && !"".equals(vo.getTenderName())){
			sql.append(" and obj.tenderName like '%").append(vo.getTenderName()).append("%' ");
		}
		if(vo.getCreateDate()!=null && !"".equals(vo.getCreateDate())){
			sql.append(" and TO_CHAR(obj.createDate,'yyyy-mm-dd') = '").append(vo.getCreateDate()).append("' ");
		}
		if(vo.getTenderDepartment()!=null && !"".equals(vo.getTenderDepartment())){
			sql.append(" and obj.tenderDepartment like '%").append(vo.getTenderDepartment()).append("%' ");
		}
		return sql.toString();
	}
}
