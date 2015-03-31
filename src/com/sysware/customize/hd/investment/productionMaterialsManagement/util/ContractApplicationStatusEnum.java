package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

/**
 * 合同申请状态Enum
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-12
 * 
 */
public enum ContractApplicationStatusEnum {

	BIAN_ZHI_ZHONG("编制中", "1"), DAI_SHEN_PI("待审批", "2"), SHEN_PI_ZHONG("审批中",
			"3"), YI_SHEN_PI("已审批", "4"), YI_SHENG_CHENG("已生成台账", "5");

	private String name;
	private String value;

	private ContractApplicationStatusEnum(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public static ContractApplicationStatusEnum getByValue(String value) {

		for (ContractApplicationStatusEnum contractApplicationStatusEnum : ContractApplicationStatusEnum
				.values()) {
			if (contractApplicationStatusEnum.value.equals(value)) {
				return contractApplicationStatusEnum;
			}
		}
		return null;
	}
}
