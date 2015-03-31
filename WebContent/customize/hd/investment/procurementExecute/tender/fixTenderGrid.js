/**
 * desc 土建工程  招标项目列表
 * @author fanzhihui
 */

var fixTender = {  
};

fixTender.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var tenderStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/tenderRemote.getGridData?d='
								+ new Date(),
							method : "post"
						}),
						reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'tenderId'
						}, ['tenderId',  'tenderCode',
								'tenderName', 'tenderDepartment', 'procurementPlanDetilName', 'tenderType',
								'status', 'createDate', 'remark','procurementPlanDetilId','tenderFileType'])

			});
	var cm = new Ext.grid.ColumnModel([sm,rm, {
				header : '编号',
				dataIndex : 'tenderCode',
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
						var procurementPlanDetilId = record.get("procurementPlanDetilId"); 
						var tenderType = record.get("tenderType");
						var tenderId = record.get("tenderId");
						return "<a href=javascript:void(0); onclick=tenderAction.addFixView('"+procurementPlanDetilId+"','"+tenderType+"','"+tenderId+"'); ><font color=\"red\">"+value+"</font></a>"; 
				}
			}, {
				header : '名称',
				dataIndex : 'tenderName',
				sortable : true,			
				width : 120
			}, {
				header : '招标单位',
				dataIndex : 'tenderDepartment',
				sortable : true,
				width : 120
			}
			, {
				header : '招标方式',
				dataIndex : 'tenderType',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) {  
						if(record.get("tenderType")=="3")
							return "定向采购";
					    else if(record.get("tenderType")=="4")
							return "委托招标";
					    else if(record.get("tenderType")=="5")
							return "自行比价";
				}
			}, {
				header : '生成日期',
				dataIndex : 'createDate',
				sortable : true,
				width : 80
			}, {
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 120
			}, {
				header : '定向/委托/比价',
				dataIndex : 'editDate',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var type = parseInt(record.get("tenderType"))+5;
					return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',"+type+",'f'); ><font color=blue>浏览</font></a>"; 
				}
			} , {
				header : '招标文件',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var tenderFileType = record.get('tenderFileType');
					if(record.get("tenderType")=="3")
				        return "";
					else if(parseInt(tenderFileType)>1)
					    return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',3,'f'); ><font color=blue>浏览</font></a>"; 
				     else 
				        return "";
				}
			}, {
				header : '评审文件',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var tenderFileType = record.get('tenderFileType');
					if(record.get("tenderType")!="3" && parseInt(tenderFileType)>2)
						return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',5,'f'); ><font color=blue>浏览</font></a>"; 
					 else if(record.get("tenderType")=="3")
				        return "";
					else 
				        return "";
				}
			}
			, {
				header : '谈判记录',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
				var tenderFileType = record.get('tenderFileType');
				if(record.get("tenderType")=="3" && parseInt(tenderFileType)>1)
					return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',7,'f'); ><font color=blue>浏览</font></a>"; 
				else 
				        return "";
				}
			}
			, {
				header : '中标通知书',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
				var tenderFileType = record.get('tenderFileType');
				if((record.get("tenderType")=="3" && parseInt(tenderFileType)>2) || ((record.get("tenderType")=="4" || record.get("tenderType")=="5") && parseInt(tenderFileType)>3))
					return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',6,'f'); ><font color=blue>浏览</font></a>"; 
				else 
				    return "";
				}
			}, {
				header : '技术协议',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
				var tenderFileType = record.get('tenderFileType'); 
				    return "浏览";
				}
			}, {
				header : '质量协议',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
				var tenderFileType = record.get('tenderFileType'); 
				    return "浏览";
				}
			}


	]);
	var toolbar = [ 
					'-',
					{text:'新建',
					 iconCls : 'add1',
					 handler:function(){
						 tenderAction.addFixView('','','');
					}},'-',
					{text:'删除',
						 iconCls : 'del1',
						 handler:function(){
//						 Ext.Ajax.request({
//							url : '../JSON/departmentTask_DepartmentTaskRemote.relateExistTask',
//							method : 'post',
//							disableCaching : true,
//							autoAbort : true,
//							success : function(response, options) {
//								var wind = Ext.getCmp('relationWin');
//								wind.close();
//								departmentTaskColumnTreePanel.backMainPanel();
//							},
//							params : {
//								taskId : outerTaskId+'|'+departmentTaskColumnTreePanel.taskId
//							}
//						 });
							tenderAction.del('fixTenderGrid');
						}},'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							tenderAction.searchFixView();
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'fixTenderGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : tenderStore,
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
							store : tenderStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});

//		tenderStore.on('load',function(store, records, options){
//		
//	});

	return grid;
}
fixTender.centerPanel = new Ext.Panel({
			id : 'tenderCenterPanel', 
			layout : 'fit',
			items : [fixTender.gridPanel()]
		});
fixTender.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '招标管理',
				id : 'tenderTab', 
				layout : 'fit',
				items : [fixTender.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp("fixTenderGrid").store.baseParams={start:0,limit:20,pageType:'2'};
						Ext.getCmp("fixTenderGrid").store.load();
					}
				}
 
			});

	return tab;
}; 