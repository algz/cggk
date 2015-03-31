package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.hibernate.NonUniqueResultException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Logger;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.jboss.seam.log.Log;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.base.jdbc.SingleConnection;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;



@Name("engineeringProject_EngineeringProjectDaoImpl")
public class EngineeringProjectDaoImpl extends GenericDAOImpl<EngineeringProjectModel> implements EngineeringProjectDao{
	
	@SuppressWarnings("unused")
	@Logger private Log log;
	//log.info("");
	

	
	
	private static final String selectAllSql = "select * from tb_equipmenttype where ISDELETE=0";
	private static final String sql = "select * from tb_equipmenttype t where t.ISDELETE=0 and t.parent_id='0' order by t.ID asc";
	private static final String countSql = "select count(*) from tb_equipmenttype t where t.ISDELETE=0 and t.parent_id='0' order by t.ID asc";
	private static final String searchCountHql = "select count(*) from EquipreServiceModel where equipmentname like :name and ISDELETE=0";
	private static String getTreeNodes = "select ID,EQUIPMENTNAME,DESIGNTION,ISSHEET,ISLEAF,STANDARD,TECHNICCONDITION from TB_EQUIPMENTTYPE where PARENT_ID=? and ISDELETE=0 order by EQUIPMENTNAME";
	private static String getTreeNodes1 = "select ID,EQUIPMENTNAME,DESIGNTION,ISSHEET,ISLEAF,STANDARD,TECHNICCONDITION from TB_EQUIPMENTTYPE where PARENT_ID=? and ISDELETE=0 and EQUIPMENTNAME!='外协件' order by EQUIPMENTNAME";
	private static String getListByIdSql = "select * from TB_EQUIPMENTTYPE where ID=?";
	
	
	
	//获取物料种类列表
	public List<Object[]> getWlzl(EngineeringProjectVo vo,Pager pager) {
		//远程排序需要
		String dir = StringUtils.isBlank(vo.getDir()) ? "" : vo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(vo.getSort()) ? "" : vo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		//远程排序,添加后续sql 
		//需要看sql是否有groud by
		String thissql = sql;
		if(sort != "" && dir != ""){
			thissql += "order by " + sort + " " + dir + " \n";
		}
		
		SQLQuery query = this.getHibernateSession().createSQLQuery(thissql);
		//SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		
		
		//2011/8/15 13:23添加翻页
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		return query.list();
	}
	
	//获取物料种类表数据总条数
	public int getWlzlCount(EngineeringProjectVo vo) {
		//远程排序需要
		String dir = StringUtils.isBlank(vo.getDir()) ? "" : vo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(vo.getSort()) ? "" : vo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		//远程排序,添加后续sql 
		//需要看sql是否有groud by
		String thissql = countSql;
		if(sort != "" && dir != ""){
			thissql += "order by " + sort + " " + dir + " \n";
		}
		
		
		SQLQuery query = this.getHibernateSession().createSQLQuery(thissql);
		//SQLQuery query = this.getHibernateSession().createSQLQuery(countSql);

		if (null == query || null == query.uniqueResult()) {
			return Integer.parseInt("0");
		} else {
			return Integer.parseInt(query.uniqueResult().toString());
		}
		
	}
	
	//添加物料种类
	@Transactional
	public String addThisModel(EngineeringProjectModel model) throws AppException {
		String sql = "";
		SQLQuery query = this.getHibernateSession().createSQLQuery(selectAllSql);
		
		List list = new ArrayList();
		list = query.list();
		//String nodeid = model.getParentId();
		if (list.size() == 0){// 无记录
			this.save(model);
		}else{//如果有记录
			//SQLQuery query1 = this.getHibernateSession().createSQLQuery(selectMaxNumbersSql);
			//int i = ((BigDecimal)query1.uniqueResult()).intValue();
			//model.setRowNumbers(i+1);
			//model.setAccounttbname("TB_EQUIP_"+String.valueOf(i+1)+"_ACCOUNT");
			
			//把填入的名字写入牌号，把上级节点对应的名字填入器材名称
			
			
			String getenameSql = "select * from tb_equipmenttype where ID=?";
			SQLQuery query2 = this.getHibernateSession().createSQLQuery(getenameSql);
			//query2.setParameter(0, nodeid);
			query2.setParameter(0, "");
			Object[] obarr = (Object[])query2.uniqueResult();
			String ename = null;
			if(null != obarr){
				ename = String.valueOf(obarr[1]);
			}
			//String designation = model.getDesigntion();
			
			
			//model.setEquipmentname(ename);
			//model.setDesigntion(designation);
			//model.setIsSheet(0);//叶子节点
			//model.setIsLeaf(1);
			//if(model.getParentId() == "" || model.getParentId() == null)model.setParentId("0");//如果什么节点都没选,默认添加到根节点
			this.save(model);
			
		}
		
		//更新 当前所选节点为非叶子节点
		//SQLQuery updateLeafQuery = this.getHibernateSession().createSQLQuery(this.updateIsLeafSql);
		SQLQuery updateLeafQuery = this.getHibernateSession().createSQLQuery(" update tb_equipmenttype set ISLEAF=0,ISSHEET=1 where ID=? ");
		//updateLeafQuery.setParameter(0, nodeid);
		updateLeafQuery.setParameter(0, "");
		updateLeafQuery.executeUpdate();
		
		
		//更新当前所选节点为sheet
		/*SQLQuery updateSheetQuery = this.getHibernateSession().createSQLQuery("update tb_equipmenttype set ISLEAF=0,ISSHEET=1 where id=?");
		updateSheetQuery.setParameter(0, nodeid);//传入需要插入的这个节点的父节点ID
		updateSheetQuery.executeUpdate();*/
		
		return null;
	}
	
