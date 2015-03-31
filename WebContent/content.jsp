<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8" import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext"%>
      <%@   taglib   uri="http://java.sun.com/jsf/core"   prefix="f"   %>   
  <%@   taglib   uri="http://java.sun.com/jsf/html"   prefix="h"   %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

  <%
  response.setHeader("Pragma","No-cache"); 
  response.setHeader("Cache-Control","no-cache"); 
  response.setDateHeader("Expires", -10);

  //String testSession = FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("name").toString();
  //System.out.println("name222="+testSession);
   //String path=com.sysware.util.AnalysisProperties.DOMAIN_NAME;
   String username=com.sysware.util.CookieValue.getUserName(request);
   String password=com.sysware.util.CookieValue.getPassword(request);


  %>
 
<%
  String method=request.getParameter("method");
  if(method==null)method="1";
  String id=request.getParameter("id");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<title><%=session.getAttribute("resourceParam_437")%></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/ext-all.css"/>
<script type="text/javascript" src="js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript" src="js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript"
	src="seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="lib/ext/ext-all.js"></script>
<script type="text/javascript" src="lib/ext/ux/miframe-min.js"></script>
<script type="text/javascript" src="seam/resource/remoting/interface.js?auth&news_newsserver&meetings_meetingsserver&notices_noticesserver"></script>
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
	background-color: #ebf2fc;
	line-height : auto;
}
.STYLE1 {
	font-size: 12pt;
	font-weight: bold;
}
-->
</style>
<script type="text/JavaScript">
<!--

var name=<%=method%>;
var id=<%=id%>;

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
//-->
</script>
</head>
<%String state="0";%>
<body oncontextmenu="self.event.returnValue=false" >
	<center>
		<table id="__01" width="877" height="746" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td colspan="4" width="877" height="30">&nbsp;</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td><img src="images/<%=session.getAttribute("P2M_title.jpg")%>" width="257" height="39"></td>
				<td width="470" height="69" bgcolor="#7998ce"><f:view>
		       		<c:if test="${loginInfo.instcode == null}">
		            	<table width="100%" border="0" cellspacing="0" class="blue1" >
							<tr>
								<td width="46" ><img src="images/key.jpg" width="42" height="44"></td>
								<td>
									<table width="100%" border="0" cellspacing="0" class="blue1">
										<tr><td>&nbsp;</td></tr>
										<tr>
											<td width="400">
						                    	<div id="loginFormDeng"></div> <%state="0"; %>
						                    </td>
										</tr>
									</table>
								</td>
		
								<td width="66"><a href="javascript:void(0);" onClick="LoginForm.tijaio()"><img src="images/<%=session.getAttribute("login.jpg")%>" width="57" height="46"></a></td>
							</tr>
						</table>
             		</c:if>
					<c:if test="${loginInfo.instcode != null}">    
     					<%state="1"; %>      
		     			<table width="100%" border="0" cellspacing="0" class="blue1" >
							<tr>
								<td width="46" ><img src="images/key.jpg" width="42" height="44"></td>
						      	<td width="370" height="30"><%=session.getAttribute("resourceParam_448")%>：<h:outputText value="#{loginInfo.truename}"/>登陆本<%=session.getAttribute("resourceParam_451")%></td>
          
								<td width="66"><a href="base/loginOut.seam" ><%=session.getAttribute("resourceParam_449")%></a></td>
							</tr>
						</table>
					</c:if>
					</f:view>
				</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td>
					<img src="images/P2M_index_06.jpg" width="32" height="9" alt=""></td>
				<td>
					<img src="images/P2M_index_07.jpg" width="339" height="9" alt=""></td>
				<td>
					<img src="images/P2M_index_08.jpg" width="470" height="9" alt=""></td>
				<td>
					<img src="images/P2M_index_09.jpg" width="36" height="9" alt=""></td>
			</tr>
			<tr>
				<td valign="top">
					<img src="images/P2M_index_10.jpg" width="32" height="583" alt=""></td>
				<td height="583" colspan="2" valign="top">
					<table width="100%" height="507" border="0" cellpadding="0" cellspacing="0">
		          		<tr>
		            		<td align="center" valign="top"><br>
				              	<table width="90%" border="0" cellspacing="0" cellpadding="0">
					                <tr>
					                	<td>
					                		<div style="height:30px;float:right;">&nbsp;<a href="news_index.seam" style="color:#0000FF;text-decoration:underline;"><%=session.getAttribute("resourceParam_450")%></a></div>
											<div class="STYLE1" style="height:500px;overflow:auto;" id=dcontent></div>
										</td>
					                </tr>
				              	</table>
				           	</td>
          				</tr>
      				</table>
      			</td>
				<td valign="top"><img src="images/P2M_index_12.jpg" width="36" height="583" alt=""></td>
			</tr>
			<tr>
				<td height="55" colspan="4" align="center" background="images/bottom_bg.jpg"></td>
			</tr>
		</table>
<!-- End ImageReady Slices -->
</center>
</body>
<script type="text/javascript" src="js/d2dwork/news/newsDetails.js"></script>
<script type="text/javascript" src="js/d2dwork/mail/authentication.js"></script>
</html>
