package com.sysware.customize.hd.investment.baseData.vendorAppraisal;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.BeanUtils;
import com.sysware.p2m.guser.GuserService;

/**
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
@Name("vendorAppraisalRemote")
public class VendorAppraisalRemote {
	@In(value = "vendorAppraisalServiceImpl", create = true)
	VendorAppraisalService vendorAppraisalService;
	 @In(create=true)
	 Identity identity; 
	/**
	 * 获取供应商考核列表
	 * @param vo
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public GridData<VendorAppraisalVo> getGridData(VendorAppraisalVo vo) {
		GridData<VendorAppraisalVo> result = new GridData<VendorAppraisalVo>();
		List<Object[]> VendorAppraisalList =  vendorAppraisalService.getVendorAppraisalList(vo);
		List<VendorAppraisalVo> VendorAppraisalVoList = new ArrayList<VendorAppraisalVo>();
		VendorAppraisalVo vendorAppraisalVo = null;
		String userid=this.identity.getLoginUser().getUserid().toString();
		for(Object[] ob : VendorAppraisalList){
			vendorAppraisalVo = new VendorAppraisalVo();
			vendorAppraisalVo.setVendorAppraisalId(ob[0].toString());
			vendorAppraisalVo.setAppraisalName(ob[1].toString());
			vendorAppraisalVo.setAppraisalNo(ob[2].toString());
			vendorAppraisalVo.setAppraisalScore(ob[3]==null?"":ob[3].toString()); 
			vendorAppraisalVo.setAppraisalStatus(ob[4].toString());
//			if(ob[4].toString().equals("0"))
//				vendorAppraisalVo.setAppraisalStatus("未考核");
//			else if(ob[4].toString().equals("1"))
//				vendorAppraisalVo.setAppraisalStatus("合格");
//			else if(ob[4].toString().equals("2"))
//				vendorAppraisalVo.setAppraisalStatus("试供"); 
			vendorAppraisalVo.setCreater(ob[5]==null?"":ob[5].toString());
			vendorAppraisalVo.setCreateDate(ob[6]==null?"":ob[6].toString());
			vendorAppraisalVo.setAmount(ob[7]==null?"":ob[7].toString());
			vendorAppraisalVo.setCreateName(ob[8]==null?"":ob[8].toString());
			vendorAppraisalVo.setAppraisalComment(ob[9]==null?"":ob[9].toString());
			vendorAppraisalVo.setScale(ob[11]==null?"":ob[11].toString());
			vendorAppraisalVo.setBusinessScope(ob[10]==null?"":ob[10].toString());
			vendorAppraisalVo.setVendorName(ob[12]==null?"":ob[12].toString());
			vendorAppraisalVo.setVendorCode(ob[13]==null?"":ob[13].toString());
			vendorAppraisalVo.setVendorID(ob[14]==null?"":ob[14].toString());
			if(ob[15]!=null&&ob[16]!=null&&ob[15].equals(ob[16].toString())){
				vendorAppraisalVo.setIsExaminer("3");//既是评分人也是意见提交人
			}else if(ob[15]!=null&&ob[15].equals(userid)){
				vendorAppraisalVo.setIsExaminer("1");//意见提交人
			}else if(ob[16]!=null&&ob[16].equals(userid)){
				vendorAppraisalVo.setIsExaminer("0");//评分人
			}
			
			VendorAppraisalVoList.add(vendorAppraisalVo);
		}
		result.setResults(VendorAppraisalVoList);
		result.setSuccess(true);
		result.setTotalProperty(vendorAppraisalService.getVendorAppraisalListCount(vo).longValue());
		return result;
	}
	
	public GridData<VendorAppraisalVo>  getVendorAppraisalDepartmentGridData(VendorAppraisalVo vo) {
		GridData<VendorAppraisalVo> result = new GridData<VendorAppraisalVo>();
		List<Object[]> VendorAppraisalList =  vendorAppraisalService.getVendorAppraisalDepartment(vo);
		List<VendorAppraisalVo> VendorAppraisalVoList = new ArrayList<VendorAppraisalVo>();
		VendorAppraisalVo vendorAppraisalVo = null;
		for(Object[] ob : VendorAppraisalList){
			vendorAppraisalVo = new VendorAppraisalVo();
			vendorAppraisalVo.setDepartmentCode(ob[0]==null?"":ob[0].toString());
			vendorAppraisalVo.setDepartmentId(ob[1]==null?"":ob[1].toString());
			vendorAppraisalVo.setPhone(ob[3]==null?"":ob[3].toString());
			vendorAppraisalVo.setDepartmentName(ob[2]==null?"":ob[2].toString());
			vendorAppraisalVo.setAppraisalDetailId(ob[4]==null?"":ob[4].toString());
			vendorAppraisalVo.setAppraisaler(ob[6]==null?"":ob[6].toString()); 
			vendorAppraisalVo.setAppraisaleName(ob[7]==null?"":ob[7].toString()); 
			vendorAppraisalVo.setAppraisalScore(ob[5]==null?"":ob[5].toString());
			vendorAppraisalVo.setAppraisalDate(ob[8]==null?"":ob[8].toString());
			vendorAppraisalVo.setLoginId(identity.getLoginUser().getUserid().toString());
			VendorAppraisalVoList.add(vendorAppraisalVo);
		}
		result.setResults(VendorAppraisalVoList);
		result.setSuccess(true);
		result.setTotalProperty(VendorAppraisalList.size());
		return result;
	}
	/**
	 * 获取单位列表
	 * @param vo
	 * @return
	 */
	public GridData<VendorAppraisalVo> getDepartmentGridData(VendorAppraisalVo vo) {
		GridData<VendorAppraisalVo> result = new GridData<VendorAppraisalVo>();
		List<Object[]> objList =  vendorAppraisalService.getDepartmentList(vo);
		List<VendorAppraisalVo> VendorAppraisalVoList = new ArrayList<VendorAppraisalVo>();
		VendorAppraisalVo vendorAppraisalVo = null;
		for(Object ob[] : objList){
			vendorAppraisalVo = new VendorAppraisalVo();
			vendorAppraisalVo.setDepartmentCode(ob[0]==null?"":ob[0].toString());
			vendorAppraisalVo.setDepartmentId(ob[1]==null?"":ob[1].toString());
			vendorAppraisalVo.setParent(ob[4]==null?"":ob[4].toString());
			vendorAppraisalVo.setPhone(ob[3]==null?"":ob[3].toString());
			vendorAppraisalVo.setDepartmentName(ob[2]==null?"":ob[2].toString()); 
			VendorAppraisalVoList.add(vendorAppraisalVo);
		}
		result.setResults(VendorAppraisalVoList);
		result.setTotalProperty(vendorAppraisalService.getDepartmentListCount(vo).longValue());
		result.setSuccess(true);
		return result;
	}
	public  GridData<VendorAppraisalVo> getUserGridData(VendorAppraisalVo vo) {
		GridData<VendorAppraisalVo> result = new GridData<VendorAppraisalVo>();
		List<Object[]> objList =  vendorAppraisalService.getUserList(vo);
		List<VendorAppraisalVo> VendorAppraisalVoList = new ArrayList<VendorAppraisalVo>();
		VendorAppraisalVo vendorAppraisalVo = null;
		for(Object ob[] : objList){
			vendorAppraisalVo = new VendorAppraisalVo();
			vendorAppraisalVo.setAppraisaler(ob[0].toString());
			vendorAppraisalVo.setAppraisaleName(ob[1].toString()); 
			VendorAppraisalVoList.add(vendorAppraisalVo);
		}
		result.setResults(VendorAppraisalVoList);
		result.setTotalProperty(vendorAppraisalService.getUserListCount(vo).longValue());
		result.setSuccess(true);
		return result;
	}
	/**
	 * 保存供应商考核
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String savevendorAppraisal(String vendorAppraisalId,String appraisalNo,
			String appraisalName,String vendorID, String[] departId,String[] appraisaler,String[] appraisalDetailId,String[] appraisalScore,String examiner){
		Long userId = identity.getLoginUser().getUserid();
		vendorAppraisalService.savevendorAppraisal(vendorAppraisalId, appraisalNo, appraisalName, vendorID,
				departId,appraisaler,appraisalDetailId,appraisalScore,String.valueOf(userId),examiner);
		return "{success : true}";
	}
	/**
	 * 意见提交,修改供应商考核
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String updatevendorAppraisal(String vendorAppraisalId,String appraisalComment,String appraisalStatus){
//		char status = '2';//试供
//		if(appraisalStatus.equals("合格")){
//			status = '1';
//		}else if(appraisalStatus.equals("不合格")){
//			status='3';
//		}else if(appraisalStatus.equals("试供")){
//			status='2';
//		}
			
		vendorAppraisalService.updatevendorAppraisal(vendorAppraisalId, appraisalComment,appraisalStatus.charAt(0) );
		return "{success : true}";
	}
	/**
	 * 获取当前登录人需要评分信息的条数
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getAllMessages(){
		int count = 0;
		VendorAppraisalVo vo = new VendorAppraisalVo();
		if(identity!=null && identity.getLoginUser()!=null && identity.getLoginUser().getUserid()!=null){
			vo.setAppraisaler(identity.getLoginUser().getUserid().toString());
			List objList = vendorAppraisalService.getVendorAppraisalDepartment(vo);
			if(objList!=null && objList.size()!=0)
				count = objList.size();
		}
		return "{success : true,count:"+count+"}";
	}
	
	/**
	 * 是否通过检测(即评分是否完成,意见是否提交)
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String isPass(VendorAppraisalVo vo){
		String msg=this.vendorAppraisalService.isPass(vo);
		return "{success:"+msg+"}";
	}
	
	
	
	
}
