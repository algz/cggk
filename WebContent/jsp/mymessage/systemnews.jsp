<%@ page language="java" contentType="text/html; charset=UTF-8"
  	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title><%=session.getAttribute("resourceParam_1876")%></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript">
     function returnMain()
     {
    	//var ifr=parent.document.getElementById('ifr');
    	//ifr.location.href='mymessageMain.seam';
    	window.location.href='mymessageMain.seam';
    	//history.go(-1);
     }
  </script>
<script type="text/javascript" src="../base/base.js"></script>
<script type="text/javascript" src="../../seam/resource/remoting/interface.js?messagesystem_MessageSystemRemote"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/systemnewsGrid.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/systemnewsMain.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/systemnewsDetails.js"></script>
<script type="text/javascript" src="../../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="../../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="../../js/base/languagesResource/JsResource_ja.js"></script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
   <div style="margin:10px 90px"><%=session.getAttribute("resourceParam_1879")%>|<a href="#" style="text-decoration: none" onclick="returnMain()" ><%=session.getAttribute("resourceParam_450")%></a></div>
 <hr width="85%">
   <div id="div_systemnews" style="margin:20px 100px;"></div>

  
</body>
</html>
