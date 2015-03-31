package ut.com.sysware.edm.designnote;

import java.util.Calendar;

import org.apache.commons.beanutils.PropertyUtils;
import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.sysware.edm.designnote.DesignNote;
import com.sysware.edm.designnote.DesignNoteService;

public class DesignNoteServiceTest extends SyswareTestBase {

	@Test
	public void testAddDesignNote() throws Exception {
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		assert(service.addDesignNote(dn));
	}

	@Test
	public void testDelDesignNote() throws Exception {
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		service.addDesignNote(dn);
		service.delDesignNote(dn.getId());
		
		assert(service.getDesignNoteById(dn.getId())==null);
	}

	@Test
	public void testUpdateDesignNote() throws Exception {
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		service.addDesignNote(dn);
		
		PropertyUtils.copyProperties(dn, dn);
		dn.setTitle("t2");
		service.updateDesignNote(dn);
		
		assert(service.getDesignNoteById(dn.getId()).getTitle().equals("t2"));
	}

	@Test
	public void testGetDesignNoteById() throws Exception {
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		service.addDesignNote(dn);
		
		assert(service.getDesignNoteById(dn.getId())!=null);
	}

	@Test
	public void testGetDesignNoteByTemplateId() throws Exception{
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		service.addDesignNote(dn);
		
		assert(service.getDesignNoteByTemplateId("sfs").length==1);
	}
	
	@Test
	public void testGetDesignNoteByTemplateIdAndDataId() throws Exception{
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(12345L);
		
		service.addDesignNote(dn);
		
		assert(service.getDesignNoteByTemplateIdAndDataId("sfs", "dd").length==1);
	}
	
	@Test
	public void testGetDesignNoteByUserShorthand() throws Exception{
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(3797350L);
		
		service.addDesignNote(dn);
		
		assert(service.getDesignNoteByUserShorthand("lmj").length==1);
	}
	
	@Test
	public void getTemplateDesignNoteByTitle() throws Exception{
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(3797350L);
		
		service.addDesignNote(dn);
		
		assert(service.getTemplateDesignNoteByTitle("sfs", "t").length==1);
	}
	
	@Test
	public void getTemplateDataDesignNoteByTitle() throws Exception{
		DesignNoteService service = (DesignNoteService) this.getSeamObject("designnote_DesignNoteServiceImpl");
		
		DesignNote dn = new DesignNote();
		dn.setTitle("t1");
		dn.setContent("c1");
		dn.setDataId("dd");
		dn.setDataCenterId("sfs");
		dn.setCreateTime(Calendar.getInstance());
		dn.setFileId("fileid");
		dn.setFileName("filen");
		dn.setRefType(2L);
		dn.setRefLocation("ddd");
		dn.setUserId(3797350L);
		
		service.addDesignNote(dn);
		
		assert(service.getTemplateDataDesignNoteByTitle("sfs", "dd", "1").length==1);
	}
}
