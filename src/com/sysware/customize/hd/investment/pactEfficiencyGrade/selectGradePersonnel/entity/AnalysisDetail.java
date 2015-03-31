package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="T_ANALYSIS_DETAIL")
public class AnalysisDetail {

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
	
	@Id
	@Column(name="ID",unique=true,nullable=false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	@Column(name="EFFICIENCY_ANALYSIS_ID")
	public String getEfficiency_analysis_id() {
		return efficiency_analysis_id;
	}
	public void setEfficiency_analysis_id(String efficiencyAnalysisId) {
		efficiency_analysis_id = efficiencyAnalysisId;
	}
	
	@Column(name="SCORER")
	public String getScorer() {
		return scorer;
	}
	public void setScorer(String scorer) {
		this.scorer = scorer;
	}
	
	@Column(name="RATIO_PRICE")
	public long getRatio_price() {
		return ratio_price;
	}
	public void setRatio_price(long ratioPrice) {
		ratio_price = ratioPrice;
	}
	
	@Column(name="QUANTITY_RATIO")
	public long getQuantity_ratio() {
		return quantity_ratio;
	}
	public void setQuantity_ratio(long quantityRatio) {
		quantity_ratio = quantityRatio;
	}
	
	@Column(name="COMMIT_DATE_RATIO")
	public long getCommit_date_ratio() {
		return commit_date_ratio;
	}
	public void setCommit_date_ratio(long commitDateRatio) {
		commit_date_ratio = commitDateRatio;
	}
	
	@Column(name="GET_WAY_RETIO")
	public long getGet_way_retio() {
		return get_way_retio;
	}
	
	public void setGet_way_retio(long getWayRetio) {
		get_way_retio = getWayRetio;
	}
	
	@Column(name="CONTRACT_SIGN_RATIO")
	public long getContract_sign_ratio() {
		return contract_sign_ratio;
	}
	public void setContract_sign_ratio(long contractSignRatio) {
		contract_sign_ratio = contractSignRatio;
	}
	
	@Column(name="SATISFY_RATIO")
	public long getSatisfy_ratio() {
		return satisfy_ratio;
	}
	public void setSatisfy_ratio(long satisfyRatio) {
		satisfy_ratio = satisfyRatio;
	}
	
	@Column(name="SCORE_EXPLAIN")
	public String getScore_explain() {
		return score_explain;
	}
	public void setScore_explain(String scoreExplain) {
		score_explain = scoreExplain;
	}
	
	@Column(name="COMPOSITE_SCORE")
	public long getComposite_score() {
		return composite_score;
	}
	public void setComposite_score(long compositeScore) {
		composite_score = compositeScore;
	}
}
