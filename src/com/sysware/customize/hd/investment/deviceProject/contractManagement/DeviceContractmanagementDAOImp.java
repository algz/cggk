package com.sysware.customize.hd.investment.deviceProject.contractManagement;

import net.sf.json.JSONArray;

import org.hibernate.Session;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.jboss.seam.annotations.In;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

@Name("deviceContractmanagementDAOImp")
public class DeviceContractmanagementDAOImp implements DeviceContractmanagementDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	public Session getHibernateSession() {
		return dao.getHibernateSession();
	}

	@SuppressWarnings("unchecked")
	public List<DeviceContractmanagement> getGridData(DeviceContractmanagementVo vo) {
		StringBuffer param = new StringBuffer();
		
		//合同类型:1或空设备类型;2工程类型;3设备大修4土建大修
		if(vo.getContracttype()!=null&&!vo.getContracttype().equals("")){
			param.append(" and dc.contracttype='"+vo.getContracttype()+"'");
		}
		
		// 按合同ID查询
		if (vo.getContractid() != null && !vo.getContractid().equals("")) {
			param.append(" and dc.contractid='" + vo.getContractid() + "' ");
		}
		// 按年份查询
		if (vo.getApprovaltime() != null && !vo.getApprovaltime().equals("")) {
			if (vo.getApprovaltime().equals(MyTool.dateToStr(new Date(), "yyyy"))) {
				// 查询年份＝＝今年，即查询所有未下发的数据+今年的所有数据（已下发）
				param.append(" and (dc.status in ('1','2') or EXTRACT(Year FROM dc.approvaltime)='" + vo.getApprovaltime() + "') ");
			} else {
				// 查询以前年份的已下发数据
				param.append(" and dc.status not in ('1','2') and EXTRACT(Year FROM dc.approvaltime)='" + vo.getApprovaltime() + "' ");
			}
		}

		String hql = "select count(*) from DeviceContractmanagement dc where 1=1 " + param;
		Long count = (Long) dao.getHibernateSession().createQuery(hql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());

		hql = "from DeviceContractmanagement dc where 1=1 " + param;
		List<DeviceContractmanagement> list = dao.getHibernateSession().createQuery(hql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		return list;
	}

	@Transactional
	public String saveDeviceContractmanagement(DeviceContractmanagementVo vo) {
		DeviceContractmanagement dc;
		if (vo.getContractid() == null || vo.getContractid().equals("")) {
			dc = new DeviceContractmanagement();
		} else {
			dc = (DeviceContractmanagement) dao.getHibernateSession().get(DeviceContractmanagement.class, vo.getContractid());
		}
		if (vo.getoperatorid() != null && !vo.getoperatorid().equals("")) {
			dc.setOperatorid(vo.getoperatorid());
		}
		if (vo.getPartya() != null && !vo.getPartya().equals("")) {
			dc.setPartya(vo.getPartya());
		}
		if (vo.getPartyb() != null && !vo.getPartyb().equals("")) {
			dc.setPartyb((Vendor) dao.getHibernateSession().get(Vendor.class, vo.getPartyb()));
		}
		if (vo.getSecrecy() != null && !vo.getSecrecy().equals("")) {
			dc.setSecrecy(vo.getSecrecy());
		}
		if (vo.getAmount() != null && !vo.getAmount().equals("")) {
			dc.setAmount(new BigDecimal(vo.getAmount()));
		}
		if (vo.getAmountUnit() != null && !vo.getAmountUnit().equals("")) {
			dc.setAmountUnit(vo.getAmountUnit());
		}
		if(vo.getProjectcategorys() != null && !vo.getProjectcategorys().equals("")){
			dc.setProjectcategorys(vo.getProjectcategorys());
		}
		if (vo.getEquipregistId() != null && !vo.getEquipregistId().equals("")) {
			//EquipRegist er = (EquipRegist) dao.getHibernateSession().get(EquipRegist.class, vo.getEquipregistId());
			dc.setEquipregistId(vo.getEquipregistId());
		}
		if (vo.getLeader() != null && !vo.getLeader().equals("")) {
			dc.setLeader(vo.getLeader());
		}
		if (vo.getContractcode() != null && !vo.getContractcode().equals("")) {
			dc.setContractcode(vo.getContractcode());
		}
		if (vo.getContractname() != null && !vo.getContractname().equals("")) {
			dc.setContractname(vo.getContractname());
		}
		if (vo.getContractmanager() != null && !vo.getContractmanager().equals("")) {
			dc.setContractmanager(vo.getContractmanager());
		}
		if (vo.getFileid() != null && !vo.getFileid().equals("")) {
			dc.setFileid(vo.getFileid());
		}
		if (vo.getFilename() != null && !vo.getFilename().equals("")) {
			dc.setFilename(vo.getFilename());
		}
		if (vo.getStatus() != null && !vo.getStatus().equals("")) {
			dc.setStatus(vo.getStatus());
		}
		if(vo.getContracttype()!=null&&!vo.getContracttype().equals("")){
			dc.setContracttype(vo.getContracttype());
		}
		if(vo.getContractlevel()!=null&&!vo.getContractlevel().equals("")){
			dc.setContractlevel(vo.getContractlevel());
		}
		dao.getHibernateSession().saveOrUpdate(dc);
		return "";
	}

	@Transactional
	public String deleteDeviceContractmanagement(DeviceContractmanagementVo vo) {
		JSONArray ja = JSONArray.fromObject(vo.getContractid());
		try {
			for (Object obj : ja) {
				String id = (String) obj;
				DeviceContractmanagement dc = (DeviceContractmanagement) dao.getHibernateSession().get(DeviceContractmanagement.class, id);
				dao.getHibernateSession().delete(dc);
			}
		} catch (Exception e) {
			return e.getLocalizedMessage();
		}
		return "";
	}
}