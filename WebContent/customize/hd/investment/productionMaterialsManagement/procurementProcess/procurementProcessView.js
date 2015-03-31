var procurementProcessView = {
	cacheFlushTime : null
};

procurementProcessView.tabs = function() { 
	privilegeValidate.privilegeValidate("300000001","30000004","30000015",null,null,
			"30000003",null,null,null,null,
			null,"30000016","30000014","30000005","30000019",
			"30000020",null,"30000031","30000011",null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,"40000024","40000025","40000026",
			"40000027","40000028","40000029","40000030","40000031");
	var reCheck = privilegeValidate.check();
	//采购计划功能列表布局
	var procurementProcessDataTab1 = procurementPlan.mainPlan();
	//比价功能布局
	var procurementProcessDataTab2 = procurementProcessData.tabPanel2();
	
	//招标列表布局
	var procurementProcessDataTab3 = procurementProcessData.tabPanel3();
	
	//协议采购功能布局	
	var procurementProcessDataTab4 = procurementProcessData.tabPanel4();
//	
//	//直接采购功能布局
	var procurementProcessDataTab5 = otherPurchaselGridPanel.mainGrid();//procurementProcessData.tabPanel5();

	return [ procurementProcessDataTab1,
	procurementProcessDataTab2,
	procurementProcessDataTab3,
	procurementProcessDataTab4,
	procurementProcessDataTab5 
	];
}





