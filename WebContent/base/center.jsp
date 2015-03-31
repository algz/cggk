<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache,must-revalidate">
<meta http-equiv="Expires" content="0">

<link rel="stylesheet" type="text/css" href="../lib/ext/ux/css/Spinner.css" />
<link rel="stylesheet" type="text/css" href="../lib/ext/ux/css/LockingGridView.css" />
<link rel="stylesheet" type="text/css" href="../css/column-tree.css">
<link rel="stylesheet" type="text/css" href="../lib/ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="forum.css" />
<link rel="stylesheet" type="text/css" href="ext-ux-livegrid.css" />
<link rel="stylesheet" type="text/css" href="../css/manage/examples.css" />
<link rel="stylesheet" type="text/css" href="../css/ProgressColumn.css" />
<link rel="stylesheet" type="text/css" href="../css/file-upload.css" />
<link rel="stylesheet" type="text/css" href="../css/log.css" />
<link rel="stylesheet" type="text/css" href="../lib/ext/ux/css/ColumnHeaderGroup.css" />
<link rel="stylesheet" type="text/css" href="../lib/ext/source/util/MultiSelect.css" />
<link rel="stylesheet" type="text/css" href="../lib/ext/ux/css/RowEditor.css" />
<link rel="stylesheet" type="text/css" href="../css/Ext.ux.form.LovCombo.css" />
<link rel="stylesheet" type="text/css" href="../lib/gantt/css/sch-gantt-all.css"/>
<link rel="stylesheet" type="text/css" href="../lib/gantt/css/examples.css" />
<link rel="stylesheet" type="text/css" href="../css/ganttbate/gantt.css" />
<link rel="stylesheet" type="text/css" href="../css/TreeGrid.css" />
<link rel="stylesheet" type="text/css" href="../css/baobiao/baobiao.css" />
<link rel='stylesheet' type='text/css' href='../css/date.css'/>
<link rel='stylesheet' type='text/css' href='../lib/mxgraph/src/css/common.css'/>
<link rel='stylesheet' type='text/css' href='../lib/mxgraph/src/css/explorer.css'/>
<link rel="stylesheet" type="text/css" href="override-ext.css" />

<script type="text/javascript">
	mxBasePath = '../lib/mxgraph/src';
	function getLanguage(){
		return '<%=session.getAttribute("lang")%>';
	}
</script>
<script type="text/javascript" src="../js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../js/base/inputJS.js?version=v34"></script>
<script type="text/javascript" src="../js/base/inputJS_loader.js"></script>
<!-- 权限验证 -->
<script src="../customize/hd/privilegeValidate.js" type="text/javascript"></script>
<script src="../js/d2dwork/myApprove/approveFlowSteps.js" type="text/javascript"></script>
<script src="../customize/hd/investment/approvalInfo/approvalInfoList.js" type="text/javascript"></script>
</head>
<body oncontextmenu="self.event.returnValue=false" oncontextmenu="self.event.returnValue=false" onunload="base.gbg();">
<iframe oncontextmenu="self.event.returnValue=false" scrolling=auto id='hiddenPanelframe' frameborder=0 height="0" width="0"></iframe>

	<script type="text/javascript">
		var serviceName ='<%=request.getContextPath()%>';
		var screenWidth  = document.body.clientWidth;
		var screenHeight = document.body.clientHeight;
	</script>


</body>
</html>
