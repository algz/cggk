var paymentTask = {
	inputWidth : 135,
	limit : 6,
	psId : null,
	pgId : null
};

Ext.override(Ext.form.RadioGroup, {
			getValue : function() {
				var v;
				if (this.rendered) {
					this.items.each(function(item) {
								if (!item.getValue())
									return true;
								v = item.getRawValue();
								return false;
							});
				} else {
					for (var k in this.items) {
						if (this.items[k].checked) {
							v = this.items[k].inputValue;
							break;
						}
					}
				}
				return v;
			},
			setValue : function(v) {
				if (this.rendered)
					this.items.each(function(item) {
								item.setValue(item.getRawValue() == v);
							});
				else {
					for (var k in this.items) {
						this.items[k].checked = this.items[k].inputValue == v;
					}
				}
			}
		});

/**
 * 查找部门信息
 * 
 * @return {}
 */
paymentTask.selectDepartment = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/FixConditionRemote.getDepList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'depcode'
								}, {
									name : 'departmentName'
								}])
			});

	var selectDepartmentValue = new Ext.form.ComboBox({
				id : 'paymentTaskDepartmentValueComboBox',
				name : 'h_depcode',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'depcode',
				fieldLabel : '申请单位(<font color="red">*</font>)',
				store : store,
				valueField : "depcode",
				displayField : "departmentName",
				mode : 'remote',
				// 每页显示数目
				pageSize : paymentTask.limit,
				forceSelection : true,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须指派单位！',
				listeners : {
					'keyup' : function() {
						store.baseParams.inputValue = this.getRawValue();
						store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						this.expand();
					}
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectDepartmentValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	return selectDepartmentValue;
};

/**
 * 负责人信息
 * 
 * @return {}
 */
paymentTask.selectLiabilityPeopel = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/GroupPaymentTaskRemote.getUserList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'userId'
								}, {
									name : 'trueName'
								}])
			});

	var selectLiabilityPeopelValue = new Ext.form.ComboBox({
				id : 'LiabilityPeopelValueComboBox',
				name : 'h_pgLiabilityPeopel',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'pgLiabilityPeopel',
				fieldLabel : '责任人(<font color="red">*</font>)',
				store : store/*new Ext.data.ArrayStore({
							id : 0,
							fields : ['userId', 'trueName'],
							data : []
						})*/,
				valueField : "userId",
				displayField : "trueName",
				mode : 'local',// 'remote',
				// 每页显示数目
				//pageSize : paymentTask.limit,
				//forceSelection : true,
				hideTrigger:true ,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				//resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须指派单位！',
				listeners : {
					focus : function(field) {
						userMultiselect.init(function(e) {
									if (e.store.getCount() > 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return;
									} else {
										var rec = e.store.getAt(0);
										var recordType=field.getStore().recordType;
										var record=new recordType({
										userId:rec.get('userid'),trueName:rec.get('truename')
										})
										field.getStore().add(record)
										//field.getStore().loadData([[rec.get('userid'),rec.get('truename')]])
										field.setValue(rec.get('userid'));
										//Ext.getCmp('operatorid').setValue(rec.get('truename'));
									}
									e.win.close();
								});
					}
				}
			});

	return selectLiabilityPeopelValue;
};

/**
 * 经办人信息
 * 
 * @return {}
 */
