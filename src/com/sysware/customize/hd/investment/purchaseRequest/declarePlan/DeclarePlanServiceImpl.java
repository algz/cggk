package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;

/**
 * 申报计划 service实现
 * @author lh
 *
 */
@Name("declarePlan_DeclarePlanServiceImpl")
public class DeclarePlanServiceImpl implements DeclarePlanService {

	@In(create = true, value = "declarePlan_DeclarePlanDaoImpl")
	private DeclarePlanDao declarePlanDao;
	
	public List<DeclarePlan> findDeclarePlanByCondition(DeclarePlanCondition condition) {
		return declarePlanDao.findByCondition(condition);
	}

	public long countDeclarePlansByCondition(DeclarePlanCondition condition) {
		return declarePlanDao.countByCondition(condition);
	}

	public List<DeclarePlanVo> getDeclareDepartment(DeclarePlanCondition condition) {
		return declarePlanDao.getDeclareDepartment(condition);
	}

	public long countDeclareDepartment(DeclarePlanCondition condition) {
		return declarePlanDao.countDeclareDepartment(condition);
	}

	public List<DeclarePlanVo> getDeclareUse(DeclarePlanCondition condition) {
		return declarePlanDao.getDeclareUse(condition);
	}

	public long countDeclareUse(DeclarePlanCondition condition) {
		return declarePlanDao.countDeclareUse(condition);
	}

	public String getPlan_Code() {
		return declarePlanDao.getPlan_Code();
	}

	public void saveDeclarePlan(String declareplanName, String declareplanCode, String userId,
			String declareId,String declareplanType,String propertyType) {
		declarePlanDao.saveDeclarePlan(declareplanName, declareplanCode, userId, declareId,declareplanType,propertyType);
	}
	@Transactional
	public void updateDeclarePlan(DeclarePlan declarePlan) {
		declarePlanDao.update(declarePlan);
	}

	public DeclarePlan getDeclarePlan(String declarePlanID) {
		return declarePlanDao.get(declarePlanID);
	}

	public void callBack(String declareDetilIds[]) {
		for(String declareDetilId : declareDetilIds)
			declarePlanDao.callBack(declareDetilId);
	} 
	public void deleteDeclarePlan(String[] declarePlanIds) {
		List declarePlanDetilList = null;
		String declareDetilId = null;
		for(String declarePlanId : declarePlanIds)
		{
			declarePlanDetilList = declarePlanDao.getdeclarePlanDetilListByDeclarePlanId(declarePlanId);
			for(int i=0;i<declarePlanDetilList.size();i++){
				declareDetilId = declarePlanDetilList.get(i).toString();
				declarePlanDao.callBack(declareDetilId);
			}
		} 
	}
	@Transactional
	public void updateProperties(String[] declarePlanDetilIds,String status) {
		declarePlanDao.updateProperties(declarePlanDetilIds, status);
	}

	public String getDeclareDetilName(String declarePlanDetilId) {
		return declarePlanDao.getDeclareDetilName(declarePlanDetilId);
	}

	public List<Object[]> getDeclarePlanByCondition(DeclarePlanVo declarePlanvo) {
		return declarePlanDao.getDeclarePlanByCondition(declarePlanvo);
	}

	public BigDecimal getDeclarePlanByConditionCount(DeclarePlanVo declarePlanvo) {
		return declarePlanDao.getDeclarePlanByConditionCount(declarePlanvo);
	}

	@Transactional
	public void createDeclarePlan(DeclarePlanVo vo) {
		DeclarePlan dp = new DeclarePlan();
		dp.setAmount(BigDecimal.ZERO);
		dp.setDeclareplanCode(vo.getDeclareplanCode());
		dp.setDeclareplanName(vo.getDeclareplanName());
		dp.setStatus("1");
		dp.setEditer(vo.getEditer());
		dp.setDeclareplanType(vo.getDeclareplanType());
		dp.setPropertyType(vo.getPropertyType());
		dp.setQuantity(BigDecimal.ZERO);
		dp.setEditDate(new Date());
		dp.setGenerator("1");//表示是添加的补充计划
//		1.添加申报计划表
		declarePlanDao.createDeclarePlan(dp);
	}

	@Transactional
	public void delMaterial(String[] ids,String idd,String[] amounts,String declareplanId) throws Exception{
		BigDecimal amount = BigDecimal.ZERO;
		for(int i = 0; i < amounts.length; i++){
			amount = amount.add(new BigDecimal(amounts[i]));
		}
//		1.删除ids的申报记录明细和ids关联的申报计划明细
		declarePlanDao.delDeclareDetail(ids);
		declarePlanDao.delDeclarePlanDetail(ids);
//		2.判断idd相关联的申报记录明细是否存在记录
		Long count = declarePlanDao.getCountByDeclareId(idd);
		if(count==0){//关联的数据全部清空了,清除申报记录表
			Declare d = (Declare)declarePlanDao.getHibernateSession().get(Declare.class, idd);
			declarePlanDao.getHibernateSession().delete(d);
		}else{//关联的数据未全部清空，更新申报记录表
			Declare d = (Declare)declarePlanDao.getHibernateSession().get(Declare.class, idd);
			d.setQuantity((d.getQuantity()==null?BigDecimal.ZERO:d.getQuantity()).subtract(new BigDecimal(ids.length)));
			d.setAmount(d.getAmount().subtract(amount));
			declarePlanDao.getHibernateSession().update(d);
		}
		DeclarePlan dp = (DeclarePlan)declarePlanDao.getHibernateSession().get(DeclarePlan.class, declareplanId);
		dp.setAmount(dp.getAmount().subtract(amount));
		dp.setQuantity(dp.getQuantity().subtract(BigDecimal.valueOf(ids.length)));
		dp.setStatus("1");
		declarePlanDao.getHibernateSession().update(dp);
	}

	@Transactional
	public void submitDeclarePlan(String[] ids) throws Exception{
		declarePlanDao.submitDeclarePlan(ids);
	}
	
	@Transactional
	public void deleteDeclarePlan2(String[] ids) throws Exception {
		for(int i = 0; i < ids.length; i++){
//			1.删除申报计划表和申报计划明细表
			String declareId = declarePlanDao.getDeclareIdByPlanId(ids[i]);
			declarePlanDao.delDeclarePlanDetail(ids[i]);
			declarePlanDao.delDeclarePlan(ids[i]);
//			2.删除申报记录表和申报记录明细表
			declarePlanDao.delDeclareDetail(declareId);
			declarePlanDao.delDeclare(declareId);
		}
		
	} 
	
}
