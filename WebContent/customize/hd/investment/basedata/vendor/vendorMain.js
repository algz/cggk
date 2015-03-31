var vendorMain = {panel:null};
vendorMain.init = function() {
	Ext.QuickTips.init();
	
//	vendorMain.leftTree = vendorTree.init();//左边树
//	vendorMain.rightgrid = vendorGrid.gridPanel();//右边列表
	
//	//1、左边树布局
//	vendorMain.leftpanel = new Ext.Panel({
//		id:'leftTree1',
//		region:'west',
//		width:'240',
//		layout:'fit',//自适应整个高度
//		border:false,
//		split : true,
//		margin:'0 0 5 0',
//		items:[vendorMain.leftTree]
//	});

	//2、右边列表布局
	vendorMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[materialGrid.gridPanel()]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
//		items : [vendorMain.leftpanel, vendorMain.rightpanel]
		items : [vendorMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(vendorMain.init, vendorMain, true);
