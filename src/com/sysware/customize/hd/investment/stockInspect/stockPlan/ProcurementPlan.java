package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 采购计划实体
 * @author zhoup
 *
 */
@Entity
@Table(name="T_PROCUREMENTPLAN")
public class ProcurementPlan {

	private String procurementplan_id;
	//采购计划名称
	private String procurementplan_name;
	//采购计划编号
	private String procurementplan_code;
	//项数
	private long procurementplan_quantity;
	//金额
	private BigDecimal amount;
	//编制人
	private String editer;
	//编制时间（批准时间）
	private Date editdate;
	//送审时间
	private Date senddate;
	//计划类型。1固定资产计划2其他计划。 固定资产计划（1，土建及设备大修2，机电设备3车辆 ）
	private String plantype;
	//状态:0未编制;1编制中;2审批中;3已审批
	private String status;
	
	@Id
	@Column(name="PROCUREMENTPLAN_ID",unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProcurementplan_id() {
		return procurementplan_id;
	}
	public void setProcurementplan_id(String procurementplanId) {
		procurementplan_id = procurementplanId;
	}
	
	@Column(name="PROCUREMENTPLAN_NAME")
	public String getProcurementplan_name() {
		return procurementplan_name;
	}
	public void setProcurementplan_name(String procurementplanName) {
		procurementplan_name = procurementplanName;
	}
	
	@Column(name="PROCUREMENTPLAN_CODE")
	public String getProcurementplan_code() {
		return procurementplan_code;
	}
	public void setProcurementplan_code(String procurementplanCode) {
		procurementplan_code = procurementplanCode;
	}
	
	@Column(name="PROCUREMENTPLAN_QUANTITY")
	public long getProcurementplan_quantity() {
		return procurementplan_quantity;
	}
	public void setProcurementplan_quantity(long procurementplanQuantity) {
		procurementplan_quantity = procurementplanQuantity;
	}
	
	@Column(name="AMOUNT")
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	@Column(name="EDITER")
	public String getEditer() {
		return editer;
	}
	public void setEditer(String editer) {
		this.editer = editer;
	}
	
	@Column(name="EDITDATE")
	public Date getEditdate() {
		return editdate;
	}
	public void setEditdate(Date editdate) {
		this.editdate = editdate;
	}
	
	@Column(name="SENDDATE")
	public Date getSenddate() {
		return senddate;
	}
	public void setSenddate(Date senddate) {
		this.senddate = senddate;
	}
	
	@Column(name="PLANTYPE")
	public String getPlantype() {
		return plantype;
	}
	public void setPlantype(String plantype) {
		this.plantype = plantype;
	}
	
	@Column(name="STATUS")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
}
