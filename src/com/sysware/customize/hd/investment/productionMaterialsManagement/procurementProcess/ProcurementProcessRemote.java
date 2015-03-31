package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.lang.reflect.InvocationTargetException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.base.dao.GroleUserDAO;
import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

@Name("procurementProcessRemote")
public class ProcurementProcessRemote {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "com_base_dao_GroleUserDAO")
	GroleUserDAO roleUserDao;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;

	@In(create = true, value = "guser_GuserServiceImpl")
	GuserService _guserService;

	@In(create = true, value = "department_DepartmentServiceImpl")
	private DepartmentService _departmentService;

	private static final DateFormat shortDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd");

	/**
	 * 得到采购清单数据 ，在procurementProcessData.js中procurementProcessData.centerPanel使用
	 * 
	 * 采购计划展示列表，包括年度计划和零星计划，列表显示简要信息
	 * 
	 * @param pvo
	 *            PurchaseVo
	 * 
	 * @return GridData<PurchaseVo>
	 */
	@WebRemote
	public GridData<PurchaseVo> getPurchaseGridData(PurchaseVo pvo) {

		// 分页开始，设置默认值
		Integer start = pvo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = pvo.getLimit();
		if (limit == null) {
			limit = 20;
		}

		PurchaseCondition purchaseCondition = new PurchaseCondition();
		purchaseCondition.setStart(start);
		purchaseCondition.setLimit(limit);
		purchaseCondition.setPurchaseCode(pvo.getPurchaseCode());//采购计划编号
		purchaseCondition.setSearchCatlogName(pvo.getSearchCatlogName());// 設置物料种类名称查询条件
		purchaseCondition.setSearchMaterialName(pvo.getSearchMaterialName());// 设置物料信息名称查询条件
//		purchaseCondition.setEditor(identity.getLoginUser().getUserid().toString());//设置仅能看到自已的计划
		purchaseCondition.setPurchaseType(pvo.getType());
		purchaseCondition.setStatus(pvo.getStatus());
		GridData<PurchaseVo> gd = new GridData<PurchaseVo>();
		gd.setResults(purchaseService.getPurchaseListByCondition(purchaseCondition));
		gd.setTotalProperty(purchaseCondition.getCount());
//		gd.setTotalProperty(purchaseService.getCountByCondition(purchaseCondition));
		return gd;
	}

	/**
	 * 得到空数据，downpanel初始化 在newLingXingPanel.js 的
	 * procurementProcessData.downPanel 中使用，用于添加汇总之前的下部面板初始化
	 * 
	 * @param pvo
	 *            PurchaseVo
	 * 
	 * @return GridData<PurchaseVo>
	 */
	@WebRemote
	public GridData<PurchaseVo> getNullGridData(PurchaseVo pvo) {
		return null;
	}

	/**
	 * 保存或更新采购清单实体
	 * 
	 * @param pvo
	 *            PurchaseVo 采购清单VO实体
	 * 
	 * @return String
	 */
	@WebRemote
	public String save(PurchaseVo pvo) {
		Purchase purchase = new Purchase();
		try {
			BeanUtils.copyProperties(purchase, pvo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		if (StringUtils.isEmpty(pvo.getPurchaseId())) {
			purchase.setPurchaseId(null);
		} else {
			purchase.setPurchaseId(pvo.getPurchaseId());
		}

		purchaseService.saveOrUpdatePurchase(purchase);

		return "{success : true}";
	}

	/**
	 * 删除采购清单实体集 在procurementProcessAction.js 的procurementProcessAction.del中使用
	 * 采购计划删除方法，只能删除待审批状态下的采购计划
	 * 
	 * @param ids
	 *            采购实体ID数组
	 * 
	 * @return String 是否完全删除采购数组
	 */
	@WebRemote
	public String deletePurchase(String[] ids) {
		purchaseService.deletePurchase(ids);
		return "true";
	}

	/**
	 * 送审采购清单，详情查看，根据id获取类型
	 * 
	 * @param ids
	 *            采购实体ID数组
	 * @return 类型值
	 */
	@WebRemote
	public String getTypeById(String[] ids) {
		Purchase p = purchaseService.getPurchaseById(ids[0]);
		if (p != null) {// 如果不为空，返回类型值
			return p.getType();
		}
		return "";
	}

	/**
	 * 生成比价、招标、合同数据 用于procurementProcessAction.js中
	 * procurementProcessAction.generateParityContractData方法
	 * 
	 * @param pvo
	 *            PurchaseVo 采购清单VO实体
	 * 
	 * @return String 成功JSON值
	 */
	@WebRemote
	public String generateParityAndContract(PurchaseVo pvo) {
		
		String purchaseId = pvo.getPurchaseId();
		String updateRecords = pvo.getUpdateRecords();
		String type = pvo.getType();
//		T_PROCUREMENTDETAIL采购需求明细id
		String[] ddIds = updateRecords.split(",");
		String msg = "";
		try {
//			1.处理ProcurementDetail数据
			msg = purchaseService.createParityContractData(ddIds,purchaseId,type);
//			2.判断处理是否所有的purchaseId对应的ProcurementDetail数据已生成
			msg = msg + purchaseService.handlerPurchaseByCount(purchaseId);
			return "{success : "+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
		} catch (Exception e) {
			e.printStackTrace();
			msg = e.getLocalizedMessage();
			return "{success:false,msg:'"+msg+"'}";
		}
		
		/*注释掉的为旧的采购计划列表数据生成比价、投标、协议、直接采购方式方法
		 * String updateRecords = pvo.getUpdateRecords();
		String purchaseIds[] = updateRecords.split(",");
		String msg="";
		// 如果比价与合同表中有此清单数据,给出提示
		for (String purchaseId : purchaseIds) {
			msg=purchaseService.createParityContractDataByPurchaseId(purchaseId);
		}*/
	}

	/**
	 * 送审后修改申请状态为审批中 用于procurementProcessAction.js 中 success方法中
	 * 
	 * @param ID
	 *            String[]
	 * 
	 * @return String
	 */
	@WebRemote
	public String updateProperties(String ID[]) {
		purchaseService.updateProperties(ID,
				ApplicationStatusEnum.SHEN_PI_ZHONG.getValue());
		return "[true]";
	}

	/**
	 * 将Purchase实体集合转换为PurchaseVo集合
	 * 
	 * @param Purchase实体集合
	 * 
	 * @return PurchaseVo集合
	 */
	private List<PurchaseVo> chagePurchaseDatasToVo(List<Purchase> purchases) {
		List<PurchaseVo> purchaseVos = new ArrayList<PurchaseVo>();
		if (purchases != null && purchases.size() > 0) {
			for (Purchase purchase : purchases) {
				purchaseVos.add(this.chagePurchaseDataToVo(purchase));
			}
		}
		return purchaseVos;
	}

	/**
	 * 将Purchase实体转换为PurchaseVo
	 * 
	 * @param Purchase实体
	 * 
	 * @return PurchaseVo
	 */
	private PurchaseVo chagePurchaseDataToVo(Purchase purchase) {
		PurchaseVo purchaseVo = new PurchaseVo();
		// 创建日期
		purchaseVo.setCreateDate(purchase.getCreateDate() == null ? ""
				: shortDateFormat.format(purchase.getCreateDate()));
		// 申请状态
		String status = purchase.getStatus();
		purchaseVo.setStatus(status);
		purchaseVo.setStateName(ApplicationStatusEnum.getByValue(status)
				.getName());
		// 需求类型
		String procurementType = purchase.getType();
		purchaseVo.setType(procurementType);
		purchaseVo.setPurchaseTypeName(ProcurementTypeEnum.getByValue(
				procurementType).getName()
				+ "需求");
		// 编辑人信息
		String editor = purchase.getEditor();
		purchaseVo.setEditor(editor);
		Guser guser = _guserService.getGuserById(Long.parseLong(editor));
		purchaseVo.setEditorName(guser.getTruename());
		String deptCode = guser.getGinstitute().getInstcode();
		String deptName = _departmentService.getDepartmentByCode(deptCode)
				.getDepartmetname();
		purchaseVo.setEditorDeptName(deptName);

		purchaseVo.setMaterialTypeName(purchase.getMaterialTypeName());
		purchaseVo.setPurchaseCode(purchase.getPurchaseCode());
		purchaseVo.setPurchaseId(purchase.getPurchaseId());
		purchaseVo.setRemark(purchase.getRemark());

		return purchaseVo;
	}
	
	
	/**
	 * 定额计划列表中获取采购需求数据
	 * 
	 * @param pvo
	 *            PurchaseVo
	 * 
	 * @return GridData<PurchaseVo>
	 */
	@WebRemote
	public GridData<PurchaseVo> getPurchaseOfAnnualPlan(PurchaseVo vo) {

//		// 分页开始，设置默认值
//		Integer start = pvo.getStart();
//		if (start == null) {
//			start = 0;
//		}
//		// 每页总数，设置默认值
//		Integer limit = pvo.getLimit();
//		if (limit == null) {
//			limit = 20;
//		}

//		PurchaseCondition purchaseCondition = new PurchaseCondition();
//		purchaseCondition.setStart(vo.);
//		purchaseCondition.setLimit(limit);
//		purchaseCondition.setPurchaseCode(pvo.getPurchaseCode());//采购计划编号
//		purchaseCondition.setSearchCatlogName(pvo.getSearchCatlogName());// 設置物料种类名称查询条件
//		purchaseCondition.setSearchMaterialName(pvo.getSearchMaterialName());// 设置物料信息名称查询条件
////		purchaseCondition.setEditor(identity.getLoginUser().getUserid().toString());//设置仅能看到自已的计划
//		purchaseCondition.setPurchaseType(pvo.getType());
//		purchaseCondition.setStatus(pvo.getStatus());
		GridData<PurchaseVo> gd = new GridData<PurchaseVo>();
		gd.setResults(purchaseService.getPurchaseOfAnnualPlan(vo));
		gd.setTotalProperty(vo.getCount());
//		gd.setTotalProperty(purchaseService.getCountByCondition(purchaseCondition));
		return gd;
	}
	
}
