var materialTree = {
	treePanel : null,
	parentId : 'root'
};
//物料信息初始化
materialTree.init = function() {

	tlework.addHtml(tlework.divHtml, 'tree');
	materialTree.treePanel.on("beforeload", materialTree.beforeCallBack);
	materialTree.treePanel.on("click", materialTree.clickCallBack);
	var panel = new Ext.Panel( {
		title : '',
		width : 300,
		height : 650,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items : [ materialTree.treePanel ]
	});
	return panel;
}

// 物资种类树
materialTree.treePanel = new Ext.tree.TreePanel( {
	id : 'materialTreePanel',
	el : 'tree',
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
		text : '物资种类树',
		draggable : false,
		expanded : true,
		iconCls : 'icon-project'
	})

});
//物料信息树回调前，刷新物料信息列表
materialTree.beforeCallBack = function(node) {

	var loader = materialTree.treePanel.getLoader();

	loader.dataUrl = '../JsonServlet?parentId=' + node.id
			+ '&remoteName=materialCatalogRemote' + '&showMaterial=0';
}
//物料信息树，回调方法，加载数据
materialTree.clickCallBack = function(node) {
	
	var searchField = Ext.getCmp('materialItemName');
	searchField.setRawValue('');

	if(node.attributes['leaf']){//所选择节点为leaf节点，才可以进行添加物料信息操作
		Ext.getCmp('addBtnId').enable();
	}else{
		Ext.getCmp('addBtnId').disable();
	}
	
	var id = '' + node.id;
	materialTree.parentId = id;
	var grid = Ext.getCmp('materialGridPanelId');
	grid.getStore().baseParams = {
		startId : node.id,
		start : 0,
		limit : 20
	};
	grid.store.load();

}
