/*
 * 参数 
 * TaskExtendForm.kind,// 同级任务，或子任务
 * TaskExtendForm.nodeId// 节点id
 */
var TaskExtendForm = {
	kind : null,
	nodeId : null
};
TaskExtendForm.init = function(callback) {
	var createTaskMask = new Ext.LoadMask(document.body, {
		msg : getResource('resourceParam9047') + getResource('resourceParam1565') +','+getResource('resourceParam7056')+'...'
	});
	TaskExtendForm.form = new Ext.form.FormPanel( {
		autoScroll : true,
		autoWidth : true,
		fileUpload : true,
		border : false,
		bodyStyle : 'padding:10px 0px 10px 10px',
		items : [ {
			layout : 'column',
			border : false,
			items : [ {
				border : false,
				width : 325,
				layout : 'form',
				items : [ {
					xtype : 'button',
					style : 'margin-left: 275px;',
					text : '' + getResource('resourceParam1152') + '',
					handler : formerPage
				} ]
			}, {
				border : false,
				width : 60,
				layout : 'form',
				items : [ {
					xtype : 'button',
					text : '完成',
					handler : formsubmit
				} ]
			} ]
		} ]
	});
	function formerPage() {
		TaskCardFrame.card.layout.setActiveItem(0);

	}
	function formsubmit() {
		if (TaskCardFrame.extendForm.getForm().isValid()) {
			createTaskMask.show();
			var form = TaskCardFrame.extendForm.getForm().getFieldValues();
			var send = Ext.encode(form);
			TaskCardFrame.extendForm
					.getForm()
					.submit(
							{
//								url : "../JSON/FileUploadServlet",
								url : "../FILEUP/",
								method : 'POST',
								// waitMsg : '正在创建，请稍候。。。',
								// waitTitle : '创建任务',
								failure : function(form, action) {
								var obj = Ext.util.JSON
								.decode(action.response.responseText);
						var filepath = action.response.responseText;
						Ext.Ajax
								.request( {
									url : "../JSON/task_TaskRemote.createTask",
									method : 'POST',
									success : function(response,
											options) {
										var mes = Ext.util.JSON
												.decode(response.responseText);
										if (mes.success == true) {
											if (callback) {
												callback(mes);
											}
										} else {
											Ext.MessageBox
													.show( {
														title : '' + getResource('resourceParam575') + '',
														msg : mes.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
										}
										createTaskMask.hide();
									},
									params : {
										method : TaskExtendForm.kind,// 同级任务，或子任务
										node : TaskExtendForm.nodeId,
										name : TaskBasicForm.name1,
										type : TaskBasicForm.type1,
										department : TaskBasicForm.department1,
										user : TaskBasicForm.user1,
										status : TaskBasicForm.status1,
										start : TaskBasicForm.start1,
										end : TaskBasicForm.end1,
										duration : TaskBasicForm.duration1,
										saturation : TaskBasicForm.saturation1,
										manhour : TaskBasicForm.manhour1,
										roleId : TaskBasicForm.role1,
										application : TaskBasicForm.application1,
										isApproval : TaskBasicForm.isApproval1,
										securityDegree : TaskBasicForm.securityDegree1,
										textarea : TaskBasicForm.textarea1,
										extendform : send,
										taskcategoryid : TaskBasicForm.taskcategoryid,
										filepath : filepath,
										backEnum : TaskBasicForm.backEnum1,
										plannedquantity : TaskBasicForm.plannedquantity1
									}
								});
								},
								success : function(form, action) {
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									var filepath = action.response.responseText;
									Ext.Ajax
											.request( {
												url : "../JSON/task_TaskRemote.createTask",
												method : 'POST',
												success : function(response,
														options) {
													var mes = Ext.util.JSON
															.decode(response.responseText);
													if (mes.success == true) {
														if (callback) {
															callback(mes);
														}
													} else {
														Ext.MessageBox
																.show( {
																	title : '' + getResource('resourceParam575') + '',
																	msg : mes.message,
																	buttons : Ext.MessageBox.OK,
																	icon : Ext.MessageBox.ERROR
																});
													}
													createTaskMask.hide();
												},
												params : {
													method : TaskExtendForm.kind,// 同级任务，或子任务
													node : TaskExtendForm.nodeId,
													name : TaskBasicForm.name1,
													type : TaskBasicForm.type1,
													department : TaskBasicForm.department1,
													user : TaskBasicForm.user1,
													status : TaskBasicForm.status1,
													start : TaskBasicForm.start1,
													end : TaskBasicForm.end1,
													duration : TaskBasicForm.duration1,
													saturation : TaskBasicForm.saturation1,
													manhour : TaskBasicForm.manhour1,
													roleId : TaskBasicForm.role1,
													application : TaskBasicForm.application1,
													isApproval : TaskBasicForm.isApproval1,
													securityDegree : TaskBasicForm.securityDegree1,
													textarea : TaskBasicForm.textarea1,
													extendform : send,
													taskcategoryid : TaskBasicForm.taskcategoryid,
													filepath : filepath,
													backEnum : TaskBasicForm.backEnum1,
													plannedquantity : TaskBasicForm.plannedquantity1
												}
											});

								}
							});

		}
	}

	return TaskExtendForm.form;
}
