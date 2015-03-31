package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 采购类型Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-08-22
 * 
 */
public enum PurchaseTypeEnum {

	BI_JIA("比价", "1"), ZHAO_BIAO("招标", "2"), ZHI_JIE_CAI_GOU("直接采购", "3"), XIE_YI_CAI_GOU("协议采购", "4"), QI_TA_CAI_GOU("其它采购", "5");

	private String name;
	private String value;

	private PurchaseTypeEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public static PurchaseTypeEnum getByValue(String value) {
		for (PurchaseTypeEnum purchaseTypeEnum : PurchaseTypeEnum
				.values()) {
			if (purchaseTypeEnum.value.equals(value)) {
				return purchaseTypeEnum;
			}
		}
		return null;
	}
	
	public static PurchaseTypeEnum getByName(String name) {
		for (PurchaseTypeEnum purchaseTypeEnum : PurchaseTypeEnum
				.values()) {
			if (purchaseTypeEnum.name.equals(name)) {
				return purchaseTypeEnum;
			}
		}
		return null;
	}
}
