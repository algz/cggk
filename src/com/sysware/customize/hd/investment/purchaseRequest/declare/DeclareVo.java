package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 采购申报VO
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public class DeclareVo implements Serializable {
	private static final long serialVersionUID = 1L;
	private String declareId; // 申报记录ID
	private double amount; // 金额
	private String createDate; // 生成时间
	private String declareCode; // 编号
	private String declareDate; // 申报月份
	private String departmentId; // 采购单位
	private String editor; // 编辑人
	private String status; // 申报状态 1待审批2审批中3已审批
	private String updateDate; // 最后修改时间
	private String declare_type;//申报页签类型1所有记录2未通过
	private int start; // 起始记录
	private int limit; // 每页记录条数
	private BigDecimal count;//记录总数
    private String dir;//排序参数
    private String sort;//排序对象参数
    private String amountSource;//资金来源
    private String costNum;//费用编号
    private String quantity;//项数
    
	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public DeclareVo() {
	}

	public String getDeclareId() {
		return this.declareId;
	}

	public void setDeclareId(String declareId) {
		this.declareId = declareId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getDeclareCode() {
		return this.declareCode;
	}

	public void setDeclareCode(String declareCode) {
		this.declareCode = declareCode;
	}

	public String getDeclareDate() {
		return this.declareDate;
	}

	public void setDeclareDate(String declareDate) {
		this.declareDate = declareDate;
	}

	public String getDepartmentId() {
		return this.departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getEditor() {
		return this.editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
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

	public String getDeclare_type() {
		return declare_type;
	}

	public void setDeclare_type(String declareType) {
		declare_type = declareType;
	}

	public String getAmountSource() {
		return amountSource;
	}

	public void setAmountSource(String amountSource) {
		this.amountSource = amountSource;
	}

	public String getCostNum() {
		return costNum;
	}

	public void setCostNum(String costNum) {
		this.costNum = costNum;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getCount() {
		return count;
	}

	public void setCount(BigDecimal count) {
		this.count = count;
	}

	
	
}