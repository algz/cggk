procurementProcessAction = {
	materialId : null,// 物料信息id
	parityId : null,// 比价招标信息Id
	property1 : '',
	type : '',// 比价招标类型
	formCanSave : false
	// form保存是否可提交的标识符
};
/**
 * 打开累计发放信息页面
 * 
 * @param {}
 *            materialid
 */
procurementProcessAction.showProvideInfo = function(name) {
	var record = Ext.getCmp(name).getSelectionModel().getSelections();
	provideInfo.getGridData(record[0].get("materialCode"),
			record[0].get("productCode")).show();
}
/**
 * 显示机型的采购明细
 */
procurementProcessAction.showDetail = function(materialid, procurementId) {
	var buttons = [{
				text : '关闭',
				handler : function() {
					window.close();
				}
			}];

	var procurementAnnualPanle = procurementProcessData.card3Panel1();
	procurementAnnualPanle.getStore().baseParams = {
		start : 0,
		limit : 20,
		procurementId : procurementId,
		materialId : materialid,
		type : '1',
		materialBuyType : '2'
	};
	procurementAnnualPanle.getStore().load();
	var window = new Ext.Window({
				id : "showDetailWind",
				width : 800,
				layout : 'fit',
				autoScroll : true,
				title : '明细',
				//modal : true,
				items : procurementAnnualPanle,
				buttons : buttons
			});
	window.show();
}
// 采购计划和采购比价审批送审
procurementProcessAction.workFlow = function(type) {
	var record = common.selectObj;
	if (record == null || record.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	}
	var arr = new Array();
	var id = "";
	var name = "采购计划审批";
	var flowType = "ProductionProcess";
	if (type == "1") {
		name = "定额计划采购审批";
		flowType = "ProductionProcess";
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('status') != '1') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('purchaseId'));
			id += record[i].get('purchaseId') + ",";
		}
	}else if (type == "2") {
		name = "比价审批";
		flowType = "ParityAudit";
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('applicationStatus') != '2') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('parityId'));
			id += record[i].get('parityId') + ",";
		}
	} else if (type == "4") {
		name = "协议采购审批";
		flowType = "AgreementPurchaseAudit";
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('applicationStatus') != '2') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('parityId'));
			id += record[i].get('parityId') + ",";
		}
	} else if (type == "5") {//改成直接采购
//		name = "其它采购审批";
		name = "直接采购审批";
		flowType = "OtherPurchaseAudit";
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('applicationStatus') != '2') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('parityId'));
			id += record[i].get('parityId') + ",";
		}
	} else if (type == "6") {
		name = "招投标采购审批";
		flowType = "ZhaoBiao";
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('applicationStatus') != '2') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('parityId'));
			id += record[i].get('parityId') + ",";
		}
	}else {
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('status') != '1') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('purchaseId'));
			id += record[i].get('purchaseId') + ",";
		}
	}
	procurementProcessAction.type = type;
	var flowID = privilegeValidate.getFlowID(type);
	if (flowID == "") {
		Ext.Msg.alert('提示', '没有送审权限！');
		return;
	}
	/**
	 * 默认设置审批流程模板走的方法
	 * 
	 * @param {}
	 *            templetId 审批模板的id
	 * @param {}
	 *            approvePressName 流程名称
	 * @param {}
	 *            approveNote 送审附言
	 * @param {}
	 *            objectID 审批对象ID，可以是多个，用','隔开
	 * @param {}
	 *            objectType 审批对象类型
	 * @param {}
	 *            noPrevilige 是否不进行权限验证,true为不验证，默认为false
	 * @param {}
	 *            success 提交成功的回调函数
	 * @param {}
	 *            failure 提交失败的回调函数
	 */
	approvePanel.submit(flowID, name, name, id.substring(0, id.length - 1),
			flowType, true, success, failure);
}// 送审成功后的操作
function success() {
	var rows;
	var remote;
	var arr = new Array();

	if (procurementProcessAction.type == "2") {// 送审成功，修改采购比价的审批状态
		remote = Seam.Component.getInstance("parityRemote");
		rows = Ext.getCmp("productionProcessId2").getSelectionModel()
				.getSelections();
		for (var i = 0; i < rows.length; i++) {
			arr.push(rows[i].get('parityId'));

		}
		remote.updateProperties(arr, function(result) {
					if (result == "{success : true}") {
						for (i = 0; i < rows.length; i++) {
							rows[i].set('applicationStatusName', '审批中');
							rows[i].set('applicationStatus', '3');
						}
					}
				});
	} else if (procurementProcessAction.type == "4") {// 送审成功，修改协议采购的审批状态
		remote = Seam.Component.getInstance("parityRemote");
		rows = Ext.getCmp("agreementPurchaselGridPanel").getSelectionModel()
				.getSelections();
		for (var i = 0; i < rows.length; i++) {
			arr.push(rows[i].get('parityId'));

		}
		remote.updateProperties(arr, function(result) {
					if (result == "{success : true}") {
						for (i = 0; i < rows.length; i++) {
							rows[i].set('applicationStatusName', '审批中');
							rows[i].set('applicationStatus', '3');
						}
					}
				});
	} else if (procurementProcessAction.type == "5") {// 送审成功，修改直接采购的审批状态
		Ext.getCmp("otherPurchaselGridPanel").store.reload();
//		remote = Seam.Component.getInstance("parityRemote");
//		rows = Ext.getCmp("otherPurchaselGridPanel").getSelectionModel()
//				.getSelections();
//		for (var i = 0; i < rows.length; i++) {
//			arr.push(rows[i].get('parityId'));
//
//		}
//		remote.updateProperties(arr, function(result) {
//					if (result == "{success : true}") {
//						for (i = 0; i < rows.length; i++) {
//							rows[i].set('applicationStatusName', '审批中');
//							rows[i].set('applicationStatus', '3');
//						}
//					}
//				});
	}else if (procurementProcessAction.type == "6") {// 送审成功，修改其它采购的审批状态
		remote = Seam.Component.getInstance("parityRemote");
		rows = Ext.getCmp("productionProcessId3").getSelectionModel()
				.getSelections();
		for (var i = 0; i < rows.length; i++) {
			arr.push(rows[i].get('parityId'));

		}
		remote.updateProperties(arr, function(result) {
					if (result == "{success : true}") {
						for (i = 0; i < rows.length; i++) {
							rows[i].set('applicationStatusName', '审批中');
							rows[i].set('applicationStatus', '3');
						}
					}
				});
	} else {// 送审成功，修改采购计划（清单）审批状态
		remote = Seam.Component.getInstance("procurementProcessRemote");
		rows = Ext.getCmp("productionProcessId1").getSelectionModel()
				.getSelections();
		for (var i = 0; i < rows.length; i++) {
			arr.push(rows[i].get('purchaseId'));
		}
		remote.updateProperties(arr, function(result) {
					if (result == "[true]") {
						for (i = 0; i < rows.length; i++) {
							rows[i].set('stateName', '审批中');
							rows[i].set('status', '2');
						}
					}
				});
	}
}
function failure() {
	Ext.Msg.alert('提示', '没有送审权限！');
}
// 采购计划删除方法，只能删除待审批状态下的采购计划
procurementProcessAction.del = function() {
	// 验证是否勾选id
	var record = common.selectObj;
	if (record == null || record.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	}
	var arr = new Array();
	for (var i = 0; i < record.length; i++) {
		if (record[i].get('status') != '1') {
			Ext.Msg.alert('提示', '只能删除待审批状态下的采购计划，所有选项并没有全部处于待审批状态！');
			return;
		}
		arr.push(record[i].get('purchaseId'));
	}
	Ext.MessageBox.confirm('删除采购清单', '删除后无法恢复，是否继续？　', function(btn, text) {
				if (btn == 'yes') {
					callSeam("procurementProcessRemote", "deletePurchase",
							[arr], procurementProcessAction.callBack);
				} else {
				}
			});
}
// 采购过程修改方法
procurementProcessAction.update = function() {
	var record = common.selectRow;
	if (record == null) {
		Ext.Msg.alert('提示', '请选择记录');
	} else {
		var win = procurementProcessForm.getForm();
		win.setTitle = 'x';
		win.show();
	}
}
// 采购过程回调方法，刷新计划大纲下拉框
procurementProcessAction.callBack = function(b) {
	if (b) {
		var grid1 = Ext.getCmp("productionProcessId1");
		grid1.getStore().baseParams = {
			start : 0,
			limit : 20,
			type:procurementProcessData.newProcessType
		};
		grid1.store.load();
		var grid2 = Ext.getCmp("lingxingselect");
		grid2.getStore().load();
		var grid3 = Ext.getCmp("nianduselect");
		grid3.getStore().load();
	} else {
		Ext.Msg.alert('提示', '重新点击');
	}
}

