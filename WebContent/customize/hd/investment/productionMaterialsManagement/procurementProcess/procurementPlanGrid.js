
var procurementPlan={};
//---//采购计划展示列表，包括年度计划和零星计划，列表显示简要信息
procurementPlan.planListGrid = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementProcessRemote.getPurchaseGridData?d='
					+ new Date(),
			method : 'post'
		}),
		baseParams:{start:0,limit:20,status:"3"},//status不是空字符串，则查询3已审批；4已生成。
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty'
		}, [ 'purchaseId', 'purchaseCode', 'createDate', 'status',
				'materialTypeName', 'editor', 'type', 'remark','purchaseName',
				'stateName', 'editorName', 'editorDeptName', 'editorRoleName',
				'purchaseTypeName' ])
	});
	var cm = new Ext.grid.ColumnModel(
			[
					sm,
					rm,
					{

						header : '编号',
						dataIndex : 'purchaseCode',
						sortable : true,
						width:120,
						renderer : function(value, cellmeta, record, rowIndex) {
							//展示采购计划详细信息的链接
							var purchaseId = record.get("purchaseId");// 计划清单唯一标识
							var purchaseType = record.get("type");// 1年度;2零星列表
							var state = record.get("status");//3已审批；4已生成
							value = "&nbsp;<font color=blue>" + value
									+ "</font>";
							return "<a href='javascript:void(0);' onclick= procurementPlan.showPlanDetail('"
									+ purchaseId
									+ "','"
									+ purchaseType
									+ "','"
									+ state
									+ "')  >" + value + "</a>";

						}
					}, {
						header : '计划名称',
						dataIndex : 'purchaseName',
						width : 230,
						sortable : true
					}, {
						header : '生成日期',
						dataIndex : 'createDate',
						width : 80,
						sortable : true
					}, {
						header : '申请状态',
						width : 80,
						dataIndex : 'stateName',
						sortable : true
					}, {
						header : ' 物资类别 ',
						dataIndex : 'materialTypeName',
						width : 100,
						hidden:true,
						sortable : true
					}, {
						header : ' 编辑人 ',
						dataIndex : 'editorName',
						width : 100,
						sortable : true
					}, {
						header : ' 部门 ',
						dataIndex : 'editorDeptName',
						width : 100,
						sortable : true
					}, {
						header : ' 需求来源  ',
						dataIndex : 'purchaseTypeName',
						width : 100,
						sortable : true
					},{
						header : '审批进度',
						dataIndex : '',
						hidden:true,
						renderer : function(value, cellmeta, record, rowIndex){//查看审批进度的链接
							var id = record.get("purchaseId");
							var status = record.get("status");
							if(status == '2'){//审批中、已审批
								return "<a href='javascript:void(0);' onclick=procurementProcessAction.showPurchaseFlowInstance('"
									+id+"')><font color=blue>查看</font></a>";
							}			
						},
						sortable : true
					}
					,{
						header : '审批记录',
						dataIndex : '',
						hidden:true,
						renderer : function(value, cellmeta, record, rowIndex){
							var id = record.get("purchaseId"); 
							var applicationStatus = record.get("status");
//							if(parseInt(applicationStatus)>1){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
					}
//					, {
//						header : ' 备注 ',
//						dataIndex : 'remark',
//						width : 100,
//						sortable : true
//					} 
					]);
	var tbar = ['-', '编号：', {
		xtype : "textfield",
		id : "purchaseCode"
	}, '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
		   //var searchCatlogName = document.getElementById('searchCatlogName').value;
	       var grid = Ext.getCmp('planListGrid');
	       grid.getStore().baseParams = {
	          start : 0,
		      limit : 20,
		      purchaseCode : Ext.getCmp('purchaseCode').getValue()
//		      type:type,
//		      status:status 
	       };
	       grid.store.load();
		   //procurementProcessAction.search(type,status);
		}
	}

	]
	
