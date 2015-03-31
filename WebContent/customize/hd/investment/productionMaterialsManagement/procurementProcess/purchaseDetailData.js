// 清单详情查看
var purchaseDetailData = {
	rowIndex : null,// grid的row列号
	materialId : null,// 选择供应商需要的物料信息Id
	selectRow : null,
	selectObj : null,
	batchType : null
};

// 零星采购计划清单详细信息展示
purchaseDetailData.card5Panel = function() {
	var sm = new Ext.grid.CheckboxSelectionModel({
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 20,
				mtext : " ",
				mcol : 1,
				mwidth : 20
			});
	// 零星采购计划清单Store
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getPurchaseGridData?d='
					+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, ['procurementDetailId', 'buinessPlanDetailsId','price','department',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'note', 'demension', 'procurementId',
						'newProcessType', 'desingnation', 'purchaseType',
						'materialId', 'backNumber', 'onNumber', 'storeNumber',
						'needNumber', 'purchaseTypeName', 'actualNumber',
						'requestCode', 'optLock', 'purchaseId', 'productCode',
						'technicCondition', 'noCheck', 'noExpend', 'operable',
						'note', 'subtotal', 'contract', 'number_applications',
						'amount_applications', 'subtotal_number','materialCounts',
						'subtotal_amount', 'super_storage', 'redeployment',
						'last_year_Consume','JX','QSJH','ZZJH','CLDM','status'])
	});
	// 采购方式下拉框Store
	var procurementTypeStore = new Ext.data.SimpleStore({
				fields : ['id', 'flag'],
				data : [['比价', '比价'], ['招标', '招标'], ['其它采购', '直接采购'],
						['协议采购', '协议采购']]
			});
	// 供应商下拉框Store
	var vendorStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
							+ new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, ['vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope',
						'strInitialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'strReviewDate', 'taxID', 'property',
						'reposal', 'productVentor', 'price'])
	});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
						mtextm : " &nbsp;",
						mcolm : 1,
						mwidthm : 40,
						mtext : " ",
						mcol : 1,
						mwidth : 40,
						width : 40,
						header : "序号"
					}), {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			},{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "状态",
				width : 80,
				dataIndex : "status",
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					if(value=="0"){
						return "<font color=red>未生成</font>";
					}else if(value == "1"){
						return "<font color=green>已生成</font>";
					}else{
						return "<font color=green>未提交</font>";
					}
				}
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			}, {				
			    mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header:'需求单位',
				width : 80,
				dataIndex:'department',
				sortable : true
			},{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : '上年消耗',
				dataIndex : 'last_year_Consume',
				width : 80,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : "&nbsp",
				mcol : 1,
				mwidth : 80,
				header : "供应商",
				width : 80,
				dataIndex : "vendorName",
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				editor : new Ext.form.ComboBox({
							store : vendorStore,
							id : 'vendorName',
							triggerAction : 'all',
							valueField : 'vendorName',
							displayField : 'vendorName',
							forceSelection : true,
							mode : 'remote',
							listeners : {// 选择下拉框，对vendorId进行设值
								"select" : function(record) {
									index = vendorStore.find("vendorName", this
													.getValue());
									var r = vendorStore.getAt(index);
									this.setValue(r.get("vendorName"));
									var record = grid.getStore().getAt(purchaseDetailData.rowIndex);
									record=grid.getSelectionModel().getSelected();
									record.data.vendorId = r.get("vendorID");
								},
								'expand' : function(combo) {
									var records = purchaseDetailData.selectObj;
									if (records == null || records.length == 0) {
										Ext.Msg.alert('提示', '请选择你要设置的数据！');
										return;
									}
									for (var i = 0; i < records.length; i++) {
										var purchaseType = records[i]
												.get('purchaseTypeName');
										if (purchaseType == "比价"
												|| purchaseType == "招标") {
											combo.clearValue();
											combo.getStore().removeAll();
											Ext.Msg
													.alert('提示',
															"采购方式为'比价'或'招标'时，不能在此环节选择供应商！");
										}
									}
								}
							}
						}),
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 420,
				mtext : "资源情况",
				mcol : 6,
				mwidth : 420,
				header : "小计",
				width : 70,
				dataIndex : "subtotal",
				sortable : true
			}, {
				header : "库存",
				width : 70,
				dataIndex : "storeNumber",
				sortable : true
			}, {
				header : "待检",
				width : 70,
				resizable : false,
				dataIndex : "noCheck",
				sortable : true
			}, {
				header : "合同",
				width : 70,
				dataIndex : "contract",
				sortable : true
			}, {
				header : "欠交合同",
				width : 70,
				dataIndex : "onNumber",
				sortable : true
			}, {
				header : "不合用",
				width : 70,
				resizable : false,
				dataIndex : "operable",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求量",
				width : 80,
				dataIndex : 'materialCounts',//"needNumber",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " 多余 ",
				mcolm : 4,
				mwidthm : 400,
				mtext : "小计",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'subtotal_number',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtext : "其中",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true

			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "实际采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				editor : new Ext.form.NumberField({
							allowBlank : false,
							maxLength : 10,
							minValue : 0.0001,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
				}),
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName",
				editor : new Ext.form.ComboBox({
							id : 'editor2',
							store : procurementTypeStore,// 数据源
							displayField : 'flag',// 显示下拉列表数据值
							valueField : 'id',// 提交时数据值
							typeAhead : true,
							triggerAction : 'all',
							allowBlank : false,
							forceSelection : true,
							mode : 'local'
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if(value=="其它采购"){
						value = "直接采购";
					}
					return returnRedValue(value);
				},
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseType",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "productCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseId",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true,
				editor : new Ext.form.TextField({})
			}]);
	var batchCombo = new Ext.form.ComboBox({// 批量设置 采购方式comboBox
		id : 'batchProcurementType1',
		store : procurementTypeStore,// 数据源
		displayField : 'flag',// 显示下拉列表数据值
		valueField : 'id',// 提交时数据值
		typeAhead : true,
		triggerAction : 'all',
		width : 100,
		forceSelection : true,
		mode : 'local'
	});
	batchCombo.on('select', function(combo, record, index) {// 添加批量设置
				// 采购方式select事件
				purchaseDetailData.batchType = batchCombo.value;
			});
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
					var grid = Ext.getCmp('productionProcessId1');
			       	grid.getStore().baseParams = {
			          	start : 0,
				      	limit : 20,
						status:3
			       	};
			       	grid.store.load();
				}
			}, '-', {
				text : '提交',
				iconCls : 'Submit',
				disabled : privilegeValidate.submitCpDisable,
				id : 'viewCommit',
				handler : function() {
					lingXingSubmitAction(store);
				}
			},'-',{
				text : '生成数据',
				iconCls : 'CreateData',
				disabled : privilegeValidate.newCpDisable,
				handler : function(){
					purchaseDetailData.createData();
				}
			}, '-', {
				xtype : 'panel',
				width : 100,
				items : [batchCombo]
			}, {
				text : '批量设置',
				iconCls : 'BatchSet',
				handler : function(grid) {
					if (batchCombo.value == null || batchCombo.value == ''
							|| typeof(batchCombo.value) == 'undefined') {
						Ext.Msg.alert('提示', '请选择采购方式类型');
						return;
					}

					var records = Ext.getCmp("card5PanelDataGrid")
							.getSelectionModel().getSelections();
					if (records == null || records.length == 0) {
						Ext.Msg.alert('提示', '请选择你要设置的数据！');
						return;
					}
					for (var i = 0; i < records.length; i++) {
						records[i].set('purchaseType',
								purchaseDetailData.batchType);
						records[i].set('purchaseTypeName',
								purchaseDetailData.batchType);
						if (purchaseDetailData.batchType == '招标'
								|| purchaseDetailData.batchType == '比价') {
							records[i].set('vendorName', '');
							records[i].set('vendorId', '');
						}
					}
				}
			} 
	];

	var grid = new Ext.grid.EditorGridPanel({
		region : "center",
		store : store,
		tbar : tbar,
		cm : cm,
		sm : sm,
		id : "card5PanelDataGrid",
		clicksToEdit : 1,
		view : new MyGridView(viewConfig),
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		listeners : {// 点击供应商Cell时，进行加载供应商下拉框信息
			'cellclick' : function(grid, rowIndex, columnIndex, e) {
				if (columnIndex == 8) {
					var record = grid.getStore().getAt(rowIndex); // 根据物料动态的去
					// 取下拉列表
					var materialId = record.get("materialId");
					vendorStore.baseParams = {
						materialId : materialId,
						start : 0,
						limit : 0
					};
					vendorStore.load();
					purchaseDetailData.rowIndex = rowIndex;
				}
			},
			'afteredit' : function(e) {// 对添加汇总后，采购方式由”直接采购“向非”直接采购“状态改变时，对供应商信息进行处理。
				if (e.column == 23) {
					if (e.originalValue == '直接采购' && e.value != '直接采购') {
						e.record.set('vendorName', '');
						e.record.set('vendorId', '');
					}
				}
			}
		},
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});

	sm.on('rowselect', function(sm, rowIndex, record) {
				purchaseDetailData.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				purchaseDetailData.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					purchaseDetailData.selectRow = null;
				}
			});

	grid.on('afteredit', afterEditDown, grid);// 对grid中的数据修改后处理
	return grid;

}
function afterEditDown(obj) {
	var record = obj.record;// 被修改的行
	var field = obj.field;// 被修改的列
	if (field == 'backNumber' || field == 'onNumber' || field == 'storeNumber') {
		procurementProcessData.isLingXingCommit = false;
	}
	return;
}

