/**
 * 
 */
package ut.com.sysware.edm.DataModel;

import static org.junit.Assert.fail;

import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.luck.itumserv.entity.DataTypeEntity;
import com.sysware.edm.DataModel.CustomTypeEntity;
import com.sysware.edm.DataModel.DataModelDao;
import com.sysware.edm.dynamicmodel.DataTypeDao;

/**
 * 
 * @author limj
 * @date 2010-10-27 上午10:03:19
 */
public class DataModelDaoTest extends SyswareTestBase {

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModel(java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelString() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModelNoStatus(java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelNoStatus() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getDataModelListByName(java.lang.String, java.lang.String)}.
	 */
	@Test
	public void testGetDataModelListByName() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModel(java.lang.String, int, int)}.
	 */
	@Test
	public void testGetChildDataModelStringIntInt() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModelCount(java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelCount() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getProcess(java.lang.String, java.lang.String)}.
	 */
	@Test
	public void testGetProcess() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getShow(java.lang.String)}.
	 */
	@Test
	public void testGetShow() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModelData(java.lang.String, java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelData() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#insertDataObject(com.sysware.edm.DataModel.CustomTypeEntity)}.
	 */
	@Test
	public void testInsertDataObject() {
		DataModelDao dao = (DataModelDao) this.getSeamObject("dataModel_dataModelDaoImpl");
		CustomTypeEntity cte = new CustomTypeEntity();
		cte.setDataEntityType("string");
		cte.setDataEntityName("testType");
		cte.setIsRef(0L);
		cte.setStatus(0L);//不同状态
		cte.setVersion(1L);
		cte.setDataCenterID("0");
		dao.insertDataObject(cte);
		assert dao.getModelByObjectId(cte.getDataEntityID())!=null;
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#deleteDataObject(java.lang.String)}.
	 */
	@Test
	public void testDeleteDataObject() {
		DataModelDao dao = (DataModelDao) this.getSeamObject("dataModel_dataModelDaoImpl");
		CustomTypeEntity cte = new CustomTypeEntity();
		cte.setDataEntityType("string");
		cte.setDataEntityName("testType");
		cte.setIsRef(0L);
		cte.setStatus(0L);//不同状态
		cte.setVersion(1L);
		cte.setDataCenterID("0");
		dao.insertDataObject(cte);
		CustomTypeEntity m = dao.getModelByObjectId(cte.getDataEntityID());
		dao.deleteDataObject(cte.getDataEntityID());
		CustomTypeEntity m1 = dao.getModelByObjectId(cte.getDataEntityID());
		assert(m!=null&&m1==null);
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#updateDataObject(com.sysware.edm.DataModel.CustomTypeEntity)}.
	 */
	@Test
	public void testUpdateDataObject() {
		DataModelDao dao = (DataModelDao) this.getSeamObject("dataModel_dataModelDaoImpl");
		CustomTypeEntity cte = new CustomTypeEntity();
		cte.setDataEntityType("string");
		cte.setDataEntityName("testType");
		cte.setIsRef(0L);
		cte.setStatus(0L);//不同状态
		cte.setVersion(1L);
		cte.setDataCenterID("0");
		dao.insertDataObject(cte);
		CustomTypeEntity m = dao.getModelByObjectId(cte.getDataEntityID());
		m.setDataEntityName("testType1");
		m.setDataEntityType("int");
		dao.updateDataObject(m);
		m = dao.getModelByObjectId(cte.getDataEntityID());
		assert "testType1".equals(m.getDataEntityName())&&"int".equals(m.getDataEntityType());
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getTreeNodeisLeaf(java.lang.String)}.
	 */
	@Test
	public void testGetTreeNodeisLeaf() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getMaxOrderNumerByCateId(java.lang.String)}.
	 */
	@Test
	public void testGetMaxOrderNumerByCateId() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getModelByObjectId(java.lang.String)}.
	 */
	@Test
	public void testGetModelByObjectId() {
		DataModelDao dao = (DataModelDao) this.getSeamObject("dataModel_dataModelDaoImpl");
		CustomTypeEntity cte = new CustomTypeEntity();
		cte.setDataEntityType("string");
		cte.setDataEntityName("testType");
		cte.setIsRef(0L);
		cte.setStatus(0L);//不同状态
		cte.setVersion(1L);
		cte.setDataCenterID("0");
		dao.insertDataObject(cte);
		assert dao.getModelByObjectId(cte.getDataEntityID())!=null;
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getMinOrderNumerByCateId(java.lang.String)}.
	 */
	@Test
	public void testGetMinOrderNumerByCateId() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getPreEntityByCateId(java.lang.String, int)}.
	 */
	@Test
	public void testGetPreEntityByCateId() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getNextEntityByCateId(java.lang.String, int)}.
	 */
	@Test
	public void testGetNextEntityByCateId() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#updateStatus(com.sysware.edm.DataModel.CustomTypeEntity, long)}.
	 */
	@Test
	public void testUpdateStatus() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModelByVersion(java.lang.String, java.lang.Long)}.
	 */
	@Test
	public void testGetChildDataModelByVersion() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModel(java.lang.String, java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelStringString() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelDaoImpl#getChildDataModelNoStatusCount(java.lang.String)}.
	 */
	@Test
	public void testGetChildDataModelNoStatusCount() {
		DataModelDao dao = (DataModelDao) this.getSeamObject("dataModel_dataModelDaoImpl");
		DataTypeDao dataTypeDao = (DataTypeDao) this.getSeamObject("dynamicmodel_datatypeDaoImpl");
		// 生成数据类型
		DataTypeEntity e = new DataTypeEntity();
		e.setDataType("dataset");
		e.setDataTypeName("type1");
		e.setRank(8L);
		e.setStatus(0L);
		e.setVersion(1L);
		dataTypeDao.addDataType(e);
		// 子项
		for (int j = 0; j < 4; j++) {
			CustomTypeEntity cte = new CustomTypeEntity();
			cte.setDataEntityType("string");
			cte.setDataEntityName("testType"+j);
			cte.setIsRef(0L);
			cte.setStatus(j);//不同状态
			cte.setVersion(1L);
			cte.setDataCenterID(e.getDataTypeId());
			dao.insertDataObject(cte);
		}
		long count = dao.getChildDataModelNoStatusCount(e.getDataTypeId());
		assert(count==4);
	}

}
