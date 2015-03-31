<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="https://ajax4jsf.dev.java.net/ajax" prefix="a4j"%>
<%@ taglib uri="http://jboss.com/products/seam/taglib" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="../lib/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/file-upload.css" />
<link rel="stylesheet" type="text/css" href="../base/forum.css" />
<link rel="stylesheet" type="text/css" href="../css/TreeGrid.css">

<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript" src="../lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../lib/ext/ext-all.js"></script>
<script type="text/javascript"
	src="../lib/ext/source/util/ComboBoxTree.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?mydate_MyDateRemote&dataEntity_DataEntityRemote&datacenter_DataCenterRemote"></script>
<script type="text/javascript" src="../js/base/connection.js"></script>
<script type="text/javascript" src="../js/base/log.js"></script>
<script type="text/javascript" src="../js/base/feedback.js"></script>
<script type="text/javascript" src="../js/base/remind.js"></script>
<script type="text/javascript" src="../js/base/mytaskExtend.js"></script>
<script type="text/javascript" src="../js/base/FileUploadField.js"></script>


<script type="text/javascript"
	src="../js/edm/datacenter/dataCateList.js"></script>
<script type="text/javascript"
	src='../js/edm/viewDataCenter/cateInstanceTree.js'></script>
<script type="text/javascript"
	src='../js/edm/datacenter/cateInstanceAttriTab.js'></script>
<script type="text/javascript"
	src='../js/edm/viewDataCenter/cateInstanceEditTab.js'></script>
<script type="text/javascript"
	src='../js/edm/viewDataCenter/cateInstancePanel.js'></script>
<script type="text/javascript"
	src="../js/edm/viewDataCenter/dataCenterWareHouse.js"></script>

<script type="text/javascript"
	src="../js/edm/viewDataCenter/wareHouseAttribute.js"></script>
<script type="text/javascript"
	src="../js/edm/customWareHouse/whExtend.js"></script>
<script type="text/javascript"
	src='../js/base/DataPrivilege/setDataPrivilege.js'></script>

<script type="text/javascript"
	src="../js/common/fileUploadDialog/fileUploadDialog.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/dataCenterLocation.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/categoryData.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/dataCenterData.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/TreeGrid.packed.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/AbstractTreeStore.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/AdjacencyListStore.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/EditorGridPanel.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/sysEditTreeGridPanel.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/ExtOverride.js"></script>
<script type="text/javascript" src="../js/base/treegridlib/GridPanel.js"></script>
<script type="text/javascript" src="../js/base/treegridlib/GridView.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/NestedSetStore.js"></script>
<script type="text/javascript" src="../js/base/treegridlib/NS.js"></script>
<script type="text/javascript"
	src="../js/base/treegridlib/PagingToolbar.js"></script>
<script type="text/javascript" src="../js/base/treegridlib/XType.js"></script>
<script type="text/javascript"
	src="../js/common/taskDataObject/dataObjectTreeGrid.js"></script>
<script type="text/javascript"
	src="../js/common/taskDataObject/dataObjectPanel.js"></script>
<script type="text/javascript"
	src="../js/common/taskDataObject/dataCenterGridView.js"></script>
<script type="text/javascript"
	src="../js/common/taskDataObject/searchPanel.js"></script>
<script type="text/javascript"
	src="../js/common/taskDataObject/searchResultTreeGrid.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/queryRelationDataWin.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/queryRelationDataResult.js"></script>
<script type="text/javascript"
	src="../js/edm/datacenter/taskRelationTreeGrid.js"></script>
<script type="text/javascript" src="../js/edm/datacenter/viewData.js"></script>
<script type="text/javascript" src='../js/edm/datacenter/projectform.js'></script>
<script type="text/javascript"
	src="../js/edm/datacenter/dataObjectTreeGridView.js"></script>

<script type="text/javascript" src="../js/base/synchronizeAjax.js"></script>
<script type="text/javascript"
	src="../js/common/project/CreateExtendForm.js"></script>
<script type="text/javascript"
	src="../js/common/project/ProjectAttributePanel.js"></script>
<script type="text/javascript" src="../js/base/MyGrid.js"></script>
<script type="text/javascript" src="../js/base/BufferView.js"></script>
<script type="text/javascript"
	src="../js/common/project/createApproveTask.js"></script>
<script type="text/javascript"
	src="../js/common/project/TaskAttributePanel.js"></script>
<script type="text/javascript"
	src="../js/common/project/viewApproveTask.js"></script>
<script type="text/javascript"
	src="../js/common/project/viewExtendForm.js"></script>
<script type="text/javascript"
	src="../js/common/project/viewTaskForm.js"></script>
<script type="text/javascript" src="js/taskProperty.js"></script>
<script type="text/javascript"
	src="../lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?mydate_MyDateRemote"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?myLog_FeedBackInfoRemote"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?common_inst_InstSelectSvr"></script>
<script type="text/javascript"
	src="seam/resource/remoting/interface.js?base_user_UserSerivce"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?myLog_FeedBackAddRemote"></script>
<script type="text/javascript"
	src="../seam/resource/remoting/interface.js?dataentity_DataEntityServiceImpl"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_ja.js"></script>
<script type="text/javascript"
	src="../js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="../lib/ext/ux/CheckColumn.js"></script>
<script type="text/javascript" src='../lib/ext/ux/ColumnHeaderGroup.js'></script>
<script type="text/javascript" src='../lib/ext/ux/GroupHeaderPlugin.js'></script>
<script type="text/javascript" src="../js/base/StringFormat.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="on-cache">
<meta http-equiv="cache-control" content="on-cache">


<script type="text/javascript" src="updateDate.js"></script>

<script type="text/javascript" src="../lib/ext/ux/examples.js"></script>
<script type="text/javascript">

</script>
<style>
.tclass td {
	padding: 5px;
	border-right: 1px solid #D4E5F6;
	border-bottom: 1px solid #D4E5F6;
	font-size: 12px;
}

.tclass table {
	border-collapse: collapse;
	border-top: 1px solid #D4E5F6;
	border-left: 1px solid #D4E5F6;
}

.tclass {
	border-top: 1px solid #D4E5F6;
	border-left: 1px solid #D4E5F6;
}
.x-box-item
{   
    font-size:12px;
    position:absolute;
    left:0;
    top:0;
}
</style>
</head>
<body oncontextmenu="self.event.returnValue=false"
	style="overflow: hidden;">
</body>
</html>
