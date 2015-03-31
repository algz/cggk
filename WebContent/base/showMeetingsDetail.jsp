<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.io.*"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache,must-revalidate">
<meta http-equiv="Expires" content="0">
<script type="text/javascript" src="../js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/interface.js?km_dictInstanceRemote&km_fileInstanceRemote&km_searchRemote&meetings_meetingssvr"></script>
</head>
<%
	String id=request.getParameter("ID");
	String realPath=request.getRealPath("/");
	String basePath=request.getContextPath();
	String htmlPath=realPath+"tempDict/portal/meetings/html/"+id+".html";
	File file=new File(htmlPath);
	if(file.exists()){
		pageContext.forward("../tempDict/portal/meetings/html/"+id+".html");
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
Seam.Component.getInstance("meetings_meetingssvr").getMeetingsByid(Id, function(result){
	$("#title").empty().append(result.title);
	$("#border").css("display","block");
	$("#content").empty().append("会议内容：<br/>").append(result.content);
	$("#title2").empty().append(result.pbudatestr).append("&nbsp;&nbsp;&nbsp;").append(result.authorname).append("&nbsp;&nbsp;&nbsp;").append(result.createDepname);
	$("#organizer").empty().append("组织机构：").append(result.depname);
	$("#meetingsDetail").empty().append("开会日期：").append(result.riqi).append("&nbsp;&nbsp;&nbsp;").append("开会地点：").append(result.place);
	
});

</script>
<body>

	<div id="main">
	</div>
	<div id="load">正在加载,请稍后...</div>
	<div style="font-size:20pt;text-align:center;"><span id="title"></span></div>
	<div style="display:none;border-bottom:1px solid #ccc;padding-top:20px;" id="border"></div>
	<div id="title2" style='text-align: center;line-height: 9px;font-size: 11px;padding-top: 5px;'></div>
	<div style="line-height: 5px;margin: 10px 0px 40px 40px;font-weight: normal;text-align: left;"id="meetingsDetail"> </div>
	<div style="line-height: 5px;margin: 0px 0px 40px 40px;font-weight: normal;text-align: left;"id="organizer"> </div>
	<div id="content">
	
	</div>
</body>
</html>
