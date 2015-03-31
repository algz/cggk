
/**
 * 多行表头组定义,仅定义合并列,即非最末行表头.EXTJS有示例. new Ext.grid.GridPanel({plugins: group,...})
 * 
 * @type
 * 
 * var group = new Ext.ux.grid.ColumnHeaderGroup({//注:数组元素也为数组类型 rows :
 * [[{header : '',colspan : 5}, {header : '签定单位',colspan : 4,align : 'center'},
 * {header : '',colspan : 5}]] });
 * 
 */
// 1、引入命名空间
Ext.namespace("contractManagement.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class contractManagement.mainGrid
 * @extends Ext.grid.GridPanel
 */
contractManagement.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '合同管理', // 扩展时初始化
	id : 'contractManagementGrid', // 对象名+类型后缀(Grid)
	stripeRows : true, // 隔行变色，区分表格行
	listeners : {
		activate : function(grid) {
			grid.store.load();
		}
	},
	contracttype : 2,// 合同类型:1或空设备类型;2工程类型
	queryContract : function(value) { // 查看合同详情
		var win = Ext.getCmp('contractEditorWin');
		if (!win) {
			win = new Ext.Window({
						id : 'contractEditorWin',
						title : '合同详情查看',
						width : 600,
						modal : true,
						items : [{
									xtype : 'contractEditorForm',
									id : 'contractEditorForm',
									isEdit : false,
									loadForm : function(form, fileForm) {
										var rec = Ext.getCmp('contractManagementGrid').store.getById(value);
										form.getForm().loadRecord(rec);
										form.getForm().findField('partyb').setValue(rec.get('partybname'));
										fileForm.getForm().loadRecord(rec);
									}
								}],
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
	storeUrl : '../JSON/deviceContractmanagementRemote.getGridData?d=' + new Date(),
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : this.storeUrl,
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'contractid'
							}, ['contractid', 'contractcode', 'contractname', 'partyb', 'partybname', 'amount', 'amountUnit', 'secrecy', 'partya', 'partya_name', 'operatorid',
									'equipregistId', 'projectnum', 'projectname', 'contractmanager', 'leader', 'status', 'remark', 'equipregistId', 'fileid', 'filename',
									'contracttype', 'contractlevel','projectcategorys']),
					baseParams : {
						contracttype : grid.contracttype,
						start : 0,
						limit : 20
					}
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.applyIf(this, {
			sm : sm,
			store : store,
			plugins : new Ext.ux.grid.ColumnHeaderGroup({// 注:数组元素也为数组类型
				rows : [[{
							header : '',
							colspan : 7
						}, {
							header : '签定单位',
							colspan : 4,
							align : 'center'
						}, {
							header : '',
							colspan : 4
						}]]
			}),
			columns : [sm, {
						header : '项目编号',
						dataIndex : 'projectnum',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							return "<a href='javascript:void(0);' onclick=contractManagement.mainGrid.prototype.queryContract('" + record.get('contractid') + "')>" + value
									+ "</a>";;
						}
					}, {
						header : '项目名称',
						dataIndex : 'projectname',
						width : 100,
						sortable : true
					}, 
//						{
//						header : '项目类别',
//						dataIndex : 'projectcategorys',
//						width : 100,
//						sortable : true,
//						renderer : function(value){
//							if(value == 1){
//								return '新建';
//							}else if(value == 2){
//								return '大修';
//							}
//						}
//					},
					{
						header : '状态',
						dataIndex : 'status',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var status = record.get('status');
							if (status == 1) {
								return '<span style="color:red;">编制中</span>';
							} else if (status == -1) {
								return '<span style="color:red;">已退回</span>';
							} else if (status == 2) {
								return '审批中';
							} else if (status == 3) {
								return '<span style="color:green">已审批</span>';
							} else {
								return value;
							}
						}
					}, {
						header : '合同编号',
						dataIndex : 'contractcode',
						width : 100,
						sortable : true
					}, {
						header : '合同名称',
						dataIndex : 'contractname',
						width : 100,
						sortable : true
					}, {
						header : '乙方',
						dataIndex : 'partybname',
						width : 100,
						sortable : true
					}, {
						header : '合同级别',
						dataIndex : 'contractlevel',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							if (record.get('contractlevel') == 1) {
								return '股份合同';
							} else if (record.get('contractlevel') == 2) {
								return '集团合同';
							} else {
								return value;
							}
						}
					}, {
						header : '单位名称',
						dataIndex : 'partya',
						width : 100,
						sortable : true
					}, {
						header : '经办人',
						dataIndex : 'operatorid',
						width : 100,
						sortable : true
					}, {
						header : '合同管理员',
						dataIndex : 'contractmanager',
						width : 100,
						sortable : true
					}, {
						header : '行政分管领导',
						dataIndex : 'leader',
						width : 100,
						sortable : true
					}, {
						header : '金额',
						dataIndex : 'amount',
						width : 100,
						sortable : true
					}, {
						header : '金额单位',
						dataIndex : 'amountUnit',
						width : 100,
						sortable : true
					}, {
						header : '合同秘级',
						dataIndex : 'secrecy',
						width : 100,
						sortable : true
					}, {
						header : '审批记录',
						dataIndex : '',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var id = record.get('contractid');
							if (record.get('status') == 3) {
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
							}
						}
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
						projectDataType : 3,
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
						disabled : main.CONTRACT,
						handler : function() {
							var win = new Ext.Window({
										title : '合同添加窗口',
										width : 600,
										height : 360,
										layout : 'fit',
										modal : true,
										items : [{
													xtype : 'contractEditorForm',
													contracttype : grid.contracttype
												}],
										buttons : [{
													text : '确定',
													handler : function() {
														var form = win.findById("contractEditorForm");
														var fileform = Ext.getCmp("fileFormPanel");
														var data = form.getForm().getValues();
														if (!form.getForm().isValid() || !fileform.getForm().isValid()) {
															return;
														}

														// ******************
														fileform.getForm().doAction('submit', {
																	waitMsg : '正在保存数据，请稍候...',
																	waitTitle : '提示',
																	url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
																	method : 'post',
																	success : function(form, action) {
																		var file = action.result;
																		Ext.Ajax.request({
																					url : '../JSON/deviceContractmanagementRemote.saveDeviceContractmanagement?d=' + new Date(),
																					method : 'post',
																					waitMsg : '数据加载中，请稍后....',
																					params : {
																						contractid : data.contractid,
																						contracttype : data.contracttype,
																						contractlevel : data.contractlevel,
																						equipregistId : data.equipregistId,
																						contractcode : data.contractcode,
																						partyb : data.partyb,
																						amount : data.amount,
																						projectname : data.projectname,
																						contractname : data.contractname,// 合同名称
																						amountUnit : data.amountUnit,
																						secrecy : data.secrecy,
																						partya : data.partya,
																						contractmanager : data.contractmanager,
																						operatorid : data.operatorid,
																						leader : data.leader,
																						fileid : file.fileId,
																						filename : file.fileName,
																						status : 1,
																						projectcategorys : data.projectcategorys=='新建'?1:2//项目类别
																					},
																					success : function(response, opts) {
																						var obj = Ext.decode(response.responseText);
																						if (obj.success == true) {
																							Ext.getCmp('contractManagementGrid').store.load()
																							win.close();
																						} else {

																						}
																					},
																					failure : function(response, opts) {
																						win.close();
																					}
																				});

																	},
																	failure : function(form, action) {
																		Ext.Msg.alert('提示', "保存失败");
																	}
																})
														return;
														// ******************

													}
												}, {
													text : '取消',
													handler : function() {
														win.close();
													}
												}]

									})
							win.show();
						}
					}, '-', {
						text : '修改',
						iconCls : 'edit1',
						disabled :main.CONTRACT,
						handler : function() {
							var rec = grid.getSelectionModel().getSelected();
							if(grid.getSelectionModel().getCount()!=1){
								Ext.Msg.alert('提示','请选择一条记录!');
								return ;
							}
							if (rec == null || (rec.get('status') != 1&&rec.get('status') != -1)) {
								Ext.Msg.alert('提示', '请选择编制中的记录!');
								return;
							}
							var win = Ext.getCmp();
							if (!win) {
								win = new Ext.Window({
											id : 'contractEditorWin',
											title : '合同编辑窗口',
											width : 600,
											modal : true,
											items : [{
														xtype : 'contractEditorForm',
														contracttype : grid.contracttype,
														loadForm : function(form, fileForm) {
															var rec = grid.getSelectionModel().getSelected();
															form.getForm().loadRecord(rec);
															fileForm.getForm().loadRecord(rec);

															var store = form.getForm().findField('partyb').getStore();
															var temrectype = store.recordType;
															var temrec = new temrectype({
																		text : rec.get('partybname'),
																		value : rec.get('partyb')
																	})
															store.add(temrec);
														}
													}],
											buttons : [{
														text : '确定',
														handler : function() {

															var form = win.findById("contractEditorForm");
															var fileform = Ext.getCmp('fileFormPanel');
															var data = form.getForm().getValues();
															if (!form.getForm().isValid() || !fileform.getForm().isValid()) {
																return;
															}

															// ******************

															fileform.getForm().doAction('submit', {
																		waitMsg : '正在保存数据，请稍候...',
																		waitTitle : '提示',
																		url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
																		method : 'post',
																		success : function(form, action) {
																			var file = action.result;
																			Ext.Ajax.request({
																						url : '../JSON/deviceContractmanagementRemote.saveDeviceContractmanagement?d=' + new Date(),
																						method : 'post',
																						waitMsg : '数据加载中，请稍后....',
																						params : {
																							contractid : data.contractid,
																							contracttype : data.contracttype,
																							contractlevel : data.contractlevel,
																							equipregistId : data.equipregistId,
																							contractcode : data.contractcode,
																							partyb : data.partyb,
																							amount : data.amount,
																							projectname : data.projectname,
																							contractname : data.contractname,// 合同名称
																							amountUnit : data.amountUnit,
																							secrecy : data.secrecy,
																							partya : data.partya,
																							contractmanager : data.contractmanager,
																							operatorid : data.operatorid,
																							leader : data.leader,
																							fileid : file.fileId,
																							filename : file.fileName,
																							status : 1
																						},
																						success : function(response, opts) {
																							var obj = Ext.decode(response.responseText);
																							if (obj.success == true) {
																								grid.store.load();
																								win.close();
																							} else {

																							}
																						},
																						failure : function(response, opts) {
																							win.close();
																						}
																					});

																		},
																		failure : function(form, action) {
																			Ext.Msg.alert('提示', "保存失败");
																		}
																	})
															return;
															// ******************

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
					}, '-', {
						text : '删除',
						iconCls : 'del1',
						disabled : main.CONTRACT,
						handler : function() {
							// var rec = grid.getSelectionModel().getSelected();
							var recs = grid.getSelectionModel().getSelections();
							var arr = new Array();
							if (recs.length == 0) {
								Ext.Msg.alert('提示', '请选择记录!');
								return;
							}
							var bool = true
							for (var i = 0; i < recs.length; i++) {
								arr.push(recs[i].get('contractid'));
								if (recs[i].get('status') != 1) {
									Ext.Msg.alert('提示', '请选择编制中的数据!');
									return;
								}
							}
							Ext.Ajax.request({
										url : '../JSON/deviceContractmanagementRemote.deleteDeviceContractmanagement',
										method : 'post',
										waitMsg : '数据加载中，请稍后....',
										params : {
											contractid : Ext.util.JSON.encode(arr)
											// rec.get('contractid')
										},
										success : function(response, opts) {
											var obj = Ext.decode(response.responseText);
											if (obj.success == true) {
												grid.store.load();
											} else {
												Ext.Msg.alert('提示', obj.msg);
											}
										},
										failure : function(response, opts) {
											Ext.Msg.alert('提示', obj.msg);
										}
									});
						}
					}, '-', {
						text : '送审',
						iconCls : 'icon-importTasks',
						disabled : main.CONTRACT,
						handler : function() {
							var recs = grid.getSelectionModel().getSelections();
							var stock_arr = new Array();// 股份
							var group_arr = new Array();// 集团
							if (recs.length == 0) {
								Ext.Msg.alert('提示', '请选择一条记录!');
								return;
							}
							var bool = true
							for (var i = 0; i < recs.length; i++) {
								if (recs[i].get('contractlevel') == 1) {// 股份
									stock_arr.push(recs[i].get('contractid'));
								} else if (recs[i].get('contractlevel') == 2) {// 集团
									group_arr.push(recs[i].get('contractid'));
								} else {
									Ext.Msg.alert('提示', '选择的数据中没有正确的合同级别!');
									return;
								}
								if (recs[i].get('status') != 1) {
									Ext.Msg.alert('提示', '请选择编制中的数据!');
									return;
								}
							}// ''
							if (stock_arr.length != 0) {
								Untils.approvePanel.submit('471913', "工程项目合同管理(股份)", "工程项目合同管理(股份)", stock_arr, "ContractManagement2", true, function() {
											// Ext.Msg.alert('提示', '送审成功!');
											grid.store.load();
										}, function() {
											// Ext.Msg.alert('提示', '提交失败!');
										})
							}
							if (group_arr.length != 0) {
								Untils.approvePanel.submit('472201', "工程项目合同管理(集团)", "工程项目合同管理(集团)", group_arr, "ContractManagementGroup2", true, function() {
											// Ext.Msg.alert('提示', '送审成功!');
											grid.store.load();
										}, function() {
											// Ext.Msg.alert('提示', '提交失败!');
										})
							}

						}
					}]
		})
		contractManagement.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('contractManagementMainGrid', contractManagement.mainGrid);// 第一个参数为自定义控件的xtype

Ext.ns('contractManagement.contractEditorForm');
/**
 * 设备合同管理表单
 * 
 * @class contractManagement.contractEditorForm
 * @extends Ext.Panel
 */
contractManagement.contractEditorForm = Ext.extend(Ext.Panel, {
			border : false,
			isEdit : true,// 是否编辑状态,默认为true
			/**
			 * 重写formPanel加载调用方法
			 * 
			 * @param {}
			 *            form form文本输入区
			 * @param {}
			 *            fileForm from文件上传区
			 */
			loadForm : function(form, fileForm) {
			},
			contracttype : 2,// 合同类型:1设备类型;2工程类型
			initComponent : function() {
				var panel = this;
				var isEdit = this.isEdit;
				Ext.applyIf(this, {
							items : [{
										xtype : 'form',
										id : 'contractEditorForm',
										border : false,
										items : [{
													xtype : 'panel',
													layout : 'column',
													border : false,
													items : [{
																xtype : 'panel',
																layout : 'form',
																columnWidth : .5,
																border : false,
																labelWidth : 60,
																bodyStyle : 'padding:5px;',
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			xtype : 'hidden',
																			name : 'contractid'
																		}, {
																			xtype : 'hidden',
																			name : 'contracttype',
																			value : panel.contracttype
																		}, {
																			xtype : 'hidden',
																			id : 'equipregistId',
																			name : 'equipregistId'
																		}, {
																			xtype : this.isEdit ? 'deviceProjectComboBox' : 'textfield',
																			fieldLabel : '项目编号',
																			allowBlank : false,
																			name : 'projectnum',
																			projectDataType : '3',
																			comboBoxURL : '../JSON/engineeringProject_UtilRemote.getProjectData',
																			listeners : {
																				select : function(combo, record, index) {
																					var projectname = record.get('projectname');
																					var projectid = record.get('projectid');
																					var projectcategorys = record.get('projectcategorys')==1?'新建':'大修';
																					Ext.getCmp('contractEditorForm').findById('projectname').setValue(projectname)
																					Ext.getCmp('contractEditorForm').findById('equipregistId').setValue(projectid);
																					Ext.getCmp('contractEditorForm').findById('projectcategorys').setValue(projectcategorys);

																				}
																			}
																		}, {
																			xtype : 'textfield',
																			fieldLabel : '合同编号',
																			name : 'contractcode',
																			allowBlank : false,
																			maxLength : 50,
																			maxLengthText : '最大50个字符!',
																			readOnly : !panel.isEdit
																		}, {
																			xtype : 'combo',
																			fieldLabel : '乙方',
																			mode : "remote",
																			forceSelection : true,
																			allowBlank : false,
																			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
																			emptyText : '请选择...', // 没有默认值时,显示的字符串
																			store : new Ext.data.JsonStore({ // 填充的数据
																				url : "../JSON/untilsRemote.getSupplierData",
																				fields : new Ext.data.Record.create(['text', 'value']), // 也可直接为["text","value"]
																				root : "results",
																				totalProperty : 'totalProperty'
																			}),
																			pageSize : 10,
																			id : 'partTwo',
																			hiddenName : 'partyb',// 不能与name相同.
																			// hiddenValue:'value',
																			valueField : 'value', // 传送的值
																			displayField : 'text', // UI列表显示的文本
																			readOnly : !panel.isEdit
																		}, {
																			xtype : 'textfield',
																			name : 'amountUnit',
																			fieldLabel : '金额单位',
																			allowBlank : false,
																			value : '万元',
																			maxLength : 50,
																			maxLengthText : '最大50个字符!',
																			readOnly : true
																			// !panel.isEdit
																	}	, {
																			xtype : 'combo',
																			hiddenName : 'contractlevel',
																			// 作为FORM表单提交时的参数名,并且hiddenName!=id
																			// hiddenName
																			// :
																			// 'yn_life',//
																			// 创建一个新的控件,id=hiddenName
																			fieldLabel : '合同级别',
																			typeAhead : true,// 必须项
																			triggerAction : 'all',// 必须项
																			lazyRender : true,
																			resizable : true,// 是否手动扩展大小,默认false
																			mode : 'local',
																			forceSelection : true,// 限制输入范围在可选择的文本内
																			editable : false,// 不允许输入,只能选择文本列表
																			anchor : '95%',
																			store : new Ext.data.ArrayStore({
																						id : 0,
																						fields : ['value', 'text'],
																						data : [[1, '股份公司'], [2, '集团公司']]
																					}),
																			valueField : 'value',
																			value : 1,
																			displayField : 'text'
																		}]
															}, {
																xtype : 'panel',
																layout : 'form',
																columnWidth : .5,
																border : false,
																labelWidth : 60,
																bodyStyle : 'padding:5px;',
																defaultType : 'textfield',
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			fieldLabel : '项目名称',
																			id : 'projectname',
																			name : 'projectname',
																			readOnly : true
																		}, {
																			name : 'contractname',
																			fieldLabel : '合同名称',
																			allowBlank : false,
																			maxLength : 50,
																			maxLengthText : '最大50个字符!'
																		}, {
																			xtype : 'numberfield',
																			fieldLabel : '金额',
																			name : 'amount',
																			allowDecimals : true,
																			allowBlank : false,
																			decimalPrecision : 4,// 小数位数
																			maxLength : 20,// 最大长度
																			maxLengthText : '不能超过10个字符，请重新输入！',
																			maxValue : 999999999
																			// 最大值
																	}	, {
																			name : 'secrecy',
																			fieldLabel : '合同密级',
																			// allowBlank
																			// :
																			// false,
																			maxLength : 50,
																			maxLengthText : '最大50个字符!'
																		}, {
																			xtype : 'hidden',
																			id : 'projectcategorys',
																			name : 'projectcategorys',
																			fieldLabel : '项目类别',
																			readOnly : true
																		}]
															}]
												}, {
													xtype : 'panel',
													border : false,
													bodyStyle : 'padding:5px;',
													items : [{
																xtype : 'fieldset',
																title : '签定单位',
																layout : 'column',
																items : [{
																			xtype : 'panel',
																			layout : 'form',
																			columnWidth : .5,
																			border : false,
																			labelWidth : 70,
																			defaults : {
																				anchor : '95%'
																			},
																			items : [{
																						xtype : 'textfield',
																						fieldLabel : '单位名称',
																						id : 'partya',
																						name : 'partya',
																						allowBlank : false,
																						maxLength : 50,
																						maxLengthText : '最大50个字符!',
																						readOnly : true,
																						listeners : {
																							focus : function(field) {
																								if (panel.isEdit) {
																									userMultiselect.init(function(e) {
																												if (e.store.getCount() > 1) {
																													Ext.Msg.alert('提示', '请选择一条记录!');
																													return;
																												} else {
																													var rec = e.store.getAt(0);
																													field.setValue(rec.get('ginstitutename'));// 部门名称
																													Ext.getCmp('operatorid').setValue(rec.get('truename'));
																												}
																												e.win.close();
																											});
																								}
																							}
																						}
																					}, {
																						xtype : 'textfield',
																						name : 'contractmanager',
																						fieldLabel : '合同管理员',
																						allowBlank : false,
																						maxLength : 50,
																						maxLengthText : '最大50个字符!',
																						readOnly : true,
																						listeners : {
																							focus : function(field) {
																								if (panel.isEdit) {
																									userMultiselect.init(function(e) {
																												if (e.store.getCount() > 1) {
																													Ext.Msg.alert('提示', '请选择一条记录!');
																													return;
																												} else {
																													var rec = e.store.getAt(0);
																													field.setValue(rec.get('truename'));
																												}
																												e.win.close();
																											});
																								}
																							}
																						}
																					}]
																		}, {
																			xtype : 'panel',
																			layout : 'form',
																			columnWidth : .5,
																			labelWidth : 80,
																			border : false,
																			defaults : {
																				anchor : '95%'
																			},
																			items : [{
																						xtype : 'hidden',
																						id : 'fileid',
																						name : 'fileid'
																					}, {
																						xtype : 'textfield',
																						fieldLabel : '经办人',
																						readOnly : true,
																						allowBlank : false,
																						maxLength : 50,
																						maxLengthText : '最大50个字符!',
																						id : 'operatorid',
																						name : 'operatorid'
																					}, {
																						xtype : 'textfield',
																						name : 'leader',
																						fieldLabel : '行政分管领导',
																						allowBlank : false,
																						maxLength : 50,
																						maxLengthText : '最大50个字符!',
																						listeners : {
																							focus : function(field) {
																								if (panel.isEdit) {
																									userMultiselect.init(function(e) {
																												if (e.store.getCount() > 1) {
																													Ext.Msg.alert('提示', '请选择一条记录!');
																													return;
																												} else {
																													var rec = e.store.getAt(0);
																													field.setValue(rec.get('truename'));
																												}
																												e.win.close();
																											});
																								}
																							}
																						}
																					}]
																		}]
															}]
												}]
									}, {
										xtype : 'form',
										border : false,
										labelWidth : 60,
										id : 'fileFormPanel',
										bodyStyle : 'padding:5px;',
										fileUpload : true,
										items : [{
													xtype : !panel.isEdit ? 'hidden' : 'fileuploadfield',
													id : 'form-file',
													fieldLabel : '上传附件',
													name : 'filename',
													anchor : '90%',
													buttonText : '浏览...',
													allowBlank : false,
													blankText : '不能为空!'
												}, {
													xtype : panel.isEdit ? 'hidden' : 'displayfield',
													id : 'form-filename',
													name : 'filename',
													fieldLabel : '合同文件',
													listeners : {
														afterrender : function(field) {
															var ID = Ext.getCmp('fileid').getValue();
															var ORIGINALNAME = Ext.getCmp('form-file').getValue();
															var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
																	+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" + ORIGINALNAME + "</a>";
															field.setValue(value);
														}
													}
												}]
									}]
						});
				contractManagement.contractEditorForm.superclass.initComponent.call(this);
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				contractManagement.contractEditorForm.superclass.onRender.call(this, ct, position);// 必须放在开始
				this.loadForm(this.findById("contractEditorForm"), this.findById('fileFormPanel'));
			}
		});
Ext.reg('contractEditorForm', contractManagement.contractEditorForm);// 第一个参数为自定义控件的xtype
