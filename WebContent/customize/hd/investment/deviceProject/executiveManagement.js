
// 1、引入命名空间
Ext.namespace("executiveManagement.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--执行管理
 * 
 * @class executiveManagement.mainGrid
 * @extends Ext.grid.GridPanel
 */
executiveManagement.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {
			title : '执行管理',
			id : 'executiveManagementGrid',
			stripeRows : true, // 隔行变色，区分表格行
			listeners : {
				activate : function(grid) {
					grid.store.load();
				}
			},
			initComponent : function() {
				var grid = this;
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/deviceManageRemote.getGridData?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'implementplanid'
									}, ['implementplanid', 'equipregistId', 'fundunit', 'projectnum', 'projectname', 'remark', 'budgetnum', 'projectmanagerid', 'status', 'nums',
											'numsunit', 'managecontent','projectcategorys']),
							baseParams : {
								start : 0,
								limit : 20
							}
						});
				var sm = new Ext.grid.CheckboxSelectionModel();
				Ext.applyIf(this, {
							store : store,
							sm : sm,
							columns : [sm, {
										header : '项目编号',
										dataIndex : 'projectnum',
										width : 100,
										sortable : true
									}, {
										header : '项目名称',
										dataIndex : 'projectname',
										width : 100,
										sortable : true
									},
//										{
//										header : '项目类别',
//										dataIndex : 'projectcategorys',
//										width : 100,
//										sortable : true,
//										renderer : function(value){
//											if(value == 1){
//												return '新建';
//											}else if(value == 2){
//												return '大修';
//											}
//										}
//									}, 
										{
										header : '状态',
										dataIndex : 'status',
										width : 100,
										sortable : true,
										renderer : function(value) {
											if (value == 3) {
												return '<span style="color:red;">待编制</span>';
											} else if (value == 4 || value == 5 || value == 6) {
												return '<span style="color:red;">编制中</span>';
											} else if (value == 8) {
												return '已下发';
											} else {
												return value;
											}
										}
									}, {
										header : '数量',
										dataIndex : 'nums',
										width : 100,
										sortable : true
									}, {
										header : '数量单位',
										dataIndex : 'numsunit',
										width : 100,
										sortable : true
									}, {
										header : '概算投资',
										dataIndex : 'budgetnum',
										width : 100,
										sortable : true
									}, {
										header : '单位',
										dataIndex : 'fundunit',
										width : 100,
										sortable : true
									}, {
										header : '执行管理',
										dataIndex : 'managecontent',
										width : 700,
										sortable : true
									}, {
										header : '备注',
										dataIndex : 'remark',
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
										xtype : 'deviceProjectDateComboxBox',
										projectDataType : 2,
										listeners : {
											beforequery : function(qe) {
												delete qe.combo.lastQuery;
											},
											select : function(combo, record, index) {
												grid.store.baseParams = {
													approvaltime : record.get('value'),
													start : 0,
													limit : 20
												};
												grid.store.load();
											}
										}
									}, '-', {
										text : '新建',
										iconCls : 'add1',
										disabled : main.EXECUTE,
										handler : function() {
											var rec = grid.getSelectionModel().getSelected();
											var count = grid.getSelectionModel().getCount();
											if (count == 0 || count > 1) {
												Ext.Msg.alert('提示', '请选择一条记录!');
												return false;
											} else if (rec.get('status') != 3) {
												Ext.Msg.alert('提示', '请选择一条待编制的数据!');
												return false;
											}
											var win = new Ext.Window({
														title : '添加',
														layout : 'fit',
														width : 750,
														height : 300,
														modal : true,
														items : [{
																	xtype : 'tabpanel',
																	activeItem : 0,
																	border : false,
																	items : [{
																				// 定向采购表单
																				xtype : 'dirpurchaseForm',
																				implementplanid : rec.get('implementplanid'),
																				buttons : [{
																							text : '确定',
																							handler : function() {
																								var form = Ext.getCmp('dirpurchaseForm')
																								if (!form.getForm().isValid()) {
																									return false;
																								}
																								var data = form.getForm().getValues();
																								Ext.Ajax.request({
																											url : '../JSON/deviceManageRemote.saveManage',
																											method : 'post',
																											waitMsg : '数据加载中，请稍后....',
																											params : {
																												implementplanid : Ext.util.JSON.encode(data),
																												status : '4'
																											},
																											success : function(response, opts) {
																												var obj = Ext.decode(response.responseText);
																												if (obj.success == true) {
																													Ext.Msg.alert('提示', '数据保存成功!');
																													grid.store.load();
																													win.close()
																												} else {
																													Ext.Msg.alert('提示', '数据保存失败!');
																												}
																											},
																											failure : function(response, opts) {
																												Ext.Msg.alert('提示', '网络问题,请与管理员联系!')
																											}
																										});
																							}
																						}, {
																							text : '取消',
																							handler : function() {
																								win.close()
																							}
																						}]
																			}, {
																				// 自行招标表单
																				xtype : 'selftenderForm',
																				id : 'selftenderForm',
																				implementplanid : rec.get('implementplanid'),
																				buttons : [{
																							text : '确定',
																							handler : function() {
																								var form = Ext.getCmp('selftenderForm')
																								if (!form.getForm().isValid()) {
																									return false;
																								}
																								var data = form.getForm().getValues();
																								Ext.Ajax.request({
																											url : '../JSON/deviceManageRemote.saveManage',
																											method : 'post',
																											waitMsg : '数据加载中，请稍后....',
																											params : {
																												implementplanid : Ext.util.JSON.encode(data),
																												status : '5'
																											},
																											success : function(response, opts) {
																												var obj = Ext.decode(response.responseText);
																												if (obj.success == true) {
																													Ext.Msg.alert('提示', '数据保存成功!');
																													grid.store.load();
																													win.close()
																												} else {
																													Ext.Msg.alert('提示', '数据保存失败!');
																												}
																											},
																											failure : function(response, opts) {
																												Ext.Msg.alert('提示', '网络问题,请与管理员联系!')
																											}
																										});
																							}
																						}, {
																							text : '取消',
																							handler : function() {
																								win.close()
																							}
																						}]
																			}, {
																				// 委托招标
																				xtype : 'entrusttenderForm',
																				id : 'entrusttenderForm',
																				implementplanid : rec.get('implementplanid'),
																				buttons : [{
																							text : '确定',
																							handler : function() {
																								var form = Ext.getCmp('entrusttenderForm')
																								if (!form.getForm().isValid()) {
																									return false;
																								}
																								var data = form.getForm().getValues();
																								Ext.Ajax.request({
																											url : '../JSON/deviceManageRemote.saveManage',
																											method : 'post',
																											waitMsg : '数据加载中，请稍后....',
																											params : {
																												implementplanid : Ext.util.JSON.encode(data),
																												status : 6
																											},
																											success : function(response, opts) {
																												var obj = Ext.decode(response.responseText);
																												if (obj.success == true) {
																													Ext.Msg.alert('提示', '数据保存成功!');
																													grid.store.load();
																													win.close()
																												} else {
																													Ext.Msg.alert('提示', '数据保存失败!');
																												}
																											},
																											failure : function(response, opts) {
																												Ext.Msg.alert('提示', '网络问题,请与管理员联系!')
																											}
																										});
																							}
																						}, {
																							text : '取消',
																							handler : function() {
																								win.close()
																							}
																						}]
																			}]
																}]

													});
											win.show();
										}
									}, '-', {
										text : '编辑',
										iconCls : 'edit1',
										disabled : main.EXECUTE,
										handler : function() {
											var rec = grid.getSelectionModel().getSelected();
											var count = grid.getSelectionModel().getCount();
											if (count == 0 || count > 1) {
												Ext.Msg.alert('提示', '请选择一条记录!');
												return false;
											}
											var status = rec.get('status');
											var form;
											if (status == 3) {
												Ext.Msg.alert('提示', '没有执行数据,请新建后在编辑!');
												return;
											}
											if (status == 4) {
												form = new executiveManagement.dirpurchaseForm({
															isAdd : false,
															implementplanid : rec.get('implementplanid')
														});
											} else if (status == 5) {
												form = new executiveManagement.selftenderForm({
															isAdd : false,
															implementplanid : rec.get('implementplanid')
														});
											} else if (status == 6) {
												form = new executiveManagement.entrusttenderForm({
															isAdd : false,
															implementplanid : rec.get('implementplanid')
														});
											} else {
												Ext.Msg.alert('提示', '请选择编制中的数据!');
												return;
											}
											var win = Ext.getCmp('executiveManagement_editWin');
											if (!win) {
												win = new Ext.Window({
															id : 'executiveManagement_editWin',
															title : '编辑',
															width : 750,
															height : 300,
															layout : 'fit',
															items : [form],
															buttons : [{
																		text : '确定',
																		handler : function() {
																			Ext.Ajax.request({
																						url : '../JSON/deviceManageRemote.saveManage',
																						method : 'post',
																						waitMsg : '数据加载中，请稍后....',
																						params : {
																							implementplanid : Ext.util.JSON.encode(form.getForm().getValues()),
																							status : status
																						},
																						success : function(response, opts) {
																							var obj = Ext.decode(response.responseText);
																							if (obj.success == true) {
																								win.close();
																								Ext.Msg.alert('提示', '数据保存成功!');
																								grid.store.load();
																							} else {
																								Ext.Msg.alert('提示', '数据保存失败!');
																							}
																						},
																						failure : function(response, opts) {
																							Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
																						}
																					});
																		}
																	}, {
																		text : '取消',
																		handler : function() {
																			win.close();
																		}
																	}]
														})
											}
											win.show();
										}
									}, {
										text : '下发',
										iconCls : 'icon-importTasks',
										disabled : main.EXECUTE,
										handler : function() {
											var recs = grid.getSelectionModel().getSelections();
											var count = grid.getSelectionModel().getCount();
											if (count == 0 || count > 1) {
												Ext.Msg.alert('提示', '请选择记录!');
												return false;
											}
											var arr = new Array();
											for (var i = 0; i < recs.length; i++) {
												var rec = recs[i];
												var status = rec.get('status');
												if (status == 3) {
													Ext.Msg.alert('提示', '待编制的数据不能下发!');
													return false;
												} else if (status == 8) {
													Ext.Msg.alert('提示', '已下发的数据不能下发!')
													return false;
												} else {
													arr.push(rec.get('implementplanid'));
												}
											}
											Ext.Ajax.request({
														url : '../JSON/deviceManageRemote.sendManage',
														method : 'post',
														waitMsg : '数据加载中，请稍后....',
														params : {
															implementplanid : Ext.util.JSON.encode(arr)
														},
														success : function(response, opts) {
															var obj = Ext.decode(response.responseText);
															if (obj.success == true) {
																grid.store.load();
																Ext.Msg.alert('提示', '数据下发成功!');
															} else {
																Ext.Msg.alert('提示', obj.msg);
															}
														},
														failure : function(response, opts) {
															Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
														}
													});
										}
									}]
						})
				executiveManagement.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
			}
		})
