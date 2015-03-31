package com.sysware.customize.hd.investment.user;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.userinfo.UserGroupVO;

@Name("hrInUserRemote")
public class HrInUserRemote {
	@In(create = true,value="hrInUserServiceDao")
	HrInUserService hrInUserServiceDao;
	public String importUser(UserGroupVO user){
		return hrInUserServiceDao.importUser();
	}
}
