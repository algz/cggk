package com.sysware.customize.hd.investment.procurementExecute.contract.vo;

public class TenderVo {
	private String tender_id;
	private String tender_code;
	private String tender_name;
	private String tender_department;
	private String tender_type;
	private String status;
	private String createdate;

	private String flag; // is checked

	public String getTender_id() {
		return tender_id;
	}

	public void setTender_id(String tenderId) {
		tender_id = tenderId;
	}

	public String getTender_code() {
		return tender_code;
	}

	public void setTender_code(String tenderCode) {
		tender_code = tenderCode;
	}

	public String getTender_name() {
		return tender_name;
	}

	public void setTender_name(String tenderName) {
		tender_name = tenderName;
	}

	public String getTender_department() {
		return tender_department;
	}

	public void setTender_department(String tenderDepartment) {
		tender_department = tenderDepartment;
	}

	public String getTender_type() {
		return tender_type;
	}

	public void setTender_type(String tenderType) {
		tender_type = tenderType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedate() {
		return createdate;
	}

	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

}
