var materialProvideMain = {panel:null};

materialProvideMain.init = function() {
	Ext.QuickTips.init();
	
	materialProvideMain.leftTree = materialProvideTree.init();//左边树
	materialProvideMain.rightgrid = materialProvideGrid.gridPanel();//右边列表
	
	//1、左边树布局
	materialProvideMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[materialProvideMain.leftTree]
	});

	//2、右边列表布局
	materialProvideMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[materialProvideMain.rightgrid]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [materialProvideMain.leftpanel, materialProvideMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(materialProvideMain.init, materialProvideMain, true);
