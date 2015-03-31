var equipTree = {

	treePanel : null,
	parentId : 'root'
};
//机型树初始化
equipTree.init = function() {

	tlework.addHtml(tlework.divHtml, 'equipTree');
	equipTree.treePanel.on("beforeload", equipTree.beforeCallBack);
	equipTree.treePanel.on("click", equipTree.clickCallBack);
	var panel = new Ext.Panel( {
		title : '',
		width : 300,
		height : 500,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items : [ equipTree.treePanel ]
	});
	return panel;
}

// 机型树
equipTree.treePanel = new Ext.tree.TreePanel( {
	id : 'tpanel1',
	el : 'equipTree',
	width : 200,
	autoScroll : true,
	animate : true,
	enableDD : true,
	frame : true,
	split : true,
	containerScroll : true,
	cls : 'file',
	loader : new Ext.tree.TreeLoader( {
	}),
	root : new Ext.tree.AsyncTreeNode( {
		id : '0',
		text : '产品型号',
		draggable : false,
		expanded : true,
		iconCls : 'icon-project'
	})

});
//机型树回调前，加载页面
equipTree.beforeCallBack = function(node) {
	var loader = equipTree.treePanel.getLoader();
	loader.dataUrl = '../ProductJsonServlet?parentId=' + node.id
			+ '&type=2';
}
//机型树回调方法，加载选项卡中的数据
equipTree.clickCallBack = function(node) {

	var id = '' + node.text;
	equipTree.parentId = id;
	if (materialQuotaMain.useType == 0) {//材料定额加载
		loadGrid(0,'materialQuotaPanelId');
	} else if (materialQuotaMain.useType == 1) {//成品清单定额
		loadGrid(1,'inventoryPanelId');
	} else if (materialQuotaMain.useType == 2) {//2备件清册
		loadGrid(2,'inventoryOnePanelId');
	} else if (materialQuotaMain.useType == 3) {//3设备清册
		loadGrid(3,'inventoryTwoPanelId');
	} else if (materialQuotaMain.useType == 4) {//4工具清册
		loadGrid(4,'inventoryThreePanelId');
	} else if (materialQuotaMain.useType == 5) {//5标准件清册
		loadGrid(5,'inventoryFourPanelId');
	}

	function loadGrid(useType,gridId){
		var grid = Ext.getCmp(gridId);
		grid.getStore().baseParams = {
			productCode : id,
			type : useType,
			start : 0,
			limit : 20
		};
		grid.store.load();
	}
	
}
