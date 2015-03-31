var materialCatalogTree = {
	treePanel : null,
	parentId :  'root',
	tempNodeId:''
};
//物料种类树初始化
materialCatalogTree.init = function(){
	tlework.addHtml(tlework.divHtml,'tree');
	materialCatalogTree.treePanel.on("beforeload",materialCatalogTree.beforeCallBack);
	materialCatalogTree.treePanel.on("click",materialCatalogTree.clickCallBack);
	var panel = new Ext.Panel({
		width : 300,
		height: 500,
		split: true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items:[materialCatalogTree.treePanel]
	});
	return panel;
}

//物料种类树面板
materialCatalogTree.treePanel = new Ext.tree.TreePanel({
	id: 'materialCatalogTreePanel',
	width : 200,
	autoScroll : true,
    animate : true,
    enableDD : true,
    frame : true,
    split : true,
    cls : 'file',
	loader : new Ext.tree.TreeLoader({
	//dataUrl : '../JsonServlet'
	}),
	root : new Ext.tree.AsyncTreeNode({
		id:'0',
		text:'物资种类树',
		draggable : false,
		expanded: true,
		iconCls : 'icon-project'
	})
});
//物料种类树回调之前，加载物料种类信息列表
materialCatalogTree.beforeCallBack = function(node) {
	var loader = materialCatalogTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId='+node.id+'&remoteName=materialCatalogRemote'+'&showMaterial=0';
	if(node.id=='0'){
		var id = '' + node.id;
		//把id赋值给全局变.量
		materialCatalogTree.parentId = id;
		var grid = Ext.getCmp('materialCatalogGridPanelId');
		grid.getStore().baseParams = {startId:node.id,start : 0,limit : 20};
		grid.store.load();
	}
}
//点击物料种类树，回调方法
materialCatalogTree.clickCallBack = function(node) {
	var searchField = Ext.getCmp('catlogName');
	searchField.setRawValue('');
	
	var id = '' + node.id;
	//把id赋值给全局变.量
	materialCatalogTree.parentId = id;
	var grid = Ext.getCmp('materialCatalogGridPanelId');
	grid.getStore().baseParams = {startId:node.id,start : 0,limit : 20};
	grid.store.load();
	
}
//物料种类树刷新方法
materialCatalogTree.freshCallBack = function(node) {
	
	var id = '' + node.id;
	//把id赋值给全局变量
	materialCatalogTree.parentId = id;
	node.reload();
	var grid = Ext.getCmp('materialCatalogGridPanelId');
	grid.getStore().baseParams = {startId:node.id,start : 0,limit : 20};
	grid.store.load();
	
}