// 返回红色结果值
function returnRedValue(value) {
	if (typeof(value) == 'undefined') {
		return;
	}
	value = "&nbsp;<font color='red'>" + value + "</font>";
	return value;
}

// submit操作方法
function lingXingSubmitAction(store) {
	 

	var grid1 = Ext.getCmp('card5PanelDataGrid');
	var allCounts = grid1.store.getCount();
	var records = store.getModifiedRecords();
	if (records.length == 0) {
		Ext.Msg.alert('提示', '数据未修改，无需保存！');
		return;
	}
	var str = "";
	if (allCounts > 0) {
		// 如果有记录，遍历，验证并拼接json字符串
		for (var i = 0; i < allCounts; i++) {
			grid1.store.getAt(i).data.purchaseType = grid1.store.getAt(i).data.purchaseTypeName;
			if ((grid1.store.getAt(i).data.purchaseType == '直接采购' /*|| grid1.store.getAt(i).data.purchaseType == '其它采购'*/)
					&& (grid1.store.getAt(i).data.vendorName == null || grid1.store.getAt(i).data.vendorName == '')) {
				Ext.Msg.alert('提示', '采购方式为直接采购时必须选择供应商！');
				return;
			}
			if (grid1.store.getAt(i).data.actualNumber != grid1.store.getAt(i).data.materialCounts
					&& grid1.store.getAt(i).data.note == "") {
				Ext.Msg.alert('提示', '实际采购量不等于需定量，请添加备注！');
				return;
			}

			if ((i + 1) == allCounts) {// 最后一次遍历，不拼逗号
				grid1.store.getAt(i).data.newProcessType = procurementProcessData.newProcessType;
				str += Ext.encode(grid1.store.getAt(i).data);
			} else {
				str += Ext.encode(grid1.store.getAt(i).data) + ',';
			}
		}
	}
	// 向后台发数据，处理
	Ext.Ajax.request({
		url : '../JSON/procurementDetail_ProcurementDetailRemote.updateViewGridData?d='
				+ new Date(),
		method : 'POST',
		params : {
			"updateRecords" : '[' + str + ']'
		},
		success : function() {
			Ext.Msg.alert('提示', '保存成功！');
			store.reload();
		},
		failure : function() {
			Ext.Msg.alert('错误', '保存失败！');
		}
	});
} 