paymentTask.selectWorkPeopel = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/GroupPaymentTaskRemote.getUserList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'userId'
								}, {
									name : 'trueName'
								}])
			});

	var selectWorkPeopelValue = new Ext.form.ComboBox({
				id : 'WorkPeopelValueComboBox',
				name : 'h_pgWorkPeopel',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'pgWorkPeopel',
				fieldLabel : '经办人(<font color="red">*</font>)',
				store :store/* new Ext.data.ArrayStore({
							id : 0,
							fields : ['userId', 'trueName'],
							data : []
						})*/,
				valueField : "userId",
				displayField : "trueName",
				mode : 'remote',
				// 每页显示数目
				// : paymentTask.limit,
				forceSelection : true,
				hideTrigger:true ,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须指派单位！',
				listeners : {
					focus : function(field) {
						userMultiselect.init(function(e) {
									if (e.store.getCount() > 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return;
									} else {
										var rec = e.store.getAt(0);
										var recordType=field.getStore().recordType;
										var record=new recordType({
										userId:rec.get('userid'),trueName:rec.get('truename')
										})
										field.getStore().add(record)
										//field.getStore().loadData([[rec.get('userid'),rec.get('truename')]])
										field.setValue(rec.get('userid'));
										//Ext.getCmp('operatorid').setValue(rec.get('truename'));
									}
									e.win.close();
								});
					}
/*					'keyup' : function() {
						store.baseParams.inputValue = this.getRawValue();
						store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						this.expand();
					}*/
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectDepartmentValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	return selectWorkPeopelValue;
};

/**
 * 查找供应商信息
 * 
 * @return {}
 */
paymentTask.selectVendor = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/FixConditionRemote.getVendorList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'vendorId'
								}, {
									name : 'vendorName'
								}])
			});

	var selectVendorValue = new Ext.form.ComboBox({
				id : 'paymentTaskVendorValueComboBox',
				name : 'h_psPayee',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'psPayee',
				fieldLabel : '收款人全称(<font color="red">*</font>)',
				store : store,
				valueField : "vendorId",
				displayField : "vendorName",
				mode : 'remote',
				// 每页显示数目
				pageSize : paymentTask.limit,
				// 值为true时将限定选中的值为列表中的值
				forceSelection : true,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须指派中标单位！',
				listeners : {
					'keyup' : function() {
						store.baseParams.inputValue = this.getRawValue();
						store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						this.expand();
					},
					'select' : function() {
						var selectVendorAccount = Ext.getCmp('paymentTaskVendorAccountValueComboBox');
						paymentTask.createStockPaymentTask.getForm().findField('psBankName').setValue('');
						paymentTask.createStockPaymentTask.getForm().findField('psBankNum').setValue('')
						// selectVendorAccount.hidden=false;
						// paymentTask.createStockPaymentTask.doLayout();
						selectVendorAccount.store.baseParams.vendorId = this.getValue();
						selectVendorAccount.store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						selectVendorAccount.expand();
					}
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectVendorValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	return selectVendorValue;
};

/**
 * 查找供应商开户行信息
 * 
 * @return {}
 */
paymentTask.selectVendorAccount = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/StockPaymentTaskRemote.getVendorAccountList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'psBankName'
								}, {
									name : 'psBankNum'
								}])
			});

	var selectVendorAccountValue = new Ext.form.ComboBox({
				id : 'paymentTaskVendorAccountValueComboBox',
				name : 'h_psBankName',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'psBankName',
				fieldLabel : '银行全称(<font color="red">*</font>)',
				store : store,
				valueField : "psBankNum",
				displayField : "psBankName",
				mode : 'remote',
				// 每页显示数目
				pageSize : paymentTask.limit,
				// 值为true时将限定选中的值为列表中的值
				// forceSelection : true,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				// allowBlank:false,
				// blankText:'必须选择开户信息！',
				listeners : {
					'select' : function() {
						paymentTask.createStockPaymentTask.getForm().findField('psBankNum').setValue(this.getValue());
					}
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectVendorValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	// selectVendorAccountValue.hidden=true;

	return selectVendorAccountValue;
};

/**
 * 查找合同信息
 * 
 * @return {}
 */
paymentTask.selectContract = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/StockPaymentTaskRemote.getContractList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'contractId'
								}, {
									name : 'contractCode'
								}])
			});

	var selectContractValue = new Ext.form.ComboBox({
				id : 'paymentTaskContractValueComboBox',
				name : 'h_contractId',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'contractId',
				fieldLabel : '合同号(<font color="red">*</font>)',
				store : store,
				valueField : "contractId",
				displayField : "contractCode",
				mode : 'remote',
				// 每页显示数目
				pageSize : paymentTask.limit,
				// 值为true时将限定选中的值为列表中的值
				forceSelection : true,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须选择合同号！',
				listeners : {
					'keyup' : function() {
						store.baseParams.inputValue = this.getRawValue();
						store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						this.expand();
					}
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectVendorValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	return selectContractValue;
};

/**
 * 查找合同信息（此包含了1,2期合同的信息），集团公司使用
 * 
 * @return {}
 */
paymentTask.selectGroupContract = function() {

	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/StockPaymentTaskRemote.getContractList",
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'contractId'
								}, {
									name : 'contractCode'
								}])
			});

	var selectContractValue = new Ext.form.ComboBox({
				id : 'paymentTaskGroupContractValueComboBox',
				name : 'h_contractId',
				// 用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName : 'contractId',
				fieldLabel : '合同编号1(<font color="red">*</font>)',
				store : store,
				valueField : "contractId",
				displayField : "contractCode",
				mode : 'remote',
				// 每页显示数目
				pageSize : paymentTask.limit,
				// 值为true时将限定选中的值为列表中的值
				forceSelection : true,
				triggerAction : 'all',
				width : paymentTask.inputWidth,
				emptyText : '请选择...',
				// 弹出选择添加缩放按钮
				resizable : true,
				// 控制下拉列表的宽度
				minListWidth : paymentTask.inputWidth * 2,
				// 校验是否为空
				allowBlank : false,
				blankText : '必须选择合同号！',
				listeners : {
					'keyup' : function() {
						store.baseParams.inputValue = this.getRawValue();
						store.load({
									params : {
										start : 0,
										limit : paymentTask.limit
									}
								});
						this.expand();
					}
				}
			});
	// 默认加载数据
	// store.baseParams.inputValue=selectVendorValue.getRawValue();
	// store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	return selectContractValue;
};

/**
 * 新建支付任务弹窗
 */
