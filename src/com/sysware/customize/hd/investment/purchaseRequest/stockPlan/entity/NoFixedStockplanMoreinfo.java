package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 
 * 非固定资产实体类
 * 
 * @author lit
 * 
 * @date 2011.10.10
 * 
 */

@Entity
@Table(name = "T_PROCUREMENTPLAN_DETIL")
public class NoFixedStockplanMoreinfo {
	private String planid;
	private String procurementPlan_ID;
	private String declarePlan_detil_ID;
	private BigDecimal price;
	private BigDecimal last_year_Consume;
	private BigDecimal subtotal;
	private BigDecimal inventory;
	private BigDecimal tobetested;
	private BigDecimal contract;
	private BigDecimal outstanding;
	private BigDecimal year_inventory;
	private BigDecimal half_year_consume;
	private BigDecimal gap_number;
	private BigDecimal direct_materials;
	private BigDecimal auxiliary_materials;
	private BigDecimal reserve;
	private BigDecimal number_applications;
	private BigDecimal amount_applications;
	private BigDecimal deliver;
	private BigDecimal wip;
	private BigDecimal other;
	private BigDecimal apply_reserve;
	private BigDecimal subtotal_number;
	private BigDecimal subtotal_amount;
	private BigDecimal super_storage;
	private BigDecimal redeployment;
	private String vendor_id;
	private String procurementtype;
	private String remark;
	private String status;//状态：1已生成，2审批中，3已审批，6已生成合同
	private String declareplan_id;//申报计划ID
    private String purchaseType;//采购方式：1.比价；2.招标；3.直接采购 4 协议采购 5 其它采购 
    private BigDecimal actualNumber;//实际采购量
    private BigDecimal needNumber;//需用量
    private String vendorName;//供应商名称
    private BigDecimal operable;
    private String note;
	public BigDecimal getOperable() {
		return operable;
	}

	public void setOperable(BigDecimal operable) {
		this.operable = operable;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public BigDecimal getActualNumber() {
		return actualNumber;
	}

	public void setActualNumber(BigDecimal actualNumber) {
		this.actualNumber = actualNumber;
	}

	public BigDecimal getNeedNumber() {
		return needNumber;
	}

	public void setNeedNumber(BigDecimal needNumber) {
		this.needNumber = needNumber;
	}

	@Id
	@Column(name = "PROCUREMENTPLAN_DETIL_ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getPlanid() {
		return planid;
	}

	public void setPlanid(String planid) {
		this.planid = planid;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getLast_year_Consume() {
		return last_year_Consume;
	}

	public void setLast_year_Consume(BigDecimal lastYearConsume) {
		last_year_Consume = lastYearConsume;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	public BigDecimal getInventory() {
		return inventory;
	}

	public void setInventory(BigDecimal inventory) {
		this.inventory = inventory;
	}

	public BigDecimal getTobetested() {
		return tobetested;
	}

	public String getProcurementPlan_ID() {
		return procurementPlan_ID;
	}

	public void setProcurementPlan_ID(String procurementPlanID) {
		procurementPlan_ID = procurementPlanID;
	}

	public String getDeclarePlan_detil_ID() {
		return declarePlan_detil_ID;
	}

	public void setDeclarePlan_detil_ID(String declarePlanDetilID) {
		declarePlan_detil_ID = declarePlanDetilID;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTobetested(BigDecimal tobetested) {
		this.tobetested = tobetested;
	}

	public BigDecimal getContract() {
		return contract;
	}

	public void setContract(BigDecimal contract) {
		this.contract = contract;
	}

	public BigDecimal getOutstanding() {
		return outstanding;
	}

	public void setOutstanding(BigDecimal outstanding) {
		this.outstanding = outstanding;
	}

	public BigDecimal getYear_inventory() {
		return year_inventory;
	}

	public void setYear_inventory(BigDecimal yearInventory) {
		year_inventory = yearInventory;
	}

	public BigDecimal getHalf_year_consume() {
		return half_year_consume;
	}

	public void setHalf_year_consume(BigDecimal halfYearConsume) {
		half_year_consume = halfYearConsume;
	}

	public BigDecimal getGap_number() {
		return gap_number;
	}

	public void setGap_number(BigDecimal gapNumber) {
		gap_number = gapNumber;
	}

	public BigDecimal getDirect_materials() {
		return direct_materials;
	}

	public void setDirect_materials(BigDecimal directMaterials) {
		direct_materials = directMaterials;
	}

	public BigDecimal getAuxiliary_materials() {
		return auxiliary_materials;
	}

	public void setAuxiliary_materials(BigDecimal auxiliaryMaterials) {
		auxiliary_materials = auxiliaryMaterials;
	}

	public BigDecimal getReserve() {
		return reserve;
	}

	public void setReserve(BigDecimal reserve) {
		this.reserve = reserve;
	}

	public BigDecimal getNumber_applications() {
		return number_applications;
	}

	public void setNumber_applications(BigDecimal numberApplications) {
		number_applications = numberApplications;
	}

	public BigDecimal getAmount_applications() {
		return amount_applications;
	}

	public void setAmount_applications(BigDecimal amountApplications) {
		amount_applications = amountApplications;
	}

	public BigDecimal getDeliver() {
		return deliver;
	}

	public void setDeliver(BigDecimal deliver) {
		this.deliver = deliver;
	}

	public BigDecimal getWip() {
		return wip;
	}

	public void setWip(BigDecimal wip) {
		this.wip = wip;
	}

	public BigDecimal getOther() {
		return other;
	}

	public void setOther(BigDecimal other) {
		this.other = other;
	}

	public BigDecimal getApply_reserve() {
		return apply_reserve;
	}

	public void setApply_reserve(BigDecimal applyReserve) {
		apply_reserve = applyReserve;
	}

	public BigDecimal getSubtotal_number() {
		return subtotal_number;
	}

	public void setSubtotal_number(BigDecimal subtotalNumber) {
		subtotal_number = subtotalNumber;
	}

	public BigDecimal getSubtotal_amount() {
		return subtotal_amount;
	}

	public void setSubtotal_amount(BigDecimal subtotalAmount) {
		subtotal_amount = subtotalAmount;
	}

	public BigDecimal getSuper_storage() {
		return super_storage;
	}

	public void setSuper_storage(BigDecimal superStorage) {
		super_storage = superStorage;
	}

	public BigDecimal getRedeployment() {
		return redeployment;
	}

	public void setRedeployment(BigDecimal redeployment) {
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

	public String getDeclareplan_id() {
		return declareplan_id;
	}

	public void setDeclareplan_id(String declareplanId) {
		declareplan_id = declareplanId;
	}

	
	
}
