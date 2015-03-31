package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.entity.AnalysisDetail;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.entity.EfficiencyAnalysis;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.AnalysisDetailVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.EfficiencyAnalysisVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ExpertVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ProjectExpertRelationVo;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("SelectGradePersonnelDaoImpl")
public class SelectGradePersonnelDaoImpl implements SelectGradePersonnelDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<EfficiencyAnalysis> eaDao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<AnalysisDetail> adDao;
	
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;
	
	/**
	 * 查询项目方向
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ProjectExpertRelationVo> GetProject(){
		String sqlNum = "select t.project_code from t_project_expert_relation t group by t.project_code";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sqlNum);
		List<String> listObj = query.list();
		List<ProjectExpertRelationVo> list = new ArrayList<ProjectExpertRelationVo>();
		//判断是否有值
		if(listObj.size()>0){
			SQLQuery queryName = null;
			String sqlName = null;
			Object obj = null;
			ProjectExpertRelationVo expertRelationVo;
			for (String str : listObj) {
				sqlName = "select t.project_name from t_project_expert_relation t"
						+" where t.project_code=?"
						+" group by t.project_name";
				queryName = dao.getHibernateSession().createSQLQuery(sqlName);
				queryName.setParameter(0, str);
				obj = queryName.uniqueResult();
				expertRelationVo = new ProjectExpertRelationVo();
				expertRelationVo.setProject_name(obj.toString());
				expertRelationVo.setProject_code(str);
				list.add(expertRelationVo);
			}
		}
		return list;
	}
	
	/**
	 * 查询某个方向的专家
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ExpertVo> GetExpert(ProjectExpertRelationVo vo){
		String sql = "select e.*,p.project_code,p.project_name from t_expert e"
					+" left join t_project_expert_relation p"
					+" on p.expert_id=e.id"
					+" where e.id in(select t.expert_id from t_project_expert_relation t"
					+" where t.project_code=?)";
		sql="select e.*,p.project_code,p.project_name from t_expert e left join t_project_expert_relation p on p.expert_id=e.id  where e.EXPERTISE='"+vo.getNode()+"'";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		SetExpert(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(ExpertVo.class));
//		query.setParameter(0, vo.getProject_code());
		return query.list();
	}
	
	private void SetExpert(SQLQuery query){
		query = query.addScalar("id", Hibernate.STRING);
		query = query.addScalar("expert_code", Hibernate.STRING);
		query = query.addScalar("expert_name", Hibernate.STRING);
		query = query.addScalar("expert_sex", Hibernate.STRING);
		query = query.addScalar("expert_age", Hibernate.STRING);
		query = query.addScalar("expert_post", Hibernate.STRING);
		query = query.addScalar("expert_title", Hibernate.STRING);
		query = query.addScalar("expertise", Hibernate.STRING);
		query = query.addScalar("project_code", Hibernate.STRING);
		query = query.addScalar("project_name", Hibernate.STRING);
	}
	
	/**
	 * 获得某个合同的评分参与人
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EfficiencyAnalysisVo> GetGradeParticipant(EfficiencyAnalysisVo vo){
		String sql ="select t.*,e.expert_code,e.expert_name,e.id as expertId" 
				+" from t_efficiency_analysis t,"
				+"  t_analysis_detail d,t_expert e"
				+" where d.efficiency_analysis_id=t.id"
				+" and e.id=d.scorer"
				+" and t.contract_id=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		SetGradeParticipant(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(EfficiencyAnalysisVo.class));
		query.setParameter(0,vo.getContract_id());
		return query.list();
	}
	
	private void SetGradeParticipant(SQLQuery query){
		query = query.addScalar("id", Hibernate.STRING);
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("creater", Hibernate.STRING);
		query = query.addScalar("create_date", Hibernate.STRING);
		query = query.addScalar("score", Hibernate.STRING);
		query = query.addScalar("expert_code", Hibernate.STRING);
		query = query.addScalar("expert_name", Hibernate.STRING);
		query = query.addScalar("expertId", Hibernate.STRING);
	}
	
	/**
	 * 添加合同评分参与人员
	 * @param vo
	 * @return
	 */
	public int insertContractGradeParticipant(EfficiencyAnalysisVo vo){
		int result = 0;
		String eaId = "";
		String extpertCodes[] = vo.getExpertCodeForContract().split(",");
		//判断在效能评分表中是否存在评分记录
		String sql = "select count(1) from T_EFFICIENCY_ANALYSIS t where t.CONTRACT_ID=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getContract_id());
//		query.setParameter(1, vo.getCreater());
		//以当前登录人作为创建人
//		query.setParameter(1, String.valueOf(identity.getLoginUser().getUserid()));
		Object obj = query.uniqueResult();
		//判断是否存在当前合同的效能评分的信息（加入每个创建人条件）
		if(Long.parseLong(obj.toString())<=0){
			String insertEA = "insert into t_efficiency_analysis (id,contract_id,creater,create_date,score)" 
				+" values(?,?,?,to_date(?,'YYYY:MM:DD:HH24:MI:SS '),0)";
			SQLQuery insertEAQuery = eaDao.getHibernateSession().createSQLQuery(insertEA);
			eaId = UtilForHD.GetNowTimeForId();
			insertEAQuery.setParameter(0, eaId);
			insertEAQuery.setParameter(1, vo.getContract_id());
//			insertEAQuery.setParameter(2, vo.getCreater());
			//以当前登录人作为创建人
			insertEAQuery.setParameter(2, String.valueOf(identity.getLoginUser().getUserid()));
			insertEAQuery.setParameter(3, UtilForHD.GetNowTime());
			int flag = insertEAQuery.executeUpdate();
			//判断是否有插入记录
			if(flag>0){
				for (String ec : extpertCodes) {
					result += this.InsertAnalysisDetail(eaId, ec);
				}
			}
		}else{
			eaId = this.GetEfficiencyAnalysis(vo);
			for (String ec : extpertCodes) {
				result += this.InsertAnalysisDetail(eaId, ec);
			}
		}
		return result;
	}
	
	/**
	 * 获取效能评分表中的评分记录
	 * @return
	 */
	private String GetEfficiencyAnalysis(EfficiencyAnalysisVo vo){
		//判断在效能评分表中是否存在评分记录
		String sql = "select t.id from T_EFFICIENCY_ANALYSIS t where t.CONTRACT_ID=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getContract_id());
		Object obj = query.uniqueResult();
		return obj.toString();
	}
	
	/**
	 * 向评分表中插入记录
	 * @param contractCode 效能评分表编号
	 * @param expertCode 参与人编号
	 * @return
	 */
	private int InsertAnalysisDetail(String contractCode,String expertCode){
		String sql = "insert into t_analysis_detail(id,efficiency_analysis_id," 
			+"scorer,ratio_price,quantity_ratio,commit_date_ratio,get_way_retio," 
			+"contract_sign_ratio,satisfy_ratio,composite_score) values(?,?,?,0,0,0,0,0,0,0)";
		SQLQuery query = adDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, UtilForHD.GetNowTimeForId());
		query.setParameter(1, contractCode);
		query.setParameter(2, expertCode);
		return query.executeUpdate();
	}
	
	/**
	 * 删除某个项目中的部分参与人
	 * @param vo
	 * @return
	 */
	public int DelectContractGradeParticipant(EfficiencyAnalysisVo vo){
//		System.out.println("测试："+vo.getExpertCodeForContract());
		String sql = "delete from t_analysis_detail m"
					+" where m.efficiency_analysis_id in(select e.id from t_efficiency_analysis e where e.contract_id=?)"
					+" and m.scorer in("+vo.getExpertCodeForContract()+")";
//		System.out.println(sql);
		SQLQuery query = adDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getContract_id());
