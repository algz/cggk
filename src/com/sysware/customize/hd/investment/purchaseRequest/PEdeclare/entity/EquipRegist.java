package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "TB_EQUIPREGIST")
public class EquipRegist implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5573934301201464925L;

	// Fields
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
//	项目名称
	@Column(name = "PROJECTNAME")
	private String projectname;
//	参考型号
	@Column(name = "REFERENCEMODEL")
	private String referencemodel;
//	主要参数
	@Column(name = "MAINPARAM")
	private String mainparam;
//	数量
	@Column(name = "NUMS")
	private String nums;
//	数量单位
	@Column(name = "NUMSUNIT")
	private String numsunit;
//	市场价格
	@Column(name = "MARKETPRICE")
	private BigDecimal marketprice;
//	进度要求
	@Column(name = "SCHEDULE")
	private String schedule;
//	安装地点
	@Column(name = "INSTALLSITE")
	private String installsite;
//	安装条件
	@Column(name = "INSTALLCONDITION")
	private String installcondition;
//	主要用途
	@Column(name = "MAINUSE")
	private String mainuse;
//	需求原因
	@Column(name = "DEMANDREASON")
	private String demandreason;
//	上传文件
	@Column(name = "UPLOADFILE")
	private String uploadfile;
//	类别
	@Column(name = "CATEGORYS")
	private String categorys;
//	创建时间
	@Column(name = "CREATETIME")
	private String createtime;
	
	/**
	 * 审批状态:1待审批(登记) 2审批中(登记) 3登记已审批(汇总待审批) 4审批中(汇总)
	 *  5汇总已审批(投资计划待审批)6审批中(投资计划) 7已完成(投资计划) 
	 *  -1已退回(登记) -3已退回(汇总) -5已退回(投资计划)
	 */
	@Column(name = "APPROVALSTATE")
	private String approvalstate;
//	备注
	@Column(name = "REMARKE")
	private String remarke;
//	总投资预算控制数
	@Column(name = "BUDGETNUM")
	private String budgetnum;
//	本年计划投资
	@Column(name = "ANNUALINVESTMENTPLAN")
	private String annualinvestmentplan;
//	资金来源
	@Column(name = "FUNDSOURCE")
	private String fundsource;
//	金额单位
	@Column(name = "FUNDUNIT")
	private String fundunit;
//	项目编号
	@Column(name = "PROJECTNUM")
	private String projectnum;
//	费用编号
	@Column(name = "COSTNUM")
	private String costnum;
//	投资计划
	@Column(name = "INVESTMENTPLAN")
	private String investmentplan;
//	累计完成投资计划
	@Column(name = "TOTALINVESTMENTPLAN")
	private String totalinvestmentplan;
//	本年预算
	@Column(name = "ANNUALBUDGET")
	private String annualbudget;
//	审批时间
	@Column(name = "APPROVALTIME")
	private String approvaltime;
//	使用单位
	@Column(name = "USEUNIT")
	private String useunit;
//	上传文件id
	@Column(name = "FILEID")
	private String fileid;
//	交付时间
	@Column(name = "DELIVERYTIME")
	private String deliverytime;
//	创建者
	@Column(name = "CREATEPERSON")
	private String createperson;
//	指派人
	@Column(name = "HEADPERSON")
	private String headperson;
//	指派时间
	@Column(name = "ASSIGNTIME")
	private Date assigntime;
