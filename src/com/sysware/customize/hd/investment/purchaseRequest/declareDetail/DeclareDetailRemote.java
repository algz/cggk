package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.BeanUtils;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareService;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

/**
 * 采购申报明细Remote
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
@Name("declareDetail_DeclareDetailRemote")
public class DeclareDetailRemote {

	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)), BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}
    
	@In(value="material_MaterialServiceImpl",create = true)
	private MaterialService material_MaterialServiceImpl;
	
	 @In(create = true, value = "department_DepartmentServiceImpl")	
	 private DepartmentService departmentService;
	 
	 @In(create = true, value = "declare_DeclareServiceImpl")	
	 private DeclareService declareService ;
	 
	 @In(create = true,value="declareDetail_DeclareDetailServiceImpl")
	 private DeclareDetailService declareDetailServiceImpl;
	 @In(create = true, value = "guser_GuserServiceImpl")
		GuserService _guserService;
	 @In(create = true)
		Identity identity; 
	/**
	 * 获取指定ID的采购申报记录详情
	 * 
	 * @param declareDetailVo
	 *            采购申报记录详情VO
	 * @return 采购申报记录详情集合
	 * @throws Exception
	 */
	@WebRemote
	public GridData<DeclareDetailVo> getGridData(DeclareDetailVo declareDetailVo) throws Exception {

		List<DeclareDetail> declareDetails = this.getDeclareDetailService()
				.getDeclareDetailsByDeclareId(declareDetailVo.getDeclareId(),
						declareDetailVo.getStart(), declareDetailVo.getLimit(),declareDetailVo.getDeclareDetailStatus());

		List<DeclareDetailVo> declareDetailVos = new ArrayList<DeclareDetailVo>(); 
		Material material = null;
		for (DeclareDetail declareDetail : declareDetails) {
			DeclareDetailVo temp = new DeclareDetailVo();
			BeanUtils.copyProperties(temp, declareDetail);
			material = material_MaterialServiceImpl.findById(declareDetail.getMaterialid());
			temp.setMaterialitemcode(material.getMaterialitemcode());
			temp.setMaterialItemName(material.getMaterialItemName());
			temp.setMaterialStandard(material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"");
			temp.setTechnicCondition(material.getTechnicCondition());
			temp.setDemension(material.getDemension());
			temp.setReferencePrice(material.getReferencePrice()==null?"0":material.getReferencePrice().toString());
			temp.setDeliveryStatus(material.getDeliveryStatus());
			if(declareDetail.getReportType()==null || declareDetail.getReportType().toString().equals("1"))
				temp.setReportType("可行性报告");
			else if(declareDetail.getReportType().toString().equals("2"))
				temp.setReportType("需求报告");
			else if(declareDetail.getReportType().toString().equals("3"))
				temp.setReportType("申报依据");  
			declareDetailVos.add(temp);
		}

		GridData<DeclareDetailVo> gridData = new GridData<DeclareDetailVo>();
		gridData.setResults(declareDetailVos);
		gridData.setTotalProperty(this.getDeclareDetailService().countDeclareDetailsByDeclareId(
				declareDetailVo.getDeclareId(),declareDetailVo.getDeclareDetailStatus()));
		return gridData;
	}
	/**
	 * 获取采购计划类型和采购计划Id获取采购申报记录详情
	 * 
	 * @param declareDetailVo
	 *            采购申报记录详情VO
	 * @return 采购申报记录详情集合
	 * @throws Exception
	 */
	@WebRemote
	public GridData<DeclareDetailVo> getGridDataByType(DeclareDetailVo declareDetailVo) throws Exception {

		List<Object[]> declareDetails = this.getDeclareDetailService()
				.getGridDataByType(declareDetailVo);

		List<DeclareDetailVo> declareDetailVos = new ArrayList<DeclareDetailVo>(); 
		Material material = null;
		for (Object[] obj : declareDetails) {
			DeclareDetailVo temp = new DeclareDetailVo();
			temp.setMaterialCatalogName(obj[0]==null?"":obj[0].toString());
			temp.setQuantity(obj[1]==null?"":obj[1].toString());
			temp.setAmount(obj[2]==null?"":obj[2].toString());
			temp.setUse(obj[3]==null?"":obj[3].toString());
			temp.setUseDate(obj[4]==null?"":obj[4].toString());
			temp.setFileName(obj[5]==null?"":obj[5].toString());
			temp.setFileId(obj[6]==null?"":obj[6].toString());
			material = material_MaterialServiceImpl.findById(obj[7].toString());
			temp.setMaterialItemName(material.getMaterialItemName());
			temp.setMaterialStandard(material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"");
			temp.setTechnicCondition(material.getTechnicCondition());
			temp.setDemension(material.getDemension());
			declareDetailVos.add(temp);
		}

		GridData<DeclareDetailVo> gridData = new GridData<DeclareDetailVo>();
		gridData.setResults(declareDetailVos); 
		gridData.setTotalProperty(this.getDeclareDetailService().getGridDataByTypeCount(declareDetailVo).longValue());
		return gridData;
	}
	private DeclareDetailService getDeclareDetailService() {
		return (DeclareDetailService) Component.getInstance(
				"declareDetail_DeclareDetailServiceImpl", true);
	}
	 
	@WebRemote
	public String deleteDeclareDetails(String[] ids){
		this.getDeclareDetailService().batchDeleteDeclareDetailsByIds(ids);
		return "{ success : true }";
	}

	
	
	@WebRemote
	/**
	 * 按查询条件获取采购申报记录详情
	 * @param declareDetailVo
	 * 				 采购申报记录详情VO
	 * @return 采购申报记录详情集合
	 * @throws Exception
	 */
	public GridData<DeclareDetailVo> getGridDataByCondition(DeclareDetailVo declareDetailVo) throws Exception {
		
		DeclareDetailCondition condition = new DeclareDetailCondition();
		BeanUtils.copyProperties(condition, declareDetailVo);
		
		List<Object[]> declareDetails = this.getDeclareDetailService().getByCondition(condition);

		List<DeclareDetailVo> declareDetailVos = new ArrayList<DeclareDetailVo>(); 
		Material material = null; 
		Integer rownum = 0;
		for (Object[] declareDetail : declareDetails) {
			DeclareDetailVo temp = new DeclareDetailVo(); 
			temp.setDeclareDetailId(declareDetail[0].toString()); 
			temp.setUse(declareDetail[6].toString());
			temp.setQuantity(declareDetail[5].toString());
			temp.setAmount(declareDetail[9].toString());
			temp.setUseDate(declareDetail[10].toString());
			material = material_MaterialServiceImpl.findById(declareDetail[3].toString());
			//判断从数据库是否获取到了数据
			if(material != null){
			temp.setMaterialItemName(material.getMaterialItemName());
			temp.setMaterialStandard(material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"");
			temp.setTechnicCondition(material.getTechnicCondition());
			temp.setDemension(material.getDemension());
			temp.setDeliveryStatus(material.getDeliveryStatus());
			}
			temp.setMaterialCatalogName(declareDetail[4].toString());   
				temp.setDepartmentName(declareDetail[13].toString());  
			if(declareDetail[8].toString().equals("1"))
				temp.setDeclareType("计划内");
			else if(declareDetail[8].toString().equals("2"))
				temp.setDeclareType("应急");
			else if(declareDetail[8].toString().equals("3"))
				temp.setDeclareType("非应急");  
			if(declareDetail[11].toString().equals("1"))
				temp.setStatus("编制中");
			else if(declareDetail[11].toString().equals("2"))
				temp.setStatus("已送审");
			else if(declareDetail[11].toString().equals("3"))
				temp.setStatus("已审批");
			else if(declareDetail[11].toString().equals("4"))
				temp.setStatus("已生成");
			temp.setRownum(rownum.toString());
			temp.setDeclareplanDetilID(declareDetail[12].toString());
			if(declareDetail[14] == null || declareDetail[14].toString().equals("1"))
				temp.setReportType("可行性报告");
			else if(declareDetail[14].toString().equals("2"))
				temp.setReportType("需求报告");
			else if(declareDetail[14].toString().equals("3"))
				temp.setReportType("申报依据");
			temp.setRemark(declareDetail[15]==null?"":declareDetail[15].toString());
			temp.setTaskno(declareDetail[16]==null?"":declareDetail[16].toString());
			temp.setContactPerson(declareDetail[17]==null?"":declareDetail[17].toString());
			temp.setContactTelephone(declareDetail[18]==null?"":declareDetail[18].toString());
			temp.setDeclareId(declareDetail[19].toString());
			temp.setOldquantity(declareDetail[20]==null?"":declareDetail[20].toString());
			temp.setChanger(declareDetail[21]==null?"":declareDetail[21].toString());
			temp.setChangeTime(declareDetail[22]==null?"":declareDetail[22].toString());
			temp.setChangeReson(declareDetail[23]==null?"":declareDetail[23].toString());

			declareDetailVos.add(temp);
			rownum ++;
		
		}

		GridData<DeclareDetailVo> gridData = new GridData<DeclareDetailVo>();
		gridData.setResults(declareDetailVos);
//		gridData.setTotalProperty(this.getDeclareDetailService().countByCondition(condition));
		gridData.setTotalProperty(condition.getCount());
		return gridData;
	
	}
	/**
	 * 获取excel导出需要的数据
	 * @param para
	 * @return
	 * @throws UnsupportedEncodingException 
	 * @throws UnsupportedEncodingException 
	 */
	public List getGridDataByCondition(Object obj) throws UnsupportedEncodingException{
		List objlist = new ArrayList();
		List<String[]> valueList = new ArrayList<String[]>();
		//设置参数
		DeclareDetailCondition condition = new DeclareDetailCondition(); 
		HttpServletRequest request = (HttpServletRequest) obj;
		condition.setDepartmentId(request.getParameter("para1"));
		condition.setUse(request.getParameter("para2").equals("")?"":new String(request.getParameter("para2").getBytes("iso-8859-1"),"UTF-8"));
	    condition.setDeclareplanID(request.getParameter("para3"));
		//excel 表头信息
		String name[] = {"名称","部门","技术条件","型号","用途","物资类别","数量","计量单位","资金预算（单位：元）","采购类型","使用时间"};
		String name1[] = {"名称","技术条件","型号","用途","物资类别","数量","计量单位","资金预算（单位：元）","采购类型","使用时间"};
		String name2[] = {"名称","部门","技术条件","型号","物资类别","数量","计量单位","资金预算（单位：元）","采购类型","使用时间"};
		int index = 0;
		if(request.getParameter("para1")!=null && !"".equals(request.getParameter("para1"))){
			index = 1;
			name = name1;
		}else if(request.getParameter("para2")!=null && !"".equals(request.getParameter("para2"))){
			index = 2;
			name = name2;
		}
		//获取数据列表
		List<Object[]> declareDetails = getDeclareDetailService().getByCondition(condition);
		String value[] = new String[name.length];
		Material material = null;
		for (Object[] declareDetail : declareDetails) {
			value = new String[name.length];
			material = material_MaterialServiceImpl.findById(declareDetail[3].toString());
			if(material != null){//如果没有查询记录,就不继续下面的往List里面赋值的操作
				valueList.add(this.getValues(value, material, declareDetail, index));
			}
		
		} 
		objlist.add(valueList);
		objlist.add(name);
		return objlist;
	}
	private String[] getValues(String value[],Material material,Object[] declareDetail,int index){
		if(index==0){
			value[0] = material.getMaterialItemName()!=null?material.getMaterialItemName():"";
			value[1] = declareDetail[13].toString();  
			value[2] = material.getTechnicCondition()!=null?material.getTechnicCondition():"";
			value[3] = material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"";
		 	value[4] =declareDetail[6].toString(); 
			value[5] =declareDetail[4].toString();  
			value[6] =declareDetail[5].toString();
			value[7] =material.getDemension()!=null?material.getDemension():"";
			value[8] =declareDetail[9].toString();
			if(declareDetail[8].toString().equals("1"))
				value[9] = "计划内";
			else if(declareDetail[8].toString().equals("2"))
				value[9] = "应急";
			else if(declareDetail[8].toString().equals("3"))
				value[9] = "非应急"; 
			value[10] = declareDetail[10].toString();
		}else if(index==1){
			value[0] = material.getMaterialItemName()!=null?material.getMaterialItemName():""; 
			value[1] = material.getTechnicCondition()!=null?material.getTechnicCondition():"";
			value[2] = material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"";
		 	value[3] =declareDetail[6].toString(); 
			value[4] =declareDetail[4].toString();  
			value[5] =declareDetail[5].toString();
			value[6] =material.getDemension()!=null?material.getDemension():"";
			value[7] =declareDetail[9].toString();
			if(declareDetail[8].toString().equals("1"))
				value[8] = "计划内";
			else if(declareDetail[8].toString().equals("2"))
				value[8] = "应急";
			else if(declareDetail[8].toString().equals("3"))
				value[8] = "非应急"; 
			value[9] = declareDetail[10].toString();
		}else if(index==2){
			value[0] = material.getMaterialItemName()!=null?material.getMaterialItemName():"";
			value[1] = declareDetail[13].toString();  
			value[2] = material.getTechnicCondition()!=null?material.getTechnicCondition():"";
			value[3] = material.getMaterialStandard()!=null?material.getMaterialStandard():""+material.getDesingnation()!=null?material.getDesingnation():"";
		  
			value[4] =declareDetail[4].toString();  
			value[5] =declareDetail[5].toString();
			value[6] =material.getDemension()!=null?material.getDemension():"";
			value[7] =declareDetail[9].toString();
			if(declareDetail[8].toString().equals("1"))
				value[8] = "计划内";
			else if(declareDetail[8].toString().equals("2"))
				value[8] = "应急";
			else if(declareDetail[8].toString().equals("3"))
				value[8] = "非应急"; 
			value[9] = declareDetail[10].toString();
		}
		return value;
	}
	@WebRemote
	public String saveDeclareDetail(String declareId,String declareDetailId,String materialid[],String quantity[],
			String use[],String useDate[],String amount[],String declareType[],String materialCatalogName[],
			String fileName[],String fileId[],String[] reportType,String[] remark,String[] taskno,String[] contactPerson,String[] contactTelephone,
			String amountSource,String costNum){
		long userid =  identity.getLoginUser().getUserid();
		Guser guser = _guserService.getGuserById(userid);
		
		String deparmentid = guser.getGinstitute().getInstcode();
		declareDetailServiceImpl.saveDeclareDetail(declareId, declareDetailId, materialid, quantity, use, useDate, amount, declareType, materialCatalogName, fileName, 
				fileId,String.valueOf(userid) ,deparmentid,reportType,remark,taskno,contactPerson,contactTelephone,amountSource,costNum );
		return "{success:true}";
	}
	
	/**
	 * 变更申报明细
	 * @return
	 */
	@WebRemote
	public String updateDeclareDetail(DeclareDetailVo vo){
		declareDetailServiceImpl.updateDeclareDetail(vo);
		return "{success:true}";
	}
	
	@WebRemote
	public String saveMaterialToDeclarePlan(DeclareDetailVo vo){
		try {
			declareDetailServiceImpl.saveMaterialToDeclarePlan(vo);
			return "{success:true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success:false}";
		}
	}
	
	/**
	 * 加载所有使用单位
	 * @param id
	 * @return
	 */
	@WebRemote
	public GridData<Department> getDepartment(String id){
		List<Department> list = new ArrayList<Department>();
		GridData<Department> data = new GridData<Department>();
		list = declareDetailServiceImpl.getDeptypeList();
		data.setTotalProperty(list.size());
		data.setResults(list);
		data.setSuccess(true);
		return data;
	}
	
	/**
	 * 显示发放数量
	 * @param vo
	 * @return
	 */
	@WebRemote
	public JSONObject getOut_Num(DeclareDetailVo vo){
		JSONObject json=new JSONObject();
		JSONArray ja=new JSONArray();
		List<Object[]> list=this.declareDetailServiceImpl.getOut_Num(vo);
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("OUT_QTY", objs[0]);//发放数量
			jo.put("CREATION_DATE", objs[1]);//发放时间
			ja.add(jo);
		}
		json.put("totalProperty",vo.getCount());
		json.put("results",ja);
		json.put("success",true);
		return json;
		
	}
}


