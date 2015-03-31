package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OptimisticLockType;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;

/**
 * 采购需求明细
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-27 10:27
 */
@SqlResultSetMappings(value = {
		@SqlResultSetMapping(name = "ProcurementAnnualDetailResults", entities = {
				@EntityResult(entityClass = ProcurementDetail.class),
				@EntityResult(entityClass = Material.class) }, columns = {
				@ColumnResult(name = "materialcount"),
				@ColumnResult(name = "remark"),
				@ColumnResult(name = "totalRequired"),
				@ColumnResult(name = "deliveryCount") }),
		@SqlResultSetMapping(name = "ProcurementSporadicDetailResults", entities = {
				@EntityResult(entityClass = ProcurementDetail.class),
				@EntityResult(entityClass = Material.class) }),
		@SqlResultSetMapping(name = "ProcurementDetailResults", entities = {
				@EntityResult(entityClass = ProcurementDetail.class),
				@EntityResult(entityClass = Material.class) }, columns = {
				@ColumnResult(name = "remark"),
				@ColumnResult(name = "requestcode"),
				@ColumnResult(name = "oldquantity"),
				@ColumnResult(name = "changer"),
				@ColumnResult(name = "changtime"),
				@ColumnResult(name = "changreson"),
				@ColumnResult(name = "status"),
				@ColumnResult(name = "usedate")
				}) })
@Entity
@org.hibernate.annotations.Entity(optimisticLock = OptimisticLockType.VERSION)
@Table(name = "T_PROCUREMENTDETAIL")
public class ProcurementDetail implements Serializable {

	private static final long serialVersionUID = 2070174676525569048L;

	private String procurementDetailId;// 需求明细ID

	private String buinessPlanDetailsId;// 年度计划明细ID

	private String declare_detil_id;//申报明细ID,年度计划明细ID(经营计划)与申报明细ID(零星采购计划)互斥唯一.
	
	private String materialQuotaId;// 材料定额ID
	
	private String JX;
	private String QSJH;
    private String ZZJH;
    private String CLDM;

	private String materialTypeName;// 材料类型名称

	private String vendorId;// 供应商ID

	private BigDecimal materialCounts;// 材料需用总量

	private String purchaseType;// 采购方式：1.比价；2.招标；3.直接采购 4 协议采购，5其它采购

	private String procurementId;// 采购需求ID

	private BigDecimal actualNumber;// 实际采购数量

	private String purchaseId;// 采购清单ID

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

	private BigDecimal other;// 其它月份需求数量

	private String materialId;// 物料ID

	private BigDecimal price;// 单价

	private Date deliveryDate;// 交货日期

	private BigDecimal backNumber;// 返修品

	private BigDecimal onNumber;// 欠交合同

	private BigDecimal storeNumber;// 库存

	private BigDecimal needNumber;// 需定量

	private String productId;// 产品ID

	private String productCode;// 产品代号

	private String materialQuotaType;// 材料定额类型：1-材料定额表(T_MaterialQuota)；2-清册明细表(T_inventory)

	private BigDecimal noCheck; // 无待检

	private BigDecimal noExpend; // 无预计消耗

	private BigDecimal operable; // 有无合用

	private BigDecimal currentDelivery;//本年交付数
	
	private BigDecimal resolve_number;
	
	//d.approvalperson d.requiredemartment
	private String approvalperson;
	private String requiredemartment;
	

	
	// 乐观锁实现
	private int optLock;

	// 以下为非持久化字段
	private String planActualnumber;//建议采购数量
	
	private String materialItemName;// 物料名称

	private String desingnation;// 物料牌号

	private String materialStandard;// 物料规格

	private String technicCondition;// 技术条件

	private String demension;// 量纲

	private BigDecimal totalRequired;// 需求总量

	private BigDecimal materialCount;// 物料使用数量

	private String remark;// 材料定额备注

	private String buinessPlanId;// 年度计划ID
	private String reIds;// 更新列表的辅助参数，id字符串
	private String newProcessType;// 1为年度，2为零星
	private String vendorName;// 供应商名称
	private String requestCode;// 需求编号
	private String materialitemcode;
	private String deliveryCount;// 交付数量
	private String note;
	private BigDecimal subtotal;// 小计
	private BigDecimal contract;// 合同
	private BigDecimal number_applications;// 申请数量
	private BigDecimal amount_applications;// 申请金额
	private BigDecimal subtotal_number;// 小计数据
	private BigDecimal subtotal_amount;// 小计金额
	private BigDecimal super_storage;// 超储
	private BigDecimal redeployment;// 外调
	private BigDecimal last_year_consume;// 上年消耗
	private BigDecimal half_year_consume;// 下半年消耗
	private BigDecimal year_inventory;// 年末库存
	private BigDecimal gap_number;// 下半年缺口数
	private BigDecimal reserve;//储备量
	
