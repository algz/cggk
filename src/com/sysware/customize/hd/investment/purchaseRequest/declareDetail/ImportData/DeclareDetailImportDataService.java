package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;

import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public interface DeclareDetailImportDataService {
	public void ImportData(Workbook workbook, List<String> bankExist,HttpServletRequest request) throws Exception;
	
}
