var awbsPanel = {
	nodeId : -1,
	state : -1,
	privilege : false,
	pageSize : 50
};
awbsPanel.init = function(config) {
	var record = Ext.data.Record.create([{
				name : 'id'
			}, {// 获取后台传过来的数据映射
				name : 'itemtype'
			}, {
				name : 'itemname'
			}, {
				name : 'itemdescription'
			}, {
				name : 'parent'
			}, {
				name : 'state'
			}, {
				name : 'createuserid'
			}, {
				name : 'createusername'
			}, {
				name : 'createtime'
			}, {
				name : 'iconCls'
			}, {
				name : 'leaf'
			}]);
	awbsPanel.sm = new Ext.grid.CheckboxSelectionModel();// 创建复选框

	/**
	 * bug编号789 wangyf
	 * bug信息：任务流程模板和审批模板中，展开文件夹以后，前面的序号就错乱
	 * 2011-05-24
	 */
//	var cm = [new Ext.grid.RowNumberer(), awbsPanel.sm, {
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [awbsPanel.sm, {
			id : 'itemname',
			header : getResource('resourceParam480'),
			width : 100,
			dataIndex : 'itemname',
			renderer : function(v, meta, r, rowIndex, colIndex, store) {
				var realWidth = grid.getColumnModel().getColumnWidth(colIndex);
				if (r.data.itemtype == 'FLOW_TEMPLET') {// 如果点击的是模板的话，就跳转到查看页面
					return '<a href="javascript:void(0);" onClick="atMain.toTreeView('
							+ r.data.id
							+ ',\''
							+ r.data.itemname
							+ '\')"><span ext:qtip='
							+ v
							+ ' style="color:blue;font-weight:bold;" >'
							+ v
							+ '</span></a>';
				}
				return v;
			}
		}, {
			header : getResource('resourceParam500'),// 状态
			width : 30,
			dataIndex : 'state',
			renderer : function(value, p, record) {// 判断当前模板的状态
				if (record.get('itemtype') == 'FLOW_TEMPLET') {
					if (value == 0) {
						return '<span style="color:gray;font-weight:bold;" >'
								+ getResource('resourceParam1267') + '</span>';
					} else if (value == 1) {
						return '<span style="color:gray;font-weight:bold;" >'
								+ getResource('resourceParam1266') + '</span>';
					} else if (value == 2) {
						return '<span style="color:gray;font-weight:bold;" >'
								+ getResource('resourceParam9091') + '</span>';
					} else {
						return '';
					}
				} else {
					return '';
				}
			}
		}, {
			header : getResource('resourceParam5007'),// 创建人
			width : 30,
			dataIndex : 'createusername'
		}, {
			header : getResource('resourceParam981'),// 创建时间
			width : 30,
			dataIndex : 'createtime'
		}, {
			header : getResource('resourceParam648'),// 描述
			width : 180,
			dataIndex : 'itemdescription',
			// 设置悬停，如果是字母或数字，则大于45个就换行
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			}
	
		}]
	});
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/approval_templetRemote.getAllTemplet'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				baseParams : {
					parentTypeid : awbsPanel.nodeId,
					state : -1
				},
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});

	store.on('beforeexpandnode', function(store, record) {// 节点展开之前，调用此方法，并传参
				awbsPanel.sm.selectRecords([record]);
				awbsPanel.nodeId = record.get('id');
				// store.on('beforeload', function(store, options) {
				// options.params = {
				// parentTypeid : awbsPanel.nodeId,
				// state : -1
				// }
				// });
				Ext.apply(store.baseParams, {
							parentTypeid : awbsPanel.nodeId,
							state : awbsPanel.state
						});
			})
	awbsPanel.clear = function() {// 清空数据
		store.removeAll();
	}

	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({// 创建grid面板
		store : store,
		viewConfig : {
			forceFit : true
		},
		sm : awbsPanel.sm,
		master_column_id : 'itemname',
		cm : cm,
		stripeRows : true,
		autoExpandeColumn : 'itemname',
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
					store : store,
					displayInfo : true,
					pageSize : awbsPanel.pageSize,
					listeners : {// 分页数据监听
						'beforechange' : function(pagingbar, options) {
							var len = awbsPanel.sm.getSelections().length;// 得到选中复选框的长度
							if (len < 1) {// 如果什么都没选,节点ID传-1
								Ext.apply(store.baseParams, {
											parentTypeid : awbsPanel.nodeId,
											state : -1
										});
								// store.on('beforeload', function(store,
								// options) {
								// options.params = Ext.apply(options.params,
								// {
								// parentTypeid : -1,
								// state : awbsPanel.state
								// });
								// });
							} else {// 获取选中节点ID，并传送到后台
								var rec = awbsPanel.sm.getSelected();
								awbsPanel.nodeId = rec.get('id');
								Ext.apply(store.baseParams, {
											parentTypeid : awbsPanel.nodeId,
											state : -1
										});
								// store.on('beforeload', function(store,
								// options) {
								// options.params = Ext.apply(options.params,
								// {
								// parentTypeid : awbsPanel.nodeId,
								// state : awbsPanel.state
								// });
								// })
							}
						}
					}
				})
	});
	awbsPanel.refresh = function() {// 刷新页面
		store.removeAll();
		grid.getBottomToolbar().bindStore(store);
//		store.on('beforeexpandnode', function(store, record) {// 展开分类时传参
//					awbsPanel.sm.selectRecords([record]);
//					awbsPanel.nodeId = record.get('id');
//					store.on('beforeload', function(store, options) {
//								options.params = {
//									parentTypeid : awbsPanel.nodeId,
//									state : awbsPanel.state
//								}
//							});
//
//				})
//		store.on('beforeload', function(store, options) {// 普通传参
//					Ext.apply(options.params, {
//								parentTypeid : awbsPanel.nodeId,
//								state : awbsPanel.state
//							});
//					store.baseParams = options.params;
//				});

		store.load({
					params : {
						parentTypeid : -1,
						state : awbsPanel.state
					}
				});
	}
	awbsPanel.dataPanel = new Ext.Panel({// awbsPanel.dataPanel面板，包含grid面板
		layout : 'fit',
		border : false,
		frame : false,
		autoScroll : true,
		bodyStyle : 'overflow:auto;',
		items : [grid]
	});
	awbsPanel.main = new Ext.Panel({// 返回面板,包含awbsPanel.dataPanel面板
		layout : 'card',
		activeItem : 0,
		frame : false,
		border : false,
		split : true,
		items : [awbsPanel.dataPanel]
	});
	return awbsPanel.main;
}