// 3、注册控件
Ext.reg('executiveManagementMainGrid', executiveManagement.mainGrid);// 第一个参数为自定义控件的xtype

Ext.ns("executiveManagement.dirpurchaseForm")
/**
 * 
 * @class executiveManagement.dirpurchaseForm
 * @extends Ext.FormPanel
 */
executiveManagement.dirpurchaseForm = Ext.extend(Ext.FormPanel, {
			id : 'dirpurchaseForm',
			title : '定向采购里程碑',
//			layout : 'fit',
			border : false,
			bodyStyle : 'padding:5px;',
			isAdd : true,// 是否新建记录
			implementplanid : '',// 实施计划ID,如果非空则查询实施计划,并自动加载实施计划对应的执行管理数据
			listeners : {
				afterrender : function(form) {
					if (this.implementplanid == '') {
						return true;
					}
					form.getForm().load({
								url : '../JSON/deviceManageRemote.getManage',
								params : {
									implementplanid : this.implementplanid
								},
								success : function(form, action) {
									var departmentid = action.result.data.contractsigningdepartmentid;
									var departmentName = action.result.data.contractsigningdepartment;
									var field = form.findField('contractsigningdepartment')
									var rectype = field.getStore().recordType
									var rec = new rectype({
												text : departmentName,
												value : departmentid
											})
									field.getStore().add(rec);
									field.setValue(departmentid);
								},
								failure : function(form, action) {
									Ext.Msg.alert("Load failed", action.result.errorMessage);
								}
							});
				}
			},
			initComponent : function() {
				var form = this;
				Ext.applyIf(this, {
							items : [{
										xtype : 'panel',
										layout : 'column',
										border : false,
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : .33,
													border : false,
													labelWidth : 60,
													items : [{
																xtype : 'hidden',
																name : 'implementplanid'
															}, {
																xtype : 'hidden',
																id : 'dirpurchaseid'
															}, {
																xtype : 'hidden',
																id : 'equipregistId'
															}, {
																xtype : 'textfield',
																fieldLabel : '项目编号',
																name : 'projectnum',
																allowBlank : false,
																readOnly : true,
																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '论证书',
																name : 'certificates',
																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '报价',
																name : 'quote',
																anchor : '95%'
															}]
												}, {
													xtype : 'panel',
													columnWidth : .33,
													border : false,
													labelWidth : 93,
													layout : 'form',
													items : [{
																xtype : 'textfield',
																fieldLabel : '项目名称',
																name : 'projectname',
																readOnly : true,
																allowBlank : false,
																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '使用单位打报告',
																name : 'report',

																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '组织谈判',
																name : 'organizationnegotiations',

																anchor : '95%'
															}]
												}, {
													xtype : 'panel',
													layout : 'form',
													columnWidth : .33,
													border : false,
													labelWidth : 60,
													items : [{
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '措施卡片',
																name : 'measurescard',
																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '草签协议',

																name : 'initiallingagreement',
																anchor : '95%'
															}, {
																xtype : 'datefield',
																format : 'Y-m-d',
																fieldLabel : '签约合同',

																name : 'contractsigning',
																anchor : '95%'
															}]
												}]
									}, {
										xtype : 'panel',
										layout : 'form',
										border : false,
										labelWidth : 80,
										items : [{
													xtype : 'departmentComboBox',
													fieldLabel : '签约合同部门',
													anchor : '95%',
													hiddenName : 'contractsigningdepartment'
												}]
									}]
						});
				executiveManagement.dirpurchaseForm.superclass.initComponent.call(this);
			}
		})
