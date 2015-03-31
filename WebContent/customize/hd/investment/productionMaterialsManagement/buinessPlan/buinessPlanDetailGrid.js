var buinessPlanDetailGrid = {buinessPlanDetailGrid12:'' };
/*
buinessPlanDetailGrid.gridWin = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/buinessPlanDetailRemote.getGridData',
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'buinessPlanDetailID',
					totalProperty : 'totalProperty'
				}, [ 'buinessPlanDetailId', 'stockCount', 'totalRequired', 'deliveryCount',
						'quarter', 'thirdQuarter', 'secondQuarter',
						'fourthQuarter', 'buinessPlanId', 'productId',
						'productName', 'remark','productCode'])
			});
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '产品名称',
				dataIndex : 'productCode',
				width : 100,
				sortable : true
			},
			{
				header : '交付数量',
				dataIndex : '',
				sortable : true,
				width : 100
			},
			{
				header : '储备数量',
				dataIndex : 'stockCount',
				width : 100,
				sortable : true
			},
			{
				header : '需求数量 ',
				dataIndex : 'totalRequired',
				width : 100,
				sortable : true
			},
			{
				header : '一季度 ',
				dataIndex : 'quarter',
				width : 100,
				sortable : true
			},
			{
				header : '二季度 ',
				dataIndex : 'secondQuarter',
				width : 100,
				sortable : true
			},
			{
				header : '三季度 ',
				dataIndex : 'thirdQuarter',
				width : 100,
				sortable : true
			},
			{
				header : '四季度 ',
				dataIndex : 'fourthQuarter',
				width : 100,
				sortable : true
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 100,
				sortable : true
			} 
			]);
	var grid = common.gridPanel('buinessPlanDetailGridPanelId', cm, store, null, true, null,
			'年度计划明细信息');
	store.baseParams = {start : 0, limit: 20,buinessPlanId:buinessPlanAction.buinessPlanId+''};
//	store.load();

	var window = new Ext.Window({
		id : "buinessPlanDetailShow",
		width : 950,
		height : 300,
		autoScroll : false, 
		layout: 'fit',
		title : '&nbsp;年度计划明细列表',
		modal : true,
		items : [new buinessPlanDetailGrid.importPlanGrid({
		title:'XXXX年物资需求(预拨)计划供应配套指标'
		})]//grid
	});
	return window;
	
}*/



// 1、引入命名空间
Ext.namespace("buinessPlanDetailGrid.importPlanGrid");// 相当于java中包的作用,即 var stockout={}
// 2、编写自定义控件类
/**
 * 经营计划导入查看窗口
 * 
 * @class buinessPlanDetailGrid.importPlanGrid
 * @extends Ext.grid.GridPanel
 */
