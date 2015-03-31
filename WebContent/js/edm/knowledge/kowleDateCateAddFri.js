var dateCateAddFri = {
	node : ''
}
dateCateAddFri.init = function() {

	var categoryInstanceName = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam480')+'',  //名称
				name : 'categoryInstanceName',
				allowBlank : false,
				blankText : ''+getResource('resourceParam1728')+'', //请输入名称！
				style : 'margin-bottom:5px',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
				regexText : ''+getResource('resourceParam1092')+'',
				validator : function() {
					var str = Ext.util.Format.trim(categoryInstanceName.getValue());
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
	var categoryTypeTxt = new Ext.form.TextField({
			fieldLabel : getResource('resourceParam481')+'',
			name : 'categoryTypeTxt',
			// style : 'margin-bottom:5px',
			editable : false,
			allowBlank : false,
			disabled: true,
			value : '知识库'
		});

	var categoryType = new Ext.form.TextField({
			name : 'categoryType',
			allowBlank : false,
			hidden : true,
			value : '20110120164701000500981456682cf04c8c97e4',
			style : 'margin-bottom:5px'
		});
	var parentId = new Ext.form.TextField({
		name : 'parentInstanceID',
		allowBlank : false,
		hidden : true,
		value : '1',
		style : 'margin-bottom:5px'
	});
	
	var userid = new Ext.form.TextField({
			fieldLabel : getResource('resourceParam1058')+'',  //编制人
			allowBlank : false,
			style : 'margin-bottom:5px'
		});
	var createdate = new Ext.form.TextField({
			fieldLabel : getResource('resourceParam981')+'',  //创建时间
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

		items : [categoryInstanceName, categoryTypeTxt, description, categoryType, parentId],
		buttons : [{
			text : '' + getResource('resourceParam7002') + '',//保存
			listeners : {
				'click' : function() {
					if (addform.getForm().isValid()) {
						var vo = Seam.Component.newInstance("CategoryInstance");
						Ext.apply(vo, addform.getForm().getValues());
						vo.setCategoryID(categoryType.getValue());
						vo.setCategoryType(1);
//						var node = new Ext.tree.TreeNode({
//									text : categoryInstanceName.getValue(),
//									leaf : true
//								});
						callSeam("datacenter_DataCenterRemote",
								"addCategoryKnowledgeInstance", [vo], function(result) {
									var obj = Ext.util.JSON.decode(result);
									if (true == obj.success) {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam623')+'', //添加成功
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
//										window.parent.addnode(
//														obj.cateid,
//														categoryInstanceName.getValue(),
//														obj.datacenterid,
//														categoryType.getValue(),
//														iconpath);
										myGrid.loadvalue(
												dataCateList.grid.store,
												dataCateList.args,
												dataCateList.baseargs);
										addform.getForm().reset();
//										window.parent.reload(function() {
//												});
										win.close();
									} else {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam594')+'',  //添加失败
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
				title : ''+getResource('resourceParam9164')+'',
				layout : 'fit',
				items : [addform],
				width : 400,
				height : 230,
				modal : true

			});
	win.show();

}
