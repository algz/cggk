var stockInspectMain = {
	start:null,
	limit:null
};


stockInspectMain.init = function() {
	//设置采购监控所有表格分页展示的数量
	stockInspectMain.start=0;
	stockInspectMain.limit=5;
	
	var view = new Ext.Viewport({
		layout : 'border',
		id : 'stockInspectMainPanel',
		items :[stockInspectTopTab.tab(),stockInspectDownTab.tab]
	});	
};

Ext.onReady(stockInspectMain.init, stockInspectMain, true);