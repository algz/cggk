var procurementView = {
	cacheFlushTime : null
};

procurementView.tabs = function() {

	// 零星物资需求列表
	var procurementSporadicTab = procurementSporadicData.tabPanel();
	// 年度物资需求列表
	var procurementAnnualTab = procurementAnnualData.tabPanel();

	return [ procurementSporadicTab, procurementAnnualTab ];
}

procurementView.sporadicCard = function(){
	return procurementSporadicData.centerPanel2();
}



