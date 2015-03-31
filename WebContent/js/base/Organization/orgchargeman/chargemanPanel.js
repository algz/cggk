
//加载部门负责人数据
//function loadChargeMan() {
//	myGrid.loadvalue(depchargemanPanel.grid.store, {
//				start : 0,
//				limit : 25
//			}, orgManage.baseargs);
//}
var chargemanPanel = {
	instcode : null,
	name : null
};

chargemanPanel.init = function() {
	var orgchargemanPanel = depchargemanPanel.init();
	//部门负责人面板
	chargemanPanel.extend = new Ext.Panel({
				title : '' + getResource('resourceParam731') + '',
				border : false,
				layout : 'fit',
//				listeners : {
//					activate : function() {
//						loadChargeMan();
//					}
//				},
				items : [orgchargemanPanel]
			});
	//负责人主面板
	chargemanPanel.tabpanels = new Ext.TabPanel({
				minTabWidth : 300,
				resizeTabs : false,
				border : false,
				hidden : false,
				items : [chargemanPanel.extend]
			});

	return chargemanPanel.tabpanels;
}
