/**
 * 合同效能评分
 * @type 
 */
var pactEfficiencyGradeGrid = {}

Ext.QuickTips.init();

pactEfficiencyGradeGrid.init = function(){
	pactEfficiencyGradeGrid.condition = pactEfficiencyGradeGrid.selectCondition();
	pactEfficiencyGradeGrid.messageGrid=pactEfficiencyGradeGrid.grid(pactEfficiencyGradeMain.start,pactEfficiencyGradeMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
//		title:'合同效能评分',
		items:[
			pactEfficiencyGradeGrid.condition,
			pactEfficiencyGradeGrid.messageGrid
		]
	})
	
	return panel;
}

/**
 * 采购合同的查询条件
 * @return {}
 */
pactEfficiencyGradeGrid.selectCondition = function(){
	pactEfficiencyGradeGrid.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		region:'north',
		title:'合同效能评分查询',
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
						id:'pactEfficiencyGradeNum',
						name:'pactEfficiencyGradeNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'合同名称',
						id:'pactEfficiencyGradeNmae',
						name:'pactEfficiencyGradeNmae',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'供应商',
						id:'pactEfficiencyGradeSupplier',
						name:'pactEfficiencyGradeSupplier',
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
							pactEfficiencyGradeGridSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							Ext.getCmp('pactEfficiencyGradeNum').setValue('');
							Ext.getCmp('pactEfficiencyGradeNmae').setValue('');
							Ext.getCmp('pactEfficiencyGradeSupplier').setValue('');
						}
					}]
	})
	return pactEfficiencyGradeGrid.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function pactEfficiencyGradeGridSelect(){
	Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_code=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNum;
	Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_name=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNmae;
	Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.department_b=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeSupplier;
	Ext.getCmp('pactEfficiencyGradeGridGrid').store.load({
		params:{
			start:pactEfficiencyGradeMain.start,
			limit:pactEfficiencyGradeMain.limit
		}
	})
//	Ext.getCmp('pactEfficiencyGradeGridGrid').collapsed=true;	
}
pactEfficiencyGradeGrid.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/StockContractRemote.GetContractToAnalysis?a='+ new Date();

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
    	 {name : 'typeNum'},
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
	    	width : 200
		},{
			header : '金额（万元）',
			dataIndex : 'contract_amount',
			width : 100
		},
//		{
//			header : '甲方',
//			dataIndex : 'department_a',
//			width : 100
//		},
		{
			header : '乙方',
			dataIndex : 'department_a',
			width : 60
		},{
			header : '审批状态',
			dataIndex : 'status',
			width : 80,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				var name = "";
				var contractType = record.data.contractType;
				if(contractType == 3){//非固定资产合同
					if(value == 1 || value == 2)
						name =  '已生成';
					else if(value == 3)
						name =  '审签中';	
					else if(value == 4 || value == 5)
						name =  '已审签';
				}else if(contractType == 4){//固定资产合同
					if(value == 1 )
						name =  '已生成';
					else if(value == 2)
						name =  '审签中';	
					else if(value == 3)
						name =  '已审签';
				}
				
//				return "<a href=javascript:void(0) onclick= flowAction.showContractPanel('"+record.get('contract_id')+"','"+value+"')>"+name+"</a>";
				return name;
			}
		},{
			header : '能效打分',
			dataIndex : 'typeNum',
			width : 80,
			renderer:function(value, cell, record, rowIndex, columnIndex,
					store){
				//提示信息
				cell.attr =  'ext:qtitle="操作提示 ："'; 
				cell.attr += ' ext:qtip="只有状态是“已审签”和“已登记”的合同才有“能效打分”操作！"'; 		
						
				//value中与超过4为以上的9整数是在sql语句上写死的，具体原因参看后台sql语句
				if(value == 9999){
					return '能效打分';
				}else if(value == 99999){
					cell.attr = 'style=background-color:red';
		            return "<a href='#' onclick='selectGradePersonnelPanel.init(\""+record.get('contract_id')+"\",\""+record.get('contract_code')+"\",\""+record.get('contract_name')+"\")'>选择专家</a>";  
				}
				else if(value == 999999){
					cell.attr = 'style=background-color:yellow';
					return "<a href='#' onclick='updateGradeMessagePanel.init(\""+record.get('contract_id')+"\",\""+record.get('contract_code')+"\",\""+record.get('contract_name')+"\")'>能效打分</a>"; 
				}else{
//					cell.attr = 'style=background-color:green';
		            return "<a href='#' onclick='gradeMessageGrid.init(\""+record.get('contract_id')+"\",\""+record.get('contract_code')+"\",\""+record.get('contract_name')+"\")'>"+value+"</a>"; 
				}
			}
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'pactEfficiencyGradeGridGrid',
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
	ds.load({
		params:{
			start:start,
			limit:limit
		}
	});
	return grid;
}