package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 定额、清册类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-10
 * 
 */
public enum MaterialQuotaTypeEnum {

	Material_Quota("材料定额", "1"), Inventory("清册明细", "2");

	private String name;
	private String value;

	private MaterialQuotaTypeEnum(String name, String value) {
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
