var view = {};

view.productTypeForm = function() {
	var form = new Ext.FormPanel({
		title : '添加成品类型',
		id : 'propertiesForm',
		//frame : true,
		height : '300',
		labelSeparator : ' : ',
		labelAlign : 'right',
		labelWidth : 100,
		bodyStyle : 'padding: 5 5 5 5',
		buttonAlign : 'center',
		items : [
	         new Ext.form.TextField({
				id : 'type',
				name : 'type',
				fieldLabel : '型号',
				allowBlank : false,
				blankText : '请填写型号',
				msgTarget : 'qtip',
				width : 200
			}),new Ext.form.TextField({
				id : 'name',
				name : 'name',
				fieldLabel : '名称',
				allowBlank : false,
				blankText : '请填写名称',
				msgTarget : 'qtip',
				width : 200
			}),new Ext.form.TextArea({
				id : 'remark',
				name : 'remark',
				preventScrollbars : true,
				fieldLabel : '备注',
				allowBlank : true,
				blankText : '请填写备注',
				msgTarget : 'qtip',
				width : 200
			})],
		buttons : [{
			xtype : 'button',
			id : 'saveButton',
			text : '保存',
			handler : function(){
				if(form.form.isValid()) {
					form.form.submit({
						url : '../JSON/endProductRemote.saveProperties?a=' + new Date(),
						method : 'post',
						success : function(form, action) {
						    var name = form.findField('name').getValue();
						    var resText = action.response.responseText;
						    var index = resText.lastIndexOf(':');
						    var id = resText.substring(index+1, resText.length-1);
						    productTree.addNode(productTree.parentId, id, name, false);
							XX.common.msg('提示', '保存数据成功！');
							form.reset();
						}
					})
				}
			}
		}]	
	});
	return form;
};

view.productForm = function() {
	var parentId = productTree.parentId;
	if (parentId.indexOf('f') >= 0) {
		parentId = parentId.substring(parentId.indexOf('f')+1,id.length);
	}
	var form = new Ext.FormPanel({
		title : '添加成品',
		id : 'registerForm',
		//frame : true,
		height : 400,
		labelSeparator : ' : ',
		labelAlign : 'right',
		bodyStyle : 'padding: 5 5 5 5',
		items : [{
					buttonAlign : 'center',
					layout : 'column',
					border : false,
					items : [{
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textfield',
									id : 'typeNum',
									fieldLabel : '型号',
									//allowBlank : false,
									blankText : '请填写型号',
									msgTarget : 'qtip',
									width : 200
								}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textfield',
									id : 'productName',
									fieldLabel : '名称',
									allowBlank : false,
									blankText : '请填写名称',
									msgTarget : 'qtip',
									width : 200
								}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textfield',
									id : 'drawNo',
									fieldLabel : '装备图号',
									//allowBlank : false,
									blankText : '请填写名称',
									msgTarget : 'qtip',
									width : 200
								}]
							}, {
								columnWidth : .3,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'numberfield',
									id : 'count1',
									fieldLabel : '数量',
									//allowBlank : false,
									blankText : '请填写数量',
									nanText : '请填写有效数字',
									msgTarget : 'qtip'
								}]
							}, {
								columnWidth : .7,
								layout : 'form',
								border : false,
								items : {
									xtype : 'radio',
									id : 'isEndProdSuit',
									name : 'isEndProdSuit',
									fieldLabel : '套',
									boxLabel : '套',
									hideLabel : true
								}
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'numberfield',
									id : 'leftCount',
									fieldLabel : '左件数量',
									//allowBlank : false,
									blankText : '请填写左件数量',
									nanText : '请填写有效数字',
									msgTarget : 'qtip',
									width : 200}]
							}, {
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'numberfield',
									id : 'rightCount',
									fieldLabel : '右件数量',
									//allowBlank : false,
									blankText : '请填写右件数量',
									nanText : '请填写有效数字',
									msgTarget : 'qtip',
									width : 200
								}]
							}, {
								columnWidth : .3,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'numberfield',
									id : 'allCount',
									fieldLabel : '数量',
									//allowBlank : false,
									blankText : '请填写数量',
									nanText : '请填写有效数字',
									msgTarget : 'qtip'
								}]
							}, {
								columnWidth : .7,
								layout : 'form',
								border : false,
								items : {
									xtype : 'radio',
									id : 'isAllSuit',
									name : 'isAllSuit',
									fieldLabel : '套',
									boxLabel : '套',
									hideLabel : true
								}
							},{
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textarea',
									id : 'productRemark',
									preventScrollbars : true,
									fieldLabel : '备注',
									//allowBlank : true,
									blankText : '请填写备注',
									msgTarget : 'qtip',
									width : 200
								}]
							},{
								columnWidth : 1,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textfield',
									name : 'parentId',
									hidden : true,
									value : parentId
								}]
							}
					],
					buttons : [{
						xtype : 'button',
						id : 'saveButton',
						text : '保存',
						handler : function(){
							if(form.form.isValid()) {
								form.form.submit({
									url : '../JSON/endProductRemote.saveRegister?a=' + new Date(),
									method : 'post',
									success : function(form, action) {
										var name = form.findField('productName').getValue();
									    var resText = action.response.responseText;
									    var index = resText.lastIndexOf(':');
									    var id = resText.substring(index+1, resText.length-1);
									    productTree.addNode(productTree.parentId, id, name, true);
										XX.common.msg('提示', '保存数据成功！');
										form.reset();
									}
								})
							}
						}
					}]
				}
		]
	});
	return form;
};

