<%@ page language="java" contentType="text/html; charset=UTF-8"
  	pageEncoding="UTF-8"%>
<%@   taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@   taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title><%=session.getAttribute("resourceParam_1870")%></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta http-equiv="Prauma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<link href="../../css/jspcss.css" rel="stylesheet" type="text/css" />
<style type="text/css">
   table.mesgbox{border-collapse:"collapse;" empty-cells:"show;"}
   table.mesgbox td{border:"#e1e1e1 solid:1px;"}
</style>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<f:view>

<div style="margin:30px 50px;"><a href="mynews.jsp?tapid=2" class="f14 sl"><%=session.getAttribute("resourceParam_1875")%></a></div>

<div style="margin:30px 30px;"> 
<table width="95%"  border="0" align="left" cellpadding="5" cellspacing="1" class="mesgbox" summary="">
        <tr bgcolor="#ffffff">
          <td width="20%" align="center"><div class="yx_l lh25 f14" ><a href="mynews.jsp?tapid=0" target="ifr" class="noline" title="<%=session.getAttribute("resourceParam_1876")%>"><%=session.getAttribute("resourceParam_1876")%></a>：<a href="mynews.jsp?tapid=0" class="ql2" id=body_msg_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.sms_count}"/></a>/<a href="mynews.jsp?tapid=0" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_sms_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td width="20%" align="center"><div class="yx_l lh25 f14" ><a href="feedback.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1877")%>"><%=session.getAttribute("resourceParam_1877")%></a>：<a href="feedback.seam?status=2" class="ql2" id=body_bbs_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.feedbacklog_count}"/></a>/<a href="feedback.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_feedbacklog_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td width="20%" align="center"><div class="yx_l lh25 f14" ><a href="thatreminds.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1878")%>"><%=session.getAttribute("resourceParam_1878")%></a>：<a href="thatreminds.seam?status=2" class="ql2" id=body_comment_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.thatreminds_count}"/></a>/<a href="thatreminds.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_thatreminds_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td width="20%" align="center"><div class="yx_l lh25 f14" ><a href="adjusttask.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1872")%>"><%=session.getAttribute("resourceParam_1872")%></a>：<a href="adjusttask.seam?status=2" class="ql2" id=body_comment_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.adjusttask_count}"/></a>/<a href="adjusttask.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_adjusttask_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
        </tr>
        <tr bgcolor="#ffffff">
          <td align="center"><div class="yx_l lh25 f14" ><a href="systemnews.jsp" class="noline" title="<%=session.getAttribute("resourceParam_1871")%>"><%=session.getAttribute("resourceParam_1879")%></a>：<a href="systemnews.jsp" class="ql2"><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.syslog_count}"/></a>/<a href="systemnews.jsp" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_syslog_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td align="center"><div class="yx_l lh25 f14" ><a href="feedbackreply.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1880")%>"><%=session.getAttribute("resourceParam_1880")%></a>：<a href="feedbackreply.seam?status=2" class="ql2" id=body_bbsreply_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.feedbackreply_log_count}"/></a>/<a href="feedbackreply.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_feedbackreply_log_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td align="center"><div class="yx_l lh25 f14" ><a href="thatremindsreply.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1881")%>"><%=session.getAttribute("resourceParam_1881")%></a>：<a href="thatremindsreply.seam?status=2" class="ql2"><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.reply_count}"/></a>/<a href="thatremindsreply.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_reply_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td width="34%" align="center"><div class="yx_l lh25 f14" ><a href="adjusttaskreply.seam?status=1" class="noline" title="<%=session.getAttribute("resourceParam_1874")%>"><%=session.getAttribute("resourceParam_1874")%></a>：<a href="adjusttaskreply.seam?status=2" class="ql2" id=body_comment_num><%=session.getAttribute("resourceParam_1882")%><h:outputText value="#{messageReceiveVo.adjusttaskreply_count}"/></a>/<a href="adjusttaskreply.seam?status=1" class="ql2" id=body_comment_num>全部<h:outputText value="#{messageReceiveVo.all_adjusttaskreply_count}"/></a> <%=session.getAttribute("resourceParam_539")%></div></td>
          <td></td>
        </tr>
      </table>
	  <div class="h300"></div>
</div>

</f:view>
</body>
</html>
