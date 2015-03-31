var buyerInfoGrid = {
	queryParm: {
		start : 0,
		limit : 20,
		purchase_code : null,
		purchase_name :  null,
		dept : null
	},
	
	venderQueryParm: {
		start : 0,
		limit : 20,
		startDate : null,
		endDate :  null,
		creater : null
	},
	
	priceQueryParm:{
		start : 0,
		limit : 20,
		startDate : null,
		endDate :  null
	}
};

var queryWin = function() { // 采购员信息

	var queryItem = new Ext.form.FormPanel({
		id : 'form2',
		border : false,
		labelWidth : 120,
		labelAlign : 'left',
		items : [{
			layout : 'form',
			border : false,
			items : [{
				border : false,
				html : '<br><br><table border="0"><tr><td width="120">登陆名称:</td><td><input type="text" id="personId" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">姓 名:</td><td><input type="text" id="personName" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">部 门:</td><td><input type="text" id="personDept" style="width:180px;height:20px"/></td>'
			}]
		}]
	});

	var win1 = new Ext.Window({
		title : "采购员信息查询",
		layout : 'fit',
		width : 350,
		height : 200,
		autoScroll : true,
		closeAction : 'close',
		items : queryItem,
		buttons : [{
			text : '查询',
			handler : function() {
				buyerInfoGrid.queryParm.purchase_code = Ext.get("personId").getValue();
				buyerInfoGrid.queryParm.purchase_name = Ext.get("personName").getValue();
				buyerInfoGrid.queryParm.dept = Ext.get("personDept").getValue();

				buyerInfoGrid.ds.load();
				win1.close();
			}
		}, {
			text : '重置',
			handler : function() {
				Ext.get("personId").dom.value = '';
				Ext.get("personName").dom.value = '';
				Ext.get("personDept").dom.value = '';
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();

}

var getBar1 = function(flag) {

	var start = function(){
		var strartTime1 = new Ext.form.DateField({
				id : 'startTime1',
				width : 100,
				emptyText : '开始',
				dateFormat : 'Y-m-d'
			});
		return strartTime1;
	}

	var end = function(){
		var strartTime2 = new Ext.form.DateField({
				id : 'endTime1',
				width : 100,
				emptyText : '结束',
				dateFormat : 'Y-m-d'
			});
		return strartTime2;
	}

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						buyerInfoGrid.venderQueryParm.startDate = Ext.getCmp("startTime1").getValue();
						buyerInfoGrid.venderQueryParm.endDate = Ext.getCmp("endTime1").getValue();

						buyerInfoGrid.vDs.load();
					
					}
				});
		return btn;
	}
	
	var tbar = new Ext.Toolbar({
				items : ['开始时间：',start(),'结束时间：',end(),queryButtion()]
			})

	return tbar;
}

var getBar2 = function(flag) {

	var start = function(){
		var strartTime1 = new Ext.form.DateField({
				id : 'startTime2',
				width : 100,
				emptyText : '开始',
				dateFormat : 'Y-m-d'
			});
		return strartTime1;
	}

	var end = function(){
		var strartTime2 = new Ext.form.DateField({
				id : 'endTime2',
				width : 100,
				emptyText : '结束',
				dateFormat : 'Y-m-d'
			});
		return strartTime2;
	}

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						buyerInfoGrid.priceQueryParm.startDate = Ext.getCmp("startTime2").getValue();
						buyerInfoGrid.priceQueryParm.endDate = Ext.getCmp("endTime2").getValue();
						buyerInfoGrid.priceDs.load();
					}
				});
		return btn;
	}
	
	var tbar = new Ext.Toolbar({
				items : ['开始时间：',start(),'结束时间：',end(),queryButtion()]
			})
			
	return tbar;
}

var getBar = function(flag) {

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						queryWin();
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : [queryButtion()]
			})

	return tbar;
}