purchaseDetailData.createData = function(){
	var grid = Ext.getCmp('card5PanelDataGrid');
	var id = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
		return;
	}
	for(i = 0;i < rows.length;i++){   
		var typeName = rows[i].get('purchaseTypeName');
		var status = rows[i].get('status');
		if(typeName == ''){
			Ext.MessageBox.alert('提示', '请全部选择提交了采购方式的记录!'); 
			return;
		}
		if(status!=0||status==""){
			Ext.MessageBox.alert('提示', '请全部选择未生成状态的记录!'); 
			return;
		}
		id = id + rows[i].get('procurementDetailId') + ",";
	}
	var purchaseId = grid.getStore().baseParams.purchaseId;
	var purchaseType = grid.getStore().baseParams.purchaseType;
	if (confirm('生成数据吗？')) {
		// 向后台提交数据
		Ext.Ajax.request({
			url : '../JSON/procurementProcessRemote.generateParityAndContract?d='
					+ new Date(),
			method : 'POST',
			params : {
				updateRecords : id ,
				purchaseId : purchaseId,
				type : purchaseType
			},
			success : function(response, opts) {
				// ①刷新采购计划列表页面
				var obj = Ext.decode(response.responseText);
				if (obj.success) {
					Ext.Msg.alert('提示', '数据生成成功！');
				} else {
					Ext.Msg.alert('提示', obj.msg);
				}
				var grid0 = Ext.getCmp('card5PanelDataGrid');
				grid0.getStore().baseParams = {
					start : 0,
					limit : 20,
					purchaseId : purchaseId,
					purchaseType : purchaseType
				};
				grid0.store.load();
			},
			failure : function() {
				Ext.Msg.alert('错误', '数据生成失败！');
			}
		});
	}
}