package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ParityApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

/**
 * 比价招投 大纲Remote
 * 
 * @author chendongjie
 * @version 1.0
 * @create 2011-06-10
 * 
 */
@Name("tenderSuppliersRemote")
public class TenderSuppliersRemote {
	@In(create = true, value = "tenderSuppliersServiceImpl")
	private TenderSuppliersService tsService;


	@In(create = true)
	Identity identity;

//	// 设置BeanUtils转换缺省值
//	{
//		DateConverter dateConverter = new DateConverter(null);
//		dateConverter.setPattern("yyyy-MM-dd");
//		ConvertUtils.register(dateConverter, Date.class);
//		ConvertUtils.register(dateConverter, String.class);
//	}

	
	/**
	 * 获取指指的采购清单对应的落选供应商GRID
	 */
	@WebRemote
	public GridData<TenderSuppliersVo> getTenderSuppliersGridData(TenderSuppliersVo vo) {
		
		List<TenderSuppliersVo> results=new ArrayList<TenderSuppliersVo>();
		List<TenderSuppliers> tsList = tsService.getTenderSuppliersGridData(vo);
		for(TenderSuppliers ts:tsList){
			TenderSuppliersVo tsVo=new TenderSuppliersVo();
			tsVo.setId(ts.getId());
			tsVo.setParityId(ts.getParity().getParityId());
			tsVo.setVendorId(ts.getVendor().getVendorID());
			tsVo.setVendorName(ts.getVendor().getVendorName());
			tsVo.setVendorBusinessScope(ts.getVendor().getBusinessScope());
			tsVo.setVendorAddress(ts.getVendor().getAddress());
			tsVo.setVendorPrice(ts.getPrice()==null?"":ts.getPrice().toString());
			results.add(tsVo);
		}
		GridData<TenderSuppliersVo> gd = new GridData<TenderSuppliersVo>();
		gd.setResults(results);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	

	/**
	 * 保存投标的供应商
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveTenderSuppliers(TenderSuppliersVo vo){
		String msg=this.tsService.saveTenderSuppliers(vo);
		return "{success:true,msg:'" + msg + "'}";
	}
	
	/**
	 * 删除投标的供应商
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String deleteTenderSuppliers(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		String msg=tsService.deleteTenderSuppliers(vo);
		return "{success:true,msg:'" + msg + "'}";
	}
	
	@WebRemote
	public GridData<VendorVo> filterAllVendor(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		List<VendorVo> tsvoList=new ArrayList<VendorVo>();
		List<Vendor> vendorList=tsService.filterAllVendor(vo);
		for(Vendor vendor:vendorList){
			VendorVo vvo=new VendorVo();
			vvo.setVendorID(vendor.getVendorID());
			vvo.setVendorName(vendor.getVendorName());
			vvo.setAddress(vendor.getAddress());
			vvo.setBusinessScope(vendor.getBusinessScope());
			vvo.setPrice("");
			tsvoList.add(vvo);
		}
		GridData<VendorVo> gd=new GridData<VendorVo>();
		gd.setResults(tsvoList);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	
//	
//	
//	/**
//	 * 得到采购清单数据
//	 */
//	@WebRemote
//	public GridData<ParityVo> getParityGridData(ParityVo parityVo) {
//
//		// 分页开始，设置默认值
//		Integer start = parityVo.getStart();
//		if (start == null) {
//			start = 0;
//		}
//		// 每页总数，设置默认值
//		Integer limit = parityVo.getLimit();
//		if (limit == null) {
//			limit = 20;
//		}
//
//		ParityCondition parityCondition = new ParityCondition();
//		parityCondition.setStart(start);
//		parityCondition.setLimit(limit);
//		parityCondition.setType(parityVo.getType());
//		parityCondition.setSearchCatlogName(parityVo.getSearchCatlogName());
//		parityCondition.setSearchMaterialName(parityVo.getSearchMaterialName());
//
//		String userId = identity.getLoginUser().getUserid().toString().trim();// 用户id
//		parityCondition.setEditors(userId);
//
//		List<ParityVo> results = this.chageParityDatasToVo(parityService
//				.getParityListByCondition(parityCondition));
//		GridData<ParityVo> gd = new GridData<ParityVo>();
//		gd.setResults(results);
//		gd.setTotalProperty(parityCondition.getCount());
//		//gd.setTotalProperty(parityService.getCountByCondition(parityCondition));
//		return gd;
//	}
//
//	/**
//	 * 得到采购清单数据
//	 */
//	@WebRemote
//	public GridData<PurchaseVo> getNullGridData(PurchaseVo pvo) {
//		return null;
//	}
//
//	/**
//	 * 比价、招标过程中指定供应商
//	 */
//	@WebRemote
//	public String asignVendor(ParityVo pv) {
//		parityService.assignVendorToParity(pv.getParityId(), pv.getVendorId(), pv.getVendorName(),pv.getPrice());
//		return "{success : true}";
//	}
//
//	/**
//	 * 比价、招投标清单生成合同
//	 */
//	@WebRemote
//	public String generateContract(ParityVo pv) {
//		String updateRecords = pv.getUpdateRecords();
//		List<Parity> parities = new ArrayList<Parity>();
//		if (StringUtils.isNotEmpty(updateRecords)) {
//			// 将Json对象转化为Parity对象集合
//			JSONArray records = JSONArray.fromObject(updateRecords);
//			for (int i = 0; i < records.size(); i++) {
//				JSONObject obj = records.getJSONObject(i);
//				Parity dest = (Parity) JSONObject.toBean(obj, Parity.class);
//				parities.add(dest);
//			}
//		}
//		parityService.generateContractFromParities(parities);
//		return "{success : true}";
//	}
//
//	/**
//	 * 送审后修改申请状态为"审批中"
//	 */
//	@WebRemote
//	public String updateProperties(String[] ids) {
//		parityService.updateProperties(ids, ParityApplicationStatusEnum.SHEN_PI_ZHONG.getValue());
//		return "{success : true}";
//	}
//
//	/**
//	 * 将List<Parity>实体集合转换为List<ParityVo>集合
//	 */
//	public List<ParityVo> chageParityDatasToVo(List<Parity> paritys) {
//		List<ParityVo> parityVos = new ArrayList<ParityVo>();
//		if (paritys != null && paritys.size() > 0) {
//			for (Parity parity : paritys) {
//				try {
//					parityVos.add(this.chageParityDataToVo(parity));
//				} catch (IllegalAccessException e) {
//					e.printStackTrace();
//				} catch (InvocationTargetException e) {
//					e.printStackTrace();
//				}
//			}
//		}
//		return parityVos;
//	}
//
//	/**
//	 * 将单个parity实体转换为ParityVo
//	 */
//	private ParityVo chageParityDataToVo(Parity parity) throws IllegalAccessException,
//			InvocationTargetException {
//		ParityVo parityVo = new ParityVo();
//		BeanUtils.copyProperties(parityVo, parity);
//
//		parityVo.setApplicationStatusName(ParityApplicationStatusEnum.getByValue(
//				parity.getApplicationStatus()).getName());
//
//		parityVo.setTypeName(PurchaseTypeEnum.getByValue(parity.getType()).getName());
//
//		if (StringUtils.isNotEmpty(parity.getEditors())) {
//			Guser guser = _guserService.getGuserById(Long.parseLong(parity.getEditors().trim()));
//			parityVo.setEditorsNmae(guser.getTruename());
//			String decode = guser.getGinstitute().getInstcode();
//			String dename = _departmentService.getDepartmentByCode(decode).getDepartmetname();
//			parityVo.setEditorsDept(dename);
//		}
//
//		Purchase purchase = purchaseService.getPurchaseById(parity.getPurchaseId());
//		if (purchase != null) {
//			parityVo.setPurchaseCode(purchase.getPurchaseCode());
//		}
//
//		Material material = materialService.findById(parity.getMaterialId());
//		if (material != null) {
//			BeanUtils.copyProperties(parityVo, material);
//			parityVo.setmCtgName(material.getMaterialCatalog().getMaterialtypename());// 物资类别
//		}
//
//		return parityVo;
//	}

}
