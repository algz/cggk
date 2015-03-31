package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.BeanUtils;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityCondition;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityRemote;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor.ParityVendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor.ParityVendorService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.ProcurementService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.p2m.guser.GuserService;

@Name("parityDetailRemote")
public class ParityDetailRemote {
	@In(create = true)
	Identity identity;
	@In(create = true, value = "parityDetailServiceImpl")
	private ParityDetailService parityDetailService;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;

	@In(create = true, value = "vendor_VendorServiceImpl")
	private VendorService vendorService;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;

	@In(create = true, value = "guser_GuserServiceImpl")
	GuserService _guserService;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;

	@In(create = true, value = "procurement_ProcurementServiceImpl")
	private ProcurementService procurementService;

	@In(create = true, value = "parityServiceImpl")
	private ParityService parityService;

	@In(create = true, value = "parityRemote")
	private ParityRemote parityRemote;

	@In(create = true, value = "parity_ParityVendorServiceImpl")
	private ParityVendorService parityVendorService;

	@In(create = true, value = "parityDetailDaoImpl")
	private ParityDetailDao parityDetailDao;

	SimpleDateFormat smt = new SimpleDateFormat("yyyy-MM-dd");

	/***
	 * 将实体集合转换为vo集合
	 * 
	 * @return
	 */
	private List<ParityDetailVo> chageParityDetailDatasToVo(
			List<ParityDetail> parityDetails,
			ParityDetailCondition parityDetailCondition) {
		List<ParityDetailVo> parityDetailVos = new ArrayList<ParityDetailVo>();
		if (parityDetails != null && parityDetails.size() > 0) {
			for (ParityDetail parityDetail : parityDetails) {
				parityDetailVos.add(this.chageParityDetailDataToVo(
						parityDetail, parityDetailCondition));

			}
		}
		return parityDetailVos;
	}

