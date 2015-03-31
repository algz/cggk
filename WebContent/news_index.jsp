<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext,com.sysware.util.I18nManager"%>
<%@   taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@   taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
	response.setDateHeader("set-cookie", -10);

	//String testSession = FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("name").toString();
	//System.out.println("name222="+testSession);
	//String path = com.sysware.util.AnalysisProperties.DOMAIN_NAME;
	String username = com.sysware.util.CookieValue.getUserName(request);
	String password = com.sysware.util.CookieValue.getPassword(request);
	String lang = request.getParameter("lang");
	if (lang != null) {
		session.setAttribute("lang", lang);
	} else {
		session.setAttribute("lang", I18nManager.defaultLanguage);
	}
%>
<%@page import="java.net.URLEncoder"%>
<html>
<head>

<title><%=session.getAttribute("resourceParam_437")%></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" type="text/css" href="css/ext-all.css" />

<script type="text/javascript" src="js/base/languagesResource/JsResource_zh.js"></script>

<script type="text/javascript"	src="js/base/languagesResource/JsResource_ja.js"></script>

<script type="text/javascript" src="js/base/languagesResource/JsResource.js"></script>

<script type="text/javascript"	src="seam/resource/remoting/resource/remote.js"></script>

<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>

<script type="text/javascript" src="lib/ext/ext-all.js"></script>

<script type="text/javascript" src="lib/ext/ux/miframe-min.js"></script>

<script type="text/javascript"	src="seam/resource/remoting/interface.js?auth&news_newsserver&meetings_meetingsserver&notices_noticesserver"></script>

<script type="text/javascript" src="lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>

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
	background-color: #ebf2fc;
}
-->
</style>
<script type="text/JavaScript">
if(parent.location!=self.location){
	parent.location = self.location;
}
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document;
  if(d!=undefined)
  { 
  if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  }
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
navigator.lang = '<%=session.getAttribute("lang")%>';
function changeLanguage(lang){
	window.location = "news_index.seam?lang="+lang;
}
function autoSelect(){
	//var d=document.getElementById('langSelector');
	//if(d!=null && d!=undefined)
	//{
	//d.value=navigator.lang;
	//}
}
function tijiao(){
	LoginForm.tijaio();
}
function xiezai()
{
	//document.getElementById("news")=null;
	newsye = null;
	meetingsye = null;
	noticeye = null;

	// 一页的条数
	shownews = null;
	// 新闻、公告、会议 总行数变量
    newstotal = null;
	meetingtotal = null;
	noticestotal = null;

	// 显示从{fromtotal}到{tototal},{presentpage}当前页
	 fromtotal = null;
	 tototal = null;
	 presentpage = null;
	 pagecount = null;
	if(Ext.isIE)
	{
	  setTimeout(CollectGarbage,1);
	}
}
//-->
</script>
</head>
<body oncontextmenu="self.event.returnValue=false"
	onload="javascript:autoSelect()">
