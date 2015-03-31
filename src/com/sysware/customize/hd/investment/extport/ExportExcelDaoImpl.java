package com.sysware.customize.hd.investment.extport;
 
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.Name;
import org.testng.log4testng.Logger;

import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo;
import com.sysware.util.PropertiesHelper;

@Name("exportExcelDaoImpl")
public class ExportExcelDaoImpl implements ExportExcelDao{
    private static Logger log = Logger.getLogger(ExportExcelDaoImpl.class);
    
	public String ExportExcel(HttpServletRequest request) {
			String className = request.getParameter("className");
	        String methodName = request.getParameter("methodName");  
		    Object obj = Component.getInstance(className);
	        Class clazz = obj.getClass();   
	        Method method = null ;
	        String filePath = null;
			try {
				 method = clazz.getDeclaredMethod(methodName,Object.class); 
				 List objList = (List)method.invoke(obj,request); 
				 PropertiesHelper proHelper = PropertiesHelper.instance("system.properties"); 
				 filePath = proHelper.getOneProperty("export_data_path")+ File.separatorChar+System.nanoTime()+".xls"; 
				 if(className.equals("admissionTestRemote")){//定制物资报表导出
					 writeMaterialsReportExcel(filePath,objList);
				 }else if(className.equals("stockPlan_Remote")){//零星采购计划报表导出
					 stockPlanToExcel(filePath,objList);
				 }else{
					 writeExcel(filePath,objList); 
				 }
			} catch (Exception e) {
				e.printStackTrace();
			}  
	        
		return filePath;
	}
	/**物资报表导出
	 * @param fileName  要生成的Excel文件名   
	*/   
	    public static void writeMaterialsReportExcel(String fileName,List objList){    
	        WritableWorkbook wwb = null;    
	      
	        try {    
	            //首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象    
	          File file = new File(fileName);
	          boolean result = true;
			  if(!file.getParentFile().exists())
			  { 
				  result = file.getParentFile().mkdirs();
			  }
			  if(result && !file.exists()){
				  file.createNewFile();
			  }
	         wwb = Workbook.createWorkbook(file);  
	         getWs(wwb,objList);
	        } catch (IOException e) {    
	            e.printStackTrace();    
	        }    
	        if(wwb!=null){    
	            //创建一个可写入的工作表    
	            //Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置  
	             try {    
	                 //从内存中写入文件中    
	                 wwb.write();    
	                 //关闭资源，释放内存    
	                 wwb.close();    
	             } catch (IOException e) {    
	                 e.printStackTrace();    
	             } catch (WriteException e) {    
	                 e.printStackTrace();    
	            }    
	         }    
	     }    
    private static void getWs(WritableWorkbook wwb,List objList){
    	// 创建一个可写入的工作表
		// Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置
		WritableSheet ws = wwb.createSheet("sheet1", 0);
		// 添加表头
		int charTitle = 10;// 标题字体大小
		int charNormal = 10;// 标题字体大小

		WritableFont titleFont = new jxl.write.WritableFont(WritableFont
				.createFont("宋体"), charTitle, WritableFont.BOLD);
		jxl.write.WritableCellFormat titleFormat = new jxl.write.WritableCellFormat(
				titleFont);
		try {
			titleFormat.setAlignment(Alignment.CENTRE); // 水平对齐
			titleFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条
			titleFormat.setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐 
			ws.mergeCells(0, 0, 7, 0); // 合并单元格
			ws.mergeCells(8, 0, 21, 0); // 合并单元格
			ws.mergeCells(0, 1, 0, 2); // 合并单元格 
			ws.mergeCells(1, 1, 1, 2); // 合并单元格
			ws.mergeCells(2, 1, 2, 2); // 合并单元格
			ws.mergeCells(3, 1, 3, 2); // 合并单元格
			ws.mergeCells(4, 1, 4, 2); // 合并单元格
			ws.mergeCells(5, 1, 5, 2); // 合并单元格
			ws.mergeCells(6, 1, 6, 2); // 合并单元格
			ws.mergeCells(7, 1, 7, 2); // 合并单元格
			ws.mergeCells(8, 1, 9, 1); // 合并单元格
			ws.mergeCells(10, 1, 12, 1); // 合并单元格
			ws.mergeCells(13, 1, 13, 2); // 合并单元格
			ws.mergeCells(14, 1, 14, 2); // 合并单元格
			ws.mergeCells(15, 1, 15, 2); // 合并单元格
			ws.mergeCells(16, 1, 16, 2); // 合并单元格
			ws.mergeCells(17, 1, 19, 1); // 合并单元格
			ws.mergeCells(20, 1, 20, 2); // 合并单元格
			ws.mergeCells(21, 1, 21, 2); // 合并单元格
			Label labelC = new Label(0, 0, "中航工业洪都", titleFormat);
			// 将生成的单元格添加到工作表中
			ws.addCell(labelC);
			Label labelC1 = new Label(8, 0, "物资检验登记", titleFormat);
			ws.addCell(labelC1);
			Label labelC2 = new Label(0, 1, "登记编号", titleFormat);
			ws.addCell(labelC2);
			Label labelC3 = new Label(1, 1, "供应商", titleFormat);
			ws.addCell(labelC3);
			Label labelC4 = new Label(2, 1, "编码", titleFormat);
			ws.addCell(labelC4);
			Label labelC5 = new Label(3, 1, "名称", titleFormat);
			ws.addCell(labelC5);
			Label labelC6 = new Label(4, 1, "牌号", titleFormat);
			ws.addCell(labelC6);
			Label labelC7 = new Label(5, 1, "规格", titleFormat);
			ws.addCell(labelC7);
			Label labelC8 = new Label(6, 1, "技术条件", titleFormat);
			ws.addCell(labelC8);
			Label labelC9 = new Label(7, 1, "单位", titleFormat);
			ws.addCell(labelC9);
			Label labelC10 = new Label(8, 1, "发票", titleFormat);
			ws.addCell(labelC10);
			Label labelC11 = new Label(8, 2, "号码", titleFormat);
			ws.addCell(labelC11);
			Label labelC12 = new Label(9, 2, "数量", titleFormat);
			ws.addCell(labelC12);
			Label labelC13 = new Label(10, 1, "运输情况", titleFormat);
			ws.addCell(labelC13);
			Label labelC14 = new Label(10, 2, "日期", titleFormat);
			ws.addCell(labelC14);
			Label labelC15 = new Label(11, 2, "运单号", titleFormat);
			ws.addCell(labelC15);
			Label labelC16 = new Label(12, 2, "件数", titleFormat);
			ws.addCell(labelC16);
			Label labelC17 = new Label(13, 1, "炉批号", titleFormat);
			ws.addCell(labelC17);
			Label labelC18 = new Label(14, 1, "取样", titleFormat);
			ws.addCell(labelC18);
			Label labelC19 = new Label(15, 1, "试验报告", titleFormat);
			ws.addCell(labelC19);
			Label labelC20 = new Label(16, 1, "打钢印", titleFormat);
			ws.addCell(labelC20);
			Label labelC21 = new Label(17, 1, "入库", titleFormat);
			ws.addCell(labelC21);
			Label labelC22 = new Label(17, 2, "日期", titleFormat);
			ws.addCell(labelC22);
			Label labelC23 = new Label(18, 2, "单号", titleFormat);
			ws.addCell(labelC23);
			Label labelC24 = new Label(19, 2, "数量", titleFormat);
			ws.addCell(labelC24);
			Label labelC25 = new Label(20, 1, "待入库数量", titleFormat);
			ws.addCell(labelC25);
			Label labelC26 = new Label(21, 1, "到货时间", titleFormat);
			ws.addCell(labelC26);
			 // 用于正文
		    WritableFont normalFont = new WritableFont(WritableFont
		      .createFont("宋体"), charNormal);
		    jxl.write.WritableCellFormat normalFormat = new jxl.write.WritableCellFormat(
		      normalFont);
		    normalFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条
		    normalFormat.setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐
		    normalFormat.setAlignment(Alignment.CENTRE);// 水平对齐
		    normalFormat.setWrap(true); // 是否换行
		    Object[] ob = null;
		    Label labelC0 = null;
		    //下面开始添加单元格    
            for(int i=0;i<objList.size();i++){   
            	ob = (Object[]) objList.get(i);
               for(int j=0;j<22;j++){    
                    //这里需要注意的是，在Excel中，第一个参数表示列，第二个表示行    
//            	    if(j==0)
//            	    labelC0 = new Label(0, i+3, String.valueOf(i+1),normalFormat);\
            	    
                    labelC = new Label(j, i+3, ob[j] == null||ob[j].equals("") ? "" : ob[j].toString(),normalFormat);    
                    try {    
                       //将生成的单元格添加到工作表中 
//                    	if(j==0)
//                       ws.addCell(labelC0);   
                       ws.addCell(labelC);    
                    } catch (RowsExceededException e) {    
                    	e.printStackTrace();    
                   } catch (WriteException e) {    
                         e.printStackTrace();    
                   }     
    
                 }    
             }    
		}catch(Exception e){
			
		} 
    }
	/**生成一个Excel文件   
	 * @param fileName  要生成的Excel文件名   
	*/   
	    @SuppressWarnings("unchecked")
		public static void writeExcel(String fileName,List objList){    
	        WritableWorkbook wwb = null;    
	        List<Object[]> valueList = (List<Object[]>) objList.get(0);
   	        String[] nameList =  (String[]) objList.get(1);
	        try {    
	            //首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象    
	          File file = new File(fileName);
	          boolean result = true;
			  if(!file.getParentFile().exists())
			  { 
				  result = file.getParentFile().mkdirs();
			  }
			  if(result && !file.exists()){
				  file.createNewFile();
			  }
	         wwb = Workbook.createWorkbook(file);    
	        } catch (IOException e) {    
	            e.printStackTrace();    
	        }    
	        if(wwb!=null){    
	            //创建一个可写入的工作表    
	            //Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置    
	            WritableSheet ws = wwb.createSheet("sheet1", 0);    
	            Label labelC = null;
	            //添加表头
	            for(int j=0;j<nameList.length;j++){      
                    labelC = new Label(j, 0, nameList[j]);    
                    try {    
                       //将生成的单元格添加到工作表中    
                       ws.addCell(labelC);    
                    } catch (RowsExceededException e) {    
                    	e.printStackTrace();    
                   } catch (WriteException e) {    
                         e.printStackTrace();    
                   }     
    
                 }    
	            //下面开始添加单元格    
	            for(int i=0;i<valueList.size();i++){     
	               for(int j=0;j<nameList.length;j++){    
	                    //这里需要注意的是，在Excel中，第一个参数表示列，第二个表示行 
	            	   if(valueList.get(i)[j]==null){
	            		   continue;
	            	   }
	            	   labelC = new Label(j, i+1, ((Object[])  valueList.get(i))[j].toString());
//	                    labelC = new Label(j, i+1, ((String[])  valueList.get(i))[j]);    
	                    try {    
	                       //将生成的单元格添加到工作表中    
	                       ws.addCell(labelC);    
	                    } catch (RowsExceededException e) {    
	                    	e.printStackTrace();    
	                   } catch (WriteException e) {    
	                         e.printStackTrace();    
	                   }     
	    
	                 }    
	             }    
	    
	             try {    
	                 //从内存中写入文件中    
	                 wwb.write();    
	                 //关闭资源，释放内存    
	                 wwb.close();    
	             } catch (IOException e) {    
	                 e.printStackTrace();    
	             } catch (WriteException e) {    
	                 e.printStackTrace();    
	            }    
	         }    
	     }    

