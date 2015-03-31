var materialProvideTree = {
	treePanel : null,
	parentId : 'root',
	nType : '', // 结点类型：0为物资种类，1为物资
	mType : '', // 物资种类第一级名称
	selectedMC : '', // 被选中的结点ID
	materialIDs : ',',
	catalogIDs : ',',
	materialArray : null,
	materialCatlogArray : null,
	materialcheckLock : '1'

};

materialProvideTree.init = function() {
	tlework.addHtml(tlework.divHtml, 'tree');

	materialProvideTree.treePanel.on("beforeload",
			materialProvideTree.beforeCallBack);
	materialProvideTree.treePanel
			.on("click", materialProvideTree.clickCallBack);
	materialProvideTree.treePanel.on("checkchange",
			materialProvideTree.checkchangeCallBack);
	var panel = new Ext.Panel( {
		title : '',
		width : 300,
		height : 500,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items : [ materialProvideTree.treePanel ]
	});

	return panel;
}

// 物资种类树
materialProvideTree.treePanel = new Ext.tree.TreePanel( {
	id : 'materialProvideTreePanel',
	el : 'tree',
	width : 200,
	autoScroll : true,
	animate : true,
	enableDD : true,
	frame : true,
	split : true,
	containerScroll : true,
	cls : 'file',
	loader : new Ext.tree.TreeLoader( {}),
	root : new Ext.tree.AsyncTreeNode( {
		id : '0',
		text : '物资种类树',
		draggable : false,
		expanded : true,
		iconCls : 'icon-project'
	})

});

materialProvideTree.beforeCallBack = function(node) {

	var loader = materialProvideTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId=' + node.id
			+ '&remoteName=materialCatalogRemote&showMaterial=0';
}

materialProvideTree.clickCallBack = function(node) {
	materialProvideTree.selectedMC = node;
	var nodeDepth = node.getDepth();
	for ( var i = nodeDepth; i > 1; i--) {
		node = node.parentNode;
	}
	if (nodeDepth >= 1) {
		materialProvideTree.mType = node.text;
	} else {
		materialProvideTree.mType = '';
	}

	var grid = Ext.getCmp('materialProvideGridPanelId');
	grid.getStore().baseParams = {
		nodeId : materialProvideTree.selectedMC.id,
		nodeType : materialProvideTree.selectedMC.attributes.materialType,
		id : materialProvideTree.selectedMC.id,
		topTypeName : materialProvideTree.mType,
		start : 0,
		limit : 20
	};
	grid.store.load();

}
