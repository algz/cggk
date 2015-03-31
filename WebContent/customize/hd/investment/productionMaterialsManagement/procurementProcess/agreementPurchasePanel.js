// 比价信息列表
var agreementPurchasePanel = {
	materialId : null,
	selectRow : null,
	selectObj : null,
	oldVendorIDs : ''
};

// /已下是协议采购功能

// ②协议采购详情信息选项卡(可编辑)，当申请状态为‘待审批’或‘编制中’时，可以进行编辑。
// agreementPurchasePanel.card22 = function() {
// var tab = new Ext.Panel( {
// title : '协议采购详情列表',
// id : 'procurementProcessDataGrid22',
// layout : 'fit',
// region : 'center',
// items : [ agreementPurchasePanel.parityDetailPanel()]
// });
// return tab;
// };
// //③协议采购详情信息选项卡(只读)，当申请状态不为‘待审批’或‘编制中’时，不可以进行编辑。
// agreementPurchasePanel.card23 = function() {
// var tab = new Ext.Panel( {
// title : '协议采购详情列表',
// id : 'procurementProcessDataGrid23',
// layout : 'fit',
// region : 'center',
// items : [ agreementPurchasePanel.parityDetailReadOnlyPanel()]
// });
// return tab;
// };

// ①协议采购信息列表选项卡
agreementPurchasePanel.list = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/parityRemote.getParityGridData?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'id',
							totalProperty : 'totalProperty'
						}, ['parityId', 'parityCode', 'createDate',
								'deliveryDate', 'applicationStatus',
								'applicationStatusName', 'editors',
								'editorsNmae', 'editorsDept', 'purchaseId',
								'purchaseCode', 'vendorId', 'vendorName',
								'type', 'typeName', 'materialId',
								'desingnation', 'materialItemName',
								'materialStandard', 'mCtgName', 'demension',
								'technicCondition','vendorNums','deliveryStatus',
								'planActualnumber'])
			});
	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([sm, {

		header : '编号',
		dataIndex : 'parityCode',
		sortable : true,
		renderer : function(value, cellmeta, record, rowIndex) {

			var id = record.get("parityId");
			var code = record.get("parityCode");
			var materialItemName = record.get("materialItemName");
			var desingnation = record.get("desingnation");
			var materialStandard = record.get("materialStandard");
			var materialId = record.get("materialId");
			var purchaseId = record.get("purchaseId");
			var demension = record.get("demension");
			var technicCondition = record.get("technicCondition");
			var applicationStatus = record.get("applicationStatus");
			// 获取当前dom里的值，带到form表单里
			value = "&nbsp;<font color=blue>" + value + "</font>";
			// return value;
			return "<a href='javascript:void(0);' onclick=agreementPurchasePanel.showAgreementDetail('"
					+ id
					+ "','"
					+ code
					+ "','"
					+ materialItemName
					+ "','"
					+ desingnation
					+ "','"
					+ materialStandard
					+ "','"
					+ materialId
					+ "','"
					+ purchaseId
					+ "','"
//					+ demension
					+ "','"
//					+ technicCondition
					+ "','"
					+ applicationStatus
					+ "') >" + value + "</a>";

		}

	}, {
		header : '器材名称',
		dataIndex : 'materialItemName',
		width : 80,
		sortable : true
	}, {
		header : '牌号',
		dataIndex : 'desingnation',
		width : 80,
		sortable : true
	}, {
		header : '规格',
		dataIndex : 'materialStandard',
		width : 80,
		sortable : true
	},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	}, {
		header : ' 生成日期 ',
		dataIndex : 'createDate',
		width : 120,
		sortable : true
	}, {
		header : ' 交货日期 ',
		dataIndex : 'deliveryDate',
		width : 120,
		sortable : true
	}, {
		header : ' 申请状态 ',
		dataIndex : 'applicationStatusName',
		width : 100,
		sortable : true
	}, {
		header : '审批进度',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex) {

			var id = record.get("parityId");
			var status = record.get("applicationStatus");
			// 如果在审批中或已审批状态，才能查看进度
			if (status == '3' || status == '4') {
				return "<a href='javascript:void(0);' onclick=procurementProcessAction.showAgreementPurchaseAuditFlowInstance('"
						+ id + "')><font color=blue>查看</font></a>";
			}
		}
	}, {
		header : '审批记录',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex) {
			var id = record.get("parityId");
			var applicationStatus = record.get("applicationStatus");
			if (parseInt(applicationStatus) > 1) {
				return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
						+ id + "')><font color=blue>查看</font></a>";
			}
		},
		sortable : true
	}, {
		header : ' 物资类别 ',
		dataIndex : 'mCtgName',
		width : 100,
		sortable : true
	}, {
		header : '编辑人',
		dataIndex : 'editorsNmae',
		width : 80,
		sortable : true
	}, {
		header : '部门',
		dataIndex : 'editorsDept',
		width : 80,
		sortable : true
	}, {
		header : '采购清单来源 ',
		dataIndex : 'purchaseCode',
		width : 120,
		sortable : true
	}, {
		header : '建议采购数量',
		dataIndex : 'planActualnumber',
		width : 120,
		sortable : true
	},{
		header : '中标供应商 ',
		dataIndex : 'vendorName',
		width : 80,
		renderer : function(value, cellmeta, record, rowIndex) {
			if (typeof(value) == 'undefined') {
				return;
			}
			value = "&nbsp;<font color='red'>" + value + "</font>";
			return value;
		},
		sortable : true
	} , {
		header : '关联供应商',
		dataIndex : 'vendorNums',
		width : 80,
		renderer:function(value,cellmeta,record,rowIndex){
			var materialid=record.get('materialId');
			return "<a href=javascript:otherPurchaselGridPanel.showVendorInfoWin('"+materialid+"')>"+value+"</a>";
			
		}
	}]);
	var tbar = ['-', {
		text : '添加中标供应商',
		iconCls : 'AddVendor',
		disabled : privilegeValidate.addVendorXyDisable,
		handler : function() {
			var records = common.selectObj;
			var record = common.selectRow;
			if (record == null || record.length == 0 || records.length > 1) {
				Ext.Msg.alert('提示', '请指定一条记录!');
				return;
			}

			 if (records[0].data.applicationStatus != '4') {
			 Ext.Msg.alert('提示', '当前有记录没有处于已审批状态');
			 return;
			 }
			procurementProcessAction.type = '4';// 协议采购
			procurementProcessAction.parityId = record.data.parityId;
			procurementProcessAction.materialId = record.data.materialId;
			// 再次确认是否为‘比价’添加供应商
			if (procurementProcessAction.type == '4'
					&& record.data.typeName == '协议采购') {
//				var url = '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
//						+ new Date()
				var url = '../JSON/parity_ParityVendorRemote.getParityVendorList?parityId='
					+ record.data.parityId
				procurementProcessAction.setVendor(url, '4',"","");
			}

		}
	}, '-', {
		text : '提交',
		iconCls : 'CreateContract',
		disabled : privilegeValidate.addXyContractDisable,
		handler : function() {
			// 对采购比价信息进行生成合同操作
			// procurementProcessAction.generateContract('productionProcessId3','2');

			// 获得钩选记录
			var records = Ext.getCmp('agreementPurchaselGridPanel')
					.getSelectionModel().getSelections();
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
					// if (records[i].data.type == '1') {
					if (records[i].data.applicationStatus != '4') {
						Ext.Msg.alert('提示', '当前记录没有全部处于已审批状态！');
						return;
					}
					// } else {
					// if (records[i].data.applicationStatus != '6') {
					// Ext.Msg.alert('提示', '当前记录没有全部处于待生成合同状态！');
					// return;
					// }
					// }
					// ②将record 解码为String
					// if ((i + 1) == records.length) {
					// str += Ext.encode(records[i].data);
					// } else {
					// str += Ext.encode(records[i].data) + ',';
					// }
					str = Ext.util.JSON.encode(records[i].data);
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
										records[j].set('applicationStatusName',
												'已生成');
										records[j]
												.set('applicationStatus', '5');
									}
									var grid = Ext
											.getCmp('agreementPurchaselGridPanel');
									grid.getStore().baseParams = {
										start : 0,
										limit : 20,
										type : 4
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
	}, '-', {
		text : '送审',
		iconCls : 'send',
		disabled : privilegeValidate.sendXyDisable,
		handler : function() {
			var records = Ext.getCmp('agreementPurchaselGridPanel')
					.getSelectionModel().getSelections();
			if (records.length > 0) {
				// 协议采购流程
				procurementProcessAction.workFlow("4");
			}
		}
	}, '-', {
		text : '退回',
		iconCls : 'Cancel',
		handler : function() {
			var records=Ext.getCmp('agreementPurchaselGridPanel').getSelectionModel().getSelections();
			var parityId='';
			if(records.length==0){
				Ext.Msg.alert('提示','请选择退回的数据!');
				return;
			}
			for(var i=0;i<records.length;i++){
				if(records[0].get('applicationStatusName')!='编制中'){
					return Ext.Msg.alert('提示','请选择编制中的数据!')
				}
				if(i!=0){
					parityId+=",";
				}
				parityId+=records[0].get('parityId');
			}
		    Ext.Ajax.request( {
				url : '../JSON/parityRemote.delMaterialFromParity?d=' + new Date().getTime(),
				method : 'POST',
				params : {
					parityId : parityId
				},
				success : function(response) {		
				    Ext.getCmp('agreementPurchaselGridPanel').store.reload();
					Ext.Msg.alert('提示', '退回成功！');
				},
				failure : function() {
					Ext.Msg.alert('错误', '退回失败！');
				}
			});
		}
	}, '-', '物资类别：', {
		xtype : "textfield",
		id : "searchCatlogNameCompare"
	}, '-', '器材名称：', {
		xtype : "textfield",
		id : "searchMaterialNameCompare"
	}, '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			procurementProcessAction.searchCompare();
		}
	}];
	var grid = common.gridPanel('agreementPurchaselGridPanel', cm, store, tbar,
			true, sm, '协议采购列表');
	store.baseParams = {
		start : 0,
		limit : 20,
		type : '4'
	};
	return grid;

}


