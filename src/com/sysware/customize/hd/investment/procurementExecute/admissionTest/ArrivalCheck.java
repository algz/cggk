package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Table(name = "T_Arrival_Check")
@Entity
public class ArrivalCheck {
	/**
	 * 主键ID
	 */
	private String arrivalCheckId;
	/**
	 *检验状态：0已登记；1已理化；2已检测；3已质量处理
	 *后期修改：0登记；1理化；2检测报告合格；3检测报告不合格；4意见书重检；5意见书退货；6已退货；7已入库;8意见书-降级使用
	 *新修改: 10确认登记:已确认;-10确认登记:退回;11开箱检查:合格;-11开箱检查:不合格;12请检;
	 *13表面初检;14委托试验:完成;-14委托试验:未完成;+14委托试验:无需;15取样;16送样;
	 *17试验报告;18打钢印;19分光/磨火花;20表面检查;21喷字;22油封;23入库;24不合格处理:退货;-24不合格处理:返修
	 *
	 * */
	private String checkStatus;
	/**
	 *登记表ID
	 * */
	private String registrationId;
	/**
	 *备注
	 * */
	private String  remark;
	/**
	 *取样
	 * */
	private String sampling;
	/**
	 *送样
	 * */
	private String  sendSampling;

	/**
	 *委托试验
	 * */
	private String  test;
	/**
	 *是否已经表面检查
	 * */
	private String ynCheck;
	/**
	 *是否已经清洗
	 * */
	private String ynClean; 
	/**
	 * 探伤
	 */
	private String  ynFlawDetection; 
	/**
	 *是否已经油封
	 * */
	private String ynSeal; 
	/**
	 *是否已经分光(暂不使用,已合并到磨火花)
	 * */
	private String ynSpectro; 
	/**
	 * 喷盖
	 */
	private String  ynSpray ;
	/**
	 *是否已经打钢印
	 * */
	private String ynStamped;
	/**
	 * 检测报告
	 */
	private String testReport;
	/**
	 * 理化委托
	 */
	private String physicalCommissioned;
	/**
	 * 开箱检验
	 */
	private String outCheck;
	/**
	 * 请检
	 */
	private String pleaseCheck;
	/**
	 * 表面初检
	 */
	private String oneCheck;
	/**
	 * 磨火花(修改为分光/磨火花)
	 */
	private String ynSpark;
	/**
	 * 喷字
	 */
	private String sprayWord;
	/**
	 * 不合格处理
	 */
	private String failureHandling;
	
	/**
	 * 登记确认:1已登记;2退货;
	 */
	private String ynRegistration;
	private Date ynRegistrationDate;
	private String ynRegistrationCreator;
	

	/**
	 * 说明
	 */
	private String explain;
	
	private Date outcheckDate;
	private String outcheckCreator;
	private Date pleasecheckDate;
	private String pleasecheckCreator;
	private Date onecheckDate;
	private String onecheckCreator;
	private Date samplingDate;
	private String samplingCreator;
	private Date testDate;
	private String testCreator;
	private Date sendsamplingDate;
	private String sendsamplingCreator;
	private Date testreportDate;
	private String testreportCreator;
	private Date ynStampedDate;
	private String ynStampedCreator;
	private Date ynSpectroDate;
	private String ynSpectroCreator;
	private Date ynsparkDate;
	private String ynsparkCreator;
	private Date ynCheckDate;
	private String ynCheckCreator;
	private Date spraywordDate;
	private String spraywordCreator;
	private Date ynSealDate;
	private String ynSealCreator;
	private Date failurehandlingDate;
	private String failurehandlingCreator;
	
	
	
	public String getOutCheck() {
		return outCheck;
	}

	public void setOutCheck(String outCheck) {
		this.outCheck = outCheck;
	}

	public String getPleaseCheck() {
		return pleaseCheck;
	}

	public void setPleaseCheck(String pleaseCheck) {
		this.pleaseCheck = pleaseCheck;
	}

	public String getOneCheck() {
		return oneCheck;
	}

	public void setOneCheck(String oneCheck) {
		this.oneCheck = oneCheck;
	}

	public String getYnSpark() {
		return ynSpark;
	}

	public void setYnSpark(String ynSpark) {
		this.ynSpark = ynSpark;
	}

	public String getSprayWord() {
		return sprayWord;
	}

	public void setSprayWord(String sprayWord) {
		this.sprayWord = sprayWord;
	}

	public String getFailureHandling() {
		return failureHandling;
	}

	public void setFailureHandling(String failureHandling) {
		this.failureHandling = failureHandling;
	}

	/**
	 * 意见书
	 */
	private String submissions;
	public String getSubmissions() {
		return submissions;
	}

	public void setSubmissions(String submissions) {
		this.submissions = submissions;
	}

	public String getTestReport() {
		return testReport;
	}

	public void setTestReport(String testReport) {
		this.testReport = testReport;
	}

	public String getPhysicalCommissioned() {
		return physicalCommissioned;
	}

