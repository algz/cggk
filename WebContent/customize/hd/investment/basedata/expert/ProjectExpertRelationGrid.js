/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var ProjectExpertRelationGrid = {
	userId : null
};

// 数据列表
ProjectExpertRelationGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/expertRemote.getProjectExpertRelationList?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'projectExportRelationId',
					totalProperty : 'totalProperty'
				}, [ 'projectCode', 'projectName', 'projectExportRelationId', 'projectAmount'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '项目编号 ',
				dataIndex : 'projectCode',
				width : 100
			},			
			{
				header : '项目姓名',
				dataIndex : 'projectName',
				sortable : true
			} ,
			{
				header : '金额 ',
				dataIndex : 'projectAmount',
				width : 100	,
				sortable : true			
			},
			{
				header : '专家信息 ',
				dataIndex : 'projectAmount',
				width : 100	,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
						var projectExportRelationId = record.get("projectExportRelationId");
						return "<a href=javascript:void(0); onclick=ExpertAction.showExpert('"+projectExportRelationId+"'); ><font color=blue>浏览</font></a>"; 
				}
			} ]);
	var tbar = ['-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			ProjectExpertRelationQuery.getSearchForm().show();
		}
	}  ];
	var grid = common.gridPanel('ProjectExpertRelationGridPanelId', cm, store, tbar, true, sm,
			'供应商信息'); 
	return grid;
}

ProjectExpertRelationGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '项目专家库',
		id : 'ProjectExpertRelationGridTab',
		layout : 'fit',
		items : [ ProjectExpertRelationGrid.gridPanel() ],
		listeners : {
			'activate' : function() {
			 
				var grid = Ext.getCmp('ProjectExpertRelationGridPanelId'); 
				grid.store.baseParams = {start : 0,limit :20};
				grid.store.load();
			}
		}
	});

	return tab;
};
