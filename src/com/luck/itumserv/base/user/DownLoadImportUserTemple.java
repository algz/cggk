package com.luck.itumserv.base.user;

import java.io.File;
import java.util.Map;

import com.sysware.action.DownloadAction;
import com.sysware.io.DownloadObject;
import com.sysware.utils.Configration;

public class DownLoadImportUserTemple implements DownloadAction {

	
	private final static String URL = "downloadImportUserTemple.download";
	
	public void doGet(Map arg0) {
	}

	public void doPost(Map arg0) {
		
	}

	public String getDefinedURI() {
		return URL;
	}

	public String getResponseText() {
		return null;
	}

	public DownloadObject getDownloadObject(Map arg0) {
		
		DownloadObject downloadObj = new DownloadObject();
		
		String fileSepara = File.separator;
		
		String filepath = Configration.getApplicationRootPath()+"userImport"+fileSepara+"importUser.xls";
		
		downloadObj.setDownloadFile(new File(filepath));
		
		downloadObj.setDownLoadCode(DownloadObject.S_EXCEL);
		
		downloadObj.setFilename("importUser.xls");
		
		return downloadObj;
	}

}
