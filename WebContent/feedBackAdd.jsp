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
<link href="css/column-tree.css" type="text/css" rel="stylesheet" />
<link href="css/log.css" type="text/css" rel="stylesheet" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="on-cache">
<meta http-equiv="cache-control" content="on-cache">
<link rel="stylesheet" type="text/css"
	href="
lib/ext/resources/css/ext-all.css" />

<script type="text/javascript" src="js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript" src="js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript" src="js/base/departmentUser.js"></script>
<script type="text/javascript" src="lib/ext/source/util/ComboBoxTree.js"></script>

<script type="text/javascript"
	src="seam/resource/remoting/resource/remote.js"></script>

<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_FeedBackInfoRemote"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_FeedBackAddRemote"></script>

<script type="text/javascript" src="feedBack.js"></script>
<script type="text/javascript">
   

    function  feedbacksubmit(){
        var title =document.getElementById("feedBackTitle").value;
        if(title.length>99){
            alert("<%=session.getAttribute("resourceParam_516")%>");
            return ;
        }
        if(""==title||null==title){
            alert("<%=session.getAttribute("resourceParam_518")%>");
            return ;
        }
        var content =document.getElementById("feedBackBody").value;
        if(content.length>1999){
             alert("<%=session.getAttribute("resourceParam_515")%>");
             return ;
        }
        if(""==content||null==content){
            alert("<%=session.getAttribute("resourceParam_519")%>");
            return ;
        }
          feedBackForm.submit();
		//document.getElementById("feedback").click(); 
		   
    }
     function feedBackSucces(){
      document.getElementById("feedBackTitle").value='';
     document.getElementById("feedBackBody").value='';
     document.getElementById("dataObjForm").innerHTML='';
     
       alert("<%=session.getAttribute("resourceParam_520")%>");
      // window.location.reload();
    }
    function feedBackError(){
        alert("<%=session.getAttribute("resourceParam_517")%>");
       document.getElementById("feedBackTitle").value='';
     document.getElementById("feedBackBody").value='';
      document.getElementById("dataObjForm").innerHTML='';
    }
</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >


<form enctype="multipart/form-data" id="feedBackForm"
	name="feedBackForm" action="FeedBackAddServlet" method="post"
	target="hidden_frame"><input name="taskid" id='taskid'
	value="${sessionScope.feedBacktaskid }" type="hidden">
<table
	style="font-size: 12px; width: 100%; margin-top: -100px; padding-left: 50px">
	<tr>
		<td rowspan="5" style="width: 50%" height="600">
		<fieldset><legend><%=session.getAttribute("resourceParam_523")%></legend>

		<table width="100%">
			<tr>
				<td width="90px" align="right">&nbsp;<%=session.getAttribute("resourceParam_533")%>:</td>
				<td>&nbsp;<input style="width: 307px" id='feedBackTitle'
					name="feedBackTitle"></td>
			</tr>
			<tr>
				<td width="90px" align="right">&nbsp;<%=session.getAttribute("resourceParam_524")%>:</td>
				<td>&nbsp;<textarea rows="4" style="width: 307px"
					id='feedBackBody' name="feedBackBody"></textarea></td>

			</tr>
			<tr>
				<td width="90px" align="right">&nbsp;<%=session.getAttribute("resourceParam_529")%>:</td>
				<td>&nbsp;<input type="file" onkeypress='return false'
					style="width: 307px" name="file1"></td>
			</tr>
			<tr>
				<td width="90px" align="right">&nbsp;<%=session.getAttribute("resourceParam_525")%>:</td>

				<td>&nbsp;<select style="width: 307px" name="formType"
					id='formType' onchange="getDataForm();">
					<option value="none"><%=session.getAttribute("resourceParam_528")%></option>
					<c:forEach items="${formList}" var="vars">
						<option value="${vars.formid}">${vars.formname}</option>
					</c:forEach>
				</select></td>
			</tr>
			<tr>
				<td colspan="2">&nbsp;
				<div id="dataObjForm"></div>
				</td>
			</tr>
		</table>
		<p>&nbsp;</p>
		</fieldset>
		</td>
		<td style="width: 50%" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=session.getAttribute("resourceParam_530")%>:
		<div id="dep" style=""></div>
		<br>
		<br>
		<%=session.getAttribute("resourceParam_522")%>:<select style="width: 200px" name='receiver'>



		</select><br>
		<br>
		&nbsp;<%=session.getAttribute("resourceParam_531")%>:<INPUT type="checkbox" name="publishMode" value="1" /><%=session.getAttribute("resourceParam_521")%><INPUT
			type="checkbox" /><%=session.getAttribute("resourceParam_526")%> <br>
		<br>
		&nbsp;&nbsp;&nbsp;<%=session.getAttribute("resourceParam_527")%>:<select style="width: 200px" name="important">
			<option value="3">低</option>
			<option value="2">中</option>
			<option value="1">高</option>
		</select><br>
		<br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
			href="javascript:void(0);" onclick="feedbacksubmit()"><%=session.getAttribute("resourceParam_532")%></a></td>
	</tr>

</table>
</form>
<script type="text/javascript">
   
</script>
${info }
<iframe name='hidden_frame' id='hidden_frame' style='display: none'></iframe>
</body>
</html>
