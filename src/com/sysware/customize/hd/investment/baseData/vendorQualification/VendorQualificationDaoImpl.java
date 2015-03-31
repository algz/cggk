package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("vendorQualificationDaoImpl")
public class VendorQualificationDaoImpl extends
		GenericDAOImpl<VendorQualification> implements VendorQualificationDao {

	public List<VendorQualification> getVendorQualificationList(VendorQualificationVo vo) {
		Query query = createQuery(getSql(vo,"1"));
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList(); 
	}

	private String getSql(VendorQualificationVo vo,String type) {
		StringBuilder sql = new StringBuilder();
		if(type.equals("1"))
			sql.append(" select obj from  VendorQualification obj where 1=1 ");
		else
			sql.append(" select count(obj) from  VendorQualification obj  where 1=1 ");
		if(vo.getName()!=null && !vo.getName().equals("")){
			sql.append(" and obj.name like '%"+vo.getName()+"%'");
		}
		if(vo.getContent()!=null && !vo.getContent().equals("")){
			sql.append(" and obj.content like '%"+vo.getContent()+"%'");
		}
		if(vo.getDeadline()!=null && !vo.getDeadline().equals("")){
			sql.append(" and obj.deadline like '%"+vo.getDeadline()+"%'");
		}
		if(vo.getIssuingauthority()!=null && !vo.getIssuingauthority().equals("")){
			sql.append(" and obj.issuingauthority like '%"+vo.getIssuingauthority()+"%'");
		}
		if(vo.getVendorId()!=null && !vo.getVendorId().equals("")){
			sql.append(" and obj.vendorId like '%"+vo.getVendorId()+"%'");
		}
		if(vo.getLicense()!=null && !vo.getLicense().equals("")){
			sql.append(" and obj.license like '%"+vo.getLicense()+"%'");
		}
		if(vo.getEndDate()!=null&&!vo.getEndDate().equals("")){
			sql.append(" and obj.endDate>to_date('"+vo.getEndDate().substring(0,10)+"','yyyy-MM-dd') ");
		}
		return sql.toString();
	}

	public Long getCount(VendorQualificationVo vo) {
		return (Long) this.createQuery(getSql(vo,"2")).getSingleResult();
	}

	public List<VendorQualification> getDealVendor(String[] vendorIds,String ids) { 
		String id = "";
		if(ids!=null){
			id = ids;
		}else{
			for(String vendorId : vendorIds){
				if(id.length()>0)
					id+=",";
				id+="'"+vendorId+"'";
			}
		}
		String sql = "select obj from  VendorQualification obj where to_date(obj.endDate) < sysdate and obj.vendorId in ("+id+")";
		return createQuery(sql).getResultList();
	}
}
