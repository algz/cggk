package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorService;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail.ProcurementSummaryDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail.ProcurementSummaryDetailVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;

/**
 * 采购需求明细Remote
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-27
 */
@Name("procurementDetail_ProcurementDetailRemote")
public class ProcurementDetailRemote {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;

	@In(create = true, value = "material_MaterialServiceImpl")
	private MaterialService materialService;

	@In(create = true, value = "vendor_VendorServiceImpl")
	private VendorService vendorService;
	
	@In(create = true, value = "procurementSummaryDetailServiceImpl")
	private ProcurementSummaryDetailService procurementSummaryDetailService;

	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)), BigDecimal.class);

		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}

	/**
	 * 获取物资不同机型的需求信息
	 */
	@WebRemote
	public GridData<ProcurementSummaryDetailVo> getProcurementSummaryDetailList(ProcurementSummaryDetailVo vo) {
//		ProcurementSummaryDetailVo vo = new ProcurementSummaryDetailVo();
//		vo.setProcurementDetailId(procurementDetailVo.getProcurementDetailId());
//		vo.setMaterialId(procurementDetailVo.getMaterialId());
		List<ProcurementSummaryDetailVo> list =  procurementSummaryDetailService.getProcurementSummaryDetailList(vo);
		GridData<ProcurementSummaryDetailVo> gridData = new GridData<ProcurementSummaryDetailVo>();
		gridData.setResults(list);  
		return gridData;
	}
	
	/**
	 * 获取需求详情信息
	 */
	@WebRemote
	public GridData<ProcurementDetailVo> getGridData(final ProcurementDetailVo procurementDetailVo) throws Exception {

		String procurementId = procurementDetailVo.getProcurementId();



		// String[] materialIds = {};
		String nodeId = procurementDetailVo.getNodeId();
		// if (StringUtils.isNotEmpty(nodeId)) {
		// // 通过物料种类节点获得相应的物料信息集合
		// List<Material> materials = materialService
		// .findAllMaterialsByMaterialCatalogId(nodeId);
		// if (materials.size() > 0) {
		// materialIds = new String[materials.size()];
		// for (int i = 0; i < materialIds.length; i++) {
		// materialIds[i] = materials.get(i).getMaterialid();
		// }
		// } else {
		// // 通过catalogId查不到物料集合时，做特殊设置，以便后续程序处理
		// materialIds = new String[] { "nomaterialid" };
		// }
		// }

		if(procurementDetailVo.getType()==null||procurementDetailVo.getType().equals("")){
			return null;
		}
		List<ProcurementDetail> procurementDetails = null;

		switch (ProcurementTypeEnum.getByValue(procurementDetailVo.getType())) {
		case NIAN_DU:
			// 获得年度需求明细
			if (StringUtils.isEmpty(procurementId)&&StringUtils.isEmpty(procurementDetailVo.getPurchaseId())) {
				return null;
		    }
//			procurementDetails = procurementDetailService.getAnnualDetailByMaterial(procurementId, nodeId, procurementDetailVo.getStart(), procurementDetailVo.getLimit(),
//					pieceType, procurementDetailVo.getMaterialCatLogId(), procurementDetailVo.getMaterialBuyType());
//			procurementDetails = procurementDetailService.getAnnualDetail(procurementDetailVo);
// 			break;
			
			GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
			gridData.setResults(procurementDetailService.getAnnualProcumentDetail(procurementDetailVo));
            gridData.setTotalProperty(procurementDetailVo.getCount());
            return gridData;
		
		
		case LING_XING:
			// 获得零星需求明细
			if (StringUtils.isEmpty(procurementId)) {
				return null;
		    }
			procurementDetails = procurementDetailService.getSporadicDetailByMaterial(procurementId, nodeId, procurementDetailVo.getStart(), procurementDetailVo.getLimit(),
					procurementDetailVo.getPieceType(), procurementDetailVo.getMaterialCatLogId());
			break;
		default:
			return null;
		}

		// 将ProcurementDetail集合转换为ProcurementDetailVo集合
		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
		List<Object[]> obList = null;
		BigDecimal temp1 = null;
		for (ProcurementDetail procurementDetail : procurementDetails) {
			ProcurementDetailVo temp = new ProcurementDetailVo();
			BeanUtils.copyProperties(temp, procurementDetail);
			temp.setMaterialCode(procurementDetail.getMaterialitemcode());
			String materialTypeName = procurementDetailVo.getMaterialTypeName();
			if (StringUtils.isNotEmpty(materialTypeName)) {
				temp.setMaterialTypeName(materialTypeName);
			}
			// 通过物料信息获取库存相关信息
			//对所有物料进行综合平衡,然后按条件进行筛选
			obList = procurementDetailService.getWmsInfoByMaterial(temp);
			// 对平衡的内容进行赋值
			if (obList != null && obList.size() == 1) {
				temp.setLast_year_consume(obList.get(0)[0] == null ? "" : String.valueOf(Math.abs(Float.parseFloat(obList.get(0)[0].toString()))));
				temp.setSubtotal(obList.get(0)[1] == null ? "" : obList.get(0)[1].toString());
				temp.setStoreNumber(obList.get(0)[2] == null ? "" : obList.get(0)[2].toString());
				temp.setNoCheck(obList.get(0)[3] == null ? "" : obList.get(0)[3].toString());
				temp.setContract(obList.get(0)[4] == null ? "" : obList.get(0)[4].toString());
				temp.setOnNumber(obList.get(0)[5] == null ? "" : obList.get(0)[5].toString());
				temp.setOperable(obList.get(0)[6] == null ? "" : obList.get(0)[6].toString());
				// temp.setHalf_year_consume(obList.get(0)[7]==null?"":obList.get(0)[7].toString());
				temp.setHalf_year_consume(procurementDetail.getSept().add(procurementDetail.getDect()).toString());
				if (!temp.getSubtotal().equals("")) {
					temp1 = new BigDecimal(temp.getSubtotal().equals("") ? "0" : temp.getSubtotal()).subtract(new BigDecimal(temp.getHalf_year_consume().equals("") ? "0" : temp
							.getHalf_year_consume()));
					if (temp1.doubleValue() > 0) {
						temp.setYear_inventory(temp1.toString());
					} else
						temp.setGap_number(String.valueOf(Math.abs(Float.parseFloat(temp1.toString()))));
				}
				temp1 = new BigDecimal(temp.getMaterialCounts()).subtract(new BigDecimal(obList.get(0)[8] == null ? "" : obList.get(0)[8].toString()));
				if (temp1.doubleValue() > 0) {
					temp.setNumber_applications(temp1.toString());
				} else {
					temp.setSubtotal_number(String.valueOf(Math.abs(Float.parseFloat(temp1.toString()))));
				}
			}
			// 累计发放批次数
			temp.setProvideNumber(procurementDetailService.getProvideNumber(temp));
			processVendorName(procurementDetail, temp);
			procurementDetailVos.add(temp);
		}

		GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
		gridData.setResults(procurementDetailVos);
		if (procurementDetailVo.getType().equals("2")){
			gridData.setTotalProperty(procurementDetailService.countProcurementDetailByMaterial(procurementId, nodeId, procurementDetailVo.getMaterialCatLogId()));
		}else{
			//年度经营计划
//			gridData.setTotalProperty(procurementDetailService.getAnnualDetailByMaterialIdsCount(procurementId, nodeId, pieceType, procurementDetailVo.getMaterialCatLogId(),
//					procurementDetailVo.getMaterialBuyType()));
			gridData.setTotalProperty(procurementDetailVo.getCount());
		}
		return gridData;
	}

	/**
	 * 获取累计发放的信息列表
	 */
	@WebRemote
	public GridData<ProcurementDetailVo> getProvideInfo(ProcurementDetailVo procurementDetailVo) {
		GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
		List<ProcurementDetailVo> ProcurementDetailVoList = new ArrayList<ProcurementDetailVo>();
		List<Object[]> obList = procurementDetailService.getProvideInfo(procurementDetailVo);
		if (obList != null && obList.size() > 0) {
			ProcurementDetailVo vo = null;
			for (Object[] ob : obList) {
				if (ob != null) {
					vo = new ProcurementDetailVo();
					vo.setProvideId(ob[0] == null ? "" : ob[0].toString());
					vo.setMaterialCode(ob[1] == null ? "" : ob[1].toString());
					vo.setProductCode(ob[2] == null ? "" : ob[2].toString());
					vo.setBatchNo(ob[3] == null ? "" : ob[3].toString());
					vo.setProvideNumber(ob[4] == null ? "" : ob[4].toString());
					vo.setProvideDate(ob[5] == null ? "" : ob[5].toString());
					ProcurementDetailVoList.add(vo);
				}
			}
		}
		gridData.setResults(ProcurementDetailVoList);
		gridData.setSuccess(true);
		gridData.setTotalProperty(procurementDetailService.getProvideInfoCount(procurementDetailVo).longValue());
		return gridData;
	}

	/**
	 * 获取年度计划需求明细
	 */
	@WebRemote
	public GridData<ProcurementDetailVo> getPurchaseForAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		
		List<ProcurementDetailVo> procurementDetails = procurementDetailService.getPurchaseForAnnualPlan(procurementDetailVo);
