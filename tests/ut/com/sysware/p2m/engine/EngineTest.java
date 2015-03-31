package ut.com.sysware.p2m.engine;

import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import ut.SyswareTestBase;


public class EngineTest extends SyswareTestBase {

	/**
	 * 顺序控制流的测试：A->B->C。
	 * 
	 */
	@Test(dataProvider = "dp")
	public void sequential_tasks() {
		
	}

	@DataProvider
	public Object[][] dp() {
		return new Object[][] { new Object[] { 1, "a" },
				new Object[] { 2, "b" }, };
	}

	@BeforeTest
	public void beforeTest() {
	}

	@AfterTest
	public void afterTest() {
	}


}
