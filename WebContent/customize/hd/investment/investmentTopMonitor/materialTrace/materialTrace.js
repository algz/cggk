
// 1.引入命名空间
Ext.namespace("materialTrace.mainGrid");
/**
 * 
 * 
 * @class materialTrace.mainGrid
 * @extends Ext.grid.GridPanel
 */
materialTrace.mainGrid=Ext.extend(Ext.grid.GridPanel,{
	id:'materialTraceMainGrid',
	stripeRows:true,
	initComponent:function(){
		var grid=this;
		var store=new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({
				url:'../JSON/material_MaterialMonitorRemote.getMaterialTrace?d='+new Date(),
				method:'post'
			}),
			reader:new Ext.data.JsonReader({
				root:'results',
				totalProperty:'totalProperty'
			},['declare_detil_id','declare_code','d_createdate','d_creater',
			'materialitemcode','materialitemname','materialstandard','desingnation',
			'demension','delivery_status','materialclass',
			'amountsource','costnum','departmentname','quantity','usedate',
			'use','declaretype','taskno',
			'declareplan_code','declareplan_name','procurementplan_code',
			'procurementplan_name','number_applications','actualnumber',
			'purchasetype','vendname','contractcode','contractname']),
			autoLoad:true,
			baseParams:{
				start:0,
				limit:20
			}
		});
		var sm=new Ext.grid.CheckboxSelectionModel();
		Ext.applyIf(this,{
			sm:sm,
			store:store,
			columns:[sm,/*{
				header:'登记ID',
				dataIndex:'declare_detil_id',
				width:260,
				sortable:true
			},*/{
				header:'登记编号',
				dataIndex:'declare_code',
				width:100,
				sortable:true,
				renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
					return "<a href='javascript:void(0);' onclick='materialTrace.getMaterialTraceWin(\""+record.get('declare_detil_id')+"\")'><font color='blue'>"+value+"</font></a>";
				}
			},{
				header:'登记时间',
				dataIndex:'d_createdate',
				width:80,
				sortable:true
			},{
				header:'申请人(制表人)',
				dataIndex:'d_creater',
				width:100,
				sortable:true
			},{
				header:'物资编码',
				dataIndex:'materialitemcode',
				width:100,
				sortable:true
			},{
				header:'物资名称',
				dataIndex:'materialitemname',
				width:100,
				sortable:true
			},{
				header:'规格型号',
				dataIndex:'materialstandard',
				width:100,
				sortable:true
			},{
				header:'牌号',
				dataIndex:'desingnation',
				width:100,
				sortable:true
			},{
				header:'计量单位',
				dataIndex:'demension',
				width:100,
				sortable:true
			},{
				header:'交货状态',
				dataIndex:'delivery_status',
				width:100,
				sortable:true
			},{
				header:'物资类别',
				dataIndex:'materialclass',
				width:100,
				sortable:true
			},{
				header:'资金来源',
				dataIndex:'amountsource',
				width:100,
				sortable:true
			},{
				header:'费用编号',
				dataIndex:'costnum',
				width:100,
				sortable:true
			},{
				header:'需求单位',
				dataIndex:'departmentname',
				width:100,
				sortable:true
			},{
				header:'申请数量',
				dataIndex:'quantity',
				width:100,
				sortable:true
			},{
				header:'需用时间',
				dataIndex:'usedate',
				width:100,
				sortable:true
			},{
				header:'采购用途',
				dataIndex:'use',
				width:100,
				sortable:true
			},{
				header:'采购类型',
				dataIndex:'declaretype',
				width:100,
				sortable:true
			},{
				header:'任务编号',
				dataIndex:'taskno',
				width:100,
				sortable:true
			},{
				header:'申报计划编号',
				dataIndex:'declareplan_code',
				width:100,
				sortable:true
			},{
				header:'申报计划名称',
				dataIndex:'declareplan_name',
				width:100,
				sortable:true
			},{
				header:'采购计划编号',
				dataIndex:'procurementplan_code',
				width:100,
				sortable:true
			},{
				header:'采购计划名称',
				dataIndex:'procurementplan_name',
				width:100,
				sortable:true
			},{
				header:'建议采购量',
				dataIndex:'number_applications',
				width:100,
				sortable:true
			},{
				header:'实际采购量',
				dataIndex:'actualnumber',
				width:100,
				sortable:true
			},{
				header:'采购方式',
				dataIndex:'purchasetype',
				width:100,
				sortable:true
			},{
				header:'供应商名称',
				dataIndex:'vendname',
				width:100,
				sortable:true
			},{
				header:'合同编号',
				dataIndex:'contractname',
				width:100,
				sortable:true
			},{
				header:'合同名称',
				dataIndex:'contractname',
				width:100,
				sortable:true
			}],
		bbar:new Ext.PagingToolbar({
			pageSize:20,
			store:store,
			displayInfo:true,
			displayMsg:'当前行数{0} - {1} 共  {2} 行 ',
			emptyMsg:'未查询到数据'
		}),
		tabr:[{
		      	   text:'查询',
		      	   handler:function(){
		      	   	var win=new Ext.Window({
		      	   	title:'物资追踪查询',
		      	   	width:500,
		      	   	height:280,
		      	   	labelAlign:'top',
		      	   	frame:true,
		      	   	bodyStyle:'padding:5px 5px 0',
		      	   	layout:'column',
		      	   	items : [{
											columnWidth : .5,
											layout : 'form',
											border : false,
											items : [/*{
														xtype : 'textfield',
														fieldLabel : '登记ID',
														id : 'declareDetil_id',
														anchor : '95%'
													},*/{
														xtype : 'datefield',
														fieldLabel : '登记开始时间',
														id : 'd_createdate_start',
														format:'Y-m-d',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '物资编码',
														id : 'materialitemcode',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '规格型号',
														id : 'materialstandard',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '计量单位',
														id : 'demension',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '申报计划编号',
														id : 'declareplan_code',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '采购计划编号',
														id : 'procurementplan_code',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '合同编号',
														id : 'contractcode',
														anchor : '95%'
													}]
										}, {
											columnWidth : .5,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'datefield',
														fieldLabel : '登记结束时间',
														id : 'd_createdate_end',
														format:'Y-m-d',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '登记编号',
														id : 'declareDetil_code',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '物资名称',
														id : 'materialitemname',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '牌号',
														id : 'desingnation',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '物资类别',
														id : 'materialclass',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '申报计划名称',
														id : 'declareplan_name',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '采购计划名称',
														id : 'procurementplan_name',
														anchor : '95%'
													},{
														xtype : 'textfield',
														fieldLabel : '合同名称',
														id : 'contractname',
														anchor : '95%'
													}]
										}],
										buttons:[{
											text:'查询',
											handler:function(){
												grid.store.baseParams={
													start:0,
													limit:20,
											        declare_detail_id : Ext.getCmp('declareDetil_id').getValue(),
											        declareDetil_code : Ext.getCmp('declareDetil_code').getValue(),
											        materialitemcode : Ext.getCmp('materialitemcode').getValue(),
											        materialitemname : Ext.getCmp('materialitemname').getValue(),
											        materialstandard:Ext.getCmp('materialstandard').getValue(),
											        demension: Ext.getCmp('demension').getValue(),
											        declareplan_code: Ext.getCmp('declareplan_code').getValue(),
											        procurementplan_code: Ext.getCmp('procurementplan_code').getValue(),
											        contractcode: Ext.getCmp('contractcode').getValue(),
											        desingnation: Ext.getCmp('desingnation').getValue(),
											        materialclass: Ext.getCmp('materialclass').getValue(),
											        declareplan_name: Ext.getCmp('declareplan_name').getValue(),
											        procurementplan_name: Ext.getCmp('procurementplan_name').getValue(),
											        contractname: Ext.getCmp('contractname').getValue(),
											        d_createdate_start: Ext.getCmp('d_createdate_start').getRawValue(),
											        d_create_end: Ext.getCmp('d_create_end').getRawValue()
										        }
										        grid.store.load();
										        win.close();
											}
										},{
											text:'关闭',
											handler:function(){
												win.close();
											}
										}]
		      	   	
		      	   	})
		      	   	
		      	   }
		      }
		]
		})
		materialTrace.mainGrid.superclass.initComponent.call(this);
	}
})
//3.注册控件
Ext.reg('materialTraceGrid',materialTrace.mainGrid);

