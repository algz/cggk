var capitalMain = {panel:null};

capitalMain.init = function() {
	Ext.QuickTips.init();
	
	capitalMain.leftTree = capitalTree.init();//左边树
	capitalMain.rightgrid = capitalGrid.gridPanel();//右边列表
	
	//1、左边树布局
	capitalMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
		region:'west',
		width:'240',
		layout:'fit',//自适应整个高度
		border:false,
		split : true,
		margin:'0 0 5 0',
		items:[capitalMain.leftTree]
	});

	//2、右边列表布局
	capitalMain.rightpanel = new Ext.Panel({
		id:'rightGrid1',
		region:'center',
		width:'300',
		layout:'fit',//自适应整个高度
		border:false,
		margin:'0 0 5 0',
		items:[capitalMain.rightgrid]
	});
	
	//3、 页面总布局
	var viewport = new Ext.Viewport({ 
		layout : 'border',
		autoHeight : true,
		items : [capitalMain.leftpanel, capitalMain.rightpanel]
	});
	
	viewport.doLayout();
}

Ext.onReady(capitalMain.init, capitalMain, true);
