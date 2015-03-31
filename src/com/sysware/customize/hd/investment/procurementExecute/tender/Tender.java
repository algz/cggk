package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * 招标管理
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-10-24
 * 
 */
@Entity
@Table(name = "T_Tender")
public class Tender {
        private String tenderID;//标书ID
        private String tenderName;//标书名称
        private String tenderCode;//标书编号
        private String tenderType;//招标类型1招标2委托3定向采购4委托招标5自行比价
        private String tenderDepartment;//招标单位  
        private Date createDate;//日期 
        private String remark;//招标备注   
        private String procurementPlanDetilId;//招标项目Id
        private String procurementPlanDetilName;//招标项目名称
        private Long tenderFileType;//招标文件执行步骤
        private String flag;//流程是否完成0未结束1已结束
        public String getFlag() {
			return flag;
		}
		public void setFlag(String flag) {
			this.flag = flag;
		}
		@Column(name="tenderFileType")
        public Long getTenderFileType() {
			return tenderFileType;
		}
		public void setTenderFileType(Long tenderFileType) {
			this.tenderFileType = tenderFileType;
		}
		@Id
    	@Column(name = "Tender_ID", unique = true, nullable = false)
    	@GeneratedValue(generator="myGuidGenerator")
    	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
		public String getTenderID() {
			return tenderID;
		}
		public void setTenderID(String tenderID) {
			this.tenderID = tenderID;
		}
		@Column(name = "Tender_NAME")
		public String getTenderName() {
			return tenderName;
		}
		public void setTenderName(String tenderName) {
			this.tenderName = tenderName;
		}
		@Column(name = "Tender_Code")
		public String getTenderCode() {
			return tenderCode;
		}
		public void setTenderCode(String tenderCode) {
			this.tenderCode = tenderCode;
		}
		@Column(name = "Tender_TYPE")
		public String getTenderType() {
			return tenderType;
		}
		public void setTenderType(String tenderType) {
			this.tenderType = tenderType;
		}
		@Column(name = "Tender_Department")
		public String getTenderDepartment() {
			return tenderDepartment;
		}
		public void setTenderDepartment(String tenderDepartment) {
			this.tenderDepartment = tenderDepartment;
		}
	 
		@Column(name = "remark")
		public String getRemark() {
			return remark;
		}
		public void setRemark(String remark) {
			this.remark = remark;
		}
		@Temporal(TemporalType.DATE)
		@Column(name = "CreateDate")
		public Date getCreateDate() {
			return createDate;
		}
		public void setCreateDate(Date createDate) {
			this.createDate = createDate;
		}
		@Column(name = "ProcurementPlan_detil_name")
		public String getProcurementPlanDetilName() {
			return procurementPlanDetilName;
		}
		public void setProcurementPlanDetilName(String procurementPlanDetilName) {
			this.procurementPlanDetilName = procurementPlanDetilName;
		}
		@Column(name = "ProcurementPlan_detil_Id")
		public String getProcurementPlanDetilId() {
			return procurementPlanDetilId;
		}
		public void setProcurementPlanDetilId(String procurementPlanDetilId) {
			this.procurementPlanDetilId = procurementPlanDetilId;
		}

}