Ext.reg("dirpurchaseForm", executiveManagement.dirpurchaseForm);

Ext.ns('executiveManagement')
/**
 * 自行招标
 * 
 * @class executiveManagement.selftenderForm
 * @extends Ext.FormPanel
 */
executiveManagement.selftenderForm = Ext.extend(Ext.FormPanel, {
			id : 'selftenderForm',
			title : '自行招标里程碑',
			layout : 'column',
			border : false,
			bodyStyle : 'padding:5px;',
			isAdd : true,// 是否新建记录
			implementplanid : '',// 实施计划ID,如果非空则查询实施计划,并自动加载实施计划对应的执行管理数据
			listeners : {
				afterrender : function(form) {
					if (this.implementplanid == '') {
						return true;
					}
					form.getForm().load({
								url : '../JSON/deviceManageRemote.getManage',
								params : {
									implementplanid : this.implementplanid
								},
								success : function(form, action) {
									var departmentid = action.result.data.contractsigningdepartmentid;
									var departmentName = action.result.data.contractsigningdepartment;
									var field = form.findField('contractsigningdepartment')
									var rectype = field.getStore().recordType
									var rec = new rectype({
												text : departmentName,
												value : departmentid
											})
									field.getStore().add(rec);
									field.setValue(departmentid);
								},
								failure : function(form, action) {
									Ext.Msg.alert("Load failed", action.result.errorMessage);
								}
							});
				}
			},
			initComponent : function() {
				var form = this;
				Ext.applyIf(this, {
							items : [{
										xtype : 'panel',
										columnWidth : .33,
										border : false,
										layout : 'form',
										labelWidth : 60,
										items : [{
													xtype : 'hidden',
													name : 'implementplanid'
												}, {
													xtype : 'hidden',
													name : 'selftenderid'
												}, {
													xtype : 'textfield',
													name : 'projectnum',
													fieldLabel : '项目编号',
													allowBlank : false,
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'certificates',
													format : 'Y-m-d',
													fieldLabel : '论证书',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'entrustmentagreement',
													format : 'Y-m-d',
													fieldLabel : '委托协议',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'tenderassessment',
													format : 'Y-m-d',
													fieldLabel : '招标评审',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'tenderregistration',
													format : 'Y-m-d',
													fieldLabel : '招标登记',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'calibration',
													format : 'Y-m-d',
													fieldLabel : '定标',
													anchor : '95%'
												}, {
													xtype : 'departmentComboBox',
													fieldLabel : '签约合同部门',
													hiddenName : 'contractsigningdepartment'
												}]
									}, {
										xtype : 'panel',
										layout : 'form',
										columnWidth : .33,
										border : false,
										labelWidth : 93,
										defaults : {
											anchor : '95%'
										},
										items : [{
													xtype : 'textfield',
													fieldLabel : '项目名称',
													name : 'projectname',
													allowBlank : false
												}, {

													xtype : 'datefield',
													name : 'technicalindicators',
													format : 'Y-m-d',
													fieldLabel : '技术指标确定'
												}, {
													xtype : 'datefield',
													name : 'submittechnicalindicators',
													format : 'Y-m-d',
													fieldLabel : '提交技术指标'
												}, {
													xtype : 'datefield',
													name : 'directedtender',
													format : 'Y-m-d',
													fieldLabel : '定招',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'issuedtenders',
													format : 'Y-m-d',
													fieldLabel : '发标书',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'signedagreement',
													format : 'Y-m-d',
													fieldLabel : '签定技术协议',
													anchor : '95%'
												}]
									}, {
										xtype : 'panel',
										layout : 'form',
										columnWidth : .33,
										border : false,
										labelWidth : 105,
										items : [{
													xtype : 'datefield',
													name : 'measurescard',
													format : 'Y-m-d',
													fieldLabel : '措施卡片',
													anchor : '95%',
													allowBlank : false
												}, {
													xtype : 'datefield',
													name : 'auditingregistration',
													format : 'Y-m-d',
													fieldLabel : '委托招标审签登记',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'linkednetwork',
													format : 'Y-m-d',
													fieldLabel : '挂网',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'informationdissemination',
													format : 'Y-m-d',
													fieldLabel : '信息发布',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'bidevaluation',
													format : 'Y-m-d',
													fieldLabel : '评标书',
													anchor : '95%'
												}, {
													xtype : 'datefield',
													name : 'contractsigning',
													format : 'Y-m-d',
													fieldLabel : '签约合同',
													anchor : '95%'
												}]
									}]
						})

				executiveManagement.selftenderForm.superclass.initComponent.call(this);
			}
		})
