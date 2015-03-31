var atMain = {
	privilege : false,
	test : true
};

// 点击模板进入查看页面
atMain.toTreeView = function toTreeView(id, name) {
	Ext.getCmp('view1_create_1').setVisible(false);// 新建模板分类
	Ext.getCmp('view1_create_2').setVisible(false);// 新建模板
	Ext.getCmp('view1_return').setVisible(true);// 返回
	/**
	 * bug编号799 wangyf
	 * bug信息：1。进入系统管理-审批模板查看页面，重新点击状态中的下拉列表选项，此时新建按钮没有默认为恢色显示
	 *				应置恢。同时状态按钮也应置恢应不可进行修改操作。
	 *			2。查看页面上的名称与说明内容不应置恢。
	 * 2011-05-24
	 */
	Ext.getCmp('statusW').disable();
	
	if(!atMain.flowViewWindow) {
		atMain.flowViewWindow = new FlowViewWindow();
	}
	atMain.flowViewWindow.loadFlow(id);
	
	/** 可编辑的形式
	atMain.mainPanel.getLayout().setActiveItem(5);
	atMain.designerPanel.getFlowGraph().loadFlow(id);
	*/
}

atMain.init = function() {
	atMain.flowViewWindow = null;
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	// 返回到初始页面
	function backToMain() {
		Ext.getCmp('view1_create_1').setVisible(true);
		Ext.getCmp('view1_create_2').setVisible(true);
		awbsPanel.refresh();
		atMain.mainPanel.getLayout().setActiveItem(0);
	}
	// 模板分类返回
	var atemplateContentConfig = {
		cancelCallback : function() {
			atMain.mainPanel.getLayout().setActiveItem(0);
		},
		successCallback : function() {
			atMain.mainPanel.getLayout().setActiveItem(0);
			awbsPanel.refresh();
			atemplateContent.parentId = -1;
		}
	}
	// 模板返回
	var atemplateConfig = {
		cancelCallback : function() {
			atMain.mainPanel.getLayout().setActiveItem(0);
		},
		successCallback : function() {
			atMain.mainPanel.getLayout().setActiveItem(0);
			awbsPanel.refresh();
		}
		// url : "../JSON/approval_templetRemote.addFlowTemplet"
	}
	// 新建模板分类
	var createContent = new Ext.Action({
				text : getResource('resourceParam5005'),
				id : 'view1_create_1',
				handler : function() {
					
					Ext.getCmp('view1_update').disable();
					Ext.getCmp('view1_delete').disable();
					Ext.getCmp('statusW').disable();
					
					
					atemplateContentConfig.update = false;// 验证是新增还是修改
					atemplateContent.contentForm.getForm().reset();
					atMain.mainPanel.getLayout().setActiveItem(2);
				}
			});
	// 新建模板
	var createTemplate = new Ext.Action({
				text : getResource('resourceParam5008'),
				id : 'view1_create_2',
				handler : function() {
					/**
					 * bug编号732 wangyf
					 * bug信息：在审批流程模板管理中，如果选中了模板分类，执行新建命令，相应的按钮也应该为灰显。
					 * 2011-05-20 15：58
					 */
					Ext.getCmp('view1_update').disable();
					Ext.getCmp('view1_delete').disable();
					Ext.getCmp('statusW').disable();
					
					delete atemplate.templateId;
					atemplate.reset();
					var r = awbsPanel.sm.getSelected();
					if (r != undefined) {
						if (r.get('itemtype') == 'FLOW_TYPE') {
							atemplate.parentId = r.get('id');// 模板id
							// atemplateCate.setValue(r.get('itemname'));
						} else if (r.get('itemtype') == 'FLOW_TEMPLET') {
							if (r.get('parent') == null) {
								atemplate.parentId = -1;
							} else {
								atemplate.parentId = r.get('parent');
							}
						}
					}
					atMain.mainPanel.getLayout().setActiveItem(3);
				}
			});

	var tbar = new Ext.Toolbar({
		items : [{
					text : getResource('resourceParam483'),// 新建，包括新建分类和新建模板
					id : 'view1_create',
					disabled : false,
					menu : [createContent, createTemplate]
				}, '-', {
					text : getResource('resourceParam478'),// 修改
					id : 'view1_update',
					disabled : true,
					handler : function() {
						Ext.getCmp('view1_issue').disable();
						Ext.getCmp('view1_delete').disable();
						Ext.getCmp('statusW').disable();
						if (awbsPanel.itemtype == 'FLOW_TYPE') {
							atemplateContentConfig.update = true;
							atemplateContent.setBasic();
							atMain.mainPanel.getLayout().setActiveItem(2);
						} else if (awbsPanel.itemtype == 'FLOW_TEMPLET') {
							var record = awbsPanel.sm.getSelected();
							if (record.get('state') == 0) {
								templateId = record.get('id');
								atemplate.update(templateId);
								atMain.mainPanel.getLayout().setActiveItem(3);
							} else {
								Ext.MessageBox.show({
									title : '' + getResource('resourceParam575') + '',
									msg : '' + getResource('resourceParam7129') + '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						}
					}
				}, '-', {
					/**
					 * bug:321
					 * 在审批模板管理界面，选中多个未发布模板时发布按钮灰显，不能一起发布。
					 * 高运娜
					 */
					text : getResource('resourceParam605'),// 发布
					id : 'view1_issue',
					disabled : true,
					handler : function() {
						var records = awbsPanel.sm.getSelections();
						
						var flowids="";
						
						for (var i = 0; i < records.length; i++) {
							 var record = records[i];
							
							if((i+1)==records.length && (record.get('state') == 0 || record.get('state') == 2)){
									flowids += record.get('id');
									
									Ext.MessageBox.confirm(''
											+ getResource('resourceParam575')
											+ '', ''
											+ getResource('resourceParam850')
											+ getResource('resourceParam7115')
											+ getResource('resourceParam5006')
											+ '?', function(btn, text) {
										if (btn == 'yes') {
											
											var approval_vo = Seam.Remoting
													.createType("com.sysware.common.approval.templet.ApprovalTempletVo");
											approval_vo.setState(1);
											approval_vo.setFlowids(flowids);
											if (record.get('parent') == null) {
												awbsPanel.nodeId = -1;
											} else {
												awbsPanel.nodeId = record
														.get('parent');
											}
											Seam.Component
													.getInstance("approval_templetRemote")
													.updateTempletState(
															approval_vo,
															awbsPanel.refresh);
											/**
											 * bug编号801 wnagyf
											 * bug信息：审批模板发布成功后没有信息提示。
											 * 2011-06-02
											 */
											Ext.example.msg("" + getResource('resourceParam575') + "", ""
													+ '发布成功！' + "");
										}
									
								})
						  }
					     else  if ((i+1)==records.length &&   record.get('state') == 1) {
					  		flowids += record.get('id');
					  		
							Ext.MessageBox.confirm(''
											+ getResource('resourceParam575')
											+ '', ''
											+ getResource('resourceParam512')
											+ getResource('resourceParam510')
											+ getResource('resourceParam9095')
											+ getResource('resourceParam7095')
											+ '？', function(btn, text) {
										if (btn == 'yes') {
											var approval_vo = Seam.Remoting
													.createType("com.sysware.common.approval.templet.ApprovalTempletVo");
											approval_vo.setState(2);
											approval_vo.setFlowids(flowids);
											Seam.Component
													.getInstance("approval_templetRemote")
													.updateTempletState(
															approval_vo,
															awbsPanel.refresh);
										}
									}).getDialog().setWidth(250)
					      }
					     else{
							 flowids += record.get('id') + ","
						 }
						}
					}
				}, '-', {
					text : getResource('resourceParam475'),// 删除
					id : 'view1_delete',
					disabled : true,
					handler : function() {
						var records = awbsPanel.sm.getSelections();
						var sign = 1;
						var typeids = '';
						var templateids = '';
						for (i = 0; i < records.length; i++) {
							var record = records[i];
							if (record.get('itemtype') == 'FLOW_TYPE'
									&& record.get('leaf') == true) {
								typeids += record.get('id') + ","
							} else if (record.get('state') == 0
									&& record.get('itemtype') == 'FLOW_TEMPLET') {
								templateids += record.get('id') + ","
							} else {
								sign = 0;
								break;
							}
						}
						if (sign == 0) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : ''
												+ getResource('resourceParam7130')
												+ '',
										width : 400,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							Ext.MessageBox.confirm(''
											+ getResource('resourceParam1724')
											+ '', ''
											+ getResource('resourceParam636')
											+ '', function(btn, text) {
										if (btn == 'yes') {
											var approval_vo = Seam.Remoting
													.createType("com.sysware.common.approval.templet.ApprovalTempletVo");
											approval_vo
													.setTypeDescription(typeids);
											approval_vo
													.setFlowDescription(templateids);
											Seam.Component
													.getInstance("approval_templetRemote")
													.deleteFlowType(
															approval_vo,
															awbsPanel.refresh);
										}
									}).getDialog().setWidth(300);
						}
					}
				}, {
					text : getResource('resourceParam582'),// 权限
					hidden : true,
					id : 'view1_privilege',
					disabled : true,
					handler : function() {
						var selections = awbsPanel.sm.getSelections();
						var ids = '';
						for (var i = 0; i < selections.length; i++) {
							ids += selections[i].data.id + ',';
						}
						setDataPrivilege.mainpanel.dataId = ids;
						var selection = awbsPanel.sm.getSelected();
						if (selection.data.itemtype == 'FLOW_TYPE') {
							setDataPrivilege.mainpanel.dataType = "ApprovalContentDataType";// 模板分类设置数据权限
						} else {
							setDataPrivilege.mainpanel.dataType = "ApprovalTemplateDataType";// 审批模板设置数据权限
						}

						setDataPrivilege.refresh();
						setDataPrivilege.config = {
							dataId : selection.data.id,
							dataType : setDataPrivilege.mainpanel.dataType
						}
						atMain.mainPanel.getLayout().setActiveItem(1);
					}
				}, '-', {
					text : getResource('resourceParam4036'),// 返回
					id : 'view1_return',
					handler : function() {
						/**
						 * bug编号799 wangyf
						 * bug信息：1。进入系统管理-审批模板查看页面，重新点击状态中的下拉列表选项，此时新建按钮没有默认为恢色显示
						 *				应置恢。同时状态按钮也应置恢应不可进行修改操作。
						 *			2。查看页面上的名称与说明内容不应置恢。
						 * 2011-05-24
						 */
						Ext.getCmp('view1_create').enable();
						Ext.getCmp('statusW').enable();
						backToMain();
					}
				}, {
					xtype : 'tbspacer',// 空字符
					width : 20
				}, {
					xtype : 'tbtext',// "状态"label
					text : getResource('resourceParam500')
				}, {
					xtype:'tbtext',
					text:'<div id="filterStatus" />'
				}]
	});
	atMain.awbsPanel = new Ext.Panel({// 数据面板,调用awbsPanel.js文件
		layout : 'fit',
		border : false,
		frame : false,
		autoScroll : true,
		bodyStyle : 'overflow:auto;',
		items : [awbsPanel.init()]
	});
	awbsPanel.sm.on('rowselect', function(sm) {// 判断复选框是否选中
				if (sm.getCount() > 1) {
					setDataPrivilege.mutiFirst = true;
				} else {
					setDataPrivilege.mutiFirst = false;
				}
			});
	awbsPanel.sm.on('selectionchange', function(sm) {// 当选中复选框改变时，判断那些按钮需要展示或灰掉
				if (sm.getCount() == 0) {// 当一个都没有选中时，只能新建
					Ext.getCmp('view1_create').enable();
					Ext.getCmp('view1_update').disable();
					Ext.getCmp('view1_delete').disable();
					Ext.getCmp('view1_privilege').disable();
					Ext.getCmp('view1_issue').disable();
					// Ext.getCmp('view1_disuser').disable();
				} else if (sm.getCount() == 1) {// 当选中一个时，如果选中的是分类，新建好使，否则不好使
					var r = sm.getSelected();
					awbsPanel.itemtype = r.get('itemtype');
					Ext.getCmp('view1_create').enable();
					Ext.getCmp('view1_delete').enable();
					if (awbsPanel.itemtype == 'FLOW_TYPE') {
						Ext.getCmp('view1_issue').disable();
					} else {
						/**
						 * bug编号735 wangyf
						 * bug信息：在审批流程模板管理中，如果选中了模板，新建命令应该为灰显。
						 * 2011-05-20 15：33
						 */
						Ext.getCmp('view1_create').disable();
						Ext.getCmp('view1_issue').enable();
						if (r.get('state') == 0 || r.get('state') == 2) {
							Ext.getCmp('view1_issue')
									.setText(getResource('resourceParam605'));
						} else {
							Ext.getCmp('view1_issue')
									.setText(getResource('resourceParam9095'));
						}
						// Ext.getCmp('view1_disuser').enable();
					}
					Ext.getCmp('view1_update').enable();
					Ext.getCmp('view1_privilege').enable();

				} else {// 当选中多个时，新建不好使，删除好使
					Ext.getCmp('view1_create').disable();

					var res = sm.getSelections();
					var len = res.length;
					var contentLength = 0;
					var temlateLength = 0;
					var issueLength=0; //已经发布的
					var dissueLength=0; //未发布的
					
					//查看选中的发布 的所有的状态
					for (var i = 0; i < len; i++) {// 得到选中的分类数和模板数
						if (res[i].get('itemtype') == 'FLOW_TYPE') {
							contentLength++;
						}
						if (res[i].get('itemtype') == 'FLOW_TEMPLET') {
							temlateLength++;
						}
						if(res[i].get('state') == 0 || res[i].get('state') == 2){ //未发布的
							dissueLength++;
						}
						else if(res[i].get('state') == 1){
							issueLength++;
						}
					}
					if (contentLength == len && temlateLength == 0) {// 当选中的全为分类时,权限好使，修改不好使
						Ext.getCmp('view1_privilege').enable();
						Ext.getCmp('view1_update').disable();
						Ext.getCmp('view1_issue').disable();
						// Ext.getCmp('view1_disuser').disable();
						Ext.getCmp('view1_delete').enable();
					} else if (temlateLength == len) {// 多选时，当勾选一个分类又取消时，类型的修复
						awbsPanel.dataType = 'FLOW_TEMPLET';
						Ext.getCmp('view1_privilege').enable();
						/**
						 * bug 321 在审批模板管理界面，选中多个未发布模板时发布按钮灰显，不能一起发布。
						 * des 1>当选中多个未发布或废弃模板时发布按钮可用
						 *     2>当选中多个发布的模板时 取消发布按钮可用
						 */
						
						Ext.getCmp('view1_issue').disable(); //
						// Ext.getCmp('view1_disuser').disable();
						Ext.getCmp('view1_delete').enable();
						
						if( dissueLength==len){ //全部是未发布的
							Ext.getCmp('view1_issue').enable();
							Ext.getCmp('view1_issue')
									.setText(getResource('resourceParam605'));
						}
						if(issueLength==len) { //全部是已发布的
							Ext.getCmp('view1_issue').enable();
							Ext.getCmp('view1_issue')
									.setText(getResource('resourceParam9095'));
						}
						
						if (temlateLength != 1) {
							Ext.getCmp('view1_update').disable();
						} else {
							Ext.getCmp('view1_update').enable();
						}
					} else {// 即选中了分类又选中了模板时，全不好使
						Ext.getCmp('view1_privilege').disable();
						Ext.getCmp('view1_update').disable();
						Ext.getCmp('view1_issue').disable();
						Ext.getCmp('view1_delete').enable();
					}
				}
				if (sm.getCount() == 0) {// 当一个都没有选中时，设置参数
					awbsPanel.nodeId = -1;
					atemplateContent.parentId = -1;
					atemplate.id = '';
				} else if (sm.getCount() == 1) {// 当选中一个时，若选中的类型不同参数设置不同
					var r = sm.getSelected();
					awbsPanel.nodeId = r.get('id');
					if (r.get('itemtype') == 'FLOW_TYPE') {
						atemplateContent.parentId = awbsPanel.nodeId;
						atemplateContent.itemname = r.get('itemname');
						atemplate.id = '';
					} else if (r.get('itemtype') == 'FLOW_TEMPLET') {
						if (r.get('parent') == null) {
							atemplateContent.parentId = -1;
						} else {
							atemplateContent.parentId = r.get('parent');
						}
						atemplate.id = '' + r.get('id');// 更新时，模板id
					}
					atemplateContent.itemId = r.get('id');
				} else {// 选中多个时，设置参数
					atemplateContent.itemId = '';
					atemplateContent.state='';
					atemplate.id = '';
					var res = sm.getSelections();
					for (var i = 0; i < res.length; i++) {
						if (res[i].get('itemtype') == 'FLOW_TYPE') {
							atemplateContent.itemId += res[i].get('id');
							atemplateContent.itemId += ',';
							
						} else if (res[i].get('itemtype') == 'FLOW_TEMPLET') {
							atemplate.id += res[i].get('id');
							atemplate.id += ',';
							
							atemplateContent.state+=res[i].get('state');
							atemplateContent.state+=',';
						}
					}
					if (atemplateContent.itemId) {
						atemplateContent.itemId = atemplateContent.itemId
								.substring(0, atemplateContent.itemId
												.lastIndexOf(","));
					}
					if (atemplate.id) {
						atemplate.id = atemplate.id.substring(0, atemplate.id
										.lastIndexOf(","));
					}
					if(atemplateContent.state){
						atemplateContent.state=atemplateContent.state.substring(0, atemplateContent.state
										.lastIndexOf(","));
					}
				}
			});
	awbsPanel.refresh();

	setDataPrivilege.privileged = atMain.privilege;
	atMain.privilegeSet = setDataPrivilege.init();

	atMain.templatePanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;'
			});
			
	atMain.designerPanel = new DesignerPanel();
			
	// 总面板
	atMain.mainPanel = new Ext.Panel({
				layout : 'card',
				border : false,
				titlebar : false,
//				autoScroll : true,
				activeItem : 0,
				margins : '0 5 5 0',
				listeners:{
					render:function()
					{
						new Ext.form.ComboBox({// 状态下拉列表,包括全部、未发布、发布、废弃四种状态
						hiddenName : 'stauts',
						id : 'statusW',
						renderTo:'filterStatus',
						store : new Ext.data.SimpleStore({
							fields : ['id', 'name'],
							data : [
									[-1,'' + getResource('resourceParam1474') + ''],     //所有状态
									[0, '' + getResource('resourceParam1267') + ''],    //未发布
									[1, '' + getResource('resourceParam1266') + ''],   //已发布
									[2, '' + getResource('resourceParam9091') + '']]  //已废弃
						}),
						value : '' + getResource('resourceParam1474') + '',
						valueField : 'id',
						displayField : 'name',
						typeAhead : false,
						mode : 'local',
						triggerAction : 'all',
						selectOnFocus : true,
						allowBlank : true,
						forceSelection : true,
						editable : false,
						style : 'margin-bottom: 5px;',
						width : 120,
						listeners : {
							'select' : function(combo, record, index) {
								awbsPanel.state = record.get('id');
								awbsPanel.refresh();
							}
						}
					})
					}
				},
				items : [atMain.awbsPanel, atMain.privilegeSet,
						atemplateContent.init(atemplateContentConfig),
						atemplate.init(atemplateConfig), atMain.templatePanel, atMain.designerPanel.getMainPanel()]
			});
	var viewport = new Ext.Viewport({
				layout : 'border',
				items:[{
					layout:'fit',
					xtype:'panel',
					tbar:tbar,
					region:'center',
					items : [atMain.mainPanel]
				}]
			});

}
Ext.onReady(atMain.init, atMain, true);
