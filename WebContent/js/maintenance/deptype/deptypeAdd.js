/**
 * 添加机构类型
 */
var deptypeAdd = {
	addDialog : null,
	deptypeform : null,
	deptypes : null
};
/**
 * 生成添加部门类型表单面板
 */
deptypeAdd.getdeptypeform = function() {
	return new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
			fieldLabel : '' + getResource('resourceParam882') + '' + getResource('resourceParam1139') + '', // 文本框
			name : 'typename',
			maxLength : 20,
			maxLengthText : '' + getResource('resourceParam698') + '' + getResource('resourceParam1000') + '',
			minLength : 1,
			minLengthText : '' + getResource('resourceParam698') + '' + getResource('resourceParam1002') + '',
			width : 175,
			invalidText : '请' + getResource('resourceParam494') + '' + getResource('resourceParam882') + '' + getResource('resourceParam1139') + '',
			allowBlank : false
		}, {
			fieldLabel : '' + getResource('resourceParam700') + '', // 文本框
			name : 'instlevel',
			regex : /^([1-9]|[1-9][0-9])?$/,
			regexText : '' + getResource('resourceParam9184') + '',//只能输入1-99之间的数字
			minLength : 1,
			minLengthText : '' + getResource('resourceParam700') + '不能小于1',
			width : 175,
			invalidText : '请' + getResource('resourceParam494') + '' + getResource('resourceParam700') + '',
			allowBlank : false
		}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (deptypeAdd.deptypeform.form.isValid()) {
					var deptypeVo = Seam.Remoting .createType("com.luck.itumserv.maintenance.deptype.DeptypeVo");
					Ext.apply(deptypeVo, deptypeAdd.deptypeform.getForm() .getValues());
					callSeam("maintenance_deptype_deptypeService", "deptypeAdd", [deptypeVo], deptypeAdd.save);
				}
			}
		}, {
			text : '取消',
			handler : function() {
				// deptypeAdd.deptypeform.form.reset(); //表单重置
				deptypeAdd.addDialog.hide();
			}
		}]
	});
}
/**
 * 返回查询到的机构列表，创建添加里程碑对话框
 */
deptypeAdd.init = function() {
	if (!deptypeAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'deptypeadd'); // 动态生成需要绑定的div
		deptypeAdd.addDialog = new Ext.Window({ // 创建对话框
			el : 'deptypeadd',
			title : '' + getResource('resourceParam647') + '' + getResource('resourceParam698') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 135,
			closeAction : 'hide',
			plain : false,
			items : [deptypeAdd.adddeptypeform()]
				// 将面板绑定到对话框
		});
	}
	deptypeAdd.addDialog.show(); // 显示对话框
	deptypeAdd.addDialog.on("hide", function() {
				deptypeAdd.addDialog.close();
				deptypeAdd.addDialog.destroy();
				deptypeAdd.addDialog = null;

			});
}

/**
 * 生成添加里程碑的Form面板
 */
deptypeAdd.adddeptypeform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'qtip';
	deptypeAdd.deptypeform = deptypeAdd.getdeptypeform();
	return deptypeAdd.deptypeform;
};
/**
 * 根据返回结果进行操作
 */
deptypeAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		deptypeAdd.addDialog.hide();
		Ext.example.msg("" + getResource('resourceParam575') + "", "" + getResource('resourceParam631') + "");
	} else {
		/**
		 * bug编号248 bug已修改 bug信息：
		 * 1.在机构类型界面，添加或编辑机构类型名称重名时，系统提示重名，退出提示对话框；
		 * 2.添加和编辑机构类型对话框不应该退出，应该显示并可以让用户继续编辑或修改名称。
		 * @author wangyf
		 * 2011-04-21 21:10
		 */
//		deptypeAdd.deptypeform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	deptypeMain.baseargs = null;
	myGrid.loadvalue(deptypeMain.deptypegrid.store, deptypeMain.args, deptypeMain.baseargs);
};
