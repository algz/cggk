
// Ext.ns("fixedAssetsContractInfo.mainPanel");
// /**
// * 项目信息
// *
// * @class fixedAssetsContractInfo.mainPanel
// * @extends Ext.Panel
// */
// fixedAssetsContractInfo.mainPanel =new Ext.Panel({
// title : '固定资产投资合同',
// layout:'border',
// items:[new fixedAssetsContractInfo.projectList()
// ]
// });

Ext.ns("fixedAssetsContractInfo.projectList");
/**
 * 项目信息
 * 
 * @class fixedAssetsContractInfo.projectList
 * @extends Ext.grid.GridPanel
 */
fixedAssetsContractInfo.projectList = Ext.extend(Ext.grid.GridPanel, {
			id : 'projectList',
			region : 'center',
			listeners : {
				rowclick : function(grid, rowIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var store = Ext.getCmp('contractList').store;
					if (rec.get('projecttype') == '专项') {
						store.removeAll();
					} else {
						store.load({
									params : {
										projectid : rec.get('projectid')
									}
								});
					}

				}
			},
			queryContractWin : function(grid) { // 合同信息查询
				var queryItem = new Ext.form.FormPanel({
//							id : 'form2',
							border : false,
							labelWidth : 120,
							labelAlign : 'left',
							items : [{
										layout : 'form',
										border : false,
										style : 'padding:3px;',
										labelWidth : 60,
										items : [{
													xtype : 'textfield',
													id : 'projectnum',
													fieldLabel : '项目编号',
													anchor : '95%'
												}, {
													xtype : 'textfield',
													id : 'projectname',
													fieldLabel : '项目名称',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													fieldLabel : '开始时间',
													format:'Y-m-d',
													name : 'startdt',
													id : 'startdt',
													vtype : 'daterange',
													endDateField : 'enddt' 
												}, {
													xtype : 'datefield',
													fieldLabel : '结束时间',
													format:'Y-m-d',
													name : 'enddt',
													id : 'enddt',
													vtype : 'daterange',
													startDateField : 'startdt' 
												}]
									}]
						});

				var win1 = new Ext.Window({
							title : "合同资讯查询",
							layout : 'fit',
							width : 350,
							height : 230,
//							autoScroll : true,
//							closeAction : 'hide',
//							closable:false,
							items : queryItem,
							buttons : [{
										text : '查询',
										handler : function() {
											grid.store.setBaseParam('projectnum', Ext.getCmp("projectnum").getValue());
											grid.store.setBaseParam('projectname', Ext.getCmp("projectname").getValue());
											grid.store.setBaseParam('startDate', Ext.getCmp('startdt').getValue());
											grid.store.setBaseParam('endDate', Ext.getCmp('enddt').getValue());
											grid.store.load();
											win1.close();
										}
									}, {
										text : '重置',
										handler : function() {
											queryItem.getForm().reset();
										}
									}, {
										text : '关闭',
										handler : function() {
											win1.close();
										}
									}]
						}).show();
			},
			initComponent : function() {
				var grid = this;
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/contractInfoRemote.getProjectList?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'projectid'
									}, ['projectid', 'projectnum', 'projectname', 'contractamount', 'contractmoney', 'amountunit', 'projecttype']),
							// autoLoad : true,//激活TAB页时重新加载
							baseParams : {
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							columns : [new Ext.grid.RowNumberer(), {
										header : "项目编号",
										width : 90,
										dataIndex : "projectnum"
									}, {
										header : "项目名称",
										width : 90,
										dataIndex : "projectname"
									}, {
										header : "合同数量(个)",
										width : 90,
										dataIndex : "contractamount"
									}, {
										header : "合同总金额",
										width : 90,
										dataIndex : "contractmoney"
									}, {
										header : "单位",
										width : 90,
										dataIndex : "amountunit"
									}, {
										header : "类别",
										width : 90,
										dataIndex : "projecttype"
									}],
							store : store,
							tbar : [{
										text : '查询',
										iconCls : 'search1',
										handler : function() {
											grid.queryContractWin(grid);
										}
									}],
							bbar : new Ext.PagingToolbar({
										pageSize : 20,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				fixedAssetsContractInfo.projectList.superclass.initComponent.call(this);
			}
		});
Ext.reg('projectList', fixedAssetsContractInfo.projectList);

Ext.ns("fixedAssetsContractInfo.contractList");
/**
 * 项目信息
 * 
 * @class fixedAssetsContractInfo.contractList
 * @extends Ext.grid.GridPanel
 */
fixedAssetsContractInfo.contractList = Ext.extend(Ext.grid.GridPanel, {
			id : 'contractList',
			title : '合同列表',
			height : 200,
			split : true,
			region : 'south',
			paymentListWin : function(contractid) {
				var win = Ext.getCmp('paymentListWin');
				if (!win) {
					win = new Ext.Window({
								id : 'paymentListWin',
								title : '支付列表',
								width : 1000,
								height : 350,
								modal : true,
								layout : 'fit',
								items : [new fixedAssetsContractInfo.paymentList({
											contractid : contractid
										})],
								buttons : [{
											text : '关闭',
											handler : function() {
												win.close();
											}
										}]
							})
				}
				win.show();
			},
			initComponent : function() {
				var grid = this
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/contractInfoRemote.getContractList?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'contractid'
									}, ['contractid', 'contractcode', 'contractname', 'amount', 'status', 'partyb', 'paymentfrequency', 'paymentamount']),
							baseParams : {
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							columns : [new Ext.grid.RowNumberer(), {
										header : "合同编号",
										width : 100,
										dataIndex : "contractcode"
									}, {
										header : "合同名称",
										width : 100,
										dataIndex : "contractname"
									}, {
										header : "供应商",
										width : 100,
										dataIndex : "partyb"
									}, {
										header : "金额",
										width : 100,
										dataIndex : "amount"
									}, {
										header : "状态",
										width : 100,
										dataIndex : "status",
										renderer : function(value, cellmeta, record, rowIndex) {
											var id = record.get('contractid')
											if (value == 1) {
												return '编制中';
											} else if (value == 2) {
												return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>审批中</font></a>";
											} else if (value == 3) {
												return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>已审批</font></a>";
											} else {
												return value;
											}
										}
									}, {
										header : "支付次数",
										width : 100,
										dataIndex : "paymentfrequency",
										renderer : function(value, cellmeta, record, rowIndex) {
											if (value == 0) {
												return value;
											} else {
												var contractid = record.get('contractid');
												return "<a href='javascript:void(0);' onclick=fixedAssetsContractInfo.contractList.prototype.paymentListWin('" + contractid
														+ "')><font color=blue>" + value + "</font></a>";
											}
										}
									}, {
										header : "支付金额",
										width : 100,
										dataIndex : "paymentamount",
										renderer : function(value, cellmeta, record, rowIndex) {
											return value;
										}
									}, {
										header : "单位",
										width : 100,
										dataIndex : "projecttype",
										renderer : function() {
											return '万元';
										}
									}],
							store : store,
							bbar : new Ext.PagingToolbar({
										pageSize : 20,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				fixedAssetsContractInfo.contractList.superclass.initComponent.call(this);
			}
		});
Ext.reg('contractList', fixedAssetsContractInfo.contractList);

Ext.ns("fixedAssetsContractInfo.paymentList")
/**
 * 支付列表
 * 
 * @class fixedAssetsContractInfo.paymentList
 * @extends Ext.grid.GridPanel
 */
fixedAssetsContractInfo.paymentList = Ext.extend(Ext.grid.GridPanel, {
			id : 'paymentList',
			contractid : '',
			paymentDetailWin : function(id, selectType) {
				var win = Ext.getCmp('paymentDetailWin');
				if (!win) {
					win = new Ext.Window({
								id : 'paymentDetailWin',
								title : '支付详情',
								width : 1000,
								height : 350,
								modal : true,
								layout : 'fit',
								items : [PaymentTaskApprovalObjectPanel.init(id, selectType)
								/*
								 * new fixedAssetsContractInfo.paymentDetail({
								 * contractid : contractid })
								 */],
								buttons : [{
											text : '关闭',
											handler : function() {
												win.close();
											}
										}]
							})
				}
				win.show();
			},
			initComponent : function() {
				var grid = this
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/contractInfoRemote.getPaymentList?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'taskid'
									}, ['taskid', 'amount', 'status', 'type', 'createtime', 'selecttype']),
							autoLoad : true,
							baseParams : {
								contractId : grid.contractid,
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							columns : [new Ext.grid.RowNumberer(), {
								header : '任务编号',
								width : 270,
								dataIndex : "taskid",
								renderer : function(value, cellmeta, record, rowIndex) {
									var id = value + record.get('type');
									var selectType = record.get('selecttype');
									return "<a href='javascript:void(0);' onclick=fixedAssetsContractInfo.paymentList.prototype.paymentDetailWin('" + id + "','" + selectType
											+ "')><font color=blue>" + value + "</font></a>";

								}
							}, {
								header : "审批金额(元)",
								width : 100,
								dataIndex : "amount"
							}, /*
								 * { header : "审批记录", width : 60, dataIndex :
								 * "", renderer : function(value, cellmeta,
								 * record, rowIndex) { var status =
								 * record.get('status') if (status == 3) {
								 * return "<a href='javascript:void(0);'
								 * onclick=approvalInfoList.showWin('" + id +
								 * "')><font color=blue>查看</font></a>"; } } },
								 */{
								header : "状态",
								width : 80,
								dataIndex : "status",
								renderer : function(value, cellmeta, record, rowIndex) {
									var id = record.get('contractid')
									if (value == 1) {
										return '编制中';
									} else if (value == 2) {
										return '审批中';
									} else if (value == 3) {
										return '已审批';
									} else {
										return value;
									}
								}
							}, {
								header : "类别",
								width : 100,
								dataIndex : "type",
								renderer : function(value, cellmeta, record, rowIndex) {

									if (value == 1) {
										return '股份公司';
									} else if (value == 2) {
										return '集团公司';
									} else {
										return value;
									}
								}
							}, {
								header : "申请日期",
								width : 100,
								dataIndex : "createtime"
							}],
							store : store,
							bbar : new Ext.PagingToolbar({
										pageSize : 20,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				fixedAssetsContractInfo.paymentList.superclass.initComponent.call(this);
			}
		})
Ext.reg('paymentList', fixedAssetsContractInfo.paymentList)

Ext.ns("fixedAssetsContractInfo.paymentDetail")
/**
 * 支付列表
 * 
 * @class fixedAssetsContractInfo.paymentDetail
 * @extends Ext.grid.GridPanel
 */
fixedAssetsContractInfo.paymentDetail = Ext.extend(Ext.grid.GridPanel, {
			id : 'paymentDetail',
			taskid : '',
			initComponent : function() {
				var grid = this
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/contractInfoRemote.getPaymentDetails?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'taskid'
									}, ['taskid', 'amount', 'status', 'type', 'createtime']),
							autoLoad : true,
							baseParams : {
								paymentdetailid : grid.taskid,
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							columns : [new Ext.grid.RowNumberer(), {
										header : '任务编号',
										width : 270,
										dataIndex : "taskid"
									}, {
										header : "审批金额(元)",
										width : 70,
										dataIndex : "amount"
									}, {
										header : "审批记录",
										width : 60,
										dataIndex : "",
										renderer : function(value, cellmeta, record, rowIndex) {
											var status = record.get('status')
											if (status == 3) {
												return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
											}
										}
									}, {
										header : "状态",
										width : 80,
										dataIndex : "status",
										renderer : function(value, cellmeta, record, rowIndex) {
											var id = record.get('contractid')
											if (value == 1) {
												return '编制中';
											} else if (value == 2) {
												return '审批中';
											} else if (value == 3) {
												return '已审批';
											} else {
												return value;
											}
										}
									}, {
										header : "类别",
										width : 100,
										dataIndex : "type",
										renderer : function(value, cellmeta, record, rowIndex) {

											if (value == 1) {
												return '股份公司';
											} else if (value == 2) {
												return '集团公司';
											} else {
												return value;
											}
										}
									}, {
										header : "申请日期",
										width : 100,
										dataIndex : "createtime"
									}],
							store : store,
							bbar : new Ext.PagingToolbar({
										pageSize : 20,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				fixedAssetsContractInfo.paymentDetail.superclass.initComponent.call(this);
			}
		})
Ext.reg('paymentDetail', fixedAssetsContractInfo.paymentDetail);

Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);

				if (!date) {
					return;
				}
				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
					var start = Ext.getCmp(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
					var end = Ext.getCmp(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				/*
				 * Always return true since we're only using this vtype to set
				 * the min/max allowed values (these are tested for after the
				 * vtype test)
				 */
				return true;
			}
		});
