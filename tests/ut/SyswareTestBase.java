package ut;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.exception.SQLGrammarException;
import org.jboss.seam.contexts.Lifecycle;
import org.jboss.seam.init.Initialization;
import org.jboss.seam.mock.MockServletContext;
import org.logicalcobwebs.proxool.ConnectionPoolDefinitionIF;
import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.ProxoolFacade;
import org.logicalcobwebs.proxool.ProxoolListenerIF;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;

import com.luck.itumserv.common.CommonDAO;

public class SyswareTestBase {

	private static final String testIp = "localhost";// 测试地址
	public static final String testSid = "ut";// 测试实例
	private static final String dbUser = "edm_dep";// 用户名
	private static final String dbPwd = "edm_dep";// 密码
	private static boolean proxoolRemoved = false;// 是否已删除原有的pool
	public static Set<Object> dirtyRecords = new HashSet<Object>();// 保存测试中产生的脏数据

	@BeforeClass
	public void init() throws ProxoolException {
		// 手动加载seam 组件
		System.out.println("手动加载seam 组件开始……");

		// 改为测试库
//		ProxoolFacade.addProxoolListener(new ProxoolListenerIF() {
//			public void onShutdown(String arg0) {
//			}
//
//			public void onRegistration(ConnectionPoolDefinitionIF arg0,
//					Properties arg1) {
//				try {
//					if (!proxoolRemoved) {
//						ProxoolFacade.removeConnectionPool("OraclePool");
//						proxoolRemoved = true;
//						Properties p = new Properties();
//						p.put("user", dbUser);
//						p.put("password", dbPwd);
//						ProxoolFacade.registerConnectionPool(
//								"proxool.OraclePool:oracle.jdbc.driver.OracleDriver:jdbc:oracle:thin:@"
//										+ testIp + ":1521:" + testSid, p);
//					}
//				} catch (ProxoolException e) {
//					e.printStackTrace();
//				}
//			}
//		});

		if (!Lifecycle.isDestroying()) {
			Lifecycle.beginApplication(new HashMap<String, Object>());
			new Initialization(new MockServletContext()).create().init();
			Lifecycle.beginCall();
		}
	}

	public Object getSeamObject(String seamname) {
		Object os = org.jboss.seam.Component.getInstance(seamname, true);
		return os;
	}

	@AfterClass
	public void closeLifecycle() {
		Lifecycle.endApplication();
		System.out.println("手动加载seam 组件结束……");
	}

	@AfterMethod
	public void afterTestMethod() {
		System.out.println("afterMethod");
		// 清理测试数据
//		clearDB();
	}

	/**
	 * 清理数据
	 */
	private void clearDB() {
		CommonDAO<?> dao = (CommonDAO<?>) this.getSeamObject("common_CommonDAO");
		Session session = dao.getHibernateSession();

		// 检查数据库是否为测试数据库
		try {
			String instanceName = (String) session.createSQLQuery(
					"select instance_name from v$instance").uniqueResult();
			if (!testSid.equals(instanceName)) {
				throw new RuntimeException("测试数据库应为 " + testSid);
			}
		} catch (SQLGrammarException e) {
			throw new RuntimeException("测试数据库应为 " + testSid);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// disable所有外键
		List<?> list = session
				.createSQLQuery(
						"select 'alter table '||t.table_name||' disable constraint '||t.constraint_name from user_constraints t where t.constraint_type='R'")
				.list();
		for (Iterator<?> iterator = list.iterator(); iterator.hasNext();) {
			String s = (String) iterator.next();
			session.createSQLQuery(s).executeUpdate();
		}

		// 删除脏数据
		session.beginTransaction();
		for (Iterator<?> iterator = dirtyRecords.iterator(); iterator.hasNext();) {
			Object entity = (Object) iterator.next();
			session.delete(session.merge(entity));
		}
		session.getTransaction().commit();

		// enable所有外键
		list = session
				.createSQLQuery(
						"select 'alter table '||t.table_name||' enable constraint '||t.constraint_name from user_constraints t where t.constraint_type='R'")
				.list();
		for (Iterator<?> iterator = list.iterator(); iterator.hasNext();) {
			String s = (String) iterator.next();
			session.createSQLQuery(s).executeUpdate();
		}
	}

}
