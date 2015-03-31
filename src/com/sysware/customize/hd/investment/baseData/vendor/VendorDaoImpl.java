package com.sysware.customize.hd.investment.baseData.vendor;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.util.UtilForHD;


/**
 * 供应商管理DAO实现
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:38
 */
@Name("vendor_VendorDaoImpl")
public class VendorDaoImpl extends GenericDAOImpl<Vendor> implements VendorDao {
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Vendor> vDao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Material> materialDao;
	

	public List<Vendor> findVendorsByCondition(VendorCondition condition,String type) {
		StringBuilder queryStr = new StringBuilder("1=1");
		List<Object> params = new ArrayList<Object>();
		int paramIndex = 1;
		if (StringUtils.isNotEmpty(condition.getVendorName())) {
			queryStr.append(" and obj.vendorName like '%" + condition.getVendorName() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getAddress())) {
			queryStr.append(" and obj.address like '%" + condition.getAddress() + "%'");
		}
		if (condition.isNotRelatedMaterial()) {
			queryStr.append(" and not exists ( from VendorMaterial vm where vm.vendor=obj ) ");
		}
		if (StringUtils.isNotBlank(condition.getMaterialId())) {
			queryStr.append(" and  exists ( from VendorMaterial vm where vm.vendor=obj and vm.material.materialid='"
					+ condition.getMaterialId().trim() + "')");
		}
		
		if (StringUtils.isNotEmpty(condition.getOldVendorIDString())){
			queryStr.append(" and obj.vendorID not in( " + condition.getOldVendorIDString().toString() + ")");
		}
		if (StringUtils.isNotEmpty(condition.getVendorCode())) {
			queryStr.append(" and obj.vendorCode like '%" + condition.getVendorCode() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getScale())) {
			queryStr.append(" and obj.scale like '%" + condition.getScale() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getBusinessScope())) {
			queryStr.append(" and obj.businessScope like '%" + condition.getBusinessScope() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getType())) {
			queryStr.append(" and obj.type like '%" + condition.getType() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getVendorLevel())) {
			queryStr.append(" and obj.vendorLevel like '%" + condition.getVendorLevel() + "%'");
		}
		if (StringUtils.isNotEmpty(condition.getVendorID())) {
			queryStr.append(" and obj.vendorID = '" + condition.getVendorID() + "'");
		}
		if(StringUtils.isNotEmpty(condition.getEvaluationStatus())){
			queryStr.append(" and obj.evaluation_status = '" + condition.getEvaluationStatus() + "'");
		}
		
		//判断是加载的哪一个表格zhoup
		//当为1时是加载供应商目录的条件
		if(condition.getSelectStatus() == 1){
			queryStr.append(" and obj.type in('1','2')");
		}
		
		if(type!=null&&type.equals("vendorAppraisal")){//供应商考核里的供应商目录
			queryStr.append(" and obj.evaluation_status='2' ");
		}
		//通过物资获取供应商
		//通过物资获取供应商
		if (StringUtils.isNotBlank(condition.getVendorByMaterial())) {
			if(condition.getVendorByMaterial().equals("1"))
				queryStr.append(" and  obj.vendorID In (select vm.vendor.vendorID from VendorMaterial vm where vm.material.materialid in ("
						+ condition.getMaterialIds().trim() + "))");
			else
				queryStr.append(" and  obj.vendorID not In (select vm.vendor.vendorID from VendorMaterial vm where vm.material.materialid in ("
						+ condition.getMaterialIds().trim() + "))");
		}
		
		String hql="select count(*) from Vendor obj where "+queryStr.toString();
		Long count=(Long)dao.getHibernateSession().createQuery(hql).uniqueResult();
		condition.setCount(new BigDecimal(count));
		
//		queryStr.append(" order by obj.vendorID desc ");
//		System.out.println("供应商目录输出："+queryStr.toString());
		return this.find(queryStr.toString(), params.toArray(),
				condition.getStart(), condition.getLimit());
	}

