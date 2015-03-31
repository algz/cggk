/**
 * desc 申报单位列表
 * @author zhaodw
 */

var declare_demartment = {
	 
};

declare_demartment.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var declare_demartmentStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/declarePlan_DeclarePlanRemote.getDeclareDepartmentGridDataByConditon?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'rownum'
						}, ['rownum',  'departmentName',
								'totalCount', 'totalAmount','departmentId']),
				baseParams :{
					start:0,limit:20
				}

			});
	var cm = new Ext.grid.ColumnModel([sm, rm,{
				header : '部门',
				dataIndex : 'departmentName',
				sortable : true,
				width : 180,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var id = record.get("departmentId");   
					return '<a href=javascript:void(0); onclick="javascript:declarePlanAction.showPanel(\''+id+'\',\'\',\'\',\'declare_demartment_Grid\');" >'+value+'</a>'; 
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
						declare_deparment_query_form.getSearchForm().show();
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'declare_demartmentGrid',
				layout : 'fit',
				cm : cm,
				sm : sm,
				store : declare_demartmentStore,
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
							store : declare_demartmentStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

		declare_demartmentStore.on('load',function(store, records, options){
		
	});
//	grid.on('activate', function() { 
//		store.load();
//	}); 
//		declare_demartmentStore.load();
	return grid;
}
declare_demartment.centerPanel = new Ext.Panel({
			id : 'declare_demartmentCenterPanel', 
			layout : 'fit',
			items : [declare_demartment.gridPanel()]
		});
declare_demartment.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '申报单位',
				id : 'declare_demartmentTab', 
				layout : 'fit',
				items : [declare_demartment.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp('declare_demartmentGrid').store.baseParams={start:0,limit:20};
						Ext.getCmp('declare_demartmentGrid').store.load();
					}
				}
 
			});

	return tab;
}; 