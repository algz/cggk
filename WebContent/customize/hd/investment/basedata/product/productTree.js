var productTree = {

	treePanel : null,
	parentId :  'root'
};
productTree.init = function(){
	tlework.addHtml(tlework.divHtml,'tree');
	productTree.treePanel.on("beforeload",productTree.beforeCallBack);
	productTree.treePanel.on("click",productTree.clickCallBack);
	var panel = new Ext.Panel({
		title: '',
		width : 300,
		height: 500,
		split: true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items:[productTree.treePanel]
	});
	return panel;
}
//产品种类树
productTree.treePanel = new Ext.tree.TreePanel({
	id: 'productTreePanel',
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
		text:'产品信息树',
		draggable : false,
		expanded: true,
		iconCls : 'icon-project'
	})	
});
productTree.beforeCallBack = function(node) {
	var loader = productTree.treePanel.getLoader();
	loader.dataUrl = '../ProductJsonServlet?parentId='+node.id+'';
}
productTree.clickCallBack = function(node) {	
	
	var id = '' + node.id;
	productTree.parentId = id;
	var grid = Ext.getCmp('productProductid');
	grid.getStore().baseParams = {startId:node.id,start : 0,limit : 20};
	grid.store.load();
	}
