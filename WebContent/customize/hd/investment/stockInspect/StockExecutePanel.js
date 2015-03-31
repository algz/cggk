/**
 * 采购执行面板
 * @type 
 */
var StockExecutePanel = {
}

Ext.QuickTips.init();

StockExecutePanel.init = function(id,num,name){
	StockExecutePanel.messageGrid=StockExecutePanel.grid(stockInspectMain.start,stockInspectMain.limit,num,name);
	
	var panel = new Ext.Panel({
		layout:'fit',
		items:[
			StockExecutePanel.messageGrid
		]
	})
	
	Ext.getCmp('StockExecutePanelGrid').store.baseParams.contract_id=id;
	//默认做一次全加载
	Ext.getCmp('StockExecutePanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
	
	return panel;
}

StockExecutePanel.grid = function(start,limit,num,name){
	var strurl = "";
	strurl = '../JSON/StockExecuteRemote.GetStockExecute?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'id'},  
	     {name : 'materialitemcode'},                                   
	     {name : 'materialitemname'},
    	 {name : 'materialstandard'},
    	 {name : 'arrival_num'},
    	 {name : 'registration_code'},
	     {name : 'transport_num'},
    	 {name : 'transport_date',type:'date',dateFormat:'Y-m-d H:i:s.u'},
    	 {name : 'create_date',type:'date',dateFormat:'Y-m-d H:i:s.u'},
    	 {name : 'truename'},
    	 {name : 'purchase_num'}
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
			header : '对象号',
			dataIndex : 'materialitemcode',
			width : 100
		},{
	    	header : '对象名称',
	    	dataIndex : 'materialitemname',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 200
		},{
			header : '规格型号',
			dataIndex : 'materialstandard',
			width : 100
		},{
			header : '到货数量',
			dataIndex : 'arrival_num',
			width : 80
		},{
			header : '登记号',
			dataIndex : 'registration_code',
			renderer:function(value,cell){
				cell.attr =  'ext:qtitle="登记号 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
			width : 100
		}
//		,{
//			header : '登记数量',
//			dataIndex : 'transport_num',
//			width : 80
//		}
		,{
			header : '登记时间',
			dataIndex : 'create_date',
			width : 120,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')
		},{
			header : '登记人',
			dataIndex : 'truename',
			width : 80
		}
//		,{
//			header : '合格数量',
//			dataIndex : 'purchase_num',
//			width : 80
//		}
//		,{
//			header : '质量报告',
//			dataIndex : 'purchase_num',
//			renderer:function(){
//	            return '<a href="../testField/test.docx" style="text-decoration:underline;"><font color="red"/>详细</a>'; 
//			},
//			width : 60
//		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'StockExecutePanelGrid',
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
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
		tbar:['合同编号',{xtype:'textfield',id:'StockExecute_codelbl'},
		      '合同名称',{xtype:'textfield',id:'StockExecute_namelbl'}],
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