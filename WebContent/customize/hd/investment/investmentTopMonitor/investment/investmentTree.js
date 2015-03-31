var investmentTree = {
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

investmentTree.init = function(){
	tlework.addHtml(tlework.divHtml,'tree');

	investmentTree.treePanel.on("beforeload",investmentTree.beforeCallBack);
	investmentTree.treePanel.on("click",investmentTree.clickCallBack);
	investmentTree.treePanel.on("checkchange",investmentTree.checkchangeCallBack);
	var panel = new Ext.Panel({
		title: '',
		width : 300,
		height: 500,
		split: true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items:[investmentTree.treePanel]
	});

	return panel;
}

//物资种类树
investmentTree.treePanel = new Ext.tree.TreePanel({
	id: 'investmentTreePanel',
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

investmentTree.beforeCallBack = function(node) {
	
	var loader = investmentTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId='+node.id
		+ '&remoteName=materialCatalogRemote&showMaterial=1';
}

investmentTree.clickCallBack = function(node) {
	investmentTree.selectedMC = node;
	var nodeDepth = node.getDepth();
	for(var i = nodeDepth; i > 1; i--){
		node = node.parentNode;
	}
	if(nodeDepth >= 1){
		investmentTree.mType = node.text;
	}else{
		investmentTree.mType = '';
	}
	
	var grid = Ext.getCmp('unplannedPurchaseGridPanelId');
	grid.getStore().baseParams = {nodeId:investmentTree.selectedMC.id,
		nodeType:investmentTree.selectedMC.attributes.materialType,
		topTypeName:investmentTree.mType,start:0,limit:20};
	grid.store.load();
	
}

