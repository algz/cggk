var stockPactChildTab = {
}

stockPactChildTab.tab = function(){
	//采购执行界面
	stockPactChildTab.messageGrid=StockExecutePanel.grid(stockInspectMain.start,stockInspectMain.limit,'没有查询无编号','没有查询无名称');
	//效能分析界面
	stockPactChildTab.eaPanel = efficiencyAnalysisPanel.init();
	//质量监控界面
	stockPactChildTab.qiPanel = qualityInspectPanel.init();
	stockPactChildTab.StockExecutePanel = new Ext.Panel( {
		title : '采购执行',
		layout:'fit',
		items:[stockPactChildTab.messageGrid]
	});

//	var cenpanel2 = new Ext.Panel( {
//		title : '质量监控'
//	});
	
//	var cenpanel3 = new Ext.Panel( {
//		title : '效能分析'
//	});
	
	var tab = new Ext.TabPanel({
		region:'center',
		id:'stockPactChildTab',
		items:[stockPactChildTab.StockExecutePanel,
		stockPactChildTab.qiPanel],
//		stockPactChildTab.eaPanel],
		activeTab:0
	})
	return tab;
}