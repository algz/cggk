package com.sysware.customize.hd.investment.general;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import jxl.Cell;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;

import com.sun.org.apache.commons.beanutils.PropertyUtils;

/**
 * Excel处理工具类
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-25
 * 
 */
public class ExcelUtils {

	/**
	 * 将Excel中某行的信息封装到指定类型对象
	 * 
	 * @param row
	 *            Excel某行的所有单元格集合
	 * @param colProperties
	 *            该行信息同对象属性的对应关系，按照该行单元格从左至右排列，没有对应关系的设置为空字符串（“”）
	 * @param clazz
	 *            指定的对象类型
	 * @return 封装Excel信息的对象
	 * @throws FileUploadException
	 */
	@SuppressWarnings("rawtypes")
	public static <T> T processRow(Cell[] row, String[] colProperties,
			Class<T> clazz) throws FileUploadException {
		T t = null;
		try {
			// 通过反射机制实例化对象
			t = clazz.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
			return t;
		}
		try {
			for (int i = 0; i < row.length; i++) {
				// 对应关系为“”，则掠过不作处理
				if (StringUtils.isBlank(colProperties[i]))
					continue;
				String propertyName = colProperties[i];
				String propertyValue = row[i].getContents().trim();
				if (StringUtils.isNotBlank(propertyValue)) {

					// 通过“属性名称”获得“属性类型”
					Class propertyClass = PropertyUtils.getPropertyType(t,
							propertyName);
					// 处理java.util.Date型属性
					if (propertyClass.getName().equals(Date.class.getName())) {
						SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd");
						PropertyUtils.setProperty(t, propertyName,
								sdf.parse(propertyValue));
					}
					// 处理java.math.BigDecimal型属性
					else if (propertyClass.getName().equals(
							BigDecimal.class.getName())) {
						PropertyUtils.setProperty(t, propertyName,
								new BigDecimal(propertyValue));
					}else if(propertyClass.getName().equals(char.class.getName())){
						//专门针对20120309号的中航供应商审批意见
						if(propertyValue.equals("审核通过")){
							PropertyUtils.setProperty(t, propertyName, "2");
						}else {
							PropertyUtils.setProperty(t, propertyName, "1");
						}
					}
					// 处理其他类型
					else {
						PropertyUtils.setProperty(t, propertyName,
								propertyValue);
					}
				}
			}
		} catch (Exception e) {
			throw new FileUploadException("文件格式有误");
		}
		return t;
	}
}
