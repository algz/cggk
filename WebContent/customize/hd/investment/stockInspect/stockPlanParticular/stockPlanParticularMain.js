var stockPlanParticularMain = {
	start:null,
	limit:null
};


stockPlanParticularMain.init = function() {
	//设置采购监控所有表格分页展示的数量
	stockPlanParticularMain.start=0;
	stockPlanParticularMain.limit=15;
	
	var view = new Ext.Viewport({
		layout : 'fit',
		id : 'stockPlanParticularMainPanel',
		items :[stockPlanParticularGrid.init()]
	});	
};

Ext.onReady(stockPlanParticularMain.init, stockPlanParticularMain, true);