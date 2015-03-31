<%
String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
 response.setHeader("Expires","Sat, 6 May 2015 12:00:00 GMT");
%>
<link rel="stylesheet" type="text/css" href="<%=basePath%>lib/jquery/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>lib/jquery/easyui/themes/icon.css">
<script type="text/javascript" src="<%=basePath%>lib/jquery/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="<%=basePath%>lib/jquery/easyui/jquery.easyui.min.js"></script>