//		query.setParameter(1, vo.getExpertCodeForContract());
		return query.executeUpdate();
	}
	
	/**
	 * 获取某个合同的所有评分信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AnalysisDetailVo> GetAnalysisDetailForGrade(AnalysisDetailVo vo){
		String username=identity.getLoginUser().getTruename();
		String sql = "select t.*,e.expert_name from t_analysis_detail t"
					+" left join t_expert e"
					+" on e.id=t.scorer"
					+" left join t_efficiency_analysis ea"
					+" on ea.id=t.efficiency_analysis_id"
					+" left join v_contract_procurementcontract c"
					+" on c.contract_id=ea.contract_id" 
					+" where c.contract_id=? ";//and e.expert_name!='"+username+"'";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		SetAnalysisDetailForGrade(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AnalysisDetailVo.class));
		query.setParameter(0, vo.getContractId());
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取某个合同的所有评分信息条数
	 * @param vo
	 * @return
	 */
	public long GetAnalysisDetailForGradeCount(AnalysisDetailVo vo){
		String sql = "select count(1) from t_analysis_detail t"
					+" left join t_expert e"
					+" on e.id=t.scorer"
					+" left join t_efficiency_analysis ea"
					+" on ea.id=t.efficiency_analysis_id"
					+" left join t_contract c"
					+" on c.contract_id=ea.contract_id" 
					+" where c.contract_id=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getContractId());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetAnalysisDetailForGrade(SQLQuery query){
		query = query.addScalar("id", Hibernate.STRING);
		query = query.addScalar("efficiency_analysis_id", Hibernate.STRING);
		query = query.addScalar("scorer", Hibernate.STRING);
		query = query.addScalar("ratio_price", Hibernate.LONG);
		query = query.addScalar("quantity_ratio", Hibernate.LONG);
		query = query.addScalar("commit_date_ratio", Hibernate.LONG);
		query = query.addScalar("get_way_retio", Hibernate.LONG);
		query = query.addScalar("contract_sign_ratio", Hibernate.LONG);
		query = query.addScalar("satisfy_ratio", Hibernate.LONG);
		query = query.addScalar("score_explain", Hibernate.STRING);
		query = query.addScalar("composite_score", Hibernate.LONG);
		query = query.addScalar("expert_name", Hibernate.STRING);
	}
	
	/**
	 * 根据合同编号和专家号添加评分信息
	 * @param vo
	 * @return
	 */
	public int UpdateAnalysisDetail(AnalysisDetailVo vo){
		//原SQL按照合同编号和专家编号添加评分信息
//		String sql = "update t_analysis_detail ad set ad.ratio_price=?,ad.quantity_ratio=?,ad.commit_date_ratio=?,"
//					+"ad.get_way_retio=?,ad.contract_sign_ratio=?,ad.satisfy_ratio=?,ad.composite_score=?"
//					+" where ad.id=(select * from t_efficiency_analysis ea"
//					+" left join t_contract c"
//					+" on ea.contract_id=c.contract_id"
//					+" where c.contract_id=?"
//					+" and ad.scorer=?)";
		//现有临时因专家表没有与用户表有关联，现直接去合同表下面找到的第一条没有评分的信息直接做修改（添加评分信息）
		String username=identity.getLoginUser().getLoginname();
		String sql = "update t_analysis_detail ad set ad.ratio_price=?,ad.quantity_ratio=?,ad.commit_date_ratio=?,"
					+"ad.get_way_retio=?,ad.contract_sign_ratio=?,ad.satisfy_ratio=?,ad.composite_score=?"
					+" where ad.id=(select ad2.id from t_analysis_detail ad2"
					+" left join t_efficiency_analysis ea1"
					+" on ad2.efficiency_analysis_id=ea1.id"
					+" left join T_EXPERT e on e.id=ad2.scorer"
					+" where ad2.ratio_price=0"
					+" and ea1.contract_id=?" 
					+" and e.expert_name='"+username+"'"
					+" and rownum=1)";
		SQLQuery query = adDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getRatio_price());
		query.setParameter(1, vo.getQuantity_ratio());
		query.setParameter(2, vo.getCommit_date_ratio());
		query.setParameter(3, vo.getGet_way_retio());
		query.setParameter(4, vo.getContract_sign_ratio());
		query.setParameter(5, vo.getSatisfy_ratio());
		query.setParameter(6, vo.getComposite_score());
