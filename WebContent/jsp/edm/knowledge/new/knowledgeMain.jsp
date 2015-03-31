<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head><title>

</title>
    <%@include file="includeJsFrame.jsp" %>
    <script type="text/javascript" src="./js/knowledgeMain.js"></script>
    <script type="text/javascript" src="./js/jquery.poshytip.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>seam/resource/remoting/interface.js?km_fileInstanceRemote&km_searchRemote&km_ClassifyTreeRemote&KM_ClassifyTree&DictEntity&km_dictInstanceRemote"></script>
    <link href="<%=basePath %>css/tip-yellowsimple/tip-yellowsimple.css" type="text/css" rel="stylesheet" media="screen"/>
    <link href="<%=basePath %>js/edm/knowledge/searchResult.css" type="text/css" rel="stylesheet" media="screen"/>
</head>
<body>
<div id="search"></div>
</body>
</html>