view.formLoad = function() {
	var url = '';
	var form = null;
	var parentId = productTree.parentId;
	if (parentId.indexOf('f') >= 0) {
		parentId = parentId.substring(parentId.indexOf('f')+1,id.length);
		url = '../JSON/endProductRemote.getProductType?id='+parentId + '&a=' + new Date();
		form = view.productTypeForm();
	} else {
		url = '../JSON/endProductRemote.getProduct?id='+parentId + '&a=' + new Date();
		form = view.productForm();
	}		
	form.setTitle('');
	var b = Ext.getCmp('saveButton');
	b.setVisible(false);
	form.load({
		url : url,
		method : 'post',
		success : function(form, anction){} 
	});
	return form;
}

view.tabPanel = function() {
	var form = view.formLoad();
	//alert(form.findField().getValue());
	var tablePanel = new Ext.TabPanel({
		title : '',
		id : 'tab1',
		activeTab : 0,
		width : '100%',
		height : 700,
		items : [{
			title : '属性',
			items : [form]
		}]
	});
	return tablePanel;
}
/** **********************************标签页********************************************** */
//product.tab = function() {
//	return {
//		tabProperties : new Ext.Panel({
//					title : '属性',
//					id : 'tab1',
//					resizeTabs : true,
//					tabWidth : 300,
//					tabMargin : 300,
//					layout : 'fit',
//					tbar : [toolbar.save],
//					items : product.form.properties,
//					listeners : {
//						'activate' : {
//							fn : function() {
//								isProperties = true;
//								isRegister = false;
//							}
//						}
//					}
//				}),
//		tabRegister : new Ext.Panel({
//					title : '成品登记',
//					id : 'tab2',
//					resizeTabs : true,
//					tabWidth : 300,
//					tabMargin : 300,
//					layout : 'fit',
//					tbar : [toolbar.save],
//					items : product.form.register,
//					listeners : {
//						'activate' : {
//							fn : function() {
//								isProperties = false;
//								isRegister = true;
//							}
//						}
//					}
//				}
//
//		),
//		tabList : new Ext.Panel({
//					title : '列表',
//					id : 'tab3',
//					resizeTabs : true,
//					tabWidth : 300,
//					tabMargin : 300,
//					layout : 'fit',
//					tbar : {
//						text : '编辑'
//					}
//				})
//	}
//}();

/** ********************工具栏************************************ */
//product.view = function() {
//
//	return {
//		// 工具栏
//		newBar : {
//			id : 'newBar',
//			text : ' 新增 ',
//			xtype : 'tbbutton',
//			handler : function() {
//				XX.common.msg(this.text, this.id + '--' + this.text);
//			}
//		},
//		editBar : {
//			id : 'editBar',
//			text : ' 编辑 ',
//			xtype : 'tbbutton',
//			handler : function() {
//				XX.common.msg(this.text, this.id + '--' + this.text);
//			}
//		},
//		searchBar : {
//			id : 'searchBar',
//			text : ' 查询 ',
//			xtype : 'tbbutton',
//			handler : function() {
//				XX.common.msg(this.text, this.id + '--' + this.text);
//			}
//		},
//
//		// Tab
//		tabPanel : new Ext.TabPanel({
//					activeTab : 0,
//					plain : true,
//					border : true,
//					tabPosition : 'top',
//					id : 'centerpanel',
//					deferredRender : true,
//					animScroll : true,
//					enableTabScroll : true,
//					region : 'center',
//					items : [product.tab.tabProperties,
//							product.tab.tabRegister, product.tab.tabList]
//				})
//
//	};
//}();