buyerInfoGrid.initPriceGrid = function(venderId,venderName) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "合同编号",
							dataIndex : 'contractCode'
						}, {
							header : "合同名称",
							width : 130,
							dataIndex : 'contractName'
						}, {
							header : "物资编号",
							width : 130,
							dataIndex : 'partCode'
						}, {
							header : "物资名称",
							width : 130,
							dataIndex : 'partName'
						}, {
							header : "物资类别",
							width : 130,
							dataIndex : 'type' 
						}, {
							header : "物资规格",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "批次号",
							width : 130,
							dataIndex : 'loton'
						}, {
							header : "到货数量",
							width : 130,
							dataIndex : 'num'
						}, {
							header : "入厂价格",
							width : 130,
							dataIndex : 'price'
						}, {
							header : "到货时间",
							width : 130,
							dataIndex : 'arrivalDate'
						}/*, {
							header : "合格率",
							width : 130,
							dataIndex : 'percent' 
						}*/]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var strurl = '../JSON/buyerRemote.getPriceAndQualityInfo?creater='+venderId;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'contractCode', 'contractName', 'partCode', 'partName', 'type', 'scale', 'loton', 'num', 'price', 'arrivalDate']);

	buyerInfoGrid.priceDs = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : buyerInfoGrid.priceDs,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : buyerInfoGrid.priceDs,
							displayInfo : true
						})
			});

	buyerInfoGrid.priceDs.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, buyerInfoGrid.priceQueryParm);
	});
	buyerInfoGrid.priceDs.load();

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				tbar : getBar2(),
				items : [gridPanel]
			});
			
	if (buyerInfoTabpanel.tabPanel.get(venderId + "price")) {
		buyerInfoTabpanel.tabPanel.setActiveTab(venderId + "price");
	} else {
		buyerInfoTabpanel.tabPanel.add({
					id : venderId +'price',
					title : venderName+"_成交价格列表",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}


buyerInfoGrid.initSupplierGrid = function(venderId,venderName) {
	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "供应商编号",
							dataIndex : 'vendorCode'
						}, {
							header : "供应商名称",
							width : 130,
							dataIndex : 'vendorName'
						}, {
							header : "规模",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "主营业务",
							width : 130,
							dataIndex : 'businessScope'
						}/*, {
							header : "得分",
							width : 130,
							dataIndex : 'score' 
						}*/, {
							header : "更新时间",
							width : 130,
							dataIndex : 'create_date',
							renderer:Ext.util.Format.dateRenderer('Y-m-d')  
						}
						]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var strurl = '../JSON/supplierInfoRemote.getInfoForBuyer';//creater='+venderId+'&d='+new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'vendorID'
			}, ['vendorID', 'vendorCode', 'vendorName', 'scale', 'businessScope', 'score', 'type', 'contact', 'deliveryAddress', 'phone', 'fax', {
						name : 'create_date',
						type : 'date',
						mapping : 'create_date.time',  
						dateFormat : 'time'}]);

	buyerInfoGrid.vDs = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams:{
					creater:venderId
				}
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : buyerInfoGrid.vDs,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : buyerInfoGrid.vDs,
							displayInfo : true
						})
			});
	buyerInfoGrid.venderQueryParm.creater = venderId;
	buyerInfoGrid.vDs.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, buyerInfoGrid.venderQueryParm);
	});
	
	buyerInfoGrid.vDs.load();

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				tbar : getBar1(),
				items : [gridPanel]
			});
			
	if (buyerInfoTabpanel.tabPanel.get(venderId + "supplier")) {
		buyerInfoTabpanel.tabPanel.setActiveTab(venderId + "supplier");
	} else {
		buyerInfoTabpanel.tabPanel.add({
					id : venderId +'supplier',
					title : venderName+"_供应商更新率",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}

buyerInfoGrid.initGrid = function() {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "登陆名称",
							width : 130,
							dataIndex : 'purchase_code'
						}, {
							header : "姓名",
							width : 130,
							dataIndex : 'purchase_name'
						}, {
							header : "性别",
							width : 60,
							dataIndex : 'purchase_sex'
						}, {
							header : "职称",
							width : 130,
							dataIndex : 'title'
						}, {
							header : "职务",
							width : 130,
							dataIndex : 'post'
						}, {
							header : "部门",
							width : 130,
							dataIndex : 'dept'
						}, {
							header : "年龄",
							width : 60,
							dataIndex : 'age'
						}, {
							header : "任期",
							width : 60,
							dataIndex : 'term_life'
						}, {
							header : "是否超过任期",
							width : 100,
							dataIndex : 'yn_life'
						}, {
							header : "供应商更新",
							width : 80,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex,
									columnIndex, store) {
									return "<a><span onclick=\"buyerInfoGrid.initSupplierGrid('"+record.get('purchase_code')+"','"+record.get('purchase_name')+"')\">详情</span></a>";
							}
						}, {
							header : "采购物资",
							width : 80,
							dataIndex : '_column2',
							renderer : function(value, cellmeta, record, rowIndex,
									columnIndex, store) {
									return "<a><span onclick=\"buyerInfoGrid.initPriceGrid('"+record.get('purchase_code')+"','"+record.get('purchase_name')+"')\">详情</span></a>";
							}
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/buyerRemote.getInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'purchase_code', 'purchase_name', 'purchase_sex', 'age', 'title', 'post', 'dept', 'term_life', 'yn_life']);

	buyerInfoGrid.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : buyerInfoGrid.ds,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : buyerInfoGrid.ds,
							displayInfo : true
						})
			});

	buyerInfoGrid.ds.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, buyerInfoGrid.queryParm);
	});
	
	buyerInfoGrid.ds.load();
			
	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				tbar : getBar(),
				items : [gridPanel]
			});

	return mainPanel;

}


