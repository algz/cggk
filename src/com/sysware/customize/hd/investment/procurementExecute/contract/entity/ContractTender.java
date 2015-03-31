package com.sysware.customize.hd.investment.procurementExecute.contract.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 *  合同管理主表 实体类
 *  
 *  @author LIT
 *  
 *  @date2011-10-18
 * 
 */

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_CONTRACT_TENDER")
public class ContractTender {
	private String contract_Tender_ID;
	private String tender_ID;
	private String contract_ID;
	private String tender_name;

	@Id
	@Column(name = "CONTRACT_TENDER_ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getContract_Tender_ID() {
		return contract_Tender_ID;
	}

	public void setContract_Tender_ID(String contractTenderID) {
		contract_Tender_ID = contractTenderID;
	}

	public String getTender_ID() {
		return tender_ID;
	}

	public void setTender_ID(String tenderID) {
		tender_ID = tenderID;
	}

	public String getContract_ID() {
		return contract_ID;
	}

	public void setContract_ID(String contractID) {
		contract_ID = contractID;
	}

	public String getTender_name() {
		return tender_name;
	}

	public void setTender_name(String tenderName) {
		tender_name = tenderName;
	}

}
