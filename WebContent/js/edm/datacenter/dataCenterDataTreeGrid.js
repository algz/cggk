var dataCenterDataTreeGrid = {}
// 项目和任务数据
dataCenterDataTreeGrid.init = function(id, i, datacenterid, fixedRevision) {
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
				name : 'fixedRevision',
				type : 'string'
			}, {
				name : 'iconCls',
				type : 'string'
			}, {
				name : 'checkStr',
				type : 'string'
			}, {
				name : 'arrLength',
				type : 'string'
			}, {
				name : 'isArray',
				type : 'bool'
			}, {
				name : 'unit',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'createTime',
				mapping : 'createTime'
			}, {
				name : 'modifyTime',
				mapping : 'modifyTime'
			},{
				name : 'isArrayItemChild',
				type : 'bool'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				// autoLoad : true,
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
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : '' + getResource('resourceParam7019') + '',// 数组化
				width : 60,
				dataIndex : 'isArray',
				renderer : function(v, p, record) {
					p.css += ' x-grid3-check-col-td x-item-disabled';
					return '<div class="x-grid3-check-col' + (v ? '-on' : '')
							+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
				}
			})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		master_column_id : 'text',
		loadMask : true,
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
							if (window.parent.historyViewModel == true) {
								options.params = Ext.apply(options.params, {
											dataCenterID : datacenterid,
											parentDataEntityID : id,
											fixedRevision : fixedRevision
										});
							} else {
								options.params = Ext.apply(options.params, {
											dataCenterID : datacenterid,
											parentDataEntityID : id
										});
							}
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
					width : 300,
					dataIndex : 'text'
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 200,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if ("file" == record.get("extendsTypeRealName")) {
							if (value == "") {
								if (window.parent.historyViewModel) {
									return "没有"+getResource('resourceParam469')+"";
								}
								return "";
							} else {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else {
							return value;
						}
					}
				}, {
					header : '' + getResource('resourceParam1201') + '',// 单位
					width : 80,
					dataIndex : 'unit'
				}, {
					header : ''+getResource('resourceParam481')+'',
					width : 150,
					dataIndex : 'dataEntityTypeName'
				}, {
					header : '' + getResource('resourceParam648') + '',// 描述
					width : 250,
					dataIndex : 'description',
					editor : new Ext.form.TextField({
								maxLength : 50
							})
				}, isArrayColumn, {
					header : ''+getResource('resourceParam853')+'',
					width : 50,
					dataIndex : 'dimension',
					renderer : function(value, p, record) {
						if (!record.get('isArray')) {
							return "";
						} else {
							if (value == undefined) {
								return 1;
							} else {
								return value;
							}
						}
					}
				}, {
					header : ''+getResource('resourceParam462')+'',
					width : 50,
					dataIndex : 'updateCount',

					renderer : function(v, p, r) {
						if (v == undefined) {
							return "";
						}
						if (!r.get("disableCheck")) {
							return v;
						} else {
							return "";
						}
					}
				}, {
					header : '' + getResource('resourceParam462') + ''
							+ getResource('resourceParam981') + '', // text :
					// 版本创建时间
					width : 100,
					dataIndex : 'modifyTime',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						var dataTime = new Date(value.time.time);
						return dataTime.format('Y-m-d H:i');
					}
				}, {
					header : '' + getResource('resourceParam981') + '', // text
					// :
					// 创建时间
					width : 100,
					dataIndex : 'createTime',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						var dataTime = new Date(value.time.time);
						return dataTime.format('Y-m-d H:i');
					}
				}, {
					header : ''+getResource('resourceParam474')+'来源位置',
					width : 300,
					dataIndex : 'sourceCategoryInsPath'
				}]
		}),
		// stripeRows : true,
		autoScroll : true,
		autoExpandeColumn : 'text'
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
	sm.on('selectionchange',
			function(smodel) {
				dataCenterData.selectedRows = smodel.getSelected();
			})
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
//				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}
