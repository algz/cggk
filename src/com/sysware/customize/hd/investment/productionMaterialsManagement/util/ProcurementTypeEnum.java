package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 文件类型、需求大纲类型或采购计划需求类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01 16:30
 * 
 */
public enum ProcurementTypeEnum {
	NIAN_DU("年度", "N", "1"), LING_XING("零星", "L", "2");

	private String name;
	private String code;
	private String value;

	private ProcurementTypeEnum(String name, String code, String value) {
		this.name = name;
		this.code = code;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public String getValue() {
		return value;
	}

	public static ProcurementTypeEnum getByValue(String value) {
		for (ProcurementTypeEnum procurementTypeEnum : ProcurementTypeEnum
				.values()) {
			if (procurementTypeEnum.value.equals(value)) {
				return procurementTypeEnum;
			}
		}
		return null;
	}
}
