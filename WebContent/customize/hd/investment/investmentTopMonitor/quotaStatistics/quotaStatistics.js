Ext.chart.Chart.CHART_URL='../lib/ext/resources/charts.swf';

// 1、引入命名空间
Ext.namespace("quotaStatistics.executeRateGrid");
/**
 * 执行率，完成率
 * @class quotaStatistics.executeRateGrid
 * @extends Ext.grid.GridPanel
 */
quotaStatistics.executeRateGrid = Ext.extend(Ext.grid.GridPanel, {// 定义主窗体,主窗体前缀带main
	id : 'executeRateGrid', // 对象名+类型后缀(Grid)
	stripeRows : true, //隔行变色，区分表格行
	loadMask:true,
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/quotaStatisticsRemote.getExecuteRateData?d='
								+ new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty'
					}, ['materialCatalogName', 'annualPlanExecuteRate',
							'annualPlanFinishRate', 'scatteredPlanExecuteRate',
							'scatteredPlanFinishRate', 'immediateDeliveryRate'])
		});
		Ext.applyIf(this, {
					store : store,
					columns : [{
								header : '物资材料大类',
								dataIndex : 'materialCatalogName',
								width : 200,
								sortable : true
							}, {
								header : '年度计划执行率',
								dataIndex : 'annualPlanExecuteRate',
								width : 160,
								sortable : true,
								renderer:function(value){return value+'%'}
							}, {
								header : '年度计划完成率',
								dataIndex : 'annualPlanFinishRate',
								width : 160,
								sortable : true,
								renderer:function(value){return value+'%'}
							}, {
								header : '零星计划执行率',
								dataIndex : 'scatteredPlanExecuteRate',
								width : 160,
								sortable : true,
								renderer:function(value){return value+'%'}
							}, {
								header : '零星计划完成率',
								dataIndex : 'scatteredPlanFinishRate',
								width : 160,
								sortable : true,
								renderer:function(value){return value+'%'}
							}, {
								header : '零星计划及时交付率',
								dataIndex : 'immediateDeliveryRate',
								width : 160,
								sortable : true,
								renderer:function(value){return value+'%'}
							}],
					tbar : ['-', '年份：', {
								xtype : 'numberfield',
								id : 'executeRateDate'
							}, {
								text : '查询',
								handler : function() {
									var queryYear=Ext.getCmp('executeRateDate').getValue();
									if(queryYear==''){
										return;
									}
									grid.store.load({
												params : {
													queryYear : Ext.getCmp('executeRateDate').getValue()
												},
												callback : function(records, options, success) {
									var annualExecuteRate = annualFinishRate = scatteredExecuteRate = scatteredFinishRate = immediateDeliveryRate = 0;
									for (var i = 0; i < records.length; i++) {
										annualExecuteRate += Number(records[i]
												.get("annualPlanExecuteRate"));
										annualFinishRate += Number(records[i]
												.get("annualPlanFinishRate"));
										scatteredExecuteRate += Number(records[i]
												.get("scatteredPlanExecuteRate"));
										scatteredFinishRate += Number(records[i]
												.get("scatteredPlanFinishRate"));
										 immediateDeliveryRate+=Number(records[i].get("immediateDeliveryRate"));
									}
									var Plant = grid.getStore().recordType;
									var p = new Plant({
										materialCatalogName : '所有物资',
										annualPlanExecuteRate : (annualExecuteRate/5).toFixed(2),
										annualPlanFinishRate : (annualFinishRate/5).toFixed(2),
										scatteredPlanExecuteRate : (scatteredExecuteRate/5).toFixed(2),
										scatteredPlanFinishRate : (scatteredFinishRate/5).toFixed(2),
										immediateDeliveryRate : (immediateDeliveryRate/5).toFixed(2)
									});
									store.insert(0, p);
								}
											});
								}
							}]

				})
		quotaStatistics.executeRateGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('executeRateGrid ', quotaStatistics.executeRateGrid);// 第一个参数为自定义控件的xtype

