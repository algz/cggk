<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="../lib/ext/resources/css/ext-all.css" />
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="../lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?mydate_MyDateRemote"></script>
<script type="text/javascript" src="../js/base/connection.js"></script>

<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?mydate_MyDateRemote"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?myLog_FeedBackInfoRemote"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_zh.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="on-cache">
<meta http-equiv="cache-control" content="on-cache">


<script type="text/javascript" src="updateDate.js"></script>

<script type="text/javascript">

</script>
<style>
.tclass .taskcss td {
	padding: 0px;
	padding-top: 1px;
	padding-bottom: 1 px;
}

.tclass td {
	padding: 5px;
	border-right: 1px solid #D4E5F6;
	border-bottom: 1px solid #D4E5F6;
	font-size: 12px;
}

.tclass table {
	border-collapse: collapse;
	border-top: 1px solid #D4E5F6;
	margin-top: -1px;
	border-left: 1px solid #D4E5F6;
}

.tclass {
	border-top: 0px solid #D4E5F6;
	border-left: 1px solid #D4E5F6;
}
</style>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<br>
<table class="tclass" width="99%" border="0" cellpadding="0"
	cellspacing="0">
	<tr align="center" bgcolor="#0066FF">
		<td width="12.5%">&nbsp;</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[0].wdate}"
			pattern="dd" />${dateList[0].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[1].wdate}"
			pattern="dd" /> ${dateList[1].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[2].wdate}"
			pattern="dd" /> ${dateList[2].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[3].wdate}"
			pattern="dd" /> ${dateList[3].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[4].wdate}"
			pattern="dd" /> ${dateList[4].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[5].wdate}"
			pattern="dd" /> ${dateList[5].cname }</td>
		<td width="12.5%"><fmt:formatDate value="${dateList[6].wdate}"
			pattern="dd" /> ${dateList[6].cname }</td>
	</tr>

	<c:forEach var="inf" items="${tlist}">
		<tr class="taskcss" align="center">
			<td>我的任务</td>
			<td>${inf.w1 }</td>
			<td>${inf.w2 }</td>
			<td>${inf.w3 }</td>
			<td>${inf.w4 }</td>
			<td>${inf.w5 }</td>
			<td>${inf.w6 }</td>
			<td>${inf.w7 }</td>
		</tr>
	</c:forEach>
	<c:forEach var="dinfo" items="${dlist}">
		<tr class="taskcss" align="center">
			<td><%=session.getAttribute("resourceParam_1938")%></td>
			<td>${dinfo.w1 }</td>
			<td>${dinfo.w2 }</td>
			<td>${dinfo.w3 }</td>
			<td>${dinfo.w4 }</td>
			<td>${dinfo.w5 }</td>
			<td>${dinfo.w6 }</td>
			<td>${dinfo.w7 }</td>
		</tr>
	</c:forEach>

</table>
</body>
</html>
