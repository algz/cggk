var dateCateAddFri = {
	node : ''
}
dateCateAddFri.init = function() {

	var objectstore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/datacenter_DataCenterRemote.getDataObjectCombo'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results'
				}, [{
							name : 'categoryId',
							type : 'string'
						}, {
							name : 'categoryName',
							type : 'string'
						}, {
							name : 'icon',
							type : 'string'
						}, {
							name : 'type',
							type : 'string'
						}])
	});
	var categoryInstanceName = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam480')+'',
				name : 'categoryInstanceName',
				allowBlank : false,
				blankText : ''+getResource('resourceParam1728')+'',

				style : 'margin-bottom:5px',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',
				validator : function() {
					var str = Ext.util.Format.trim(categoryInstanceName
							.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 30) {
						categoryInstanceName.invalidText = ' '+getResource('resourceParam1378')+'30！';
						categoryInstanceName.focus();
						return false;
					} else {
						return true;
					}
				}

			});
	var categoryType = new Ext.form.ComboBox({
				fieldLabel : ''+getResource('resourceParam481')+'',
				name : 'categoryType',
				style : 'margin-bottom:5px',
				store : objectstore,
				mode : 'local',
				triggerAction : 'all',
				valueField : 'categoryId',
				displayField : 'categoryName',
				id : 'categoryType',
				editable : false,
				blankText : ''+getResource('resourceParam1729')+'',
				onSelect : function(record, index) {
					dateCateAddFri.icon = record.get("icon");

					if (this.fireEvent('beforeselect', this, record, index) !== false) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}
					dateCateAddFri.type = record.get("type");
				}

			});
	objectstore.load();
	var userid = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam1058')+'',
				allowBlank : false,
				style : 'margin-bottom:5px'
			});
	var createdate = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam981')+'',
				allowBlank : false,
				style : 'margin-bottom:5px',
				value : new Date()
			});
	var description = new Ext.form.TextArea({
				name : 'description',
				fieldLabel : ''+getResource('resourceParam648')+'',
				style : 'margin-bottom:5px',
				validator : function() {
					var str = Ext.util.Format.trim(description.getValue());
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
						description.invalidText = ' '+getResource('resourceParam648')+''+getResource('resourceParam1386')+'200！';
						description.focus();
						return false;
					} else {
						return true;
					}
				}
			});

	var comboBoxTree = new Ext.ux.ComboBoxTree({
		width : 250,
		fieldLabel : ''+getResource('resourceParam1730')+'',
		triggerAction : 'all',
		emptyText : ''+getResource('resourceParam1729')+'!',
		style : 'margin-bottom: 5px;',
		tree : {
			xtype : 'treepanel',
			rootVisible : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : "../JSON/datacenter_DataCenterRemote.getCateTree"
					}),
			root : new Ext.tree.AsyncTreeNode({
						id : '0',
						text : ''+getResource('resourceParam573')+''
					})
		},

		// all:所有结点都可选中
		// exceptRoot：除根结点，其它结点都可选(默认)
		// folder:只有目录（非叶子和非根结点）可选
		// leaf：只有叶子结点可选
		selectNodeModel : 'all'
	});
	comboBoxTree.on('select', function(combo, record, index) {
				if (record.id == 4) {
					return;
				} else if (record.id == 1) {
					return;
				}
				dateCateAddFri.node = record.id;
			});
	var addform = new Ext.FormPanel({
		height : 300,
		border : false,
		style : 'padding :5px 5px 5px 5px',
		defaults : {
			anchor : '95%'
		},

		items : [categoryInstanceName, categoryType, description],
		buttons : [{
			text : '' + getResource('resourceParam7002') + '',//保存
			listeners : {
				'click' : function() {
					// window.parent.testin();
					// return;
					// alert(dateCateAddFri.type);
					if (addform.getForm().isValid()) {

						var vo = Seam.Component.newInstance("CategoryInstance");
						// var vo = Seam.Remoting
						// .createType("com.sysware.edm.datacategory.CategoryInstance");
						Ext.apply(vo, addform.getForm().getValues());
						vo.setCategoryID(categoryType.getValue());
						vo.setCategoryType(dateCateAddFri.type);
						var node = new Ext.tree.TreeNode({
									text : categoryInstanceName.getValue(),
									leaf : true
								});
						// var treeObject =
						// parent.parent.contentWindow.window.EDMDataCenterTree;
						// alert(treeObject);
						callSeam("datacenter_DataCenterRemote",
								"addCategoryInstance", [vo], function(result) {
									var obj = Ext.util.JSON.decode(result);
									if (true == obj.success) {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam623')+'',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.INFO
												});
										var iconpath = "../base/icons/edm/dataObject.png";
										if (dateCateAddFri.type == 4) {
											iconpath = "../base/icons/edm/repositoryObject.png";
										} else if ("" != dateCateAddFri.icon) {
											iconpath = "../base/icons/edm/userdefine/"
													+ dateCateAddFri.icon;
										}
										window.parent
												.addnode(
														obj.cateid,
														categoryInstanceName
																.getValue(),
														obj.datacenterid,
														categoryType.getValue(),
														iconpath);
										myGrid.loadvalue(
												dataCateList.grid.store,
												dataCateList.args,
												dataCateList.baseargs);
										addform.getForm().reset();
										window.parent.reload(function() {
												});
										win.close();
									} else {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam594')+'!',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.ERROR
												});
									}
								});

					}
				}
			}
		}, {
			text : ''+getResource('resourceParam606')+'',
			listeners : {
				'click' : function() {
					addform.getForm().reset();
				}
			}
		}]
	});

	var win = new Ext.Window({
				title : ''+getResource('resourceParam1255')+'',
				layout : 'fit',
				items : [addform],
				width : 400,
				height : 230,
				modal : true

			});
	win.show();

}
