package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

import java.math.BigDecimal;

/**
 * 采购计划 非固定资产 详细信息vo类
 * 
 * @author Lit
 * @date 2011.10.11
 * 
 */

public class NofixedStockplanMoreInfoVo {
	
	private String materialId;

	private String materialitemname;
	private String desingnation;
	private String materialstandard;
	private String techniccondition;
	private String demension;
	private String price;
	private String last_year_Consume;
	private String subtotal;//小计
	private String inventory;//库存
	private String tobetested;
	private String contract;
	private String outstanding;
	private String year_inventory;
	private String gap_number;
	private String half_year_consume;
	private String direct_materials;
	private String auxiliary_materials;
	private String reserve;
	private String number_applications;
	private String amount_applications;
	private String deliver;
	private String deliverydate;
	private String wip;
	private String other;
	private String apply_reserve;
	private String subtotal_number;
	private String subtotal_amount;
	private String super_storage;
	private String redeployment;
	private String vendor_id;
	private String procurementtype;

	private String planid;
	private String purchaseType;//采购类型
	private String actualNumber;//实际采购量
	private String needNumber;//需用量
	private String materialCalalogName;//物资名称
	private String vendorName;
	private String note;
	private String operable;
	
	private String use;//采购用途
	private String taskno;//任务编号
	private String declare_detil_status;//申报状态  5变更
	private String confirmcontract;//合同确认  1确认入库
	
	private String oldquantity;//变更前数据
	private String changer;//变更人
	private String changetime;//变更时间
	private String changereson;//变更原因
	private String deliveryStatus;//物资交货状态
	
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getOperable() {
		return operable;
	}

	public void setOperable(String operable) {
		this.operable = operable;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getPurchaseType() {
		return purchaseType;
	}

	public void setPurchaseType(String purchaseType) {
		this.purchaseType = purchaseType;
	}

	public String getActualNumber() {
		return actualNumber;
	}

	public void setActualNumber(String actualNumber) {
		this.actualNumber = actualNumber;
	}

	public String getNeedNumber() {
		return needNumber;
	}

	public void setNeedNumber(String needNumber) {
		this.needNumber = needNumber;
	}

	public String getMaterialCalalogName() {
		return materialCalalogName;
	}

	public void setMaterialCalalogName(String materialCalalogName) {
		this.materialCalalogName = materialCalalogName;
	}

	private Integer limit;
	private Integer start;

	public String getPlanid() {
		return planid;
	}

	public void setPlanid(String planid) {
		this.planid = planid;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public String getMaterialitemname() {
		return materialitemname;
	}

	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public String getMaterialstandard() {
		return materialstandard;
	}

	public void setMaterialstandard(String materialstandard) {
		this.materialstandard = materialstandard;
	}

	public String getTechniccondition() {
		return techniccondition;
	}

	public void setTechniccondition(String techniccondition) {
		this.techniccondition = techniccondition;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getLast_year_Consume() {
		return last_year_Consume;
	}

	public void setLast_year_Consume(String lastYearConsume) {
		last_year_Consume = lastYearConsume;
	}

	public String getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(String subtotal) {
		this.subtotal = subtotal;
	}

	public String getInventory() {
		return inventory;
	}

	public void setInventory(String inventory) {
		this.inventory = inventory;
	}

	public String getTobetested() {
		return tobetested;
	}

	public void setTobetested(String tobetested) {
		this.tobetested = tobetested;
	}

	public String getContract() {
		return contract;
	}

	public void setContract(String contract) {
		this.contract = contract;
	}

	public String getOutstanding() {
		return outstanding;
	}

	public void setOutstanding(String outstanding) {
		this.outstanding = outstanding;
	}

	public String getYear_inventory() {
		return year_inventory;
	}

	public void setYear_inventory(String yearInventory) {
		year_inventory = yearInventory;
	}

	public String getHalf_year_consume() {
		return half_year_consume;
	}

	public void setHalf_year_consume(String halfYearConsume) {
		half_year_consume = halfYearConsume;
	}

	public String getGap_number() {
		return gap_number;
	}

	public void setGap_number(String gapNumber) {
		gap_number = gapNumber;
	}

	public String getDirect_materials() {
		return direct_materials;
	}

	public void setDirect_materials(String directMaterials) {
		direct_materials = directMaterials;
	}

	public String getAuxiliary_materials() {
		return auxiliary_materials;
	}

	public void setAuxiliary_materials(String auxiliaryMaterials) {
		auxiliary_materials = auxiliaryMaterials;
	}

	public String getReserve() {
		return reserve;
	}

	public void setReserve(String reserve) {
		this.reserve = reserve;
	}

	public String getNumber_applications() {
		return number_applications;
	}

	public void setNumber_applications(String numberApplications) {
		number_applications = numberApplications;
	}

	public String getAmount_applications() {
		return amount_applications;
	}

	public void setAmount_applications(String amountApplications) {
		amount_applications = amountApplications;
	}

	public String getDeliver() {
		return deliver;
	}

	public void setDeliver(String deliver) {
		this.deliver = deliver;
	}

	public String getWip() {
		return wip;
	}

	public void setWip(String wip) {
		this.wip = wip;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getApply_reserve() {
		return apply_reserve;
	}

	public void setApply_reserve(String applyReserve) {
		apply_reserve = applyReserve;
	}

	public String getSubtotal_number() {
		return subtotal_number;
	}

	public void setSubtotal_number(String subtotalNumber) {
		subtotal_number = subtotalNumber;
	}

	public String getSubtotal_amount() {
		return subtotal_amount;
	}

	public void setSubtotal_amount(String subtotalAmount) {
		subtotal_amount = subtotalAmount;
	}

	public String getSuper_storage() {
		return super_storage;
	}

	public void setSuper_storage(String superStorage) {
		super_storage = superStorage;
	}

	public String getRedeployment() {
		return redeployment;
	}

	public void setRedeployment(String redeployment) {
		this.redeployment = redeployment;
	}

	public String getVendor_id() {
		return vendor_id;
	}

	public void setVendor_id(String vendorId) {
		vendor_id = vendorId;
	}

	public String getProcurementtype() {
		return procurementtype;
	}

	public void setProcurementtype(String procurementtype) {
		this.procurementtype = procurementtype;
	}

	public String getDeliverydate() {
		return deliverydate;
	}

	public void setDeliverydate(String deliverydate) {
		this.deliverydate = deliverydate;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getUse() {
		return use;
	}

	public void setUse(String use) {
		this.use = use;
	}

	public String getTaskno() {
		return taskno;
	}

	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}

	public String getDeclare_detil_status() {
		return declare_detil_status;
	}

	public void setDeclare_detil_status(String declareDetilStatus) {
		declare_detil_status = declareDetilStatus;
	}

	public String getConfirmcontract() {
		return confirmcontract;
	}

	public void setConfirmcontract(String confirmcontract) {
		this.confirmcontract = confirmcontract;
	}

	public String getOldquantity() {
		return oldquantity;
	}

	public void setOldquantity(String oldquantity) {
		this.oldquantity = oldquantity;
	}

	public String getChanger() {
		return changer;
	}

	public void setChanger(String changer) {
		this.changer = changer;
	}

	public String getChangetime() {
		return changetime;
	}

	public void setChangetime(String changetime) {
		this.changetime = changetime;
	}

	public String getChangereson() {
		return changereson;
	}

	public void setChangereson(String changereson) {
		this.changereson = changereson;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}


	
	
	
}
