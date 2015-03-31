<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String lang = request.getParameter("lang");
	if (lang != null) {
		session.setAttribute("lang", lang);
	}
%>
<html>
<head id="headid">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>洪都集团采购管控系统</title>
<link rel="stylesheet" type="text/css"
	href="../lib/ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="forum.css" />
<link rel="stylesheet" type="text/css" href="../css/manage/examples.css">
<script type="text/javascript">
	navigator.lang = '<%=session.getAttribute("lang")%>';
	function changeLanguage(lang){
		window.location = "index.seam?lang="+lang;
	}
	function autoSelect(){
		//dwr.engine.setActiveReverseAjax(true);
		//document.getElementById('langSelector').value=navigator.lang;
	}
	<%
	 // CS端嵌入BS的主界面，是否隐藏"退出"按钮的标记
	 if("true".equalsIgnoreCase((String) request.getAttribute("hideButton"))
		|| "true".equalsIgnoreCase(request.getParameter("hideButton"))){
		 out.write("var hideButton = true;");
	 } else {
		 out.write("var hideButton = false;");
	 }
	%>
	
</script>

<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?auth&tasknotify_TaskNotifySvr&vendorAppraisalRemote&LoginSessionSvr&datacenter_DataCenterRemote&base_menu_MenuSerivce&base_user_UserSerivce"></script>
<script type="text/javascript" src="../lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<!--<script type="text/javascript" src= "../js/base/languagesResource/leftMenuResource_cn.js"></script>-->

<script type="text/javascript" src="../lib/ext/ux/miframe-min.js"></script>
<script type="text/javascript" src="../lib/ext/ux/TabCloseMenu.js"></script>

<script type="text/javascript" src="../js/base/connection.js"></script>
<script type="text/javascript" src="../js/import/importPanel.js"></script>

<!--<script type="text/javascript" src="../dwr/interface/NotifyManager.js"></script>-->
<!--<script type="text/javascript" src="../dwr/engine.js"></script>-->
<!--<script type="text/javascript" src="../dwr/util.js"></script>-->

<script type="text/javascript" src="../js/base/portal/indexpanel.js"></script>
<script type="text/javascript" src="../js/base/synchronizeAjax.js"></script>
<script type="text/javascript" src="../js/notify/notifyMsg.js"></script>
<script type="text/javascript" src="../js/import/importBase.js"></script>
<script type="text/javascript" src="../js/import/importPush.js"></script>


<style type="text/css">
#msg-div {
	position: absolute;
	width: 250px;
	z-index: 90000;
}

.table-style {
	background-image: url('images/top_03bg.jpg');
	width: 100%;
	border: 0;
	padding: 0px 0px;
}
</style>
</head>
<body oncontextmenu="self.event.returnValue=false"
	onload="javascript:autoSelect()">
<div id="header">
<div>
<center>
<!--<div id="mmmm">-->
<!--</div><input type="button" value="dddd" onclick="javascript:NotifyManager.send('ww','22')"/>-->
<table class="table-style" summary="this is image">
	<tr>
		<!--<td width="66" height="62" align="left"><img
			src="images/top_01.jpg" width="66" height="62" alt=""></td> 去掉飞机图标 -->
		<!--<td align="left" style="background-image: url('../images/title_p2m.jpg');" id="thetop">-->
		<td align="left"><img alt=""
			src="images/<%=session.getAttribute("title_p2m.jpg")%>" width="520"
			height="62">
			</td>
		<td width="352" height="62" align="right" valign="bottom">
		<div id="caoZuo" style="height:30px;line-height:30px;">
			<div class="xinxi" style="padding-right:10px;">
				<a href="world/helpBook.pdf" class="lianJie" >用户手册</a>
				<a href="world/linx.ppt" class="ppt" >零星计划</a>
				<a href="world/tujian.ppt" class="ppt" >土建设备</a>
				<!-- <a href="world/CompanyLeader.pdf" class="pdf" style=";color:#f00;">公司领导</a>
				<a href="world/planner.pdf" class="pdf" style=";color:#f00;">计划管理员</a> -->
			</div>
		</div>	
		</td>
		<!-- <td>
		<div> 
			<select
			id="langSelector" onchange="javascript:changeLanguage(this.value)">
				<option value="zh">中文</option>
				<option value="ja">日本語</option>
			</select>
		</div>
		</td>-->
	</tr>
</table>

</center>
</div>
</div>

</body>
</html>

