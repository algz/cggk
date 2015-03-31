package ut.com.sysware.util;


import java.util.HashMap;

import junit.framework.Assert;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.sysware.util.PropertiesHelper;

public class PropertiesHelperTest {

	PropertiesHelper _instance = PropertiesHelper.instance("system.properties");
	
	@Before
	public void setUp() throws Exception {
		_instance = PropertiesHelper.instance("system.properties");
	}

	@After
	public void tearDown() throws Exception {
		_instance = null;
	}
	
	@Test
	public void getOnePropertyTest(){
		String expected = "desc";
		String actual = _instance.getOneProperty("mytask_default_sort_ascdesc");
		
		Assert.assertEquals(expected, actual);
		
		actual = _instance.getOneProperty("mytask_default_sort_ascdesc");
		
		Assert.assertEquals(expected, actual);
	}
	
	
	@Test
	public void getPropertiesTest(){
		HashMap<String, String> expected = new HashMap<String, String>();
		expected.put("user", "ftpuser");
		expected.put("pwd", "sysware");
		expected.put("remotingFolder", "p2m");
		
		HashMap<String, String> actual = _instance.getProperties("user", "pwd", "remotingFolder");
		
		String left = expected.get("user");
		String right = actual.get("user");
		Assert.assertEquals(left, right);
		
		left = expected.get("user");
		right = actual.get("user");
		Assert.assertEquals(left, right);
		
		left = expected.get("pwd");
		right = actual.get("pwd");
		Assert.assertEquals(left, right);
		
		left = expected.get("remotingFolder");
		right = actual.get("remotingFolder");
		Assert.assertEquals(left, right);
		
		//===========================
		actual = _instance.getProperties("user", "pwd", "remotingFolder");
		left = expected.get("user");
		right = actual.get("user");
		Assert.assertEquals(left, right);
		
		left = expected.get("user");
		right = actual.get("user");
		Assert.assertEquals(left, right);
		
		left = expected.get("pwd");
		right = actual.get("pwd");
		Assert.assertEquals(left, right);
		
		left = expected.get("remotingFolder");
		right = actual.get("remotingFolder");
		Assert.assertEquals(left, right);
	}

}