	    /**生成一个Excel文件   
		 * @param fileName  要生成的Excel文件名   
	     * @throws WriteException 
	     * @throws RowsExceededException 
		*/   
		    @SuppressWarnings("unchecked")
			public static void stockPlanToExcel(String fileName,List objList) throws RowsExceededException, WriteException{    
		        WritableWorkbook wwb = null; 
		        PlandraftVo plan=(PlandraftVo)objList.get(0);
		        List<Object[]> valueList = (List<Object[]>) objList.get(1);
		        
		        String[] nameList ={"序号","物资编码","产品名称","型号/牌号","规格","技术条件","计量单位","申请数量","建议采购量","需用时间","用途","任务编号","备注"};
		        try {    
		            //首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象    
		          File file = new File(fileName);
		          boolean result = true;
				  if(!file.getParentFile().exists())
				  { 
					  result = file.getParentFile().mkdirs();
				  }
				  if(result && !file.exists()){
					  file.createNewFile();
				  }
		         wwb = Workbook.createWorkbook(file);    
		        } catch (IOException e) {    
		            e.printStackTrace();    
		        }    
		        if(wwb!=null){    
		            //创建一个可写入的工作表    
		            //Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置    
		            WritableSheet ws = wwb.createSheet(plan.getPlant(), 0);    
		            Label labelC = null;
		            
		           //设置 行、 列的 宽度 、高度
	               ws.setColumnView(0, 5); // 设置列的宽度
	               ws.setColumnView(1, 16); // 设置列的宽度
	               ws.setColumnView(2, 12); // 设置列的宽度
	               ws.setColumnView(3, 12); // 设置列的宽度
	               ws.setColumnView(4, 12); // 设置列的宽度
	               ws.setColumnView(5, 18); // 设置列的宽度
	               ws.setColumnView(6, 12); // 设置列的宽度
	               ws.setColumnView(7, 8); // 设置列的宽度
	               ws.setColumnView(8, 10); // 设置列的宽度
	               ws.setColumnView(9, 12); // 设置列的宽度
	               ws.setColumnView(10, 18); // 设置列的宽度
	               ws.setColumnView(11, 16); // 设置列的宽度
	               ws.setColumnView(12, 35); // 设置列的宽度
	               
	               
		    		//定义格式
		    		int charTitle = 11;// 标题字体大小
		    		WritableFont titleFont = new jxl.write.WritableFont(WritableFont
		    				.createFont("宋体"), charTitle, WritableFont.BOLD);
		    		jxl.write.WritableCellFormat titleFormat = new jxl.write.WritableCellFormat(titleFont);
		    		titleFormat.setAlignment(Alignment.CENTRE); // 水平对齐
		    		titleFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条
		    		titleFormat.setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐 
		    		
		    		// 添加表头
		            ws.mergeCells(0, 0, 11, 0); // 合并单元格
					labelC = new Label(0, 0, "物资需求计划通知单", titleFormat);
					ws.addCell(labelC);
					
					ws.mergeCells(9, 1, 11, 1); // 合并单元格
					labelC = new Label(9, 1, "一式(  )份,共(  )页第(  )页");
					ws.addCell(labelC);
					
					ws.mergeCells(0, 2, 3, 2); // 合并单元格
					labelC = new Label(0, 2, "填报:物资供应部");
					ws.addCell(labelC);
					
					ws.mergeCells(4, 2, 7, 2); // 合并单元格
					labelC = new Label(4, 2, "编号:"+plan.getPlant());
					ws.addCell(labelC);
					
					ws.mergeCells(8, 2, 11, 2); // 合并单元格
					labelC = new Label(8, 2, "通知日期:  年   月   日");
					ws.addCell(labelC);
					
		            //添加表头
		            for(int j=0;j<nameList.length;j++){      
	                    labelC = new Label(j, 3, nameList[j]);    
	                    try {    
	                       //将生成的单元格添加到工作表中    
	                       ws.addCell(labelC);    
	                    } catch (RowsExceededException e) {    
	                    	e.printStackTrace();    
	                   } catch (WriteException e) {    
	                         e.printStackTrace();    
	                   }     
	                 }    
		            
		            //添加单元格    
					jxl.write.WritableCellFormat BorderLineFormat = new jxl.write.WritableCellFormat();
					BorderLineFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条
		            for(int i=0;i<valueList.size();i++){     
		               for(int j=0;j<nameList.length;j++){    
		                    //这里需要注意的是，在Excel中，第一个参数表示列，第二个表示行    
		            	  labelC = new Label(j, i+4, valueList.get(i)[j]==null?"":((Object[])  valueList.get(i))[j].toString(),BorderLineFormat); 
		            	   try {    
		                       //将生成的单元格添加到工作表中    
		                       ws.addCell(labelC);    
		                    } catch (RowsExceededException e) {    
		                    	e.printStackTrace();    
		                   } catch (WriteException e) {    
		                         e.printStackTrace();    
		                   }     
		    
		                 }    
		             }    
		    
		            //添加页脚
		            int col=valueList.size();
		            ws.mergeCells(0, col+4, 2, col+4); // 合并单元格
					labelC = new Label(0, col+4, "领导:");
					ws.addCell(labelC);
		            
		            ws.mergeCells(3, col+4, 5, col+4); // 合并单元格
					labelC = new Label(3, col+4, "主任:");
					ws.addCell(labelC);
					
		            ws.mergeCells(6, col+4, 8, col+4); // 合并单元格
					labelC = new Label(6, col+4, "组长:");
					ws.addCell(labelC);
					
		            ws.mergeCells(9, col+4, 11, col+4); // 合并单元格
					labelC = new Label(9, col+4, "计划员:");
					ws.addCell(labelC);
					
		            ws.mergeCells(9, col+5, 11, col+5); // 合并单元格
					labelC = new Label(9, col+5, "综合采购部接收人员签字:");
					ws.addCell(labelC);
					
		             try {    
		                 //从内存中写入文件中    
		                 wwb.write();    
		                 //关闭资源，释放内存    
		                 wwb.close();    
		             } catch (IOException e) {    
		                 e.printStackTrace();    
		             } catch (WriteException e) {    
		                 e.printStackTrace();    
		            }    
		         }    
		     }    

	    
}
