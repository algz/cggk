package ut.com.sysware.edm.webservices;

import java.util.ArrayList;
import java.util.List;

import org.testng.annotations.Test;

import ut.SyswareTestBase;


import com.luck.itumserv.entity.DataTypeEntity;
import com.sysware.edm.DataModel.CustomTypeEntity;
import com.sysware.edm.webservice.DataEntityWS;
import com.sysware.edm.webservice.DataEntityWSImpl;
import com.sysware.edm.webservice.DataTypeCustomTypeEntity;
import com.sysware.edm.webservice.DataTypeWS;
import com.sysware.edm.webservice.DataTypeWSImpl;

public class DataTypWsTest extends SyswareTestBase {
	@Test
	public void testGetDistinctDataTypeList() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		DataTypeEntity[] list = dtWs.getDistinctDataTypeList("3934750", "3934850");
		assert(list.length==3);
	}
	@Test
	public void testGetDataType() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.getDataType("大气信息")!=null);
	}
	@Test
	public void testGetChildDataTypes() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.getChildDataTypes(dtWs.getDataType("大气信息").getDataTypeId()).length==4);
	}
	@Test
	public void testGetRootDataEntities() {
		DataEntityWS deWs = new DataEntityWSImpl();
		assert(deWs.getRootDataEntities("project_3934750", "taskdatas_3934850").length==4);
	}
	@Test
	public void testGetRootDataEntitiesCount() {
		DataEntityWS deWs = new DataEntityWSImpl();
		assert(deWs.getRootDataEntitiesCount("project_3934750", "taskdatas_3934850")==4);
	}
	@Test
	public void testGetAllChildDataEntitiesByPages() {
		DataEntityWS deWs = new DataEntityWSImpl();
		assert(deWs.getAllChildDataEntitiesByPages("2010090110382800068769a620098d00497f9d6c","2010090110382800068769a620098d00497f9d6c","project_3934750","201007291906100005156e8bc62f8b224333aaaf","2010090110382800068769a620098d00497f9d6c","201007291906100005156e8bc62f8b224333aaaf","8","taskdatas_3934850",0l,2,2)[0].getDataEntityName().equals("借阅人"));
	}
	@Test
	public void testGetAllChildDataEntitiesCount() {
		DataEntityWS deWs = new DataEntityWSImpl();
		assert(deWs.getAllChildDataEntitiesCount("2010090110382800068769a620098d00497f9d6c","2010090110382800068769a620098d00497f9d6c","project_3934750","201007291906100005156e8bc62f8b224333aaaf","2010090110382800068769a620098d00497f9d6c","201007291906100005156e8bc62f8b224333aaaf","8","taskdatas_3934850")==7);
	}
	@Test
	public void testGetNotExistDataTypeList() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		String[] dataTypeNameList = new String[]{"发动机参数","跑道面数据","跑道面数据11"};
		String[] list = dtWs.getNotExistDataTypeList(dataTypeNameList);
		assert(list[0].equals("跑道面数据11"));
	}
	@Test
	public void testAddDataType() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		DataTypeEntity dte = new DataTypeEntity();
		dte.setDataTypeId("testid1");
		dte.setDataTypeName("testname1");
		dte.setDataType("string");
		dte.setRank(4l);
		assert(dtWs.addDataType(dte));
	}
	@Test
	public void testInsertDataObject() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		CustomTypeEntity ct = new CustomTypeEntity();
		ct.setDataEntityID("testid1");
		ct.setDataEntityName("testname1");
		ct.setDataEntityType("string");
		ct.setIsRef(8L);
		ct.setDataCenterID("20100816113505000140018d9ae15dd0492b9789");
		ct.setDimension("3");
		ct.setParentDataEntityID("222");
		assert(dtWs.insertDataObject(ct));
	}
	@Test
	public void testUpdateDataTypeById() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		DataTypeEntity dataTypeEntity = new DataTypeEntity();
		dataTypeEntity.setDataTypeId("testid1");
		dataTypeEntity.setDataTypeName("testname1_update");
		dataTypeEntity.setDataType("integer");
		dataTypeEntity.setRank(2l);
		assert(dtWs.updateDataTypeById(dataTypeEntity));
	}
	@Test
	public void testUpdateDataObject() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		CustomTypeEntity ct = new CustomTypeEntity();
		ct.setDataEntityID("testid1");
		ct.setDataEntityName("testname1_update");
		ct.setDataEntityType("integer");
		ct.setIsRef(2L);
		ct.setDataCenterID("ddddd");
		ct.setDimension("6");
		ct.setParentDataEntityID("sssss");
		assert(dtWs.updateDataObject(ct));
	}
	@Test
	public void testReleaseDataType() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		DataTypeEntity e = dtWs.getDataTypeById("20100910175224000531e52ab8e16c8e4096a4a2");
		assert(dtWs.releaseDataType(e.getDataTypeId()));
	}
	@Test
	public void testGetDataTypeEntity() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.getDataTypeEntity("20100910111446000015ecd2e3740ecd4ca0b7f0", 1l)!=null);
	}
	@Test
	public void testGetChildDataTypesByVersion() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.getChildDataTypesByVersion("20100910111446000015ecd2e3740ecd4ca0b7f0", 1l)!=null);
	}
	@Test
	public void testSubmitApprove() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.submitApprove("201009131021010005314fa22daab0804611b933"));
	}
	@Test
	public void testAgreeApprove() throws Exception {
		DataTypeWS dtWs = new DataTypeWSImpl();
		assert(dtWs.agreeApprove("201009131021010005314fa22daab0804611b933"));
	}
	@Test
	public void testDataTypeCompatibity() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		CustomTypeEntity[] ctsArr = new CustomTypeEntity[]{
				new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("新建物理类型属性");
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("d55");
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("B");
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("c");
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("integer");
						this.setDataEntityName("a");
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("E");
					}
				}
		};
