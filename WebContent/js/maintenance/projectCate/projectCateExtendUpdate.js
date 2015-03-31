2
/**
 * 添加扩展属性类型
 */

var cateGoryExtendUpdate = {
	addDialog : null,
	cateGoryform : null,
	cateGorys : null
};

/**
 * 生成添加项目类型表单面板
 */
cateGoryExtendUpdate.getcateGoryform = function() {
	return new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素

		{
					fieldLabel : ''+getResource('resourceParam1784')+'', // 文本框
					name : 'name',
					maxLength : 20,
					maxLengthText : ''+getResource('resourceParam1037')+''+getResource('resourceParam1000')+'',
					minLength : 1,
					minLengthText : ''+getResource('resourceParam1037')+''+getResource('resourceParam1002')+'',
					width : 175,
					blankText : ''+getResource('resourceParam1786')+'',
					value : cateGoryExtend.grid.getSelectionModel().getSelected().get('name'),
//					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regexText : ''+getResource('resourceParam679')+'',
					allowBlank : false
				}, new Ext.form.ComboBox({
					id : 'categoryComboBox',
					store : new Ext.data.Store({
						autoLoad : true,
						proxy : new Ext.data.HttpProxy({
							method : 'post',
							url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.getAttributeTypes'
						}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'root'
								}, [{
											name : 'datatypeid'
										}, {
											name : 'datatypename'
										}]),
						listeners : {
							load : function(store, records) {
								store.removeAll();
								store.add(records);
								Ext.getCmp('categoryComboBox')
										.setValue(myGrid.row.get('categoryid'));
//								Ext.getCmp('confirmbutton').enable();
							}
						}
					}),
					fieldLabel : ''+getResource('resourceParam481')+'',
					value : cateGoryExtend.grid.getSelectionModel().getSelected().get('category'),
					hiddenName : 'category',
					valueField : "datatypeid",
					displayField : "datatypename",
					mode : 'remote',
					allowBlank : false,
					disabled : false,
					forceSelection : true,
					editable : false,
					triggerAction : 'all',
					style : 'margin-bottom: 5px;',
					width : 175
				}), new Ext.form.ComboBox({
							fieldLabel : ''+getResource('resourceParam7071')+'',
							hiddenName : 'compulsory',
							store : new Ext.data.SimpleStore({
										fields : ['value', 'state'],
										data : [[false, ''+getResource('resourceParam510')+''], [true, ''+getResource('resourceParam512')+'']]
									}),
							value : cateGoryExtend.grid.getSelectionModel().getSelected().get('compulsory'),
							valueField : 'value',
							displayField : 'state',
							typeAhead : false,
							mode : 'local',
							triggerAction : 'all',
							selectOnFocus : true,
							allowBlank : true,
							forceSelection : true,
							editable : false,
							width : 175
						})],
		buttons : [ // 定义面板中的按钮
		{
			id : 'confirmbutton',
//			disabled : true,
			text : ''+getResource('resourceParam505')+'',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (cateGoryExtendUpdate.cateGoryform.form.isValid()) {
					var vo = cateGoryExtendUpdate.cateGoryform.getForm()
							.getValues();
					Ext.Ajax.request({
						url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.updateAttribute',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								// Ext.MessageBox.show({
								// title : '修改成功',
								// msg : '您的信息已修改成功!',
								// buttons : Ext.MessageBox.OK,
								// icon : Ext.MessageBox.INFO
								// });
								cateGoryExtendUpdate.addDialog.hide();
								myGrid.loadvalue(cateGoryExtend.grid.store,
										cateGoryMain.args,
										cateGoryMain.baseargs);
								cateGoryExtend.grid.store.on('load', function(
										store, records) {
									cateGoryExtend.grid.getSelectionModel()
											.selectRow(cateGoryMain.rowIndex);
									myGrid.row = cateGoryExtend.grid.store.data.items[cateGoryMain.rowIndex];
								});

							} else {
								Ext.MessageBox.show({
											title : ''+getResource('resourceParam572')+'',
											msg : obj.success,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							name : vo.name,
							category : vo.category,
							compulsory : vo.compulsory,
							dataObjectId : cateGoryMain.dataObjectId
						}
					});
				}

			}
		}, {
			text : ''+getResource('resourceParam7007')+'',
			handler : function() {
				cateGoryExtendUpdate.addDialog.hide();
			}
		}]
	});
}

/**
 * 返回查询到的机构列表，创建添加项目类型对话框
 */
cateGoryExtendUpdate.init = function() {

	if (!cateGoryExtendUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'cateGoryExtendUpdate'); // 动态生成需要绑定的div
		cateGoryExtendUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'cateGoryExtendUpdate',
			title : ''+getResource('resourceParam1787')+'',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [cateGoryExtendUpdate.addcateGoryform()]
				// 将面板绑定到对话框
		});
	}
	cateGoryExtendUpdate.addDialog.show(); // 显示对话框
	cateGoryExtendUpdate.addDialog.on("hide", function() {
				cateGoryExtendUpdate.addDialog.close();
				cateGoryExtendUpdate.addDialog.destroy();
				cateGoryExtendUpdate.addDialog = null;

			});
}

/**
 * 生成添加项目类型的Form面板
 */
cateGoryExtendUpdate.addcateGoryform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'qtip';

	cateGoryExtendUpdate.cateGoryform = cateGoryExtendUpdate.getcateGoryform();
	return cateGoryExtendUpdate.cateGoryform;
};