	private String oldquantity;
	private String changer;
	private String changtime;
	private String changreson;
	
	private String status;//生成状态:null未提交(默认);0未生成;1已生成
	
	private String usedate;//需用时间
	
	private String deliveryStatus;//物资交货状态
	
	@Transient
	public String getUsedate() {
		return usedate;
	}




	public void setUsedate(String usedate) {
		this.usedate = usedate;
	}




	public String getStatus() {
		return status;
	}




	public void setStatus(String status) {
		this.status = status;
	}




	public BigDecimal getReserve() {
		return reserve;
	}

	
	
	
	public String getDeclare_detil_id() {
		return declare_detil_id;
	}




	public void setDeclare_detil_id(String declareDetilId) {
		declare_detil_id = declareDetilId;
	}




	public void setReserve(BigDecimal reserve) {
		this.reserve = reserve;
	}

	public BigDecimal getLast_year_consume() {
		return last_year_consume;
	}

	public void setLast_year_consume(BigDecimal lastYearConsume) {
		last_year_consume = lastYearConsume;
	}

	public BigDecimal getHalf_year_consume() {
		return half_year_consume;
	}

	public void setHalf_year_consume(BigDecimal halfYearConsume) {
		half_year_consume = halfYearConsume;
	}

	public BigDecimal getYear_inventory() {
		return year_inventory;
	}

	public void setYear_inventory(BigDecimal yearInventory) {
		year_inventory = yearInventory;
	}

	public BigDecimal getGap_number() {
		return gap_number;
	}

