package ut;

import java.io.Serializable;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.logicalcobwebs.proxool.ConnectionPoolDefinitionIF;
import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.ProxoolFacade;


public class TestHibernateListener extends EmptyInterceptor {

	private static final long serialVersionUID = -4722902591020632236L;

	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
		try {
			// 保存脏数据
			ConnectionPoolDefinitionIF def = ProxoolFacade.getConnectionPoolDefinition("OraclePool");
			if(def.getUrl().endsWith(SyswareTestBase.testSid)){
				SyswareTestBase.dirtyRecords.add(entity);
			}
		} catch (ProxoolException e) {
			e.printStackTrace();
		}
		return super.onSave(entity, id, state, propertyNames, types);
	}

	@Override
	public void onDelete(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
		try {
			// 删除已保存的脏数据，因为已经删除，不用最后清理
			ConnectionPoolDefinitionIF def = ProxoolFacade.getConnectionPoolDefinition("OraclePool");
			if(def.getUrl().endsWith(SyswareTestBase.testSid)){
				SyswareTestBase.dirtyRecords.remove(entity);
			}
		} catch (ProxoolException e) {
			e.printStackTrace();
		}
		super.onDelete(entity, id, state, propertyNames, types);
	}
	
}
