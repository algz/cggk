var flowTab={};

flowTab.tabCard01=function(){
	var tab = new Ext.Panel( {		
		id : 'flowTab1',
		layout : 'fit',
		title : '采购清单表',
		items : new Ext.Panel( {
			id : 'purchaseListGrid1',
			layout : 'fit',// 自适应整个高度
			border : false,
			margin : '0 0 5 0',
			items : [ flowGrid.gridPurchaseListPanel() ]
		}),
		listeners : {
			render : function(){
				Ext.getCmp('gridPurchaseListPanelId').getStore().load();
			}
		}
	});

	return tab;
}

flowTab.tabCard02=function(){
	var tab = new Ext.Panel( {		
		id : 'flowTab2',
		title : '采购比价审批',
		layout : 'fit',
		items : new Ext.Panel( {
			id : 'gridPurchaseRatioGrid1',
			layout : 'fit',// 自适应整个高度
			border : false,
			margin : '0 0 5 0',
			items : [ flowGrid.gridPurchaseRatioPanel() ]
		}),
		listeners : {
			render : function(){
				Ext.getCmp('gridPurchaseRatioPanelId').getStore().load();
			}
		}
	});

	return tab;
}
flowTab.tabCard03=function(){
	var tab = new Ext.Panel( {		
		id : 'flowTab3',
		layout : 'fit',
		title : '合同审签列表',
		items : new Ext.Panel( {
			id : 'gridContractGrid1',
			layout : 'fit',// 自适应整个高度
			border : false,
			margin : '0 0 5 0',
			items : [ flowGrid.gridContractPanel() ]
		}),
		listeners : {
			render : function(){
				Ext.getCmp('gridContractPanelId').getStore().load();
			}
		}
	});

	return tab;
}

flowTab.tabs = function(){
	var tabs = new Ext.TabPanel( {
		title : '流程审批监控',
		id : 'flowTab',
		activeItem : 0,
		items : [ flowTab.tabCard01(), flowTab.tabCard02(), flowTab.tabCard03()]
	});

	return tabs;
}