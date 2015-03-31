
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
Ext.namespace("inspectionApplication.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class inspectionApplication.mainGrid
 * @extends Ext.grid.GridPanel
 */
inspectionApplication.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '验收任务管理', // 扩展时初始化
	id : 'inspectionApplicationGrid', // 对象名+类型后缀(Grid)
	stripeRows : true, // 隔行变色，区分表格行
	listeners : {
		activate : function(grid) {
			grid.store.load();
		}
	},
	contracttype : 2,// 合同类型:1或空设备类型;2工程类型
	queryContract : function(value) { // 查看合同详情
		var win = Ext.getCmp('inspectionApplicationEditorWin');
		if (!win) {
			win = new Ext.Window({
						id : 'inspectionApplicationEditorWin',
						title : '固定资产项目验收申请表',
						width : 600,
						modal : true,
						items : [{
									xtype : 'panel',// 'inspectionEditorForm',
									id : 'inspectionEditorForm',
									isEdit : false,
									loadForm : function(form, fileForm) {
										var rec = Ext.getCmp('inspectionApplicationGrid').store.getById(value);
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
	storeUrl : '../JSON/engineeringInspectionApplicationRemote.getGridData?d=' + new Date(),
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
								id : 'inspectioapplicatioid'
							}, ['inspectioapplicatioid', {
										name : 'applicationtime',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, 'projectdirector', 'projectdirectortel', 'suppliersid', 'supplierscontact', 'supplierstel', 'administrativeunit', 'opinion',
									'civilregistid', 'projectname', 'status', 'administrativeunit', 'suppliersname', 'useunit']),
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
					columns : [sm, {
						header : '项目名称',
						dataIndex : 'projectname',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							return value;
//							return "<a href='javascript:void(0);' onclick=inspectionApplication.mainGrid.prototype.queryContract('" + record.get('contractid') + "')>" + value
//									+ "</a>";;
						}
					}, {
						header : '申请验收时间',
						dataIndex : 'applicationtime',
						width : 100,
						sortable : true,
						renderer : Ext.util.Format.dateRenderer('Y-m-d')
					}, {
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
						header : '实施主管单位',
						dataIndex : 'administrativeunit',
						width : 100,
						sortable : true
					}, {
						header : '使用单位',
						dataIndex : 'useunit',
						width : 100,
						sortable : true
					}, {
						header : '项目主管',
						dataIndex : 'projectdirector',
						width : 100,
						sortable : true
					}, {
						header : '项目主管联系电话',
						dataIndex : 'projectdirectortel',
						width : 100,
						sortable : true
					}, {
						header : '合同厂商',
						dataIndex : 'suppliersname',
						width : 100,
						sortable : true
					}, {
						header : '厂商联系人',
						dataIndex : 'supplierscontact',
						width : 100,
						sortable : true
					}, {
						header : '厂商联系电话',
						dataIndex : 'supplierstel',
						width : 100,
						sortable : true
					}, {
						header : '实施主管单位意见',
						dataIndex : 'opinion',
						width : 100,
						sortable : true
					}, {
						header : '审批记录',
						dataIndex : '',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var id = record.get('inspectioapplicatioid');
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
							}),
					tbar : ['-', {
								text : '新建',
								iconCls : 'add1',
								disabled : main.CONTRACT,
								handler : function() {
									var win = new Ext.Window({
												title : '验收申请表添加窗口',
												width : 600,
												height : 190,// :260,
												layout : 'fit',
												modal : true,
												items : [{
															xtype : 'inspectionEditorForm',
															contracttype : grid.contracttype
														}],
												buttons : [{
															text : '确定',
															handler : function() {
																var form = win.findById("inspectionEditorForm");
																var data = form.getForm().getValues();
																if (!form.getForm().isValid()) {
																	return;
																}
																Ext.Ajax.request({
																			url : '../JSON/engineeringInspectionApplicationRemote.saveInspectionApplication?d=' + new Date(),
																			method : 'post',
																			waitMsg : '数据加载中，请稍后....',
																			params : {
																				inspectioapplicatioid : data.inspectioapplicatioid,
																				civilregistid : data.civilregistid,
																				applicationtime : data.applicationtime,
																				suppliersid : data.suppliersid,
																				supplierscontact : data.supplierscontact,
																				supplierstel : data.supplierstel,
																				projectdirectortel : data.projectdirectortel,
																				administrativeunit : data.administrativeunit,
																				status : 1
																			},
																			success : function(response, opts) {
																				var obj = Ext.decode(response.responseText);
																				if (obj.success == true) {
																					Ext.getCmp('inspectionApplicationGrid').store.load()
																					win.close();
																				} else {

																				}
																			},
																			failure : function(response, opts) {
																				win.close();
																			}
																		});
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
									if (grid.getSelectionModel().getCount() != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return;
									}
									if (rec == null || (rec.get('status') != 1 && rec.get('status') != -1)) {
										Ext.Msg.alert('提示', '请选择编制中的记录!');
										return;
									}
									var win = Ext.getCmp();
									if (!win) {
										win = new Ext.Window({
													id : 'contractEditorWin',
													title : '验收申请表编辑窗口',
													width : 600,
													height : 190,// :260,
													modal : true,
													items : [{
																xtype : 'inspectionEditorForm',
																contracttype : grid.contracttype,
																loadForm : function(form) {
																	var rec = grid.getSelectionModel().getSelected();
																	form.getForm().loadRecord(rec);

																	var store = form.getForm().findField('suppliersid').getStore();
																	var temrectype = store.recordType;
																	var temrec = new temrectype({
																				text : rec.get('suppliersname'),
																				value : rec.get('suppliersid')
																			})
																	form.getForm().findField('suppliersid').setValue(rec.get('suppliersid'));
																	store.add(temrec);

																	var project_store = form.getForm().findField('projectname').getStore();
																	var project_temrectype = project_store.recordType;
																	var project_temrec = new project_temrectype({
																				projectname : rec.get('projectname'),
																				projectid : rec.get('civilregistid')
																			})
																	form.getForm().findField('projectname').setValue(rec.get('civilregistid'));
																	project_store.add(project_temrec);

																}
															}],
													buttons : [{
																text : '确定',
																handler : function() {

																	var form = win.findById("inspectionEditorForm");
																	// var
																	// fileform
																	// =
																	// Ext.getCmp('fileFormPanel');
																	var data = form.getForm().getValues();
																	if (!form.getForm().isValid()) {
																		return;
																	}

																	// ******************
																	Ext.Ajax.request({
																				url : '../JSON/engineeringInspectionApplicationRemote.saveInspectionApplication?d=' + new Date(),
																				method : 'post',
																				waitMsg : '数据加载中，请稍后....',
																				params : {
																					inspectioapplicatioid : data.inspectioapplicatioid,
																					civilregistid : data.civilregistid,
																					applicationtime : data.applicationtime,
																					suppliersid : data.suppliersid,
																					supplierscontact : data.supplierscontact,
																					supplierstel : data.supplierstel,
																					projectdirectortel : data.projectdirectortel,
																					administrativeunit : data.administrativeunit,
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
									// var rec =
									// grid.getSelectionModel().getSelected();
									var recs = grid.getSelectionModel().getSelections();
									var arr = new Array();
									if (recs.length == 0) {
										Ext.Msg.alert('提示', '请选择记录!');
										return;
									}
									var bool = true
									for (var i = 0; i < recs.length; i++) {
										arr.push(recs[i].get('inspectioapplicatioid'));
										if (recs[i].get('status') != 1) {
											Ext.Msg.alert('提示', '请选择编制中的数据!');
											return;
										}
									}
									Ext.Msg.confirm("提示","是否删除数据?",function(btn){
										if(btn=="yes"){
											Ext.Ajax.request({
												url : '../JSON/engineeringInspectionApplicationRemote.deleteInspectionApplication',
												method : 'post',
												waitMsg : '数据加载中，请稍后....',
												params : {
													inspectioapplicatioid : Ext.util.JSON.encode(arr)
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
									})
									
								}
							}, '-', {
								text : '送审',
								iconCls : 'icon-importTasks',
								disabled : main.CONTRACT,
								handler : function() {
									var recs = grid.getSelectionModel().getSelections();
									var arr = new Array();// 股份
									if (recs.length == 0) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return;
									}
									var bool = true
									for (var i = 0; i < recs.length; i++) {
										arr.push(recs[i].get('inspectioapplicatioid'));
										if (recs[i].get('status') != 1) {
											Ext.Msg.alert('提示', '请选择编制中的数据!');
											return;
										}
									}// ''
									if (arr.length != 0) {
										Untils.approvePanel.submit('472202', "土建工程验收审批", "土建工程验收审批", arr, "EngineeringInspectionApplication", true, function() {
													// Ext.Msg.alert('提示',
													// '送审成功!');
													grid.store.load();
												}, function() {
													// Ext.Msg.alert('提示',
													// '提交失败!');
												})
									}

								}
							}]
				})
		inspectionApplication.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('inspectionApplicationMainGrid', inspectionApplication.mainGrid);// 第一个参数为自定义控件的xtype

Ext.ns('inspectionApplication.inspectionEditorForm');
/**
 * 设备合同管理表单
 * 
 * @class inspectionApplication.inspectionEditorForm
 * @extends Ext.Panel
 */

inspectionApplication.inspectionEditorForm = Ext.extend(Ext.Panel, {
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
										id : 'inspectionEditorForm',
										border : false,
										bodyStyle : 'padding:5px;',
										labelWidth : 60,
										defaults : {
											anchor : '95%'
										},
										items : [{
													xtype : 'textfield',
													fieldLabel : '使用单位',
													id : 'inspection_useunit',
													readOnly : true,
													name : 'useunit'
												}, {
													xtype : 'panel',
													layout : 'column',
													border : false,
													items : [{
																xtype : 'panel',
																layout : 'form',
																columnWidth : .67,
																labelWidth : 60,
																border : false,
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			xtype : 'hidden',
																			id : 'inspectioapplicatioid'
																		}, {
																			xtype : isEdit ? 'deviceProjectComboBox' : 'textfield',
																			fieldLabel : '项目名称',
																			allowBlank : false,
																			id : 'projectname',
																			hiddenName : 'civilregistid',// 不能与name相同.
																			projectDataType : '3',
																			valueField : "projectid",
																			displayField : "projectname",
																			comboBoxURL : '../JSON/engineeringProject_UtilRemote.getProjectData',
																			listeners : {
																				select : function(combo, record, index) {
																					// Ext.getCmp('inspectionEditorForm').findById('projectname').setValue(projectname);
																					Ext.getCmp('inspectionEditorForm').findById('inspection_useunit').setValue(record
																							.get('useunit'));
																					Ext.getCmp('inspectionEditorForm').findById('inspection_headperson').setValue(record
																							.get('headperson'))

																				}
																			}
																		}]
															}, {
																xtype : 'panel',
																layout : 'form',
																columnWidth : .33,
																labelWidth : 80,
																border : false,
																items : [{
																			xtype : isEdit ? 'datefield' : 'textfield',
																			fieldLabel : '申请验收时间',
																			allowBlank : false,
																			format : 'Y-m-d',
																			value : new Date(),
																			name : 'applicationtime',
																			anchor : '100%'
																		}]
															}]
												}, {
													xtype : 'panel',
													layout : 'column',
													border : false,
													items : [{
																xtype : 'panel',
																layout : 'form',
																columnWidth : .4,
																border : false,
																labelWidth : 80,
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			xtype : 'textfield',
																			fieldLabel : '实施主管单位',
																			allowBlank : false,
																			id : 'administrativeunit'
																		}, {
																			xtype : isEdit ? 'combo' : 'textfield',
																			fieldLabel : '合同厂商',
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
																			id : 'suppliersname',
																			hiddenName : 'suppliersid',// 不能与name相同.
																			// hiddenValue:'value',
																			valueField : 'value', // 传送的值
																			displayField : 'text', // UI列表显示的文本
																			readOnly : !panel.isEdit
																		}]
															}, {
																xtype : 'panel',
																layout : 'form',
																columnWidth : .3,
																border : false,
																labelWidth : 60,
																defaultType : 'textfield',
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			fieldLabel : '项目主管',
																			id : 'inspection_headperson',
																			name : 'projectdirector',
																			readOnly : true
																		}, {
																			name : 'supplierscontact',
																			fieldLabel : '联系人',
																			allowBlank : false,
																			maxLength : 50,
																			maxLengthText : '最大50个字符!'
																		}]
															}, {
																xtype : 'panel',
																layout : 'form',
																columnWidth : .3,
																border : false,
																labelWidth : 60,
																defaultType : 'textfield',
																defaults : {
																	anchor : '100%'
																},
																items : [{
																			fieldLabel : '联系电话',
																			name : 'projectdirectortel'
																		}, {
																			name : 'supplierstel',
																			fieldLabel : '联系电话',
																			allowBlank : false,
																			maxLength : 50,
																			maxLengthText : '最大50个字符!'
																		}]
															}]
												}/*, {
													xtype : isEdit ? 'hidden' : 'textarea',
													fieldLabel : '单位意见',
													name : 'opinion',
													value : '现场完成清理,同意验收.'
												}*/]
									}]
						});
				inspectionApplication.inspectionEditorForm.superclass.initComponent.call(this);
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				inspectionApplication.inspectionEditorForm.superclass.onRender.call(this, ct, position);// 必须放在开始
				this.loadForm(this.findById("inspectionEditorForm"), this.findById('fileFormPanel'));
				Ext.Ajax.request({
							url : '../JSON/auth.getLoginUser',
							method : 'post',
							waitMsg : '数据加载中，请稍后....',
							success : function(response, opts) {
								var obj = Ext.decode(response.responseText);
								Ext.getCmp('administrativeunit').setValue(obj.intstname);
							},
							failure : function(response, opts) {
							}
						});
			}
		});
Ext.reg('inspectionEditorForm', inspectionApplication.inspectionEditorForm);// 第一个参数为自定义控件的xtype
