/**
 * desc 招标项目列表
 * @author zhaodw
 */

var tenderItem = {
	 
};

tenderItem.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var tenderItemStore = new Ext.data.Store({
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
								'procurementtype', 'amount','fixid','materialitemname']) 
			});
	var cm = new Ext.grid.ColumnModel([sm, rm,{
				header : ' 采购项名称',
				dataIndex : 'materialitemname',
				sortable : true,
				width : 180 
			}, {
				header : '预算金额',
				dataIndex : 'amount',
				sortable : true,
				width : 180
			}, {
				header : '申报单位',
				dataIndex : 'demartment',
				sortable : true,
				width : 180
			}, {
				header : '<font color=red>招标方式</font>',
				dataIndex : 'procurementtype',
				sortable : true,
				width : 180,
				editor : tenderItem.cobom()
			}
//			, {
//				header : '审批时间',
//				dataIndex : 'totalAmount',
//				sortable : true,
//				width : 180
//			}
			, {
				 
				dataIndex : 'fixid',
				hidden : true
			}
			
	]);
	var toolbar = [ '-',
					{text:'提交',
					 iconCls : 'save1',
					 handler:function(){
						tenderItemAction.save();
					}},'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							tenderItemQuery.getSearchForm().show();
						}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'tenderItemGrid',
				layout : 'fit',
				cm : cm,
				sm : sm,
				store : tenderItemStore,
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
							store : tenderItemStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

//			tenderItemStore.on('load',function(store, records, options){
//		
//	}); 
	return grid;
}
tenderItem.cobom = function(){ 
		var combox = new Ext.form.ComboBox({
			id : 'materialCatalogName', 
			displayField : 'text',
			valueField : 'value',
			store : new Ext.data.SimpleStore({
				fields : ['value','text'],
				data : [ [ '自行招标', '自行招标' ],
				         [ '委托招标', '委托招标' ]]
			}),
			triggerAction : 'all',
			mode : 'local',
			editable : false,
			width:50,
			forceSelection : true,
			anchor : '90%'
		})
		return combox; 
};
tenderItem.centerPanel = new Ext.Panel({
			id : 'tenderItemCenterPanel', 
			layout : 'fit',
			items : [tenderItem.gridPanel()]
		});
tenderItem.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '招标项目',
				id : 'tenderItemTab', 
				layout : 'fit',
				items : [tenderItem.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp('tenderItemGrid').store.baseParams={start:0,limit:20,materialcatalogName:'土建'};
						Ext.getCmp('tenderItemGrid').store.load();
					}
				}
 
			});

	return tab;
}; 