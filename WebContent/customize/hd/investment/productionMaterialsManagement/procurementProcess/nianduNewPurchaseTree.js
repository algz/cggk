//年度采购计划新建树
var nianduNewPurchaseTree = {
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
//年度采购计划新建树初始化
nianduNewPurchaseTree.init = function() {
	
	var treePanel = new nianduNewPurchaseTree.treePanel();
	treePanel.on("beforeload",function(node){
		var loader = treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId=' + node.id
				+ '&remoteName=materialCatalogRemote&showMaterial=0&procurementId='+procurementProcessData.procurementId;
	});
	treePanel.on("click",nianduNewPurchaseTree.clickCallBack);
	
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


// 物资种类树panel
nianduNewPurchaseTree.treePanel = function(){ 
	var tree = new Ext.tree.TreePanel( {
		id : 'nianduTreePanelId',
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
//年度采购计划新建树回调方法，进行节点含义验证
nianduNewPurchaseTree.clickCallBack = function(node) {
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
	procurementProcessData.isNianDuCommit = false;
	procurementProcessData.materialCatLogId = node.id;
	//根据当前树节点，加载年度采购计划数据。
	var grid = Ext.getCmp("card3PanelDataGrid");
	grid.getStore().baseParams = {
			start : 0,
			limit : 20,
			procurementId : procurementProcessData.procurementId,
			materialTypeName : node.text,
			procurementType : procurementProcessData.newProcessType,
			type : '1',
			materialCatLogId : node.id,
			materialBuyType:'1'
		};
	grid.getStore().load();
	
}

// 1、左边树布局
nianduNewPurchaseTree.leftpanel = new Ext.Panel( {
	id : 'nianduLeftTree',
	region : 'west',
	width : '200',
	layout : 'fit',// 自适应整个高度
	border : false,
	split : true,
	items : [ nianduNewPurchaseTree.init() ]
}); 
// 年度采购计划上部面板
nianduNewPurchaseTree.upTreePanel = function(){
	return new Ext.Panel( {
		id : 'nianduTree',
		region : 'north',
		height : 300,
		width : '1000',
		layout : 'border',// 自适应整个高度
		border : false,
		split : true,
		items : [ nianduNewPurchaseTree.leftpanel,procurementProcessData.card3Panel()]
	});
} 
