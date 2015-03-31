var ProjectAttributePanel = {
	projectId : null
}
/*
 * 查看项目的属性，扩展属性 需要引入 viewProjectForm.js', viewExtendForm.js',
 * CreateExtendForm.js'
 * 
 * 
 * ProjectAttributePanel.projectId=项目 Id ProjectAttributePanel.init();初始化card面板
 * ProjectAttributePanel.setBasicForm();给基本属性赋值
 * 
 * ProjectAttributePanel.setFirstPage();第一页
 * ProjectAttributePanel.setSecondPage();第二页
 * 
 */
ProjectAttributePanel.init = function() {
	ProjectAttributePanel.projectBasicForm = collarbViewProjectForm.init();
	collarbViewProjectForm.link.setVisible(false);
	collarbViewProjectForm.nextPage = function() {
		ProjectAttributePanel.cardPanel.getLayout().setActiveItem(1);
		Ext.Ajax.request({
			url : '../JSON/project_ProjectRemote.getExtendFormInstance',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					if (obj.items.length == 0) {
						// Ext.Msg.alert('提示', '该类型没有扩展属性');
						ProjectAttributePanel.setFirstPage();
					} else {
						var labelWidth = obj.labelWidth;
						var items = obj.items;
						var fieldWidth = obj.fieldWidth;
						var buttonWidth = labelWidth;
						if (buttonWidth < 100) {
							buttonWidth = 100;
						}
						buttonWidth += fieldWidth - 20;
						if (ProjectAttributePanel.projectExtendForm != null) {
							ProjectAttributePanel.extendPanel
									.remove(ProjectAttributePanel.projectExtendForm);
							ProjectAttributePanel.projectExtendForm = collarbViewExtendForm
									.init(buttonWidth);
							collarbViewExtendForm.formerPage = function() {
								ProjectAttributePanel.cardPanel.getLayout()
										.setActiveItem(0);
							}
							ProjectAttributePanel.extendPanel
									.add(ProjectAttributePanel.projectExtendForm);
							ProjectAttributePanel.extendPanel.doLayout();
						} else {
							ProjectAttributePanel.projectExtendForm = collarbViewExtendForm
									.init(buttonWidth);
							collarbViewExtendForm.formerPage = function() {
								ProjectAttributePanel.cardPanel.getLayout()
										.setActiveItem(0);
							}
							ProjectAttributePanel.extendPanel
									.add(ProjectAttributePanel.projectExtendForm);
							ProjectAttributePanel.extendPanel.doLayout();

						}

						createExtendForm.createViewForm(
								ProjectAttributePanel.projectExtendForm, items,
								labelWidth);
						ProjectAttributePanel.cardPanel.getLayout()
								.setActiveItem(1);
					}
				} else {
					if(obj.message!=null&&obj.message!='')
					{
						Ext.MessageBox.show({
									title : '' + getResource('resourceParam575')
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
				node : ProjectAttributePanel.projectId
				// 后台处理时有前缀
			}
		});
	}

	function setViewProjectForm(obj) {
		ProjectAttributePanel.projectBasicForm.getForm().findField('vname')
				.setValue(obj.vname);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vtype')
				.setValue(obj.vtype);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vdepart')
				.setValue(obj.vdepart);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vuser')
				.setValue(obj.vuser);
		ProjectAttributePanel.projectBasicForm.getForm().findField('issuedManName')
		.setValue(obj.issuedManName);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vcreate')
				.setValue(obj.vcreate);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vstatus')
				.setValue(obj.vstatus);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vstart')
				.setValue(obj.vstart);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vend')
				.setValue(obj.vend);
		ProjectAttributePanel.projectBasicForm.getForm()
				.findField('vrealstart').setValue(obj.vrealstart);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vrealend')
				.setValue(obj.vrealend);
		ProjectAttributePanel.projectBasicForm.getForm().findField('vdesc')
				.setValue(obj.vdesc);
		// ProjectAttributePanel.projectBasicForm.getForm().findField('vdatacenternames')
		// .setValue(obj.vdatacenternames);
		ProjectAttributePanel.projectBasicForm.getForm().findField('whyname')
				.setValue(obj.whyname);
		ProjectAttributePanel.projectBasicForm.getForm()
				.findField('securityDegreeName')
				.setValue(obj.securityDegreeName);
		if(obj.extendNum==0){
		   collarbViewProjectForm.link.setVisible(false);
		}else{
		   collarbViewProjectForm.link.setVisible(true);
		}
	}

	ProjectAttributePanel.setBasicForm = function(projectId, callback) {
		if (projectId != null) {
			ProjectAttributePanel.projectId = projectId;
		}
		Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.getProjectInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							setViewProjectForm(obj)
						} else {
							if (callback) {
								callback(obj.iconCls);
							}
							ProjectAttributePanel.reset();
							if(obj.message!=null&&obj.message!='')
							{
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam575')
													+ '',
											width:250,		//gaoyn bug 1061 2011-6-8 17:53	
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						}
					},
					params : {
						node : ProjectAttributePanel.projectId
					}
				});
	}
	ProjectAttributePanel.basicPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit',
				items : [ProjectAttributePanel.projectBasicForm]
			});
	ProjectAttributePanel.extendPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			});
	ProjectAttributePanel.cardPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'card',
				items : [ProjectAttributePanel.basicPanel,
						ProjectAttributePanel.extendPanel],
				activeItem : 0
			});
	ProjectAttributePanel.setFirstPage = function() {
		ProjectAttributePanel.cardPanel.getLayout().setActiveItem(0);
	}
	ProjectAttributePanel.setSecondPage = function() {
		ProjectAttributePanel.cardPanel.getLayout().setActiveItem(1);
	}

	ProjectAttributePanel.reset = function() {
		collarbViewProjectForm.link.setVisible(false);
		ProjectAttributePanel.projectBasicForm.getForm().reset();

	}
	return ProjectAttributePanel.cardPanel;
}
