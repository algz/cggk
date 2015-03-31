2
/**
 * 添加扩展属性类型
 */

var taskCateExtendAdd = {
	addDialog : null,
	taskCateform : null,
	taskCates : null
};

/**
 * 生成添加项目类型表单面板
 */
taskCateExtendAdd.gettaskCateform = function() {
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
//					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regexText : ''+getResource('resourceParam679')+'',
					allowBlank : false
				}, new Ext.form.ComboBox({
					store : new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : '../JSON/maintenance_TaskCategory_TaskCategoryRemote.getAttributeTypes'
						}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'root'
								}, [{
											name : 'datatypeid'
										}, {
											name : 'datatypename'
										}])
					}),
					fieldLabel : ''+getResource('resourceParam481')+'',
					hiddenName : 'category',
					valueField : "datatypeid",
					displayField : "datatypename",
					mode : 'remote',
					allowBlank : false,
					disabled : false,
					forceSelection : true,
					editable : false,
					triggerAction : 'all',
					emptyText : ''+getResource('resourceParam1159')+'',
					// labelStyle : 'padding:5px 0px 5px 0px',
					style : 'margin-bottom: 5px;',
					width : 175
				}), new Ext.form.ComboBox({
							fieldLabel : ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'必填',
							hiddenName : 'compulsory',
							store : new Ext.data.SimpleStore({
										fields : ['value','state'],
										data : [[false,''+getResource('resourceParam510')+''], [true,''+getResource('resourceParam512')+'']]
									}),
							value : false,
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
			text : ''+getResource('resourceParam505')+'',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (taskCateExtendAdd.taskCateform.form.isValid()) {
					var vo = taskCateExtendAdd.taskCateform.getForm()
							.getValues();
					Ext.Ajax.request({
						url : '../JSON/maintenance_TaskCategory_TaskCategoryRemote.addAttribute',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
//								Ext.MessageBox.show({
//											title : '保存成功',
//											msg : '您的信息已保存成功!',
//											buttons : Ext.MessageBox.OK,
//											icon : Ext.MessageBox.INFO
//										});
								taskCateExtendAdd.addDialog.hide();
								myGrid.loadvalue(taskCateExtend.grid.store, taskCateMain.args, taskCateMain.baseargs);
							} else if (obj.success == false) {
								Ext.MessageBox.show({
											title : ''+getResource('resourceParam634')+'',
											msg : ''+getResource('resourceParam1785')+'!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							} else {
								Ext.MessageBox.show({
											title : ''+getResource('resourceParam634')+'',
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
							taskcategoryid : taskCateMain.baseargs.taskcategoryid
						}
					});
				}

			}
		}, {
			text : ''+getResource('resourceParam7007')+'',
			handler : function() {
				taskCateExtendAdd.addDialog.hide();
			}
		}]
	});
}

/**
 * 返回查询到的机构列表，创建添加项目类型对话框
 */
taskCateExtendAdd.init = function() {

	if (!taskCateExtendAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'taskCateExtendAdd'); // 动态生成需要绑定的div
		taskCateExtendAdd.addDialog = new Ext.Window({ // 创建对话框
			el : 'taskCateExtendAdd',
			title : ''+getResource('resourceParam1794')+'',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [taskCateExtendAdd.addtaskCateform()]
				// 将面板绑定到对话框
		});
	}
	taskCateExtendAdd.addDialog.show(); // 显示对话框
	taskCateExtendAdd.addDialog.on("hide", function() {
				taskCateExtendAdd.addDialog.close();
				taskCateExtendAdd.addDialog.destroy();
				taskCateExtendAdd.addDialog = null;

			});
}

/**
 * 生成添加项目类型的Form面板
 */
taskCateExtendAdd.addtaskCateform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'qtip';

	taskCateExtendAdd.taskCateform = taskCateExtendAdd.gettaskCateform();
	return taskCateExtendAdd.taskCateform;
};
