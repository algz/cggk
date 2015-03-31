package com.sysware.customize.hd.investment.engineeringProject.contractManagement.servlet;

import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectVo;




@SuppressWarnings({"unused","unchecked","deprecation"})
public class EngineeringProjectUtil {
	
	EngineeringProjectUtil(){}
	
	//导出Excel文件名
	public static final String filename = "物料总类导出Excel";
	
	
	//导出Excel 列头
	public static String[] heads = new String[] { "集团代码", "物资代码", "物资名称", "牌号", "规格型号",
									"技术条件", "标准尺寸", "计量单位", "起订量", "预警量", "计划单价", "实际单价",
									"采购周期(月)", "保管周期(月)", "备注" };
	
	
	/**
	 * wlzl导出Excel标准模板
	 * @param response
	 * @param filename
	 * @param heads
	 * @param datalist
	 */
	public void createExcelStream(HttpServletResponse response, String filename, String[] heads, List<EngineeringProjectVo> datalist) {
		int rownum = heads.length;//列数
		//HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		//HttpServletResponse response = null;//创建一个HttpServletResponse 对象
		
		try {
			OutputStream os = response.getOutputStream();
			WritableWorkbook wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(filename+"的Sheet", 0);
			//拼装需要导出的Excel列头
			for (int i = 0; i < rownum; i++) {
				Label label = new Label(i, 0, heads[i]);
				wsheet.addCell(label);
			}
			//读取List的数据 如果是List<String[]>
			/*for (int i = 0; i < datalist.size(); i++) {
				for (int j = 0; j < datalist.get(i).length; j++) {
					Label label = new Label(j, i + 1, datalist.get(i)[j]);
					wsheet.addCell(label);
				}
			}*/
			//如果是List<vo>
			for (int i = 0; i < datalist.size(); i++) {
				// 由于后台查询出来的都是vo对象,所以这里需要解开,一个个单独存放
				EngineeringProjectVo vo = datalist.get(i);
				/*Label label0 = new Label(0, i + 1, vo.getCliqueCode().equals("null") ? "" : vo.getCliqueCode());// 集团代码
				System.out.println(vo.getCliqueCode());
				wsheet.addCell(label0);
				Label label1 = new Label(1, i + 1, vo.getMaterialCode().equals("null") ? "" : vo.getMaterialCode());// 物资代码
				wsheet.addCell(label1);
				Label label2 = new Label(2, i + 1, vo.getEquipmentname().equals("null") ? "" : vo.getEquipmentname());// 物资名称
				wsheet.addCell(label2);
				Label label3 = new Label(3, i + 1, vo.getDesigntion().equals("null") ? "" : vo.getDesigntion());// 牌号
				wsheet.addCell(label3);
				Label label4 = new Label(4, i + 1, vo.getStandard().equals("null") ? "" : vo.getStandard());// 规格型号
				wsheet.addCell(label4);
				Label label5 = new Label(5, i + 1, vo.getTechniccondition().equals("null") ? "" : vo.getTechniccondition());// 技术条件
				wsheet.addCell(label5);
				Label label6 = new Label(6, i + 1, vo.getStandardSize().equals("null") ? "" : vo.getStandardSize());// 标准尺寸
				wsheet.addCell(label6);
				Label label7 = new Label(7, i + 1, vo.getDimension().equals("null") ? "" : vo.getDimension());// 计量单位
				wsheet.addCell(label7);
				Label label8 = new Label(8, i + 1, vo.getStartOrderQuantity().equals("null") ? "" : vo.getStartOrderQuantity());// 起订量
				wsheet.addCell(label8);
				Label label9 = new Label(9, i + 1, vo.getWarningvalue());// 预警量
				wsheet.addCell(label9);
				Label label10 = new Label(10, i + 1, vo.getPriceStr().equals("null") ? "" : vo.getPriceStr());// 计划单价
				wsheet.addCell(label10);
				Label label11 = new Label(11, i + 1, vo.getActualPrice().equals("null") ? "" : vo.getActualPrice());// 实际单价
				wsheet.addCell(label11);
				Label label12 = new Label(12, i + 1, vo.getProcurementCycleDate().equals("null") ? "" : vo.getProcurementCycleDate());// 采购周期(月)
				wsheet.addCell(label12);
				Label label13 = new Label(13, i + 1, vo.getReTention().equals("null") ? "" : vo.getReTention());// 保管周期(月)
				wsheet.addCell(label13);
				Label label14 = new Label(14, i + 1, vo.getRemark().equals("null") ? "" : vo.getRemark());// 备注
				wsheet.addCell(label14);
*/
			}
			
			response.setHeader("Content-disposition", "attachment;" + "filename=" + new String(filename.getBytes("GBK"), "ISO_8859_1") + ".xls");
			response.setContentType("application/vnd.ms-excel");
			wbook.write();
			wbook.close();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
