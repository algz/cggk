var queryRelationDataResult = {
	parameters : {}
}
queryRelationDataResult.init = function() {
	var self = this;
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'inout',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'dataEntityID',
				type : 'string'
			}, {
				name : 'dataEntityTypeName',
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
				name : 'dcLocation',
				type : 'string'
			}, {
				name : 'dimension',
				type : 'string'
			}, {
				name : 'dataCenterID',
				type : 'string'
			}, {
				name : 'updateCount',
				mapping : 'updateCount',
				type : 'string'
			}, {
				name : 'revision',
				mapping : 'revision',
				type : 'string'
			}, {
				name : 'isRef',
				type : 'string'
			}, {
				name : 'parentDataEntityID',
				type : 'string'
			}, {
				name : 'customTypeItemID',
				type : 'string'
			}, {
				name : 'customTypeParentID',
				type : 'string'
			}, {
				name : 'fileID',
				type : 'string'
			}, {
				name : 'destCategoryInsPath',
				type : 'string'
			}, {
				name : 'sourceCategoryInsPath',
				type : 'string'
			}, {
				name : 'dcategoryinstanceid',
				type : 'string'
			}, {
				name : 'extendsTypeRealName',
				type : 'string'
			}, {
				name : 'realIsRef',
				type : 'string'
			}, {
				name : 'iconCls',
				type : 'string'
			}, {
				name : 'treeIcon',
				type : 'string'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/datacenter_DataCenterRemote.getDataInstanceByResouceId'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		master_column_id : 'text',
		loadMask : true,
		tbar : [{
					text : '' + getResource('resourceParam2004') + '',//展开
					handler : function() {
						store.expandAll();
						// if(store.hasNotExpandedNode()){
						// store.expandNextLevel();
						// }
					}
				}],
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
			store : store,
			displayInfo : true,
			pageSize : 25,
			listeners : {
				'beforechange' : function(ptbar, opt) {
					if (grid.getSelectionModel().getSelections().length < 1) {
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
						})
						options.params = Ext.apply(options.params, {
							 dcategoryinstanceid : self.parameters["dcategoryinstanceid"],
							 parent : '0'
						});
						options.params = Ext.apply(options.params,searchPanel.mainpanel.getForm().getValues())
						});
					} else {
						var rc = sm.getSelected();
						store.on('beforeload', function(store, options) {
							if (rc.get("dataEntityType") == "2") {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
								})
								options.params = Ext.apply(options.params, {
									dcategoryinstanceid : rc
											.get("dataEntityID"),
									dataEntityType : self.parameters["searchDataEntityType"],
									parent : rc.get("id")
								});
							} else if (rc.get("dataEntityType") == "12"
									|| rc.get("dataEntityType") == "1") {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
								})
								options.params = Ext.apply(options.params, {
									dcategoryinstanceid : rc.get("dataEntityID"),
									dataEntityType : self.parameters["searchDataEntityType"],
									parent : rc.get("id")
								});
							} else {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.queryDataChildEntities'
								})
								options.params = Ext.apply(options.params, {
									dataCenterID : rc.get('dataCenterID'),
									dataEntityID : rc.get('dataEntityID'),
									parentDataEntityID : rc
											.get('parentDataEntityID'),
									dataEntityType : rc.get('dataEntityType'),
									customTypeParentID : rc
											.get('customTypeParentID'),
									customTypeItemID : rc
											.get('customTypeItemID'),
									isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
											.get("dimension")) > 1) ? 2 : rc
											.get('isRef'),
									inout : rc.get("inout"),
									dcategoryinstanceid : rc
											.get("dcategoryinstanceid")
								});
							}
						})
					}
				}
			}
		}),
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, sm, {
					id : 'text',
					header : '' + getResource('resourceParam480') + '',
					width : 250,
					dataIndex : 'text'
				}, {
					header : '' + getResource('resourceParam481') + '',
					width : 100,
					dataIndex : 'dataEntityTypeName',
					renderer : function(value, p, record) {
						if (value == "typeIsDeleted") {
							return "<span style='color:red;'>"
									+ baseResource.typeIsDeleted + "</span>";
						} else {
							return value;
						}
					}
				}, {
					header : '' + getResource('resourceParam853') + '',
					width : 50,
					dataIndex : 'dimension',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return 1;
						} else {
							return value;
						}
					}
				}, {
					header : '' + getResource('resourceParam511') + '',
					width : 100,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if("arrayfile"==record.get("dataEntityType")){
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId=' + record.get("fileID") + '&fileName=' + encodeURI(encodeURI(record.get('value')))+'" ext:qtip="'+value+'" >' + value + '</a>';
						}
						if ("arrayfile"!=record.get("dataEntityType")&&"file" == record.get('extendsTypeRealName')
								&& value != "") {
							return "<a href='../dataObjectFileDownload?fileId="
									+ record.get('fileID')
									+ "&fileName="
									+ encodeURI(encodeURI(record.get('value')))
									+ "' style='color:#0000FF;text-decoration:underline;'>"
									+ value + "</a>";
						} else {
							return value;
						}
					}
				}, {
					header : '' + getResource('resourceParam462') + '',
					width : 50,
					dataIndex : 'updateCount',
					renderer : function(v, p, r) {
						if (!r.get("disableCheck")) {
							return v;
						} else {
							return "";
						}
						if (v == undefined) {
							return "";
						}
					}
				}, {
					header : '' + getResource('resourceParam7025') + '',//来源
					width : 300,
					dataIndex : 'sourceCategoryInsPath',
					renderer : function(v) {
						if (v == undefined || v == "") {
							return "";
						}
						var path = v;
						var imgCls = '<img src="../base/icons/edm/datacenterIn.png" width=14 height=14 style="vertical-align:middle;"/>';
						var title = path + "&#13;";
						var value = "<a href='javascript:void(0)' ext:qtip='"
								+ title
								+ "' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"
								+ imgCls + path + "</a>";
						return "<div ext:qtip='" + title + "'>" + value
								+ "</div>";
					}
				}, {
					width : 30,
					header : '&nbsp;',
					renderer : function() {
						return '';
					}
				}]
		}),
		autoScroll : true,
		autoExpandeColumn : 'sourceCategoryInsPath',
		listeners : {
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = store.getAt(row);
				if (dataIndex == 'sourceCategoryInsPath'
						&& record.get('sourceCategoryInsPath') != '') {
					viewData.init(record.get('dataEntityID'), record
									.get('revision'));
				}
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
				selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
				selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
			})
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			if (rc.get("dataEntityType") == "2") {
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
				})
				options.params = Ext.apply(options.params, {
							dcategoryinstanceid : rc.get("dataEntityID"),
							dataEntityType : self.parameters["searchDataEntityType"],
							parent : rc.get("id")
						});
			} else if (rc.get("dataEntityType") == "12"
					|| rc.get("dataEntityType") == "1") {
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
				})
				options.params = Ext.apply(options.params, {
							dcategoryinstanceid : rc.get("dataEntityID"),
							dataEntityType : self.parameters["searchDataEntityType"],
							parent : rc.get("id")
						});
			} else {
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.queryDataChildEntities'
				})
				options.params = Ext.apply(options.params, {
							dataCenterID : rc.get('dataCenterID'),
							dataEntityID : rc.get('dataEntityID'),
							parentDataEntityID : rc.get('parentDataEntityID'),
							dataEntityType : rc.get('dataEntityType'),
							customTypeParentID : rc.get('customTypeParentID'),
							customTypeItemID : rc.get('customTypeItemID'),
							isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
									.get("dimension")) > 1) ? 2 : rc
									.get('isRef'),
							inout : rc.get("inout"),
							dcategoryinstanceid : rc.get("dcategoryinstanceid")
						});
			}
		});
	})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}
queryRelationDataResult.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
