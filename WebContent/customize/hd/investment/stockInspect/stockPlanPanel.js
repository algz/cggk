/**
 * 采购计划页面
 * @type 
 */
var stockPlan = {
	condition:null
}

Ext.QuickTips.init();

stockPlan.init = function(){
	stockPlan.condition = stockPlan.selectCondition();
	stockPlan.messageGrid=stockPlan.grid(stockInspectMain.start,stockInspectMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
		title:'采购计划(非固定资产)',
		height :220,
		items:[
			stockPlan.condition,
			stockPlan.messageGrid
		],
		listeners:{'beforeshow':function(){
				stockInspectDownTab.tab.removeAll();
				stockInspectDownTab.tab.add(stockPlanChildTab.tab());
				stockInspectDownTab.tab.doLayout();
			}
		}
	})
	
	//默认做一次全加载
	Ext.getCmp('stockPlanGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
	
	return panel;
}

stockPlan.openNewPage = function(pageUrl,urlName){
	window.open('../base/center.jsp?'+pageUrl,urlName,
	'top=0,left=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,alwaysRaised=yes,location=yes,status=yes,height='+(screen.availHeight-165)+',width='+(screen.availWidth-10));
}

function toTtockPlanParticularMainPage(num,name,status,amount,id){
	window.procurementplan_code = num;
	window.procurementplan_name = name;
	window.theStatus = status;
	window.amount = amount;
	window.procurementplan_id = id;
	stockPlan.openNewPage('stockPlanParticularMessage','采购计划详细');
}

/**
 * 计划类型下拉
 * @return {}
 */
