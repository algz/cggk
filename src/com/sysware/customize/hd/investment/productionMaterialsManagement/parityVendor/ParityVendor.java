package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail.ParityDetail;

@Entity
@Table(name = "T_parity_vendor")
public class ParityVendor {
	
	private String parityVendorId;//比价供应商关系ID
	
	private BigDecimal price;//单价
	
	private Vendor vendor;//供应商对象
	
	private ParityDetail parityDetail;//比价详细情况记录
	
	private String vendorName;//供应商名称
	
	private String property;//企业性质
	
	private String reposal;//信用度
	
	private String phone;//联系电话
	
	private String productVentor; //生产厂商 

	@Id
	@Column(name = "PARITYVENDORID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getParityVendorId() {
		return parityVendorId;
	}

	public void setParityVendorId(String parityVendorId) {
		this.parityVendorId = parityVendorId;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	@ManyToOne
	@JoinColumn(name = "VENDORID")
	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}
	@ManyToOne
	@JoinColumn(name = "PARITYDETAILID")
	public ParityDetail getParityDetail() {
		return parityDetail;
	}

	public void setParityDetail(ParityDetail parityDetail) {
		this.parityDetail = parityDetail;
	}
	@Transient
	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	@Transient
	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}
	@Transient
	public String getReposal() {
		return reposal;
	}

	public void setReposal(String reposal) {
		this.reposal = reposal;
	}
	@Transient
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Transient
	public String getProductVentor() {
		return productVentor;
	}

	public void setProductVentor(String productVentor) {
		this.productVentor = productVentor;
	}
	
	
}
