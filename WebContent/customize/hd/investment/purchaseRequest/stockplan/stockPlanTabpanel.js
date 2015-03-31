var stockPlanTabpanel = {};

stockPlanTabpanel.init = function() {
	stockPlanTabpanel.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				boder : false,
				autoScroll : true,
				items : [stockPlanList.stockPlan1(), stockPlanList.stockPlan2(),new stockplanDetailList.mainGrid()]
			});
	return stockPlanTabpanel.tabPanel;
}
