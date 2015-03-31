package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.opensymphony.oscache.util.StringUtil;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("declare_DeclareDaoImpl")
public class DeclareDaoImpl extends GenericDAOImpl<Declare> implements DeclareDao {

	@In(create = true)
	Identity identity; 
	public List<Declare> getByExample(Declare example,int start,int limit,String type) {
		 String orderName = " obj.declareId desc ";
		 if(example.getSort()!=null && !"".equals(example.getSort()) && example.getDir()!=null && !"".equals(example.getDir()))
			 orderName = " obj."+example.getSort() + " "+example.getDir();
		 return this.find(getAddSql(example,type)+" order by  "+orderName, null,start, limit);
	}

	public long countByExample(Declare example,String type) {
		
		StringBuffer sql = new StringBuffer("select count(*) from Declare obj where "); 
		Object count = this.createQuery(sql.toString()+getAddSql(example,type)).getSingleResult(); 
		if(count!=null)
			return Long.parseLong(String.valueOf(count));
		else
			return 0;
	}
	
	/**
	 * 按照查询条件拼接字符串
	 */
	private String getAddSql(Declare example,String type){
		StringBuffer sql = new StringBuffer();
		if(example.getDeclareCode()!=null && !example.getDeclareCode().equals("")){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" obj.declareCode like '%"+example.getDeclareCode()+"%'");
		}
		if(example.getDepartmentId()!=null && !"".equals(example.getDepartmentId())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" obj.departmentId In (select depcode from Department where departmetname like '%").append(example.getDepartmentId()).append("%' )");
		}
		if(example.getDeclareDate()!=null && !"".equals(example.getDeclareDate())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" to_char(obj.declareDate,'yyyy-mm') = '").append(new SimpleDateFormat("yyyy-MM-dd").format(example.getDeclareDate()).substring(0,7)).append("'");
		}
		if(example.getEditor()!=null && !"".equals(example.getEditor())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" obj.editor IN (select userid from Guser where truename like '%").append(example.getEditor()).append("%' )");
		}
		if(example.getStatus()!=null && !"".equals(example.getStatus())){
			if(sql.length()>0)
				sql.append(" and ");
			sql.append(" obj.status = '").append(example.getStatus()).append("'");
		}
		if(type!=null && type.equals("2"))
		{
			if(sql.length()>0)
				sql.append(" and ");
			sql.append("  obj.declareId in (select obj1.declareId from DeclareDetail obj1 where  obj1.declareDetailStatus = 2) ");
		}else if(type!=null && type.equals("1") && sql.length() ==0){
				sql.append(" 1=1  ");
		} 
		if(isNotLeader()){
			sql.append(" and obj.editor='"+identity.getLoginUser().getUserid()+"' ");		
		}else{
			if(example.getEditor()!=null && !"".equals(example.getEditor())){
				if(sql.length()>0)
					sql.append(" and ");
				sql.append(" obj.editor IN (select userid from Guser where truename like '%").append(example.getEditor()).append("%' )");
			}
		}
		sql.append(" and obj.generator is null");
		return sql.toString();
	}

	public String getSumByAmount(String id) {

		StringBuffer sql = new StringBuffer("select sum(obj.amount) from DeclareDetail obj where obj.declareId='"+id+"'"); 
		Object count = this.createQuery(sql.toString()).getSingleResult(); 
		if(count!=null)
			return String.valueOf(count);
		else
			return "0";
	}

	public Double getAmoutByType(String id) {
		StringBuffer sql = new StringBuffer("select sum(obj.amount) from DeclareDetail obj where obj.declareId='"+id+"' and obj.declareDetailStatus = '2' "); 
		Object count = this.createQuery(sql.toString()).getSingleResult(); 
		if(count!=null)
			return new Double(count.toString());
		else
			return  new Double("0");
	}

	public JSONObject getComboBoxDataForDeclare(DeclareVo declareVo) {
		// {declare : [{text : "t1" , value : "v1" } , {text : "t2" , value : "v2" }]}
		String sql="select distinct d.declare_id,d.declare_date from t_declare d ";
		List<Object[]> list=this.getHibernateSession().createSQLQuery(sql).list();
		JSONObject jo=new JSONObject();
		JSONArray ja=new JSONArray();
		for(Object[] obj:list){
			JSONObject json=new JSONObject();
			json.put("text", obj[1].toString());
			json.put("value", obj[0].toString());
			ja.add(json);
		}
		jo.put("declare", ja);
		return jo;
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> exportDeclareReportGridData(DeclareVo vo) {
		
		String sql="select m.materialitemcode,m.materialitemname,m.desingnation,m.materialstandard,m.demension,dd.materialcatalog_name,dd.quantity,dd.amount,dd.use,decode(dd.declare_Type,1,'计划内',2,'应急',3,'非应急'),dd.taskno,dd.usedate,m.remarks from t_declare_detil dd,t_material m where m.materialid=dd.material_id and dd.declare_id in (:declareid)";
		List<Object[]> objList=getHibernateSession().createSQLQuery(sql)
		                                    .setParameterList("declareid", StringUtil.split(vo.getDeclareId(), ','))
		                                    .list();
		List list=new ArrayList();
		list.add(objList);
		String[] str={"物资编码","物资名称","牌号","规格型号","计量单位","物资类别","数量","资金预算(单位:元)","采购用途","采购类型","任务编号","使用时间","备注"};
		list.add(str);
		return list;
//		List<Object[]> objList = this.getDeclareService().exportDeclareReportGridData(vo);
//		List<Object[]> valueList = new ArrayList<Object[]>();
//		Object value[] = null;
//		for (Object ob[] : objList) {
//			 value = new Object[22];
//			 value[0] = ob[0] == null ? "" : ob[0].toString();
//			 value[1] = ob[1] == null ? "" : ob[1].toString();
//			 value[2] = ob[2] == null ? "" : ob[2].toString();//物料编码
//			 value[3] = ob[3] == null ? "" : ob[3].toString();
//			 value[4] = ob[4] == null ? "" : ob[4].toString();
//			 value[5] = ob[5] == null ? "" : ob[5].toString();
//			 value[6] = ob[6] == null ? "" : ob[6].toString();
//			 value[7] = ob[7] == null ? "" : ob[7].toString();
//			 value[8] = ob[8] == null ? "" : ob[8].toString();
//			 value[9] = ob[9] == null ? "" : ob[9].toString();
//			 value[10] = ob[10] == null ? "" : ob[10].toString();
//			 value[11] = ob[11] == null ? "" : ob[11].toString();
//			 value[12] = ob[12] == null ? "" : ob[12].toString();
//			 value[13] = ob[13] == null ? "" : ob[13].toString();
//			 value[14] =ob[14] == null || ob[14].equals("0")?"否":"是";
//			 value[15] =ob[16] == null || ob[16].equals('0')?"否":"是";
//			 value[16] = ob[21] == null || ob[21].equals("0")?"否":"是";
//			 value[17] = ob[17] == null ? "" : ob[17].toString();
//			 value[18] = ob[20] == null ? "" : ob[20].toString();
//			 value[19] = ob[18] == null ? "" : ob[18].toString();
//			 if(ob[12] == null)
//				 value[20] = "";
//			 else  if(ob[18] == null)
//				 value[20] = ob[12].toString();
//			 else
//				 value[20] = Float.parseFloat(ob[12].toString())- Float.parseFloat(ob[18].toString());
//			 value[21] = ob[19] == null ? "" : ob[19].toString(); 
//			 valueList.add(value);
//		}
//		return valueList;
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
}
