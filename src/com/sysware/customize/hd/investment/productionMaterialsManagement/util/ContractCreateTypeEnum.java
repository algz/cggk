package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 合同创建类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-08-23
 * 
 */
public enum ContractCreateTypeEnum {
    //直接生成不在使用,直接采购使用5
	BI_JIA("比价", "1"), ZHAO_BIAO("招标", "2"), ZHI_JIE_CAI_GOU("直接采购", "3"), XIE_YI_CAI_GOU("协议采购", "4"), QI_TA_CAI_GOU("其它采购", "5");

	private String name;
	private String value;

	private ContractCreateTypeEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

}