materTrace.getMaterialTraceWin=function(declare_detail_id){
	
	new Ext.Window({
		title:'日志清单',
		layout:'fit',
		width:300,
		height:300,
		modal:true,
		items:new materialTrace.childPanel({declare_detail_id:declare_detail_id})
	}).show()
}

//1.引入命名空间
Ext.namespace('materialTrace.childPanel');

materialTrace.childPanel=Ext.extend(Ext.Panel,{
	id:'materialTraceChildWin',
	border:false,
	bodyStyle:'padding:3px 5px;',
	declare_detail_id:'',
	initComponent:function(){
		var win=this;
		Ext.applyIf(this,{
			layout:'form',
			labelWidth:70,
			items:[{xtype:'textfield',id:"declareText",fieldLabel:'需求登记',anchor:'95%'},
			{xtype:'textfield',id:"declarePlanText",fieldLabel:'申报计划',anchor:'95%'},
			{xtype:'textfield',id:"procurementPlanText",fieldLabel:'采购计划',anchor:'95%'},
			{xtype:'textfield',id:"parityText",fieldLabel:'采购方式',anchor:'95%'},
			{xtype:'textfield',id:"procurementContractText",fieldLabel:'采购合同',anchor:'95%'},
			{xtype:'textfield',id:"registrationText",fieldLabel:'到货登记',anchor:'95%'},
			{xtype:'textfield',id:"arrivalCheckText",fieldLabel:'检验状态',anchor:'95%'}]
		})
		materialTrace.childPanel.superclass.initComponent.call(this,ct,position);
	},
	onRender:function(ct,position){
		materialTrace.childPanel.superclass.onRender.call(this,ct,position);
		var panel=this;
		Ext.Ajax.request({
			url:'../JSON/material_MaterialMonitorRemote.getMaterialTraceDetail?d='+new Date(),
			method:'post',
			disableCaching:true,
			autoAbort:true,
			params:{
				declare_detail_id:panel.declare_detail_id
			},
			success:function(response,options){
				var obj=Ext.util.JSON.decode(response.responseText);
				var arr=obj.results[0];
				Ext.getCmp('declareText').setValue(arr.declareText);
				Ext.getCmp('declarePlanText').setValue(arr.declarePlanText);
				Ext.getCmp('procurementPlanText').setValue(arr.procurementPlanText);
				Ext.getCmp('parityText').setValue(arr.parityText);
				Ext.getCmp('procurementContractText').setValue(arr.procurementContractText);
				Ext.getCmp('registrationText').setValue(arr.registrationText);
				Ext.getCmp('arrivalCheckText').setValue(arr.arrivalCheckText);
			}
		});
	}
})
Ext.reg('materialTraceChildPanel',materialTrace.childPanel());

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	new Ext.Viewport({
		layout:'fit',
		items:new materialTrace.mainGrid()
	})
},this)