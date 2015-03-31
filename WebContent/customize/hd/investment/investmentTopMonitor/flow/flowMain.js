var flowMain = {panel:null};

flowMain.init = function() {
	Ext.QuickTips.init();
	
	flowMain.leftTree = flowTree.init();//左边树
	flowMain.rightgrid = flowTab.tabs();//右边列表
	
	//1、左边树布局
	flowMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[flowMain.leftTree]
	});

	//2、右边列表布局
	flowMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[flowMain.rightgrid]
	});
	
	//3、 页面总布局o
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [flowMain.leftpanel, flowMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(flowMain.init, flowMain, true);