// 对采购比价，采购招标，生成合同之前进行指定供应商窗口
procurementProcessAction.setVendor = function(url, type,vendorId,price) {
	var win = addWinGrid.gridWin(url, type,vendorId,price);
	win.show();
}
// 采购过程数据源
procurementProcessAction.store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/parityDetailRemote.getParityDetailGridData?d='
								+ new Date(),
						method : 'post'
					}),

			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['parityId', 'parityCode', 'createDate', 'deliveryDate',
							'applicationStatus', 'applicationStatusName',
							'editors', 'editorsNmae', 'editorsDept',
							'purchaseId', 'purchaseCode', 'vendorId',
							'vendorName', 'type', 'typeName', 'materialId',
							'desingnation', 'materialItemName',
							'materialStandard', 'mCtgName', 'parityDetailId',
							'demandTime', 'department', 'lastprice',
							'manufacturer1', 'manufacturer2', 'manufacturer3',
							'manufacturerOne', 'manufacturerTwo',
							'manufacturerOneName', 'manufacturerTwoName',
							'planner', 'planPrice', 'price1', 'price2',
							'price3', 'provider', 'providerName',
							'plannerName', 'purpose', 'remark', 'remarks',
							'scope', 'materialItemName', 'mCtgName',
							'purchaseEditor'])

		});
