var dataObjectList = {
	grid : null,
	dataObjectListListPanel : null,
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	modelEdit : true
}
dataObjectList.init = function() {
	var strurl = '../JSON/dataobject_DataObjectRemote.getDataObjectList?date='
			+ new Date();
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var cols = ['categoryId', 'categoryName', 'type', 'groups', 'description',
			'version', 'icon', 'createtime'];
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, cols);
	var ascid = 'categoryId';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.on('beforeload', function() {

			});

	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			selectionchange : function(sm) {
				if (dataObjectList.modelEdit) {
					if (sm.getCount()) {
						Ext.getCmp('delete').enable();
					} else {
						Ext.getCmp('delete').disable();
					}
					if (sm.getCount() == 1) {
						dataObjectAttribute.tabpanel.enable();
						var record = sm.getSelected();
						var icons = record.get("icon");

						dataObjectAttribute.categoryName.setValue(record
								.get("categoryName"));
						dataObjectAttribute.categoryId.setValue(record
								.get("categoryId"));
						if (dataObjectList.modelEdit) {
							dataObjectAttribute.attributeTree.enable();
						}
						// dataClassificationAttribute.treeloader.baseParams
						// = {
						// id : dataClassificationAttribute.categoryId
						// .getValue()
						// }

						dataObjectAttribute.attributeTree.getRootNode()
								.setText(record.get("categoryName"));
						dataObjectAttribute.attributeTree.getRootNode()
								.setId(record.get("categoryId"));
						if ("" != icons) {

							dataObjectAttribute.attributeTree.getRootNode()
									.getUI().getIconEl().src = '../base/icons/edm/'
									+ icons;
						} else {
							dataObjectAttribute.attributeTree.getRootNode()
									.getUI().getIconEl().src = '../base/icons/edm/dataObject.png';

						}

						dataObjectAttribute.attributeTree.getRootNode()
								.reload();
						dataObjectAttribute.attributeTree.getRootNode().expand(
								true, true);
						dataObjectAttribute.attributeTree
								.fireEvent('click',
										dataObjectAttribute.attributeTree
												.getRootNode());
						dataObjectAttribute.tabpanel.setActiveTab(0);
						Ext.getCmp('update').enable();
					} else {
						dataObjectAttribute.tabpanel.disable();

						Ext.getCmp('update').disable();
					}
				}
			},
			rowselect : function(sm, rowIndex, record) {
				// if (sm.getCount() == 1) {
				// var icons = record.get("icon");
				//
				// dataObjectAttribute.categoryName.setValue(record
				// .get("categoryName"));
				// dataObjectAttribute.categoryId.setValue(record
				// .get("categoryId"));
				// if (dataObjectList.modelEdit) {
				// dataObjectAttribute.attributeTree.enable();
				// }
				// // dataClassificationAttribute.treeloader.baseParams
				// // = {
				// // id : dataClassificationAttribute.categoryId
				// // .getValue()
				// // }
				//
				// dataObjectAttribute.attributeTree.getRootNode()
				// .setText(record.get("categoryName"));
				// dataObjectAttribute.attributeTree.getRootNode()
				// .setId(record.get("categoryId"));
				// if ("" != icons) {
				//
				// dataObjectAttribute.attributeTree.getRootNode().getUI()
				// .getIconEl().src = '../base/icons/edm/' + icons;
				// } else {
				// dataObjectAttribute.attributeTree.getRootNode().getUI()
				// .getIconEl().src = '../base/icons/edm/dataObject.png';
				//
				// }
				//
				// dataObjectAttribute.attributeTree.getRootNode().reload();
				// dataObjectAttribute.attributeTree.getRootNode().expand(
				// true, true);
				// dataObjectAttribute.attributeTree.fireEvent('click',
				// dataObjectAttribute.attributeTree.getRootNode());
				// dataObjectAttribute.tabpanel.setActiveTab(0);
				//
				// // dataObjectAttribute.checkTree.getRootNode()
				// // .setText(dataObjectAttribute.attributeTree
				// // .getRootNode().text);
				// // dataObjectAttribute.checkTree.getRootNode()
				// // .setId(dataObjectAttribute.attributeTree
				// // .getRootNode().id);
				// // dataObjectAttribute.checkTree.getRootNode().getUI()
				// // .getIconEl().src = dataObjectAttribute.attributeTree
				// // .getRootNode().getUI().getIconEl().src;
				// // Ext
				// // .apply(
				// // dataObjectAttribute.checkTree.getRootNode().attributes,
				// // {
				// // treePath : dataObjectAttribute.attributeTree
				// // .getRootNode().id
				// // });
				// //
				// // dataObjectAttribute.checkTree.getRootNode().reload();
				// // dataObjectAttribute.checkTree.getRootNode().expand(true,
				// // true);
				// } else {
				// }
			}
		}

	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "" + getResource('resourceParam1746') + "",
			dataIndex : 'categoryName',
			width : 100
		}, {
			header : "" + getResource('resourceParam981') + "",// 创建时间
			dataIndex : 'createtime',

			renderer : function(value, p, record) {
				var dataTime = new Date(value.time.time);
				return dataTime.format('Y-m-d');
			}
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'description',
			width : 200
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
						dataObjectAdd.init();
					}
				}

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam490') + '',
				id : 'update',
				iconCls : 'priv-edit',
				disabled : true,
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
					title : '' + getResource('resourceParam1757') + '',
					text : '' + getResource('resourceParam1754') + ''
				},
				listeners : {
					'click' : function() {
						dataObjectDel.init();
					}
				}
			}, '-'];
	this.grid = myGrid.init(ds, cm, tb, sm);
	this.grid.setHeight(650);

	Ext.Ajax.request({
				url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges?date='
						+ new Date(),
				method : 'POST',
				success : function(response, options) {
					myGrid.loadvalue(dataObjectList.grid.store,
							dataObjectList.args, dataObjectList.baseargs);
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.modelEdit == false) {
						dataObjectList.modelEdit = false;
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
	return this.grid;
}
