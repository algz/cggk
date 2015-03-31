
/**
 * 修改项目类型
 */

var cateGoryUpdate = {
	addDialog : null,
	cateGoryform : null,
	cateGorys : null
};

/**
 * 修改操作
 */
cateGoryUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam1788') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	cateGoryUpdate.cateGorysDate();
};

/**
 * 生成修改项目类型表单面板
 */
cateGoryUpdate.getcateGoryform = function() {
	return new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
					inputType : 'hidden',
					name : 'projectcategoryid',
					width : 175,
					value : cateGoryMain.cateGorygrid.getSelectionModel()
							.getSelections()[0].get('projectcategoryid')
				}, {
					fieldLabel : '' + getResource('resourceParam1789') + '', // 文本框
					name : 'projectcategoryname',
					id : 'projectcategorynameUp',
					width : 175,
					blankText : '' + getResource('resourceParam1786') + '',
					maxLength : 20,
					maxLengthText : '' + getResource('resourceParam1000') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam1037') + ''
							+ getResource('resourceParam1002') + '',
					value : cateGoryMain.cateGorygrid.getSelectionModel()
							.getSelections()[0].get('projectcategoryname'),
					// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
					regexText : '' + getResource('resourceParam679') + '',
					allowBlank : false,
					/**
					 * 取消全角输入时的空格bug
					 * @author wangyf
					 * 2011-04-20 17:00
					 */
					enableKeyEvents : true,
					listeners : {'blur' : function(cur, evt) {
							var curStr = cur.getValue();
							for(var i = 0; i < curStr.length; i++) {
								var str = curStr.charCodeAt(i);
								if(str == 12288) {
									if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
										curStr = curStr.replace('　', ' ');
									}
								} 
							}
							Ext.getCmp('projectcategorynameUp').setValue(curStr);
						}
					}
				}, new Ext.form.TextArea({
							fieldLabel : '' + getResource('resourceParam1790')
									+ '',
							name : 'projectcategorynotes',
							width : 175,
							height : 60,
							maxLength : 200,
							// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
							// regexText : '只能输入中文,字母,数字',
							maxLengthText : ''
									+ getResource('resourceParam1790')
									+ getResource('resourceParam9787') + '',
							value : cateGoryMain.cateGorygrid.getSelectionModel()
							.getSelections()[0].get('projectcategorynotes')

						})],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (cateGoryUpdate.cateGoryform.form.isValid()) {
					var cateGoryVo = Seam.Remoting
							.createType("com.luck.itumserv.maintenance.projectCateGory.ProjectCateGoryVo");
					Ext.apply(cateGoryVo, cateGoryUpdate.cateGoryform.getForm()
									.getValues());
					callSeam(
							"maintenance_ProjectCateGory_ProjectCateGoryService",
							"cateGoryUpdate", [cateGoryVo], cateGoryUpdate.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam3001') + '',
			handler : function() {
				// cateGoryUpdate.cateGoryform.form.reset(); //表单重置
				cateGoryUpdate.addDialog.hide();

			}
		}]
	});
}

/**
 * 返回查询到的机构列表，创建修改项目类型对话框
 */
cateGoryUpdate.cateGorysDate = function(response, opt) {

	if (!cateGoryUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'cateGoryupdate'); // 动态生成需要绑定的div
		cateGoryUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'cateGoryupdate',
			title : '111' + getResource('resourceParam1801') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [cateGoryUpdate.addcateGoryform()]
				// 将面板绑定到对话框
		});
	}
	cateGoryUpdate.addDialog.show(); // 显示对话框
	cateGoryUpdate.addDialog.on("hide", function() {
				cateGoryUpdate.addDialog.close();
				cateGoryUpdate.addDialog.destroy();
				cateGoryUpdate.addDialog = null;

			});
}

/**
 * 生成修改项目类型的Form面板
 */
cateGoryUpdate.addcateGoryform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';

	cateGoryUpdate.cateGoryform = cateGoryUpdate.getcateGoryform();
	return cateGoryUpdate.cateGoryform;
};
/**
 * 根据返回结果进行操作
 */
cateGoryUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""// 提示
						+ getResource('resourceParam631') + "");
		cateGoryUpdate.addDialog.hide();
		cateGoryMain.baseargs = null;
		cateGoryMain.cateGorygrid.getStore().reload({
			callback : function() {
				myGrid.row = cateGoryMain.cateGorygrid.getSelectionModel()
						.getSelected();
			}
		});
	} else {
//		cateGoryUpdate.cateGoryform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				}).getDialog().setWidth(260);
	}
	
	// myGrid.loadvalue(cateGoryMain.cateGorygrid.store, cateGoryMain.args,
	// cateGoryMain.baseargs);
};
