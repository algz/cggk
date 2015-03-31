/**
 * 
 */
package ut.com.sysware.edm.DataModel;

import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.luck.itumserv.entity.DataTypeEntity;
import com.sysware.edm.DataModel.DataModelRemote;
import com.sysware.edm.DataModel.DataModelVo;
import com.sysware.edm.dynamicmodel.DataTypeService;

/**
 * 
 * @author limj
 * @date 2010-10-27 上午10:05:45
 */
public class DataModelRemoteTest extends SyswareTestBase {

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelRemote#getChildDataModel(com.sysware.edm.DataModel.DataModelVo)}.
	 */
	@Test
	public void testGetChildDataModel() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelRemote#insertDataObject(com.sysware.edm.DataModel.DataModelVo)}.
	 */
	@Test
	public void testInsertDataObject() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelRemote#updateDataObject(com.sysware.edm.DataModel.DataModelVo)}.
	 */
	@Test
	public void testUpdateDataObject() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelRemote#insertOrUpdateDataObject(com.sysware.edm.DataModel.DataModelVo)}.
	 */
	@Test
	public void testInsertOrUpdateDataObject() {
		// 生成测试数据类型
		DataTypeService dataTypeService = (DataTypeService) this.getSeamObject("dynamicmodel_datatypeServiceImpl");
		DataTypeEntity e = new DataTypeEntity();
		e.setDataType("dataset");
		e.setDataTypeName("type1");
		e.setRank(8L);
		e.setStatus(0L);
		e.setVersion(1L);
		dataTypeService.addDataType(e);
		
		// 生成类型子项
		DataModelRemote remote = (DataModelRemote) this.getSeamObject("dataModel_dataModelRemote");
		DataModelVo dmvs = new DataModelVo();
		List<DataModelVo> list = new ArrayList<DataModelVo>();
		for (int i = 0; i < 3; i++) {
			DataModelVo vo = new DataModelVo();
			vo.setDataEntityType("string");
			vo.setDataEntityName("testType"+i);
			vo.setIsRef(0L);
			vo.setStatus(0L);
			vo.setVersion(1L);
			vo.setDataCenterID(e.getDataTypeId());
			vo.setIsArray(false);
			list.add(vo);
		}
		dmvs.setDmvlist(list);
		String result = remote.insertOrUpdateDataObject(dmvs);
		assert("true".equals(result));
	}

	/**
	 * Test method for {@link com.sysware.edm.DataModel.DataModelRemote#deleteDataObject(com.sysware.edm.DataModel.DataModelVo)}.
	 */
	@Test
	public void testDeleteDataObject() {
		fail("Not yet implemented");
	}

}