<center>
<table id="__01" width="877" height="746" border="0" cellpadding="0"
	cellspacing="0">
	<tr>
		<td colspan="4" width="877" height="30">&nbsp;</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td><img src="images/<%=session.getAttribute("P2M_title.jpg")%>"
			width="257" height="39"></td>
		<td width="470" height="69" bgcolor="#7998ce">
		<%
			String state = "0";
		%> <f:view>
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
						<td width="66"><a href="javascript:void(0);"
							onClick="tijiao()"><img
							src="images/<%=session.getAttribute("login.jpg")%>" width="57"
							height="46" border="0"></a></td>
						<td><!--  
								<div>
									<select id="langSelector" onchange="javascript:changeLanguage(this.value)">
										<option value="zh">中文</option>
										<option value="ja">日本語</option>
									</select>
								</div>
								--></td>
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
							value="#{loginInfo.truename}" />登陆本<%=session.getAttribute("resourceParam_451")%>
						</td>
						<td width="66"><a href="base/index.jsp"><%=session.getAttribute("resourceParam_1932")%></a>&nbsp;&nbsp;<a
							href="base/loginOut.seam"><%=session.getAttribute("resourceParam_449")%></a></td>
					</tr>
				</table>
			</c:if>
		</f:view></td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td><img src="images/P2M_index_06.jpg" width="32" height="9"
			alt=""></td>
		<td><img src="images/P2M_index_07.jpg" width="339" height="9"
			alt=""></td>
		<td><img src="images/P2M_index_08.jpg" width="470" height="9"
			alt=""></td>
		<td><img src="images/P2M_index_09.jpg" width="36" height="9"
			alt=""></td>
	</tr>
	<tr>
		<td><img src="images/P2M_index_10.jpg" width="32" height="583"
			alt=""></td>
		<td height="583" colspan="2" valign="top"
			background="images/P2M_index_11_bg.jpg">
		<table width="100%" height="507" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="68%" height="510" valign="top"><br>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="5%" height="25">&nbsp;</td>
						<td width="92%" height="25" align="left">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="88%"><img
									src="images/<%=session.getAttribute("xinwen-blue.gif")%>"
									alt="<%=session.getAttribute("resourceParam_441")%>"
									name="Image14" width="69" height="25" border="0"></td>
								<td></td>
							</tr>
						</table>
						</td>
						<td width="3%" height="25">&nbsp;</td>
					</tr>
					<tr>
						<td height="5"></td>
						<td height="5"><img src="images/xx.gif"></td>
						<td height="5"></td>
					</tr>
					<tr>
						<td height="25">&nbsp;</td>
						<td height="25" align="left">
						<div id="news"></div>
						</td>
						<td height="25">&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><img src="images/xx1.jpg"></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="right"><a href="javascript:void(0);"
							onclick="fen(0)"><%=session.getAttribute("resourceParam_552")%></a>
						<a href="javascript:void(0);" onclick="fen(1)"><%=session.getAttribute("resourceParam_550")%></a>
						<a href="javascript:void(0);" onclick="fen(2)"><%=session.getAttribute("resourceParam_551")%></a>
						<a href="javascript:void(0);" onclick="fen(3)"><%=session.getAttribute("resourceParam_553")%></a></td>
						<td>&nbsp;</td>
					</tr>
				</table>
				</td>
				<td width="32%" rowspan="3" align="center" valign="top">
				<table width="88%" height="266" border="0" cellpadding="0"
					cellspacing="0">
					<tr>
						<td height="38">&nbsp;</td>
					</tr>
					<tr>
						<td><img src="images/image_1.jpg" width="210" height="195"></td>
					</tr>
					<tr>
						<td><img src="images/image_2.jpg" width="210" height="181"></td>
					</tr>
				</table>
				</td>
			</tr>
			<!-- hegs登陆页去除会议和公告 -->
			<!--  
			<tr>
				<td height="170" valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="5%" height="25">&nbsp;</td>
						<td width="92%" height="25" align="left">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="88%"><img
									src="images/<%=session.getAttribute("gonggao-blue.gif")%>"
									alt="<%=session.getAttribute("resourceParam_440")%>"
									name="Image15" width="69" height="25" border="0"></td>
								<td></td>
							</tr>
						</table>
						</td>
						<td width="3%" height="25">&nbsp;</td>
					</tr>
					<tr>
						<td height="5"></td>
						<td height="5"><img src="images/xx.gif"></td>
						<td height="5"></td>
					</tr>
					<tr>
						<td height="25">&nbsp;</td>
						<td height="25">
						<div id="notice"></div>
						</td>
						<td height="25">&nbsp;</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td height="170" valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="5%" height="25">&nbsp;</td>
						<td width="92%" height="25" align="left">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="88%"><img
									src="images/<%=session.getAttribute("huiyi-blue.gif")%>"
									alt="<%=session.getAttribute("resourceParam_442")%>"
									name="Image18" width="69" height="25" border="0"></td>
								<td></td>
							</tr>
						</table>
						</td>
						<td width="3%" height="25">&nbsp;</td>
					</tr>
					<tr>
						<td height="5"></td>
						<td height="5"><img src="images/xx.gif"></td>
						<td height="5"></td>
					</tr>
					<tr>
						<td height="25">&nbsp;</td>
						<td height="25">
						<div id="meeting"></div>
						</td>
						<td height="25">&nbsp;</td>
					</tr>
				</table>
				</td>
			</tr>
			-->
		</table>
		</td>
		<td><img src="images/P2M_index_12.jpg" width="36" height="583"
			alt=""></td>
	</tr>
	<tr>
		<td height="55" colspan="4" align="center"
			background="images/bottom_bg.jpg">SYSWARE Co,.LTD. <%=session.getAttribute("resourceParam_1931")%>2.8.</td>
	</tr>
</table>
</center>
</body>
<script type="text/javascript" src="LoginForm.js"></script>
<script type="text/javascript" src="js/d2dwork/news/newsAll.js"></script>
<script type="text/javascript" src="js/d2dwork/news/indexNews.js"></script>
<!--<script type="text/javascript" src="js/d2dwork/mail/authentication.js"></script>-->
<!-- 
<script type="text/javascript">
function setPresentPage()
{
	var pageC=getPagecount();
	document.getElementById('ID_count').innerHTML=pageC;
	document.getElementById('ID_total').innerHTML =newstotal ;
}
</script>
 -->
</html>
