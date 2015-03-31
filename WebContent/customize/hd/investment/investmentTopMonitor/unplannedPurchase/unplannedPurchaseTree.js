var unplannedPurchaseTree = {
	treePanel : null,
	parentId : 'root',
	nType : '',					// 结点类型：0为物资种类，1为物资
	mType : '',					// 物资种类第一级名称
	selectedMC : '',			// 被选中的结点ID
	materialIDs:',',
	catalogIDs:',',
	materialArray:null,
	materialCatlogArray:null,
	materialcheckLock:'1'
	
};

unplannedPurchaseTree.init = function(){
	tlework.addHtml(tlework.divHtml,'tree');

	unplannedPurchaseTree.treePanel.on("beforeload",unplannedPurchaseTree.beforeCallBack);
	unplannedPurchaseTree.treePanel.on("click",unplannedPurchaseTree.clickCallBack);
	unplannedPurchaseTree.treePanel.on("checkchange",unplannedPurchaseTree.checkchangeCallBack);
	var panel = new Ext.Panel({
		title: '',
		width : 300,
		height: 500,
		split: true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items:[unplannedPurchaseTree.treePanel]
	});

	return panel;
}

//物资种类树
unplannedPurchaseTree.treePanel = new Ext.tree.TreePanel({
	id: 'unplannedPurchaseTreePanel',
	el : 'tree',
	width : 200,
	autoScroll : true,
    animate : true,
    enableDD : true,
    frame : true,
    split : true,
    containerScroll : true,
    cls : 'file',
	loader : new Ext.tree.TreeLoader({
	}),
	root : new Ext.tree.AsyncTreeNode({
		id:'0',
		text:'物资种类树',
		draggable : false,
		expanded: true,
		iconCls : 'icon-project'
	})
	
});

unplannedPurchaseTree.beforeCallBack = function(node) {	
	var loader = unplannedPurchaseTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId='+node.id
		+ '&remoteName=materialCatalogRemote';
}

unplannedPurchaseTree.clickCallBack = function(node) {	
	var grid = Ext.getCmp('unplannedPurchaseGridPanelId');
	grid.getStore().baseParams = {
		nodeId:node.id,
		start:0,
		limit:20
	};
	grid.store.load();
	
}

