package com.sysware.customize.hd.investment.equipreService.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAO;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.equipreService.dao.EquipServiceManageDao;
import com.sysware.customize.hd.investment.equipreService.entity.EquipServiceImplPlan;
import com.sysware.customize.hd.investment.equipreService.vo.EquipServiceManageVo;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("equipServiceManageDAOImp")
public class EquipServiceManageDaoImpl implements EquipServiceManageDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "untilsDAOImp")
	private UtilDAO utilDAO;

	@In(create = true)
	Identity identity;
	
	public List<EquipServiceImplPlan> getGridData(EquipServiceManageVo vo) {
		
		String hql = "select count(*) from EquipServiceImplPlan di where di.status not in ('1','2')";
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
		hql = "from EquipServiceImplPlan di where di.status not in ('1','2')";
		List<EquipServiceImplPlan> list = dao.getHibernateSession().createQuery(hql)
		                                    .setFirstResult(vo.getStart())
		                                    .setMaxResults(vo.getLimit()).list();
		return list;
	}

	public void updateApprovalState(String id, String flag) {
		try {
			EquipServiceImplPlan esip = (EquipServiceImplPlan)dao.getHibernateSession().get(EquipServiceImplPlan.class, id);
			esip.setStatus(flag);
			//审批时间
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Object[]> getProjectNums(UtilVo vo) {
		List<Object[]> list = new ArrayList<Object[]>();

		String count_sql = "select count(1) from TB_EQUIPREPAIR er,TB_EQUIPSERVICE_IMPLPLAN esip " +
				"where esip.EQUIPREPAIR_ID=er.id " +
				"and esip.status=5 ";
		String list_sql = "select er.id,er.PROJECTNUM,er.repairequipname " +
				"from TB_EQUIPREPAIR er,TB_EQUIPSERVICE_IMPLPLAN esip " +
				"where esip.EQUIPREPAIR_ID=er.id " +
				"and esip.status=5 ";
		

		BigDecimal count = (BigDecimal) dao.getHibernateSession().createSQLQuery(count_sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		if (count.intValue() != 0) {
			list = dao.getHibernateSession().createSQLQuery(list_sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		}
		return list;
	}
	
}