Ext.reg('selftenderForm', executiveManagement.selftenderForm);

Ext.ns("executiveManagement.entrusttenderForm")
/**
 * 委托招标
 * 
 * @class executiveManagement.entrusttenderForm
 * @extends Ext.FormPanel
 */
executiveManagement.entrusttenderForm = Ext.extend(Ext.FormPanel, {
			id : 'entrusttender',
			title : '委托招标里程碑',
			layout : 'column',
			border : false,
			bodyStyle : 'padding:5px;',
			implementplanid : '',// 实施计划ID,如果非空则查询实施计划,并自动加载实施计划对应的执行管理数据
			listeners : {
				afterrender : function(form) {
					if (this.implementplanid == '') {
						return true;
					}
					form.getForm().load({
								url : '../JSON/deviceManageRemote.getManage',
								params : {
									implementplanid : this.implementplanid
								},
								success : function(form, action) {
									var departmentid = action.result.data.contractsigningdepartmentid;
									var departmentName = action.result.data.contractsigningdepartment;
									var field = form.findField('contractsigningdepartment')
									var rectype = field.getStore().recordType
									var rec = new rectype({
												text : departmentName,
												value : departmentid
											})
									field.getStore().add(rec);
									field.setValue(departmentid);
								},
								failure : function(form, action) {
									Ext.Msg.alert("Load failed", action.result.errorMessage);
								}
							});
				}
			},
			initComponent : function() {
				var form = this;
				Ext.applyIf(this, {
							items : [{
										xtype : 'panel',
										layout : 'form',
										columnWidth : .33,
										border : false,
										labelWidth : 60,
										items : [{
													xtype : 'hidden',
													name : 'implementplanid'
												}, {
													xtype : 'hidden',
													name : 'entrusttenderid'
												}, {
													xtype : 'textfield',
													fieldLabel : '项目编号',
													name : 'projectnum',
													allowBlank : false,
													anchor : '95%'
												}, {
													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '论证书',

													name : 'certificates',
													anchor : '95%'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '招标登记',

													name : 'tenderregistration',
													anchor : '95%'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '定标',
													name : 'calibration',
													anchor : '95%'
												}, {
													xtype : 'departmentComboBox',
													fieldLabel : '签约合同部门',
													hiddenName : 'contractsigningdepartment'
												}]
									}, {
										xtype : 'panel',
										layout : 'form',
										columnWidth : .33,
										border : false,
										labelWidth : 93,
										labelWidth : 80,
										defaults : {
											anchor : '95%'
										},
										items : [{

													xtype : 'textfield',
													format : 'Y-m-d',
													fieldLabel : '项目名称',
													name : 'projectname',
													allowBlank : false
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '技术指标确定',
													name : 'technicalindicators'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '发标书',
													name : 'issuedtenders'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '签定技术协议',
													name : 'signedagreement'
												}]
									}, {
										xtype : 'panel',
										layout : 'form',
										columnWidth : .33,
										border : false,
										labelWidth : 80,
										defaults : {
											anchor : '95%'
										},
										items : [{

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '措施卡片',
													name : 'measurescard',
													allowBlank : false
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '信息发布',
													name : 'informationdissemination'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '评标书',
													name : 'bidevaluation'
												}, {

													xtype : 'datefield',
													format : 'Y-m-d',
													fieldLabel : '分发签定合同',
													name : 'contractsigning'
												}]
									}]
						})
				executiveManagement.entrusttenderForm.superclass.initComponent.call(this);
			}
		})
Ext.reg('entrusttenderForm', executiveManagement.entrusttenderForm);