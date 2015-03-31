package com.sysware.customize.hd.investment.investmentTopMonitor.flow;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Query;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

@Name("flow_FlowDao")
public class FlowDaoImpl extends GenericDAOImpl<FlowVo> implements FlowDao,Serializable {

	private static final long serialVersionUID = -2797442028609319592L;

	@SuppressWarnings("unchecked")
	public List<FlowVo> getMaterialInfo(String id, int start, int limit) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}
		List<FlowVo> tmp = new ArrayList<FlowVo>();
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct"
				+ " pro.procurementCode as procurementCode,"
				+ " material.materialitemname as materialitemname,"
				+ " user4.truename as submituser,"
				+ " flow.starttime as submittime,"
				+ " user1.truename as examiner1,"
				+ " com1.approvalstatus as status1,"
				+ " act1.endtime as endtime1,"
				+ " user2.truename as examiner2,"
				+ " com2.approvalstatus as status2,"
				+ " act2.endtime as endtime2,"
				+ " user3.truename as examiner3,"
				+ " com3.approvalstatus as status3,"
				+ " act3.endtime as endtime3, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition, "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ " left join t_flows flow on flow.id = obj.flowinstanceid"
				+ " left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167452'"
				+ " left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ " left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167453'"
				+ " left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ " left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14167454'"
				+ " left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid"
				+ " left join t_procurementdetail procurementdetail on procurementdetail.purchaseid =  obj.objectid"
				+ " left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ " left join t_material material on material.materialid = procurementdetail.materialid"
				+ " left join t_user user1 on user1.userid = com1.examiner"
				+ " left join t_user user2 on user2.userid = com2.examiner"
				+ " left join t_user user3 on user3.userid = com3.examiner"
				+ " left join t_user user4 on user4.userid = flow.starterid"
				+ " where obj.objecttype = 'ProductionProcess' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ " select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ " start with tm.materialcatalogid "
				+ id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) order by procurementCode ");

		Query query = this.createSqlQuery(sb.toString());
		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		List<Object[]> list = query.getResultList();
		for (Object[] o : list) {
			if (o != null) {
				FlowVo vo = new FlowVo();
				vo.setId(System.currentTimeMillis()
						+ UUID.randomUUID().toString());
				vo.setMaterialCode(o[0] == null ? "" : o[0].toString());
				vo.setMaterialName(o[1] == null ? "" : o[1].toString());
				vo.setAuthorName(o[2] == null ? "" : o[2].toString());
				vo.setAuthorDate(o[3] == null ? "" : o[3].toString());
				vo.setPurcherLeaderName(o[4] == null ? "" : o[4].toString());
				vo.setPurcherLeaderState(o[5] == null ? "" : o[5].toString());
				vo.setPurcherLeaderDate(o[6] == null ? "" : o[6].toString());
				vo.setPurcherDirectorName(o[7] == null ? "" : o[7].toString());
				vo.setPurcherDirectorState(o[8] == null ? "" : o[8].toString());
				vo.setPurcherDirectorDate(o[9] == null ? "" : o[9].toString());
				vo.setPurcherMinisterName(o[10] == null ? "" : o[10].toString());
				vo.setPurcherMinisterState(o[11] == null ? "" : o[11]
						.toString());
				vo.setPurcherMinisterDate(o[12] == null ? "" : o[12].toString());
				vo.setDesingnation(o[13] == null ? "" : o[13].toString());
				vo.setMaterialStandard(o[14] == null ? "" : o[14].toString());
				vo.setTechnicCondition(o[15] == null ? "" : o[15].toString());
				tmp.add(vo);
			}
		}

		return tmp;
	}

	@SuppressWarnings("unchecked")
	public List<FlowVo> getMaterialRadioInfo(String id, int start, int limit) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}
		List<FlowVo> tmp = new ArrayList<FlowVo>();
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct"
				+ " pro.procurementCode as procurementCode,"
				+ " material.materialitemname as materialitemname,"
				+ " user5.truename as submituser,"
				+ " flow.starttime as submittime,"
				+ " user1.truename as examiner1,"
				+ " com1.approvalstatus as status1,"
				+ " act1.endtime as endtime1,"
				+ " user2.truename as examiner2,"
				+ " com2.approvalstatus as status2,"
				+ " act2.endtime as endtime2,"
				+ " user3.truename as examiner3,"
				+ " com3.approvalstatus as status3,"
				+ " act3.endtime as endtime3,"
				+ " user4.truename as examiner4,"
				+ " com4.approvalstatus as status4,"
				+ " act4.endtime as endtime4, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition , "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ " left join t_flows flow on flow.id = obj.flowinstanceid"
				+ " left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167473'"
				+ " left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ " left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167474'"
				+ " left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ " left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14167475'"
				+ " left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid  and com3.approvalstatus < 2 "
				+ " left join t_flow_activity act4 on act4.flowid = obj.flowinstanceid and act4.templateid = '14167488'"
				+ " left join t_approval_comment com4 on com4.activityinstanceid = act4.activityid"
				+ " left join t_parity parity on parity.PARITYID =  obj.objectid"
				+ " left join t_procurementdetail procurementdetail on procurementdetail.purchaseid =  parity.PURCHASEID"
				+ " left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ " left join t_material material on material.materialid = procurementdetail.materialid"
				+ " left join t_user user1 on user1.userid = com1.examiner"
				+ " left join t_user user2 on user2.userid = com2.examiner"
				+ " left join t_user user3 on user3.userid = com3.examiner"
				+ " left join t_user user4 on user4.userid = com4.examiner"
				+ " left join t_user user5 on user5.userid = flow.starterid"
				+ " where obj.objecttype = 'ParityAudit' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ " select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ " start with tm.materialcatalogid "
				+ id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) order by procurementCode");
		// 14167488 采购部部长 14167474 金属处处长 14167475 比价审理小组 14167473 金属处组长
		Query query = this.createSqlQuery(sb.toString());
		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		List<Object[]> list = query.getResultList();
		for (Object[] o : list) {
			if (o != null) {
				FlowVo vo = new FlowVo();
				vo.setId(System.currentTimeMillis()
						+ UUID.randomUUID().toString());
				vo.setMaterialCode(o[0] == null ? "" : o[0].toString());
				vo.setMaterialName(o[1] == null ? "" : o[1].toString());
				vo.setAuthorName(o[2] == null ? "" : o[2].toString());
				vo.setAuthorDate(o[3] == null ? "" : o[3].toString());
				vo.setPurcherLeaderName(o[4] == null ? "" : o[4].toString());
				vo.setPurcherLeaderState(o[5] == null ? "" : o[5].toString());
				vo.setPurcherLeaderDate(o[6] == null ? "" : o[6].toString());
				vo.setPurcherDirectorName(o[7] == null ? "" : o[7].toString());
				vo.setPurcherDirectorState(o[8] == null ? "" : o[8].toString());
				vo.setPurcherDirectorDate(o[9] == null ? "" : o[9].toString());
				vo.setParityName(o[10] == null ? "" : o[10].toString());
				vo.setParityState(o[11] == null ? "" : o[11].toString());
				vo.setParityDate(o[12] == null ? "" : o[12].toString());
				vo.setPurcherMinisterName(o[13] == null ? "" : o[13].toString());
				vo.setPurcherMinisterState(o[14] == null ? "" : o[14]
						.toString());
				vo.setPurcherMinisterDate(o[15] == null ? "" : o[15].toString());
				vo.setDesingnation(o[16] == null ? "" : o[16].toString());
				vo.setMaterialStandard(o[17] == null ? "" : o[17].toString());
				vo.setTechnicCondition(o[18] == null ? "" : o[18].toString());
				tmp.add(vo);
			}
		}
		return tmp;
	}

	@SuppressWarnings("unchecked")
	public List<FlowVo> getMaterialContractInfo(String id, int start, int limit) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}
		List<FlowVo> tmp = new ArrayList<FlowVo>();
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct"
				+ "         pro.procurementCode as procurementCode,"
				+ "         material.materialitemname as materialitemname,"
				+ "         userx.truename as submituser,"
				+ "         flow.starttime as submittime,"
				+ "         user1.truename as examiner1,"
				+ "         com1.approvalstatus as status1,"
				+ "         act1.endtime as endtime1,"
				+ "         user2.truename as examiner2,"
				+ "         com2.approvalstatus as status2,"
				+ "         act2.endtime as endtime2,"
				+ "         user3.truename as examiner3,"
				+ "         com3.approvalstatus as status3,"
				+ "         act3.endtime as endtime3,"
				+ "         user4.truename as examiner4,"
				+ "         com4.approvalstatus as status4,"
				+ "         act4.endtime as endtime4,"
				+ "         user5.truename as examiner5,"
				+ "         com5.approvalstatus as status5,"
				+ "         act5.endtime as endtime5,"
				+ "         user6.truename as examiner6,"
				+ "         com6.approvalstatus as status6,"
				+ "         act6.endtime as endtime6, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition, "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ "         left join t_flows flow on flow.id = obj.flowinstanceid"
				+ "         left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167499'"
				+ "         left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ "         left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167650'"
				+ "         left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ "         left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14168163'"
				+ "         left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid"
				+ "         left join t_flow_activity act4 on act4.flowid = obj.flowinstanceid and act4.templateid = '14168162'"
				+ "         left join t_approval_comment com4 on com4.activityinstanceid = act4.activityid"
				+ "         left join t_flow_activity act5 on act5.flowid = obj.flowinstanceid and act5.templateid = '14167498'"
				+ "         left join t_approval_comment com5 on com5.activityinstanceid = act5.activityid"
				+ "         left join t_flow_activity act6 on act6.flowid = obj.flowinstanceid and act6.templateid = '14168161'"
				+ "         left join t_approval_comment com6 on com6.activityinstanceid = act6.activityid"
				+ "         left join t_procurementcontract procurementcontract on procurementcontract.PROCUREMENTCONTRACTID =  obj.objectid"
				+ "         left join t_procurementcontract_purchase procurementcontract_purchase on procurementcontract_purchase.PROCUREMENTCONTRACTID =  procurementcontract.PROCUREMENTCONTRACTID"
				+ "         left join t_procurementdetail procurementdetail on procurementdetail.purchaseid = procurementcontract_purchase.purchaseid and procurementdetail.materialid = procurementcontract_purchase.materialid"
				+ "         left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ "         left join t_material material on material.materialid = procurementcontract_purchase.materialid"
				+ "         left join t_user user1 on user1.userid = com1.examiner"
				+ "         left join t_user user2 on user2.userid = com2.examiner"
				+ "         left join t_user user3 on user3.userid = com3.examiner"
				+ "         left join t_user user4 on user4.userid = com4.examiner"
				+ "         left join t_user user5 on user5.userid = com5.examiner"
				+ "         left join t_user user6 on user6.userid = com6.examiner"
				+ "         left join t_user userx on userx.userid = flow.starterid"
				+ "        where obj.objecttype = 'Contract' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ "		 select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ "        start with tm.materialcatalogid "
				+ id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) order by procurementCode");

		// 14167499 副总经理 14167650 总经理 14168163 金属部长 14168162 金属处长 14167498 总法律顾问
		// 14168161 金属组长
		Query query = this.createSqlQuery(sb.toString());
		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		List<Object[]> list = query.getResultList();
		for (Object[] o : list) {
			if (o != null) {
				FlowVo vo = new FlowVo();
				vo.setId(System.currentTimeMillis()
						+ UUID.randomUUID().toString());
				vo.setMaterialCode(o[0] == null ? "" : o[0].toString());
				vo.setMaterialName(o[1] == null ? "" : o[1].toString());
				vo.setAuthorName(o[2] == null ? "" : o[2].toString());
				vo.setAuthorDate(o[3] == null ? "" : o[3].toString());
				vo.setVicePresidentName(o[4] == null ? "" : o[4].toString());
				vo.setVicePresidentState(o[5] == null ? "" : o[5].toString());
				vo.setVicePresidentDate(o[6] == null ? "" : o[6].toString());
				vo.setGeneralManagerName(o[7] == null ? "" : o[7].toString());
				vo.setGeneralManagerState(o[8] == null ? "" : o[8].toString());
				vo.setGeneralManagerDate(o[9] == null ? "" : o[9].toString());
				vo.setMetalMinisterName(o[10] == null ? "" : o[10].toString());
				vo.setMetalMinisterState(o[11] == null ? "" : o[11].toString());
				vo.setMetalMinisterDate(o[12] == null ? "" : o[12].toString());
				vo.setMetalDirectorName(o[13] == null ? "" : o[13].toString());
				vo.setMetalDirectorState(o[14] == null ? "" : o[14].toString());
				vo.setMetalDirectorDate(o[15] == null ? "" : o[15].toString());
				vo.setGeneralCounselName(o[16] == null ? "" : o[16].toString());
				vo.setGeneralCounselState(o[17] == null ? "" : o[17].toString());
				vo.setGeneralCounselDate(o[18] == null ? "" : o[18].toString());
				vo.setMetalLeaderName(o[19] == null ? "" : o[19].toString());
				vo.setMetalLeaderState(o[20] == null ? "" : o[20].toString());
				vo.setMetalLeaderDate(o[21] == null ? "" : o[21].toString());
				vo.setDesingnation(o[22] == null ? "" : o[22].toString());
				vo.setMaterialStandard(o[23] == null ? "" : o[23].toString());
				vo.setTechnicCondition(o[24] == null ? "" : o[24].toString());
				tmp.add(vo);
			}
		}

		return tmp;
	}

	public long countMaterialInfo(String id) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}
		StringBuffer sb = new StringBuffer();
		sb.append("select count(*) from (");
		sb.append("select distinct"
				+ " pro.procurementCode as procurementCode,"
				+ " material.materialitemname as materialitemname,"
				+ " user4.truename as submituser,"
				+ " flow.starttime as submittime,"
				+ " user1.truename as examiner1,"
				+ " com1.approvalstatus as status1,"
				+ " act1.endtime as endtime1,"
				+ " user2.truename as examiner2,"
				+ " com2.approvalstatus as status2,"
				+ " act2.endtime as endtime2,"
				+ " user3.truename as examiner3,"
				+ " com3.approvalstatus as status3,"
				+ " act3.endtime as endtime3, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition, "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ " left join t_flows flow on flow.id = obj.flowinstanceid"
				+ " left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167452'"
				+ " left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ " left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167453'"
				+ " left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ " left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14167454'"
				+ " left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid"
				+ " left join t_procurementdetail procurementdetail on procurementdetail.purchaseid =  obj.objectid"
				+ " left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ " left join t_material material on material.materialid = procurementdetail.materialid"
				+ " left join t_user user1 on user1.userid = com1.examiner"
				+ " left join t_user user2 on user2.userid = com2.examiner"
				+ " left join t_user user3 on user3.userid = com3.examiner"
				+ " left join t_user user4 on user4.userid = flow.starterid"
				+ " where obj.objecttype = 'ProductionProcess' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ " select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ " start with tm.materialcatalogid " + id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) ");
		sb.append(")");
		return ((BigDecimal) this.createSqlQuery(sb.toString())
				.getSingleResult()).longValue();
	}

	public long countMaterialRadioInfo(String id) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}

		StringBuffer sb = new StringBuffer();
		sb.append("select count(*) from (");
		sb.append("select distinct"
				+ " pro.procurementCode as procurementCode,"
				+ " material.materialitemname as materialitemname,"
				+ " user5.truename as submituser,"
				+ " flow.starttime as submittime,"
				+ " user1.truename as examiner1,"
				+ " com1.approvalstatus as status1,"
				+ " act1.endtime as endtime1,"
				+ " user2.truename as examiner2,"
				+ " com2.approvalstatus as status2,"
				+ " act2.endtime as endtime2,"
				+ " user3.truename as examiner3,"
				+ " com3.approvalstatus as status3,"
				+ " act3.endtime as endtime3,"
				+ " user4.truename as examiner4,"
				+ " com4.approvalstatus as status4,"
				+ " act4.endtime as endtime4, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition, "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ " left join t_flows flow on flow.id = obj.flowinstanceid"
				+ " left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167473'"
				+ " left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ " left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167474'"
				+ " left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ " left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14167475'"
				+ " left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid and com3.approvalstatus < 2 "
				+ " left join t_flow_activity act4 on act4.flowid = obj.flowinstanceid and act4.templateid = '14167488'"
				+ " left join t_approval_comment com4 on com4.activityinstanceid = act4.activityid"
				+ " left join t_parity parity on parity.PARITYID =  obj.objectid"
				+ " left join t_procurementdetail procurementdetail on procurementdetail.purchaseid =  parity.PURCHASEID"
				+ " left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ " left join t_material material on material.materialid = procurementdetail.materialid"
				+ " left join t_user user1 on user1.userid = com1.examiner"
				+ " left join t_user user2 on user2.userid = com2.examiner"
				+ " left join t_user user3 on user3.userid = com3.examiner"
				+ " left join t_user user4 on user4.userid = com4.examiner"
				+ " left join t_user user5 on user5.userid = flow.starterid"
				+ " where obj.objecttype = 'ParityAudit' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ " select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ " start with tm.materialcatalogid " + id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) ");
		sb.append(")");
		// 14167488 采购部部长 14167474 金属处处长 14167475 比价审理小组 14167473 金属处组长
		return ((BigDecimal) this.createSqlQuery(sb.toString())
				.getSingleResult()).longValue();
	}

	public long countMaterialContractInfo(String id) {
		if (id == null) {
			id = "is not null";
		} else {
			id = "='" + id + "'";
		}

		StringBuffer sb = new StringBuffer();
		sb.append("select count(*) from (");
		sb.append("select distinct"
				+ "         pro.procurementCode as procurementCode,"
				+ "         material.materialitemname as materialitemname,"
				+ "         userx.truename as submituser,"
				+ "         flow.starttime as submittime,"
				+ "         user1.truename as examiner1,"
				+ "         com1.approvalstatus as status1,"
				+ "         act1.endtime as endtime1,"
				+ "         user2.truename as examiner2,"
				+ "         com2.approvalstatus as status2,"
				+ "         act2.endtime as endtime2,"
				+ "         user3.truename as examiner3,"
				+ "         com3.approvalstatus as status3,"
				+ "         act3.endtime as endtime3,"
				+ "         user4.truename as examiner4,"
				+ "         com4.approvalstatus as status4,"
				+ "         act4.endtime as endtime4,"
				+ "         user5.truename as examiner5,"
				+ "         com5.approvalstatus as status5,"
				+ "         act5.endtime as endtime5,"
				+ "         user6.truename as examiner6,"
				+ "         com6.approvalstatus as status6,"
				+ "         act6.endtime as endtime6, "
				+ " material.desingnation as desingnation, "
				+ " material.materialStandard as materialStandard, "
				+ " material.technicCondition as technicCondition, "
				+ " procurementdetail.procurementdetailid as procurementdetailid ");

		sb.append(" from t_approval_object obj"
				+ "         left join t_flows flow on flow.id = obj.flowinstanceid"
				+ "         left join t_flow_activity act1 on act1.flowid = obj.flowinstanceid and act1.templateid = '14167499'"
				+ "         left join t_approval_comment com1 on com1.activityinstanceid = act1.activityid"
				+ "         left join t_flow_activity act2 on act2.flowid = obj.flowinstanceid and act2.templateid = '14167650'"
				+ "         left join t_approval_comment com2 on com2.activityinstanceid = act2.activityid"
				+ "         left join t_flow_activity act3 on act3.flowid = obj.flowinstanceid and act3.templateid = '14168163'"
				+ "         left join t_approval_comment com3 on com3.activityinstanceid = act3.activityid"
				+ "         left join t_flow_activity act4 on act4.flowid = obj.flowinstanceid and act4.templateid = '14168162'"
				+ "         left join t_approval_comment com4 on com4.activityinstanceid = act4.activityid"
				+ "         left join t_flow_activity act5 on act5.flowid = obj.flowinstanceid and act5.templateid = '14167498'"
				+ "         left join t_approval_comment com5 on com5.activityinstanceid = act5.activityid"
				+ "         left join t_flow_activity act6 on act6.flowid = obj.flowinstanceid and act6.templateid = '14168161'"
				+ "         left join t_approval_comment com6 on com6.activityinstanceid = act6.activityid"
				+ "         left join t_procurementcontract procurementcontract on procurementcontract.PROCUREMENTCONTRACTID =  obj.objectid"
				+ "         left join t_procurementcontract_purchase procurementcontract_purchase on procurementcontract_purchase.PROCUREMENTCONTRACTID =  procurementcontract.PROCUREMENTCONTRACTID"
				+ "         left join t_procurementdetail procurementdetail on procurementdetail.purchaseid = procurementcontract_purchase.purchaseid and procurementdetail.materialid = procurementcontract_purchase.materialid"
				+ "         left join t_procurement pro on pro.PROCUREMENTID = procurementdetail.procurementid"
				+ "         left join t_material material on material.materialid = procurementcontract_purchase.materialid"
				+ "         left join t_user user1 on user1.userid = com1.examiner"
				+ "         left join t_user user2 on user2.userid = com2.examiner"
				+ "         left join t_user user3 on user3.userid = com3.examiner"
				+ "         left join t_user user4 on user4.userid = com4.examiner"
				+ "         left join t_user user5 on user5.userid = com5.examiner"
				+ "         left join t_user user6 on user6.userid = com6.examiner"
				+ "         left join t_user userx on userx.userid = flow.starterid"
				+ "        where obj.objecttype = 'Contract' and pro.procurementCode is not null and procurementdetail.materialid In ( "
				+ "		 select t.materialid from t_material t where t.parentid In (select tm.materialcatalogid from t_materialcatalog tm "
				+ "        start with tm.materialcatalogid " + id
				+ " connect by prior tm.materialcatalogid = tm.parentid)) ");
		sb.append(")");
		// 14167499 副总经理 14167650 总经理 14168163 金属部长 14168162 金属处长 14167498 总法律顾问
		// 14168161 金属组长
		return ((BigDecimal) this.createSqlQuery(sb.toString())
				.getSingleResult()).longValue();
	}

}
