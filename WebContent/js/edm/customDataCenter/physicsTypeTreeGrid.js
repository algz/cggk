var physicTypeTreeGrid = {}
physicTypeTreeGrid.init = function(dataCenterId) {
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'dataEntityTypeName',
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
			},{
				name : 'isRef',
				type : 'string'
			}]);
	var store = new Ext.ux.maximgb.tg.AdjacencyListStore({
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
	var sm = new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		autoHeight : true,
		sm : sm,
		viewConfig : {
			forceFit : true
		},
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm, {
					id : 'text',
					header : ''+getResource('resourceParam1258')+'',
					width : 200,
					dataIndex : 'text',
					editor : new Ext.form.TextField({})
				}, {
					header : ''+getResource('resourceParam481')+'',
					width : 100,
					dataIndex : 'dataEntityTypeName',
					editor : new Ext.form.ComboBox({
						id : 'dataObjectTypeComb',
						name : 'dataObjectTypeComb',
						fieldLabel : ''+getResource('resourceParam481')+'',
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getPhysicDataTypeList',
							method : 'GET',
							fields : [{
										name : 'dataTypeId',
										mapping : 'dataTypeId'
									}, {
										name : 'dataTypeName',
										mapping : 'dataTypeName'
									}, {
										name : 'rank',
										mapping : 'rank'
									}]
						}),
						triggerAction : 'all',
						width : 150,
						valueField : 'dataTypeName',
						displayField : 'dataTypeName',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							grid.getSelectNodes()[0].set('dataEntityType',
									record.get("dataTypeId"));
							grid.getSelectNodes()[0].set('isRef',
									record.get("rank"));
						},
						listeners : {
							expand : function(comb) {
								comb.getStore().setBaseParam("datatypeId",
										physicsTypeMain.dataEntityType)
								comb.getStore().load();
							}
						}
					})
				}, {
					header : ''+getResource('resourceParam1282')+'',
					width : 100,
					dataIndex : 'value',
					editor : new Ext.form.TextField({})
				}, {
					header : ''+getResource('resourceParam648')+'',
					width : 100,
					dataIndex : 'discription',
					editor : new Ext.form.TextField({})
				}]
		}),
		stripeRows : true,
		autoExpandeColumn : 'text',
		listeners : {
			beforeedit : function(e) {
				if (e.record.get('disableCheck') === true) {
					return false;
				}
				physicsTypeMain.dataEntityType = e.record.get('dataEntityType');
			}
		}
	});

	function selectChildren(rc, selectFlag) {
		var childrenNodes = store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = store.indexOf(childrenNodes[i]);
			if (selectFlag) {
				sm.selectRow(rowIndex, true);
			} else {
				sm.deselectRow(rowIndex, false);
			}
			selectChildren(childrenNodes[i], selectFlag);
		}
	}

	function selectParent(rc, selectFlag) {
		var parentNode = store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}
	grid.on('rowclick', function(grid, rowindex) {
//				selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
//				selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
			})
	store.on('beforeexpandnode', function(store, rc) {
				store.on('beforeload', function(store, options) {
							options.params = Ext.apply(options.params, {
										disableCheck : true
									});
						});
			})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
			})
	return grid;
}
