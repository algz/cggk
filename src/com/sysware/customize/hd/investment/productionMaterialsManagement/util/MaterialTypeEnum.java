package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 物料类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-10
 * 
 */
public enum MaterialTypeEnum {

	JIN_SHU("金属","J"),FEI_JIN_SHU("非金属","F"),CHENG_JIAN("成件","C");
	
	private String name;
	private String code;

	private MaterialTypeEnum(String name, String code) {
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
