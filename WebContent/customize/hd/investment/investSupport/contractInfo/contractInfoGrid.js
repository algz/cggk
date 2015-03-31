var contractInfoGrid = {

	queryParm:{
		start : 0,
		limit : 10,
		contractCode : null,
		contractName : null,
		departmentA : null,
		startDate : null,
		endDate : null
	}
	
};

var queryWin = function() { // 合同信息查询
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
				html : '<br><br><table border="0"><tr><td width="100">合同编号:</td><td><input type="text" id="code" style="width:200px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="100">合同名称:</td><td><input type="text" id="name" style="width:200px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="100">供应商:</td><td><input type="text" id="supplier" style="width:200px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="100">时间阶段:</td><td><div style="display:block;float:left" id="startTime1div"></div><div style="display:block;float:left" id="endTime2div"></div></td>'
			}]
		}]
	});

	var win1 = new Ext.Window({
		title : "合同资讯查询",
		layout : 'fit',
		width : 350,
		height : 230,
		autoScroll : true,
		closeAction : 'close',
		items : queryItem,
		buttons : [{
			text : '查询',
			handler : function() {
				contractInfoGrid.queryParm.contractCode = Ext.get("code").getValue();
				contractInfoGrid.queryParm.contractName = Ext.get("name").getValue();
				contractInfoGrid.queryParm.departmentA = Ext.get("supplier").getValue();
				if (null != Ext.getCmp("startTime1").getValue() && "" != Ext.getCmp("startTime1").getValue() ) {
					contractInfoGrid.queryParm.startDate = new Date(Ext.getCmp("startTime1").getValue()).format('Y-m-d');
				}else{
						contractInfoGrid.queryParm.startDate = null;
				}
				if (null != Ext.getCmp("endTime2").getValue() && "" != Ext.getCmp("endTime2").getValue() ) {
					contractInfoGrid.queryParm.endDate = new Date(Ext.getCmp("endTime2").getValue()).format('Y-m-d');
				}else{
					contractInfoGrid.queryParm.endDate = null;
				}
				
				contractInfoGrid.ds.load();
				win1.close();
			}
		}, {
			text : '重置',
			handler : function() {
				Ext.get("code").dom.value = '';
				Ext.get("name").dom.value = '';
				Ext.get("supplier").dom.value = '';
				Ext.getCmp("startTime1").setValue(null);
				Ext.getCmp("endTime2").setValue(null);
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();

	var strartTime1 = new Ext.form.DateField({
				renderTo : 'startTime1div',
				id : 'startTime1',
				width : 100,
				emptyText : '开始',
				dateFormat : 'Y-m-d'
			});

	var strartTime2 = new Ext.form.DateField({
				renderTo : 'endTime2div',
				id : 'endTime2',
				width : 100,
				emptyText : '结束',
				dateFormat : 'Y-m-d'
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

contractInfoGrid.initDemandGrid = function(contractId,contractName,contractCode) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "编号",
							dataIndex : 'code'
						}, {
							header : "名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "物资类别",
							width : 130,
							dataIndex : 'partType'
						}, {
							header : "申报数量",
							width : 130,
							dataIndex : 'declareNum'
						}, {
							header : "资金预算",
							width : 130,
							dataIndex : 'bankrollBudget'
						}, {
							header : "申报单位",
							dataIndex : 'declareDept'
						}/*, {
							header : "可行性报告",
							width : 130,
							dataIndex : 'fileName',
							renderer : function(value, cellmeta, record,
									rowIndex) {
									var ID = record.get("fileId");
									var ORIGINALNAME = record.get("fileName");
									value = "&nbsp;<font color=blue>" + value
											+ "</font>";
									return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
											+ ID
											+ "&ORIGINALNAME="
											+ encodeURI(encodeURI(ORIGINALNAME))
											+ "' cursor：hand>" + value + "</a>";
						   		}
						}*/
						]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/contractInfoRemote.getDamanInfo?contractId='+contractId;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id','code', 'name', 'partType', 'declareNum','bankrollBudget','declareDept','fileId','fileName']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
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
		tbar : new Ext.Toolbar({
			items : ['合同编号：<b>'+contractCode+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同名称：<b>'+contractName+'</b>']
		}),
		autoScroll : true,
		items : [gridPanel]
	});
	
	if (contractInfoTabpanel.tabPanel.get(contractId + "demand")) {
		contractInfoTabpanel.tabPanel.setActiveTab(contractId + "demand");
	} else {
		contractInfoTabpanel.tabPanel.add({
					id : contractId +'demand',
					title : "需求信息",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}

contractInfoGrid.initTenderGrid = function(contractId,contractName,contractCode) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "标书编号",
							dataIndex : 'tenderCode'
						}, {
							header : "标书名称",
							width : 130,
							dataIndex : 'tenderName'
						}, {
							header : "标书项目名称",
							width : 130,
							dataIndex : 'procurementPlanDetilName'
						}, {
							header : "招标单位",
							width : 130,
							dataIndex : 'tenderDepartment'
						}, {
							header : "招标类型",
							width : 130,
							dataIndex : 'tenderType',
							renderer:function(value){
								if(value == '1'){
									return '招标'
								}else if(value == '2'){
									return '委托'
								}
								else if(value == '3'){
									return '定向采购'
								}
								else if(value == '4'){
									return '委托招标'
								}
								else if(value == '5'){
									return '自行比价'
								}else{
									return value;
								}
							}
						}, {
							header : "供应商",
							dataIndex : 'supplier'
						}, {
							header : "评标人员",
							width : 130,
							dataIndex : 'checkTenderPenson'
						}, {
							header : "招标文件",
							width : 130,
							dataIndex : 'tenderFileName',
							renderer : function(value, cellmeta, record,
									rowIndex) {
									var ID = record.get("tenderFileId");
									var ORIGINALNAME = record.get("tenderFileName");
									value = "&nbsp;<font color=blue>" + value
											+ "</font>";
									return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
											+ ID
											+ "&ORIGINALNAME="
											+ encodeURI(encodeURI(ORIGINALNAME))
											+ "' cursor：hand>" + value + "</a>";
						   		}
						}, {
							header : "评审文件",
							width : 130,
							dataIndex : 'reviewFileName',
							renderer : function(value, cellmeta, record,
									rowIndex) {
									var ID = record.get("reviewFileId");
									var ORIGINALNAME = record.get("reviewFileName");
									value = "&nbsp;<font color=blue>" + value
											+ "</font>";
									return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
											+ ID
											+ "&ORIGINALNAME="
											+ encodeURI(encodeURI(ORIGINALNAME))
											+ "' cursor：hand>" + value + "</a>";
						   		}
						}
						]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/contractInfoRemote.getTenderInfo?contractId='+contractId;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id','tenderCode', 'tenderName', 'procurementPlanDetilName', 'tenderDepartment',
			'tenderType','supplier','checkTenderPenson','tenderFileId','tenderFileName','reviewFileId','reviewFileName']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
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
		tbar : new Ext.Toolbar({
			items : ['合同编号：<b>'+contractCode+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同名称：<b>'+contractName+'</b>']
		}),
		autoScroll : true,
		items : [gridPanel]
	});

	if (contractInfoTabpanel.tabPanel.get(contractId + "tender")) {
		contractInfoTabpanel.tabPanel.setActiveTab(contractId + "tender");
	} else {
		contractInfoTabpanel.tabPanel.add({
					id : contractId +'tender',
					title : "招标信息",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}

var initExecuteArriveGrid = function(contractId,contractName,contractCode) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
	columns : [new Ext.grid.RowNumberer(), {
					header : "编号",
					dataIndex : 'materialitemCode'
				}, {
					header : "名称",
					width : 130,
					dataIndex : 'materialitemName'
				}, {
					header : "规格",
					width : 130,
					dataIndex : 'materialStandard'
				}, {
					header : "订货数量",
					width : 130,
					dataIndex : 'purchaseNum'
				}, {
					header : "到货批数",
					width : 130,
					dataIndex : 'arrivalLoton'
				}, {
					header : "到货数量",
					width : 130,
					dataIndex : 'arrivalCount'
				}, {
					header : "未到数量",
					width : 130,
					dataIndex : 'notAarrivalCount'
				}
				]
	});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/contractInfoRemote.getContractExeInfo?contractId='+contractId;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'//,
//				id : 'arrivalLoton'
			}, ['arrivalLoton','materialitemCode', 'materialitemName', 'materialStandard', 'purchaseNum','arrivalCount','notAarrivalCount']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
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
				region : 'center',
				border : false,
				layout : 'fit',
				height : 250,
				autoScroll : true,
				items : [gridPanel]
			});
	return mainPanel;
}

