var dataClassificationList = {
	grid : null,
	dataClassificationListPanel : null,
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	modelEdit : true
}
dataClassificationList.grid = function() {
	var strurl = '../JSON/dataClassification_DataClassificationRemote.getDataClassificationList?name=&type=2';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, ['categoryId', 'categoryName', 'type', 'groups', "createtime",
					'description', 'version']);
	var ascid = 'categoryId';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.on('beforeload', function() {
		Ext.Ajax.request({
					url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.modelEdit == false) {
							dataClassificationList.modelEdit = false;
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
				if (dataClassificationList.modelEdit) {
					if (sm.getCount()) {
						Ext.getCmp('delete').enable();
					} else {
						Ext.getCmp('delete').disable();
					}
					if (sm.getCount() == 1) {
						var record = sm.getSelected();
						dataClassificationAttribute.tabpanel.enable();
						dataClassificationAttribute.categoryName
								.setValue(record.get("categoryName"));
						dataClassificationAttribute.categoryId.setValue(record
								.get("categoryId"));
						if (dataClassificationList.modelEdit) {
							dataClassificationAttribute.dateTypeTree.enable();
						}
						dataClassificationAttribute.treeloader.baseParams = {
							id : dataClassificationAttribute.categoryId
									.getValue()
						}

						new Ext.LoadMask(document.body, {
									msg : '数据加载中，请稍候...',
									removeMask : true,
									store : dataClassificationAttribute.treeloader
								});

						// Ext.MessageBox.wait("", "提示", {text :
						// '数据加载中，请稍候...'});

						dataClassificationAttribute.dateTypeTree.getRootNode()
								.reload();
						dataClassificationAttribute.dateTypeTree.getRootNode()
								.expand(false);

						dataClassificationAttribute.dateTypeTree.expandAll();
						Ext.getCmp('update').enable();
					} else {
						dataClassificationAttribute.tabpanel.disable();

						Ext.getCmp('update').disable();
					}
				}
			},
			rowselect : function(sm, rowIndex, record) {
				if (sm.getCount() == 1) {
				} else {
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
			header : "" + getResource('resourceParam7013') + "",
			dataIndex : 'categoryName',
			width : 100
		}, {
			header : "" + '创建时间' + "",
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
					title : '' + getResource('resourceParam477') + '标签',
					text : '' + getResource('resourceParam647') + '一个新的标签'
				},
				listeners : {
					'click' : function() {
						dataClassificationAdd.init();
					}
				}

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam490') + '',
				id : 'update',
				iconCls : 'priv-edit',
				disabled : true,
				tooltip : {
					title : '' + getResource('resourceParam478') + '标签',
					text : '' + getResource('resourceParam478') + '选中的标签'
				},
				listeners : {
					'click' : function() {
						dataClassificationUpdate.init();
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam475') + '',
				id : 'delete',
				iconCls : 'priv-del',
				disabled : true,
				tooltip : {
					title : '' + getResource('resourceParam475') + '标签',
					text : '' + getResource('resourceParam475') + '选中的标签'
				},
				listeners : {
					'click' : function() {
						dataClassificationDel.init();
					}
				}
			}, '-'];
	dataClassificationList.grid = myGrid.init(ds, cm, tb, sm);
	// dataClassificationList.grid.setHeight(650);
	myGrid.loadvalue(dataClassificationList.grid.store,
			dataClassificationList.args, dataClassificationList.baseargs);
	return dataClassificationList.grid;
}
