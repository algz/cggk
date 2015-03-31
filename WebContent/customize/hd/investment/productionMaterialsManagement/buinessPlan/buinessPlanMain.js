var buinessPlanMain = {};

buinessPlanMain.init = function(){
	Ext.QuickTips.init();
	
	//	privilegeValidate.privilegeValidate("300000001","30000004","30000015",null,null,"30000003",null,null,null,null,null,
//			"30000016","30000014","30000005","30000019","30000020",null,"30000031","30000011");
//	var reCheck = privilegeValidate.check();
	
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'mianViewPanel',
		layout : 'fit',
		items : new Ext.TabPanel({
		id : 'buinessPlanPanel',
		activeTab : 0,
		region: 'center',
		items :[buinessPlanImportGrid.gridPanel(),annualProcurementPlanGrid.ProcurementPlan(),new buinessPlanInfoDetail.mainGrid()]
	})
	});

//	viewport.doLayout();
};

Ext.onReady(buinessPlanMain.init, buinessPlanMain, true);