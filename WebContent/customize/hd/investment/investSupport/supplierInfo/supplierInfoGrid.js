var supplierInfoGrid = {
	queryParm : {
		start : 0,
		limit : 20,
		vendorID : null,
		vendorName : null,
		scale : null,
		type : null
	}
};

var queryWin = function() { // 供应商信息查询
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
										html : '<br><br><table border="0"><tr><td width="120">供应商编号:</td><td><input type="text" id="supplierId" style="width:180px;height:20px"/></td>'
									}, {
										border : false,
										html : '<table border="0"><tr><td width="120">供应商名称:</td><td><input type="text" id="supplierName" style="width:180px;height:20px"/></td>'
									}, {
										border : false,
										html : '<table border="0"><tr><td width="120">规 模:</td><td><input type="text" id="scale" style="width:180px;height:20px"/></td>'
									}, {
										border : false,
										html : '<table border="0"><tr><td width="120">类 型:</td><td><div id="typeDiv"></div></td>'
									}]
						}]
			});

	var win1 = new Ext.Window({
				title : "供应商信息查询",
				layout : 'fit',
				width : 350,
				height : 230,
				autoScroll : true,
				closeAction : 'close',
				items : queryItem,
				buttons : [{
							text : '查询',
							handler : function() {
								supplierInfoGrid.queryParm.vendorCode = Ext.get("supplierId").getValue();
								supplierInfoGrid.queryParm.vendorName = Ext.get("supplierName").getValue();
								supplierInfoGrid.queryParm.scale = Ext.get("scale").getValue();
								supplierInfoGrid.queryParm.type = Ext.getCmp("typeBox").getValue();

								supplierInfoGrid.ds.load();
								win1.close();
							}
						}, {
							text : '重置',
							handler : function() {
								Ext.get("supplierId").dom.value = '';
								Ext.get("supplierName").dom.value = '';
								Ext.get("scale").dom.value = '';
								Ext.getCmp("typeBox").setValue(null);
							}
						}, {
							text : '关闭',
							handler : function() {
								win1.close();
							}
						}]
			}).show();

	var ds = [{
				'name' : '合格',
				'text' : '合格'
			}, {
				'name' : '试供',
				'text' : '试供'
			}]
	var store = new Ext.data.JsonStore({
				data : ds,
				fields : ['name', 'text']
			})
	var stateBox = new Ext.form.ComboBox({
				renderTo : 'typeDiv',
				id : 'typeBox',
				hideOnSelect : true,
				store : store,
				width : 180,
				displayField : 'text',
				valueField : 'name',
				triggerAction : 'all',
				forceSelection : true,
				emptyText : '请选择...',
				mode : 'local'
			});

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

var getBar1 = function(flag) {

	var start = function() {
		var strartTime1 = new Ext.form.DateField({
					id : 'startTime1',
					width : 100,
					emptyText : '开始',
					dateFormat : 'Y-m-d'
				});
		return strartTime1;
	}

	var end = function() {
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
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : ['开始时间：', start(), '结束时间：', end(), queryButtion()]
			})

	return tbar;
}

var initSupplyTopGrid = function(code, name,vendorID) {

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
						}, {
							header : "平均分",
							width : 130,
							dataIndex : 'avgGrade'
						}, {
							header : "时间",
							width : 130,
							dataIndex : 'theDate'
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/supplierInfoRemote.getGradeInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'vendorCode', 'vendorName', 'scale', 'businessScope', 'gradeDept1', 'gradeDept2', 'gradeDept3', 'avgGrade', 'theDate']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				autoLoad:true,
				baseParams:{
					vendorID:vendorID,
					start : 0,
					limit : 20
				},
				listeners:{
					load :function( store, records, options){
//						alert(records[0].get('id'))
						if(records.length==0){return;}
						Ext.getCmp('middleGrid').getStore().load({
						params :{
						   vendorAppraisalId:records[0].get('id')
						}
						});
							callSeam("supplierInfoRemote", "getGradeMoreInfo", [records[0].get('id')], function(result) {
				Ext.get("xiugaiyijianDiv").dom.innerHTML = result;
			})
//						Ext.getCmp('bottomGrid').getStore().load({
//						params :{
//						   vendorAppraisalId:records[0].get('id')
//						}
//						})
					}
				}
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : ds,
				cm : cm,
				region : 'north',
				loadMask : true,
				height : 100,
				autoScroll : true
			});

//	ds.load({
//				params : {
//					start : 0,
//					limit : 10
//				}
//			});