	public long countVendorsByCondition(VendorCondition condition) {
		StringBuilder queryStr = new StringBuilder(
				"select count(*) from Vendor obj where 1=1");
		List<Object> params = new ArrayList<Object>();
		int paramIndex = 1;
		if (StringUtils.isNotEmpty(condition.getVendorName())) {
			queryStr.append(" and obj.vendorName like ?" + paramIndex++);
			params.add("%" + condition.getVendorName() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getAddress())) {
			queryStr.append(" and obj.address like ?" + paramIndex++);
			params.add("%" + condition.getAddress() + "%");
		}
		if (condition.isNotRelatedMaterial()) {
			queryStr.append(" and not exists ( from VendorMaterial vm where vm.vendor=obj ) ");
		}
		if (StringUtils.isNotBlank(condition.getMaterialId())) {
			queryStr.append(" and  exists ( from VendorMaterial vm where vm.vendor=obj and vm.material.materialid='"
					+ condition.getMaterialId().trim() + "')");
		}
		
		if (StringUtils.isNotEmpty(condition.getOldVendorIDString())){
			queryStr.append(" and obj.vendorID not in( " + condition.getOldVendorIDString().toString() + ")");
		}
		if (StringUtils.isNotEmpty(condition.getVendorCode())) {
			queryStr.append(" and obj.vendorCode like ?" + paramIndex++);
			params.add("%" + condition.getVendorCode() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getScale())) {
			queryStr.append(" and obj.scale like ?" + paramIndex++);
			params.add("%" + condition.getScale() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getBusinessScope())) {
			queryStr.append(" and obj.businessScope like ?" + paramIndex++);
			params.add("%" + condition.getBusinessScope() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getType())) {
			queryStr.append(" and obj.type like ?" + paramIndex++);
			params.add("%" + condition.getType() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getVendorLevel())) {
			queryStr.append(" and obj.vendorLevel like ?" + paramIndex++);
			params.add("%" + condition.getVendorLevel() + "%");
		}
		if (StringUtils.isNotEmpty(condition.getVendorID())) {
			queryStr.append(" and obj.vendorID = ?" + paramIndex++);
			params.add("" + condition.getVendorID() + "");
		}
		if(StringUtils.isNotEmpty(condition.getEvaluationStatus())){
			queryStr.append(" and obj.evaluationStatus = ?" + paramIndex++);
			params.add("" + condition.getEvaluationStatus() + "");
		}
		
		//判断是加载的哪一个表格zhoup
		//当为1时是加载供应商目录的条件
		if(condition.getSelectStatus() == 1){
			queryStr.append(" and obj.evaluation_status='2' and obj.type in('1','2')");
		}
		//通过物资获取供应商
		if (StringUtils.isNotBlank(condition.getVendorByMaterial())) {
			if(condition.getVendorByMaterial().equals("1"))
				queryStr.append(" and  obj.vendorID In (select vm.vendor.vendorID from VendorMaterial vm where vm.material.materialid in ("
						+ condition.getMaterialIds().trim() + "))");
			else
				queryStr.append(" and  obj.vendorID not In (select vm.vendor.vendorID from VendorMaterial vm where vm.material.materialid in ("
						+ condition.getMaterialIds().trim() + "))");
		}
		return (Long) (this.query(queryStr.toString(), params.toArray(), 0, 0)
				.get(0));
	}

