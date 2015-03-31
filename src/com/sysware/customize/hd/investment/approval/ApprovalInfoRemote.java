package com.sysware.customize.hd.investment.approval;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

@Name("approvalInfoRemote")
public class ApprovalInfoRemote {
	@In(value = "approvalInfoServiceImpl", create = true)
	ApprovalInfoService approvalInfoServiceImpl;

	private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");

	@WebRemote
	public GridData<ApprovalInfoVo> getApprovalInfoList(ApprovalInfoVo vo) {
		GridData<ApprovalInfoVo> gridData = new GridData<ApprovalInfoVo>();
		List<Object[]> list = approvalInfoServiceImpl.getApprovalInfoList(vo);
		List<ApprovalInfoVo> ApprovalInfoVoList = new ArrayList<ApprovalInfoVo>();
		BigDecimal count = approvalInfoServiceImpl.getApprovalInfoListCount(vo); 
		gridData.setTotalProperty(count.longValue()); 
		if (list != null && list.size() > 0) {
			for (Object[] ob : list) { 
				vo = new ApprovalInfoVo();
				vo.setApprovalDate(ob[2] + "");
				vo.setApprovalInfoId(ob[0] + "");
				vo.setContent(ob[1] + "");
				vo.setUserName(ob[4] + "");
				vo.setStatus(ob[3] + "");
				ApprovalInfoVoList.add(vo);
			}
		}
		gridData.setResults(ApprovalInfoVoList);
		gridData.setSuccess(true);
		return gridData;
	}
}
