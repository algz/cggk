/**
 * 修改部门类型名称
 */
var deptypeUpdate = {
	addDialog : null,
	deptypeform : null,
	deptypes : null
};
/**
 * 修改操作
 */
deptypeUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam965') + '' + getResource('resourceParam698') + '进行操作!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	if (!deptypeUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'deptypeupdate'); // 动态生成需要绑定的div
		deptypeUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'deptypeupdate',
			title : '' + getResource('resourceParam702') + '' + getResource('resourceParam1139') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 130,
			closeAction : 'hide',
			plain : false,
			items : [deptypeUpdate.adddeptypeform()]
				// 将面板绑定到对话框
		});
	}
	deptypeUpdate.addDialog.show(); // 显示对话框
	deptypeUpdate.addDialog.on("hide", function() {
				deptypeUpdate.addDialog.close();
				deptypeUpdate.addDialog.destroy();
				deptypeUpdate.addDialog = null;
			});
};
/**
 * 生成修改里程碑表单面板
 */
deptypeUpdate.getdeptypeform = function() {
	return new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
					inputType : 'hidden',
					name : 'deptypeid',
					width : 175,
					value : myGrid.row.get('deptypeid')
				}, {
					fieldLabel : '' + getResource('resourceParam882') + '' + getResource('resourceParam1139') + '', // 文本框
					name : 'typename',
					width : 175,
					invalidText : '请' + getResource('resourceParam494') + '' + getResource('resourceParam882') + '' + getResource('resourceParam1139') + '',
					maxLength : 20,
					maxLengthText : '' + getResource('resourceParam698') + '' + getResource('resourceParam1000') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam698') + '' + getResource('resourceParam1002') + '',
					value : myGrid.row.get('typename'),
					allowBlank : false
				}, {
					fieldLabel : '' + getResource('resourceParam700') + '', // 文本框
					name : 'instlevel',
//					regex : /^[0-9]*[1-9][0-9]*$/,///^\d*$/,
//					regexText : '' + getResource('resourceParam9171') + '',// 输入校验有哪些？
					/**
					 * bug编号1018 wangyf
					 * bug信息：添加和修改机构时“机构级别”编辑条的判断条件不一致
					 * 2011-06-07 10：08
					 */
					regex : /^([1-9]|[1-9][0-9])?$/,
					regexText : '' + getResource('resourceParam9184') + '',//只能输入1-99之间的数字
					maxLength : 20,
					maxLengthText : '' + getResource('resourceParam700') + '长度不能超过20',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam700') + '不能小于1',
					width : 175,
					invalidText : '请' + getResource('resourceParam494') + '' + getResource('resourceParam700') + '',
					value : myGrid.row.get('instlevel'),
					allowBlank : false
				}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (deptypeUpdate.deptypeform.form.isValid()) {
					var deptypeVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.deptype.DeptypeVo");
					Ext.apply(deptypeVo, deptypeUpdate.deptypeform.getForm().getValues());
					callSeam("maintenance_deptype_deptypeService","deptypeUpdate", [deptypeVo], deptypeUpdate.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam3001') + '',
			handler : function() {
				// deptypeUpdate.deptypeform.form.reset(); //表单重置
				deptypeUpdate.addDialog.hide();

			}
		}]
	});
}

/**
 * 生成修改里程碑的Form面板
 */
deptypeUpdate.adddeptypeform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';
	deptypeUpdate.deptypeform = deptypeUpdate.getdeptypeform();
	return deptypeUpdate.deptypeform;
};
/**
 * 根据返回结果进行操作
 */
deptypeUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		deptypeUpdate.addDialog.hide();
		Ext.example.msg("" + getResource('resourceParam575') + "", "" + getResource('resourceParam631') + "");
	} else {
		deptypeUpdate.deptypeform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	
	deptypeMain.baseargs = null;
	// myGrid.row=null;
	deptypeMain.mygrid.getStore().reload({
				callback : function() {
					myGrid.row = deptypeMain.mygrid.getSelectionModel().getSelected();
				}
			});
	// myGrid.loadvalue(deptypeMain.deptypegrid.store,deptypeMain.args,deptypeMain.baseargs);
};
