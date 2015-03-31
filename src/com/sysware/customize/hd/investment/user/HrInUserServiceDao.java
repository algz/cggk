package com.sysware.customize.hd.investment.user;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("hrInUserServiceDao")
public class HrInUserServiceDao implements HrInUserService {
	@In(create = true, value = "hrInUserDaoImpl")
	HrInUserDao hrInUserDaoImpl;

	public String importUser() {
		return hrInUserDaoImpl.importUser();
	}

}
