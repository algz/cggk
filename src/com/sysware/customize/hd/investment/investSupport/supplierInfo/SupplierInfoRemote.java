package com.sysware.customize.hd.investment.investSupport.supplierInfo;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagementVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.investSupport.vo.GradeInfoVo;
import com.sysware.customize.hd.investment.investSupport.vo.SupplierInfoVo;
import com.sysware.customize.hd.investment.investSupport.vo.SupplyMaterialVo;
import com.sysware.util.StrUtil;

/**
 * @ClassName: SupplierInfoRemote
 * @Description: 供应商资讯模块 UI 类
 * 
 * @author LIT
 * @date Nov 24, 2011 10:00:02 AM
 * 
 */

@Name("supplierInfoRemote")
public class SupplierInfoRemote {

	@In(create = true, value = "supplierInfoServiceImpl")
	private SupplierInfoService _service;
	@In(create = true)
	Identity identity;
	@WebRemote
	public GridData<SupplierInfoVo> getInfo(SupplierInfoVo oo) {
		GridData<SupplierInfoVo> g = new GridData<SupplierInfoVo>();
		//oo.setCreater(identity.getLoginUser().getUserid().toString());
		List<Object> list = _service.getInfo(oo);
		Iterator<Object> it = list.iterator();
		List<SupplierInfoVo> voList = new ArrayList<SupplierInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			SupplierInfoVo vo = new SupplierInfoVo();
			vo.setVendorID(String.valueOf(obj[0]));
			vo.setVendorCode(String.valueOf(obj[1]));
			vo.setVendorName(String.valueOf(obj[2]));
			vo.setScale(String.valueOf(obj[3]));
			vo.setBusinessScope(String.valueOf(obj[4]));
			vo.setScore(String.valueOf(obj[5]));
			vo.setType(String.valueOf(obj[6]));
			vo.setDeliveryAddress(String.valueOf(obj[7]));
			vo.setPhone(String.valueOf(obj[8]));
			vo.setFax(String.valueOf(obj[9]));
			vo.setCreate_date(obj[10]==null?null:StrUtil.getDateforString(String.valueOf(obj[10])));
			vo.setKind(obj[11]==null?"":String.valueOf(obj[11]));
			voList.add(vo);

		}
		g.setResults(voList);
		g.setTotalProperty(oo.getCount());//(_service.getInfoCount(oo));
		return g;
	}

	@WebRemote
	public GridData<SupplierInfoVo> getInfoForBuyer(SupplierInfoVo oo) {
		GridData<SupplierInfoVo> g = new GridData<SupplierInfoVo>();
		//oo.setCreater(identity.getLoginUser().getUserid().toString());
		List<Object> list = _service.getInfoForBuyer(oo);//.getInfo(oo);
		Iterator<Object> it = list.iterator();
		List<SupplierInfoVo> voList = new ArrayList<SupplierInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			SupplierInfoVo vo = new SupplierInfoVo();
			vo.setVendorID(String.valueOf(obj[0]));
			vo.setVendorCode(String.valueOf(obj[1]));
			vo.setVendorName(String.valueOf(obj[2]));
			vo.setScale(String.valueOf(obj[3]));
			vo.setBusinessScope(String.valueOf(obj[4]));
/*			vo.setScore(String.valueOf(obj[5]));
			vo.setType(String.valueOf(obj[6]));
			vo.setDeliveryAddress(String.valueOf(obj[7]));
			vo.setPhone(String.valueOf(obj[8]));
			vo.setFax(String.valueOf(obj[9]));*/
			//vo.setCreate_date(obj[10]==null?null:(Date)obj[10]);
			vo.setCreate_date(obj[5]==null?null:StrUtil.getDateforString(String.valueOf(obj[5])));
			voList.add(vo);

		}
		g.setResults(voList);
		g.setTotalProperty(_service.getInfoForBuyerCount(oo));
		return g;
	}

	@WebRemote
	public GridData<SupplyMaterialVo> getSupplyMaterialInfo(SupplierInfoVo oo) {
		GridData<SupplyMaterialVo> g = new GridData<SupplyMaterialVo>();
		List<Object> list = _service.getSupplyMaterialInfo(oo);
		Iterator<Object> it = list.iterator();
		List<SupplyMaterialVo> voList = new ArrayList<SupplyMaterialVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			SupplyMaterialVo vo = new SupplyMaterialVo();
			vo.setContractCode(String.valueOf(obj[1]));//合同编号
			vo.setContractName(String.valueOf(obj[2]));//合同名称
			vo.setNum(String.valueOf(obj[3]));//物料编码
			vo.setName(String.valueOf(obj[4]));//物料名称
			vo.setScale(String.valueOf(obj[5]));//规格
			vo.setPrice(String.valueOf(obj[6]));//单价
			vo.setLoton(String.valueOf(obj[7]));//批次
			vo.setCount(String.valueOf(obj[8]));//数量
			vo.setDeliveryDate(String.valueOf(obj[9]));//交货日期
			vo.setPersonOfPass(String.valueOf(obj[10]));
			voList.add(vo);

		}
		g.setResults(voList);
		g.setTotalProperty(_service.getSupplyMaterialInfoCount(oo));
		return g;
	}

	@WebRemote
	public GridData<GradeInfoVo> getGradeInfo(SupplierInfoVo oo) {
		GridData<GradeInfoVo> g = new GridData<GradeInfoVo>();
		List<Object> list = _service.getGradeInfo(oo);
		Iterator<Object> it = list.iterator();
		List<GradeInfoVo> voList = new ArrayList<GradeInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			GradeInfoVo vo = new GradeInfoVo();
			vo.setId(String.valueOf(obj[0]));//供应商审核表ID
			vo.setVendorCode(String.valueOf(obj[1]));//供应商编号
			vo.setVendorName(String.valueOf(obj[2]));//供应商名称
			vo.setScale(String.valueOf(obj[3]));
			vo.setBusinessScope(String.valueOf(obj[4]));
			vo.setAvgGrade(String.valueOf(obj[5]));
			vo.setTheDate(String.valueOf(obj[6]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(oo.getCount());
		return g;
	}
	
	@WebRemote
	public GridData<GradeInfoVo> getGradeDeptInfo(SupplierInfoVo oo) {
		GridData<GradeInfoVo> g = new GridData<GradeInfoVo>();
		List<Object> list = _service.getGradeDeptInfo(oo);
		Iterator<Object> it = list.iterator();
		List<GradeInfoVo> voList = new ArrayList<GradeInfoVo>();
		while (it.hasNext()) {
			Object[] obj = (Object[]) it.next();
			GradeInfoVo vo = new GradeInfoVo();
			vo.setVendorCode(String.valueOf(obj[0]));
			vo.setVendorName(String.valueOf(obj[1]));
			vo.setScale(String.valueOf(obj[2]));
			voList.add(vo);
		}
		g.setResults(voList);
		g.setTotalProperty(100);
		return g;
	}
	
	@WebRemote
	public String getGradeMoreInfo(String code) {
		SupplierInfoVo oo = new SupplierInfoVo();
		oo.setVendorAppraisalId(code);
		List<Object> list = _service.getGradeMoreInfo(oo);
		StringBuilder str = new StringBuilder();
		
		if(list.size()>0){
			Object[] obj = (Object[]) list.get(0);
			str.append("<table><tr><td align='left'>修改意见：</td></tr><tr><td><textarea rows='3' cols='100'>");
			str.append(String.valueOf(obj[0]));
			str.append("</textarea></td></tr><tr><td>");
			if("1".endsWith(String.valueOf(obj[1]))){
				str.append("<font color=red>合格</font>");
				str.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				str.append("试供");
			}else{
				str.append("合格");
				str.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				str.append("<font color=red>试供</font>");
			}
			str.append("</td></tr></table>");
		}else{
			str.append("<table><tr><td align='left'>修改意见：</td></tr><tr><td><textarea rows='3' cols='100'>");
			str.append("</textarea></td></tr><tr><td>");
			str.append("合格");
			str.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			str.append("试供");
			str.append("</td></tr></table>");	
		}
	
		return str.toString();
	}
	
	/**
	 * 查询合同管理GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<DeviceContractmanagementVo> getSupplierOfContractInfo(SupplierInfoVo vo) {
		GridData<DeviceContractmanagementVo> gd = new GridData<DeviceContractmanagementVo>();
		List<DeviceContractmanagementVo> vos = new ArrayList<DeviceContractmanagementVo>();
		try {
			List<DeviceContractmanagement> list =(List<DeviceContractmanagement>) _service.getSupplierOfContractInfo(vo);
			for (DeviceContractmanagement dc : list) {
				DeviceContractmanagementVo dcvo = new DeviceContractmanagementVo();
				BeanUtils.copyProperties(dcvo, dc);
				if(dc.getEquipregistId()!=null){
					dcvo.setPartyb(dc.getPartyb().getVendorID());//供应商ID
					dcvo.setPartybname(dc.getPartyb().getVendorName());//供应商名称
					dcvo.setEquipregistId(dc.getEquipregistId());
					if(dc.getContracttype().equals("1")){
						dcvo.setProjectname(dc.getEquipregist().getProjectname());
						dcvo.setProjectnum(dc.getEquipregist().getProjectnum());
					}else if(dc.getContracttype().equals("2")){
						dcvo.setProjectname(dc.getCivilregist().getProjectname());
						dcvo.setProjectnum(dc.getCivilregist().getProjectnum());
					}
					
				}
				vos.add(dcvo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	
}
