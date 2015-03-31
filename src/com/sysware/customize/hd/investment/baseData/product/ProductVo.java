package com.sysware.customize.hd.investment.baseData.product;

/**
 * 产品Vo
 * 
 * @author mengl
 * @version 1.0
 * @created 16-五月-2011 13:56:59
 */
public class ProductVo {
	/**
	 * 唯一标识。
	 */
	private String productid;
	/**
	 * 产品批次。
	 */
	private String batchno;
	/**
	 * 产品代号。
	 */
	private String productcode;
	/**
	 * 产品名称。
	 */
	private String productname;
	/**
	 * 备注。
	 */
	private String remarks;
	/**
	 * 父节点号。
	 */
	private String parentid;
	/**
	 * 是否叶子节点。
	 */
	private String leaf;

	private String startId;// 开始列表参数（父Id）

	private String searchname;// 名称查询条件

	private int start;// 分页开始
	private int limit;// 分页条数
	private Integer count;//总数
	
	
	
	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getSearchname() {
		return searchname;
	}

	public void setSearchname(String searchname) {
		this.searchname = searchname;
	}

	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
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

	public String getBatchno() {
		return batchno;
	}

	public void setBatchno(String batchno) {
		this.batchno = batchno;
	}

	public String getProductcode() {
		return productcode;
	}

	public void setProductcode(String productcode) {
		this.productcode = productcode;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

}
