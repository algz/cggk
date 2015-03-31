package com.sysware.customize.hd.investment.baseData.vendor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.user.UserSerivce;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.baseData.vendorMaterial.VendorMaterialService;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

/**
 * 供应商管理Service实现
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:28
 */
@Name("vendor_VendorServiceImpl")
public class VendorServiceImpl implements VendorService {

	@In(create = true, value = "vendor_VendorDaoImpl")
	private VendorDao vendorDao;

	@In(create = true, value = "material_MaterialServiceImpl")
	private MaterialService materialService;
	
	@In(create = true, value = "base_user_UserSerivce")
	private UserSerivce userSerivce;;

	@In(create = true, value = "vendorMaterial_VendorMaterialServiceImpl")
	private VendorMaterialService vendorMaterialService;
	
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;

	@Transactional
	public void addVendor(Vendor vendor, String[] materialIDs,
			String[] catalogIDs) throws ReduplicatedException {

		Vendor savedVendor = this.saveVendor(vendor);

		if (materialIDs.length > 0) {
			vendorMaterialService.setVendorAndMaterial(
					new String[] { savedVendor.getVendorID() }, materialIDs);
		}

	}

	@Transactional
	public Vendor saveVendor(Vendor vendor) throws ReduplicatedException {
		this.isVendorNameReduplicated(vendor);
		if (StringUtils.isBlank(vendor.getVendorID())) {
			return vendorDao.save(vendor);
		} else {
			vendorDao.update(vendor);
			return vendor;
		}
	}
	@Transactional
	public String updateVendor(VendorVo vo){
		String[] vendorIDS=vo.getVendorID().split(",");
		String[] vendorTypes=vo.getType().split(",");
		for(int i=0;i<vendorIDS.length;i++){
			Vendor vendor=(Vendor)vendorDao.getHibernateSession().get(Vendor.class, vendorIDS[i]);
			vendor.setType(vendorTypes[i]);
		}
		return ""; 
	}
	
	public List<Vendor> findVendorsByCondition(VendorCondition condition,String type) {
		//return vendorDao.findByCondition(condition,type);
		return vendorDao.findVendorsByCondition(condition,type);
	}
	
	public long countVendorsByCondition(VendorCondition condition) {
		//return vendorDao.countByCondition(condition);
		return vendorDao.countVendorsByCondition(condition);
	}

	@Transactional
	public boolean batchDeleteVendors(String[] vendorIds) {
		boolean result = false;
		vendorMaterialService.deleteVendorMaterialByVendorIds(vendorIds);
		for (String vendorId : vendorIds) {
			result = vendorDao.remove(vendorId) & result;
		}
		return result;
	}

	public List<Vendor> findVendorsByMaterial(String materialId, int begin,
			int max) { 
		List<Vendor> vendors = vendorDao.findByMaterialIds(materialId, begin,
				max,"1"); 
		return vendors;
	}

	public long countVendorsByMaterial(String materialId) { 
		return vendorDao.countByMaterialIds(materialId,"1");
	}

	public List<Vendor> findVendorsByMaterialCatalog(String materialCatalogId,
			int begin, int max) { 
			List<Vendor> vendors = vendorDao.findByMaterialIds(materialCatalogId,
					begin, max,"0"); 
			return vendors; 
	}

	public long countVendorsByMaterialCatalog(String materialCatalogId) {
		 	return vendorDao.countByMaterialIds(materialCatalogId,"0");
	}

	public Vendor getVendorById(String id) {
		return vendorDao.get(id);
	}

