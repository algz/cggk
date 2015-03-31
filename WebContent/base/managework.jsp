<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>门户工作台</title>
<!-- Include YUI utilities and Ext: -->
    <script type="text/javascript" src="../lib/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../lib/ext/ext-all-debug.js"></script>

	<script type="text/javascript" src="../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
    <!-- Include Ext stylesheets here: -->
    <link rel="stylesheet" type="text/css" href="../lib/ext/resources/css/ext-all.css">
    <link rel="stylesheet" type="text/css" href="../css/manage/menus.css">
    <link rel="stylesheet" type="text/css" href="../css/manage/managework.css">
    <link rel="stylesheet" type="text/css" href="../css/manage/grid-examples.css">
    <link rel="stylesheet" type="text/css" href="../css/manage/examples.css">
    <script type="text/javascript" src="../js/manage/managework.js"></script>
    <script type="text/javascript" src="../js/manage/datagrid.js"></script>
    <script type="text/javascript" src="../js/manage/useredit.js"></script>

</head>
<body oncontextmenu="self.event.returnValue=false" >

		<div id="north"><input type="button" id="adduser" value="<%=session.getAttribute("resourceParam_444")%>"><input type="button" id="updatauser" value="<%=session.getAttribute("resourceParam_445")%>"><%=session.getAttribute("resourceParam_443")%></div>
		
		<div id="east"></div>
		<div id="center">
			<div id="toolbar">
				
			</div>
			<div id="gridData"></div>
				
			
			
		</div>
	
<div id="adduseredit">
		
</div>
<div id="updatauseredit">
		
</div>	
</body>
</html>
