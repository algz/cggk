package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.luck.itumserv.entity.Department;

public interface DeptypeDao extends GenericDAO<Department> {

	public List<Object[]> getDeptypeList();
}
