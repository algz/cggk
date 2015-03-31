var warehouseObjectList = {
	grid : null,
	warehouseObjectListPanel : null,
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	modelEdit : true
}
warehouseObjectList.grid = function() {
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWarehouseObjectList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, ['categoryId', 'categoryName', 'type', 'groups', 'description',
					'version', 'dataType', 'status']);
	var ascid = 'categoryId';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.on('beforeload', function() {
		Ext.Ajax.request({
					url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.modelEdit == false) {
							warehouseObjectList.modelEdit = false;
							Ext.getCmp('addNew').disable();
							Ext.getCmp('update').disable();
							Ext.getCmp('delete').disable();
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						privilegename : "{'modelEdit':''}"
					}
				});
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount() == 1) {
							// Ext.getCmp('centerpanel').enable();

						} else {
							var cneterpanel = Ext.getCmp('centerpanel').items
									.get(0);
							if (cneterpanel) {
								Ext.getCmp('centerpanel').remove(cneterpanel);
							}
						}

						if (sm.getCount() == 0) {
							var cneterpanel = Ext.getCmp('centerpanel').items
									.get(0);
							if (cneterpanel) {
								Ext.getCmp('centerpanel').remove(cneterpanel);
							}
						}
						if (warehouseObjectList.modelEdit) {
							if (sm.getCount()) {
								Ext.getCmp('delete').enable();
							} else {
								Ext.getCmp('delete').disable();
							}
							if (sm.getCount() == 1) {
								Ext.getCmp('update').enable();
							} else {
								Ext.getCmp('update').disable();
							}
						}
					},
					rowselect : function(sm, rowIndex, record) {
						if (sm.getCount() == 1) {
							var dataType = record.get("dataType");
							var cneterpanel = Ext.getCmp('centerpanel').items
									.get(0);
							if (cneterpanel) {
								Ext.getCmp('centerpanel').remove(cneterpanel);
							}
							var attributePanel = wareHouseAttribute.init(
									dataType, record.get("categoryName"),
									record.get("categoryId"), record
											.get("description"));
							// alert(attributePanel.getHeight());
							Ext.getCmp('centerpanel').add(attributePanel);
							Ext.getCmp('centerpanel').doLayout();
							// Ext.getCmp('centerpanel').enable();
						} else {
							var cneterpanel = Ext.getCmp('centerpanel').items
									.get(0);
							Ext.getCmp('centerpanel').remove(cneterpanel);

							// Ext.getCmp('centerpanel').disable();
						}
					}
				}

			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "" + getResource('resourceParam480') + "",
			dataIndex : 'categoryName',
			width : 300
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
						warehouseObjectAdd.typeId = "";
						var addpanel = warehouseObjectAdd.init();
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
				disabled : true,
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
	warehouseObjectList.grid = myGrid.init(ds, cm, tb, sm);
	// warehouseObjectList.grid.setHeight(650);
	myGrid.loadvalue(warehouseObjectList.grid.store, warehouseObjectList.args,
			warehouseObjectList.baseargs);
	return warehouseObjectList.grid;
}