	@SuppressWarnings("unchecked")
	public List<Vendor> findByMaterialIds(String materialCatalogId, int begin,
			int max,String type){
		if (materialCatalogId != null && materialCatalogId.length() > 0) {
			StringBuilder sqlStr = new StringBuilder("select distinct v.VENDORID,v.VENDORNAME,v.VENDORCODE,v.ACCOUNTID,v.ADDRESS," +
					"v.BANK,v.BUSINESSSCOPE,v.INITIALEVALUATIONDATE,v.VENDORLEVEL,v.PHONE," +
					"v.REVIEWDATE,v.TAXID,v.REPOSAL,v.PROPERTY," +
//					"m.MATERIALITEMNAME," +
					"v.simplename,v.type,v.sector ");
			sqlStr.append(" from t_vendor v, t_vendor_material vm, t_material m ");
			sqlStr.append(" where v.vendorid=vm.vendorid and vm.materialid=m.materialid and ");
			if(type.equals("0")){
				sqlStr.append(" m.PARENTID in (");  
				sqlStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
				sqlStr.append(" start with mc.materialcatalogid='"+materialCatalogId+"'");
				sqlStr.append(" connect by prior mc.materialcatalogid = mc.parentid) "); 
			}else{
				sqlStr.append(" vm.materialid = '"+materialCatalogId+"'");//materialCatalogId 为物资信息ID  
			}
			sqlStr.append(" order by v.vendorname ");
//			System.out.println("供应商数据："+sqlStr.toString());
			List<Vendor> results = new ArrayList<Vendor>();
//			List<Object[]> temps = this.executeNativeQuery(sqlStr.toString(),
//					null, begin, max);
//			for (Object[] objects : temps) {
//				Vendor vendor = new Vendor();
//				vendor.setVendorID((String) objects[0]);
//				vendor.setVendorName(objects[1]==null?"":(String) objects[1]);
//				vendor.setVendorCode(objects[2]==null?"":(String) objects[2]);
//				vendor.setAccountID(objects[3]==null?"":(String) objects[3]);
//				vendor.setAddress(objects[4]==null?"":(String) objects[4]);
//				vendor.setBank(objects[5]==null?"":(String) objects[5]);
//				vendor.setBusinessScope(objects[6]==null?"":(String) objects[6]);
//				vendor.setInitialEvaluationDate(objects[7]==null?null:(Date) objects[7]);
//				vendor.setVendorLevel(objects[8]==null?"":(String) objects[8]);
//				vendor.setPhone(objects[9]==null?"":(String) objects[9]);
////				vendor.setReviewResult(objects[10]==null?"":(String) objects[10]);
//				vendor.setReviewDate(objects[10]==null?null:(Date) objects[10]);
//				vendor.setTaxID(objects[11]==null?"":(String) objects[11]);
//				vendor.setReposal(objects[12]==null?"":(String) objects[12]);
//				vendor.setProperty(objects[13]==null?"":(String) objects[13]);
//			    vendor.setMaterialItemName(objects[14]==null?"":(String) objects[14]);
//			    vendor.setSimpleName(objects[15]==null?"":(String) objects[15]);
//			    vendor.setType(objects[16]==null?"":(String) objects[16]);
//			    vendor.setSector(objects[17]==null?"":(String) objects[17]);
//				results.add(vendor);
//			}
			SQLQuery query = dao.getHibernateSession().createSQLQuery(sqlStr.toString());
			setFindByMaterialIds(query);
			query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(Vendor.class));
			results = query.list();
			return results;
		} else {
			return new ArrayList<Vendor>();
		}

	}
	
	private void setFindByMaterialIds(SQLQuery query){
		query = query.addScalar("vendorID", Hibernate.STRING);
		query = query.addScalar("vendorName", Hibernate.STRING);
		query = query.addScalar("vendorCode", Hibernate.STRING);
		query = query.addScalar("accountID", Hibernate.STRING);
		query = query.addScalar("address", Hibernate.STRING);
		query = query.addScalar("bank", Hibernate.STRING);
		query = query.addScalar("businessScope", Hibernate.STRING);
		query = query.addScalar("initialEvaluationDate", Hibernate.DATE);
		query = query.addScalar("vendorLevel", Hibernate.STRING);
		query = query.addScalar("phone", Hibernate.STRING);
		query = query.addScalar("reviewDate", Hibernate.DATE);
		query = query.addScalar("taxID", Hibernate.STRING);
		query = query.addScalar("reposal", Hibernate.STRING);
		query = query.addScalar("property", Hibernate.STRING);
		query = query.addScalar("simpleName", Hibernate.STRING);
		query = query.addScalar("type", Hibernate.STRING);
		query = query.addScalar("sector", Hibernate.STRING);
	}

	public long countByMaterialIds(String materialCatalogId,String type) {
		StringBuilder sqlStr = new StringBuilder(
				"select count(distinct v.vendorid) ");
		sqlStr.append(" from t_vendor v, t_vendor_material vm, t_material m ");
		sqlStr.append(" where v.vendorid=vm.vendorid and vm.materialid=m.materialid and  ");
		if(type.equals("0")){
			sqlStr.append(" m.PARENTID in (");  
			sqlStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			sqlStr.append(" start with mc.materialcatalogid='"+materialCatalogId+"'");
			sqlStr.append(" connect by prior mc.materialcatalogid = mc.parentid) "); 
		}else{
			sqlStr.append(" vm.materialid = '"+materialCatalogId+"'");//materialCatalogId 为物资信息ID  
		}
		return ((BigDecimal) this.executeNativeQuery(sqlStr.toString(),
				null, 0, 0).get(0)).longValue();
	}

	
	/**
	 * 判断在数据库中是否存在当前供应商信息
	 * @param vendorName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Vendor> GetAVendor(String vendorName){
		String sql = "select t.vendorcode,t.vendorname from t_vendor t where t.vendorname=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		SetAVendor(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(Vendor.class));
		query.setParameter(0, vendorName);
		return query.list();
	}
	
	private void SetAVendor(SQLQuery query){
		query = query.addScalar("vendorCode", Hibernate.STRING);
		query = query.addScalar("vendorName", Hibernate.STRING);
	}
	
	/**
	 * 根据行业组织后四位的流水号
	 * @param vo
	 * @return
	 */
	public int GetAVenderCode(Vendor vo){
		int result = 0;
		String sql = "select * from (select t.vendorcode" 
					+" from t_vendor t"
					+" where t.sector=? order by t.vendorcode desc)"
					+" where rownum=1";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getSector());
		Object obj = query.uniqueResult();
		if(obj == null||obj.toString().equals("")){
			//重组供应商编号
			if(vo.getSector().equals("其他"))
				result = 781000;
			else if(vo.getSector().equals("核工业"))
				result = 611000;
			else if(vo.getSector().equals("航天"))
				result = 621000;
			else if(vo.getSector().equals("航空"))
				result = 631000;
			else if(vo.getSector().equals("船舶"))
				result = 641000;
			else if(vo.getSector().equals("兵器"))
				result = 651000;
			else if(vo.getSector().equals("电子"))
				result = 661000;
			else if(vo.getSector().equals("军方"))
				result = 671000;
			else if(vo.getSector().equals("冶金"))
				result = 681000;
			else if(vo.getSector().equals("锻铸造"))
				result = 691000;
			else if(vo.getSector().equals("轻工"))
				result = 701000;
			else if(vo.getSector().equals("纺织"))
				result = 711000;
			else if(vo.getSector().equals("化工"))
				result = 721000;
			else if(vo.getSector().equals("建材"))
				result = 731000;
			else if(vo.getSector().equals("石化"))
				result = 741000;
			else if(vo.getSector().equals("机械"))
				result = 751000;
			else if(vo.getSector().equals("物流"))
				result = 761000;
			else if(vo.getSector().equals("进出口"))
				result = 771000;
		}else{
			result = Integer.parseInt(obj.toString())+1;
		}
