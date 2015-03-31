package ut.com.luck.itumserv.base.user;

import org.junit.Assert;
import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.luck.itumserv.base.user.GuserVo;
import com.luck.itumserv.base.user.UserSerivce;

public class UserServiceTest extends SyswareTestBase{

	@Test
	public void trimLastTest(){
		GuserVo guser=new GuserVo();
		UserSerivce users=(UserSerivce)getSeamObject("base_user_UserSerivce");
		guser.setUserid(new Long(3939900));
		guser.setUserids(new String[]{"3939900"});
		boolean expected = true;
		boolean actual = users.deleteUser(guser);
		System.out.println(actual);
		System.out.println(expected);
		Assert.assertEquals(expected, actual);
		   
	}
}
