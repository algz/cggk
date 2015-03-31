package com.sysware.customize.hd.investment.baseData.vendorAppraisal;
/** 
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name="T_Appraisal_Detail")
public class AppraisalDetail implements Serializable {
	/**
	 * 主键ID
	 */
   private String appraisalDetailId;
   
   /**
	 * 考核主键Id
	 */
   private String vendorAppraisalId;
   
   /**
	 * 分值
	 */
   private BigDecimal score;
   
  /**
	 * 评分部门ID
	 */
   private String appraisalDeptId;
   /**
	 * 评分人ID
	 */
   private String appraisaler;
   /**
	 * 评分时间
	 */
  private Date appraisalDate;
  
   @Id
	@Column(name = "ID",unique=true, nullable=false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
   public String getAppraisalDetailId() {
	return appraisalDetailId;
   }
	public void setAppraisalDetailId(String appraisalDetailId) {
		this.appraisalDetailId = appraisalDetailId;
	}
	@Column(name = "appraisal_id")
	public String getVendorAppraisalId() {
		return vendorAppraisalId;
	}
	public void setVendorAppraisalId(String vendorAppraisalId) {
		this.vendorAppraisalId = vendorAppraisalId;
	}
	@Column(name = "score")
	public BigDecimal getScore() {
		return score;
	}
	public void setScore(BigDecimal score) {
		this.score = score;
	}
	@Column(name = "appraisal_dept_id")
	public String getAppraisalDeptId() {
		return appraisalDeptId;
	}
	public void setAppraisalDeptId(String appraisalDeptId) {
		this.appraisalDeptId = appraisalDeptId;
	}
	@Column(name = "appraisaler")
	public String getAppraisaler() {
		return appraisaler;
	}
	public void setAppraisaler(String appraisaler) {
		this.appraisaler = appraisaler;
	}
	@Column(name = "appraisal_date")
	@Temporal(TemporalType.DATE)
	public Date getAppraisalDate() {
		return appraisalDate;
	}
	public void setAppraisalDate(Date appraisalDate) {
		this.appraisalDate = appraisalDate;
	} 
}
