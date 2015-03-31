package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 申请状态Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-08-23
 * 
 */
public enum ApplicationStatusEnum {

	DAI_SHEN_PI("待审批", "1"), SHEN_PI_ZHONG("审批中", "2"), YI_SHEN_PI("已审批", "3"), YI_SHENG_CHENG(
			"已生成", "4");

	private String name;
	private String value;

	private ApplicationStatusEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public static ApplicationStatusEnum getByValue(String value) {

		for (ApplicationStatusEnum applicationStatusEnum : ApplicationStatusEnum
				.values()) {
			if (applicationStatusEnum.value.equals(value)) {
				return applicationStatusEnum;
			}
		}
		return null;
	}
}