//			procurementDetailService.getByPurchaseId(procurementDetailVo.getPurchaseId(), procurementDetailVo.getStart(),
//				procurementDetailVo.getLimit(), procurementDetailVo.getPurchaseType());
			GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
			gridData.setResults(procurementDetails);
			gridData.setTotalProperty(procurementDetailVo.getCount());
			return gridData;
//		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
//		for (ProcurementDetail procurementDetail : procurementDetails) {
//			ProcurementDetailVo temp = new ProcurementDetailVo();
//			BeanUtils.copyProperties(temp, procurementDetail);
//			if (procurementDetail.getPurchaseType() != null)
//				temp.setPurchaseTypeName(PurchaseTypeEnum.getByValue(procurementDetail.getPurchaseType()).getName());
//			if (procurementDetail.getVendorId() != null) {
//				processVendorName(procurementDetail, temp);
//			}
//			temp.setProvideNumber(procurementDetailService.getProvideNumber(temp));
//			temp.setDepartment(procurementDetailService.getDepartment(procurementDetail));
//			procurementDetailVos.add(temp);
//		}
//		List<ProcurementDetailVo> handleProcurementDetailVos = new ArrayList<ProcurementDetailVo>();
//
//		
//
//		handleProcurementDetailVos.addAll(procurementDetailVos);
//
//		GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
//		gridData.setResults(handleProcurementDetailVos);
//		gridData.setTotalProperty(procurementDetailService.countByPurchaseId(procurementDetailVo.getPurchaseId()));
//		return gridData;

	}
	
	/**
	 * 获取计划明细
	 */
	@WebRemote
	public GridData<ProcurementDetailVo> getPurchaseGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		List<ProcurementDetail> procurementDetails = procurementDetailService.getByPurchaseId(procurementDetailVo.getPurchaseId(), procurementDetailVo.getStart(),
				procurementDetailVo.getLimit(), procurementDetailVo.getPurchaseType());

		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			ProcurementDetailVo temp = new ProcurementDetailVo();
			BeanUtils.copyProperties(temp, procurementDetail);
			if (procurementDetail.getPurchaseType() != null)
				temp.setPurchaseTypeName(PurchaseTypeEnum.getByValue(procurementDetail.getPurchaseType()).getName());
			if (procurementDetail.getVendorId() != null) {
				processVendorName(procurementDetail, temp);
			}
			//temp.setProvideNumber(procurementDetailService.getProvideNumber(temp));//累计发放数量
			temp.setDepartment(procurementDetailService.getDepartment(procurementDetail));
			procurementDetailVos.add(temp);
		}
		List<ProcurementDetailVo> handleProcurementDetailVos = new ArrayList<ProcurementDetailVo>();

		// // 如果是零星清单,汇总 --- 业务给出意见，不用汇总
		// if (ProcurementTypeEnum.LING_XING.getValue().equals(
		// procurementDetailVo.getPurchaseType())) {
		// for (int i = 0; i < procurementDetailVos.size(); i++) {
		// ProcurementDetailVo procurementDetailVoTemp = procurementDetailVos
		// .get(i);
		// String procurementDetailString = procurementDetailVoTemp
		// .getMaterialItemName()
		// + "@"
		// + procurementDetailVoTemp.getDemension()
		// + "@"
		// + procurementDetailVoTemp.getMaterialStandard()
		// + "@"
		// + procurementDetailVoTemp.getTechnicCondition()
		// + "@"
		// + procurementDetailVoTemp.getPurchaseType();
		// if (pdvoMap.get(procurementDetailString) == null) {
		// // 如果map里没有,新加入
		// pdvoMap.put(procurementDetailString,
		// procurementDetailVoTemp);
		// keyStrings.add(procurementDetailString);
		// } else {
		// // 如果map里有，汇总需求量
		// pdvoMap.get(procurementDetailString).setMaterialCounts(pdvoMap.get(procurementDetailString).getMaterialCounts()+
		// procurementDetailVoTemp.getMaterialCounts());
		// pdvoMap.get(procurementDetailString).setBackNumber(pdvoMap.get(procurementDetailString).getBackNumber()+
		// procurementDetailVoTemp.getBackNumber());
		// pdvoMap.get(procurementDetailString).setOnNumber(pdvoMap.get(procurementDetailString).getOnNumber()+
		// procurementDetailVoTemp.getOnNumber());
		// pdvoMap.get(procurementDetailString).setStoreNumber(pdvoMap.get(procurementDetailString).getStoreNumber()+
		// procurementDetailVoTemp.getStoreNumber());
		// pdvoMap.get(procurementDetailString).setNoCheck(pdvoMap.get(procurementDetailString).getNoCheck()+
		// procurementDetailVoTemp.getNoCheck());
		// pdvoMap.get(procurementDetailString).setOperable(pdvoMap.get(procurementDetailString).getOperable()+
		// procurementDetailVoTemp.getOperable());
		// pdvoMap.get(procurementDetailString).setNoExpend(pdvoMap.get(procurementDetailString).getNoExpend()+
		// procurementDetailVoTemp.getNoExpend());
		// pdvoMap.get(procurementDetailString).setActualNumber(pdvoMap.get(procurementDetailString).getActualNumber()+
		// procurementDetailVoTemp.getActualNumber());
		// }
		// }
		// for (int j = 0; j < keyStrings.size(); j++) {
		// handleProcurementDetailVos.add(pdvoMap.get(keyStrings.get(j)));
		// }
		// } else {// 年度采购计划清单

		handleProcurementDetailVos.addAll(procurementDetailVos);
		// }

		GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
		gridData.setResults(handleProcurementDetailVos);
		gridData.setTotalProperty(procurementDetailService.countByPurchaseId(procurementDetailVo.getPurchaseId()));
		return gridData;

	}

	/**
	 * 通过合同获得采购计划清单
	 * 
	 */
	@WebRemote
	public GridData<ProcurementDetailVo> getGridDataByContract(ProcurementDetailVo procurementDetailVo) throws Exception {

		String contractId = procurementDetailVo.getContractId();

		if (StringUtils.isEmpty(contractId)) {
			return null;
		}

		List<ProcurementDetail> procurementDetails = procurementDetailService.getProcurementDetailByContract(procurementDetailVo);
		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			ProcurementDetailVo temp = new ProcurementDetailVo();
			BeanUtils.copyProperties(temp, procurementDetail);
//			temp.setPurchaseTypeName(PurchaseTypeEnum.getByValue(procurementDetail.getPurchaseType()).getName());
			if(procurementDetail.getPurchaseType().equals("5")){
				temp.setPurchaseTypeName("直接采购");
			}else{
				temp.setPurchaseTypeName(PurchaseTypeEnum.getByValue(procurementDetail.getPurchaseType()).getName());
			}
			processVendorName(procurementDetail, temp);
			procurementDetailVos.add(temp);
		}
		GridData<ProcurementDetailVo> gridData = new GridData<ProcurementDetailVo>();
		gridData.setResults(procurementDetailVos);
		gridData.setTotalProperty(procurementDetailVo.getCount());
		return gridData;
	}

	@WebRemote
	public String saveGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		String updateRecords = procurementDetailVo.getUpdateRecords();
		if (StringUtils.isNotEmpty(updateRecords)) {
			List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
			JSONArray records = JSONArray.fromObject(updateRecords);
			for (int i = 0; i < records.size(); i++) {
				JSONObject obj = records.getJSONObject(i);
				ProcurementDetail dest = (ProcurementDetail) JSONObject.toBean(obj, ProcurementDetail.class);
				procurementDetails.add(dest);
			}
			try {
				this.procurementDetailService.batchUpdateProcurementDetails(procurementDetails);
			} catch (BusinessDataStateException e) {
				return "{success:false,msg:'" + e.getMessage() + "'}";
			}
		}
		return "{success:true}";
	}

	/**
	 * 用于零星采购计划的保存 在newLingXingPanel.js 中
	 * procurementProcessData.downPanel的提交操作中使用，用于零星采购计划的保存
	 * 
	 */
	@WebRemote
	public String updateGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		String updateRecords = procurementDetailVo.getUpdateRecords();
		if (StringUtils.isNotEmpty(updateRecords)) {
			List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
			// 1、把获取的字符串转化为json对象数据
			JSONArray records = JSONArray.fromObject(updateRecords);
			for (int i = 0; i < records.size(); i++) {
				JSONObject obj = records.getJSONObject(i);
				ProcurementDetail dest = (ProcurementDetail) JSONObject.toBean(obj, ProcurementDetail.class);

				String type = PurchaseTypeEnum.getByName(dest.getPurchaseType()).getValue();

				dest.setPurchaseType(type);
				dest.setNewProcessType(ProcurementTypeEnum.LING_XING.getValue());
				String reIds = dest.getReIds();
				// 2、拆分字符串、恢复没被汇总的数据
				if (StringUtils.isNotBlank(reIds)) {
					String[] reTempIds = reIds.split("@");
					for (int j = 0; j < reTempIds.length; j++) {
						String tempId = reTempIds[j];

						if (StringUtils.isNotBlank(tempId)) {
							ProcurementDetail proDeTemp = new ProcurementDetail();

							if (j != 0) {
								dest.setActualNumber(new BigDecimal(0));
								dest.setNeedNumber(new BigDecimal(0));
								dest.setNoCheck(new BigDecimal(0));
								dest.setNoExpend(new BigDecimal(0));
								dest.setStoreNumber(new BigDecimal(0));
								dest.setOnNumber(new BigDecimal(0));
								dest.setOperable(new BigDecimal(0));
								dest.setBackNumber(new BigDecimal(0));
							}
							if (dest.getActualNumber() == null) {
								dest.setActualNumber(new BigDecimal(0));
							}
							int k = 0;
							if (dest.getDeliveryDate() == null) {
								k++;
								dest.setDeliveryDate(new Date());
							}
							BeanUtils.copyProperties(proDeTemp, dest);
							if (k > 0) {
								proDeTemp.setDeliveryDate(null);
							}
							proDeTemp.setProcurementDetailId(tempId);
							procurementDetails.add(proDeTemp);
						}

					}
				}

			}
			// 批量入库
			try {
				this.procurementDetailService.batchAddProPurchaseDetails(procurementDetails);
			} catch (BusinessDataStateException e) {
				e.printStackTrace();
				return "{success:false,msg:'" + e.getMessage() + "'}";
			}
		}
		return "{success:true}";
	}

	/**
	 * 在展示（零星清单）采购计划详细信息时，进行对‘待审批’的计划进行修改并保存的方法
	 */
	@WebRemote
	public String updateViewGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		List<ProcurementDetail> procurementDetails = updateGridDate(procurementDetailVo, ProcurementTypeEnum.LING_XING);
		// 批量入库
		try {
			this.procurementDetailService.batchUpdateViewProcurementDetails(procurementDetails);
		} catch (BusinessDataStateException e) {
			return "{success:false,msg:'" + e.getMessage() + "'}";
		}
		return "{success:true}";
	}

	/**
	 * 在展示（年度清单）采购计划详细信息时，进行对‘待审批’的计划进行修改并保存的方法
	 */
	@WebRemote
	public String updateViewYearGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		List<ProcurementDetail> procurementDetails = updateGridDate(procurementDetailVo, ProcurementTypeEnum.NIAN_DU);
		// 批量入库
		try {
			this.procurementDetailService.batchUpdateViewProcurementDetails(procurementDetails);
		} catch (BusinessDataStateException e) {
			return "{success:false,msg:'" + e.getMessage() + "'}";
		}
		return "{success:true}";
	}

	/**
	 * 保存年度采购计划
	 */
	@WebRemote
	public String updateYearGridData(ProcurementDetailVo procurementDetailVo) throws Exception {
		List<ProcurementDetail> procurementDetails = updateGridDate(procurementDetailVo, ProcurementTypeEnum.NIAN_DU);
		// 批量入库
		try {
			this.procurementDetailService.batchAddProPurchaseDetails(procurementDetails);
		} catch (BusinessDataStateException e) {
			return "{success:false,msg:'" + e.getMessage() + "'}";
		}
		return "{success:true}";
	}
	
	// 将JSON对象转换为ProcurementDetail对象集合
	private List<ProcurementDetail> updateGridDate(ProcurementDetailVo procurementDetailVo, ProcurementTypeEnum procurementTypeEnum) {
		String updateRecords = procurementDetailVo.getUpdateRecords();
		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
		if (StringUtils.isNotEmpty(updateRecords)) {
			JSONArray records = JSONArray.fromObject(updateRecords);
			for (int i = 0; i < records.size(); i++) {
				JSONObject obj = records.getJSONObject(i);
				ProcurementDetail dest = (ProcurementDetail) JSONObject.toBean(obj, ProcurementDetail.class);
				if (dest.getPurchaseType() != null && !dest.getPurchaseType().equals("")) {
					String type = PurchaseTypeEnum.getByName(dest.getPurchaseType()).getValue();
					dest.setPurchaseType(type);
				}
				dest.setNewProcessType(procurementTypeEnum.getValue());
				switch (procurementTypeEnum) {
				case NIAN_DU:
					// 年度：将需订量同步到实际采购量，方便后续监控的查询
					// dest.setActualNumber(dest.getNeedNumber());
					break;

				case LING_XING:
					dest.setDeliveryDate(new Date());
					break;
				}
				procurementDetails.add(dest);
			}
		}
		return procurementDetails;
	}

	// 处理供应商名称
	private void processVendorName(ProcurementDetail procurementDetail, ProcurementDetailVo procurementDetailVo) {
		Vendor vendor = vendorService.getVendorById(procurementDetail.getVendorId());
		if (vendor != null) {
			procurementDetailVo.setVendorName(vendor.getVendorName());
		}
	}

	/**
	 * 提交年度定额计划
	 */
	@WebRemote
	public String submitAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		
		//List<ProcurementDetail> procurementDetails = updateGridDate(procurementDetailVo, ProcurementTypeEnum.NIAN_DU);
		// 批量入库
		try {
			procurementDetailService.submitAnnualPlan(procurementDetailVo);
			//this.procurementDetailService.batchAddProPurchaseDetails(procurementDetails);
		} catch (BusinessDataStateException e) {
			return "{success:false,msg:'" + e.getMessage() + "'}";
		}
		return "{success:true}";
	}
	
	
	/**
	 * 实时保存年度采购计划提交数据
	 */
	@WebRemote
	public String realtimeSaveAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		try {
			procurementDetailService.realtimeSaveAnnualPlan(procurementDetailVo);
		} catch (Exception e) {
			return "{success:false,msg:'" + e.getLocalizedMessage() + "'}";
		}
		return "{success:true}";
	}
	
	
	/**
	 * 实时保存年度采购计划提交数据
	 */
	@WebRemote
	public String removeAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		try {
			procurementDetailService.removeAnnualPlan(procurementDetailVo);
		} catch (Exception e) {
			return "{success:false,msg:'" + e.getLocalizedMessage() + "'}";
		}
		return "{success:true}";
	}
	
	/**
	 * 合同物资详情列表
	 * @return
	 */
	@WebRemote
	public JSONObject getContractInfoDetailList(ProcurementDetailVo vo){
		JSONObject json=new JSONObject();
		JSONArray ja=new JSONArray();
//		vo.setChanger(identity.getLoginUser().getLoginname());//只为传递参数使用
		List<Object[]> list=procurementDetailService.getContractInfoDetailList(vo);
		for(Object[]objs:list){
			JSONObject jo=new JSONObject();
			jo.put("auditcode", objs[0]);//审签单编号
			jo.put("contractcode",objs[1] );//合同编号
			jo.put("contractname", objs[2]);//合同名称
			jo.put("materialitemcode",objs[3] );//物资编码
			jo.put("materialitemname",objs[4] );//物资名称
			jo.put("desingnation", objs[5]);//物资牌号
			jo.put("materialstandard",objs[6] );//物资规格
			jo.put("techniccondition", objs[7]);//技术条件
			jo.put("referenceprice", objs[8]);//物资单价
			jo.put("demension",objs[9] );//技量单位
			jo.put("materialcatalog_name", objs[10]);//物资种类
			jo.put("declare_detil_id", objs[11]);
			jo.put("taskno", objs[12]);//任务编号
			jo.put("declare_detil_status", objs[13]);//申报记录状态
			jo.put("quantity", objs[14]);//需求量
			jo.put("oldquantity",objs[15] );//申报记录原数据
			jo.put("changer",objs[16] );//变更人
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			jo.put("changtime",objs[17]==null?"":sdf.format(objs[17]) );//变更时间
			jo.put("changreson", objs[18]);//变更原因
			jo.put("materialcounts",objs[19] );//申请量
			jo.put("actualnumber", objs[20]);//建议采购量
			jo.put("plancode", objs[21]);//采购计划编号
			jo.put("deliveryStatus", objs[22]==null?"":objs[22].toString());//交货状态
			ja.add(jo);
		}
		json.put("totalProperty", vo.getCount());
		json.put("results", ja);
		json.put("success", true);
		return json;
	}
	
	/**
	 * 年度计划物资详情列表
	 * @param vo
	 * @return
	 */
	@WebRemote
	public JSONObject getBuinessPlanInfoDetailList(ProcurementDetailVo vo){
		JSONObject json=new JSONObject();
		JSONArray ja=new JSONArray();
		List<Object[]> list=procurementDetailService.getBuinessPlanInfoDetailList(vo);
		for(Object[]objs:list){
			JSONObject jo=new JSONObject();
			jo.put("materialitemcode",objs[0] );//物资编码
			jo.put("materialitemname",objs[1] );//物资名称
			jo.put("desingnation", objs[2]);//物资牌号
			jo.put("materialstandard",objs[3] );//物资规格
			jo.put("techniccondition", objs[4]);//技术条件
			jo.put("referenceprice", objs[5]);//物资单价
			jo.put("demension",objs[6] );//技量单位
			jo.put("materialcatalog_name", objs[7]);//物资种类
			jo.put("materialcounts",objs[8] );//申请量
			jo.put("actualnumber", objs[9]);//建议采购量
			jo.put("purchasename",objs[10] );//计划名称
			jo.put("purchasecode", objs[11]);//计划编号
			
//			jo.put("taskno", objs[8]);//任务编号
//			jo.put("oldquantity",objs[9] );//申报记录原数据
//			jo.put("changer",objs[13] );//变更人
//			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
//			jo.put("changtime",objs[14]==null?"":sdf.format(objs[14]) );//变更时间
//			jo.put("changreson", objs[15]);//变更原因
			ja.add(jo);
		}
		json.put("totalProperty", vo.getCount());
		json.put("results", ja);
		json.put("success", true);
		return json;
	}
	
	/**
	 * 确认入库
	 * @return
	 */
	@WebRemote
	public String changeToConfirm(ProcurementDetailVo vo){
		this.procurementDetailService.changeToConfirm(vo);
		return "{success:true}";
	}
	
	@WebRemote
	public String resolveProcurementDetail(ProcurementDetailVo vo){
		String msg=procurementDetailService.resolveProcurementDetail(vo);
		return "{success:true,msg:"+msg+"}";
	}
	
}
