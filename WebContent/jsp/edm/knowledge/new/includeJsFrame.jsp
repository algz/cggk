<%
String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
 response.setHeader("Expires","Sat, 6 May 2015 12:00:00 GMT");
%>
<script type="text/javascript" src="<%=basePath%>lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath%>lib/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath%>lib/ext/source/locale/ext-lang-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>lib/ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>lib/ext/ux/css/examples.css">
<script type="text/javascript" src="<%=basePath%>lib/jquery/jquery-1.4.4.min.js"></script>
<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="<%=basePath%>js/base/connection.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/combobox/ComboBoxTree.js"></script>
<script type="text/javascript" src="<%=basePath%>lib/ext/ux/examples.js"></script>
<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=basePath%>/lib/ext/resources/images/default/s.gif';
        var basePath="<%=basePath%>";
    window.onerror=function(){
        return true;
    }
</script>
