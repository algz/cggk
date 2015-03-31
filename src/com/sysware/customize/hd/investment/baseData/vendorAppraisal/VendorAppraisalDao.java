package com.sysware.customize.hd.investment.baseData.vendorAppraisal;
/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;

public interface VendorAppraisalDao extends GenericDAO<VendorAppraisal>{
	/**
	 * 获取供应商考核列表
	 * @param vo
	 * @return
	 */
	public List<Object[]> getVendorAppraisalList(VendorAppraisalVo vo);
	 /**
	 * 获取供应商考核列表总数
	 * @param vo
	 * @return
	 */
	BigDecimal getVendorAppraisalListCount(VendorAppraisalVo vo);
	  /**
     * 获取单位列表
     * @param vo
     * @return
     */
    List<Object[]> getDepartmentList(VendorAppraisalVo vo);
    /**
     * 获取单位列表总数
     * @param vo
     * @return
     */
    public BigDecimal getDepartmentListCount(VendorAppraisalVo vo);
    
    /**
     * 获取用户列表
     * @param vo
     * @return
     */
    List<Object[]> getUserList(VendorAppraisalVo vo);
    /**
     * 获取用列表总数
     * @param vo
     * @return
     */
    BigDecimal getUserListCount(VendorAppraisalVo vo);
    /**
     * 保存供应商考核供应商评分
     * @param vendorAppraisalId 考核Id
     * @param appraisalNo 考核编号
     * @param appraisalName 考核名称
     * @param vendorID 供应商
     * @param departId 单位信息
     * @param appraisaler 评分人
     */
	void savevendorAppraisal(String vendorAppraisalId,String appraisalNo,String appraisalName,
			String vendorID, String[] departId,String[] appraisaler,String[] appraisalDetailId,String[] appraisalScore ,String userId,String examiner);
	  /**
	 * 获取评分单位列表
	 * @param vo
	 * @return
	 */
    List<Object[]> getVendorAppraisalDepartment(VendorAppraisalVo vo);
}
