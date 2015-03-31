package com.sysware.customize.hd.investment.roles;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.role.RoleSerivce;
import com.luck.itumserv.base.role.RoleVo;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;

@Name("roleUploadService")
public class RoleUploadService {
	@In(value="base_role_roleSerivce",create = true)
	RoleSerivce roleSerivce;
	@Transactional
	public void  batchAddRoles(Workbook workbook){
		int numberOfSheets = workbook.getNumberOfSheets();// 获取Excel的sheet数目
		RoleVo paramRoleVo = new RoleVo();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);// 获取Excel的sheet  
			int rows = sheet.getRows();// 当前sheet的行数
			for (int m = 1; m < rows; m++) { 
				paramRoleVo.setRoleName(String.valueOf((sheet.getRow(m)[0]).getContents().trim())); 
				paramRoleVo.setRolename(String.valueOf((sheet.getRow(m)[0]).getContents().trim()));  
				if (roleSerivce.getRoleName(paramRoleVo).equals("1")) {
					roleSerivce.addRole(paramRoleVo); 
				}
			}
		}
	}
}
