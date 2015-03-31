package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 材料定额实体
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 2011-05-26 10:22
 */
@Entity
@Table(name="V_EUDM_CPMIS_PRODMTL_RATION")
public class MaterialQuota implements Serializable{
	
		

    /**
	 * 
	 */
	private static final long serialVersionUID = -6002146173343889398L;

	//private RegionalArticlePk ID;
	@Column(name = "JX")
	private String JX;//机型
	
	@Column(name = "QSJH")
	private String QSJH;//起始架号
	
	@Column(name = "ZZJH")
	private String ZZJH;//终止架号
	
	@Column(name = "CLDM")
	private String CLDM;//材料代码
	
	@Column(name = "CLMC")
	private String CLMC;//材料名称

	@Column(name = "CLPH")
	private String CLPH;//材料牌号
	
	@Column(name = "CLGG")
	private String CLGG;//材料规格
	
	@Column(name = "JSTJ")
	private String JSTJ;//技术条件
	
	@Column(name = "QJDE")
	private BigDecimal QJDE;//全机定额
	
	@Column(name = "QJPSDE")
	private BigDecimal QJPSDE;//全机批次定额
	
	@Column(name = "JLDWMC")
	private String JLDWMC;//技量单位名称

	@Column(name = "REMARKS")
	private BigDecimal remarks;//修改记录
	
	@Column(name = "IMPORTTIME")
	private Date importtime;//导入时间
	
	@Column(name = "MATERIALID")
	private String materialid;//物资id
	
	public String getMaterialid() {
		return materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public Date getImporttime() {
		return importtime;
	}

	public void setImporttime(Date importtime) {
		this.importtime = importtime;
	}

	public BigDecimal getRemarks() {
		return remarks;
	}

	public void setRemarks(BigDecimal remarks) {
		this.remarks = remarks;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	


//	public RegionalArticlePk getID() {
//		return ID;
//	}
//
//	public void setID(RegionalArticlePk iD) {
//		ID = iD;
//	}

	public String getJX() {
		return JX;
	}

	public void setJX(String jX) {
		JX = jX;
	}

	public String getQSJH() {
		return QSJH;
	}

	public void setQSJH(String qSJH) {
		QSJH = qSJH;
	}

	public String getZZJH() {
		return ZZJH;
	}

	public void setZZJH(String zZJH) {
		ZZJH = zZJH;
	}

	public String getCLDM() {
		return CLDM;
	}

	public void setCLDM(String cLDM) {
		CLDM = cLDM;
	}

	public String getCLMC() {
		return CLMC;
	}

	public void setCLMC(String cLMC) {
		CLMC = cLMC;
	}

	
	public String getCLPH() {
		return CLPH;
	}

	public void setCLPH(String cLPH) {
		CLPH = cLPH;
	}

	public String getCLGG() {
		return CLGG;
	}

	public void setCLGG(String cLGG) {
		CLGG = cLGG;
	}

	public String getJSTJ() {
		return JSTJ;
	}

	public void setJSTJ(String jSTJ) {
		JSTJ = jSTJ;
	}

	

	public BigDecimal getQJDE() {
		return QJDE;
	}

	public void setQJDE(BigDecimal qJDE) {
		QJDE = qJDE;
	}

	public BigDecimal getQJPSDE() {
		return QJPSDE;
	}

	public void setQJPSDE(BigDecimal qJPSDE) {
		QJPSDE = qJPSDE;
	}

	public String getJLDWMC() {
		return JLDWMC;
	}

	public void setJLDWMC(String jLDWMC) {
		JLDWMC = jLDWMC;
	}

	


//	@Embeddable
//	public class RegionalArticlePk implements Serializable { 
//		private String JX;//机型
//		private String QSJH;//起始架号
//		private String ZZJH;//终止架号
//		private String CLDM;//材料代码
//		public String getJX() {
//			return JX;
//		}
//		public void setJX(String jX) {
//			JX = jX;
//		}
//		public String getQSJH() {
//			return QSJH;
//		}
//		public void setQSJH(String qSJH) {
//			QSJH = qSJH;
//		}
//		public String getZZJH() {
//			return ZZJH;
//		}
//		public void setZZJH(String zZJH) {
//			ZZJH = zZJH;
//		}
//		public String getCLDM() {
//			return CLDM;
//		}
//		public void setCLDM(String cLDM) {
//			CLDM = cLDM;
//		}
//		
//	}

	
}


