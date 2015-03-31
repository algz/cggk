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
wareHouseAttribute.init = function(typeid, wsname, wsid, desc) {

	wareHouseAttribute.typeid = typeid;
	wareHouseAttribute.wsid = wsid;
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
	wareHouseAttribute.headtext = respText;
	var form = wareHouseAttribute.addDataInit(wsname, typeid, desc);
	var head = wareHouseAttribute.format(wareHouseAttribute.headtext, wsname,
			wsid, typeid);
	wareHouseAttribute.item2.insert(0, form);

	wareHouseAttribute.item1.insert(0, head);
	wareHouseAttribute.attributePanel.doLayout();

	return wareHouseAttribute.attributePanel;
}
wareHouseAttribute.format = function(text, name, wsid, typeid) {
	Ext.QuickTips.init();
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
	var base = wareHouseAttribute.headtext.split("\?")[0];
	var tempbase = base.substr(1, base.length - 2);
	var headgruop = wareHouseAttribute.headtext.split("\?")[1];
	var colsindex = wareHouseAttribute.headtext.split("\?")[2];
	// wareHouseAttribute.dindex = colsindex;
	// alert(colsindex);
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
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseData?wsid='
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
	wareHouseAttribute.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader

			});
	myGrid.loadvalue(wareHouseAttribute.ds, wareHouseAttribute.args,
			wareHouseAttribute.baseargs);

	wareHouseAttribute.grid = new Ext.grid.GridPanel({
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
					displayMsg : '' + getResource('resourceParam946')
							+ '{0} - {1} ' + getResource('resourceParam949')
							+ ' {2} 行',
					emptyMsg : "" + getResource('resourceParam945') + ""
				})

			});
	// 验证权限
	wareHouseAttribute.grid.on('afterlayout', function(p) {
			});
	wareHouseAttribute.grid.on("rowclick", function(grid, rowindex, e) {

				var record = wareHouseAttribute.grid.store.getAt(rowindex);
				var temp = wareHouseAttribute.item2.items.get(0);
				if (temp) {
					wareHouseAttribute.item2.remove(temp);
				}
				// wareHouseAttribute.attributePanel.insert(1, form);
				var datepanel = wareHouseAttribute.oneDataInit(record
								.get("colid"), wareHouseAttribute.typeid,
						wareHouseAttribute.wsid);

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
				// alert('fddffd')

			})
	return selectFormat;

}
// 查看一条记录
wareHouseAttribute.oneDataInit = function(colid, typeid, wsid) {

	var dataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				labelWidth : 300,
				autoScroll : true,
				defaults : {
					anchor : '70%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true
				}
			});
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getOneRowDataByPhysicsType',
		method : 'POST',
		success : function(response, options) {
			var formjson = Ext.util.JSON.decode(response.responseText);
			wareHouseAttribute.oneRowData = response.responseText;
			for (var i = 0; i < formjson.length; i++) {

				var type = formjson[i]['dataEntityType'];
				// var id = formjson[i]['dataIndex'];
				var name = formjson[i]['dataEntityName'];
				var value = formjson[i]['value'];
				var fileid = formjson[i]['fileid'];
				// alert(type + ":" + id + ":" + value + ":" + name);
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
				} else if (type == 'boolean') {

					dataPanel.add(new Ext.form.TextField({
								id : id,
								fieldLabel : name,
								value : value,
								name : id,
								anchor : '61.8%'
							}));
				} else {
					dataPanel.add(whExtend.FormControls('', name, value, fomat,
							precision, type));
				}
				dataPanel.doLayout();
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			wsid : wsid,
			pid : typeid,
			rowId : colid
		}
	});
	// var base = wareHouseAttribute.headtext.split("-")[0];
	// var formjson = Ext.util.JSON.decode(base);

	dataPanel.doLayout();
	return dataPanel;
}
// 更新一条记录的表单
wareHouseAttribute.oneDataUpdateInit = function(colid, typeid, wsid) {
	// alert(colid);
	var currnetRowId = new Ext.form.TextField({
				id : 'currnetRowId',
				value : colid
			});
	var updataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',
				labelWidth : 300,
				border : false,
				autoScroll : true,
				defaults : {
					anchor : '70%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : false

				},
				items : [],
				buttons : [{
					text : '' + getResource('resourceParam7002') + '',// 保存
					listeners : {
						'click' : function() {
							if (updataPanel.getForm().isValid()) {

								updataPanel.getForm().submit({
									url : '../JSON/wareHouseUpdateData',
									method : 'post',
									success : function(form, action) {
										Ext.example
												.msg(
														''
																+ getResource('resourceParam596')
																+ '',
														''
																+ getResource('resourceParam478')
																+ ' 成功！');

										var temp = wareHouseAttribute.item2.items
												.get(0);
										if (temp) {
											wareHouseAttribute.item2
													.remove(temp);
										}
										var editform = wareHouseAttribute
												.oneDataInit(colid, typeid,
														wsid);
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

		var type = formjson[i]['type'];
		var id = formjson[i]['dataobjectid'] + ","

		+ type + "," + formjson[i]['isRef'] + ","
				+ formjson[i]['dataEntityName'] + ","
				+ formjson[i]['dataEntityID'] + "," + formjson[i]['idpath']
				+ "," + colid + "," + wsid;
		var label = formjson[i]['dataEntityName'];
		var name = formjson[i]['dataobjectid'] + ","

		+ type + "," + formjson[i]['isRef'] + ","
				+ formjson[i]['dataEntityName'] + ","
				+ formjson[i]['dataEntityID'] + "," + formjson[i]['idpath']
				+ "," + colid + "," + wsid;

		var value = formjson[i]['value'];
		var isref = formjson[i]['isRef'];
		var ctype = formjson[i]['dataEntityType'];

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
						buttonText : '' + getResource('resourceParam473') + '',
						emptyText : '' + getResource('resourceParam1022') + '',
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
		} else if (type == 'boolean') {

			updataPanel.add(new Ext.form.ComboBox({
				id : id,
				fieldLabel : label,
				value : value,
				name : id,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,

				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ["id", 'displayText'],
							data : [
									[
											''
													+ getResource('resourceParam512')
													+ '',
											''
													+ getResource('resourceParam512')
													+ ''],
									[
											''
													+ getResource('resourceParam510')
													+ '',
											''
													+ getResource('resourceParam510')
													+ '']]
						}),
				valueField : "id",
				displayField : 'displayText',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index) !== false) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}
			}));
		} else {
			updataPanel.add(whExtend.FormControls(id, label, value, fomat,
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
				fieldLabel : '' + getResource('resourceParam1739') + '',
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
				fieldLabel : '' + getResource('resourceParam648') + '',
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
