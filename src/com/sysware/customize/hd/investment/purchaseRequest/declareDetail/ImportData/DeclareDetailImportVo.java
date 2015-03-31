/**
 * 
 */
package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

/**
 * @author algz
 *
 */
public class DeclareDetailImportVo {
	private String materialcode;//物资编码
	private String loginname;//员工工号
	private String plancode;//计划编号
	private String planname;//计划名称
	private String actualnumber;//建议采购量
	private String createtime;//生成时间
	private String usedate;//需用时间
	private String remark;//备注
	private String declaredetailid;//申报记录详情ID
	
	public String getMaterialcode() {
		return materialcode;
	}
	public void setMaterialcode(String materialcode) {
		this.materialcode = materialcode;
	}
	public String getLoginname() {
		return loginname;
	}
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	public String getPlancode() {
		return plancode;
	}
	public void setPlancode(String plancode) {
		this.plancode = plancode;
	}
	public String getActualnumber() {
		return actualnumber;
	}
	public void setActualnumber(String actualnumber) {
		this.actualnumber = actualnumber;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getUsedate() {
		return usedate;
	}
	public void setUsedate(String usedate) {
		this.usedate = usedate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPlanname() {
		return planname;
	}
	public void setPlanname(String planname) {
		this.planname = planname;
	}
	
}
