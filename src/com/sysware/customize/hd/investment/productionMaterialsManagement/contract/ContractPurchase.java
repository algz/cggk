package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 采购清单-采购合同-关联对象
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-13
 */
@Entity
@Table(name = "T_ProcurementContract_Purchase")
public class ContractPurchase implements Serializable{

	private static final long serialVersionUID = -1210063534093855446L;
	
	String id; // 关联ID
	String purchaseId;// 采购清单ID
	String procurementContractId;// 采购合同ID
	String materialId;// 物料ID
	String parityId;//采购策略表ID

	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getProcurementContractId() {
		return procurementContractId;
	}

	public void setProcurementContractId(String procurementContractId) {
		this.procurementContractId = procurementContractId;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getParityId() {
		return parityId;
	}

	public void setParityId(String parityId) {
		this.parityId = parityId;
	}

}
