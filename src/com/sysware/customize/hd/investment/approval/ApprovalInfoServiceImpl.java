package com.sysware.customize.hd.investment.approval;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
@Name("approvalInfoServiceImpl")
public class ApprovalInfoServiceImpl implements ApprovalInfoService {

	@In(value="approvalInfoDaoimpl" ,create = true)
	ApprovalInfoDao approvalInfoDaoimpl;
	
	@In(create = true)
	Identity identity; 
	 
	@Transactional
	public void save(String content,String objectId,String status) {
		ApprovalInfo info = new ApprovalInfo();
		info.setApprovalDate(new Date());
		info.setContent(content);
		info.setObjectId(objectId);
		info.setUserId(identity.getLoginUser().getUserid()+"");
		info.setStatus(status);
		approvalInfoDaoimpl.save(info);
	}
	public List<Object[]> getApprovalInfoList(ApprovalInfoVo vo) {
		return approvalInfoDaoimpl.getApprovalInfoList(vo);
	}
	public BigDecimal getApprovalInfoListCount(ApprovalInfoVo vo) {
		return approvalInfoDaoimpl.getApprovalInfoListCount(vo);
	}
	public Object[] getApprovalFlowsById(Long id) {
		
		return approvalInfoDaoimpl.getApprovalFlowsById(id);
	}
	public Object[] getSenderById(Long id) {
		return approvalInfoDaoimpl.getSenderById(id);
	}

}