// 协议采购选择供应商窗口
agreementPurchasePanel.gridWin = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
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
						'reviewResult', 'strReviewDate', 'taxID',
						'productVentor', 'reposal', 'property'])
	});
	var cm = new Ext.grid.ColumnModel([sm, rm, {
				header : '供应商名称',
				dataIndex : 'vendorName',
				width : 100,
				sortable : true
			}, {
				header : '企业性质',
				dataIndex : 'property',
				width : 100,
				sortable : true
			}, {
				header : '信用度 ',
				dataIndex : 'reposal',
				width : 100,
				sortable : true
			}, {
				header : '电话 ',
				dataIndex : 'phone',
				width : 100,
				sortable : true
			}, {
				header : '生产单位 ',
				dataIndex : 'productVentor',
				width : 100,
				sortable : true
			}]);
	var tbar = ['-'];
	var grid = common.gridPanel('parityVendorWinGridPanelId', cm, store, null,
			true, sm, '供应商信息');
	store.baseParams = {
		start : 0,
		limit : 20,
		materialId : agreementPurchasePanel.materialId,
		oldVendorIDString : agreementPurchasePanel.oldVendorIDs
	};
	// 将原有供应商id置空
	agreementPurchasePanel.oldVendorIDs = '';
	store.load();

	var buttons = [{
		text : ' 确定 ',
		iconCls : 'Submit',
		handler : function() {
			var records = common.selectObj;
			if (records == null) {
				Ext.Msg.alert('提示', '请选择你要指定的供应商！');
				return;
			}
			Ext.MessageBox.confirm('指定供应商信息', '确认指定供应商信息，是否继续？　', function(btn,text) {
						if (btn == 'yes') {
							var pvStore = Ext.getCmp('agreementVendorGrid').getStore();
							for (var i = 0; i < records.length; i++) {
								// 将供应商store的record转换为所需的pvStore类型
								var nrec = new pvStore.recordType(records[i].data);
								pvStore.add(nrec);
							}
							window.close();
						}
					});
		}
	}, {
		text : '取消',
		iconCls : 'Cancel',
		handler : function() {
			window.close();
		}
	}]

	var window = new Ext.Window({
				width : 565,
				height : 440,
				autoScroll : true,
				layout : 'fit',
				title : '&nbsp;添加备选供应商信息列表',
				modal : true,
				items : grid,
				buttons : buttons
			});
	return window;

}
// 删除供应商方法，只是在store缓存中remove
agreementPurchasePanel.delVendor = function() {
	var parityVendorGrid = Ext.getCmp('agreementVendorGrid');
	// 获取勾选记录records
	var records = agreementPurchasePanel.selectObj;
	if (records == null || records.length == 0) {
		Ext.Msg.alert('提示', '请选择你要删除的数据！');
		return;
	}
	Ext.MessageBox.confirm('删除供应商信息', '确认删除供应商信息，是否继续？　', function(btn, text) {
				if (btn == 'yes') {
					parityVendorGrid.getStore().remove(records);
				}
			});
}

