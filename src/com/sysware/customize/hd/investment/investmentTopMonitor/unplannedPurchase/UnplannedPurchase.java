package com.sysware.customize.hd.investment.investmentTopMonitor.unplannedPurchase;// 

import java.math.BigDecimal;
import java.util.Date;

import com.ibm.icu.text.SimpleDateFormat;

/**
 * 计划外采购监控DTO
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-30
 * 
 */
public class UnplannedPurchase {

	private String procurementCode;// 需求编号
	private String materialItemName;// 材料名称
	private String desingnation;// 牌号
	private String materialStandard;// 规格
	private String technicCondition;// 技术标准
	private String demension;// 量纲
	private String productCode;// 机型
	private BigDecimal materialCounts;// 需用量
	private String status;// 采购清单申请状态
	private String editors;// 负责人
	private String applicationStatus;// 合同申请状态
	private BigDecimal arriveCircs;// 货款支付情况
	private Date signDate;// 合同签订日期--注意set、get方法逻辑
	private String purchaseType;// 采购方式
	private String procurementDetailId;// 需求详情ID

	private int start;
	private int limit;
	private String nodeId;
	private String[] strCurrentStatus = new String[3];// 当前状态-索引0、1、2位置对应显示绿、红、灰三种颜色
	
	private BigDecimal ROWNUM_; //非实体分页用属性

	public String getProcurementCode() {
		return procurementCode;
	}

	public void setProcurementCode(String procurementCode) {
		this.procurementCode = procurementCode;
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

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public BigDecimal getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(BigDecimal materialCounts) {
		this.materialCounts = materialCounts;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEditors() {
		return editors;
	}

	public void setEditors(String editors) {
		this.editors = editors;
	}

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	public BigDecimal getArriveCircs() {
		return arriveCircs;
	}

	public void setArriveCircs(BigDecimal arriveCircs) {
		this.arriveCircs = arriveCircs;
	}

	//只用于前台展示
	public String getSignDate() {
		if(signDate != null){
			return new SimpleDateFormat("yyyy-MM-dd").format(signDate);
		}
		return "";
	}

	//只用于Hibernate赋值
	public void setSignDate(Date signDate) {
		this.signDate = signDate;
	}

	public String getPurchaseType() {
		return purchaseType;
	}

	public void setPurchaseType(String purchaseType) {
		this.purchaseType = purchaseType;
	}

	public String getProcurementDetailId() {
		return procurementDetailId;
	}

	public void setProcurementDetailId(String procurementDetailId) {
		this.procurementDetailId = procurementDetailId;
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

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String[] getStrCurrentStatus() {
		return strCurrentStatus;
	}

	public void setStrCurrentStatus(int index, String strCurrentStatus) {
		this.strCurrentStatus[index] = strCurrentStatus;
	}
	
	public BigDecimal getROWNUM_() {
		return ROWNUM_;
	}

	public void setROWNUM_(BigDecimal rOWNUM_) {
		ROWNUM_ = rOWNUM_;
	}

}
