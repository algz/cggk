var searchResultTreeGrid = {
	parameters : {}
}
/**
 * 查询结果列表显示
 * 
 * @return {}
 */
searchResultTreeGrid.init = function() {
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
				name : 'dataEntityCategoryTagName',
				type : 'string'
			}, {
				name : 'dataEntityCategoryTagCenterID',
				type : 'string'
			}, {
				name : 'dataEntityCategoryTag',
				type : 'string'
			}, {
				name : 'isSourceDataUpedRevision',
				type : 'bool'
			}, {
				name : 'iconCls',
				type : 'string'
			}, {
				name : 'treeIcon',
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
				name : 'createTime'
			}, {
				name : 'createrName'
			}, {
				name : 'modifyTime'
			}, {
				name : 'isArrayItemChild',
				type : 'bool'
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
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : getResource('resourceParam4041'),
				width : 60,
				dataIndex : 'isArray',
				renderer : function(v, p, record) {
					p.css += ' x-grid3-check-col-td  x-item-disabled';
					return '<div class="x-grid3-check-col' + (v ? '-on' : '')
							+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
				}
			})
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		master_column_id : 'text',
		loadMask : true,
		tbar : [{
					text : '展开',
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
								dcategoryinstanceid : searchPanel.parameters["dcategoryInsid"],
								parent : '0'
							});
							options.params = Ext
									.apply(options.params,
											searchPanel.mainpanel.getForm()
													.getValues())
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
									dataEntityType : searchPanel.dataTypeFormItemHidden
											.getValue(),
									parent : rc.get("id")
								});
							} else if (rc.get("dataEntityType") == "12"
									|| rc.get("dataEntityType") == "1") {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
								})
								options.params = Ext.apply(options.params, {
									dcategoryinstanceid : rc
											.get("dataEntityID"),
									dataEntityType : searchPanel.dataTypeFormItemHidden
											.getValue(),
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
					dataIndex : 'text',
					allowSort : true
				}, {
					header : 'I/O',
					width : 100,
					dataIndex : 'inout',
					hidden : true,
					hideable : false,
					renderer : function(value, p, record) {
						if (value == 0)
							return "" + getResource('resourceParam494') + "";
						if (value == 1)
							return "" + getResource('resourceParam1066') + "";
						if (value == 2)
							return "" + getResource('resourceParam1065') + "";
					}
				}, {
					header : '' + getResource('resourceParam511') + '',
					width : 100,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if ("arrayfile" == record.get("dataEntityType")) {
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId='
									+ record.get("fileID")
									+ '&fileName='
									+ encodeURI(encodeURI(record.get('value')))
									+ '" ext:qtip="'
									+ value
									+ '" >'
									+ value
									+ '</a>';
						}
						if ("arrayfile" != record.get("dataEntityType")
								&& "file" == record.get('extendsTypeRealName')
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
					header : getResource('resourceParam4042'),
					width : 80,
					dataIndex : 'unit'
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
					header : getResource('resourceParam4046'),
					width : 200,
					dataIndex : 'description',
					editor : new Ext.form.TextField({
								maxLength : 50
							})
				}, isArrayColumn, {
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
					header : getResource('resourceParam462') + '' + getResource('resourceParam981'),
					width : 100,
					dataIndex : 'modifyTime',
					renderer : function(v, p, r) {
						if (v != undefined && v != "" && !r.get("disableCheck")) {
							return new Date(v.time.time).format("Y-m-d H:i")
						} else {
							return "";
						}
					}
				}, {
					header : '' + getResource('resourceParam981') + '', // text
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
					header : getResource('resourceParam5007'),// 创建人
					width : 100,
					dataIndex : 'createrName',
					hidden : true,
					hideable : false,
					renderer : function(v, p, r) {
						if (r.get("disableCheck")) {
							return "";
						} else {
							return v;
						}
					}
				}, {
					header : getResource('resourceParam7023'),// '标签',
					width : 100,
					hidden : true,
					hideable : false,
					dataIndex : 'dataEntityCategoryTagName'
				}, {
					header : getResource('resourceParam474') + '来源位置',
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
			if (rc.get("dataEntityType") == "2") {// 数据分类
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
				})
				options.params = Ext.apply(options.params, {
							dcategoryinstanceid : rc.get("dataEntityID"),
							dataEntityType : searchPanel.dataTypeFormItemHidden
									.getValue(),
							parent : rc.get("id")
						});
			} else if (rc.get("dataEntityType") == "12"
					|| rc.get("dataEntityType") == "1") {// 数据对象
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
				})
				options.params = Ext.apply(options.params, {
							dcategoryinstanceid : rc.get("dataEntityID"),
							dataEntityType : searchPanel.dataTypeFormItemHidden
									.getValue(),
							parent : rc.get("id")
						});
			} else {// 展开子数据
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
searchResultTreeGrid.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
