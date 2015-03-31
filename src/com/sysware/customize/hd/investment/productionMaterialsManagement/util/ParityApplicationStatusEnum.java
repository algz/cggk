package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 比价、招投标处理状态Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-02
 * 
 */
public enum ParityApplicationStatusEnum {

	BIAN_ZHI_ZHONG("编制中", "1"), DAI_SHEN_PI("待审批", "2"), SHEN_PI_ZHONG("审批中", "3"), YI_SHEN_PI(
			"已审批", "4"), YI_SHENG_CHENG("已生成", "5"), DAI_SHENG_CHENG_HE_TONG("待生成合同", "6");

	private String name;
	private String value;

	private ParityApplicationStatusEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public static ParityApplicationStatusEnum getByValue(String value) {

		for (ParityApplicationStatusEnum parityApplicationStatusEnum : ParityApplicationStatusEnum
				.values()) {
			if (parityApplicationStatusEnum.value.equals(value)) {
				return parityApplicationStatusEnum;
			}
		}
		return null;
	}
}
