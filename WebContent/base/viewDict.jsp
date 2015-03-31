<%@ page language="java" contentType="text/html; charset=GBK" import="java.io.*"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html;charset=GBK">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache,must-revalidate">
<meta http-equiv="Expires" content="0">
<script type="text/javascript" src="../js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/interface.js?km_dictInstanceRemote&km_fileInstanceRemote&km_searchRemote"></script>
</head>

<%
	String id=request.getParameter("ID");
	String realPath=request.getRealPath("/");
	String basePath=request.getContextPath();
	String htmlPath=realPath+"jsp/edm/knowledge/dict/html/"+id+".html";
	File file=new File(htmlPath);
	if(file.exists()){
		pageContext.forward("../jsp/edm/knowledge/dict/html/"+id+".html");
		out.clear();
		out=pageContext.pushBody();
	}
%>
<script type="text/javascript">
Seam.Remoting.displayLoadingMessage = function() {
	$("#load").toggle();
}
Seam.Remoting.hideLoadingMessage = function() {
	$("#load").toggle();
}
var Id="<%=id%>";
Seam.Component.getInstance("km_dictInstanceRemote").getById(Id, function(result){
    window.location.href=window.location.href;
});

</script>
<body>

<div id="main"></div>
	<div id="load">正在加载,请稍后...</div>
	<div style="font-size:20pt;text-align:center;"><span id="title"></span></div>
	<div style="display:none;border-bottom:1px solid #ccc;padding-top:20px;" id="border"></div>
	<div style="" id="content"></div>
</body>
</html>
