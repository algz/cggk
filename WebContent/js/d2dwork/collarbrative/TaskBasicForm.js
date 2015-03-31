var TaskBasicForm = {

};
TaskBasicForm.init = function() {

	dataCenterBase.combox(''+getResource('resourceParam689')+'', ''+getResource('resourceParam731')+'');
	dataCenterBase.departmentCombo.on('select', function(combo, record, index) {
		dataCenterBase.codeid = record.id;
		dataCenterBase.codename = record.text;
		dataCenterBase.userComb.clearValue();
		if (dataCenterBase.codeid != null) {
			if (dataCenterBase.codeid == -1) {
				dataCenterBase.codeid = -1;
				dataCenterBase.codename = null;
			}
			dataCenterBase.dbaseparams = {
				instcode : dataCenterBase.codeid
			};
			dataCenterBase.comboboxStore.proxy = new Ext.data.HttpProxy({
						url : "../JSON/base_user_UserSerivce.findDepartmentList?a="
								+ new Date()
								+ "&instcode="
								+ dataCenterBase.codeid
					});
			dataCenterBase.comboboxStore.load();

		}
	});
	dataCenterBase.departmentCombo.setWidth(250);
	dataCenterBase.departmentCombo.style='margin-bottom: 5px;';
	dataCenterBase.userComb.setWidth(250);
	dataCenterBase.userComb.allowBlank=false;
	dataCenterBase.userComb.style='margin-bottom: 5px;';

	TaskBasicForm.department = dataCenterBase.departmentCombo;
	TaskBasicForm.user = dataCenterBase.userComb;
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/task_TaskRemote.getTaskTypes'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'taskcategoryid'
								}, {
									name : 'taskcategoryname'
								}])
			});
	var projectId = '';
	if (leftNavigationTree.nodeId.substring(0, 1) == 'p') {
		projectId = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId).id
				.substring(1);
	} else {
		projectId = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId).attributes.projectId;
	}
	store.on('beforeload', function(store, options) {
					options.params = Ext.apply(options.params, {
								projectId :projectId
							});
			});
	TaskBasicForm.type = new Ext.form.ComboBox({
		store : store,
		fieldLabel : ''+getResource('resourceParam481')+'',
		hiddenName : 'category',
		valueField : "taskcategoryid",
		displayField : "taskcategoryname",
		mode : 'remote',
		allowBlank : false,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : ''+getResource('resourceParam1159')+'',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				collarbMain.taskcategoryid = record.get('taskcategoryid');
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});

	TaskBasicForm.status = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : "../JSON/project_ProjectRemote.getTaskStatus"
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'taskstatusid'
									}, {
										name : 'taskstatusname'
									}])
				}),
		valueField : "taskstatusid",
		displayField : "taskstatusname",
		mode : 'remote',
		forceSelection : true,
		disabled : false,
		hiddenName : 'taskstatusid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : ''+getResource('resourceParam739')+'',
		// anchor : '95%',
		style : 'margin-bottom: 5px;',
		width : 250,
		allowBlank : true,
		value : ''+getResource('resourceParam947')+'',// 默认设置为编制中
		disabled : true
	});

	TaskBasicForm.form = new Ext.form.FormPanel({
		hideMode : 'visibility',
		bodyStyle : 'padding:10px 0px 10px 10px',
		autoScroll : true,
		split : true,
		border : false,
		width : 400,
		height : 200,
		items : [{
					xtype : 'textfield',
					fieldLabel : ''+getResource('resourceParam998')+'',
					name : 'name',
					id : 'quanjiao',
					allowBlank : false,
					style : 'margin-bottom: 5px;',
					maxLength : 20,
					maxLengthText : ''+getResource('resourceParam1000')+'',
					minLength : 1,
					minLengthText : ''+getResource('resourceParam1002')+'',
					blankText : ''+getResource('resourceParam1199')+'',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regexText : ''+getResource('resourceParam679')+'',
					width : 250,
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
							Ext.getCmp('quanjiao').setValue(curStr);
						}
					}
				}, TaskBasicForm.type, TaskBasicForm.department,
				TaskBasicForm.user, TaskBasicForm.status, {
					id:'sunstart',
					xtype : 'datefield',
					format : 'Y年m月d日',// 设置日期格式 月/日/年
					fieldLabel : ''+getResource('resourceParam991')+'',
					editable : false,// 设置未不可编辑
					name : 'start',
					minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
					minText : 'Can\'t have a start date before today!',
					disabledDays : [0, 6],// 去掉周六、周日
					disabledDaysText : 'Start date is not available on the weekends',
					allowBlank : false,
					labelStyle : 'padding:5px 0px 5px 0px',
					style : 'margin-bottom: 5px;',
					width : 250,
					listeners : {
						change : function(field, newValue, oldValue) {
//							Ext.getCmp('sunend').minValue = Ext.getCmp('sunstart')
//									.getValue();
							var plannedStart = Ext.getCmp('sunstart').getValue();
							var plannedEnd = Ext.getCmp('sunend').getValue();
							if (plannedStart > plannedEnd) {
								collarbForm.end.setValue('');
							}
						}
					}

				}, {
					id:'sunend',
					xtype : 'datefield',
					format : 'Y年m月d日',// 设置日期格式 月/日/年
					fieldLabel : ''+getResource('resourceParam1032')+'',
					editable : false,// 设置未不可编辑
					name : 'end',
					minText : 'Can\'t have a end date before today!',
					disabledDays : [0, 6],// 去掉周六、周日
					disabledDaysText : 'End date is not available on the weekends',
					allowBlank : false,
					labelStyle : 'padding:5px 0px 5px 0px',
					style : 'margin-bottom: 5px;',
					width : 250
				}, {
					xtype : 'datefield',
					format : 'Y年m月d日',// 设置日期格式 月/日/年
					fieldLabel : ''+getResource('resourceParam856')+'',
					editable : false,// 设置未不可编辑
					name : 'start',
					minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
					minText : 'Can\'t have a start date before today!',
					disabledDays : [0, 6],// 去掉周六、周日
					disabledDaysText : 'Start date is not available on the weekends',
					allowBlank : true,
					disabled : true,
					labelStyle : 'padding:5px 0px 5px 0px',
					style : 'margin-bottom: 5px;',
					width : 250,
					validator : function() {
						var plannedStart = Ext.getCmp('sunstart').getValue();
						var plannedEnd = Ext.getCmp('sunend').getValue();
						var date = plannedEnd - plannedStart;
						if (date > 0) {
							return true;
						}
						return false;
					}
				}, {
					xtype : 'datefield',
					disabled : true,
					format : 'Y年m月d日',// 设置日期格式 月/日/年
					fieldLabel : ''+getResource('resourceParam1033')+'',
					editable : false,// 设置未不可编辑
					name : 'end',
					minText : 'Can\'t have a end date before today!',
					disabledDays : [0, 6],// 去掉周六、周日
					disabledDaysText : 'End date is not available on the weekends',
					allowBlank : true,
					disabled : true,
					width : 250,
					labelStyle : 'padding:5px 0px 5px 0px',
					style : 'margin-bottom: 5px;'
				}, {
					xtype : 'textarea',
					fieldLabel : ''+getResource('resourceParam648')+'',
					name : 'ttextarea',
					style : 'margin-bottom: 5px;',
					width : 250,
					disabled : false,
					maxLength : 500,
					maxLengthText : ''+getResource('resourceParam1198')+''
				}]
	})

	return TaskBasicForm.form;
}