paymentTask.createPaymentWin = function(selectType) {
	paymentTask.createStockPaymentTask = new Ext.form.FormPanel({
				frame : true,
				title : '股份公司',
				buttonAlign : 'center',
				autoScroll : true,
				items : [{
							xtype : 'fieldset',
							title : '付款申请信息',
							width : paymentTask.inputWidth * 5.5,
							items : [{
										layout : 'column',
										items : [{
													columnWidth : .98,
													layout : 'form',
													items : [paymentTask.selectDepartment()]
												}, {
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			// //根式限制
																			vtype : 'phone',
																			fieldLabel : '联系电话(<font color="red">*</font>)',
																			name : 'psPhone',
																			width : paymentTask.inputWidth,
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '联系电话不能为空'
																		}]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			fieldLabel : '申请事项(<font color="red">*</font>)',
																			name : 'psContent',
																			width : paymentTask.inputWidth,
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '申请事项不能为空'
																		}]
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'checkboxgroup',
																fieldLabel : '主要附件种类',
																width : paymentTask.inputWidth * 3.5,
																items : [{
																			boxLabel : '报告',
																			inputValue : 1
																		}, {
																			boxLabel : '原始发票',
																			inputValue : 2
																		}, {
																			boxLabel : '内部支票',
																			inputValue : 3
																		}, {
																			boxLabel : '决算书',
																			inputValue : 4
																		}],
																name : 'psAccessoriesType'
															}]
												}, {
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [paymentTask.selectContract()]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '分期付款比例不能为空',
																			vtype : 'percent',
																			fieldLabel : '分期付款比例(<font color="red">*</font>)',
																			name : 'psPaymentScale',
																			width : paymentTask.inputWidth
																		}]
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													name : 'psPlanType',
													items : [{
																xtype : 'radiogroup',
																fieldLabel : '资金计划种类',
																width : paymentTask.inputWidth * 3.5,
																items : [{
																			boxLabel : '计划内',
																			name : 'psPlanType',
																			inputValue : 1
																		}, {
																			boxLabel : '计划外',
																			name : 'psPlanType',
																			inputValue : 2
																		}],
																name : 'psPlanType'
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'textarea',
																name : 'psRemark',
																fieldLabel : '其他信息',
																width : paymentTask.inputWidth * 3.5,
																maxLength : 200,
																maxLengthText : '最多只能输入200个字符。'
															}]
												}]

									}]
						}, {
							xtype : 'fieldset',
							title : '付款额度',
							width : paymentTask.inputWidth * 5.5,
							items : [{
								layout : 'column',
								items : [{
									columnWidth : .98,
									layout : 'column',
									items : [{
												columnWidth : .2,
												layout : 'form',
												items : [{
															xtype : 'label',
															text : '业务申请额度（元）'
														}]
											}, {
												columnWidth : .8,
												layout : 'form',
												items : [{
															xtype : 'textfield',
															vtype : 'money',
															fieldLabel : '小写(<font color="red">*</font>)',
															name : 'psApplicationBrow',
															width : paymentTask.inputWidth,
															// 校验是否为空
															allowBlank : false,
															blankText : '业务申请额度不能为空',
															listeners : {
																'blur' : function() {
																	var result = paymentTask.createStockPaymentTask.getForm().findField('psApplicationBrow').getValue();

																	// 将小写转换为大写显示在输入框中
																	paymentTask.createStockPaymentTask.getForm().findField('psApplicationBrowChina').setValue(util
																			.numForChina(result));
																}
															}
														}, {
															xtype : 'textfield',
															fieldLabel : '大写',
															name : 'psApplicationBrowChina',
															width : paymentTask.inputWidth * 3,
															disabled : true
														}]
											}]
								}, {
									columnWidth : .98,
									layout : 'column',
									items : [{
												columnWidth : .2,
												layout : 'form',
												items : [{
															xtype : 'label',
															text : '财务审核额度（元）'
														}]
											}, {
												columnWidth : .8,
												layout : 'form',
												items : [{
															xtype : 'textfield',
															vtype : 'money',
															fieldLabel : '小写(<font color="red">*</font>)',
															name : 'psAuditingBrow',
															width : paymentTask.inputWidth,
															// 校验是否为空
															allowBlank : false,
															blankText : '财务审核额度不能为空',
															listeners : {
																'blur' : function() {
																	var result = paymentTask.createStockPaymentTask.getForm().findField('psAuditingBrow').getValue();

																	// 将小写转换为大写显示在输入框中
																	paymentTask.createStockPaymentTask.getForm().findField('psAuditingBrowChina')
																			.setValue(util.numForChina(result));
																}
															}

														}, {
															xtype : 'textfield',
															fieldLabel : '大写',
															name : 'psAuditingBrowChina',
															width : paymentTask.inputWidth * 3,
															disabled : true
														}]
											}]
								}]
							}]
						}, {
							xtype : 'fieldset',
							title : '收款人信息',
							width : paymentTask.inputWidth * 5.5,
							items : [{
										layout : 'column',
										items : [{
													columnWidth : .98,
													layout : 'form',
													items : [paymentTask.selectVendor()]
												}, {
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [paymentTask.selectVendorAccount()]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [{
																	xtype : 'textfield',
																	fieldLabel : '银行账号(<font color="red">*</font>)',
																	name : 'psBankNum',
																	width : paymentTask.inputWidth
																		// ,
																		// readOnly:true
																	}]
															}]
												}]
									}]
						}],
				buttons : [{
							text : '保存',
							handler : function() {
								if (paymentTask.createStockPaymentTask.getForm().isValid()) {
									// 获取各组多选框的值
									var psAccessoriesTypes = paymentTask.createStockPaymentTask.getForm().findField('psAccessoriesType').getValue();
									var psAccessoriesType = '';
									for (var i = 0; i < psAccessoriesTypes.length; i++) {
										psAccessoriesType = psAccessoriesType + ',' + psAccessoriesTypes[i].inputValue
									}

									paymentTask.createStockPaymentTask.getForm().submit({
												url : '../JSON/StockPaymentTaskRemote.useStockPaymentTask',
												method : 'POST',
												failure : function(form, action) {
													Ext.MessageBox.show({
																title : '提示信息',
																msg : '获取后台数据失败！',
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.ERROR
															});
												},
												success : function(form, action) {
													// alert(action.response.responseText);
													paymentTask.win.close();
													var store = Ext.getCmp('paymentTaskGrid').store;
													// 起始数
													var start = Ext.getCmp('paymentTaskGrid').getBottomToolbar().cursor;
													// 每页显示总数
													var limit = Ext.getCmp('paymentTaskGrid').getBottomToolbar().pageSize;
													// 添加默认参数
													store.baseParams.psId = paymentTask.selectNum.getValue();
													store.baseParams.term = paymentTask.selectMoneyValue.getValue();
													store.baseParams.money = paymentTask.selectMuchMoney.getValue();
													// 刷新表格
													store.reload({
																params : {
																	start : start,
																	limit : limit
																}
															});
												},
												params : {
													psId : paymentTask.psId,
													psAccessoriesType : psAccessoriesType.substr(1),
													selectType : selectType
												}
											});
								}
							}
						}, {
							text : '取消',
							handler : function() {
								paymentTask.win.close();
							}
						}]
			});

	paymentTask.createGroupPaymentTask = new Ext.form.FormPanel({
				frame : true,
				title : '集团公司',
				buttonAlign : 'center',
				autoScroll : true,
				items : [{
							xtype : 'fieldset',
							title : '财务事项内容',
							width : paymentTask.inputWidth * 5.5,
							items : [{
										xtype : 'textarea',
										name : 'pgFinanceRemark',
										fieldLabel : '财务事项说明',
										width : paymentTask.inputWidth * 3.5,
										maxLength : 200,
										maxLengthText : '最多只能输入200个字符。'
									}]
						}, {
							xtype : 'fieldset',
							title : '申报依据',
							width : paymentTask.inputWidth * 5.5,
							items : [{
										layout : 'column',
										items : [{
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [paymentTask.selectGroupContract()]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			fieldLabel : '合同凭据号(<font color="red">*</font>)',
																			name : 'contractProof',
																			width : paymentTask.inputWidth,
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '申请事项不能为空'
																		}]
															}]
												}, {
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			vtype : 'money',
																			fieldLabel : '合同金额(<font color="red">*</font>)',
																			name : 'contractMoney',
																			width : paymentTask.inputWidth,
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '联系电话不能为空'
																		}]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [{
																			xtype : 'textfield',
																			vtype : 'money',
																			fieldLabel : '累计已付（收）款(<font color="red">*</font>)',
																			name : 'paymentMoney',
																			width : paymentTask.inputWidth,
																			// 校验是否为空
																			allowBlank : false,
																			blankText : '申请事项不能为空'
																		}]
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'textarea',
																fieldLabel : '其他',
																name : 'pgRemark',
																width : paymentTask.inputWidth * 3.5,
																maxLength : 200,
																maxLengthText : '最多只能输入200个字符。'
															}]
												}]
									}]
						}, {
							xtype : 'fieldset',
							title : '审批金额',
							width : paymentTask.inputWidth * 5.5,
							items : [{
										layout : 'column',
										items : [{
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'textfield',
																vtype : 'money',
																fieldLabel : '小写金额(<font color="red">*</font>)',
																name : 'pgAuditingBrow',
																width : paymentTask.inputWidth,
																// 校验是否为空
																allowBlank : false,
																blankText : '审批金额不能为空',
																listeners : {
																	'blur' : function() {
																		var result = paymentTask.createGroupPaymentTask.getForm().findField('pgAuditingBrow').getValue();

																		// 将小写转换为大写显示在输入框中
																		paymentTask.createGroupPaymentTask.getForm().findField('pgAuditingBrowChina').setValue(util
																				.numForChina(result));
																	}
																}
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'textfield',
																fieldLabel : '大写金额',
																name : 'pgAuditingBrowChina',
																width : paymentTask.inputWidth * 3.5,
																disabled : true
															}]
												}, {
													columnWidth : .98,
													layout : 'column',
													items : [{
																columnWidth : .49,
																layout : 'form',
																items : [paymentTask.selectLiabilityPeopel()]
															}, {
																columnWidth : .49,
																layout : 'form',
																items : [paymentTask.selectWorkPeopel()]
															}]
												}, {
													columnWidth : .98,
													layout : 'form',
													items : [{
																xtype : 'textarea',
																fieldLabel : '意见',
																name : 'pgIdea',
																width : paymentTask.inputWidth * 3.5,
																maxLength : 200,
																maxLengthText : '最多只能输入200个字符。'
															}]
												}]
									}]
						}],
				buttons : [{
							text : '保存',
							handler : function() {
								if (paymentTask.createGroupPaymentTask.getForm().isValid()) {
									paymentTask.createGroupPaymentTask.getForm().submit({
												url : '../JSON/GroupPaymentTaskRemote.useGroupPaymentTask',
												method : 'POST',
												failure : function(form, action) {
													Ext.MessageBox.show({
																title : '提示信息',
																msg : '获取后台数据失败！',
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.ERROR
															});
												},
												success : function(form, action) {
													// alert(action.response.responseText);
													paymentTask.win.close();
													var store = Ext.getCmp('paymentTaskGrid').store;
													// 起始数
													var start = Ext.getCmp('paymentTaskGrid').getBottomToolbar().cursor;
													// 每页显示总数
													var limit = Ext.getCmp('paymentTaskGrid').getBottomToolbar().pageSize;
													// 添加默认参数
													store.baseParams.psId = paymentTask.selectNum.getValue();
													store.baseParams.term = paymentTask.selectMoneyValue.getValue();
													store.baseParams.money = paymentTask.selectMuchMoney.getValue();
													// 刷新表格
													store.reload({
																params : {
																	start : start,
																	limit : limit
																}
															});
												},
												params : {
													pgId : paymentTask.pgId,
													selectType : selectType
												}
											});
								}
							}
						}, {
							text : '取消',
							handler : function() {
								paymentTask.win.close();
							}
						}]
			});

	paymentTask.createTab = new Ext.TabPanel({
				height : 400,
				items : [paymentTask.createStockPaymentTask, paymentTask.createGroupPaymentTask],
				activeTab : 0
			});

	// var selectDepartment = Ext.getCmp('paymentTaskDepartmentValueComboBox');
	// var selectVendor = Ext.getCmp('paymentTaskVendorValueComboBox');
	// var selectContract = Ext.getCmp('paymentTaskContractValueComboBox');
	// var selectVendorAccount =
	// Ext.getCmp('paymentTaskVendorAccountValueComboBox');
	// var LiabilityPeopel = Ext.getCmp('LiabilityPeopelValueComboBox');
	// var WorkPeopel = Ext.getCmp('WorkPeopelValueComboBox');
	// var GroupContract = Ext.getCmp('paymentTaskGroupContractValueComboBox');
	// //默认加载一次下拉列表（加载指派）
	// selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
	// selectDepartment.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	// //默认加载一次下拉列表（加载供应商）
	// selectVendor.store.baseParams.inputValue=selectVendor.getRawValue();
	// selectVendor.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	//	
	// //默认加载一次下拉列表（加载合同编号）
	// selectContract.store.baseParams.inputValue=selectContract.getRawValue();
	// selectContract.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	//	
	// //默认加载一次下拉列表（加载供应商开户行）
	// selectVendorAccount.store.baseParams.inputValue=selectVendor.getValue();
	// selectVendorAccount.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	//	
	// //默认加载一次下拉列表（加载负责人）
	// LiabilityPeopel.store.baseParams.inputValue=LiabilityPeopel.getValue();
	// LiabilityPeopel.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	//	
	// //默认加载一次下拉列表（加载经办人）
	// WorkPeopel.store.baseParams.inputValue=WorkPeopel.getValue();
	// WorkPeopel.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });
	//	
	// //默认加载一次下拉列表（加载合同编号）
	// GroupContract.store.baseParams.inputValue=GroupContract.getValue();
	// GroupContract.store.load({
	// params:{
	// start:0,
	// limit:paymentTask.limit
	// }
	// });

	paymentTask.win = new Ext.Window({
				width : 800,
				minWidth : 800,
				modal : true,
				items : [paymentTask.createTab]
			});
	paymentTask.win.show();
}
paymentTask.insertBtn = function(selectType) {
	var btn = new Ext.Button({
				text : '新建',
				disabled : main.PAYMENT,
				handler : function() {
					paymentTask.psId = null;
					paymentTask.pgId = null;
					paymentTask.createPaymentWin(selectType);
					var selectDepartment = Ext.getCmp('paymentTaskDepartmentValueComboBox');
					var selectVendor = Ext.getCmp('paymentTaskVendorValueComboBox');
					var selectContract = Ext.getCmp('paymentTaskContractValueComboBox');
					var selectVendorAccount = Ext.getCmp('paymentTaskVendorAccountValueComboBox');
					var LiabilityPeopel = Ext.getCmp('LiabilityPeopelValueComboBox');
					var WorkPeopel = Ext.getCmp('WorkPeopelValueComboBox');
					var GroupContract = Ext.getCmp('paymentTaskGroupContractValueComboBox');
					// 默认加载一次下拉列表（加载指派）
					selectDepartment.store.baseParams.inputValue = selectDepartment.getRawValue();
					selectDepartment.store.load({
								params : {
									start : 0,
									limit : paymentTask.limit
								}
							});
					// 默认加载一次下拉列表（加载供应商）
					selectVendor.store.baseParams.inputValue = selectVendor.getRawValue();
					selectVendor.store.load({
								params : {
									start : 0,
									limit : paymentTask.limit
								}
							});

					// 默认加载一次下拉列表（加载合同编号）
					selectContract.store.baseParams.inputValue = selectContract.getRawValue();
					selectContract.store.baseParams.inputSelectType = selectType;
					selectContract.store.load({
								params : {
									start : 0,
									limit : paymentTask.limit
								}
							});

					// 默认加载一次下拉列表（加载供应商开户行）
					selectVendorAccount.store.baseParams.inputValue = selectVendor.getValue();
					selectVendorAccount.store.load({
								params : {
									start : 0,
									limit : paymentTask.limit
								}
							});

					// 默认加载一次下拉列表（加载负责人）
//					LiabilityPeopel.store.baseParams.inputValue = LiabilityPeopel.getValue();
//					LiabilityPeopel.store.load({
//								params : {
//									start : 0,
//									limit : paymentTask.limit
//								}
//							});

					// 默认加载一次下拉列表（加载经办人）
//					WorkPeopel.store.baseParams.inputValue = WorkPeopel.getValue();
//					WorkPeopel.store.load({
//								params : {
//									start : 0,
//									limit : paymentTask.limit
//								}
//							});

					// 默认加载一次下拉列表（加载合同编号）
					GroupContract.store.baseParams.inputValue = GroupContract.getValue();
					GroupContract.store.baseParams.inputSelectType = selectType;
					GroupContract.store.load({
								params : {
									start : 0,
									limit : paymentTask.limit
								}
							});
				}
			});
	return btn;
}

