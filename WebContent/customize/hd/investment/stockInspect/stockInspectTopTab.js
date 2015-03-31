var stockInspectTopTab = {}

stockInspectTopTab.tab = function(){
//	非固定资产采购计划
	var cenpanel1 = stockPlan.init();
//	非固定资产采购执行
	var cenpanel2 = stockPactPanel.init();
//	固定资产采购计划
	var cenpanel3 = fixedStockPlan.init();
//	固定资产采购执行
	var cenpanel4 = fixedStockPact.init();
	
	var tab = new Ext.TabPanel({
		region:'north',
		id:'stockInspectTopTab',
		height:260,
		items:[cenpanel1,cenpanel2,cenpanel3,cenpanel4],
		activeTab:0
	})
	return tab;
}

stockInspectTopTab.stockPlan = function(){
	
}