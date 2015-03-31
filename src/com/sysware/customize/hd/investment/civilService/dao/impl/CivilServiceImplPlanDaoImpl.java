package com.sysware.customize.hd.investment.civilService.dao.impl;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.civilService.dao.CivilServiceImplPlanDao;
import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAO;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("civilServiceImplPlanDaoImp")
public class CivilServiceImplPlanDaoImpl implements CivilServiceImplPlanDao {

	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "untilsDAOImp")
	private UtilDAO utilDAO;
	
	@In(create = true)
	Identity identity;
	
	public List<CivilServiceImplPlan> getGridData(CivilServiceImplPlanVo vo) {
		String hql = "select count(*) from CivilServiceImplPlan di where 1=1";
		String papa = "";
		List<?> roles = utilDAO.getRolesByUser(new UtilVo());
		for(Object obj : roles){
			String s = obj.toString();
			if(s.equals(RoleEnum.DIRECTOR.getValue())){
				papa = " and di.headPersonId = '"+ identity.getLoginUser().getUserid() +"'";
				break;
			}else if(s.equals(RoleEnum.HEADER.getValue())){
				papa = " and di.projectManagerId = '"+ identity.getLoginUser().getUserid() +"'";
				break;
			}
		}
		hql = hql + papa;
		Long count = (Long) dao.getHibernateSession().createQuery(hql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		hql = "from CivilServiceImplPlan ";
		List<CivilServiceImplPlan> list = dao.getHibernateSession().createQuery(hql)
		                                    .setFirstResult(vo.getStart())
		                                    .setMaxResults(vo.getLimit()).list();
		return list;
	}

	public String editCivilServiceImplPlan(CivilServiceImplPlanVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getImplementplanid());
		try {
			for (Object obj : ja) {
				JSONObject jo = JSONObject.fromObject(obj);
				CivilServiceImplPlan esi = (CivilServiceImplPlan) dao
						.getHibernateSession().get(CivilServiceImplPlan.class,jo.getString("id"));
				
				if (jo.getString("projectManagerId") != null&& !jo.getString("projectManagerId").equals("")) {
					esi.setProjectManagerId(jo.getString("projectManagerId"));
				}
				if (jo.getString("projectManager") != null&& !jo.getString("projectManagerId").equals("")) {
					esi.setProjectManager(jo.getString("projectManager"));
				}
				if(jo.getString("headPerson") != null && !jo.getString("headPerson").equals("")){
					esi.setHeadPerson(jo.getString("headPerson"));
				}
				if(jo.getString("headPersonId") != null && !jo.getString("headPersonId").equals("")){
					esi.setHeadPersonId(jo.getString("headPersonId"));
				}
				if(jo.getString("thinRequireTime") != null && !jo.getString("thinRequireTime").equals("")){
					esi.setThinRequireTime(UtilDAOImp.strToDate(jo.getString("thinRequireTime"), "yyyy-MM-dd"));
				}
				if(jo.getString("completeBidsTime") != null && !jo.getString("completeBidsTime").equals("")){
					esi.setCompleteBidsTime(UtilDAOImp.strToDate(jo.getString("completeBidsTime"), "yyyy-MM-dd"));
				}
				if(jo.getString("beginCardTime") != null && !jo.getString("beginCardTime").equals("")){
					esi.setBeginCardTime(UtilDAOImp.strToDate(jo.getString("beginCardTime"), "yyyy-MM-dd"));
				}
				if(jo.getString("formalBeginTime") != null && !jo.getString("formalBeginTime").equals("")){
					esi.setFormalBeginTime(UtilDAOImp.strToDate(jo.getString("formalBeginTime"), "yyyy-MM-dd"));
				}
				if(jo.getString("subApprovalTime") != null && !jo.getString("subApprovalTime").equals("")){
					esi.setSubApprovalTime(UtilDAOImp.strToDate(jo.getString("subApprovalTime"), "yyyy-MM-dd"));
				}
				
				if(jo.getString("thinRequireTimeExecute") != null && !jo.getString("thinRequireTimeExecute").equals("")){
					esi.setThinRequireTimeExecute(UtilDAOImp.strToDate(jo.getString("thinRequireTimeExecute"), "yyyy-MM-dd"));
				}
				if(jo.getString("completeBidsTimeExecute") != null && !jo.getString("completeBidsTimeExecute").equals("")){
					esi.setCompleteBidsTimeExecute(UtilDAOImp.strToDate(jo.getString("completeBidsTimeExecute"), "yyyy-MM-dd"));
				}
				if(jo.getString("beginCardTimeExecute") != null && !jo.getString("beginCardTimeExecute").equals("")){
					esi.setBeginCardTimeExecute(UtilDAOImp.strToDate(jo.getString("beginCardTimeExecute"), "yyyy-MM-dd"));
				}
				if(jo.getString("formalBeginTimeExecute") != null && !jo.getString("formalBeginTimeExecute").equals("")){
					esi.setFormalBeginTimeExecute(UtilDAOImp.strToDate(jo.getString("formalBeginTimeExecute"), "yyyy-MM-dd"));
				}
				if(jo.getString("subApprovalTimeExecute") != null && !jo.getString("subApprovalTimeExecute").equals("")){
					esi.setSubApprovalTimeExecute(UtilDAOImp.strToDate(jo.getString("subApprovalTimeExecute"), "yyyy-MM-dd"));
				}
				if(jo.getString("remark") != null && !jo.getString("remark").equals("")){
					esi.setRemark(jo.getString("remark"));
				}
				esi.setCreateTime(new Date());
				dao.getHibernateSession().update(esi);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return e.getLocalizedMessage();
		}
		return "";
	}

	public String sendImplementPlan(CivilServiceImplPlanVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getImplementplanid());
		try {
			for (Object obj : ja) {
				CivilServiceImplPlan di = (CivilServiceImplPlan) dao.getHibernateSession().get(CivilServiceImplPlan.class,obj.toString());
				di.setStatus("3");
				di.setCreateTime(new Date());
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

}
