package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.AnalysisDetailVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.EfficiencyAnalysisVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ExpertVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ProjectExpertRelationVo;

@Name("SelectGradePersonnelRemote")
public class SelectGradePersonnelRemote {

	@In(create=true,value="SelectGradePersonnelServiceImpl")
	private SelectGradePersonnelServiceImpl service;
	
	/**
	 * 根据获得的node编号判断是加载方向还是专家信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetRetuenTree(ProjectExpertRelationVo vo){
//		System.out.println("默认传递数据："+vo.getNode());
		if(vo.getNode().equals("0")){
			return this.GetProject();
		}
		else{
			vo.setProject_code(vo.getNode());
			return this.GetExpert(vo);
		}
	}
	
	/**
	 * 查询项目方向
	 * @return
	 */
	public String GetProject(){
		StringBuilder flagStr = new StringBuilder();
		List<ProjectExpertRelationVo> list = service.GetProject();
		flagStr.append('[');
		for(int i=0;i<list.size();i++){
			flagStr.append("{");
			flagStr.append("id:'").append(list.get(i).getProject_code()).append("',");
			flagStr.append("text:'").append(list.get(i).getProject_name()).append("',");
			//添加复选框，并判断复选框是否已经被勾选
			flagStr.append("checked:false,");
			//添加每条信息前面显示的图标样式
			flagStr.append("iconCls:'icon'").append(",");
			flagStr.append("leaf:false");
			flagStr.append("}");
			if(i!=list.size()-1){
				flagStr.append(",");
			}
		}
		flagStr.append(']');
		return flagStr.toString();
	}
	
	/**
	 * 查询某个方向的专家
	 * @param vo
	 * @return
	 */
	public String GetExpert(ProjectExpertRelationVo vo){
		StringBuilder flagStr = new StringBuilder();
		List<ExpertVo> list = service.GetExpert(vo);
		flagStr.append('[');
		for(int i=0;i<list.size();i++){
			flagStr.append("{");
			flagStr.append("id:'").append(list.get(i).getExpert_code()).append("|").append(list.get(i).getProject_code()).append("',");
			flagStr.append("text:'").append(list.get(i).getExpert_name()).append("',");
			flagStr.append("mm:'").append(list.get(i).getId()).append("',");
			flagStr.append("expert_name:'").append(list.get(i).getExpert_name()).append("',");
			flagStr.append("project_name:'").append(list.get(i).getProject_name()).append("',");
			//添加复选框，并判断复选框是否已经被勾选
			flagStr.append("checked:false,");
			//添加每条信息前面显示的图标样式
			flagStr.append("iconCls:'icon'").append(",");
			flagStr.append("leaf:true");
			flagStr.append("}");
			if(i!=list.size()-1){
				flagStr.append(",");
			}
		}
		flagStr.append(']');
		return flagStr.toString();
	}
	
	/**
	 * 获得某个合同的评分参与人
	 * @return
	 */
	@WebRemote
	public String GetGradeParticipant(EfficiencyAnalysisVo vo){
		GridData<EfficiencyAnalysisVo> data = new GridData<EfficiencyAnalysisVo>();
		List<EfficiencyAnalysisVo> list = service.GetGradeParticipant(vo);
		data.setResults(list);
		data.setTotalProperty(list.size());
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 添加合同评分参与人员
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String insertContractGradeParticipant(EfficiencyAnalysisVo vo){
		int flag = service.insertContractGradeParticipant(vo);
		return String.valueOf(flag);
	}
	
	/**
	 * 删除某个项目中的部分参与人
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String DelectContractGradeParticipant(EfficiencyAnalysisVo vo){
		int flag = service.DelectContractGradeParticipant(vo);
		return String.valueOf(flag);
	}
	
	/**
	 * 获取某个合同的所有评分信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetAnalysisDetailForGrade(AnalysisDetailVo vo){
		GridData<AnalysisDetailVo> data = new GridData<AnalysisDetailVo>();
		List<AnalysisDetailVo> list = service.GetAnalysisDetailForGrade(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetAnalysisDetailForGradeCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	
	/**
	 * 根据合同编号和专家号添加评分信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String UpdateAnalysisDetail(AnalysisDetailVo vo){
		int flag = service.UpdateAnalysisDetail(vo);
		String result = service.OpinionTheEAForScore(vo);
//		System.out.println(result);
		return String.valueOf(flag);
	}
	
	/**
	 * 查询合同的所有评分人
	 * @param vo
	 * @return
	 */
	public String getScorersByContract(AnalysisDetailVo vo){
		JSONObject jo=new JSONObject();
		JSONArray ja=service.getScorersByContract(vo);
		jo.put("success", true);
		jo.put("scorers", ja);
		return jo.toString();
	}
	
}