paymentTask.selectBtn1 = function(selectType) {
	var btn = new Ext.Button({
				text : '支付查看',
				handler : function() {
					var records = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
					// 判断是否有勾选
					if (records.length <= 0 || records.length > 1) {
						Ext.MessageBox.show({
									title : '提示信息',
									msg : '有且只有一条勾选内容才能进行此操作！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					var win = new Ext.Window({
								width : 800,
								minWidth : 800,
								height : 400,
								layout : 'fit',
								modal : true,
								buttonAlign : 'center',
								items : [PaymentTaskApprovalObjectPanel.init(records[0].get('psId') + records[0].get('psType'), selectType)],
								buttons : [{
											text : '关闭',
											handler : function() {
												win.close();
											}
										}]
							});
					win.show();
				}
			});
	return btn;
}

paymentTask.updateBtn = function(selectType) {
	var btn = new Ext.Button({
				text : '修改',
				disabled : main.PAYMENT,
				handler : function() {
					var records = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
					// 判断是否有勾选
					if (records.length <= 0 || records.length > 1) {
						Ext.MessageBox.show({
									title : '提示信息',
									msg : '有且只有一条勾选内容才能进行此操作！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					} else if (records[0].get('psState') > 1) {
						Ext.MessageBox.show({
									title : '提示信息',
									msg : '只有编制中的任务才能修改！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					} else {
						Ext.Ajax.request({
									url : '../JSON/StockPaymentTaskRemote.getUpdatePaymentTask',
									method : 'POST',
									failure : function() {
										Ext.MessageBox.show({
													title : '提示信息',
													msg : '获取后台数据失败！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
									},
									success : function(response, options) {
										var result = Ext.util.JSON.decode(response.responseText);
										// 编号赋值
										paymentTask.psId = records[0].get('psId');
										paymentTask.pgId = records[0].get('psId');
										paymentTask.createPaymentWin(selectType);
										// 判断勾选的是哪种任务
										if (records[0].get('psType') == 1) {
											paymentTask.createTab.remove(1);

											paymentTask.createStockPaymentTask.getForm().findField('psPhone').setValue(result.psPhone);
											paymentTask.createStockPaymentTask.getForm().findField('psContent').setValue(result.psContent);
											paymentTask.createStockPaymentTask.getForm().findField('psPaymentScale').setValue(result.psPaymentScale);
											paymentTask.createStockPaymentTask.getForm().findField('psRemark').setValue(result.psRemark);
											paymentTask.createStockPaymentTask.getForm().findField('psApplicationBrow').setValue(result.psApplicationBrow);
											paymentTask.createStockPaymentTask.getForm().findField('psAuditingBrow').setValue(result.psAuditingBrow);
											paymentTask.createStockPaymentTask.getForm().findField('psBankNum').setValue(result.psBankNum);

											var selectDepartment = Ext.getCmp('paymentTaskDepartmentValueComboBox');
											var selectVendor = Ext.getCmp('paymentTaskVendorValueComboBox');
											var selectContract = Ext.getCmp('paymentTaskContractValueComboBox');
											var selectVendorAccount = Ext.getCmp('paymentTaskVendorAccountValueComboBox');

											// 默认加载一次下拉列表（加载指派）
											// selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
											selectDepartment.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.depcode
														},
														callback : function() {
															paymentTask.createStockPaymentTask.getForm().findField('depcode').setValue(result.depcode);
														}
													});
											// 默认加载一次下拉列表（加载供应商）
											// selectVendor.store.baseParams.inputValue=selectVendor.getRawValue();
											selectVendor.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.psPayee
														},
														callback : function() {
															paymentTask.createStockPaymentTask.getForm().findField('psPayee').setValue(result.psPayee);
														}
													});
											// 默认加载一次下拉列表（加载合同编号）

											// selectContract.store.baseParams.inputValue=selectContract.getRawValue();
											selectContract.store.baseParams.inputSelectType = selectType;
											selectContract.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.contractId
														},
														callback : function() {
															paymentTask.createStockPaymentTask.getForm().findField('contractId').setValue(result.contractId);
														}
													});

											// 默认加载一次下拉列表（加载供应商开户行）
											// selectVendorAccount.store.baseParams.inputValue=selectVendor.getValue();
											selectVendorAccount.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.psBankName
														},
														callback : function() {
															paymentTask.createStockPaymentTask.getForm().findField('psBankName').setValue(result.psBankName);
														}
													});

											// 各多选框赋值
											var types = result.psAccessoriesType.split(',');
											var t1 = [false, false, false, false];
											for (var i = 0; i < types.length; i++) {
												if (types[i] == 1)
													t1[0] = true;
												if (types[i] == 2)
													t1[1] = true;
												if (types[i] == 3)
													t1[2] = true;
												if (types[i] == 4)
													t1[3] = true;

											}
											paymentTask.createStockPaymentTask.getForm().findField('psAccessoriesType').setValue(t1);

											// var type1s =
											// result.psPlanType.split(',');
											// var t2 = [false,false];
											// for(var i=0;i<type1s.length;i++){
											// if(type1s[i]==1)
											// t2[0]=true;
											// if(type1s[i]==2)
											// t2[1]=true;
											// }
											// paymentTask.createStockPaymentTask.getForm().findField('psPlanType').setValue(t2);
											paymentTask.createStockPaymentTask.getForm().findField('psPlanType').setValue(result.psPlanType);

											// 将小写转换为大写显示在输入框中
											paymentTask.createStockPaymentTask.getForm().findField('psApplicationBrowChina').setValue(util
													.numForChina(paymentTask.createStockPaymentTask.getForm().findField('psApplicationBrow').getValue()));
											// 将小写转换为大写显示在输入框中
											paymentTask.createStockPaymentTask.getForm().findField('psAuditingBrowChina').setValue(util
													.numForChina(paymentTask.createStockPaymentTask.getForm().findField('psAuditingBrow').getValue()));
										} else {
											paymentTask.createTab.remove(0);
											paymentTask.createGroupPaymentTask.getForm().findField('pgFinanceRemark').setValue(result.pgFinanceRemark);
											paymentTask.createGroupPaymentTask.getForm().findField('contractProof').setValue(result.contractProof);
											paymentTask.createGroupPaymentTask.getForm().findField('contractMoney').setValue(result.contractMoney);
											paymentTask.createGroupPaymentTask.getForm().findField('paymentMoney').setValue(result.paymentMoney);
											paymentTask.createGroupPaymentTask.getForm().findField('pgRemark').setValue(result.pgRemark);
											paymentTask.createGroupPaymentTask.getForm().findField('pgAuditingBrow').setValue(result.pgAuditingBrow);
											paymentTask.createGroupPaymentTask.getForm().findField('pgIdea').setValue(result.pgIdea);

											var LiabilityPeopel = Ext.getCmp('LiabilityPeopelValueComboBox');
											var WorkPeopel = Ext.getCmp('WorkPeopelValueComboBox');
											var GroupContract = Ext.getCmp('paymentTaskGroupContractValueComboBox');
											// 默认加载一次下拉列表（加载负责人）
											// LiabilityPeopel.store.baseParams.inputValue=LiabilityPeopel.getValue();
											LiabilityPeopel.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.pgLiabilityPeopel
														},
														callback : function() {
															paymentTask.createGroupPaymentTask.getForm().findField('pgLiabilityPeopel').setValue(result.pgLiabilityPeopel);
														}
													});

											// 默认加载一次下拉列表（加载经办人）
											// WorkPeopel.store.baseParams.inputValue=WorkPeopel.getValue();
											WorkPeopel.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.pgWorkPeopel
														},
														callback : function() {
															paymentTask.createGroupPaymentTask.getForm().findField('pgWorkPeopel').setValue(result.pgWorkPeopel);
														}
													});

											// 默认加载一次下拉列表（加载合同编号）
											// GroupContract.store.baseParams.inputValue=GroupContract.getValue();
											GroupContract.store.baseParams.inputSelectType = selectType;
											GroupContract.store.load({
														params : {
															start : 0,
															limit : paymentTask.limit,
															inputValueNum : result.contractId
														},
														callback : function() {
															paymentTask.createGroupPaymentTask.getForm().findField('contractId').setValue(result.contractId);
														}
													});

											// 将小写转换为大写显示在输入框中
											paymentTask.createGroupPaymentTask.getForm().findField('pgAuditingBrowChina').setValue(util
													.numForChina(paymentTask.createGroupPaymentTask.getForm().findField('pgAuditingBrow').getValue()));
										}
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										psId : records[0].get('psId'),
										psType : records[0].get('psType')
									}
								});
					}
				}
			});
	return btn;
}

