<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8" import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext"%>
      <%@   taglib   uri="http://java.sun.com/jsf/core"   prefix="f"   %>   
  <%@   taglib   uri="http://java.sun.com/jsf/html"   prefix="h"   %>  
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

  <%
  //String testSession = FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("name").toString();
  //System.out.println("name222="+testSession);
  // String path=com.sysware.util.AnalysisProperties.DOMAIN_NAME;
   response.setHeader("Pragma","No-cache"); 
   response.setHeader("Cache-Control","no-cache"); 
   response.setDateHeader("Expires", -10);
 

  %>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=session.getAttribute("resourceParam_437")%></title>
<link rel="stylesheet" type="text/css" href="lib/ext/resources/css/ext-all.css"/>
<script type="text/javascript"
	src="seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="lib/ext/ext-all.js"></script>
<script type="text/javascript" src="lib/ext/ux/miframe-min.js"></script>
<script type="text/javascript" src="seam/resource/remoting/interface.js?news_newssvr&meetings_meetingssvr&notices_noticessvr"></script>
<script type="text/javascript"
	src="lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>

<script type="text/javascript" src="LoginForm.js"></script>

<link rel="stylesheet" type="text/css" href="news/indexcss/css.css">
<style type="text/css">
<!--
body {
	background-image: url(images/body-bg.jpg);
	background-repeat: repeat-x;
}
-->
</style>
<script type="text/JavaScript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}} 
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
    if(a[0]=="Image26")
  {
  document.getElementById("news").style.display="";
  document.getElementById("notice").style.display="none";
  document.getElementById("meeting").style.display="none";
  }
  else if(a[0]=="Image27")
  {
    document.getElementById("news").style.display="none";
  document.getElementById("notice").style.display="none";
  document.getElementById("meeting").style.display="";
   
  }else  if(a[0]=="Image28")
  {
    document.getElementById("news").style.display="none";
  document.getElementById("notice").style.display="";
  document.getElementById("meeting").style.display="none";
  }
}
//-->
</script>
</head>
<body oncontextmenu="self.event.returnValue=false"  oncontextmenu="self.event.returnvalue=false" bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="MM_preloadImages('images/xinwen-yellow.gif','images/huiyi-yellow.gif','images/gonggao-yellow.gif')">
<center>
<!-- ImageReady Slices (601-indexbg.jpg) -->
<table id="__01" width="970" height="655" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="2">
			<img src="images/601-indexbg_01.jpg" width="394" height="30" alt=""></td>
		<td colspan="3">
			<img src="images/601-indexbg_02.jpg" width="471" height="30" alt=""></td>
		<td>
			<img src="images/601-indexbg_03.jpg" width="105" height="30" alt=""></td>
	</tr>
	<tr>
		<td width="46" height="69">&nbsp;</td>
		<td>
			<img src="images/601-indexbg_05b.jpg"   alt=""></td>
		<td colspan="3" background="images/601-indexbg_06bg.jpg" height="69">
		<div id="loginForm">
