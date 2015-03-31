package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 编码类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-10
 * 
 */
public enum CodeTypeEnum {
	
	XU_QIU("采购需求","X"),QING_DAN("采购清单","Q"),BI_JIA("采购比价","B"),
	ZHAO_BIAO("采购招标","Z"),ZHI_JIE_CAI_GOU("合同审签","S"),XIE_YI_CAI_GOU("协议采购","XY"),QI_TA_CAI_GOU("其它采购","QT");

	private String name;
	private String code;

	private CodeTypeEnum(String name, String code) {
		this.name = name;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

}
