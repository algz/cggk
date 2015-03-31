
package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 *  申报计划明细
 * @author fanzhihui
 *
 */

@Entity
@Table(name = "T_DECLAREPLAN_DETIL")
public class DeclarePlanDetil {

	private String declarePlanDetilId;//申报计划表ID
	private String declareDetilId;//申报记录表ID
	private String declarePlanId;//申报计划ID
	private String status;//状态:1已生成，2审批中，3已审批，4已生成采购计划
	
	@Id
	@Column(name = "DECLAREPLAN_DETIL_ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getDeclarePlanDetilId() {
		return declarePlanDetilId;
	}
	public void setDeclarePlanDetilId(String declarePlanDetilId) {
		this.declarePlanDetilId = declarePlanDetilId;
	}
	
	@Column(name = "DECLARE_DETIL_ID")
	public String getDeclareDetilId() {
		return declareDetilId;
	}
	public void setDeclareDetilId(String declareDetilId) {
		this.declareDetilId = declareDetilId;
	}
	
	@Column(name = "DECLAREPLAN_ID")
	public String getDeclarePlanId() {
		return declarePlanId;
	}
	public void setDeclarePlanId(String declarePlanId) {
		this.declarePlanId = declarePlanId;
	}
	
	@Column(name = "STATUS")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
