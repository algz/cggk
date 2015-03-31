package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectModel;

@Entity
@Table(name = "TB_CIVILREGIST")
public class CivilRegist implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8853206103007734822L;
	// Fields
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
//	项目名称
	@Column(name = "PROJECTNAME")
	private String projectname;
//	建设性质
	@Column(name = "CONSTRUCTIONTYPE")
	private String constructiontype;
//	数量
	@Column(name = "NUMS")
	private String nums;
//	数量单位
	@Column(name = "NUMSUNIT")
	private String numsunit;
//	投资概算
	@Column(name = "INVESTMENTBUDGET")
	private BigDecimal investmentbudget;
//	资金单位
	@Column(name = "FINANCEUNIT")
	private String financeunit;
//	施工地点
	@Column(name = "CONSTRUCTIONSITE")
	private String constructionsite;
//	交付时间
	@Column(name = "DELIVERYTIME")
	private String deliverytime;
//	使用单位
	@Column(name = "USEUNIT")
	private String useunit;
//	主要用途
	@Column(name = "MAINUSE")
	private String mainuse;
//	需求原因
	@Column(name = "DEMANDREASON")
	private String demandreason;
	
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
//	上传文件
	@Column(name = "UPLOADFILE")
	private String uploadfile;
//	进度要求
	@Column(name = "SCHEDULE")
	private String schedule;
//	总投资预算控制数
	@Column(name = "BUDGETNUM")
	private String budgetnum;
//	本年计划投资
	@Column(name = "ANNUALINVESTMENTPLAN")
	private String annualinvestmentplan;
//	资金来源
	@Column(name = "FUNDSOURCE")
	private String fundsource;
	
	@Column(name = "FUNDUNIT")
	private String fundunit;
//	项目编号
	@Column(name = "PROJECTNUM")
	private String projectnum;
//	费用编号
	@Column(name = "COSTNUM")
	private String costnum;
//	累计完成投资
	@Column(name = "TOTALINVESTMENTPLAN")
	private String totalinvestmentplan;
//	本年预算
	@Column(name = "ANNUALBUDGET")
	private String annualbudget;
//	创建时间
	@Column(name = "CREATETIME")
	private String createtime;
//	审批时间
	@Column(name = "APPROVALTIME")
	private String approvaltime;
//	上传文件id
	@Column(name = "FILEID")
	private String fileid;
//	创建人
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
//	类别
	@Column(name = "CATEGORYS")
	private String categorys;
	public String getCategorys() {
		return categorys;
	}

	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	//外键引用
	//private Set<EngineeringProjectModel> engineeringProjectModel;//工程合同表
	@OneToMany(mappedBy="civilRegist",fetch=FetchType.LAZY)
	private Set<EngineeringProjectModel> engineeringProjectModel = new HashSet<EngineeringProjectModel>();
	

	//外键引用
	/*@OneToOne(optional=false, mappedBy="civilRegist")
	private EngineeringProjectPlanModel engineeringProjectPlanModel = new EngineeringProjectPlanModel();*/

	
	
	// Constructors

	/** default constructor */
	public CivilRegist() {
	}

	/** minimal constructor */
	public CivilRegist(String id) {
		this.id = id;
	}

	/** full constructor */
	public CivilRegist(String id, String projectname,
			String constructiontype, String nums, String numsunit,
			BigDecimal investmentbudget, String financeunit,
			String constructionsite, String deliverytime, String useunit,
			String mainuse, String demandreason, String approvalstate,
			String remarke, String uploadfile, String schedule,
			String budgetnum, String annualinvestmentplan, String fundsource,
			String fundunit, String projectnum, String costnum,
			String totalinvestmentplan, String annualbudget, String createtime,
			String approvaltime) {
		this.id = id;
		this.projectname = projectname;
		this.constructiontype = constructiontype;
		this.nums = nums;
		this.numsunit = numsunit;
		this.investmentbudget = investmentbudget;
		this.financeunit = financeunit;
		this.constructionsite = constructionsite;
		this.deliverytime = deliverytime;
		this.useunit = useunit;
		this.mainuse = mainuse;
		this.demandreason = demandreason;
		this.approvalstate = approvalstate;
		this.remarke = remarke;
		this.uploadfile = uploadfile;
		this.schedule = schedule;
		this.budgetnum = budgetnum;
		this.annualinvestmentplan = annualinvestmentplan;
		this.fundsource = fundsource;
		this.fundunit = fundunit;
		this.projectnum = projectnum;
		this.costnum = costnum;
		this.totalinvestmentplan = totalinvestmentplan;
		this.annualbudget = annualbudget;
		this.createtime = createtime;
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

	public String getConstructiontype() {
		return this.constructiontype;
	}

	public void setConstructiontype(String constructiontype) {
		this.constructiontype = constructiontype;
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

	public BigDecimal getInvestmentbudget() {
		return this.investmentbudget;
	}

	public void setInvestmentbudget(BigDecimal investmentbudget) {
		this.investmentbudget = investmentbudget;
	}

	public String getFinanceunit() {
		return this.financeunit;
	}

	public void setFinanceunit(String financeunit) {
		this.financeunit = financeunit;
	}

	public String getConstructionsite() {
		return this.constructionsite;
	}

	public void setConstructionsite(String constructionsite) {
		this.constructionsite = constructionsite;
	}

	public String getDeliverytime() {
		return this.deliverytime;
	}

	public void setDeliverytime(String deliverytime) {
		this.deliverytime = deliverytime;
	}

	public String getUseunit() {
		return this.useunit;
	}

	public void setUseunit(String useunit) {
		this.useunit = useunit;
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

	public String getUploadfile() {
		return this.uploadfile;
	}

	public void setUploadfile(String uploadfile) {
		this.uploadfile = uploadfile;
	}

	public String getSchedule() {
		return this.schedule;
	}

	public void setSchedule(String schedule) {
		this.schedule = schedule;
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

	public String getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getApprovaltime() {
		return this.approvaltime;
	}

	public void setApprovaltime(String approvaltime) {
		this.approvaltime = approvaltime;
	}

	
	
	public Set<EngineeringProjectModel> getEngineeringProjectModel() {
		return engineeringProjectModel;
	}

	public void setEngineeringProjectModel(
			Set<EngineeringProjectModel> engineeringProjectModel) {
		this.engineeringProjectModel = engineeringProjectModel;
	}

	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
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

	public String getSpecialname() {
		return specialname;
	}

	public void setSpecialname(String specialname) {
		this.specialname = specialname;
	}

}