	public Vendor findVendorByName(String vendorName) {
		return vendorDao.getBy("vendorName", vendorName);
	}

//	@Transactional
	public List<Vendor> batchAddVendor(Workbook workbook,String userId) throws FileUploadException {
		//定义个行业信息编号
		int theNew = 0;
		int theUpdate = 0;
		String newName = "";
		String newUpdate = "";
		// 按照Excel表格顺序指定属性名称
		//综合采购部加字段后的格式
//		String[] colProperties = { "","vendorCode", "vendorName","simpleName","symbol","property","taxID","address","zipCode","phone","email","vendorLevel",
//				"sector", "businessScope","license","egal","setUpDate","registeredCapital","bank","accountID","bank2","accountID2",
//				"bank3","accountID3","availability","accredit","deliveryAddress","initialEvaluationDate","reviewDate","reviewResult","remark" };
		//原有解析格式
		//		String[] colProperties = { "","vendorCode", "vendorName","simpleName","symbol","property","address","zipCode","phone","email","vendorLevel",
//				"sector", "businessScope","license","egal","setUpDate","registeredCapital","bank","accountID","bank2","accountID2",
//				"bank3","accountID3","availability","deliveryAddress","initialEvaluationDate","reviewDate","reviewResult","remark" };
		//解析中航编码
		//String[] colProperties = { "","vendorCode", "vendorName"};
		String[] colProperties = {"evaluation_status", "vendorCode","", "vendorName","","","","","","","","address","sector","trial_status","trial_comment"};//中航20120309最新编码格式
		List<Vendor> redupVendors = new ArrayList<Vendor>();
		int numberOfSheets = workbook.getNumberOfSheets();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			int rows = sheet.getRows();// 行数
			for (int m = 2; m < rows; m++) {
				// 提取Excel数据到Vendor对象
				Vendor vendor = ExcelUtils.processRow(sheet.getRow(m),
						colProperties, Vendor.class);
//				try {
					//通过供应商名称判断当前是否已经存在相同的记录
					List<Vendor> list = vendorDao.GetAVendor(vendor.getVendorName());
					//行业中为空的，赋值为其他行业
					if(vendor.getSector() == null||vendor.getSector().equals("null"))
						vendor.setSector("其他");
					//将登录人定义为创建人
					vendor.setCreater(userId);
					//将当前时间作为创建时间
					vendor.setCreate_date(new Date());
					if(list.size()<=0){
						if (vendor != null && vendor.getVendorCode() == null
								&& StringUtils.isNotBlank(vendor.getVendorName())) {
							vendor.setVendorCode(String.valueOf(vendorDao.GetAVenderCode(vendor)));
							//保存excel表中某行的数据
//							this.saveVendor(vendor);
							vendorDao.InsetAVendor(vendor);
							theNew += 1;
							newName = newName+vendor.getVendorName()+"|";
						}else if(vendor.getVendorCode() != null
								&& Long.parseLong(vendor.getVendorCode().substring(0, 2))>=61
								&& Long.parseLong(vendor.getVendorCode().substring(0, 2))<=78
								&& StringUtils.isNotBlank(vendor.getVendorName())){
							vendor.setVendorCode(String.valueOf(vendorDao.GetAVenderCode(vendor)));
							//保存excel表中某行的数据
//							this.saveVendor(vendor);
							vendorDao.InsetAVendor(vendor);
							theNew += 1;
							newName = newName+vendor.getVendorName()+"|";
						}
					}else{
						if(vendor != null && vendor.getVendorCode()!=null){
							if(Long.parseLong(vendor.getVendorCode().substring(0, 2))<61
								|| Long.parseLong(vendor.getVendorCode().substring(0, 2))>78){
//								vendor.setVendorCode(list.get(0).getVendorCode());
	//							vendorDao.update(vendor);
								//很据名称修改编号信息。此处主要是针对匹配中航工业的供应商编码
								vendorDao.UpdateAVendor(vendor);
								theUpdate +=1;
								newUpdate = newUpdate + vendor.getVendorName()+"|";
							}
						}
					}
//				} catch (ReduplicatedException e) {
//					redupVendors.add(vendor);
//				}
			}
		}
//		System.out.println("新增记录："+theNew+"||修改记录："+theUpdate);
//		System.out.println("洪都自己编号的供应商信息：（金属）"+newName);
//		System.out.println("使用中行工业的编号：（金属）"+newUpdate);
		return redupVendors;
	}
	
	/**
	 * 根据行业组织后四位的流水号
	 * @param vo
	 * @return
	 */
	public int GetAVenderCode(Vendor vo){
		return vendorDao.GetAVenderCode(vo);
	}

	/**
	 * 检查供应商名称是否重复
	 * 
	 * @param vendor
	 *            待保存供应商对象
	 * @throws ReduplicatedException
	 */
	private void isVendorNameReduplicated(Vendor vendor)
			throws ReduplicatedException {
		if (StringUtils.isNotBlank(vendor.getVendorName())) {
			Vendor temp = this.vendorDao.getBy(
					"vendorName", vendor.getVendorName()); 
			if (temp != null) {
				if (temp.getVendorID().equals(
						vendor.getVendorID())) {
					return;
				}
				throw new ReduplicatedException("供应商名称重复，请重新填写！");
			}
			temp = this.vendorDao.getBy(
					"vendorCode", vendor.getVendorCode());
			if (temp != null) {
				if (temp.getVendorID().equals(
						vendor.getVendorID())) {
					return;
				}
				throw new ReduplicatedException("供应商编号重复，请重新填写！");
			}
		}
	}
	
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取所有物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getAll(MaterialVo materialVo, Pager pager){
		List<MaterialVo> list = new ArrayList<MaterialVo>();
		//获取查询类别
		String _selectType = StringUtils.isBlank(materialVo.getSelectType()) ? "" : materialVo.getSelectType() ;
		if(_selectType.equals("select")){//带查询条件
			list =  vendorDao.getSelect(materialVo, pager);
		}else{//查询全部
			list =  vendorDao.getAll(materialVo, pager);
		}
		return list ;
	}

	public List<VendorVo> getVenderAssessGridData(VendorVo vo) {
		List<VenderAssess> list = vendorDao.getHibernateSession().createQuery("from VenderAssess").list();
		List<VendorVo> retList = new ArrayList<VendorVo>();
		for(VenderAssess va : list){
			VendorVo vv = new VendorVo();
			vv.setAssessId(va.getId());
			vv.setAssessName(va.getAssessName());
			vv.setAssessNum(va.getAssessNum());
			vv.setAssessType(String.valueOf(va.getAssessType()));
			vv.setEditdate(va.getEditDate().toString());
			Guser user = userSerivce.getUserById(va.getEditor());
			vv.setEditor(user.getTruename());
			retList.add(vv);
		}
		vo.setCount(list.size());
		return retList;
	}

	public List<VendorVo> getVenderAssessDetailData(VendorVo vo) {
		String sql = "select v.vendorcode,v.vendorname,dp.depcode,dp.departmentname," +
				"vd.matingtype,vd.massscore,vd.payscore,vd.servescore,vd.compositescore," +
				"vd.assessgrade,u.truename,vd.editdate,vd.id " +
				"from t_venderassess va " +
				"left join t_venderassessdetail vd on va.id=vd.assessid " +
				"left join t_vendor v on vd.venderid=v.vendorid " +
				"left join t_departments dp on vd.departid=dp.depcode " +
				"left join t_user u on vd.editor=u.userid " +
				"where va.id = '"+vo.getAssessId()+"' " +
				"and vd.id is not null ";
		List<Object[]> list = vendorDao.getHibernateSession().createSQLQuery(sql).list();
		List<VendorVo> retList = new ArrayList<VendorVo>();
		for(int i=0; i < list.size(); i++){
			Object[] obj = list.get(i);
			VendorVo vv = new VendorVo();
			vv.setVendorCode(obj[0].toString());
			vv.setVendorName(obj[1].toString());
			vv.setDpCode(obj[2]==null?"":obj[2].toString());
			vv.setDpName(obj[3]==null?"":obj[3].toString());
			vv.setMatingType(obj[4]==null?"":obj[4].toString());
			vv.setMassScore(obj[5]==null?"":obj[5].toString());
			vv.setPayScore(obj[6]==null?"":obj[6].toString());
			vv.setServeScore(obj[7]==null?"":obj[7].toString());
			vv.setCompositeScore(obj[8]==null?"":obj[8].toString());
			vv.setAssessGrade(obj[9]==null?"":obj[9].toString());
			vv.setEditor(obj[10].toString());
			vv.setEditdate(obj[11].toString());
			vv.setAssessDetailId(obj[12].toString());
			retList.add(vv);
		}
		vo.setCount(list.size());
		return retList;
	}

	@Transactional
	public void saveVendorAssess(VendorVo vo) throws Exception {
		VenderAssess va = new VenderAssess();
		BeanUtils.copyProperties(va, vo);
		va.setEditDate(new Date());
		va.setEditor(identity.getLoginUser().getUserid().toString());
		vendorDao.getHibernateSession().save(va);
		
	}
	@Transactional
	public void saveVendorAssessDetail(VendorVo vo) throws Exception {
		VenderAssessDetail pojo = new VenderAssessDetail();
		BeanUtils.copyProperties(pojo, vo);
		pojo.setEditDate(new Date());
		pojo.setEditor(identity.getLoginUser().getUserid().toString());
		vendorDao.getHibernateSession().save(pojo);
	}
	@Transactional
	public void delVenderAssessDetail(VendorVo vo) throws Exception {
		String[] details = vo.getAssessDetailId().split(",");
		for(int i=0; i < details.length;i++){
			String id = details[i];
			String sql = "delete from t_venderAssessDetail vad " +
					"where vad.id='"+id+"'";
			vendorDao.getHibernateSession().createSQLQuery(sql).executeUpdate();
		}
		
	}
	
	
}