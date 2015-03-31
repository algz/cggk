/**
 * 
 */
package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

/**
 * 申报登记导入VO
 * 
 * @author algz
 *
 */
public class ExcelVo {
	private String contractno;//合同编号
	private String materialcode;//物料编码
	private String contractnum;//合同数量
	private String arrivalnum;//到货数量<合同数量
	private String price;//价格(单位元)
	private String amount;//金额(单位元)=合同数量*价格
	public String getContractno() {
		return contractno;
	}
	public void setContractno(String contractno) {
		this.contractno = contractno;
	}
	public String getMaterialcode() {
		return materialcode;
	}
	public void setMaterialcode(String materialcode) {
		this.materialcode = materialcode;
	}
	public String getContractnum() {
		return contractnum;
	}
	public void setContractnum(String contractnum) {
		this.contractnum = contractnum;
	}
	public String getArrivalnum() {
		return arrivalnum;
	}
	public void setArrivalnum(String arrivalnum) {
		this.arrivalnum = arrivalnum;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	
}
