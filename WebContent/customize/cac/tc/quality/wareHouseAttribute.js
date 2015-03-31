
Ext.grid.myCheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel,
		{
			header : '<div class="x-grid3-hd-checker" style="display:none;">&#160;</div>'
		})

var wareHouseAttribute = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 10
	},
	baseargs : null
}
// typeid 物理类型id ,name 库名称， id 库ID
wareHouseAttribute.init = function(typeid, wsname, wsid, desc, conditions) {
	wareHouseAttribute.desc = desc;
	wareHouseAttribute.typeid = typeid;
	wareHouseAttribute.wsid = wsid;
	wareHouseAttribute.wsname = wsname;
	wareHouseAttribute.item1 = new Ext.Panel({
				region : 'north',
				layout : 'fit',
				height : 365,
				split : true,
				border : false

			});
	wareHouseAttribute.item2 = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				border : false,
				split : true
			});

	wareHouseAttribute.attributePanel = new Ext.Panel({
				// title : wsname,
				layout : 'border',
				border : false,

				items : [wareHouseAttribute.item1, wareHouseAttribute.item2]
			});
	var conn = synchronize.createXhrObject();
	var url = "../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectHead?typeId="
			+ typeid + "&d=" + new Date().getTime();
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	//alert(respText);
	wareHouseAttribute.headtext = respText;
	var form = wareHouseAttribute.addDataInit(wsname, typeid, desc);
	var head = wareHouseAttribute.format(wareHouseAttribute.headtext, wsname,
			wsid, typeid, conditions);
	wareHouseAttribute.item2.insert(0, form);

	wareHouseAttribute.item1.insert(0, head);
	wareHouseAttribute.attributePanel.doLayout();

	return wareHouseAttribute.attributePanel;
}
wareHouseAttribute.format = function(text, name, wsid, typeid, conditions) {
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						// if (sm.getCount()) {
						// Ext.getCmp('delete').enable();
						// } else {
						// Ext.getCmp('delete').disable();
						// }
						// if (sm.getCount() == 1) {
						// Ext.getCmp('update').enable();
						// } else {
						// Ext.getCmp('update').disable();
						// }
					},
					rowselect : function(sm, rowIndex, record) {
						// if (sm.getCount() == 1) {
						// var dataType = record.get("dataType");
						// var cneterpanel = Ext.getCmp('centerpanel').items
						// .get(0);
						// Ext.getCmp('centerpanel').remove(cneterpanel);
						// var attributePanel = wareHouseAttribute.init(
						// dataType, record.get("categoryName"),
						// record.get("categoryId"));
						// Ext.getCmp('centerpanel').add(attributePanel);
						// Ext.getCmp('centerpanel').doLayout();
						// } else {
						// }
					}
				}

			});
	var base = wareHouseAttribute.headtext.split("?")[0];
	var tempbase = base.substr(1, base.length - 2);
	//alert(tempbase);
	var headgruop = wareHouseAttribute.headtext.split("?")[1];
	//alert(headgruop);
	var colsindex = wareHouseAttribute.headtext.split("?")[2];
	// wareHouseAttribute.dindex = colsindex;
	 //alert(colsindex);
	var header = Ext.util.JSON.decode(base);
	var hh = Ext.util.JSON.decode(headgruop);
	var cols = Ext.util.JSON.decode(colsindex);
	var headColMod = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : header
	})
	//var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseData?wsid=' + wsid + '&pid=' + typeid;
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseData';
	if (conditions != null) {
		strurl = '../JSON/qualityMgm_qualityTemplate.queryWareHouseData';
	}
	
	wareHouseAttribute.baseargs = {
			'wsid' : wsid,
			'pid' : typeid,
			'queryConditions' : conditions
		};

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'post'
			});
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty'
			// ,id : 'categoryId'
		}, cols);
	var ascid = '';
	var ascstr = '';
	wareHouseAttribute.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader

			});
	myGrid.loadvalue(wareHouseAttribute.ds, wareHouseAttribute.args,
			wareHouseAttribute.baseargs);

	wareHouseAttribute.grid = new Ext.grid.GridPanel({
		tbar : [{
			text : ''+getResource('resourceParam477')+'',
			iconCls : 'add1',
			listeners : {
				'click' : function() {
					var wareHouseId = new Ext.form.TextField({
								name : 'wareHouseId',
								allowBlank : false,
								maxLength : 50,
								inputType : 'hidden',
								readOnly : true,
								value : wareHouseAttribute.wsid
							});
					var whPhysicsId = new Ext.form.TextField({
								name : 'whPhysicsId',
								allowBlank : false,
								maxLength : 50,
								inputType : 'hidden',
								readOnly : true,
								value : wareHouseAttribute.typeid
							})
					var addForm = new Ext.form.FormPanel({

						fileUpload : true,
						bodyStyle : 'padding:5px 5px',

						border : false,
						autoScroll : true,
						defaults : {
							anchor : '90%',
							// allowBlank : false,
							msgTarget : 'side',
							labelAlign : 'right',
							style : 'margin-bottom: 5px;'

						},
						items : [wareHouseId, whPhysicsId],
						buttons : [{
							text : ''+getResource('resourceParam479')+'',
							handler : function() {
								if (addForm.getForm().isValid()) {

									addForm.getForm().submit({
												url : '../JSON/wareHouseAddData',
												method : 'post',
												success : function(form, action) {
													Ext.example.msg(''+getResource('resourceParam596')+'',
															''+getResource('resourceParam623')+'！');
													wareHouseAttribute.ds.reload();
													addForm.getForm().reset();
													// addWin.close();
												}
											});
								}
							}

						}, {
							text : ''+getResource('resourceParam606')+'',
							handler : function() {
								addForm.getForm().reset();
							}

						}]

					});
					Ext.Ajax.request({
						url : '../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectBaseHead',
						method : 'POST',
						success : function(response, options) {

							var formjson = Ext.util.JSON.decode(response.responseText);
							for (var i = 0; i < formjson.length; i++) {

								var type = formjson[i]['dataEntityType'];
								var id = formjson[i]['dataIndex'];
								var name = formjson[i]['header'];
								var idpath = formjson[i]['idpath'];
								var isref = formjson[i]['isref'];
								var ctype = formjson[i]['ctype'];
								//如果属性为状态,则设置成隐藏域
								if (name == '状态') {
									addForm.add(
										new Ext.form.TextField({
											inputType : 'hidden',
											id : idpath,
											name : idpath,
											value : '未处理'
										})											
									);
									continue;
								}

								var fomat = "";
								var precision = 0;

								if (type == "double") {
									precision = 10;
								} else if (type == "date") {
									fomat = "Y-m-d";
								}
								if (isref == 9) {
									addForm.add(new Ext.form.ComboBox({
										store : new Ext.data.JsonStore({
											method : 'GET',
											url : '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterID='
													+ ctype,
											root : 'results',
											fields : [{
														name : 'dataEntityName',
														mapping : 'dataEntityName'
													}]
										}),
										triggerAction : 'all',

										valueField : 'dataEntityName',
										displayField : 'dataEntityName',
										editable : false,
										lazyRender : true,
										id : idpath,
										fieldLabel : name,
										onSelect : function(r, index) {
											if (this.fireEvent('beforeselect',
													this, r, index) !== false) {
												var value = r.data[this.valueField
														|| this.displayField];
												this.setValue(value);
												this.collapse();
												this.fireEvent('select', this,
														r, index);
											}
										}
									}));
								} else {
									addForm.add(mytaskExtend.FormControls(
											idpath, name, '', fomat, precision,
											type));
								}
								addForm.doLayout();
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							typeId : wareHouseAttribute.typeid
						}
					});
					var temp = wareHouseAttribute.item2.items.get(0);
					if (temp) {
						wareHouseAttribute.item2.remove(temp);
					}
					// var editform =
					// wareHouseAttribute.oneDataUpdateInit(colid);
					wareHouseAttribute.item2.add(addForm);
					// wareHouseAttribute.attributePanel.add(newp);
					wareHouseAttribute.item2.doLayout();
					// var addWin = new Ext.Window({
					// title : '添加数据',
					// height : 300,
					// width : 500,
					// modal : true,
					// layout : 'fit',
					// items : [addForm]
					// });
					// addWin.show();
				}
			}

		}, {
			text : ''+getResource('resourceParam475')+'',
			iconCls : 'del1',
			listeners : {
				'click' : function() {

					var sm = wareHouseAttribute.grid.getSelectionModel();
					var count = sm.getCount();
					var records = sm.getSelections();
					var record;

					var idSequence = '';
					for (var i = 0; i < count; i++) {
						record = records[i];
						idSequence += record.get('colid') + ',';

					}
					Ext.Msg.confirm(''+getResource('resourceParam1724')+'', ""+getResource('resourceParam475')+"的"+getResource('resourceParam474')+"无法恢复，"+getResource('resourceParam512')+""+getResource('resourceParam510')+"继续?", function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : '../JSON/warehouseobject_WarehouseObjectRemote.delWareHouseData',
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
									} else {
										Ext.MessageBox.show({
													title : ''+getResource('resourceParam1724')+'',
													msg : ''+getResource('resourceParam651')+'',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												})

									}
									wareHouseAttribute.ds.reload();
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									categoryInstanceID : idSequence
								}

							});
						}
					});

				}

			}
		},{
			text : '查询',
			iconCls : 'query',
			listeners : {
				'click' : function() {
					var wind = new Ext.Window({
						id : 'queryWind',
						width : 520,
						height : 350,
						title : '质量单查询',
						modal : true,
						autoScroll : true,
						items : [qualityQueryForm.init(typeid, name, wsid, wareHouseAttribute.desc)]
					});
					wind.show();
				}
			}
		},{
			text : '导入',
			iconCls : 'add1'
		},{
			text : '导出',
			iconCls : 'add1',
			handler : function(){
				var sm = wareHouseAttribute.grid.getSelectionModel();
				var count = sm.getCount();
				if (count == 0 ) {Ext.Msg.alert('错误提示','至少选择一行'); return;}
				if (count > 1 ) {Ext.Msg.alert('错误提示','只能选择一行'); return;}					
				var records = sm.getSelections();
				var dataId = records[0].get('colid');
				var url = '';
				if (wsid == '20100806211954000156d3c58129439843ea8ed5') {//质量信息传递单
					url = '../JSON/ExportWordServlet?dataId='+dataId+'&type=zlxxcd';
				} else if (wsid == '20100805180440000750c1cff095ad9a486babf8') {//故障报告单
					url = '../JSON/ExportWordServlet?dataId='+dataId+'&type=gzbg';
				} else if (wsid == '20100805185942000250f30bca7684af472dabff') {//问题与改进措施报告表
					url = '../JSON/ExportWordServlet?dataId='+dataId+'&type=wtygjcs';
				} else if (wsid == '20100805190314000125eae905c5ee93416bb615') {//故障纠正措施效果确认单
					url = '../JSON/ExportWordServlet?dataId='+dataId+'&type=gzjzcsxg';
				}
				if (url.length > 0) {
					window.location.href = url;
				}
			}
		},{
			text : '提交处理',
			iconCls : 'submit',
			listeners : {
				'click' : function(){
					var sm = wareHouseAttribute.grid.getSelectionModel();
					var count = sm.getCount();
					if (count == 0 ) {Ext.Msg.alert('错误提示','至少选择一行'); return;}
					if (count > 1 ) {Ext.Msg.alert('错误提示','只能选择一行'); return;}					
					var records = sm.getSelections();
					var dataId = records[0].get('colid');
					var conn = synchronize.createXhrObject();
					var url = "../JSON/qualityMgm_qualityTemplate.getObjectInfoByRowId?rowId="+ dataId;
					conn.open("GET", url, false);
					conn.send(null);
					var respText = conn.responseText;
					
					var obj = respText.split('-');
					if (obj[1] != '未处理') {Ext.Msg.alert('错误提示','已提交处理，不能重复提交'); return};
					
					var wind = new Ext.Window({
					id : "modalWind",
					width : '560',
					height : '100',
					title : '提交处理窗口',
					modal : true,
					items : [approvePanel.init(null,dataId,'QulityFormDataType',null,null,null,obj[0])]
				});
				wind.show();
				}
			}
		},{
			text : '查看审批记录',
			iconCls : 'query',
			handler : function(){
				var sm = wareHouseAttribute.grid.getSelectionModel();
				var count = sm.getCount();
				if (count == 0 ) {Ext.Msg.alert('错误提示','至少选择一行'); return;}
				if (count > 1 ) {Ext.Msg.alert('错误提示','只能选择一行'); return;}					
				var records = sm.getSelections();
				var dataId = records[0].get('colid');
								
				var conn = synchronize.createXhrObject();
				var url = "../JSON/qualityMgm_qualityTemplate.getActiveInstanceIdByObjectId?objectId="+ dataId;
				conn.open("GET", url, false);
				conn.send(null);
				var activeInstanceId = conn.responseText;
				
				var appoveFlowStepInfo = approveFlowSteps.getGrid();
				approveFlowSteps.refreshGrid(activeInstanceId);
				
				var cneterpanel = Ext.getCmp('centerpanel').items.get(0);
				if (cneterpanel) {
					Ext.getCmp('centerpanel').remove(cneterpanel);
				}
				Ext.getCmp('centerpanel').add(appoveFlowStepInfo);
				Ext.getCmp('centerpanel').doLayout();
			}
		}],
		region : 'center',
		autoScroll : true,
		// width : '100%',

		disableSelection : true,
		store : wareHouseAttribute.ds,
		sm : sm,
		colModel : headColMod,
		// viewConfig : {
		// forceFit : true
		// },

		plugins : [new Ext.ux.plugins.GroupHeaderGrid({
					rows : hh,
					hierarchicalColMenu : false
				})],
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 10,
			store : wareHouseAttribute.ds,
			displayInfo : true,
			displayMsg : ''+getResource('resourceParam946')+'{0} - {1} '+getResource('resourceParam949')+' {2} 行',
			emptyMsg : ""+getResource('resourceParam945')+""
		})

	});
	wareHouseAttribute.grid.on("rowclick", function(grid, rowindex, e) {

				var record = wareHouseAttribute.grid.store.getAt(rowindex);
				var temp = wareHouseAttribute.item2.items.get(0);
				if (temp) {
					wareHouseAttribute.item2.remove(temp);
				}
				// wareHouseAttribute.attributePanel.insert(1, form);
				var datepanel = wareHouseAttribute.oneDataInit(record.get("colid"));
				wareHouseAttribute.item2.add(datepanel);
				wareHouseAttribute.item2.doLayout();
			});
	selectFormat = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [wareHouseAttribute.grid]
			});
	wareHouseAttribute.grid.getSelectionModel().on('selectionchange',
			function() {
				//alert('fddffd')

			})
			//alert(strurl);
	return selectFormat;

}
// 查看一条记录
wareHouseAttribute.oneDataInit = function(colid) {

	var dataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				},
				// items : [],
				buttons : [{
					text : ''+getResource('resourceParam478')+'',
					listeners : {
						'click' : function() {
							var temp = wareHouseAttribute.item2.items.get(0);
							if (temp) {
								wareHouseAttribute.item2.remove(temp);
							}
							var editform = wareHouseAttribute
									.oneDataUpdateInit(colid);
							wareHouseAttribute.item2.add(editform);
							// wareHouseAttribute.attributePanel.add(newp);
							wareHouseAttribute.item2.doLayout();

						}
					}
				}]
			});
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getOneWarehouseData',
		method : 'POST',
		success : function(response, options) {
			var formjson = Ext.util.JSON.decode(response.responseText);
			wareHouseAttribute.oneRowData = response.responseText;
			for (var i = 0; i < formjson.length; i++) {

				var type = formjson[i]['dataEntityType'];
				// var id = formjson[i]['dataIndex'];
				var name = formjson[i]['dataEntityName'];
				var value = formjson[i]['value'];
				var fileid = formjson[i]['fileID'];
				// alert(type + id + name);
				if (name == '状态') continue;
				var fomat = "";
				var precision = 0;
				if (type == "double") {
					precision = 10;
				} else if (type == "date") {
					fomat = "Y-m-d";
				}
				if (type == 'file') {
					dataPanel.add(new Ext.form.DisplayField({
						fieldLabel : name,
						value : '<a   style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId='
								+ fileid
								+ '&fileName='
								+ value
								+ '">'
								+ value
								+ '</a>'
					}));
				} else {
					dataPanel.add(mytaskExtend.FormControls('', name, value,
							fomat, precision, type));
				}
				dataPanel.doLayout();
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			pid : colid
		}
	});
	// var base = wareHouseAttribute.headtext.split("-")[0];
	// var formjson = Ext.util.JSON.decode(base);

	dataPanel.doLayout();
	return dataPanel;
}
// 更新一条记录的表单
wareHouseAttribute.oneDataUpdateInit = function(colid) {
	// alert(colid);
	var currnetRowId = new Ext.form.TextField({
				id : 'currnetRowId',
				value : colid
			});
	var updataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : false

				},
				items : [],
				buttons : [{

					text : '保存',
					listeners : {
						'click' : function() {
							if (updataPanel.getForm().isValid()) {

								updataPanel.getForm().submit({
									url : '../JSON/wareHouseUpdateData',
									method : 'post',
									success : function(form, action) {
										Ext.example.msg(''+getResource('resourceParam596')+'', ''+getResource('resourceParam478')+' 成功！');

										var temp = wareHouseAttribute.item2.items
												.get(0);
										if (temp) {
											wareHouseAttribute.item2
													.remove(temp);
										}
										var editform = wareHouseAttribute
												.oneDataInit(colid);
										wareHouseAttribute.item2.add(editform);
										// wareHouseAttribute.attributePanel.add(newp);
										wareHouseAttribute.item2.doLayout();
										wareHouseAttribute.ds.reload();

									}
								});

							}
						}
					}
				}]
			});

	var formjson = Ext.util.JSON.decode(wareHouseAttribute.oneRowData);
	for (var i = 0; i < formjson.length; i++) {

		var type = formjson[i]['dataEntityType'];
		var id = formjson[i]['dataEntityID'] + "," + type;
		var label = formjson[i]['dataEntityName'];
		var name = formjson[i]['dataEntityID'] + "," + type;
		var value = formjson[i]['value'];
		var isref = formjson[i]['isRef'];
		var ctype = formjson[i]['customTypeItemID'];
		if (label == '状态') continue;
		var fomat = "";
		var precision = 0;
		if (type == "double") {
			precision = 10;
		} else if (type == "date") {
			fomat = "Y-m-d";
		}
		if (isref == 9) {
			// alert(isref + ctype);
			updataPanel.add(new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					method : 'GET',
					url : '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterID='
							+ ctype,
					root : 'results',
					fields : [{
								name : 'dataEntityName',
								mapping : 'dataEntityName'
							}]
				}),
				triggerAction : 'all',

				valueField : 'dataEntityName',
				displayField : 'dataEntityName',
				editable : false,
				lazyRender : true,
				id : id,
				value : value,
				fieldLabel : label,
				onSelect : function(r, index) {
					if (this.fireEvent('beforeselect', this, r, index) !== false) {
						var value = r.data[this.valueField || this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, r, index);
					}
				}
			}));

		} else if (type == 'file') {
			updataPanel.add(new Ext.ux.form.FileUploadField({
						fieldLabel : label,
						value : value,
						name : name,
						style : 'margin-bottom: 5px;',
						buttonText : ''+getResource('resourceParam473')+'',
						emptyText : ''+getResource('resourceParam1022')+'',
						listeners : {
							render : function() {
								// this.el.dom.parentNode.parentNode
								// .setAttribute('style',
								// 'padding-left:'
								// + paddingleft
								// + 'px');
								// this.el.dom.parentNode
								// .setAttribute(
								// 'style',
								// 'width:'
								// + item.width
								// + 'px;'
								// + 'margin-bottom: 5px;');
							}
						}
					}));
		} else {
			updataPanel.add(mytaskExtend.FormControls(id, label, value, fomat,
					precision, type));
		}
		updataPanel.doLayout();
	}
	updataPanel.doLayout();
	return updataPanel;
}

wareHouseAttribute.addDataInit = function(name, typeid, desc) {
	var wareHouseName = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam1739')+'',
				name : 'wareHouseName',
				allowBlank : false,
				maxLength : 50,
				readOnly : true,
				value : name
			});
	var description = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam648')+'',
				name : 'description',
				maxLength : 200,
				readOnly : true,
				value : desc

			});
	var addDataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				},
				items : [wareHouseName, description],
				buttons : []
			});

	addDataPanel.doLayout();
	return addDataPanel;
}