// 获得选择供应商下拉列表的数据源
procurementProcessAction.venderStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
								+ new Date(),
						method : 'post'
					}),
			listeners : {
				load : function() {
				}
			},
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'vendorID',
						totalProperty : 'totalProperty'
					}, ['vendorID', 'vendorName', 'vendorCode', 'accountID',
							'address', 'bank', 'businessScope',
							'strInitialEvaluationDate', 'vendorLevel', 'phone',
							'reviewResult', 'strReviewDate', 'taxID',
							'property', 'reposal', 'productVentor'])
		});

// 刷新供应商下拉列表方法
procurementProcessAction.freshVenderStore = function(materialId) {
	procurementProcessAction.venderStore.baseParams = {
		start : 0,
		limit : 0,
		materialId : materialId
	};
	procurementProcessAction.venderStore.reload();
}

// 显示比价信息详情
procurementProcessAction.showParityDetail = function(id, code,
		materialItemName, desingnation, materialStandard, materialId,
		purchaseId, demension, technicCondition, applicationStatus) {
	var contractForm;
	var parityVendorGrid;
	var parityDetailId;
	var showOnly;//只显示，0为假，1为真
	// ①当申请状态为‘编制中：1’，‘待审批：2’时，加载可编辑的比价详细信息页面，否则加载只读的比价详细信息页面
	if (applicationStatus == '1' || applicationStatus == '2') {
		Ext.getCmp("formsave").enable();
		procurementProcessData.rightpanel2.getLayout().setActiveItem(1);
		contractForm = Ext.getCmp('parityDetailFormId');
		parityVendorGrid = Ext.getCmp('parityVendorGrid');
		showOnly = 0;
	} else {
		Ext.getCmp("formsave").disable();
		procurementProcessData.rightpanel2.getLayout().setActiveItem(2);
		contractForm = Ext.getCmp('parityDetailReadOnlyFormId');
		parityVendorGrid = Ext.getCmp('parityVendorReadOnlyGrid');
		showOnly = 1;
	}
	// ②提交页面，向后台传递参数。获取form要加载的数据。
	comparePricePanel.materialId = materialId;
	contractForm.form.doAction('load', {
				waitTitle : '加载编辑数据',
				waitMsg : '正在加载编辑数据',
				url : '../JSON/parityDetailRemote.getParityDetailStringData?d='
						+ new Date(),
				method : 'post',
				params : {
					start : 0,
					limit : 20,
					parityId : id,// 比价招标id
					parityCode : code,// 比价招标信息名称
//					materialItemName : materialItemName,// 物料名称
//					desingnation : desingnation,
//					materialStandard : materialStandard,
//					demension : demension,
//					technicCondition : technicCondition,
					materialId : materialId,// 物料信息id
					purchaseId : purchaseId,// 采购清单id
					applicationStatus : applicationStatus,
					// 申请状态
					showOnly : showOnly 
				},
				success : function(form, action) {
					// 加载后台返回的JSON数据。
					form.loadRecord(action.result);
					// 根据已生成采购审批记录得record，可以加载比价-供应商关系grid
					parityDetailId = action.result.data.parityDetailId;
					if (typeof(parityDetailId) != 'undefined') {
						parityVendorGrid.getStore().baseParams = {
							start : 0,
							limit : 20,
							parityDetailId : parityDetailId
						};
						parityVendorGrid.getStore().load();
					}
				},
				failure : function(form, action) {
				}
			});
}

