package com.sysware.customize.hd.investment.util;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import jxl.demo.Write;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

public class WordUtil {   
	private int mark = 0;
	/**
	 * 生成WORD模板
	 * 
	 * @param response
	 *            HttpServletResponse对象
	 * @param url
	 *            String word模板转换的XML位置
	 * @param map
	 *            HashMap 用来替换模板中的占位符。 KEY 存的是占位符 VALUE要替换的值
	 * @param wordName
	 *            String 保存WORD文档的名字
	 * return 返回Document对象
	 */
	public Document selWord(String url,ArrayList<ArrayList<String>> contentList) { 
		SAXBuilder builder = new SAXBuilder(false);
		Document doc = null;
		try {
			int tbl_index = Integer.parseInt(contentList.get(3).get(0));
			int tr_index = Integer.parseInt(contentList.get(3).get(1));
			int cpIndex = 4;
			doc = builder.build(new File(url)); // 从URL中取得DOCUMENT对象
			Element root = doc.getRootElement(); // 获得根节点
			List list = root.getChildren(); // 得到根节点的所有子节点 
			Element table = null;
			
//			if(list1.size()>0){
//				if(url.indexOf("劳保用品采购合同范本评审稿")!=-1 || url.indexOf("订单采购-电脑范例合同范本定稿")!=-1)
//					cpIndex = 5;
			if(url.indexOf("实物采购合同模板")!=-1){
				cpIndex = 5;
			}
			for(int i=1;i<Integer.parseInt(contentList.get(2).get(0));i++){
				ArrayList<Element> list1 = new ArrayList<Element>();
				getResult(list,contentList,0,0,list1,0,tbl_index,tr_index,0,null);
				table = list1.get(0);
				table.addContent(cpIndex,list1.get(1));
			}
//			}
			getResult(list,contentList,0,0,null,0,tbl_index,tr_index,0,"♂");
			getResult(list,contentList,0,0,null,1,tbl_index,tr_index,0,"♀");
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return doc;
	} 
	/**
	 * 遍历节点的递归方法
	 * 
	 * @param list
	 *            子节点的集合 递归遍历，到T标签位置
	 */
	public int getResult(List list,ArrayList<ArrayList<String>> contentList,int index,int tr_count,ArrayList<Element> list1,
			int list_index,int tbl_index,int tr_index,int tbl_count,String replaceName) {
		String text = null;  
		for (int i = 0 ; i<list.size(); i++) {
			Element ite = (Element) list.get(i);  
			if (ite.getName().equals("t") && list1==null) { 
				text = ite.getText().trim();
				if(text.indexOf(replaceName)!=-1 && index<contentList.get(list_index).size()) 
				{
					text = text.replace(text, contentList.get(list_index).get(index)==null?"":contentList.get(list_index).get(index));//替换占位符
					index++;  
				} 
				ite.removeContent();
				ite.addContent(text);  
			}
			else {
				if(ite.getName().equals("tbl") && list1!=null)
				{
					if(tbl_count==tbl_index)
						list1.add(ite);
					tbl_count++;
				}
				else if (ite.getName().equals("tr") && list1!=null){ 
					if(tr_count>tr_index && list1.size()==1){  
						list1.add((Element)ite.clone()); 
					}
					tr_count++;
				}  
				index = getResult(ite.getChildren(),contentList,index,tr_count,list1,list_index,tbl_index,tr_index,tbl_count,replaceName);
			} 
		}
	    return index;
	} 
	 
}
