var physicTypeTreeGrid = {}
physicTypeTreeGrid.init = function(dataCenterId) {
	Ext.QuickTips.init();
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'dataEntityTypeName',
				type : 'string'
			}, {
				name : 'dataEntityRealType',
				type : 'string'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'discription',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'dataEntityID',
				type : 'string'
			}, {
				name : 'dataEntityType',
				type : 'string'
			}, {
				name : 'parent',
				type : 'auto'
			}, {
				name : 'id',
				type : 'string'
			}, {
				name : 'disableCheck',
				type : 'bool'
			}, {
				name : 'isRef',
				type : 'string'
			}, {
				name : 'rowClass',
				type : 'string'
			}]);
	physicTypeTreeGrid.store = new Ext.ux.maximgb.tg.sysEditTreeGridStore(
			{
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataModel_dataModelRemote.getChildDataModel'
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	physicTypeTreeGrid.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : physicTypeTreeGrid.store,
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [{
					id : 'text',
					header : ''+getResource('resourceParam1258')+'',
					width : 300,
					dataIndex : 'text'
				}, {
					header : ''+getResource('resourceParam481')+'',
					width : 200,
					dataIndex : 'dataEntityTypeName'
				}, {
					header : ''+getResource('resourceParam1282')+'',
					width : 250,
					dataIndex : 'value'
				}]
		}),
		stripeRows : true,
		autoExpandeColumn : 'text'
	});

	physicTypeTreeGrid.store.on('beforeexpandnode', function(store, rc) {
				store.on('beforeload', function(store, options) {
							options.params = Ext.apply(options.params, {
										dataCenterID : rc.get("dataEntityType"),
										parentDataEntityID : rc.get("id"),
										disableCheck : true
									});
						});
			})
	return physicTypeTreeGrid.grid;
}