// 显示年度采购计划，零星采购计划详情
procurementProcessAction.showPurchaseDetail = function(purchaseId,
		purchaseType, state, type) {
	var grid;
	if (purchaseType == '1') {// 年度采购计划展示
		if (state == 1) {// 审批状态为‘待审批’的，可编辑的cell为enable
			procurementProcessData.rightpanel1.getLayout().setActiveItem(7);// 展示年度采购计划详细信息
			grid = Ext.getCmp('card6PanelDataGrid');
		} else if (type == null) {//采购过程管理模块中
			if (state == 3) {
				procurementProcessData.rightpanel1.getLayout().setActiveItem(3);// 展示年度采购计划详细信息
				grid = Ext.getCmp('card4PanelDataGrid');
			} else {//待审批state=2
				procurementProcessData.rightpanel1.getLayout().setActiveItem(8);// 展示年度采购计划详细信息
				grid = Ext.getCmp('card7ReadOnlyPanelDataGrid');
			}
		} else {// 定额计划模块中,审批状态:审批中,已审批
			procurementProcessData.rightpanel1.getLayout().setActiveItem(5);// 展示年度采购计划详细信息
			grid = Ext.getCmp('card4ReadOnlyPanelDataGrid');
		}
	}
	if (purchaseType == '2') {// 零星采购计划展示
		if (state == 1 || (type == null && state == 3)) {// 审批状态为‘待审批’的，可编辑的cell为enable
			procurementProcessData.rightpanel1.getLayout().setActiveItem(4);// 展示零星采购计划详细信息
			grid = Ext.getCmp('card5PanelDataGrid');
		} else {// 审批状态不为‘待审批’的，可编辑的cell为disabled
			procurementProcessData.rightpanel1.getLayout().setActiveItem(6);// 展示年度采购计划详细信息
			grid = Ext.getCmp('card5ReadOnlyPanelDataGrid');
		}
	}
	// 加载grid
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		purchaseId : purchaseId,
		purchaseType : purchaseType
	};
	grid.store.load();
}

// 搜索
procurementProcessAction.search = function(type, status) {
	var searchCatlogName = document.getElementById('searchCatlogName').value;
	var grid = Ext.getCmp('productionProcessId1');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		searchCatlogName : searchCatlogName,
		type : type,
		status : status
	};
	grid.store.load();
}
// 搜索比价信息
procurementProcessAction.searchCompare = function() {
	var searchCatlogName = document.getElementById('searchCatlogNameCompare').value;
	var searchMaterialName = document
			.getElementById('searchMaterialNameCompare').value;
	var grid = Ext.getCmp('productionProcessId2');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		searchCatlogName : searchCatlogName,
		searchMaterialName : searchMaterialName,
		type : '1'
	};
	grid.store.load();
}

