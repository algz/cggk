package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;

import net.sf.json.JSONArray;

import org.hibernate.Session;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.jboss.seam.annotations.In;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;

@Name("engineeringInspectionApplicationDAOImp")
public class InspectionApplicationDAOImp implements InspectionApplicationDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	public Session getHibernateSession() {
		return dao.getHibernateSession();
	}

	@SuppressWarnings("unchecked")
	public List<InspectionApplicationVo> getGridData(InspectionApplicationVo vo) {
		StringBuilder param = new StringBuilder();
		List<InspectionApplicationVo> voList=new ArrayList<InspectionApplicationVo>();

		if(vo.getInspectioapplicatioid()!=null&&!vo.getInspectioapplicatioid().equals("")){
			param.append(" and ia.inspectioapplicatioid='"+vo.getInspectioapplicatioid()+"'");
		}
		
		
		String hql = "from InspectionApplication ia where 1=1 " + param;
		Long count = (Long) dao.getHibernateSession().createQuery("select count(*) "+hql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		List<InspectionApplication> list = dao.getHibernateSession().createQuery(hql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		try {
			for(InspectionApplication ia:list){
				InspectionApplicationVo iavo=new InspectionApplicationVo();
//				BeanUtils.copyProperties(iavo, ia);
				iavo.setInspectioapplicatioid(ia.getInspectioapplicatioid());
				iavo.setCivilregistid(ia.getCivilregist().getId());
				iavo.setApplicationtime(UtilDAOImp.dateToStr(ia.getApplicationtime(), "yyyy-MM-dd"));
				iavo.setStatus(ia.getStatus());
				iavo.setAdministrativeunit(ia.getAdministrativeunit());
				iavo.setProjectdirectortel(ia.getProjectdirectortel());
				iavo.setSupplierscontact(ia.getSupplierscontact());
				iavo.setSupplierstel(ia.getSupplierstel());
				iavo.setOpinion(ia.getOpinion());
				iavo.setUseunit(ia.getCivilregist().getUseunit());//使用单位
				iavo.setProjectdirector(ia.getCivilregist().getHeadperson());//项目主管
				iavo.setProjectname(ia.getCivilregist().getProjectname());//项目名称
				iavo.setSuppliersid(ia.getSuppliers().getVendorID());//供应商ID
				iavo.setSuppliersname(ia.getSuppliers().getVendorName());//供应商名称
				voList.add(iavo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return voList;
	}

	@Transactional
	public String saveInspectionApplication(InspectionApplicationVo vo) {
		InspectionApplication ia;
		if (vo.getInspectioapplicatioid() == null || vo.getInspectioapplicatioid().equals("")) {
			ia = new InspectionApplication();
			
		} else {
			ia = (InspectionApplication) dao.getHibernateSession().get(InspectionApplication.class, vo.getInspectioapplicatioid());
		}
		ia.setStatus("1");
		ia.setApplicationtime(new Date());
		if (vo.getCivilregistid() != null && !vo.getCivilregistid().equals("")) {
			CivilRegist cr = (CivilRegist) dao.getHibernateSession().get(CivilRegist.class, vo.getCivilregistid());
			ia.setCivilregist(cr);
		}
		if (vo.getSuppliersid()!= null && !vo.getSuppliersid().equals("")) {
			Vendor vendor = (Vendor) dao.getHibernateSession().get(Vendor.class, vo.getSuppliersid());
			ia.setSuppliers(vendor);
		}
		if (vo.getSupplierscontact()!= null && !vo.getSupplierscontact().equals("")) {
		    ia.setSupplierscontact(vo.getSupplierscontact());
		}
		if (vo.getSupplierstel() != null && !vo.getSupplierstel().equals("")) {
			ia.setSupplierstel(vo.getSupplierstel());
		}
		if (vo.getProjectdirector() != null && !vo.getProjectdirector().equals("")) {
			ia.setProjectdirectortel(vo.getProjectdirector());
		}
		if (vo.getProjectdirectortel() != null && !vo.getProjectdirectortel().equals("")) {
			ia.setProjectdirectortel(vo.getProjectdirectortel());
		}
		if(vo.getAdministrativeunit()!=null&&!vo.getAdministrativeunit().equals("")){
			ia.setAdministrativeunit(vo.getAdministrativeunit());
		}
		dao.getHibernateSession().saveOrUpdate(ia);
		return "";
	}

	@Transactional
	public String deleteInspectionApplication(InspectionApplicationVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getInspectioapplicatioid());
		try {
			for (Object obj : ja) {
				String id = (String) obj;
				InspectionApplication dc = (InspectionApplication) dao.getHibernateSession().get(InspectionApplication.class, id);
				dao.getHibernateSession().delete(dc);
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}
}