Ext.ns("buyerInfoGrid.projectInfoGrid");
/**
 * 项目信息
 * 
 * @class buyerInfoGrid.projectInfoGrid
 * @extends Ext.grid.GridPanel
 */
buyerInfoGrid.projectInfoGrid = Ext.extend(Ext.grid.GridPanel, {
			id : 'projectInfoGrid',
			stripeRows : true, // 隔行变色，区分表格行
			queryContract : function(value) { // 查看合同详情
				var win = Ext.getCmp('contractEditorWin');
				if (!win) {
					win = new Ext.Window({
								id : 'contractEditorWin',
								title : '合同编辑窗口',
								width : 600,
								modal : true,
								items : [{
											xtype : 'contractForm',
											id : 'contractEditorForm',
											isEdit : false,
											loadForm : function(form, fileForm) {
												var rec = Ext.getCmp('projectInfoGrid').store.getById(value);
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
			vendorID : '',// 供应商ID
			initComponent : function() {
				var grid = this
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/supplierInfoRemote.getSupplierOfContractInfo?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'contractid'
									}, ['contractid', 'contractcode', 'contractname', 'partyb', 'partybname', 'amount', 'amountUnit', 'secrecy', 'partya', 'partya_name',
											'operatorid', 'equipregistId', 'projectnum', 'projectname', 'contractmanager', 'leader', 'status', 'remark', 'equipregistId', 'fileid',
											'filename']),
							autoLoad : true,
							baseParams : {
								vendorID : this.vendorID,
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							plugins : new Ext.ux.grid.ColumnHeaderGroup({// 注:数组元素也为数组类型
								rows : [[{
											header : '',
											colspan : 6
										}, {
											header : '签定单位',
											colspan : 4,
											align : 'center'
										}, {
											header : '',
											colspan : 4
										}]]
							}),
							columns : [{
								header : '项目编号',
								dataIndex : 'projectnum',
								width : 100,
								sortable : true,
								renderer : function(value, cellmeta, record, rowIndex) {
									return "<a href='javascript:void(0);' onclick=buyerInfoGrid.projectInfoGrid.prototype.queryContract('" + record.get('contractid') + "')>"
											+ value + "</a>";;
								}
							}, {
								header : '项目名称',
								dataIndex : 'projectname',
								width : 100,
								sortable : true
							}, {
								header : '状态',
								dataIndex : 'status',
								width : 100,
								sortable : true,
								renderer : function(value, cellmeta, record, rowIndex) {
									var status = record.get('status');
									if (status == 1) {
										return '<span style="color:red;">编制中</span>';
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
							store : store,
							bbar : new Ext.PagingToolbar({
										pageSize : 25,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				buyerInfoGrid.projectInfoGrid.superclass.initComponent.call(this);
			}
		})
Ext.reg("projectInfoGrid", buyerInfoGrid.projectInfoGrid)

Ext.ns('buyerInfoGrid.contractForm');
/**
 * 供应商的设备合同查看表单
 * 
 * @class buyerInfoGrid.contractForm
 * @extends Ext.Panel
 */
buyerInfoGrid.contractForm = Ext.extend(Ext.Panel, {
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
																			id : 'equipregistId',
																			name : 'equipregistId'
																		}, {
																			xtype : 'textfield',
																			fieldLabel : '项目编号',
																			allowBlank : false,
																			name : 'projectnum'
																		}, {
																			xtype : 'textfield',
																			fieldLabel : '合同编号',
																			name : 'contractcode',
																			readOnly : true
																		}, {
																			xtype : 'textfield',
																			fieldLabel : '乙方',
																			name : 'partyb',// 不能与name相同.
																			readOnly : true
																		}, {
																			xtype : 'textfield',
																			name : 'amountUnit',
																			fieldLabel : '金额单位',
																			value : '万元',
																			readOnly : true
																			// !panel.isEdit
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
																			readOnly : true
																		}, {
																			xtype : 'numberfield',
																			fieldLabel : '金额',
																			name : 'amount',
																			readOnly : true
																		}, {
																			name : 'secrecy',
																			fieldLabel : '合同密级',
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
																						readOnly : true
																					}, {
																						xtype : 'textfield',
																						name : 'contractmanager',
																						fieldLabel : '合同管理员',
																						readOnly : true
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
																						id : 'operatorid',
																						name : 'operatorid'
																					}, {
																						xtype : 'textfield',
																						name : 'leader',
																						fieldLabel : '行政分管领导',
																						readOnly : true
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
				buyerInfoGrid.contractForm.superclass.initComponent.call(this);
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				buyerInfoGrid.contractForm.superclass.onRender.call(this, ct, position);// 必须放在开始
				this.loadForm(this.findById("contractEditorForm"), this.findById('fileFormPanel'));
			}
		});
Ext.reg('contractForm', buyerInfoGrid.contractForm);// 第一个参数为自定义控件的xtype
