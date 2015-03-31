var productGrid = {
	userId : null
};

// 数据列表
productGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/product_ProductRemote.getAll?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'productid', 'batchno', 'productcode', 'productname', 'remarks','leaf','parentid' ])
	});
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel( [ sm, rm,{
		header : '产品型号',
		dataIndex : 'productcode',
		width : 300,
		sortable : true
	}/*, {

		header : '产品描述',
		dataIndex : 'productname',
		sortable : true

	},  {
		header : '产品批次',
		dataIndex : 'batchno',
		sortable : true
	}, {
		header : ' 备注 ',
		dataIndex : 'remarks',
		width : 100,
		sortable : true
	}*/ ]);
	var tbar = [ /*'-', {
		text : '新增',
		iconCls : 'add1',
		handler : function() {
			productAction.addView();
		}
	}, '-', {
		text : '编辑',
		iconCls : 'edit1',
		handler : function() {
			productAction.editeView();
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		handler : function() {
			productAction.del();
		}
	},*/'-',{text:'搜索',iconCls : 'search1',handler:function(){
		productAction.search();
	}} ];
	var grid = common.gridPanel('productProductid', cm, store, null/*tbar*/, true,
			sm, '用户登陆信息');
	store.baseParams={start : 0,limit : 20};
	store.load();
	return grid;
}

// 人员
productGrid.getReaderName = function() {
	depUser.users('姓名', '', 'userName');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = true;
	depUser.usersComb.on('select', function(combo, record, index) {
		archivesGrid.userId = record.get(combo.valueField);
	});
	return depUser.usersComb;
}

// 搜索
productGrid.search = function() {
	var panel = Ext.getCmp("productGridPanelId");
	panel.getStore().baseParams = {
		start : 0,
		limit : 20,
		userId : archivesGrid.userId
	};
	panel.getStore().load();
}
