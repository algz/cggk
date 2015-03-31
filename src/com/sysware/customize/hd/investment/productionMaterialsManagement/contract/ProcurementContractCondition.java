package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

/**
 * 采购合同查询条件
 * 
 * @author tianlin
 * @create 2011-06-11
 */
public class ProcurementContractCondition {
	
	private String createType;// 合同类型 1 直接生成 2 比价 3 招投标	
	private String materialType;
	private Long userId;
    private String applicationStatus;
 

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	private int start;// 起始行号
	private int limit;// 每页行数
	private int count;//总数
	
	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getCreateType() {
		return createType;
	}

	public void setCreateType(String createType) {
		this.createType = createType;
	}

	public String getMaterialType() {
		return materialType;
	}

	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

}
