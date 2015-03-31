package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OptimisticLockType;

import com.sysware.customize.hd.investment.baseData.material.Material;

/**
 * 定额计划汇总明细表
 * 
 */

@Entity
@Table(name = "T_PROCUREMENTSUMMARYDETAIL")
public class ProcurementSummaryDetail implements Serializable {

	private static final long serialVersionUID = 2070174676525569048L;

	private String procurementSummaryDetailId;
	


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
	
	private String buinessplanId;// 经营计划ID,在汇总明细查询时用到
	
	private String procurementid;//采购计划ID
	
	private BigDecimal currentDelivery;//本年计划交付数(仅预拨计划)
	
	private String currentBatchNo;//本年批架次
	
	// 以下为非持久化字段
	private String materialItemName;// 物料名称

	private String desingnation;// 物料牌号

	private String materialStandard;// 物料规格

	private String technicCondition;// 技术条件

	private String demension;// 量纲
	
	private String planType;//计划类型
	
	private String materialtypename;//物质类别


	public ProcurementSummaryDetail() {
	}

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
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
	
	
	public String getBuinessplanId() {
		return buinessplanId;
	}

	public void setBuinessplanId(String buinessplanId) {
		this.buinessplanId = buinessplanId;
	}

	
	
	public BigDecimal getCurrentDelivery() {
		return currentDelivery;
	}

	public void setCurrentDelivery(BigDecimal currentDelivery) {
		this.currentDelivery = currentDelivery;
	}

	
	
	public String getCurrentBatchNo() {
		return currentBatchNo;
	}

	public void setCurrentBatchNo(String currentBatchNo) {
		this.currentBatchNo = currentBatchNo;
	}

	@Transient
	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	@Transient
	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	@Transient
	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	@Transient
	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	@Transient
	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}	
 
	@Transient
	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	@Transient
	public String getMaterialtypename() {
		return materialtypename;
	}

	public void setMaterialtypename(String materialtypename) {
		this.materialtypename = materialtypename;
	}

	public String getProcurementid() {
		return procurementid;
	}

	public void setProcurementid(String procurementid) {
		this.procurementid = procurementid;
	}
	
	
	
}