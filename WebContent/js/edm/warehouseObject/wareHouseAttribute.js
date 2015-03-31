var wareHouseAttribute = {

}
// typeid 物理类型id ,name 库名称， id 库ID
wareHouseAttribute.init = function(typeid, wsname, wsid, desc) {
	wareHouseAttribute.typeid = typeid;
	wareHouseAttribute.wsid = wsid;
	// alert(typeid + ":" + wsname + ":" + wsid + desc);
	wareHouseAttribute.item1 = new Ext.Panel({
				region : 'north',
				layout : 'fit'

			});
	wareHouseAttribute.item2 = new Ext.Panel({
				region : 'center',
				layout : 'fit'
			});

	wareHouseAttribute.attributePanel = new Ext.Panel({
				title : wsname,
				layout : 'border',
				split : true,
				items : [wareHouseAttribute.item1, wareHouseAttribute.item2]
			});
	var conn = synchronize.createXhrObject();
	var url = "../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectHead?typeId="
			+ typeid + "&d=" + new Date().getTime();
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	wareHouseAttribute.headtext = respText;
	var form = wareHouseAttribute.addDataInit(wsname, typeid, desc);
	var head = wareHouseAttribute.format(wareHouseAttribute.headtext, wsname,
			wsid, typeid); 
	wareHouseAttribute.item2.insert(0, form);

	wareHouseAttribute.item1.insert(0, head);
	wareHouseAttribute.item1.setHeight(300);
	// wareHouseAttribute.item1.setHeight(wareHouseAttribute.attributePanel
	// .getHeight()
	// / 2);
	wareHouseAttribute.attributePanel.doLayout();

	return wareHouseAttribute.attributePanel;

}
wareHouseAttribute.format = function(text, name, wsid, typeid) {
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
					},
					rowselect : function(sm, rowIndex, record) {
					}
				}

			});
	var base = wareHouseAttribute.headtext.split("\?")[0];
	var headgruop = wareHouseAttribute.headtext.split("\?")[1];
	var colsindex = wareHouseAttribute.headtext.split("\?")[2];
	
	var header = Ext.util.JSON.decode(base);
	var hh = Ext.util.JSON.decode(headgruop);

	var cols = Ext.util.JSON.decode(colsindex);
	var headColMod = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		sm : sm,
		columns : header
	})
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseData?start=1&wsid='
			+ wsid + '&pid=' + typeid;
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
	wareHouseAttribute.ds = new data.Store(proxy, reader);
	wareHouseAttribute.ds.load();

	var grid = new Ext.grid.GridPanel({
				// tbar : [{
				// text : '新增',
				// iconCls : 'priv-add',
				// listeners : {
				// 'click' : function() {
				// var wareHouseId = new Ext.form.TextField({
				// name : 'wareHouseId',
				// allowBlank : false,
				// maxLength : 50,
				// inputType : 'hidden',
				// readOnly : true,
				// value : wareHouseAttribute.wsid
				// });
				// var whPhysicsId = new Ext.form.TextField({
				// name : 'whPhysicsId',
				// allowBlank : false,
				// maxLength : 50,
				// inputType : 'hidden',
				// readOnly : true,
				// value : wareHouseAttribute.typeid
				// })
				// var addForm = new Ext.form.FormPanel({
				//
				// fileUpload : true,
				// bodyStyle : 'padding:5px 5px',
				//
				// border : false,
				// autoScroll : true,
				// defaults : {
				// anchor : '90%',
				// // allowBlank : false,
				// msgTarget : 'side',
				// labelAlign : 'right',
				// style : 'margin-bottom: 5px;'
				//
				// },
				// items : [wareHouseId, whPhysicsId],
				// buttons : [{
				// text : '确定',
				// handler : function() {
				// if (addForm.getForm().isValid()) {
				//
				// addForm.getForm().submit({
				// url : '../JSON/wareHouseAddData',
				// method : 'post',
				// success : function(form, action) {
				// Ext.Msg.show({
				// title : '提示信息',
				// msg : '添加成功',
				// width : 170,
				// buttons : Ext.Msg.OK,
				// icon : Ext.Msg.INFO
				// });
				// wareHouseAttribute.ds
				// .reload();
				// addWin.close();
				// }
				// });
				// }
				// }
				//
				// }, {
				// text : '重置',
				// handler : function() {
				// addForm.getForm().reset();
				// }
				//
				// }]
				//
				// });
				// Ext.Ajax.request({
				// url :
				// '../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectBaseHead',
				// method : 'POST',
				// success : function(response, options) {
				// var formjson = Ext.util.JSON
				// .decode(response.responseText);
				// for (var i = 0; i < formjson.length; i++) {
				//
				// var type = formjson[i]['dataEntityType'];
				// var id = formjson[i]['dataIndex'];
				// var name = formjson[i]['header'];
				// // var value = formjson.rows[i]['value'];
				// // alert(type + id + name);
				// var fomat = "";
				// var precision = 0;
				// if (type == "double") {
				// precision = 10;
				// } else if (type == "date") {
				// fomat = "Y-m-d";
				// }
				// addForm.add(mytaskExtend.FormControls(id, name,
				// '', fomat, precision, type));
				// addForm.doLayout();
				// }
				// },
				// disableCaching : true,
				// autoAbort : true,
				// params : {
				// typeId : wareHouseAttribute.typeid
				// }
				// });
				// var addWin = new Ext.Window({
				// title : '添加数据',
				// height : 300,
				// width : 500,
				// modal : true,
				// layout : 'fit',
				// items : [addForm]
				// });
				// addWin.show();
				// }
				// }
				//
				// }],
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
						})]

			});
	grid.on("rowclick", function(grid, rowindex, e) {
				var record = grid.store.getAt(rowindex);
				var temp = wareHouseAttribute.item2.items.get(0);
				if (temp) {
					wareHouseAttribute.item2.remove(temp);
				}
				// wareHouseAttribute.attributePanel.insert(1, form);
				var datepanel = wareHouseAttribute.oneDataInit(record
						.get("colid"));
				wareHouseAttribute.item2.add(datepanel);
				wareHouseAttribute.item2.doLayout();
			});
	selectFormat = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [grid]
			});

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
				items : [],
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
								+ encodeURI(encodeURI(value))
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

					text : '' + getResource('resourceParam7002') + '',//保存
					listeners : {
						'click' : function() {
							if (updataPanel.getForm().isValid()) {

								updataPanel.getForm().submit({
									url : '../JSON/wareHouseUpdateData',
									method : 'post',
									success : function(form, action) {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam677')+'',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.INFO
												});

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
		var fomat = "";
		var precision = 0;
		if (type == "double") {
			precision = 10;
		} else if (type == "date") {
			fomat = "Y-m-d";
		}
		if (type == 'file') {
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

	// var base = wareHouseAttribute.headtext.split("-")[0];
	// var formjson = Ext.util.JSON.decode(base);

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
	// var wareHouseName = new Ext.form.TextField({
	// fieldLabel : '名称',
	// name : 'wareHouseName',
	// allowBlank : false,
	// maxLength : 50,
	// readOnly : true,
	// value : name
	// });
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
