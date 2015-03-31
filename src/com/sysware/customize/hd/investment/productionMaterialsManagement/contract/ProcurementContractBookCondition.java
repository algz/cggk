package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

/**
 * 合同台账查询条件
 * 
 * @author tianlin
 * @create 2011-06-11
 */
public class ProcurementContractBookCondition {
	
	private String mainMaterialName;// 主要产品
	private String contractCode;// 合同编号
	private String vendName;// 签订单位
	private Long userId;// 用户ID

	private int start;// 起始行号
	private int limit;// 每页行数
	
	public String getMainMaterialName() {
		return mainMaterialName;
	}

	public void setMainMaterialName(String mainMaterialName) {
		this.mainMaterialName = mainMaterialName;
	}

	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public String getVendName() {
		return vendName;
	}

	public void setVendName(String vendName) {
		this.vendName = vendName;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public Long getUserId(){
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
