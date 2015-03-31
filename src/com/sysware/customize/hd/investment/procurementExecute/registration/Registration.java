package com.sysware.customize.hd.investment.procurementExecute.registration;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.procurementExecute.admissionTest.ArrivalCheck;

/**
 * 入库登记
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
@Table(name="T_Registration")
@Entity
public class Registration {
	/**
	 * 主键id
	 */
	private String registrationId;
	/**
	 * 合同id
	 */
	private String contractId;
	/**
	 * 登记号
	 */
	private String registrationCode;
	/**
	 * 物料ID
	 */
	private String itemId;
	/**
	 * 发票号码
	 */
	private String invoiceNo;
	/**
	 * 运输日期
	 */
	private Date transportDate;
	/**
	 * 运单号
	 */
	private String transportNo;
	/**
	 * 运输数量
	 */
	private BigDecimal transportNum;
	/**
	 * 采购数量
	 */
	private BigDecimal purchaseNum;
	/**
	 * 运合格证
	 */
	private String qualifyNo;
	/**
	 * 登记人
	 */
	private String createrId;
	/**
	 * 提交日期
	 */
	private Date createDate;
	
	/**
	 * 批次号
	 */
	private String lotNo;
	/**
	 * 到货数量
	 */
	private BigDecimal arrivalNum;
	/**
	 * 到货日期
	 */
	private Date arrivalDate;
	/**
	 * 付款金额
	 */
	private BigDecimal amount;
	/**
	 * 入场价格
	 */
	private BigDecimal price;
	/**
	 * 合格数量
	 */
	private BigDecimal qualifiedNum;
	/**
	 * 生产厂商
	 */
	private String vendorName;
	/**
	 * 备注
	 */
	private String note;
	/**
	 * 
	 * 炉批号
	 */
	private String furnaceBatch;
	/**
	 * 检验类别 1金属2非金属
	 */
	private String materialType;
	
	/**
	 * 
	 * 合同编号
	 */
	private String contractCode;
	/**
	 * 
	 * 物资编号
	 */
	private String itemCode;
	/**
	 * 
	 * 合同名称
	 */
	private String contractName;
	/**
	 * 
	 * 物资名称
	 */
	private String itemName;
	
	/**
	 * 物资状态:1正常入库;2委托加工;3返修品
	 */
	private String materialstate;

	
	private Set<ArrivalCheck> arrivalCheck;
	
	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getContractName() {
		return contractName;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	/**
	 * 
	 * 是否入厂检验
	 */
	private String check_result;
	
	public String getCheck_result() {
		return check_result;
	}

	public void setCheck_result(String checkResult) {
		check_result = checkResult;
	}

	public String getMaterialType() {
		return materialType;
	}

	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}

	public String getFurnaceBatch() {
		return furnaceBatch;
	}

	public void setFurnaceBatch(String furnaceBatch) {
		this.furnaceBatch = furnaceBatch;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Column(name="Qualified_num")
	public BigDecimal getQualifiedNum() {
		return qualifiedNum;
	}

	public void setQualifiedNum(BigDecimal qualifiedNum) {
		this.qualifiedNum = qualifiedNum;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Column(name = "ARRIVAL_NUM")
	public BigDecimal getArrivalNum() {
		return arrivalNum;
	}

	public void setArrivalNum(BigDecimal arrivalNum) {
		this.arrivalNum = arrivalNum;
	}
	@Column(name = "ARRIVAL_Date")
	public Date getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	@Column(name = "lot_no")
	public String getLotNo() {
		return lotNo;
	}

	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator") 
	public String getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}
	@Column(name = "Contract_ID")
	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	@Column(name = "registration_code")
	public String getRegistrationCode() {
		return registrationCode;
	}

	public void setRegistrationCode(String registrationCode) {
		this.registrationCode = registrationCode;
	}
	@Column(name = "item_id")
	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	@Column(name = "invoice_no")
	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	 
	@Column(name = "transport_date")
	@Temporal(TemporalType.DATE)
	public Date getTransportDate() {
		return transportDate;
	}

	public void setTransportDate(Date transportDate) {
		this.transportDate = transportDate;
	}
	@Column(name = "transport_no")
	public String getTransportNo() {
		return transportNo;
	}

	public void setTransportNo(String transportNo) {
		this.transportNo = transportNo;
	}
	@Column(name = "transport_num")
	public BigDecimal getTransportNum() {
		return transportNum;
	}

	public void setTransportNum(BigDecimal transportNum) {
		this.transportNum = transportNum;
	}
	@Column(name = "purchase_num")
	public BigDecimal getPurchaseNum() {
		return purchaseNum;
	}

	public void setPurchaseNum(BigDecimal purchaseNum) {
		this.purchaseNum = purchaseNum;
	}
	@Column(name = "qualify_no")
	public String getQualifyNo() {
		return qualifyNo;
	}

	public void setQualifyNo(String qualifyNo) {
		this.qualifyNo = qualifyNo;
	}
	@Column(name = "creater_id")
	public String getCreaterId() {
		return createrId;
	}

	public void setCreaterId(String createrId) {
		this.createrId = createrId;
	}
	@Column(name = "create_date")
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(name="MATERIAL_STATE")
	public String getMaterialstate() {
		return materialstate;
	}

	public void setMaterialstate(String materialstate) {
		this.materialstate = materialstate;
	}

	@OneToMany(mappedBy = "registrationId")
	public Set<ArrivalCheck> getArrivalCheck() {
		return arrivalCheck;
	}

	public void setArrivalCheck(Set<ArrivalCheck> arrivalCheck) {
		this.arrivalCheck = arrivalCheck;
	}


	


	
	
	
	
}
