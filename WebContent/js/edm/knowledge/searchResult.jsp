<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<head>
<script type="text/javascript" src="<%=basePath %>js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="jquery.poshytip.min.js"></script>
<link href="<%=basePath %>css/tip-yellowsimple/tip-yellowsimple.css" type="text/css" rel="stylesheet" media="screen"/>
<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/interface.js?km_searchRemote"></script>
<script type="text/javascript" src="<%=basePath %>js/base/connection.js"></script>
<script type="text/javascript" src="<%=basePath%>js/edm/knowledge/searchResult.js"></script>
<script type="text/javascript">
var doctypes=[];
var queryString="";
<%
  String doctype=request.getParameter("doctype");
  String query=request.getParameter("query");
  if(doctype!=null && doctype.trim().length()>0){
  %>
doctypes='<%=doctype%>'.split(",");
<%
  }
  if(query!=null && query.trim().length()>0){
       %>
    queryString='<%=query%>';
<%
  }
%>
</script>
<link type="text/css" rel="stylesheet" href="<%=basePath%>js/edm/knowledge/searchResult.css">
</head>
<body>
<div id="main" style="padding-top:30px;">
    <div id="logo"><img style="background-color:white;border:0px solid;" id="logoImg"
                        src="<%=basePath %>images/sysware.bmp" alt=""></div>
    <div id="search">
        <div id="types">
            <span><input id="all" type="checkbox" name="clazz" alt="搜索所有类型" ><label for="all">全部</label> </span>
            <span><input id="dict" type="checkbox" name="clazz" alt="在词条下搜索"><label for="dict">词条</label> </span>
            <span><input id="msword" type="checkbox" name="clazz" alt="WORD全文搜索"><label for="msword">WORD</label> </span>
            <span><input id="msxls" type="checkbox" name="clazz" alt="EXCEL全文搜索"><label for="msxls">EXCEL</label> </span>
            <span><input id="msppt" type="checkbox" name="clazz" alt="PPT全文搜索"><label for="msppt">PPT</label> </span>
            <span><input id="pdf" type="checkbox" name="clazz" alt="PDF全文搜索"><label for="pdf">PDF</label> </span>
            <span><input id="txt" type="checkbox" name="clazz" alt="TXT全文搜索"><label for="txt">TXT</label> </span>
        </div>
        <div id="condition">
            <span><input type="text" id="conditions" style="width:410px;height:20px;"/></span>
            <span><input type="button" id="doSearch" value="搜索" style="height:28px;width:50px;"/> </span>
        </div>
    </div>

    <div class="clear"></div>

    <div style="background-color:#bbb;width:100%;height:20px;margin-top:10px;">
        <span style="float:right; padding-right:10px;"><a style="color:blue;font-weight:bolder;"
                                                          href="<%=basePath %>base/center.jsp?knowledge"
                                                          target="_blank"></a></span>
    </div>
    <div id="result">
        <div id="searchResultDiv"></div>
    </div>

    <!-- 分页栏-->
    <div id="page"></div>

</div>
</body>
</html>
