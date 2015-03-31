/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.manage;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.deviceProject.implementPlan.DeviceImplementplan;

/**
 * @author algz
 * 
 */
@Name("deviceManageRemote")
public class DeviceManageRemote {

	@In(create = true, value = "deviceManageServiceImp")
	private DeviceManageService service;

	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<DeviceManageVo> getGridData(DeviceManageVo vo) {
		GridData<DeviceManageVo> gd = new GridData<DeviceManageVo>();
		List<DeviceManageVo> vos = new ArrayList<DeviceManageVo>();
		try {
			List<DeviceImplementplan> list = service.getGridData(vo);
			for (DeviceImplementplan di : list) {
				DeviceManageVo divo = new DeviceManageVo();
				String manageContent="";
				divo.setImplementplanid(di.getImplementplanid());
				divo.setProjectcategorys(di.getProjectcategorys());
				divo.setProjectname(di.getEquipregistId().getProjectname());
				divo.setProjectnum(di.getEquipregistId().getProjectnum());
				divo.setNums(di.getEquipregistId().getNums());//数量
				divo.setNumsunit(di.getEquipregistId().getNumsunit());//数量单位
				divo.setBudgetnum(di.getEquipregistId().getBudgetnum());//总投资预算控制数
				divo.setFundunit(di.getEquipregistId().getFundunit());//资金单位			
				divo.setStatus(di.getStatus());
				divo.setRemark(di.getRemark());
				if((di.getStatus().equals("4")||di.getStatus().equals("8"))&&di.getDirpurchaseId()!=null){
					//定向采购
					manageContent=this.getManagecontent_Dirpurchase(di.getDirpurchaseId());
				}else if((di.getStatus().equals("5")||di.getStatus().equals("8"))&&di.getSelftenderId()!=null){
					//自行招标
					manageContent=this.getManagecontent_Selftender(di.getSelftenderId());
				}else if((di.getStatus().equals("6")||di.getStatus().equals("8"))&&di.getEntrusttenderId()!=null){
				    //委托招标
					manageContent=this.getManagecontent_Entrusttender(di.getEntrusttenderId());
				}
				divo.setManagecontent(manageContent);
				vos.add(divo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}

	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<DeviceManageVo> getDeviceManageById(String id) {
		GridData<DeviceManageVo> gd = new GridData<DeviceManageVo>();
		List<DeviceManageVo> vos = new ArrayList<DeviceManageVo>();
		HttpServletRequest request = ServletContexts.getInstance().getRequest();
		String pid = request.getParameter("pid");
		
		try {
			List<DeviceImplementplan> list = service.getDeviceManageById(pid);
			for (DeviceImplementplan di : list) {
				DeviceManageVo divo = new DeviceManageVo();
				String manageContent="";
				divo.setImplementplanid(di.getImplementplanid());
				divo.setProjectname(di.getEquipregistId().getProjectname());
				divo.setProjectnum(di.getEquipregistId().getProjectnum());
				divo.setNums(di.getEquipregistId().getNums());//数量
				divo.setNumsunit(di.getEquipregistId().getNumsunit());//数量单位
				divo.setBudgetnum(di.getEquipregistId().getBudgetnum());//总投资预算控制数
				divo.setFundunit(di.getEquipregistId().getFundunit());//资金单位
				divo.setStatus(di.getStatus());
				divo.setRemark(di.getRemark());
				if((di.getStatus().equals("4")||di.getStatus().equals("8"))&&di.getDirpurchaseId()!=null){
					//定向采购
					manageContent=this.getManagecontent_Dirpurchase(di.getDirpurchaseId());
				}else if((di.getStatus().equals("5")||di.getStatus().equals("8"))&&di.getSelftenderId()!=null){
					//自行招标
					manageContent=this.getManagecontent_Selftender(di.getSelftenderId());
				}else if((di.getStatus().equals("6")||di.getStatus().equals("8"))&&di.getEntrusttenderId()!=null){
				    //委托招标
					manageContent=this.getManagecontent_Entrusttender(di.getEntrusttenderId());
				}
				divo.setManagecontent(manageContent);
				vos.add(divo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		gd.setResults(vos);
		return gd;
	}
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveManage(DeviceManageVo vo){
		String msg=service.saveManage(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	public String sendManage(DeviceManageVo vo){
		String msg=service.sendManage(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}

	@WebRemote
	public String getManage(DeviceManageVo vo){
		return service.getManage(vo);
	}
	
	
	
	private String getManagecontent_Dirpurchase(DeviceManageDirpurchase dir){
		StringBuffer buffer=new StringBuffer();
		String span_s="<span style='border: 1px solid blue;'>";
		String span_e="</span>→";
		buffer.append(span_s+"措施卡片：("+(dir.getMeasurescard()==null?"":dir.getMeasurescard())+")"+span_e);
		buffer.append(span_s+"论证书：("+(dir.getCertificates()==null?"":dir.getCertificates())+")"+span_e);
		buffer.append(span_s+"使用单位打报告：("+(dir.getReport()==null?"":dir.getReport())+")"+span_e);
		buffer.append(span_s+"草签协议：("+(dir.getInitiallingagreement()==null?"":dir.getInitiallingagreement())+")"+span_e);
		buffer.append(span_s+"报价：("+(dir.getQuote()==null?"":dir.getQuote())+")"+span_e);
		buffer.append("<p> </p>");
		buffer.append(span_s+"组织谈判：("+(dir.getOrganizationnegotiations()==null?"":dir.getOrganizationnegotiations())+")"+span_e);
		buffer.append(span_s+"签约合同：("+(dir.getContractsigning()==null?"":dir.getContractsigning())+")</span>");
		return buffer.toString();
	}
	
	private String getManagecontent_Selftender(DeviceManageSelftender st){
		StringBuffer buffer=new StringBuffer();
		String span_s="<span style='border: 1px solid blue;'>";
		String span_e="</span>→";
		buffer.append(span_s+"措施卡片：("+(st.getMeasurescard()==null?"":st.getMeasurescard())+")"+span_e);
		buffer.append(span_s+"论证书：("+(st.getCertificates()==null?"":st.getCertificates())+")"+span_e);
		buffer.append(span_s+"技术指标确定：("+(st.getTechnicalindicators()==null?"":st.getTechnicalindicators())+")"+span_e);
		buffer.append(span_s+"委托招标审签登记：("+(st.getAuditingregistration()==null?"":st.getAuditingregistration())+")"+span_e);
		buffer.append(span_s+"委托协议：("+(st.getEntrustmentagreement()==null?"":st.getEntrustmentagreement())+")"+span_e);
		buffer.append("<p> </p>");
		buffer.append(span_s+"提交技术指标：("+(st.getSubmittechnicalindicators()==null?"":st.getSubmittechnicalindicators())+")"+span_e);
		buffer.append(span_s+"挂网：("+(st.getLinkednetwork()==null?"":st.getLinkednetwork())+")"+span_e);
		buffer.append(span_s+"招标评审：("+(st.getTenderassessment()==null?"":st.getTenderassessment())+")"+span_e);
		buffer.append(span_s+"定招：("+(st.getDirectedtender()==null?"":st.getDirectedtender())+")"+span_e);
		buffer.append(span_s+"信息发布：("+(st.getInformationdissemination()==null?"":st.getInformationdissemination())+")"+span_e);
		buffer.append("<p> </p>");
		buffer.append(span_s+"招标登记：("+(st.getTenderregistration()==null?"":st.getTenderregistration())+")"+span_e);
		buffer.append(span_s+"发标书：("+(st.getIssuedtenders()==null?"":st.getIssuedtenders())+")"+span_e);
		buffer.append(span_s+"评标书：("+(st.getBidevaluation()==null?"":st.getBidevaluation())+")"+span_e);
		buffer.append(span_s+"定标：("+(st.getCalibration()==null?"":st.getCalibration())+")"+span_e);
		buffer.append(span_s+"签定技术协议：("+(st.getSignedagreement()==null?"":st.getSignedagreement())+")"+span_e);
		buffer.append("<p> </p>");
		buffer.append(span_s+"签订合同：("+(st.getContractsigning()==null?"":st.getContractsigning())+")</span>");
return buffer.toString();
	}	
	
	private String getManagecontent_Entrusttender(DeviceManageEntrusttender et){
		StringBuffer buffer=new StringBuffer();
		String span_s="<span style='border: 1px solid blue;'>";
		String span_e="</span>→";
		buffer.append(span_s+"措施卡片：("+(et.getMeasurescard()==null?"":et.getMeasurescard())+")"+span_e);
		buffer.append(span_s+"论证书：("+(et.getCertificates()==null?"":et.getCertificates())+")"+span_e);
		buffer.append(span_s+"技术指标确定：("+(et.getTechnicalindicators()==null?"":et.getTechnicalindicators())+")"+span_e);
		buffer.append(span_s+"信息发布：("+(et.getInformationdissemination()==null?"":et.getInformationdissemination())+")"+span_e);
		buffer.append(span_s+"招标登记：("+(et.getTenderregistration()==null?"":et.getTenderregistration())+")"+span_e);
		buffer.append("<p> </p>");
		buffer.append(span_s+"发标书：("+(et.getIssuedtenders()==null?"":et.getIssuedtenders())+")"+span_e);
		buffer.append(span_s+"评标书：("+(et.getBidevaluation()==null?"":et.getBidevaluation())+")"+span_e);
		buffer.append(span_s+"定标：("+(et.getCalibration()==null?"":et.getCalibration())+")"+span_e);
		buffer.append(span_s+"签订技术协议：("+(et.getSignedagreement()==null?"":et.getSignedagreement())+")"+span_e);
		buffer.append(span_s+"签订合同：("+(et.getContractsigning()==null?"":et.getContractsigning())+")</span>");
		return buffer.toString();
	}
	
}
