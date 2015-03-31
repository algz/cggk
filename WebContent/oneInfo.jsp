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

<link rel="stylesheet" type="text/css"
	href="<%=basePath%>lib/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/file-upload.css" />
<script type="text/javascript"
	src="js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript"
	src="<%=basePath%>lib/ext/adapter/ext/ext-base.js"></script>

<script type="text/javascript" src="<%=basePath%>lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="<%=basePath%>lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript" src="js/base/FileUploadField.js"></script>
<script type="text/javascript"
	src="js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript"
	src="js/base/languagesResource/JsResource_ja.js"></script>

<script type="text/javascript" src="<%=basePath%>updateMessage.js"></script>
<script type="text/javascript" src="<%=basePath%>updateRemind.js"></script>

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
<body oncontextmenu="self.event.returnValue=false">
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
<style>
div {
	word-wrap: break-word;
	word-break: normal;
}
</style>
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
function goBack(){
    
}
function  updatemessage(messageid,messagetype){
   if('1'==messagetype){
       updateMessage.init(messageid);
    }else{
       updateRemind.init(messageid);
    }
    
}
//function replysubmit(){
 //     document.getElementById("replyForm:reply").click();
//}
</script>

<c:if test="${result==null}">
	<c:forEach items="${result}" var="info">
				${info.messagetitle }					
			</c:forEach>
</c:if>
<div><a style="font-size: 12px" href="javaScript:history.go(-1)"><%=session.getAttribute("resourceParam_450")%></a><br>
<br>


<div id="log_list"><c:if test="${result!=null}">
	<c:forEach items="${result}" var="info" varStatus="status">
		<input type="hidden" name="userid" id='userid' value="${info.userid}">
		<input type="hidden" name="loginname" id='loginname'
			value="${info.loginname }">
		<input type="hidden" name="primarykeys" id='primarykeys'
			value="${info.primarykeys}">
		<div style="float: left; clear: left;"><img src="images/log.gif" /></div>
		<div id="log_box">

		<div id="log_title">&nbsp;${info.loginname } <c:if
			test="${info.messageType>=0 and info.messageType<=3}">
			对<c:out value="${info.itemTypeName}"/>[<font color="red">${info.taskname}</font>]
		</c:if> <c:choose>
			<c:when test="${info.messageType==1}">写了一<%=session
											.getAttribute("resourceParam_539")%>日记</c:when>
			<c:when test="${info.messageType==2}"><%=session
									.getAttribute("resourceParam_1891")%></c:when>
			<c:when test="${info.messageType==3}"><%=session
									.getAttribute("resourceParam_1892")%></c:when>
			<c:when test="${info.messageType==0}"><%=session
									.getAttribute("resourceParam_1893")%></c:when>
			<c:otherwise><%=session
									.getAttribute("resourceParam_1894")%></c:otherwise>
		</c:choose> <c:if test="${info.messageShowType==1}">
			${info.messagetitle }&nbsp;<a
				href="javaScript:showPatch${info.messageid }('${info.messageid }');"><%=session.getAttribute("resourceParam_1896")%></a>
			<img src="images/pin2.png" alt="patch" width="16" height="16"
				border="0" align="absmiddle" /> &nbsp;<c:if test="${publics!=1}">
				<a
					href="javaScript:updatemessage('${info.messageid}','${info.messageType }')"><%=session
											.getAttribute("resourceParam_445")%></a>
			</c:if>
		</c:if></div>

		<div id="log_time">${info.datestr }</div>

		<div id="log_patch_list${info.messageid }"
			style="clear: both; display: none"><c:forEach
			items="${info.accessory}" var="obj">
			<a href="MessageFileDownLoadServlet?fileid=${obj.fileid }">${obj.filename
			}</a>
			<c:if test="${not empty obj.filename}">
				<a href="MessageFileDownLoadServlet?fileid=${obj.fileid }"><img src="images/patch.gif" alt="download" width="16" height="16" /></a>
			</c:if>
		</c:forEach> <!-- <a href="#"><%=session.getAttribute("resourceParam_529")%>1</a><img
			src="images/patch.gif" alt="download" width="16" height="16"
			align="absmiddle" />&nbsp;|&nbsp;<a href="#"><%=session.getAttribute("resourceParam_529")%>2</a><img
			src="images/patch2.gif" alt="download" width="16" height="16"
			align="absmiddle" />&nbsp;|&nbsp;<a href="#"><%=session.getAttribute("resourceParam_529")%>3</a><img
			src="images/patch3.gif" alt="download" width="16" height="16"
			align="absmiddle" />--></div>
		<div id="log_brief">${info.messagebody }</div>
		<c:if test="${info.messageShowType ==1}">
			<div id="log_link1"><a
				href="messagehistory.seam?messageid=${info.messageid }"><%=session.getAttribute("resourceParam_1936")%>&gt;&gt;</a></div>
			<div id="log_link2"><a id='morecontent'
				href="javascript:showReply${info.messageid}('${info.messageid}')"><span>${info.replycount}<%=session.getAttribute("resourceParam_1862")%>&nbsp;</span></a></div>
		</c:if></div>
		<!-- 	<div id="reply_area"></div> -->
		<div id="reply_area${info.messageid }"></div>
		<div><script type="text/javascript">
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
	      </script></div>
		<div>&nbsp;</div>
	</c:forEach>
</c:if></div>
<!--<form action='' id='replayForm'  target="hidden_frame" enctype='multipart/form-data' method='post'>
     <input type='file' id="file" >
     <iframe  name='hidden_frame' id='hidden_frame' style='display: none'></iframe> 
 </form>--> <!--<f:view>
 <div id='log_reply_content'>
 	<h:form enctype="multipart/form-data" id="replyForm" >
		<s:fileUpload contentType="#{logInfoAction.contentType}" fileName="#{logInfoAction.fileName}" data="#{logInfoAction.date}" id="fileuploadid"></s:fileUpload>
		<h:inputText value="#{logInfoAction.username}" id="username" ></h:inputText>
		<h:inputHidden value="#{logInfoAction.messageid}"  id="messageid"></h:inputHidden>
	    <h:inputTextarea style="width:400px; height:100px;" value="#{logInfoAction.replyContent}" id="replycontent"></h:inputTextarea> 
	    <h:commandButton value='submit'  id ='reply' action='#{logInfoAction.reply}'></h:commandButton>
		
	</h:form>
</div>
</f:view>
 --></div>
<iframe name='hidden_frame' id='hidden_frame' style='display: none'></iframe>
<script type="text/javascript">
   document.getElementById("morecontent").click();
</script>
</body>
</html>
