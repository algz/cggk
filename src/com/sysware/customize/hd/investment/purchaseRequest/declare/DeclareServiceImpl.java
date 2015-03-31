package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.math.BigDecimal;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetailDao;

@Name("declare_DeclareServiceImpl")
public class DeclareServiceImpl implements DeclareService {

	@In(create = true)
	Identity identity; 
	
	@Transactional
	public Declare saveDeclare(Declare declare) {
		if (StringUtils.isEmpty(declare.getDeclareId())) {
			return this.getDeclareDao().save(declare);
		} else {
			this.getDeclareDao().update(declare);
			return declare;
		}
	}

	public Declare getDeclareById(String declareId) {
		return this.getDeclareDao().get(declareId);
	}

	private DeclareDao getDeclareDao() {
		return (DeclareDao) Component.getInstance("declare_DeclareDaoImpl");
	}

	private DeclareDetailDao getDeclareDetailDao() {
		return (DeclareDetailDao) Component.getInstance("declareDetail_DeclareDetailDaoImpl");
	}
	
	public List<Declare> getDeclaresByExample(DeclareVo declareVo) {
		StringBuilder sql=new StringBuilder(" from t_declare d where 1=1 ");
		if(declareVo.getDeclareCode()!=null&&!declareVo.getDeclareCode().equals("")){
			sql.append(" and d.declare_code like'%"+declareVo.getDeclareCode()+"%'");
		}
		if(declareVo.getDepartmentId()!=null&&!declareVo.getDepartmentId().equals("")){
			
			sql.append(" and d.demartmentid in ");
			sql.append(" (select dep.depcode from t_departments dep where dep.departmentname like '%"+declareVo.getDepartmentId()+"%')");
		}
		if(declareVo.getStatus()!=null&&!declareVo.getStatus().equals("")){
			sql.append(" and d.status='"+declareVo.getStatus()+"'");
		}
		if(declareVo.getDeclareDate()!=null&&!declareVo.getDeclareDate().equals(",")){
			String[] date=declareVo.getDeclareDate().split(",");
			String startDate=" to_date('"+date[0]+"','yyyy/mm/dd') ";
			String endDate=date.length==1?"sysdate":" to_date('"+date[1]+"','yyyy/mm/dd')";
			sql.append(" and d.declare_date between "+startDate+" and "+endDate);
		}
		if(getDeclareDao().isNotLeader()){
			sql.append(" and d.editer='"+identity.getLoginUser().getUserid()+"' ");
		}else{
			if(declareVo.getEditor()!=null&&!declareVo.getEditor().equals("")){
				sql.append(" and d.editer in ");
				sql.append("(select u.userid from t_user u where u.truename like '%"+declareVo.getEditor()+"%')");
			}
		}
		BigDecimal count=(BigDecimal)this.getDeclareDao().getHibernateSession().createSQLQuery("select count(1)"+sql.toString())
		                                                 .uniqueResult();
		declareVo.setCount(count);
		
		return this.getDeclareDao().getHibernateSession().createSQLQuery("select d.* "+sql.toString())
		                           .addEntity("d", Declare.class)
		                           .setFirstResult(declareVo.getStart())
		                           .setMaxResults(declareVo.getLimit())
		                           .list();
//		 String orderName = " obj.declareId desc ";
//		 if(example.getSort()!=null && !"".equals(example.getSort()) && example.getDir()!=null && !"".equals(example.getDir()))
//			 orderName = " obj."+example.getSort() + " "+example.getDir();
//		 return this.find(getAddSql(example,type)+" order by  "+orderName, null,start, limit);
	
//		return this.getDeclareDao().getByExample(example,start,limit,type);
	}

	public long countDeclaresByExample(Declare example,String type) {
		return this.getDeclareDao().countByExample(example,type);
	}
	@Transactional
	public boolean batchDeleteDeclares(String[] ids) {
		
		for(String id : ids){
			this.getDeclareDetailDao().batchDeleteByDeclareId(id);
			this.getDeclareDao().remove(id);
		}
		return true;
	}
	
    @Transactional
	public boolean batchUpdateDeclares(String[] ids) {
//    	String status = ids[ids.length-1]; 1
    	Declare declare = null;
    	for(String id : ids){
    		if(id.length()==1)
    			break;
    		declare = getDeclareById(id);
    		//设置状态为3已提交,已提交还原为已审批
//    		declare.setStatus("3");//已审批
    		declare.setStatus("2");//审批中
    		//是否成功通过申报，0未提交，1已提交，2未通过，3通过
			this.getDeclareDetailDao().batchUpdateByDeclareId(id,"0");
			this.getDeclareDao().update(declare);
		}
    	return true;
	}
    
    @Transactional
	public boolean batchUpdateDeclare(String id) {
//    	String status = ids[ids.length-1]; 1
    	Declare declare = null;
    	
		if(id.length()==1)
			return false;
		declare = getDeclareById(id);
		//设置状态为3已提交,已提交还原为已审批
    		declare.setStatus("3");//已审批
		//是否成功通过申报，0未提交，1已提交，2未通过，3通过
		this.getDeclareDetailDao().batchUpdateByDeclareId(id,"1");
			this.getDeclareDao().update(declare);
		
    	return true;
	}

	public String getSumByAmount(String id) {
		return getDeclareDao().getSumByAmount(id);
	}

	public Double getAmoutByType(String id) {
		return getDeclareDao().getAmoutByType(id);
	}

	public JSONObject getComboBoxDataForDeclare(DeclareVo declareVo) {
		// TODO Auto-generated method stub
		return getDeclareDao().getComboBoxDataForDeclare(declareVo);
	}

	public List<Object[]> exportDeclareReportGridData(DeclareVo vo) {
		return this.getDeclareDao().exportDeclareReportGridData(vo);
	}


}