//		System.out.println("输出编号："+result);
		return result;
	}
	
	/**
	 * 根据供应商的名称修改匹配中行工业名称来修改编号
	 * @param vo
	 * @return
	 */
	public int UpdateAVendor(Vendor vo){
		String sql = "update t_vendor v set v.vendorcode=? where v.vendorname=?";
		SQLQuery query = vDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getVendorCode());
		query.setParameter(1, vo.getVendorName());
		int result = query.executeUpdate();
		return result;
	}
	
	/**
	 * 向供应商信息表中插入一条数据
	 * @param vo
	 * @return
	 */
	public int InsetAVendor(Vendor vo){
		String sql = "insert into t_vendor(vendorid,vendorname,vendorcode,accountid,address,bank,businessscope,initialevaluationdate,vendorlevel,phone"
					+",reviewresult,reviewdate,taxid,reposal,property,simplename,sector,email,zipcode,license,egal,setupdate,registeredcapital,bank2,bank3,accountid2,"
					+"accountid3,deliveryaddress,availability,trial_status,trial_comment,create_date,creater,evaluation_status,"
					+"evaluation_comment,scale,remark,type,fax,symbol,accredit"
					+") values(?,?,?,?,?,?,?,to_date(?,'YYYY:MM:DD:HH24:MI:SS'),?,?,?,to_date(?,'YYYY:MM:DD:HH24:MI:SS'),?,?,"
					+"?,?,?,?,?,?,?,to_date(?,'YYYY:MM:DD:HH24:MI:SS'),?,?,?,?,?,?,?,?,?,to_date(?,'YYYY:MM:DD:HH24:MI:SS'),?,?,?,?,?,?,?,?,?" 
					+")";
//		8,12,22,32
		SQLQuery query = vDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, UtilForHD.GetNowTimeForId());
		query.setParameter(1, vo.getVendorName());
		query.setParameter(2, vo.getVendorCode());
		query.setParameter(3, vo.getAccountID());
		query.setParameter(4, vo.getAddress());
		query.setParameter(5, vo.getBank());
		query.setParameter(6, vo.getBusinessScope());
		query.setParameter(7, this.GetDate(vo.getInitialEvaluationDate()));
		query.setParameter(8, vo.getVendorLevel());
		query.setParameter(9, vo.getPhone());
		query.setParameter(10, vo.getReviewResult());
		query.setParameter(11, this.GetDate(vo.getReviewDate()));
		query.setParameter(12, vo.getTaxID());
		query.setParameter(13, vo.getReposal());
		query.setParameter(14, vo.getProperty());
		query.setParameter(15, vo.getSimpleName());
		query.setParameter(16, vo.getSector());
		query.setParameter(17, vo.getEmail());
		query.setParameter(18, vo.getZipCode());
		query.setParameter(19, vo.getLicense());
		query.setParameter(20, vo.getEgal());
		query.setParameter(21, this.GetDate(vo.getSetUpDate()));
		query.setParameter(22, vo.getRegisteredCapital());
		query.setParameter(23, vo.getBank2());
		query.setParameter(24, vo.getBank3());
		query.setParameter(25, vo.getAccountID2());
		query.setParameter(26, vo.getAccountID3());
		query.setParameter(27, vo.getDeliveryAddress());
		query.setParameter(28, vo.getAvailability());
		query.setParameter(29, vo.getTrial_status());
		query.setParameter(30, vo.getTrial_comment());
		query.setParameter(31, this.GetDate(vo.getCreate_date()));
		query.setParameter(32, vo.getCreater());
		query.setParameter(33, vo.getEvaluation_status());
		query.setParameter(34, vo.getEvaluation_comment());
		query.setParameter(35, vo.getScale());
		query.setParameter(36, vo.getRemark());
		query.setParameter(37, vo.getType());
		query.setParameter(38, vo.getFax());
		query.setParameter(39, vo.getSymbol());
		query.setParameter(40, vo.getAccredit());
		return query.executeUpdate();
	}
	
	/**
	 * 判断时间格式是否为空
	 * @param date
	 * @return
	 */
	private String GetDate(Date date){
		//时间格式
		SimpleDateFormat theDate = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		if(date == null||date.toString() == ""||date.toString().equals("null")){
			return null;
		}else{
			return theDate.format(date).toString();
		}
	}
	
	
	
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取所有物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getAll(MaterialVo materialVo, Pager pager){
		List<MaterialVo> returnList = new ArrayList<MaterialVo>();
		String sql= "FROM t_material a ,( \n" + 
					"SELECT materialid,COUNT(distinct vendorid) AS materialNums\n" + 
					"FROM t_vendor_material\n" + 
					"WHERE EXISTS (SELECT 1 FROM T_VENDOR d\n" +
					"WHERE d.vendorid = vendorid\n" + 
					"AND d.type IN ('1','2')\n" + 
					"AND d.evaluation_status = '2') \n"+
					"GROUP BY materialid) b\n" + 
					"WHERE a.materialid = b.materialid(+) \n";

		BigDecimal count=(BigDecimal)materialDao.getHibernateSession().createSQLQuery("select count(1) "+sql).uniqueResult();
		pager.setRecordCount(count.intValue());
		
		sql="SELECT  a.materialid,\n" +
		"a.materialitemname,\n" + 
		"a.desingnation,\n" + 
		"a.materialstandard,\n" + 
		"a.techniccondition,\n" + 
		"a.demension,\n" + 
		"to_char(nvl(a.warningvalue,0),'FM9999990.000099'),\n" + 
		"a.preserveperiod,\n" + 
		"to_char(nvl(a.referenceprice,0),'FM9999990.000099'),\n" + 
		"a.remarks,\n" + 
		"a.parentid,\n" + 
		"a.materialitemcode, \n" + 
		"nvl(b.materialNums,0), \n" +
		"(SELECT c.materialtypename FROM t_materialcatalog c WHERE c.materialcatalogid = a.parentid and rownum = 1) \n"+sql;
		
		SQLQuery query = materialDao.getHibernateSession().createSQLQuery(sql);
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
//		listSize = query.list().size();//翻页后的数据条数
		
		
		if(count.intValue() > 0 ){
			List<Object[]> list = query.list();
			for(Object[] obj : list){
				MaterialVo vo = new MaterialVo();
				
				vo.setMaterialid(String.valueOf(obj[0]));
				vo.setMaterialItemName(String.valueOf(obj[1]));
				vo.setDesingnation(String.valueOf(obj[2]));
				vo.setMaterialStandard(String.valueOf(obj[3]));
				vo.setTechnicCondition(String.valueOf(obj[4]));
				vo.setDemension(String.valueOf(obj[5]));
				vo.setWarningValue(Double.parseDouble(String.valueOf(obj[6])));
				vo.setPreservePeriod(String.valueOf(obj[7]));
				vo.setReferencePrice(Double.parseDouble(String.valueOf(obj[8])));
				vo.setRemarks(String.valueOf(obj[9]));
				vo.setParentId(String.valueOf(obj[10]));
				vo.setMaterialitemcode(String.valueOf(obj[11]));
				vo.setMaterialLinkVendorNum(Integer.parseInt(String.valueOf(obj[12])));
				vo.setParentidName(String.valueOf(obj[13]));//物料总类(小类)
				
				returnList.add(vo);
			}
		}
		return returnList;
	}
	
	
	
	/**
	 * 物资信息列表 用于materialGrid.js 获取带条件查询的物料(有供应商关联的)
	 * @param materialVo
	 * return gridData
	 */
	public List<MaterialVo> getSelect(MaterialVo materialVo, Pager pager){
		List<MaterialVo> returnList = new ArrayList<MaterialVo>();

		String materialItemName = StringUtils.isBlank(materialVo.getMaterialItemName()) ? "" : materialVo.getMaterialItemName() ;
		String desingnation = StringUtils.isBlank(materialVo.getDesingnation()) ? "" : materialVo.getDesingnation() ;
		String materialStandard = StringUtils.isBlank(materialVo.getMaterialStandard()) ? "" : materialVo.getMaterialStandard() ;
		String demension = StringUtils.isBlank(materialVo.getDemension()) ? "" : materialVo.getDemension() ;
		String technicCondition = StringUtils.isBlank(materialVo.getTechnicCondition()) ? "" : materialVo.getTechnicCondition() ;
		String materialitemcode = StringUtils.isBlank(materialVo.getMaterialitemcode()) ? "" : materialVo.getMaterialitemcode() ;
		String parentidName = StringUtils.isBlank(materialVo.getParentidName()) ? "" : materialVo.getParentidName() ;
		String materialcatalogName =   StringUtils.isBlank(materialVo.getMaterialcatalogName()) ? "" : materialVo.getMaterialcatalogName() ;
		
		String sql= "FROM t_material a ,( \n" + 
					"SELECT materialid,COUNT(distinct vendorid) AS materialNums\n" + 
					"FROM t_vendor_material\n" +
					"WHERE EXISTS (SELECT 1 FROM T_VENDOR d\n" +
					"WHERE d.vendorid = vendorid\n" + 
					"AND d.type IN ('1','2')\n" + 
					"AND d.evaluation_status = '2') \n"+
					"GROUP BY materialid) b\n" + 
					"WHERE a.materialid = b.materialid(+) \n";
		if(!materialItemName.equals("")){
			sql += " AND a.materialitemname like '%"+materialItemName+"%' \n";
		}
		if(!desingnation.equals("")){
			sql += " AND a.desingnation LIKE '%"+desingnation+"%' \n";
		}
		if(!materialStandard.equals("")){
			sql += " AND a.materialstandard LIKE '%"+materialStandard+"%' \n";
		}
		if(!demension.equals("")){
			sql += " AND a.demension LIKE '%"+demension+"%' \n";
		}
		if(!technicCondition.equals("")){
			sql += " AND a.techniccondition LIKE '%"+technicCondition+"%' \n";
		}
		if(!materialitemcode.equals("")){
			sql += " AND a.materialitemcode LIKE '%"+materialitemcode+"%' \n";
		}
		//查询小类
		if(!parentidName.equals("")){
			//sql += " AND a.materialitemname = '"+materialItemName+"' \n";
			sql += " AND a.parentid IN (SELECT d.materialcatalogid  \n"+
			       "                    FROM t_materialcatalog d  \n"+
			       "                    WHERE d.materialtypename LIKE '%"+parentidName+"%' ) \n";
		}
		//查询大类
		if(!materialcatalogName.equals("")){
			//sql += " AND a.materialitemname = '"+materialItemName+"' \n";
			sql += " AND a.parentid IN (SELECT d.materialcatalogid  \n"+
			       "                    FROM t_materialcatalog d " +
			       " 	start with d.materialtypename LIKE '%"+materialcatalogName+"%' connect by prior d.materialcatalogid = d.parentid ) ";
		}
		BigDecimal count=(BigDecimal)materialDao.getHibernateSession().createSQLQuery("select count(1) "+sql).uniqueResult();
		pager.setRecordCount(count.intValue());
		
		sql="SELECT  a.materialid,\n" +
		"a.materialitemname,\n" + 
		"a.desingnation,\n" + 
		"a.materialstandard,\n" + 
		"a.techniccondition,\n" + 
		"a.demension,\n" + 
		"to_char(nvl(a.warningvalue,0),'FM9999990.000099'),\n" + 
		"a.preserveperiod,\n" + 
		"to_char(nvl(a.referenceprice,0),'FM9999990.000099'),\n" + 
		"a.remarks,\n" + 
		"a.parentid,\n" + 
		"a.materialitemcode, \n" + 
		"nvl(b.materialNums,0), \n" +
		"(SELECT c.materialtypename FROM t_materialcatalog c WHERE c.materialcatalogid = a.parentid and rownum = 1) \n"+sql;
		
		SQLQuery query = materialDao.getHibernateSession().createSQLQuery(sql);
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}		
		
		if(count.intValue() > 0 ){
			List<Object[]> list = query.list();
			for(Object[] obj : list){
				MaterialVo vo = new MaterialVo();
				
				vo.setMaterialid(String.valueOf(obj[0]));
				vo.setMaterialItemName(String.valueOf(obj[1]));
				vo.setDesingnation(String.valueOf(obj[2]));
				vo.setMaterialStandard(String.valueOf(obj[3]));
				vo.setTechnicCondition(String.valueOf(obj[4]));
				vo.setDemension(String.valueOf(obj[5]));
				vo.setWarningValue(Double.parseDouble(String.valueOf(obj[6])));
				vo.setPreservePeriod(String.valueOf(obj[7]));
				vo.setReferencePrice(Double.parseDouble(String.valueOf(obj[8])));
				vo.setRemarks(String.valueOf(obj[9]));
				vo.setParentId(String.valueOf(obj[10]));
				vo.setMaterialitemcode(String.valueOf(obj[11]));
				vo.setMaterialLinkVendorNum(Integer.parseInt(String.valueOf(obj[12])));
				vo.setParentidName(String.valueOf(obj[13]));//物料总类(小类)
				
				returnList.add(vo);
			}
		}
		return returnList;
	}

}