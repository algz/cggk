var qualityControlMain = {panel:null};

qualityControlMain.init = function() {
	Ext.QuickTips.init();
	
	qualityControlMain.leftTree = qualityControlTree.init();//左边树
	qualityControlMain.rightgrid = qualityControlGrid.gridPanel();//右边列表
	
	//1、左边树布局
	qualityControlMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[qualityControlMain.leftTree]
	});

	//2、右边列表布局
	qualityControlMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[qualityControlMain.rightgrid]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [qualityControlMain.leftpanel, qualityControlMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(qualityControlMain.init, qualityControlMain, true);
