//比价信息列表
var comparePricePanel = {
	materialId : null,
	selectRow:null,
	selectObj:null,
	oldVendorIDs:''
};

procurementProcessData.rightPanel = function() {
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/parityRemote.getParityGridData?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'parityId', 'parityCode', 'createDate', 'deliveryDate',
			 'applicationStatus', 'applicationStatusName', 'editors',
			 'editorsNmae', 'editorsDept', 'purchaseId', 'purchaseCode',
			 'vendorId', 'vendorName', 'type', 'typeName', 'materialId',
			 'desingnation', 'materialItemName', 'materialStandard','planActualnumber',
			 'mCtgName', 'demension', 'technicCondition','price','vendorNums','deliveryStatus' ])
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			rowdeselect : function(sm,rowIndex,rec){
				collection.removeKey(rec.get('parityId'));
			},
			rowselect : function(sm,rowIndex,rec){
				collection.add(rec.get('parityId'),rec);
			}
		}
	});

	var cm = new Ext.grid.ColumnModel(
			[
					sm,
					{

						header : '编号',
						dataIndex : 'parityCode',
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {

							var id = record.get("parityId");
							var code = record.get("parityCode");
							var materialItemName = record
									.get("materialItemName");
							var desingnation = record.get("desingnation");
							var materialStandard = record
									.get("materialStandard");
							var materialId = record.get("materialId");
							var purchaseId = record.get("purchaseId");
							var demension = record.get("demension");
							var technicCondition = record
									.get("technicCondition");
							var applicationStatus = record
									.get("applicationStatus");
							// 获取当前dom里的值，带到form表单里
							value = "&nbsp;<font color=blue>" + value
									+ "</font>";
							return "<a href='javascript:void(0);' onclick= procurementProcessAction.showParityDetail('"
									+ id
									+ "','"
									+ code
									+ "','"
									+ materialItemName
									+ "','"
//									+ desingnation
									+ "','"
//									+ materialStandard
									+ "','"
									+ materialId
									+ "','"
									+ purchaseId
									+ "','"
									+ demension
									+ "','"
									+ technicCondition
									+ "','"
									+ applicationStatus
									+ "')  >"
									+ value + "</a>";

						}

					},
					{
						header : '器材名称',
						dataIndex : 'materialItemName',
						width : 80,
						sortable : true
					},
					{
						header : '牌号',
						dataIndex : 'desingnation',
						width : 80,
						sortable : true
					},
					{
						header : '规格',
						dataIndex : 'materialStandard',
						width : 80,
						sortable : true
					},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	},
					{
						header : ' 生成日期 ',
						dataIndex : 'createDate',
						width : 120,
						sortable : true
					},
					{
						header : ' 交货日期 ',
						dataIndex : 'deliveryDate',
						width : 120,
						sortable : true
					},
					{
						header : ' 申请状态 ',
						dataIndex : 'applicationStatusName',
						width : 100,
						sortable : true
					},
					{
						header : '审批进度',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex) {

							var id = record.get("parityId");
							var status = record.get("applicationStatus");
							// 如果在审批中或已审批状态，才能查看进度
							if (status == '3' || status == '4') {
							return "<a href='javascript:void(0);' onclick=procurementProcessAction.showParityAuditFlowInstance('"
									+ id + "')><font color=blue>查看</font></a>";
						}
					}
					},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id = record.get("parityId"); 
							var applicationStatus = record.get("applicationStatus");
							if(parseInt(applicationStatus)>1){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
							}			
						},
						sortable : true
					},{
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
						width : 80,renderer : function(value, cellmeta, record, rowIndex) {
							if(typeof(value)=='undefined'){return;}
							value = "&nbsp;<font color='red'>" + value+ "</font>";
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
	} ]);
	var tbar = [
			'-',
			{
				text : '添加中标供应商',
				iconCls : 'AddVendor',
				disabled : privilegeValidate.addVendorBDisable,
				handler : function() {
					var records = common.selectObj;
					var record = common.selectRow;
					if (records == null || records.length==0) {
						Ext.Msg.alert('提示', '请选择你要指定供应商的的"采购比价"记录！');
						return;
					}
					if(records.length>1){
						Ext.Msg.alert('提示', '一次只指定一条"采购比价"记录！');
						return;
					}
					
					if (records[0].data.applicationStatus != '4') {
						Ext.Msg.alert('提示', '当前有记录没有处于已审批状态');
						return;
					}
					procurementProcessAction.type = '1';// 比价
					procurementProcessAction.parityId = record.data.parityId;
					procurementProcessAction.materialId = record.data.materialId;
				
					// 再次确认是否为‘比价’添加供应商
					if (procurementProcessAction.type == '1'/*&& record.data.typeName == '比价采购'*/) {
						var url = '../JSON/parity_ParityVendorRemote.getParityVendorList?parityId='
							+ record.data.parityId
						procurementProcessAction.setVendor(url,'1',"","");
					}

				}
			}, '-', {
				text : '提交',
				iconCls : 'CreateContract',
				disabled : privilegeValidate.addBContractDisable,
				handler : function() {
					//对采购比价信息进行生成合同操作
					alert('有'+collection.getCount()+'条记录提交!');
					common.selectObj = collection.getRange();
//					比价类型应该是1
					procurementProcessAction.generateContract('productionProcessId3','1');
//					procurementProcessAction.generateContract('productionProcessId3','2');
				}
			}, '-', {
				text : '送审',
				iconCls : 'send',
				disabled : privilegeValidate.sendBDisable,
				handler : function() {
					alert('有'+collection.getCount()+'条记录送审!');
					common.selectObj = collection.getRange();
					procurementProcessAction.workFlow("2")
				}
			}, '-', {
		text : '退回',
		iconCls : 'Cancel',
		handler : function() {
			var records=Ext.getCmp('productionProcessId2').getSelectionModel().getSelections();
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
				    Ext.getCmp('productionProcessId2').store.reload();
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
			} ];
//	var grid = common.gridPanel('productionProcessId2', cm, store, tbar, true,
//			sm, '采购比价列表');
	var grid = new Ext.grid.GridPanel({
		title : '采购比价列表',
		id : 'productionProcessId2',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		loadMask : { msg : '加载数据中，请稍候...' },
		listeners : {
			activate: function(grid) {
				grid.store.load();
				collection.clear();
			}
		},
		tbar : tbar,
		bbar : new Ext.PagingToolbar({
					pageSize : 20,
					store : store,
					listeners:{
					change : function(panel, params) {
									var store = panel.store
									var total = store.getCount();// 数据行数
									for (var i = 0; i < total; i++) {
										var row = store.getAt(i);
										if (collection.containsKey(row
												.get('parityId'))) {
											Ext.getCmp('otherPurchaselGridPanel').selModel.selectRow(i, true);
										}
									}
								}
							},
					displayInfo : true,
					displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
					emptyMsg : '没有记录'
				})
	});
	store.baseParams = {
		start : 0,
		limit : 20,
		type : '1'
	};
	return grid;

}
//采购比价选择供应商方法
comparePricePanel.addVendor = function() {
	var win = comparePricePanel.gridWin();
	win.show();
}
//采购比价选择供应商窗口
comparePricePanel.gridWin = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/vendor_VendorRemote.getGridDataByConditon?d=' + new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope',
						'strInitialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'strReviewDate', 'taxID',
						'productVentor', 'reposal', 'property'])
			});
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
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
	} ]);
	var tbar = [ '-' ];
	var grid = common.gridPanel('parityVendorWinGridPanelId', cm, store, null,
			true, sm, '供应商信息');
	store.baseParams = {
		start : 0,
		limit : 20,
		materialId : comparePricePanel.materialId,
		oldVendorIDString : comparePricePanel.oldVendorIDs
	};
	//将原有供应商id置空
	comparePricePanel.oldVendorIDs='';
	store.load();

	var buttons = [
			{
				text : ' 确定 ',
				iconCls:'Submit',
				handler : function() {
					var records = common.selectObj;
					if (records == null) {
						Ext.Msg.alert('提示', '请选择你要指定的供应商！');
						return;
					}
					Ext.MessageBox.confirm('指定供应商信息', '确认指定供应商信息，是否继续？　',
							function(btn, text) {
								if (btn == 'yes') {
									var pvStore = Ext.getCmp('parityVendorGrid').getStore();
									var vendorOne=Ext.getCmp('manufacturerOneName');
									var vendorTwo=Ext.getCmp('manufacturerTwoName');
									for(var i=0; i<records.length; i++){
										//将供应商store的record转换为所需的pvStore类型
										var nrec = new pvStore.recordType(records[i].data);
										
				                        vendorOne.getStore().add(nrec);
				                        vendorTwo.getStore().add(nrec);
										pvStore.add(nrec);
									}									
									window.close();
								}
							});
				}
			}, {
				text : '取消',
				iconCls:'Cancel',
				handler : function() {
					window.close();
				}
			} ]

	var window = new Ext.Window( {
		id : "parityVendorChooseWind",
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
//删除供应商方法，只是在store缓存中remove
comparePricePanel.delVendor = function(){
	var parityVendorGrid = Ext.getCmp('parityVendorGrid');
	//获取勾选记录records
	var records = comparePricePanel.selectObj;
	if(records == null||records.length==0){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}
	Ext.MessageBox.confirm('删除供应商信息', '确认删除供应商信息，是否继续？　',
		function(btn, text) {
				if (btn == 'yes') {
					parityVendorGrid.getStore().remove(records);
				}
		});
}