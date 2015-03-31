package com.sysware.customize.hd.investment.baseData.expert;

import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;

import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.luck.itumserv.services.security.LoginUser;
import com.sysware.p2m.webservice.dto.User;
@Name("expertDaoImpl")
public class ExpertDaoImpl  extends GenericDAOImpl<Expert> implements ExpertDao{

	public List<Expert> getExportList(ExpertVo vo) {
		Query query = this.createQuery(getExportSql(vo,"obj"));
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}
	private String getExportSql(ExpertVo vo,String name){
		StringBuilder sql = new StringBuilder();
		sql.append("select ").append(name).append(" from Expert obj where 1=1 ");
		if(vo.getExportCode()!=null && !vo.getExportCode().equals(""))
			sql.append(" and obj.exportCode like '%").append(vo.getExportCode()).append("%' ");
		if(vo.getExportName()!=null && !vo.getExportName().equals(""))
			sql.append(" and obj.exportName like '%").append(vo.getExportName()).append("%' ");
		if(vo.getExportAge()!=null && !vo.getExportAge().equals(""))
			sql.append(" and obj.exportAge like '%").append(vo.getExportAge()).append("%' ");
		if(vo.getExportPost()!=null && !vo.getExportPost().equals(""))
			sql.append(" and obj.exportPost like '%").append(vo.getExportPost()).append("%' ");
		if(vo.getExportTitle()!=null && !vo.getExportTitle().equals(""))
			sql.append(" and obj.exportTitle like '%").append(vo.getExportTitle()).append("%' ");
		if(vo.getProjectExportRelationId()!=null && !vo.getProjectExportRelationId().equals("")){
			sql.append(" and obj.exportID in (select exportID from ProjectExpertRelation where projectExportRelationId ='"+vo.getProjectExportRelationId()+"')");
		}
		sql.append("order by obj.exportID");
		return sql.toString();
	}
	public List<ProjectExpertRelation> getProjectExportList(ExpertVo vo) {
		Query query = this.createQuery(getProjectExportSql(vo,"obj"));
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return query.getResultList();
	}
	private String getProjectExportSql(ExpertVo vo,String name){
		StringBuilder sql = new StringBuilder();
		sql.append("select ").append(name).append(" from ProjectExpertRelation obj where 1=1 ");
		if(vo.getProjectCode()!=null && !vo.getProjectCode().equals(""))
			sql.append(" and obj.projectCode like '%").append(vo.getProjectCode()).append("%' ");
		if(vo.getProjectName()!=null && !vo.getProjectName().equals(""))
			sql.append(" and obj.projectName like '%").append(vo.getProjectName()).append("%' ");
		if(vo.getProjectAmount()!=null && !vo.getProjectAmount().equals(""))
			sql.append(" and obj.projectAmount like '%").append(vo.getProjectAmount()).append("%' ");
		if(vo.getExportName()!=null && !vo.getExportName().equals(""))
			sql.append(" and obj.exportID in ( select exportID from Expert where exportName like '%").append(vo.getExportName()).append("%' )");
		sql.append("order by obj.projectExportRelationId");
		return sql.toString();
	}
	public Long getExportListCount(ExpertVo vo) {
		return (Long) this.createQuery(getExportSql(vo,"count(obj)")).getSingleResult();
	}
	public Long getProjectExportListCount(ExpertVo vo) {
		return (Long) this.createQuery(getProjectExportSql(vo,"count(obj)")).getSingleResult();
	}
	
	@Transactional
	public String saveExpert(ExpertVo vo) {
		// TODO Auto-generated method stub
		Expert expert=new Expert();
		expert.setExportID(vo.getExportID().equals("")?null:vo.getExportID());
		String sql="select u.truename from t_user u where u.userid=:userid";
		String username=(String)getHibernateSession().createSQLQuery(sql).setParameter("userid", vo.getExportCode()).setMaxResults(1).uniqueResult();
		expert.setExportName(username);//专家名称
		expert.setExportCode(vo.getExportCode());//专家代码=userid
		expert.setExportAge(vo.getExportAge());//年龄
		expert.setExportSex(vo.getExportSex());//性别
		expert.setExpertise(vo.getExpertise());//专长
		expert.setExportPost(vo.getExportPost());//职务
		expert.setExportTitle(vo.getExportTitle());//职称
		try{
		this.getHibernateSession().saveOrUpdate(expert);
		}catch(Exception e){
			return e.getLocalizedMessage();
		}
		return "";
	}
	
	@Transactional
	public String delExpert(ExpertVo vo) {
		// TODO Auto-generated method stub
		JSONArray ja=JSONArray.fromObject(vo.getExportID());
		try{
			for(int i=0;i<ja.size();i++){
				this.getHibernateSession().createSQLQuery("delete from T_EXPERT e where e.ID='"+ja.get(i).toString()+"'").executeUpdate();
			}
		}catch(Exception e){
			return e.getLocalizedMessage();
		}
		return "";
	}
	
}
