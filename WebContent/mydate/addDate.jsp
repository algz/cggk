<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://jboss.com/products/seam/taglib" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="../lib/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript" src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="../lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../lib/ext/ext-all.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="../seam/resource/remoting/interface.js?mydate_MyDateRemote"></script>
<script type="text/javascript" src="../js/base/connection.js"></script>
<script type="text/javascript" src="../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript" src="mydate.js"></script>
<SCRIPT type="text/javascript">
     function workcal(selectedDate){
         parent.changeSrc(selectedDate);
      } 
</SCRIPT>
</head>
<body oncontextmenu="self.event.returnValue=false" >
</body>
</html>
