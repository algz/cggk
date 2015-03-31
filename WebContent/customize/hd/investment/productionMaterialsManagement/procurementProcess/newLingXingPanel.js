//零星采购计划新建panel
var newLingXingPanel = {
	selectRow : null,
	selectObj : null
};
// 零星采购计划添加汇总前的上部面板
procurementProcessData.upPanel = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 零星需求计划大纲展示数据源
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d='
									+ new Date()
									+ '&pieceType='
									+ procurementProcessData.processGridTab1Type,
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, [ 'procurementDetailId', 'buinessPlanDetailsId',
				     'materialQuotaId', 'materialTypeName', 'vendorId',
				     'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may',
				     'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dect',
				     'materialItemName', 'desingnation', 'note',
				     'deliveryCount', 'materialCount', 'materialStandard',
				     'productCode', 'productCode', 'productid', 'reIds',
				     'procurementId', 'threeIdString', 'newProcessType',
				     'materialId', 'vendorName', 'backNumber', 'onNumber',
				     'storeNumber', 'needNumber', 'requestCode',
				     'technicCondition', 'optLock', 'demension', 'noCheck',
				     'noExpend', 'operable','deliveryDate'])
			});

	var cm = new Ext.grid.ColumnModel( [ sm, new Ext.grid.RowNumberer( {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		width : 40,
		header : "序号"
	}), {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "器材名称",
		width : 80,
		dataIndex : "materialItemName",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "牌号",
		width : 80,
		dataIndex : "desingnation",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "规格/型号",
		width : 80,
		dataIndex : "materialStandard",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "技术条件",
		width : 80,
		dataIndex : "technicCondition",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "机型",
		width : 80,
		dataIndex : "productCode",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "需用总量",
		width : 80,
		dataIndex : "materialCounts",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "单位",
		width : 80,
		dataIndex : "demension",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "类别",
		width : 80,
		dataIndex : "materialTypeName",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "需求编号",
		width : 80,
		align : "left",
		dataIndex : "requestCode",
		sortable : true
	}, {
		mtext : " ",
		mcol : 1,
		mwidth : 80,
		header : "备注",
		width : 80,
		align : "left",
		dataIndex : "note",
		sortable : true
	} ]);
	// 零星需求计划大纲展示数据源
	var planStore = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/procurement_ProcurementRemote.getSporadicGridData?d=' + new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementId',
					totalProperty : 'totalProperty'
				}, [ 'procurementId', 'procurementCode' ])
			});
	// 向后台传参
	planStore.baseParams = {
		isPurchaseDataSelect : '1'
	};// 重新加载零星需求计划大纲展示comboBox
	planStore.reload();
	// 零星需求计划大纲展示comboBox
	var pCombo = new Ext.form.ComboBox( {
		id : 'lingxingselect',
		store : planStore,
		width : 180,
		typeAhead : true,
		mode : 'local',
		triggerAction : 'all',
		selectOnFocus : true,
		valueField : 'procurementId',
		displayField : 'procurementCode',
		appltTo : 'local-states'
	});
	// 添加select事件
	pCombo.on('select', function(combo, record, index) {
		procurementProcessData.procurementId = combo.value;
		var tree = Ext.getCmp('treePanelId');
		procurementProcessTree.parentId = 0;
		var node = tree.getNodeById(procurementProcessTree.parentId + '');
		tree.getNodeById(procurementProcessTree.parentId + '').reload();
	});

	var tbar = [
			'-',
			{
				xtype : 'panel',
				width : 180,
				items : [ pCombo ]
			},
			'-',
			{
				text : '添加汇总',
				iconCls : 'add1',
				handler : function() {
					addSummary(store);
				}
			} ];

	/*var grid = common.gridPanel('productionProcessUpId1', cm, store, tbar,
			false, sm, '采购清单列表');*/
	
	var grid = new Ext.grid.GridPanel({
		id : 'productionProcessUpId1',
		cm : cm,
		store : store,
		tbar : tbar,
		sm : sm ,
		title : '采购清单列表',
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});
	// 因为在card布局中，两个card公用common.getSelections(),会造成添加汇总异常。故重新声明
	sm.on('rowselect', function(sm, rowIndex, record) {
		procurementProcessData.selectRow = record;
	});
	sm.on('selectionchange', function(sm, t) {
		procurementProcessData.selectObj = sm.getSelections();
		if (!sm.getSelections() || sm.getSelections().length < 1) {
			procurementProcessData.selectRow = null;
		}
	});
	grid.region = 'center';
	grid.height = 300;
	return grid;

}
// 零星采购计划添加汇总后的下部面板
procurementProcessData.downPanel = function() {
	procurementProcessData.store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/procurementProcessRemote.getNullGridData?d=' + new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'procurementDetailId', 'buinessPlanDetailsId',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may',
						'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dect',
						'materialItemName', 'desingnation', 'note',
						'deliveryCount', 'materialCount', 'materialStandard',
						'productCode', 'productCode', 'productid', 'reIds',
						'procurementId', 'threeIdString', 'actualNumber',
						'purchaseType', 'procurementTypeName', 'requestCode',
						'newProcessType', 'materialId', 'vendorName',
						'backNumber', 'onNumber', 'storeNumber', 'needNumber',
						'technicCondition', 'optLock', 'noCheck', 'noExpend',
						'operable','deliveryDate' ])
			});
	// 采购方式comboBox数据源
	var procurementTypeStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ [ '比价', '比价' ], [ '招标', '招标' ], [ '直接采购', '直接采购' ] , [ '协议采购', '协议采购' ], [ '其它采购', '其它采购' ]]
	});

	var sm = new Ext.grid.CheckboxSelectionModel( {
		mtext : " ",
		mcol : 1,
		mwidth : 20
	});

	var cm = new Ext.grid.ColumnModel(
			[
					sm,
					new Ext.grid.RowNumberer( {
						mtext : " ",
						mcol : 1,
						mwidth : 40,
						width : 40,
						resizable : false,
						header : "序号"
					}),
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "器材名称",
						width : 80,
						resizable : false,
						dataIndex : "materialItemName",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "牌号",
						width : 80,
						dataIndex : "desingnation",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "规格/型号",
						width : 80,
						dataIndex : "materialStandard",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "技术条件",
						width : 80,
						dataIndex : "technicCondition",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "需用总量",
						width : 80,
						resizable : false,
						dataIndex : "materialCounts",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "单位",
						width : 80,
						resizable : false,
						dataIndex : "demension",
						sortable : true
					},
					{
						mtext : "&nbsp",
						mcol : 1,
						mwidth : 150,
						header : "供应商",
						width : 150,
						resizable : false,
						dataIndex : "vendorName",
						editor : new Ext.form.ComboBox( {// 选择供应商comboBox
									store : procurementProcessAction.venderStore,
									id : 'vendorName21',
									triggerAction : 'all',
									valueField : 'vendorName',
									displayField : 'vendorName',
									forceSelection : true,
									mode : 'local',
									renderer : function(value, cellmeta,
											record, rowIndex) {
										if (typeof (value) == 'undefined') {
											return;
										}
										value = "&nbsp;<font color='red'>"
												+ value + "</font>";
										return value;
									},
									listeners : {
										'select' : function(combo, record,
												index) {
											this.setValue(record
													.get("vendorName"));
											this.gridEditor.record.data.vendorId = record.id;
										},
										'expand' : function(combo) {
											var records = newLingXingPanel.selectObj;
											if (records == null
													|| records.length == 0) {
												Ext.Msg.alert('提示',
														'请选择你要设置的数据！');
												return;
											}
											for ( var i = 0; i < records.length; i++) {
												var purchaseType = records[i]
														.get('purchaseType');
												if (purchaseType == "比价"
														|| purchaseType == "招标") {
													combo.clearValue();
													combo.getStore()
															.removeAll();
													Ext.Msg
															.alert('提示',
																	"采购方式为'比价'或'招标'时，不能在此环节选择供应商！");
												}
											}
										}
									}
								}),
						sortable : true
					},
					{
						mtext : "资源情况",
						mcol : 7,
						mwidth : 490,
						header : "返修品",
						width : 70,
						resizable : false,
						dataIndex : "backNumber",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "欠交合同",
						width : 70,
						resizable : false,
						dataIndex : "onNumber",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "无待检",
						width : 70,
						resizable : false,
						dataIndex : "noCheck",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "无预计消耗",
						width : 70,
						resizable : false,
						dataIndex : "noExpend",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "有无合用",
						width : 70,
						resizable : false,
						dataIndex : "operable",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "库存",
						width : 70,
						resizable : false,
						dataIndex : "storeNumber",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						},
						sortable : true
					},
					{
						header : "需订量",
						width : 70,
						resizable : false,
						dataIndex : "needNumber",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "类别",
						width : 80,
						resizable : false,
						dataIndex : "materialTypeName",
						sortable : true
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "实际采购量",
						width : 80,
						resizable : true,
						dataIndex : "actualNumber",
						editor : new Ext.form.NumberField( {
							decimalPrecision : 0,
							allowNegative : false
						}),
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						}
					},
					{
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "采购方式",
						width : 80,
						resizable : false,
						dataIndex : "purchaseType",
						editor : new Ext.form.ComboBox( {// 采购方式comboBox
									store : procurementTypeStore,// 数据源
									displayField : 'flag',// 显示下拉列表数据值
									valueField : 'id',// 提交时数据值
									typeAhead : true,
									triggerAction : 'all',
									allowBlank : false,
									forceSelection : true,
									mode : 'local',
									id : 'purchaseType'
								}),
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							if (typeof (value) == 'undefined') {
								return;
							}
							value = "&nbsp;<font color='red'>" + value
									+ "</font>";
							return value;
						}
					}, {
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "需求编号",
						width : 80,
						align : "left",
						resizable : false,
						dataIndex : "requestCode",
						sortable : true
					}, {
						mtext : " ",
						mcol : 1,
						mwidth : 80,
						header : "备注",
						width : 80,
						align : "left",
						resizable : false,
						dataIndex : "note",
						sortable : true,
						editor : new Ext.form.TextField({
						})
					} ]);

	var batchCombo = new Ext.form.ComboBox( {// 批量设置 采购方式comboBox
				id : 'batchProcurementType',
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
				procurementProcessData.batchType = batchCombo.value;
			});

	var tbar = [
			'-',
			{
				text : '提交',
				iconCls : 'Submit',
				disabled : privilegeValidate.updateDisable,
				id : 'downCommit',
				disabled : procurementProcessData.isEmpty,
				handler : function() {
				// 获取store的存储总记录数
				var allCounts = procurementProcessData.store.getCount();
				if (allCounts < 0) {return;}
			 
				
				var str = "";
				if (allCounts > 0) {
					// 如果有记录，遍历，验证并拼接JSON字符串
				for ( var i = 0; i < allCounts; i++) {
					if (procurementProcessData.store.getAt(i).data.actualNumber == null
							||procurementProcessData.store.getAt(i).data.actualNumber == ''
							|| procurementProcessData.store.getAt(i).data.purchaseType == null
							|| procurementProcessData.store.getAt(i).data.purchaseType == '') {
						Ext.Msg.alert('提示', '实际采购量或采购方式不能为空！');
						return;
					} 
					if(procurementProcessData.store.getAt(i).data.actualNumber!=procurementProcessData.store.getAt(i).data.needNumber &&
					   procurementProcessData.store.getAt(i).data.note==""){
						Ext.Msg.alert('提示', '实际采购量不等于需定量，请添加备注！');
						return;
					}
					if ((procurementProcessData.store.getAt(i).data.purchaseType == '直接采购')
							&& (procurementProcessData.store.getAt(i).data.vendorName == null || procurementProcessData.store
									.getAt(i).data.vendorName == '')) {
						Ext.Msg.alert('提示', '采购方式为直接采购时必须选择供应商！');
						return;
					}
					if ((i + 1) == allCounts) {// 最后一次遍历，不拼逗号
						procurementProcessData.store.getAt(i).data.newProcessType = procurementProcessData.newProcessType;
						str += Ext
								.encode(procurementProcessData.store.getAt(i).data);
					} else {
						str += Ext
								.encode(procurementProcessData.store.getAt(i).data) + ',';
					}
				}
				}
			// 向后台发数据，处理
			Ext.Ajax
					.request( {
						url : '../JSON/procurementDetail_ProcurementDetailRemote.updateGridData?d=' + new Date(),
						method : 'POST',
						params : {
							"updateRecords" : '[' + str + ']'
						},
						callback : function(opts, success, response) {
							var jresult = Ext.util.JSON
									.decode(response.responseText);
							if (jresult.success == true) {
								var upGrid = Ext
										.getCmp("productionProcessUpId1");
								upGrid.getStore().removeAll();
								var grid1 = Ext.getCmp("productionProcessId1");
								grid1.getStore().baseParams = {
									start : 0,
									limit : 20
								};
								grid1.getStore().load();
								procurementProcessData.threeIdStrings = '';
								procurementProcessData.store.removeAll();
								var grid2 = Ext.getCmp("lingxingselect");
								grid2.getStore().load();
								Ext.Msg.alert('提示', '保存成功！');
								Ext.getCmp("downCommit").disable();
								procurementProcessData.isLingXingCommit = false;
								procurementProcessData.procurementId = '';
								procurementProcessData.rightpanel1.getLayout()
										.setActiveItem(0);
							} else {
								Ext.Msg.alert('提示',
										'保存数据失败：' + jresult.msg + '！');
							}

						}
					});
		}
			},
			'-',
			{
				text : '取消',
				iconCls : 'Cancel',
				handler : function() {
					Ext.getCmp("downCommit").disable();
					var upGrid = Ext.getCmp("productionProcessUpId1");
					upGrid.store.removeAll();
					upGrid.getStore().load();
					procurementProcessData.threeIdStrings = '';
					procurementProcessData.store.removeAll();
					procurementProcessData.store.load();
					procurementProcessData.isLingXingCommit = false;
					procurementProcessData.procurementId = '';
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			}, 
			'-',
			{
				xtype : 'panel',
				width : 100,
				items : [ batchCombo ]
			}, 
			{
				text : '批量设置',
				iconCls : 'BatchSet',
				handler : function(grid) {
					if(batchCombo.value == null||batchCombo.value==''||typeof(batchCombo.value)=='undefined'){
						Ext.Msg.alert('提示', '请选择采购方式类型');
						return;
					}
				
					var records = newLingXingPanel.selectObj;
					if (records == null || records.length == 0) {
						Ext.Msg.alert('提示', '请选择你要设置的数据！');
						return;
					}
					for ( var i = 0; i < records.length; i++) {
						records[i].set('purchaseType',
								procurementProcessData.batchType);
						if (procurementProcessData.batchType == '招标'
								|| procurementProcessData.batchType == '比价') {
							records[i].set('vendorName', '');
							records[i].set('vendorId', '');
						}
					}
				}
			} ];

	var grid = new Ext.grid.EditorGridPanel( {
		region : "center",
		store : procurementProcessData.store,
		tbar : tbar,
		cm : cm,
		sm : sm,
		id : "productionProcessDownId1",
		listeners : { // 单击表格事件
			'cellclick' : function(grid, rowIndex, columnIndex, e) {
				if (columnIndex == 8) {// 第8列，当点击供应商列，可进行下拉框选择
				var record = grid.getStore().getAt(rowIndex); // Get the
																// Record
				var materialId = record.get("materialId"); // 获得物料信息ID，以选取相应供应商
				var purchaseType = record.get('purchaseType');// 获得采购方式
				if (purchaseType == null || purchaseType == '') {
					Ext.Msg.alert('提示', '请先选择采购方式!');
					return;
				}
				procurementProcessAction.venderStore.baseParams = {
					materialId : materialId,
					start : 0,
					limit : 0
				};
				procurementProcessAction.venderStore.on("beforeload",
						function() {
							procurementProcessAction.venderStore.baseParams = {
								materialId : materialId,
								start : 0,
								limit : 0
							};
						});
				procurementProcessAction.venderStore.load();
				procurementProcessData.rowIndex = rowIndex;
			}
		},
		'afteredit' : function(e) {// 对添加汇总后，采购方式由”直接采购“向非”直接采购"状态改变时，对供应商信息进行处理。
				if (e.column == 29) {
					if (e.originalValue == '直接采购' && e.value != '直接采购') {
						e.record.set('vendorName', '');
						e.record.set('vendorId', '');
					}
				}
			}
		},
		clicksToEdit : 1,
		view : new MyGridView(viewConfig),
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});

	sm.on('rowselect', function(sm, rowIndex, record) {
		newLingXingPanel.selectRow = record;
	});
	sm.on('selectionchange', function(sm, t) {
		newLingXingPanel.selectObj = sm.getSelections();
		if (!sm.getSelections() || sm.getSelections().length < 1) {
			newLingXingPanel.selectRow = null;
		}
	});

	grid.on('afteredit', afterEditDown, grid);
	return grid;

}
//根据修改特定字段后，将可以进行提交
function afterEditDown(obj) {
	var record = obj.record;// 被修改的行
	var field = obj.field;// 被修改的列
	if (field == 'backNumber' || field == 'onNumber' || field == 'storeNumber') {
		procurementProcessData.isLingXingCommit = false;
	}
	return;
}
//添加汇总
function addSummary(store){
	if (procurementProcessData.procurementId == null
			|| procurementProcessData.procurementId == '') {
		Ext.Msg.alert('提示', '请选择大纲！');
		return;
	}
	if (procurementProcessData.materialCatLogId == null
			|| procurementProcessData.materialCatLogId == '') {
		Ext.Msg.alert('提示', '请点击物资种类节点,选择需添加物资的种类信息！');
		return;
	}
	var records = procurementProcessData.selectObj;
	if (records == null || records.length == 0) {
		Ext.Msg.alert('提示', '请选择你要添加的数据！');
		return;
	}
	procurementProcessData.isEmpty = false;
	Ext.getCmp("downCommit").enable();// 启用提交按钮
	var abc = Ext.getCmp("downCommit");
	// 得到匹配不重复的规则字符串
	var arrTemp = new Array();
	for ( var i = 0; i < records.length; i++) {
		var tempIdString = ''// 进行‘类型’匹配的字符串
				+ records[i].data.materialItemName
				+ '@'
				+ records[i].data.desingnation
				+ '@'
				+ records[i].data.materialStandard
				+ '@'
				+ records[i].data.technicCondition + '';
		// 首次循环，给定初值
		if (i == 0) {
			arrTemp.push(tempIdString);
		} else {
			// 如果不重复，加入arrTemp数组
			if (arrTemp.indexOf(tempIdString) == -1) {
				arrTemp.push(tempIdString);
			}
		}
	}
	var numCount = procurementProcessData.store.getCount();// 或store中的缓存记录数
	var arr = new Array();

	// 遍历arrTemp数组，计算
	for ( var i = 0; i < arrTemp.length; i++) {
		var tempId = arrTemp[i];
		var k = 0;
		var tempRecord = null;
		var modifiedIds = '';
		if (procurementProcessData.threeIdStrings
				.indexOf(tempId) != -1) {// 如果down不包含该物料，down新增，up删除，记录up当前添加的id，
			tempRecord = procurementProcessData.store
					.getById(tempId);// 获取up当前数据
			modifiedIds = modifiedIds + tempRecord.data.reIds
					+ '@';// 记录
			arr.push(tempRecord);// 用于新增
			procurementProcessData.store.remove(tempRecord);// up删除
		}
		// 更新store的数据
		for ( var j = 0; j < records.length; j++) {
			var tempIdString = ''
					+ records[j].data.materialItemName + '@'
					+ records[j].data.desingnation + '@'
					+ records[j].data.materialStandard + '@'
					+ records[j].data.technicCondition + '';
			// 如果能够匹配，合计
			if (tempId == tempIdString) {
				tempRecord = records[j];
				modifiedIds = modifiedIds + tempRecord.id + '@';
				// 如果不包含
				if (k == 0
						&& procurementProcessData.threeIdStrings
								.indexOf(tempId) == -1) {
					k++;
					tempRecord.id = tempId;
					tempRecord.data.id = tempId;// 存储生成id
					tempRecord.data.newProcessType = procurementProcessData.newProcessType;
					procurementProcessData.threeIdStrings += tempId + ',';// 大匹配字符串
					tempRecord.data.threeIdString = tempId;// 匹配字符串，存入store

					arr.push(tempRecord);
					store.remove(tempRecord);
					continue;
				}
				// tempId;//匹配字符串，存入store
				arr[i].data.materialCounts += tempRecord.data.materialCounts;// 需用量
				arr[i].data.jan += tempRecord.data.jan;// 一月
				arr[i].data.feb += tempRecord.data.feb;// 二月
				arr[i].data.mar += tempRecord.data.mar;// 三月
				arr[i].data.apr += tempRecord.data.apr;// 四月
				arr[i].data.may += tempRecord.data.may;// 五月
				arr[i].data.june += tempRecord.data.june;// 六月
				arr[i].data.july += tempRecord.data.july;// 七月
				arr[i].data.aug += tempRecord.data.aug;// 八月
				arr[i].data.sept += tempRecord.data.sept;// 九月
				arr[i].data.oct += tempRecord.data.oct;// 十月
				arr[i].data.nov += tempRecord.data.nov;// 十一月
				arr[i].data.dect += tempRecord.data.dect;// 十二月
				k++;
				store.remove(tempRecord);
			}
		}
		arr[i].data.reIds = modifiedIds;
	}
	procurementProcessData.store.add(arr);
	procurementProcessData.isLingXingCommit = false;
}