	public void setGap_number(BigDecimal gapNumber) {
		gap_number = gapNumber;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	public BigDecimal getContract() {
		return contract;
	}

	public void setContract(BigDecimal contract) {
		this.contract = contract;
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

	public void setDeliveryCount(String deliveryCount) {
		this.deliveryCount = deliveryCount;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Transient
	public String getDeliveryCount() {
		return deliveryCount;
	}

	public void setDeliverycount(String deliveryCount) {
		this.deliveryCount = deliveryCount;
	}

	@Transient
	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	public ProcurementDetail() {
	}

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProcurementDetailId() {
		return procurementDetailId;
	}

	public void setProcurementDetailId(String procurementDetailId) {
		this.procurementDetailId = procurementDetailId;
	}

	@Version
	public int getOptLock() {
		return optLock;
	}

	public void setOptLock(int optLock) {
		this.optLock = optLock;
	}

	public String getBuinessPlanDetailsId() {
		return buinessPlanDetailsId;
	}

	public void setBuinessPlanDetailsId(String buinessPlanDetailsId) {
		this.buinessPlanDetailsId = buinessPlanDetailsId;
	}

	public String getMaterialQuotaId() {
		return materialQuotaId;
	}

	public void setMaterialQuotaId(String materialQuotaId) {
		this.materialQuotaId = materialQuotaId;
	}

	public String getMaterialTypeName() {
		return materialTypeName;
	}

	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public BigDecimal getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(BigDecimal materialCounts) {
		this.materialCounts = materialCounts;
	}

	public String getPurchaseType() {
		return purchaseType;
	}

	public void setPurchaseType(String purchaseType) {
		this.purchaseType = purchaseType;
	}

	public String getProcurementId() {
		return procurementId;
	}

	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}

	public BigDecimal getActualNumber() {
		return actualNumber;
	}

	public void setActualNumber(BigDecimal actualNumber) {
		this.actualNumber = actualNumber;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public BigDecimal getBackNumber() {
		return backNumber;
	}

	public void setBackNumber(BigDecimal backNumber) {
		this.backNumber = backNumber;
	}

	public BigDecimal getOnNumber() {
		return onNumber;
	}

	public void setOnNumber(BigDecimal onNumber) {
		this.onNumber = onNumber;
	}

	public BigDecimal getStoreNumber() {
		return storeNumber;
	}

	public void setStoreNumber(BigDecimal storeNumber) {
		this.storeNumber = storeNumber;
	}

	public BigDecimal getNeedNumber() {
		return needNumber;
	}

	public void setNeedNumber(BigDecimal needNumber) {
		this.needNumber = needNumber;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getMaterialQuotaType() {
		return materialQuotaType;
	}

	public void setMaterialQuotaType(String materialQuotaType) {
		this.materialQuotaType = materialQuotaType;
	}

	public BigDecimal getCurrentDelivery() {
		return currentDelivery;
	}




	public void setCurrentDelivery(BigDecimal currentDelivery) {
		this.currentDelivery = currentDelivery;
	}

	
	
	public BigDecimal getResolve_number() {
		return resolve_number;
	}




	public void setResolve_number(BigDecimal resolveNumber) {
		resolve_number = resolveNumber;
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
	public BigDecimal getTotalRequired() {
		return totalRequired;
	}

	public void setTotalRequired(BigDecimal totalRequired) {
		this.totalRequired = totalRequired;
	}

	@Transient
	public BigDecimal getMaterialCount() {
		return materialCount;
	}

	public void setMaterialCount(BigDecimal materialCount) {
		this.materialCount = materialCount;
	}

	@Transient
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Transient
	public String getBuinessPlanId() {
		return buinessPlanId;
	}

	public void setBuinessPlanId(String buinessPlanId) {
		this.buinessPlanId = buinessPlanId;
	}

	@Transient
	public String getReIds() {
		return reIds;
	}

	public void setReIds(String reIds) {
		this.reIds = reIds;
	}

	@Transient
	public String getNewProcessType() {
		return newProcessType;
	}

	public void setNewProcessType(String newProcessType) {
		this.newProcessType = newProcessType;
	}

	@Transient
	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	@Transient
	public String getRequestCode() {
		return requestCode;
	}

	public void setRequestCode(String requestCode) {
		this.requestCode = requestCode;
	}

	public BigDecimal getNoCheck() {
		return noCheck;
	}

	public void setNoCheck(BigDecimal noCheck) {
		this.noCheck = noCheck;
	}

	public BigDecimal getNoExpend() {
		return noExpend;
	}

	public void setNoExpend(BigDecimal noExpend) {
		this.noExpend = noExpend;
	}

	public BigDecimal getOperable() {
		return operable;
	}

	public void setOperable(BigDecimal operable) {
		this.operable = operable;
	}

	public BigDecimal getOther() {
		return other;
	}

	public void setOther(BigDecimal other) {
		this.other = other;
	} 
 
	public String getJX() {
		return JX;
	}

	public void setJX(String jX) {
		JX = jX;
	}

	public String getQSJH() {
		return QSJH;
	}

	public void setQSJH(String qSJH) {
		QSJH = qSJH;
	}

	public String getZZJH() {
		return ZZJH;
	}

	public void setZZJH(String zZJH) {
		ZZJH = zZJH;
	}

	public String getCLDM() {
		return CLDM;
	}

	public void setCLDM(String cLDM) {
		CLDM = cLDM;
	}




	public String getApprovalperson() {
		return approvalperson;
	}




	public void setApprovalperson(String approvalperson) {
		this.approvalperson = approvalperson;
	}




	public String getRequiredemartment() {
		return requiredemartment;
	}




	public void setRequiredemartment(String requiredemartment) {
		this.requiredemartment = requiredemartment;
	}



	@Transient
	public String getOldquantity() {
		return oldquantity;
	}

	public void setOldquantity(String oldquantity) {
		this.oldquantity = oldquantity;
	}

	@Transient
	public String getChanger() {
		return changer;
	}

	public void setChanger(String changer) {
		this.changer = changer;
	}

	@Transient
	public String getChangtime() {
		return changtime;
	}

	public void setChangtime(String changtime) {
		this.changtime = changtime;
	}

	@Transient
	public String getChangreson() {
		return changreson;
	}

	public void setChangreson(String changreson) {
		this.changreson = changreson;
	}



	@Transient
	public String getPlanActualnumber() {
		return planActualnumber;
	}




	public void setPlanActualnumber(String planActualnumber) {
		this.planActualnumber = planActualnumber;
	}



	@Transient
	public String getDeliveryStatus() {
		return deliveryStatus;
	}




	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}


 
	
	
}