package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 定额计划汇总明细表
 * 
 */

public class ProcurementSummaryDetailVo implements Serializable {

	private static final long serialVersionUID = 2070174676525569048L;

	private String procurementSummaryDetailId;
	
    private String procurementId;//采购计划ID

	private String procurementDetailId;// 年度采购计划汇总主键
	
	private String materialId;// 物料ID
	
	private String JX;

	private BigDecimal materialCounts;// 需求量=(上年欠交+本年交付)*定额

	private BigDecimal jan;// 一月需求数量

	private BigDecimal feb;// 二月需求数量

	private BigDecimal mar;// 三月需求数量

	private BigDecimal apr;// 四月需求数量

	private BigDecimal may;// 五月需求数量

	private BigDecimal june;// 六月需求数量

	private BigDecimal july;// 七月需求数量

	private BigDecimal aug;// 八月需求数量

	private BigDecimal sept;// 九月需求数量

	private BigDecimal oct;// 十月需求数量

	private BigDecimal nov;// 十一月需求数量

	private BigDecimal dect;// 十二月需求数量

	private String remark;// 备注


	// 以下为非持久化字段
	private String materialItemName;// 物料名称

	private String desingnation;// 物料牌号

	private String materialStandard;// 物料规格

	private String technicCondition;// 技术条件

	private String demension;// 量纲
	
	private String planType;//计划类型
	
	private String materialtypename;//物质类别
	private String referenceprice; //计划单位

	private Integer start;
	private Integer limit;
	private Integer count;
	
	public String getReferenceprice() {
		return referenceprice;
	}

	public void setReferenceprice(String referenceprice) {
		this.referenceprice = referenceprice;
	}

	public ProcurementSummaryDetailVo() {
	}

	public String getProcurementSummaryDetailId() {
		return procurementSummaryDetailId;
	}

	public void setProcurementSummaryDetailId(String procurementSummaryDetailId) {
		this.procurementSummaryDetailId = procurementSummaryDetailId;
	}
	
	
	public String getProcurementDetailId() {
		return procurementDetailId;
	}

	public void setProcurementDetailId(String procurementDetailId) {
		this.procurementDetailId = procurementDetailId;
	}

	public BigDecimal getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(BigDecimal materialCounts) {
		this.materialCounts = materialCounts;
	}

	public BigDecimal getJan() {
		return jan;
	}

	public void setJan(BigDecimal jan) {
		this.jan = jan;
	}

	public BigDecimal getFeb() {
		return feb;
	}

	public void setFeb(BigDecimal feb) {
		this.feb = feb;
	}

	public BigDecimal getMar() {
		return mar;
	}

	public void setMar(BigDecimal mar) {
		this.mar = mar;
	}

	public BigDecimal getApr() {
		return apr;
	}

	public void setApr(BigDecimal apr) {
		this.apr = apr;
	}

	public BigDecimal getMay() {
		return may;
	}

	public void setMay(BigDecimal may) {
		this.may = may;
	}

	public BigDecimal getJune() {
		return june;
	}

	public void setJune(BigDecimal june) {
		this.june = june;
	}

	public BigDecimal getJuly() {
		return july;
	}

	public void setJuly(BigDecimal july) {
		this.july = july;
	}

	public BigDecimal getAug() {
		return aug;
	}

	public void setAug(BigDecimal aug) {
		this.aug = aug;
	}

	public BigDecimal getSept() {
		return sept;
	}

	public void setSept(BigDecimal sept) {
		this.sept = sept;
	}

	public BigDecimal getOct() {
		return oct;
	}

	public void setOct(BigDecimal oct) {
		this.oct = oct;
	}

	public BigDecimal getNov() {
		return nov;
	}

	public void setNov(BigDecimal nov) {
		this.nov = nov;
	}

	public BigDecimal getDect() {
		return dect;
	}

	public void setDect(BigDecimal dect) {
		this.dect = dect;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
 
	public String getJX() {
		return JX;
	}

	public void setJX(String jX) {
		JX = jX;
	}

	
	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	
	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	
	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	
	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	
	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}	
 
	
	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	
	public String getMaterialtypename() {
		return materialtypename;
	}

	public void setMaterialtypename(String materialtypename) {
		this.materialtypename = materialtypename;
	}

	public String getProcurementId() {
		return procurementId;
	}

	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
	
	
}