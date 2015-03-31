package com.sysware.customize.hd.investment.civilService;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang.StringUtils;
import org.hibernate.NonUniqueResultException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.jdbc.SingleConnection;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.engineeringProject.implementPlan.EngineeringProjectPlanVo;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;
import com.sysware.customize.hd.investment.exception.NoIsMicroSoftExcelException;



@Name("civilService_CivilService_DaoImpl")
@SuppressWarnings({"unused","unchecked","deprecation"})
public class CivilService_DaoImpl implements CivilService_Dao{
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<CivilServiceModel> CivilService_Dao;
	
	
	private static final String selectAllSql = "select * from tb_equipmenttype where ISDELETE=0";
	private static final String sql = "select * from tb_equipmenttype t where t.ISDELETE=0 and t.parent_id='0' order by t.ID asc";
	private static final String countSql = "select count(*) from tb_equipmenttype t where t.ISDELETE=0 and t.parent_id='0' order by t.ID asc";
	private static final String delSql = "delete from  TB_EQUIPMENTTYPE  where ID=?";
	private static final String searchHql = "from EquipreServiceModel where equipmentname like :name and isDelete=0";
	private static final String searchCountHql = "select count(*) from EquipreServiceModel where equipmentname like :name and ISDELETE=0";
	private static String getTreeNodes = "select ID,EQUIPMENTNAME,DESIGNTION,ISSHEET,ISLEAF,STANDARD,TECHNICCONDITION from TB_EQUIPMENTTYPE where PARENT_ID=? and ISDELETE=0 order by EQUIPMENTNAME";
	private static String getTreeNodes1 = "select ID,EQUIPMENTNAME,DESIGNTION,ISSHEET,ISLEAF,STANDARD,TECHNICCONDITION from TB_EQUIPMENTTYPE where PARENT_ID=? and ISDELETE=0 and EQUIPMENTNAME!='外协件' order by EQUIPMENTNAME";
	private static String updateIsLeafSql = "update tb_equipmenttype set ISLEAF=0 where ID=?";
	private static String getListByIdSql = "select * from TB_EQUIPMENTTYPE where ID=?";
	private static String getIdByFileNameSql = "from EquipreServiceModel where equipmentname=? and isLeaf=0";
	
	
	
	
	
	
	
	//获取物料种类列表
	public List<Object[]> getWlzl(CivilServiceVo vo,Pager pager) {
		//远程排序需要
		String dir = StringUtils.isBlank(vo.getDir()) ? "" : vo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(vo.getSort()) ? "" : vo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		//远程排序,添加后续sql 
		//需要看sql是否有groud by
		String thissql = sql;
		if(sort != "" && dir != ""){
			thissql += "order by " + sort + " " + dir + " \n";
		}
		
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(thissql);
		//SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		
		
		//2011/8/15 13:23添加翻页
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		return query.list();
	}
	
	//获取物料种类表数据总条数
	public int getWlzlCount(CivilServiceVo vo) {
		//远程排序需要
		String dir = StringUtils.isBlank(vo.getDir()) ? "" : vo.getDir() ;  //"ASC"或"DESC" 
		String sort = StringUtils.isBlank(vo.getSort()) ? "" : vo.getSort() ;  // 前台JS对应的 dataIndex:'materialCode'
		
		
		//远程排序,添加后续sql 
		//需要看sql是否有groud by
		String thissql = countSql;
		if(sort != "" && dir != ""){
			thissql += "order by " + sort + " " + dir + " \n";
		}
		
		
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(thissql);
		//SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(countSql);

		if (null == query || null == query.uniqueResult()) {
			return Integer.parseInt("0");
		} else {
			return Integer.parseInt(query.uniqueResult().toString());
		}
		
	}
	
