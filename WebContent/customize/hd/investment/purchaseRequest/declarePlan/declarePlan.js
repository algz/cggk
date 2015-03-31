/**
 * desc 申报单位列表
 * @author zhaodw
 */

var declarePlan = {
	 
};

declarePlan.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var declarePlanStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/declarePlan_DeclarePlanRemote.getGridDataByConditon?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'declareplanID'
						}, ['declareplanID',  'declareplanName','generator',
								'declareplanCode', 'amount', 'quantity', 'status',
								'editer', 'editDate', 'sendDate','declareplanType','propertyType',
								'minAmount','maxAmount'])

			});
	var cm = new Ext.grid.ColumnModel([sm,rm, {
				header : '申报计划名称',
				dataIndex : 'declareplanName',
				width : 140,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var id = record.id;    
					return '<a href=javascript:void(0); onclick="javascript:declarePlanAction.showPanel(\'\',\'\',\''+id+'\',\'declarePlan_Grid\',\''+record.data.declareplanType+'\',\''+record.data.status+'\',\''+record.data.generator+'\');" >'+value+'</a>'; 
				}
			}, {
				header : '申报计划编号',
				dataIndex : 'declareplanCode',
				sortable : true,			
				width : 140
			}, {
				header : '采购类型',
				dataIndex : 'declareplanType',
				sortable : true,			
				width : 80
			}, {
				header : '资产类别',
				dataIndex : 'propertyType',
				sortable : true,			
				width : 80
			}, {
					header : '金额(单位：元)',
				dataIndex : 'amount',
				sortable : true,
				width : 120
			}
			, 
			{
				header : '项数',
				dataIndex : 'quantity',
				sortable : true,
				width : 80
			}, 
			{
				header : '状态',
				dataIndex : 'status',
				sortable : true,
				width : 80
			},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id =record.id; 
							var applicationStatus = record.get("status");
//							if(applicationStatus!="编制中"){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
			}, {
				header : '制表人',
				dataIndex : 'editer',
				sortable : true,
				width : 80
			}, {
				header : '最后修改时间',
				dataIndex : 'editDate',
				sortable : true,
				width : 80
			} ,{
				header : '数据类型',
				dataIndex : 'generator',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex){
					if(value == 1){
						return "新建数据";
					}else{
						return "汇总数据";
					}
				}
			} 

	]);
	var toolbar = [ '-',{
					text:'新建',
					iconCls : 'add1',
//					disabled : privilegeValidate.addDpDisable,
					handler : function(){declarePlanAction.addWin();}
					},
					'-',
					{text:'修改',
					 iconCls : 'edit1',
					 handler:function(){
						declarePlanAction.update();
					}},'-',
					{text:'删除',
					 iconCls : 'del1',
					 handler:function(){
						declarePlanAction.deleteDeclarePlan();
					}},'-',
					{text:'送审',
						 iconCls : 'Send',
						 handler:function(){
							declarePlanAction.submitDeclarePlan();
					}},'-',{
						text : '提交',
						iconCls : 'Send',
						handler : function(){
							declarePlanAction.submitDeclarePlan2();
						}
					},'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							declare_query_form.getSearchForm().show();
					}},'-',
					{text:'打印',
					 iconCls : 'Import',
					 disabled :true,
					 handler:function(){
									 
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'declarePlanGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : declarePlanStore,
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
							store : declarePlanStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

//		declarePlanStore.on('load',function(store, records, options){
//		
//	});
	grid.on('activate', function() { 
		store.load();
	}); 
		
	return grid;
}
declarePlan.centerPanel = new Ext.Panel({
			id : 'declarePlanCenterPanel', 
			layout : 'fit',
			items : [declarePlan.gridPanel()]
		});
declarePlan.tabPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var declarePlanStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/declarePlan_DeclarePlanRemote.getGridDataByConditon?d='
									+ new Date(),
							method : "post"
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'declareplanID'
						}, ['declareplanID',  'declareplanName','generator',
								'declareplanCode', 'amount', 'quantity', 'status',
								'editer', 'editDate', 'sendDate','declareplanType','propertyType'])

			});
	var cm = new Ext.grid.ColumnModel([sm,rm, {
				header : '申报计划名称',
				dataIndex : 'declareplanName',
				width : 140,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var id = record.id;    
					return '<a href=javascript:void(0); onclick="javascript:declarePlanAction.showPanel(\'\',\'\',\''+id+'\',\'declarePlan_Grid\',\''+record.data.declareplanType+'\',\''+record.data.status+'\',\''+record.data.generator+'\');" >'+value+'</a>'; 
				}
			}, {
				header : '申报计划编号',
				dataIndex : 'declareplanCode',
				sortable : true,			
				width : 140
			}, {
				header : '采购类型',
				dataIndex : 'declareplanType',
				sortable : true,			
				width : 80
			}, {
				header : '资产类别',
				dataIndex : 'propertyType',
				sortable : true,			
				width : 80
			}, {
					header : '金额(单位：元)',
				dataIndex : 'amount',
				sortable : true,
				width : 120
			}
			, 
			{
				header : '项数',
				dataIndex : 'quantity',
				sortable : true,
				width : 80
			}, 
			{
				header : '状态',
				dataIndex : 'status',
				sortable : true,
				width : 80
			},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id =record.id; 
							var applicationStatus = record.get("status");
							var generator = record.get('generator');
//							if(applicationStatus!="编制中"){
							if(generator != 1){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
							}
//							}			
						},
						sortable : true
			}, {
				header : '制表人',
				dataIndex : 'editer',
				sortable : true,
				width : 80
			}, {
				header : '最后修改时间',
				dataIndex : 'editDate',
				sortable : true,
				width : 80
			} ,{
				header : '数据类型',
				dataIndex : 'generator',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex){
					if(value == 1){
						return "新建数据";
					}else{
						return "汇总数据";
					}
				}
			} 

	]);
	var toolbar = [ '-',{
					text:'新建',
					iconCls : 'add1',
					disabled : privilegeValidate.addDpDisable,
					handler : function(){declarePlanAction.addWin();}
					},
					'-',
					{text:'修改',
					 iconCls : 'edit1',
					 disabled : privilegeValidate.updateDpDisable,
					 handler:function(){
						declarePlanAction.update();
					}},'-',
					{text:'删除/退回',
					 iconCls : 'del1',
					 disabled : privilegeValidate.delDpDisable,
					 handler:function(){
					 	Ext.Msg.confirm('提示','确定删除/退回数据吗？',function(btn){
							if (btn != 'yes') return;
							declarePlanAction.deleteDeclarePlan();
					 	});
					}},'-',
					{text:'送审',
						 iconCls : 'Send',
						 disabled : privilegeValidate.sendDpDisable,
						 handler:function(){
							declarePlanAction.submitDeclarePlan();
					}},'-',{
						text : '提交',
						iconCls : 'Send',
						disabled : privilegeValidate.submitDpDisable,
						handler : function(){
							Ext.Msg.confirm('提示','确定提交数据吗？',function(btn){
								if (btn != 'yes') return;
								declarePlanAction.submitDeclarePlan2();
							});
							
						}
					},'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							declare_query_form.getSearchForm().show();
					}},'-',
					{text:'打印',
					 iconCls : 'Import',
					 disabled :true,
					 handler:function(){
									 
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'declarePlanGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : declarePlanStore,
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
							store : declarePlanStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

//		declarePlanStore.on('load',function(store, records, options){
//		
//	});
	grid.on('activate', function() { 
		store.load();
	}); 
	var tab = new Ext.Panel({
				title : '申报计划列表',
				id : 'declarePlanTab', 
				layout : 'fit',
				items : [grid],
				listeners : {
					'activate' : function() {
						Ext.getCmp("declarePlanGrid").store.baseParams = {start :0,limit:20};
						Ext.getCmp("declarePlanGrid").store.load();
					}
				}
 
			});

	return tab;
}; 