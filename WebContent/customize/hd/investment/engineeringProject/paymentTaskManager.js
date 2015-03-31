
// 1、引入命名空间
Ext.namespace("paymentTaskManager.mainGrid");
/*
 * 设备工程项目执行--工程项目执行管理--支付任务列表   TAB 4
 * 
 * @class paymentTaskManager.mainGrid
 * @extends Ext.grid.GridPanel
 */
paymentTaskManager.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '支付任务列表', // 扩展时初始化
	id : 'paymentTaskManagerGrid', // 对象名+类型后缀(Grid)

	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/zyk_centreLibraryRemote.getInData?d='
										+ new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'id'
							}, ['id', 'inoutCode', 'inoutFlag', 'partId',
									'partName', 'sendCheckTime', 'inoutTime',
									'manufacturingUnit', 'materialItemName',
									'produceplanBookName', 'certificateCode']),
					// autoLoad : true,
					baseParams : {
						start : 0,
						limit : 20
					}
				})
		Ext.applyIf(this, {
					store : store,
					columns : [{
								header : '任务编号',
								dataIndex : 'materialItemName',
								width : 100,
								sortable : true
							},{
								header : '审批金额(元)',
								dataIndex : 'materialItemName',
								width : 100,
								sortable : true
							},{
								header : '审批记录',
								dataIndex : 'materialItemName',
								width : 100,
								sortable : true
							},{
								header : '状态',
								dataIndex : 'materialItemName',
								width : 100,
								sortable : true
							},{
								header : '类别',
								dataIndex : 'materialItemName',
								width : 100,
								sortable : true
							},{
								header : '申请日期',
								dataIndex : 'materialItemName',
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
					tbar : ['-', {
								text : '保存',
								iconCls : 'add1',
								handler : function() {
								}
							}, '-', {
								text : '下发',
								iconCls : 'edit1',
								handler : function() {
								}
							}]

				})
		paymentTaskManager.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('paymentTaskManagerMainGrid', paymentTaskManager.mainGrid);// 第一个参数为自定义控件的xtype
