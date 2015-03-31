package com.sysware.customize.hd.investment.investSupport.vo;

import com.sysware.customize.hd.investment.procurementExecute.tender.Tender;

/**
 * @ClassName: TenderInfoVo
 * @Description: 合同资讯中 招标信息VO类
 * 
 * @author LIT
 * @date Nov 25, 2011 3:15:15 PM
 * 
 */

public class TenderInfoVo extends Tender {

	private String supplier;
	private String checkTenderPenson;
	private String tenderFileId;
	private String tenderFileName;
	private String reviewFileId;
	private String reviewFileName;
	public String getTenderFileId() {
		return tenderFileId;
	}

	public void setTenderFileId(String tenderFileId) {
		this.tenderFileId = tenderFileId;
	}

	public String getTenderFileName() {
		return tenderFileName;
	}

	public void setTenderFileName(String tenderFileName) {
		this.tenderFileName = tenderFileName;
	}

	public String getReviewFileId() {
		return reviewFileId;
	}

	public void setReviewFileId(String reviewFileId) {
		this.reviewFileId = reviewFileId;
	}

	public String getReviewFileName() {
		return reviewFileName;
	}

	public void setReviewFileName(String reviewFileName) {
		this.reviewFileName = reviewFileName;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getCheckTenderPenson() {
		return checkTenderPenson;
	}

	public void setCheckTenderPenson(String checkTenderPenson) {
		this.checkTenderPenson = checkTenderPenson;
	}

 
}