	public void setPhysicalCommissioned(String physicalCommissioned) {
		this.physicalCommissioned = physicalCommissioned;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getArrivalCheckId() {
		return arrivalCheckId;
	}

	@Column(name = "check_status")
	public String getCheckStatus() {
		return checkStatus;
	}

	@Column(name = "registration_id")
	public String getRegistrationId() {
		return registrationId;
	}

	public String getRemark() {
		return remark;
	}

	public String getSampling() {
		return sampling;
	}
  public String getSendSampling() {
	return sendSampling;
}

	public String getTest() {
		return test;
	}
	@Column(name = "yn_Check")
	public String getYnCheck() {
		return ynCheck;
	}

	@Column(name = "yn_clean")
	public String getYnClean() {
		return ynClean;
	}

	@Column(name = "YN_FlawDetection")
		public String getYnFlawDetection() {
			return ynFlawDetection;
		}

	@Column(name = "yn_Seal")
	public String getYnSeal() {
		return ynSeal;
	}

	@Column(name = "yn_spectro")
	public String getYnSpectro() {
		return ynSpectro;
	} 
	@Column(name = "YN_Spray")
	public String getYnSpray() {
		return ynSpray;
	}

	@Column(name = "yn_stamped")
	public String getYnStamped() {
		return ynStamped;
	}

	public void setArrivalCheckId(String arrivalCheckId) {
		this.arrivalCheckId = arrivalCheckId;
	}

	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}
	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	public void setSampling(String sampling) {
		this.sampling = sampling;
	}

	public void setSendSampling(String sendSampling) {
		this.sendSampling = sendSampling;
	}
	public void setTest(String test) {
		this.test = test;
	}

	public void setYnCheck(String ynCheck) {
		this.ynCheck = ynCheck;
	}
	public void setYnClean(String ynClean) {
		this.ynClean = ynClean;
	}
	
	public void setYnFlawDetection(String ynFlawDetection) {
		this.ynFlawDetection = ynFlawDetection;
	}
	public void setYnSeal(String ynSeal) {
		this.ynSeal = ynSeal;
	}

	public void setYnSpectro(String ynSpectro) {
		this.ynSpectro = ynSpectro;
	}
	public void setYnSpray(String ynSpray) {
		this.ynSpray = ynSpray;
	}

	public void setYnStamped(String ynStamped) {
		this.ynStamped = ynStamped;
	}

	
	@Temporal(TemporalType.DATE)
	@Column(name = "OUTCHECK_DATE", length = 7)
	public Date getOutcheckDate() {
		return this.outcheckDate;
	}

	public void setOutcheckDate(Date outcheckDate) {
		this.outcheckDate = outcheckDate;
	}

	@Column(name = "OUTCHECK_CREATOR", length = 50)
	public String getOutcheckCreator() {
		return this.outcheckCreator;
	}