	//删除物料种类
	@Transactional
	public void delWlzl(String id)  throws Exception {
		
		//删除本节点wlzl表内容
		//String delwlzlSql = "delete from tb_equipmenttype where ID=?";
		/*String delwlzlSql = 
			"delete from tb_equipmenttype where id in ( \n" +
			"SELECT a.id FROM tb_equipmenttype a \n" + 
			"START WITH   a.parent_id = ? \n" + 
			"CONNECT BY PRIOR  a.id=a.parent_id ) \n" +
			"OR id = ? \n";
		SQLQuery query = this.getHibernateSession().createSQLQuery(delwlzlSql);
		query.setParameter(0, id);
		query.setParameter(1, id);
		query.executeUpdate();*/
		
		
		
		
		
		Connection conn = SingleConnection.getInstance().getConnection();
		//Connection conn2 = SessionFactoryUtils.getDataSource(this.getHibernateSession().getSessionFactory()).getConnection();
		Connection conn3 = this.getHibernateSession().connection();
	    CallableStatement proc = conn.prepareCall("{ Call pkg_jt_basicData.p_update_nodeStatus(?,?,?,?,?) }"); //前5个是入参,后3个是出参
		proc.setString(1, id);
		proc.setString(2, "1");//删除自身节点
	    proc.registerOutParameter(3,oracle.jdbc.OracleTypes.CURSOR);//输出为集合
	    proc.registerOutParameter(4,oracle.jdbc.OracleTypes.NUMBER);//返回参数1
	    proc.registerOutParameter(5,java.sql.Types.VARCHAR); //返回参数2 数据库类型varchar2
	    proc.execute();

	    //int flag = ((BigDecimal)proc.getObject(3)).intValue();//得到返回的flag,后台判断与Java判断一致
	    
	    //flag = Integer.parseInt((String)proc.getObject(3)); //flag为0 表示没数据,为1 表示有一条数据 多条为 -1
	    
        
	    
		//关闭连接,如果有的话
	    //if(rs != null)rs.close();
	    if(conn!=null)conn.close();
	    
	    
		//return flag;
		
	}
	
