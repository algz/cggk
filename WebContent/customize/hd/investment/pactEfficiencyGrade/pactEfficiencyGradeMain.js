var pactEfficiencyGradeMain = {
	start:null,
	limit:null
}

pactEfficiencyGradeMain.init = function() {
	//设置采购监控所有表格分页展示的数量
	pactEfficiencyGradeMain.start=0;
	pactEfficiencyGradeMain.limit=10;

	pactEfficiencyGradeMain.messageGrid=pactEfficiencyGradeGrid.init();
	var view = new Ext.Viewport({
//		title:'合同效能评分',
		layout : 'fit',
//		id : 'pactEfficiencyGradeMainPanel',
		items :[pactEfficiencyGradeMain.messageGrid]
	});	
};

Ext.onReady(pactEfficiencyGradeMain.init, pactEfficiencyGradeMain, true);