//	专项名称
	@Column(name = "SPECIALNAME")
	private String specialname;
	// Constructors

	/** default constructor */
	public EquipRegist() {
	}

	/** minimal constructor */
	public EquipRegist(String id) {
		this.id = id;
	}

	/** full constructor */
	public EquipRegist(String id, String projectname, String referencemodel,
			String mainparam, String nums, String numsunit, BigDecimal marketprice,
			String schedule, String installsite, String installcondition,
			String mainuse, String demandreason, String categorys,
			String createtime, String approvalstate, String remarke,
			String budgetnum, String annualinvestmentplan, String fundsource,
			String fundunit, String projectnum, String costnum,
			String investmentplan, String totalinvestmentplan,
			String annualbudget, String approvaltime) {
		this.id = id;
		this.projectname = projectname;
		this.referencemodel = referencemodel;
		this.mainparam = mainparam;
		this.nums = nums;
		this.numsunit = numsunit;
		this.marketprice = marketprice;
		this.schedule = schedule;
		this.installsite = installsite;
		this.installcondition = installcondition;
		this.mainuse = mainuse;
		this.demandreason = demandreason;
		this.categorys = categorys;
		this.createtime = createtime;
		this.approvalstate = approvalstate;
		this.remarke = remarke;
		this.budgetnum = budgetnum;
		this.annualinvestmentplan = annualinvestmentplan;
		this.fundsource = fundsource;
		this.fundunit = fundunit;
		this.projectnum = projectnum;
		this.costnum = costnum;
		this.investmentplan = investmentplan;
		this.totalinvestmentplan = totalinvestmentplan;
		this.annualbudget = annualbudget;
		this.approvaltime = approvaltime;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProjectname() {
		return this.projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getReferencemodel() {
		return this.referencemodel;
	}

	public void setReferencemodel(String referencemodel) {
		this.referencemodel = referencemodel;
	}

	public String getMainparam() {
		return this.mainparam;
	}

	public void setMainparam(String mainparam) {
		this.mainparam = mainparam;
	}

	public String getNums() {
		return this.nums;
	}

	public void setNums(String nums) {
		this.nums = nums;
	}

	public String getNumsunit() {
		return this.numsunit;
	}

	public void setNumsunit(String numsunit) {
		this.numsunit = numsunit;
	}

	public BigDecimal getMarketprice() {
		return this.marketprice;
	}

	public void setMarketprice(BigDecimal marketprice) {
		this.marketprice = marketprice;
	}

	public String getSchedule() {
		return this.schedule;
	}

	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}

	public String getInstallsite() {
		return this.installsite;
	}

	public void setInstallsite(String installsite) {
		this.installsite = installsite;
	}

	public String getInstallcondition() {
		return this.installcondition;
	}

	public void setInstallcondition(String installcondition) {
		this.installcondition = installcondition;
	}

	public String getMainuse() {
		return this.mainuse;
	}

	public void setMainuse(String mainuse) {
		this.mainuse = mainuse;
	}

	public String getDemandreason() {
		return this.demandreason;
	}

	public void setDemandreason(String demandreason) {
		this.demandreason = demandreason;
	}
	
	public String getUploadfile() {
		return uploadfile;
	}

	public void setUploadfile(String uploadfile) {
		this.uploadfile = uploadfile;
	}

	public String getCategorys() {
		return this.categorys;
	}

	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}

	public String getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getApprovalstate() {
		return this.approvalstate;
	}

	public void setApprovalstate(String approvalstate) {
		this.approvalstate = approvalstate;
	}

	public String getRemarke() {
		return this.remarke;
	}

	public void setRemarke(String remarke) {
		this.remarke = remarke;
	}

	public String getBudgetnum() {
		return this.budgetnum;
	}

	public void setBudgetnum(String budgetnum) {
		this.budgetnum = budgetnum;
	}

	public String getAnnualinvestmentplan() {
		return this.annualinvestmentplan;
	}

	public void setAnnualinvestmentplan(String annualinvestmentplan) {
		this.annualinvestmentplan = annualinvestmentplan;
	}

	public String getFundsource() {
		return this.fundsource;
	}

	public void setFundsource(String fundsource) {
		this.fundsource = fundsource;
	}

	public String getFundunit() {
		return this.fundunit;
	}

	public void setFundunit(String fundunit) {
		this.fundunit = fundunit;
	}

	public String getProjectnum() {
		return this.projectnum;
	}

	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}

	public String getCostnum() {
		return this.costnum;
	}

	public void setCostnum(String costnum) {
		this.costnum = costnum;
	}

	public String getInvestmentplan() {
		return this.investmentplan;
	}

	public void setInvestmentplan(String investmentplan) {
		this.investmentplan = investmentplan;
	}

	public String getTotalinvestmentplan() {
		return this.totalinvestmentplan;
	}

	public void setTotalinvestmentplan(String totalinvestmentplan) {
		this.totalinvestmentplan = totalinvestmentplan;
	}

	public String getAnnualbudget() {
		return this.annualbudget;
	}

	public void setAnnualbudget(String annualbudget) {
		this.annualbudget = annualbudget;
	}

	public String getApprovaltime() {
		return this.approvaltime;
	}

	public void setApprovaltime(String approvaltime) {
		this.approvaltime = approvaltime;
	}

	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
	}

	public String getDeliverytime() {
		return deliverytime;
	}

	public void setDeliverytime(String deliverytime) {
		this.deliverytime = deliverytime;
	}

	public String getCreateperson() {
		return createperson;
	}

	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}

	public String getHeadperson() {
		return headperson;
	}

	public void setHeadperson(String headperson) {
		this.headperson = headperson;
	}

	public Date getAssigntime() {
		return assigntime;
	}

	public void setAssigntime(Date assigntime) {
		this.assigntime = assigntime;
	}

	public String getUseunit() {
		return useunit;
	}

	public void setUseunit(String useunit) {
		this.useunit = useunit;
	}

	public String getSpecialname() {
		return specialname;
	}

	public void setSpecialname(String specialname) {
		this.specialname = specialname;
	}

}
