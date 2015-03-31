// 1、引入命名空间
Ext.namespace("buinessPlanInfoDetail.mainGrid");
/**
 * 
 * 
 * @class buinessPlanInfoDetail.mainGrid
 * @extends Ext.grid.GridPanel
 */
buinessPlanInfoDetail.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '年度计划物资详情列表', // 扩展时初始化
	id : 'buinessPlanInfoDetailGrid', // 对象名+类型后缀(Grid)
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
								url : '../JSON/procurementDetail_ProcurementDetailRemote.getBuinessPlanInfoDetailList?d='+new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty'
							}, ["materialitemcode","materialitemname","desingnation", "materialstandard",
                                "techniccondition","referenceprice", "demension",
                                "materialcatalog_name","materialcounts","actualnumber","purchasename","purchasecode"]),
					baseParams : {
						start:0,
						limit:20
					}
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
				header : '计划单价',
				dataIndex : 'referenceprice',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '单位',
				dataIndex : 'demension',
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '物资类别',
				dataIndex : "materialcatalog_name",
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '申请量',
				dataIndex : "materialcounts",
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '建议采购量',
				dataIndex : "actualnumber",
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购计划名称',
				dataIndex : "purchasename",
				align : "center",
				width : 100,
				sortable : true
			},{
				header : '采购计划编号',
				dataIndex : "purchasecode",
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
			tbar : ['名称:', {
				                id:'materialitemname',
								xtype : 'textfield'
							}, '-', '物资编码:', {
								id:'materialitemcode',
								xtype : 'textfield'
							}, {
								text : '查询',
								handler:function(){
									grid.store.load({
												params  : {
													materialitemname : Ext.getCmp('materialitemname').getValue(),
													materialitemcode : Ext.getCmp('materialitemcode').getValue()
												}
											});
								}
							}]
		})
		buinessPlanInfoDetail.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('buinessPlanInfoDetailMainGrid', buinessPlanInfoDetail.mainGrid);// 第一个参数为自定义控件的xtype
