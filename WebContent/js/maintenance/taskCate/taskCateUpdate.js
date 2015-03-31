
/**
 * 修改任务类型
 */

var taskCateUpdate = {
	addDialog : null,
	taskCateform : null,
	taskCates : null,
	form : null
};

/**
 * 修改操作
 */
taskCateUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam1817') + '!',
					width : 270,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	taskCateUpdate.taskCatesDate();
};
taskCateUpdate.getComb = function() {
	var proStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/project_ProjectRemote.getTypesById'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'projectcategoryid'
								}, {
									name : 'projectcategoryname'
								}, {
									name : 'sign'
								}])
			});
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
	proStore.load({
				params : {
					taskcategoryid : taskCateMain.taskCategrid.getSelectionModel()
							.getSelections()[0].get('taskcategoryid')
				}
			});
	proStore.on('load', function() {
				var ss = new Array();
				proStore.each(function(rec) {
							if (rec.get('sign') == 1) {
								ss.push(rec.get('projectcategoryid'));
							}
						});
				projectCombo.setValue(ss);
			})
	var pro_record = Ext.data.Record.create([{
				name : 'projectcategoryname'
			}, {
				name : 'projectcategoryid'
			}, {
				name : 'sign'
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
 * 生成修改任务类型表单面板
 */
taskCateUpdate.gettaskCateform = function() {
	taskCateUpdate.form = new Ext.FormPanel({
		labelWidth : 90, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
					inputType : 'hidden',
					id : 'taskcategoryid',
					width : 175,
					value :  taskCateMain.taskCategrid.getSelectionModel()
							.getSelections()[0].get('taskcategoryid')
				}, {
					fieldLabel : '' + getResource('resourceParam1804') + '', // 文本框
					id : 'taskcategorynameId',
					width : 175,
					blankText : '' + getResource('resourceParam1803') + '',
					maxLength : 20,
					maxLengthText : ''+ getResource('resourceParam1000') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam1043') + ''
							+ getResource('resourceParam1002') + '',
					// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
					regexText : '' + getResource('resourceParam679') + '',
					value :  taskCateMain.taskCategrid.getSelectionModel()
							.getSelections()[0].get('taskcategoryname'),
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
							Ext.getCmp('taskcategorynameId').setValue(curStr);
						}
					}
					
					
					
					
					
				}, taskCateUpdate.getComb(), new Ext.form.TextArea({
							fieldLabel : '' + getResource('resourceParam1805')
									+ '',
							id : 'taskcategorynotes',
							width : 175,
							height : 60,
							maxLength : 200,
							// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
							// regexText : '只能输入中文,字母,数字',
							maxLengthText : ''+getResource('resourceParam1805')
									+ getResource('resourceParam9787')
									 + '',
							value :  taskCateMain.taskCategrid.getSelectionModel()
							.getSelections()[0].get('taskcategorynotes')

						})],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (taskCateUpdate.taskCateform.form.isValid()) {
					var taskCateVo = Seam.Remoting
							.createType("com.luck.itumserv.maintenance.taskCateGory.TaskCategoryVo");
					// Ext.apply(taskCateVo,taskCateUpdate.taskCateform.getForm().getValues());
					taskCateVo.setTaskcategoryname(Ext
							.getCmp('taskcategorynameId').getValue());
					taskCateVo.setTaskcategoryid(Ext.getCmp('taskcategoryid')
							.getValue());
					taskCateVo.setTaskcategorynotes(Ext
							.getCmp('taskcategorynotes').getValue());
					taskCateVo.setProjectcategoryids(Ext
							.getCmp('projectcategoryids').getValue());
					callSeam("maintenance_TaskCategory_TaskCategoryService",
							"taskCateUpdate", [taskCateVo], taskCateUpdate.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam3001') + '',
			handler : function() {
				// taskCateUpdate.taskCateform.form.reset(); //表单重置
				taskCateUpdate.addDialog.hide();

			}
		}]
	});
	return taskCateUpdate.form;
}

/**
 * 返回查询到的机构列表，创建修改任务类型对话框
 */
taskCateUpdate.taskCatesDate = function(response, opt) {

	if (!taskCateUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'taskCateupdate'); // 动态生成需要绑定的div
		taskCateUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'taskCateupdate',
			title : '' + getResource('resourceParam1815') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 210,
			closeAction : 'hide',
			plain : false,
			items : [taskCateUpdate.addtaskCateform()]
				// 将面板绑定到对话框
		});
	}
	taskCateUpdate.addDialog.show(); // 显示对话框
	taskCateUpdate.addDialog.on("hide", function() {
				taskCateUpdate.addDialog.close();
				taskCateUpdate.addDialog.destroy();
				taskCateUpdate.addDialog = null;

			});
}

/**
 * 生成修改任务类型的Form面板
 */
taskCateUpdate.addtaskCateform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';

	taskCateUpdate.taskCateform = taskCateUpdate.gettaskCateform();
	return taskCateUpdate.taskCateform;
};
/**
 * 根据返回结果进行操作
 */
taskCateUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""// 提示
						+ getResource('resourceParam631') + "");
		taskCateUpdate.addDialog.hide();
		taskCateMain.baseargs = null;
		taskCateMain.taskCategrid.getStore().reload({
					callback : function() {
						myGrid.row = taskCateMain.taskCategrid.getSelectionModel()
								.getSelected();
					}
				});
	} else {
//		taskCateUpdate.taskCateform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				}).getDialog().setWidth(260);
	}
	
	// myGrid.loadvalue(taskCateMain.taskCategrid.store, taskCateMain.args,
	// taskCateMain.baseargs);
};