	public void setOutcheckCreator(String outcheckCreator) {
		this.outcheckCreator = outcheckCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PLEASECHECK_DATE", length = 7)
	public Date getPleasecheckDate() {
		return this.pleasecheckDate;
	}

	public void setPleasecheckDate(Date pleasecheckDate) {
		this.pleasecheckDate = pleasecheckDate;
	}

	@Column(name = "PLEASECHECK_CREATOR", length = 50)
	public String getPleasecheckCreator() {
		return this.pleasecheckCreator;
	}

	public void setPleasecheckCreator(String pleasecheckCreator) {
		this.pleasecheckCreator = pleasecheckCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ONECHECK_DATE", length = 7)
	public Date getOnecheckDate() {
		return this.onecheckDate;
	}

	public void setOnecheckDate(Date onecheckDate) {
		this.onecheckDate = onecheckDate;
	}

	@Column(name = "ONECHECK_CREATOR", length = 50)
	public String getOnecheckCreator() {
		return this.onecheckCreator;
	}

	public void setOnecheckCreator(String onecheckCreator) {
		this.onecheckCreator = onecheckCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SAMPLING_DATE", length = 7)
	public Date getSamplingDate() {
		return this.samplingDate;
	}

	public void setSamplingDate(Date samplingDate) {
		this.samplingDate = samplingDate;
	}

	@Column(name = "SAMPLING_CREATOR", length = 50)
	public String getSamplingCreator() {
		return this.samplingCreator;
	}

	public void setSamplingCreator(String samplingCreator) {
		this.samplingCreator = samplingCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "TEST_DATE", length = 7)
	public Date getTestDate() {
		return this.testDate;
	}

	public void setTestDate(Date testDate) {
		this.testDate = testDate;
	}

	@Column(name = "TEST_CREATOR", length = 50)
	public String getTestCreator() {
		return this.testCreator;
	}

	public void setTestCreator(String testCreator) {
		this.testCreator = testCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SENDSAMPLING_DATE", length = 7)
	public Date getSendsamplingDate() {
		return this.sendsamplingDate;
	}

	public void setSendsamplingDate(Date sendsamplingDate) {
		this.sendsamplingDate = sendsamplingDate;
	}

	@Column(name = "SENDSAMPLING_CREATOR", length = 50)
	public String getSendsamplingCreator() {
		return this.sendsamplingCreator;
	}

	public void setSendsamplingCreator(String sendsamplingCreator) {
		this.sendsamplingCreator = sendsamplingCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "TESTREPORT_DATE", length = 7)
	public Date getTestreportDate() {
		return this.testreportDate;
	}

	public void setTestreportDate(Date testreportDate) {
		this.testreportDate = testreportDate;
	}

	@Column(name = "TESTREPORT_CREATOR", length = 50)
	public String getTestreportCreator() {
		return this.testreportCreator;
	}

	public void setTestreportCreator(String testreportCreator) {
		this.testreportCreator = testreportCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "YN_STAMPED_DATE", length = 7)
	public Date getYnStampedDate() {
		return this.ynStampedDate;
	}

	public void setYnStampedDate(Date ynStampedDate) {
		this.ynStampedDate = ynStampedDate;
	}

	@Column(name = "YN_STAMPED_CREATOR", length = 50)
	public String getYnStampedCreator() {
		return this.ynStampedCreator;
	}

	public void setYnStampedCreator(String ynStampedCreator) {
		this.ynStampedCreator = ynStampedCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "YN_SPECTRO_DATE", length = 7)
	public Date getYnSpectroDate() {
		return this.ynSpectroDate;
	}

	public void setYnSpectroDate(Date ynSpectroDate) {
		this.ynSpectroDate = ynSpectroDate;
	}

	@Column(name = "YN_SPECTRO_CREATOR", length = 50)
	public String getYnSpectroCreator() {
		return this.ynSpectroCreator;
	}

	public void setYnSpectroCreator(String ynSpectroCreator) {
		this.ynSpectroCreator = ynSpectroCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "YNSPARK_DATE", length = 7)
	public Date getYnsparkDate() {
		return this.ynsparkDate;
	}

	public void setYnsparkDate(Date ynsparkDate) {
		this.ynsparkDate = ynsparkDate;
	}

	@Column(name = "YNSPARK_CREATOR", length = 50)
	public String getYnsparkCreator() {
		return this.ynsparkCreator;
	}

	public void setYnsparkCreator(String ynsparkCreator) {
		this.ynsparkCreator = ynsparkCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "YN_CHECK_DATE", length = 7)
	public Date getYnCheckDate() {
		return this.ynCheckDate;
	}

	public void setYnCheckDate(Date ynCheckDate) {
		this.ynCheckDate = ynCheckDate;
	}

	@Column(name = "YN_CHECK_CREATOR", length = 50)
	public String getYnCheckCreator() {
		return this.ynCheckCreator;
	}

	public void setYnCheckCreator(String ynCheckCreator) {
		this.ynCheckCreator = ynCheckCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SPRAYWORD_DATE", length = 7)
	public Date getSpraywordDate() {
		return this.spraywordDate;
	}

	public void setSpraywordDate(Date spraywordDate) {
		this.spraywordDate = spraywordDate;
	}

	@Column(name = "SPRAYWORD_CREATOR", length = 50)
	public String getSpraywordCreator() {
		return this.spraywordCreator;
	}

	public void setSpraywordCreator(String spraywordCreator) {
		this.spraywordCreator = spraywordCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "YN_SEAL_DATE", length = 7)
	public Date getYnSealDate() {
		return this.ynSealDate;
	}

	public void setYnSealDate(Date ynSealDate) {
		this.ynSealDate = ynSealDate;
	}

	@Column(name = "YN_SEAL_CREATOR", length = 50)
	public String getYnSealCreator() {
		return this.ynSealCreator;
	}

	public void setYnSealCreator(String ynSealCreator) {
		this.ynSealCreator = ynSealCreator;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FAILUREHANDLING_DATE", length = 7)
	public Date getFailurehandlingDate() {
		return this.failurehandlingDate;
	}

	public void setFailurehandlingDate(Date failurehandlingDate) {
		this.failurehandlingDate = failurehandlingDate;
	}

	@Column(name = "FAILUREHANDLING_CREATOR", length = 50)
	public String getFailurehandlingCreator() {
		return this.failurehandlingCreator;
	}

	public void setFailurehandlingCreator(String failurehandlingCreator) {
		this.failurehandlingCreator = failurehandlingCreator;
	}

	@Column(name="YN_REGISTRATION")
	public String getYnRegistration() {
		return ynRegistration;
	}

	public void setYnRegistration(String ynRegistration) {
		this.ynRegistration = ynRegistration;
	}

	@Column(name="YN_REGISTRATION_DATE")
	public Date getYnRegistrationDate() {
		return ynRegistrationDate;
	}

	public void setYnRegistrationDate(Date ynRegistrationDate) {
		this.ynRegistrationDate = ynRegistrationDate;
	}

	@Column(name="YN_REGISTRATION_CREATOR")
	public String getYnRegistrationCreator() {
		return ynRegistrationCreator;
	}

	public void setYnRegistrationCreator(String ynRegistrationCreator) {
		this.ynRegistrationCreator = ynRegistrationCreator;
	}

	@Column(name="EXPLAIN")
	public String getExplain() {
		return explain;
	}

	public void setExplain(String explain) {
		this.explain = explain;
	}
	
	
	
}
