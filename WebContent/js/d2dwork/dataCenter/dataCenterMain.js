var dataCenterMain = {};

dataCenterMain.init = function() {
	Ext.QuickTips.init();

	dataCenterMain.leftTree = leftNavigationTree.init("dataCenter");
	dataCenterMain.mainContent = dataCenterMainContent.init();
	var treeLoader = dataCenterMain.leftTree.getLoader();
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
					region : 'west',
					title : ''+getResource('resourceParam1244')+'',
					width : 400,
					collapsible : true,
					split : true,
					items : [dataCenterMain.leftTree]
				}, {
					region : 'center',
					items : [dataCenterMain.mainContent]
				}]

	});
	viewport.doLayout();
	dataCenterMain.leftTree.on("click", function(node) {
		if ("io" != node.id.split("_")[0]) {
			Ext.get("baseInfoId").dom.innerHTML = "&nbsp;";
			Ext.get("baseInfoName").dom.innerHTML = "&nbsp;";
			Ext.get("baseInfoType").dom.innerHTML = "&nbsp;";
			Ext.get("baseInfoValue").dom.innerHTML = "&nbsp;";
			return;
		}
		Ext.get("baseInfoId").dom.innerHTML = "&nbsp;" + node.id.split("_")[1];
		Ext.get("baseInfoName").dom.innerHTML = "&nbsp;" + node.attributes.text;
		Ext.get("baseInfoType").dom.innerHTML = "&nbsp;"
				+ node.attributes.dataObjectType;
		if (node.attributes.datatype == 'file') {
			Ext.get("baseInfoValue").dom.innerHTML = '&nbsp;<a style="text-decoration:underline;" href="../DataObjectFileDownLoadServlet?fileid='
					+ node.attributes.dataObjectId
					+ '"><span>'
					+ node.attributes.value + '</span></a>';
		} else {
			Ext.get("baseInfoValue").dom.innerHTML = '&nbsp;<span>'
					+ node.attributes.value + '</span></a>';
		}
		Ext.get("baseInfoFrom").dom.innerHTML = "&nbsp;";
		Ext.get("baseInfoCreator").dom.innerHTML = "&nbsp;";
		Ext.get("baseInfoCreateDate").dom.innerHTML = "&nbsp;";
		Ext.get("baseInfoVersion").dom.innerHTML = "&nbsp;";
	})
	window.onresize = function() {
		leftNavigationTree.treePanel.setHeight(document.body.clientHeight - 26);
		dataCenterMain.mainContent.setHeight(document.body.clientHeight);
	};
	leftNavigationTree.treePanel.setHeight(document.body.clientHeight - 26);
	dataCenterMain.mainContent.setHeight(document.body.clientHeight);
}
Ext.onReady(dataCenterMain.init, dataCenterMain, true);