//		assert(dtWs.DataTypeCompatibity("201009131730380009375227d100c2864e7b8d05", ctsArr));
	}
	@Test
	public void testAddDataTypeByCollection() {
		DataTypeWS dtWs = new DataTypeWSImpl();
		List<DataTypeCustomTypeEntity> arr = new ArrayList<DataTypeCustomTypeEntity>();
		DataTypeCustomTypeEntity dce = null;
		DataTypeEntity dte = null;
		CustomTypeEntity[] ctsArr = null;
		
		dce = new DataTypeCustomTypeEntity();
		dte = new DataTypeEntity();
		dte.setDataTypeName("cccf-23");
		dte.setDataType("dataset");
		dte.setRank(0L);
		ctsArr = new CustomTypeEntity[]{
				new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf2--1");
						this.setIsRef(0L);
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf2--2");
						this.setIsRef(0L);
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf2--3");
						this.setIsRef(0L);
					}
				}
		};
//		dce.setCustomTypeEntities(ctsArr);
		dce.setDataTypeEntity(dte);
		arr.add(dce);
		dce = new DataTypeCustomTypeEntity();
		dte = new DataTypeEntity();
		dte.setDataTypeName("cccf-33");
		dte.setDataType("dataset");
		dte.setRank(0L);
		ctsArr = new CustomTypeEntity[]{
				new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf3--1");
						this.setIsRef(0L);
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf3--2");
						this.setIsRef(0L);
					}
				},new CustomTypeEntity(){
					{
						this.setDataEntityType("string");
						this.setDataEntityName("cccf3--3");
						this.setIsRef(0L);
					}
				}
		};
//		dce.setCustomTypeEntities(ctsArr);
		dce.setDataTypeEntity(dte);
		arr.add(dce);
//		String[] c = dtWs.addDataTypeByCollection(arr.toArray(new DataTypeCustomTypeEntity[arr.size()]));
//		assert(c[0].equals("0"));
	}
}
