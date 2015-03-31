<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="https://ajax4jsf.dev.java.net/ajax" prefix="a4j"%>
<%@ taglib uri="http://jboss.com/products/seam/taglib" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="css/log.css" type="text/css" rel="stylesheet" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="on-cache">
<meta http-equiv="cache-control" content="on-cache">
<script type="text/javascript" src="Log.js"></script>
<script type="text/javascript"
	src="seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_LogInfoRemote"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_LogLevel3InfoRemote"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_SystemLogInfoRemote"></script>
<script type="text/javascript">

</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<div id="log_list"><c:if test="${result!=null}">
	<c:forEach items="${result}" var="info" varStatus="status">
		<div style="float: left; clear: left;"><img src="images/log.gif" /></div>
		<div id="log_box">
		<div id="log_title">&nbsp;${info.loginname } <%=session.getAttribute("resourceParam_1925")%>: ${info.messagetitle } </div>
		<div id="log_time"> ${info.messagedate }</div>
		<div id="log_brief">${info.messagebody }</div>
		<div id="log_link1">&nbsp;</div>
		<div id="log_link2"></div>
		</div>
	</c:forEach>
</c:if></div>
</body>
</html>