stockPlan.planType = function(){
	var data = [
		['','全部'],
		['1','固定资产'],
		['2','非固定资产']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	stockPlan.planTypeValue = new Ext.form.ComboBox({
		id:'planTypeComboBox',
		name:'planTypeComboBox',
		fieldLabel:'计划类型',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		emptyText : '请选择...',
		width:200
	})
	
//	planType.setValue('1');
	
	//确定默认加载项
//	planType.on('blur', function() {
//					stockPlan.planTypeValue = planType.getValue();
//				});
	
	return stockPlan.planTypeValue;
}

stockPlan.stockType = function(){
	var data = [
		['1','计划内'],
		['2','非应急'],
		['2','应急']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	stockPlan.stockTypeValue = new Ext.form.ComboBox({
		id:'stockTypeComboBox',
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
	
//	planType.setValue('1');
	
	return stockPlan.stockTypeValue;
}

stockPlan.stockPlanStatus = function(){
	var data = [
		['1','编制中'],
		['2','待审批'],
		['3','审批中'],
		['4','已审批']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	stockPlan.stockPlanStatusValue = new Ext.form.ComboBox({
		id:'stockPlanStatusComboBox',
		fieldLabel:'状态',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		emptyText : '请选择...',
		width:200
	})
	
	return stockPlan.stockPlanStatusValue;
}

/**
 * 金额选择
 * @return {}
 */
stockPlan.stockPlanMoney = function(){
	var data = [
		['1','大于'],
		['2','等于'],
		['3','小于']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	stockPlan.selectMoneyValue = new Ext.form.ComboBox({
		id:'stockPlanMoneyComboBox',
		fieldLabel:'金额',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		emptyText : '请选择...',
		width:80
	})
	
//	planType.setValue('1');
	
	return stockPlan.selectMoneyValue;
}

//开始时间
stockPlan.approveDatePanel = function(){
	stockPlan.approveDate = new Ext.form.DateField({
	//	layout:'form',
		fieldLabel:'编辑时间',
		format:'Y年m月d日',
		emptyText : '请选择...',
		width:200
	})
	return stockPlan.approveDate;
}

/**
 * 采购计划的查询条件
 * @return {}
 */
stockPlan.selectCondition = function(){
	stockPlan.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		title:'采购计划查询条件',
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
					items:[stockPlan.planType()]
				},{
					columnWidth:.33,
					layout:'form',
					items:[
						//采购类型
//						stockPlan.stockType()
						stockPlan.approveDatePanel()
					]
				},{
					columnWidth:.33,
					layout:'form',
					items:[stockPlan.stockPlanStatus()]
				}
				]
			},{
				columnWidth:.95,
				layout:'column',
				items:[
				{
					columnWidth:.33,
					layout:'form',
					items:[stockPlan.stockPlanMoney()]
				},{
					columnWidth:.33,
					layout:'form',
					items:[
					{
						xtype:'textfield',
						id:'insertMoney',
						name:'insertMoney',
						value:0,
						style:'margin-left:-30px;'
//						anchor : '95%'
//						width:50
					}
					]
				}
//				,{
//					columnWidth:.33,
//					layout:'form',
//					items:[{
//						xtype:'datefield',
//						fieldLabel:'批准时间',
//						format : 'Y-m-d',
//						id : 'stockPlanApprove',
//						name:'stockPlanApprove',
////						anchor : '95%'
//						width:200
//					}]
//				}
				]
			}
			]
		}],
		buttons : [{
						text : '查询',
						handler : function() {
							stockPlanSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							stockPlan.planTypeValue.setValue('');
							stockPlan.stockPlanStatusValue.setValue('');
							stockPlan.selectMoneyValue.setValue('');
							stockPlan.approveDate.setValue('');
							stockPlan.conditionForm.getForm().setValues().insertMoney='';
						}
					}]
	})
	return stockPlan.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function stockPlanSelect(){
	Ext.getCmp('stockPlanGrid').store.baseParams.plantype=stockPlan.planTypeValue.getValue();
	Ext.getCmp('stockPlanGrid').store.baseParams.status=stockPlan.stockPlanStatusValue.getValue();
	Ext.getCmp('stockPlanGrid').store.baseParams.judgment=stockPlan.selectMoneyValue.getValue();
	Ext.getCmp('stockPlanGrid').store.baseParams.amount=stockPlan.conditionForm.getForm().getValues().insertMoney;
	Ext.getCmp('stockPlanGrid').store.baseParams.editdate=stockPlan.approveDate.getValue();
	Ext.getCmp('stockPlanGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
//	Ext.getCmp('stockPlanGrid').collapsed=true;	
}

stockPlan.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/StockInspectRemote.GetStockInspect?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'procurementplan_id'},
	     {name : 'procurementplan_code'},                                   
	     {name : 'procurementplan_name'},
    	 {name : 'amount'},
    	 {name : 'plantype'},
    	 {name : 'editer'},
	     {name : 'senddate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
	     {name : 'status'},
    	 {name : 'editdate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
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
			header : '编号',
			dataIndex : 'procurementplan_code',
			width : 100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				return "<a href='#' onclick='toTtockPlanParticularMainPage(\""+record.get('procurementplan_code')+"\",\""
					+record.get('procurementplan_name')+"\",\""+record.get('status')+"\",\""+record.get('amount')+"\",\""
					+record.get('procurementplan_id')+"\")'>"+"<font color='red'>"+value+"</font></a>";
			}
		},{
	    	header : '名称',
	    	dataIndex : 'procurementplan_name',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 200
		},{
			header : '金额（元）',
			dataIndex : 'amount',
			width : 100
		},{
			header : '计划类型',
			dataIndex : 'plantype',
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				if(value == 1)
					return '固定资产(专项)';
				else if(value == 2)
					return '非固定资产';
				else if(value == 3)
					return '固定资产(土建)';
				else if(value == 4)
					return '固定资产(设备)';
			},
			width : 100
		},{
			header : '编制人',
			dataIndex : 'userName',
			width : 60
		},{
			header : '送审时间',
			dataIndex : 'senddate',
			width : 130,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日')
		},{
			header : '审批状态',
			dataIndex : 'status',
			width : 80,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				var name = "";
				if(value == 0)
					name =  '未编制';
				else if(value == 1)
					name =  '编制中';
				else if(value == 2)
					name =  '已送审';	
				else if(value == 3)
					name =  '已审批';	
				else if(value == 4)
					name = '已审批';	
				return "<a href=javascript:void(0) onclick= flowAction.showPanel('"+record.get('procurementplan_id')+"','"+value+"','"+record.get('plantype')+"')>"+name+"</a>";
			}
		},{
			header : '编辑时间',
			dataIndex : 'editdate',
			width : 130,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日 ')
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'stockPlanGrid',
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
//	ds.baseParams.plantype=stockPlan.planTypeValue.getValue();
//	ds.baseParams.status=stockPlan.stockPlanStatusValue.getValue();
//	ds.baseParams.judgment=stockPlan.selectMoneyValue.getValue();
//	ds.baseParams.amount=stockPlan.conditionForm.getForm().getValues().insertMoney;
//	ds.baseParams.editdate=stockPlan.conditionForm.getForm().getValues().stockPlanApprove;
//	ds.load({
//		params:{
//			start:start,
//			limit:limit
//		}
//	});
	return grid;
}