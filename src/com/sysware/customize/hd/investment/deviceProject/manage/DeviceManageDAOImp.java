package com.sysware.customize.hd.investment.deviceProject.manage;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;
import org.jboss.seam.annotations.In;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.deviceProject.implementPlan.DeviceImplementplan;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;

@Name("deviceManageDAOImp")
public class DeviceManageDAOImp implements DeviceManageDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	@SuppressWarnings("unchecked")
	public List<DeviceImplementplan> getGridData(DeviceManageVo vo) {
		StringBuffer param = new StringBuffer();
		// 按年份查询
		if (vo.getApprovaltime() != null && !vo.getApprovaltime().equals("")) {
			if (vo.getApprovaltime().equals(MyTool.dateToStr(new Date(), "yyyy"))) {
				// 查询年份＝＝今年，即查询所有未下发的数据+今年的所有数据（已下发）
				param.append(" and (di.status in ('3','4','5','6','7') or EXTRACT(Year FROM di.manageApprovaltime)='" + vo.getApprovaltime() + "') ");
			} else {
				// 查询以前年份的已下发数据
				param.append(" and di.status ='8' and EXTRACT(Year FROM di.manageApprovaltime)='" + vo.getApprovaltime() + "' ");
			}
		}
		// 权限控制,即指定的项目管理员查看自已的项目
		Identity identity = (Identity) Component.getInstance("org.jboss.seam.security.identity");
		Long userid = identity.getLoginUser().getUserid();
		
		// if (userid != null) {
		// param.append(" and di.projectmanagerid='" + userid + "' ");
		// }
		dao.getHibernateSession().enableFilter("UserPrivileges").setParameter("userid", userid.toString());

		// 获取当前登录用户信息
		String hql = "select count(*) from DeviceImplementplan di where  di.status not in ('1','2') " + param;
		Long count = (Long) dao.getHibernateSession().createQuery(hql).uniqueResult();
		vo.setCount(count.intValue());

		hql = "from DeviceImplementplan di where di.status not in ('1','2') " + param;
		List<DeviceImplementplan> list = dao.getHibernateSession().createQuery(hql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		return list;
	}

	public List<DeviceImplementplan> getDeviceManageById(String id) {
		String hql = "from DeviceImplementplan di " +
				"where di.status not in('1','2') " +
				"and di.equipregistId.id = '"+id+"'";
		return dao.getHibernateSession().createQuery(hql).list();
	}

	@Transactional
	public String saveManage(DeviceManageVo vo) {
		JSONObject jo = JSONObject.fromObject(vo.getImplementplanid());
		try {
			if (vo.getStatus().equals("4")) {
				// 定向采购
				this.saveManageDirpurchase(jo);
			} else if (vo.getStatus().equals("5")) {
				// 自行招标
				this.saveManageSelftender(jo);
			} else if (vo.getStatus().equals("6")) {
				// 委托招标
				this.saveManageEntrusttender(jo);
			} else {
				throw (new Exception("执行管理数据状态不正确!"));
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

	private String saveManageSelftender(JSONObject jo) {
		DeviceManageSelftender dms = new DeviceManageSelftender();
		try {
			if (jo.getString("implementplanid") != null && !jo.getString("implementplanid").equals("")) {
				DeviceImplementplan dip = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class, jo.getString("implementplanid"));
				if (dip == null) {
					throw (new Exception("实施计划数据没取到!"));
				}
				if(jo.getString("contractsigningdepartment") != null && !jo.getString("contractsigningdepartment").equals("")){
					Department d=(Department)dao.getHibernateSession().get(Department.class, jo.getString("contractsigningdepartment"));
					dip.setContractsigningdepartment(d);
				}
				if (dip.getSelftenderId() != null && !dip.getSelftenderId().equals("")) {
					dms = dip.getSelftenderId();
				} else {
					dip.setSelftenderId(dms);
				}
				if (jo.getString("certificates") != null && !jo.getString("certificates").equals("")) {
					dms.setCertificates(UtilDAOImp.strToDate(jo.getString("certificates"), "yyyy-MM-dd"));
				}
				if (jo.getString("measurescard") != null && !jo.getString("measurescard").equals("")) {
					dms.setMeasurescard(UtilDAOImp.strToDate(jo.getString("measurescard"), "yyyy-MM-dd"));
				}
				if (jo.getString("technicalindicators") != null && !jo.getString("technicalindicators").equals("")) {
					dms.setTechnicalindicators(UtilDAOImp.strToDate(jo.getString("technicalindicators"), "yyyy-MM-dd"));
				}
				if (jo.getString("auditingregistration") != null && !jo.getString("auditingregistration").equals("")) {
					dms.setAuditingregistration(UtilDAOImp.strToDate(jo.getString("auditingregistration"), "yyyy-MM-dd"));
				}
				if (jo.getString("entrustmentagreement") != null && !jo.getString("entrustmentagreement").equals("")) {
					dms.setEntrustmentagreement(UtilDAOImp.strToDate(jo.getString("entrustmentagreement"), "yyyy-MM-dd"));
				}
				if (jo.getString("submittechnicalindicators") != null && !jo.getString("submittechnicalindicators").equals("")) {
					dms.setSubmittechnicalindicators(UtilDAOImp.strToDate(jo.getString("submittechnicalindicators"), "yyyy-MM-dd"));
				}
				if (jo.getString("linkednetwork") != null && !jo.getString("linkednetwork").equals("")) {
					dms.setLinkednetwork(UtilDAOImp.strToDate(jo.getString("linkednetwork"), "yyyy-MM-dd"));
				}
				if (jo.getString("tenderassessment") != null && !jo.getString("tenderassessment").equals("")) {
					dms.setTenderassessment(UtilDAOImp.strToDate(jo.getString("tenderassessment"), "yyyy-MM-dd"));
				}
				if (jo.getString("directedtender") != null && !jo.getString("directedtender").equals("")) {
					dms.setDirectedtender(UtilDAOImp.strToDate(jo.getString("directedtender"), "yyyy-MM-dd"));
				}
				if (jo.getString("informationdissemination") != null && !jo.getString("informationdissemination").equals("")) {
					dms.setInformationdissemination(UtilDAOImp.strToDate(jo.getString("informationdissemination"), "yyyy-MM-dd"));
				}
				if (jo.getString("tenderregistration") != null && !jo.getString("tenderregistration").equals("")) {
					dms.setTenderregistration(UtilDAOImp.strToDate(jo.getString("tenderregistration"), "yyyy-MM-dd"));
				}
				if (jo.getString("issuedtenders") != null && !jo.getString("issuedtenders").equals("")) {
					dms.setIssuedtenders(UtilDAOImp.strToDate(jo.getString("issuedtenders"), "yyyy-MM-dd"));
				}
				if (jo.getString("bidevaluation") != null && !jo.getString("bidevaluation").equals("")) {
					dms.setBidevaluation(UtilDAOImp.strToDate(jo.getString("bidevaluation"), "yyyy-MM-dd"));
				}
				if (jo.getString("calibration") != null && !jo.getString("calibration").equals("")) {
					dms.setCalibration(UtilDAOImp.strToDate(jo.getString("calibration"), "yyyy-MM-dd"));
				}
				if (jo.getString("signedagreement") != null && !jo.getString("signedagreement").equals("")) {
					dms.setSignedagreement(UtilDAOImp.strToDate(jo.getString("signedagreement"), "yyyy-MM-dd"));
				}
				if (jo.getString("contractsigning") != null && !jo.getString("contractsigning").equals("")) {
					dms.setContractsigning(UtilDAOImp.strToDate(jo.getString("contractsigning"), "yyyy-MM-dd"));
				}
				dao.getHibernateSession().saveOrUpdate(dms);
				dip.setStatus("5");
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

	private String saveManageEntrusttender(JSONObject jo) {
		DeviceManageEntrusttender dme = new DeviceManageEntrusttender();
		try {
			if (jo.getString("implementplanid") != null && !jo.getString("implementplanid").equals("")) {
				DeviceImplementplan dip = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class, jo.getString("implementplanid"));
				if (dip == null) {
					throw (new Exception("实施计划数据没取到!"));
				}
				if(jo.getString("contractsigningdepartment") != null && !jo.getString("contractsigningdepartment").equals("")){
					Department d=(Department)dao.getHibernateSession().get(Department.class, jo.getString("contractsigningdepartment"));
					dip.setContractsigningdepartment(d);
				}
				if (dip.getSelftenderId() != null && !dip.getSelftenderId().equals("")) {
					dme = dip.getEntrusttenderId();
				} else {
					dip.setEntrusttenderId(dme);
				}
				if (jo.getString("certificates") != null && !jo.getString("certificates").equals("")) {
					dme.setCertificates(UtilDAOImp.strToDate(jo.getString("certificates"), "yyyy-MM-dd"));
				}
				if (jo.getString("measurescard") != null && !jo.getString("measurescard").equals("")) {
					dme.setMeasurescard(UtilDAOImp.strToDate(jo.getString("measurescard"), "yyyy-MM-dd"));
				}
				if (jo.getString("technicalindicators") != null && !jo.getString("technicalindicators").equals("")) {
					dme.setTechnicalindicators(UtilDAOImp.strToDate(jo.getString("technicalindicators"), "yyyy-MM-dd"));
				}
				if (jo.getString("informationdissemination") != null && !jo.getString("informationdissemination").equals("")) {
					dme.setInformationdissemination(UtilDAOImp.strToDate(jo.getString("informationdissemination"), "yyyy-MM-dd"));
				}
				if (jo.getString("tenderregistration") != null && !jo.getString("tenderregistration").equals("")) {
					dme.setTenderregistration(UtilDAOImp.strToDate(jo.getString("tenderregistration"), "yyyy-MM-dd"));
				}
				if (jo.getString("issuedtenders") != null && !jo.getString("issuedtenders").equals("")) {
					dme.setIssuedtenders(UtilDAOImp.strToDate(jo.getString("issuedtenders"), "yyyy-MM-dd"));
				}
				if (jo.getString("bidevaluation") != null && !jo.getString("bidevaluation").equals("")) {
					dme.setBidevaluation(UtilDAOImp.strToDate(jo.getString("bidevaluation"), "yyyy-MM-dd"));
				}
				if (jo.getString("calibration") != null && !jo.getString("calibration").equals("")) {
					dme.setCalibration(UtilDAOImp.strToDate(jo.getString("calibration"), "yyyy-MM-dd"));
				}
				if (jo.getString("signedagreement") != null && !jo.getString("signedagreement").equals("")) {
					dme.setSignedagreement(UtilDAOImp.strToDate(jo.getString("signedagreement"), "yyyy-MM-dd"));
				}
				if (jo.getString("contractsigning") != null && !jo.getString("contractsigning").equals("")) {
					dme.setContractsigning(UtilDAOImp.strToDate(jo.getString("contractsigning"), "yyyy-MM-dd"));
				}
				dao.getHibernateSession().saveOrUpdate(dme);
				dip.setStatus("6");
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

	private String saveManageDirpurchase(JSONObject jo) {
		DeviceManageDirpurchase dmd = new DeviceManageDirpurchase();
		try {
			if (jo.getString("implementplanid") != null && !jo.getString("implementplanid").equals("")) {
				DeviceImplementplan dip = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class, jo.getString("implementplanid"));
				if (dip == null) {
					throw (new Exception("实施计划数据没取到!"));
				}
				if(jo.getString("contractsigningdepartment") != null && !jo.getString("contractsigningdepartment").equals("")){
					Department d=(Department)dao.getHibernateSession().get(Department.class, jo.getString("contractsigningdepartment"));
					dip.setContractsigningdepartment(d);
				}
				if (dip.getDirpurchaseId() != null && !dip.getDirpurchaseId().equals("")) {
					dmd = dip.getDirpurchaseId();
				}
				if (jo.getString("certificates") != null && !jo.getString("certificates").equals("")) {
					dmd.setCertificates(UtilDAOImp.strToDate(jo.getString("certificates"), "yyyy-MM-dd"));
				}
				if (jo.getString("contractsigning") != null && !jo.getString("contractsigning").equals("")) {
					dmd.setContractsigning(UtilDAOImp.strToDate(jo.getString("contractsigning"), "yyyy-MM-dd"));
				}
				if (jo.getString("measurescard") != null && !jo.getString("measurescard").equals("")) {
					dmd.setMeasurescard(UtilDAOImp.strToDate(jo.getString("measurescard"), "yyyy-MM-dd"));
				}
				if (jo.getString("organizationnegotiations") != null && !jo.getString("organizationnegotiations").equals("")) {
					dmd.setOrganizationnegotiations(UtilDAOImp.strToDate(jo.getString("organizationnegotiations"), "yyyy-MM-dd"));
				}
				if (jo.getString("quote") != null && !jo.getString("quote").equals("")) {
					dmd.setQuote(UtilDAOImp.strToDate(jo.getString("quote"), "yyyy-MM-dd"));
				}
				if (jo.getString("report") != null && !jo.getString("report").equals("")) {
					dmd.setReport(UtilDAOImp.strToDate(jo.getString("report"), "yyyy-MM-dd"));
				}
				if (jo.getString("initiallingagreement") != null && !jo.getString("initiallingagreement").equals("")) {
					dmd.setInitiallingagreement(UtilDAOImp.strToDate(jo.getString("initiallingagreement"), "yyyy-MM-dd"));
				}
				dao.getHibernateSession().saveOrUpdate(dmd);
				dip.setDirpurchaseId(dmd);
				dip.setStatus("4");
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}

	@Transactional
	public String sendManage(DeviceManageVo vo) throws Exception {
		// TODO Auto-generated method stub
		JSONArray ja = JSONArray.fromObject(vo.getImplementplanid());
		for (Object obj : ja) {
			String id = (String) obj;
			DeviceImplementplan dip = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class, id);
			dip.setManageApprovaltime(new Date());// 执行管理下发时间
			Object object;
			if (dip.getStatus().equals("4")) {
				object=dip.getDirpurchaseId();
			} else if (dip.getStatus().equals("5")) {
				object=dip.getSelftenderId();
			} else if (dip.getStatus().equals("6")) {
				object=dip.getEntrusttenderId();
			} else {
				return "下发状态不正确!";
			}
			Class<?> clazz = object.getClass();
			dip.setStatus("8");
			Field[] fs = clazz.getDeclaredFields();
			for (Field f : fs) {
				Object o = null;
				try {
					String s = f.getName();
					Method m = clazz.getMethod("get" + s.substring(0, 1).toUpperCase() + s.substring(1), null);
					o = m.invoke(object, null);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (o == null) {
					throw new Exception("执行管理数据不全!");
				}
			}
		}
		return "";
	}

	public String getManage(DeviceManageVo vo) {
		JSONObject jo = new JSONObject();
		if (vo.getImplementplanid() == null || vo.getImplementplanid().equals("")) {
			return "";
		}
		DeviceImplementplan di = (DeviceImplementplan) dao.getHibernateSession().get(DeviceImplementplan.class, vo.getImplementplanid());
		jo.put("implementplanid", vo.getImplementplanid());
		if(di.getProjectcategorys().equals("1")){

			jo.put("projectname", di.getEquipregistId().getProjectname());
			jo.put("projectnum", di.getEquipregistId().getProjectnum());
		}else if(di.getProjectcategorys().equals("2")){
			jo.put("projectname", di.getEquiprepairId().getRepairequipname());
			jo.put("projectnum", di.getEquiprepairId().getProjectnum());
		}
		if(di.getContractsigningdepartment()!=null){
			jo.put("contractsigningdepartment", di.getContractsigningdepartment().getDepartmetname());
			jo.put("contractsigningdepartmentid", di.getContractsigningdepartment().getDepcode());
		}
		if (di.getStatus().equals("4")) {
			// 定向招标
			DeviceManageDirpurchase dp = di.getDirpurchaseId();
			jo.put("implementplanid", vo.getImplementplanid());
			jo.put("certificates", UtilDAOImp.dateToStr(dp.getCertificates(), "yyyy-MM-dd"));
			jo.put("contractsigning", UtilDAOImp.dateToStr(dp.getContractsigning(), "yyyy-MM-dd"));
			jo.put("dirpurchaseid", dp.getDirpurchaseid());
			jo.put("initiallingagreement", UtilDAOImp.dateToStr(dp.getInitiallingagreement(), "yyyy-MM-dd"));
			jo.put("measurescard", UtilDAOImp.dateToStr(dp.getMeasurescard(), "yyyy-MM-dd"));
			jo.put("organizationnegotiations", UtilDAOImp.dateToStr(dp.getOrganizationnegotiations(), "yyyy-MM-dd"));
			jo.put("quote", UtilDAOImp.dateToStr(dp.getQuote(), "yyyy-MM-dd"));
			jo.put("report", UtilDAOImp.dateToStr(dp.getReport(), "yyyy-MM-dd"));
		} else if (di.getStatus().equals("5")) {
			// 自行招标
			DeviceManageSelftender dms = di.getSelftenderId();
			jo.put("measurescard", UtilDAOImp.dateToStr(dms.getMeasurescard(), "yyyy-MM-dd"));
			jo.put("certificates", UtilDAOImp.dateToStr(dms.getCertificates(), "yyyy-MM-dd"));
			jo.put("technicalindicators", UtilDAOImp.dateToStr(dms.getTechnicalindicators(), "yyyy-MM-dd"));
			jo.put("auditingregistration", UtilDAOImp.dateToStr(dms.getAuditingregistration(), "yyyy-MM-dd"));
			jo.put("entrustmentagreement", UtilDAOImp.dateToStr(dms.getEntrustmentagreement(), "yyyy-MM-dd"));
			jo.put("submittechnicalindicators", UtilDAOImp.dateToStr(dms.getSubmittechnicalindicators(), "yyyy-MM-dd"));
			jo.put("linkednetwork", UtilDAOImp.dateToStr(dms.getLinkednetwork(), "yyyy-MM-dd"));
			jo.put("tenderassessment", UtilDAOImp.dateToStr(dms.getTenderassessment(), "yyyy-MM-dd"));
			jo.put("directedtender", UtilDAOImp.dateToStr(dms.getDirectedtender(), "yyyy-MM-dd"));
			jo.put("informationdissemination", UtilDAOImp.dateToStr(dms.getInformationdissemination(), "yyyy-MM-dd"));
			jo.put("tenderregistration", UtilDAOImp.dateToStr(dms.getTenderregistration(), "yyyy-MM-dd"));
			jo.put("issuedtenders", UtilDAOImp.dateToStr(dms.getIssuedtenders(), "yyyy-MM-dd"));
			jo.put("bidevaluation", UtilDAOImp.dateToStr(dms.getBidevaluation(), "yyyy-MM-dd"));
			jo.put("calibration", UtilDAOImp.dateToStr(dms.getCalibration(), "yyyy-MM-dd"));
			jo.put("signedagreement", UtilDAOImp.dateToStr(dms.getSignedagreement(), "yyyy-MM-dd"));
			jo.put("contractsigning", UtilDAOImp.dateToStr(dms.getContractsigning(), "yyyy-MM-dd"));
		} else if (di.getStatus().equals("6")) {
			// 委托招标
			DeviceManageEntrusttender dme = di.getEntrusttenderId();
			jo.put("measurescard", UtilDAOImp.dateToStr(dme.getMeasurescard(), "yyyy-MM-dd"));
			jo.put("certificates", UtilDAOImp.dateToStr(dme.getCertificates(), "yyyy-MM-dd"));
			jo.put("technicalindicators", UtilDAOImp.dateToStr(dme.getTechnicalindicators(), "yyyy-MM-dd"));
			jo.put("informationdissemination", UtilDAOImp.dateToStr(dme.getInformationdissemination(), "yyyy-MM-dd"));
			jo.put("tenderregistration", UtilDAOImp.dateToStr(dme.getTenderregistration(), "yyyy-MM-dd"));
			jo.put("issuedtenders", UtilDAOImp.dateToStr(dme.getIssuedtenders(), "yyyy-MM-dd"));
			jo.put("bidevaluation", UtilDAOImp.dateToStr(dme.getBidevaluation(), "yyyy-MM-dd"));
			jo.put("calibration", UtilDAOImp.dateToStr(dme.getCalibration(), "yyyy-MM-dd"));
			jo.put("signedagreement", UtilDAOImp.dateToStr(dme.getSignedagreement(), "yyyy-MM-dd"));
			jo.put("contractsigning", UtilDAOImp.dateToStr(dme.getContractsigning(), "yyyy-MM-dd"));
		}
		return "{success:true,data: " + jo.toString() + "}";
	}

}