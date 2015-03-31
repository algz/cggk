package com.sysware.customize.hd.investment.procurementExecute.tender;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
/**
 * 招标与采购子项对应关系
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-10-24
 * 
 */
@Entity
@Table(name = "T_tender_procurement_detil")
public class TenderProcurementDetil {
    private String  TenderProcurementdetilID;//唯一标识
    private String  procurementPlanDetilID;//采购计划详细ID
    private String  procurementPlanDetilName;// 采购计划详细名称
    private String  tenderID;//标书ID
    @Id
	@Column(name = "tender_procurementdetil_ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getTenderProcurementdetilID() {
		return TenderProcurementdetilID;
	}
	public void setTenderProcurementdetilID(String tenderProcurementdetilID) {
		TenderProcurementdetilID = tenderProcurementdetilID;
	}
	@Column(name = "ProcurementPlan_detil_ID")
	public String getProcurementPlanDetilID() {
		return procurementPlanDetilID;
	}
	public void setProcurementPlanDetilID(String procurementPlanDetilID) {
		this.procurementPlanDetilID = procurementPlanDetilID;
	}
	@Column(name = "ProcurementPlan_detil_name")
	public String getProcurementPlanDetilName() {
		return procurementPlanDetilName;
	}
	public void setProcurementPlanDetilName(String procurementPlanDetilName) {
		this.procurementPlanDetilName = procurementPlanDetilName;
	}
	@Column(name="tender_ID")
	public String getTenderID() {
		return tenderID;
	}
	public void setTenderID(String tenderID) {
		this.tenderID = tenderID;
	}
}
