package com.sysware.customize.hd.investment.procurementExecute.tenderUnits;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_Tender_Units")
public class TenderUnits {
	private String tenderUnitsID;// 主键
	private String tenderFileId;// 招标文件子表ID
	private String venderId;// 供应商ID
	private BigDecimal price;//价格
	private String remark;//备注
	private String constructionUnderPoint;//承建下浮点
    @Column(name="ConstructionUnderPoint")
	public String getConstructionUnderPoint() {
		return constructionUnderPoint;
	}

	public void setConstructionUnderPoint(String constructionUnderPoint) {
		this.constructionUnderPoint = constructionUnderPoint;
	}

	@Id
	@Column(name = "Tender_Units_ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getTenderUnitsID() {
		return tenderUnitsID;
	}

	public void setTenderUnitsID(String tenderUnitsID) {
		this.tenderUnitsID = tenderUnitsID;
	}
	@Column(name = "tender_file_Id")
	public String getTenderFileId() {
		return tenderFileId;
	}

	public void setTenderFileId(String tenderFileId) {
		this.tenderFileId = tenderFileId;
	}
	@Column(name = "vender_Id")
	public String getVenderId() {
		return venderId;
	}

	public void setVenderId(String venderId) {
		this.venderId = venderId;
	}
	@Column(name = "price")
	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	@Column(name = "remark")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
