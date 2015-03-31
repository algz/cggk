<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8" import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext"%>
      <%@   taglib   uri="http://java.sun.com/jsf/core"   prefix="f"   %>   
  <%@   taglib   uri="http://java.sun.com/jsf/html"   prefix="h"   %>  
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

  <%
  //String testSession = FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("name").toString();
  //System.out.println("name222="+testSession);
  %>
<%
  String method=request.getParameter("method");
  if(method==null)method="1";
  String id=request.getParameter("id");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=session.getAttribute("resourceParam_437")%></title>
	<link rel="stylesheet" type="text/css" href="css/ext-all.css"/>
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
<body oncontextmenu="self.event.returnValue=false"  bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<center>
<!-- ImageReady Slices (601-listbg.jpg) -->
<table id="__01" width="970" height="747" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="4">
			<img src="images/601-listbg_01.jpg" width="395" height="30" alt=""></td>
		<td>
			<img src="images/601-listbg_01.jpg" width="470" height="30" alt=""></td>
		<td colspan="2">
			<img src="images/601-listbg_01.jpg" width="105" height="30" alt=""></td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colspan="2">
		  <img src="images/601-listbg_05.jpg" />
			</td>
		<td width="900" height="69" >
		
		<td colspan="2">&nbsp;</td>
	</tr>
	<tr>
		<td width="71" height="472">
			</td>
		<td>
			</td>
		<td width="766" height="472" colspan="3" align="center" valign="bottom" background="images/601-listbg_10bg.jpg">
<table width="93%" height="93%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="77%" height="423" valign="top" ><div style="height:30px">&nbsp;</div>
			
			<div id=dcontent>
            </div>
         </td>
            <td width="5%">&nbsp;</td>
            <td width="18%"><table id="__01" width="106" height="472" border="0" cellpadding="0" cellspacing="0">


</table>
</td>
          </tr>
        </table></td>
		<td>
			<img src="images/601-listbg_11.jpg" width="19" height="472" alt=""></td>
		<td width="86" height="472" >&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">
			<img src="images/601-listbg_13.jpg" width="99" height="66" alt=""></td>
		<td>
			<img src="images/601-listbg_14.jpg" width="201" height="66" alt=""></td>
		<td colspan="4">
			<img src="images/601-listbg_15.jpg" width="670" height="66" alt=""></td>
	</tr>
	<tr>
		<td colspan="7">
			<table id="__01" width="970" height="109" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td>
			<img src="images/bottom-image_01.jpg" width="58" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_02.jpg" width="57" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_03.jpg" width="57" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_04.jpg" width="56" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_05.jpg" width="58" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_06.jpg" width="54" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_07.jpg" width="57" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_08.jpg" width="60" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_09.jpg" width="56" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_10.jpg" width="61" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_11.jpg" width="54" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_12.jpg" width="57" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_13.jpg" width="57" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_14.jpg" width="60" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_15.jpg" width="53" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_16.jpg" width="58" height="109" alt=""></td>
		<td>
			<img src="images/bottom-image_17.jpg" width="57" height="109" alt=""></td>
	</tr>
</table></td>
	</tr>

</table>
</center>
<!-- End ImageReady Slices -->
</body>
<script type="text/javascript" src="js/d2dwork/news/newsDetails.js"></script>
</html>
