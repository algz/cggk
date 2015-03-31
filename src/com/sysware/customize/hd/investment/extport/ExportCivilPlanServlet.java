package com.sysware.customize.hd.investment.extport;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import org.jboss.seam.contexts.Lifecycle;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.util.JsonUtil;

public class ExportCivilPlanServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1977917757205630304L;

	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
	    this.doPost(request, response);
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{ 
		//导出Excel 列头
		String[] heads = new String[] { "项目编号", "费用编号", "项目名称", "项目主管", "资金来源",
										"专项名称", "状态", "建设性质", "数量","单位",
										"投资概算","单位","累计完成投资","本年预算","选址或施工地点",
										"进度要求","交付时间","使用单位","主要用途"};
		try 
		{ 
	        Lifecycle.beginCall();
			OutputStream os = response.getOutputStream();// 取得输出流   
	        response.reset();// 清空输出流   
	        response.setHeader("Content-disposition", "attachment;" + "filename=" + 
	        		new String("土建采购计划导出".getBytes("GBK"), "ISO_8859_1") + ".xls");
			response.setContentType("application/vnd.ms-excel");
	        WritableWorkbook wbook = Workbook.createWorkbook(os); // 建立excel文件   
	        String tmptitle = "土建采购计划"; // 标题   
	        WritableSheet wsheet = wbook.createSheet(tmptitle, 0); // sheet名称  
//	      	拼装需要导出的Excel列头   
	        int rownum = heads.length;//列数
	        for (int i = 0; i < rownum; i++) {
				Label label = new Label(i, 0, heads[i]);
				wsheet.addCell(label);
			}
	       List<CivilRegist> list = JsonUtil.getDTOList(new String(request.getParameter("json").getBytes("iso-8859-1"),"utf-8"), CivilRegist.class);
//			
			// 开始生成主体内容  
	        for(int i = 0; i< list.size(); i++){
	        	CivilRegist vo = list.get(i);
	        	Label label0 = new Label(0, i + 1, vo.getProjectnum());
	        	wsheet.addCell(label0);
	        	Label label1 = new Label(1, i + 1, vo.getCostnum());
	        	wsheet.addCell(label1);
	        	Label label2 = new Label(2, i + 1, vo.getProjectname());
	        	wsheet.addCell(label2);
	        	Label label3 = new Label(3, i + 1, vo.getHeadperson());
	        	wsheet.addCell(label3);
	        	Label label4 = new Label(4, i + 1, vo.getFundsource());
	        	wsheet.addCell(label4);
	        	Label label5 = new Label(5, i + 1, vo.getSpecialname());
	        	wsheet.addCell(label5);
	        	Label label6 = new Label(6, i + 1, vo.getApprovalstate());
	        	wsheet.addCell(label6);
	        	Label label7 = new Label(7, i + 1, vo.getConstructiontype());
	        	wsheet.addCell(label7);
	        	Label label8 = new Label(8, i + 1, vo.getNums());
	        	wsheet.addCell(label8);

	        	Label label9 = new Label(9, i + 1, vo.getNumsunit());
	        	wsheet.addCell(label9);
	        	Label label10 = new Label(10, i + 1, vo.getInvestmentbudget().toString());
	        	wsheet.addCell(label10);
	        	Label label11 = new Label(11, i + 1, vo.getFinanceunit());
	        	wsheet.addCell(label11);
	        	Label label12 = new Label(12, i + 1, vo.getTotalinvestmentplan());
	        	wsheet.addCell(label12);
	        	Label label13 = new Label(13, i + 1, vo.getAnnualinvestmentplan());
	        	wsheet.addCell(label13);
	        	Label label14 = new Label(14, i + 1, vo.getConstructionsite());
	        	wsheet.addCell(label14);
	        	Label label15 = new Label(15, i + 1, vo.getSchedule());
	        	wsheet.addCell(label15);
	        	Label label16 = new Label(16, i + 1, vo.getDeliverytime());
	        	wsheet.addCell(label16);
	        	Label label17 = new Label(17, i + 1, vo.getUseunit());
	        	wsheet.addCell(label17);
	        	Label label18 = new Label(18, i + 1, vo.getMainuse());
	        	wsheet.addCell(label18);
	        }
	        
			// 主体内容生成结束           
			wbook.write(); // 写入文件   
			wbook.close();  
			os.close(); // 关闭流
			Lifecycle.endCall();
		}catch(Exception e){ 
			e.printStackTrace(); 
		} 

	}
}