// 搜索招投标信息
procurementProcessAction.searchCompareTemp = function() {
	var searchCatlogName = document
			.getElementById('searchCatlogNameCompareTemp').value;
	var searchMaterialName = document
			.getElementById('searchMaterialNameCompareTemp').value;
	var grid = Ext.getCmp('otherPurchaselGridPanel');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		searchCatlogName : searchCatlogName,
		searchMaterialName : searchMaterialName,
		type : '5'
	};
	grid.store.reload();
}
// 比价，招标生成合同
procurementProcessAction.generateContract = function(id, type) {
	// 获得钩选记录
	var records = common.selectObj;
	if (records == null || records.length == 0) {
		Ext.Msg.alert('提示', '请选择你要生成的数据！');
		return;
	}
	var str = "";
	if (records.length > 0) {
		for (var i = 0; i < records.length; i++) {
			// ①对每条record进行验证
			if (records[i].data.vendorId == null
					|| records[i].data.vendorId == '') {
				Ext.Msg.alert('提示', '请指定供应商！');
				return;
			}
			if (records[i].data.type == '1'||records[i].data.type == '2') {
				if (records[i].data.applicationStatus != '4') {
					Ext.Msg.alert('提示', '当前记录没有全部处于已审批状态！');
					return;
				}
			} else {
				if (records[i].data.applicationStatus != '6') {
					Ext.Msg.alert('提示', '当前记录没有全部处于待生成合同状态！');
					return;
				}
			}
			// ②将record 解码为String
			if ((i + 1) == records.length) {
				str += Ext.encode(records[i].data);
			} else {
				str += Ext.encode(records[i].data) + ',';
			}
		}

		if (confirm('生成合同数据吗？')) {
			Ext.Ajax.request({
						url : '../JSON/parityRemote.generateContract?d='
								+ new Date().getTime(),
						method : 'POST',
						params : {
							"updateRecords" : '[' + str + ']'
						},
						success : function() {
							// 手动设置已生成后的状态。
							for (var j = 0; j < records.length; j++) {
								records[j].set('applicationStatusName', '已生成');
								records[j].set('applicationStatus', '5');
							}
							var grid = Ext.getCmp(id);
							grid.getStore().baseParams = {
								start : 0,
								limit : 20,
								type : type
							};
							// 加载比价/招标页面
							grid.store.load({
										nocache : true,
										timeout : 30
									});
							Ext.Msg.alert('提示', '合同生成成功！');
						},
						failure : function() {
							Ext.Msg.alert('错误', '合同生成失败！');
						}
					});
		}
	}
}
// 清单审批进度
procurementProcessAction.showPurchaseFlowInstance = function(id) {
	var flowViewWindow = new FlowViewWindow();
	flowViewWindow.viewFlowInstanceByObject(id, "ProductionProcess");
}
// 比价审批进度
procurementProcessAction.showParityAuditFlowInstance = function(id) {
	var flowViewWindow = new FlowViewWindow();
	flowViewWindow.viewFlowInstanceByObject(id, "ParityAudit");
}

// 比价审批进度
procurementProcessAction.showAgreementPurchaseAuditFlowInstance = function(id) {
	var flowViewWindow = new FlowViewWindow();
	flowViewWindow.viewFlowInstanceByObject(id, "AgreementPurchaseAudit");
}

// 生成比价、招标、合同数据
procurementProcessAction.generateParityContractData = function() {
	// ①获得勾选的采购计划记录
	var records = common.selectObj;
	if (records == null || records.length == 0) {
		Ext.Msg.alert('提示', '请选择你要生成的数据！');
		return;
	}
	var str = "";
	if (records.length > 0) {
		// ②遍历每条记录，验证送审状态是否为‘已审批’。如通过，则将采购清单Id拼接为String
		for (var i = 0; i < records.length; i++) {
			if (records[i].get('status') != '3') {
				Ext.Msg.alert('提示', '所选项没有全部处于已审批状态');
				return;
			}
			if ((i + 1) == records.length) {
				str += records[i].data.purchaseId;
			} else {
				str += records[i].data.purchaseId + ',';
			}
		}
		if (confirm('生成数据吗？')) {
			// 向后台提交数据
			Ext.Ajax.request({
				url : '../JSON/procurementProcessRemote.generateParityAndContract?d='
						+ new Date(),
				method : 'POST',
				params : {
					"updateRecords" : '' + str + ''
				},
				success : function(response, opts) {
					// ①刷新采购计划列表页面
					var obj = Ext.decode(response.responseText);
					if (obj.success) {
						Ext.Msg.alert('提示', '数据生成成功！');
					} else {
						Ext.Msg.alert('提示', obj.msg);
					}
					var grid0 = Ext.getCmp('productionProcessId1');
						grid0.getStore().baseParams = {
							start : 0,
							limit : 20,
							status:3
						};
						grid0.store.load();
				},
				failure : function() {
					Ext.Msg.alert('错误', '数据生成失败！');
				}
			});
		}

	}
}
