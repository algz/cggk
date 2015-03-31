/**
 * 效能分析页面
 * @type 
 */
var efficiencyAnalysisPanel = {}

Ext.QuickTips.init();

efficiencyAnalysisPanel.init = function(){
	efficiencyAnalysisPanel.condition = efficiencyAnalysisPanel.selectCondition();
	efficiencyAnalysisPanel.messageGrid=efficiencyAnalysisPanel.grid(stockInspectMain.start,stockInspectMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
		title:'效能分析',
		items:[
			efficiencyAnalysisPanel.condition,
			efficiencyAnalysisPanel.messageGrid
		]
	})
	
	return panel;
}

/**
 * 采购合同的查询条件
 * @return {}
 */
efficiencyAnalysisPanel.selectCondition = function(){
	efficiencyAnalysisPanel.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		region:'north',
		title:'效能分析查询条件',
		height:100,
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
						fieldLabel:'合同编号',
						id:'efficiencyAnalysisNum',
						name:'efficiencyAnalysisNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'合同名称',
						id:'efficiencyAnalysisNmae',
						name:'efficiencyAnalysisNmae',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'供应商',
						id:'efficiencyAnalysisSupplier',
						name:'efficiencyAnalysisSupplier',
						anchor : '95%'
					}]
				}
				]
			}
			]
		}],
		buttons : [{
						text : '查询',
						handler : function() {
							efficiencyAnalysisPanelSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							Ext.getCmp('efficiencyAnalysisNum').setValue('');
							Ext.getCmp('efficiencyAnalysisNmae').setValue('');
							Ext.getCmp('efficiencyAnalysisSupplier').setValue('');
						}
					}]
	})
	return efficiencyAnalysisPanel.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function efficiencyAnalysisPanelSelect(){
	Ext.getCmp('efficiencyAnalysisPanelGrid').store.baseParams.contract_code=efficiencyAnalysisPanel.conditionForm.getForm().getValues().efficiencyAnalysisNum;
	Ext.getCmp('efficiencyAnalysisPanelGrid').store.baseParams.contract_name=efficiencyAnalysisPanel.conditionForm.getForm().getValues().efficiencyAnalysisNmae;
	Ext.getCmp('efficiencyAnalysisPanelGrid').store.baseParams.department_b=efficiencyAnalysisPanel.conditionForm.getForm().getValues().efficiencyAnalysisSupplier;
	Ext.getCmp('efficiencyAnalysisPanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
//	Ext.getCmp('efficiencyAnalysisPanelGrid').collapsed=true;	
}

efficiencyAnalysisPanel.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/EfficiencyAnalysisRemote.GetEfficiencyAnalysis?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'contract_id'},  
	     {name : 'contract_code'},                                   
	     {name : 'contract_name'},
    	 {name : 'department_b'},
    	 {name : 'contract_amount'},
    	 {name : 'commit_date'},
	     {name : 'unqualified_rate'},
    	 {name : 'score'}
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
			header : '合同编号',
			dataIndex : 'contract_code',
			width : 100
		},{
	    	header : '合同名称',
	    	dataIndex : 'contract_name',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 200
		},{
			header : '供应商',
			dataIndex : 'department_b',
			width : 100
		},{
			header : '金额',
			dataIndex : 'contract_amount',
			width : 100
		},{
			header : '交货期',
			dataIndex : 'commit_date',
			width : 120
		},{
			header : '不合格率',
			dataIndex : 'unqualified_rate',
			width : 100
		},{
			header : '能效得分',
			dataIndex : 'score',
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				 return "<a href='#' onclick='gradeMessageGrid.init(\""+record.get('contract_id')+"\",\""
				 +record.get('contract_code')+"\",\""+record.get('contract_name')+"\")'><font color='red'>详细</font></a>"; 		
			},
			width : 80
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'efficiencyAnalysisPanelGrid',
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
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