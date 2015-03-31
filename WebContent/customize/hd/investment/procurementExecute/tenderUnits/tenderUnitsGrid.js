var tenderUnitsGrid = { 
};

// 数据列表
tenderUnitsGrid.gridPanel = function(tenderFileId) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/tenderUnits_tenderUnitsRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'venderId',
					totalProperty : 'totalProperty'
				}, [ 'tenderUnitsID', 'venderName', 'businessScope','address', 'price','remark','venderId','constructionUnderPoint','venderCode'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,{
				 
				dataIndex : 'venderId',
				hidden : true
			},
			{
				header : '供应商编号',
				dataIndex : 'venderCode',
				sortable : true
			},
 			{
				header : '供应商名称',
				dataIndex : 'venderName',
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			}, 
			{
				header : '经营地址 ',
				dataIndex : 'address',
				width : 100	,
				sortable : true			
			},
			{
				header : '价格 ',
				dataIndex : 'price',
				width : 100	,
				sortable : true,
				editor: new Ext.form.NumberField({ 
      		    }) 
			},
			{
				header : '承建下浮点 ',
				dataIndex : 'constructionUnderPoint',
				width : 100	,
				sortable : true	,
				editor: new Ext.form.TextField({ 
      		    }) 
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 300	,
				sortable : true,
				editor: new Ext.form.TextField({ 
      		    }) 
			} ]); 
	var tbar = [ {
		text : '查询 ',
			handler : function() {
				tenderUnitsQuery.getSearchForm().show();
			}
		}]
	var grid = new Ext.grid.EditorGridPanel({
				id : 'tenderUnitsGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 570,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});  
	return grid;
}

tenderUnitsGrid.getTenderUnits = function(tenderFileId){
	var buttons = [{
		text : '保存',
		handler : function() {
			tenderUnitsAction.save(tenderFileId); 
		}
	} , {
		text : '关闭 ',
		handler : function() {
			window.close();
		}
	}]; 
	var window = new Ext.Window( {
		id:'tenderUnitsWin',
		buttons : buttons,
	    layout : 'fit',
	    width : 750, 
	    height : 370,
	    buttonAlign:'center',
		autoScroll : true,
		title : '招标单位',
		modal : true,
		items : tenderUnitsGrid.gridPanel(),
		border : true
	});
	var grid = Ext.getCmp("tenderUnitsGrid");
	grid.store.baseParams = {start:0,limit:20};
	grid.store.load();
	return window;
};
tenderUnitsGrid.centerPanel = new Ext.Panel({
			id : 'tenderUnitsCenterPanel', 
			layout : 'fit',
			items : [tenderUnitsGrid.gridPanel()]
}); 
tenderUnitsGrid.tabPanel = function(){
	var tab = new Ext.Panel({
				title : '招标单位管理',
				id : 'tenderUnitsTab', 
				layout : 'fit',
				items : [tenderUnitsGrid.centerPanel],
				listeners : {
					'activate' : function() {
						var grid = Ext.getCmp("tenderUnitsGrid");
						grid.store.baseParams = {start:0,limit:20};
						grid.store.load();
					}
				}
 
			});

	return tab;
};

