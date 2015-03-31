package com.luck.itumserv.base.dao;

import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.itumserv.base.organization.OrgSearchVO;
import com.luck.itumserv.base.organization.OrganizationVO;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Ginstitute;

@Name("com_base_dao_InsitituteDAO")
public class InsitituteDAO extends CommonDAO<Ginstitute> {

	public String getTreeCode(OrganizationVO oganizationVO) {
		String sql = "select max(treecode) from T_DEPARTMENTS where length(treecode) = "
				+ (oganizationVO.getTreecode().length() + 3)
				+ " and treecode like '" + oganizationVO.getTreecode() + "%'";
		String result = (String) super.createSqlQuery(sql).getSingleResult();
		return result;
	}
	
	public List<String> getParentTreeCode(String curDeptCode){
		String strSql = "select d.depcode from t_departments d "
					  + "connect by d.depcode = prior d.parentcode "
					  + "start with d.depcode='" + curDeptCode + "'";
		return super.createSqlQuery(strSql).getResultList();
	}

	public List getTreeList(String pcode) {
		String sql = "select depcode from T_DEPARTMENTS where PARENTCODE='"+pcode+"'";
		List list = super.createSqlQuery(sql).getResultList();
		if (list != null) {
			if (list.size() > 0) {
				return list;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	public boolean getNode(String pcode) {
		String sql = "select * from T_DEPARTMENTS where PARENTCODE='" + pcode
				+ "'";
		List list = null;
		list = (List) super.createSqlQuery(sql).getResultList();
		if (list != null) {
			if (list.size() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public boolean isNullOrString(String str) {
		if (null == str) {
			return false;
		} else if ("".equals(str)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 查询departments
	 * 
	 * @param dcode
	 * @param name
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Ginstitute> getSearchOrgList(OrgSearchVO orgSearchVO) {
		StringBuilder hql = new StringBuilder(
				"FROM Ginstitute WHERE instcode!='0' ");
		if (orgSearchVO.getInstcode() != null&&!"".equals(orgSearchVO.getInstcode())) {
			hql.append(" AND instcode='");
			hql.append(orgSearchVO.getInstcode()+"'");
		}
		if (orgSearchVO.getName() != null&&!"".equals(orgSearchVO.getName())) {
			hql.append(" AND name LIKE '%");
			hql.append(orgSearchVO.getName());
			hql.append("%'");
		}
		List<Ginstitute> dp = (List<Ginstitute>) super.createQuery(
				hql.toString()).getResultList();
		return dp;
	}
	
	@SuppressWarnings("unchecked")
    public List<String> getPriorDepartment(String dcode) {
	    String sql = "SELECT T.Depcode FROM T_DEPARTMENTS T START WITH T.DEPCODE = :DEPCODE CONNECT BY prior T.PARENTCODE = T.DEPCODE";
        List<String> list = (List<String>)super.createSqlQuery(sql).setParameter("DEPCODE", dcode).getResultList();
	    String sql1 = "SELECT T.Depcode FROM T_DEPARTMENTS T START WITH T.DEPCODE = :DEPCODE CONNECT BY prior T.DEPCODE = T.PARENTCODE";
	    list.addAll((List<String>)super.createSqlQuery(sql1).setParameter("DEPCODE", dcode).getResultList());
	    return list;
	}

	public boolean getDepartment(String dcode, String name) {
		String sql = "";
		if (isNullOrString(dcode) && !(isNullOrString(name))) {
			sql = "select t.* from t_departments t where t.depcode='" + dcode
					+ "'";
		} else if (isNullOrString(name) && !(isNullOrString(dcode))) {
			sql = "select t.* from t_departments t where t.departmentname='"
					+ name + "'";
		} else if (isNullOrString(dcode) && isNullOrString(name)) {
			sql = "select t.* from t_departments t where t.depcode='" + dcode
					+ "' and t.departmentname='" + name + "'";
		} else {
			sql = "select t.* from t_departments t";
		}
		List list = null;
		list = (List) super.createSqlQuery(sql).getResultList();
		if (list != null) {
			if (list.size() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/*
	 * pcode 下所有子节点
	 */
	public String getPcodeGoCCode(String pcode,StringBuffer sb)
	{
		sb.append("'").append(pcode).append("',");
		String sql = "from Ginstitute t where t.parentcode=?";
		List<Ginstitute> list = super.createQuery(sql).setParameter(1, pcode).getResultList();
		if(null!=list && list.size()>0)
		{
			for(int i=0;i<list.size();i++)
			{
				Ginstitute g=list.get(i);
				getPcodeGoCCode(g.getInstcode(),sb);
			}
		}
		String s=sb.toString();
		return s.substring(0,s.lastIndexOf(","));
	}
}
