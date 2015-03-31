var approvalInfoList = {}
approvalInfoList.grid = function(objectId){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var declare_demartmentStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/approvalInfoRemote.getApprovalInfoList?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'approvalInfoId'
						}, ['approvalInfoId',  'userName',
								'status', 'content','approvalDate']),
				baseParams :{
					start:0,limit:20
				}

			});
	var cm = new Ext.grid.ColumnModel([sm, rm,{
				header : '审批人',
				dataIndex : 'userName',
				sortable : true,
				width : 180 
			}, {
				header : '审批时间',
				dataIndex : 'approvalDate',
				sortable : true,
				width : 180
			}, {
				header : '审批类型',
				dataIndex : 'status',
				sortable : true,
				width : 180
			}, {
				header : '审批意见',
				dataIndex : 'content',
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
				id : 'approvalInfoListgrid',
				layout : 'fit',
				cm : cm,
				sm : sm,
				store : declare_demartmentStore,
				autoScroll : true,
				height : 300,
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
//				tbar:toolbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : declare_demartmentStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});
	declare_demartmentStore.baseParams = {start:0,limit:20,objectId:objectId};
	declare_demartmentStore.load();
	return grid;
}
approvalInfoList.showWin = function(objectId){
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			window.close();
		}
	} ];
	var historyGrid = approveFlowSteps.getGrid();
	var window = new Ext.Window( {
		id : "approvalInfoList_win",
		title : "审批记录页面",
		width : 800, 
		height:300,
		autoScroll : true, 
		modal : true,
		layout:'border',
		items : historyGrid,
		buttons : buttons,
		autoDestory : true,
		closeAction :'close'
	});  
	approveFlowSteps.getAllApprovalRecord(objectId);
	window.show();
}