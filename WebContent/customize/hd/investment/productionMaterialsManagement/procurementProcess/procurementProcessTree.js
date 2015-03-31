//零星采购计划新建树
var procurementProcessTree = {
	treePanel : null,
	parentId : 'root',
	nType : '', // 结点类型：0为物料种类，1为物料
	mType : '', // 物料种类第一级名称
	selectedMC : null, // 被选中的结点
	materialIDs : ',',
	catalogIDs : ',',
	materialArray : null,
	materialCatlogArray : null,
	materialcheckLock : '1'
};

procurementProcessTree.init = function() {
	
	var treePanel = new procurementProcessTree.treePanel();
	treePanel.on("beforeload",function(node){
		var loader = treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId=' + node.id
				+ '&remoteName=materialCatalogRemote&showMaterial=0&procurementId='+procurementProcessData.procurementId;
	});
	treePanel.on("click",procurementProcessTree.clickCallBack);
	
	var panel = new Ext.Panel( {
		title : '',
		width : 300,
		height : 300,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items : [ treePanel ]
	});

	return panel;
}


// 物料种类树
procurementProcessTree.treePanel = function(){ 
	var tree = new Ext.tree.TreePanel( {
		id : 'treePanelId',
		width : 200,
		autoScroll : true,
		animate : true,
		enableDD : true,
		frame : true,
		split : true,
		containerScroll : true,
		cls : 'file',
		loader : new Ext.tree.TreeLoader({}),
		root : new Ext.tree.AsyncTreeNode( {
			id : '0',
			text : '物资种类树',
			draggable : false,
			expanded : true,
			iconCls : 'icon-project'
		})
	});
	return tree;
}

procurementProcessTree.clickCallBack = function(node) {
	if(procurementProcessData.procurementId==null||procurementProcessData.procurementId==''){
		Ext.Msg.alert('提示', '请先选择需求大纲！');
		return;
	}
	if(!node.attributes.leaf){
		Ext.Msg.alert('提示', '不是叶节点！');
		return ;
	}
	if(node.text.indexOf("<font color='red'>")==-1){
		Ext.Msg.alert('提示', '该节点下没有物料或对该该物料没有操作权限！');
		return ;
	}
	
	Ext.getCmp("downCommit").disable();
	procurementProcessData.threeIdStrings = '';
	procurementProcessData.store.removeAll();
	procurementProcessData.store.load();
	procurementProcessData.isLingXingCommit = false;
	procurementProcessData.materialCatLogId = node.id;
	var grid = Ext.getCmp("productionProcessUpId1");
	grid.getStore().baseParams = {
			start : 0,
			limit : 0,
			procurementId : procurementProcessData.procurementId,
			materialTypeName : node.text,
			purchaseType : procurementProcessData.newProcessType,
			type : '2',
			materialCatLogId : node.id
		};
	grid.getStore().load();
	
}

// 1、左边树布局
procurementProcessTree.leftpanel = new Ext.Panel( {
	id : 'NLLeftTree',
	region : 'west',
	width : '200',
	layout : 'fit',// 自适应整个高度
	border : false,
	split : true,
	items : [ procurementProcessTree.init() ]
}); 
// 上部包含树总体布局
procurementProcessTree.upTreePanel = new Ext.Panel( {
	id : 'upTree',
	region : 'north',
	height : 300,
	width : '1000',
	layout : 'border',// 自适应整个高度
	border : false,
	split : true,
	items : [ procurementProcessTree.leftpanel,procurementProcessData.upPanel()]
}); 
