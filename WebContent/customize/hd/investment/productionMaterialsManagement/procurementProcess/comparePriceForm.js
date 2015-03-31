// 比价的form，用于展示比价详情，选择比价供应商
var comparePriceForm = {
	parityDetailId : null,
	oldParityVendorIdString : ''// 比价信息原有的供应商Id
};

procurementProcessData.parityDetailPanel = function() {
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					// 切换回比价列表
					var tab = Ext.getCmp('rightGrid2');
					var parityVendorStore = Ext.getCmp('parityVendorGrid')
							.getStore();
					parityVendorStore.removeAll();
					var contractForm = Ext.getCmp('parityDetailFormId');
					contractForm.form.reset();
					tab.getLayout().setActiveItem(0);
				}
			}, '-', {
				id : 'formsave',
				text : '保存',
				disabled : privilegeValidate.updateBDisable
						&& !(procurementProcessAction.formCanSave),
				handler : function() {
					// 获得供应商信息grid中，store记录数
					var parityVendorGrid = Ext.getCmp('parityVendorGrid');
					var count = parityVendorGrid.getStore().getCount();

					var vendorIdString = '';
					var priceString = '';
					var vendorNameString = '';
					var parityDetailId = '';
					var oldVendorIdString = comparePriceForm.oldParityVendorIdString;
					// 根据parityDetailId，拼接供应商id，价格字符串，用于传向后台
					if (count > 0) {
						for (var i = 0; i < count; i++) {
							parityDetailId = parityVendorGrid.getStore()
									.getAt(0).data.parityDetailId;
							if (typeof(parityVendorGrid.getStore().data.items[i].data.vendorID) != 'undefined') {
								vendorIdString = parityVendorGrid.getStore().data.items[i].data.vendorID
										+ ':' + vendorIdString;
								if (typeof(parityVendorGrid.getStore().getAt(i).data.price) != 'undefined'
										&& parityVendorGrid.getStore().getAt(i).data.price != '') {
									priceString = parityVendorGrid.getStore()
											.getAt(i).data.price
											+ ':' + priceString;
								} else {
									if(parityVendorGrid.getStore().getAt(i).data.price==0){
										priceString = '0' + ':' + priceString;
									}else{
										Ext.Msg.alert('提示', '必须填写价格');
										return;
									}
								}
								vendorNameString = parityVendorGrid.getStore()
										.getAt(i).data.vendorName
										+ ':' + vendorNameString;
							}
						}
					} else {
						Ext.Msg.alert('提示', '必须选择供应商');
						return;
					}
//					if (Ext.getCmp('lastprice').getValue() == '') {
//						Ext.Msg.alert("提示", "前次采购价格必填!");
//						return;
//					} 
//					else if (Ext.getCmp('scope').getValue() == '') {
//						alert(Ext.getCmp('scope').getValue());
//						Ext.Msg.alert("提示", "比前次上升幅度必填!");
//						return;
//					}

					// 表单提交
					var contractForm = Ext.getCmp('parityDetailFormId');
					if (!contractForm.form.isValid())
						return;
					contractForm.form.doAction('submit', {
						waitMsg : '正在保存数据，请稍候...',
						waitTitle : '提示',
						url : '../JSON/parityDetailRemote.save?d=' + new Date(),
						method : 'post',
						params : {
							vendorIdString : vendorIdString,
							priceString : priceString,
							vendorNameString : vendorNameString
						},
						success : function(form, action) {
							Ext.Msg.alert('提示', '保存数据成功！');
							form.reset();
							// 刷新grid
							var grid = Ext.getCmp('productionProcessId2');
							grid.getStore().baseParams = {
								start : 0,
								limit : 20,
								type : '1'
							};
							grid.store.load();
							// 切换回比价列表试图
							var tab = Ext.getCmp('rightGrid2');
							var parityVendorStore = Ext
									.getCmp('parityVendorGrid').getStore();
							parityVendorStore.removeAll();
							var contractForm = Ext.getCmp('parityDetailFormId');
							contractForm.form.reset();
							tab.getLayout().setActiveItem(0);
						}
					});

				}
			}];

	var item1 = [{
		xtype : 'fieldset',
		title : '一：比价采购通知栏',
		items : [{
					layout : 'column',
					border : false,
					items : [{
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'materialId',
											name : 'materialId',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [/*{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'manufacturerOne',
											name : 'manufacturerOne',
											readOnly : true,
											anchor : '100%'
										}*/]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [/*{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'manufacturerTwo',
											name : 'manufacturerTwo',
											readOnly : true,
											anchor : '100%'
										}*/]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'parityId',
											name : 'parityId',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'planner',
											name : 'planner',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'hidden',
											fieldLabel : '',
											id : 'parityDetailId',
											name : 'parityDetailId',
											readOnly : true,
											anchor : '100%'
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .98,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '计划员签名',
											id : 'plannerName',
											name : 'plannerName',
											readOnly : true,
											anchor : '100%'
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .32,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '物资名称',
											id : 'materialItemName',
											name : 'materialItemName',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								padding : '0 0 0 10',
								items : [{
											xtype : 'textfield',
											fieldLabel : '牌号',
											id : 'desingnation',
											name : 'desingnation',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								padding : '0 0 0 10',
								items : [{
											xtype : 'textfield',
											fieldLabel : '规格',
											id : 'materialStandard',
											name : 'materialStandard',
											readOnly : true,
											anchor : '100%'
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .32,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'numberfield',
											readOnly : true,
											fieldLabel : '实际采购数量',
											id : 'countNum',
											name : 'countNum',
											allowDecimals : true,// 允许输入小数
											decimalPrecision : 4,// 小数位数
											maxLength : 20,// 最大长度
											maxLengthText : '不能超过10个字符，请重新输入！',
											maxValue : 999999999,// 最大值
											allowBlank : false,// 是否允许非空
											anchor : '100%'
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								padding : '0 0 0 10',
								items : [{
											xtype : 'textfield',
											fieldLabel : '单位',
											id : 'demension',
											name : 'demension',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								padding : '0 0 0 10',
								items : [{
											xtype : 'textfield',
											fieldLabel : '用途',
											id : 'purpose',
											name : 'purpose',
											anchor : '100%'
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .49,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '使用单位',
											id : 'department',
											name : 'department',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								columnWidth : .49,
								layout : 'form',
								border : false,
								padding : '0 0 0 10',
								items : [{
											xtype : 'textfield',
											fieldLabel : '技术要求',
											name : 'technicCondition',
											readOnly : true,
											anchor : '100%'
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .49,
						layout : 'form',
						border : false,
						items : [new Ext.form.ComboBox({
									id:'manufacturerOneName',
									allowBlank : false,
									fieldLabel : '<font color=red>*</font>建议厂商1',
//									name : 'manufacturerOne',
									anchor : '100%',
									
													// 作为FORM表单提交时的参数名,并且hiddenName!=id
													hiddenName : 'manufacturerOne',// 创建一个新的控件,id=hiddenName
													typeAhead : true,// 必须项
													triggerAction : 'all',// 必须项
													// hideTrigger:true
													// ,//true隐藏下拉箭头
													lazyRender : true,
													resizable : true,// 是否手动扩展大小,默认false
													mode : 'local',
													forceSelection : true,// 限制输入范围在可选择的文本内
													editable : false,// 不允许输入,只能选择文本列表
													store : new Ext.data.ArrayStore({
																fields : ['vendorID','vendorName']
															}),
													valueField : 'vendorID',
													displayField : 'vendorName'
												})]
					}, {
						columnWidth : .49,
						layout : 'form',
						border : false,
						padding : '0 0 0 10',
						items : [{
									xtype : 'numberfield',
//									allowBlank : false,
									fieldLabel : '<font color=red>*</font>计划价',
									name : 'planPrice',
											allowDecimals : true,//允许输入小数
											decimalPrecision : 4,// 小数位数
											maxLength : 20,// 最大长度
											maxLengthText : '不能超过10个字符，请重新输入！',
											maxValue : 999999999,// 最大值
											allowBlank : false,// 是否允许非空
									// readOnly:true,
									anchor : '100%',
									style : {
										color : 'red'
									}
								}]
					}]
				}, {
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .49,
						layout : 'form',
						border : false,
						items : [
								new Ext.form.ComboBox({
									id:'manufacturerTwoName',
													allowBlank : false,
													fieldLabel : '<font color=red>*</font>建议厂商2',
//													name : 'manufacturerTwoName',
													anchor : '100%',
													// 作为FORM表单提交时的参数名,并且hiddenName!=id
													hiddenName : 'manufacturerTwo',// 创建一个新的控件,id=hiddenName
													typeAhead : true,// 必须项
													triggerAction : 'all',// 必须项
													// hideTrigger:true
													// ,//true隐藏下拉箭头
													lazyRender : true,
													resizable : true,// 是否手动扩展大小,默认false
													mode : 'local',
													forceSelection : true,// 限制输入范围在可选择的文本内
													editable : false,// 不允许输入,只能选择文本列表
													store : new Ext.data.ArrayStore({
																fields : ['vendorID','vendorName']
															}),
													valueField : 'vendorID',
													displayField : 'vendorName'
												})]
					}, {
						columnWidth : .49,
						layout : 'form',
						border : false,
						padding : '0 0 0 10',
						items : [{
									xtype : 'datefield',
									allowBlank : false,
									fieldLabel : '<font color=red>*</font>需用时间',
									format : 'Y-m-d',
									name : 'demandTime',
									anchor : '100%',
									style : {
										color : 'red'
									}
								}]
					}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .98,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textarea',
											fieldLabel : '备注',
											name : 'remark',
											anchor : '100%',
											style : {
												color : 'red'
											}
										}]
							}]
				}]
	}];

	var item21 = [{
				layout : 'column',
				border : false,
				items : [{
							columnWidth : .98,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'textfield',
										readOnly : true,
										fieldLabel : '供应员签名',
										name : 'providerName',
										anchor : '100%'
									}]
						}]
			}];
	var item22 = [{
				layout : 'column',
				border : false,
				items : [{
							columnWidth : 0.49,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'numberfield',
//										allowBlank : false,
										fieldLabel : '<font color=red>*</font>前次采购价格',
										allowNegative : false,
										allowDecimals : true,//允许输入小数
										decimalPrecision : 4,// 小数位数
										maxLength : 20,// 最大长度
										maxLengthText : '不能超过10个字符，请重新输入！',
										maxValue : 999999999,// 最大值
										allowBlank : false,// 是否允许非空
//										allowDecimals : true,
//										decimalPrecision : 2,
										id : 'lastprice',
										name : 'lastprice',
										anchor : '100%',
										style : {
											color : 'red'
										}
									}]
						}, {
							columnWidth : 0.49,
							layout : 'form',
							border : false,
							padding : '0 0 0 10',
							items : [{
										xtype : 'numberfield',
//										allowBlank : false,
										fieldLabel : '<font color=red>*</font>比前次上升幅度',
//										allowNegative : false,
										allowDecimals : true,//允许输入小数
										decimalPrecision : 4,// 小数位数
										maxLength : 20,// 最大长度
										maxLengthText : '不能超过10个字符，请重新输入！',
										maxValue : 999999999,// 最大值
										allowBlank : false,// 是否允许非空
//										allowDecimals : true,
//										decimalPrecision : 2,
										id : 'scope',
										name : 'scope',
										anchor : '100%',
										style : {
											color : 'red'
										}
									}]
						}]
			}, {
				layout : 'column',
				border : false,
				items : [{
							columnWidth : .98,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'textarea',
										fieldLabel : '备注',
										id : 'remarks',
										name : 'remarks',
										anchor : '100%',
										style : {
											color : 'red'
										}
									}]
						}]
			}]

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var parityVendorGridStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/parity_ParityVendorRemote.getParityVendorList?d='
							+ new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'parityVendorId',
					totalProperty : 'totalProperty'
				}, ['parityVendorId', 'price', 'vendorID', 'parityDetailId',
						'vendorName', 'property', 'reposal', 'phone',
						'productVentor']),
		listeners:{
			load:function (store,records,options ){
				
					var vendorOne=Ext.getCmp('manufacturerOneName');
					vendorOne.getStore().removeAll();
					vendorOne.getStore().add(records);
					vendorOne.setValue(vendorOne.getValue());
					
					var vendorTwo=Ext.getCmp('manufacturerTwoName');
					vendorTwo.getStore().removeAll();
					vendorTwo.getStore().add(records);
					vendorTwo.setValue(vendorTwo.getValue());
					
				},/*
			add : function( store,records,index ){
				var recs=records;
				var vendorOne=Ext.getCmp('manufacturerOneName');
				vendorOne.getStore().add(recs);
				var vendorOne=Ext.getCmp('manufacturerTwoName');
				vendorOne.getStore().add(recs);
			},*/
			remove:function ( store,record,index ){
				var vendorOne=Ext.getCmp('manufacturerOneName');
				vendorOne.getStore().remove(record);
				vendorOne.clearValue();
				var vendorOne=Ext.getCmp('manufacturerTwoName');
				vendorOne.getStore().remove(record);
				vendorOne.clearValue();
			}
			
		}
	});
	var cm = new Ext.grid.ColumnModel([sm, rm, {
				header : '单位名称',
				dataIndex : 'vendorName',
				sortable : true
			}, {
				header : '企业性质',
				dataIndex : 'property',
				sortable : true
			}, {
				header : '信用度',
				dataIndex : 'reposal',
				sortable : true
			}, {
				header : '<font color=red>*</font>价  格',
				dataIndex : 'price',
				sortable : true,
				width : 80,
				renderer : function(value, cellmeta, record, rowIndex) {
					return "&nbsp;<font color='red'>" + (typeof(value) == 'undefined'?"":value) + "</font>";
				},
				editor : new Ext.form.NumberField({
							allowNegative : false,
							allowDecimals : true
						})
			}, {
				header : '联系电话',
				dataIndex : 'phone',
				sortable : true
			}, {
				header : '生成单位',
				dataIndex : 'productVentor',
				sortable : true
			}]);

	var tbar1 = ['-', {
		text : '新增厂商',
		iconCls : 'add1',
		handler : function() {

			var parityVendorGridStore = Ext.getCmp('parityVendorGrid')
					.getStore();
			var count = parityVendorGridStore.getCount();
			// 新增厂商时，备份旧的供应商ID
			if (count > 0) {
				for (var i = 0; i < count; i++) {
					if (i >= count - 1) {
						comparePricePanel.oldVendorIDs = comparePricePanel.oldVendorIDs
								+ "'"
								+ parityVendorGridStore.data.items[i].data.vendorID
								+ "'";
					} else {
						comparePricePanel.oldVendorIDs = comparePricePanel.oldVendorIDs
								+ "'"
								+ parityVendorGridStore.data.items[i].data.vendorID
								+ "',";
					}
				}
			}
			comparePricePanel.addVendor();
		}
	}, '-', {
		text : '删除厂商',
		iconCls : 'del1',
		handler : function() {
			records = sm.getSelections();
			comparePricePanel.delVendor(records);
		}
	}];

	var grid = new Ext.grid.EditorGridPanel({
				store : parityVendorGridStore,
				tbar : tbar1,
				cm : cm,
				sm : sm,
				id : "parityVendorGrid",
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				clicksToEdit : 1
			});
	// 选择多选框，将records取出
	sm.on('rowselect', function(sm, rowIndex, record) {
				comparePricePanel.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				comparePricePanel.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					comparePricePanel.selectRow = null;
				}
			});

	var item23 = [{
				xtype : 'container',
				layout : 'hbox',
				height : 100,
				layoutConfig : {
					align : 'stretch',
					padding : '0 0 5 0'
				},
				items : [{
							xtype : 'container',
							width : 108
						}, {
							xtype : 'container',
							flex : 0.975,
							layout : 'fit',
							items : [grid]
						}, {
							xtype : 'container',
							flex : 0.025
						}]
			}];
	// item23由grid组成。
	var item2 = [{
				xtype : 'fieldset',
				title : '二：比价采购申请栏',
				items : [item21, item23, item22]
			}];

	// 表单
	var contractForm = new Ext.form.FormPanel({
				id : 'parityDetailFormId',
				padding : 5,
				tbar : tbar,
				layout : 'column',
				autoScroll : true,
				defaults : {
					columnWidth : 1,
					padding : 5
				},
				items : [item1, item2]
			});

	return contractForm;
}
