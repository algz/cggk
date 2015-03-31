var libraryList = {
	grid : null,
	libraryListPanel : null,
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	modelEdit : true
}
libraryList.grid = function() {
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getTableList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, ['tableName', 'tableDisplayname', 'tableComment']);
	var ascid = 'tableName';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {

					},
					rowselect : function(sm, rowIndex, record) {
						if (sm.getCount() == 1) {
							var tableName = record.get("tableName");
							var cneterpanel = Ext.getCmp('centerpanel').items
									.get(0);
							if (cneterpanel) {
								Ext.getCmp('centerpanel').remove(cneterpanel);
							}
							var attributePanel = tableDefineDetail
									.init(tableName);
							// alert(attributePanel.getHeight());
							Ext.getCmp('centerpanel').add(attributePanel);
							Ext.getCmp('centerpanel').doLayout();
						} else {
						}
					}
				}

			});
	// private String tableName;
	// private String tableDisplayname;
	// private String tableComment;
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "表显示名",
			dataIndex : 'tableDisplayname',
			width : 150
		}, {
			header : "表名",
			dataIndex : 'tableName',
			width : 150
		}]
	});
	var tb = ['-', {
				text : '' + getResource('resourceParam483') + '',
				id : 'addNew',
				iconCls : 'priv-add',
				tooltip : {
					title : '' + getResource('resourceParam1755') + '',
					text : '' + getResource('resourceParam1752') + ''
				},
				listeners : {
					'click' : function() {
						var addpanel = tableDefine.init();
						var cneterpanel = Ext.getCmp('centerpanel').items
								.get(0);

						Ext.getCmp('centerpanel').remove(cneterpanel);
						// var attributePanel =
						// wareHouseAttribute.init(dataType, record
						// .get("categoryName"), record.get("categoryId"));
						Ext.getCmp('centerpanel').add(addpanel);
						Ext.getCmp('centerpanel').doLayout();
					}
				}

			}, {
				// enableToggle:true,
				text : '' + getResource('resourceParam490') + '',
				id : 'update',
				hidden : true,
				iconCls : 'priv-edit',
				tooltip : {
					title : '' + getResource('resourceParam1756') + '',
					text : '' + getResource('resourceParam1753') + ''
				},
				listeners : {
					'click' : function() {
						dataObjectUpdate.init();
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam475') + '',
				id : 'delete',
				iconCls : 'priv-del',
				tooltip : {
					title : '' + getResource('resourceParam1777') + '',
					text : '' + getResource('resourceParam1776') + ''
				},
				listeners : {
					'click' : function() {
						wareHouseObjectDel.init();
					}
				}
			}, '-'];
	libraryList.grid = myGrid.init(ds, cm, tb, sm);
	// warehouseObjectList.grid.setHeight(650);
	myGrid.loadvalue(libraryList.grid.store, libraryList.args,
			libraryList.baseargs);
	return libraryList.grid;
}
