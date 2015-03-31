var categoryData = {
	grid : null,
	start : 0,
	checkrecord : null,
	limit : 10,
	args : {
		start : 0,
		limit : 10
	},
	baseargs : null
}
categoryData.init = function(title, id, i, datacenterid) {

	var temp = {};
	temp.id = id;
	temp.datacenterid = datacenterid;

	var strurl = '../JSON/datacenter_DataCenterRemote.getInstanceTopData';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'dataEntityID'
			}, ['dataEntityID', 'revision','dataEntityType', 'dataEntityName', 'value',
					'dataEntityTypeName',"dataCenterID",'dcategoryinstanceid','dimension']);
	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams : {
					start : 0,
					limit : 10
				}
			});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		header : ""
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : ""+getResource('resourceParam480')+"",
			dataIndex : 'dataEntityName',
			width : 150
		}, {
			header : ""+getResource('resourceParam511')+"",
			dataIndex : 'value',
			width : 150
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'dataEntityTypeName',
			width : 150
		}, {
			header : ""+getResource('resourceParam853')+"",
			dataIndex : 'dimension',
			width : 100
		}]
	});

	var grid = categoryData.gridinit(ds, cm, sm);

	sm.on('selectionchange', function(selModel) {
				dataCenterData.selectedRows = selModel.getSelected();
			})
	var tab = new Ext.Panel({
		title : title,
		closable : false,
		closeAction : 'hide',
		autoDestroy : false,
		border : false,
		items : [grid],
		listeners : {
			'activate' : function() {
				grid.getStore().on('beforeload', function(store, options) {
					options.params = Ext.apply(options.params, {
								// disableCheck : true,
								dataCenterID : temp.datacenterid,
								categoryInstanceID : temp.id
							});
				});
				grid.getSelectionModel().clearSelections();
				grid.getStore().load();
				grid.setHeight(tab.getHeight());
			},
			'bodyresize' : function() {
				grid.setHeight(tab.getHeight());
			}

		}
	});
	return tab;
}
categoryData.gridinit = function(ds, cm, sm) {
	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : ''+getResource('resourceParam579')+''
		},
		viewConfig : {
			forceFit : true
		},
		stripeRows : true, // 相邻行的颜色是否有差别
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 25,
			store : ds,
			displayInfo : true,
			displayMsg : ''+getResource('resourceParam946')+'{0} - {1} '+getResource('resourceParam949')+' {2} 行',
			emptyMsg : ""+getResource('resourceParam945')+""
		})
	})
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	return grid;

};
