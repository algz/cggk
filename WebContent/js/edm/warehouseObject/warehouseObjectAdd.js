var warehouseObjectAdd = {
	nextflag : 1,
	headfalg : 0,
	typeId : ''
}
Ext.grid.myCheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel,
		{
			header : '<div class="x-grid3-hd-checker" style="display:none;">&#160;</div>'
		})
warehouseObjectAdd.init = function() {
	warehouseObjectAdd.typeId = ""; // 清除第一次选择缓存的typeId @chenw
	var addPanel = new Ext.FormPanel({
				bodyStyle : 'padding:5px 5px',
				items : [warehouseObjectAdd.getBaseTypeComb('physicsTypeCombo',
						'physicsTypeCombo', ''
								+ getResource('resourceParam616') + '', 200)]
			});
	// var physicsTypeTree = physicsTypeColumnTreePanel.init('0', 650);
	warehouseObjectAdd.item1 = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				border : false

			});
	warehouseObjectAdd.mainAddPanel = new Ext.Panel({
		border : false,
		layout : 'border',
		items : [new Ext.Panel({
							region : 'north',
							layout : 'fit',
							height : 35,
							border : false,
							items : [addPanel]
						}), warehouseObjectAdd.item1],
		buttons : [{
			id : 'nextadd',
			text : '' + getResource('resourceParam1151') + '',
			listeners : {
				'click' : function() {
					// Ext.getCmp("nextadd").setVisible(false);
					if (1 == warehouseObjectAdd.nextflag) {
						if ('' == warehouseObjectAdd.typeId) {
							Ext.example.msg(''
											+ getResource('resourceParam596')
											+ '', ''
											+ getResource('resourceParam459')
											+ ''
											+ getResource('resourceParam616')
											+ '');
							return;
						}
						warehouseObjectAdd.nextflag = 2;
						Ext.Ajax.request({
							url : '../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectHead',
							method : 'POST',
							success : function(response, options) {
								warehouseObjectAdd.headtext = response.responseText;
								var tba = warehouseObjectAdd.item1.items.get(0);
								if (tba) {
									warehouseObjectAdd.item1.remove(tba);
								}
								warehouseObjectAdd.item1.doLayout();
								var head = warehouseObjectAdd
										.format(warehouseObjectAdd.headtext);
								warehouseObjectAdd.item1.insert(0, head);
								warehouseObjectAdd.item1.doLayout();
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								typeId : warehouseObjectAdd.typeId
							}
						});
					} else if (2 == warehouseObjectAdd.nextflag) {
						if ('' == warehouseObjectAdd.typeId) {
							Ext.example.msg(''
											+ getResource('resourceParam596')
											+ '', ''
											+ getResource('resourceParam459')
											+ ''
											+ getResource('resourceParam616')
											+ '');
							return;
						}
						warehouseObjectAdd.nextflag = 3;
						Ext.getCmp("nextadd").setText(""
								+ getResource('resourceParam479') + "");
						Ext.getCmp("reset").setVisible(true);								
						var tba = warehouseObjectAdd.item1.items.get(0);
						if (tba) {
							warehouseObjectAdd.item1.remove(tba);
						}
						warehouseObjectAdd.item1.doLayout();
						warehouseObjectAdd.addDataForm = warehouseObjectAdd
								.addDataInit();
						warehouseObjectAdd.item1.insert(0,
								warehouseObjectAdd.addDataForm);
						warehouseObjectAdd.item1.doLayout();

					} else if (3 == warehouseObjectAdd.nextflag) {
						if ('' == warehouseObjectAdd.typeId) {
							Ext.example.msg(''
											+ getResource('resourceParam596')
											+ '', ''
											+ getResource('resourceParam459')
											+ ''
											+ getResource('resourceParam616')
											+ '');
							return;
						}
						if (warehouseObjectAdd.addDataForm.getForm().isValid()) {
							warehouseObjectAdd.addDataForm.getForm().submit({
								url : '../JSON/wareHouseAdd?wareHouseName='
										+ warehouseObjectAdd.wareHouseName
												.getValue() + '&physicsTypeId='
										+ warehouseObjectAdd.typeId,
								method : 'post',
								success : function(form, action) {
									Ext.Msg.show({
										title : ''
												+ getResource('resourceParam596')
												+ '',
										msg : ''
												+ getResource('resourceParam623')
												+ '',
										width : 170,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.INFO
									});
									var tab1 = warehouseObjectMain.centerPanle.items
											.get(0);
									if (tab1) {
										warehouseObjectMain.centerPanle
												.remove(tab1);
									}
									var newp = warehouseObjectAdd.init();
									warehouseObjectMain.centerPanle.add(newp);
									warehouseObjectMain.centerPanle.doLayout();
									/**
									 * Update by YangJin'gang begin
									 */
									warehouseObjectList.grid.store.reload();
									/** end */
									/*
									 * myGrid.loadvalue(
									 * warehouseObjectList.grid.store,
									 * warehouseObjectList.args,
									 * warehouseObjectList.baseargs);
									 */

								},
								failure : function(form, action) {
									Ext.Msg.show({
										title : ''
												+ getResource('resourceParam596')
												+ '',
										msg : ''
												+ getResource('resourceParam594')
												+ '',
										width : 170,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									});
								}
							});
						}
					}
				}
			}
		}
		, {
			text : '' + getResource('resourceParam606') + '',
			id:'reset',
			hidden:true,
			listeners : {
				'click' : function() {
					if (warehouseObjectAdd.addDataForm) {
						warehouseObjectAdd.addDataForm.getForm().reset();
					} else {
						return;
					}
				}
			}
		}
		]
	});

	return warehouseObjectAdd.mainAddPanel;
}
warehouseObjectAdd.format = function(a) {
	var gridhead = warehouseObjectAdd.tableHead();
	var selectStyle = new Ext.form.RadioGroup({

				style : 'margin-left:10px',
				allowBlank : false,

				items : [{

							boxLabel : '' + getResource('resourceParam1773')
									+ '',
							name : 'check',
							inputValue : '1',
							value : 1
						}, {

							boxLabel : '' + getResource('resourceParam1774')
									+ '',
							name : 'check',
							inputValue : '0',
							value : 0
						}]

			});
	selectStyle.on("change", function() {
				var rg = selectStyle.getValue();
				warehouseObjectAdd.headfalg = rg.value;
				var tab = selectFormat.items.get(2);
				if (tab) {
					selectFormat.remove(tab)
				}
				var newtab = warehouseObjectAdd.tableHead();
				selectFormat.insert(2, newtab);
				selectFormat.doLayout();
			});

	selectFormat = new Ext.Panel({
				border : false,
				autoScroll : true,
				items : [{
							// html :
							// '<divstyle="margin-left:10px;line-height:26px;"><spanstyle="font-weight:bold;">&nbsp;表头设计:</span></div>',
							border : false
						}, gridhead]
			});
	return selectFormat;

}
warehouseObjectAdd.tableHead = function() {
	var base = warehouseObjectAdd.headtext.split("\?")[0];
	var headgruop = null;
	if (warehouseObjectAdd.headfalg == 0) {
		headgruop = warehouseObjectAdd.headtext.split("\?")[1];
	} else if (warehouseObjectAdd.headfalg == 1) {
		headgruop = '[]';
	}

	var colsindex = warehouseObjectAdd.headtext.split("\?")[2];
	var header = Ext.util.JSON.decode(base);
	var hh = Ext.util.JSON.decode(headgruop);
	var cols = Ext.util.JSON.decode(colsindex);
	var grid = new Ext.grid.GridPanel({
				region : 'center',

				height : 200,
				disableSelection : true,
				store : new Ext.data.SimpleStore({
							fields : [],
							data : []
						}),
				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : header
				}),
				autoScroll : true,

				plugins : [new Ext.ux.plugins.GroupHeaderGrid({
							rows : hh,
							hierarchicalColMenu : false
						})]
			});
	return grid;
}
warehouseObjectAdd.getBaseTypeComb = function(id, name, fieldLabel, width) {
	var baseTypeComb = new Ext.form.ComboBox({
		id : id,
		name : name,
		fieldLabel : fieldLabel,
		store : new Ext.data.JsonStore({
			url : '../JSON/dynamicmodel_datatype.getPhysicsDataTypeList?datatypeRank=8',
			method : 'GET',
			fields : ['datatypeId', 'datatypeName']
		}),
		triggerAction : 'all',
		width : width,
		valueField : 'datatypeId',
		displayField : 'datatypeName',
		// readOnly : true,
		allowBlank : false,

		editable : false,
		lazyRender : true,
		onSelect : function(record, index) {
			warehouseObjectAdd.nextflag = 1;
			warehouseObjectAdd.headfalg = 0;
			Ext.getCmp("nextadd").setText("" + getResource('resourceParam1151')
					+ "");
			warehouseObjectAdd.typeId = record.get("datatypeId");
			warehouseObjectAdd.typeName = record.get("datatypeName");
			var tba = warehouseObjectAdd.item1.items.get(0);
			if (tba) {
				warehouseObjectAdd.item1.remove(tba);
			}

			var physicsTypeTree = physicTypeTreeGrid.init(record
					.get("datatypeId"));
			physicsTypeTree.getStore().on('beforeload',
					function(store, options) {
						options.params = Ext.apply(options.params, {
									dataCenterID : record.get("datatypeId"),
									parentDataEntityID : "0",
									disableCheck : true,
									isbase : 1
								});
					});
			physicsTypeTree.getStore().load();
			warehouseObjectAdd.item1.insert(0, physicsTypeTree);
			warehouseObjectAdd.item1.doLayout();
			if (this.fireEvent('beforeselect', this, record, index) !== false) {
				var value = record.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, record, index);
			}

		}

	})

	return baseTypeComb;
}
warehouseObjectAdd.addDataInit = function() {
	warehouseObjectAdd.wareHouseName = new Ext.form.TextField({
		fieldLabel : '' + getResource('resourceParam480') + '',
		blankText : '' + getResource('resourceParam1772') + '',
		name : 'wareHouseName',
		id : 'wareHouseName',
		allowBlank : false,
		maxLength : 50,
		emptyText : '' + getResource('resourceParam1772') + '',
		minLengthText : '' + getResource('resourceParam480') + ''
				+ getResource('resourceParam782') + '',

		regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
		regexText : '' + getResource('resourceParam1092') + '!',
		/**
		 * 取消全角输入时的空格bug
		 * 
		 * @author wangyf 2011-04-20 17:00
		 */
		enableKeyEvents : true,
		listeners : {
			'blur' : function(cur, evt) {
				var curStr = cur.getValue();
				for (var i = 0; i < curStr.length; i++) {
					var str = curStr.charCodeAt(i);
					if (str == 12288) {
						if (typeof curStr[i] == 'undefined' || curStr[i] == '　') {
							curStr = curStr.replace('　', ' ');
						}
					}
				}
				Ext.getCmp('wareHouseName').setValue(curStr);
			}
		}
	});
	warehouseObjectAdd.description = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam648') + '',
				blankText : '',
				name : 'description',
				allowBlank : true,
				maxLength : 200,
				emptyText : '',
				minLengthText : '' + getResource('resourceParam648') + ''
						+ getResource('resourceParam866') + '!',
				validator : function() {
					var str = Ext.util.Format
							.trim(warehouseObjectAdd.description.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 200) {
						warehouseObjectAdd.description.invalidText = ' '
								+ getResource('resourceParam648') + ''
								+ getResource('resourceParam1386') + '200！';
						warehouseObjectAdd.description.focus();
						return false;
					} else {
						return true;
					}
				}
			});
	warehouseObjectAdd.physicsTypeId = new Ext.form.TextField({
				name : 'physicsTypeId',
				allowBlank : false,
				maxLength : 50,
				inputType : 'hidden',
				value : warehouseObjectAdd.typeId
			});
	var addDataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '80%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [warehouseObjectAdd.wareHouseName,
						warehouseObjectAdd.physicsTypeId,
						warehouseObjectAdd.description]
			});
	// Ext.Ajax.request({
	// url :
	// '../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectBaseHead',
	// method : 'POST',
	// success : function(response, options) {
	// var formjson = Ext.util.JSON.decode(response.responseText);
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
	// addDataPanel.add(mytaskExtend.FormControls(id, name, '', fomat,
	// precision, type));
	// addDataPanel.doLayout();
	// }
	// },
	// disableCaching : true,
	// autoAbort : true,
	// params : {
	// typeId : warehouseObjectAdd.typeId
	// }
	// });

	addDataPanel.doLayout();
	return addDataPanel;
}
