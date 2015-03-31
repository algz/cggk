/**
 * 数据列表查看（不可编辑）
 * @type 
 */
var dataCenterGridView = {parameters : {}}
/**
 * 初始化数据列表查看（不可编辑）
 * @param {bool} isDataCenterData 是否数据中心数据
 * @param {bool} isIncludeInstance 是否包含分类节点
 * @param {string} datacenterid 数据中心id
 * @param {string} dcategoryinstanceid 数据分类id
 * @return {treegrid} grid
 */
dataCenterGridView.init = function(isDataCenterData,isIncludeInstance,datacenterid,dcategoryinstanceid) {
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
				name : 'isSourceDataUpedRevision',
				type : 'bool'
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
			},{
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
						}, record),
				baseParams : {
					srcDataCenterID : ""
				}
			});
	var sm = new Ext.grid.CheckboxSelectionModel({});
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
						if(!isIncludeInstance){
							store.on('beforeload', function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
								})
								options.params = Ext.apply(options.params, {
											dataCenterID : datacenterid,
											parentDataEntityID : dcategoryinstanceid
										});
							});
							
						}else{
							store.on('beforeload', function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/datacenter_DataCenterRemote.getDataInstanceByResouceId'
								})
								var srcDataCenterType = !self.isProject?"task":"project"
								options.params = Ext.apply(options.params, {
									srcDataCenterID : self.parameters["srcDataCenterId"],
									srcDataCenterType : self.parameters["srcDataCenterType"]
								});
							});
						}
					}else{
						var rc = sm.getSelected();
						store.on('beforeload', function(store, options) {
							if (rc.get("dataEntityType") == "" || rc.get("dataEntityType") == "1") {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.getChildCategoryInstance'
								})
								options.params = Ext.apply(options.params, {
											dataEntityID : rc.get("dataEntityID")
										});
							} else if (rc.get("dataEntityType") == "2") {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
								})
								options.params = Ext.apply(options.params, {
											dataCenterID : rc.get("dataCenterID"),
											parentDataEntityID : rc.get("dataEntityID")
										});
							} else {
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
									dcategoryinstanceid : rc.get("dcategoryinstanceid")
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
					header : ''+getResource('resourceParam480')+'', //名称
					width : 200,
					dataIndex : 'text',
					renderer : function(value, p, record) {
						return "<div ext:qtip='" + value + "' >" + value + "</div>";
					}
				},{
					header : 'I/O',
					width : 100,
					hidden : isDataCenterData,
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
								var url='../dataObjectFileDownload?fileId='
										+ record.get('fileID')
										+ '&fileName='
										+ record.get('value');
								return "<a href="+url+" style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else {
							return value;
						}
					}
				}, {
					header : "" + getResource('resourceParam1201') + "",// 单位
					width : 80,
					dataIndex : 'unit'
				}, {
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
						if(!record.get('isArray')){
							return "";
						}else{
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
						if (record.get("disableCheck")) {
							return "";
						}
						var dataTime = new Date(value.time.time);
						return dataTime.format('Y-m-d H:i');
					}
				},{
					header : getResource('resourceParam5007'),//创建人
					width : 100,
					dataIndex : 'createrName',
					renderer : function(v, p, r) {
						if(r.get("disableCheck")){
							return "";
						}else{
							return v;
						}
					}
				},{
					header : getResource('resourceParam7023'),//'标签',
					width : 100,
					hidden : true,//isDataCenterData,
					dataIndex : 'dataEntityCategoryTagName'
				}, {
					header : getResource('resourceParam474')+'来源位置',
					width : 300,
					dataIndex : 'sourceCategoryInsPath',
					renderer : function(v) {
						if (v == undefined || v == "") {
							return "";
						}
						var path = v;
						var imgCls = '<img src="../base/icons/edm/datacenterIn.png" width=14 height=14 style="vertical-align:middle;"/>';
						var title = path + "&#13;";
						var value = "<a href='javascript:void(0)' ext:qtip='" + title + "' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"
								+ imgCls + path + "</a>";
						return "<div ext:qtip='" + title + "'>" + value + "</div>";
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
				if(dataIndex == 'sourceCategoryInsPath'&&record.get('sourceCategoryInsPath')!='') {
					viewData.init(record.get('dataEntityID'), record.get('revision'));
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
			if(rc.get("dataEntityType") == ""||rc.get("dataEntityType") == "1"){
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.getChildCategoryInstance'
				})
				options.params = Ext.apply(options.params, {
							dataEntityID : rc.get("dataEntityID")
						});
			}else if(rc.get("dataEntityType") == "2"){
				this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
					})
					options.params = Ext.apply(options.params, {
						dataCenterID : rc.get("dataCenterID"),
						parentDataEntityID : rc.get("dataEntityID")
					});
			} else {
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
dataCenterGridView.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
