var dataClassificationAttribute = {
	toolbar : null
}
dataClassificationAttribute.init = function() {
	dataClassificationAttribute.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/dataClassification_DataClassificationRemote.getDataTypeTree'
	})
	dataClassificationAttribute.dateTypeTree = new Ext.tree.TreePanel({
		tbar : ['   ', {
			text : '' + getResource('resourceParam7002') + '',// 保存
			id : 'saveDataType',
			iconCls : 'priv-add',
			// tooltip : {
			// title : '新增分类',
			// text : '添加一个新的分类'
			// },
			listeners : {
				'click' : function() {
					var ids = '', selNodes = dataClassificationAttribute.dateTypeTree
							.getChecked();
					Ext.each(selNodes, function(node) {

								if (node.getDepth() == 2) {
									if (ids.length > 0) {
										ids += ',';
									}
									ids += node.id;
								}
							});
					if ("" == ids) {

						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam1741')
										+ '!');
						return;
					}

					Ext.Ajax.request({
						url : '../JSON/dataClassification_DataClassificationRemote.saveCategoryDataType',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', '保存成功');// 保存成功
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam1724')
													+ '',
											msg : ''
													+ getResource('resourceParam651')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})

							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							ids : ids,
							id : dataClassificationAttribute.categoryId
									.getValue()
						}
					});
				}
			}
		}],
		id : 'dateTypeTree',
		border : false,
		rootVisible : false,
		useArrows : true,
		autoScroll : true,
		autoShow : true,
		animate : true,
		enableDD : false,
		frame : false,
		disabled : true,
		root : {
			nodeType : 'async'
		},
		loader : dataClassificationAttribute.treeloader,

		listeners : {
//			'load' : function() {
//				dataClassificationAttribute.dateTypeTree.disable();
//			},
			'checkchange' : function(node, checked) {

				if (checked) {

					node.getUI().addClass('complete');
					if (node.getDepth() == 1) {
						node.eachChild(function(n) {
									n.getUI().checkbox.checked = true;
									n.attributes.checked = true;
								});

					}
				} else {

					node.getUI().removeClass('complete');
					if (node.getDepth() == 1) {
						node.eachChild(function(n) {
									n.getUI().checkbox.checked = false;
									n.attributes.checked = false;
								});

					}
				}
			}
		},
		buttons : []

	});
	dataClassificationAttribute.dateTypeTree.getRootNode().expand(false);
	dataClassificationAttribute.dateTypeTree.on("click", function(node) {
				// if ("root" == node.id) {
				// return;
				// }
				// var temp = {
				//
				// };
				// temp.name = node.id;
				// temp.text = node.text;
				// menu_click(temp);
			});
	dataClassificationAttribute.categoryName = new Ext.form.TextField({
				id : 'categoryName1',
				name : 'categoryName',
				fieldLabel : '标签' + getResource('resourceParam480') + '',
				style : 'margin-bottom: 5px;',
				readOnly : true
			});
	dataClassificationAttribute.categoryId = new Ext.form.TextField({
				id : 'categoryId1',
				name : 'categoryId',
				inputType : 'hidden',
				style : 'margin-bottom: 5px;',
				readOnly : true
			});
	dataClassificationAttribute.attributeForm = new Ext.FormPanel({
				id : 'attributeForm',
				bodyStyle : 'padding:5px 5px',
				border : false,
				frame : true,

				width : '100%',
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [dataClassificationAttribute.categoryName,
						dataClassificationAttribute.categoryId]
			});
	var attributePanel = new Ext.Panel({
				id : 'attributePanel',
				title : '' + getResource('resourceParam7029') + '',// 属性
				layout : 'border',
				border : false,

				items : [{
							region : 'north',
							layout : 'fit',
							height : 55,
							items : [dataClassificationAttribute.attributeForm],
							autoScroll : true
						}, {
							region : 'center',
							autoScroll : true,
							layout : 'fit',
							items : [dataClassificationAttribute.dateTypeTree]
						}]
			});
	dataClassificationAttribute.tabpanel = new Ext.TabPanel({
				activeItem : 0,
				items : [attributePanel],
				listeners : {
					"bodyresize" : function() {
						dataClassificationAttribute.attributeForm
								.setWidth(dataClassificationAttribute.tabpanel
										.getWidth()
										- 5);
						dataClassificationAttribute.dateTypeTree
								.setHeight(dataClassificationAttribute.tabpanel
										.getHeight()
										- 88);
					}
				}
			});
	// dataClassificationAttribute.dateTypeTree.setHeight(attributePanel
	// .getHeight()
	// - 88);
			
	return dataClassificationAttribute.tabpanel;
}
