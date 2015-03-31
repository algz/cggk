package com.sysware.customize.hd.investment.productionMaterialsManagement.util;

import java.util.Calendar;

/**
 * 编码生成器
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-10
 * 
 */
public class FileCodeGenerator {

	/**
	 * 编码模板：codeType+[materialType]+fileType+YEAR+000000
	 * 
	 * @param codeType
	 *            编码类型
	 * @param materialType
	 *            物料类型
	 * @param fileType
	 *            文件类型
	 * @return 编码字符串
	 */
	private static String getFileCode(CodeTypeEnum codeType,
			MaterialTypeEnum materialType, ProcurementTypeEnum fileType) {
		StringBuilder codeStr = new StringBuilder();
		codeStr.append(codeType.getCode());
		if (materialType != null) {
			codeStr.append(materialType.getCode());
		}
		codeStr.append(fileType.getCode())
				.append(Calendar.getInstance().get(Calendar.YEAR))
				.append("000000");
		return codeStr.toString();
	}

	/**
	 * 生成零星需求编号：XL+YEAR+000000 例：XL2011000000
	 * 
	 * @return 零星需求编号
	 */
	public static String getProcurementCode() {
		return getFileCode(CodeTypeEnum.XU_QIU, null,
				ProcurementTypeEnum.LING_XING);
	}

	// 生成采购清单编号
	public static String getPurchaseCode(ProcurementTypeEnum procurementType) {
		return getFileCode(CodeTypeEnum.QING_DAN, null, procurementType);
	}

	// 比价、招标编号
	public static String getParityCode(ProcurementTypeEnum procurementType,
			CodeTypeEnum codeType) {
		return getFileCode(codeType, null, procurementType);

	}

	// 生成合同审签单编号
	public static String getContractCode(ProcurementTypeEnum procurementType,CodeTypeEnum codeType) {
		return getFileCode(codeType, null, procurementType);
	}
}
