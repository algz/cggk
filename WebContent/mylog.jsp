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
<%
	String userid = "";
	String username = "";
	Cookie[] cooke = request.getCookies();

	for (int i = 0; i < cooke.length; i++) {
		Cookie ck = cooke[i];
		if ("userid".equals(ck.getName())) {
			userid = ck.getValue();
		}
		if ("jforumUserName".equals(ck.getName())) {
			username = ck.getValue();
		}
	}
%>
<script type="text/javascript">
   function changeInfo(type){
      
       var temp=document.getElementsByName("mtype");
       var typeStr=""; 
       for(var i=0;i<temp.length;i++){
           if (temp[i].checked){
               typeStr+=temp[i].value+',';
           }
       }
       
      
       var infoFrame=document.getElementById("infoFrame");
       if(""!=typeStr){
       		infoFrame.src="logInfo.seam?userId=<%=userid %>"+"&typeStr="+typeStr;
       }else {
            infoFrame.src="logInfo.seam?userId=<%=userid %>"+"&typeStr=1,";
       }
      // if(type=='1'){
      //    infoFrame.src='logInfo.seam?type=1&userId=<%=userid %>';
     //  }else if(type=='2'){
     //     infoFrame.src='logInfo.seam?type=2&userId=<%=userid %>';
     //  }else if(type=='3'){
      //	  infoFrame.src='logInfo.seam?type=3&userId=<%=userid %>';
     //  }else if(type=='0'){
     //  	  infoFrame.src='logInfo.seam?type=0&userId=<%=userid %>';
     //  }
   }
</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<div>&nbsp; <input type="checkbox" name='mtype' value="1"
	onclick="changeInfo('1')"> <span style="font-size: 12px;"><%=session.getAttribute("resourceParam_1922")%></span>
<input type="checkbox" value="2" name='mtype' onclick="changeInfo('2')">
<span style="font-size: 12px;"><%=session.getAttribute("resourceParam_1923")%></span> <input type="checkbox"
	value="3" name='mtype' onclick="changeInfo('3')"> <span
	style="font-size: 12px;"><%=session.getAttribute("resourceParam_1924")%></span> <input type="checkbox" value="0"
	name='mtype' onclick="changeInfo('0')"> <span
	style="font-size: 12px;"><%=session.getAttribute("resourceParam_1925")%></span> </div>

<iframe name="infoFrame" id="infoFrame" width="100%" height="700"
	scrolling=auto frameborder=0
	src="logInfo.seam?typeStr=1,&userId=<%=userid %>"></iframe>

<iframe name='hidden_frame' id='hidden_frame' style='display: none'></iframe>
</body>
</html>
