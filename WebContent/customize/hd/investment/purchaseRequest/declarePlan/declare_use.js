/**
 * desc 申报单位列表
 * @author zhaodw
 */

var declare_use = {
	 
};

declare_use.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var declare_useStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/declarePlan_DeclarePlanRemote.getDeclareUseGridDataByConditon?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'num'
						}, ['num',  'use',
								'totalCount', 'totalAmount']),
								
				baseParams :{
					start:0,limit:20
				}

			});
	var cm = new Ext.grid.ColumnModel([sm,rm, {
				header : '采购用途',
				dataIndex : 'use',
				sortable : true,
				width : 180,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var id = record.get("use");  
					return '<a href=javascript:void(0); onclick="javascript:declarePlanAction.showPanel(\'\',\''+id+'\',\'\',\'declare_use_Grid\');" >'+value+'</a>'; 
				}
			}, {
				header : '项数',
				dataIndex : 'totalCount',
				sortable : true,
				width : 180
			}, {
				header : '金额(单位：元)',
				dataIndex : 'totalAmount',
				sortable : true,
				width : 180
			}

	]);
	var toolbar = [ '-',
					{text:'查询',
					 iconCls : 'search1',
					 handler:function(){
							declare_use_query_form.getSearchForm().show();
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'declare_useGrid',
				layout : 'fit',
				cm : cm,
				sm : sm,
				store : declare_useStore,
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
				tbar:toolbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : declare_useStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

		declare_useStore.on('load',function(store, records, options){
		
	});
	grid.on('activate', function() { 
		store.load();
	}); 
	return grid;
}
declare_use.centerPanel = new Ext.Panel({
			id : 'declare_useCenterPanel', 
			layout : 'fit',
			items : [declare_use.gridPanel()]
		});
declare_use.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '采购用途',
				id : 'declare_useTab', 
				layout : 'fit',
				items : [declare_use.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp('declare_useGrid').store.load();
					}
				}
 
			});

	return tab;
}; 