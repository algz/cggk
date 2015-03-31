<%--  此段代码 目前被引用的地方：
1.知识库的添加词条
--%>
<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="net.fckeditor.*" %>
<%@ taglib uri="/WEB-INF/FCKeditor.tld" prefix="FCK" %>
<%
String param=request.getParameter("height");
String content=request.getParameter("content");
    if(content==null)content="";
int height=200;
if(param!=null){
	try{
		height=Integer.parseInt(param);
	}catch(Exception e){}
}
	if(height<200)height=200;
 String fckHeight=String.valueOf(height);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	</head>
	<body>
		<FCK:editor instanceName="dictContent" height="<%=fckHeight %>">
				<jsp:attribute name="value">
                          <%=content%>
				</jsp:attribute>
			</FCK:editor>
	</body>
</html>