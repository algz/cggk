/**
 * 采购计划详细信息
 * @type 
 */
var stockPlanParticularGrid = {
	limit:null,
	start:null
}

Ext.QuickTips.init();

stockPlanParticularGrid.init = function(){
	stockPlanParticularGrid.limit=15;
	stockPlanParticularGrid.start=0;
	
	stockPlanParticularGrid.messageGrid=stockPlanParticularGrid.grid(stockPlanParticularMain.start,stockPlanParticularMain.limit);
	
	var code = window.opener.window.procurementplan_code;
	var name = window.opener.window.procurementplan_name;
	var theStatus = window.opener.window.theStatus;
	var amount = window.opener.window.amount;
	var id = window.opener.window.procurementplan_id;
	
	//默认加载数据
	var store = Ext.getCmp('stockPlanParticularGrid').store;
	store.baseParams.procurementplan_id = id;
	store.load({
		params:{
			start:stockPlanParticularMain.start,
			limit:stockPlanParticularMain.limit
		}
	})
	
	var panel = new Ext.Panel({
		layout:'fit',
		title:'采购计划详细',
		tbar:['采购计划编号：',code,'<font style="margin-left:100px;">采购计划名称：</font>',name,
			'<font style="margin-left:100px;">状态：</font>',flagStatus(theStatus),'<font style="margin-left:100px;">金额：</font>',amount,'元'],
		items:[
			stockPlanParticularGrid.messageGrid
		]
	})
	
	return panel;
}

function flagStatus(str){
	if(str == 1)
		return '编制中';
	else if(str == 2)
		return '已送审';
	else if(str == 3)
		return '已审批';
	else if(str == 4)
		return '已审批';
}

stockPlanParticularGrid.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/StockInspectRemote.GetStockPlanParticular?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'declareplan_code'},  
		 {name : 'declareplan_name'},  
	     {name : 'quantity'},                                   
	     {name : 'amount'},
    	 {name : 'status'},
    	 {name : 'editer'},
    	 {name : 'editdate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
	     {name : 'senddate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
	      {name : 'userName'}
     ]);		
	
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskId'
			},record);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				remoteSort : true
			});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
//		sm,
		{
			header : '申报计划编号',
			dataIndex : 'declareplan_code',
			renderer:function(value,cell){
				cell.attr =  'ext:qtitle="申报计划编号 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
			width : 100
		},{
	    	header : '申报计划名称',
	    	dataIndex : 'declareplan_name',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="申报计划名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 150
		},{
			header : '总采购数量',
			dataIndex : 'quantity',
			width : 100
		},{
			header : '金额（元）',
			dataIndex : 'amount',
			width : 100
		}
//		,{
//			header : '状态',
//			dataIndex : 'status',
//			width : 100
//		}
		,{
			header : '制表人',
			dataIndex : 'userName',
			width : 100
		},{
			header : '登记时间',
			dataIndex : 'editdate',
			width : 120,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日')
		}
//		,{
//			header : '登记人',
//			dataIndex : 'senddate',
//			width : 120,
//			type:'date',
//			renderer:Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')
//		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'stockPlanParticularGrid',
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
//		region:'center',
		layout:'fit',
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板(分页效果)
			pageSize : limit,
			store : ds,
			displayInfo : true,
			beforePageText : '当前第',
			firstText : '首页',
			prevText : '上一页',
			nextText : '下一页',
			lastText : '末页',
			refreshText : '刷新',
			afterPageText : '页，共{0}页',
			displayMsg : '当前行数{0} - {1} 共 {2} 行',
			emptyMsg : "未查询到数据"
		})
	});
	
//	ds.load({
//		params:{
//			start:start,
//			limit:limit
//		}
//	});
	return grid;
}