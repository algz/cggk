package com.sysware.customize.hd.investment.procurementExecute.registration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import javax.persistence.Query;
import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractCondition;
import com.sysware.customize.hd.investment.util.RoleEnum;


@Name("registrationDaoImpl")
public class RegistrationDaoImpl  extends GenericDAOImpl<Registration> implements RegistrationDao {

	@In(create = true)
	Identity identity;
	
	public List<Object[]> getRegistrationList(RegistrationVo vo) {
		String sql = getSql(vo,"*");
		Query query = this.createSqlQuery(sql);
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}

	public BigDecimal getRegistrationListCount(RegistrationVo vo) {
		String sql = getSql(vo,"count(*)");
		return (BigDecimal) this.createSqlQuery(sql).getSingleResult();
	}
	/**
	 * 获取查询sql
	 * @param vo
	 * @return
	 */
    private String getSql(RegistrationVo vo,String name){
    	StringBuilder sql = new StringBuilder();
//    	String roleId = RoleEnum.LEADER.getValue();
//		String roleSql = "select DISTINCT t.ROLEID " +
//				"from T_ROLE_USER t " +
//				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
//				"and t.ROLEID = '"+roleId+"'";
//		List list = this.getHibernateSession().createSQLQuery(roleSql).list();
    	if(name.equals("*")){
    		sql.append(" select distinct pc.contractcode,pc.contractname,tm.materialitemname,tm.materialitemcode, ");
    		sql.append("   rr.id,rr.contract_id,rr.registration_code,rr.item_id,rr.lot_no, ");
    		sql.append("   rr.invoice_no,rr.transport_date,rr.transport_no,rr.transport_num, ");
    		sql.append("   rr.purchase_num,rr.qualify_no,rr.creater_id,to_char(rr.create_date,'yyyy-mm-dd hh:mi:ss'),rr.arrival_num, ");
    		sql.append("   rr.amount,tu.truename,  rr.arrival_date, rr.price,tm.DEMENSION ,");
    		sql.append("   tm.technicCondition,tm.desingnation,tm.materialStandard,rr.qualified_Num,rr.vendorName,rr.note,tv.VENDORCODE,pc.VENDNAME as vendName," +
    				"rr.furnaceBatch,rr.materialType,rr.check_result," +
    				"rr.contractCode as contract_Code,rr.itemCode,rr.contractName as contract_Name,rr.itemName, "); 
    		//增加物资种类小类,大类
    		sql.append(" mc.MATERIALtypename,(select  m1.MATERIALtypename from T_MATERIALCATALOG m,T_MATERIALCATALOG m1  where  m.MATERIALCATALOGID=mc.MATERIALCATALOGID  and M.PARENTID=m1.MATERIALCATALOGID) MATERIALtypename_parentname,RR.MATERIAL_STATE, ");
            sql.append(" dep.DEPARTMENTNAME, ");//增加登记人部门
            sql.append(" tm.delivery_status, ");//增加物资交货状态
            sql.append(" ai.apply_no, ");//增加入库编号
            sql.append(" ac.check_status, ");//增加检验状态
            sql.append(" rr.create_date ");//增加排序字段，入库时间
    		//sql.append("   ,cd.id as CheckdetilID ,cd.check_type,cd.object_no,cd.object_name,cd.object_comment,cd.object_result ");
    	}else{
    		sql.append(" select count(0) ");
    	}
    	
    	sql.append(" from t_registration rr   "); 
    	sql.append(" left join t_procurementcontract pc on rr.contract_id = pc.procurementcontractid ");
		sql.append("  left join t_material tm on rr.item_id = tm.MATERIALID  ");
//		if(list.size()==0){
			sql.append(" left join t_item_profile ip on tm.materialitemcode=ip.item_code ");
//		}
		sql.append(" left join t_user tu on rr.creater_id = to_char(tu.userid) ");
		sql.append(" left join T_DEPARTMENTS dep on dep.depcode=tu.instcode ");
		sql.append("  left join t_vendor tv on tv.vendorId = pc.VENDOR ");
		sql.append("  left join T_Arrival_Check ac on rr.id = ac.registration_id ");
	//	sql.append("  left join t_check_detail cd on ac.id = cd.avvival_check_id ");
		//增加物质种类查询
		sql.append(" left join T_MATERIALCATALOG mc on tm.parentid=mc.MATERIALCATALOGid");
		sql.append(" left join t_apply_in  ai on ai.check_id=ac.id");
    	sql.append(" where 1=1 ");
    	if(isNotLeader()){
        	sql.append(" and ip.login_name='"+identity.getLoginUser().getLoginname()+"'");
    	}
    	if(vo.getRegistrationCode()!=null && !vo.getRegistrationCode().equals("")){
    		sql.append(" and rr.registration_code like '%").append(vo.getRegistrationCode()).append("%'");
    	}
    	if(vo.getContractCode()!=null && !vo.getContractCode().equals("")){
    		sql.append(" and pc.contractcode like '%").append(vo.getContractCode()).append("%'");
    	}
    	if(vo.getContractName()!=null && !vo.getContractName().equals("")){
    		sql.append(" and pc.contractname like '%").append(vo.getContractName()).append("%'");
    	}
    	if(vo.getItemName()!=null && !vo.getItemName().equals("")){
    		sql.append(" and tm.materialitemname like '%").append(vo.getItemName()).append("%'");
    	}
    	if(vo.getItemCode()!=null && !vo.getItemCode().equals("")){
    		sql.append(" and tm.materialitemcode like '%").append(vo.getItemCode()).append("%'");
    	}
    	if(vo.getDesingnation()!=null && !vo.getDesingnation().equals("")){
    		sql.append(" and tm.DESINGNATION like '%").append(vo.getDesingnation()).append("%'");
    	}
    	if(vo.getMaterialStandard()!=null && !vo.getMaterialStandard().equals("")){
    		sql.append(" and tm.MATERIALSTANDARD like '%").append(vo.getMaterialStandard()).append("%'");
    	}
    	if(vo.getMaterialtypename()!=null&&!vo.getMaterialtypename().equals("")){
    		//物质种类小类
    		sql.append(" and tm.parentid='"+vo.getMaterialtypename()+"' ");
    	}else if(vo.getMaterialtypename_parent()!=null&&!vo.getMaterialtypename_parent().equals("")){
    		//物质种类大类
    		sql.append(" and mc.parentid='"+vo.getMaterialtypename_parent()+"'  ");
    	}
    	if(vo.getMaterialCalotlogName()!=null && !vo.getMaterialCalotlogName().equals("")){
    		sql.append(" and tm.materialid in (");
    		sql.append(" select tm.materialid from t_material tm where tm.parentid in (");
    		sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
    		sql.append(" start with mc.MATERIALTYPENAME like '%"+vo.getMaterialCalotlogName()+"%' ");
    		sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
    		sql.append(")");
    	}
    	if(vo.getFurnaceBatch()!=null && !vo.getFurnaceBatch().equals("")){
    		sql.append(" and rr.FurnaceBatch like '%").append(vo.getFurnaceBatch()).append("%'");
    	}
    	if(vo.getCheckStatus()!=null && !"".equals(vo.getCheckStatus())){
    		sql.append(" and ac.check_status = '").append(vo.getCheckStatus()).append("'");
    	}
    	if(vo.getCreateDateStart() != null && !"".equals(vo.getCreateDateStart())){
    		if(null == vo.getCreateDateEnd() || "".equals(vo.getCreateDateEnd())){
    			sql.append(" and rr.create_date >=to_date('").append(vo.getCreateDateStart()).append("','yyyy-mm-dd')");
    		}else{
    			sql.append(" and rr.create_date >=to_date('").append(vo.getCreateDateStart()).append("','yyyy-mm-dd')").
    				append(" and rr.create_date <=to_date('").append(vo.getCreateDateEnd()).append("','yyyy-mm-dd')");
    		}
    	}
    	
    	if(vo.getArrivalDateStart() != null && !"".equals(vo.getArrivalDateStart())){
    		if(null == vo.getArrivalDateEnd() || "".equals(vo.getArrivalDateEnd())){
    			sql.append(" and rr.arrival_date >=to_date('").append(vo.getArrivalDateStart()).append("','yyyy-mm-dd')");
    		}else{
    			sql.append(" and rr.arrival_date >=to_date('").append(vo.getArrivalDateStart()).append("','yyyy-mm-dd')").
    				append(" and rr.arrival_date <=to_date('").append(vo.getArrivalDateEnd()).append("','yyyy-mm-dd')");
    		}
    	}
    	String orderFlag = vo.getOrderFlag()==null?"1":vo.getOrderFlag();
    	if(orderFlag.equals("1")){
        	sql.append(" order by rr.arrival_date desc ");
    	}else if(orderFlag.equals("2")){
    		sql.append(" order by ac.check_status desc ");
    	}else if(orderFlag.equals("3")){
    		sql.append(" order by rr.create_date desc ");
    	}
    	return sql.toString();
    }

