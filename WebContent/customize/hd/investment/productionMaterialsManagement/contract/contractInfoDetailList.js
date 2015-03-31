
// 1、引入命名空间
Ext.namespace("contractDetailList.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class contractDetailList.mainGrid
 * @extends Ext.grid.GridPanel
 */
contractDetailList.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '合同物资详情列表', // 扩展时初始化
	id : 'contractInfoDetailList', // 对象名+类型后缀(Grid)
	stripeRows : true, // 隔行变色，区分表格行
//	listeners : {
//		activate : function(grid) {grid.store.load()}
//	},
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/procurementDetail_ProcurementDetailRemote.getContractInfoDetailList?d=' + new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'contractid'
							}, ['auditcode','contractcode','contractname','materialitemcode','materialitemname','desingnation','materialstandard','techniccondition','referenceprice','demension','materialcatalog_name',
							'declare_detil_id','declare_detil_status','quantity','taskno','oldquantity','changer','changtime','changreson','materialcounts','actualnumber','plancode','deliveryStatus' ]),
					autoLoad:true,
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
				header : '审签编号',
				dataIndex : 'auditcode',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '合同编号',
				dataIndex : 'contractcode',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '合同名称',
				dataIndex : 'contractname',
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
				header : '物资名称',
				dataIndex : 'materialitemname',
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
				header : '计量单位',
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
				header : '需求量',
				dataIndex : 'quantity',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '变更前数据',
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
				header : '实际采购量',
				dataIndex : 'actualnumber',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购计划编号',
				dataIndex : 'plancode',
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
					}),//
			tbar : ["物资名称:", {
				                id:'materialitemname',
								xtype : 'textfield'
							}, '-', "物资编码", {
								id:'materialitemcode',
								xtype : 'textfield'
							}, '-', "任务编号", {
								id:'taskno',
								xtype : 'textfield'
							}, {
								text : '查询',
								handler:function(){
										grid.store.load({
												params  : {
													materialitemname : Ext.getCmp('materialitemname').getValue(),
													materialitemcode : Ext.getCmp('materialitemcode').getValue(),
													taskno : Ext.getCmp('taskno').getValue()
												}
											});
								}
							}, {
								text : '确认入库',
								disabled :privilegeValidate.confirmMDisable,
								handler:function(){
									var arr=new Array();
									var recs=grid.getSelectionModel().getSelections();
									if(recs.length==0){
										return Ext.Msg.alert("提示","请选择一条记录!");
									}
									for(var i=0;i<recs.length;i++){
										if(recs[i].get('declare_detil_status')=="5"){
											arr.push(recs[i].get('declare_detil_id'));
										}
									}
									if(arr.length!=0){
										Ext.Ajax.request({
				url : '../JSON/procurementDetail_ProcurementDetailRemote.changeToConfirm?d=' + new Date(),
				method : 'POST',
				params : {
					declare_detil_id : Ext.util.JSON.encode(arr)
				},
				success : function(response, options) {
					 grid.store.load();
					 Ext.Msg.alert("提示","确认完成!")
				},
				failure : function() {
					Ext.Msg.alert('提示', "服务器正忙");
				}
			});}
								}
							}]
		})
		contractDetailList.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('contractDetailListMainGrid', contractDetailList.mainGrid);// 第一个参数为自定义控件的xtype
