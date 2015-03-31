var taskRelationTreeGrid = {parameters : {}}
taskRelationTreeGrid.init = function() {
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
				name : 'dcategoryinstanceid',
				type : 'string'
			}, {
				name : 'extendsTypeRealName',
				type : 'string'
			}, {
				name : 'realIsRef',
				type : 'string'
			},{
				name : 'dataEntityCategoryTagName',
				type : 'string'
			},{
				name : 'dataEntityCategoryTagCenterID',
				type : 'string'
			},{
				name : 'dataEntityCategoryTag',
				type : 'string'
			},{
				name : 'iconCls',
				type : 'string'
			},{
				name : 'checkStr',
				type : 'string'
			},{
				name : 'arrLength',
				type : 'string'
			},{
				name : 'isArray',
				type : 'bool'
			},{
				name : 'unit',
				type : 'string'
			},{
				name : 'description',
				type : 'string'
			},{
				name : 'createTime'
			},{
				name : 'createrName'
			},{
				name : 'modifyTime'
			},{
				name : 'isArrayItemChild',
				type : 'bool'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		header : ''
	});
	var lineNum = new Ext.grid.RowNumberer({})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		loadMask : true,
		master_column_id : 'text',
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
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							options.params = Ext.apply(options.params, {
									dataCenterID : self.parameters["dataCenterPrefixID"],
									parentDataEntityID : self.parameters["dataCategoryPrefixID"]
								});
						});
					}else{
						var rc = sm.getSelected();
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
							})
							options.params = Ext.apply(options.params, {
								dataCenterID : rc.get('dataCenterID'),
								dataEntityID : rc.get('dataEntityID'),
								parentDataEntityID : rc.get('parentDataEntityID'),
								dataEntityType : rc.get('dataEntityType'),
								customTypeParentID : rc.get('customTypeParentID'),
								customTypeItemID : rc.get('customTypeItemID'),
								isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc.get("dimension")) > 1) ? 2 : rc.get('isRef'),
								inout : rc.get("inout"),
								dcategoryinstanceid : rc.get("dcategoryinstanceid"),
								isArrayItemChild : rc.get('isArrayItemChild')
							});
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
					header : ''+getResource('resourceParam480')+'',
					width : 250,
					dataIndex : 'text'
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 100,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if("arrayfile"==record.get("dataEntityType")){
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId=' + record.get("fileID") + '&fileName=' + encodeURI(encodeURI(record.get('value')))+'" ext:qtip="'+value+'" >' + value + '</a>';
						}
						if ("arrayfile"!=record.get("dataEntityType")&&"file" == record.get('extendsTypeRealName')) {
							if (value == "") {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"+getResource('resourceParam1085')+"</a>";
							} else {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else {
							return value;
						}
					}
				},{
					header : ''+getResource('resourceParam481')+'',
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
					header : ''+getResource('resourceParam853')+'',
					width : 50,
					dataIndex : 'dimension',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return 1;
						} else {
							return value;
						}
					}
				},  {
					header : 'I/O',
					width : 100,
					dataIndex : 'inout',
					renderer : function(value, p, record) {
						if (value == 0)
							return ""+getResource('resourceParam494')+"";
						if (value == 1)
							return ""+getResource('resourceParam1066')+"";
						if (value == 2)
							return ""+getResource('resourceParam1065')+"";
					}
				}, {
					header : ''+getResource('resourceParam462')+'',
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
					header : '' + getResource('resourceParam7023') + '',//标签
					width : 100,
					dataIndex : 'dataEntityCategoryTagName'
				}, {
					header : '' + getResource('resourceParam7024') + '',//映射
					width : 300,
					dataIndex : 'destCategoryInsPath',
					renderer : function(){
						return ""
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
		autoExpandeColumn : 'destCategoryInsPath'
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
	function beforeEdit(e) {
		if (rowindex == e.row) {
			return false;
		}
	}
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
						dataCenterID : rc.get('dataCenterID'),
						dataEntityID : rc.get('dataEntityID'),
						parentDataEntityID : rc.get('parentDataEntityID'),
						dataEntityType : rc.get('dataEntityType'),
						customTypeParentID : rc.get('customTypeParentID'),
						customTypeItemID : rc.get('customTypeItemID'),
						isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
								.get("dimension")) > 1) ? 2 : rc.get('isRef'),
						inout : rc.get("inout"),
						dcategoryinstanceid : rc.get("dcategoryinstanceid"),
						isArrayItemChild : rc.get('isArrayItemChild')
					});
		});
	})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}
taskRelationTreeGrid.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