	private ParityDetailVo chageParityDetailDataToVo(ParityDetail parityDetail,
			ParityDetailCondition parityDetailCondition) {
		ParityDetailVo parityDetailVo = new ParityDetailVo();
		try {
			BeanUtils.copyProperties(parityDetailVo, parityDetailCondition);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		parityDetailVo.setMaterialId(parityDetail.getMaterialId());
		Material m = materialService.findById(parityDetail.getMaterialId());
		if (m != null) {
			parityDetailVo.setDesingnation(m.getDesingnation());// 牌号
			parityDetailVo.setMaterialItemName(m.getMaterialItemName());// 物料名称
			parityDetailVo.setMaterialStandard(m.getMaterialStandard());// 物料规格
			parityDetailVo.setmCtgName(m.getMaterialclass());// 物资类别
		}
		parityDetailVo.setDemandTime(smt.format(parityDetail.getDemandTime()));
		parityDetailVo.setLastprice(parityDetail.getLastprice() + "");

		parityDetailVo.setManufacturer1(parityDetail.getManufacturer1());// 供应商1
		Vendor vendor1 = vendorService.getVendorById(parityDetail
				.getManufacturer1());
		if (vendor1 != null) {
			parityDetailVo.setPhone1(vendor1.getPhone());
			parityDetailVo.setVendorName1(vendor1.getVendorName());
			parityDetailVo.setReposal1(vendor1.getReposal());
			parityDetailVo.setProperty1(vendor1.getProperty());
		}

		parityDetailVo.setManufacturer2(parityDetail.getManufacturer2());
		Vendor vendor2 = vendorService.getVendorById(parityDetail
				.getManufacturer2());
		if (vendor2 != null) {
			parityDetailVo.setPhone2(vendor2.getPhone());
			parityDetailVo.setVendorName2(vendor2.getVendorName());
			parityDetailVo.setReposal2(vendor2.getReposal());
			parityDetailVo.setProperty2(vendor2.getProperty());
		}

		parityDetailVo.setManufacturer3(parityDetail.getManufacturer3());
		Vendor vendor3 = vendorService.getVendorById(parityDetail
				.getManufacturer3());
		if (vendor3 != null) {
			parityDetailVo.setPhone3(vendor3.getPhone());
			parityDetailVo.setVendorName3(vendor3.getVendorName());
			parityDetailVo.setReposal3(vendor3.getReposal());
			parityDetailVo.setProperty3(vendor3.getProperty());
		}

		parityDetailVo.setManufacturerOne(parityDetail.getManufacturerOne());
		parityDetailVo.setManufacturerOneName(parityDetail
				.getManufacturerOneName());
		parityDetailVo.setManufacturerTwo(parityDetail.getManufacturerTwo());
		parityDetailVo.setManufacturerTwoName(parityDetail
				.getManufacturerTwoName());
		parityDetailVo.setParityDetailId(parityDetail.getParityDetailId());
		parityDetailVo.setParityId(parityDetail.getParityId());

		parityDetailVo.setPlanner(parityDetail.getPlanner());
		if (parityDetail.getPlannerName() != null) {
			parityDetailVo.setPlannerName(parityDetail.getPlannerName());
		} else {
			Purchase purchase = purchaseService.getPurchaseById(parityDetailVo
					.getPurchaseId());
			if (purchase != null) {
				parityDetailVo.setPlannerName(_guserService.getGuserById(
						Long.parseLong(purchase.getEditor())).getTruename());
			}
		}
		parityDetailVo.setPlanPrice(parityDetail.getPlanPrice().toString());
		if ("1".equals(parityDetailCondition.getShowOnly())) {
			parityDetailVo.setProvider(parityDetail.getProvider());
			parityDetailVo.setProviderName(parityDetail.getProviderName());
		}

		parityDetailVo.setPurpose(parityDetail.getPurpose());
		parityDetailVo.setRemark(parityDetail.getRemark());
		parityDetailVo.setRemarks(parityDetail.getRemarks());
		parityDetailVo.setScope(parityDetail.getScope().toString());

		return parityDetailVo;
	}

	/**
	 * 得到比价明细数据 用于 comparePricePanel.js中的 procurementProcessData.rightPanel方法
	 * 
	 * @param pvo
	 * @return
	 */
	@WebRemote
	public GridData<ParityDetailVo> getParityDetailGridData(
			ParityDetailVo parityDetailVo) {
		GridData<ParityDetailVo> gd = new GridData<ParityDetailVo>();
		// 分页开始，设置默认值
		Integer start = parityDetailVo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = parityDetailVo.getLimit();
		if (limit == null) {
			limit = 20;
		}
		Purchase purchase = purchaseService.getPurchaseById(parityDetailVo
				.getPurchaseId());

		ParityDetailCondition parityDetailCondition = new ParityDetailCondition();
		parityDetailVo.setStart(start);
		parityDetailVo.setLimit(limit);
		try {
			BeanUtils.copyProperties(parityDetailCondition, parityDetailVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		List<ParityDetail> resultTemps = parityDetailService
				.getParityDetailListByCondition(parityDetailCondition);
		List<ParityDetailVo> results = this.chageParityDetailDatasToVo(
				resultTemps, parityDetailCondition);

		Long count = parityDetailService
				.getCountByCondition(parityDetailCondition);

		// 如果表里没有信息，显示默认值
		if (results.size() == 0) {
			if (purchase != null) {
				parityDetailVo.setPlanner(purchase.getEditor());
				parityDetailVo.setPlannerName(_guserService.getGuserById(
						Long.parseLong(purchase.getEditor())).getTruename());
			}
			results.add(parityDetailVo);
			count++;
		}
		gd.setResults(results);
		gd.setTotalProperty(count);
		return gd;
	}

	/**
	 * 得到比价明细数据 用于 procurementProcessAction.js
	 * 的procurementProcessAction.showParityDetail方法
	 * 
	 * @param pvo
	 * @return
	 */
	@WebRemote
	public String getParityDetailStringData(ParityDetailVo parityDetailVo) {
		// 分页开始，设置默认值
		Integer start = parityDetailVo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = parityDetailVo.getLimit();
		if (limit == null) {
			limit = 20;
		}
	    
		//获取物资数据
		Material material=parityDetailService.getMaterial(parityDetailVo.getMaterialId());
		parityDetailVo.setMaterialItemName(material.getMaterialItemName());
		parityDetailVo.setTechnicCondition(material.getTechnicCondition());
		parityDetailVo.setDemension(material.getDemension());
		parityDetailVo.setMaterialStandard(material.getMaterialStandard());
		parityDetailVo.setDesingnation(material.getDesingnation());
		//比价列表里的计划单价
		parityDetailVo.setPlanPrice(material.getReferencePrice()==null?"0":material.getReferencePrice().toString());//计划单价
		
		// 查找并添加数量
		Purchase purchase = purchaseService.getPurchaseById(parityDetailVo
				.getPurchaseId());
		if (purchase != null) {
			parityDetailVo.setPlanner(purchase.getEditor());
			parityDetailVo.setPlannerName(_guserService.getGuserById(
					Long.parseLong(purchase.getEditor())).getTruename());
			List<ProcurementDetail> procurementDetails = procurementDetailService
					.getByPurchaseAndMaterialId(purchase, parityDetailVo
							.getMaterialId());
			if (procurementDetails != null && procurementDetails.size() > 0) {
				ProcurementDetail procurementDetail = procurementDetails.get(0);
				//测试要求都读实际采购数量
//				if ("2".equals(purchase.getType())) {// 零星单，读实际采购量
					parityDetailVo.setCountNum(procurementDetail
							.getActualNumber().toString());
//				}
//				if ("1".equals(purchase.getType())) {// 年度单，读需订量
//					parityDetailVo.setCountNum(procurementDetail
//							.getNeedNumber().toString());
//				}
				// 读取使用单位
				Procurement procurement = procurementService
						.findProcurementById(procurementDetail
								.getProcurementId());
				if (procurement != null) {
					parityDetailVo.setDepartment(procurement
							.getRequireDemartment());
					if(procurementDetail.getDeliveryDate()!=null)
					parityDetailVo.setDemandTime(smt.format(procurementDetail.getDeliveryDate()));//使用时间
				}
			}
		}
		String userId = identity.getLoginUser().getUserid().toString();
		String userName = _guserService.getGuserById(Long.parseLong(userId))
				.getTruename();
		parityDetailVo.setProvider(userId);
		parityDetailVo.setProviderName(userName);
		
		ParityDetailCondition parityDetailCondition = new ParityDetailCondition();
		parityDetailVo.setStart(start);
		parityDetailVo.setLimit(limit);
		try {
			BeanUtils.copyProperties(parityDetailCondition, parityDetailVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		List<ParityDetail> resultTemps = parityDetailService
				.getParityDetailListByCondition(parityDetailCondition);
		List<ParityDetailVo> results = this.chageParityDetailDatasToVo(
				resultTemps, parityDetailCondition);

		// 如果表里没有信息，显示默认值
		if (results.size() == 0) {
			StringBuffer successBuffer = new StringBuffer();
			successBuffer.append("{success : true, data : ");
			successBuffer.append(parityDetailVo.changeToJsonString());
			successBuffer.append("} ");
			return successBuffer.toString();
		}
		StringBuffer successBuffer = new StringBuffer();
		successBuffer.append("{success : true, data : ");
		successBuffer.append(results.get(0).changeToJsonString());
		successBuffer.append("} ");

		return successBuffer.toString();
	}

	/**
	 * 保存或更新采购清单实体 用于comparePriceForm.js 中的
	 * procurementProcessData.parityDetailPanel方法
	 * 
	 * @param parityDetailVo
	 *            采购清单VO实体
	 * @return String
	 */
	@WebRemote
	public String save(ParityDetailVo parityDetailVo) {
		String[] vendorIds = null;
		if (StringUtils.isNotEmpty(parityDetailVo.getVendorIdString())) {
			vendorIds = parityDetailVo.getVendorIdString().split(":");
		}
		String[] prices = null;
		if (StringUtils.isNotEmpty(parityDetailVo.getPriceString())) {
			prices = parityDetailVo.getPriceString().split(":");
		}
		ParityDetail parityDetail = new ParityDetail();

		SimpleDateFormat d = new SimpleDateFormat("yyyy-MM-dd");
		try {
			parityDetail.setDemandTime(parityDetailVo.getDemandTime()==null?new Date():d.parse(parityDetailVo.getDemandTime()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		parityDetail.setDepartment(parityDetailVo.getDepartment());
		parityDetail.setLastprice(parityDetailVo.getLastprice()==null?BigDecimal.ZERO:BigDecimal.valueOf(Double
				.parseDouble(parityDetailVo.getLastprice())));
		parityDetail.setManufacturerOne(parityDetailVo.getManufacturerOne());
		parityDetail.setManufacturerOneName(parityDetailVo
				.getManufacturerOneName());
		parityDetail.setManufacturerTwo(parityDetailVo.getManufacturerTwo());
		parityDetail.setManufacturerTwoName(parityDetailVo
				.getManufacturerTwoName());

		parityDetail.setMaterialId(parityDetailVo.getMaterialId());
		parityDetail.setParityId(parityDetailVo.getParityId());
		parityDetail.setPlanner(parityDetailVo.getPlanner());
		parityDetail.setPlannerName(parityDetailVo.getPlannerName());
		parityDetail.setPlanPrice(parityDetailVo.getPlanPrice()==null?BigDecimal.ZERO:BigDecimal.valueOf(Double
				.parseDouble(parityDetailVo.getPlanPrice())));
		parityDetail.setProvider(parityDetailVo.getProvider());// 需要根据名称查出来
		parityDetail.setProviderName(parityDetailVo.getProviderName());
		parityDetail.setPurpose(parityDetailVo.getPurpose());
		parityDetail.setRemark(parityDetailVo.getRemark());
		parityDetail.setRemarks(parityDetailVo.getRemarks());
		parityDetail.setScope(parityDetailVo.getScope()==null?BigDecimal.ZERO:BigDecimal.valueOf(Double
				.parseDouble(parityDetailVo.getScope())));
		if (StringUtils.isEmpty(parityDetailVo.getParityDetailId())) {
			parityDetail.setParityDetailId(null);
		} else {
			parityDetail.setParityDetailId(parityDetailVo.getParityDetailId());
		}
		parityDetailService.saveOrUpdateParityDetail(parityDetail);

		ParityVendor parityVendor = null;
		Vendor vendor = null;
		ParityDetail arityDetail = null;
		arityDetail = parityDetailDao.get(parityDetail.getParityDetailId());

		if (StringUtils.isNotEmpty(parityDetailVo.getParityDetailId())) {
			if (StringUtils.isNotEmpty(parityDetailVo.getVendorIdString())) {

				parityVendorService
						.deleteParityVendorByParityDetailId(parityDetailVo
								.getParityDetailId());

				for (int j = 0; j < vendorIds.length; j++) {
					parityVendor = new ParityVendor();
					vendor = vendorService.getVendorById(vendorIds[j]);
					parityVendor.setParityDetail(arityDetail);
					parityVendor.setVendor(vendor);
					if (StringUtils.isNotEmpty(prices[j])) {
						parityVendor.setPrice(BigDecimal.valueOf(Double
								.parseDouble(prices[j])));
					}
					parityVendorService.saveParityVendor(parityVendor);
				}
			}
		} else {
			for (int j = 0; j < vendorIds.length; j++) {
				parityVendor = new ParityVendor();
				vendor = vendorService.getVendorById(vendorIds[j]);
				parityVendor.setParityDetail(arityDetail);
				parityVendor.setVendor(vendor);
				if (StringUtils.isNotEmpty(prices[j])) {
					parityVendor.setPrice(BigDecimal.valueOf(Double
							.parseDouble(prices[j])));
				}
				parityVendorService.saveParityVendor(parityVendor);
			}
		}

		return "{success : true}";
	}

	/**
	 * 得到比价明细数据
	 * 
	 * @param pvo
	 * @return
	 */
	@WebRemote
	public String getParityDetailApprovelData(ParityDetailVo parityDetailVo) {
		ParityCondition parityCondition = new ParityCondition();
		parityCondition.setParityId(parityDetailVo.getParityId());
		parityCondition.setStart(0);
		parityCondition.setLimit(0);
		List<Parity> resultTemps0 = parityService
				.getParityListByCondition(parityCondition);
		List<ParityVo> results0 = parityRemote
				.chageParityDatasToVo(resultTemps0);
		ParityVo parityVo;
		if (results0.size() > 0) {
			parityVo = results0.get(0);
		} else {
			parityVo = new ParityVo();
		}
		parityDetailVo.setParityCode(parityVo.getParityCode());
		parityDetailVo.setMaterialItemName(parityVo.getMaterialItemName());
		parityDetailVo.setDesingnation(parityVo.getDesingnation());
		parityDetailVo.setMaterialStandard(parityVo.getMaterialStandard());
		parityDetailVo.setMaterialId(parityVo.getMaterialId());
		parityDetailVo.setPurchaseId(parityVo.getPurchaseId());
		parityDetailVo.setDemension(parityVo.getDemension());
		parityDetailVo.setTechnicCondition(parityVo.getTechnicCondition());

		// 分页开始，设置默认值
		Integer start = parityDetailVo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = parityDetailVo.getLimit();
		if (limit == null) {
			limit = 20;
		}
		// 查找并添加数量
		Purchase purchase = purchaseService.getPurchaseById(parityDetailVo
				.getPurchaseId());
		if (purchase != null) {
			parityDetailVo.setPlanner(purchase.getEditor());
			parityDetailVo.setPlannerName(_guserService.getGuserById(
					Long.parseLong(purchase.getEditor())).getTruename());
			List<ProcurementDetail> procurementDetails = procurementDetailService
					.getByPurchaseAndMaterialId(purchase, parityDetailVo
							.getMaterialId());
			if (procurementDetails != null && procurementDetails.size() > 0) {
				ProcurementDetail procurementDetail = procurementDetails.get(0);
				if ("2".equals(purchase.getType())) {// 零星单，读实际采购量
					parityDetailVo.setCountNum(procurementDetail
							.getActualNumber()
							+ "");
				}
				if ("1".equals(purchase.getType())) {// 年度单，读需订量
					parityDetailVo.setCountNum(procurementDetail
							.getNeedNumber()
							+ "");
				}
				// 读取使用单位
				Procurement procurement = procurementService
						.findProcurementById(procurementDetail
								.getProcurementId());
				if (procurement != null) {
					parityDetailVo.setDepartment(procurement
							.getRequireDemartment());
				}
			}
		}
		ParityDetailCondition parityDetailCondition = new ParityDetailCondition();
		parityDetailVo.setStart(start);
		parityDetailVo.setLimit(limit);
		try {
			BeanUtils.copyProperties(parityDetailCondition, parityDetailVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		parityDetailCondition.setShowOnly("1");
		List<ParityDetail> resultTemps = parityDetailService
				.getParityDetailListByCondition(parityDetailCondition);
		List<ParityDetailVo> results = this.chageParityDetailDatasToVo(
				resultTemps, parityDetailCondition);

		// 如果表里没有信息，显示默认值
		if (results.size() == 0) {
			StringBuffer successBuffer = new StringBuffer();
			successBuffer.append("{success : true, data : ");
			successBuffer.append(parityDetailVo.changeToJsonString());
			successBuffer.append("} ");
			return successBuffer.toString();
		}
		StringBuffer successBuffer = new StringBuffer();
		successBuffer.append("{success : true, data : ");
		successBuffer.append(results.get(0).changeToJsonString());
		successBuffer.append("} ");

		return successBuffer.toString();
	}
}
