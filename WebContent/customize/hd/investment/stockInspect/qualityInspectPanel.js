/**
 * 质量监控
 * @type 
 */
 var qualityInspectPanel = {}

 
Ext.QuickTips.init();

qualityInspectPanel.init = function(){
	qualityInspectPanel.condition = qualityInspectPanel.selectCondition();
	qualityInspectPanel.messageGrid=qualityInspectPanel.grid(stockInspectMain.start,stockInspectMain.limit);
	
	var panel = new Ext.Panel({
		layout:'border',
		title:'质量监控',
		items:[
			qualityInspectPanel.condition,
			qualityInspectPanel.messageGrid
		]
	})
	
	return panel;
}

/**
 * 采购合同的查询条件
 * @return {}
 */
qualityInspectPanel.selectCondition = function(){
	qualityInspectPanel.conditionForm = new Ext.FormPanel({
		labelAlign:'left',
		//默认为收缩状态
		collapsed:true,
		//设置为面板允许收缩
		collapsible:true,
		region:'north',
		title:'质量监控查询条件',
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
						id:'qualityInspectWuLiaoNum',
						name:'qualityInspectWuLiaoNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'合同编号',
						id:'qualityInspectContractNum',
						name:'qualityInspectContractNum',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'登记号',
						id:'qualityInspectLogin',
						name:'qualityInspectLogin',
						anchor : '95%'
					}]
				}
				]
			},{
				columnWidth:.95,
				layout:'column',
				items:[
				{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'物料名称',
						id:'qualityInspectWuLiaoName',
						name:'qualityInspectWuLiaoName',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'合同名称',
						id:'qualityInspectContractName',
						name:'qualityInspectContractName',
						anchor : '95%'
					}]
				},{
					columnWidth:.33,
					layout:'form',
					items:[{
						xtype:'textfield',
						fieldLabel:'批次号',
						id:'qualityInspectPiCi',
						name:'qualityInspectPiCi',
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
							qualityInspectPanelSelect();
						}

					}, {
						text:'重置',
						handler : function() {
							Ext.getCmp('qualityInspectWuLiaoNum').setValue('');
							Ext.getCmp('qualityInspectContractNum').setValue('');
							Ext.getCmp('qualityInspectLogin').setValue('');
							Ext.getCmp('qualityInspectWuLiaoName').setValue('');
							Ext.getCmp('qualityInspectContractName').setValue('');
							Ext.getCmp('qualityInspectPiCi').setValue('');
						}
					}]
	})
	return qualityInspectPanel.conditionForm;
}

/**
 * 查询按钮获取值，根据不同条件值传递到后台获取查询数据
 */
function qualityInspectPanelSelect(){
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.materialitemcode=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectWuLiaoNum;
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.materialitemname=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectWuLiaoName;
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.contract_code=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectContractNum;
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.contract_name=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectContractName;
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.registration_code=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectLogin;
	Ext.getCmp('qualityInspectPanelGrid').store.baseParams.lot_no=qualityInspectPanel.conditionForm.getForm().getValues().qualityInspectPiCi;
	Ext.getCmp('qualityInspectPanelGrid').store.load({
		params:{
			start:stockInspectMain.start,
			limit:stockInspectMain.limit
		}
	})
//	Ext.getCmp('qualityInspectPanelGrid').collapsed=true;	
}

qualityInspectPanel.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/QualityInspectRemote.GetQualityInspect?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
//		 {name : 'id'},  
		 {name : 'contract_id'},  
	     {name : 'contract_code'},                                   
	     {name : 'contract_name'},
    	 {name : 'item_id'},
    	 {name : 'materialitemname'},
    	 {name : 'materialitemcode'},
	     {name : 'lot_no'},
	     {name : 'arrival_num'},
	     {name : 'creater_id'},
    	 {name : 'create_date',type:'date',dateFormat:'Y-m-d H:i:s.u'},
    	 {name : 'object_comment'},
    	 {name : 'registration_code'},
    	 {name : 'check_status'}
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
			header : '对象编号',
			dataIndex : 'materialitemcode',
			width : 100
		},{
	    	header : '对象名称',
	    	dataIndex : 'materialitemname',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="对象名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 150
		},{
			header : '合同编号',
			dataIndex : 'contract_code',
			width : 100
		},{
			header : '合同名称',
			dataIndex : 'contract_name',
			width : 150,
			renderer:function(value,cell){
				cell.attr =  'ext:qtitle="合同名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			}
		},{
			header : '登记号',
			dataIndex : 'registration_code',
			width : 100
		},{
			header : '登记数量',
			dataIndex : 'arrival_num',
			width : 100
		},{
			header : '登记时间',
			dataIndex : 'create_date',
			width : 120,
			type:'date',
			renderer:Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')
		},{
			header : '登记人',
			dataIndex : 'creater_id',
			width : 100
		},{
			header : '入厂批次',
			dataIndex : 'lot_no',
			width : 100
		},{
			header : '质量问题',
			dataIndex : 'check_status',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					if(value=='0'){return '登记';}
					else if(value=='1'){return '理化';}
					else if(value=='2'){return '检测报告合格';}
					else if(value=='3'){return '检测报告不合格';}
					else if(value=='4'){return '意见书重检';}
					else if(value=='5'){return '意见书退货';}
					else if(value=='6'){return '已退货';}
					else if(value=='7'){return '已入库';}
					else if(value=='8'){return '意见书-降级使用';}
					else if(value=='9'){return '';}
					else if(value=='10'){return '确认登记:已确认';}
					else if(value=='-10'){return '确认登记:退回';}
					else if(value=='11'){return '开箱检查:合格';}
					else if(value=='-11'){return '开箱检查:不合格';}
					else if(value=='12'){return '请检:完成';}
					else if(value=='-12'){return '请检:未完成';}
					else if(value=='13'){return '表面初检:合格';}
					else if(value=='-13'){return '表面初检:不合格';}
					else if(value=='14'){return '委托试验:完成';}
					else if(value=='-14'){return '委托试验:未完成';}
					else if(value=='+14'){return '委托试验:无需';}
					else if(value=='15'){return '取样:完成';}
					else if(value=='-15'){return '取样:未完成';}
					else if(value=='+15'){return '取样:无需';}
					else if(value=='16'){return '送样:完成';}
					else if(value=='-16'){return '送样:未完成';}
					else if(value=='+16'){return '送样:无需';}
					else if(value=='17'){return '试验报告:完成';}
					else if(value=='-17'){return '试验报告:未完成';}
					else if(value=='+17'){return '试验报告:无需';}
					else if(value=='18'){return '打钢印:完成';}
					else if(value=='-18'){return '打钢印:未完成';}
					else if(value=='+18'){return '打钢印:无需';}
					else if(value=='19'){return '分光/磨火花:完成';}
					else if(value=='-19'){return '分光/磨火花:未完成';}
					else if(value=='+19'){return '分光/磨火花:无需';}
					else if(value=='20'){return '表面检查:完成';}
					else if(value=='-20'){return '表面检查:未完成';}
					else if(value=='+20'){return '表面检查:无需';}
					else if(value=='21'){return '喷字:完成';}
					else if(value=='-21'){return '喷字:未完成';}
					else if(value=='+21'){return '喷字:无需';}
					else if(value=='22'){return '油封:完成';}
					else if(value=='-22'){return '油封:未完成';}
					else if(value=='+22'){return '油封:无需';}
					else if(value=='24'){return '不合格处理:退货';}
					else if(value=='-24'){return '不合格处理:返修';}
					else{
						return value;//'已登记';
					}
						    
					 
				}
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'qualityInspectPanelGrid',
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
	return grid;
}