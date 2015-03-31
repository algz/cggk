<%@page import="com.sysware.edm.fileserver.stat.DataCalculate"%>
<%@page import="com.sysware.edm.fileserver.tools.SyncFS"%>
<%@page import="com.sysware.edm.fileserver.tools.Dir"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style>
BODY {
	font-family: Tahoma, Arial, sans-serif;
	color: black;
	background-color: white;
}

td.title {
	text-align: left;
	vertical-align: top;
	font-family: sans-serif, Tahoma, Arial;
	font-style: italic;
	font-weight: bold;
	background: #6699FF;
}

td.header-left {
	text-align: left;
	vertical-align: top;
	font-family: sans-serif, Tahoma, Arial;
	font-weight: bold;
	background: #6699FF;
}

th.color-type1 {
	text-align: center;
	vertical-align: top;
	font-family: sans-serif, Tahoma, Arial;
	font-weight: bold;
	background: #99CCFF;
}

th.color-type2 {
	text-align: center;
	vertical-align: top;
	font-family: sans-serif, Tahoma, Arial;
	font-weight: bold;
	background: #9999FF;
}

TD {
	text-align: center;
	vertical-align: middle;
	font-family: sans-serif, Tahoma, Arial;
	color: black;
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流量与磁盘空间统计</title>
</head>
<%
	DataCalculate dataCalculate = new DataCalculate();
	dataCalculate.processFile();
%>
<body bgcolor="white">
<img alt="" src="images/P2M_title_zh.jpg">
<hr size="2" noshade="noshade">
<br>
<table border="1" cellspacing="0" cellpadding="3">
	<tr>
		<td colspan="10" class="title">流量统计</td>
	</tr>
	<tr>
		<th class="color-type1">总数据流量(M)</th>
		<th class="color-type1">总上传数据量(M)</th>
		<th class="color-type1">总下载数据量(M)</th>
		<th class="color-type2">当天数据流量(M)</th>
		<th class="color-type2">当天上传数据量(M)</th>
		<th class="color-type2">当天下载数据量(M)</th>
		<th class="color-type1">最大上传数据量(M)</th>
		<th class="color-type1">最小上传数据量(M)</th>
		<th class="color-type2">最大下载数据量(M)</th>
		<th class="color-type2">最小下载数据量(M)</th>
	</tr>
	<tr>
		<td><%=(float) dataCalculate.getTotalDataSize() / (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getTotalUploadDataSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getTotalDownloadDataSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getDailyTotalDataSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getDailyUploadDataSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getDailyDownloadDataSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getHighestUploadSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getLowestUploadSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getHighestDownloadSize()
					/ (1024 * 1024)%></td>
		<td><%=(float) dataCalculate.getLowestDownloadSize()
					/ (1024 * 1024)%></td>
	</tr>
</table>
<br>
<br>
<br>
<br>
<table border="1" cellspacing="0" cellpadding="3">
	<tr>
		<td colspan="3" class="title">磁盘空间使用情况</td>
	</tr>
	<tr>
		<th class="color-type1">目录</th>
		<th class="color-type2">剩余空间(M)</th>
		<th class="color-type1">已用空间(M)</th>
	</tr>
<%
	SyncFS objSyncFs = new SyncFS();
	SyncFS objSyncFs1 = new SyncFS();
%>
	
<%
	int usableSize = objSyncFs.getUsableDirList().size();
	for (int i = 0; i < usableSize; i++) {
%>
	<tr>
		<td><%=objSyncFs.getUsableDirList().get(i).getDir()%></td>
		<td><%=(float) (objSyncFs.getUsableDirList().get(i).getUsableSpace() / (1024 * 1024))%></td>
		<td><%=(float) objSyncFs.getUsableDirList().get(i).getDataLength() / (1024 * 1024)%></td>
	</tr>
<%
 	}
	
	int unusableSize = objSyncFs1.getUnusableDirList().size();
	for (int i = 0; i < unusableSize; i++) {
%>
	<tr>
		<td><%=objSyncFs1.getUnusableDirList().get(i).getDir()%></td>
		<td><%=(float) (objSyncFs1.getUnusableDirList().get(i).getUsableSpace() / (1024 * 1024))%></td>
		<td><%=(float) objSyncFs1.getUnusableDirList().get(i).getDataLength() / (1024 * 1024)%></td>
	</tr>
<%
 	}
%>
</table>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<hr size="2" noshade="noshade">
<center><font size="-1" color="blue"> <em>SYSWARE
Co,.LTD. 版本2.8</em></font></center>
</body>
</html>