package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;





import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;

/**
 * 固定资产验收申请表
 * @author baozhizhi
 *
 */

@Entity
@Table(name = "TB_FIXEDASSETACCEPTANCEAPPLY")
public class FixedAssetAcceptanceApplyModel implements java.io.Serializable{
	
	
	private static final long serialVersionUID = 1L;

	
	@Override
	public Object clone(){ 
		FixedAssetAcceptanceApplyModel o = null; 
	try{ 
		o = (FixedAssetAcceptanceApplyModel)super.clone(); 
    }catch(CloneNotSupportedException e){ 
		e.printStackTrace(); 
    } 
		return o; 
    }
	
	
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String fixedAssetAcceptanceApplyId;//主键

	@Column(name = "CIVILREGISTID")
	private String civilregistId; //外键关联ID
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "APPLYACCEPTANCETIME")
	private Date   applyAcceptanceTime ; //申请验收时间
	
	@Column(name = "PROJECTMANAGERNAME")
	private String projectManagerName ; //项目主管
	
	@Column(name = "TEL")
	private String tel ; //联系电话
	
	@Column(name = "CONTRACTMANUFACTURERS")
	private String contractmanuFacturers ; //合同厂商
	
	@Column(name = "CONTRACTMANUFACTURERSTEL")
	private String contractmanuFacturersTel ; //联系电话
	
	@Column(name = "CONTACTPERSON")
	private String contactPerson ; //联系人
	
	@Column(name = "OPINION")
	private String opinion ; //主管意见

	@Column(name = "STATUS")
	private String status ;//状态


	public String getFixedAssetAcceptanceApplyId() {
		return fixedAssetAcceptanceApplyId;
	}

	public void setFixedAssetAcceptanceApplyId(String fixedAssetAcceptanceApplyId) {
		this.fixedAssetAcceptanceApplyId = fixedAssetAcceptanceApplyId;
	}

	public String getCivilregistId() {
		return civilregistId;
	}

	public void setCivilregistId(String civilregistId) {
		this.civilregistId = civilregistId;
	}

	public Date getApplyAcceptanceTime() {
		return applyAcceptanceTime;
	}

	public void setApplyAcceptanceTime(Date applyAcceptanceTime) {
		this.applyAcceptanceTime = applyAcceptanceTime;
	}

	public String getProjectManagerName() {
		return projectManagerName;
	}

	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getContractmanuFacturers() {
		return contractmanuFacturers;
	}

	public void setContractmanuFacturers(String contractmanuFacturers) {
		this.contractmanuFacturers = contractmanuFacturers;
	}

	public String getContractmanuFacturersTel() {
		return contractmanuFacturersTel;
	}

	public void setContractmanuFacturersTel(String contractmanuFacturersTel) {
		this.contractmanuFacturersTel = contractmanuFacturersTel;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getOpinion() {
		return opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	
	
	
	
	
}
