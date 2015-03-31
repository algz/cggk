package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo;

public class AnalysisDetailVo {

	//主键ID
	private String id;
	//效能分析表ID
	private String efficiency_analysis_id;
	//评分人员
	private String scorer;
	//性价比评分
	private long ratio_price;
	//质量评分
	private long quantity_ratio;
	//交货期评分
	private long commit_date_ratio;
	//采购方式评分
	private long get_way_retio;
	//合同签订评分
	private long contract_sign_ratio;
	//用户满意度评分
	private long satisfy_ratio;
	//评分说明
	private String score_explain;
	//综合分值
	private long composite_score;
	
	//专家姓名
	private String expert_name;
	
	//缓存合同主键编号
	private String contractId;
	
	//分页起始页面
	private int start;
	//每页显示的条数
	private int limit;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEfficiency_analysis_id() {
		return efficiency_analysis_id;
	}
	public void setEfficiency_analysis_id(String efficiencyAnalysisId) {
		efficiency_analysis_id = efficiencyAnalysisId;
	}
	public String getScorer() {
		return scorer;
	}
	public void setScorer(String scorer) {
		this.scorer = scorer;
	}
	public long getRatio_price() {
		return ratio_price;
	}
	public void setRatio_price(long ratioPrice) {
		ratio_price = ratioPrice;
	}
	public long getQuantity_ratio() {
		return quantity_ratio;
	}
	public void setQuantity_ratio(long quantityRatio) {
		quantity_ratio = quantityRatio;
	}
	public long getCommit_date_ratio() {
		return commit_date_ratio;
	}
	public void setCommit_date_ratio(long commitDateRatio) {
		commit_date_ratio = commitDateRatio;
	}
	public long getGet_way_retio() {
		return get_way_retio;
	}
	public void setGet_way_retio(long getWayRetio) {
		get_way_retio = getWayRetio;
	}
	public long getContract_sign_ratio() {
		return contract_sign_ratio;
	}
	public void setContract_sign_ratio(long contractSignRatio) {
		contract_sign_ratio = contractSignRatio;
	}
	public long getSatisfy_ratio() {
		return satisfy_ratio;
	}
	public void setSatisfy_ratio(long satisfyRatio) {
		satisfy_ratio = satisfyRatio;
	}
	public String getScore_explain() {
		return score_explain;
	}
	public void setScore_explain(String scoreExplain) {
		score_explain = scoreExplain;
	}
	public long getComposite_score() {
		return composite_score;
	}
	public void setComposite_score(long compositeScore) {
		composite_score = compositeScore;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getExpert_name() {
		return expert_name;
	}
	public void setExpert_name(String expertName) {
		expert_name = expertName;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
}
