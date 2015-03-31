package com.sysware.customize.hd.investment.baseData.vendorAppraisal;

import java.math.BigDecimal;
import java.util.List;

/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
public interface VendorAppraisalService {
	/**
	 * 获取供应商考核列表
	 * @param vo
	 * @return
	 */
    List<Object[]> getVendorAppraisalList(VendorAppraisalVo vo);
    /**
	 * 获取供应商考核列表总数
	 * @param vo
	 * @return
	 */
    BigDecimal getVendorAppraisalListCount(VendorAppraisalVo vo);
    
    /**
	 * 获取评分单位列表
	 * @param vo
	 * @return
	 */
    List<Object[]> getVendorAppraisalDepartment(VendorAppraisalVo vo);
    
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
    BigDecimal getDepartmentListCount(VendorAppraisalVo vo);
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
     *  修改供应商考核供应商评分
     * @param vendorAppraisalId 考核Id 
     * @param appraisalComment 意见
     *@param  appraisalStatus 状态
     */
   void updatevendorAppraisal(String vendorAppraisalId,String appraisalComment,char appraisalStatus);
/**
 * 是否通过检测(即评分是否完成,意见是否提交)
 * @param vo
 * @return
 */
	public String isPass(VendorAppraisalVo vo);
}
