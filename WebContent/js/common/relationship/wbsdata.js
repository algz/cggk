// WBS数据
/*
 * wbsdata.nodeId初始化前需要赋值 project时‘p’+projectid task时taskid
 */
var wbsdata = {
	nodeId:'',//wbs的根节点，也用来防止循环引用。
	selections : '',// 已勾选的节点id，逗号分割
	pageSize : 200,// 每页条数
	relationtypes : '',//目前后台不处理这个参数，默认显示4种关联关系
	checkbox : true,// column中是否有 勾选框
	checkSubNodes : true
	// 勾选时，是否需要同时勾选子节点

}

wbsdata.init = function(voptions) {
	// Ext.QuickTips.init();
	var nodeId = wbsdata.nodeId;
	var record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'category'
			}, {
				name : 'department'
			}, {
				name : 'incharge'
			}, {
				name : 'creator'
			}, {
				name : 'completedamount'
			}, {
				name : 'status'
			}, {
				name : 'statusId'
			}, {
				name : 'duration'
			}, {
				name : 'planstart'
			}, {
				name : 'planend'
			}, {
				name : 'desc'
			}, {
				name : 'start'
			}, {
				name : 'end'
			}, {
				name : 'relationtype'
			}, {
				name : 'rowCls'
			}, {
				name : 'id'
			}, {
				name : 'parent'
			}, {
				name : 'leaf'
			}, {
				name : 'iconCls'
			}, {
				name : 'pre'
			}, {
				name : 'next'
			}, {
				name : 'taskType'
			}]);

	wbsdata.sm = new Ext.grid.CheckboxSelectionModel();
	var columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [wbsdata.sm, {
				id : 'name',
				header : '' + getResource('resourceParam480') + '',
				width : 240,
				dataIndex : 'name',
				renderer:function(v,m,r,row,col,store){
				 var realWidth=grid.getColumnModel().getColumnWidth(col);
				return '<div ext:qtip='+v+'>'+v+'</div>';
				
				}
			}, {
				header : '' + getResource('resourceParam481') + '',
				width : 100,
				dataIndex : 'category'
			}, {
				header : '' + getResource('resourceParam689') + '',
				width : 100,
				dataIndex : 'department'
			}, {
				header : '' + getResource('resourceParam731') + '',
				width : 100,
				dataIndex : 'incharge'

			}, {
				header : '' + getResource('resourceParam1058') + '',
				width : 100,
				dataIndex : 'creator'
			}, new Ext.ux.grid.ProgressColumn({
				header : "" + getResource('resourceParam1057') + "",
				dataIndex : 'completedamount',
				width : 100,
				renderer : function(v, p, record) {
					var style = '';
					var textClass = (v < 55)
							? 'x-progress-text-back'
							: 'x-progress-text-front'
									+ (Ext.isIE6 ? '-ie6' : '');
					var text = String
							.format(
									'</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
									textClass, Ext.id(), v + this.textPst);
					text = (v < 96) ? text.substring(0, text.length - 6) : text
							.substr(6);

					if (record.data.color == 'red') {
						style = '-red';
					} else {
						style = '-green';
					}
					p.css += ' x-grid3-progresscol';
					return String
							.format(
									'<div class="x-progress-wrap"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>'
											+ '</div>', style, v, text);
				},
				textPst : '%'
			}), {
				header : '' + getResource('resourceParam739') + '',
				width : 100,
				dataIndex : 'status'
			}, {
				header : '工期',
				width : 100,
				dataIndex : 'duration'
			}, {
				header : '' + getResource('resourceParam991') + '',
				width : 100,
				dataIndex : 'planstart'

			}, {
				header : '' + getResource('resourceParam1032') + '',
				width : 100,
				dataIndex : 'planend'

			}, {
				header : '' + getResource('resourceParam856') + '',
				width : 100,
				dataIndex : 'start'

			}, {
				header : '' + getResource('resourceParam1033') + '',
				width : 100,
				dataIndex : 'end'

			}, {
				header : '' + getResource('resourceParam648') + '',
				width : 100,
				dataIndex : 'desc'

			}]
	});
	// 不带有checkbox
	if (wbsdata.checkbox == false) {
		columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
					id : 'name',
					header : '' + getResource('resourceParam480') + '',
					width : 240,
					dataIndex : 'name'
				}, {
					header : '' + getResource('resourceParam481') + '',
					width : 100,
					dataIndex : 'category'
				}, {
					header : '' + getResource('resourceParam689') + '',
					width : 100,
					dataIndex : 'department'
				}, {
					header : '' + getResource('resourceParam731') + '',
					width : 100,
					dataIndex : 'incharge'

				}, {
					header : '' + getResource('resourceParam1058') + '',
					width : 100,
					dataIndex : 'creator'
				}, new Ext.ux.grid.ProgressColumn({
					header : "" + getResource('resourceParam1057') + "",
					dataIndex : 'completedamount',
					width : 100,
					renderer : function(v, p, record) {
						var style = '';
						var textClass = (v < 55)
								? 'x-progress-text-back'
								: 'x-progress-text-front'
										+ (Ext.isIE6 ? '-ie6' : '');
						var text = String
								.format(
										'</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
										textClass, Ext.id(), v + this.textPst);
						text = (v < 96)
								? text.substring(0, text.length - 6)
								: text.substr(6);

						if (record.data.color == 'red') {
							style = '-red';
						} else {
							style = '-green';
						}
						p.css += ' x-grid3-progresscol';
						return String
								.format(
										'<div class="x-progress-wrap"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>'
												+ '</div>', style, v, text);
					},
					textPst : '%'
				}), {
					header : '' + getResource('resourceParam739') + '',
					width : 100,
					dataIndex : 'status'
				}, {
					header : '工期',
					width : 100,
					dataIndex : 'duration'
				}, {
					header : '' + getResource('resourceParam991') + '',
					width : 100,
					dataIndex : 'planstart'

				}, {
					header : '' + getResource('resourceParam1032') + '',
					width : 100,
					dataIndex : 'planend'

				}, {
					header : '' + getResource('resourceParam856') + '',
					width : 100,
					dataIndex : 'start'

				}, {
					header : '' + getResource('resourceParam1033') + '',
					width : 100,
					dataIndex : 'end'

				}, {
					header : '' + getResource('resourceParam648') + '',
					width : 100,
					dataIndex : 'desc'

				}]
		});

	}

	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/wbstemplate_TemplateRemote.getRelationColumnTree'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				baseParams : {
					relationtypes : wbsdata.relationtypes,
					node : nodeId,
					targetId : wbsdata.nodeId,//防止循环引用
					relationtype : null
				},
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});

	store.on('beforeexpandnode', function(store, record) {
				nodeId = record.get('id');
				store.on('beforeload', function(store, options) {
							options.params = {
								relationtypes : wbsdata.relationtypes,
								node : nodeId,
								targetId : wbsdata.nodeId,//防止循环引用
								relationtype : record.get('relationtype')
							}
						});

			})
	wbsdata.clear = function() {
		store.removeAll();
	}

	wbsdata.refresh = function() {
		// 手动刷新面板，
		store.on('beforeload', function(store, options) {
					Ext.apply(options.params, {
								relationtypes : wbsdata.relationtypes,
								node : wbsdata.nodeId,
								targetId : wbsdata.nodeId,
								relationtype : null
							});
					store.baseParams = options.params;
				});
		store.load({
					params : {
						relationtypes : wbsdata.relationtypes,
						node : wbsdata.nodeId,
						targetId : wbsdata.nodeId,
						relationtype : null
					}
				});
	}
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		// autoHeight : true,//去掉,固定表头
		sm : wbsdata.sm,
		// viewConfig : {
		// forceFit : true
		// },
		master_column_id : 'name',
		cm : columnModel,
		stripeRows : true,
		autoExpandeColumn : 'name',
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
			store : store,
			displayInfo : true,
			pageSize : wbsdata.pageSize,
			listeners : {
				'beforechange' : function(pagingbar, options) {
					var len = wbsdata.sm.getSelections().length;
					if (len < 1) {
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/wbstemplate_TemplateRemote.getRelationColumnTree'
							})
							options.params = Ext.apply(options.params, {
										relationtypes : wbsdata.relationtypes,
										node : wbsdata.nodeId,
										targetId : wbsdata.nodeId,//防止循环引用
										relationtype : null
									});
						});
					} else {
						var record = wbsdata.sm.getSelected();
						nodeId = record.get('id');
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/wbstemplate_TemplateRemote.getRelationColumnTree'
							})
							options.params = Ext.apply(options.params, {
										relationtypes : wbsdata.relationtypes,
										node : nodeId,
										targetId : wbsdata.nodeId,//防止循环引用
										relationtype : record.get('relationtype')
									});
						})
					}
				}
			}
		})
	});
	function selectChildren(rc, selectFlag) {
		var childrenNodes = store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = store.indexOf(childrenNodes[i]);
			if (selectFlag) {
				wbsdata.sm.selectRow(rowIndex, true);
			} else {
				wbsdata.sm.deselectRow(rowIndex, false);
			}
			selectChildren(childrenNodes[i], selectFlag);
		}
	}
	if (wbsdata.checkSubNodes) {
		grid.on('rowclick', function(grid, rowindex) {
					selectChildren(store.getAt(rowindex), wbsdata.sm
									.isSelected(rowindex));
				})
		store.on('expandnode', function(store, record) {
					var rowIndex = store.indexOf(record);
					wbsdata.sm.selectRow(rowIndex, true);
					selectChildren(record, wbsdata.sm.isSelected(record));
				})
	}
	function findSelectedAncestor(record) {
		var parent;
		if (wbsdata.sm.isSelected(record)) {
			parent = store.getNodeParent(record);
			if (!parent || !wbsdata.sm.isSelected(parent)) {
				return record;
			}
			while (parent) {
				record = parent;
				if (wbsdata.sm.isSelected(parent)) {
					parent = store.getNodeParent(parent);
					if (!parent || !wbsdata.sm.isSelected(parent)) {
						return record;
					}
				} else {
					return record;
				}
			}
			return null;
		}
		return null;
	}

	wbsdata.isPastable = function(pasteTaskId, targetTaskId) {
		if (pasteTaskId == null || targetTaskId == null)
			return false;
		if (targetTaskId == pasteTaskId) {
			return false;
		}
		var paste = store.getById(pasteTaskId);
		var target = store.getById(targetTaskId);
		if (paste == null || target == null)
			return false;
		var targetParent = store.getNodeParent(target);
		if (targetParent) {
			if (targetParent.data.id == pasteTaskId) {
				return false;
			}
		}
		while (targetParent) {
			targetParent = store.getNodeParent(targetParent);
			if (targetParent) {
				if (targetParent.data.id == pasteTaskId) {
					return false;
				}
			}
		}
		return true;

	}

	function checkSameLevel() {
		var success = true;
		var first = findSelectedAncestor(wbsdata.selections[0]);
		if (wbsdata.selections.length == 1) {
			return true;
		}
		for (var i = 1; i < wbsdata.selections.length; i++) {
			if (first == null
					&& store.getNodeParent(wbsdata.selections[i]) == null) {
				success &= true;
				first = wbsdata.selections[i];
			} else if (store.getNodeParent(first) != null
					&& store.getNodeParent(wbsdata.selections[i]) != null) {
				if (first.data.id == store.getNodeParent(wbsdata.selections[i]).data.id) {
					success &= true;
					first = wbsdata.selections[i];
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		return success;
	}
	wbsdata.sm.on('rowselect', function(sm) {
		            var record=sm.getSelected();
		            if(record){
		            nodeId=record.get('id');
		            }
			});
	wbsdata.sm.on('selectionchange', function(sm) {
				if (sm.getCount() > 0) {
					Ext.getCmp('createTemplate').enable();
				} else {
					var record=sm.getSelected();
		            if(record){
		            nodeId=record.get('id');
		            }
					Ext.getCmp('createTemplate').disable();
				}
			});
	wbsdata.datapanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [grid]
			});
	var tbar = new Ext.Toolbar({
				items : [{
							id : 'createTemplate',
							text : '另存为' + getResource('resourceParam943')
									+ '模板',
							disabled : true,
							handler : function() {
								/**
								 * bug编号985 wangyf
								 * bug信息：在WBS子页第2次另存为任务流程模板时系统默认第1次选择的模板分类，完成后检查该模板放在了根目录下
								 * 2011-06-07 17：17
								 */
								templateCate.templateCombo.setRawValue(templateCate.rootName);
//								 template.reset();//添加后保存会报错
								wbsdata.getSelectIds();
								template.ids = wbsdata.selections;
								wbsdata.main.getLayout().setActiveItem(1);
							}

						}, '-']
			});
	if (voptions) {
		tbar = voptions.tbar;
	}
	// 获取所有头节点
	wbsdata.getSelectIds = function() {
		wbsdata.selections = "";
		var selections = wbsdata.sm.getSelections();
		var temp = 0;
		var ancestorId;
		for (var i = 0; i < selections.length; i++) {
			ancestorId = findSelectedAncestor(selections[i]).data.id;
			if (temp != ancestorId) {
				temp = ancestorId;
				wbsdata.selections += ancestorId;
				wbsdata.selections += ',';
			}
		}
		var length = wbsdata.selections.lastIndexOf(",");
		wbsdata.selections = wbsdata.selections.substring(0, length);
		return wbsdata.selections;
	}

	// 获取所有编制中的顶级节点,我的任务中审批时使用
	wbsdata.getPlanningIds = function() {
		wbsdata.selections = "";
		var selections = wbsdata.sm.getSelections();
		var temp = 0;
		var ancestorId;
		for (var i = 0; i < selections.length; i++) {
			ancestorId = findSelectedAncestor(selections[i]).data.id;
			if (temp != ancestorId) {
				temp = ancestorId;
				var record = store.getById(temp);
				if (record.data.statusId == 1 || record.data.statusId == '1') {
					wbsdata.selections += ancestorId;
					if (i < (selections.length - 1)) {
						wbsdata.selections += ',';
					}
				}
			}
		}
		return wbsdata.selections;
	}
	var config = {
		successCallback : function() {
			wbsdata.main.getLayout().setActiveItem(0);
		},
		cancelCallback : function() {
			wbsdata.main.getLayout().setActiveItem(0);
		}
	}
	wbsdata.main = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				frame : false,
				border : false,
				split : true,
				tbar : tbar,
				items : [wbsdata.datapanel, template.init(config)]
			});

	return wbsdata.main;

}
wbsdata.establishWorkOrControl = function(reslut) {
	if (reslut == "true") {
		Ext.MessageBox.alert("信息提示", "设置成功!");
	} else {
		Ext.MessageBox.alert("信息提示", "设置失败!");
	}
}
