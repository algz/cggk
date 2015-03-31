<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>

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
	src="seam/resource/remoting/interface.js?myLog_LogLevel2InfoRemote"></script>

</head>
<body oncontextmenu="self.event.returnValue=false" >

<textarea rows="10" cols="70" name="templevel3" id="templevel3"
	style="display: none"></textarea>
<textarea rows="10" cols="70" name="testarea" id="testarea"
	style="display: none"></textarea>
<textarea rows="10" cols="70" id="newLevel2MessageId"
	style="display: none"></textarea>
<input name="currMessageId" id='currMessageId' type="hidden">
<input name="tempnewid" id='tempnewid' type="hidden">
<input name="tempnewfileid" id='tempnewfileid' type="hidden">

<s:remote include="myLog_LogInfoRemote"></s:remote>
<script language="JavaScript">

var display = true;
var patch_display = true;
function showReply(messageid) { //v9.0
       document.getElementById('currMessageId').value=messageid;
      // document.getElementById('replyForm:messageid').value=messageid;
       getLogLevel2(messageid);
	  if(display)
	  { document.getElementById("reply_area"+messageid).style.display = "block"; display = false;}
	  else  
	  { document.getElementById("reply_area"+messageid).style.display = "none"; display = true;}
	  
}
function showPatch() { 
      
	  if(patch_display)
	  { document.getElementById("log_patch_list").style.display = "block"; patch_display = false;}
	  else  
	  { document.getElementById("log_patch_list").style.display = "none"; patch_display = true;}
	  
}
//function replysubmit(){
 //     document.getElementById("replyForm:reply").click();
//}
</script>


<div><a style="font-size: 12px" href="javaScript:history.go(-1)"><%=session.getAttribute("resourceParam_450")%></a><br>
<br>


<div id="log_list"><c:forEach items="${history}" var="info"
	varStatus="status">
	<input type="hidden" name="userid" id='userid' value="${info.userid}">
	<input type="hidden" name="loginname" id='loginname'
		value="${info.loginname }">
	<input type="hidden" name="primarykeys" id='primarykeys'
		value="${info.primarykeys}">
	<div style="float: left; clear: left;"><img src="images/log.gif" /></div>
	<div id="log_box">
	<div id="log_title">&nbsp; ${info.loginname } 对<%=session.getAttribute("resourceParam_1864")%>[<font
		color="red">${taskName}</font>] <c:if test="${info.messageType=='1'}"><%=session.getAttribute("resourceParam_1890")%></c:if>
	<c:if test="${info.messageType=='3'}"><%=session.getAttribute("resourceParam_1892")%></c:if>
	${info.messagetitle} &nbsp;<a
		href="javaScript:showPatch${info.messageid }('${info.messageid }');"><!--<%=session.getAttribute("resourceParam_1896")%>  --></a>
	<!--	<img src="images/pin2.png" alt="patch" width="16" height="16"	border="0" align="absmiddle" />-->
	</div>

	<div id="log_time">${info.datestr }</div>

	<div id="log_patch_list${info.messageid }"
		style="clear: both; display: none"><c:forEach
		items="${info.accessory}" var="obj">
		<a href="MessageFileDownLoadServlet?fileid=${obj.fileid }">${obj.filename}</a>
		<c:if test="${not empty obj.filename}">
			<a href="MessageFileDownLoadServlet?fileid=${obj.fileid }"><img src="images/patch.gif" alt="download" width="16" height="16" /></a>
		</c:if>
	</c:forEach></div>
	<div>${info.messagebody }</div>
	<div style="padding-left: 0px"><%=session.getAttribute("resourceParam_1899")%>:${info.updateReason
	}</div>

	<script type="text/javascript">
			           var display${info.messageid} = true;
					   var patch_display${info.messageid} = true;
			           function showReply${info.messageid}(messageid) { //v9.0
						       document.getElementById('currMessageId').value=messageid;
						      // document.getElementById('replyForm:messageid').value=messageid;
						       getLogLevel2(messageid);
							  if(display${ info.messageid})
							  { document.getElementById("reply_area"+messageid).style.display = "block"; display${ info.messageid} = false;}
							  else  
							  { document.getElementById("reply_area"+messageid).style.display = "none"; display${ info.messageid} = true;}
							  
						}
			            function showPatch${info.messageid}(messageid) { 
		      
							  if(patch_display${info.messageid})
							  { document.getElementById("log_patch_list"+messageid).style.display = "block"; patch_display${info.messageid} = false;}
							  else  
							  { document.getElementById("log_patch_list"+messageid).style.display = "none"; patch_display${info.messageid} = true;}
							  
						}
			      </script>
	<div>&nbsp;</div>
	</div>
</c:forEach></div>

<iframe name='hidden_frame' id='hidden_frame' style='display: none'></iframe>
</body>
</html>
