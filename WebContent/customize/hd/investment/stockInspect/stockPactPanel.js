var stockPactPanel = {
	condition:null
}

Ext.QuickTips.init();

stockPactPanel.init = function(){
	stockPactPanel.condition = stockPactPanel.selectCondition();
	stockPactPanel.messageGrid=stockPactPanel.grid(stockInspectMain.start,stockInspectMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
		title:'采购执行(非固定资产)',
		height :220,
		items:[
			stockPactPanel.condition,
			stockPactPanel.messageGrid
		],
		listeners:{'beforeshow':function(){
				stockInspectDownTab.tab.removeAll();
				stockInspectDownTab.tab.add(stockPactChildTab.tab());
				stockInspectDownTab.tab.doLayout();
			}
		}
	})
	
	return panel;
}

/**
 * 采购合同的查询条件
 * @return {}
 */
stockPactPanel.selectCondition = function(){
	stockPactPanel.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		region:'north',
		title:'采购合同查询条件',
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
						id:'stockPactNum',
						name:'stockPactNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'合同名称',
						id:'stockPactNmae',
						name:'stockPactNmae',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'供应商',
						id:'stockPactSupplier',
						name:'stockPactSupplier',
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
							stockPactPanelSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							Ext.getCmp('stockPactNum').setValue('');
							Ext.getCmp('stockPactNmae').setValue('');
							Ext.getCmp('stockPactSupplier').setValue('');
						}
					}]
	})
	return stockPactPanel.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function stockPactPanelSelect(){
	Ext.getCmp('stockPactPanelGrid').store.baseParams.contract_code=Ext.getCmp('stockPactNum').getValue();
	Ext.getCmp('stockPactPanelGrid').store.baseParams.contract_name=Ext.getCmp('stockPactNmae').getValue();
	Ext.getCmp('stockPactPanelGrid').store.baseParams.department_b=Ext.getCmp('stockPactSupplier').getValue();
	Ext.getCmp('stockPactPanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
//	Ext.getCmp('stockPactPanelGrid').collapsed=true;	
}

function stockPactToStockExecute(id,num,name){
//	alert('测试执行||'+id+'||编号：'+num+'||名称：'+name);
	//获取采购执行面板
//	var panel = StockExecutePanel.init(id,num,name);
	var panel=StockExecutePanel.grid(stockInspectMain.start,stockInspectMain.limit,num,name);
	//展开采购执行TAB页面
	Ext.getCmp('stockPactChildTab').setActiveTab(0);
	
	stockPactChildTab.StockExecutePanel.removeAll();
	stockPactChildTab.StockExecutePanel.add(panel);
	stockPactChildTab.StockExecutePanel.doLayout();
	
	Ext.getCmp('StockExecutePanelGrid').store.baseParams.contract_id=id;
	//默认做一次全加载
	Ext.getCmp('StockExecutePanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
}

stockPactPanel.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/StockContractRemote.GetStockContract?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'contract_id'},  
	     {name : 'contract_code'},                                   
	     {name : 'contract_name'},
    	 {name : 'contract_amount'},
    	 {name : 'department_a'},
    	 {name : 'department_b'},
	     {name : 'status'},
    	 {name : 'remark'},
    	 {name : 'contractType'}
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
			dataIndex : 'contract_code',
			width : 100
		},{
	    	header : '名称',
	    	dataIndex : 'contract_name',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 130
		},{
			header : '金额（元）',
			dataIndex : 'contract_amount',
			width : 60
		},
//		{
//			header : '甲方',
//			dataIndex : 'department_a',
//			width : 100
//		},
		{
			header : '乙方',
			dataIndex : 'department_a',
			width : 160
		},{
			header : '审批状态',
			dataIndex : 'status',
			width : 80,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
						var name = "";
				if(value == 1 || value == 2)
					name =  '编制中';
				else if(value == 3)
					name =  '审批中';	
				else if(value == 4)
					name =  '已审批';	
				else if(value == 5)
					name = '已生成台账';	
				return "<a href=javascript:void(0) onclick= flowAction.showContractPanel('"+record.get('contract_id')+"','"+record.get('contractType')+"')>"+name+"</a>";
			}
		
		},{
			header : '备注',
			dataIndex : 'remark',
			width : 80,
			renderer:function(value,cell){
				cell.attr =  'ext:qtitle="备注信息 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			}
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'stockPactPanelGrid',
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
		listeners:{
			rowclick:function(grid,rowIndex,e){
				var record=grid.store.getAt(rowIndex);
				Ext.getCmp('StockExecute_codelbl').setValue(record.get('contract_code'));
				Ext.getCmp('StockExecute_namelbl').setValue(record.get('contract_name'));
				var stockExecuteStore=Ext.getCmp('StockExecutePanelGrid').store;
				var qualityInspectStore=Ext.getCmp('qualityInspectPanelGrid').store;
				stockExecuteStore.load({
					params:{
						contract_id:record.get('contract_id'),
						start:stockInspectMain.start,
						limit:stockInspectMain.limit
					}
				});
				qualityInspectStore.load({
					params:{
						start:stockInspectMain.start,
						limit:stockInspectMain.limit
					}
				});
			}
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
	ds.load({
		params:{
			start:start,
			limit:limit
		}
	});
	return grid;
}