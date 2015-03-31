
/**
 * 添加任务类型
 */

var taskCateAdd = {
	addDialog : null,
	taskCateform : null,
	taskCates : null,
	form : null,
	projectVaue : null
};
// 新建工程可选类型combo
taskCateAdd.getComb = function() {
	
	var proStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/project_ProjectRemote.getTypes'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'projectcategoryid'
								}, {
									name : 'projectcategoryname'
								}])
			});
	proStore.load({
				params : {
					abc : 0
				}
			});
	proStore.on('load', function() {
				if (taskCateAdd.projectVaue != null) {
					projectCombo.setValue(taskCateAdd.projectVaue);
				}
			})
	var projectCombo = new Ext.ux.form.LovCombo({
				id : 'projectcategoryids',
				// renderTo : 'taskcate3',
				fieldLabel : '' + getResource('resourceParam7068') + '', // 所属项目类型
				width : 175,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				store : proStore,
				triggerAction : 'all',
				valueField : 'projectcategoryid',
				displayField : 'projectcategoryname',
				mode : 'local',
				beforeBlur : Ext.emptyFn
			});
	var pro_record = Ext.data.Record.create([{
				name : 'projectcategoryname'
			}, {
				name : 'projectcategoryid'
			}]);
	var pro_selectAll = new pro_record({
				projectcategoryname : getResource('resourceParam5029'),
				projectcategoryid : '-1'
			});
	var pro_deSelectAll = new pro_record({
				projectcategoryname : '' + getResource('resourceParam808') + '',
				projectcategoryid : '-2'
			});
	projectCombo.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('projectcategoryid') == -1
						|| firstRecord.get('projectcategoryid') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, pro_deSelectAll);
				} else {
					store.insert(0, pro_selectAll);
				}
			});
	projectCombo.on('select', function(combo, record, index) {
				if (record.get('projectcategoryid') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('projectcategoryid') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, pro_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, pro_selectAll);
					}
				}
			});
	projectCombo.on('blur', function() {
				// return;
				var temp = projectCombo.getValue();
				var str = '';
				var params = "";
				if (temp.length != 0) {
					params = temp + ",";
				} else {
					// projectCombo.setRawValue(""
					// + getResource('resourceParam2002') + "");
				}
			});
	return projectCombo;
}
/**
 * 生成添加任务类型表单面板
 */
taskCateAdd.gettaskCateform = function() {
	taskCateAdd.form = new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
				// taskCateAdd.type,
				{
			fieldLabel : '' + getResource('resourceParam1804') + '', // 文本框
			id : 'taskcategoryname',
			// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
			regexText : '' + getResource('resourceParam679') + '',
			maxLength : 20,
			maxLengthText : ''+ getResource('resourceParam1000') + '',
			minLength : 1,
			minLengthText : '' + getResource('resourceParam1043') + ''
					+ getResource('resourceParam1002') + '',
			width : 175,
			blankText : '' + getResource('resourceParam1803') + '',
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
					Ext.getCmp('taskcategoryname').setValue(curStr);
				}
			}
			
			
		}, taskCateAdd.getComb(), new Ext.form.TextArea({
					fieldLabel : '' + getResource('resourceParam1805') + '',
					id : 'taskcategorynotes',
					maxLength : 200,
					maxLengthText : ''+getResource('resourceParam1805') + getResource('resourceParam9787')
							+  '',
					width : 175,
					height : 60

				})],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (taskCateAdd.taskCateform.form.isValid()) {
					var taskCateVo = Seam.Remoting
							.createType("com.luck.itumserv.maintenance.taskCateGory.TaskCategoryVo");
					// Ext.apply(taskCateVo, taskCateAdd.taskCateform.getForm()
					// .getValues());
					taskCateVo.setTaskcategoryname(Ext
							.getCmp('taskcategoryname').getValue());
					taskCateVo.setTaskcategorynotes(Ext
							.getCmp('taskcategorynotes').getValue());
					taskCateVo.setProjectcategoryids(Ext
							.getCmp('projectcategoryids').getValue());
					callSeam("maintenance_TaskCategory_TaskCategoryService",
							"taskCateAdd", [taskCateVo], taskCateAdd.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam3001') + '',
			handler : function() {
				// taskCateAdd.taskCateform.form.reset(); //表单重置
				taskCateAdd.addDialog.hide();
			}
		}]
	});

	return taskCateAdd.form;
}

/**
 * 返回查询到的机构列表，创建添加任务类型对话框
 */
taskCateAdd.init = function() {

	if (!taskCateAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'taskCateadd'); // 动态生成需要绑定的div
		taskCateAdd.addDialog = new Ext.Window({ // 创建对话框
			el : 'taskCateadd',
			title : '' + getResource('resourceParam1806') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 210,
			closeAction : 'hide',
			plain : false,
			items : [taskCateAdd.addtaskCateform()]
				// 将面板绑定到对话框
		});
	}
	taskCateAdd.addDialog.show(); // 显示对话框
	taskCateAdd.addDialog.on("hide", function() {
				taskCateAdd.addDialog.close();
				taskCateAdd.addDialog.destroy();
				taskCateAdd.addDialog = null;

			});
}

/**
 * 生成添加任务类型的Form面板
 */
taskCateAdd.addtaskCateform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	// Ext.form.Field.prototype.msgTarget = 'qtip';
	taskCateAdd.taskCateform = taskCateAdd.gettaskCateform();
	return taskCateAdd.taskCateform;
};
/**
 * 根据返回结果进行操作
 */
taskCateAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""// 提示
						+ getResource('resourceParam631') + "");
		taskCateAdd.addDialog.hide();
		taskCateMain.baseargs = null;
		myGrid.loadvalue(taskCateMain.taskCategrid.store, taskCateMain.args,
				taskCateMain.baseargs);
	} else {
//		taskCateAdd.taskCateform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				}).getDialog().setWidth(260);
	}
	
};
