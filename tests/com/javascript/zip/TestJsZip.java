package com.javascript.zip;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;
import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.Test;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.luck.itumserv.DataCenter.Guid;
import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

public class TestJsZip {

	private String basePath = "WebContent";
	private String gzjsDirPath = "WebContent/gzjs";
	private String inputJSPath = "WebContent/js/base/inputJS.js";
	private int linebreakpos = -1;
	private boolean munge = true;
	private boolean verbose = false;
	private boolean disableOptimizations = false;
	
	@Test
	public void compressSourceFile(){
		try {
			revertFiles();
			mergeJs();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void revertFiles() {
		File bakInputJs = new File(inputJSPath + ".bak");
		File gzjsDir = new File(gzjsDirPath);
		
		if(gzjsDir.isDirectory()) {
			File[] files = gzjsDir.listFiles();
			for(File file : files) {
				file.delete();
			}
			gzjsDir.delete();
		}
		
		if(bakInputJs.isFile()) {
			File inputGzjs = new File(inputJSPath);
			inputGzjs.delete();
			
			bakInputJs.renameTo(new File(inputJSPath));
		}
	}
	
	/**
	 * 创建inputGZJS.js代替原有的inputJS.js
	 * @param strInputGzjs
	 * @throws IOException
	 */
	public void createInputGzjs(String strInputGzjs) throws IOException {
		File inputGzjs = new File(inputJSPath);
		inputGzjs.createNewFile();
		Writer out = new FileWriter(inputGzjs);
		out.write(strInputGzjs);
		out.close();
	}
	
	/**
	 * 创建压缩后的js文件目录
	 */
	private File createGzjsDir() throws IOException {
		File gzjsDir = new File(gzjsDirPath);
		if(!gzjsDir.isDirectory()) {
			gzjsDir.mkdir();
		}
		return gzjsDir;
	}
	
	/**
	 * 将inputJS.js文件中的键值对封装成JSONObject，key为模块名，value为js数组
	 * @return
	 * @throws IOException
	 */
	private JSONObject getInputJsArray() throws IOException {
		File inputJs = new File(inputJSPath);
		if(!inputJs.isFile()) {
			inputJs.createNewFile();
		}
		inputJs.renameTo(new File(inputJSPath + ".bak"));
		
		File bakInputJs = new File(inputJSPath + ".bak");
		Reader reader = null;
		reader = new InputStreamReader(new FileInputStream(bakInputJs));
		char[] tempchars = new char[1024];
		int count;
		
		StringBuffer sb = new StringBuffer("");
		while((count = reader.read(tempchars)) != -1) {
			if(count == tempchars.length) {
				sb.append(String.copyValueOf(tempchars));
			} else {
				sb.append(String.copyValueOf(tempchars, 0, count));
			}
		}
		
		JSONObject obj = JSONObject.fromObject(sb.toString().substring(9)); // 将inputJS.js中的“inputJS = ”去掉
		reader.close();
		return obj;
	}
	
	/**
	 * 在gzjs目录下创建js，一个应用一个js，将一个应用所有的js压缩后全部添加到这一个js中
	 * @throws Exception 
	 */
	private void mergeJs() throws Exception {
		createGzjsDir();
		JSONObject obj = getInputJsArray();
		Iterator<String> it = obj.keys();
		while(it.hasNext()) {
			String appName = it.next();
			String endfix = ".js";
			if(appName.equals("center_css")) {
				endfix = ".css";
				continue;
			}
			// 表单类型的js压缩后会有问题，暂时不进行压缩
			if(appName.equals("formType")) { 
				JSONArray jsArray = obj.getJSONArray(appName);
				JSONArray newArray = new JSONArray();
				for(int i = 0; i < jsArray.size(); i ++) {
					String jsUrl = jsArray.get(i).toString();
					if(!jsUrl.startsWith("../seam/")) {
						jsUrl += "?v=" + Guid.getGuid();
					}
					newArray.add(jsUrl);
				}
				obj.put("formType", newArray);
				continue;
			}
			File appJs = new File(this.gzjsDirPath + "/" + appName + endfix);
			appJs.createNewFile();
			
			JSONArray jsArray = obj.getJSONArray(appName);
			if(appName.equals("center_js")) {
				jsArray.add("../js/base/returnNoError.js");
			}
			JSONArray newArray = new JSONArray();
			for(int i = 0; i < jsArray.size(); i ++) {
				String jsUrl = jsArray.get(i).toString();
				if(jsUrl.startsWith("../seam/")) {
					newArray.add(jsUrl);
					continue;
				} else {
					jsUrl = jsUrl.substring(2);
					jsUrl = basePath + jsUrl;
					File js = new File(jsUrl);
					if(js.isFile()) {
						mergeJs(js, appJs);
					}
					jsArray.remove(i);
					i--;
				}
			}
			newArray.add("../gzjs/" + appName + endfix + "?v=" + Guid.getGuid());
			obj.put(appName, newArray);
			System.out.println("功能" + appName + "压缩成功！");
			System.out.println(jsArray.toString());
			System.out.println();
		}
		System.out.println("inputJS全部压缩成功！");
		System.out.println("inputJS = " + obj.toString());
		
		createInputGzjs("inputJS = " + obj.toString());
	}

	/**
	 * 将原有js去掉空格及注释后追加到新创建的js中
	 * @param sourceFile
	 * @param targetFile
	 * @throws Exception
	 */
	private void mergeJs(File sourceFile, File targetFile) throws Exception{
		String fileName = sourceFile.getName();
		if (fileName.endsWith(".js") == false && fileName.endsWith(".css") == false) {
			return;
		}
		Reader in = new FileReader(sourceFile);
		String filepath = sourceFile.getAbsolutePath();
		
		System.out.println("正在压缩：" + filepath);
		Writer out = new FileWriter(targetFile, true);

		if (fileName.endsWith(".js")) {
			JavaScriptCompressor jscompressor = new JavaScriptCompressor(in, new ErrorReporter() {
				public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
					if (line < 0) {
						System.err.println("\n[ERROR] " + message);
						return;
					} else {
						System.err.println("\n[ERROR] " + sourceName + "line: " + line + " index: " + lineOffset + " : " + message);
						return;
					}
				}

				public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
					error(message, sourceName, line, lineSource, lineOffset);
					return new EvaluatorException(message);
				}

				public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
					if (line < 0) {
						System.err.println("\n[WARNING] " + message);
					} else {
						System.err.println("\n[ERROR] " + sourceName + "line: " + line + " index: " + lineOffset + " : " + message);
						return;
					}
				}
			});
			jscompressor.compress(out, linebreakpos, munge, verbose, disableOptimizations, disableOptimizations);
		} else if (fileName.endsWith(".css")) {
			CssCompressor csscompressor = new CssCompressor(in);
			csscompressor.compress(out, linebreakpos);
		}
		out.close();
		in.close();
	}
}

