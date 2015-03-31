var unplannedPurchaseMain = {panel:null};

unplannedPurchaseMain.init = function() {
	Ext.QuickTips.init();
	
	unplannedPurchaseMain.leftTree = unplannedPurchaseTree.init();//左边树
	unplannedPurchaseMain.rightgrid = unplannedPurchaseGrid.gridPanel();//右边列表
	
	//1、左边树布局
	unplannedPurchaseMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[unplannedPurchaseMain.leftTree]
	});

	//2、右边列表布局
	unplannedPurchaseMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[unplannedPurchaseMain.rightgrid]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [unplannedPurchaseMain.leftpanel, unplannedPurchaseMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(unplannedPurchaseMain.init, unplannedPurchaseMain, true);