var initExecutePaymentGrid = function(contractId,contractName,contractCode) {

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
					header : "付款金额",
					width : 130,
					dataIndex : 'payMentAmount'
				}, {
					header : "承付日期",
					width : 130,
					dataIndex : 'incurredDate'
				}, {
					header : "合同金额",
					width : 130,
					dataIndex : 'conttractAmount'
				}
				]
	});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/contractInfoRemote.getContractPaymentInfo?contractId='+contractId;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'contractCode'
			}, ['contractCode', 'contractName', 'payMentAmount', 'arrearageAmount','incurredDate','conttractAmount']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
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
				region : 'south',
				border : false,
				layout : 'fit',
				height : 250,
				autoScroll : true,
				items : [gridPanel]
			});
	return mainPanel;
}

contractInfoGrid.initExecuteGrid = function(contractId,contractName,contractCode){
	
	var mainPanel = new Ext.Panel({
		layout : 'border',
		tbar : new Ext.Toolbar({
			items : ['合同编号：<b>'+contractCode+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同名称：<b>'+contractName+'</b>']
		}),
		items : [initExecuteArriveGrid(contractId,contractName,contractCode), initExecutePaymentGrid(contractId,contractName,contractCode)]
	})
	
	if (contractInfoTabpanel.tabPanel.get(contractId + "execute")) {
		contractInfoTabpanel.tabPanel.setActiveTab(contractId + "execute");
	} else {
		contractInfoTabpanel.tabPanel.add({
					id : contractId +'execute',
					title : "执行信息",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}

contractInfoGrid.initGrid = function() {

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
							header : "供应商",
							width : 130,
							dataIndex : 'departmentA'
						}, {
							header : "金额",
							width : 130,
							dataIndex : 'contractAmount'
						}, {
							header : "签订时间",
							width : 130,
							dataIndex : 'createTime'
						},{
							header : "需求信息",
							width : 130,
							dataIndex : '_column3',
							renderer:function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
								return "<a><span onclick=\"contractInfoGrid.initDemandGrid ('"+record.get('contractId')+"','"+record.get('contractName')+"','"+record.get('contractCode')+"')\">详情</span></a>";
							}
						}, {
							header : "采购策略",
							width : 130,
							dataIndex : 'createType',
							renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
									if(value=='5'){
										return '直接采购';
									}else if(value=='2'){
										return '比招';
									}else if(value=='3'){
										return '招投标';
									}else{
										return value;
									}
									
//								return "<a><span onclick=\"contractInfoGrid.initTenderGrid('"+record.get('contractId')+"','"+record.get('contractName')+"','"+record.get('contractCode')+"')\">详情</span></a>";
							}
						},{
							header : "执行信息",
							width : 130,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
									var contractName = record.get('contractName')==null?"":record.get('contractName');
									return "<a><span onclick=\"contractInfoGrid.initExecuteGrid('"+record.get('contractId')+"','"+contractName+"','"+record.get('contractCode')+"')\">详情</span></a>";
							}
						}
						]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/contractInfoRemote.getInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id','contractId', 'contractCode', 'contractName', 'departmentA','contractAmount','createTime','createType']);

	contractInfoGrid.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : contractInfoGrid.ds,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : contractInfoGrid.ds,
							displayInfo : true
						})
			});
	
	contractInfoGrid.ds.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, contractInfoGrid.queryParm);
	});
	contractInfoGrid.ds.reload();

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				tbar : getBar(),
				autoScroll : true,
				items : [gridPanel]
			});

	return mainPanel;
}