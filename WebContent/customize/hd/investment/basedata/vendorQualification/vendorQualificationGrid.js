var vendorQualificationGrid = {
};

// 供应商登记--供应商资质列表
vendorQualificationGrid.gridPanel = function(vendorId,name) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendorQualificationRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'id', 'name', 'license', 'deadline',
						'issuingauthority', 'note','content','startDate'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '名称 ',
				dataIndex : 'name',
				width : 100 
			},			
			{
				header : '证书编号',
				dataIndex : 'license',
				sortable : true
			},	
			{
				header : '起始日期',
				dataIndex : 'startDate',
				sortable : true
			},
			{
				header : '期限',
				dataIndex : 'deadline',
				sortable : true
			},
			{
				header : '发证机关',
				dataIndex : 'issuingauthority',
				width : 100,
				sortable : true
			},
			{
				header : '内容',
				dataIndex : 'content',
				sortable : true 
			},{
				header : '备注',
				dataIndex : 'note',
				sortable : true
			} ]);
	var tbar = [
	'-', {
		text : '新增',
		iconCls : 'add1',
		handler : function() {
			vendorQualificationAction.addView(vendorId);
		}
	}, '-', {
		text : '编辑',
		iconCls : 'edit1',
		handler : function() {
			vendorQualificationAction.editView(vendorId);
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		handler : function() {
			vendorQualificationAction.del(vendorId);
		}
	}, '-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			vendorQualificationQuery.getSearchForm(vendorId).show();
		}
	}
 
	];
	 
	var grid = new Ext.grid.EditorGridPanel({
		id : 'vendorQualificationGridPanelId',
		layout : 'fit',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		height : 300,
		width : 700, 
		autoWidth : true,
		columnLines : true,
		clicksToEdit : 1,
		loadMask : {
			msg : '数据加载中...'
		},
		stripeRows : true,
		stripeRows: true, // 隔行换色  
		tbar : tbar,
		bbar : new Ext.PagingToolbar({
			pageSize : 20,
			store : store,
			displayInfo : true,
			displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
			emptyMsg : '没有记录'

		})
	}); 
	if(name=="venderManagerGridPanelId"){
		var bar = grid.getTopToolbar();
		if(bar!=null){
			bar.items.items[0].hide();
			bar.items.items[1].hide();
			bar.items.items[2].hide();
			bar.items.items[3].hide();
			bar.items.items[4].hide();
			bar.items.items[5].hide();
		}
	}

	return grid;
}

