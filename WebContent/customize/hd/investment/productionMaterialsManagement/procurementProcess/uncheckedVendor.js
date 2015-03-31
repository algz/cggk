var uncheckedVendor = {};
// 供应商列表，弹出窗
/**
 * 
 * @param {}
 *            parityId 采购计划ID
 * @param {}
 *            vendorId 中标的供应商
 * @param {}
 *            status 采购状态 1编制中,2待审批,3审批中,4已审批,5已生成,6待生成合同
 * @param {}
 *            materialId 物料ID,用于新增供应商时,下拉列表限定范围.
 * @return {}
 */
uncheckedVendor.mainWin = function(parityId, vendorId, status, materialId) {// function(url,type)
	// {
	if (vendorId == null) {
		return Ext.Msg.alert("提示", "请先选择中标的供应商!");
	}

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 供应商下拉框Store
	var vendorStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/tenderSuppliersRemote.filterAllVendor?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'vendorID',
							totalProperty : 'totalProperty'
						}, ['vendorID', 'vendorName', 'address',
								'businessScope', 'price']),
				baseParams : {
					materialId : materialId,
					vendorId : vendorId,
					start : 0,
					limit : 20
				}
			});
			vendorStore.load();
	// grid.store
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/tenderSuppliersRemote.getTenderSuppliersGridData?d='
							+ new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, ['id', 'vendorId', 'vendorName', 'parityId',
						'vendorAddress', 'vendorBusinessScope', 'vendorPrice']),
		pruneModifiedRecords : true,
		autoLoad : true,
		baseParams : {
			parityId : parityId,
			start : 0,
			limit : 20
		}
	});
	var cm = new Ext.grid.ColumnModel([sm, rm, {
		header : '供应商名称',
		dataIndex : 'vendorName',
		sortable : true,
		editor : new Ext.form.ComboBox({
					store : vendorStore,
					id : 'vendorName',
					triggerAction : 'all',
					valueField : 'vendorName',
					displayField : 'vendorName',
					forceSelection : true,
					mode : 'remote',
					listeners : {// 选择下拉框，对vendorId进行设值
						"select" : function(combo, record, index) {
							var gridrec = Ext
									.getCmp('uncheckedVendorGridPanel')
									.getSelectionModel().getSelected();
							gridrec.set('vendorId', record.get('vendorID'));
							gridrec.set('vendorAddress', record.get('address'));
							gridrec.set('vendorBusinessScope', record
											.get('businessScope'));
							gridrec.set('vendorPrice', record.get('price'))
						}
					}
				})
	}, {
		header : '单价 ',
		dataIndex : 'vendorPrice',
		width : 100,
		sortable : true,
		editor : new Ext.form.NumberField({})
	}, {
		header : '经营范围',
		dataIndex : 'vendorBusinessScope',
		width : 100,
		sortable : true
	}, {
		header : '经营地址 ',
		dataIndex : 'vendorAddress',
		width : 300,
		sortable : true
	}]);
	var grid = new Ext.grid.EditorGridPanel({
		id : 'uncheckedVendorGridPanel',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		height : 570,
		autoWidth : true,
		columnLines : true,
		clicksToEdit : 1,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		tbar : [{
					text : '新增',
					handler : function() {
						var Plant = grid.getStore().recordType;
						var p = new Plant({
									id : '',
									vendorId : '',
									vendorName : '',
									parityId : '',
									vendorAddress : '',
									vendorBusinessScope : ''
								});
						grid.stopEditing();
						store.insert(0, p);
						grid.startEditing(0, 0);
					}
				}, /*{
					text : '保存',
					handler : function() {
						var records=grid.getStore().getModifiedRecords();
						var arr=new Array();
						Ext.Ajax.request({
							url : '../JSON/tenderSuppliersRemote.saveTenderSuppliers',
							method : 'post',
							waitMsg : '数据加载中，请稍后....',
							params : {
								id : Ext.util.JSON.encode(arr)
							},
							success : function(response, opts) {
								var obj = Ext.decode(response.responseText);
								if (obj.success == true) {// 返回true是字符串,则obj.success==
															// "true"
									// 你后台返回success 为 false时执行的代码
								} else {
									// 你后台返回success 为 false时执行的代码
								}
								// console.dir(obj);
							},
							failure : function(response, opts) {
								// console.log('server-side failure with status
								// code ' + response.status);
							}
						});
					}
				}, */{
					text : '删除',
					handler : function() {
						var arr = new Array();
						var records = grid.getSelectionModel().each(
								function(rec) {
									if (rec.get('id') != "") {
										arr.push(rec.get('id'));
									} else {
										grid.getStore().remove(rec);
									}
								})
						if (arr.length != 0) {
							Ext.Ajax.request({
								url : '../JSON/tenderSuppliersRemote.deleteTenderSuppliers',
								method : 'post',
								waitMsg : '数据加载中，请稍后....',
								params : {
									id : Ext.util.JSON.encode(arr)
								},
								success : function(response, opts) {
									var obj = Ext.decode(response.responseText);
									if (obj.success == true) {// 返回true是字符串,则obj.success==
										// "true"
										// 你后台返回success 为 false时执行的代码

										grid.getStore().load();
									} else {
										// 你后台返回success 为 false时执行的代码
									}
									// console.dir(obj);
								},
								failure : function(response, opts) {
									// console.log('server-side failure with
									// status
									// code ' + response.status);
								}
							});
						}
					}
				}],
		bbar : new Ext.PagingToolbar({
					pageSize : 20,
					store : store,
					displayInfo : true,
					displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
					emptyMsg : '没有记录'

				})
	});
	// store.baseParams = {start : 0, limit: 20, materialId :
	// procurementProcessAction.materialId,selectStatus : '1'};
	// store.load();

	var window = new Ext.Window({
		id : "uncheckedVendorWin",
		width : 740,
		height : 440,
		autoScroll : true,
		layout : 'fit',
		title : '落选的供应商信息列表',
		modal : true,
		items : grid,
		buttons : [{
			text : ' 确定 ',
			handler : function() {
				var records = grid.getStore().getModifiedRecords();
				if (records == null || records.length == 0) {
//					Ext.Msg.alert('提示', '没有新登记的供应商！');
					window.close();
					return;
				}
				var arr = new Array();
				for (var i = 0; i < records.length; i++) {
					if (records[i].get("vendorId") == "") {
						Ext.Msg.alert('提示', '请选择你要指定的供应商！');
						return;
					}else if (records[i].get("price") == "") {
						Ext.Msg.alert('提示', '请填写价格！');
						return;
					}
					arr.push(records[i].data)
				}

				Ext.MessageBox.confirm('指定落选供应商信息', '确认保存供应商信息，是否继续？　',
						function(btn, text) {
							if (btn == 'yes') {
								// 指定供应商
								Ext.Ajax.request({
									url : '../JSON/tenderSuppliersRemote.saveTenderSuppliers?d='
											+ new Date(),
									method : 'POST',
									params : {
										parityId : parityId,
										json : Ext.util.JSON.encode(arr)
										/*
										 * ; "vendorId" :
										 * records[0].get('vendorID') + '',
										 * "parityId" :
										 * procurementProcessAction.parityId,
										 * "vendorName" : records[0]
										 * .get('vendorName') + '', "price" :
										 * records[0].get('price') + ''
										 */
									},
									success : function() {
										Ext.Msg.alert('提示', '保存成功!');
										window.close();
										// 根据type值，加载数据
										/*
										 * var grid = Ext
										 * .getCmp('productionProcessId2'); if
										 * (procurementProcessAction.type ==
										 * '1') { grid.getStore().baseParams = {
										 * start : 0, limit : 20, type : '1' };
										 * grid.store.load(); }
										 */
										/*
										 * var grid1 = Ext
										 * .getCmp('productionProcessId3'); if
										 * (procurementProcessAction.type ==
										 * '2') { grid1.getStore().baseParams = {
										 * start : 0, limit : 20, type : '2' };
										 * grid1.store.load(); }
										 */

									},
									failure : function() {
										Ext.Msg.alert('错误', '保存失败!');
									}
								});
							}
						});

			}
		}, {
			text : '取消',
			handler : function() {
				window.close();
			}
		}]
	});
	window.show();

}