	public List<Object[]> getItemList(String contractId,String materialCalotlogName) {
		StringBuilder queryStr = new StringBuilder();
		if (materialCalotlogName != null && materialCalotlogName.length() > 0) {
			queryStr.append(" and t.item_id in (");
			queryStr.append(" select tm.materialid from t_material tm where tm.parentid in (");
			queryStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			queryStr.append(" start with mc.MATERIALTYPENAME "+materialCalotlogName+" In ('有色金属','黑色金属') ");
			queryStr.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			queryStr.append(")");
		}
		String sqladd = " and t.contract_id= '"+contractId+"'";
//		if(contractId==null || contractId.equals("")){
//			sqladd = "";
//		}
		String sql = "select  distinct t.purchase_num,sum(t.arrival_num),t.item_id  from t_registration t where 1=1 "+sqladd+" "+queryStr.toString()+"  group by t.item_id,t.purchase_num having sum(t.arrival_num)=t.purchase_num ";
		
		return this.createSqlQuery(sql).getResultList();
	}

	public String maxCode() {
		String sql = "select max(substr(t.REGISTRATION_CODE,5)) from t_registration t";
		return  (String) this.createSqlQuery(sql).getSingleResult();
	}

	public String getArrivalNumList(String itemId) {
		String sql = "select sum(ARRIVAL_NUM) from t_registration t where t.ITEM_ID='"+itemId+"'";
		return  (String) this.createSqlQuery(sql).getSingleResult();
	}

