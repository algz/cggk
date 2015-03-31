package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.entity.Deptype;

@Name("deptypeDaoImpl")
public class DeptypeDaoImpl extends GenericDAOImpl<Department> implements DeptypeDao {

	public List<Object[]> getDeptypeList() {

		String s1 = "select t.depcode,t.departmentname " +
				"from t_Departments t " +
				"where t.instlevel is not null";

		return this.createSqlQuery(s1).getResultList();
	}
}
