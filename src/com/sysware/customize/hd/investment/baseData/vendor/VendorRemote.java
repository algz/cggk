package com.sysware.customize.hd.investment.baseData.vendor;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialCondition;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.baseData.vendorMaterial.VendorMaterialService;
import com.sysware.customize.hd.investment.baseData.vendorMaterial.VendorMaterialVo;
import com.sysware.customize.hd.investment.baseData.vendorQualification.VendorQualificationService;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.p2m.guser.GuserService;
import com.sysware.util.PropertiesHelper;

/**
 * 供应商管理Remote
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:24
 */
@Name("vendor_VendorRemote")
public class VendorRemote {

	// 设置BeanUtils转换缺省值
	{
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter(null);
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	@In(create = true, value = "vendor_VendorServiceImpl")
	private VendorService vendorService;

	@In(create = true,value ="vendorQualificationServiceImpl")
	VendorQualificationService vendorQualificationServiceImpl;
	
	@In(create = true, value = "vendorMaterial_VendorMaterialServiceImpl")
	private VendorMaterialService vendorMaterialService;

	@In(create = true, value = "guser_GuserServiceImpl")
	private GuserService guserService;
	
	 @In(create=true)
	 Identity identity; 
	 
	 private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	/**
	 * 保存供应商及其与物料的关系
	 * 
	 * @param vendorVo
	 *            供应商Vo
	 * @return JSON信息
	 * @throws Exception
	 */
	@WebRemote
	public String saveVendor(VendorVo vendorVo) throws Exception {
		Vendor vendor = new Vendor();
		BeanUtils.copyProperties(vendor, vendorVo); 
		if(vendorVo.getVendorID()==null || vendorVo.getVendorID().equals("")){
			vendor.setEvaluation_status('0');
			vendor.setTrial_status('0');
			vendor.setCreate_date(new Date());
			vendor.setCreater(identity.getLoginUser().getUserid().toString());
		}
		//根据行业生成供应商编号
		vendor.setVendorCode(String.valueOf(vendorService.GetAVenderCode(vendor)));
		try {
			if (StringUtils.isEmpty(vendor.getVendorID())) {
				String[] materialIDs = {};
				String[] catalogIDs = {};
				String temp = vendorVo.getMaterialIDs();
				if (temp.length() > 1) {
					temp = temp.substring(temp.indexOf(",") + 1,
							temp.lastIndexOf(","));
					materialIDs = temp.split(",");
				}
				temp = vendorVo.getCatalogIDs();
				if (temp.length() > 1) {
					temp = temp.substring(temp.indexOf(",") + 1,
							temp.lastIndexOf(","));
					catalogIDs = temp.split(",");
				} 
				vendorService.addVendor(vendor, materialIDs, catalogIDs);
			} else {
				vendorService.saveVendor(vendor);
			}

		} catch (Exception e) {
			System.out.println(e);
			return "{success:false,msg:'" + e.getMessage() + "'}";
		}

		return "{success:true}";
	}

	/**
	 * 根据查询条件获得供应商列表
	 * 
	 * @param vendorVo
	 *            查询条件
	 * @return 符合条件的供应商列表
	 * @throws Exception
	 */
	@WebRemote
	public GridData<VendorVo> getGridDataByConditon(VendorVo vendorVo)
			throws Exception {
		GridData<VendorVo> gridData = new GridData<VendorVo>();
		VendorCondition condition = new VendorCondition();
		BeanUtils.copyProperties(condition, vendorVo);

		List<Vendor> vendors = vendorService.findVendorsByCondition(condition,"vendor");
		List<VendorVo> result = processListVendors(vendors);
		gridData.setTotalProperty(vendorService
				.countVendorsByCondition(condition));
		gridData.setResults(result);
		return gridData;
	}
    public List  getVendorInfoForExport(Object obj) throws UnsupportedEncodingException{
    	HttpServletRequest request = (HttpServletRequest) obj;
    	List objlist = new ArrayList();
    	List<String[]> valueList = new ArrayList<String[]>();
    	String name[] = {"供应商编号","供应商名称","供应商简称","经营范围","税号","账户","开户行","经营地址","电话",
    					 "传真","等级","信用度","企业性质","初评日期","复评日期","复评结果","所属行业",
    					 "email","邮编","企业法人","成立时间","注册资本","银行账户2","银行账户3","发货地址","供货资格",
    					 "規模","备注"};
    	VendorCondition condition = new VendorCondition();
    	condition.setScale(request.getParameter("scale")==null?null:new String(request.getParameter("scale").getBytes("gb2312"),"iso8859-1"));
    	condition.setVendorLevel(request.getParameter("vendorLevel")==null?null:new String(request.getParameter("vendorLevel").getBytes("gb2312"),"iso8859-1"));
    	condition.setType(request.getParameter("type")==null?null:new String(request.getParameter("type").getBytes("gb2312"),"iso8859-1"));
    	condition.setVendorName(request.getParameter("vendorName")==null?null:new String(request.getParameter("vendorName").getBytes("gb2312"),"iso8859-1"));
    	condition.setVendorCode(request.getParameter("vendorCode")==null?null:new String(request.getParameter("vendorCode").getBytes("gb2312"),"iso8859-1"));
    	List<Vendor> vendors = vendorService.findVendorsByCondition(condition,"vendorAppraisal");
    	String values[] = null;
    	for(Vendor vendor : vendors){
    		values = new String[name.length];
    		values[0] = vendor.getVendorCode()==null?"":vendor.getVendorCode();
    		values[1] = vendor.getVendorName()==null?"":vendor.getVendorName();
    		values[2] = vendor.getSimpleName()==null?"":vendor.getSimpleName();
    		values[3] = vendor.getBusinessScope()==null?"":vendor.getBusinessScope();
    		values[4] = vendor.getTaxID()==null?"":vendor.getTaxID();
    		values[5] = vendor.getAccountID()==null?"":vendor.getAccountID();
    		values[6] = vendor.getBank()==null?"":vendor.getBank();
    		values[7] = vendor.getAddress()==null?"":vendor.getAddress();
    		values[8] = vendor.getPhone()==null?"":vendor.getPhone();
    		values[9] = vendor.getFax()==null?"":vendor.getFax();
    		values[10] = vendor.getVendorLevel()==null?"":vendor.getVendorLevel();
    		values[11] = vendor.getReposal()==null?"":vendor.getReposal();
    		values[12] = vendor.getProperty()==null?"":vendor.getProperty();
    		values[13] =  vendor.getInitialEvaluationDate()==null?"":sdf.format(vendor.getInitialEvaluationDate());
    		values[14] = vendor.getReviewDate()==null?"":sdf.format(vendor.getReviewDate());
    		values[15] = vendor.getReviewResult()==null?"":vendor.getReviewResult();
    		values[16] = vendor.getSector()==null?"":vendor.getSector();
    		values[17] = vendor.getEmail()==null?"":vendor.getEmail();
    		values[18] = vendor.getZipCode()==null?"":vendor.getZipCode();
    		values[19] = vendor.getEgal()==null?"":vendor.getEgal();
    		values[20] = vendor.getSetUpDate()==null?"":sdf.format(vendor.getSetUpDate());
    		values[21] = vendor.getRegisteredCapital()==null?"":vendor.getRegisteredCapital();
    		values[22] = vendor.getBank2()==null?"":vendor.getBank2();
    		values[23] = vendor.getBank3()==null?"":vendor.getBank3();
    		values[24] = vendor.getDeliveryAddress()==null?"":vendor.getDeliveryAddress();
    		values[25] = vendor.getAvailability()==null?"":vendor.getAvailability();
    		values[26] = vendor.getScale()==null?"":vendor.getScale();
    		values[27] = vendor.getRemark()==null?"":vendor.getRemark(); 
    		valueList.add(values);
    	}
    	objlist.add(valueList);
		objlist.add(name);
		return objlist;
    }
	/**
	 * 根据物料种类或物料获得供应商列表
	 * 
	 * @param vendorVo
	 *            供应商Vo
	 * @return 符合条件的供应商列表
	 */
	@WebRemote
	public GridData<VendorVo> getGridData(VendorVo vendorVo) {
		GridData<VendorVo> gridData = new GridData<VendorVo>();
		List<Vendor> vendors = null;
		long count = 0;
		if (VendorVo.NODE_TYPE_MATERIAL_CATALOG.equals(vendorVo.getNodeType())) {
			vendors = vendorService.findVendorsByMaterialCatalog(
					vendorVo.getNodeId(), vendorVo.getStart(),
					vendorVo.getLimit());
			count = vendorService.countVendorsByMaterialCatalog(vendorVo
					.getNodeId());
		} else if (VendorVo.NODE_TYPE_MATERIAL.equals(vendorVo.getNodeType())) {
			vendors = vendorService.findVendorsByMaterial(vendorVo.getNodeId(),
					vendorVo.getStart(), vendorVo.getLimit());
			count = vendorService.countVendorsByMaterial(vendorVo.getNodeId());
		} else {
			VendorCondition condition = new VendorCondition();
			try {
				BeanUtils.copyProperties(condition, vendorVo);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			condition.setStart(vendorVo.getStart());
			condition.setLimit(vendorVo.getLimit());
			condition.setSelectStatus(vendorVo.getSelectStatus());
			vendors = vendorService.findVendorsByCondition(condition,"vendor");
			count = vendorService.countVendorsByCondition(condition);
		}
		List<VendorVo> result = processListVendors(vendors);
		if (StringUtils.isNotEmpty(vendorVo.getTopTypeName())) {
			for (VendorVo vo : result) {
				vo.setTopTypeName(vendorVo.getTopTypeName());
			}
		}
		gridData.setTotalProperty(count);
		gridData.setResults(result);
		return gridData;
	}

	/**
	 * 根据指定供应商ID批量删除供应商信息
	 * 
	 * @param vendorIds
	 *            指定供应商ID
	 * @return JSON信息
	 */
	@WebRemote
	public String deleteVendor(String[] vendorIds) {
		vendorService.batchDeleteVendors(vendorIds);
		return "{success:true}";
	}

	/**
	 * 指定物料种类或物料的供应商
	 * 
	 * @param vendorIds
	 *            供应商IDs
	 * @param materialIDs
	 *            物料IDs 
	 * @return JSON信息
	 */
	@WebRemote
	public String setVendorAndMaterial(String[] vendorIds, String materialIDs) {
		vendorMaterialService.setVendorAndMaterial(vendorIds,
				materialIDs.split(","));
		return "{success:true}";
	}

	private List<VendorVo> processListVendors(List<Vendor> vendors) {
		List<VendorVo> result = new ArrayList<VendorVo>();
		String vendorIds[] =new String[1];
		List list = null;
		for (Vendor vendor : vendors) {
			VendorVo tempvo = new VendorVo();
			try {
				BeanUtils.copyProperties(tempvo, vendor);
				if(tempvo.getCreater()!=null && !tempvo.getCreater().equals(""))
				tempvo.setCreaterName(guserService.getGuserById(new Long(tempvo.getCreater())).getTruename());
				tempvo.setPrice("");
				vendorIds[0] = vendor.getVendorID();
				list = vendorQualificationServiceImpl.getDealVendor(vendorIds,null);
				if(list==null || list.size()==0)
					tempvo.setMark("0");
				else
					tempvo.setMark("1");
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
			result.add(tempvo);
		}
		return result;
	}
	/**
	 * 送审后修改审批状态
	 * @param vendorId
	 * @return
	 */
    @WebRemote
    public String updateVendorStatus(String[] vendorIds,String type,char status){
    	Vendor vendor = null;
    	for(String vendorId : vendorIds){
    		vendor = vendorService.getVendorById(vendorId.substring(0,vendorId.length()-1));
    		if(type.equals("1"))//供应商登记
    			vendor.setTrial_status(status);
    		else//供应商选评
    			vendor.setEvaluation_status(status);
	    	try {
				vendorService.saveVendor(vendor);
			} catch (ReduplicatedException e) {
				e.printStackTrace();
			}
    	}
    	return "{success : true}";
    }
    
    /**
     * 获取供应商模板信息地址，供前台做下载操作
     * @return
     */
    public String DownloadSupplierMessage(){
    	 PropertiesHelper proHelper = PropertiesHelper.instance("supplierMessage.properties"); 
//    	 System.out.println("供应商信息模板："+proHelper.getOneProperty("supplierMessage_data_path"));
		 return proHelper.getOneProperty("supplierMessage_data_path");  
    }
    
    /**
     * 删除指定供应商信息
     * @param vo
     * @return
     */
    @WebRemote
    public String DeleteVendorMaterials(VendorMaterialVo vo){
    	int result = vendorMaterialService.deleteVendorMaterials(vo);
    	return String.valueOf(result);
    }
    
	/**
	 * 批量保存供应商
	 * 
	 * @param vendorVo
	 *            供应商Vo
	 * @return JSON信息
	 * @throws Exception
	 */
	@WebRemote
	public String updateBatchVendor(VendorVo vendorVo) throws Exception {
		String msg=vendorService.updateVendor(vendorVo);
		return "{success:"+(msg.equals("")?true:false)+"}";
	}
    
	
	/**
	 * 获得供应商考核目录的数据
	 * 
	 * @param vendorVo
	 *            供应商Vo
	 * @return 符合条件的供应商列表
	 */
	@WebRemote
	public GridData<VendorVo> getVendorAppraisalGridData(VendorVo vendorVo) {
		GridData<VendorVo> gridData = new GridData<VendorVo>();
		List<Vendor> vendors = null;
		long count = 0; 
			VendorCondition condition = new VendorCondition();
			try {
				BeanUtils.copyProperties(condition, vendorVo);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			condition.setStart(vendorVo.getStart());
			condition.setLimit(vendorVo.getLimit());
			condition.setSelectStatus(vendorVo.getSelectStatus());
			//审核通过的供应商
			vendors = vendorService.findVendorsByCondition(condition,"vendorAppraisal");
//			count = vendorService.countVendorsByCondition(condition);
//		}
		List<VendorVo> result = processListVendors(vendors);
		if (StringUtils.isNotEmpty(vendorVo.getTopTypeName())) {
			for (VendorVo vo : result) {
				vo.setTopTypeName(vendorVo.getTopTypeName());
			}
		}
		gridData.setTotalProperty(condition.getCount().intValue());
		gridData.setResults(result);
		return gridData;
	}
	
	
	
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取所有物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	@WebRemote
	public GridData<MaterialVo> getAll(MaterialVo materialVo) throws Exception{
		GridData<MaterialVo> resultGrid = new GridData<MaterialVo>();
		Pager pager = new Pager();
		pager.setStart(materialVo.getStart());
		pager.setPageSize(materialVo.getLimit());
		
		List<MaterialVo> resultList = vendorService.getAll(materialVo,pager);
		resultGrid.setTotalProperty(pager.getRecordCount());
		resultGrid.setResults(resultList);
		resultGrid.setSuccess(true);
		return resultGrid;
	}
	
	/**
	 * 获取供应商考核grid
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<VendorVo> getVenderAssessGridData(VendorVo vo){
		GridData<VendorVo> resultGrid = new GridData<VendorVo>();
		List<VendorVo> resultList = vendorService.getVenderAssessGridData(vo);
		resultGrid.setTotalProperty(vo.getCount());
		resultGrid.setResults(resultList);
		resultGrid.setSuccess(true);
		return resultGrid;
	}
	
	/**
	 * 保存供应商考核数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveVendorAssess(VendorVo vo){
		try {
			vendorService.saveVendorAssess(vo);
			return "success:true";
		} catch (Exception e) {
			e.printStackTrace();
			return "success:false";
		}
	}
	
	@WebRemote
	public String saveVendorAssessDetail(VendorVo vo){
		try {
			vendorService.saveVendorAssessDetail(vo);
			return "success:true";
		} catch (Exception e) {
			e.printStackTrace();
			return "success:false";
		}
	}
	@WebRemote
	public GridData<VendorVo> getVenderAssessDetailData(VendorVo vo){
		if(vo.getAssessId()==null||vo.getAssessId().equals("")){
			return null;
		}
		GridData<VendorVo> resultGrid = new GridData<VendorVo>();
		List<VendorVo> resultList = vendorService.getVenderAssessDetailData(vo);
		resultGrid.setTotalProperty(vo.getCount());
		resultGrid.setResults(resultList);
		resultGrid.setSuccess(true);
		return resultGrid;
	}
	
	@WebRemote
	public String delVenderAssessDetail(VendorVo vo){
		try {
			vendorService.delVenderAssessDetail(vo);
			return "success:true";
		} catch (Exception e) {
			e.printStackTrace();
			return "success:false";
		}
	}
}