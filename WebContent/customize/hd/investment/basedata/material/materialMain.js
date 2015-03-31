var materialMain = {
	panel : null
};
materialMain.init = function() {
	Ext.QuickTips.init();
	Ext.Ajax.timeout=300000;
	
	materialMain.leftTree = materialTree.init();// 物料种类树
	materialMain.rightGrid = materialGrid.gridPanel();// 物料信息列表
	materialMain.loadvalue();
	// 物料种类树布局
	materialMain.leftpanel = new Ext.Panel( {
		id : 'leftTree1',
		region : 'west',
		 layout:'fit',//自适应整个高度
		width : '240',
		border : false,
		split : true,
		margin : '0 0 5 0',
		items : [ materialTree.init() ]
	});
	// 物料信息列表布局
	materialMain.panel = new Ext.Panel( {
		id : 'rightGrid1',
		layout : 'fit',
		region : 'center',
		width : '300',
		border : false,
		margin : '0 0 5 0',
		items : [ materialGrid.gridPanel() ]
	});
	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border',
		autoHeight : true,
		items : [ materialMain.leftpanel, materialMain.panel ]
	});
	viewport.doLayout();
	myGrid.loadvalue(materialMain.rightGrid.store, {
		start : 0,
		limit : 25
	}, materialMain.baseargs);

};
// 加载表格数据
materialMain.loadvalue = function() {
	myGrid.loadvalue(materialMain.rightGrid.store, {
		start : 0,
		limit : 25
	}, materialMain.baseargs);
};

Ext.onReady(materialMain.init, materialMain, true);
