var wbsPanel = {
	nodeId : null,
	status : -1,
	privilege : false,
	pageSize : 50
};
wbsPanel.init = function(config) {
	var record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'status'
			}, {
				name : 'issuedManId'
			}, {
				name : 'issuedManName'
			}, {
				name : 'createTime'
			}, {
				name : 'description'
			}, {
				name : 'id'
			}, {
				name : 'parent'
			}, {
				name : 'leaf'
			}, {
				name : 'iconCls'
			}, {
				name : 'deepLevel'
			}, {
				name : 'itemId'
			}, {
				name : 'dataType'
			}]);
	wbsPanel.sm = new Ext.grid.CheckboxSelectionModel();

	/**
	 * bug编号
	 */
	var method = 'myMain.toTreeView';
	var hideNameLink=false;
	if (config) {
		if (config.method) {
			method = config.method;
		}
		/*
		 * add by suny
		 * 2011-04-24
		 * 因为任务流程模板查看流程详细页面产生冲突
		 * 为了在协同工程屏蔽应用模板时，查看详细的链接
		 * 增加了属性hideNameLink
		 * 
		 */
		if(config.hideNameLink){
			hideNameLink=config.hideNameLink;
		}
	}
	/**
	 * bug编号789 wangyf
	 * bug信息：任务流程模板和审批模板中，展开文件夹以后，前面的序号就错乱
	 * 2011-05-24
	 */
//	var cm = [new Ext.grid.RowNumberer(), wbsPanel.sm, {
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [wbsPanel.sm, {
			id : 'name',
			header : getResource('resourceParam480'),
			/**
			 * bug编号478
			 * 暂时解决方法：增加width的值
			 * @author wangyf
			 * 2011-05-05 14:00
			 */
			width : 350,
			dataIndex : 'name',
			renderer : function(v, meta, r,rowIndex,colIndex,store) {
				var realWidth=grid.getColumnModel().getColumnWidth(colIndex);
				if (r.data.dataType == 'WBSTemplate') {
					if(hideNameLink){
						return '<span ext:qtip='+v+' style="color:blue;font-weight:bold;" >'
						+ v + '</span>';
					}
					return '<a href="javascript:void(0);" onClick="' + method + '(' + r.data.id
							+ ',\'' + r.data.name
							+ '\')"><span ext:qtip='+v+' style="color:blue;font-weight:bold;" >'
							+ v + '</span></a>';
				}
				return v;
			}
		}, {
			header : getResource('resourceParam500'),// 状态
			width : 100,
			dataIndex : 'status',
			renderer : function(value, p, record) {
				if (value == 0) {
					return '' + getResource('resourceParam947') + '';
				} else if (value == 1) {
					return '<span style="color:gray;font-weight:bold;" >'
							+ getResource('resourceParam948') + '</span>';
				} else if (value == 2) {
					return '<span style="color:blue;font-weight:bold;" >'
							+ getResource('resourceParam509') + '入库</span>';
				} else {
					return '';
				}
			}
		}, {
			header : getResource('resourceParam5007'),// 创建人
			width : 100,
			dataIndex : 'issuedManName'
		}, {
			header : getResource('resourceParam981'),// 创建时间
			width : 100,
			dataIndex : 'createTime'
	
		}, {
			header : getResource('resourceParam648'),// 描述
			width : 100,
			dataIndex : 'description'
	
		}]
	});
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/wbstemplate_TemplateRemote.getPagedWBSTree'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				baseParams : {
					node : wbsPanel.nodeId,
					status : wbsPanel.status
				},
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});
	store.on('beforeexpandnode', function(store, record) {
				wbsPanel.sm.selectRecords([record]);
				wbsPanel.nodeId = record.get('id');
				Ext.apply(store.baseParams,{
					node : wbsPanel.nodeId,
					status : wbsPanel.status,
					privilege:wbsPanel.privilege
				});
			})
	wbsPanel.clear = function() {
		store.removeAll();
	}

	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		// autoHeight : true,//去掉,固定表头
		viewConfig : {
			forceFit : true
		},
		sm : wbsPanel.sm,
		master_column_id : 'name',
		cm : cm,
		stripeRows : true,
		autoExpandeColumn : 'name',
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
			store : store,
			displayInfo : true,
			pageSize : wbsPanel.pageSize,
			listeners : {
				'beforechange' : function(pagingbar, options) {
					var len = wbsPanel.sm.getSelections().length;
					if (len < 1) {
						Ext.apply(options, {
										node : 0,
										status : wbsPanel.status,
										privilege:wbsPanel.privilege
									});
					} else {
						var rec = wbsPanel.sm.getSelected();
						wbsPanel.nodeId = rec.get('id');
						Ext.apply(options, {
							node : wbsPanel.nodeId,
							status : wbsPanel.status,
							privilege:wbsPanel.privilege
						});
					}
				}
			}
		})
	});
	grid.on('columnresize',function(columnIndex,newWidth){})
	wbsPanel.refresh = function() {
		store.removeAll();
		grid.getBottomToolbar().bindStore(store);
		store.load({
					params : {
						node : 0,
						status : wbsPanel.status,
						privilege:wbsPanel.privilege
					}
				});
	}
	wbsPanel.dataPanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [grid]
			});
	wbsPanel.main = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				frame : false,
				border : false,
				split : true,
				items : [wbsPanel.dataPanel]
			});
	return wbsPanel.main;
}