	/**
	 * 新增一条项目编号合同信息
	 */
	@Transactional
	public String addEngineeringProject(EngineeringProjectFormVo vo)  throws Exception {
		String sql = 
			"\n" +
			"INSERT INTO TB_ENGINEERINGCONTRACT (\n" + 
			"ENGINEERINGCONTRACTID,\n" + 
			"CONTRACTCODE,\n" + 
			"CONTRACTNAME,\n" + 
			"TBCIVILREGISTID,\n" + 
			"PARTTWO,\n" + 
			"UNITNAME,\n" + 
			"WORKPERSON,\n" + 
			"CONTRACTMANAGERPERSON,\n" + 
			"SUPERIORPERSON,\n" + 
			"FUND,\n" + 
			"FUNDUNIT,\n" + 
			"CONTRACTLEVEL,\n" + 
			"APPROVALLOG,\n" + 
			"REMARKS,\n" + 
			"UPLOADFILEID,\n" + 
			"UPLOADFILE,\n" + 
			"STATUS,\n" + 
			"YMD\n" + 
			")\n" + 
			
			"SELECT\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?,\n" + 
			"?\n" + 
			"from dual ";

		
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, getUUID());
		query.setParameter(1, vo.getContractCode());
		query.setParameter(2, vo.getContractName());
		query.setParameter(3, vo.getProjectId());//外键ID
		query.setParameter(4, vo.getPartTwo());
		query.setParameter(5, vo.getUnitName());
		query.setParameter(6, vo.getWorkPerson());
		query.setParameter(7, vo.getContractManagerPerson());
		query.setParameter(8, vo.getSuperiorPerson());
		query.setParameter(9, vo.getFund());
		query.setParameter(10, vo.getFundUnit());
		query.setParameter(11, vo.getContractLevel());
		query.setParameter(12, "");
		query.setParameter(13, "");
		query.setParameter(14, vo.getUploadFileId());
		query.setParameter(15, vo.getUploadFile());
		query.setParameter(16, vo.getStatus());
		query.setParameter(17, getNowYMD());
		return query.executeUpdate()+"";

	}
	
	
	
	
	
	/**
	 * 更新一条项目编号合同信息
	 */
	@Transactional
	public String updateEngineeringProject(EngineeringProjectFormVo vo)  throws Exception {
		//String engineeringContractId = StringUtils.isBlank(vo.getId()) ? "" : vo.getId();
		String uploadfileid = StringUtils.isBlank(vo.getUploadFileId()) ? "" : vo.getUploadFileId();//上传文件的ID
		String uploadfile = StringUtils.isBlank(vo.getUploadFile()) ? "" : vo.getUploadFile();//上传文件名
		String returnString = "";
		
		if(uploadfileid != null && uploadfileid != "" && uploadfile != null && uploadfile != ""){//这个保存上传文件
			String sql = 
				"UPDATE TB_ENGINEERINGCONTRACT a\n" +
				"SET a.contractcode = ?,\n" + 
				"a.contractname = ?,\n" + 
				"a.parttwo = ?,\n" + 
				"a.fund = ?,\n" + 
				"a.fundunit = ?,\n" + 
				"a.contractlevel = ?,\n" + 
				"a.unitname = ?,\n" + 
				"a.workperson = ?,\n" + 
				"a.contractmanagerperson = ?,\n" + 
				"a.superiorperson = ?,\n" + 
				"a.uploadfileid = ?,\n" + 
				"a.uploadfile = ?\n" + 
				"WHERE 1=1\n" + 
				"AND a.engineeringcontractid = ?";
			
			SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
			query.setParameter(0, vo.getContractCode());
			query.setParameter(1, vo.getContractName());
			query.setParameter(2, vo.getPartTwo());
			query.setParameter(3, vo.getFund());
			query.setParameter(4, vo.getFundUnit());
			query.setParameter(5, vo.getContractLevel());
			query.setParameter(6, vo.getUnitName());
			query.setParameter(7, vo.getWorkPerson());
			query.setParameter(8, vo.getContractManagerPerson());
			query.setParameter(9, vo.getSuperiorPerson());
			query.setParameter(10, vo.getUploadFileId());
			query.setParameter(11, vo.getUploadFile());
			query.setParameter(12, vo.getId());
			returnString = query.executeUpdate()+"";
			
		}else{//这个不保存上传文件
			String sql = 
				"UPDATE TB_ENGINEERINGCONTRACT a\n" +
				"SET a.contractcode = ?,\n" + 
				"a.contractname = ?,\n" + 
				"a.parttwo = ?,\n" + 
				"a.fund = ?,\n" + 
				"a.fundunit = ?,\n" + 
				"a.contractlevel = ?,\n" + 
				"a.unitname = ?,\n" + 
				"a.workperson = ?,\n" + 
				"a.contractmanagerperson = ?,\n" + 
				"a.superiorperson = ? \n" + 
				"WHERE 1=1\n" + 
				"AND a.engineeringcontractid = ?";
			
			SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
			query.setParameter(0, vo.getContractCode());
			query.setParameter(1, vo.getContractName());
			query.setParameter(2, vo.getPartTwo());
			query.setParameter(3, vo.getFund());
			query.setParameter(4, vo.getFundUnit());
			query.setParameter(5, vo.getContractLevel());
			query.setParameter(6, vo.getUnitName());
			query.setParameter(7, vo.getWorkPerson());
			query.setParameter(8, vo.getContractManagerPerson());
			query.setParameter(9, vo.getSuperiorPerson());
			query.setParameter(10, vo.getId());
			returnString = query.executeUpdate()+"";
		}
		return returnString;
	}
	
	
	
	
	
	
	
	
	/***
	 * 根据物料名称查询
	 */
	public List<EngineeringProjectVo> searchWlzl(String materialCode,String name,String designation,String standard,String techniccondition, Pager pager,EngineeringProjectVo inputvo) {
		List<EngineeringProjectVo> returnList = new ArrayList<EngineeringProjectVo>();
		//远程排序需要
		String dir = StringUtils.isBlank(inputvo.getDir()) ? "" : inputvo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(inputvo.getSort()) ? "" : inputvo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		String searchSql = "select * from tb_equipmenttype where 1=1";
		String condition = "";
		String thisMaterialCode = StringUtils.isBlank(materialCode) ? "" : materialCode ;

		if(thisMaterialCode != ""){
			condition += " and materialcode like '%"+thisMaterialCode+"%'";
		}
		if(!name.trim().equals(""))
		{
			condition += " and EQUIPMENTNAME like '%"+name+"%'";
		}
		if(!designation.trim().equals(""))
		{
			condition += " and DESIGNTION like '%"+designation+"%'";
		}
		if(!standard.trim().equals(""))
		{
			condition += " and STANDARD like '%"+standard+"%'";
		}
		if(!techniccondition.trim().equals(""))
		{
			condition += " and TECHNICCONDITION like '%"+techniccondition+"%'";
		}
		
		searchSql += condition;
		
		
		//远程排序,添加后续sql 
		//需要看sql是否有groud by
		searchSql = searchSql+"\n";
		if(sort != "" && dir != ""){
			searchSql += "order by " + sort + " " + dir + " \n";
		}
		
		
		//此查询只查询出总记录
		Query query2 = this.getHibernateSession().createSQLQuery(searchSql);
        int count = query2.list().size();
		pager.setRecordCount(count);//查询后直接复制pager的属性 remote可以直接取
		
		
		//查询出需要翻页的结果集
		Query query = this.getHibernateSession().createSQLQuery(searchSql);
		if(null != pager){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		
		
		List<Object[]> list = query.list();
		
		for(Object[] obj : list)
		{
			EngineeringProjectVo vo = new EngineeringProjectVo();
			
			/*vo.setId(String.valueOf(obj[0]));
			vo.setEquipmentname(String.valueOf(obj[1]));
			vo.setWarningvalue(String.valueOf(obj[6]));
			vo.setWarningvaluestring(String.valueOf(obj[6]));
			vo.setStorenumber(String.valueOf(obj[7]));
			vo.setDesigntion(String.valueOf(obj[3]));
			vo.setStandard(String.valueOf(obj[4]));
			vo.setPriceStr(String.valueOf(obj[9]));
			vo.setTechniccondition(String.valueOf(obj[5]));
			vo.setRemark(String.valueOf(obj[11]));
			
			//新添加
			vo.setMaterialCode(String.valueOf(obj[20]));//物资代码
			vo.setStandardSize(String.valueOf(obj[21]));//标准尺寸
			vo.setDimension(String.valueOf(obj[8]));//计量单位
			vo.setStartOrderQuantity(String.valueOf(obj[22]));//起订量
			vo.setActualPrice(String.valueOf(obj[23]));//实际单价
			vo.setProcurementCycleDate(String.valueOf(obj[24]));//采购周期(月)
			vo.setReTention(String.valueOf(obj[17]));//保管周期(月)
			vo.setRetestProject(String.valueOf(obj[18]));//复验项目
			vo.setRetestHelp(String.valueOf(obj[19]));//复验说明
			vo.setMainManufactureName(String.valueOf(obj[26]));//主供应商
			vo.setAlternativeManufactureName(String.valueOf(obj[28]));//备选供应商1
			vo.setAlternativeManufacture2Name(String.valueOf(obj[33]));//备选供应商2
			vo.setCliqueCode(String.valueOf(obj[30]));//集团代码
*/			
			returnList.add(vo);
		}
		
		return returnList;
	}
	
	/**
	 * 根据物料名称查询,获取查询记录条数
	 */
	public int getSeachWlzlCount(String name) {
		Query query = this.getHibernateSession().createQuery(searchCountHql);
		query.setString("name", "%"+name+"%");
		int count = ((Long)query.uniqueResult()).intValue();
		return count;
	}
	
	
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename){
		String id = ""; //tb_equipmenttype 表 id
		
		String sql = "from EquipreServiceModel where equipmentname=?  and isLeaf=0";
		Query query = this.getHibernateSession().createQuery(sql);
		query.setParameter(0, ename);
		try{
			EngineeringProjectModel model = (EngineeringProjectModel)query.uniqueResult();
			//id = model.getId();
			id = "";
		}catch (NonUniqueResultException e){
			id = null;
			e.printStackTrace();
			//System.out.println("findIdByName error , ename : "+ename+"");
		}finally{
			
		}
		return id;
		
		
	}
	
	
	
	/**
	 * 根据文件名称获取导入文件的ID Loop遍历Sheet里面的数据时
	 * @param ename
	 * @return String
	 */
	public String findIdByNameForLoop(String ename,String parentName){
		String id = "";
		String sql  = 
			"select id from tb_equipmenttype \n" +
			"where equipmentname = ? \n" + 
			//"and isLeaf=0 \n" + 
			"and parent_id  = (select id from tb_equipmenttype  where equipmentname = ? and rownum = 1) \n"  +
			"and rownum = 1 \n"
			;
		//Query query =this.getHibernateSession().createQuery(getIdByFileNameSql);
		SQLQuery query  = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, ename);
		query.setParameter(1, parentName);
		try{
			//EquipreServiceModel model = (EquipreServiceModel)query.uniqueResult();
			//id = model.getId();
			List resultList = query.list();
			String getTheId = "";
			if(resultList.size() != 0){
				getTheId = (String)query.list().get(0);
				id = getTheId;
			}else{
				id = null;
			}
			
		}catch (NonUniqueResultException e){
			id = null;
			e.printStackTrace();
		}finally{
			
		}
		return id;
	}
	
	
	
	/**
	 * 导入excel文件内容入库
	 * @param ename
	 */
	@Transactional
	//public int excelContentsSaveDb(EquipreServiceModel model) throws Exception {
	public EngineeringProjectModel excelContentsSaveDb(EngineeringProjectModel model) throws Exception {
		
		EngineeringProjectModel returnVo = new EngineeringProjectModel();//要返回给
		int flag = 0;
		Connection conn = null;
		Connection conn3 = null;
		ResultSet rs = null;
		try {

			conn = SingleConnection.getInstance().getConnection();
			// Connection conn2 =
			// SessionFactoryUtils.getDataSource(this.getHibernateSession().getSessionFactory()).getConnection();
			conn3 = this.getHibernateSession().connection();
			//  2012-04-28 15:19  p_save_model 替换为 p_beforeSaveCheckModel
			CallableStatement proc = conn.prepareCall("{ Call pkg_jt_basicData.p_beforeSaveCheckModel(?,?,?,?,?,?,?,?) }"); // 前5个是入参,后3个是出参
			/*
			String p1 = model.getMaterialCode(); // 物资代码
			String p2 = model.getEquipmentname(); // 器材名称
			String p3 = model.getDesigntion(); // 牌号
			String p4 = model.getStandard(); // 规格型号
			String p5 = model.getTechniccondition();//技术条件
			*/
			String p1 = ""; // 物资代码
			String p2 = ""; // 器材名称
			String p3 = ""; // 牌号
			String p4 = ""; // 规格型号
			String p5 = "";//技术条件
			proc.setString(1, p1);
			proc.setString(2, p2);
			proc.setString(3, p3);
			proc.setString(4, p4);
			proc.setString(5, p5);
			proc.registerOutParameter(6, oracle.jdbc.OracleTypes.CURSOR);// 输出为集合
			proc.registerOutParameter(7, oracle.jdbc.OracleTypes.NUMBER);// 返回参数1
			proc.registerOutParameter(8, java.sql.Types.VARCHAR); // 返回参数2 数据库类型varchar2
			proc.execute();
			rs = (ResultSet) proc.getObject(6);
			
			//flag为0表示有一条数据或多条数据;为1 表示没数据
			flag = ((BigDecimal) proc.getObject(7)).intValue();// 得到返回的flag,后台判断与Java判断一致
			// flag =Integer.parseInt((String)proc.getObject(9));//得到返回的flag,后台判断与Java判断一致
			if (flag == 0) {//如果后台表有一条或多条数据
				//model.setIsSheet(1);//不是叶子节点,是枝干节点
				returnVo = null; //如果不需要保存的话就返回一个空的类对象
				
			} else if (flag == 1) {//如果后台表没有此数据就写入
				//model.setIsSheet(0);// 是叶子节点
				// 保存mode
				this.save(model); // 不知道id序列生成规则,必须用框架平台的方法保存model
				returnVo = (EngineeringProjectModel)model.clone();
			}



		} catch (Exception e) {
			e.printStackTrace();
		} finally { //添加finally关闭打开的链接节省资源
			if (rs != null)rs.close();
			if (conn != null)conn.close();
		}
		return returnVo;
	}
	
	/***************************************************************************
	 * 获取树根节点
	 */
	public List<Object[]> getTreeRootNode(String parentid,String type,long uID) {
		SQLQuery query = null;
//		String sql = arrivalDaoImpl.getEquipmentByRoles(String.valueOf(uID));
		String sql = "";
		if(type.equals("1")){ 
				query = this.getHibernateSession().createSQLQuery(getTreeNodes); 
		}else{
			if(sql.equals("") || !parentid.equals("0")){
				query = this.getHibernateSession().createSQLQuery(getTreeNodes1);
			}else{
				query = this.getHibernateSession().createSQLQuery(sql);
			}
		}
		query.setParameter(0, parentid);
		/*System.out.println("查询语句:"+query.getQueryString());
		System.out.println("查询条件:"+parentid);*/
		return query.list();
		
	}
	
	/***
	 * 根据树节点ID获取列表信息
	 */
	public List<Object[]> getListByNodeId(EngineeringProjectVo model, String nodeid,Pager pager) {
		//远程排序需要
		String dir = StringUtils.isBlank(model.getDir()) ? "" : model.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(model.getSort()) ? "" : model.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		
		List<Object[]> returnList = new ArrayList<Object[]>();
		
		String adjustSql = "select t.isleaf,t.issheet from tb_equipmenttype t where t.id=? and t.isdelete=0 \n";
			
		String getListByParentIdSql =  "select t.* from tb_equipmenttype t \n"+
									   "where t.parent_id=? and t.isdelete=0 \n"
									   //"order by t.materialcode \n"
									   ;
		
		
		String getListByIdSql =  "select t.* from tb_equipmenttype t \n"+
		 						 "where t.id=? and t.isdelete=0 \n";
		
		
		if(nodeid.trim().equals("0"))
		{
			//远程排序,添加后续sql 
			//需要看sql是否有groud by
			if(sort != "" && dir != ""){
				getListByParentIdSql += "order by " + sort + " " + dir + " \n";
			}
			
			
			SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
			parentQuery.setParameter(0, nodeid);
			
			//设置分页参数
			if(pager != null){
				parentQuery.setFirstResult(pager.getStart());
				parentQuery.setMaxResults(pager.getPageSize());
			}
			returnList = parentQuery.list();
			
		}else{
			//远程排序,添加后续sql 
			//需要看sql是否有groud by
			if(sort != "" && dir != ""){
				adjustSql += "order by " + sort + " " + dir + " \n";
			}
			
			
			SQLQuery adjustquery = this.getHibernateSession().createSQLQuery(adjustSql);
			
			adjustquery.setParameter(0, nodeid);
			List<Object[]> list = adjustquery.list();
			
			String isleaf = null;
			String issheet = null;
			
			for(Object[] obj : list){
				isleaf = String.valueOf(obj[0]);
				issheet = String.valueOf(obj[1]);
			}
			
			if(null != isleaf && isleaf.trim().equals("0") && null != issheet && issheet.trim().equals("1"))//非叶子节点
			{
				//远程排序,添加后续sql 
				//需要看sql是否有groud by
				if(sort != "" && dir != ""){
					getListByParentIdSql += "order by " + sort + " " + dir + " \n";
				}
				
				
				SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
				parentQuery.setParameter(0, nodeid);
			
				//设置分页参数
				if(pager != null){
					parentQuery.setFirstResult(pager.getStart());
					parentQuery.setMaxResults(pager.getPageSize());
				}
				
				returnList = parentQuery.list();
			}else if(null != isleaf && isleaf.trim().equals("1") && null != issheet && issheet.trim().equals("0"))//叶子节点
			{
				//远程排序,添加后续sql 
				//需要看sql是否有groud by
				if(sort != "" && dir != ""){
					getListByIdSql += "order by " + sort + " " + dir + " \n";
				}
				
				
				SQLQuery Query = this.getHibernateSession().createSQLQuery(getListByIdSql);
				Query.setParameter(0, nodeid);
				
				
				//设置分页参数
				if(pager != null){
					Query.setFirstResult(pager.getStart());
					Query.setMaxResults(pager.getPageSize());
				}
				returnList = Query.list();
				
			}else if(null == isleaf || null == issheet){ //其他节点
				//远程排序,添加后续sql 
				//需要看sql是否有groud by
				if(sort != "" && dir != ""){
					getListByParentIdSql += "order by " + sort + " " + dir + " \n";
				}
				
				SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
				parentQuery.setParameter(0, nodeid);
			
				
				//设置分页参数
				if(pager != null){
					parentQuery.setFirstResult(pager.getStart());
					parentQuery.setMaxResults(pager.getPageSize());
				}
				
				returnList = parentQuery.list();
			}
		}
		
		
		return returnList;
	}
	
	/***
	 * 获取根据树节点ID获取列表信息的条数
	 * @return int
	 */
	public int getCountByNodeId(String nodeid)
	{	
		String adjustSql = "select t.isleaf,t.issheet from tb_equipmenttype t where t.id=?";
		
		String getListByParentIdSql =  "select count(*) from tb_equipmenttype t "+
									   "where t.parent_id=?";
		
		String getListByIdSql =  "select count(*) from tb_equipmenttype t "+
		 						 "where t.id=?";
		int count = 0;
		
		//点击虚拟节点
		if(nodeid.trim().equals("0"))
		{
			
			SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
			parentQuery.setParameter(0, nodeid);
			count = Integer.parseInt(parentQuery.uniqueResult().toString());
			
		}
		else
		{

			SQLQuery adjustquery = this.getHibernateSession().createSQLQuery(adjustSql);
			
			adjustquery.setParameter(0, nodeid);
			List<Object[]> list = adjustquery.list();
			
			String isleaf = null;
			String issheet = null;
			
			for(Object[] obj : list){
				isleaf = String.valueOf(obj[0]);
				issheet = String.valueOf(obj[1]);
			}
			
			if(null != isleaf && isleaf.trim().equals("0") && null != issheet && issheet.trim().equals("1"))//非叶子节点
			{
				SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
				parentQuery.setParameter(0, nodeid);
				count = Integer.parseInt(parentQuery.uniqueResult().toString());
				
			}
			else if(null != isleaf && isleaf.trim().equals("1") && null != issheet && issheet.trim().equals("0"))//叶子节点
			{
				SQLQuery Query = this.getHibernateSession().createSQLQuery(getListByIdSql);
				Query.setParameter(0, nodeid);
				count = Integer.parseInt(Query.uniqueResult().toString());
			}
			else if(null == isleaf || null == issheet)
			{
				SQLQuery parentQuery = this.getHibernateSession().createSQLQuery(getListByParentIdSql);
				parentQuery.setParameter(0, nodeid);
				count = Integer.parseInt(parentQuery.uniqueResult().toString());
			}
		
		}
		return count;
		
	}
	
	/***
	 * 根据ID获取记录集
	 * @return
	 */
	public EngineeringProjectModel getListById(String id)
	{
		SQLQuery query = this.getHibernateSession().createSQLQuery(getListByIdSql);
		return (EngineeringProjectModel) query.uniqueResult();
	}
	
	/***
	 * 根据nodeid获取node名称
	 */
	public String getNameByNodeId(String nodeid) {
		String sql = "select t.equipmentname from tb_equipmenttype t where t.id=?";
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, nodeid);
		String name = (String)query.uniqueResult();
		return name;
	}

	public int getSubChildCount(String id) {
		String sql = "select count(*) from tb_equipmenttype where parent_id=?";
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, id);
		
		int count = 0;
		if (null != query.uniqueResult()) {
			count = Integer.parseInt(query.uniqueResult().toString());
		}
		
		return count;
	}

	@Transactional
	public void deleteAllByNode(String id) throws AppException,Exception {
		//实现方法一
		/*String sql = 
			"delete from tb_equipmenttype where id in ( \n" +
			"SELECT a.id FROM tb_equipmenttype a \n" + 
			" START WITH a.id = ? \n" + 
			"CONNECT BY PRIOR  a.id=a.parent_id )";
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, id);
		int a = query.executeUpdate();
		System.out.println(a);*/
		
		//实现方法2
		Connection conn = SingleConnection.getInstance().getConnection();
		//Connection conn2 = SessionFactoryUtils.getDataSource(this.getHibernateSession().getSessionFactory()).getConnection();
		Connection conn3 = this.getHibernateSession().connection();
	    CallableStatement proc = conn.prepareCall("{ Call pkg_jt_basicData.p_update_nodeStatus(?,?,?,?,?) }"); //前5个是入参,后3个是出参
		proc.setString(1, id);
		proc.setString(2, "0");//不删除自身节点
	    proc.registerOutParameter(3,oracle.jdbc.OracleTypes.CURSOR);//输出为集合
	    proc.registerOutParameter(4,oracle.jdbc.OracleTypes.NUMBER);//返回参数1
	    proc.registerOutParameter(5,java.sql.Types.VARCHAR); //返回参数2 数据库类型varchar2
	    proc.execute();

	    //int flag = ((BigDecimal)proc.getObject(3)).intValue();//得到返回的flag,后台判断与Java判断一致
		
		//if (rs != null)rs.close();
		if (conn != null)conn.close();
		
		
	
	}
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	@Transactional
	public void updateNodestatus() throws Exception{
		
	}
	
	
	
	
	
	
	
	
	/***
	 * 生成13位随机数
	 * @return
	 */
	public String getRamdomCode() {
		String randomcode = "";
		String finalString = "";
		for (int i = 1; i <= 13; i++) {
			Random aa = new Random();
			int anum = aa.nextInt(9);
			randomcode = new Integer(anum).toString();
			finalString += randomcode;
		}
		return finalString;
	}

	
	/**
	 * 删除记录
	 */
	public int delThisModel(String engineeringContractId) throws Exception {
		/*TbUser user = userDAO.findById("admin");  
		userDAO.delete(user); */
		String sql = "DELETE FROM  TB_ENGINEERINGCONTRACT  a\n" +
					"WHERE a.engineeringcontractid = ?";

		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0,engineeringContractId);
		return query.executeUpdate();
	}


	public List<Object[]> getListByNodeId(EngineeringProjectModel model,
			String nodeid, Pager pager) {
		return null;
	}

	
	
	/**
	 * 获取查询的值
	 */
	public List<EngineeringProjectVo> getThisModel(EngineeringProjectVo vo, Pager pager) {
		//远程排序需要
		String dir = StringUtils.isBlank(vo.getDir()) ? "" : vo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(vo.getSort()) ? "" : vo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		////流程审批需要传入一个ID,返回一行结果集
		String engineeringContractId = StringUtils.isBlank(vo.getEngineeringContractId()) ? "" : vo.getEngineeringContractId();
		
		
		List<EngineeringProjectVo> returnList = new ArrayList<EngineeringProjectVo>();
		String time = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime() ;//获取前台传递过来的时间查询参数
		
		String sql = 	"SELECT\n" + 
						"a.ENGINEERINGCONTRACTID,\n" + 
						"a.CONTRACTCODE,\n" + 
						"a.CONTRACTNAME,\n" + 
						"a.TBCIVILREGISTID,\n" + 
						"a.PARTTWO,\n" + 
						"a.UNITNAME,\n" + 
						"a.WORKPERSON,\n" + 
						"a.CONTRACTMANAGERPERSON,\n" + 
						"a.SUPERIORPERSON,\n" + 
						"a.FUND,\n" + 
						"a.FUNDUNIT,\n" + 
						"a.CONTRACTLEVEL,\n" + 
						"a.APPROVALLOG,\n" + 
						"a.REMARKS,\n" + 
						"a.UPLOADFILEID,\n" + 
						"a.UPLOADFILE,\n" + 
						"decode(a.status,'1','编制中','2','审批中','3','已审批','error'),\n" + 
						"a.YMD,  \n" +
						"b.projectnum,  \n"+
						"b.projectname \n"+
						"FROM TB_ENGINEERINGCONTRACT a , TB_CIVILREGIST b \n"+
						"WHERE 1=1 \n" +
						"AND a.tbcivilregistid = b.id \n"+
						"AND b.approvalstate = '7' \n" +
						//新增对 工程项目实施计划 表的 已下发状态的约束
					    "AND EXISTS (SELECT 1 FROM  TB_ENGINEERINGPLANDETAILS c \n" + 
					    "WHERE c.civilregistid = a.tbcivilregistid \n" +
					    "AND c.status = '已下发') \n";

		if(time.equals("0")){
			//时间为空时,不带入默认的今天的时间参数
			//String timeSql =  "AND YMD = '"+EngineeringProjectDaoImpl.getNowYMD()+ "' \n";
			//sql += timeSql;
		}else if(time.equals("") == false && time.equals("0") == false){
			String timeSql =  "AND SUBSTR(b.approvaltime,1,4) = '"+time+ "' \n";
			sql += timeSql;
		}
		
		
		//审批需要添加的 Id 单条查询
		if(engineeringContractId != "" && engineeringContractId != "null" && engineeringContractId != null){
			sql += "AND a.engineeringcontractid = '"+engineeringContractId+"' \n";
		}
		
		
		//System.out.println(sql);
		//判断1 判断4个条件在标准表里面是否存在
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		//添加翻页
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for(Object[] obj : list){
				EngineeringProjectVo thisVo = new EngineeringProjectVo();
				
				thisVo.setEngineeringContractId(String.valueOf(obj[0]));
				thisVo.setContractCode(String.valueOf(obj[1]));
				thisVo.setContractName(String.valueOf(obj[2]));
				thisVo.setTbCivilregistId(String.valueOf(obj[3]));
				thisVo.setPartTwo(String.valueOf(obj[4]));
				thisVo.setUnitName(String.valueOf(obj[5]));
				thisVo.setWorkPerson(String.valueOf(obj[6]));
				thisVo.setContractManagerPerson(String.valueOf(obj[7]));
				thisVo.setSuperiorPerson(String.valueOf(obj[8]));
				thisVo.setFund(String.valueOf(obj[9]));
				thisVo.setFundUnit(String.valueOf(obj[10]));
				thisVo.setContractLevel(String.valueOf(obj[11]));
				thisVo.setApprovalLog(String.valueOf(obj[12]));
				thisVo.setRemarks(String.valueOf(obj[13]));
				thisVo.setUploadFileId(String.valueOf(obj[14]));
				thisVo.setUploadFile(String.valueOf(obj[15]));
				thisVo.setStatus(String.valueOf(obj[16]));
				thisVo.setYmd(String.valueOf(obj[17]));
				thisVo.setProjectCode(String.valueOf(obj[18]));//项目编号
				thisVo.setProjectName(String.valueOf(obj[19]));//项目名称
				returnList.add(thisVo);
			}
		}
		return returnList;
		
		
		
		
	}

	public List<EngineeringProjectVo> searchThisModel(String materialCode,
			String name, String designation, String standard,
			String techniccondition, Pager pager, EngineeringProjectVo vo) {
		// TODO Auto-generated method stub
		return null;
	}
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<EngineeringProjectVo> getProjectByGroup(EngineeringProjectVo vo,Pager pager){
		List<EngineeringProjectVo> returnList = new ArrayList<EngineeringProjectVo>();
		//String time = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime() ;//获取前台传递过来的时间查询参数
		String fuzzyQueryString = StringUtils.isBlank(vo.getFuzzyQueryString()) ? "" : vo.getFuzzyQueryString();
		
		String sql   =  "SELECT\n" +
						"a.id,\n" + 
						"a.projectnum,\n" + 
						"a.projectname \n" +
						"FROM TB_CIVILREGIST a\n" + 
						"WHERE 1=1\n" + 
						"AND a.approvalstate = '7' \n";
		
		
		if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			sql += "AND (a.projectnum LIKE '%"+fuzzyQueryString+"%' OR a.projectname LIKE '%"+fuzzyQueryString+"%') \n";
		}
		
		
		
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for(Object[] obj : list){
				EngineeringProjectVo thisVo = new EngineeringProjectVo();
				
				thisVo.setEngineeringContractId(String.valueOf(obj[0]));//id
				thisVo.setProjectCode(String.valueOf(obj[1]));//项目编号
				thisVo.setProjectName(String.valueOf(obj[2]));//项目名称
				returnList.add(thisVo);
			}
		}
		return returnList;
		
	}
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag){
		try {
			/*String hql = "update CivilRepair t " +
					"set t.approvalstate = '"+flag+"' " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();*/
			String sql = "UPDATE TB_ENGINEERINGCONTRACT a \n"+
						 "SET a.status = ? \n"+
						 "WHERE a.engineeringcontractid = ? \n";
			SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
			query.setParameter(0, flag);
			query.setParameter(1, id);
			query.executeUpdate();
			log.info("修改TB_ENGINEERINGCONTRACT表的审批状态为2(审批中)---成功!");
		} catch (Exception e) {
			log.info("修改TB_ENGINEERINGCONTRACT表的审批状态为2(审批中)---失败!");
			e.printStackTrace();
		}
	}
	
	
	
	
	/**
	 * 获取当前年月日
	 */
	public static String getNowYMD(){
		Calendar now = Calendar.getInstance();
		/*
        System.out.println("年: " + now.get(Calendar.YEAR));  
        System.out.println("月: " + (now.get(Calendar.MONTH) + 1) + "");  
        System.out.println("日: " + now.get(Calendar.DAY_OF_MONTH));  
        System.out.println("时: " + now.get(Calendar.HOUR_OF_DAY));  
        System.out.println("分: " + now.get(Calendar.MINUTE));  
        System.out.println("秒: " + now.get(Calendar.SECOND));  
        System.out.println("当前时间毫秒数：" + now.getTimeInMillis());
        System.out.println(now.getTime());
        */
		String year = now.get(Calendar.YEAR)+"";
        String month = now.get(Calendar.MONTH) + 1 + "" ;
        if(Integer.valueOf(month) < 10){
        	month = "0".concat(month);
        }
        String day = String.valueOf(now.get(Calendar.DAY_OF_MONTH));
        if(Integer.valueOf(day) < 10){
        	day = "0".concat(day);
        }
        return year+"-"+month+"-"+day;
	}
	
	
	/**
	 * 生成大写 UUID
	 */
	public static String getUUID() {
		UUID uuid = UUID.randomUUID();
		String UUID = uuid.toString();
	    return UUID.toUpperCase();
	}
}
