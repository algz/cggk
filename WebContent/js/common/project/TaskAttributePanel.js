var TaskAttributePanel = {
	taskId : null
}
/*
 * 查看任务的属性，扩展属性 需要引用 viewTaskForm.js', viewExtendForm.js',viewApproveTask.js ,
 * CreateExtendForm.js,',
 * 
 * TaskAttributePanel.taskId=任务Id TaskAttributePanel.init();初始化card面板
 * TaskAttributePanel.setBasicForm();给基本属性赋值
 * 
 * TaskAttributePanel.setFirstPage();第一页 基本属性页
 * TaskAttributePanel.setSecondPage();第二页 扩展属性页
 * TaskAttributePanel.setThirdPage();第三页 审批任务属性页 参数config={ hasApprovalTask:true
 * 属性面板中显示审批 任务 }
 */
TaskAttributePanel.init = function(config) {
	TaskAttributePanel.taskBasicForm = collarbViewTaskForm.init();
	collarbViewTaskForm.link.setVisible(false);
	collarbViewTaskForm.nextPage = function() {
		TaskAttributePanel.cardPanel.getLayout().setActiveItem(1);
		Ext.Ajax.request({
			url : '../JSON/project_ProjectRemote.getExtendFormInstance',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					if (obj.items.length == 0) {
						// Ext.Msg.alert('提示', '该类型没有扩展属性');
						TaskAttributePanel.setFirstPage();
					} else {
						var labelWidth = obj.labelWidth;
						var items = obj.items;
						var fieldWidth = obj.fieldWidth;
						var buttonWidth = labelWidth;
						if (buttonWidth < 100) {
							buttonWidth = 100;
						}
						buttonWidth += fieldWidth - 20;
						if (TaskAttributePanel.taskExtendForm != null) {
							TaskAttributePanel.extendPanel
									.remove(TaskAttributePanel.taskExtendForm);
							TaskAttributePanel.taskExtendForm = collarbViewExtendForm
									.init(buttonWidth);
							collarbViewExtendForm.formerPage = function() {
								TaskAttributePanel.cardPanel.getLayout()
										.setActiveItem(0);
							}
							TaskAttributePanel.extendPanel
									.add(TaskAttributePanel.taskExtendForm);
							TaskAttributePanel.extendPanel.doLayout();
						} else {
							TaskAttributePanel.taskExtendForm = collarbViewExtendForm
									.init(buttonWidth);
							collarbViewExtendForm.formerPage = function() {
								TaskAttributePanel.cardPanel.getLayout()
										.setActiveItem(0);
							}
							TaskAttributePanel.extendPanel
									.add(TaskAttributePanel.taskExtendForm);
							TaskAttributePanel.extendPanel.doLayout();

						}
						createExtendForm.createViewForm(
								TaskAttributePanel.taskExtendForm, items,
								labelWidth);
						TaskAttributePanel.cardPanel.getLayout()
								.setActiveItem(1);
					}
				} else {
					if(obj.message!=null&&obj.message!='')
					{
						Ext.MessageBox.show({
									title : '' + getResource('resourceParam575')//提示
											+ '',
									msg : obj.message,
									minWidth : 100,
									icon : Ext.MessageBox.ERROR,
									buttons : Ext.MessageBox.OK
								});
					}
				}

			},
			params : {
				node : TaskAttributePanel.taskId
			}
		});
	}

	function setViewTaskForm(obj) {
		TaskAttributePanel.taskBasicForm.getForm().findField('tname')
				.setValue(obj.tname);
		TaskAttributePanel.taskBasicForm.getForm().findField('ttype')
				.setValue(obj.ttype);
		TaskAttributePanel.taskBasicForm.getForm().findField('tdepart')
				.setValue(obj.tdepart);
		TaskAttributePanel.taskBasicForm.getForm().findField('tuser')
				.setValue(obj.tuser);
		TaskAttributePanel.taskBasicForm.getComponent('progressbar_wrap').getComponent('progressbar').updateProgress(
				obj.tcomplete / 100,
				'' + getResource('resourceParam1031') + '' + obj.tcomplete//已完成
						+ '%');
		TaskAttributePanel.taskBasicForm.getForm().findField('tstatus')
				.setValue(obj.tstatus);
		TaskAttributePanel.taskBasicForm.getForm().findField('tstart')
				.setValue(obj.tstart);
		TaskAttributePanel.taskBasicForm.getForm().findField('tend')
				.setValue(obj.tend);
		TaskAttributePanel.taskBasicForm.getForm().findField('trealstart')
				.setValue(obj.trealstart);
		TaskAttributePanel.taskBasicForm.getForm().findField('trealend')
				.setValue(obj.trealend);
		TaskAttributePanel.taskBasicForm.getForm().findField('tdesc')
				.setValue(obj.tdesc);
		TaskAttributePanel.taskBasicForm.getForm().findField('vissue')
				.setValue(obj.vissue);
		TaskAttributePanel.taskBasicForm.getForm().findField('duration')
				.setValue(obj.duration);
		TaskAttributePanel.taskBasicForm.getForm().findField('saturation')
				.setValue(obj.saturation);
		TaskAttributePanel.taskBasicForm.getForm().findField('manhour')
				.setValue(obj.manhour);
		TaskAttributePanel.taskBasicForm.getForm().findField('applicationName')
				.setValue(obj.applicationName);
		TaskAttributePanel.taskBasicForm.getForm().findField('backEnumName')
				.setValue(obj.backEnumName);
		TaskAttributePanel.taskBasicForm.getForm().findField('plannedquantity')
				.setValue(obj.plannedquantity);
		var approvalName = '';
		if (obj.isApproval == 0) {
			approvalName = '' + getResource('resourceParam9119') + ''//不进行审批
		} else if (obj.isApproval == 1) {
			approvalName = '' + getResource('resourceParam9118') + '' //自定义审批人
		} else if (obj.isApproval == 2) {
			approvalName = '' + getResource('resourceParam9117') + ''//上级任务负责人审批
		}
		TaskAttributePanel.taskBasicForm.getForm().findField('isApproval')
				.setValue(approvalName);
		TaskAttributePanel.taskBasicForm.getForm()
				.findField('securityDegreeName')
				.setValue(obj.securityDegreeName)
		// TaskAttributePanel.taskBasicForm.getForm().findField('vlandmark')
		// .setValue(obj.vlandmark);
		if (obj.extendNum == 0) {
			collarbViewTaskForm.link.setVisible(false);
		} else {
			collarbViewTaskForm.link.setVisible(true);
		}
	}

	TaskAttributePanel.setBasicForm = function(taskId, callback) {
		if (taskId != null) {
			TaskAttributePanel.taskId = taskId;
		}
		Ext.Ajax.request({
					url : "../JSON/task_TaskRemote.getTaskInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							setViewTaskForm(obj);
							if (callback) {
								if (obj.iconCls) {
									callback(obj.iconCls);
								}
							}
						} else {

							TaskAttributePanel.reset();
							TaskAttributePanel.taskBasicForm.getComponent('progressbar_wrap').getComponent('progressbar').updateProgress(
									obj.tcomplete / 100,
									'' + getResource('resourceParam1031') + '' + obj.tcomplete//已完成
											+ '%');
								if(obj.message!=null&&obj.message!='')
								{
									Ext.MessageBox.show({
												title : ''
														+ getResource('resourceParam499')//错误'
														+ '',
												width:250,		//gaoyn bug 1061 2011-6-8 17:53
												msg : obj.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
								}
							if (callback) {
								callback(obj.iconCls);
							}
						}
					},
					params : {
						node : TaskAttributePanel.taskId
					}
				});

	}
	TaskAttributePanel.basicPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit',
				items : [TaskAttributePanel.taskBasicForm]
			});
	TaskAttributePanel.extendPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			});
	TaskAttributePanel.cardPanel = new Ext.Panel({
		frame : false,
		border : false,
		layout : 'card',
		items : [TaskAttributePanel.basicPanel, TaskAttributePanel.extendPanel],
		activeItem : 0
	});

	if (config && config.hasApprovalTask) {
		TaskAttributePanel.approvalTaskForm = viewApproveTask.init();
		TaskAttributePanel.approvalTaskPanel = new Ext.Panel({
					frame : false,
					border : false,
					layout : 'fit',
					items : [TaskAttributePanel.approvalTaskForm]
				});
		TaskAttributePanel.cardPanel.add(TaskAttributePanel.approvalTaskPanel);
	}
	TaskAttributePanel.setFirstPage = function() {
		TaskAttributePanel.cardPanel.getLayout().setActiveItem(0);
	}
	TaskAttributePanel.setSecondPage = function() {
		TaskAttributePanel.cardPanel.getLayout().setActiveItem(1);
	}
	TaskAttributePanel.setThirdPage = function() {
		TaskAttributePanel.cardPanel.getLayout().setActiveItem(2);
		viewApproveTask.setBasicForm(TaskAttributePanel.taskId);
	}
	TaskAttributePanel.reset = function() {
		collarbViewTaskForm.link.setVisible(false);
		TaskAttributePanel.taskBasicForm.getForm().reset();
	}

	return TaskAttributePanel.cardPanel;
}
