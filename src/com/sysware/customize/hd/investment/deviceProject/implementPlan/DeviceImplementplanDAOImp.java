package com.sysware.customize.hd.investment.deviceProject.implementPlan;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import java.util.Date;
import java.util.List;
import org.jboss.seam.annotations.In;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAO;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.util.RoleEnum;


@Name("deviceImplementplanDAOImp")
public class DeviceImplementplanDAOImp implements DeviceImplementplanDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "untilsDAOImp")
	private UtilDAO utilDAO;
	
	@In(create = true)
	Identity identity;

	@SuppressWarnings("unchecked")
	public List<DeviceImplementplan> getGridData(DeviceImplementplanVo vo) {
		StringBuffer param=new StringBuffer();
		//按年份查询
		if(vo.getApprovaltime()!=null&&!vo.getApprovaltime().equals("")){
			if(vo.getApprovaltime().equals(MyTool.dateToStr(new Date(), "yyyy"))){
				//查询年份＝＝今年，即查询所有未下发的数据+今年的所有数据（已下发）
				param.append(" and (di.status in ('1','2') or EXTRACT(Year FROM di.implementplanApprovaltime)='"+vo.getApprovaltime()+"') ");
			}else{
				//查询以前年份的已下发数据
				param.append(" and di.status='3' and EXTRACT(Year FROM di.implementplanApprovaltime)='"+vo.getApprovaltime()+"' ");
			}
		}
		
		
		String hql = "select count(*) from DeviceImplementplan di where 1=1 "+param.toString();
		
		String papa = "";
		List<?> roles = utilDAO.getRolesByUser(new UtilVo());
		for(Object obj : roles){
			String s = obj.toString();
			if(s.equals(RoleEnum.DIRECTOR.getValue())){
				papa = " and di.headperson = '"+ identity.getLoginUser().getTruename().trim() +"'";
				break;
			}else if(s.equals(RoleEnum.HEADER.getValue())){
				papa = " and di.projectmanagername = '"+ identity.getLoginUser().getTruename() +"'";
				break;
			}
		}
		hql = hql + papa;
		Long count = (Long) dao.getHibernateSession().createQuery(hql+param.toString()+papa).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		hql = "from DeviceImplementplan di where 1=1 "+param.toString() + papa;
		List<DeviceImplementplan> list = dao.getHibernateSession().createQuery(hql)
		                                    .setFirstResult(vo.getStart())
		                                    .setMaxResults(vo.getLimit()).list();
		return list;
	}

	public List<DeviceImplementplan> getImplementPlanById(String id) {
		String hql = "from DeviceImplementplan di " +
				"where di.equipregistId.id = '"+id+"'";
		List<DeviceImplementplan> list = dao.getHibernateSession().createQuery(hql).list();
		return list;
	}

	@Transactional
	public String saveImplementPlan(DeviceImplementplanVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getImplementplanid());
		try {
			for (Object obj : ja) {
				JSONObject jo = JSONObject.fromObject(obj);
				DeviceImplementplan dip = (DeviceImplementplan) dao
						.getHibernateSession().get(DeviceImplementplan.class,jo.getString("implementplanid"));
				if (jo.getString("agreementSigningdate") != null&& jo.getString("agreementSigningdate").equals("")) {
					dip.setAgreementSigningdate(UtilDAOImp.strToDate(jo.getString("agreementSigningdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("categorys") != null&& !jo.getString("categorys").equals("")) {
					dip.setCategorys(jo.getString("categorys"));
				}
				if (jo.getString("projectmanagerid") != null&& !jo.getString("projectmanagerid").equals("")) {
					dip.setProjectmanagerid(jo.getString("projectmanagerid"));
				}
				if (jo.getString("projectmanagername") != null&& !jo.getString("projectmanagername").equals("")) {
					dip.setProjectmanagername(jo.getString("projectmanagername"));
				}
				if (jo.getString("submitdate") != null&& !jo.getString("submitdate").equals("")) {
					dip.setSubmitdate(UtilDAOImp.strToDate(jo.getString("submitdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("completiondate") != null&& !jo.getString("completiondate").equals("")) {
					dip.setCompletiondate(UtilDAOImp.strToDate(jo.getString("completiondate"), "yyyy-MM-dd"));
				}
				if (jo.getString("confirmdate") != null&& !jo.getString("confirmdate").equals("")) {
					dip.setConfirmdate(UtilDAOImp.strToDate(jo.getString("confirmdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("calibrationdate") != null&& !jo.getString("calibrationdate").equals("")) {
					dip.setCalibrationdate(UtilDAOImp.strToDate(jo.getString("calibrationdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("agreementSigningdate") != null&& !jo.getString("agreementSigningdate").equals("")) {
					dip.setAgreementSigningdate(UtilDAOImp.strToDate(jo.getString("agreementSigningdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("contractSigningdate") != null&& !jo.getString("contractSigningdate").equals("")) {
					dip.setContractSigningdate(UtilDAOImp.strToDate(jo.getString("contractSigningdate"), "yyyy-MM-dd"));
				}
				if (jo.getString("plansremarks") != null&& !jo.getString("plansremarks").equals("")) {
					dip.setPlansremarks(jo.getString("plansremarks"));
				}
				if (jo.getString("remark") != null&& !jo.getString("remark").equals("")) {
					dip.setRemark(jo.getString("remark"));
				}
				if(jo.getString("headperson") != null && !jo.getString("headperson").equals("")){
					dip.setHeadperson(jo.getString("headperson"));
				}
				dip.setPlanningdate(new Date());
				dao.getHibernateSession().update(dip);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return e.getLocalizedMessage();
		}
		return "";
	}

	@Transactional
	public String sendImplementPlan(DeviceImplementplanVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getImplementplanid());
		try {
			for (Object obj : ja) {
				DeviceImplementplan di = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class,obj.toString());
				di.setStatus("3");
				di.setImplementplanApprovaltime(new Date());
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

	/*
	 * private static final Logger log = LoggerFactory
	 * .getLogger(TbDeviceImplementplanDAOImp.class); (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #save(com.sysware.customize.hd.investment.deviceProject
	 * .implementPlan.TbDeviceImplementplan)
	 * 
	 * public void save(TbDeviceImplementplan transientInstance) {
	 * log.debug("saving TbDeviceImplementplan instance"); try {
	 * getSession().save(transientInstance); log.debug("save successful"); }
	 * catch (RuntimeException re) { log.error("save failed", re); throw re; } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #delete(com.sysware.customize.hd.investment.deviceProject
	 * .implementPlan.TbDeviceImplementplan)
	 * 
	 * public void delete(TbDeviceImplementplan persistentInstance) {
	 * log.debug("deleting TbDeviceImplementplan instance"); try {
	 * getSession().delete(persistentInstance); log.debug("delete successful");
	 * } catch (RuntimeException re) { log.error("delete failed", re); throw re;
	 * } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findById(java.lang.String)
	 * 
	 * public TbDeviceImplementplan findById(java.lang.String id) {
	 * log.debug("getting TbDeviceImplementplan instance with id: " + id); try {
	 * TbDeviceImplementplan instance = (TbDeviceImplementplan) getSession()
	 * .get("comm.dao2.TbDeviceImplementplan", id); return instance; } catch
	 * (RuntimeException re) { log.error("get failed", re); throw re; } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #findByExample(com.sysware.customize.hd.investment
	 * .deviceProject.implementPlan.TbDeviceImplementplan)
	 * 
	 * public List<TbDeviceImplementplan> findByExample( TbDeviceImplementplan
	 * instance) {
	 * log.debug("finding TbDeviceImplementplan instance by example"); try {
	 * List<TbDeviceImplementplan> results = (List<TbDeviceImplementplan>)
	 * getSession() .createCriteria("comm.dao2.TbDeviceImplementplan").add(
	 * create(instance)).list();
	 * log.debug("find by example successful, result size: " + results.size());
	 * return results; } catch (RuntimeException re) {
	 * log.error("find by example failed", re); throw re; } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByProperty(java.lang.String,
	 * java.lang.Object)
	 * 
	 * public List findByProperty(String propertyName, Object value) {
	 * log.debug("finding TbDeviceImplementplan instance with property: " +
	 * propertyName + ", value: " + value); try { String queryString =
	 * "from TbDeviceImplementplan as model where model." + propertyName +
	 * "= ?"; Query queryObject = getSession().createQuery(queryString);
	 * queryObject.setParameter(0, value); return queryObject.list(); } catch
	 * (RuntimeException re) { log.error("find by property name failed", re);
	 * throw re; } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByCategorys(java.lang.Object)
	 * 
	 * public List<TbDeviceImplementplan> findByCategorys(Object categorys) {
	 * return findByProperty(CATEGORYS, categorys); }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByPlansremarks(java.lang.Object)
	 * 
	 * public List<TbDeviceImplementplan> findByPlansremarks(Object
	 * plansremarks) { return findByProperty(PLANSREMARKS, plansremarks); }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByStatus(java.lang.Object)
	 * 
	 * public List<TbDeviceImplementplan> findByStatus(Object status) { return
	 * findByProperty(STATUS, status); }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByRemark(java.lang.Object)
	 * 
	 * public List<TbDeviceImplementplan> findByRemark(Object remark) { return
	 * findByProperty(REMARK, remark); }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findByEquipregistId(java.lang.Object)
	 * 
	 * public List<TbDeviceImplementplan> findByEquipregistId(Object
	 * equipregistId) { return findByProperty(EQUIPREGIST_ID, equipregistId); }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO#findAll()
	 * 
	 * public List findAll() {
	 * log.debug("finding all TbDeviceImplementplan instances"); try { String
	 * queryString = "from TbDeviceImplementplan"; Query queryObject =
	 * getSession().createQuery(queryString); return queryObject.list(); } catch
	 * (RuntimeException re) { log.error("find all failed", re); throw re; } }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #merge(com.sysware.customize.hd.investment.deviceProject
	 * .implementPlan.TbDeviceImplementplan)
	 * 
	 * public TbDeviceImplementplan merge(TbDeviceImplementplan
	 * detachedInstance) { log.debug("merging TbDeviceImplementplan instance");
	 * try { TbDeviceImplementplan result = (TbDeviceImplementplan) getSession()
	 * .merge(detachedInstance); log.debug("merge successful"); return result; }
	 * catch (RuntimeException re) { log.error("merge failed", re); throw re; }
	 * }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #attachDirty(com.sysware.customize.hd.investment.deviceProject
	 * .implementPlan.TbDeviceImplementplan)
	 * 
	 * public void attachDirty(TbDeviceImplementplan instance) {
	 * log.debug("attaching dirty TbDeviceImplementplan instance"); try {
	 * getSession().saveOrUpdate(instance); log.debug("attach successful"); }
	 * catch (RuntimeException re) { log.error("attach failed", re); throw re; }
	 * }
	 * 
	 * (non-Javadoc)
	 * 
	 * @seecom.sysware.customize.hd.investment.deviceProject.implementPlan.
	 * TbDeviceImplementplanDAO
	 * #attachClean(com.sysware.customize.hd.investment.deviceProject
	 * .implementPlan.TbDeviceImplementplan)
	 * 
	 * public void attachClean(TbDeviceImplementplan instance) {
	 * log.debug("attaching clean TbDeviceImplementplan instance"); try {
	 * getSession().lock(instance, LockMode.NONE);
	 * log.debug("attach successful"); } catch (RuntimeException re) {
	 * log.error("attach failed", re); throw re; } }
	 */
}