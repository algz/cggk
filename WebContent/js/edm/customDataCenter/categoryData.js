var categoryData = {
	grid : null,
	start : 0,
	checkrecord : null,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
}
categoryData.init = function(title, id, i, datacenterid) {

	var temp = {

	};
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
			}, ['dataEntityID', 'dataEntityName', 'value']);
	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
					},
					rowselect : function(sm, rowIndex, record) {
					}
				}

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
			width : 300
		}]
	});

	var tb = null;
	var grid = categoryData.gridinit(ds, cm, tb, sm);
	myGrid.loadvalue(grid.store, categoryData.args, categoryData.baseargs);

	sm.on('selectionchange', function(selModel) {
				dataCenterData.checkedRows = selModel.getSelections();
			})
	var tab = new Ext.Panel({
		// id : 'abc',
		title : title,
		closable : false,
		closeAction : 'hide',
		autoDestroy : false,
		border : false,
		// layout : 'fit',
		items : [grid],
		listeners : {
			'activate' : function() {

				grid.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/datacenter_DataCenterRemote.getInstanceTopData'
					})
					options.params = Ext.apply(options.params, {
								// disableCheck : true,
								dataCenterID : temp.datacenterid,
								categoryInstanceID : temp.id
							});
				});
				// dataObjectTree.getSelectionModel().clearSelections();
				grid.getStore().load();
				grid.setHeight(tab.getHeight() - 20);
			},
			'bodyresize' : function() {
				grid.setHeight(tab.getHeight());
			}

		}
	});
	return tab;
}
categoryData.gridinit = function(ds, cm, tb, sm, plugin) {

	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
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
		tbar : tb,
		stripeRows : true, // 相邻行的颜色是否有差别
		// plugins:checkEditable,
		clicksToEdit : 1, // 设置插件
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 25,
			store : ds,
			displayInfo : true,
			displayMsg : ''+getResource('resourceParam946')+'{0} - {1} '+getResource('resourceParam949')+' {2} 行',
			emptyMsg : ""+getResource('resourceParam945')+""
		})
	})
	// 定义grid的rowclick事件
	grid.on('rowclick', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	// grid.on('afteredit',function(e){
	// var r=e.record;
	// if(r.get("taskid")!=null || r.get("taskid").length<=0)
	// {
	// var appVo =
	// Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
	// appVo.setTaskid(r.get("taskid"));
	// appVo.setCompletedamount(r.get("completedamount"));
	// callSeam("tasklist_taskService", "updateCompletedamount",
	// [appVo],updateDetail);
	// }
	//    	
	// });
	return grid;

};