//		query.setParameter(6, vo.getRatio_price()+vo.getQuantity_ratio()+vo.getCommit_date_ratio()+vo.getGet_way_retio()+vo.getContract_sign_ratio()+vo.getSatisfy_ratio());
		query.setParameter(7, vo.getContractId());
		return query.executeUpdate();
	}
	
	/**
	 * 判断某个合同下面的参与人评分是否已经全部都评分了，如果全部评分了就统计综合评分信息.在此判断有没有评分以表t_analysis_detail的ratio_price字段为准
	 * @param vo
	 * @return
	 */
	public String OpinionTheEAForScore(AnalysisDetailVo vo){
		String result = "没有修改了“采购效能评分表”的综合分值字段！";
		String sqlHave = "select count(1) from t_analysis_detail t"
					+" left join t_efficiency_analysis ea"
					+" on ea.id=t.efficiency_analysis_id"
					+" where ea.contract_id=?"
					+" and t.ratio_price=0";
		SQLQuery queryHave = dao.getHibernateSession().createSQLQuery(sqlHave);
		queryHave.setParameter(0, vo.getContractId());
		Object obj = queryHave.uniqueResult();
		//判断是否存在有没有评分的参与人。在此判断有没有评分以表t_analysis_detail的ratio_price字段为准
//		if(Long.parseLong(obj.toString())<=0){
			//如果所有的参与人都评分完成。则统计合计平均分值
			String sqlUpdate = "update t_efficiency_analysis ea"
							+" set ea.score =(select sum(ad.composite_score)/count(1)"
							+" from t_analysis_detail ad"
							+" left join t_efficiency_analysis ea2"
							+" on ea2.id = ad.efficiency_analysis_id"
							+" where ea2.contract_id = :cId)"
							+" where ea.id =(select ea1.id from t_efficiency_analysis ea1 where ea1.contract_id = :cId)";
			SQLQuery queryUpdate = eaDao.getHibernateSession().createSQLQuery(sqlUpdate);
			queryUpdate.setParameter("cId", vo.getContractId());
			int falg = queryUpdate.executeUpdate();
//			System.out.println("修改了采购效能评分表（T_EFFICIENCY_ANALYSIS）总合同编号为：【"+vo.getContractId()+"】的综合分值。");
			result="修改了“采购效能评分表”的综合分值字段！";
//		}
		return result;
	}


	public JSONArray getScorersByContract(AnalysisDetailVo vo) {
		// TODO Auto-generated method stub
		vo.getContractId();
		String sql="SELECT e.id,e.EXPERT_NAME from T_EFFICIENCY_ANALYSIS ea,T_ANALYSIS_DETAIL ad ,T_EXPERT e,t_contract c where EA.ID=AD.EFFICIENCY_ANALYSIS_ID and e.ID=AD.SCORER and EA.CONTRACT_ID=c.id and c.contract_code=:contract";
        List<Object[]> list=dao.getHibernateSession().createSQLQuery(sql).setParameter("contract", vo.getContractId()).list();
		JSONArray ja=new JSONArray();
		for(Object[] obj:list){
			JSONObject jo=new JSONObject();
			jo.put("text", obj[1]);
			jo.put("value",obj[0]);
			ja.add(jo);
		}
        return ja;
	}
}
