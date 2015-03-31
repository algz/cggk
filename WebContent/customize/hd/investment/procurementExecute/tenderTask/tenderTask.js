/**
 * desc 申报单位列表
 * @author zhaodw
 */

var tenderTask = { 
};

tenderTask.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var tenderTaskStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/stockPlan_Remote.getGridDataByType?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'rownum'
						}, ['rownum',  'demartment',
							'procurementtype', 'amount','fixid','total',
							'taskCode','powerConsumption','area','plant',
							'installationofplant','materialstandard','materialitemname','price','fileId','fileName'])

			});
	var cm = new Ext.grid.ColumnModel([sm, rm,{
				header : '任务名称',
				dataIndex : 'materialitemname',
				sortable : true,
				width : 180,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var id = record.get("fixid");   
					return "<a href=javascript:void(0); onclick=javascript:tenderTaskAction.showPanel('"+id+"'); >"+value+"</a>"; 
				}
			}, {
				header : '规格牌号',
				dataIndex : 'materialstandard',
				sortable : true,
				width : 180
			}, {
				header : '采购数量',
				dataIndex : 'amount',
				sortable : true,
				width : 180
			}, {
				header : '提出单位',
				dataIndex : 'demartment',
				sortable : true,
				width : 180
			}
//			, {
//				header : '任务编号',
//				dataIndex : 'taskCode',
//				sortable : true,
//				width : 180
//			}, {
//				header : '采购类型',
//				dataIndex : 'procurementtype',
//				sortable : true,
//				width : 180
//			}, {
//				header : '价格',
//				dataIndex : 'price',
//				sortable : true,
//				width : 180
//			}, {
//				header : '生产厂商',
//				dataIndex : 'plant',
//				sortable : true,
//				width : 180
//			}, {
//				header : '耗电量',
//				dataIndex : 'powerConsumption',
//				sortable : true,
//				width : 180
//			}, {
//				header : '需面积',
//				dataIndex : 'area',
//				sortable : true,
//				width : 180
//			}, {
//				header : '安装厂房',
//				dataIndex : 'installationofplant',
//				sortable : true,
//				width : 180
//			}, {
//				header : '技借卡',
//				dataIndex : 'fileName',
//				sortable : true,
//				width : 180,
//				renderer : function(value, cellmeta, record,
//						rowIndex) {
//					var ID = record.get("fileId");
//					var ORIGINALNAME = record.get("fileName");
//					value = "&nbsp;<font color=blue>" + value
//							+ "</font>";
//					return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
//							+ ID
//							+ "&ORIGINALNAME="
//							+ encodeURI(encodeURI(ORIGINALNAME))
//							+ "'>" + value + "</a>";
//			   }
//			}
			
	]);
	var toolbar = [
//	'-',
//					{text:'送审',
//					 iconCls : 'Send',
//					 handler:function(){
//						
//					 } 
//					},
					'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							tenderTaskQuery.getSearchForm().show();
						}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'tenderTaskGrid',
				layout : 'fit',
				cm : cm,
				sm : sm,
				store : tenderTaskStore,
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
							store : tenderTaskStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

//			tenderTaskStore.on('load',function(store, records, options){
//		
//	}); 
	return grid;
}
tenderTask.centerPanel = new Ext.Panel({
			id : 'tenderTaskCenterPanel', 
			layout : 'fit',
			items : [tenderTask.gridPanel()]
		});
tenderTask.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '任务编号列表',
				id : 'tenderTaskTab', 
				layout : 'fit',
				items : [tenderTask.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp('tenderTaskGrid').store.baseParams={start:0,limit:20,materialcatalogName:'机电设备'};
						Ext.getCmp('tenderTaskGrid').store.load();
					}
				}
 
			});

	return tab;
}; 