//	var grid = common.gridPanel('planListGrid', cm, store, tbar, true,
//			sm, '采购清单列表');
	var grid = new Ext.grid.GridPanel({
		id : 'planListGrid',
		cm : cm,
		sm: sm,
		store : store,
		autoScroll : true,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		tbar : tbar,
		bbar : new Ext.PagingToolbar({
			pageSize : 20,
			store : store,
			displayInfo : true,
			displayMsg : '显示第{0}条到{1}条记录，一共{2}条',
			emptyMsg : '没有记录'
		})
	});
	 store.load();
	return grid;

}
//---//采购计划展示列表结束


// 显示年度采购计划，零星采购计划详情
/**
 * 
 * @param {} purchaseId 采购计划ID
 * @param {} purchaseType 采购计划类别：1年度；2零星
 * @param {} state 采购计划状态: 3已审批；4已生成
 */
procurementPlan.showPlanDetail = function(purchaseId,purchaseType, state) {
	        var columnModel=Ext.getCmp('planDetailGrid').getColumnModel();
	        var flag=false;
	        var stateFlag=false;
			if(purchaseType=='2'){
				flag=true;
			}
			if(state=='4'){
				stateFlag=true;
			}
			Ext.getCmp('BatchSet').setDisabled(stateFlag);
			Ext.getCmp('batchProcurementType1').setDisabled(stateFlag);
			Ext.getCmp('viewCommit').setDisabled(stateFlag||privilegeValidate.submitCpDisable?true:false);
			Ext.getCmp('generateData').setDisabled(stateFlag||privilegeValidate.newCpDisable?true:false);
			columnModel.setHidden(columnModel.findColumnIndex('JX'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('jan'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('feb'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('mar'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('apr'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('may'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('june'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('july'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('aug'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('sept'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('oct'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('nov'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('dect'),flag);
			
			Ext.getCmp('procurementPlanMainGrid').getLayout().setActiveItem(1);
			var store=Ext.getCmp('planDetailGrid').store
			store.baseParams={
					purchaseId : purchaseId,
					start:0,
					limit:20,
					purchaseType:purchaseType
				}
			store.load();
			return;
}

// 零星采购计划清单详细信息展示
procurementPlan.planDetailGrid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
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
						'last_year_Consume','JX','QSJH','ZZJH','CLDM','status',
						'planActualnumber','usedate','deliveryStatus'])
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
						width : 40,
						header : "序号"
					}), {
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			}, {
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	},{
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
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true
			}, {
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			}, {
				header : '需用时间',
				width : 80,
				dataIndex : 'usedate',
				sortable : true
			},{
				header:'需求单位',
				width : 100,
				dataIndex:'department',
				sortable : true
			},{
				header : "供应商",
				width : 80,
				dataIndex : "vendorName",
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				/*editor : new Ext.form.ComboBox({
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
						}),*/
				sortable : true
			},  
			{
				header : "机型",
				width : 80,
				dataIndex : 'JX',
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					var materialId = record.get("materialId");
                    var procurementId=record.get('procurementId');
					return "<a href='javascript:void(0);' onclick=procurementProcessAction.showDetail('"+ materialId+ "','"+procurementId+"')>&nbsp;<font color=blue>小计</font></a>";
				}
			},{
				header : "1月",
				width : 50,
				dataIndex : "jan",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "2月",
				width : 50,
				dataIndex : "feb",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "3月",
				width : 50,
				dataIndex : "mar",
				sortable : true
			}, {
				header : "4月",
				width : 50,
				dataIndex : "apr",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "5月",
				width : 50,
				dataIndex : "may",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "6月",
				width : 50,
				dataIndex : "june",
				sortable : true
			}, {
				header : "7月",
				width : 50,
				dataIndex : "july",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "8月",
				width : 50,
				dataIndex : "aug",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "9月",
				width : 50,
				dataIndex : "sept",
				sortable : true
			}, {
				header : "10月",
				width : 50,
				dataIndex : "oct",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "11月",
				width : 50,
				dataIndex : "nov",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "12月",
				width : 50,
				dataIndex : "dect",
				sortable : true
			},{
				header : "需求量",
				width : 60,
				dataIndex : 'materialCounts',//"needNumber",
				sortable : true
			},  {
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true

			}, {
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				sortable : true
			},{
				header : "<font style='color:red'>*</font>实际采购数量",
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
				header : "采购计划编号",
				width :110,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
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
				procurementPlan.batchType = batchCombo.value;
			});
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					Ext.getCmp('procurementPlanMainGrid').getLayout().setActiveItem(0);
				}
			}, '-', {
				text : '提交',
				iconCls : 'Submit',
				id : 'viewCommit',
				handler : function() {
					var grid1 = Ext.getCmp('planDetailGrid');
					var records = grid1.getSelectionModel().getSelections();//store.getModifiedRecords();
					if (records.length == 0) {
						Ext.Msg.alert('提示', '数据未修改，无需保存！');
						return;
					}
					var str = "";
//					if (allCounts > 0) {
						// 如果有记录，遍历，验证并拼接json字符串
						for (var i = 0; i < records.length; i++) {
							records[i].commit();
							records[i].data.purchaseType = records[i].data.purchaseTypeName;
							if(records[i].get('purchaseType')==''){
								return Ext.Msg.alert('提示','请选择采购方式!');
							}
							if (records[i].get('actualNumber')!=records[i].get('materialCounts')
									&& records[i].get('note')== "") {
								Ext.Msg.alert('提示', '实际采购量不等于需求量，请添加备注！');
								return;
							}
							if(i!=0){
								str+=',';
							}
							str += Ext.encode(records[i].data);
						}
//					}
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
			},'-',{
				text : '生成数据',
				id:'generateData',
				iconCls : 'CreateData',
				handler : function(){
					var grid = Ext.getCmp('planDetailGrid');
					var id = "";
					var rows = grid.getSelectionModel().getSelections();// 返回值为
																		// Record
																		// 数组
					if (rows.length == 0) {
						Ext.MessageBox.alert('提示', '请选择一条记录!');
						return;
					}
					for (i = 0; i < rows.length; i++) {
						var typeName = rows[i].get('purchaseTypeName');
						var status = rows[i].get('status');
						if (typeName == '') {
							Ext.MessageBox.alert('提示', '请全部选择提交了采购方式的记录!');
							return;
						}
						if (status != 0 || status == "") {
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
								updateRecords : id,
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
								var grid0 = Ext.getCmp('planDetailGrid');
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
			}, '-', {
				xtype : 'panel',
				width : 100,
				items : [batchCombo]
			}, {
				text : '批量设置',
				id:'BatchSet',
				iconCls : 'BatchSet',
				handler : function(grid) {
					if (batchCombo.value == null || batchCombo.value == ''
							|| typeof(batchCombo.value) == 'undefined') {
						Ext.Msg.alert('提示', '请选择采购方式类型');
						return;
					}

					var records = Ext.getCmp("planDetailGrid")
							.getSelectionModel().getSelections();
					if (records == null || records.length == 0) {
						Ext.Msg.alert('提示', '请选择你要设置的数据！');
						return;
					}
					for (var i = 0; i < records.length; i++) {
						records[i].set('purchaseType',
								procurementPlan.batchType);
						records[i].set('purchaseTypeName',
								procurementPlan.batchType);
/*						if (procurementPlan.batchType == '招标'
								|| procurementPlan.batchType == '比价') {
							records[i].set('vendorName', '');
							records[i].set('vendorId', '');
						}*/
					}
				}
			},{
				text:'拆分数据',
				id:'resolveBtn',
				iconCls:'BatchSet',
				handler:function(grid){
					var sm=Ext.getCmp('planDetailGrid').getSelectionModel();
					if(sm.getCount()!=1){
						return Ext.Msg.alert('提示','请选择一条记录!');
					}
					var record=sm.getSelected();
					var win=new Ext.Window({
						title:'拆分数据',
						layout:'fit',
						width:300,
						height:200,
						modal:true,
						items:[{
							xtype:'form',
							id:'resolveForm',
							border:false,
							bodyStyle:'padding:5px;',
							items:[{xtype:'label',
							       fieldLabel:'原建议采购量',
							       text:record.get('planActualnumber')
							},{
								xtype:'numberfield',
								id:'resolve_numberText',
								fieldLabel:'建议采购量',
								maxValue:record.get('planActualnumber'),
								minValue:0,
								allowBlank:false
							},{
								xtype:'textarea',
								id:'noteText',
								fieldLabel:'备注',
								allowBlank:false
							}]
						}],
						buttons:[{text:'确定',handler:function(){
							var resolveForm=Ext.getCmp("resolveForm");
						if(resolveForm.baseForm.isValid()&&confirm('拆分数据不可恢复,确认吗?')){
							Ext.Ajax.request({
								url:'../JSON/procurementDetail_ProcurementDetailRemote.resolveProcurementDetail?d='
								+new Date(),
								method:'POST',
								params:{
									procurementDetailId:Ext.getCmp('procurementDetailId').getValue(),
									planActualnumber:Ext.getCmp('planActualnumber').getValue(),
									resolve_number:Ext.getCmp('resolve_numberText').getValue(),
									note:Ext.getCmp('noteText').getValue()
								},
								success:function(response,opts){
									var obj=Ext.decode(response.responseText);
									if(obj.success){
										Ext.Msg.alert('提示','数据拆分成功!');
									}else{
										Ext.Msg.alert('提示',obj.msg	);
									}
									Ext.getCmp('planDetailGrid').getStore().reload();
									win.close();
								},
								failure:function(){
									Ext.Msg.alert('错误','数据拆分失败!')
								}
							})
						}
						}},{text:'取消',handler:function(){win.close()}}]
					}).show();
				}
			}
	];

	var grid = new Ext.grid.EditorGridPanel({
		store : store,
		tbar : tbar,
		cm : cm,
		sm : sm,
		id : "planDetailGrid",//"card5PanelDataGrid",
		clicksToEdit : 1,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		bbar:new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	    }),
		listeners : {// 点击供应商Cell时，进行加载供应商下拉框信息
			'cellclick' : function(grid, rowIndex, columnIndex, e) {
				var record = grid.getStore().getAt(rowIndex);
				if (record.get('status')=='1') {
					return false;
				}
/*				if (columnIndex == 8) {
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
				}*/
			}/*,
			'afteredit' : function(e) {// 对添加汇总后，采购方式由”直接采购“向非”直接采购“状态改变时，对供应商信息进行处理。
				if (e.column == 23) {
					if (e.originalValue == '直接采购' && e.value != '直接采购') {
						e.record.set('vendorName', '');
						e.record.set('vendorId', '');
					}
				}
			}*/
		},
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});

/*	sm.on('rowselect', function(sm, rowIndex, record) {
				purchaseDetailData.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				purchaseDetailData.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					purchaseDetailData.selectRow = null;
				}
			});*/

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

//采购计划功能列表布局
procurementPlan.mainPlan = function() { 
	return new Ext.Panel({
                title : '采购计划列表',
				id : 'procurementPlanMainGrid',//'procurementProcessDataTab1',
				layout : 'card',
				activeItem : 0,
				border:false,
				listeners:{
					activate:function(grid){
						Ext.getCmp('procurementPlanMainGrid').getLayout().setActiveItem(0);
					}
				},
				items : [ procurementPlan.planListGrid(),
						procurementPlan.planDetailGrid()
						]
			})
};