	//添加物料种类
	@Transactional
	public String addThisModel(CivilServiceModel model) throws AppException {
		String sql = "";
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(selectAllSql);
		
		List list = new ArrayList();
		list = query.list();
		//String nodeid = model.getParentId();
		if (list.size() == 0){// 无记录
			CivilService_Dao.save(model);
		}else{//如果有记录
			//SQLQuery query1 = CivilService_Dao.getHibernateSession().createSQLQuery(selectMaxNumbersSql);
			//int i = ((BigDecimal)query1.uniqueResult()).intValue();
			//model.setRowNumbers(i+1);
			//model.setAccounttbname("TB_EQUIP_"+String.valueOf(i+1)+"_ACCOUNT");
			
			//把填入的名字写入牌号，把上级节点对应的名字填入器材名称
			
			
			String getenameSql = "select * from tb_equipmenttype where ID=?";
			SQLQuery query2 = CivilService_Dao.getHibernateSession().createSQLQuery(getenameSql);
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
			CivilService_Dao.save(model);
			
		}
		
		//更新 当前所选节点为非叶子节点
		//SQLQuery updateLeafQuery = CivilService_Dao.getHibernateSession().createSQLQuery(this.updateIsLeafSql);
		SQLQuery updateLeafQuery = CivilService_Dao.getHibernateSession().createSQLQuery(" update tb_equipmenttype set ISLEAF=0,ISSHEET=1 where ID=? ");
		//updateLeafQuery.setParameter(0, nodeid);
		updateLeafQuery.setParameter(0, "");
		updateLeafQuery.executeUpdate();
		
		
		//更新当前所选节点为sheet
		/*SQLQuery updateSheetQuery = CivilService_Dao.getHibernateSession().createSQLQuery("update tb_equipmenttype set ISLEAF=0,ISSHEET=1 where id=?");
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
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(delwlzlSql);
		query.setParameter(0, id);
		query.setParameter(1, id);
		query.executeUpdate();*/
		
		
		
		
		
		Connection conn = SingleConnection.getInstance().getConnection();
		//Connection conn2 = SessionFactoryUtils.getDataSource(CivilService_Dao.getHibernateSession().getSessionFactory()).getConnection();
		Connection conn3 = CivilService_Dao.getHibernateSession().connection();
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
	
	//修改物料种类
	@Transactional
	public String updateThisModel(CivilServiceModel model)  throws Exception {
		String returnString  = "1";
		String id =  StringUtils.isBlank(model.getId()) ? "" : model.getId() ;
		String repairStartTime = StringUtils.isBlank(model.getRepairStartTime()) ? "" : model.getRepairStartTime() ;
		String repairAcceptanceTime = StringUtils.isBlank(model.getRepairAcceptanceTime()) ? "" : model.getRepairAcceptanceTime();
		String repairDutyUnit = StringUtils.isBlank(model.getRepairDutyUnit()) ? "" : model.getRepairDutyUnit() ;
		String remarks = StringUtils.isBlank(model.getRemark()) ? "" : model.getRemark() ;
		String updateFlag = StringUtils.isBlank(model.getUpdateFlag()) ? "" : model.getUpdateFlag() ;
		
		
		String sql = ""; 
		if(id.equals("")){
			returnString = "0";
		}else{
			//只传参数1
			if(updateFlag.equals("1")){
				sql = "UPDATE TB_CIVILREPAIR a\n" +
				  "SET a.repairstarttime = ?\n" + 
				  "WHERE a.id = ?";
				SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
				query.setParameter(0, repairStartTime);
				query.setParameter(1, id);
				int flag = query.executeUpdate();
				if(flag == 1){
					returnString = "1";
				}else{
					returnString = "0";
				}
			}else if(updateFlag.equals("2")){
				sql = "UPDATE TB_CIVILREPAIR a\n" +
				  "SET a.repairacceptancetime = ?\n" + 
				  "WHERE a.id = ?";
				SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
				query.setParameter(0, repairAcceptanceTime);
				query.setParameter(1, id);
				int flag = query.executeUpdate();
				if(flag == 1){
					returnString = "1";
				}else{
					returnString = "0";
				}
			}else if(updateFlag.equals("3")){
				sql = "UPDATE TB_CIVILREPAIR a\n" +
				  "SET a.repairdutyunit = ?\n" + 
				  "WHERE a.id = ?";
				SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
				query.setParameter(0, repairDutyUnit);
				query.setParameter(1, id);
				int flag = query.executeUpdate();
				if(flag == 1){
					returnString = "1";
				}else{
					returnString = "0";
				}
			}else if(updateFlag.equals("4")){
				sql = "UPDATE TB_CIVILREPAIR a\n" +
				  "SET a.remark = ?\n" + 
				  "WHERE a.id = ?";
				SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
				query.setParameter(0, remarks);
				query.setParameter(1, id);
				int flag = query.executeUpdate();
				if(flag == 1){
					returnString = "1";
				}else{
					returnString = "0";
				}
			}else{
				//为空默认空走
				returnString = "1";
			}
		}
		return returnString;
		
	}
	
	
	/***
	 * 根据物料名称查询
	 */
	public List<CivilServiceVo> searchWlzl(String materialCode,String name,String designation,String standard,String techniccondition, Pager pager,CivilServiceVo inputvo) {
		List<CivilServiceVo> returnList = new ArrayList<CivilServiceVo>();
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
		Query query2 = CivilService_Dao.getHibernateSession().createSQLQuery(searchSql);
        int count = query2.list().size();
		pager.setRecordCount(count);//查询后直接复制pager的属性 remote可以直接取
		
		
		//查询出需要翻页的结果集
		Query query = CivilService_Dao.getHibernateSession().createSQLQuery(searchSql);
		if(null != pager){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		
		
		List<Object[]> list = query.list();
		
		for(Object[] obj : list)
		{
			CivilServiceVo vo = new CivilServiceVo();
			
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
		Query query = CivilService_Dao.getHibernateSession().createQuery(searchCountHql);
		query.setString("name", "%"+name+"%");
		int count = ((Long)query.uniqueResult()).intValue();
		return count;
	}
	
	/**
	 * 导入文件文件名存库
	 * @param ename
	 */
	@Transactional
	public Object[] fileNameSaveDb(CivilServiceModel model)  throws Exception{
		Object[] returnArrayObject = new Object[2];
		//String ename = model.getEquipmentname();
		//String inputParentId = model.getParentId();
		int flag;//标志位 是否执行成功
		CivilServiceModel returntm = null;
		//model.setIsDelete(0);
		
		

		
		String sql = "select * from Tb_Equipmenttype where equipmentname=? and parent_id=? \n";
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		/*query.setParameter(0, ename);
		query.setParameter(1, inputParentId);*/
		query.setParameter(0, "");
		query.setParameter(1, "");
		try{
			//returntm = (EquipreServiceModel)query.uniqueResult();
			Object returnObj = query.uniqueResult();
			if (returnObj != null) {//系统已经有值了,就更新节点isLeaf isSheet状态
				
				String sql2 = "update Tb_Equipmenttype set ISLEAF=0,ISSHEET=1 where EQUIPMENTNAME=? and parent_id=? and rownum = 1  \n";
				SQLQuery query2 = CivilService_Dao.getHibernateSession().createSQLQuery(sql2);
				/*query2.setParameter(0, ename);
				query2.setParameter(1, inputParentId);*/
				query2.setParameter(0, "");
				query2.setParameter(1, "");
				query2.executeUpdate();//直接执行,返回值不做处理
				
				//取值
				String sql3 = "select * from tb_equipmenttype where EQUIPMENTNAME=? and parent_id=? and rownum = 1  \n";
				SQLQuery query3 = CivilService_Dao.getHibernateSession().createSQLQuery(sql3);
				/*query3.setParameter(0, ename);
				query3.setParameter(1, inputParentId);*/
				query3.setParameter(0, "");
				query3.setParameter(1, "");
				
				List<Object[]> returnList = query3.list();
				Object[] result = returnList.get(0);//第一行数据
				if(returnList.size()>0){
					CivilServiceModel newTb = new CivilServiceModel();
					newTb.setId(String.valueOf(result[0]));//第一个数据为id ,如果后续需要其他数据可以添加
					returnArrayObject[0] = newTb;//需要返回的对象1
				}else{
					returnArrayObject[0] = null;
				}
				flag = 0;
				returnArrayObject[1] = flag ;//需要返回的对象2
			} else {//如果没有值就返回一个null
				//model.setIsSheet(1);//是Sheet节点
				CivilService_Dao.save(model);
				flag = 1;
				returnArrayObject[0] = model;//需要返回的对象1
				returnArrayObject[1] = flag;//需要返回的对象2
			}
		}catch(NonUniqueResultException e){//如果是多条记录就抛NonUniqueResultException异常
			flag = 0;
			e.printStackTrace();
		}finally{
			
		}
		
		
		//更新上层节点的节点状态 isLeaf 和 isSheet
		/*
		if(inputParentId.equals("0") == false){//如果不是根节点,就更新上层节点的状态
			String sql2 = "update TB_EQUIPMENTTYPE \n"+
			       "set isleaf = 0 ,issheet =1 \n"+
			       "where id = ?  \n";
			SQLQuery query2 = CivilService_Dao.getHibernateSession().createSQLQuery(sql2);
			query2.setParameter(0, inputParentId);
			query2.executeUpdate();
		}
		*/
		return returnArrayObject;
		
	}
	
	/**
	 * 根据文件名称获取导入文件的ID
	 * @param ename
	 * @return String
	 */
	public String findIdByName(String ename){
		String id = ""; //tb_equipmenttype 表 id
		
		String sql = "from EquipreServiceModel where equipmentname=?  and isLeaf=0";
		Query query = CivilService_Dao.getHibernateSession().createQuery(sql);
		query.setParameter(0, ename);
		try{
			CivilServiceModel model = (CivilServiceModel)query.uniqueResult();
			id = model.getId();
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
		//Query query =CivilService_Dao.getHibernateSession().createQuery(getIdByFileNameSql);
		SQLQuery query  = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
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
	 * 导入sheet名存库
	 * @param ename
	 */
	@Transactional
	public Object[] sheetNameSaveDb(CivilServiceModel model)  throws Exception{
		String sql = 
			"update tb_equipmenttype a\n" +
			"set a.isleaf = 0,a.issheet = 1\n" + 
			"where a.id = ?";
		//String ename = model.getEquipmentname();
		//String parentId = model.getParentId();
		int flag = 0;
		//String tb_equipmenttype_id = "";
		Object[] returnArrayObject = new Object[2];
		
		
		
		//model.setIsDelete(0);
		//model.setIsLeaf(0);
		//model.setIsSheet(1);//是sheet
		
		//Query query = CivilService_Dao.getHibernateSession().createQuery(getIdByFileNameSql);		
		Query query = CivilService_Dao.getHibernateSession().createQuery("from EquipreServiceModel where equipmentname=? and parent_id=? and rownum = 1 \n");
		/*query.setParameter(0, ename);
		query.setParameter(1, parentId);*/
		query.setParameter(0, "");
		query.setParameter(1, "");
		try{
			CivilServiceModel returntm = (CivilServiceModel)query.uniqueResult();
			if (null != returntm) {
				flag = 0;//Sheet节点已经存在
				//tb_equipmenttype_id = returntm.getId();//获得已经存在的Sheet节点的ID
				CivilServiceModel newTm = new CivilServiceModel();
				//newTm.setId(tb_equipmenttype_id);
				returnArrayObject[0] = newTm;//需要返回的参数1
				returnArrayObject[1] = flag;//需要返回的参数2
				
				//更新本层节点状态为Sheet 可能下层叶子节点连接
				SQLQuery query2 = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
				//query2.setParameter(0, tb_equipmenttype_id);
				query2.setParameter(0, "");
				query2.executeUpdate();
			} else {
				CivilService_Dao.save(model);
				flag = 1;
				
				returnArrayObject[0] = model;//需要返回的参数1
				returnArrayObject[1] = flag;//需要返回的参数2
			}
		}catch (NonUniqueResultException e){
			flag = 0; //有多个值不需要操作
			e.printStackTrace();
			//System.out.println("sheetNameSaveDb error");
		}finally{
			
		}
		
		return returnArrayObject;
	
	}
	
	/**
	 * 导入excel文件内容入库
	 * @param ename
	 */
	@Transactional
	//public int excelContentsSaveDb(EquipreServiceModel model) throws Exception {
	public CivilServiceModel excelContentsSaveDb(CivilServiceModel model) throws Exception {
		
		CivilServiceModel returnVo = new CivilServiceModel();//要返回给
		int flag = 0;
		Connection conn = null;
		Connection conn3 = null;
		ResultSet rs = null;
		try {

			conn = SingleConnection.getInstance().getConnection();
			// Connection conn2 =
			// SessionFactoryUtils.getDataSource(CivilService_Dao.getHibernateSession().getSessionFactory()).getConnection();
			conn3 = CivilService_Dao.getHibernateSession().connection();
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
				
				//2011/11/10 新加  如果有一条或多条数据 需要判断Excel的集团代码,如果有就更新,如果没有不做操作,返回空对象  ----------开始
				/*if(model.getCliqueCode().trim().equals("") != true && model.getCliqueCode() != null){
					String sqlUpdate =  "update  tb_equipmenttype a \n" +
										"set a.cliquecode = ?\n" + 
										"where a.equipmentname = ?\n" //equipmentname必须有,如果没有service已经过滤,不会到这个dao
										;
					if(model.getDesigntion().equals("") == false){//1
						sqlUpdate += "and a.designtion = '"+model.getDesigntion()+"' \n" ;
					}
					if(model.getStandard().equals("") == false){//2
						sqlUpdate += "and a.standard = '"+model.getStandard()+"' \n" ;
					}
					if(model.getTechniccondition().equals("") == false){//3
						sqlUpdate += "and a.techniccondition = '"+model.getTechniccondition()+"' \n" ;
					}
					//System.out.println(sqlUpdate);
					SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sqlUpdate);
					query.setParameter(0, model.getCliqueCode());
					query.setParameter(1, model.getEquipmentname());
					query.executeUpdate();
				}*/
				//2011/11/10 新加  如果有一条或多条数据 需要判断Excel的集团代码,如果有就更新,如果没有不做操作,返回空对象  ----------结束
			} else if (flag == 1) {//如果后台表没有此数据就写入
				//model.setIsSheet(0);// 是叶子节点
				// 保存mode
				CivilService_Dao.save(model); // 不知道id序列生成规则,必须用框架平台的方法保存model
				returnVo = (CivilServiceModel)model.clone();
			}



		} catch (Exception e) {
			e.printStackTrace();
		} finally { //添加finally关闭打开的链接节省资源
			if (rs != null)rs.close();
			if (conn != null)conn.close();
		}
		return returnVo;
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
			
			SQLQuery parentQuery = CivilService_Dao.getHibernateSession().createSQLQuery(getListByParentIdSql);
			parentQuery.setParameter(0, nodeid);
			count = Integer.parseInt(parentQuery.uniqueResult().toString());
			
		}
		else
		{

			SQLQuery adjustquery = CivilService_Dao.getHibernateSession().createSQLQuery(adjustSql);
			
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
				SQLQuery parentQuery = CivilService_Dao.getHibernateSession().createSQLQuery(getListByParentIdSql);
				parentQuery.setParameter(0, nodeid);
				count = Integer.parseInt(parentQuery.uniqueResult().toString());
				
			}
			else if(null != isleaf && isleaf.trim().equals("1") && null != issheet && issheet.trim().equals("0"))//叶子节点
			{
				SQLQuery Query = CivilService_Dao.getHibernateSession().createSQLQuery(getListByIdSql);
				Query.setParameter(0, nodeid);
				count = Integer.parseInt(Query.uniqueResult().toString());
			}
			else if(null == isleaf || null == issheet)
			{
				SQLQuery parentQuery = CivilService_Dao.getHibernateSession().createSQLQuery(getListByParentIdSql);
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
	public CivilServiceModel getListById(String id)
	{
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(getListByIdSql);
		return (CivilServiceModel) query.uniqueResult();
	}
	
	/***
	 * 根据nodeid获取node名称
	 */
	public String getNameByNodeId(String nodeid) {
		String sql = "select t.equipmentname from tb_equipmenttype t where t.id=?";
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, nodeid);
		String name = (String)query.uniqueResult();
		return name;
	}

	public int getSubChildCount(String id) {
		String sql = "select count(*) from tb_equipmenttype where parent_id=?";
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
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
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, id);
		int a = query.executeUpdate();
		System.out.println(a);*/
		
		//实现方法2
		Connection conn = SingleConnection.getInstance().getConnection();
		//Connection conn2 = SessionFactoryUtils.getDataSource(CivilService_Dao.getHibernateSession().getSessionFactory()).getConnection();
		Connection conn3 = CivilService_Dao.getHibernateSession().connection();
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
		
		/* 原方法
		String sql = "SELECT a.id FROM tb_equipmenttype a CONNECT BY　PRIOR  a.id=a.parent_id  START WITH   a.id = ?";
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, id);
		
		List<Object[]> list = query.list();
		
		if (list.size() > 0) {
			for (Object obj : list) {
				String wlzlid = obj.toString();

				// 删除本节点wlzl表内容
				String delwlzlSql = "delete from tb_equipmenttype where ID=?";
				SQLQuery query1 = CivilService_Dao.getHibernateSession().createSQLQuery(delwlzlSql);
				query1.setParameter(0, wlzlid);
				query1.executeUpdate();

			}
		}*/
		
	
	}
	
	
	/**
	 * 更新节点的状态(是否是叶子节点)
	 * @throws Exception
	 */
	@Transactional
	public void updateNodestatus() throws Exception{
		/*Connection conn = SingleConnection.getInstance().getConnection();
        //Connection conn2 = SessionFactoryUtils.getDataSource(CivilService_Dao.getHibernateSession().getSessionFactory()).getConnection();
	    Connection conn3 = CivilService_Dao.getHibernateSession().connection();
	    CallableStatement proc = conn.prepareCall("{ Call pkg_jt_basicData.p_update_nodeStatus(?,?,?) }");
		proc.registerOutParameter(1,oracle.jdbc.OracleTypes.CURSOR);//输出为集合
		proc.registerOutParameter(2,oracle.jdbc.OracleTypes.NUMBER);//返回参数1
		proc.registerOutParameter(3,java.sql.Types.VARCHAR); //返回参数2 数据库类型varchar2
		proc.execute();*/
	}
	
	
	
	
	

	
	
	
	
	/**
	 * 更新后台表 主供应商、副供应商1、供应商2的id  不需要返回
	 */
	public void updateProvidersStatus(){
		try {
			Connection conn = SingleConnection.getInstance().getConnection();
		    //Connection conn2 = SessionFactoryUtils.getDataSource(CivilService_Dao.getHibernateSession().getSessionFactory()).getConnection();
		    Connection conn3 = CivilService_Dao.getHibernateSession().connection();
		    CallableStatement proc = conn.prepareCall("{ Call pkg_jt_basicData.p_update_providersStatus }"); //前5 个是入参,后3个是出参
		    proc.execute();
	
		    //关闭连接,如果有的话
		    //if(rs != null)rs.close();
	
		    if(conn!=null)conn.close();
	    } catch (SQLException e) {
	    	e.printStackTrace();
	    	System.out.println("执行存储过程异常,检查程序调用以及网络.");
	    }
	    
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

	public void delThisModel(String id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	public int getCount(CivilServiceVo vo) {
		// TODO Auto-generated method stub
		return 0;
	}

	public List<Object[]> getListByNodeId(CivilServiceModel model,
			String nodeid, Pager pager) {
		// TODO Auto-generated method stub
		return null;
	}

	public int getSeachCount(String name) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
	/**
	 * 获取查询的值
	 */
	public List<CivilServiceVo> getThisModel(CivilServiceVo vo, Pager pager) {
		/*String sql = "TB_EQUIPREPAIR";
		EquipreServiceVo vo1 = new EquipreServiceVo();
		vo1.setId("6546546456");
		vo1.setServiceEquipmentName("1111");
		vo1.setServiceEquipmentModel("111");
		vo1.setEquipmentAssetsNumber("11");
		vo1.setEquipmentInstallFactory("发到手机费灰棘束带");
		vo1.setTaskNumber("1111");
		vo1.setEquipmentProduceFactory("圣诞节方式");
		vo1.setEquipmentFactoryDate("20121212");
		vo1.setAfterSaleServiceContact("张三");
		vo1.setAfterSaleServicePhone("110");
		vo1.setLastServiceDate("20111009");
		vo1.setServiceCost("闪电箭");
		vo1.setUnit("大幅度");
		vo1.setServiceStartTime("2012-03-08");
		vo1.setServiceInspectionTime("2008-08-08");
		vo1.setServiceDutyUnit("XXXX单位");
		vo1.setRemarks("sadasada");
		list.add(vo1);*/
		
		List<CivilServiceVo> returnList = new ArrayList<CivilServiceVo>();
		String time = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime() ;//获取前台传递过来的时间查询参数
		String fuzzyQueryString = StringUtils.isBlank(vo.getTime()) ? "" : vo.getTime();
		//查询结果集可能需要修改,暂时就这样
		String sql  =  
			"SELECT\n" +
			"a.id,\n" + 
			"a.repairproject,\n" + 
			"a.plancost,\n" + 
			"a.costunit,\n" + 
			"a.annualinvestment,\n" + 
			"a.repairarea,\n" + 
			"a.areaunit,\n" + 
			"a.useunit,\n" + 
			"a.repaircontent ,\n"+
			"a.repairstarttime,\n" + 
			"a.repairacceptancetime,\n" + 
			"DECODE(a.repairdutyunit,NULL,'0','null','0',a.repairdutyunit),\n" + 
			"a.remark\n" + 
			"FROM TB_CIVILREPAIR a\n" + 
			"WHERE a.approvalstate = '5'";


		if(fuzzyQueryString != "" && fuzzyQueryString != "null" && fuzzyQueryString != null){
			//时间格式有待确定 ,这里默认先去掉  后台表TB_CIVILREPAIR还没有时间要确认
			//sql += "AND a.createtime = '"+fuzzyQueryString+"' \n";
		}
		if(time.equals("0")){
			//时间为空时,不带入默认的今天的时间参数
			//String timeSql =  "AND YMD = '"+EngineeringProjectDaoImpl.getNowYMD()+ "' \n";
			//sql += timeSql;
		}else if(time.equals("") == false && time.equals("0") == false){
			String timeSql =  "AND substr(a.repairstarttime,1,4) = '"+time+ "' \n";
			sql += timeSql;
		}
		
		
		SQLQuery query = CivilService_Dao.getHibernateSession().createSQLQuery(sql);
		int listSize = query.list().size();//翻页前,总数
		pager.setRecordCount(listSize);//保存总数
		if(pager != null){
			query.setFirstResult(pager.getStart());
			query.setMaxResults(pager.getPageSize());
		}
		listSize = query.list().size();//翻页后的数据条数
		
		if(listSize > 0 ){
			List<Object[]> list = query.list();
			for (Object[] obj : list) {
				CivilServiceVo thisVo = new CivilServiceVo();
				
				thisVo.setId(String.valueOf(obj[0]));
				thisVo.setRepairProject(String.valueOf(obj[1]));
				thisVo.setPlanCost(String.valueOf(obj[2]));
				thisVo.setCostUnit(String.valueOf(obj[3]));
				thisVo.setAnnualInvestment(String.valueOf(obj[4]));
				thisVo.setRepairArea(String.valueOf(obj[5]));
				thisVo.setAreaUnit(String.valueOf(obj[6]));
				thisVo.setUseUnit(String.valueOf(obj[7]));
				thisVo.setRepairContent(String.valueOf(obj[8]));
				thisVo.setRepairStartTime(String.valueOf(obj[9]));
				thisVo.setRepairAcceptanceTime(String.valueOf(obj[10]));
				thisVo.setRepairDutyUnit(String.valueOf(obj[11]));
				thisVo.setRemark(String.valueOf(obj[12]));
				
				returnList.add(thisVo);
			}
		}
		return returnList;
	}

	public List<CivilServiceVo> searchThisModel(String materialCode,
			String name, String designation, String standard,
			String techniccondition, Pager pager, CivilServiceVo vo) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
