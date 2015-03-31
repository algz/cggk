var stockPlanChildTab = {}

stockPlanChildTab.tab = function(){
//	var cenpanel1 = new Ext.Panel( {
//		title : '计划类别监控'
//	});

	var cenpanel1 = planTypeInspect.grid()
	var cenpanel2 = StockBillPanel.init()
//	var cenpanel2 = new Ext.Panel( {
//		title : '计划采购清单'
//	});
	
	var tab = new Ext.TabPanel({
		region:'center',
		id:'stockPlanChildTab',
		items:[cenpanel1,cenpanel2],
		activeTab:0
	})
	return tab;
}