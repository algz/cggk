package com.sysware.customize.hd.investment.baseData.vendorAppraisal;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
@Name("vendorAppraisalServiceImpl")
public class VendorAppraisalServiceImpl implements VendorAppraisalService {
	@In(value = "vendorAppraisalDaoImpl", create = true)
	VendorAppraisalDao vendorAppraisalDao;
	public List<Object[]> getVendorAppraisalList(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getVendorAppraisalList(vo);
	}
	public List<Object[]> getDepartmentList(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getDepartmentList(vo);
	}
	public BigDecimal getDepartmentListCount(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getDepartmentListCount(vo);
	}
	@Transactional
	public void savevendorAppraisal(String vendorAppraisalId,
			String appraisalNo, String appraisalName, String vendorId,
			String[] departId,String[] appraisaler,String[] appraisalDetailId,String[] appraisalScore,String userId,String examiner) {
		vendorAppraisalDao.savevendorAppraisal(vendorAppraisalId, appraisalNo, appraisalName, vendorId, departId, appraisaler, appraisalDetailId,appraisalScore, userId,examiner);
	}
	public List<Object[]> getUserList(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getUserList(vo);
	}
	public BigDecimal getUserListCount(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getUserListCount(vo);
	}
	public BigDecimal getVendorAppraisalListCount(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getVendorAppraisalListCount(vo);
	}
	public List<Object[]> getVendorAppraisalDepartment(VendorAppraisalVo vo) {
		return vendorAppraisalDao.getVendorAppraisalDepartment(vo);
	}
	
	/**
	 * 提交考评信息
	 */
	@Transactional
	public void updatevendorAppraisal(String vendorAppraisalId,
			String appraisalComment, char appraisalStatus) {
		VendorAppraisal vendorAppraisal =  vendorAppraisalDao.get(vendorAppraisalId);
		vendorAppraisal.setAppraisalComment(appraisalComment);//修改意见
		vendorAppraisal.setAppraisalStatus(appraisalStatus);//考核状态
		vendorAppraisalDao.update(vendorAppraisal);
		//更新供应商的最近考评时间
		Vendor vendor=(Vendor)this.vendorAppraisalDao.getHibernateSession().get(Vendor.class, vendorAppraisal.getVendorId());
		vendor.setRecentEvaluationDate(new Date());
		if(appraisalStatus=='2'){//试供
			vendor.setType("2");
		}else if(appraisalStatus=='1'){//合格
			vendor.setType("1");
		}else if(appraisalStatus=='3'){//不合格时,供应商初始化到最初状态走选评流程
			vendor.setEvaluation_status('0');//送评状态
			vendor.setType("");//类别:空串,1合格,2试供
//			vendor.setTrial_status('0');
//			String sql="UPDATE T_VENDOR v set v.EVALUATION_STATUS=0,v.TRIAL_STATUS=0,v.type='' where v.VENDORID=:id";
//			this.vendorAppraisalDao.getHibernateSession().createSQLQuery(sql).setParameter("id", vendorAppraisal.getVendorId()).executeUpdate();
		}
	}
	
	public String isPass(VendorAppraisalVo vo){
		vo.getVendorAppraisalId();
		if(vo.getIsExaminer().equals("0")){//评分检测
			String sql="select  count(*) from T_APPRAISAL_DETAIL appd where APPD.APPRAISAL_ID=:appid and APPD.SCORE is  NULL";
			BigDecimal count=(BigDecimal)vendorAppraisalDao.getHibernateSession().createSQLQuery(sql).setParameter("appid", vo.getVendorAppraisalId()).uniqueResult();
		    if(count.equals(BigDecimal.ZERO)){
		    	return "true";//没有完成
		    }else{
		    	return "false";//评分没有完成
		    }
		}else if(vo.getIsExaminer().equals("1")){//意见检测
			
		}
		return "true";
	}

}
