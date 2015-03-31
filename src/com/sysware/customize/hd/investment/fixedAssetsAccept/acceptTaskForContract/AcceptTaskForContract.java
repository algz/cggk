package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTaskForContract;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="t_acceptTask_contract")
public class AcceptTaskForContract {

	private String acId;
	private String acceptNum;
	private String contractId;
	
	@Id
	@Column(name="acId",unique=true,nullable=false)
//	@GeneratedValue(generator="myUd")
//	@GenericGenerator(name="myUd",strategy="assigned")
	public String getAcId() {
		return acId;
	}
	public void setAcId(String acId) {
		this.acId = acId;
	}
	
	@Column(name="acceptNum")
	public String getAcceptNum() {
		return acceptNum;
	}
	public void setAcceptNum(String acceptNum) {
		this.acceptNum = acceptNum;
	}
	
	@Column(name="contractId")
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
}
