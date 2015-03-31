package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.BeanUtils;
import com.sysware.common.approval.ApprovalRemote;
import com.sysware.common.approval.vo.ApprovalVo;
import com.sysware.customize.hd.investment.procurementExecute.admissionTest.AdmissionTestVo;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

/**
 * 采购申报Remote
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
@Name("declare_DeclareRemote")
public class DeclareRemote {

	@In(create=true,value="approval_ApprovalRemote")
	private  ApprovalRemote approvalRemote;
	
	private DeclareService getDeclareService() {
		return (DeclareService) Component.getInstance("declare_DeclareServiceImpl");
	}

	public Identity getIdentity() {
		return (Identity) Component.getInstance("org.jboss.seam.security.identity");
	}

	public GuserService getGuserService() {
		return (GuserService) Component.getInstance("guser_GuserServiceImpl");
	}

	public DepartmentService getDepartmentService() {
		return (DepartmentService) Component.getInstance("department_DepartmentServiceImpl");
	}

	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)), BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}
	
	/**
	 * 获取采购申报记录列表
	 * @param declareVo 采购申报记录VO
	 * @return 符合条件的记录列表
	 * @throws Exception 对象复制过程中的异常
	 */
	@WebRemote
	public GridData<DeclareVo> getDeclareVoGridData(DeclareVo declareVo) throws Exception {
		List<DeclareVo> declareVoList = new ArrayList<DeclareVo>();

		
//		String declareDate = null;
//		if(declareVo.getDeclareDate()!=null )
//			if(!declareVo.getDeclareDate().equals("")) 
//				declareDate = declareVo.getDeclareDate().replace("年", "-").replace("月", "-")+"01";
//		declareVo.setDeclareDate(null);
//		Declare example = new Declare();
//		example.setDepartmentId(declareVo.getDepartmentId());
//		example.setEditor(declareVo.getEditor());
//		example.setStatus(declareVo.getStatus());
//		example.setDeclareCode(declareVo.getDeclareCode());
//		BeanUtils.copyProperties(example, declareVo);
//		if(declareDate!=null)
//			example.setDeclareDate(new SimpleDateFormat("yyyy-MM-dd").parse(declareDate));
		List<Declare> declareList = this.getDeclareService().getDeclaresByExample(declareVo);

		for (Declare dec : declareList) {
			DeclareVo tempDec = new DeclareVo();
			BeanUtils.copyProperties(tempDec, dec);
			tempDec.setAmount(Double.parseDouble(getDeclareService().getSumByAmount(dec.getDeclareId())));
			if (StringUtils.isNotEmpty(tempDec.getStatus())) {
				int i = Integer.parseInt(tempDec.getStatus());
				switch (i) {
				case 1:
					tempDec.setStatus("编制中");
					break;
				case 2:
					tempDec.setStatus("审批中");//已提交
					break;
				case 3:
					tempDec.setStatus("已审批（生成申报计划）");//已提交（生成申报计划）
					break;
				}
			}
			if (StringUtils.isNotEmpty(tempDec.getEditor())) {
				tempDec.setEditor(this.getGuserService()
						.getGuserById(Long.parseLong(tempDec.getEditor())).getTruename());
			}
			if (StringUtils.isNotEmpty(tempDec.getDepartmentId())) {
				tempDec.setDepartmentId(this.getDepartmentService()
						.getDepartmentByCode(tempDec.getDepartmentId()).getDepartmetname());
			}
			if(declareVo.getDeclare_type().equals("2")){
				tempDec.setAmount(this.getDeclareService().getAmoutByType(dec.getDeclareId()));
			}
			declareVoList.add(tempDec);
		}

		GridData<DeclareVo> gridData = new GridData<DeclareVo>();
		gridData.setResults(declareVoList);
		gridData.setTotalProperty(declareVo.getCount().longValue());//(this.getDeclareService().countDeclaresByExample(example,declareVo.getDeclare_type()));
		return gridData;
	}

	/**
	 * 批量删除采购申报记录
	 * @param ids 待删除的申报记录IDs
	 * @return 处理结果
	 */
	@WebRemote
	public String deleteDeclareByIds(String[] ids) {
		boolean flag = this.getDeclareService().batchDeleteDeclares(ids);
		if (flag) {
			return "{ success : true }";
		} else {
			return "{ success : failure }";
		}
	}
	/**
	 * 批量修改采购申报记录状态
	 * @param ids 待删除的申报记录IDs
	 * @return 处理结果
	 */
	@WebRemote
	public String updateDeclareByIds(String[] ids) {
		boolean flag = this.getDeclareService().batchUpdateDeclares(ids);
//		if (flag) {
//			
//			ApprovalVo approvalVo=new ApprovalVo();
//			approvalVo.setObjectID(StringUtils.join(ids, ',', 0, ids.length-1));//审批对象关联的业务ID(主键)//
//			approvalVo.setObjectType("RegistrationDeclaration");//审批对象类型.用于流程引擎查询事件处理类
//			approvalVo.setApprovalId(488701l);//流程模板ID,固定的.
//			approvalVo.setApprovePressName("申报需求登记流程名称");//流程名称
//			approvalVo.setApproveNote("申报需求登记流程附言");//流程说明
//			approvalVo.setApprovalType("ByTemplet");//选择流程模板类	
//			JSONObject json=JSONObject.fromObject(approvalRemote.checkBegin(approvalVo));
//			JSONObject activityInfo=(JSONObject)json.get("activityInfo");
//			JSONArray comments=(JSONArray)activityInfo.get("comments");
//			comments.getJSONObject(0).put("examinerType", 1);
//			approvalVo.setActivityInfo(activityInfo.toString());
//			//approvalVo.setActivityInfo("{\"nodetypeid\":\"6\",\"activityid\":14240101,\"activityname\":\"审批节点\",\"comments\":[{\"chargedDepName\":\"金属部\",\"examiner\":4201606,\"examinerName\":\"金属计划员\",\"chargedDepId\":\"0000012\",\"examinerType\":1}]}");
//			approvalRemote.begin(approvalVo);//提交审批
//			return "{ success : true }";
//		} else {
//			return "{ success : failure }";
//		}
		return ""+flag+"";
	}
	/**
	 * 直接修改公用笺采购申报记录状态
	 * @param ids 待删除的申报记录IDs
	 * @return 处理结果
	 */
	@WebRemote
	public String updateDeclareById(String id) {
		boolean flag = this.getDeclareService().batchUpdateDeclare(id);
		return ""+flag+"";
	}
	@WebRemote
	public JSONObject getComboBoxDataForDeclare(DeclareVo declareVo){
		// {author : [{text : "t1" , value : "v1" } , {text : "t2" , value : "v2" }]}
		return getDeclareService().getComboBoxDataForDeclare(declareVo);
	}
	
	//导出excel
	@WebRemote
	public List<Object[]> exportDeclareReportGridData(Object obj){
		DeclareVo vo = new DeclareVo();
		HttpServletRequest request = (HttpServletRequest) obj;
		vo.setDeclareId(request.getParameter("declareid"));
		return this.getDeclareService().exportDeclareReportGridData(vo);
//		List<Object[]> objList = this.getDeclareService().exportDeclareReportGridData(vo);
//		List<Object[]> valueList = new ArrayList<Object[]>();
//		Object value[] = null;
//		for (Object ob[] : objList) {
//			 value = new Object[22];
//			 value[0] = ob[0] == null ? "" : ob[0].toString();
//			 value[1] = ob[1] == null ? "" : ob[1].toString();
//			 value[2] = ob[2] == null ? "" : ob[2].toString();//物料编码
//			 value[3] = ob[3] == null ? "" : ob[3].toString();
//			 value[4] = ob[4] == null ? "" : ob[4].toString();
//			 value[5] = ob[5] == null ? "" : ob[5].toString();
//			 value[6] = ob[6] == null ? "" : ob[6].toString();
//			 value[7] = ob[7] == null ? "" : ob[7].toString();
//			 value[8] = ob[8] == null ? "" : ob[8].toString();
//			 value[9] = ob[9] == null ? "" : ob[9].toString();
//			 value[10] = ob[10] == null ? "" : ob[10].toString();
//			 value[11] = ob[11] == null ? "" : ob[11].toString();
//			 value[12] = ob[12] == null ? "" : ob[12].toString();
//			 value[13] = ob[13] == null ? "" : ob[13].toString();
//			 value[14] =ob[14] == null || ob[14].equals("0")?"否":"是";
//			 value[15] =ob[16] == null || ob[16].equals('0')?"否":"是";
//			 value[16] = ob[21] == null || ob[21].equals("0")?"否":"是";
//			 value[17] = ob[17] == null ? "" : ob[17].toString();
//			 value[18] = ob[20] == null ? "" : ob[20].toString();
//			 value[19] = ob[18] == null ? "" : ob[18].toString();
//			 if(ob[12] == null)
//				 value[20] = "";
//			 else  if(ob[18] == null)
//				 value[20] = ob[12].toString();
//			 else
//				 value[20] = Float.parseFloat(ob[12].toString())- Float.parseFloat(ob[18].toString());
//			 value[21] = ob[19] == null ? "" : ob[19].toString(); 
//			 valueList.add(value);
//		}
//		return valueList;
	}
	
}