// 1、引入命名空间
Ext.namespace("quotaStatistics.scatteredPlanPanel");
/**
 * 走势图
 * @class quotaStatistics.scatteredPlanPanel
 * @extends Ext.Panel
 */
quotaStatistics.statisticsChart = Ext.extend(Ext.Panel, {// 定义主窗体,主窗体前缀带main
	autoScroll : true,
	layout : 'fit',
	chartId:'',
	chartUrl:'',
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var panel = this;
		Ext.applyIf(this, {
			items : {
							xtype : 'linechart',
							id : this.chartId,
							url : '../lib/ext/resources/charts.swf',
							store : new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
									url : this.chartUrl,
									method : 'post'
								}),
								reader : new Ext.data.JsonReader({
											root : 'results'
										}, ['xAxis', 'yAxis0','yAxis1','yAxis2','yAxis3','yAxis4','yAxis5','yAxis6'])
							}),
							xField : 'xAxis',
							xAxis : new Ext.chart.CategoryAxis({
										title : '月份'
									}),
							yAxis : new Ext.chart.NumericAxis({
										title : '计划数'
							}),
							series : [{
										type : 'line',
										displayName : '全部物资',
										yField : 'yAxis0',
										style : {
											color : 0xFF99CC
										}
									}, {
										type : 'line',
										displayName : '有色金属材料大类',
										yField : 'yAxis1',
										style : {
											color : 'green'
										}
									}, {
										type : 'line',
										displayName : '非金属材料大类',
										yField : 'yAxis2',
										style : {
											color : 0xFFFF00
										}
									}, {
										type : 'line',
										displayName : '黑色金属材料大类',
										yField : 'yAxis3',
										style : {
											color : 0xC0C0C0
										}
									}, {
										type : 'line',
										displayName : '机电产品大类',
										yField : 'yAxis4',
										style : {
											color : 0x99CC00
										}
									}, {
										type : 'line',
										displayName : '航空成附件大类',
										yField : 'yAxis5',
										style : {
											color : 0x15428B
										}
									}]

						},
						tbar : ['-', '年份：', {
									xtype : 'numberfield',
									id : this.chartId+'Date'
								}, {
									text : '查询',
									handler : function() {
										var queryYear=Ext.getCmp(panel.chartId+'Date').getValue();
									    if(queryYear==''){
										   return;
									    }
										Ext.getCmp(panel.chartId).store.load({
													params : {
														queryYear : queryYear
													}
												});
									}
						 }]
		})
		quotaStatistics.statisticsChart.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('statisticsChart ', quotaStatistics.statisticsChart);// 第一个参数为自定义控件的xtype

Ext.onReady(function() {
	Ext.QuickTips.init();

	new Ext.Viewport({
		layout : 'fit',
		items : new Ext.TabPanel({
			border : false,
			activeTab : 0,
			items : [
			        new quotaStatistics.executeRateGrid({
								title : '执行率'
					}), 
					new quotaStatistics.statisticsChart({
						title : '零星计划走势图',
						chartId:'scatteredPlanChart',
						chartUrl:'../JSON/quotaStatisticsRemote.scatteredPlanChart?d='+ new Date()
					}),
					new quotaStatistics.statisticsChart({
						title : '合同签订金额走势图',
						chartId:'countContractAmoutChart',
						chartUrl:'../JSON/quotaStatisticsRemote.countContractAmoutChart?d='+ new Date()
					}),
					new Ext.Panel({
						title : '年度计划预算金额走势图',
						layout : 'fit',
						items : {
							xtype : 'linechart',
							id : 'countAnnualBudgetAmoutChart',
							url : '../lib/ext/resources/charts.swf',
							store : new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
									url : '../JSON/quotaStatisticsRemote.countAnnualBudgetAmoutChart?d='
											+ new Date(),
									method : 'post'
								}),
								reader : new Ext.data.JsonReader({
											root : 'results'
										}, ['xAxis', 'yAxis']),
								autoLoad:true
							}),
							xField : 'xAxis',
							yField : 'yAxis',
							xAxis : new Ext.chart.CategoryAxis({
										title : '年份'
									})
						}
					})]
		})
	})
}, this);