<!--		<form name="" action="" method="post">-->
<!--		<table width="100%" border="0" cellspacing="0" class="blue1" >-->
<!--          <tr>-->
<!--            <td width="46" ><img src="images/key.jpg" width="42" height="44"></td>-->
<!--            <td width="53"><%=session.getAttribute("resourceParam_548")%>名：</td>-->
<!--            <td width="127"><input type="text" name="username"  size="20"></td>-->
<!--            <td width="42" align="right"><%=session.getAttribute("resourceParam_549")%>：</td>-->
<!--            <td width="125"><input type="password" name="password"  size="20"></td>-->
<!--            <td width="66"><a href="javascript:void(0);" onclick=""><img src="images/<%=session.getAttribute("login.jpg")%>" width="57" height="46"></a></td>-->
<!--          </tr>-->
<!--        </table>-->
<!--		</form>-->
</div></td>
		<td width="105" height="69">&nbsp;</td>
	</tr>
	<tr>
		<td rowspan="4">
			<img src="images/601-indexbg_08.jpg" width="46" height="439" alt=""></td>
		<td rowspan="4">
			<img src="images/601-indexbg_09.jpg" width="348" height="439" alt=""></td>
		<td width="471" height="314" colspan="3" valign="top" background="images/601-indexbg_10bg.jpg" ><table width="100%" border="0" cellspacing="0">
          <tr>
            <td width="6%" height="35">&nbsp;</td>
            <td width="87%">&nbsp;</td>
            <td width="7%">&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td valign="bottom"><table width="100%" border="0" cellspacing="0">
              <tr>
                <td width="70"><a href="indexlist.jsp?method=1" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image26','','images/xinwen-yellow.gif',1)"><img src="images/<%=session.getAttribute("xinwen-blue.gif")%>" alt="xinwen" name="Image26" width="69" height="25" border="0"></a></td>
                <td width="70"><a href="indexlist.jsp?method=2" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image27','','images/huiyi-yellow.gif',1)"><img src="images/<%=session.getAttribute("huiyi-blue.gif")%>" alt="huiyi" name="Image27" width="69" height="25" border="0"></a></td>
                <td width="70"><a href="indexlist.jsp?method=3" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image28','','images/gonggao-yellow.gif',1)"><img src="images/<%=session.getAttribute("gonggao-blue.gif")%>" alt="gonggao" name="Image28" width="69" height="25" border="0"></a></td>
                <td >&nbsp;</td>
                <td width="39" align="right" valign="bottom"><a href="indexlist.jsp"><img src="images/more.gif" alt="<%=session.getAttribute("resourceParam_439")%>" width="39" height="15" border="0" longdesc="601-indexbg.html"></a></td>
              </tr>
            </table></td>
            <td>&nbsp;</td>
          </tr>
		   <tr>
            <td>&nbsp;</td>
            <td valign="top"><img src="images/xx.jpg" width="414" height="5"></td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td align="left">
                <div id="news"></div>
		        <div id="meeting" style="display: none"></div>
				<div id="notice" style="display: none"></div>
			</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
		<td>
			<img src="images/601-indexbg_11.jpg" width="105" height="314" alt=""></td>
	</tr>
	<tr>
		<td rowspan="3">
			<img src="images/601-indexbg_12.jpg" width="32" height="125" alt=""></td>
		<td>
			<img src="images/601-indexbg_13.jpg" width="401" height="14" alt=""></td>
		<td rowspan="3">
			<img src="images/601-indexbg_14.jpg" width="38" height="125" alt=""></td>
		<td rowspan="3">
			<img src="images/601-indexbg_15.jpg" width="105" height="125" alt=""></td>
	</tr>
	<tr>
		<td height="90" background="images/601-indexbg_16bg.jpg" width="401" ><table width="100%" border="0" cellspacing="0">
          <tr>
            <td><a href="*.html"><img src="images/ggxt.jpg" alt="<%=session.getAttribute("resourceParam_547")%>" width="74" height="75" border="0"></a></td>
            <td><img src="images/601-indexbg_16xx.jpg" width="36" height="77"></td>
            <td><a href="*.html"><img src="images/cggl.jpg" alt="成果管理" width="65" height="77" border="0"></a></td>
            <td><img src="images/601-indexbg_16xx.jpg" width="36" height="77"></td>
            <td><a href="http://192.168.0.177:8080/claros" target="_blank"><img src="images/yjxt.jpg" alt="邮件系统" width="57" height="70" border="0"></a></td>
            <td><img src="images/601-indexbg_16xx.jpg" width="36" height="77"></td>
            <td><a href="http://192.168.0.177:8080/jforum" target="_blank"><img src="images/jslt.jpg" alt="技术论坛" width="54" height="72" border="0"></a></td>
          </tr>
        </table></td>
	</tr>
	<tr>
		<td>
			<img src="images/601-indexbg_17.jpg" width="401" height="21" alt=""></td>
	</tr>
	<tr>
		<td colspan="6">
			<img src="images/601-indexbg_18.jpg" width="970" height="117" alt=""></td>
	</tr>
</table>
</center>
<!-- End ImageReady Slices -->
</body>
<script type="text/javascript" src="js/d2dwork/news/indexNews.js"></script>
</html>