paymentTask.deleteBtn = new Ext.Button({
			text : '删除',
			handler : function() {
				var records = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
				if (records.length > 0) {
					Ext.Msg.confirm('提示信息', '是否删除勾选的信息？', function(btn) {
								if (btn == 'yes') {
									var tempErr = 0;
									var tempPs = '';
									var tempPg = '';
									for (var i = 0; i < records.length; i++) {
										if (records[i].get('psState') > 1)
											tempErr = tempErr + 1;
										else {
											if (records[i].get('psType') == 1)
												tempPs = tempPs + ",\'" + records[i].get('psId') + "\'";
											else
												tempPg = tempPg + ",\'" + records[i].get('psId') + "\'";
										}
									}

									// 判断是否有不能删除的项
									if (tempErr > 0) {
										Ext.MessageBox.show({
													title : '提示信息',
													msg : '只有“编辑中”的任务才能删除！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
									} else {
										Ext.Ajax.request({
													url : '../JSON/StockPaymentTaskRemote.deletePaymentTask',
													method : 'POST',
													failure : function() {
														Ext.MessageBox.show({
																	title : '提示信息',
																	msg : '获取后台数据失败！',
																	buttons : Ext.MessageBox.OK,
																	icon : Ext.MessageBox.ERROR
																});
													},
													success : function(response, options) {
														var store = Ext.getCmp('paymentTaskGrid').store;
														// 起始数
														var start = Ext.getCmp('paymentTaskGrid').getBottomToolbar().cursor;
														// 每页显示总数
														var limit = Ext.getCmp('paymentTaskGrid').getBottomToolbar().pageSize;

														// 添加默认参数
														store.baseParams.psId = paymentTask.selectNum.getValue();
														store.baseParams.term = paymentTask.selectMoneyValue.getValue();
														store.baseParams.money = paymentTask.selectMuchMoney.getValue();
														// 刷新表格
														store.reload({
																	params : {
																		start : start,
																		limit : limit
																	}
																});

													},
													disableCaching : true,
													autoAbort : true,
													params : {
														psId : tempPs.substr(1),
														pgId : tempPg.substr(1)
													}
												});
									}
								}
							});
				} else {
					Ext.MessageBox.show({
								title : '提示信息',
								msg : '必须有勾选内容才能进行此操作！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		});

paymentTask.songShenBtn =function(selectType){return new Ext.Button({
			text : '送审',
			handler : function() {
				// 原有‘446901’
				// acceptTaskApprovePanel.approvePayment('449851','支付任务','PaymentTask');
				acceptTaskApprovePanel.approvePayment('486708', '支付任务', 'PaymentTask',selectType);

				
			}
		})};

paymentTask.labelNum = new Ext.form.Label({
			text : '编号：',
			style : 'margin-left:100px;',
			hidden : true
		});

paymentTask.selectNum = new Ext.form.TextField({
			// style:'margin-left:50px;'
			vtype : 'num',
			hidden : true
		});

paymentTask.labelMoney = new Ext.form.Label({
			text : '金额：',
			style : 'margin-left:30px;'
		});

paymentTask.paymentTaskMoney = function() {
	var data = [['1', '>'], ['2', '='], ['3', '<']]
	var fields = ['typeNum', 'typeName']

	var store = new Ext.data.SimpleStore({
				autoLoad : true,
				data : data,
				fields : fields
			})
	paymentTask.selectMoneyValue = new Ext.form.ComboBox({
				id : 'paymentTaskMoneyComboBox',
				store : store,
				valueField : "typeNum",
				displayField : "typeName",
				mode : 'local',
				forceSelection : true,
				triggerAction : 'all',
				emptyText : '请选择...',
				width : 40
			})

	paymentTask.selectMoneyValue.setValue('2');

	return paymentTask.selectMoneyValue;
};

/**
 * 金额
 */
paymentTask.selectMuchMoney = new Ext.form.TextField({
			style : 'margin-left:5px;',
			vtype : 'money'
		});

paymentTask.selectBtn = new Ext.Button({
			text : '查询',
			style : 'margin-left:30px;',
			handler : function() {
				if (paymentTask.selectMuchMoney.isValid() && paymentTask.selectNum.isValid()) {
					var store = Ext.getCmp('paymentTaskGrid').store;
					// 添加默认参数
					store.baseParams.psId = paymentTask.selectNum.getValue();
					store.baseParams.term = paymentTask.selectMoneyValue.getValue();
					store.baseParams.money = paymentTask.selectMuchMoney.getValue();
					// 刷新表格
					store.reload({
								params : {
									start : fixedAssetsAcceptMain.start,
									limit : fixedAssetsAcceptMain.limit
								}
							});
				} else {
					Ext.MessageBox.show({
								title : '提示信息',
								msg : '输入的查询内容有误！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		});

paymentTask.defaultBtn = new Ext.Button({
			text : '重置',
			style : 'margin-left:10px;',
			handler : function() {
				paymentTask.selectNum.setValue('');
				Ext.getCmp('paymentTaskMoneyComboBox').setValue('2');
				paymentTask.selectMuchMoney.setValue('');
			}
		});

paymentTask.init = function(start, limit, selectType) {

	var strurl = "";
	strurl = '../JSON/StockPaymentTaskRemote.getPaymentTask?a=' + new Date() + '&selectType=' + selectType;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	// 数据记录
	var record = new Ext.data.Record.create([{
				name : 'psId'
			}, {
				name : 'psAuditingBrow'
			}, {
				name : 'psAuditingTime',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s.u'
			}, {
				name : 'psState'
			}, {
				name : 'psType'
			}, {
				name : 'psCreateTime',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s.u'
			}]);

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskId'
			}, record);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				remoteSort : true
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm,
			// {
			// header : '任务编号',
			// dataIndex : 'psId',
			// width : 100
			// // renderer:function(value, cellmeta, record, rowIndex,
			// columnIndex,
			// // store){
			// // return "<a href='#'
			// onclick='toTtockPlanParticularMainPage(\""+record.get('procurementplan_code')+"\",\""
			// //
			// +record.get('procurementplan_name')+"\",\""+record.get('status')+"\",\""+record.get('amount')+"\",\""
			// // +record.get('procurementplan_id')+"\")'>"+"<font
			// color='red'>"+value+"</font></a>";
			// // }
			// },
			{
		header : '审批金额（元）',
		dataIndex : 'psAuditingBrow',
		width : 100
	}, {
		header : '审批通过日期',
		dataIndex : 'psAuditingTime',
		width : 130,
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d ')
	}, {
		header : '状态',
		dataIndex : 'psState',
		width : 100,
		renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
			if (value == 1)
				return '编辑中'
			if (value == 2)
				return '已送审'
			if (value == 3)
				return '已审批'
		}
	}, {
		header : '类别',
		dataIndex : 'psType',
		width : 100,
		renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
			if (value == 1)
				return '股份公司'
			if (value == 2)
				return '集团公司'
		}
	}, {
		header : '申请日期',
		dataIndex : 'psCreateTime',
		width : 130,
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d ')
	}]);
	paymentTask.deleteBtn.disabled = main.PAYMENT;
	paymentTask.songShenBtn.disabled = main.PAYMENT;
	var grid = new Ext.grid.GridPanel({
				title : '支付任务列表',
				id : 'paymentTaskGrid',
				tbar : [paymentTask.insertBtn(selectType), '-', paymentTask.updateBtn(selectType), '-', paymentTask.deleteBtn, '-', paymentTask.selectBtn1(selectType), '-',
						paymentTask.songShenBtn(selectType), paymentTask.labelNum, paymentTask.selectNum, paymentTask.labelMoney, paymentTask.paymentTaskMoney(), paymentTask.selectMuchMoney,
						paymentTask.selectBtn, paymentTask.defaultBtn],
				store : ds,
				cm : cm,
				sm : sm,
				autoScroll : true,
				layout : 'fit',
				trackMouseOver : true, // 鼠标放到行上是否有痕迹
				loadMask : {
					msg : '正在装载数据...'
				},
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true
				},
				bbar : new Ext.PagingToolbar({ // 定义下方工作面板(分页效果)
					pageSize : limit,
					store : ds,
					displayInfo : true,
					beforePageText : '当前第',
					firstText : '首页',
					prevText : '上一页',
					nextText : '下一页',
					lastText : '末页',
					refreshText : '刷新',
					afterPageText : '页，共{0}页',
					displayMsg : '当前行数{0} - {1} 共 {2} 行',
					emptyMsg : "未查询到数据"
				})
			});
	// 添加默认参数
	ds.baseParams.psId = acceptTask.selectNum.getValue();
	ds.baseParams.term = paymentTask.selectMoneyValue.getValue();
	ds.baseParams.money = paymentTask.selectMuchMoney.getValue();
	ds.load({
				params : {
					start : start,
					limit : limit
				}
			});

	return grid;

}