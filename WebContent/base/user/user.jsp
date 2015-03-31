<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<link rel="stylesheet" type="text/css" href="../../lib/ext/resources/css/ext-all.css" />
<script language="javascript"  type="text/javascript" src="../../lib/ext/adapter/ext/ext-base.js"></script>
<script language="javascript"  type="text/javascript" src="../../lib/ext/ext-all.js"></script>
<script language="javascript"  type="text/javascript" src="../../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script language="javascript"  type="text/javascript" src="../../lib/ext/package/form/form.js"></script>
<link rel="stylesheet" type="text/css" href="forum.css" />
<script type="text/javascript" src="../../js/base/gridData.js"></script>
<script type="text/javascript" src="../../js/base/MyGrid.js"></script>
<script type="text/javascript" src="../../js/base/user/user.js"></script>
<script type="text/javascript" src="../../js/base/user/adduser.js"></script>
<script type="text/javascript" src="../../js/base/user/deleteuser.js"></script>
<script type="text/javascript" src="../../js/base/user/finduser.js"></script>
<script type="text/javascript" src="../../js/base/user/updatauser.js"></script>	
<script type="text/javascript" src="../../js/base/user/updatarole.js"></script>	
<script type="text/javascript" src="../../js/push/CheckColumn.js"></script>		
</head>

<body oncontextmenu="self.event.returnValue=false" >
<div id="user_panel"></div>
<div id="adduser_panel"></div>
<div id="updatauser_panel"></div>
<div id="finduser_panel"></div>
<div id="deleteuser_panel"></div>
<div id="updatarole_panel"></div>
</body>
</html>
