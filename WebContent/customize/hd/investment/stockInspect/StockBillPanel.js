/**
 * 采购清单面板
 * @type 
 */
var StockBillPanel = {
	condition:null
}


Ext.QuickTips.init();

StockBillPanel.init = function(){
	StockBillPanel.condition = StockBillPanel.selectCondition();
	StockBillPanel.messageGrid=StockBillPanel.grid(stockInspectMain.start,stockInspectMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
		title:'计划采购清单',
		items:[
			StockBillPanel.condition,
			StockBillPanel.messageGrid
		]
	})
	
	return panel;
}

StockBillPanel.stockType = function(){
	var data = [
		['1','计划内'],
		['2','非应急'],
		['3','应急']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	StockBillPanel.stockTypeValue = new Ext.form.ComboBox({
//		id:'StockBillComboBox',
		fieldLabel:'采购类型',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		emptyText : '请选择...',
		width:200
	})
	
	return StockBillPanel.stockTypeValue;
}

//开始时间
StockBillPanel.strtTimePanel = function(){
	StockBillPanel.strtTime = new Ext.form.DateField({
	//	layout:'form',
		fieldLabel:'使用时间从',
		format:'Y年m月d日',
		anchor : '95%'
	})
	return StockBillPanel.strtTime;
}

//结束时间
StockBillPanel.endTimePanel = function(){
	StockBillPanel.endTime = new Ext.form.DateField({
	//	layout:'form',
		fieldLabel:'至',
		format:'Y年m月d日',
		anchor : '95%'
	})
	return StockBillPanel.endTime;
}

/**
 * 采购计划的查询条件
 * @return {}
 */
StockBillPanel.selectCondition = function(){
	StockBillPanel.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		title:'计划采购清单查询条件',
		region:'north',
		height:120,
		frame:true,
		items:[
		{
			layout:'column',
			items:[
			{
				columnWidth:.95,
				layout:'column',
				items:[
				{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'物料图号',
						id:'StockBillPanelWuLiaoNum',
						name:'StockBillPanelWuLiaoNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'物料名称',
						id:'StockBillPanelWuLiaoName',
						name:'StockBillPanelWuLiaoName',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[StockBillPanel.stockType()]
				}
				]
			},{
				columnWidth:.95,
				layout:'column',
				items:[
				{
					columnWidth:.33,
					layout:'form',
					items:[StockBillPanel.strtTimePanel()]
				},{
					columnWidth:.33,
					layout:'form',
					items:[StockBillPanel.endTimePanel()]
				}
				]
			}
			]
		}],
		buttons : [{
						text : '查询',
						handler : function() {
							StockBillPanelSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							Ext.getCmp('StockBillPanelWuLiaoNum').setValue('');
							Ext.getCmp('StockBillPanelWuLiaoName').setValue('');
							StockBillPanel.stockTypeValue.setValue('');
							StockBillPanel.strtTime.setValue('');
							StockBillPanel.endTime.setValue('');
						}
					}]
	})
	return StockBillPanel.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function StockBillPanelSelect(){
	Ext.getCmp('StockBillPanelGrid').store.baseParams.materialitemcode=StockBillPanel.conditionForm.getForm().getValues().StockBillPanelWuLiaoNum;
	Ext.getCmp('StockBillPanelGrid').store.baseParams.materialitemname=StockBillPanel.conditionForm.getForm().getValues().materialitemname;
	Ext.getCmp('StockBillPanelGrid').store.baseParams.declare_type=StockBillPanel.stockTypeValue.getValue();
	Ext.getCmp('StockBillPanelGrid').store.baseParams.dateStart=StockBillPanel.strtTime.getValue();
	Ext.getCmp('StockBillPanelGrid').store.baseParams.dateEnd=StockBillPanel.endTime.getValue();
	Ext.getCmp('StockBillPanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
//	Ext.getCmp('StockBillPanelGrid').collapsed=true;	
}

StockBillPanel.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/StockBillRemote.GetStockBill?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
	     {name : 'materialitemcode'},                                   
	     {name : 'materialitemname'},
    	 {name : 'materialstandard'},
    	 {name : 'materialcatalog_name'},
    	 {name : 'declare_type'},
	     {name : 'quantity'},
	     {name : 'amount'},
	     {name : 'usedate',type:'date',dateFormat:'Y-m-d H:i:s.u'}
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
			header : '物资类别',
			dataIndex : 'materialcatalog_name',
			width : 100
		},{
			header : '采购类型',
			dataIndex : 'declare_type',
			width : 60,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				if(value == 1)
					return '计划内';
				else if(value == 2)
					return '应急';
				else if(value == 3)
					return '非应急';
			}
		},{
			header : '数量',
			dataIndex : 'quantity',
			width : 130
		},{
			header : '金额（元）',
			dataIndex : 'amount',
			width : 80
		},{
			header : '使用时间',
			dataIndex : 'usedate',
			width : 120,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日')
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'StockBillPanelGrid',
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
//		width : '100%',
//		height : 285,
		region:'center',
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