buinessPlanDetailGrid.importPlanGrid = Ext.extend(Ext.grid.GridPanel, {// 定义主窗体,主窗体前缀带main
	// 扩展时初始化
	id : 'importBuinessPlanGrid', // 对象名+类型后缀(Grid)
	buinessPlanId : '',
	planType:'',
	cm : new Ext.grid.ColumnModel([
			// rm,
			{
		header : '产品名称',
		dataIndex : 'productCode',
		width : 100,
		hidden : true,
		sortable : true
	}, {
		header : '单位',
		dataIndex : 'unit',
		width : 100,
		hidden : true,
		sortable : true
	}, {
		header : '组别',
		dataIndex : 'groupType',
		width : 50,
		sortable : true
	}, {
		header : '上年欠交',
		dataIndex : 'lastarrears',
		width : 70,
		hidden:this.planType=='1'?true:false,
		sortable : true
	}, {
		header : '批架(序列号)',
		dataIndex : 'lastsortie',
		width : 90,
		hidden:this.planType=='1'?true:false,
		sortable : true
	}, {
		header : '本年计划交付',
		dataIndex : 'deliveryCount',
		width : 90,
		sortable : true
	}, {
		header : '批架(序列号)',
		dataIndex : 'currentsortie',
		width : 100,
		sortable : true
	},  {
		header : '下年计划交付',
		dataIndex : 'deliveryCount',
		width : 90,
		hidden:this.planType=='1'?false:true,
		sortable : true
	}, {
		header : '批架(序列号)',
		dataIndex : 'currentsortie',
		width : 100,
		hidden:this.planType=='1'?false:true,
		sortable : true
	},{
		header : '一月',
		dataIndex : 'january',
		width : 39,
		sortable : true
	}, {
		header : '二月',
		dataIndex : 'february',
		width : 39,
		sortable : true
	}, {
		header : '三月',
		dataIndex : 'march',
		width : 39,
		sortable : true
	}, {
		header : '四月',
		dataIndex : 'april',
		width : 39,
		sortable : true
	}, {
		header : '五月',
		dataIndex : 'may',
		width : 39,
		sortable : true
	}, {
		header : '六月',
		dataIndex : 'june',
		width : 39,
		sortable : true
	}, {
		header : '七月',
		dataIndex : 'july',
		width : 39,
		sortable : true
	}, {
		header : '八月',
		dataIndex : 'august',
		width : 39,
		sortable : true
	}, {
		header : '九月',
		dataIndex : 'september',
		width : 39,
		sortable : true
	}, {
		header : '十月',
		dataIndex : 'october',
		width : 39,
		sortable : true
	}, {
		header : '十一月',
		dataIndex : 'november',
		width : 45,
		sortable : true
	}, {
		header : '十二月',
		dataIndex : 'december',
		width : 45,
		sortable : true
	}
			/*
			 * ,{ header : '交付数量', dataIndex : 'deliveryCount', sortable : true,
			 * width : 100 }, { header : '储备数量', dataIndex : 'stockCount', width :
			 * 100, sortable : true }, { header : '需求数量 ', dataIndex :
			 * 'totalRequired', width : 100, sortable : true }, { header : '一季度 ',
			 * dataIndex : 'quarter', width : 100, sortable : true }, { header :
			 * '二季度 ', dataIndex : 'secondQuarter', width : 100, sortable : true }, {
			 * header : '三季度 ', dataIndex : 'thirdQuarter', width : 100,
			 * sortable : true }, { header : '四季度 ', dataIndex :
			 * 'fourthQuarter', width : 100, sortable : true }
			 */, {
		header : '备注 ',
		dataIndex : 'remark',
		width : 100,
		sortable : true
	},
	 {
		header : '原交付数量',
		dataIndex : 'oldDeliverycount',
		width : 100,
		sortable : true
	},{
		header : '变更人',
		dataIndex : 'changer',
		width : 100,
		sortable : true
	},{
		header : '变更时间',
		dataIndex : 'changeTime',
		width : 100,
		sortable : true
	},{
		header : '变更原因',
		dataIndex : 'changeReson',
		width : 100,
		sortable : true
	}
	]),
	view : new Ext.grid.GroupingView({
				// forceFit:true,
				groupTextTpl : '{text} {[values.rs[0].get("unit")]}'
			}),
	border : false,
	animCollapse : false,
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
			store : new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/buinessPlanDetailRemote.getGridData',
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, ['buinessPlanDetailId', 'stockCount',
								'totalRequired', 'deliveryCount', 'quarter',
								'thirdQuarter', 'secondQuarter',
								'fourthQuarter', 'buinessPlanId', 'productId',
								'productName', 'remark', 'productCode',
								'january', 'february', 'march', 'april', 'may',
								'june', 'july', 'august', 'september',
								'october', 'november', 'december', 'groupType',
								'unit', 'lastarrears', 'lastsortie',
								'currentsortie','oldDeliverycount','changer',
								'changeTime','changeReson']),
				baseParams : {
					start : 0,
					limit : -1,
					buinessPlanId : this.buinessPlanId
				},
				sortInfo : {
					field : 'productName',
					direction : "ASC"
				},
				groupField : 'productCode'
			}),
			tbar : [{
				text : '变更',
				handler : function() {
					var rec = grid.getSelectionModel().getSelected();
					if (grid.getSelectionModel().getCount() != 1) {
						return Ext.Msg.alert("提示", "请选择一条记录!");
					} else {
						var win = Ext.getCmp('dataChanger');
						if (win == null) {
							win = new Ext.Window({
								id : 'dataChanger',
								title : '数据变更',
								width : 260,
								autoHeight : true,
								items : [{
											xtype : 'form',
											border : false,
											labelWidth : 60,
											items : [{
												xtype : 'textfield',
												fieldLabel : '原数据',
												readOnly : true,
												value : rec.get('deliveryCount')
													// rec.get('oldquantity')==""?rec.get('quantity'):rec.get('oldquantity')
												}, {
												id : 'oldquantity_new',
												xtype : 'textfield',
												fieldLabel : '新数据'// ,
												// value:rec.get('oldquantity')==""?"":rec.get('quantity')
											}, {
												id : 'changerReson_new',
												xtype : 'textfield',
												fieldLabel : '变更原因',
												value : rec.get('changeReson')
											}]
										}],
								buttons : [{
									text : '确定',
									handler : function() {
										if (rec.get('quantity') <= Ext.getCmp('oldquantity_new').getValue()) {
											Ext.Msg.alert("提示","新数据不能大于或等于 "+ rec.get('quantity')+ " !");
											return false;
										} else {
											Ext.Ajax.request({
												url : '../JSON/declareDetail_DeclareDetailRemote.updateDeclareDetail?d='
														+ new Date(),
												method : 'POST',
												params : {
													buinessPlanDetailId : rec.get('buinessPlanDetailId'),
													quantity : Ext.getCmp('oldquantity_new').getValue(),
													changeReson : Ext.getCmp('changerReson_new').getValue()
												},
												success : function(response,options) {
													var obj = Ext.util.JSON.decode(response.responseText);
													grid.store.load();
												},
												failure : function() {
													Ext.Msg.alert('提示',"服务器正忙!");
												}
											});
											win.close()
										}
									}
								}, {
									text : '取消',
									handler : function() {
										win.close();
									}
								}]

							});
						}
						win.show();
					}

				}
			}]
		})
		buinessPlanDetailGrid.importPlanGrid.superclass.initComponent
				.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('importPlanGrid', 'buinessPlanDetailGrid.importPlanGrid');//第一个参数为自定义控件的xtype

