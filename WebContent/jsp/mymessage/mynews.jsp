<%@ page language="java" contentType="text/html; charset=UTF-8"
  	pageEncoding="UTF-8"%>
<html>
<head>
<title><%=session.getAttribute("resourceParam_1876")%></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../../lib/ext/source/util/MultiSelect.css" />
<script type="text/javascript" src="../../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="../../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript" src="../../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="../base/base.js"></script>
<script type="text/javascript" src="../../seam/resource/remoting/interface.js?messagereceive_MessageReceiveRemote&base_user_UserSerivce&messageuser_MessageUserRemote"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mynewsMain.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mynewsInboxDetails.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mynewsOutboxDetails.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mynewsInboxGrid.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mynewsOutboxGrid.js"></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/mymessageSendBox.js"></script>

<script type="text/javascript" src="../../lib/ext/source/util/ComboBoxTree.js"></script>
<script type="text/javascript" src="../../lib/ext/source/util/DDView.js"></script>
<script type="text/javascript" src="../../lib/ext/source/util/ItemSelector.js"></script>
<script type="text/javascript" src="../../lib/ext/source/util/MultiSelect.js""></script>
<script type="text/javascript" src="../../js/d2dwork/mymessage/userMultiselect.js"></script>

<script type="text/javascript" src="../../js/common/combobox/ComboBoxTree.js"></script>
<style type="text/css">
.ux-mselect{
    background:white;
    position:relative; /* for calculating scroll offsets */
    zoom:1;
    overflow:auto;	
}
</style>
</head>
<body oncontextmenu="self.event.returnValue=false" >
   <div style="margin:10px 90px"><%=session.getAttribute("resourceParam_1876")%>|
   <a href="#" style="text-decoration: none" onclick="javascript:history.go(-1)" ><%=session.getAttribute("resourceParam_450")%></a>
   </div>
 <hr width="85%">
   <div id="div_mynews" style="margin:20px 100px;"></div>
   <script type="text/javascript">
     var tapid='<%=request.getParameter("tapid") %>';
     mymessageMain.init(tapid);
  </script>
  
</body>
</html>