//	var mainPanel = new Ext.Panel({
//				region : 'north',
//				height : 100,
//				border : false,
//				layout : 'fit',
//				autoScroll : true,
//				items : [gridPanel]
//			});
	return gridPanel;//mainPanel;
}

var initSupplyMiddleGrid = function(code, name,vendorID) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "得分",
							dataIndex : 'vendorCode'
						}, {
							header : "评分人",
							width : 130,
							dataIndex : 'vendorName'
						}, {
							header : "评分部门",
							width : 130,
							dataIndex : 'scale'
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/supplierInfoRemote.getGradeDeptInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'vendorCode', 'vendorName', 'scale']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				//autoLoad:true,
				baseParams:{
					vendorID:vendorID
				}
			});

	var gridPanel = new Ext.grid.GridPanel({
		        id:'middleGrid',
				store : ds,
				cm : cm,
				loadMask : true,
//				height : 100,
				autoScroll : true,
				region : 'center'
			});

//	ds.load();
//
//	var mainPanel = new Ext.Panel({
//				
//				height : 300,
//				border : false,
//				layout : 'fit',
//				autoScroll : true,
//				items : [gridPanel]
//			});
	return gridPanel;//mainPanel;
}

initSupplyBottomGrid = function(code, name,vendorID) {

	var mainPanel = new Ext.Panel({
		        id:'bottomGrid',
				region : 'south',
				height : 100,
				border : false,
				//layout : 'fit',
				autoScroll : true,
				html : '<div id="xiugaiyijianDiv"></div>'
			});

//	callSeam("supplierInfoRemote", "getGradeMoreInfo", [code], function(result) {
//				Ext.get("xiugaiyijianDiv").dom.innerHTML = result;
//			})

	return mainPanel;
}

supplierInfoGrid.initSupplyGrid = function(code, name,vendorID) {

	var mainPanel = new Ext.Panel({
				layout : 'border',
//				tbar : new Ext.Toolbar({
//							items : ['供应商编码：<b>' + code + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应商名称：<b>' + name + '</b>']
//						}),
				items : [initSupplyTopGrid(code, name,vendorID), initSupplyMiddleGrid(code, name,vendorID), initSupplyBottomGrid(code, name,vendorID)]
			})

	if (supplierInfoTabpanel.tabPanel.get(code + "supply")) {
		supplierInfoTabpanel.tabPanel.setActiveTab(code + "supply");
	} else {
		supplierInfoTabpanel.tabPanel.add({
					id : code + 'supply',
					title : "最近考核记录",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
				}).show();
	}
}

supplierInfoGrid.initAssessGrid = function(code, name,vendorID) {

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
							header : "物料编码",
							width : 130,
							dataIndex : 'num'
						}, {
							header : "物料名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "规格",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "单价",
							width : 130,
							dataIndex : 'price'
						}, {
							header : "批次",
							width : 130,
							dataIndex : 'loton'
						}, {
							header : "数量",
							width : 130,
							dataIndex : 'count'
						}, {
							header : "交货日期",
							width : 130,
							dataIndex : 'deliveryDate'
						}/*, {
							header : "合格率",
							width : 130,
							dataIndex : 'personOfPass'
						}*/]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = '../JSON/supplierInfoRemote.getSupplyMaterialInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'contractCode', 'contractName', 'num', 'name', 'scale', 'price', 'loton', 'count', 'deliveryDate', 'personOfPass', 'kind']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams:{
					vendorID:vendorID
				}
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : ds,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : ds,
							displayInfo : true
						})
			});

	ds.load({
				params : {
					start : 0,
					limit : 10
				}
			});

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				tbar : getBar1(),
				items : [gridPanel]
			});

	if (supplierInfoTabpanel.tabPanel.get(code + "assess")) {
		supplierInfoTabpanel.tabPanel.setActiveTab(code + "assess");
	} else {
		supplierInfoTabpanel.tabPanel.add({
					id : code + 'assess',
					title : "供货信息",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
				}).show();
	}
}

