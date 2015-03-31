var inventoryFour = {
	inventoryId : null
};

inventoryFour.gridPanel = function() {

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/materialQuota_MaterialQuotaRemote.getAllInventoryVos?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'inventoryId', 'materialItemName', 'materialStandard',
						'numberOne', 'numberTwo', 'numberThree', 'numberFour',
						'demension', 'useSite', 'remark', 'numbers' ])
			});

	var cm = new Ext.grid.ColumnModel( [sm,rm, {
		header : '名称',
		dataIndex : 'materialItemName',
		align : "center",
		width : 100,
		sortable : true
	}, {
		header : '规格',
		align : "center",
		dataIndex : 'materialStandard',
		width : 100,
		sortable : true
	}, {
		header : '数量',
		width : 100,
		align : "center",
		dataIndex : 'numbers',
		sortable : true
	}, {
		header : '计量单位',
		align : "center",
		dataIndex : 'demension',
		width : 100,
		sortable : true
	}, {
		header : '使用部位',
		align : "center",
		dataIndex : 'useSite',
		width : 100,
		sortable : true
	}, {
		align : "center",
		header : '备注',
		dataIndex : 'remark',
		width : 100,
		sortable : true
	} ]);
	var tbar = [];
	var grid = common.gridPanel('inventoryFourPanelId', cm, store, tbar, true, sm,'标准件清册');

	grid.on('activate', function() {
		store.load();
	});

	return grid;
}

inventoryFour.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '标准件清册',
		id : 'inventoryFourTab',
		layout : 'fit',
		items : [ inventoryFour.gridPanel() ],
		listeners : {
			'activate' : function() {
				materialQuotaMain.useType = 5;
				var grid = Ext.getCmp('inventoryFourPanelId');
				grid.getStore().baseParams = {
					productCode : equipTree.parentId,
					type : 5,
					start : 0,
					limit : 20
				};
				grid.store.load();
			}
		}
	});

	return tab;
};