	public Material getMaterialInfo(RegistrationVo vo) {
		String sql = "select obj from Material obj where obj.materialitemcode='"+vo.getItemCode()+"'";
		List list = createQuery(sql).getResultList();
		if(list==null || list.size()==0)
			return null;
		else
			return (Material) list.get(0);
	} 
    
	public void delArrivalCheck(String registId)throws Exception{ 
		String sql = "delete T_Arrival_Check t " +
				"where t.registration_id = '" + registId + "'";
		this.createSqlQuery(sql).executeUpdate();
	}

	public List<MaterialVo> getMaterialByContract(RegistrationVo vo) {
		String sql = " from t_material m " +
				"left join t_procurementcontract_purchase pcp on m.materialId = pcp.materialId " +
				"INNER JOIN t_procurementdetail PD ON PD.PURCHASEID=PCP.PURCHASEID AND PD.MATERIALID=M.MATERIALID "+
				"inner join t_item_profile ip ON M.materialitemcode=ip.item_code " +
				"where pcp.procurementcontractid='"
				+ vo.getContractId() + "' ";
		if(vo.getMaterialitemcode()!=null&&!vo.getMaterialitemcode().equals("")){
			sql+=" and m.materialitemcode LIKE '%"+vo.getMaterialitemcode()+"%' ";
		}
		if(vo.getMaterialItemName()!=null&&!vo.getMaterialItemName().equals("")){
			sql+=" and m.materialitemname like '%"+vo.getMaterialItemName()+"%' ";
		}
		if(vo.getMaterialStandard()!=null&&!vo.getMaterialStandard().equals("")){
			sql+=" and m.materialstandard like '%"+vo.getMaterialStandard()+"%' ";
		}
		if(vo.getDemension()!=null&&!vo.getDemension().equals("")){
			sql+=" and m.demension like '%"+vo.getDemension()+"%' ";
		}
		if(vo.getDesingnation()!=null&&!vo.getDesingnation().equals("")){
			sql+=" and m.desingnation like '%"+vo.getDesingnation()+"%'";
		}
		if(vo.getMaterialCalotlogName()!=null&&!vo.getMaterialCalotlogName().equals("")){
			sql+=" and  m.parentid='"+vo.getMaterialCalotlogName()+"'";
		}
		sql += " and ip.login_name='"+identity.getLoginUser().getLoginname()+"'";
		
		BigDecimal count=(BigDecimal)getHibernateSession().createSQLQuery("select count(1) "+sql).uniqueResult();
		vo.setCount(count.intValue());
		
		List<Object[]> objList = this.getHibernateSession().createSQLQuery("select PD.ACTUALNUMBER,m.* "+sql)
		                                                        .addEntity("m", Material.class)
		                                                        .addScalar("ACTUALNUMBER")
		                                                        .setFirstResult(vo.getStart())
		                                                        .setMaxResults(vo.getLimit())
		                                                        .list();
		List<MaterialVo> voList = new ArrayList<MaterialVo>();
		for (Object[] objs : objList) {
			Material m = (Material)objs[0];
			MaterialVo mvo = new MaterialVo();
			try {
				BeanUtils.copyProperties(mvo, m);
			    mvo.setPurchaseNum(objs[1].toString());
//				sql="select t.planned_price from v_eudm_wms_last_price t where t.item_code='"+m.getMaterialitemcode()+"'";
//				Object o = this.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
//				BigDecimal referencePrice=new BigDecimal(o==null?"0":o.toString());
//				mvo.setReferencePrice(referencePrice.doubleValue());//设置计划单价
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			voList.add(mvo);
		}

		return voList;
	}
	/**
	 * 判断当前用户是否领导
	 * @return
	 */
	public boolean isNotLeader(){
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 入厂登记窗口--合同编号选择
	 * @param condition
	 * @return
	 */
	public List<ProcurementContract> findContractByCondition(ProcurementContractCondition condition) {
		int paramIndex = 1;
		List<String> params = new ArrayList<String>();
		StringBuilder queryStr = new StringBuilder(" 1=1 ");
		if (StringUtils.isNotEmpty(condition.getCreateType())) {
			queryStr.append(" and obj.createType ='"+condition.getCreateType()+"' ");
//			queryStr.append(" and obj.createType = ?" + paramIndex++);
//			params.add(condition.getCreateType());
		}
		if (StringUtils.isNotEmpty(condition.getMaterialType())) {

			queryStr.append(" and obj.materialType like '%"+condition.getMaterialType()+"%' ");
		}

		if (condition.getUserId() != null) {
			queryStr.append(" and obj.editors ='"+condition.getUserId()+"' ");
		}
		
		if (condition.getApplicationStatus() != null) {
			queryStr.append(" and obj.applicationStatus ='"+condition.getApplicationStatus()+"' ");
		}
		
		StringBuilder str=new StringBuilder(queryStr);
		str.insert(0, "select count(*) from T_ProcurementContract obj where ");
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(str.toString()).setMaxResults(1).uniqueResult();
		condition.setCount(count.intValue());
		
		
		queryStr.insert(0, "select {obj.*} from T_ProcurementContract obj where ");
		queryStr.append(" order by obj.procurementContractId desc");
		return (List<ProcurementContract>)this.getHibernateSession().createSQLQuery(queryStr.toString())
		                                 .addEntity("obj",ProcurementContract.class)
		                                 .setFirstResult(condition.getStart())
		                                 .setMaxResults(condition.getLimit()).list();
	}
	
}