supplierInfoGrid.initGrid = function() {

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
						}, {
							header : "得分",
							width : 130,
							dataIndex : 'score' // 来自供应商考核模块
						}, {
							header : "类型",
							width : 130,
							dataIndex : 'type',
							renderer : function(value, cellmeta, record, rowIndex) {
								if (value == 1) {
									return "合格";
								} else if (value == 2) {
									return "试供";
								} else {
									return value;
								}
							}
						}, {
							header : "联系人",
							width : 130,
							dataIndex : 'contact' // 来自供应商联系人模块
						}, {
							header : "地址",
							width : 130,
							dataIndex : 'deliveryAddress'
						}, {
							header : "联系电话",
							width : 130,
							dataIndex : 'phone'
						}, {
							header : "传真",
							width : 130,
							dataIndex : 'fax'
						}, {
							header : "最近考核记录",
							width : 130,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
								return "<a><span onclick=\"supplierInfoGrid.initSupplyGrid ('" + record.get('vendorCode') + "','" + record.get('vendorName') +"','"+record.get('vendorID')+ "')\">详情</span></a>";
							}
						}, {
							header : "交易信息",
							width : 130,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
								if (record.get('kind') == '1') {
									// 固定资产供应商
									return "<a><span onclick=\"supplierInfoGrid.addProjectInfo('" + record.get('vendorID') + "','" + record.get('vendorCode') + "','"
											+ record.get('vendorName') + "')\">详情</span></a>";
								} else {
									// 消耗类供应商
									return "<a><span onclick=\"supplierInfoGrid.initAssessGrid ('" + record.get('vendorCode') + "','" + record.get('vendorName')+"','"+record.get('vendorID')
											+ "')\">详情</span></a>";
								}
							}
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/supplierInfoRemote.getInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'//,
//				id : 'vendorID'
			}, ['vendorID', 'vendorCode', 'vendorName', 'scale', 'businessScope', 'score', 'type', 'contact', 'deliveryAddress', 'phone', 'fax', 'kind']);

	supplierInfoGrid.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : supplierInfoGrid.ds,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : supplierInfoGrid.ds,
							displayInfo : true
						})
			});

	supplierInfoGrid.ds.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, supplierInfoGrid.queryParm);
			});

	supplierInfoGrid.ds.load();

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				tbar : getBar(),
				items : [gridPanel]
			});

	return mainPanel;
}

supplierInfoGrid.addProjectInfo = function(vendorID, code, name) {
	if (supplierInfoTabpanel.tabPanel.get(code + "assess")) {
		supplierInfoTabpanel.tabPanel.setActiveTab(code + "assess");
	} else {
		supplierInfoTabpanel.tabPanel.add({
					id : code + 'assess',
					title : "供货信息",
					layout : 'fit',
					closable : true,
					items : [new supplierInfoGrid.projectInfoGrid({
								id : 'projectInfoGrid',
								vendorID : vendorID
							})],
					tbar : ['-', '状态', new Ext.form.ComboBox({
										id : 'status',
										// 作为FORM表单提交时的参数名,并且hiddenName!=id
										typeAhead : true,// 必须项
										triggerAction : 'all',// 必须项
										lazyRender : true,
										resizable : true,// 是否手动扩展大小,默认false
										mode : 'local',
										forceSelection : true,// 限制输入范围在可选择的文本内
										editable : false,// 不允许输入,只能选择文本列表
										store : new Ext.data.ArrayStore({
													fields : ['value', 'displayText'],
													data : [['', '全部'],[1, '编制中'],[2, '审批中'],[3, '已审批'] ]
												}),
										valueField : 'value',
//										value : 1,
										displayField : 'displayText'
									}), {
								text : '查询',
								handler : function() {
									var store = Ext.getCmp('projectInfoGrid').getStore();
									store.setBaseParam('status', Ext.getCmp('status').getValue());
									store.load();
								}
							}]
				}).show();
	}
}
Ext.ns("supplierInfoGrid.projectInfoGrid");
/**
 * 项目信息
 * 
 * @class supplierInfoGrid.projectInfoGrid
 * @extends Ext.grid.GridPanel
 */
supplierInfoGrid.projectInfoGrid = Ext.extend(Ext.grid.GridPanel, {
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
									return "<a href='javascript:void(0);' onclick=supplierInfoGrid.projectInfoGrid.prototype.queryContract('" + record.get('contractid') + "')>"
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
				supplierInfoGrid.projectInfoGrid.superclass.initComponent.call(this);
			}
		})
Ext.reg("projectInfoGrid", supplierInfoGrid.projectInfoGrid)

Ext.ns('supplierInfoGrid.contractForm');
/**
 * 供应商的设备合同查看表单
 * 
 * @class supplierInfoGrid.contractForm
 * @extends Ext.Panel
 */
supplierInfoGrid.contractForm = Ext.extend(Ext.Panel, {
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
				supplierInfoGrid.contractForm.superclass.initComponent.call(this);
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				supplierInfoGrid.contractForm.superclass.onRender.call(this, ct, position);// 必须放在开始
				this.loadForm(this.findById("contractEditorForm"), this.findById('fileFormPanel'));
			}
		});
Ext.reg('contractForm', supplierInfoGrid.contractForm);// 第一个参数为自定义控件的xtype