// 显示协议信息详情
/**
 * 
 * @param {} id   parityId
 * @param {} code   parityCode
 * @param {} materialItemName   materialItemName
 * @param {} desingnation  desingnation
 * @param {} materialStandard  materialStandard
 * @param {} materialId materialId
 * @param {} purchaseId
 * @param {} demension
 * @param {} technicCondition
 * @param {} applicationStatus
 */
agreementPurchasePanel.showAgreementDetail = function(id, code,
		materialItemName, desingnation, materialStandard, materialId,
		purchaseId, demension, technicCondition, applicationStatus) {
//	var contractForm;
	var parityVendorGrid;
	var parityDetailId;
	Ext.getCmp('agreementPurchaseTabPanel').getLayout().setActiveItem(1);
	var form= Ext.getCmp('agreementDetailForm');
		parityVendorGrid = Ext.getCmp('agreementVendorGrid');
	// ①当申请状态为‘编制中：1’，‘待审批：2’时，加载可编辑的比价详细信息页面，否则加载只读的比价详细信息页面
	if (applicationStatus == '1' || applicationStatus == '2') {
		Ext.getCmp('agreementSave').show();
		Ext.getCmp('agreementVendorDel').show();
		Ext.getCmp('agreementVendorAdd').show()
	} else {
		Ext.getCmp('agreementSave').hide();
		Ext.getCmp('agreementVendorDel').hide();
		Ext.getCmp('agreementVendorAdd').hide()
	}
	// ②提交页面，向后台传递参数。获取form要加载的数据。
	agreementPurchasePanel.materialId = materialId;
	form.form.doAction('load', {
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
					materialItemName : materialItemName,// 物料名称
					desingnation : desingnation,
					materialStandard : materialStandard,
					materialId : materialId,// 物料信息id
					purchaseId : purchaseId,// 采购清单id
					demension : demension,
					technicCondition : technicCondition,
					applicationStatus : applicationStatus
					// 申请状态
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

// 协议采购详情列表
agreementPurchasePanel.agreementDetailPanel = function() {
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					// 切换回比价列表
					var tab = Ext.getCmp('agreementPurchaseTabPanel').getLayout().setActiveItem(0);
					var parityVendorStore = Ext.getCmp('agreementVendorGrid').getStore();
					parityVendorStore.removeAll();
					var contractForm = Ext.getCmp('agreementDetailForm');
					contractForm.form.reset();
				}
			}, '-', {
				id : 'agreementSave',
				text : '保存',
				disabled : privilegeValidate.updateBDisable
						&& !(procurementProcessAction.formCanSave),
				handler : function() {
					// 获得供应商信息grid中，store记录数
					var parityVendorGrid = Ext.getCmp('agreementVendorGrid');
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
										priceString = '0' + ':' +priceString;
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
//					} else if (Ext.getCmp('scope').getValue() == '') {
//						Ext.Msg.alert("提示", "比前次上升幅度必填!");
//						return;
//					}

					// 表单提交
					var contractForm = Ext.getCmp('agreementDetailForm');
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
							var tab = Ext.getCmp('agreementPurchaseTabPanel');
							var parityVendorStore = Ext
									.getCmp('agreementVendorGrid').getStore();
							parityVendorStore.removeAll();
							var contractForm = Ext.getCmp('agreementDetailForm');
							contractForm.form.reset();
							tab.getLayout().setActiveItem(0);
						}
					});
				}
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
						'productVentor'])
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
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
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
		id:'agreementVendorAdd',
		iconCls : 'add1',
		handler : function() {

			var parityVendorGridStore = Ext.getCmp('agreementVendorGrid')
					.getStore();
			var count = parityVendorGridStore.getCount();
			// 新增厂商时，备份旧的供应商ID
			if (count > 0) {
				for (var i = 0; i < count; i++) {
					if (i >= count - 1) {
						agreementPurchasePanel.oldVendorIDs = agreementPurchasePanel.oldVendorIDs
								+ "'"
								+ parityVendorGridStore.data.items[i].data.vendorID
								+ "'";
					} else {
						agreementPurchasePanel.oldVendorIDs = agreementPurchasePanel.oldVendorIDs
								+ "'"
								+ parityVendorGridStore.data.items[i].data.vendorID
								+ "',";
					}
				}
			}
			
				var win = agreementPurchasePanel.gridWin();
	win.show();
			
		}
	}, '-', {
		text : '删除厂商',
		id:'agreementVendorDel',
		iconCls : 'del1',
		handler : function() {
			records = sm.getSelections();
			agreementPurchasePanel.delVendor(records);
		}
	}];

	var grid = new Ext.grid.EditorGridPanel({
				store : parityVendorGridStore,
				tbar : tbar1,
				cm : cm,
				sm : sm,
				id : "agreementVendorGrid",
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				clicksToEdit : 1
			});
	// 选择多选框，将records取出
	sm.on('rowselect', function(sm, rowIndex, record) {
				agreementPurchasePanel.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				agreementPurchasePanel.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					agreementPurchasePanel.selectRow = null;
				}
			});

	// 表单
	var contractForm = new Ext.form.FormPanel({
				id : 'agreementDetailForm',
				padding : 5,
				tbar : tbar,
				layout : 'column',
				autoScroll : true,
				defaults : {
					columnWidth : 1,
					padding : 5
				},
				items : [[{xtype:"hidden",name:'parityId'},{
							xtype : 'fieldset',
							title : '协议采购申请栏',
							items : [item21, [{
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
											}]]
						}]]
			});

	return contractForm;
}



