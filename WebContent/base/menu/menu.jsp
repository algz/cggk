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
<link rel="stylesheet" type="text/css" href="../../js/base/menu/column-tree.css" />
<script type="text/javascript" src="../../js/base/menu/menu.js"></script>
<script type="text/javascript" src="../../js/base/menu/addmenu.js"></script>
<script type="text/javascript" src="../../js/base/menu/deletemenu.js"></script>
<script type="text/javascript" src="../../js/base/menu/updatamenu.js"></script>	
<script type="text/javascript" src="../../js/base/menu/ColumnNodeUI.js"></script>		
</head>

<body oncontextmenu="self.event.returnValue=false" >
<div id="menu-add"></div>
<div id="menu-updata"></div>
<div id="menu-delete"></div>
<div id="menu_panel"></div>
<div id="addmenu_panel"></div>
<div id="updatamenu_panel"></div>
<div id="deletemenu_panel"></div>
<div id="border"></div>
</body>
</html>
