<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="css/css.css">
<link rel="stylesheet" type="text/css" href="/apmdis/lib/ext/resources/css/ext-all.css"/>
<script type="text/javascript"
	src="/apmdis/seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="/apmdis/lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/apmdis/lib/ext/ext-all.js"></script>
<script type="text/javascript" src="/apmdis/lib/ext/ux/miframe-min.js"></script>
<script type="text/javascript" src="/apmdis/seam/resource/remoting/interface.js?news_newssvr&meetings_meetingssvr&notices_noticessvr"></script>
<script type="text/javascript"
	src="/apmdis/lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<title><%=session.getAttribute("resourceParam_438")%></title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-repeat: repeat-x;
	background-color: #d7e1ed;
}
-->
</style></head>

<body oncontextmenu="self.event.returnValue=false" >
<table width="86%" border="0" cellpadding="0" cellspacing="0"  >
  <tr>
    <td width="3%" height="163" rowspan="5">&nbsp;</td>
    <td width="97%">&nbsp;</td>
  </tr>
  <tr>
    <td><table width="54%" border="0" align="left" cellpadding="0" cellspacing="0">
  <tr>
      <td height="30" ><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="4%">&nbsp;</td>
            <td width="82%"><a href="*.html"><font class="blue"><%=session.getAttribute("resourceParam_440")%></font></a></td>
            <td width="14%"><a href="*.html"><font class="blue2"><%=session.getAttribute("resourceParam_439")%>...</font></a></td>
          </tr>
        </table></td>
  </tr>
  <tr>
      <td height="4" background="images/xuxian.gif"></td>
  </tr>
    <tr>
      <td height="130">
                 <div id="notice">
				</div>
			</td>
    </tr>
    <tr>
      <td height="27">&nbsp;</td>
    </tr>
</table></td>
  </tr>
  <tr>
    <td><table width="54%" border="0" align="left" cellpadding="0" cellspacing="0">
  <tr>
      <td height="30" >&nbsp;&nbsp;&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="4%">&nbsp;</td>
            <td width="82%"><a href="*.html"><font class="blue"><%=session.getAttribute("resourceParam_441")%></font></a></td>
            <td width="14%"><a href="*.html"><font class="blue2"><%=session.getAttribute("resourceParam_439")%>...</font></a></td>
          </tr>
        </table>
        </td>
  </tr>
  <tr>
      <td height="4" background="images/xuxian.gif"></td>
  </tr>
    <tr>
      <td height="130"><div id="news">
			
				</div>
				</td>
    </tr>
    <tr>
      <td height="27">&nbsp;</td>
    </tr>
</table></td>
  </tr>
  <tr>
    <td><table width="54%" border="0" align="left" cellpadding="0" cellspacing="0">
  <tr>
      <td height="30" ><table width="100%" border="0" cellspacing="0" cellpadding="0" >
          <tr>
            <td width="4%">&nbsp;</td>
            <td width="82%"><a href="*.html"><font class="blue"><%=session.getAttribute("resourceParam_442")%></font></a></td>
            <td width="14%"><a href="*.html"><font class="blue2"><%=session.getAttribute("resourceParam_439")%>...</font></a></td>
          </tr>
        </table></td>
  </tr>
  <tr>
      <td height="4" background="images/xuxian.gif"></td>
  </tr>
    <tr>
      <td height="130"><div id="meeting">
				 				</div></td>
    </tr>
    <tr>
      <td height="27">&nbsp;</td>
    </tr>
</table></td>
  </tr>
  <tr>
    <td height="168"></td>
  </tr>
</table>
</body>
<script type="text/javascript" src="/apmdis/js/d2dwork/news/indexNews.js"></script>
</html>
