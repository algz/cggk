/**
 * desc 投标管理列表
 * @author zhaodw
 */

var tender = { 
};

tender.gridPanel = function() {
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
					return "<a href=javascript:void(0); onclick=tenderAction.addView('"+procurementPlanDetilId+"','"+tenderType+"','"+tenderId+"'); ><font color=\"red\">"+value+"</font></a>"; 
				}
			}, {
				header : '名称',
				dataIndex : 'tenderName',
				sortable : true,			
				width : 80
			}, {
				header : '单位',
				dataIndex : 'tenderDepartment',
				sortable : true,
				width : 80
			}
			, 
			{
				header : '招标项目名称',
				dataIndex : 'procurementPlanDetilName',
				sortable : true,
				width : 80
			}, {
				header : '招标方式',
				dataIndex : 'tenderType',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) {  
						if(value=="2")
							return "招标";
					    else if(value=="1")
							return "委托";
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
				width : 80
			}, {
				header : '招标文件/委托文件',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					if(record.get("tenderType")=="1")
					  return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',2,'n'); ><font color=blue>浏览</font></a>"; 
					else
					  return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',3,'n'); ><font color=blue>浏览</font></a>"; 
				}
			}, {
				header : '委托审签表',
				dataIndex : 'remark',
				sortable : true,
				width : 80, 
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) {   
							var tenderFileType = record.get('tenderFileType');
							if(parseInt(tenderFileType)>1 && record.get("tenderType")=="1")
								 return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',1,'n'); ><font color=blue>浏览</font></a>"; 
							else if(record.get("tenderType")=="2")
							     return "";
							else
					   			 return "浏览";
				}
			}, {
				header : '管理登记表',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var tenderFileType = record.get('tenderFileType');
					if((record.get("tenderType")=="1" && parseInt(tenderFileType)>2) || (record.get("tenderType")=="2" && parseInt(tenderFileType)>1))
						return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',4,'n'); ><font color=blue>浏览</font></a>"; 
					else
					    return "浏览";
				}
			}, {
				header : '评审文件',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var tenderFileType = record.get('tenderFileType');
					if((record.get("tenderType")=="1" && parseInt(tenderFileType)>3) || (record.get("tenderType")=="2" && parseInt(tenderFileType)>2))
						return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',5,'n'); ><font color=blue>浏览</font></a>"; 
					else
					    return "浏览";
				}
			}, {
				header : '中标通知书',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					var tenderFileType = record.get('tenderFileType');
					if((record.get("tenderType")=="1" && parseInt(tenderFileType)>4) || (record.get("tenderType")=="2" && parseInt(tenderFileType)>3))
						return "<a href=javascript:void(0); onclick=tenderFileAction.getContent('"+record.get('tenderId')+"','"+record.get('procurementPlanDetilName')+"',6,'n'); ><font color=blue>浏览</font></a>"; 
					else
					    return "浏览";
				}
			}, {
				header : '技术协议',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) {  
					return "浏览";
				}
			}, {
				header : '质量协议',
				dataIndex : 'remark',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) {  
					return "浏览";
				}
			}
	]);
	var toolbar = [ 
					'-',
					{text:'新建',
					 iconCls : 'add1',
					 handler:function(){
						 tenderAction.addView('','','');
					}},'-',
					{text:'删除',
						 iconCls : 'del1',
						 handler:function(){
							tenderAction.del('tenderPlanGrid');
						}},'-',
					{text:'查询',
						 iconCls : 'search1',
						 handler:function(){
							tenderAction.searchView();
					}}
			   ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'tenderPlanGrid',
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
tender.centerPanel = new Ext.Panel({
			id : 'tenderCenterPanel', 
			layout : 'fit',
			items : [tender.gridPanel()]
		});
tender.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '招标管理',
				id : 'tenderTab', 
				layout : 'fit',
				items : [tender.centerPanel],
				listeners : {
					'activate' : function() {
						Ext.getCmp("tenderPlanGrid").store.baseParams={start:0,limit:20,pageType:'1'};
						Ext.getCmp("tenderPlanGrid").store.load();

					}
				}
 
			});

	return tab;
}; 