var investmentMain = {panel:null};

investmentMain.init = function() {
	Ext.QuickTips.init();
	
	investmentMain.leftTree = investmentTree.init();//左边树
	investmentMain.rightgrid = investmentGrid.gridPanel();//右边列表
	
	//1、左边树布局
	investmentMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[investmentMain.leftTree]
	});

	//2、右边列表布局
	investmentMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[investmentMain.rightgrid]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [investmentMain.leftpanel, investmentMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(investmentMain.init, investmentMain, true);
