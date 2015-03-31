var fixedassetView = {};

fixedassetView.tabs = function() {
	var fixTender_tab = fixTender.tabPanel();
	var tenderTask_tab = tenderTask.tabPanel();// 任务编号列表
	//var tenderUnits_tab = tenderUnitsGrid.tabPanel();//招标单位信息
	return [ tenderTask_tab, fixTender_tab, contractGrid.tabPanel(2)];//,tenderUnits_tab];
}
