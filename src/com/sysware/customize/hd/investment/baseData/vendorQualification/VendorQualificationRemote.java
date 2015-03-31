package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.time.DateUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorCondition;
@Name("vendorQualificationRemote")
public class VendorQualificationRemote {
   
	 @In(create = true,value="vendorQualificationServiceImpl")
	 VendorQualificationService vendorQualificationServiceImpl;
	 @In(create=true)
	 Identity identity; 
	 
	 private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
	 /**
	  * 保存供应商资质
	  * @param vo 供应商资质vo
	  * @return
	 * @throws ParseException 
	  */
	 @WebRemote
	 public String save(VendorQualificationVo vo) throws ParseException{
		 VendorQualification info = new VendorQualification();
		 if(vo.getId()!=null && !vo.getId().equals("")){
			 info = vendorQualificationServiceImpl.getVendorQualification(vo.getId());
		 }else
			 info.setUserId(identity.getLoginUser().getUserid().toString());
		 info.setContent(vo.getContent());
		 info.setDeadline(vo.getDeadline());
		 info.setEditDate(new Date());
		 info.setIssuingauthority(vo.getIssuingauthority());
		 info.setLicense(vo.getLicense());
		 info.setName(vo.getName());
		 info.setNote(vo.getNote());  
		 info.setVendorId(vo.getVendorId());
		 info.setStartDate(sd.parse(vo.getStartDate()));
		 info.setEndDate(DateUtils.addMonths(info.getStartDate(), Integer.parseInt(vo.getDeadline())));
		 vendorQualificationServiceImpl.save(info);
		 return "{success :true}";
	 }
	 /**
	  * 删除供应商资质
	  * @param vo 供应商资质vo
	  * @return
	  */
	 @WebRemote
	 public String deleteVendorQualification(String[] ids){ 
		 vendorQualificationServiceImpl.delete(ids);
		 return "{success :true}";
	 }
	 /**
	  * 获取供应商资质列表
	  * @param vo 供应商资质vo
	  * @return
	  */
	 @WebRemote
	 public GridData<VendorQualificationVo> getGridData(VendorQualificationVo vo){
		 GridData<VendorQualificationVo> result = new  GridData<VendorQualificationVo>();
		 List<VendorQualification> vendorQualificationList = vendorQualificationServiceImpl.getVendorQualificationList(vo);
		 List<VendorQualificationVo> VendorQualificationVoList = new ArrayList<VendorQualificationVo>();
		 VendorQualificationVo temp = null;
		 for(VendorQualification info : vendorQualificationList){
			 temp = new  VendorQualificationVo();
			 temp.setId(info.getId());
			 temp.setContent(info.getContent());
			 temp.setDeadline(info.getDeadline());
			 temp.setIssuingauthority(info.getIssuingauthority());
			 temp.setLicense(info.getLicense());
			 temp.setName(info.getName()); 
			 temp.setNote(info.getNote());
			 temp.setVendorId(info.getVendorId());
			 temp.setStartDate(info.getStartDate()==null?"":sd.format(info.getStartDate()));
			 VendorQualificationVoList.add(temp);
		 }
		 result.setResults(VendorQualificationVoList);
		 result.setTotalProperty(vendorQualificationServiceImpl.getCount(vo));
		 return result;
	 }
	 public List getVendorQualificationList(Object obj){
			HttpServletRequest request = (HttpServletRequest) obj;
			String vendorIds = request.getParameter("vendorId");
			List objlist = new ArrayList();
	    	List<String[]> valueList = new ArrayList<String[]>();
	    	String name[] = {"名称","证书编号","内容","起始日期","有效期（月）","发证机关","备注"};
	    	VendorCondition condition = new VendorCondition();
	    	List<VendorQualification> VendorQualifications = vendorQualificationServiceImpl.getDealVendor(null, vendorIds);
	    	String values[] = null;
	    	for(VendorQualification info : VendorQualifications){
	    		values = new String[name.length];
	    		values[0] = info.getName()==null?"":info.getName();
	    		values[1] = info.getLicense()==null?"":info.getLicense();
	    		values[2] = info.getContent()==null?"":info.getContent();
	    		values[3] = info.getStartDate()==null?"":sd.format(info.getStartDate());
	    		values[4] = info.getDeadline()==null?"":info.getDeadline();
	    		values[5] = info.getIssuingauthority()==null?"":info.getIssuingauthority();
	    		values[6] = info.getNote()==null?"":info.getNote();  
	    		valueList.add(values);
	    	}
	    	objlist.add(valueList);
			objlist.add(name);
			return objlist;
	 }
}
