
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class contractManagement.mainGrid
 * @extends Ext.grid.GridPanel
 */
 // 1、引入命名空间
Ext.namespace("stockplanDetailList.mainGrid");
stockplanDetailList.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title:'采购物资信息列表',
	id : 'stockplanInfoDetailListGrid', // 对象名+类型后缀(Grid)
	stripeRows : true, // 隔行变色，区分表格行
	listeners : {
		activate : function(grid) {
			grid.store.load();
		}
	},
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/stockPlan_Remote.getStockplanInfoDetailList?d='+new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty'
							}, [ 'materialitemname','materialitemcode','demension','materialstandard',
							'techniccondition','referenceprice','desingnation',
                                 'declare_detil_id','materialcatalog_name','use','taskno',
                                 'declare_detil_status','confirmcontract','deliveryStatus',
                                 'declare_detil_status','quantity','oldquantity','changer',
                                 'changtime','changreson','materialcounts','actualnumber', 
                                 'procurementplan_name','procurementplan_code','materialcatalogname' ]),
					baseParams : {
					start:0,
					limit:20}
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.applyIf(this, {
			sm : sm,
			store : store,
			columns : [new Ext.grid.RowNumberer({
						width : 30,
						header : "序号"
					}),{
				header : '名称',
				dataIndex : 'materialitemname',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '物资编码',
				dataIndex : 'materialitemcode',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '牌号',
				dataIndex : 'desingnation',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '规格',
				dataIndex : 'materialstandard',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '技术条件',
				dataIndex : 'techniccondition',
				align : "center",
				width : 100,
				sortable : true
			},{
		header : "交货状态",align : "center",
		dataIndex : 'deliveryStatus'
	},{
				header : '计划单价',
				dataIndex : 'referenceprice',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '技量单位',
				dataIndex : 'demension',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '物资类别',
				dataIndex : 'materialcatalog_name',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购用途',
				dataIndex : 'use',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '任务编号',
				dataIndex : 'taskno',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更状态',
				dataIndex : 'declare_detil_status',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value){
					//0未提交，1已提交，2未通过，3通过，5变更
						if(value==5){
							return "变更";
						}else{
							return "";
						}
				}
			},{
				header : '确认合同',
				dataIndex : 'confirmcontract',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value){return value==1?"确认入库":""}
			},{
				header : '需求量',
				dataIndex : 'quantity',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更前数量',
				dataIndex : 'oldquantity',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更人',
				dataIndex : 'changer',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更时间',
				dataIndex : 'changtime',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更原因',
				dataIndex : 'changreson',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '申请量',
				dataIndex : 'materialcounts',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '建议采购量',
				dataIndex : 'actualnumber',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购计划名称',
				dataIndex : 'procurementplan_name',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购计划编号',
				dataIndex : 'procurementplan_code',
				align : "center",
				width : 100,
				sortable : true
			}],
			bbar : new Ext.PagingToolbar({
						pageSize : 20,
						store : store,
						displayInfo : true,
						displayMsg : '当前行数{0} - {1} 共 {2} 行',
						emptyMsg : "未查询到数据"
					}),
			tbar : ['-',{
				text : '条件查询',
				iconCls : 'search1',
				handler : function(){
					var items = [{
						xtype : 'textfield',
						fieldLabel : '物资名称',
						lableWidth : 150,
						id : 'materialitemname',
						name : 'materialitemname',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '物资代码',
						lableWidth : 150,
						id : 'materialitemcode',
						name : 'materialitemcode',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '牌号',
						lableWidth : 150,
						id : 'desingnation',
						name : 'desingnation',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '规格',
						lableWidth : 150,
						id : 'materialstandard',
						name : 'materialstandard',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '交货状态',
						lableWidth : 150,
						id : 'deliveryStatus',
						name : 'deliveryStatus',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '物资大类',
						lableWidth : 150,
						id : 'materialcatalog_name',
						name : 'materialcatalog_name',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '任务编号',
						lableWidth : 150,
						id : 'taskno',
						name : 'taskno',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '采购用途',
						lableWidth : 150,
						id : 'use',
						name : 'use',
						anchor : '89%'
					},{
						xtype : 'textfield',
						fieldLabel : '采购计划编号',
						lableWidth : 150,
						id : 'procurementplan_code',
						name : 'procurementplan_code',
						anchor : '89%'
					}];
					var inform =new Ext.FormPanel({
						id : 'stockPlanInfoDetailForm',
						buttonAlign : 'center',
						labelAlign : 'rigth',
						autoHeight : true,
						frame : false,
						items : items,
						width : 300,
						height : 400
					});
					
					var buttons = [{
						text : '确定',
						handler : function(){
							var materialitemname = Ext.getCmp('materialitemname').getValue();
							var materialitemcode = Ext.getCmp('materialitemcode').getValue();
							var desingnation = Ext.getCmp('desingnation').getValue();
							var materialstandard = Ext.getCmp('materialstandard').getValue();
							var deliveryStatus = Ext.getCmp('deliveryStatus').getValue();
							var materialcatalog_name = Ext.getCmp('materialcatalog_name').getValue();
							var taskno = Ext.getCmp('taskno').getValue();
							var use = Ext.getCmp('use').getValue();
							var procurementplan_code = Ext.getCmp('procurementplan_code').getValue();
							grid.store.load({
								params : {
									materialitemname : materialitemname,
									materialitemcode : materialitemcode,
									desingnation : desingnation,
									materialstandard : materialstandard,
									deliveryStatus : deliveryStatus,
									materialcatalogname : materialcatalog_name,
									taskno : taskno,
									use : use,
									procurementplanCode : procurementplan_code
								}
							});
							win.close();
						}
					},{
						text : '取消',
						handler : function(){
							inform.getForm().reset();
							win.close();
						}
					}];
					
					var win = new Ext.Window({
						id : 'stockPlanInfoDetailWin',
						title : '查询页面',
						width : 300,
						layout : 'fit',
						autoScroll : true,
						modal : true,
						items : inform,
						autoDestory : true,
						buttons : buttons,
						colseAction : 'close'
					});
					win.show();
				}
			}]
		})
		stockplanDetailList.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('stockplanDetailListGrid', stockplanDetailList.mainGrid);// 第一个参数为自定义控件的xtype
