<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	//String testSession = FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("name").toString();
	//System.out.println("name222="+testSession);
	// 设置响应的HTML内容在客户端不缓存
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);

	// 服务端验证当前请求用户权限
	//String path = com.sysware.util.AnalysisProperties.DOMAIN_NAME;
	String username = com.sysware.util.CookieValue.getUserName(request);
	String password = com.sysware.util.CookieValue.getPassword(request);
	String method = request.getParameter("method");
	if (method == null)
		method = "1";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=session.getAttribute("resourceParam_437")%></title>
<link rel="stylesheet" type="text/css" href="css/ext-all.css" />
<script type="text/javascript"
	src="seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript"
	src="js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="lib/ext/ux/miframe-min.js"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?auth&news_newsserver&meetings_meetingsserver&notices_noticesserver"></script>
<script type="text/javascript"
	src="lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript" src="LoginForm.js"></script>
<link rel="stylesheet" type="text/css" href="news/indexcss/css.css">
<style type="text/css">
<!--
body {
	background-image: url(images/body-bg.jpg);
	background-repeat: repeat-x;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<script type="text/JavaScript">
<!--
var types=<%=method%>;
//-->
</script>
</head>
<%
	String state = "0";
%>
<body oncontextmenu="self.event.returnValue=false" bgcolor="#FFFFFF"
	leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<center><!-- ImageReady Slices (601-listbg.jpg) -->
<table id="__01" width="970" height="747" border="0" cellpadding="0"
	cellspacing="0">
	<tr>
		<td colspan="4"><img src="images/601-listbg_01.jpg" width="395"
			height="30" alt=""></td>
		<td><img src="images/601-listbg_02.jpg" width="470" height="30"
			alt=""></td>
		<td colspan="2"><img src="images/601-listbg_03.jpg" width="105"
			height="30" alt=""></td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colspan="2"><img src="images/601-indexbg_05b.jpg" alt=""></td>
		<td width="470" height="69" background="images/601-indexbg_06bg.jpg">
		<f:view>
			<c:if test="${loginInfo.instcode == null}">
				<table width="100%" border="0" cellspacing="0" class="blue1">
					<tr>
						<td width="46"><img src="images/key.jpg" width="42"
							height="44"></td>
						<td>
						<table width="100%" border="0" cellspacing="0" class="blue1">
							<tr>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td width="400">
								<div id="loginFormDeng"></div>
								<%
									state = "0";
								%>
								</td>
							</tr>
						</table>
						</td>
						<td width="66"><a href="javascript:void(0);" onclick="LoginForm.tijaio()"><img
							src="images/<%=session.getAttribute("login.jpg")%>" width="57"
							height="46"></a></td>
					</tr>
				</table>
			</c:if>
			<c:if test="${loginInfo.instcode != null}">
				<%
					state = "1";
				%>
				<table width="100%" border="0" cellspacing="0" class="blue1">
					<tr>
						<td width="46"><img src="images/key.jpg" width="42"
							height="44"></td>
						<td width="370" height="30"><%=session.getAttribute("resourceParam_448")%>：<h:outputText
							value="#{loginInfo.truename}" />登陆本<%=session.getAttribute("resourceParam_451")%></td>
						<td width="66"><a href="base/loginOut.seam"><%=session.getAttribute("resourceParam_449")%></a></td>
					</tr>
				</table>
			</c:if>
		</f:view></td>
		<td colspan="2">&nbsp;</td>
	</tr>
	<tr>
		<td><img src="images/601-listbg_08.jpg" width="71" height="472"
			alt=""></td>
		<td><img src="images/601-listbg_09.jpg" width="28" height="472"
			alt=""></td>
		<td width="766" height="472" colspan="3" align="center"
			valign="bottom" background="images/601-listbg_10bg.jpg">
		<table width="93%" height="93%" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="77%" height="423" valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="30">&nbsp;</td>
					</tr>
					<tr>
						<td>
						<table width="100%" border="0" cellspacing="0">
							<tr>
								<td width="70" height="27"><a href="javascript:void(0);"
									onclick="tabClick('ID_Image26');"><img
									src="images/<%=session.getAttribute("xinwen-blue.gif")%>"
									alt="xinwen" id="ID_Image26" name="Image26" width="69"
									height="25" border="0"></a></td>
								<td width="70"><a href="javascript:void(0);"
									onclick="tabClick('ID_Image27');"><img
									src="images/<%=session.getAttribute("gonggao-blue.gif")%>"
									alt="gonggao" id="ID_Image27" name="Image27" width="69"
									height="25" border="0"></a></td>
								<td width="70"><a href="javascript:void(0);"
									onclick="tabClick('ID_Image28');"><img
									src="images/<%=session.getAttribute("huiyi-blue.gif")%>"
									alt="huiyi" id="ID_Image28" name="Image28" width="69"
									height="25" border="0"></a></td>
								<td width="332">&nbsp;</td>
							</tr>
						</table>
						</td>
					</tr>
					<tr>
						<td valign="top" background="images/xx.jpg"><img
							src="images/xx.jpg" width="414" height="5"></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td align="left">
						<div id="news"></div>
						<div id="meeting" style="display: none"></div>
						<div id="notice" style="display: none"></div>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td valign="top" background="images/xx1.jpg"><img
							src="images/xx1.jpg"></td>
					</tr>
					<tr>
						<td height="26" align="right"><a href="javascript:void(0);" onclick="fen(0)"><%=session.getAttribute("resourceParam_552")%></a>
						<a href="javascript:void(0);" onclick="fen(1)"><%=session.getAttribute("resourceParam_550")%></a>
						<a href="javascript:void(0);" onclick="fen(2)"><%=session.getAttribute("resourceParam_551")%></a>
						<a href="javascript:void(0);" onclick="fen(3)"><%=session.getAttribute("resourceParam_553")%></a>
						</td>
					</tr>
				</table>
				</td>
				<td width="5%">&nbsp;</td>
				<td width="18%">
				<table id="__01" width="106" height="472" border="0" cellpadding="0"
					cellspacing="0">
					<tr>
						<td colspan="3"><img src="images/xitong_01.jpg" width="106"
							height="42" alt=""></td>
					</tr>
					<tr>
						<td rowspan="6"><img src="images/xitong_02.jpg" width="8"
							height="430" alt=""></td>
						<td><a href="news_index.seam"><img
							src="images/xitong_03.jpg" alt="" width="87" height="27"
							border="0"></a></td>
						<td rowspan="6"><img src="images/xitong_04.jpg" width="11"
							height="430" alt=""></td>
					</tr>
					<tr>
						<td><a href="javascript:void(0);" onclick="gong('<%=state%>','1')"><img
							src="images/xitong_05.jpg" alt="" width="87" height="101"
							border="0"></a></td>
					</tr>
					<tr>
						<td><a href="javascript:void(0);" onclick="xie('<%=state%>','2')"><img
							src="images/xitong_06.jpg" alt="" width="87" height="90"
							border="0"></a></td>
					</tr>
					<tr>
						<td><a
							href="javascript:void(0);"
							target="_blank"><img src="images/xitong_07.jpg" alt=""
							width="87" height="90" border="0"></a></td>
					</tr>
					<tr>
						<td><a href="javascript:void(0);" target="_blank"><img
							src="images/xitong_08.jpg" alt="" width="87" height="83"
							border="0"></a></td>
					</tr>
					<tr>
						<td><img src="images/xitong_09.jpg" width="87" height="39"
							alt=""></td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</td>
		<td><img src="images/601-listbg_11.jpg" width="19" height="472"
			alt=""></td>
		<td width="86" height="472">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2"><img src="images/601-listbg_13.jpg" width="99"
			height="66" alt=""></td>
		<td><img src="images/601-listbg_14.jpg" width="201" height="66"
			alt=""></td>
		<td colspan="4"><img src="images/601-listbg_15.jpg" width="670"
			height="66" alt=""></td>
	</tr>
	<tr>
		<td colspan="7">
		<table id="__01" width="970" height="109" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td><img src="images/bottom-image_01.jpg" width="58"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_02.jpg" width="57"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_03.jpg" width="57"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_04.jpg" width="56"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_05.jpg" width="58"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_06.jpg" width="54"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_07.jpg" width="57"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_08.jpg" width="60"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_09.jpg" width="56"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_10.jpg" width="61"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_11.jpg" width="54"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_12.jpg" width="57"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_13.jpg" width="57"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_14.jpg" width="60"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_15.jpg" width="53"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_16.jpg" width="58"
					height="109" alt=""></td>
				<td><img src="images/bottom-image_17.jpg" width="57"
					height="109" alt=""></td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td><img src="images/fengefu.gif" width="71" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="28" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="201" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="95" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="470" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="19" height="1" alt=""></td>
		<td><img src="images/fengefu.gif" width="86" height="1" alt=""></td>
	</tr>
</table>
</center>
<!-- End ImageReady Slices -->
</body>
<script type="text/javascript">
<!--
	var name=<%=method%>;

	// 标签页点击后选中状态的图标集合
	var focSrcArr = ['images/xinwen-yellow.gif', 'images/gonggao-yellow.gif', 'images/huiyi-yellow.gif'];
	// 标签页点击后未选中状态的图标集合
	var orgSrcArr = ['images/xinwen-blue_zh.gif', 'images/gonggao-blue_zh.gif', 'images/huiyi-blue_zh.gif'];
	// 3个标签页图标
	var imgObjArr = ['ID_Image26', 'ID_Image27', 'ID_Image28'];
	// 3个标签页展示内容列表的区域ID
	var divObjArr = ['news', 'notice', 'meeting'];
	
	// 新闻、公告、会议 TAB页单击事件响应函数
	function tabClick(imgName){
		// indexlist.seam?method=1
		//  onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image27','','images/huiyi-yellow.gif',1)"
		for (var i = 0; i < imgObjArr.length; i++) {
			if (imgObjArr[i] == imgName) {
				document.getElementById(imgObjArr[i]).src = focSrcArr[i];
				document.getElementById(divObjArr[i]).style.display="";
				types = i + 1;
			} else {
				document.getElementById(imgObjArr[i]).src = orgSrcArr[i];
				document.getElementById(divObjArr[i]).style.display="none";
			}
		}
	}

	// 根据用户点击的"更多"类型默认选中的标签页
	if (name == "1") {
		tabClick('ID_Image26');
	} else if (name == "2") {
		tabClick('ID_Image27');
	} else if (name == "3") {
		tabClick('ID_Image28');
	}
-->
</script>
<script type="text/javascript" src="js/d2dwork/news/newsAll.js"></script>
<script type="text/javascript" src="js/d2dwork/news/indexNews.js"></script>
<script type="text/javascript" src="js/d2dwork/mail/authentication.js"></script>
</html>