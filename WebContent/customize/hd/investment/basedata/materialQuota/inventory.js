//成品清单定额
var inventory = {
	inventoryId : null
};
//成品清单定额grid
inventory.gridPanel = function() {

	var rm =  new Ext.grid.RowNumberer();
	
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
						'demension', 'useSite', 'partID', 'remark', 'numbers' ])
			});

	var cm = new Ext.grid.ColumnModel( [sm,rm,{
		header : '材料名称',
		dataIndex : 'materialItemName',
		align : "center",
		width : 100,
		sortable : true
	}, {
		header : '型号',
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
		header : '装配图号',
		align : "center",
		dataIndex : 'partID',
		width : 100,
		sortable : true
	}, {
		header : '备注',
		align : "center",
		dataIndex : 'remark',
		width : 100,
		sortable : true
	} ]);
	var tbar = [];
	var grid = common.gridPanel('inventoryPanelId', cm, store, tbar, true, sm,'成品清单定额');
	
	grid.on('activate', function() {
		store.load();
	});

	return grid;
}
//成品清单定额tab
inventory.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '成品清单定额',
		id : 'inventoryTab',
		layout : 'fit',
		items : [ inventory.gridPanel() ],
		listeners : {
			'activate' : function() {
				materialQuotaMain.useType = 1;
				var grid = Ext.getCmp('inventoryPanelId');
				grid.getStore().baseParams = {
					productCode : equipTree.parentId,
					type : 1,
					start : 0,
					limit : 20
				};
				grid.store.load();
			}
		}
	});

	return tab;
};