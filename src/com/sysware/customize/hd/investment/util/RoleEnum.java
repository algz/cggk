package com.sysware.customize.hd.investment.util;

public enum RoleEnum {
	LEADER("领导", "4664052"),DIRECTOR("室主任","4664301"),
	IMPLEMENT("实施计划","4664053"),EXECUTE("执行管理","4664054"),
	CONTRACT("合同管理","4664055"),CHECK("资产验收","4664056"),
	PAYMENT("资产支付","4664057"),HEADER("业务主管","4664304"),
	ALLMATERIAL("全部物资","4674450");

	private String name;
	private String value;

	private RoleEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public static RoleEnum getByValue(String value) {

		for (RoleEnum roleEnum : RoleEnum
				.values()) {
			if (roleEnum.value.equals(value)) {
				return roleEnum;
			}
		}
		return null;
	}
}
